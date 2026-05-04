const automationSteps = [
  {
    title: "Strukturering",
    body: "Information sorteras och kategoriseras automatiskt.",
  },
  {
    title: "Analys",
    body: "Relevant information och mönster identifieras.",
  },
  {
    title: "Sammanställning",
    body: "Underlag skapas och görs redo för nästa steg.",
  },
];

const resultBadges = [
  "Mindre manuellt arbete",
  "Kortare ledtider",
  "Färre fel",
  "Jämnare kvalitet",
];

function StepArrow() {
  return (
    <div className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-[rgba(23,19,18,0.1)] bg-white/80 text-[var(--muted)] shadow-[0_18px_40px_-34px_rgba(23,19,18,0.4)]">
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

export function HeroWorkflowPanel() {
  return (
    <div className="relative overflow-hidden rounded-[40px] border border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,241,236,0.95))] p-5 shadow-[0_45px_120px_-68px_rgba(23,19,18,0.5)] sm:rounded-[46px] sm:p-7">
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-[-10%] w-[48%] bg-[radial-gradient(circle_at_center,_rgba(190,47,36,0.12),transparent_62%)]"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-[-12%] left-[-6%] h-44 w-72 rounded-full border border-[rgba(190,47,36,0.08)]"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-[-19%] left-[2%] h-52 w-80 rounded-full border border-[rgba(190,47,36,0.06)]"
      />
      <div
        aria-hidden="true"
        className="absolute right-[-12%] top-[-22%] h-80 w-80 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.78),transparent_72%)]"
      />

      <div className="relative">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
              Så minskar manuellt arbete
            </p>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--muted)]">
              Ett typiskt workflow där AI tar över förarbete och gör nästa steg
              tydligare för teamet.
            </p>
          </div>
          <span className="rounded-full border border-[rgba(190,47,36,0.14)] bg-white/76 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--foreground)] shadow-[0_16px_32px_-28px_rgba(23,19,18,0.32)]">
            AI workflow automation
          </span>
        </div>

        <div className="mt-6 space-y-4 lg:hidden">
          <article className="rounded-[26px] border border-[rgba(23,19,18,0.08)] bg-white/84 p-4 shadow-[0_24px_60px_-42px_rgba(23,19,18,0.24)]">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
              01
            </div>
            <h3 className="mt-3 text-base font-semibold tracking-tight text-[var(--foreground)]">
              Inkommande information
            </h3>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              Dokument, mejl, ärenden och data från flera källor.
            </p>
          </article>

          <div className="flex justify-center">
            <StepArrow />
          </div>

          <article className="rounded-[30px] border border-[rgba(190,47,36,0.18)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,246,244,0.98))] p-4 shadow-[0_34px_90px_-56px_rgba(190,47,36,0.3)]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                  02
                </div>
                <h3 className="mt-2 text-base font-semibold tracking-tight text-[var(--foreground)]">
                  AI-automation
                </h3>
              </div>
              <span className="rounded-full border border-[rgba(190,47,36,0.14)] bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                Förarbete
              </span>
            </div>

            <div className="mt-4 grid gap-3">
              {automationSteps.map((step) => (
                <div
                  key={step.title}
                  className="rounded-[22px] border border-[rgba(23,19,18,0.07)] bg-white px-4 py-3 shadow-[0_18px_44px_-36px_rgba(23,19,18,0.18)]"
                >
                  <h4 className="text-sm font-semibold tracking-tight text-[var(--foreground)]">
                    {step.title}
                  </h4>
                  <p className="mt-1.5 text-sm leading-6 text-[var(--muted)]">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <div className="flex justify-center">
            <StepArrow />
          </div>

          <article className="rounded-[26px] border border-[rgba(23,19,18,0.08)] bg-white/84 p-4 shadow-[0_24px_60px_-42px_rgba(23,19,18,0.24)]">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
              03
            </div>
            <h3 className="mt-3 text-base font-semibold tracking-tight text-[var(--foreground)]">
              Beslut & åtgärd
            </h3>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              Teamet granskar underlaget, fattar beslut och driver arbetet
              framåt.
            </p>
          </article>
        </div>

        <div className="relative mt-8 hidden lg:block">
          <div className="grid grid-cols-[0.92fr_auto_1.7fr_auto_0.98fr] items-center gap-4">
            <article className="rounded-[30px] border border-[rgba(23,19,18,0.08)] bg-white/88 p-6 shadow-[0_28px_70px_-48px_rgba(23,19,18,0.24)]">
              <div className="inline-flex rounded-full border border-[rgba(23,19,18,0.08)] bg-[rgba(246,241,236,0.88)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                01
              </div>
              <div className="mt-5 grid size-11 place-items-center rounded-2xl border border-[rgba(23,19,18,0.1)] bg-white text-[var(--foreground)]">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="size-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path d="M7 3h7l5 5v13H7z" />
                  <path d="M14 3v6h6" />
                </svg>
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-[var(--foreground)]">
                Inkommande information
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                Dokument, mejl, ärenden och data från flera källor.
              </p>
            </article>

            <StepArrow />

            <article className="relative rounded-[34px] border border-[rgba(190,47,36,0.18)] bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(255,245,243,0.98))] p-6 shadow-[0_44px_110px_-62px_rgba(190,47,36,0.34)]">
              <div
                aria-hidden="true"
                className="absolute inset-x-[18%] bottom-[-16%] h-28 rounded-full bg-[rgba(190,47,36,0.16)] blur-3xl"
              />
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                <span className="rounded-full border border-[rgba(190,47,36,0.16)] bg-[rgba(255,255,255,0.94)] px-5 py-2 text-sm font-semibold text-[var(--accent)] shadow-[0_24px_60px_-36px_rgba(190,47,36,0.42)]">
                  AI-automation
                </span>
              </div>

              <div className="relative flex items-end justify-between gap-6">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                    02
                  </div>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-[var(--foreground)]">
                    Bearbetning av information
                  </h3>
                </div>
                <p className="max-w-xs text-right text-sm leading-6 text-[var(--muted)]">
                  AI tar över förarbetet och gör underlaget tydligare innan
                  beslut tas.
                </p>
              </div>

              <div className="relative mt-6 grid gap-4 xl:grid-cols-3">
                {automationSteps.map((step) => (
                  <div
                    key={step.title}
                    className="rounded-[28px] border border-[rgba(23,19,18,0.07)] bg-white px-5 py-6 shadow-[0_22px_54px_-40px_rgba(23,19,18,0.18)]"
                  >
                    <div className="grid size-9 place-items-center rounded-2xl border border-[rgba(190,47,36,0.14)] bg-[rgba(190,47,36,0.08)] text-[var(--accent)]">
                      <span className="block size-2 rounded-full bg-current" />
                    </div>
                    <h4 className="mt-5 text-lg font-semibold tracking-tight text-[var(--foreground)]">
                      {step.title}
                    </h4>
                    <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                      {step.body}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <StepArrow />

            <div className="relative">
              <div className="absolute -left-6 top-1/2 hidden -translate-y-1/2 xl:block">
                <div className="grid size-14 place-items-center rounded-[22px] border border-[rgba(190,47,36,0.28)] bg-white text-[var(--accent)] shadow-[0_28px_70px_-46px_rgba(190,47,36,0.34)]">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="size-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="m6 12 4 4 8-8" />
                  </svg>
                </div>
              </div>

              <article className="rounded-[30px] border border-[rgba(23,19,18,0.08)] bg-white/9 p-6 shadow-[0_28px_70px_-48px_rgba(23,19,18,0.24)] backdrop-blur-sm">
                <div className="flex justify-end">
                  <span className="rounded-full border border-[rgba(23,19,18,0.08)] bg-white px-3 py-1 text-[11px] font-semibold text-[var(--foreground)] shadow-[0_14px_36px_-30px_rgba(23,19,18,0.32)]">
                    Granskning
                  </span>
                </div>

                <div className="mt-8 rounded-[28px] border border-[rgba(23,19,18,0.08)] bg-white/88 p-5 shadow-[0_22px_54px_-38px_rgba(23,19,18,0.22)]">
                  <div className="grid size-10 place-items-center rounded-2xl border border-[rgba(190,47,36,0.14)] bg-[rgba(190,47,36,0.08)] text-[var(--accent)]">
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="size-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M4 16v4h16" />
                      <path d="M7 14V9" />
                      <path d="M12 14V6" />
                      <path d="M17 14V3" />
                    </svg>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight text-[var(--foreground)]">
                    Beslut & åtgärd
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                    Teamet fattar beslut och driver arbetet vidare med bättre
                    beslutsunderlag.
                  </p>
                </div>

                <div className="mt-6 flex justify-start">
                  <span className="rounded-full border border-[rgba(23,19,18,0.08)] bg-white px-3 py-1 text-[11px] font-semibold text-[var(--muted)] shadow-[0_14px_36px_-30px_rgba(23,19,18,0.32)]">
                    Arkivering
                  </span>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-6 border-t border-[color:var(--border)] pt-5">
        <div className="flex flex-wrap items-center gap-x-7 gap-y-3 text-sm font-medium text-[var(--foreground)]">
          {resultBadges.map((item, index) => (
            <div key={item} className="inline-flex items-center gap-3">
              <span className="grid size-7 place-items-center rounded-full border border-[rgba(190,47,36,0.14)] bg-white text-[var(--accent)]">
                <span className="block size-2 rounded-full bg-current" />
              </span>
              <span>{item}</span>
              {index < resultBadges.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="ml-1 hidden h-8 w-px bg-[rgba(104,74,65,0.18)] lg:block"
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
