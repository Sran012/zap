import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "zap: it’s in here somewhere",
  description:
    "Fuzzy search files, folders, shell history, and command snippets from one prompt. zsh, bash, fish, and PowerShell.",
  keywords: [
    "zap",
    "zap-search",
    "terminal",
    "fuzzy search",
    "cli",
    "shell history",
  ],
  openGraph: {
    title: "zap: it’s in here somewhere",
    description:
      "Fuzzy files and folders, your shell history, and the Docker flag you half-remember. One prompt, in the shell you already use.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "zap: it’s in here somewhere",
    description:
      "Fuzzy files and folders, your shell history, and the Docker flag you half-remember.",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-ink font-sans text-fg antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
