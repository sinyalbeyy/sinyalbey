'use client';

import { Source, Status, SOURCE_LABELS, STATUS_LABELS } from '@/types/application';
import { Search } from 'lucide-react';

interface FilterBarProps {
  source: string;
  status: string;
  search: string;
  onSourceChange: (source: string) => void;
  onStatusChange: (status: string) => void;
  onSearchChange: (search: string) => void;
}

export default function FilterBar({
  source,
  status,
  search,
  onSourceChange,
  onStatusChange,
  onSearchChange,
}: FilterBarProps) {
  const selectClass =
    'px-3 py-2 rounded-xl bg-[var(--background)] border border-[var(--glass-border)] text-sm text-[var(--foreground)] focus:border-[var(--gold)]/30 focus:outline-none cursor-pointer';

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <select
        value={source}
        onChange={(e) => onSourceChange(e.target.value)}
        className={selectClass}
      >
        <option value="">Tüm Kaynaklar</option>
        {Object.values(Source).map((s) => (
          <option key={s} value={s}>
            {SOURCE_LABELS[s]}
          </option>
        ))}
      </select>

      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className={selectClass}
      >
        <option value="">Tüm Durumlar</option>
        {Object.values(Status).map((s) => (
          <option key={s} value={s}>
            {STATUS_LABELS[s]}
          </option>
        ))}
      </select>

      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--foreground-muted)]" />
        <input
          type="text"
          placeholder="Telegram veya UID ara..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-4 py-2 rounded-xl bg-[var(--background)] border border-[var(--glass-border)] text-sm text-[var(--foreground)] placeholder:text-[var(--foreground-muted)]/40 focus:border-[var(--gold)]/30 focus:outline-none"
        />
      </div>
    </div>
  );
}
