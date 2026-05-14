import { BrandMark } from "@/components/marketing/BrandMark";
import { ContactForm } from "@/components/marketing/ContactForm";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import { HeroTransformPanel } from "@/components/marketing/HeroTransformPanel";
import { AnchorButton } from "@/components/marketing/MarketingPrimitives";
import { ProposalDockPanel } from "@/components/marketing/ProposalDockPanel";

const directEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ||
  process.env.CONTACT_TO_EMAIL ||
  "marcus@smartprocess.se";

const navItems = [
  { href: "#tjanster", label: "Tjänster" },
  { href: "#process", label: "Process" },
  { href: "#exempel", label: "Exempel" },
  { href: "#om", label: "Om SmartProcess" },
];

const problemPoints = [
  {
    title: "AI-verktyg testas utan tydlig plan",
    body: "Företag experimenterar med verktyg men saknar en strategi för vad som ska uppnås och hur det mäts.",
  },
  {
    title: "Interna processer förblir manuella",
    body: "Trots AI-trend läggs timmarna fortfarande på uppgifter som borde kunna automatiseras — varje dag.",
  },
  {
    title: "Lösningar används inte av teamet",
    body: "Verktyg som köps in passar sällan verksamhetens faktiska arbetsflöden och hamnar på hyllan.",
  },
  {
    title: "Svårt att veta vad som ska prioriteras",
    body: "Med hundratals AI-verktyg på marknaden är det oklart var man ska börja och vad som faktiskt ger affärsvärde.",
  },
  {
    title: "Teknik utan koppling till affärsvärde",
    body: "Lösningar skapas utan tydlig koppling till vilka problem de löser, vad de sparar eller hur de ska mätas.",
  },
];

const solutionPillars = [
  {
    title: "Strategisk tydlighet",
    body: "Vi börjar alltid med vad ni vill uppnå affärsmässigt. Resultatet är en prioriterad AI-roadmap med tydlig koppling till nytta — inte en lista med verktyg.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
      </svg>
    ),
  },
  {
    title: "Teknisk implementation",
    body: "Vi bygger anpassade AI-lösningar, interna verktyg och integrationer som passar era faktiska processer och befintliga system — från grunden.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l5.654-4.654m5.614-4.615-.814 2.105a.75.75 0 0 0 .175.829l.165.164a.75.75 0 0 0 .829.175l2.105-.814m0 0a2.25 2.25 0 0 0-2.652-2.651l-.894 2.241" />
      </svg>
    ),
  },
  {
    title: "Löpande förbättring",
    body: "AI är inte ett engångsprojekt. Vi följer upp, justerar och vidareutvecklar lösningarna baserat på hur de faktiskt används i teamet — och vad nästa steg borde vara.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
  },
];

const processSteps = [
  {
    step: "01",
    phase: "Audit",
    title: "Kartläggning & Roadmap",
    body: "Vi analyserar era arbetsflöden, flaskhalsar och manuella processer och identifierar var AI skapar mest värde. Resultatet är en prioriterad roadmap med tydlig koppling till affärsnytta — utan gissningar.",
    deliverables: ["Processanalys", "Prioriterad roadmap", "Affärskoppling"],
  },
  {
    step: "02",
    phase: "Build",
    title: "Byggnation & Implementation",
    body: "Vi bygger anpassade AI-lösningar, interna verktyg och integrationer baserade på era faktiska processer. Teamet tränas och lösningarna integreras smidigt i den dagliga verksamheten.",
    deliverables: ["Anpassad AI-lösning", "Systemintegration", "Teamträning"],
  },
  {
    step: "03",
    phase: "Optimize",
    title: "Optimering & Partnerskap",
    body: "Vi fortsätter förbättra lösningarna baserat på faktisk användning, feedback och nya behov. AI är inte ett engångsprojekt — det är ett löpande partnerskap som växer med er verksamhet.",
    deliverables: ["Löpande förbättring", "Ny kapacitet", "Strategisk partner"],
  },
];

const useCaseTiers = [
  {
    label: "Små projekt",
    timeframe: "1–3 veckor",
    description: "Snabba vinster med hög ROI och kort implementationstid.",
    items: [
      {
        title: "AI-assisterad mejlhantering",
        body: "Klassificering, prioritering och automatiska svar på inkommande mejl.",
      },
      {
        title: "Automatiserade sammanfattningar",
        body: "Mötesprotokoll, rapportsammanfattningar och nyhetsbrev genereras automatiskt.",
      },
      {
        title: "Enkel dokumentanalys",
        body: "Läser, tolkar och kategoriserar avtal, offerter och bilagor automatiskt.",
      },
      {
        title: "Automatiserad rapportering",
        body: "Rapporter och sammanställningar som genereras automatiskt från era datakällor.",
      },
    ],
  },
  {
    label: "Mellanstora projekt",
    timeframe: "3–6 veckor",
    description: "Djupare automationer med systemkopplingar och anpassad logik.",
    items: [
      {
        title: "Kundsupportflöden",
        body: "Automatiserade svar, kategorisering och routing av inkommande ärenden.",
      },
      {
        title: "CRM- och säljautomation",
        body: "Automatiserar uppföljning, kategorisering och registrering i CRM-system.",
      },
      {
        title: "Offert- och kravanalys",
        body: "Identifierar krav, risker och viktiga punkter i RFP-underlag och offerter.",
      },
      {
        title: "Interna dashboards",
        body: "Sammanställer data från flera källor och ger teamet rätt beslutsunderlag.",
      },
    ],
  },
  {
    label: "Större projekt",
    timeframe: "6–12 veckor",
    description: "Skräddarsydda AI-system och djupgående integrationer.",
    items: [
      {
        title: "Processspecifika AI-verktyg",
        body: "Anpassade lösningar byggda exakt efter era arbetsflöden och specifika behov.",
      },
      {
        title: "Systemintegrationer",
        body: "Kopplar ihop era befintliga system och eliminerar manuell dataöverföring.",
      },
      {
        title: "Interna AI-agenter",
        body: "Autonoma agenter som hanterar komplexa arbetsflöden baserat på era regler.",
      },
      {
        title: "End-to-end automatiseringsplattformar",
        body: "Fullständiga lösningar som täcker hela processer från input till leverans.",
      },
    ],
  },
];

const whyPoints = [
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

const targetTypes = [
  "Tjänsteföretag",
  "Byråer och konsultbolag",
  "E-handel och butiker",
  "Lokala serviceföretag",
  "Administrativa verksamheter",
  "Företag med mycket mejl, dokument eller rapportering",
];

const faqItems = [
  {
    question: "Vad innebär en AI-kartläggning?",
    answer:
      "En AI-kartläggning är ett strukturerat genomgång av era arbetsflöden, processer och system för att identifiera var AI kan skapa mest värde. Resultatet är en prioriterad roadmap med konkreta rekommendationer och tydlig koppling till affärsmål.",
  },
  {
    question: "Behöver vi vara tekniska för att arbeta med er?",
    answer:
      "Nej. Ni bidrar med kunskap om era processer och mål — vi sköter det tekniska. Vår uppgift är att göra AI enkelt, konkret och användbart för er verksamhet.",
  },
  {
    question: "Hur lång tid tar det att få en fungerande lösning?",
    answer:
      "Det beror på komplexiteten, men vi arbetar i snabba iterationer. Enklare lösningar kan levereras inom 2–4 veckor. Mer komplexa projekt tar typiskt 4–12 veckor. Vi sätter alltid tydliga förväntningar innan vi börjar.",
  },
  {
    question: "Vad kostar det?",
    answer:
      "Kostnaden varierar beroende på processens komplexitet och vilka system som ska integreras. Vi gör alltid en bedömning av potential och genomförbarhet innan vi sätter ett pris — utan dolda kostnader.",
  },
  {
    question: "Kan ni integrera med våra befintliga system?",
    answer:
      "Ja. Vi anpassar lösningarna till era befintliga system och arbetsflöden, oavsett om det handlar om e-post, CRM, dokumenthantering, affärssystem eller interna verktyg.",
  },
  {
    question: "Hur hanteras vår data?",
    answer:
      "Era data och processer hanteras konfidentiellt. Vi arbetar inom ramen för GDPR och delar aldrig er data med tredje part.",
  },
];

export default function HomePage() {
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
          <AnchorButton
            href="#kontakt"
            className="hidden sm:inline-flex"
            analyticsEvent="cta_click"
            analyticsLabel="header_booking"
          >
            Boka samtal
          </AnchorButton>
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
      <section className="relative bg-[radial-gradient(circle_at_0%_0%,rgba(190,47,36,0.11),transparent_55%),radial-gradient(circle_at_100%_0%,rgba(190,47,36,0.08),transparent_42%)]">
        <div className="mx-auto grid max-w-[104rem] gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-36">
          <div className="relative flex flex-col justify-center">
            <span className="inline-flex w-fit rounded-full border border-[rgba(190,47,36,0.16)] bg-[rgba(190,47,36,0.07)] px-4 py-2 text-sm font-semibold text-[var(--accent)]">
              AI Strategy & Development
            </span>
            <h1 className="mt-7 max-w-2xl text-balance text-[2.7rem] font-semibold leading-[1.02] tracking-tight text-[var(--foreground)] sm:text-5xl sm:leading-[1.0] lg:text-[3.5rem] xl:text-[4rem] xl:leading-[0.98]">
              AI-strategi och utveckling för{" "}
              <span className="text-[var(--accent)]">växande företag</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--muted)] sm:mt-7 sm:text-xl sm:leading-9">
              SmartProcess hjälper mindre företag gå från AI-förvirring till
              konkreta AI-lösningar som sparar tid, effektiviserar arbetsflöden
              och skapar mätbart värde.
            </p>
            <p className="mt-4 max-w-lg text-base leading-7 text-[var(--foreground)]">
              Strategi, implementation och löpande optimering — från idé till
              fungerande AI-lösning.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 sm:mt-10">
              <AnchorButton
                href="#kontakt"
                className="w-full sm:w-auto"
                analyticsEvent="cta_click"
                analyticsLabel="hero_primary"
              >
                Boka ett samtal
              </AnchorButton>
              <AnchorButton
                href="#process"
                variant="secondary"
                className="w-full sm:w-auto"
                analyticsEvent="cta_click"
                analyticsLabel="hero_secondary"
              >
                Se hur det fungerar
              </AnchorButton>
            </div>

            <ul className="mt-10 flex flex-wrap gap-2 border-t border-[color:var(--border)] pt-5 sm:mt-12 sm:pt-6">
              {[
                "Tydlig AI-strategi",
                "Anpassade lösningar",
                "Löpande partner",
                "10–50 anställda",
              ].map((item) => (
                <li key={item}>
                  <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-[var(--foreground)] shadow-[0_1px_4px_rgba(23,19,18,0.06)] backdrop-blur-sm">
                    <span className="block size-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative lg:pt-4">
            <HeroTransformPanel />
          </div>
        </div>
      </section>

      {/* ─── Problem ─── */}
      <section
        id="tjanster"
        className="border-b border-[color:var(--border)]"
      >
        <div className="mx-auto max-w-[104rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <div className="grid gap-16 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">

            {/* Left: heading */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                Problemet
              </p>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-[3.5rem] lg:leading-[1.0]">
                Många företag testar AI. Få får ut verkligt värde.
              </h2>
              <p className="mt-5 max-w-md text-base leading-8 text-[var(--muted)] sm:text-lg">
                Utan en tydlig strategi och rätt implementation fastnar de flesta i
                experiment, lösa verktyg och lösningar som inte skapar konkret affärsvärde.
              </p>
            </div>

            {/* Right: problem cards */}
            <div className="grid gap-3 sm:grid-cols-2">
              {problemPoints.map((item, index) => (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-[color:var(--border)] bg-white/70 p-5 shadow-[0_2px_12px_-6px_rgba(23,19,18,0.06)] transition-all duration-200 hover:border-[rgba(190,47,36,0.22)] hover:shadow-[0_4px_20px_-8px_rgba(190,47,36,0.10)]"
                >
                  <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-3 text-base font-semibold tracking-tight text-[var(--foreground)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Cost callout */}
          <div className="mt-10 rounded-2xl border border-[rgba(190,47,36,0.18)] bg-[rgba(190,47,36,0.05)] p-6 sm:mt-12 sm:px-8 sm:py-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
              Konkret besparing
            </p>
            <p className="mt-3 max-w-3xl text-lg font-semibold leading-7 text-[var(--foreground)] sm:text-xl sm:leading-8">
              En anställd som lägger 2 timmar om dagen på manuella
              rutinuppgifter arbetar bort ca 400 betalda timmar per år på
              uppgifter som kan automatiseras.
            </p>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
              Med fem anställda i samma situation är det 2 000 betalda timmar
              om året — tid ni betalar för men som inte skapar värde. Det
              motsvarar 500 000–1 000 000 kr i lönekostnader. En AI-lösning
              kostar en bråkdel och betalar sig ofta på 3–6 månader.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Solution pillars ─── */}
      <section className="mx-auto max-w-[104rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <div className="border-t border-[color:var(--border)] pt-12 sm:pt-16">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
            Lösningen
          </p>
          <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_1.6fr]">
            <h2 className="text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-[3.5rem] lg:leading-[1.0]">
              Från osäkerhet till fungerande AI-lösningar
            </h2>
            <p className="max-w-2xl self-end text-lg leading-8 text-[var(--muted)] sm:text-xl sm:leading-9">
              SmartProcess kombinerar strategi, utveckling och implementation
              för att identifiera var AI skapar mest värde, bygga lösningarna
              och hjälpa teamet använda dem i vardagen.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:mt-12 lg:grid-cols-3">
            {solutionPillars.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-2xl border border-[color:var(--border)] bg-white/70 p-6 shadow-[0_2px_16px_-6px_rgba(23,19,18,0.08)] sm:p-7"
              >
                <div className="flex size-11 items-center justify-center rounded-xl border border-[color:var(--border)] bg-white text-[var(--accent)] shadow-[0_2px_8px_-4px_rgba(23,19,18,0.1)]">
                  {pillar.icon}
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-[var(--foreground)]">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Process ─── */}
      <section
        id="process"
        className="border-b border-[color:var(--border)]"
      >
        <div className="mx-auto max-w-[104rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
            Process
          </p>
          <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
            <h2 className="text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-[3.5rem] lg:leading-[1.0]">
              En tydlig process från idé till värde
            </h2>
            <p className="max-w-2xl self-end text-base leading-8 text-[var(--muted)] sm:text-lg sm:leading-9">
              Från manuellt arbete till fungerande AI-lösning på veckor —
              inte månader. Vi håller processen tydlig, snabb och fokuserad
              på det som faktiskt skapar affärsvärde.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:mt-12 lg:grid-cols-3">
            {processSteps.map((step) => (
              <div
                key={step.step}
                className="relative rounded-2xl border border-[color:var(--border)] bg-white p-6 shadow-[0_4px_24px_-8px_rgba(23,19,18,0.09)] sm:p-8"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="text-5xl font-semibold leading-none tracking-tight text-[var(--accent)] opacity-30 sm:text-6xl">
                    {step.step}
                  </div>
                  <span className="rounded-full border border-[color:var(--border)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                    {step.phase}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-[var(--foreground)] sm:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                  {step.body}
                </p>
                <div className="mt-5 flex flex-wrap gap-2 border-t border-[color:var(--border)] pt-4">
                  {step.deliverables.map((d) => (
                    <span
                      key={d}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--border)] px-2.5 py-1 text-xs font-medium text-[var(--foreground)]"
                    >
                      <span className="block size-1 rounded-full bg-[var(--accent)]" />
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Example: ProposalDock ─── */}
      <section
        id="exempel"
        className="mx-auto max-w-[104rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28"
      >
        <div className="border-t border-[color:var(--border)] pt-12 sm:pt-16">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
            Exempel
          </p>
          <div className="mt-5 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-16">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-[3.25rem] lg:leading-[1.02]">
                Så här kan en AI-lösning se ut i praktiken
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-[var(--muted)] sm:text-lg">
                ProposalDock är ett verktyg vi byggt för RFP- och
                offertprocesser. Det analyserar upphandlingsunderlag,
                identifierar krav, risker och viktiga punkter samt
                hjälper teamet att bedöma täckningsgrad.
              </p>
              <ul className="mt-7 space-y-4">
                {[
                  "Från timmar av genomläsning till beslutsunderlag på minuter",
                  "Minskar risken att viktiga krav missas",
                  "Gör teamets roll mer granskande än manuellt sammanställande",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      className="mt-0.5 size-5 shrink-0 text-[var(--accent)]"
                    >
                      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
                      <path d="m6.5 10 2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-sm leading-6 text-[var(--foreground)]">{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <a
                  href="https://proposaldock.se"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-white px-5 py-2.5 text-sm font-semibold text-[var(--foreground)] shadow-[0_2px_8px_-4px_rgba(23,19,18,0.12)] transition-all hover:shadow-[0_4px_16px_-6px_rgba(23,19,18,0.16)]"
                >
                  Besök ProposalDock
                  <svg viewBox="0 0 16 16" fill="none" className="size-3.5" stroke="currentColor" strokeWidth="1.8">
                    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <ProposalDockPanel />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Use Cases Grid ─── */}
      <section
        id="anvandningsomraden"
        className="border-b border-[color:var(--border)]"
      >
        <div className="mx-auto max-w-[104rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          {/* Header */}
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                Användningsområden
              </p>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-[3rem] lg:leading-[1.04]">
                Exempel på AI-lösningar vi kan bygga
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--muted)]">
                Lösningarna varierar i komplexitet och scope beroende på era
                processer och var AI skapar mest värde för just er.
              </p>
            </div>
            <div className="shrink-0">
              <AnchorButton
                href="#kontakt"
                analyticsEvent="cta_click"
                analyticsLabel="usecases_cta"
              >
                Boka ett samtal
              </AnchorButton>
            </div>
          </div>

          {/* Tier columns */}
          <div className="mt-10 grid gap-4 sm:mt-12 lg:grid-cols-3">
            {useCaseTiers.map((tier) => (
              <div
                key={tier.label}
                className="rounded-2xl border border-[color:var(--border)] bg-white/80 p-5 shadow-[0_2px_12px_-6px_rgba(23,19,18,0.07)] sm:p-6"
              >
                {/* Tier header */}
                <div className="flex items-start justify-between gap-3 border-b border-[color:var(--border)] pb-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
                      {tier.label}
                    </p>
                    <p className="mt-1.5 text-xs leading-5 text-[var(--muted)]">
                      {tier.description}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full border border-[color:var(--border)] px-2.5 py-1 text-[10px] font-semibold text-[var(--muted)]">
                    {tier.timeframe}
                  </span>
                </div>
                {/* Items */}
                <div className="mt-4 space-y-2.5">
                  {tier.items.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-xl border border-[color:var(--border)] bg-white/70 p-4"
                    >
                      <h3 className="text-sm font-semibold tracking-tight text-[var(--foreground)]">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
                        {item.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why SmartProcess ─── */}
      <section id="om" className="mx-auto max-w-[104rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <div className="border-t border-[color:var(--border)] pt-12 sm:pt-16">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start lg:gap-20">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                Om SmartProcess
              </p>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-[3.25rem] lg:leading-[1.02]">
                Inte bara utveckling. Riktning, implementation och förbättring.
              </h2>
              <p className="mt-6 text-base leading-8 text-[var(--muted)] sm:text-lg">
                SmartProcess är en AI-partner för mindre och växande företag
                som vill använda AI praktiskt — inte bara prata om det.
              </p>
              <p className="mt-4 text-base leading-8 text-[var(--muted)]">
                Vi kombinerar strategiskt tänkande med konkret AI-utveckling
                och stannar kvar som partner genom hela resan.
              </p>

              {/* Target audience */}
              <div className="mt-8 rounded-2xl border border-[color:var(--border)] bg-white/60 p-5 shadow-[0_2px_12px_-6px_rgba(23,19,18,0.07)]">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                  Passar bra för
                </p>
                <ul className="mt-3 space-y-2">
                  {targetTypes.map((type) => (
                    <li key={type} className="flex items-center gap-2.5 text-sm text-[var(--foreground)]">
                      <span className="block size-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                      {type}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {whyPoints.map((point) => (
                <div
                  key={point.title}
                  className="rounded-2xl border border-[color:var(--border)] bg-white/60 p-5 shadow-[0_2px_10px_-4px_rgba(23,19,18,0.06)]"
                >
                  <div className="flex size-8 items-center justify-center rounded-lg bg-[rgba(190,47,36,0.08)]">
                    <svg viewBox="0 0 16 16" fill="none" className="size-4 text-[var(--accent)]" stroke="currentColor" strokeWidth="2">
                      <path d="m3 8 3 3 7-6" strokeLinecap="round" strokeLinejoin="round" />
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

      {/* ─── CTA Section ─── */}
      <section className="border-y border-[color:var(--border)] bg-[var(--foreground)]">
        <div className="mx-auto max-w-[104rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                Ta nästa steg
              </p>
              <h2 className="mt-5 max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[3.25rem] lg:leading-[1.04]">
                Vill du veta var AI kan skapa mest värde i ditt företag?
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-white/65 sm:text-lg">
                Boka ett samtal så identifierar vi vilka processer som kan
                effektiviseras, automatiseras eller förbättras med AI —
                anpassat efter just er verksamhet.
              </p>
            </div>
            <div className="lg:flex lg:justify-end">
              <div className="rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.06)] p-6 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                  Första samtalet
                </p>
                <p className="mt-2 text-base font-semibold text-white">
                  30 min genomgång av er situation
                </p>
                <p className="mt-2 text-sm leading-6 text-white/60">
                  Bedömning av potential, genomförbarhet och rätt nästa steg
                  — utan förpliktelser.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {["Potential", "Genomförbarhet", "Rätt lösningstyp"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-6">
                  <AnchorButton
                    href="#kontakt"
                    analyticsEvent="cta_click"
                    analyticsLabel="cta_section"
                  >
                    Boka ett samtal
                  </AnchorButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="mx-auto max-w-[104rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
              Vanliga frågor
            </p>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
              Frågor och svar
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--muted)]">
              Har du en fråga som inte finns med? Skriv till oss så svarar vi.
            </p>
          </div>
          <FaqAccordion items={faqItems} />
        </div>
      </section>

      {/* ─── Contact ─── */}
      <section
        id="kontakt"
        className="border-t border-[color:var(--border)] bg-[var(--foreground)]"
      >
        <div className="mx-auto max-w-[104rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                Kontakt
              </p>
              <h2 className="mt-5 max-w-lg text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[3.25rem] lg:leading-[1.04]">
                Redo att se hur AI kan hjälpa er verksamhet?
              </h2>
              <p className="mt-5 max-w-md text-base leading-8 text-white/65 sm:text-lg">
                Beskriv ett arbetsmoment som tar tid eller känns onödigt
                manuellt. En första bedömning visar om och hur det kan
                effektiviseras med AI.
              </p>
              <div className="mt-7 rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.06)] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                  Första samtalet
                </p>
                <p className="mt-2 text-sm leading-6 text-white/70">
                  30 min genomgång, bedömning av potential och förslag på nästa steg.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Potential", "Genomförbarhet", "Rätt lösningstyp"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/12 px-2.5 py-1 text-xs font-medium text-white/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <ContactForm directEmail={directEmail} />
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
              { href: "#tjanster", label: "Tjänster" },
              { href: "#process", label: "Process" },
              { href: "#exempel", label: "Exempel" },
              { href: "#om", label: "Om SmartProcess" },
              { href: "#kontakt", label: "Kontakt" },
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
        <AnchorButton
          href="#kontakt"
          className="w-full"
          analyticsEvent="cta_click"
          analyticsLabel="mobile_sticky"
        >
          Boka samtal
        </AnchorButton>
      </div>
    </main>
  );
}
