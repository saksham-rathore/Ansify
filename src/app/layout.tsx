import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ansify AI",
  description: "Ask anything. Find clarity in seconds.",
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