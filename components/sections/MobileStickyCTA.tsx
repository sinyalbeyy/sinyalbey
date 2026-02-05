'use client';

import { useEffect, useState } from 'react';

export default function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    document.getElementById('vip-steps')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 py-3 bg-[var(--background)]/95 backdrop-blur-xl border-t border-[rgba(201,168,76,0.08)] transition-transform duration-300 ease-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <button
        onClick={handleClick}
        className="btn-gold-glossy w-full py-3.5 text-sm font-semibold animate-pulse-cta"
      >
        ŞİMDİ ÜCRETSİZ VIP OL
      </button>
    </div>
  );
}
