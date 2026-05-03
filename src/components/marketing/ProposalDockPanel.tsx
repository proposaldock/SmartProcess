const proposalMetrics = [
  { label: "Identifierade krav", value: "42" },
  { label: "Riskpunkter", value: "7" },
  { label: "Täckningsgrad", value: "84%" },
];

const findings = [
  {
    title: "Överblick direkt",
    body: "Krav, bilagor och viktiga svarsfält lyfts fram utan manuell genomläsning.",
  },
  {
    title: "Risker synliga tidigt",
    body: "Avvikelser, otydliga villkor och tidskritiska delar markeras innan arbetet går vidare.",
  },
  {
    title: "Täckning kan bedömas",
    body: "Team får snabb överblick över vad som redan täcks och vad som behöver kompletteras.",
  },
];

export function ProposalDockPanel() {
  return (
    <div className="rounded-[34px] border border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,241,236,0.96))] p-5 shadow-[0_40px_110px_-68px_rgba(23,19,18,0.46)] sm:rounded-[40px] sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[color:var(--border)] pb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
            Implementerad lösning
          </p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl">
            ProposalDock
          </h3>
          <p className="mt-4 max-w-md text-sm leading-7 text-[var(--muted)]">
            Ett verktyg utvecklat av SmartProcess för RFP-underlag, kravanalys
            och snabbare offertbedömning.
          </p>
        </div>
        <span className="rounded-full border border-[rgba(190,47,36,0.18)] bg-[rgba(190,47,36,0.08)] px-3 py-1 text-xs font-semibold text-[var(--accent)]">
          Utvecklad av SmartProcess
        </span>
      </div>

      <div className="mt-6 grid gap-0 border-b border-[color:var(--border)] pb-6 sm:grid-cols-3">
        {proposalMetrics.map((metric, index) => (
          <div
            key={metric.label}
            className={`${index > 0 ? "sm:border-l sm:border-[color:var(--border)] sm:pl-6" : ""} ${index < proposalMetrics.length - 1 ? "pb-5 sm:pb-0" : ""}`}
          >
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              {metric.label}
            </div>
            <div className="mt-3 text-3xl font-semibold tracking-tight text-[var(--foreground)]">
              {metric.value}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-[28px] bg-[var(--foreground)] p-5 text-white sm:rounded-[32px] sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.16em] text-white/54">
              RFP-underlag analyserat
            </div>
            <div className="mt-2 text-2xl font-semibold tracking-tight">
              Överblick på minuter
            </div>
          </div>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
            Klar för bedömning
          </span>
        </div>

        <div className="mt-6 space-y-5">
          {findings.map((item, index) => (
            <div
              key={item.title}
              className={index > 0 ? "border-t border-white/10 pt-5" : ""}
            >
              <div className="flex items-center justify-between gap-3">
                <h4 className="text-sm font-semibold">{item.title}</h4>
                <span className="text-xs font-medium text-white/54">
                  0{index + 1}
                </span>
              </div>
              <p className="mt-3 max-w-md text-sm leading-7 text-white/74">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
