import { BrandMark } from "@/components/marketing/BrandMark";
import { ContactForm } from "@/components/marketing/ContactForm";
import { HeroWorkflowPanel } from "@/components/marketing/HeroWorkflowPanel";
import { AnchorButton } from "@/components/marketing/MarketingPrimitives";
import { ProposalDockPanel } from "@/components/marketing/ProposalDockPanel";

const directEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ||
  process.env.CONTACT_TO_EMAIL ||
  "marcus@smartprocess.se";

const heroBenefits = [
  "Mindre manuellt arbete",
  "Kortare ledtider",
  "Färre fel",
  "Jämnare kvalitet",
];

const problemPoints = [
  {
    title: "Manuell inmatning, kontroll och uppföljning",
    body: "Återkommande inmatning, kontroll och uppföljning tar tid från arbete som skapar mer värde.",
  },
  {
    title: "Dokument som måste läsas igenom manuellt innan arbete kan börja",
    body: "PDF:er, underlag, bilagor och mejltrådar måste ofta tolkas manuellt innan nästa steg ens kan påbörjas.",
  },
  {
    title: "Repetitiva arbetsmoment",
    body: "Samma bedömningar, svar, sammanställningar och kontroller görs om och om igen i olika delar av verksamheten.",
  },
  {
    title: "Fragmenterade system och manuella överlämningar",
    body: "Information flyttas mellan e-post, kalkylark, CRM, interna verktyg och checklistor i stället för att finnas i ett sammanhållet flöde.",
  },
  {
    title: "Onödiga flaskhalsar i processen",
    body: "Viktiga steg fastnar hos en person eller ett team när arbetsflödet saknar tydligt stöd och struktur.",
  },
];

const processSteps = [
  {
    title: "Kartlägg workflow",
    body: "Nuvarande steg, handoffs, datakällor och manuella moment identifieras.",
  },
  {
    title: "Identifiera var arbete kan automatiseras",
    body: "Moment med hög repetition, stora dokumentmängder eller tydliga beslutspunkter väljs ut först.",
  },
  {
    title: "Bygg lösning",
    body: "Ett skräddarsytt verktyg byggs utifrån faktisk process och affärslogik.",
  },
  {
    title: "Integrera i verksamheten",
    body: "Lösningen kopplas till befintliga system, arbetsflöden och användare.",
  },
  {
    title: "Förbättra efter användning",
    body: "Träffsäkerhet, användning och nya behov följs upp över tid.",
  },
];

const caseProofPoints = [
  "Från timmar av genomläsning till beslutsunderlag på minuter",
  "Minskar risken att viktiga krav missas",
  "Gör teamets roll mer granskande än manuellt sammanställande",
];

const useCaseSections = [
  {
    eyebrow: "E-postautomation",
    title: "När team inte ska börja med att sortera och besvara mejl manuellt",
    body: "Inkommande mejl kan klassificeras, prioriteras och förberedas automatiskt så att rätt ärenden hamnar rätt och svar kan gå ut snabbare.",
    examples: [
      "Sortera inkommande mejl efter ämne, prioritet och ansvarigt team",
      "Föreslå svar utifrån tidigare dialog och rätt kontext",
      "Lyfta bara de mejl som kräver mänsklig bedömning",
    ],
    visualLabel: "E-post workflow",
    visualTitle: "Inkommande mejl hanterade",
    visualMeta:
      "Meddelanden sorteras, prioriteras och förbereds innan teamet tar över.",
    visualPill: "Automation aktiv",
    visualRows: [
      { label: "Sortering", value: "Prioritet satt" },
      { label: "Svarsförslag", value: "2 utkast klara" },
      { label: "Routing", value: "Rätt team valt" },
    ],
    visualFooter:
      "Mindre tid går till inbox-sortering och manuella svar.",
    dark: true,
  },
  {
    eyebrow: "Dokumentanalys",
    title: "När viktiga punkter gömmer sig i avtal, bilagor och underlag",
    body: "Dokumentanalys gör det möjligt att lyfta fram det som faktiskt är viktigt, minska tiden för manuell tolkning och ge ett tydligt underlag vidare i processen.",
    examples: [
      "Lyfta fram kritiska villkor och avvikelser snabbare",
      "Samla det viktigaste i ett tydligt underlag",
      "Förbereda nästa steg utan manuell tolkning",
    ],
    visualLabel: "Dokument",
    visualTitle: "Dokumentöversikt",
    visualMeta:
      "Avtal, bilagor och villkor strukturerade i ett tydligt underlag.",
    visualPill: "Dokumentvy",
    visualRows: [
      { label: "Avvikelser", value: "4 markerade" },
      { label: "Nyckelvillkor", value: "Sammanfattade" },
      { label: "Nästa steg", value: "Redo för granskning" },
    ],
    visualFooter: "Viktiga punkter syns utan manuell tolkning.",
    dark: false,
  },
  {
    eyebrow: "Skräddarsydd app & webb",
    title: "När standardsystem inte räcker för hur verksamheten faktiskt arbetar",
    body: "SmartProcess kan bygga en intern app, webbapp eller arbetsyta med AI-kopplingar som utgår från företagets processer, datakällor och sätt att fatta beslut.",
    examples: [
      "Samla arbetsflöden i ett gränssnitt som passar teamets faktiska arbete",
      "Koppla AI till dokument, data och interna rutiner",
      "Bygg stöd för analys, prioritering, utkast och beslut i samma lösning",
    ],
    visualLabel: "Anpassad app",
    visualTitle: "Företagsanpassad arbetsyta",
    visualMeta:
      "Ett webbaserat verktyg byggt runt process, data och AI-stöd.",
    visualPill: "Skräddarsydd lösning",
    visualRows: [
      { label: "Datakällor", value: "CRM / dokument / e-post" },
      { label: "AI-stöd", value: "Sök / analys / utkast" },
      { label: "Gränssnitt", value: "Byggt för teamet" },
    ],
    visualFooter:
      "Lösningen byggs runt hur verksamheten faktiskt arbetar.",
    dark: true,
  },
  {
    eyebrow: "Rapportering och intern administration",
    title: "När uppföljning och interna processer skapar onödigt dubbelarbete",
    body: "Återkommande sammanställningar, datakontroller och överlämningar mellan system kan automatiseras för att ge bättre tempo, färre fel och tydligare uppföljning.",
    examples: [
      "Generera rapporter från befintliga datakällor",
      "Minska manuella kontroller och överföringar",
      "Ge team tydligt beslutsunderlag istället för manuella sammanställningar",
    ],
    visualLabel: "Operations",
    visualTitle: "Operativ uppföljning",
    visualMeta:
      "Rapporter och kontroller byggs från befintliga datakällor.",
    visualPill: "Rapportflöde",
    visualRows: [
      { label: "Rapportstatus", value: "Uppdaterad idag" },
      { label: "Kontroller", value: "Automatiserade" },
      { label: "Underlag", value: "Klart för uppföljning" },
    ],
    visualFooter: "Mindre administration i återkommande arbetsflöden.",
    dark: false,
  },
];

const whyItems = [
  "AI används där den ersätter eller minskar manuellt arbete.",
  "Beslut och kvalitetssäkring ligger kvar hos teamet.",
  "Lösningar byggs runt faktiska processer och system, inte standardmallar.",
  "Formatet väljs efter workflow: webbapp, internt verktyg, SaaS eller integration.",
];

const relevantItems = [
  "Har mycket dokument som måste läsas igenom manuellt",
  "Lägger tid på att sammanställa information från flera källor",
  "Upprepar samma administrativa moment varje vecka",
  "Växlar mellan flera system för att få ihop ett underlag",
  "Upplever att arbete fastnar mellan personer eller team",
];

const firstConversationSummary =
  "30 min genomgång, bedömning av potential och förslag på nästa steg.";

const faqItems = [
  {
    question: "Passar detta våra befintliga system?",
    answer:
      "Ja, upplägget utgår från hur arbetet redan fungerar idag och kopplas till de system som teamet använder.",
  },
  {
    question: "När är AI rätt väg?",
    answer:
      "När flera personer lägger återkommande tid på att läsa, tolka, sammanställa eller flytta information mellan olika system.",
  },
  {
    question: "Hur mycket manuellt arbete måste finnas för att det ska vara värt det?",
    answer:
      "Det räcker ofta att samma typ av moment tar några timmar i veckan för flera personer för att potentialen ska bli tydlig.",
  },
  {
    question: "Hur lång tid tar det att bygga en lösning?",
    answer:
      "Enklare automatiseringar kan vara på plats inom ett par veckor. Mer komplexa lösningar med flera integrationer tar längre tid. Första samtalet ger en realistisk bild av vad som gäller för just er process.",
  },
  {
    question: "Vad kostar det?",
    answer:
      "Kostnaden beror på processens komplexitet och vilka system som ska kopplas ihop. Vi gör alltid en bedömning av potential och genomförbarhet innan vi sätter ett pris.",
  },
  {
    question: "Vem äger lösningen?",
    answer:
      "Ni äger lösningen. Kod, konfigurationer och integrationer levereras till er och kan förvaltas internt eller med löpande stöd från SmartProcess.",
  },
  {
    question: "Hur hanteras vår data?",
    answer:
      "Data behandlas enligt GDPR och stannar hos er. Vi arbetar aldrig med känslig data utan tydlig överenskommelse om hantering och lagring.",
  },
];

const assessmentPoints = [
  "Potential",
  "Genomförbarhet",
  "Rätt lösningstyp",
];

const navItems = [
  { href: "#problem", label: "Problem" },
  { href: "#process", label: "Process" },
  { href: "#case", label: "Exempel" },
  { href: "#anvandningsomraden", label: "Områden" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function HomePage() {
  return (
    <main className="relative overflow-hidden pb-24 md:pb-0">
      <header className="sticky top-0 z-50 border-b border-[color:var(--border)] bg-[rgba(246,241,236,0.88)] backdrop-blur-xl">
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
                className="text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)]"
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
            Kom i kontakt
          </AnchorButton>
        </nav>
        <div className="border-t border-[color:var(--border)] md:hidden">
          <div className="mx-auto flex max-w-[104rem] gap-3 overflow-x-auto px-5 py-3 sm:px-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="inline-flex shrink-0 items-center rounded-full border border-[color:var(--border)] bg-white px-3 py-2 text-sm font-medium text-[var(--foreground)] shadow-[0_16px_30px_-28px_rgba(23,19,18,0.34)]"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </header>

      <section className="relative">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[48rem] bg-[radial-gradient(circle_at_top_left,_rgba(190,47,36,0.12),transparent_34%),radial-gradient(circle_at_78%_14%,_rgba(190,47,36,0.08),transparent_22%)]"
        />
        <div className="mx-auto grid max-w-[104rem] gap-14 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[0.86fr_1.14fr] lg:gap-20 lg:px-10 lg:py-32">
          <div className="relative">
            <span className="inline-flex rounded-full border border-[rgba(190,47,36,0.14)] bg-[rgba(190,47,36,0.08)] px-4 py-2 text-sm font-semibold text-[var(--accent)]">
              Skräddarsydd AI-automation för företag
            </span>
            <h1 className="mt-8 max-w-5xl text-[2.85rem] font-semibold leading-[0.98] tracking-tight text-[var(--foreground)] sm:text-6xl sm:leading-[0.96] lg:text-7xl xl:text-[6rem] xl:leading-[0.92]">
              Automatisera manuella arbetsflöden med{" "}
              <span className="text-[var(--accent)]">skräddarsydd AI</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)] sm:mt-8 sm:text-xl sm:leading-9">
              Identifierar arbetsmoment som tar tid och bygger AI-lösningar som
              gör arbetet snabbare, mer konsekvent och med mindre
              handpåläggning.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--foreground)] sm:text-lg">
              Ofta motsvarar det flera timmar per vecka och person — i arbete
              som kan automatiseras.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 sm:mt-10">
              <AnchorButton
                href="#kontakt"
                className="w-full sm:w-auto"
                analyticsEvent="cta_click"
                analyticsLabel="hero_booking"
              >
                Kom i kontakt
              </AnchorButton>
              <AnchorButton
                href="#anvandningsomraden"
                variant="secondary"
                className="w-full sm:w-auto"
                analyticsEvent="cta_click"
                analyticsLabel="hero_use_cases"
              >
                Se användningsområden
              </AnchorButton>
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-[color:var(--border)] pt-5 text-sm font-medium text-[var(--foreground)] sm:mt-12 sm:gap-x-8 sm:pt-6">
              {heroBenefits.map((item) => (
                <li key={item} className="inline-flex items-center gap-3">
                  <span className="block size-2 rounded-full bg-[var(--accent)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative lg:pt-2">
            <HeroWorkflowPanel />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[104rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <div className="border-t border-[color:var(--border)] pt-12 sm:pt-16">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
            Vad vi gör
          </p>
          <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-[4.25rem] lg:leading-[0.98]">
            AI-lösningar för arbetsflöden som kostar tid
          </h2>
          <div className="mt-6 grid gap-8 sm:mt-8 sm:gap-10 lg:grid-cols-[1.12fr_0.88fr]">
            <p className="max-w-3xl text-lg leading-8 text-[var(--foreground)] sm:text-xl sm:leading-9">
              I de flesta verksamheter finns arbetsflöden där dokument läses
              manuellt, information flyttas mellan system och interna steg
              bromsar tempo och kvalitet.
            </p>
            <p className="max-w-2xl text-base leading-8 text-[var(--muted)]">
              SmartProcess analyserar var tiden försvinner, identifierar vad
              som kan automatiseras och bygger lösningar som minskar manuellt
              arbete i praktiken.
            </p>
          </div>
        </div>
      </section>

      <section
        id="problem"
        className="mx-auto max-w-[104rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28"
      >
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
              Problem
            </p>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
              Detta är vanligt i de flesta verksamheter
            </p>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-[4rem] lg:leading-[0.98]">
              Många processer tar längre tid än de borde
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-[var(--muted)] sm:mt-6 sm:text-lg">
              När dokument, beslut och uppföljning hanteras manuellt skapas
              väntetider, dubbelarbete och högre kostnad per ärende.
            </p>
          </div>

          <div className="border-t border-[color:var(--border)]">
            {problemPoints.map((item) => (
              <div
                key={item.title}
                className="grid gap-2 border-b border-[color:var(--border)] py-5 sm:grid-cols-[0.88fr_1.12fr]"
              >
                <h3 className="text-lg font-semibold tracking-tight text-[var(--foreground)]">
                  {item.title}
                </h3>
                <p className="text-sm leading-7 text-[var(--muted)]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="process"
        className="border-y border-[color:var(--border)] bg-[rgba(255,255,255,0.55)]"
      >
        <div className="mx-auto max-w-[104rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <div className="grid gap-16 lg:grid-cols-[0.76fr_1.24fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                Process
              </p>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-[4rem] lg:leading-[0.98]">
                Så går det till
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-[var(--muted)] sm:mt-6 sm:text-lg">
                Från manuellt arbete till fungerande lösning på veckor — inte
                månader.
              </p>
            </div>

            <ol className="relative border-l border-[color:var(--border)] pl-6 sm:pl-8">
              {processSteps.map((item, index) => (
                <li
                  key={item.title}
                  className={`${index > 0 ? "mt-8" : ""} relative`}
                >
                  <span className="absolute -left-[2.05rem] top-1.5 grid size-6 place-items-center rounded-full border border-[rgba(190,47,36,0.22)] bg-[var(--background)] text-[11px] font-semibold text-[var(--accent)] sm:-left-[2.55rem]">
                    0{index + 1}
                  </span>
                  <h3 className="text-xl font-semibold tracking-tight text-[var(--foreground)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--muted)]">
                    {item.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section
        id="case"
        className="mx-auto max-w-[104rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28"
      >
        <div className="grid gap-16 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
              Implementerad lösning
            </p>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-[4.25rem] lg:leading-[0.98]">
              Exempel: ProposalDock
            </h2>
            <p className="mt-4 text-base font-medium leading-7 text-[var(--foreground)] sm:text-lg">
              Ett konkret exempel på hur manuellt analysarbete ersatts med AI.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--muted)] sm:mt-6 sm:text-lg">
              ProposalDock är utvecklad av SmartProcess och är ett exempel på
              en AI-lösning för RFP- och offertprocesser. Verktyget analyserar
              RFP-underlag, identifierar krav, risker och viktiga punkter samt
              hjälper team att bedöma täckningsgrad.
            </p>

            <div className="mt-10 border-t border-[color:var(--border)]">
              {caseProofPoints.map((item) => (
                <div
                  key={item}
                  className="flex items-start justify-between gap-4 border-b border-[color:var(--border)] py-5"
                >
                  <p className="text-lg font-medium text-[var(--foreground)]">
                    {item}
                  </p>
                  <span className="mt-2 block size-2 shrink-0 rounded-full bg-[var(--accent)]" />
                </div>
              ))}
            </div>

            <div className="mt-8">
              <a
                href="https://www.proposaldock.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[rgba(190,47,36,0.18)] bg-white px-4 py-2.5 text-sm font-semibold text-[var(--foreground)] shadow-[0_18px_38px_-28px_rgba(23,19,18,0.35)] hover:border-[rgba(190,47,36,0.32)] hover:text-[var(--accent)]"
              >
                Besök ProposalDock
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="size-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M7 17 17 7" />
                  <path d="M9 7h8v8" />
                </svg>
              </a>
            </div>
          </div>

          <ProposalDockPanel />
        </div>
      </section>

      <section
        id="anvandningsomraden"
        className="border-y border-[color:var(--border)] bg-[rgba(255,255,255,0.55)]"
      >
        <div className="mx-auto max-w-[104rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
              Användningsområden
            </p>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-[4rem] lg:leading-[0.98]">
              Vanliga områden där AI skapar värde
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--muted)] sm:mt-6 sm:text-lg">
              Exempel på var manuellt arbete kan ersättas med bättre systemstöd
              och AI-driven logik.
            </p>
          </div>

          <div className="mt-12 border-t border-[color:var(--border)] sm:mt-16">
            {useCaseSections.map((item, index) => (
              <article
                key={item.title}
                className="grid gap-10 border-b border-[color:var(--border)] py-12 sm:gap-12 sm:py-16 lg:grid-cols-[0.92fr_1.08fr] lg:items-center"
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    {item.eyebrow}
                  </p>
                  <h3 className="mt-5 max-w-3xl text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl lg:text-4xl">
                    {item.title}
                  </h3>
                  <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--muted)]">
                    {item.body}
                  </p>

                  <ul className="mt-8 space-y-3">
                    {item.examples.map((example) => (
                      <li
                        key={example}
                        className="flex items-start gap-3 text-sm leading-7 text-[var(--foreground)]"
                      >
                        <span className="mt-2 block size-2 shrink-0 rounded-full bg-[var(--accent)]" />
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div
                    className={`rounded-[32px] p-6 sm:rounded-[40px] sm:p-8 ${
                      item.dark
                        ? "bg-[var(--foreground)] text-white"
                        : "border border-[color:var(--border)] bg-white text-[var(--foreground)] shadow-[0_24px_60px_-48px_rgba(23,19,18,0.22)]"
                    }`}
                  >
                    <div
                      className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${
                        item.dark ? "text-white/52" : "text-[var(--muted)]"
                      }`}
                    >
                      {item.visualLabel}
                    </div>

                    <div
                      className={`mt-8 rounded-[26px] border p-4 sm:p-5 ${
                        item.dark
                          ? "border-white/10 bg-[rgba(255,255,255,0.06)]"
                          : "border-[color:var(--border)] bg-[rgba(247,241,236,0.76)]"
                      }`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="max-w-md">
                          <h4
                            className={`text-base font-semibold tracking-tight ${
                              item.dark
                                ? "text-white"
                                : "text-[var(--foreground)]"
                            }`}
                          >
                            {item.visualTitle}
                          </h4>
                          <p
                            className={`mt-2 text-sm leading-6 ${
                              item.dark
                                ? "text-white/70"
                                : "text-[var(--muted)]"
                            }`}
                          >
                            {item.visualMeta}
                          </p>
                        </div>
                        <span
                          className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${
                            item.dark
                              ? "border border-[rgba(190,47,36,0.28)] bg-[rgba(190,47,36,0.18)] text-white"
                              : "border border-[rgba(190,47,36,0.18)] bg-white text-[var(--accent)]"
                          }`}
                        >
                          {item.visualPill}
                        </span>
                      </div>

                      <div className="mt-5 space-y-3">
                        {item.visualRows.map((row) => (
                          <div
                            key={row.label}
                            className={`flex items-center justify-between gap-4 rounded-[18px] px-4 py-3 ${
                              item.dark
                                ? "bg-white/6"
                                : "border border-[rgba(104,74,65,0.08)] bg-white"
                            }`}
                          >
                            <span
                              className={`text-sm ${
                                item.dark
                                  ? "text-white/76"
                                  : "text-[var(--foreground)]"
                              }`}
                            >
                              {row.label}
                            </span>
                            <span
                              className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${
                                item.dark
                                  ? "text-white/58"
                                  : "text-[var(--muted)]"
                              }`}
                            >
                              {row.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div
                        className={`mt-5 flex items-start gap-3 border-t pt-4 text-sm leading-6 ${
                          item.dark
                            ? "border-white/10 text-white/72"
                            : "border-[color:var(--border)] text-[var(--muted)]"
                        }`}
                      >
                        <span className="mt-2 block size-2 shrink-0 rounded-full bg-[var(--accent)]" />
                        <p>{item.visualFooter}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[104rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
              Varför detta upplägg
            </p>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-[4rem] lg:leading-[0.98]">
              Praktisk AI, byggd runt verkliga processer
            </h2>
          </div>

          <ul className="border-t border-[color:var(--border)]">
            {whyItems.map((item) => (
              <li
                key={item}
                className="flex items-start gap-4 border-b border-[color:var(--border)] py-5 text-base leading-8 text-[var(--foreground)]"
              >
                <span className="mt-3 block size-2 shrink-0 rounded-full bg-[var(--accent)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-[color:var(--border)] bg-[rgba(255,255,255,0.55)]">
        <div className="mx-auto max-w-[104rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <div className="grid gap-16 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                Relevans
              </p>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-[4rem] lg:leading-[0.98]">
                Detta gäller er om ni känner igen er i något av detta:
              </h2>
            </div>

            <ul className="border-t border-[color:var(--border)]">
              {relevantItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-4 border-b border-[color:var(--border)] py-5 text-base leading-8 text-[var(--foreground)]"
                >
                  <span className="mt-3 block size-2 shrink-0 rounded-full bg-[var(--accent)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[104rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
              Vanliga frågor
            </p>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-[4rem] lg:leading-[0.98]">
              Frågor som ofta kommer upp inför ett första samtal
            </h2>
          </div>

          <div className="border-t border-[color:var(--border)]">
            {faqItems.map((item) => (
              <div
                key={item.question}
                className="border-b border-[color:var(--border)] py-5"
              >
                <h3 className="text-lg font-semibold tracking-tight text-[var(--foreground)]">
                  {item.question}
                </h3>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--muted)]">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="kontakt" className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 top-10 bg-[radial-gradient(circle_at_left_bottom,_rgba(190,47,36,0.1),transparent_24%),radial-gradient(circle_at_85%_20%,_rgba(190,47,36,0.08),transparent_20%)]"
        />
        <div className="relative z-10 mx-auto max-w-[104rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <div className="rounded-[38px] bg-[var(--foreground)] px-5 py-7 text-white shadow-[0_45px_120px_-68px_rgba(23,19,18,0.65)] sm:rounded-[46px] sm:px-8 sm:py-8 lg:px-10 lg:py-9">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)] lg:gap-16 lg:items-start">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/56">
                  Kontakt
                </p>
                <h2 className="mt-5 max-w-xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[3.35rem] lg:leading-[1.02]">
                  Har ni ett arbetsmoment som tar onödigt mycket tid?
                </h2>
                <p className="mt-5 max-w-xl text-base leading-8 text-white/72 sm:mt-6 sm:text-lg">
                  Beskriv ett arbetsmoment som tar tid eller känns onödigt
                  manuellt. En första bedömning visar om och hur det kan
                  effektiviseras med AI.
                </p>

                <div className="mt-7 max-w-md rounded-[24px] border border-white/10 bg-[rgba(255,255,255,0.04)] p-4 sm:p-5">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/56">
                    Första samtalet
                  </div>
                  <p className="mt-2 text-sm leading-6 text-white/72">
                    {firstConversationSummary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {assessmentPoints.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-[11px] font-medium text-white/88"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:justify-self-end lg:w-full lg:max-w-[38rem]">
                <ContactForm directEmail={directEmail} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[color:var(--border)] bg-[rgba(255,255,255,0.72)]">
        <div className="mx-auto flex max-w-[104rem] flex-col gap-6 px-5 py-8 text-sm text-[var(--muted)] sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <div>
            <div className="font-semibold text-[var(--foreground)]">
              SmartProcess
            </div>
            <div className="mt-1">
              AI-automation för manuella arbetsflöden.
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-[var(--foreground)]"
              >
                {item.label}
              </a>
            ))}
            <a href="/privacy" className="hover:text-[var(--foreground)]">
              Integritetspolicy
            </a>
          </div>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[color:var(--border)] bg-[rgba(246,241,236,0.92)] backdrop-blur-xl md:hidden">
        <div className="mx-auto max-w-[104rem] px-5 py-3">
          <AnchorButton
            href="#kontakt"
            className="w-full"
            analyticsEvent="cta_click"
            analyticsLabel="mobile_sticky_booking"
          >
            Kom i kontakt
          </AnchorButton>
        </div>
      </div>
    </main>
  );
}
