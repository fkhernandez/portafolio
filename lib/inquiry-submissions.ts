import { getCloudflareContext } from "@opennextjs/cloudflare";

export type InquiryPayload = {
  name: string;
  email: string;
  phone: string;
  business?: string;
  website?: string;
  projectType: string;
  budgetRange: string;
  monthlySupport: string;
  projectDetails: string;
};

export type InquirySubmission = InquiryPayload & {
  id: number;
  createdAt: string;
  userAgent: string;
  ipAddress: string;
  referer: string;
};

type D1Statement<Result> = {
  bind: (...values: unknown[]) => {
    run: () => Promise<unknown>;
    all: <Row = Result>() => Promise<{ results?: Row[] }>;
  };
};

type PortfolioDb = {
  prepare: <Result = unknown>(query: string) => D1Statement<Result>;
};

type PortfolioEnv = CloudflareEnv & {
  PORTFOLIO_DB?: PortfolioDb;
};

type InquiryRow = {
  id: number;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  business: string | null;
  website: string | null;
  project_type: string;
  budget_range: string;
  monthly_support: string;
  project_details: string;
  user_agent: string | null;
  ip_address: string | null;
  referer: string | null;
};

export async function logInquirySubmission(payload: InquiryPayload, request: Request) {
  const db = await getPortfolioDb();

  if (!db) {
    return { ok: false, reason: "Submission database is not configured." };
  }

  const userAgent = request.headers.get("user-agent") ?? "";
  const ipAddress =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "";
  const referer = request.headers.get("referer") ?? "";

  try {
    await db
      .prepare(
        `INSERT INTO project_inquiries (
          name,
          email,
          phone,
          business,
          website,
          project_type,
          budget_range,
          monthly_support,
          project_details,
          user_agent,
          ip_address,
          referer
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .bind(
        payload.name,
        payload.email,
        payload.phone,
        payload.business || null,
        payload.website || null,
        payload.projectType,
        payload.budgetRange,
        payload.monthlySupport,
        payload.projectDetails,
        userAgent,
        ipAddress,
        referer,
      )
      .run();

    return { ok: true };
  } catch (error) {
    console.error("Failed to log project inquiry", error);

    return { ok: false, reason: "Submission could not be logged." };
  }
}

export async function listInquirySubmissions(limit = 100) {
  const db = await getPortfolioDb();

  if (!db) {
    return { ok: false, submissions: [], reason: "Submission database is not configured." };
  }

  const rows = await db
    .prepare<InquiryRow>(
      `SELECT
        id,
        created_at,
        name,
        email,
        phone,
        business,
        website,
        project_type,
        budget_range,
        monthly_support,
        project_details,
        user_agent,
        ip_address,
        referer
      FROM project_inquiries
      ORDER BY created_at DESC
      LIMIT ?`,
    )
    .bind(Math.min(Math.max(limit, 1), 250))
    .all<InquiryRow>();

  return {
    ok: true,
    submissions: (rows.results ?? []).map(mapInquiryRow),
  };
}

async function getPortfolioDb() {
  try {
    const { env } = await getCloudflareContext({ async: true });

    return (env as PortfolioEnv).PORTFOLIO_DB ?? null;
  } catch (error) {
    console.error("Failed to read Cloudflare D1 binding", error);

    return null;
  }
}

function mapInquiryRow(row: InquiryRow): InquirySubmission {
  return {
    id: row.id,
    createdAt: row.created_at,
    name: row.name,
    email: row.email,
    phone: row.phone,
    business: row.business ?? "",
    website: row.website ?? "",
    projectType: row.project_type,
    budgetRange: row.budget_range,
    monthlySupport: row.monthly_support,
    projectDetails: row.project_details,
    userAgent: row.user_agent ?? "",
    ipAddress: row.ip_address ?? "",
    referer: row.referer ?? "",
  };
}
