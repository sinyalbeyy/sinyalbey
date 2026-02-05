'use client';

import { Status, STATUS_LABELS, STATUS_COLORS } from '@/types/application';

interface StatusDropdownProps {
  value: Status;
  onChange: (status: Status) => void;
  disabled?: boolean;
}

export default function StatusDropdown({ value, onChange, disabled }: StatusDropdownProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as Status)}
      disabled={disabled}
      className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border cursor-pointer focus:outline-none focus:ring-1 focus:ring-[var(--gold)]/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-transparent ${STATUS_COLORS[value]}`}
    >
      {Object.values(Status).map((s) => (
        <option key={s} value={s} className="bg-[var(--background)] text-[var(--foreground)]">
          {STATUS_LABELS[s]}
        </option>
      ))}
    </select>
  );
}
