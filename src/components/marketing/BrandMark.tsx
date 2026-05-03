import Image from "next/image";
import Link from "next/link";

export function BrandMark() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="relative size-11 overflow-hidden rounded-2xl border border-[rgba(104,74,65,0.12)] bg-white shadow-[0_18px_38px_-24px_rgba(23,19,18,0.45)]">
        <Image
          src="/icon.png"
          alt=""
          aria-hidden="true"
          fill
          sizes="44px"
          className="object-cover"
          priority
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
