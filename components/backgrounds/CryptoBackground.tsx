const CryptoBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Blockchain Node Pattern - Very subtle */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.025 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="nodePattern"
            x="0"
            y="0"
            width="120"
            height="120"
            patternUnits="userSpaceOnUse"
          >
            {/* Nodes */}
            <circle cx="0" cy="0" r="2" fill="#d4af37" />
            <circle cx="120" cy="0" r="2" fill="#d4af37" />
            <circle cx="60" cy="60" r="2.5" fill="#d4af37" />
            <circle cx="0" cy="120" r="2" fill="#d4af37" />
            <circle cx="120" cy="120" r="2" fill="#d4af37" />

            {/* Connection lines */}
            <line x1="0" y1="0" x2="60" y2="60" stroke="#d4af37" strokeWidth="0.5" />
            <line x1="120" y1="0" x2="60" y2="60" stroke="#d4af37" strokeWidth="0.5" />
            <line x1="0" y1="120" x2="60" y2="60" stroke="#d4af37" strokeWidth="0.5" />
            <line x1="120" y1="120" x2="60" y2="60" stroke="#d4af37" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#nodePattern)" />
      </svg>
    </div>
  );
};

export default CryptoBackground;
