import { getCloudflareContext } from "@opennextjs/cloudflare";
import { listInquirySubmissions, type InquirySubmission } from "@/lib/inquiry-submissions";

export const dynamic = "force-dynamic";

const adminSessionCookie = "fh_admin_session";
const adminSessionMaxAgeSeconds = 60 * 60 * 12;

type AdminEnv = CloudflareEnv & {
  ADMIN_USERNAME?: string;
  ADMIN_PASSWORD?: string;
};

type AdminCredentials = {
  username: string;
  password: string;
};

export async function GET(request: Request) {
  const credentials = await getAdminCredentials();
  const headers = secureHeaders();

  if (!credentials.password) {
    return new Response(renderLoginShell({ error: "Admin credentials are not configured." }), {
      status: 503,
      headers,
    });
  }

  if (!(await verifyAdminSession(request, credentials))) {
    return new Response(renderLoginShell(), {
      status: 200,
      headers,
    });
  }

  return renderAdminSubmissions(headers);
}

export async function POST(request: Request) {
  const credentials = await getAdminCredentials();
  const headers = secureHeaders();

  if (!credentials.password) {
    return new Response(renderLoginShell({ error: "Admin credentials are not configured." }), {
      status: 503,
      headers,
    });
  }

  const formData = await request.formData();
  const action = field(formData, "action");

  if (action === "logout") {
    return redirectToAdmin(headers, expiredSessionCookie(request));
  }

  const username = field(formData, "username");
  const password = field(formData, "password");
  const isAuthorized =
    timingSafeEqual(username, credentials.username) && timingSafeEqual(password, credentials.password);

  if (!isAuthorized) {
    return new Response(
      renderLoginShell({
        error: "Username or password is incorrect.",
        username,
      }),
      {
        status: 401,
        headers,
      },
    );
  }

  return redirectToAdmin(headers, await createSessionCookie(request, credentials));
}

async function renderAdminSubmissions(headers: Headers) {
  try {
    const result = await listInquirySubmissions(200);

    if (!result.ok) {
      return new Response(renderAdminShell(`<p>${escapeHtml(result.reason ?? "No submissions found.")}</p>`), {
        status: 503,
        headers,
      });
    }

    return new Response(renderAdminShell(renderSubmissionTable(result.submissions)), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Failed to render admin submissions", error);

    return new Response(renderAdminShell("<p>Submission log could not be loaded.</p>"), {
      status: 500,
      headers,
    });
  }
}

async function getAdminCredentials(): Promise<AdminCredentials> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const adminEnv = env as AdminEnv;

    return {
      username: adminEnv.ADMIN_USERNAME || process.env.ADMIN_USERNAME || "admin",
      password: adminEnv.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || "",
    };
  } catch {
    return {
      username: process.env.ADMIN_USERNAME || "admin",
      password: process.env.ADMIN_PASSWORD || "",
    };
  }
}

async function verifyAdminSession(request: Request, credentials: AdminCredentials) {
  const token = getCookie(request, adminSessionCookie);

  if (!token) {
    return false;
  }

  const [version, encodedUsername, expiresAt, signature, ...extraParts] = token.split(".");

  if (version !== "v1" || !encodedUsername || !expiresAt || !signature || extraParts.length > 0) {
    return false;
  }

  const expirationTime = Number(expiresAt);

  if (!Number.isFinite(expirationTime) || expirationTime <= Date.now()) {
    return false;
  }

  let sessionUsername = "";

  try {
    sessionUsername = base64UrlDecodeString(encodedUsername);
  } catch {
    return false;
  }

  if (!timingSafeEqual(sessionUsername, credentials.username)) {
    return false;
  }

  const signedValue = `${version}.${encodedUsername}.${expiresAt}`;
  const expectedSignature = await signSessionValue(signedValue, credentials.password);

  return timingSafeEqual(signature, expectedSignature);
}

async function createSessionCookie(request: Request, credentials: AdminCredentials) {
  const encodedUsername = base64UrlEncodeString(credentials.username);
  const expiresAt = String(Date.now() + adminSessionMaxAgeSeconds * 1000);
  const signedValue = `v1.${encodedUsername}.${expiresAt}`;
  const signature = await signSessionValue(signedValue, credentials.password);
  const value = `${signedValue}.${signature}`;

  return serializeSessionCookie(request, value, adminSessionMaxAgeSeconds);
}

async function signSessionValue(value: string, secret: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));

  return base64UrlEncodeBytes(new Uint8Array(signature));
}

function redirectToAdmin(headers: Headers, cookie: string) {
  headers.set("Location", "/admin");
  headers.set("Set-Cookie", cookie);

  return new Response(null, {
    status: 303,
    headers,
  });
}

function serializeSessionCookie(request: Request, value: string, maxAge: number) {
  const secureFlag = new URL(request.url).protocol === "https:" ? "; Secure" : "";

  return `${adminSessionCookie}=${value}; Path=/admin; Max-Age=${maxAge}; HttpOnly; SameSite=Lax${secureFlag}`;
}

function expiredSessionCookie(request: Request) {
  return serializeSessionCookie(request, "", 0);
}

function getCookie(request: Request, name: string) {
  const cookies = request.headers.get("cookie") ?? "";

  for (const cookie of cookies.split(";")) {
    const [rawName, ...rawValue] = cookie.trim().split("=");

    if (rawName === name) {
      return rawValue.join("=");
    }
  }

  return "";
}

function field(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

function secureHeaders() {
  return new Headers({
    "Cache-Control": "no-store, no-cache, must-revalidate",
    "Content-Security-Policy":
      "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",
    "Content-Type": "text/html; charset=utf-8",
    "Referrer-Policy": "no-referrer",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-Robots-Tag": "noindex, nofollow",
  });
}

function renderLoginShell({
  error = "",
  username = "",
}: {
  error?: string;
  username?: string;
} = {}) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Portfolio Admin Login</title>
    <style>
      :root {
        color-scheme: dark;
        --bg: #050605;
        --panel: #0b0d0b;
        --text: #f4f0e7;
        --muted: #b8b3aa;
        --line: rgba(244, 240, 231, 0.12);
        --accent: #bfd3ab;
        --danger: #fca5a5;
      }
      * { box-sizing: border-box; }
      body {
        display: grid;
        min-height: 100vh;
        margin: 0;
        place-items: center;
        background:
          radial-gradient(circle at 82% 12%, rgba(158, 178, 142, 0.16), transparent 24rem),
          var(--bg);
        color: var(--text);
        font-family: Inter, ui-sans-serif, system-ui, sans-serif;
      }
      main {
        width: min(100%, 28rem);
        padding: 1.25rem;
      }
      section {
        border: 1px solid var(--line);
        border-radius: 0.5rem;
        background: linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.018));
        padding: clamp(1.25rem, 5vw, 2rem);
        box-shadow: 0 24px 80px rgba(0, 0, 0, 0.28);
      }
      h1, p { margin: 0; }
      h1 {
        margin-top: 0.35rem;
        font-size: clamp(2.1rem, 8vw, 3.25rem);
        font-weight: 500;
        letter-spacing: 0;
        line-height: 1;
      }
      .label {
        color: var(--accent);
        font-size: 0.68rem;
        font-weight: 800;
        letter-spacing: 0.18em;
        text-transform: uppercase;
      }
      form {
        display: grid;
        gap: 1rem;
        margin-top: 1.5rem;
      }
      label {
        display: grid;
        gap: 0.45rem;
        color: var(--muted);
        font-size: 0.68rem;
        font-weight: 800;
        letter-spacing: 0.16em;
        text-transform: uppercase;
      }
      input {
        width: 100%;
        min-height: 3.25rem;
        border: 1px solid var(--line);
        border-radius: 0.38rem;
        background: rgba(5, 6, 5, 0.72);
        color: var(--text);
        font: inherit;
        letter-spacing: 0;
        padding: 0 0.9rem;
      }
      input:focus {
        border-color: rgba(191, 211, 171, 0.7);
        box-shadow: 0 0 0 3px rgba(158, 178, 142, 0.14);
        outline: none;
      }
      button {
        display: inline-flex;
        min-height: 3.25rem;
        align-items: center;
        justify-content: center;
        border: 1px solid rgba(158, 178, 142, 0.42);
        border-radius: 999px;
        background: var(--text);
        color: #11140f;
        cursor: pointer;
        font: inherit;
        font-size: 0.72rem;
        font-weight: 800;
        letter-spacing: 0.18em;
        padding: 0 1.35rem;
        text-transform: uppercase;
      }
      .error {
        border: 1px solid rgba(248, 113, 113, 0.38);
        border-radius: 0.38rem;
        background: rgba(127, 29, 29, 0.18);
        color: var(--danger);
        font-size: 0.86rem;
        line-height: 1.5;
        padding: 0.8rem 0.9rem;
      }
    </style>
  </head>
  <body>
    <main>
      <section>
        <p class="label">Secure admin</p>
        <h1>Sign in</h1>
        <form method="post" action="/admin">
          ${error ? `<p class="error" role="alert">${escapeHtml(error)}</p>` : ""}
          <label>
            Username
            <input name="username" type="text" autocomplete="username" value="${escapeAttribute(username)}" required autofocus />
          </label>
          <label>
            Password
            <input name="password" type="password" autocomplete="current-password" required />
          </label>
          <button type="submit">Log in</button>
        </form>
      </section>
    </main>
  </body>
</html>`;
}

function renderSubmissionTable(submissions: InquirySubmission[]) {
  if (submissions.length === 0) {
    return "<p>No submissions have been logged yet.</p>";
  }

  const rows = submissions
    .map(
      (submission) => `<article class="submission">
        <div class="submission-header">
          <div>
            <p class="label">Submitted</p>
            <h2>${escapeHtml(submission.name)}</h2>
            <p>${escapeHtml(formatDate(submission.createdAt))}</p>
          </div>
          <span>#${submission.id}</span>
        </div>
        <dl>
          ${detailRow("Email", `<a href="mailto:${escapeAttribute(submission.email)}">${escapeHtml(submission.email)}</a>`)}
          ${detailRow("Phone", escapeHtml(submission.phone))}
          ${detailRow("Business", escapeHtml(submission.business || "Not provided"))}
          ${detailRow("Website", formatWebsiteDetail(submission.website))}
          ${detailRow("Project type", escapeHtml(submission.projectType))}
          ${detailRow("Budget", escapeHtml(submission.budgetRange))}
          ${detailRow("Monthly support", escapeHtml(submission.monthlySupport))}
          ${detailRow("IP address", escapeHtml(submission.ipAddress || "Not captured"))}
          ${detailRow("Referrer", escapeHtml(submission.referer || "Not captured"))}
          ${detailRow("User agent", escapeHtml(submission.userAgent || "Not captured"))}
        </dl>
        <div class="message">
          <p class="label">Project details</p>
          <p>${escapeHtml(submission.projectDetails).replace(/\n/g, "<br />")}</p>
        </div>
      </article>`,
    )
    .join("");

  return rows;
}

function renderAdminShell(content: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Portfolio Admin</title>
    <style>
      :root {
        color-scheme: dark;
        --bg: #050605;
        --panel: #0b0d0b;
        --text: #f4f0e7;
        --muted: #b8b3aa;
        --line: rgba(244, 240, 231, 0.12);
        --accent: #bfd3ab;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-height: 100vh;
        background: var(--bg);
        color: var(--text);
        font-family: Inter, ui-sans-serif, system-ui, sans-serif;
      }
      main {
        width: min(100%, 72rem);
        margin: 0 auto;
        padding: clamp(1.25rem, 4vw, 3rem);
      }
      header {
        display: flex;
        align-items: end;
        justify-content: space-between;
        gap: 1rem;
        border-bottom: 1px solid var(--line);
        padding-bottom: 1.5rem;
      }
      h1, h2, p { margin: 0; }
      h1 {
        font-size: clamp(2.25rem, 6vw, 4rem);
        font-weight: 500;
        letter-spacing: 0;
      }
      h2 {
        margin-top: 0.25rem;
        font-size: 1.35rem;
        font-weight: 600;
      }
      a { color: var(--accent); }
      .label {
        color: var(--accent);
        font-size: 0.68rem;
        font-weight: 800;
        letter-spacing: 0.18em;
        text-transform: uppercase;
      }
      .logout-button {
        min-height: 2.75rem;
        border: 1px solid var(--line);
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.03);
        color: var(--text);
        cursor: pointer;
        font: inherit;
        font-size: 0.68rem;
        font-weight: 800;
        letter-spacing: 0.16em;
        padding: 0 1.1rem;
        text-transform: uppercase;
      }
      .submissions {
        display: grid;
        gap: 1rem;
        margin-top: 1.5rem;
      }
      .submission {
        border: 1px solid var(--line);
        border-radius: 0.5rem;
        background: linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.018));
        padding: clamp(1rem, 3vw, 1.5rem);
      }
      .submission-header {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        border-bottom: 1px solid var(--line);
        padding-bottom: 1rem;
      }
      .submission-header span {
        color: var(--muted);
        font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      }
      dl {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
        gap: 1rem;
        margin: 1rem 0 0;
      }
      dt {
        color: var(--muted);
        font-size: 0.72rem;
        letter-spacing: 0.14em;
        text-transform: uppercase;
      }
      dd {
        overflow-wrap: anywhere;
        margin: 0.25rem 0 0;
        line-height: 1.55;
      }
      .message {
        margin-top: 1rem;
        border-top: 1px solid var(--line);
        padding-top: 1rem;
      }
      .message p:last-child {
        margin-top: 0.45rem;
        color: var(--muted);
        line-height: 1.7;
      }
      @media (max-width: 640px) {
        header {
          align-items: start;
          flex-direction: column;
        }
      }
    </style>
  </head>
  <body>
    <main>
      <header>
        <div>
          <p class="label">Secure admin</p>
          <h1>Project submissions</h1>
        </div>
        <form method="post" action="/admin">
          <input type="hidden" name="action" value="logout" />
          <button class="logout-button" type="submit">Log out</button>
        </form>
      </header>
      <section class="submissions">${content}</section>
    </main>
  </body>
</html>`;
}

function detailRow(label: string, value: string) {
  return `<div><dt>${escapeHtml(label)}</dt><dd>${value}</dd></div>`;
}

function formatWebsiteDetail(website: string | undefined) {
  if (!website) {
    return "Not provided";
  }

  const displayValue = escapeHtml(website);

  if (/\s/.test(website)) {
    return displayValue;
  }

  const href = /^https?:\/\//i.test(website) ? website : `https://${website}`;

  return `<a href="${escapeAttribute(href)}">${displayValue}</a>`;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value: string) {
  return escapeHtml(value).replaceAll("`", "&#096;");
}

function base64UrlEncodeString(value: string) {
  return base64UrlEncodeBytes(new TextEncoder().encode(value));
}

function base64UrlDecodeString(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));

  return new TextDecoder().decode(bytes);
}

function base64UrlEncodeBytes(bytes: Uint8Array) {
  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/Los_Angeles",
  }).format(date);
}

function timingSafeEqual(left: string, right: string) {
  const encoder = new TextEncoder();
  const leftBytes = encoder.encode(left);
  const rightBytes = encoder.encode(right);
  const length = Math.max(leftBytes.length, rightBytes.length);
  let diff = leftBytes.length ^ rightBytes.length;

  for (let index = 0; index < length; index += 1) {
    diff |= (leftBytes[index] ?? 0) ^ (rightBytes[index] ?? 0);
  }

  return diff === 0;
}
