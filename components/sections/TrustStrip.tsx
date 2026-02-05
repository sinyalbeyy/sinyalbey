import { CheckCircle, Users, Target, Eye } from 'lucide-react';

const TrustStrip = () => {
  const badges = [
    { icon: CheckCircle, text: 'Kurallı Sistem' },
    { icon: Users, text: 'Seçilmiş Ekip' },
    { icon: Target, text: 'Risk Odaklı' },
    { icon: Eye, text: 'Şeffaf Süreç' },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
      {badges.map((badge, index) => (
        <div
          key={index}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--gold)]/20 bg-[var(--gold)]/5 text-[var(--foreground-muted)] text-xs"
        >
          <badge.icon className="w-3 h-3 text-[var(--gold)]" />
          <span>{badge.text}</span>
        </div>
      ))}
    </div>
  );
};

export default TrustStrip;
