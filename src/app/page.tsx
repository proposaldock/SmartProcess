import Image from "next/image";
import { SpRevealInit } from "@/components/marketing/SpRevealInit";
import { SpNavClient } from "@/components/marketing/SpNavClient";
import { SpUseCasesTiered } from "@/components/marketing/SpUseCasesTiered";
import { SpFaqAccordion } from "@/components/marketing/SpFaqAccordion";
import { SpContactForm } from "@/components/marketing/SpContactForm";

/* ─────────────────────────────────────────────
   Inline SVG helpers (server-rendered sections)
   ───────────────────────────────────────────── */

function IcoArrowRight({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden={true}>
      <path d="M5 12h14" /><path d="M13 6l6 6-6 6" />
    </svg>
  );
}
function IcoCalendar({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden={true}>
      <rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 11h18" />
    </svg>
  );
}
function IcoCheck({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden={true}>
      <path d="M4 12l5 5L20 6" />
    </svg>
  );
}
function IcoTarget({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden={true}>
      <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}
function IcoWorkflow({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden={true}>
      <rect x="3" y="3" width="6" height="6" rx="1" /><rect x="15" y="3" width="6" height="6" rx="1" /><rect x="9" y="15" width="6" height="6" rx="1" />
      <path d="M6 9v3a2 2 0 002 2h2" /><path d="M18 9v3a2 2 0 01-2 2h-2" />
    </svg>
  );
}
function IcoSparkles({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden={true}>
      <path d="M12 4l1.6 4.4L18 10l-4.4 1.6L12 16l-1.6-4.4L6 10l4.4-1.6L12 4z" />
      <path d="M19 16l.7 1.8L21.5 18.5l-1.8.7L19 21l-.7-1.8L16.5 18.5l1.8-.7L19 16z" />
    </svg>
  );
}
function IcoMail({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden={true}>
      <rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 7 9-7" />
    </svg>
  );
}
function IcoUpload({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden={true}>
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><path d="M17 8l-5-5-5 5" /><path d="M12 3v12" />
    </svg>
  );
}
function IcoFileSearch({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden={true}>
      <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z" /><path d="M14 3v5h5" /><circle cx="11" cy="14" r="2" /><path d="M13 16l1.5 1.5" />
    </svg>
  );
}
function IcoEdit({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden={true}>
      <path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 113 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}
function IcoDownload({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden={true}>
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><path d="M7 10l5 5 5-5" /><path d="M12 15V3" />
    </svg>
  );
}

/* ─── Hero decorative SVGs ─── */

function HeroPattern() {
  const pulses = [
    { cx: 540, cy: 540, delay: 0 },
    { cx: 440, cy: 200, delay: 1.0 },
    { cx: 360, cy: 300, delay: 2.0 },
    { cx: 580, cy: 180, delay: 3.0 },
    { cx: 180, cy: 380, delay: 4.0 },
  ];
  return (
    <svg
      className="sp-hero-pattern"
      viewBox="0 0 600 600"
      preserveAspectRatio="xMaxYMin meet"
      aria-hidden={true}
    >
      <g stroke="#C9BFB6" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M520 40 V120 H440 V200 H360 V300" />
        <path d="M580 180 V260 H500 V340" />
        <path d="M380 380 H460 V460 H540 V540" />
      </g>
      <g stroke="#C9BFB6" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 6">
        <path d="M300 100 V160" />
        <path d="M260 240 H340" />
        <path d="M180 380 V440 H100" />
      </g>
      <path d="M460 460 H540 V540" stroke="#BA3F39" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <g stroke="#C9BFB6" strokeWidth="1.4" fill="#FEFAF8">
        <circle cx="520" cy="40" r="6" /><circle cx="440" cy="200" r="6" />
        <circle cx="360" cy="300" r="6" /><circle cx="580" cy="180" r="6" />
        <circle cx="500" cy="340" r="6" /><circle cx="380" cy="380" r="6" />
        <circle cx="300" cy="100" r="5" /><circle cx="260" cy="240" r="5" />
        <circle cx="180" cy="380" r="5" /><circle cx="100" cy="440" r="5" />
      </g>
      <circle cx="460" cy="460" r="4" fill="#BA3F39" />
      <circle cx="540" cy="540" r="4" fill="#BA3F39" />
      {pulses.map((p) => (
        <circle
          key={p.cx + "-" + p.cy}
          cx={p.cx}
          cy={p.cy}
          r="6"
          fill="#BA3F39"
          className="sp-flow-pulse"
          style={{ animationDelay: `${p.delay}s` }}
        />
      ))}
    </svg>
  );
}

function HeroWave() {
  return (
    <div className="sp-hero-wave" aria-hidden={true}>
      <svg viewBox="0 0 2880 120" preserveAspectRatio="none">
        <path
          d="M0,80 C160,30 320,110 540,70 C760,30 880,90 1080,60 C1240,38 1340,72 1440,55
             C1600,30 1760,110 1980,70 C2200,30 2320,90 2520,60 C2680,38 2780,72 2880,55
             L2880,120 L0,120 Z"
          fill="#efe8e1"
          opacity="0.7"
        />
      </svg>
    </div>
  );
}

/* ─── Data ─── */

const roadmapSteps = [
  {
    n: "01", phase: "Audit",
    title: "Kartläggning & Handlingsplan",
    copy: "Vi kartlägger er verksamhet, identifierar var ni tappar tid och pengar och tar fram ett prioriterat åtgärdspaket med tydlig ROI.",
    chips: ["Processanalys", "Prioritering", "Handlingsplan"],
  },
  {
    n: "02", phase: "Build",
    title: "Byggnation & Implementation",
    copy: "Vi bygger systemen och implementerar dem direkt i era befintliga arbetsflöden — utan att ni behöver lära er ny teknik.",
    chips: ["Anpassad utveckling", "Integration", "Driftsättning"],
  },
  {
    n: "03", phase: "Partner",
    title: "Förvaltning & Partnerskap",
    copy: "Vi stannar kvar som er digitala operationspartner och förbättrar systemen kontinuerligt baserat på er verksamhets faktiska behov.",
    chips: ["Löpande förbättring", "Prioritering", "Support"],
  },
];

const problemItems = [
  { n: "01", title: "Manuella rutiner tar tid från rätt arbete", copy: "Timmarna läggs på uppgifter som inte kräver mänsklig insats — och det är en kostnad som sällan syns tydligt i budgeten." },
  { n: "02", title: "Verktyg som aldrig används", copy: "Inköpta system passar sällan verksamhetens faktiska processer och arbetsflöden — och hamnar snabbt på hyllan." },
  { n: "03", title: "Ingen tydlig plan för vad som ska prioriteras", copy: "Utan en strukturerad analys är det svårt att veta var automatisering faktiskt skapar värde — och var det inte gör det." },
  { n: "04", title: "Lösningar utan koppling till affärsmål", copy: "Teknik implementeras utan tydlig ROI och det blir omöjligt att mäta om förändringen faktiskt gör skillnad." },
  { n: "05", title: "Stödprocesser som skalas manuellt", copy: "När verksamheten växer ökar den manuella arbetsbördan proportionellt — istället för att systemen absorberar det." },
];

const solutionCards = [
  {
    icon: <IcoTarget size={28} />,
    title: "Strategisk tydlighet",
    accent: true,
    copy: "Vi börjar med var ni tappar tid och pengar. Resultatet är ett prioriterat åtgärdspaket med tydlig ROI — inte en lista med verktyg att testa.",
  },
  {
    icon: <IcoWorkflow size={28} />,
    title: "Anpassad implementation",
    accent: false,
    copy: "Vi bygger systemen direkt in i era befintliga arbetsflöden och processer — utan onödig komplexitet och utan att ni behöver lära er ny teknik.",
  },
  {
    icon: <IcoSparkles size={28} />,
    title: "Löpande partnerskap",
    accent: false,
    copy: "Vi stannar kvar. Systemen förbättras kontinuerligt baserat på hur de faktiskt används och vad er verksamhet behöver härnäst.",
  },
];

const exampleFlow = [
  { n: "01", ai: false, title: "Ladda upp underlag", copy: "Ladda upp brief eller RFP.", icon: <IcoUpload size={16} /> },
  { n: "02", ai: true,  title: "Granska",            copy: "Granska struktur och krav.", icon: <IcoFileSearch size={16} /> },
  { n: "03", ai: true,  title: "Ta fram utkast",     copy: "Bygg första utkast.", icon: <IcoEdit size={16} /> },
  { n: "04", ai: false, title: "Exportera",           copy: "Ta vidare till offert eller leverans.", icon: <IcoDownload size={16} /> },
];

/* ─── Page ─── */

export default function HomePage() {
  const directEmail =
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ||
    process.env.CONTACT_TO_EMAIL ||
    "marcus@smartprocess.se";

  return (
    <div className="sp-shell">
      <SpRevealInit />
      <SpNavClient />

      {/* ── Hero ── */}
      <section className="sp-hero sp-section" id="top">
        <HeroPattern />
        <HeroWave />
        <div className="sp-hero-inner">
          <div className="sp-eyebrow-row">
            <span className="sp-eyebrow-dot" />
            <span className="sp-eyebrow">Digital Operations · AI Development</span>
          </div>
          <h1>Frigör din verksamhet från det arbete som inte borde vara manuellt.</h1>
          <p className="sp-lead">
            Vi identifierar var era resurser läcker och bygger systemen som
            stoppar det — anpassat efter er verksamhet, implementerat i era
            processer.
          </p>
          <div className="ctas">
            <a href="#kontakt" className="btn btn-primary btn-lg">
              <IcoCalendar size={16} /> Boka ett samtal
            </a>
            <a href="#process" className="btn btn-secondary btn-lg">
              Hur vi arbetar <IcoArrowRight size={16} />
            </a>
          </div>
          <div className="tags">
            <span className="tag">Eliminerar manuellt arbete</span>
            <span className="tag">Anpassade system</span>
            <span className="tag">Långsiktig partner</span>
            <span className="tag">10–200 anställda</span>
          </div>
        </div>
      </section>

      {/* ── Roadmap ── */}
      <div className="sp-anim">
        <section className="sp-roadmap sp-section" id="process">
          <div className="sp-roadmap-header">
            <div>
              <div className="sp-eyebrow-row">
                <span className="sp-eyebrow-dot" />
                <span className="sp-eyebrow">Så vi arbetar</span>
              </div>
              <h2>En strukturerad process — från analys till fungerande system</h2>
            </div>
          </div>
          <div className="sp-roadmap-stage">
            <svg
              className="sp-roadmap-connector"
              viewBox="0 0 1200 24"
              preserveAspectRatio="none"
              aria-hidden={true}
            >
              <line x1="0" y1="12" x2="1200" y2="12" stroke="#C9BFB6" strokeWidth="1.4" strokeDasharray="2 6" strokeLinecap="round" />
              <circle cx="200" cy="12" r="5" fill="#FEFAF8" stroke="#C9BFB6" strokeWidth="1.4" />
              <circle cx="600" cy="12" r="5" fill="#FEFAF8" stroke="#C9BFB6" strokeWidth="1.4" />
              <circle cx="1000" cy="12" r="5" fill="#FEFAF8" stroke="#C9BFB6" strokeWidth="1.4" />
            </svg>
            <div className="sp-roadmap-grid">
              {roadmapSteps.map((s) => (
                <div className="sp-roadmap-step" key={s.n}>
                  <div className="phase">
                    <span className="phase-num">{s.n}</span>
                    <span>·</span>
                    <b>{s.phase}</b>
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.copy}</p>
                  <div className="chips">
                    {s.chips.map((c) => (
                      <span className="chip" key={c}>{c}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ── Problem ── */}
      <div className="sp-anim">
        <section className="sp-problem sp-section" id="tjanster">
          <div className="hd">
            <div className="sp-eyebrow-row">
              <span className="sp-eyebrow-dot" />
              <span className="sp-eyebrow">Problemet</span>
            </div>
            <h2>
              Manuellt arbete är<br />er dolda kostnad.
            </h2>
            <p>
              Varje dag förlorar ni tid och pengar på arbete som borde skötas
              av system — inte av era medarbetare. Det syns sällan på en enda
              rad i budgeten, men det adderar upp.
            </p>
          </div>
          <div className="sp-problem-grid">
            {problemItems.map((it) => (
              <div className="sp-problem-item" key={it.n}>
                <span className="big-n">{it.n}</span>
                <h4>{it.title}</h4>
                <p>{it.copy}</p>
              </div>
            ))}
          </div>
          <div className="sp-savings">
            <div className="lbl">Den dolda kostnaden</div>
            <div className="big">400+ timmar per anställd och år</div>
            <p>
              En medarbetare som ägnar 2 timmar om dagen åt manuella rutiner
              tappar 400 betalda arbetstimmar per år på arbete som kan
              automatiseras. Med fem anställda: 2 000 timmar — upp till
              1 000 000 kr som inte skapar värde. Rätt system betalar sig
              ofta på 3–6 månader.
            </p>
          </div>
        </section>
      </div>

      {/* ── Solution ── */}
      <div className="sp-anim">
        <section className="sp-solution sp-section">
          <div className="sp-eyebrow-row">
            <span className="sp-eyebrow-dot" />
            <span className="sp-eyebrow">Vad vi gör</span>
          </div>
          <h2>Strategi, system och partnerskap — under ett tak.</h2>
          <p className="lead">
            Vi är er digitala operationspartner — inte bara en leverantör. Vi
            förstår er verksamhet, identifierar vad som bromsar er och bygger
            systemen som löser det.
          </p>
          <div className="sp-solution-grid">
            {solutionCards.map((c) => (
              <div
                className={`sp-solution-card${c.accent ? " accent" : ""}`}
                key={c.title}
              >
                <div className="icon-bare">{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.copy}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── Example ── */}
      <div className="sp-anim">
        <section
          className="sp-example sp-section"
          id="exempel"
          style={{ paddingTop: 24, paddingBottom: 96 }}
        >
          <div className="sp-eyebrow-row">
            <span className="sp-eyebrow-dot" />
            <span className="sp-eyebrow">Exempel</span>
          </div>
          <h2 style={{ margin: "0 0 12px", maxWidth: 760 }}>
            Så kan ett anpassat system se ut i praktiken
          </h2>
          <p
            className="sp-lead"
            style={{
              color: "var(--sp-fg-2)",
              maxWidth: 720,
              marginBottom: 40,
            }}
          >
            ProposalDock är ett internt verktyg vi byggt för RFP-processer. Det
            analyserar upphandlingsunderlag, identifierar krav och risker — och
            ger teamet beslutsunderlag på minuter istället för timmar.
          </p>
          <div className="sp-example-grid">
            <div className="sp-example-copy">
              <ul className="sp-example-bullets">
                {[
                  "Från timmar av genomläsning till beslutsunderlag på minuter",
                  "Minskar risken att viktiga krav missas",
                  "Teamet fokuserar på bedömning — inte manuell sammanställning",
                ].map((b) => (
                  <li key={b}>
                    <span className="check">
                      <IcoCheck size={16} />
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <a
                className="btn btn-secondary"
                href="https://proposaldock.se"
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginTop: 28 }}
              >
                Besök ProposalDock <IcoArrowRight size={16} />
              </a>
            </div>

            <div className="sp-example-panel">
              <div
                className="sp-eyebrow"
                style={{ marginBottom: 6 }}
              >
                Implementerad lösning
              </div>
              <h3 style={{ margin: "0 0 6px", fontSize: 22 }}>ProposalDock</h3>
              <div
                style={{
                  fontSize: 13,
                  color: "var(--sp-fg-3)",
                  marginBottom: 22,
                }}
              >
                Utvecklad av SmartProcess
              </div>
              <div className="sp-flow-row">
                {exampleFlow.map((s, i) => (
                  <div key={s.n} style={{ display: "contents" }}>
                    <div className="sp-flow-card">
                      <div className="sp-flow-head">
                        <span className="num">{s.n}</span>
                        {s.ai && <span className="ai">AI</span>}
                        <span className="icon">{s.icon}</span>
                      </div>
                      <div className="ttl">{s.title}</div>
                      <div className="copy">{s.copy}</div>
                    </div>
                    {i < exampleFlow.length - 1 && (
                      <div className="sp-flow-arrow" aria-hidden={true}>
                        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#9AA0A8" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14" /><path d="M13 6l6 6-6 6" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── Use Cases ── */}
      <div className="sp-anim">
        <SpUseCasesTiered />
      </div>

      {/* ── FAQ ── */}
      <div className="sp-anim">
        <section className="sp-faq sp-section">
          <div className="sp-eyebrow-row">
            <span className="sp-eyebrow-dot" />
            <span className="sp-eyebrow">Vanliga frågor</span>
          </div>
          <h2>Frågor och svar</h2>
          <p className="lead">
            Har du en fråga som inte finns med? Skriv till oss så svarar vi.
          </p>
          <SpFaqAccordion />
        </section>
      </div>

      {/* ── Contact ── */}
      <div className="sp-anim">
        <section className="sp-contact sp-section" id="kontakt">
          <div className="sp-contact-grid">
            <div className="copy">
              <div className="sp-eyebrow-row">
                <span className="sp-eyebrow-dot" />
                <span className="sp-eyebrow">Börja här</span>
              </div>
              <h2>Redo att ta nästa steg?</h2>
              <p>
                Beskriv en process som tar för mycket tid eller kostar för
                mycket resurser. Vi gör en initial bedömning och berättar
                konkret vad som kan förändras — och vad det är värt.
              </p>
              <div className="promise">
                <div className="lbl">Första mötet</div>
                <h4>30 minuters strategisk genomgång</h4>
                <p>
                  Vi lyssnar, analyserar er situation och presenterar en
                  initial bedömning — utan förpliktelser.
                </p>
                <div className="chips">
                  <span className="chip">Nulägesanalys</span>
                  <span className="chip">Potential</span>
                  <span className="chip">Rätt nästa steg</span>
                </div>
              </div>
            </div>
            <SpContactForm directEmail={directEmail} />
          </div>
        </section>
      </div>

      {/* ── Footer ── */}
      <footer className="sp-footer">
        <div className="sp-footer-cols">
          <div className="col col-brand">
            <a href="/" className="logo-row">
              <Image
                src="/icon.png"
                alt=""
                width={28}
                height={28}
                className="logo"
                style={{ borderRadius: 6 }}
              />
              <span className="wordmark">
                SmartProcess<span className="tld">.se</span>
              </span>
            </a>
            <p>Digital operationspartner för växande företag i Sverige.</p>
            <a href="mailto:marcus@smartprocess.se" className="email">
              <IcoMail size={14} /> marcus@smartprocess.se
            </a>
          </div>
          <div className="col">
            <div className="col-title">Tjänster</div>
            <a href="#tjanster">Processanalys</a>
            <a href="#tjanster">Strategi &amp; Handlingsplan</a>
            <a href="#tjanster">Implementation</a>
            <a href="#tjanster">Löpande partnerskap</a>
          </div>
          <div className="col">
            <div className="col-title">Lösningar</div>
            <a href="#anvandningsomraden">Snabba insatser</a>
            <a href="#anvandningsomraden">Djupare automationer</a>
            <a href="#anvandningsomraden">Skräddarsydda system</a>
            <a href="#exempel">ProposalDock</a>
          </div>
          <div className="col">
            <div className="col-title">Företag</div>
            <a href="/om-oss">Om oss</a>
            <a href="#kontakt">Kontakt</a>
            <a href="/privacy">Integritetspolicy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
