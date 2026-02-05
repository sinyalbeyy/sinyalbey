'use client';

import { useState, useEffect } from 'react';

const BreakingBar = () => {
  const messages = [
    { emoji: '🚨', text: 'KONTENJAN AZALDI — Yeni alımlar kısa süreliğine durdurulabilir.' },
    { emoji: '✅', text: 'Sistem Aktif — Başvurular sırada, onaylar kademeli.' },
    { emoji: '🔒', text: 'Erişim Seçilidir — Herkes alınmaz.' },
    { emoji: '⚡', text: 'Bitget Seçilmiş Ekip — 48 saatte bir kontrol.' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-[var(--gold)]/20 via-[var(--gold)]/10 to-[var(--gold)]/20 border-b border-[var(--gold)]/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="relative h-5 overflow-hidden">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`absolute inset-0 flex items-center justify-center gap-2 transition-all duration-500 ${
                index === currentIndex
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 -translate-y-full'
              }`}
            >
              <span className="text-sm">{message.emoji}</span>
              <span className="text-xs font-medium text-[var(--foreground)]">
                {message.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BreakingBar;
