import type { Metadata } from "next";
import VIPSteps from "@/components/sections/VIPSteps";
import SuccessTable from "@/components/sections/SuccessTable";
import BitgetAdvantages from "@/components/sections/BitgetAdvantages";
import MobileStickyCTA from "@/components/sections/MobileStickyCTA";
import EliteText from "@/components/sections/EliteText";
import LiveActivityBar from "@/components/sections/LiveActivityBar";
import SocialProofToast from "@/components/sections/SocialProofToast";

export const metadata: Metadata = {
  title: "VIP Bitget Club | Sinyal Bey",
  description:
    "Sinyal Bey referansıyla ömür boyu %80 komisyon indirimi. Ücretsiz VIP sinyallere eriş.",
};

export default function BitgetElitePage() {
  return (
    <>
      <div className="relative pt-36 pb-32 md:pb-24 px-5 overflow-hidden gold-dust-bg">

        {/* ── Ambient background glow ── */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-40 right-[-10%] w-[700px] h-[700px] rounded-full bg-[var(--gold)] opacity-[0.03] blur-[180px]" />
          <div className="absolute -bottom-60 left-[-15%] w-[800px] h-[800px] rounded-full bg-[#0c1322] opacity-[0.5] blur-[200px]" />
          <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[var(--gold)] opacity-[0.015] blur-[140px]" />
        </div>

        <div className="relative max-w-2xl mx-auto">

          {/* ── HERO ── */}
          <section className="text-center mb-24">
            <div className="inline-flex items-center gap-3 mb-8">
              <span className="gold-ornament" />
              <p className="text-xs uppercase tracking-[0.25em] text-[var(--gold)] font-medium">
                Sinyal Bey Elite
              </p>
              <span className="gold-ornament" />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--foreground)] mb-5 leading-[1.1] tracking-tight">
              Ömür Boyu<br />
              <span className="gold-shimmer-text">%80 Komisyon İndirimi</span>
            </h1>

            <p className="text-base text-[var(--foreground-muted)] max-w-md mx-auto leading-relaxed mb-8">
              Dışarıda %10-20 bulamayanlar, burada %80 ile işlem yapıyor.
            </p>

            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-red-500/15 bg-red-500/[0.04]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
              </span>
              <span className="text-xs text-red-400/90 font-medium tracking-wide">Şubat kontenjanı dolmak üzere</span>
            </div>
          </section>

          {/* ── CANLI AKTİVİTE ── */}
          <LiveActivityBar />

          {/* ── AVANTAJLAR ── */}
          <BitgetAdvantages />

          <div className="section-divider" />

          {/* ── 3 ADIM ── */}
          <div id="vip-steps">
            <VIPSteps />
          </div>

          <div className="section-divider" />

          {/* ── BAŞARI TABLOSU ── */}
          <SuccessTable />

          <div className="section-divider" />

          {/* ── KAPANIŞ ── */}
          <EliteText />

        </div>
      </div>

      <MobileStickyCTA />
      <SocialProofToast />
    </>
  );
}
