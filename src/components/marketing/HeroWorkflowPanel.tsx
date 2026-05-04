const processingSteps = [
  {
    title: "Sortera och kategorisera manuellt",
  },
  {
    title: "Läsa igenom och tolka innehåll",
  },
  {
    title: "Sammanställa underlag",
  },
];

export function HeroWorkflowPanel() {
  return (
    <div className="relative overflow-hidden rounded-[40px] border border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,241,236,0.94))] p-5 shadow-[0_45px_120px_-68px_rgba(23,19,18,0.5)] sm:rounded-[46px] sm:p-7">
      <div
        aria-hidden="true"
        className="absolute -right-10 top-8 h-40 w-40 rounded-full bg-[rgba(190,47,36,0.12)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -left-10 bottom-8 h-36 w-36 rounded-full bg-[rgba(190,47,36,0.08)] blur-3xl"
      />

      <div className="relative rounded-[32px] bg-[var(--foreground)] p-5 text-white shadow-[0_34px_90px_-62px_rgba(23,19,18,0.58)] sm:rounded-[38px] sm:p-8">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(transparent_95%,rgba(255,255,255,0.04)_100%),linear-gradient(90deg,transparent_95%,rgba(255,255,255,0.04)_100%)] bg-[size:34px_34px] opacity-20"
        />

        <div className="relative flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/52">
              Så minskar manuellt arbete
            </p>
            <p className="mt-2 max-w-sm text-sm leading-6 text-white/70">
              Visar hur manuellt förarbete kan automatiseras innan teamet tar
              beslut.
            </p>
          </div>
          <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/56">
            Vanligt arbetsflöde
          </span>
        </div>

        <div className="relative mt-6 lg:hidden">
          <div
            aria-hidden="true"
            className="absolute bottom-5 left-3 top-5 w-px bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.22),rgba(255,255,255,0.08))]"
          />

          <div className="relative space-y-3">
            <article className="ml-7 rounded-[22px] border border-white/10 bg-[rgba(255,255,255,0.08)] p-3.5 shadow-[0_24px_60px_-46px_rgba(0,0,0,0.35)] backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/48">
                  01
                </span>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold tracking-tight text-white">
                    Inkommande arbete
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-white/70">
                    Dokument, mejl, ärenden och data från flera källor
                  </p>
                </div>
              </div>
            </article>

            <article className="ml-7 rounded-[24px] border border-[rgba(190,47,36,0.26)] bg-[linear-gradient(180deg,rgba(190,47,36,0.16),rgba(255,255,255,0.08))] p-3.5 shadow-[0_30px_90px_-50px_rgba(190,47,36,0.42)] backdrop-blur-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/52">
                Här läggs majoriteten av tiden idag
              </p>

              <div className="mt-3 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
                    02
                  </div>
                  <h3 className="mt-2 text-sm font-semibold tracking-tight text-white">
                    Arbetsmoment som tar tid
                  </h3>
                </div>
                <span className="shrink-0 rounded-full border border-[rgba(190,47,36,0.28)] bg-[rgba(190,47,36,0.18)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                  Automatiseras med AI
                </span>
              </div>

              <div className="mt-4 grid gap-2">
                {processingSteps.map((item, index) => (
                  <div
                    key={item.title}
                    className="rounded-[18px] border border-white/10 bg-[rgba(255,255,255,0.08)] px-3 py-2.5"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/42">
                        02.{index + 1}
                      </span>
                      <div className="min-w-0">
                        <h4 className="text-sm font-semibold tracking-tight text-white">
                          {item.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="ml-7 rounded-[22px] border border-white/10 bg-[rgba(255,255,255,0.08)] p-3.5 shadow-[0_24px_60px_-46px_rgba(0,0,0,0.35)] backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/48">
                  03
                </span>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold tracking-tight text-white">
                    Färdigt underlag för beslut
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-white/70">
                    Teamet kan agera direkt utan manuell förberedelse
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>

        <div className="relative mt-8 hidden lg:block 2xl:hidden">
          <div
            aria-hidden="true"
            className="absolute left-6 top-9 bottom-9 w-px bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.22),rgba(255,255,255,0.08))]"
          />

          <div className="relative space-y-4">
            <article className="ml-10 rounded-[26px] border border-white/10 bg-[rgba(255,255,255,0.08)] p-5 shadow-[0_24px_60px_-46px_rgba(0,0,0,0.35)] backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <span className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/48">
                  01
                </span>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold tracking-tight text-white">
                    Inkommande arbete
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/70">
                    Dokument, mejl, ärenden och data från flera källor
                  </p>
                </div>
              </div>
            </article>

            <article className="ml-10 rounded-[28px] border border-[rgba(190,47,36,0.26)] bg-[linear-gradient(180deg,rgba(190,47,36,0.16),rgba(255,255,255,0.08))] p-5 shadow-[0_30px_90px_-50px_rgba(190,47,36,0.42)] backdrop-blur-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/52">
                    Här läggs majoriteten av tiden idag
                  </p>
                  <div className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
                    02
                  </div>
                  <h3 className="mt-2 text-base font-semibold tracking-tight text-white">
                    Arbetsmoment som tar tid
                  </h3>
                </div>
                <span className="shrink-0 rounded-full border border-[rgba(190,47,36,0.28)] bg-[rgba(190,47,36,0.18)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                  Automatiseras med AI
                </span>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {processingSteps.map((item, index) => (
                  <div
                    key={item.title}
                    className="rounded-[22px] border border-white/10 bg-[rgba(255,255,255,0.08)] p-4"
                  >
                    <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
                      02.{index + 1}
                    </div>
                    <h4 className="mt-3 text-sm font-semibold tracking-tight text-white">
                      {item.title}
                    </h4>
                  </div>
                ))}
              </div>
            </article>

            <article className="ml-10 rounded-[26px] border border-white/10 bg-[rgba(255,255,255,0.08)] p-5 shadow-[0_24px_60px_-46px_rgba(0,0,0,0.35)] backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <span className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/48">
                  03
                </span>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold tracking-tight text-white">
                    Färdigt underlag för beslut
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/70">
                    Teamet kan agera direkt utan manuell förberedelse
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>

        <div className="relative mt-8 hidden overflow-x-auto pb-2 2xl:block">
          <div className="relative min-w-[74rem]">
            <div
              aria-hidden="true"
              className="absolute left-10 right-10 top-[7.2rem] h-px bg-[linear-gradient(90deg,rgba(255,255,255,0.08),rgba(255,255,255,0.22),rgba(255,255,255,0.08))]"
            />

            <div className="relative flex items-center gap-4">
              <article className="w-[17rem] shrink-0 rounded-[30px] border border-white/10 bg-[rgba(255,255,255,0.08)] p-5 shadow-[0_24px_60px_-46px_rgba(0,0,0,0.35)] backdrop-blur-sm">
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/52">
                  01
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-white">
                  Inkommande arbete
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/72">
                  Dokument, mejl, ärenden och data från flera källor
                </p>
              </article>

              <div className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/8 text-white/58">
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

              <article className="relative min-h-[15rem] min-w-0 flex-1 rounded-[32px] border border-[rgba(190,47,36,0.26)] bg-[linear-gradient(180deg,rgba(190,47,36,0.16),rgba(255,255,255,0.08))] p-5 shadow-[0_30px_90px_-50px_rgba(190,47,36,0.42)] backdrop-blur-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/52">
                  Här läggs majoriteten av tiden idag
                </p>

                <div className="mt-3 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/54">
                      02
                    </div>
                    <h3 className="mt-3 text-lg font-semibold tracking-tight text-white">
                      Arbetsmoment som tar tid
                    </h3>
                  </div>
                  <span className="rounded-full border border-[rgba(190,47,36,0.28)] bg-[rgba(190,47,36,0.18)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                    Automatiseras med AI
                  </span>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {processingSteps.map((item, index) => (
                    <div
                      key={item.title}
                      className="rounded-[24px] border border-white/10 bg-[rgba(255,255,255,0.08)] p-4"
                    >
                      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
                        02.{index + 1}
                      </div>
                      <h4 className="mt-3 text-sm font-semibold tracking-tight text-white">
                        {item.title}
                      </h4>
                    </div>
                  ))}
                </div>
              </article>

              <div className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/8 text-white/58">
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

              <article className="w-[17rem] shrink-0 rounded-[30px] border border-white/10 bg-[rgba(255,255,255,0.08)] p-5 shadow-[0_24px_60px_-46px_rgba(0,0,0,0.35)] backdrop-blur-sm">
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/52">
                  03
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-white">
                  Färdigt underlag för beslut
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/72">
                  Teamet kan agera direkt utan manuell förberedelse
                </p>
              </article>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[color:var(--border)] pt-4 sm:mt-5 sm:gap-4 sm:pt-5">
        <p className="text-sm leading-6 text-[var(--muted)]">
          Här syns exakt var tid försvinner i ett typiskt arbetsflöde — och
          vad som kan automatiseras.
        </p>
        <div className="inline-flex items-center gap-3 text-sm font-medium text-[var(--foreground)]">
          <span className="block size-2 rounded-full bg-[var(--accent)]" />
          AI workflow automation
        </div>
      </div>
    </div>
  );
}
