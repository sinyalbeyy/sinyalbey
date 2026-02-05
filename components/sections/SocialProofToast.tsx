'use client';

import { useEffect, useState } from 'react';
import { UserCheck } from 'lucide-react';

const recentJoins = [
  { name: 'Ahmet K.', time: '2 dk önce', city: 'İstanbul' },
  { name: 'Mehmet Y.', time: '5 dk önce', city: 'Ankara' },
  { name: 'Emre T.', time: '12 dk önce', city: 'İzmir' },
  { name: 'Burak S.', time: '18 dk önce', city: 'Bursa' },
  { name: 'Kaan R.', time: '23 dk önce', city: 'Antalya' },
  { name: 'Oğuz D.', time: '31 dk önce', city: 'Trabzon' },
  { name: 'Serkan A.', time: '45 dk önce', city: 'Konya' },
  { name: 'Yusuf M.', time: '1 saat önce', city: 'Adana' },
];

export default function SocialProofToast() {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const initialDelay = setTimeout(() => {
      setCurrentIndex(0);
      setIsVisible(true);
    }, 6000);

    return () => clearTimeout(initialDelay);
  }, []);

  useEffect(() => {
    if (currentIndex < 0) return;

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 4000);

    const nextTimer = setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % recentJoins.length);
      setIsVisible(true);
    }, Math.random() * 10000 + 15000);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, [currentIndex]);

  if (currentIndex < 0) return null;

  const person = recentJoins[currentIndex];

  return (
    <div
      className={`fixed bottom-20 md:bottom-6 left-4 z-40 max-w-[260px] transition-all duration-500 ease-out ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-3 opacity-0 pointer-events-none'
      }`}
    >
      <div className="glass-card px-4 py-3 flex items-center gap-3 border-[rgba(201,168,76,0.08)] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--gold)]/[0.08] flex items-center justify-center">
          <UserCheck className="w-3.5 h-3.5 text-[var(--gold)]" strokeWidth={1.5} />
        </div>
        <div className="min-w-0">
          <p className="text-[13px] text-[var(--foreground)] font-medium truncate">
            {person.name} <span className="text-[var(--foreground-muted)] font-normal text-xs">VIP oldu</span>
          </p>
          <p className="text-[11px] text-[var(--foreground-muted)]">
            {person.city} &middot; {person.time}
          </p>
        </div>
      </div>
    </div>
  );
}
