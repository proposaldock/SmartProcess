import type { Metadata } from "next";
import { BrandMark } from "@/components/marketing/BrandMark";
import { AnchorButton } from "@/components/marketing/MarketingPrimitives";

export const metadata: Metadata = {
  title: "Om SmartProcess – AI Strategy & Development",
  description:
    "SmartProcess är en AI-partner för växande företag. Vi kombinerar strategisk riktning med konkret AI-utveckling och stannar kvar som partner genom hela resan.",
};

const navItems = [
  { href: "/", label: "Hem" },
  { href: "/#tjanster", label: "Tjänster" },
  { href: "/#exempel", label: "Exempel" },
  { href: "/om-oss", label: "Om oss" },
];

const values = [
  {
    title: "Affärsnytta före teknik",
    body: "Vi börjar alltid med vad ni vill uppnå — inte med vilken teknik som är trendig. Tekniken väljs för att lösa ett verkligt problem.",
  },
  {
    title: "Anpassat, inte standardiserat",
    body: "Inga standardpaket. Varje lösning byggs runt era faktiska processer, system och sätt att arbeta.",
  },
  {
    title: "Fokus på faktisk användning",
    body: "En lösning som inte används skapar inget värde. Vi hjälper teamet faktiskt börja och fortsätta använda det vi bygger.",
  },
  {
    title: "Löpande optimering",
    body: "Vi stannar kvar och förbättrar lösningarna baserat på feedback, nya behov och möjligheter som uppstår.",
  },
  {
    title: "Snabb och flexibel",
    body: "Vi passar företag som vill röra sig snabbt. Kort väg från idé till fungerande lösning — utan onödig byråkrati.",
  },
  {
    title: "Strategi och teknik i ett",
    body: "Ni behöver inte anlita flera parter. Vi kombinerar strategiskt tänkande med praktisk AI-utveckling under ett tak.",
  },
];

const approach = [
  {
    step: "01",
    phase: "Audit",
    title: "Kartläggning & Roadmap",
    body: "Vi analyserar era arbetsflöden, flaskhalsar och manuella processer och identifierar var AI skapar mest värde. Resultatet är en prioriterad roadmap med tydlig koppling till affärsnytta — utan gissningar.",
  },
  {
    step: "02",
    phase: "Build",
    title: "Byggnation & Implementation",
    body: "Vi bygger anpassade AI-lösningar, interna verktyg och integrationer baserade på era faktiska processer. Teamet tränas och lösningarna integreras smidigt i den dagliga verksamheten.",
  },
  {
    step: "03",
    phase: "Optimize",
    title: "Optimering & Partnerskap",
    body: "Vi fortsätter förbättra lösningarna baserat på faktisk användning, feedback och nya behov. AI är inte ett engångsprojekt — det är ett löpande partnerskap som växer med er verksamhet.",
  },
];

const targetTypes = [
  {
    label: "Tjänsteföretag",
    body: "Konsulter, revisorer, advokater och andra tjänstebaserade verksamheter med repetitiva administrativa processer.",
  },
  {
    label: "Byråer och konsultbolag",
    body: "Byråer som hanterar stora volymer dokument, kunderunderlag och rapportering dagligen.",
  },
  {
    label: "E-handel och butiker",
    body: "Verksamheter med hög ordervolym, kundsupport och produkthantering som kan effektiviseras kraftigt.",
  },
  {
    label: "Administrativa verksamheter",
    body: "Företag med tung administrativ börda — mejl, rapporter, fakturering och dokumenthantering.",
  },
];

export default function OmOssPage() {
  return (
    <main className="relative overflow-hidden pb-24 md:pb-0">

      {/* ─── Header ─── */}
      <header className="sticky top-0 z-50 border-b border-[color:var(--border)] bg-[rgba(246,241,236,0.92)] backdrop-blur-xl">
        <nav
          className="mx-auto flex max-w-[104rem] items-center justify-between gap-6 px-5 py-4 sm:px-8 lg:px-10"
          aria-label="Huvudnavigation"
        >
          <BrandMark />
          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
              >
                {item.label}
              </a>
            ))}
          </div>
          <a
            href="/#kontakt"
            className="hidden items-center justify-center rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_2px_12px_-4px_rgba(190,47,36,0.5)] transition-all hover:bg-[var(--accent-strong)] sm:inline-flex"
          >
            Boka samtal
          </a>
        </nav>
        {/* Mobile pill nav */}
        <div className="border-t border-[color:var(--border)] md:hidden">
          <div className="mx-auto flex max-w-[104rem] gap-2 overflow-x-auto px-5 py-3 sm:px-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="inline-flex shrink-0 items-center rounded-full border border-[color:var(--border)] bg-white px-3 py-2 text-sm font-medium text-[var(--foreground)] shadow-[0_8px_24px_-12px_rgba(23,19,18,0.2)]"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* ─── Hero ─── */}
      <section className="bg-[radial-gradient(circle_at_0%_0%,rgba(190,47,36,0.10),transparent_55%),radial-gradient(circle_at_100%_0%,rgba(190,47,36,0.07),transparent_42%)]">
        <div className="mx-auto max-w-[104rem] px-5 py-20 sm:px-8 sm:py-28 lg:px-10 lg:py-36">
          <span className="inline-flex w-fit rounded-full border border-[rgba(190,47,36,0.16)] bg-[rgba(190,47,36,0.07)] px-4 py-2 text-sm font-semibold text-[var(--accent)]">
            Om SmartProcess
          </span>
          <h1 className="mt-7 max-w-3xl text-balance text-[2.7rem] font-semibold leading-[1.02] tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-[3.5rem] lg:leading-[1.0]">
            AI-strategi och utveckling —{" "}
            <span className="text-[var(--accent)]">inte bara prat</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)] sm:text-xl sm:leading-9">
            SmartProcess är en AI-partner för mindre och växande företag som
            vill använda AI praktiskt. Vi kombinerar strategisk riktning med
            konkret byggnation och stannar kvar som partner genom hela resan.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 sm:mt-10">
            <a
              href="/#kontakt"
              className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white shadow-[0_2px_12px_-4px_rgba(190,47,36,0.5)] transition-all hover:bg-[var(--accent-strong)]"
            >
              Boka ett samtal
            </a>
            <a
              href="/#tjanster"
              className="inline-flex items-center justify-center rounded-full border border-[color:var(--border)] bg-white/70 px-6 py-3 text-sm font-semibold text-[var(--foreground)] shadow-[0_2px_8px_-4px_rgba(23,19,18,0.1)] backdrop-blur-sm transition-all hover:bg-white"
            >
              Se våra tjänster
            </a>
          </div>
        </div>
      </section>

      {/* ─── Mission ─── */}
      <section className="border-b border-[color:var(--border)]">
        <div className="mx-auto max-w-[104rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                Vår mission
              </p>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-[3rem] lg:leading-[1.04]">
                Från AI-förvirring till konkreta lösningar
              </h2>
              <p className="mt-6 text-base leading-8 text-[var(--muted)] sm:text-lg">
                Många företag vet att AI kan hjälpa dem — men inte var man
                börjar, vad som faktiskt skapar värde eller hur man går från
                idé till fungerande lösning.
              </p>
              <p className="mt-4 text-base leading-8 text-[var(--muted)]">
                Det är exakt det vi löser. Inte med generiska verktyg eller
                färdiga paket, utan genom att förstå er verksamhet och bygga
                något som faktiskt används.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:content-start">
              {[
                { num: "10–50", label: "Typisk företagsstorlek vi arbetar med" },
                { num: "3–12v", label: "Från idé till fungerande lösning" },
                { num: "3 faser", label: "Audit, Build och Optimize" },
                { num: "100%", label: "Anpassat efter era processer" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-[color:var(--border)] bg-white/70 p-5"
                >
                  <div className="text-2xl font-semibold tracking-tight text-[var(--accent)]">
                    {stat.num}
                  </div>
                  <div className="mt-1 text-sm leading-6 text-[var(--muted)]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Approach ─── */}
      <section className="border-b border-[color:var(--border)]">
        <div className="mx-auto max-w-[104rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
            Hur vi arbetar
          </p>
          <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
            <h2 className="text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-[3rem] lg:leading-[1.04]">
              En tydlig process från idé till värde
            </h2>
            <p className="max-w-2xl self-end text-base leading-8 text-[var(--muted)] sm:text-lg">
              Vi arbetar i tre faser som tar er från nuläge till fungerande
              AI-lösning — och fortsätter sedan som löpande partner.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:mt-12 lg:grid-cols-3">
            {approach.map((step) => (
              <div
                key={step.step}
                className="rounded-2xl border border-[color:var(--border)] bg-white/70 p-6 shadow-[0_2px_16px_-6px_rgba(23,19,18,0.08)] sm:p-8"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="text-5xl font-semibold leading-none tracking-tight text-[var(--accent)] opacity-25 sm:text-6xl">
                    {step.step}
                  </div>
                  <span className="rounded-full border border-[color:var(--border)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                    {step.phase}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-[var(--foreground)]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Values ─── */}
      <section className="border-b border-[color:var(--border)]">
        <div className="mx-auto max-w-[104rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-20">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                Vår filosofi
              </p>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-[3rem] lg:leading-[1.04]">
                Inte bara utveckling. Riktning, implementation och förbättring.
              </h2>
              <p className="mt-6 text-base leading-8 text-[var(--muted)]">
                Vi tror att tekniken alltid ska tjäna verksamheten — inte
                tvärtom. Det präglar allt vi gör, från första möte till
                löpande optimering.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {values.map((point) => (
                <div
                  key={point.title}
                  className="rounded-2xl border border-[color:var(--border)] bg-white/60 p-5 shadow-[0_2px_10px_-4px_rgba(23,19,18,0.06)]"
                >
                  <div className="flex size-8 items-center justify-center rounded-lg bg-[rgba(190,47,36,0.08)]">
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      className="size-4 text-[var(--accent)]"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        d="m3 8 3 3 7-6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-sm font-semibold tracking-tight text-[var(--foreground)]">
                    {point.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-[var(--muted)]">
                    {point.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Who we work with ─── */}
      <section className="border-b border-[color:var(--border)]">
        <div className="mx-auto max-w-[104rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
            Vi passar bra för
          </p>
          <h2 className="mt-5 max-w-2xl text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-[3rem] lg:leading-[1.04]">
            Växande företag med processer som kan effektiviseras
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--muted)]">
            Vi arbetar primärt med företag i spannet 10–50 anställda som har
            tydliga, repetitiva processer och vill frigöra tid för det som
            faktiskt kräver mänsklig kompetens.
          </p>
          <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
            {targetTypes.map((type) => (
              <div
                key={type.label}
                className="rounded-2xl border border-[color:var(--border)] bg-white/70 p-5 shadow-[0_2px_10px_-4px_rgba(23,19,18,0.06)]"
              >
                <div className="flex size-8 items-center justify-center rounded-lg border border-[color:var(--border)] bg-white">
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    className="size-4 text-[var(--accent)]"
                    stroke="currentColor"
                    strokeWidth="1.75"
                  >
                    <path
                      d="M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2Z"
                      strokeLinecap="round"
                    />
                    <path d="M8 5v3l2 2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="mt-4 text-sm font-semibold tracking-tight text-[var(--foreground)]">
                  {type.label}
                </h3>
                <p className="mt-1.5 text-xs leading-5 text-[var(--muted)]">
                  {type.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-[var(--foreground)]">
        <div className="mx-auto max-w-[104rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                Ta nästa steg
              </p>
              <h2 className="mt-5 max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[3.25rem] lg:leading-[1.04]">
                Vill du veta var AI kan skapa mest värde i ditt företag?
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-white/65 sm:text-lg">
                Boka ett samtal så går vi igenom er situation, identifierar var
                AI skapar mest värde och vad nästa konkreta steg är.
              </p>
            </div>
            <div className="lg:flex lg:justify-end">
              <a
                href="/#kontakt"
                className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-8 py-4 text-base font-semibold text-white shadow-[0_2px_16px_-4px_rgba(190,47,36,0.6)] transition-all hover:bg-[var(--accent-strong)]"
              >
                Boka ett samtal
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-[color:var(--border)] bg-[rgba(246,241,236,0.8)]">
        <div className="mx-auto flex max-w-[104rem] flex-wrap items-center justify-between gap-6 px-5 py-8 sm:px-8 lg:px-10">
          <div>
            <div className="text-sm font-semibold text-[var(--foreground)]">SmartProcess</div>
            <div className="mt-0.5 text-xs text-[var(--muted)]">AI-strategi och utveckling för växande företag</div>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {[
              { href: "/", label: "Hem" },
              { href: "/#tjanster", label: "Tjänster" },
              { href: "/#exempel", label: "Exempel" },
              { href: "/om-oss", label: "Om oss" },
              { href: "/#kontakt", label: "Kontakt" },
              { href: "/privacy", label: "Integritetspolicy" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </footer>

      {/* ─── Mobile sticky CTA ─── */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[color:var(--border)] bg-[rgba(246,241,236,0.96)] p-4 backdrop-blur-md md:hidden">
        <a
          href="/#kontakt"
          className="flex items-center justify-center rounded-full bg-[var(--accent)] py-3.5 text-sm font-semibold text-white"
        >
          Boka samtal
        </a>
      </div>
    </main>
  );
}
