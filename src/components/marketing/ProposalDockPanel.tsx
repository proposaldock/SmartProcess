const workflowSteps = [
  {
    title: "Upload brief",
    body: "Ladda upp brief eller RFP.",
  },
  {
    title: "Review",
    body: "Granska struktur och krav.",
  },
  {
    title: "Draft",
    body: "Bygg första utkast.",
  },
  {
    title: "Export",
    body: "Ta vidare till offert eller leverans.",
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

      <div className="mt-6 rounded-[28px] bg-[var(--foreground)] p-5 text-white sm:rounded-[32px] sm:p-7">
        <div className="border-b border-white/10 pb-5">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.16em] text-white/54">
              ProposalDock workflow
            </div>
            <div className="mt-2 text-2xl font-semibold tracking-tight">
              Från brief till review, draft och export
            </div>
          </div>
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
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/54">
                      0{index + 1}
                    </div>
                    {index === 1 || index === 2 ? (
                      <span className="rounded-full border border-[rgba(190,47,36,0.28)] bg-[rgba(190,47,36,0.18)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                        AI
                      </span>
                    ) : null}
                  </div>
                  <h4 className="mt-3 text-base font-semibold tracking-tight text-white">
                    {step.title}
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-white/72">
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
                <p className="mt-2 text-sm leading-6 text-white/72">
                  {step.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
