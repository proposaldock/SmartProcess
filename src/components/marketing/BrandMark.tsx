import Link from "next/link";

export function BrandMark() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="relative grid size-11 place-items-center overflow-hidden rounded-2xl border border-[color:var(--border)] bg-white shadow-[0_18px_38px_-24px_rgba(23,19,18,0.45)]">
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(190,47,36,0.22),transparent_62%)]"
        />
        <span
          aria-hidden="true"
          className="absolute left-2 top-2 size-3 rounded-full bg-[var(--accent)]"
        />
        <span
          aria-hidden="true"
          className="absolute bottom-2 right-2 size-4 rounded-full border border-[color:var(--border)] bg-[rgba(190,47,36,0.1)]"
        />
        <span
          aria-hidden="true"
          className="relative block h-5 w-5 rounded-full border-2 border-[var(--foreground)]"
        />
      </div>
      <div>
        <div className="text-base font-semibold tracking-tight text-[var(--foreground)]">
          SmartProcess
        </div>
        <div className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
          AI Workflow Systems
        </div>
      </div>
    </Link>
  );
}
