import "./globals.css";
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: "KitoDeck AI - AI-Powered Scam Detection",
  description: "KitoDeck AI helps you identify and avoid online predators using AI-powered analysis.",
  keywords: "KitoDeck, AI scam detection, online safety, scam prevention, image scan, fraud detection",
  author: "KitoDeck Team",
  openGraph: {
    title: "KitoDeck AI - AI-Powered Scam Detection",
    description: "AI-powered scam detection and awareness tool for digital safety.",
    url: "https://kitodeck.com",
    type: "website",
    images: [
      {
        url: "https://kitodeck.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "KitoDeck AI Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@kitodeck",
    title: "KitoDeck AI - AI-Powered Scam Detection",
    description: "AI-powered scam detection and awareness tool for digital safety.",
    images: ["https://kitodeck.com/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="robots" content="index, follow" />
      </head>
      <body className="font-dmSans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true} disableTransitionOnChange>
          {children}
        </ThemeProvider>
        </body>
    </html>
  );
}
