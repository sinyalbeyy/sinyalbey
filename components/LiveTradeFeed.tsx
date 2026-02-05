'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, X } from 'lucide-react';

interface Trade {
  id: number;
  pair: string;
  profit: string;
  time: string;
  type: 'long' | 'short';
}

const PAIRS = [
  'BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'XRP/USDT', 'DOGE/USDT',
  'ADA/USDT', 'AVAX/USDT', 'MATIC/USDT', 'DOT/USDT', 'LINK/USDT',
  'ATOM/USDT', 'UNI/USDT', 'LTC/USDT', 'FIL/USDT', 'APT/USDT',
];

const TIMES = ['az önce', '1 dk önce', '2 dk önce', '3 dk önce', '5 dk önce'];

function generateTrade(id: number): Trade {
  const pair = PAIRS[Math.floor(Math.random() * PAIRS.length)];
  const profit = Math.floor(Math.random() * 150) + 15;
  const time = TIMES[Math.floor(Math.random() * TIMES.length)];
  const type = Math.random() > 0.3 ? 'long' : 'short';

  return { id, pair, profit: `+%${profit}`, time, type };
}

export default function LiveTradeFeed() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [currentTrade, setCurrentTrade] = useState<Trade | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Initial delay before first trade
    const initialDelay = setTimeout(() => {
      showNewTrade();
    }, 5000);

    return () => clearTimeout(initialDelay);
  }, []);

  useEffect(() => {
    if (dismissed) return;

    const interval = setInterval(() => {
      showNewTrade();
    }, 8000 + Math.random() * 7000); // 8-15 seconds

    return () => clearInterval(interval);
  }, [trades.length, dismissed]);

  const showNewTrade = () => {
    const newTrade = generateTrade(Date.now());
    setTrades(prev => [newTrade, ...prev].slice(0, 10));
    setCurrentTrade(newTrade);
    setIsVisible(true);

    // Auto-hide after 5 seconds
    setTimeout(() => {
      setIsVisible(false);
    }, 5000);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setDismissed(true);
  };

  if (dismissed || !currentTrade) return null;

  return (
    <div
      className={`fixed bottom-4 left-4 z-50 transition-all duration-500 ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <div className="relative group">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-[var(--gold)]/20 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity" />

        {/* Card */}
        <div className="relative flex items-center gap-3 px-4 py-3 bg-[var(--background)]/95 backdrop-blur-xl border border-green-500/30 rounded-2xl shadow-2xl">
          {/* Icon */}
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-[var(--foreground)]">
                {currentTrade.pair}
              </span>
              <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                currentTrade.type === 'long'
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-red-500/20 text-red-400'
              }`}>
                {currentTrade.type.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-lg font-bold text-green-400">
                {currentTrade.profit}
              </span>
              <span className="text-[10px] text-[var(--foreground-muted)]">
                {currentTrade.time}
              </span>
            </div>
          </div>

          {/* Live indicator */}
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-500/10 border border-green-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[9px] font-medium text-green-400 uppercase tracking-wider">
              Canlı
            </span>
          </div>

          {/* Dismiss button */}
          <button
            onClick={handleDismiss}
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[var(--background)] border border-[var(--glass-border)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/10 hover:border-red-500/30"
          >
            <X className="w-3 h-3 text-[var(--foreground-muted)]" />
          </button>
        </div>
      </div>
    </div>
  );
}
