"use client";

import type {
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/googleAnalytics";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  analyticsEvent?: string;
  analyticsLabel?: string;
};

type ContactInputProps = {
  label: string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

type ContactTextareaProps = {
  label: string;
  textarea: true;
  className?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

function isTextareaField(
  props: ContactInputProps | ContactTextareaProps,
): props is ContactTextareaProps {
  return "textarea" in props && props.textarea === true;
}

export function AnchorButton({
  href,
  children,
  variant = "primary",
  className = "",
  analyticsEvent,
  analyticsLabel,
}: ButtonLinkProps) {
  const variants = {
    primary:
      "border border-[var(--accent)] bg-[var(--accent)] text-white shadow-[0_18px_38px_-24px_rgba(190,47,36,0.8)] hover:border-[var(--accent-strong)] hover:bg-[var(--accent-strong)]",
    secondary:
      "border border-[color:var(--border)] bg-white text-[var(--foreground)] hover:border-[rgba(190,47,36,0.35)] hover:bg-[rgba(190,47,36,0.04)]",
  };

  function handleClick() {
    if (!analyticsEvent) {
      return;
    }

    trackEvent(
      analyticsEvent,
      analyticsLabel ? { cta_label: analyticsLabel } : {},
    );
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold ${variants[variant]} ${className}`.trim()}
    >
      {children}
    </Link>
  );
}

export function ProblemCard({
  title,
  body,
  impact,
}: {
  title: string;
  body: string;
  impact: string;
}) {
  return (
    <article className="rounded-[28px] border border-[color:var(--border)] bg-white p-6 shadow-[0_30px_80px_-52px_rgba(23,19,18,0.45)]">
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-2xl bg-[rgba(190,47,36,0.08)] text-[var(--accent)]">
          <span className="block h-2 w-2 rounded-full bg-current" />
        </span>
        <h3 className="text-lg font-semibold tracking-tight text-[var(--foreground)]">
          {title}
        </h3>
      </div>
      <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{body}</p>
      <p className="mt-5 border-t border-[color:var(--border)] pt-4 text-sm font-medium text-[var(--foreground)]">
        {impact}
      </p>
    </article>
  );
}

export function ProcessStepCard({
  step,
  title,
  body,
}: {
  step: number;
  title: string;
  body: string;
}) {
  return (
    <li className="relative rounded-[28px] border border-[color:var(--border)] bg-white p-6 shadow-[0_30px_80px_-56px_rgba(23,19,18,0.42)]">
      <div className="flex items-center justify-between gap-4">
        <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
          Steg {step}
        </span>
        <span className="grid size-10 place-items-center rounded-full bg-[var(--foreground)] text-sm font-semibold text-white">
          {step}
        </span>
      </div>
      <h3 className="mt-8 text-xl font-semibold tracking-tight text-[var(--foreground)]">
        {title}
      </h3>
      <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{body}</p>
    </li>
  );
}

export function UseCaseCard({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <article className="group rounded-[26px] border border-[color:var(--border)] bg-white p-6 shadow-[0_24px_70px_-54px_rgba(23,19,18,0.38)] transition duration-200 hover:-translate-y-1 hover:border-[rgba(190,47,36,0.24)] hover:shadow-[0_32px_80px_-52px_rgba(23,19,18,0.42)]">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-2xl bg-[rgba(190,47,36,0.08)] text-[var(--accent)] transition duration-200 group-hover:bg-[rgba(190,47,36,0.12)]">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
          </span>
          <h3 className="text-lg font-semibold tracking-tight text-[var(--foreground)]">
            {title}
          </h3>
        </div>
        <span className="grid size-10 place-items-center rounded-2xl bg-[rgba(190,47,36,0.08)] text-[var(--accent)]">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M7 17 17 7" />
            <path d="M9 7h8v8" />
          </svg>
        </span>
      </div>
      <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{body}</p>
    </article>
  );
}

export function BenefitItem({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <li className="rounded-[24px] border border-[color:var(--border)] bg-white p-5 shadow-[0_24px_60px_-50px_rgba(23,19,18,0.36)]">
      <div className="flex items-start gap-4">
        <span className="mt-1 grid size-7 shrink-0 place-items-center rounded-full bg-[rgba(190,47,36,0.1)] text-[var(--accent)]">
          <svg
            viewBox="0 0 20 20"
            aria-hidden="true"
            className="size-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="m5 10 3 3 7-7" />
          </svg>
        </span>
        <div>
          <h3 className="text-base font-semibold text-[var(--foreground)]">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{body}</p>
        </div>
      </div>
    </li>
  );
}

export function ContactField(
  props: ContactInputProps | ContactTextareaProps,
) {
  const labelClassName =
    "text-[13px] font-semibold tracking-[0.01em] text-[var(--foreground)]";
  const fieldClassName =
    "mt-1.5 w-full rounded-[22px] border border-[color:var(--border)] bg-[rgba(255,255,255,0.92)] px-4 py-3 text-sm text-[var(--foreground)] outline-hidden placeholder:text-[rgba(100,87,82,0.72)] focus:border-[rgba(190,47,36,0.36)] focus:ring-4 focus:ring-[rgba(190,47,36,0.08)]";

  if (isTextareaField(props)) {
    const { label, className = "", textarea, ...rest } = props;
    void textarea;

    return (
      <label className={`block ${className}`.trim()}>
        <span className={labelClassName}>{label}</span>
        <textarea
          className={`${fieldClassName} min-h-[150px] resize-y`.trim()}
          {...rest}
        />
      </label>
    );
  }

  const { label, className = "", ...rest } = props;

  return (
    <label className={`block ${className}`.trim()}>
      <span className={labelClassName}>{label}</span>
      <input className={fieldClassName} {...rest} />
    </label>
  );
}
