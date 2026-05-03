"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { trackEvent } from "@/lib/googleAnalytics";
import { ContactField } from "./MarketingPrimitives";

type FormStatus =
  | { type: "idle"; message: string }
  | { type: "submitting"; message: string }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

type ContactFormProps = {
  directEmail?: string;
};

const initialStatus: FormStatus = { type: "idle", message: "" };

export function ContactForm({ directEmail }: ContactFormProps) {
  const [status, setStatus] = useState<FormStatus>(initialStatus);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus({
      type: "submitting",
      message: "Skickar förfrågan...",
    });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json().catch(() => null)) as
        | { message?: string }
        | null;

      if (!response.ok) {
        setStatus({
          type: "error",
          message:
            payload?.message ?? "Det gick inte att skicka formuläret just nu.",
        });
        return;
      }

      form.reset();
      trackEvent("contact_form_submit", {
        form_name: "contact_form",
        form_location: "contact_section",
      });
      setStatus({
        type: "success",
        message: payload?.message ?? "Förfrågan mottagen.",
      });
    } catch {
      setStatus({
        type: "error",
        message: "Det gick inte att nå kontaktendpointen.",
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative z-10 rounded-[26px] border border-[color:var(--border)] bg-white p-4 shadow-[0_40px_110px_-70px_rgba(23,19,18,0.48)] sm:rounded-[30px] sm:p-6"
    >
      <div
        aria-hidden="true"
        className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
      >
        <label htmlFor="website">Lämna detta fält tomt</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <ContactField
          autoComplete="name"
          label="Namn"
          name="name"
          placeholder="För- och efternamn"
          required
        />
        <ContactField
          autoComplete="organization"
          label="Företag"
          name="company"
          placeholder="Företagsnamn"
          required
        />
        <ContactField
          autoComplete="email"
          label="E-post"
          name="email"
          placeholder="E-post"
          required
          type="email"
        />
        <ContactField
          label="Roll"
          name="role"
          placeholder="Exempel: COO, försäljning, operations"
        />
      </div>

      <ContactField
        className="mt-4"
        label="Beskriv process eller problem"
        name="process"
        placeholder="Beskriv gärna vilket moment som tar tid, vilka system som används och var flaskhalsen uppstår."
        required
        textarea
      />

      <div className="mt-5 flex flex-col items-start gap-2.5">
        <div className="flex flex-col items-start gap-2">
          <button
            type="submit"
            disabled={status.type === "submitting"}
            className="inline-flex w-full items-center justify-center rounded-full border border-[var(--accent)] bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_38px_-24px_rgba(190,47,36,0.8)] hover:border-[var(--accent-strong)] hover:bg-[var(--accent-strong)] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          >
            {status.type === "submitting" ? "Skickar..." : "Skicka förfrågan"}
          </button>
          <p className="text-xs text-[var(--muted)]">
            Tar 1–2 minuter. Ingen förberedelse behövs.
          </p>
          {directEmail ? (
            <a
              href={`mailto:${directEmail}`}
              className="text-xs font-medium text-[var(--foreground)] underline decoration-[rgba(190,47,36,0.32)] underline-offset-4 hover:text-[var(--accent)]"
            >
              Eller mejla direkt
            </a>
          ) : null}
        </div>
        <p
          aria-live="polite"
          className={`text-sm ${
            status.type === "error"
              ? "text-[var(--accent)]"
              : "text-[var(--muted)]"
          }`}
        >
          {status.message}
        </p>
      </div>
    </form>
  );
}
