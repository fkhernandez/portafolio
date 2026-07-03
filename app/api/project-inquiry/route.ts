import { NextResponse } from "next/server";
import { logInquirySubmission } from "@/lib/inquiry-submissions";

type InquiryPayload = {
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

const requiredFields: Array<keyof InquiryPayload> = [
  "name",
  "email",
  "phone",
  "projectType",
  "budgetRange",
  "monthlySupport",
  "projectDetails",
];

export async function POST(request: Request) {
  let payload: InquiryPayload;

  try {
    payload = await readInquiryPayload(request);
  } catch (error) {
    console.error("Failed to read project inquiry payload", error);

    return NextResponse.json(
      {
        ok: false,
        message: "The inquiry could not be submitted. Please try again.",
      },
      { status: 400 },
    );
  }

  const missingFields = requiredFields.filter((field) => !payload[field]);
  const phoneDigitCount = phoneDigits(payload.phone).length;

  if (missingFields.length > 0 || !isValidEmail(payload.email) || phoneDigitCount !== 10) {
    return NextResponse.json(
      {
        ok: false,
        message: "Please complete the required inquiry fields with a valid 10-digit phone number.",
      },
      { status: 400 },
    );
  }

  const logResult = await logInquirySubmission(payload, request);

  if (!logResult.ok) {
    return NextResponse.json(
      {
        ok: false,
        message: "The inquiry could not be submitted. Please try again.",
      },
      { status: 503 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Thanks. Your project inquiry was received.",
  });
}

async function readInquiryPayload(request: Request): Promise<InquiryPayload> {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const json = (await request.json()) as Partial<InquiryPayload>;

    return normalizePayload(json);
  }

  const formData = await request.formData();

  return normalizePayload({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    business: formData.get("business"),
    website: formData.get("website"),
    projectType: formData.get("project_type"),
    budgetRange: formData.get("budget_range"),
    monthlySupport: formData.get("monthly_support"),
    projectDetails: formData.get("project_details"),
  });
}

function normalizePayload(payload: Partial<Record<keyof InquiryPayload, FormDataEntryValue | string | null>>) {
  const phone = field(payload.phone, 80);

  return {
    name: field(payload.name, 120),
    email: field(payload.email, 160),
    phone: formatPhone(phoneDigits(phone)),
    business: field(payload.business, 160),
    website: field(payload.website, 240),
    projectType: field(payload.projectType, 120),
    budgetRange: field(payload.budgetRange, 80),
    monthlySupport: field(payload.monthlySupport, 80),
    projectDetails: field(payload.projectDetails, 2200),
  };
}

function field(value: FormDataEntryValue | string | null | undefined, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function phoneDigits(phone: string) {
  return phone.replace(/\D/g, "");
}

function formatPhone(digits: string) {
  const cappedDigits = digits.slice(0, 16);

  if (cappedDigits.length <= 3) {
    return cappedDigits;
  }

  if (cappedDigits.length <= 6) {
    return `${cappedDigits.slice(0, 3)}-${cappedDigits.slice(3)}`;
  }

  return `${cappedDigits.slice(0, 3)}-${cappedDigits.slice(3, 6)}-${cappedDigits.slice(6)}`;
}
