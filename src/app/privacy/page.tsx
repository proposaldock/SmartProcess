export const metadata = {
  title: "Integritetspolicy – SmartProcess",
  description: "Hur SmartProcess hanterar personuppgifter.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-20 sm:px-8 lg:px-10">
      <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
        Integritetspolicy
      </h1>
      <p className="mt-4 text-sm text-[var(--muted)]">Senast uppdaterad: maj 2026</p>

      <div className="mt-10 space-y-8">
        <section>
          <h2 className="text-xl font-semibold tracking-tight text-[var(--foreground)]">
            Personuppgiftsansvarig
          </h2>
          <p className="mt-3 text-base leading-8 text-[var(--muted)]">
            SmartProcess är personuppgiftsansvarig för behandlingen av dina
            personuppgifter. Kontakta oss på{" "}
            <a
              href="mailto:marcus@smartprocess.se"
              className="text-[var(--foreground)] underline underline-offset-2 hover:text-[var(--accent)]"
            >
              marcus@smartprocess.se
            </a>{" "}
            vid frågor om hur vi hanterar dina uppgifter.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight text-[var(--foreground)]">
            Vilka uppgifter samlar vi in?
          </h2>
          <p className="mt-3 text-base leading-8 text-[var(--muted)]">
            Via kontaktformuläret samlar vi in namn, e-postadress, företag,
            roll och en beskrivning av den process eller det problem du vill
            diskutera.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight text-[var(--foreground)]">
            Varför behandlar vi uppgifterna?
          </h2>
          <p className="mt-3 text-base leading-8 text-[var(--muted)]">
            Uppgifterna används uteslutande för att besvara din förfrågan och
            genomföra eventuellt första samtal. Vi delar inte dina uppgifter
            med tredje part i marknadsföringssyfte.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight text-[var(--foreground)]">
            Hur länge sparas uppgifterna?
          </h2>
          <p className="mt-3 text-base leading-8 text-[var(--muted)]">
            Vi sparar dina uppgifter så länge det är nödvändigt för att hantera
            din förfrågan och eventuellt efterföljande affärsrelation, dock som
            längst tre år om inte annat avtalas.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight text-[var(--foreground)]">
            Dina rättigheter
          </h2>
          <p className="mt-3 text-base leading-8 text-[var(--muted)]">
            Enligt GDPR har du rätt att begära tillgång till, rättelse av eller
            radering av dina personuppgifter. Du kan också invända mot
            behandlingen eller begära begränsning. Kontakta oss på{" "}
            <a
              href="mailto:marcus@smartprocess.se"
              className="text-[var(--foreground)] underline underline-offset-2 hover:text-[var(--accent)]"
            >
              marcus@smartprocess.se
            </a>{" "}
            för att utöva dina rättigheter.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight text-[var(--foreground)]">
            Klagomål
          </h2>
          <p className="mt-3 text-base leading-8 text-[var(--muted)]">
            Om du anser att vi behandlar dina uppgifter felaktigt har du rätt
            att lämna in ett klagomål till Integritetsskyddsmyndigheten (IMY)
            på{" "}
            <a
              href="https://www.imy.se"
              target="_blank"
              rel="noreferrer"
              className="text-[var(--foreground)] underline underline-offset-2 hover:text-[var(--accent)]"
            >
              imy.se
            </a>
            .
          </p>
        </section>
      </div>

      <div className="mt-12 border-t border-[color:var(--border)] pt-8">
        <a
          href="/"
          className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--accent)]"
        >
          ← Tillbaka till startsidan
        </a>
      </div>
    </main>
  );
}
