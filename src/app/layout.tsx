import { Suspense } from "react";
import type { Metadata } from "next";
import { IBM_Plex_Mono, Manrope } from "next/font/google";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-geist-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SmartProcess | AI-automation för manuella arbetsflöden",
  description:
    "SmartProcess hjälper företag identifiera manuella processer och bygga skräddarsydda AI-lösningar, interna verktyg och SaaS-flöden som sparar tid och förbättrar kvaliteten.",
  openGraph: {
    title: "SmartProcess | AI-automation för manuella arbetsflöden",
    description:
      "SmartProcess hjälper företag identifiera manuella processer och bygga skräddarsydda AI-lösningar, interna verktyg och SaaS-flöden som sparar tid och förbättrar kvaliteten.",
    locale: "sv_SE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sv"
      className={`${manrope.variable} ${plexMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full">
        {children}
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
      </body>
    </html>
  );
}
