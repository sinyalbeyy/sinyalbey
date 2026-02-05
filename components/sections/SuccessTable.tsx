'use client';

import { CheckCircle, Lock } from 'lucide-react';

export default function SuccessTable() {
  const trades = [
    { pair: 'BTC/USDT', direction: 'Long', profit: '+%112', date: '28 Ocak 2026' },
    { pair: 'SOL/USDT', direction: 'Long', profit: '+%85', date: '25 Ocak 2026' },
    { pair: 'FET/USDT', direction: 'AI Hype', profit: '+%140', date: '22 Ocak 2026' },
  ];

  const hiddenTrades = [
    { pair: '???/USDT', direction: 'VIP Only', date: '3 Şubat 2026' },
    { pair: '???/USDT', direction: 'VIP Only', date: '1 Şubat 2026' },
  ];

  return (
    <section className="mb-16">
      <div className="flex items-center gap-3 mb-2">
        <span className="gold-ornament" />
        <h2 className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-medium">
          Performans
        </h2>
      </div>
      <h3 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-3 tracking-tight">
        Son Kapatılan VIP İşlemler
      </h3>
      <p className="text-sm text-[var(--foreground-muted)] mb-10">
        Şeffaflık ilkemiz gereği tüm işlemler doğrulanabilir.
      </p>

      <div className="space-y-2.5">
        {trades.map((t, i) => (
          <div key={i} className="glass-card px-5 py-4 flex items-center justify-between group hover:border-[rgba(255,255,255,0.08)] transition-colors">
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <span className="font-semibold text-[var(--foreground)] text-sm tracking-tight">{t.pair}</span>
                <span className="text-[10px] uppercase tracking-wider text-[var(--gold)]/70 font-medium px-2 py-0.5 rounded-full bg-[var(--gold)]/[0.06]">{t.direction}</span>
              </div>
              <span className="text-[11px] text-[var(--foreground-muted)]">{t.date}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-emerald-400 tracking-tight">{t.profit}</span>
              <CheckCircle className="w-4 h-4 text-emerald-500/40" strokeWidth={1.5} />
            </div>
          </div>
        ))}

        {/* Hidden/locked trades */}
        {hiddenTrades.map((t, i) => (
          <div key={`hidden-${i}`} className="glass-card px-5 py-4 flex items-center justify-between opacity-40">
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <span className="font-semibold text-[var(--foreground)] text-sm tracking-tight">{t.pair}</span>
                <span className="text-[10px] uppercase tracking-wider text-[var(--gold)]/70 font-medium px-2 py-0.5 rounded-full bg-[var(--gold)]/[0.06]">{t.direction}</span>
              </div>
              <span className="text-[11px] text-[var(--foreground-muted)]">{t.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-[var(--gold)]/60" strokeWidth={1.5} />
              <span className="text-xs text-[var(--gold)]/60 font-medium">VIP</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 glass-card px-5 py-3.5 flex items-center justify-between">
        <span className="text-xs text-[var(--foreground-muted)] font-medium">Ocak 2026 Toplam</span>
        <span className="text-base font-bold text-emerald-400 tracking-tight">+%337</span>
      </div>

      <p className="text-center text-[11px] text-[var(--foreground-muted)] mt-5">
        Şubat ayı sinyalleri sadece VIP üyelere açıktır. <span className="text-[var(--gold)] font-medium">Katıl, kaçırma.</span>
      </p>
    </section>
  );
}
