import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TireDeals — The Lowest Tire Prices Online. Period.",
  description:
    "Find tires that fit your exact vehicle. Search by vehicle, size, or brand. Fast nationwide shipping, price match, and 3,000+ installers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-bg text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
