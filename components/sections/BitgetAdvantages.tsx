import { Percent, Gift, Zap } from 'lucide-react';

export default function BitgetAdvantages() {
  const items = [
    {
      icon: Percent,
      title: 'Ömür Boyu %80 İndirim',
      desc: 'Sinyal Bey referansına özel komisyon indirimi.',
    },
    {
      icon: Gift,
      title: 'Ücretsiz VIP Erişim',
      desc: 'Referansla kayıt ol, VIP sinyallere ücretsiz eriş.',
    },
    {
      icon: Zap,
      title: 'Hızlı Onay',
      desc: 'UID gönder, kısa sürede VIP grubuna gir.',
    },
  ];

  return (
    <section className="mb-16">
      <div className="grid md:grid-cols-3 gap-3">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="glass-card glass-card-hover p-6 text-center group">
              <div className="w-11 h-11 mx-auto mb-4 rounded-xl bg-[var(--gold)]/[0.07] flex items-center justify-center transition-colors group-hover:bg-[var(--gold)]/[0.12]">
                <Icon className="w-5 h-5 text-[var(--gold)]" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-semibold text-[var(--foreground)] mb-1.5 tracking-tight">{item.title}</h3>
              <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
