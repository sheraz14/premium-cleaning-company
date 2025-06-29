import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/Footer";
import { Providers } from "./Providers";


import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Premium Cleaning Services - Toronto's Most Trusted Cleaning Company",
  description: "Professional residential and commercial cleaning services in Toronto. Eco-friendly products, insured cleaners, and 100% satisfaction guarantee. Book online today!",
  keywords: "cleaning services Toronto, house cleaning, commercial cleaning, eco-friendly cleaning, residential cleaning, maid service",
  authors: [{ name: "CleanPro Services" }],
  openGraph: {
    title: "Premium Cleaning Services - Toronto's Most Trusted Cleaning Company",
    description: "Professional residential and commercial cleaning services in Toronto. Eco-friendly products, insured cleaners, and 100% satisfaction guarantee.",
    images: ["/images/hero-background.jpg"],
    locale: "en_CA",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/broom.png" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          {/* Global GSAP Config */}
          <Script id="gsap-config" strategy="beforeInteractive">
            {`
              window.gsap = window.gsap || {};
              window.scrollProgress = 0;
            `}
          </Script>

                     <div className="relative">
             <Navbar />
             {children}
             <Footer />
           </div>
          


        </Providers>
      </body>
    </html>
  );
}
