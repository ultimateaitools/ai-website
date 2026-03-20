import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingShareBar from "@/components/FloatingShareBar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: 'swap' });
const gaMeasurementId = "G-1X8T9144E9";

export const metadata: Metadata = {
  title: "Ultimate Free AI Tools Directory",
  description: "Discover the best free AI tools for productivity, coding, writing, automation, design and research.",
  metadataBase: new URL("https://ultimateaitools.online"),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: "Ultimate Free AI Tools Directory",
    description: "Discover the best free AI tools for productivity, coding, writing, automation, design and research.",
    url: "https://ultimateaitools.online",
    siteName: "UltimateAITools",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground flex flex-col min-h-screen`}>
        {adsenseClient ? (
          <Script
            id="adsense-script"
            async
            strategy="afterInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
            crossOrigin="anonymous"
          />
        ) : null}
        <Script
          id="gtag-src"
          async
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaMeasurementId}');
          `}
        </Script>
        <FloatingShareBar />
        <Header />
        <main className="flex-1 bg-surface-main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
