import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://borntocreate.studio"),
  title: "Borntocreate Portfolio",
  description: "Web projects, brands and automations",
  keywords: ["portfolio", "web development", "design", "automation"],
  authors: [{ name: "Borntocreate" }],
  creator: "Borntocreate",
  openGraph: {
    title: "Borntocreate Portfolio",
    description: "Web projects, brands and automations",
    url: "https://borntocreate.studio",
    siteName: "Borntocreate Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Borntocreate Portfolio",
    description: "Web projects, brands and automations",
  },
  alternates: {
    canonical: "https://borntocreate.studio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
