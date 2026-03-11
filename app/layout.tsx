import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Stringr",
  description: "Smart Gear & String Tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
