"use client";

import { useState } from "react";

const questions: [string, string][] = [
  [
    "Vad innebär en AI-kartläggning?",
    "En AI-kartläggning är ett strukturerat genomgång av era arbetsflöden, processer och system för att identifiera var AI kan skapa mest värde. Resultatet är en prioriterad roadmap med konkreta rekommendationer och tydlig koppling till affärsmål.",
  ],
  [
    "Behöver vi vara tekniska för att arbeta med er?",
    "Nej. Ni bidrar med kunskap om era processer och mål — vi sköter det tekniska. Vår uppgift är att göra AI enkelt, konkret och användbart för er verksamhet.",
  ],
  [
    "Hur lång tid tar det att få en fungerande lösning?",
    "Det beror på komplexiteten, men vi arbetar i snabba iterationer. Enklare lösningar kan levereras inom 2–4 veckor. Mer komplexa projekt tar typiskt 4–12 veckor.",
  ],
  [
    "Vad kostar det?",
    "Kostnaden varierar beroende på processens komplexitet och vilka system som ska integreras. Vi gör alltid en bedömning av potential och genomförbarhet innan vi sätter ett pris — utan dolda kostnader.",
  ],
  [
    "Kan ni integrera med våra befintliga system?",
    "Ja. Vi anpassar lösningarna till era befintliga system och arbetsflöden, oavsett om det handlar om e-post, CRM, dokumenthantering, affärssystem eller interna verktyg.",
  ],
  [
    "Hur hanteras vår data?",
    "Era data och processer hanteras konfidentiellt. Vi arbetar inom ramen för GDPR och delar aldrig er data med tredje part.",
  ],
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

export function SpFaqAccordion() {
  const [open, setOpen] = useState<number>(0);

  return (
    <div className="sp-faq-list">
      {questions.map(([q, a], i) => (
        <div key={q} className={`sp-faq-q${open === i ? " open" : ""}`}>
          <button onClick={() => setOpen(open === i ? -1 : i)}>
            <span>{q}</span>
            <span className="chev">
              <PlusIcon />
            </span>
          </button>
          <div className="body">{a}</div>
        </div>
      ))}
    </div>
  );
}
