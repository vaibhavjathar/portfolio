import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vaibhav Jathar — AI Systems Engineer",
  description:
    "Portfolio of Vaibhav Jathar — building production-ready AI systems: LangGraph agents, RAG pipelines, and edge ML that ships. B.Tech CS, MNNIT Prayagraj.",
  keywords: [
    "Vaibhav Jathar",
    "AI Engineer",
    "LangGraph",
    "RAG Pipeline",
    "Edge ML",
    "Agentic AI",
    "MNNIT",
    "Machine Learning",
    "FastAPI",
    "Next.js",
  ],
  authors: [{ name: "Vaibhav Jathar", url: "https://www.linkedin.com/in/vaibhavjathar/" }],
  creator: "Vaibhav Jathar",
  openGraph: {
    title: "Vaibhav Jathar — AI Systems Engineer",
    description: "Fault-tolerant AI systems. Not demos — systems that ship.",
    type: "website",
    locale: "en_US",
    siteName: "Vaibhav Jathar Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaibhav Jathar — AI Systems Engineer",
    description: "Fault-tolerant AI systems. Not demos — systems that ship.",
    creator: "@vaibhavjathar",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <meta name="theme-color" content="#0a0a0a" />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
