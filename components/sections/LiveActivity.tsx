import { Clock, CheckCircle, Shield, Zap } from 'lucide-react';

const LiveActivity = () => {
  const activities = [
    { icon: Clock, label: 'Son Kontrol', value: 'Bugün', color: 'text-[var(--gold)]' },
    { icon: CheckCircle, label: 'Onay Süreci', value: 'Devam Ediyor', color: 'text-green-400' },
    { icon: Shield, label: 'Erişim', value: 'Seçili', color: 'text-[var(--gold)]' },
    { icon: Zap, label: 'Durum', value: 'Aktif', color: 'text-green-400' },
  ];

  return (
    <div className="glass-card p-4 border-[var(--gold)]/30 bg-gradient-to-br from-[var(--gold)]/5 to-transparent">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <h4 className="text-xs font-semibold text-[var(--foreground)]">Canlı Durum</h4>
        </div>
        <span className="text-[8px] uppercase tracking-wider text-green-400 bg-green-400/10 px-2 py-0.5 rounded border border-green-400/30">
          Live
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-[var(--background)]/30">
            <activity.icon className="w-3 h-3 text-[var(--gold)]/60" />
            <div className="flex-1 min-w-0">
              <p className="text-[9px] text-[var(--foreground-muted)] truncate">{activity.label}</p>
              <p className={`text-[10px] font-semibold ${activity.color}`}>{activity.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveActivity;
