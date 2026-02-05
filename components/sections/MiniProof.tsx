import { TrendingUp, Clock, Activity } from 'lucide-react';

const MiniProof = () => {
  const stats = [
    { icon: TrendingUp, label: 'Süreç Disiplini', value: 'Sabit' },
    { icon: Clock, label: 'Kontrol', value: '48 Saat' },
    { icon: Activity, label: 'Günlük İşlem', value: '2-5' },
  ];

  return (
    <div className="glass-card p-4 border-[var(--gold)]/10">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs font-semibold text-[var(--foreground)]">Son 30 Gün</h4>
        <span className="text-[8px] uppercase tracking-wider text-[var(--gold)] bg-[var(--gold)]/10 px-2 py-0.5 rounded">Aktif</span>
      </div>
      <div className="space-y-2">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <stat.icon className="w-3 h-3 text-[var(--gold)]/60" />
              <span className="text-[10px] text-[var(--foreground-muted)]">{stat.label}</span>
            </div>
            <span className="text-[10px] font-medium text-[var(--gold)]">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiniProof;
