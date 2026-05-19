"use client";

import { useState } from "react";

const tiers = [
  {
    label: "Snabba insatser",
    summary: "Konkreta vinster med kort implementationstid och hög ROI.",
    timeline: "1–3 veckor",
    items: [
      ["Mejlhantering utan manuell sortering", "Inkommande mejl klassificeras, prioriteras och besvaras automatiskt — teamet ser bara det som faktiskt kräver deras uppmärksamhet."],
      ["Automatiska sammanfattningar", "Möten, rapporter och uppdateringar sammanfattas direkt — utan att någon behöver skriva ihop det manuellt."],
      ["Dokumentanalys på sekunder", "Avtal, offerter och bilagor läses och kategoriseras automatiskt — inga manuella genomgångar."],
      ["Rapportering utan manuellt arbete", "Rapporter och sammanställningar genereras automatiskt från era befintliga datakällor."],
    ] as [string, string][],
  },
  {
    label: "Djupare automationer",
    summary: "Systemkopplingar och anpassad logik som eliminerar friktion på riktigt.",
    timeline: "3–6 veckor",
    items: [
      ["Kundsupport som hanterar sig själv", "Inkommande ärenden klassificeras, routas och besvaras automatiskt — med eskalering när det faktiskt behövs."],
      ["CRM och säljpipeline utan manuell input", "Uppföljning, kategorisering och registrering sker automatiskt — säljteamet fokuserar på att sälja."],
      ["Offert- och kravanalys", "Upphandlingsunderlag och offerter analyseras på minuter — krav, risker och viktiga punkter identifieras direkt."],
      ["Beslutsstöd i realtid", "Data från flera källor sammanställs automatiskt så att teamet alltid har rätt underlag för rätt beslut."],
    ] as [string, string][],
  },
  {
    label: "Skräddarsydda system",
    summary: "Fullständiga operationella system byggda exakt för er verksamhet.",
    timeline: "6–12 veckor",
    items: [
      ["Processspecifika operationssystem", "Anpassade system byggda precis efter era arbetsflöden — inte generiska verktyg ni måste anpassa er till."],
      ["Systemintegrationer som eliminerar manuell dataöverföring", "Era befintliga system kopplas ihop och data flödar automatiskt dit den behövs."],
      ["Autonoma interna agenter", "Agenter som hanterar komplexa arbetsflöden självständigt baserat på era regler och processer."],
      ["End-to-end processautomation", "Hela processer automatiseras från input till leverans — utan manuella mellansteg."],
    ] as [string, string][],
  },
];

function PlusIcon() {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={true}
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={true}
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 11h18" />
    </svg>
  );
}

export function SpUseCasesTiered() {
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const toggle = (key: string) =>
    setOpen((o) => ({ ...o, [key]: !o[key] }));

  return (
    <section className="sp-usecases sp-section" id="anvandningsomraden">
      <div className="hd">
        <div>
          <div className="sp-eyebrow-row">
            <span className="sp-eyebrow-dot" />
            <span className="sp-eyebrow">Vad vi bygger</span>
          </div>
          <h2>Exempel på system och automationer vi levererar</h2>
          <p>
            Varje lösning är anpassad — men här är typiska exempel på vad vi
            bygger, sorterat efter komplexitet och scope.
          </p>
        </div>
        <a href="#kontakt" className="btn btn-primary">
          <CalendarIcon /> Boka ett samtal
        </a>
      </div>
      <div className="sp-usecases-grid">
        {tiers.map((t, ti) => (
          <div className="sp-tier" key={t.label}>
            <div className="label">{t.label}</div>
            <p className="summary">{t.summary}</p>
            <span className="timeline">{t.timeline}</span>
            <ul>
              {t.items.map(([title, copy], i) => {
                const key = `${ti}-${i}`;
                const isOpen = !!open[key];
                return (
                  <li
                    key={title}
                    className={isOpen ? "open" : ""}
                    onClick={() => toggle(key)}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <h4>{title}</h4>
                      <span
                        style={{
                          color: "var(--sp-fg-3)",
                          transform: isOpen ? "rotate(45deg)" : "none",
                          transition: "transform 200ms",
                          flexShrink: 0,
                        }}
                      >
                        <PlusIcon />
                      </span>
                    </div>
                    <p>{copy}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
