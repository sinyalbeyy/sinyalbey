'use client';

import Link from 'next/link';
import { ArrowRight, Crown, Shield } from 'lucide-react';

const CTAArea = () => {
  const TG_MAIN = process.env.NEXT_PUBLIC_TG_MAIN || '#';

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Main CTA */}
      <a
        href={TG_MAIN}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col items-center justify-center w-full bg-gradient-to-r from-[var(--gold)] to-[var(--gold-dark)] text-black font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:scale-[1.02]"
      >
        <span className="flex items-center gap-2">
          <span>Ana Kanal Sinyal Bey&apos;e Katıl!</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </span>
        <span className="text-[10px] font-normal mt-1 opacity-80">
          Anlık paylaşımlar burada başlar.
        </span>
      </a>

      {/* Secondary CTAs */}
      <div className="grid grid-cols-2 gap-3 mt-3">
        <Link
          href="/one-percent-club"
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-[var(--gold)]/30 bg-[var(--gold)]/5 text-[var(--gold)] text-xs font-medium transition-all duration-300 hover:bg-[var(--gold)]/10 hover:border-[var(--gold)]/50"
        >
          <Crown className="w-4 h-4" />
          <span className="flex flex-col items-start leading-tight">
            <span className="font-semibold">%1 Club&apos;a Gir</span>
            <span className="text-[9px] text-[var(--foreground-muted)]">(Ücretli)</span>
          </span>
        </Link>
        <Link
          href="/bitget-elite"
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-[var(--gold)]/30 bg-[var(--gold)]/5 text-[var(--gold)] text-xs font-medium transition-all duration-300 hover:bg-[var(--gold)]/10 hover:border-[var(--gold)]/50"
        >
          <Shield className="w-4 h-4" />
          <span className="flex flex-col items-start leading-tight">
            <span className="font-semibold">VIP Bitget Club</span>
            <span className="text-[9px] text-[var(--foreground-muted)]">Başvurusu</span>
          </span>
        </Link>
      </div>

      {/* FOMO Performance Banner */}
      <div className="mt-4 glass-card p-3 border-green-500/30 bg-gradient-to-r from-green-500/10 to-transparent">
        <div className="flex items-center justify-center gap-3">
          <span className="text-green-400 text-2xl font-bold">+%1295,23</span>
          <div className="text-left">
            <p className="text-[10px] text-[var(--foreground)] font-medium">Bu Ay Toplam Getiri</p>
            <p className="text-[8px] text-[var(--foreground-muted)]">Seçilmiş işlemler bazında</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTAArea;
