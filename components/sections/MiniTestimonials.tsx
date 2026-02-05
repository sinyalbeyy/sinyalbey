'use client';

import { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';

const MiniTestimonials = () => {
  const testimonials = [
    'Bugün kapandı sandım, son anda girdim.',
    'Kurallar sert, o yüzden kalite var.',
    'Sinyal değil sistem; fark bu.',
    'Bitget tarafı ciddi, herkes alınmıyor.',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="glass-card p-4 border-[var(--gold)]/10 relative overflow-hidden">
      <div className="flex items-center gap-2 mb-3">
        <Quote className="w-3 h-3 text-[var(--gold)]/40" />
        <h4 className="text-xs font-semibold text-[var(--foreground)]">Topluluktan</h4>
      </div>

      <div className="relative h-10 overflow-hidden">
        {testimonials.map((text, index) => (
          <p
            key={index}
            className={`absolute inset-0 text-xs text-[var(--foreground-muted)] italic leading-relaxed transition-all duration-500 ${
              index === currentIndex
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            &quot;{text}&quot;
          </p>
        ))}
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-1 mt-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-1 h-1 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-[var(--gold)] w-3'
                : 'bg-[var(--foreground-muted)]/30'
            }`}
            aria-label={`Yorum ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MiniTestimonials;
