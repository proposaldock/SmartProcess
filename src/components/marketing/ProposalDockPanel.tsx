const proposalMetrics = [
  { label: "Identifierade krav", value: "42" },
  { label: "Riskpunkter", value: "7" },
  { label: "Täckningsgrad", value: "84%" },
];

const workflowSteps = [
  {
    title: "Upload brief",
    body: "RFP, brief eller underlag läggs in som startpunkt.",
  },
  {
    title: "Review",
    body: "Struktur, scope och viktiga krav blir tydliga tidigt i flödet.",
  },
  {
    title: "Draft",
    body: "Första utkast och beslutsunderlag byggs upp snabbare.",
  },
  {
    title: "Export",
    body: "Underlaget tas vidare till offertarbete, intern review eller leverans.",
  },
];

function WorkflowArrow() {
  return (
    <div className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white/58">
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="size-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M5 12h14" />
        <path d="m13 7 6 5-6 5" />
      </svg>
    </div>
  );
}

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
              ProposalDock workflow
            </div>
            <div className="mt-2 text-2xl font-semibold tracking-tight">
              Från brief till review, draft och export
            </div>
          </div>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
            AI i review & draft
          </span>
        </div>

        <div className="mt-6 rounded-[24px] border border-white/10 bg-white/4 p-4 sm:p-5">
          <div className="hidden items-center gap-3 xl:flex">
            {workflowSteps.map((step, index) => (
              <div key={step.title} className="contents">
                <article
                  className={`min-w-0 flex-1 rounded-[22px] border p-4 ${
                    index === 1 || index === 2
                      ? "border-[rgba(190,47,36,0.28)] bg-[rgba(190,47,36,0.12)]"
                      : "border-white/10 bg-white/6"
                  }`}
                >
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/54">
                    0{index + 1}
                  </div>
                  <h4 className="mt-3 text-base font-semibold tracking-tight text-white">
                    {step.title}
                  </h4>
                  <p className="mt-3 text-sm leading-6 text-white/72">
                    {step.body}
                  </p>
                </article>

                {index < workflowSteps.length - 1 ? <WorkflowArrow /> : null}
              </div>
            ))}
          </div>

          <div className="grid gap-3 xl:hidden">
            {workflowSteps.map((step, index) => (
              <article
                key={step.title}
                className={`rounded-[22px] border p-4 ${
                  index === 1 || index === 2
                    ? "border-[rgba(190,47,36,0.28)] bg-[rgba(190,47,36,0.12)]"
                    : "border-white/10 bg-white/6"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/54">
                      0{index + 1}
                    </div>
                    <h4 className="mt-3 text-base font-semibold tracking-tight text-white">
                      {step.title}
                    </h4>
                  </div>
                  {index === 1 || index === 2 ? (
                    <span className="rounded-full border border-[rgba(190,47,36,0.28)] bg-[rgba(190,47,36,0.18)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                      AI
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 text-sm leading-6 text-white/72">
                  {step.body}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-4 rounded-[20px] border border-[rgba(190,47,36,0.22)] bg-[rgba(190,47,36,0.1)] px-4 py-3">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/56">
              Där AI kommer in
            </div>
            <p className="mt-2 text-sm leading-6 text-white/78">
              Mellan <span className="font-semibold text-white">Review</span> och{" "}
              <span className="font-semibold text-white">Draft</span> analyserar
              ProposalDock underlaget, lyfter krav och bygger ett tydligare
              beslutsunderlag.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
