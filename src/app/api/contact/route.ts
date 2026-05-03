import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const submissionAttempts = new Map<
  string,
  { count: number; resetAt: number }
>();

function getStringValue(
  formData: FormData,
  key: string,
  maxLength: number,
) {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    switch (character) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return character;
    }
  });
}

function getMailConfig() {
  const host = process.env.SMTP_HOST?.trim();
  const portValue = process.env.SMTP_PORT?.trim();
  const user = process.env.SMTP_USER?.trim();
  const password = process.env.SMTP_PASSWORD?.trim();
  const toEmail = process.env.CONTACT_TO_EMAIL?.trim();
  const fromEmail = process.env.CONTACT_FROM_EMAIL?.trim();
  const fromName = process.env.CONTACT_FROM_NAME?.trim() || "SmartProcess";

  if (!host || !portValue || !user || !password || !toEmail || !fromEmail) {
    return null;
  }

  const port = Number.parseInt(portValue, 10);

  if (!Number.isFinite(port)) {
    return null;
  }

  const secure = process.env.SMTP_SECURE
    ? process.env.SMTP_SECURE.toLowerCase() === "true"
    : port === 465;

  return {
    host,
    port,
    secure,
    user,
    password,
    toEmail,
    fromEmail,
    fromName,
  };
}

function formatSubmittedAt() {
  return new Intl.DateTimeFormat("sv-SE", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Stockholm",
  }).format(new Date());
}

function buildTextBody(
  payload: {
    name: string;
    company: string;
    email: string;
    role: string;
    process: string;
  },
  submittedAt: string,
) {
  return [
    "Ny kontaktförfrågan via SmartProcess",
    "",
    `Tidpunkt: ${submittedAt}`,
    `Namn: ${payload.name}`,
    `Företag: ${payload.company}`,
    `E-post: ${payload.email}`,
    `Roll: ${payload.role || "Ej angiven"}`,
    "",
    "Process eller problem:",
    payload.process,
  ].join("\n");
}

function buildHtmlBody(
  payload: {
    name: string;
    company: string;
    email: string;
    role: string;
    process: string;
  },
  submittedAt: string,
) {
  return `
    <div style="font-family:Arial,sans-serif;color:#171312;line-height:1.6">
      <h1 style="font-size:20px;margin:0 0 16px">Ny kontaktförfrågan via SmartProcess</h1>
      <p style="margin:0 0 24px;color:#655752">Tidpunkt: ${escapeHtml(submittedAt)}</p>
      <table style="border-collapse:collapse;width:100%;max-width:720px">
        <tbody>
          <tr>
            <td style="padding:10px 0;border-top:1px solid #e6ddd7;font-weight:700;width:160px">Namn</td>
            <td style="padding:10px 0;border-top:1px solid #e6ddd7">${escapeHtml(payload.name)}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-top:1px solid #e6ddd7;font-weight:700">Företag</td>
            <td style="padding:10px 0;border-top:1px solid #e6ddd7">${escapeHtml(payload.company)}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-top:1px solid #e6ddd7;font-weight:700">E-post</td>
            <td style="padding:10px 0;border-top:1px solid #e6ddd7">${escapeHtml(payload.email)}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-top:1px solid #e6ddd7;font-weight:700">Roll</td>
            <td style="padding:10px 0;border-top:1px solid #e6ddd7">${escapeHtml(payload.role || "Ej angiven")}</td>
          </tr>
        </tbody>
      </table>
      <div style="margin-top:24px">
        <div style="font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#be2f24">Process eller problem</div>
        <div style="margin-top:10px;padding:16px 18px;border:1px solid #e6ddd7;border-radius:16px;background:#faf7f4;white-space:pre-wrap">${escapeHtml(payload.process)}</div>
      </div>
    </div>
  `;
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function getRateLimitState(ip: string) {
  const now = Date.now();

  for (const [key, value] of submissionAttempts) {
    if (value.resetAt <= now) {
      submissionAttempts.delete(key);
    }
  }

  const currentEntry = submissionAttempts.get(ip);

  if (!currentEntry) {
    const nextEntry = {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    };

    submissionAttempts.set(ip, nextEntry);

    return {
      blocked: false,
      remaining: RATE_LIMIT_MAX_REQUESTS - nextEntry.count,
    };
  }

  if (currentEntry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      blocked: true,
      retryAfterSeconds: Math.max(
        1,
        Math.ceil((currentEntry.resetAt - now) / 1000),
      ),
    };
  }

  currentEntry.count += 1;

  return {
    blocked: false,
    remaining: RATE_LIMIT_MAX_REQUESTS - currentEntry.count,
  };
}

export async function POST(request: Request) {
  const rateLimit = getRateLimitState(getClientIp(request));

  if (rateLimit.blocked) {
    return NextResponse.json(
      {
        message:
          "För många försök på kort tid. Vänta en stund och försök igen.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfterSeconds),
        },
      },
    );
  }

  const formData = await request.formData();
  const honeypot = getStringValue(formData, "website", 200);

  if (honeypot) {
    return NextResponse.json({
      ok: true,
      message: "Förfrågan mottagen.",
    });
  }

  const payload = {
    name: getStringValue(formData, "name", 120),
    company: getStringValue(formData, "company", 160),
    email: getStringValue(formData, "email", 160),
    role: getStringValue(formData, "role", 120),
    process: getStringValue(formData, "process", 3000),
  };

  if (!payload.name || !payload.company || !payload.email || !payload.process) {
    return NextResponse.json(
      {
        message:
          "Fyll i namn, företag, e-post och beskrivning av processen.",
      },
      { status: 400 },
    );
  }

  if (!emailPattern.test(payload.email)) {
    return NextResponse.json(
      { message: "Ange en giltig e-postadress." },
      { status: 400 },
    );
  }

  const mailConfig = getMailConfig();

  if (!mailConfig) {
    return NextResponse.json(
      {
        message:
          "Kontaktformuläret är inte färdigkonfigurerat ännu. Lägg in SMTP-uppgifterna och försök igen.",
      },
      { status: 503 },
    );
  }

  const transporter = nodemailer.createTransport({
    host: mailConfig.host,
    port: mailConfig.port,
    secure: mailConfig.secure,
    auth: {
      user: mailConfig.user,
      pass: mailConfig.password,
    },
  });

  const submittedAt = formatSubmittedAt();

  try {
    await transporter.sendMail({
      from: `${mailConfig.fromName} <${mailConfig.fromEmail}>`,
      to: mailConfig.toEmail,
      replyTo: payload.email,
      subject: `Ny kontaktförfrågan från ${payload.company} via SmartProcess`,
      text: buildTextBody(payload, submittedAt),
      html: buildHtmlBody(payload, submittedAt),
    });

    return NextResponse.json({
      ok: true,
      message: "Förfrågan mottagen. Svar brukar komma inom kort.",
    });
  } catch (error) {
    console.error("Contact form email failed", error);

    return NextResponse.json(
      {
        message:
          "Det gick inte att skicka förfrågan just nu. Försök igen eller mejla direkt.",
      },
      { status: 500 },
    );
  }
}
