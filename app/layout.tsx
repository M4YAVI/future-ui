import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Future UI - Minimalist Component Library",
  description: "A beautifully crafted, minimalist UI component library. Copy and paste components for your next project.",
  keywords: ["UI", "components", "React", "Next.js", "Tailwind CSS", "dark theme"],
  authors: [{ name: "Future UI" }],
  openGraph: {
    title: "Future UI - Minimalist Component Library",
    description: "A beautifully crafted, minimalist UI component library.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
