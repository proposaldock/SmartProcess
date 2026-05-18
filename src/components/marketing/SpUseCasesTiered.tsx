"use client";

import { useState } from "react";

const tiers = [
  {
    label: "Små projekt",
    summary: "Snabba vinster med hög ROI och kort implementationstid.",
    timeline: "1–3 veckor",
    items: [
      ["AI-assisterad mejlhantering", "Klassificering, prioritering och automatiska svar på inkommande mejl."],
      ["Automatiserade sammanfattningar", "Mötesprotokoll, rapportsammanfattningar och nyhetsbrev genereras automatiskt."],
      ["Enkel dokumentanalys", "Läser, tolkar och kategoriserar avtal, offerter och bilagor automatiskt."],
      ["Automatiserad rapportering", "Rapporter och sammanställningar som genereras från era datakällor."],
    ] as [string, string][],
  },
  {
    label: "Mellanstora projekt",
    summary: "Djupare automationer med systemkopplingar och anpassad logik.",
    timeline: "3–6 veckor",
    items: [
      ["Kundsupportflöden", "Automatiserade svar, kategorisering och routing av inkommande ärenden."],
      ["CRM- och säljautomation", "Automatiserar uppföljning, kategorisering och registrering i CRM-system."],
      ["Offert- och kravanalys", "Identifierar krav, risker och viktiga punkter i RFP-underlag och offerter."],
      ["Interna dashboards", "Sammanställer data från flera källor och ger teamet rätt beslutsunderlag."],
    ] as [string, string][],
  },
  {
    label: "Större projekt",
    summary: "Skräddarsydda AI-system och djupgående integrationer.",
    timeline: "6–12 veckor",
    items: [
      ["Processspecifika AI-verktyg", "Anpassade lösningar byggda exakt efter era arbetsflöden och specifika behov."],
      ["Systemintegrationer", "Kopplar ihop era befintliga system och eliminerar manuell dataöverföring."],
      ["Interna AI-agenter", "Autonoma agenter som hanterar komplexa arbetsflöden baserat på era regler."],
      ["End-to-end automatiseringsplattformar", "Fullständiga lösningar som täcker hela processer från input till leverans."],
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
            <span className="sp-eyebrow">Användningsområden</span>
          </div>
          <h2>Exempel på AI-lösningar vi kan bygga</h2>
          <p>
            Lösningarna varierar i komplexitet och scope beroende på era
            processer och var AI skapar mest värde för just er.
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
