export function HeroTransformPanel() {
  return (
    <div className="overflow-hidden rounded-[36px] bg-[linear-gradient(145deg,rgba(190,47,36,0.22)_0%,rgba(23,19,18,0.98)_45%,rgba(23,19,18,1)_100%)] bg-[var(--foreground)] p-6 shadow-[0_24px_64px_-20px_rgba(23,19,18,0.28)] sm:p-8">

      {/* Title */}
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/45">
        AI Transformation Roadmap
      </p>
      <p className="mt-2 text-sm leading-5 text-white/55">
        En tydlig väg från nuläge till fungerande AI-lösningar
      </p>

      {/* Phases */}
      <div className="mt-7 space-y-0">

        {/* Phase 01 */}
        <div className="py-5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">01</span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">Audit</span>
          </div>
          <h3 className="mt-2 text-base font-semibold tracking-tight text-white/90">
            Kartläggning & Roadmap
          </h3>
          <p className="mt-1.5 text-sm leading-6 text-white/52">
            Analyserar era processer och identifierar var AI skapar mest värde
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Processanalys", "Kundanskaffningsanalys", "Roadmap"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/6 px-2.5 py-1 text-[10px] font-medium text-white/55"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-white/[0.08]" />

        {/* Phase 02 */}
        <div className="py-5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">02</span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/48">Build</span>
          </div>
          <h3 className="mt-2 text-base font-semibold tracking-tight text-white/72">
            Byggnation & Implementation
          </h3>
          <p className="mt-1.5 text-sm leading-6 text-white/40">
            Bygger anpassade AI-lösningar och integrerar dem i era arbetsflöden
          </p>
        </div>

        <div className="border-t border-white/[0.06]" />

        {/* Phase 03 */}
        <div className="pb-2 pt-5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/25">03</span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">Optimize</span>
          </div>
          <h3 className="mt-2 text-base font-semibold tracking-tight text-white/55">
            Optimering & Partnerskap
          </h3>
          <p className="mt-1.5 text-sm leading-6 text-white/30">
            Förbättrar lösningarna kontinuerligt baserat på användning och feedback
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-5">
        <div className="flex items-center gap-2">
          <span className="block size-1.5 rounded-full bg-[var(--accent)]" />
          <span className="text-xs text-white/40">Anpassat för 10–50 anställda</span>
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/30">
          SmartProcess
        </span>
      </div>
    </div>
  );
}
