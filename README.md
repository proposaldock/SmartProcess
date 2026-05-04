# SmartProcess

SmartProcess är en svensk landningssida för AI-automation av manuella arbetsflöden. Projektet är byggt i Next.js och innehåller ett kontaktformulär som skickar förfrågningar via SMTP.

## Kom igång

1. Installera beroenden:

```bash
npm install
```

2. Skapa en lokal miljöfil:

```bash
copy .env.example .env.local
```

3. Fyll i SMTP- och kontaktuppgifterna i `.env.local`. Kontaktadressen är förifylld till `marcus@smartprocess.se`, SMTP-värdena är förinställda för STRATO och `NEXT_PUBLIC_GA_MEASUREMENT_ID` kan fyllas i när ett GA4-ID finns.

4. Starta utvecklingsservern:

```bash
npm run dev
```

Sidan körs sedan på [http://localhost:3000](http://localhost:3000).

## Kontaktformulär

Formuläret postar till `POST /api/contact` och skickar vidare innehållet som mejl.

### Obligatoriska miljövariabler

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASSWORD`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`

### Valfria miljövariabler

- `CONTACT_FROM_NAME`
- `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`

`NEXT_PUBLIC_CONTACT_EMAIL` används för länken "Eller mejla direkt" i formuläret. Om den inte anges används `CONTACT_TO_EMAIL`.

`NEXT_PUBLIC_GA_MEASUREMENT_ID` används för Google Analytics 4. När den är tom laddas ingen analytics alls.

## SMTP-noteringar

- Port `587` används normalt med `SMTP_SECURE=false`
- Port `465` används normalt med `SMTP_SECURE=true`
- `CONTACT_FROM_EMAIL` bör vara en adress som är godkänd av din mejlleverantör

## Analytics

GA4 läggs globalt i layouten och skickar:

- sidvisningar
- CTA-klick
- lyckade formulärskick

Sajten har även en definierad Open Graph-bild för delningar i till exempel LinkedIn.

Lägg in ditt GA4-ID i `.env.local`, till exempel `G-ABC1234567`.

## Rate Limiting

Kontaktformuläret har ett enkelt skydd mot spam och begränsar antal försök per IP under en kort tidsperiod.

## Kvalitetskontroll

```bash
npm run lint
npm run build
```
