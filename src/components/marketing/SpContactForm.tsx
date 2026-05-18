"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { trackEvent } from "@/lib/googleAnalytics";

function ArrowRightIcon() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={true}
    >
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

export function SpContactForm({ directEmail }: { directEmail?: string }) {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmitting(true);
    setErrorMsg("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: new FormData(form),
      });
      const payload = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;

      if (!response.ok) {
        setErrorMsg(
          payload?.message ?? "Det gick inte att skicka formuläret just nu.",
        );
        return;
      }

      form.reset();
      trackEvent("contact_form_submit", {
        form_name: "contact_form",
        form_location: "contact_section",
      });
      setSent(true);
      setTimeout(() => setSent(false), 5000);
    } catch {
      setErrorMsg("Det gick inte att nå kontaktendpointen.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="sp-form" onSubmit={handleSubmit}>
      {/* Honeypot */}
      <div
        aria-hidden={true}
        style={{ position: "absolute", left: "-9999px", top: "auto" }}
      >
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="row">
        <div className="field">
          <label htmlFor="sp-name">Namn</label>
          <input
            id="sp-name"
            type="text"
            name="name"
            placeholder="För- och efternamn"
            required
            autoComplete="name"
          />
        </div>
        <div className="field">
          <label htmlFor="sp-company">Företag</label>
          <input
            id="sp-company"
            type="text"
            name="company"
            placeholder="Företagsnamn"
            required
            autoComplete="organization"
          />
        </div>
      </div>

      <div className="row">
        <div className="field">
          <label htmlFor="sp-email">E-post</label>
          <input
            id="sp-email"
            type="email"
            name="email"
            placeholder="namn@foretag.se"
            required
            autoComplete="email"
          />
        </div>
        <div className="field">
          <label htmlFor="sp-role">Roll</label>
          <input
            id="sp-role"
            type="text"
            name="role"
            placeholder="t.ex. VD, Operations"
            autoComplete="organization-title"
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="sp-process">Beskriv process eller problem</label>
        <textarea
          id="sp-process"
          name="process"
          placeholder="Beskriv gärna vilket moment som tar tid, vilka system som används och var flaskhalsen uppstår."
          required
        />
      </div>

      <button
        className="btn btn-primary"
        type="submit"
        disabled={submitting}
        style={{ marginTop: 4 }}
      >
        {submitting ? "Skickar..." : "Skicka förfrågan"}
        {!submitting && <ArrowRightIcon />}
      </button>

      {sent && (
        <div className="success">Tack! Vi återkommer inom 1 arbetsdag.</div>
      )}
      {errorMsg && (
        <div
          style={{
            color: "var(--sp-red)",
            fontSize: 13,
            fontWeight: 600,
            marginTop: 12,
          }}
        >
          {errorMsg}
        </div>
      )}

      <div className="fineprint">
        Tar 1–2 minuter. Ingen förberedelse behövs.
        <br />
        {directEmail && (
          <>
            <a
              href={`mailto:${directEmail}`}
              style={{
                color: "var(--sp-ink)",
                textDecoration: "underline",
                textUnderlineOffset: 3,
              }}
            >
              Eller mejla direkt
            </a>
            {" · "}
          </>
        )}
        Dina uppgifter används enbart för att besvara din förfrågan och delas
        inte med tredje part.
      </div>
    </form>
  );
}
