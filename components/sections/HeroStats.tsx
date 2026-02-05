import { BarChart3, TrendingUp, Zap } from 'lucide-react';

const HeroStats = () => {
  const stats = [
    {
      icon: BarChart3,
      label: 'Günlük İşlem',
      value: '2-5',
    },
    {
      icon: TrendingUp,
      label: 'Dönem Durumu',
      value: 'Aktif / Yoğun',
      subtitle: 'Seçilmiş işlemler',
      isHighlight: true,
    },
    {
      icon: Zap,
      label: 'Sistem',
      value: 'Aktif',
      isActive: true,
    },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`glass-card px-4 py-3 min-w-[110px] text-center border-[var(--gold)]/10 hover:border-[var(--gold)]/30 transition-all duration-300 ${
            stat.isHighlight ? 'border-[var(--gold)]/30 bg-[var(--gold)]/5' : ''
          }`}
        >
          <stat.icon className="w-4 h-4 mx-auto mb-1.5 text-[var(--gold)]/60" />
          <p className="text-[9px] uppercase tracking-wider text-[var(--foreground-muted)] mb-0.5">
            {stat.label}
          </p>
          <p className={`text-sm font-semibold ${stat.isActive ? 'text-green-400' : stat.isHighlight ? 'text-[var(--gold)]' : 'text-[var(--gold)]'}`}>
            {stat.value}
          </p>
          {stat.subtitle && (
            <p className="text-[8px] text-[var(--foreground-muted)] mt-0.5">{stat.subtitle}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default HeroStats;
