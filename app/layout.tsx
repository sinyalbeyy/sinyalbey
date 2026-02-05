import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sinyal Bey | Seçilmiş Sistem",
  description: "Seçilmiş sistem. Net kurallar. Disiplinli trade. Kalabalık için değil, doğru ekip için.",
  keywords: ["kripto", "sinyal", "trade", "bitcoin", "bitget"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
