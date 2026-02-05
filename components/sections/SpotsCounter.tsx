'use client';

import { useEffect, useState } from 'react';
import { Flame } from 'lucide-react';

export default function SpotsCounter() {
  const [spots, setSpots] = useState(7);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpots(prev => {
        if (prev <= 3) return prev;
        if (Math.random() > 0.7) return prev - 1;
        return prev;
      });
    }, 45000);

    return () => clearInterval(interval);
  }, []);

  const percentage = ((50 - spots) / 50) * 100;

  return (
    <div className="glass-card p-5 border-[rgba(201,168,76,0.08)]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <Flame className="w-4 h-4 text-orange-400/80" strokeWidth={1.5} />
          <span className="text-xs font-semibold text-[var(--foreground)] tracking-tight">
            Şubat Kontenjanı
          </span>
        </div>
        <span className="text-xs text-[var(--foreground-muted)]">
          Kalan: <span className={`font-semibold ${spots <= 5 ? 'text-red-400' : 'text-[var(--gold)]'}`}>{spots}</span>
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 rounded-full bg-[var(--background)] overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${percentage}%`,
            background: percentage > 85
              ? 'linear-gradient(90deg, var(--gold), #ef4444)'
              : 'linear-gradient(90deg, var(--gold-dark), var(--gold-light))',
          }}
        />
      </div>

      <div className="flex items-center justify-between mt-2.5">
        <p className="text-[11px] text-[var(--foreground-muted)]">
          50 kontenjanın <span className="text-[var(--foreground)] font-medium">{50 - spots}</span>&apos;i dolu
        </p>
        <p className="text-[11px] text-[var(--foreground-muted)]">
          <span className="text-[var(--gold)] font-medium">%{Math.round(percentage)}</span>
        </p>
      </div>
    </div>
  );
}
