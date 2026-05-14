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

const siteTitle = "SmartProcess – AI-strategi och utveckling för växande företag";
const siteDescription =
  "SmartProcess hjälper mindre företag gå från AI-förvirring till konkreta AI-lösningar genom strategi, utveckling, implementation och löpande optimering.";
const socialImage = "/opengraph-image.png";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.smartprocess.se"),
  title: siteTitle,
  description: siteDescription,
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/icon.png", rel: "shortcut icon" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "512x512" }],
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "https://www.smartprocess.se",
    siteName: "SmartProcess",
    locale: "sv_SE",
    type: "website",
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 627,
        alt: "SmartProcess workflow automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [socialImage],
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
