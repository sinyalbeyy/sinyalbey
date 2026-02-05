const HeroBackground = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Radial Gold Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, rgba(212,175,55,0.02) 40%, transparent 70%)',
        }}
      />

      {/* Abstract Chart Grid Pattern */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.04 }}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="chartGrid"
            x="0"
            y="0"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <line x1="0" y1="20" x2="80" y2="20" stroke="#d4af37" strokeWidth="0.5" />
            <line x1="0" y1="40" x2="80" y2="40" stroke="#d4af37" strokeWidth="0.3" />
            <line x1="0" y1="60" x2="80" y2="60" stroke="#d4af37" strokeWidth="0.5" />
            <line x1="20" y1="0" x2="20" y2="80" stroke="#d4af37" strokeWidth="0.3" />
            <line x1="40" y1="0" x2="40" y2="80" stroke="#d4af37" strokeWidth="0.5" />
            <line x1="60" y1="0" x2="60" y2="80" stroke="#d4af37" strokeWidth="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#chartGrid)" />
      </svg>

      {/* Abstract price line */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.035 }}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1000 600"
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d4af37" stopOpacity="0" />
            <stop offset="20%" stopColor="#d4af37" stopOpacity="1" />
            <stop offset="80%" stopColor="#d4af37" stopOpacity="1" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0 400 Q100 380 200 350 T400 300 T600 280 T800 200 T1000 180"
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="1.5"
        />
        <path
          d="M0 450 Q150 420 300 400 T500 380 T700 320 T900 280 T1000 260"
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="1"
        />
      </svg>

      {/* Watermark Coin - More visible */}
      <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 md:translate-x-1/3 md:translate-y-1/3">
        <svg
          width="600"
          height="600"
          viewBox="0 0 200 200"
          style={{ opacity: 0.05 }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="100" cy="100" r="90" fill="none" stroke="#d4af37" strokeWidth="2" />
          <circle cx="100" cy="100" r="80" fill="none" stroke="#d4af37" strokeWidth="1" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="#d4af37" strokeWidth="0.5" />
          <path
            d="M85 60 L85 140 M85 60 L105 60 Q125 60 125 80 Q125 100 105 100 L85 100 M85 100 L110 100 Q130 100 130 120 Q130 140 110 140 L85 140"
            fill="none"
            stroke="#d4af37"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line x1="95" y1="50" x2="95" y2="150" stroke="#d4af37" strokeWidth="2" />
          <line x1="105" y1="50" x2="105" y2="150" stroke="#d4af37" strokeWidth="2" />
        </svg>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[var(--gold)] animate-float-particle"
            style={{
              left: `${10 + (i * 9)}%`,
              top: `${15 + (i % 4) * 20}%`,
              opacity: 0.15 + (i % 3) * 0.1,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${8 + (i % 3) * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBackground;
