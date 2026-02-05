'use client';

import { useEffect, useState } from 'react';
import { Eye, TrendingUp, Users } from 'lucide-react';

export default function LiveActivityBar() {
  const [viewers, setViewers] = useState(0);
  const [joinedToday, setJoinedToday] = useState(0);

  useEffect(() => {
    setViewers(Math.floor(Math.random() * 12) + 18);
    setJoinedToday(Math.floor(Math.random() * 5) + 7);

    const interval = setInterval(() => {
      setViewers(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        return Math.max(14, Math.min(35, prev + change));
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card px-5 py-3.5 mb-16">
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
        <div className="flex items-center gap-2 text-[13px]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
          </span>
          <Eye className="w-3.5 h-3.5 text-[var(--foreground-muted)]" strokeWidth={1.5} />
          <span className="text-[var(--foreground-muted)]">
            <span className="text-[var(--foreground)] font-medium">{viewers}</span> kişi inceliyor
          </span>
        </div>

        <span className="w-px h-3 bg-[var(--card-border)] hidden sm:block" />

        <div className="flex items-center gap-2 text-[13px]">
          <Users className="w-3.5 h-3.5 text-[var(--gold)]/70" strokeWidth={1.5} />
          <span className="text-[var(--foreground-muted)]">
            Bugün <span className="text-[var(--gold)] font-medium">{joinedToday}</span> katılım
          </span>
        </div>

        <span className="w-px h-3 bg-[var(--card-border)] hidden sm:block" />

        <div className="flex items-center gap-2 text-[13px]">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-400/70" strokeWidth={1.5} />
          <span className="text-[var(--foreground-muted)]">
            Ocak: <span className="text-emerald-400 font-medium">+%337</span>
          </span>
        </div>
      </div>
    </div>
  );
}
