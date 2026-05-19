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
    title: "Kartläggning & Roadmap",
    copy: "Analyserar era processer och identifierar var AI skapar mest värde.",
    chips: ["Processanalys", "Kundanskaffningsanalys", "Roadmap"],
  },
  {
    n: "02", phase: "Build",
    title: "Byggnation & Implementation",
    copy: "Bygger anpassade AI-lösningar och integrerar dem i era arbetsflöden.",
    chips: ["Anpassad utveckling", "Integration", "Test"],
  },
  {
    n: "03", phase: "Optimize",
    title: "Optimering & Partnerskap",
    copy: "Förbättrar lösningarna kontinuerligt baserat på användning och feedback.",
    chips: ["Monitoring", "Iteration", "Support"],
  },
];

const problemItems = [
  { n: "01", title: "AI-verktyg testas utan tydlig plan", copy: "Företag experimenterar med verktyg men saknar en strategi för vad som ska uppnås och hur det mäts." },
  { n: "02", title: "Interna processer förblir manuella", copy: "Trots AI-trend läggs timmarna fortfarande på uppgifter som borde kunna automatiseras — varje dag." },
  { n: "03", title: "Lösningar används inte av teamet", copy: "Verktyg som köps in passar sällan verksamhetens faktiska arbetsflöden och hamnar på hyllan." },
  { n: "04", title: "Svårt att veta vad som ska prioriteras", copy: "Med hundratals AI-verktyg på marknaden är det oklart var man ska börja och vad som faktiskt ger affärsvärde." },
  { n: "05", title: "Teknik utan koppling till affärsvärde", copy: "Lösningar skapas utan tydlig koppling till vilka problem de löser, vad de sparar eller hur de ska mätas." },
];

const solutionCards = [
  { icon: <IcoTarget size={28} />, title: "Strategisk tydlighet", accent: true, copy: "Vi börjar alltid med vad ni vill uppnå affärsmässigt. Resultatet är en prioriterad AI-roadmap med tydlig koppling till nytta — inte en lista med verktyg." },
  { icon: <IcoWorkflow size={28} />, title: "Teknisk implementation", accent: false, copy: "Vi bygger anpassade AI-lösningar, interna verktyg och integrationer som passar era faktiska processer och befintliga system — från grunden." },
  { icon: <IcoSparkles size={28} />, title: "Löpande förbättring", accent: false, copy: "AI är inte ett engångsprojekt. Vi följer upp, justerar och vidareutvecklar lösningarna baserat på hur de faktiskt används i teamet — och vad nästa steg borde vara." },
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
            <span className="sp-eyebrow">AI Strategy &amp; Development</span>
          </div>
          <h1>AI-strategi och utveckling för växande företag</h1>
          <p className="sp-lead">
            SmartProcess hjälper mindre företag gå från AI-förvirring till
            konkreta AI-lösningar som sparar tid, effektiviserar arbetsflöden
            och skapar mätbart värde.
          </p>
          <p className="sp-lead subtle">
            Strategi, implementation och löpande optimering — från idé till
            fungerande AI-lösning.
          </p>
          <div className="ctas">
            <a href="#kontakt" className="btn btn-primary btn-lg">
              <IcoCalendar size={16} /> Boka ett samtal
            </a>
            <a href="#process" className="btn btn-secondary btn-lg">
              Se hur det fungerar <IcoArrowRight size={16} />
            </a>
          </div>
          <div className="tags">
            <span className="tag">Tydlig AI-strategi</span>
            <span className="tag">Anpassade lösningar</span>
            <span className="tag">Löpande partner</span>
            <span className="tag">10–50 anställda</span>
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
                <span className="sp-eyebrow">AI Transformation Roadmap</span>
              </div>
              <h2>En tydlig väg från nuläge till fungerande AI-lösningar</h2>
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
              Många företag testar AI.
              <br />
              Få får ut verkligt värde.
            </h2>
            <p>
              Utan en tydlig strategi och rätt implementation fastnar de flesta i
              experiment, lösa verktyg och lösningar som inte skapar konkret
              affärsvärde.
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
            <div className="lbl">Konkret besparing</div>
            <div className="big">~400 timmar per anställd, per år</div>
            <p>
              En anställd som lägger 2 timmar om dagen på manuella
              rutinuppgifter arbetar bort 400 betalda timmar på uppgifter som
              kan automatiseras. Med fem anställda — 2 000 timmar, motsvarande
              500 000–1 000 000 kr. En AI-lösning betalar sig ofta på 3–6
              månader.
            </p>
          </div>
        </section>
      </div>

      {/* ── Solution ── */}
      <div className="sp-anim">
        <section className="sp-solution sp-section">
          <div className="sp-eyebrow-row">
            <span className="sp-eyebrow-dot" />
            <span className="sp-eyebrow">Lösningen</span>
          </div>
          <h2>Från osäkerhet till fungerande AI-lösningar</h2>
          <p className="lead">
            SmartProcess kombinerar strategi, utveckling och implementation för
            att identifiera var AI skapar mest värde, bygga lösningarna och
            hjälpa teamet använda dem i vardagen.
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
            Så här kan en AI-lösning se ut i praktiken
          </h2>
          <p
            className="sp-lead"
            style={{
              color: "var(--sp-fg-2)",
              maxWidth: 720,
              marginBottom: 40,
            }}
          >
            ProposalDock är ett verktyg vi byggt för RFP- och offertprocesser.
            Det analyserar upphandlingsunderlag, identifierar krav, risker och
            viktiga punkter samt hjälper teamet att bedöma täckningsgrad.
          </p>
          <div className="sp-example-grid">
            <div className="sp-example-copy">
              <ul className="sp-example-bullets">
                {[
                  "Från timmar av genomläsning till beslutsunderlag på minuter",
                  "Minskar risken att viktiga krav missas",
                  "Gör teamets roll mer granskande än manuellt sammanställande",
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
                <span className="sp-eyebrow">Kontakt</span>
              </div>
              <h2>Redo att se hur AI kan hjälpa er verksamhet?</h2>
              <p>
                Beskriv ett arbetsmoment som tar tid eller känns onödigt
                manuellt. En första bedömning visar om och hur det kan
                effektiviseras med AI.
              </p>
              <div className="promise">
                <div className="lbl">Första samtalet</div>
                <h4>30 min genomgång av er situation</h4>
                <p>
                  Bedömning av potential, genomförbarhet och rätt nästa steg —
                  utan förpliktelser.
                </p>
                <div className="chips">
                  <span className="chip">Potential</span>
                  <span className="chip">Genomförbarhet</span>
                  <span className="chip">Rätt lösningstyp</span>
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
            <p>AI-strategi och utveckling för växande företag i Sverige.</p>
            <a href="mailto:marcus@smartprocess.se" className="email">
              <IcoMail size={14} /> marcus@smartprocess.se
            </a>
          </div>
          <div className="col">
            <div className="col-title">Tjänster</div>
            <a href="#tjanster">AI-kartläggning</a>
            <a href="#tjanster">Strategi &amp; Roadmap</a>
            <a href="#tjanster">Implementation</a>
            <a href="#tjanster">Löpande optimering</a>
          </div>
          <div className="col">
            <div className="col-title">Lösningar</div>
            <a href="#anvandningsomraden">Små projekt</a>
            <a href="#anvandningsomraden">Mellanstora projekt</a>
            <a href="#anvandningsomraden">Större projekt</a>
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
