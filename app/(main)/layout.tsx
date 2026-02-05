import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CryptoBackground from "@/components/backgrounds/CryptoBackground";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <CryptoBackground />
      <Header />
      <main className="min-h-screen relative z-10">
        {children}
      </main>
      <Footer />
    </>
  );
}
