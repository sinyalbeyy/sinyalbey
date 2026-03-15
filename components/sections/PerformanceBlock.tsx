import { TrendingUp, Zap, Target, ShieldCheck } from 'lucide-react';

const PerformanceBlock = () => {
  const monthly = [
    { month: 'Kasım 2025', value: '+%289', color: 'text-emerald-400' },
    { month: 'Aralık 2025', value: '+%374', color: 'text-emerald-400' },
    { month: 'Ocak 2026',  value: '+%418', color: 'text-emerald-400' },
    { month: 'Şubat 2026', value: '+%391', color: 'text-emerald-400' },
    { month: 'Mart 2026',  value: '+%418', color: 'text-emerald-400', current: true },
  ];

  const stats = [
    { icon: TrendingUp, label: 'Aylık Ort. Getiri', value: '+%378', highlight: true },
    { icon: Zap,        label: 'Günlük İşlem',     value: '2-5' },
    { icon: Target,     label: 'Başarı Oranı',     value: '%87' },
    { icon: ShieldCheck,label: 'Sistem Durumu',    value: 'Aktif', green: true },
  ];

  return (
    <section className="section-spacing px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--foreground)]">
            Süreç Odaklı Sonuçlar
          </h2>
          <p className="text-[var(--foreground-muted)] max-w-2xl mx-auto">
            Rastgele kazanç hikâyeleri değil, disiplinli sonuçlar.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Aylık Performans */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-semibold text-[var(--foreground)]">Aylık Performans</h3>
              <span className="text-[8px] uppercase tracking-wider text-[var(--gold)] bg-[var(--gold)]/10 px-2 py-0.5 rounded">
                Son 5 Ay
              </span>
            </div>
            <div className="space-y-3">
              {monthly.map((m) => (
                <div key={m.month} className={`flex items-center justify-between py-2 border-b border-[var(--glass-border)] last:border-0 ${m.current ? 'opacity-100' : 'opacity-70'}`}>
                  <div className="flex items-center gap-2">
                    {m.current && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                    <span className="text-xs text-[var(--foreground-muted)]">{m.month}</span>
                    {m.current && <span className="text-[9px] text-emerald-400 font-medium">devam ediyor</span>}
                  </div>
                  <span className={`text-sm font-bold ${m.color}`}>{m.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* İstatistikler */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-semibold text-[var(--foreground)]">Sistem İstatistikleri</h3>
              <span className="text-[8px] uppercase tracking-wider text-[var(--gold)] bg-[var(--gold)]/10 px-2 py-0.5 rounded">
                Güncel
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {stats.map((s, i) => (
                <div key={i} className="bg-[var(--background)]/50 rounded-xl p-4 text-center border border-[var(--glass-border)]">
                  <s.icon className="w-4 h-4 mx-auto mb-2 text-[var(--gold)]/60" strokeWidth={1.5} />
                  <p className={`text-lg font-bold mb-0.5 ${s.green ? 'text-emerald-400' : s.highlight ? 'text-[var(--gold)]' : 'text-[var(--foreground)]'}`}>
                    {s.value}
                  </p>
                  <p className="text-[9px] text-[var(--foreground-muted)] uppercase tracking-wide">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-[11px] text-[var(--foreground-muted)]">
          Geçmiş performans gelecek sonuçları garanti etmez. Kripto piyasaları yüksek risk içerir.
        </p>
      </div>
    </section>
  );
};

export default PerformanceBlock;
