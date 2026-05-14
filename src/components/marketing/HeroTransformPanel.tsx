export function HeroTransformPanel() {
  return (
    <div className="relative overflow-hidden rounded-[40px] border border-[color:var(--border)] bg-white/80 p-5 shadow-[0_20px_60px_-20px_rgba(23,19,18,0.12)] backdrop-blur-sm sm:p-7">
      {/* Outer header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
            AI Transformation Roadmap
          </p>
          <p className="mt-1.5 text-sm leading-5 text-[var(--muted)]">
            En tydlig väg från nuläge till fungerande AI-lösningar
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-[color:var(--border)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
          SmartProcess
        </span>
      </div>

      {/* Inner dark card */}
      <div className="mt-5 overflow-hidden rounded-[28px] bg-[var(--foreground)] p-5 sm:p-6">
        <div className="space-y-3">

          {/* Phase 01 — active */}
          <article className="rounded-[20px] border border-[rgba(190,47,36,0.28)] bg-[rgba(190,47,36,0.13)] p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">01</span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">Audit</span>
                </div>
                <h3 className="mt-2 text-sm font-semibold text-white sm:text-base">
                  Kartläggning & Roadmap
                </h3>
                <p className="mt-1 text-xs leading-5 text-white/65">
                  Analyserar era processer och identifierar var AI skapar mest värde
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-[var(--accent)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-white">
                Aktiv
              </span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-1.5">
              {["Processanalys", "AI-prioritering", "Roadmap"].map((tag) => (
                <div
                  key={tag}
                  className="rounded-xl border border-white/10 bg-[rgba(255,255,255,0.08)] px-2 py-2 text-center"
                >
                  <span className="text-[10px] font-medium leading-4 text-white/70">{tag}</span>
                </div>
              ))}
            </div>
          </article>

          {/* Phase 02 */}
          <article className="rounded-[20px] border border-white/8 bg-[rgba(255,255,255,0.06)] p-4 sm:p-5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/38">02</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/38">Build</span>
            </div>
            <h3 className="mt-2 text-sm font-semibold text-white/75">
              Byggnation & Implementation
            </h3>
            <p className="mt-1 text-xs leading-5 text-white/45">
              Bygger anpassade AI-lösningar och integrerar dem i era arbetsflöden
            </p>
          </article>

          {/* Phase 03 */}
          <article className="rounded-[20px] border border-white/8 bg-[rgba(255,255,255,0.06)] p-4 sm:p-5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/38">03</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/38">Optimize</span>
            </div>
            <h3 className="mt-2 text-sm font-semibold text-white/75">
              Optimering & Partnerskap
            </h3>
            <p className="mt-1 text-xs leading-5 text-white/45">
              Förbättrar lösningarna kontinuerligt baserat på användning och feedback
            </p>
          </article>
        </div>

        {/* Inner footer */}
        <div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-4">
          <span className="block size-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
          <p className="text-xs text-white/50">Anpassat för företag med 10–50 anställda</p>
        </div>
      </div>

      {/* Outer footer */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[color:var(--border)] pt-4">
        <p className="text-sm leading-6 text-[var(--muted)]">
          Strategi, implementation och löpande optimering — i ett partnerskap.
        </p>
        <div className="inline-flex items-center gap-2 text-sm font-medium text-[var(--foreground)]">
          <span className="block size-2 rounded-full bg-[var(--accent)]" />
          AI Transformation
        </div>
      </div>
    </div>
  );
}
