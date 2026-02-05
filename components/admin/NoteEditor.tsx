'use client';

import { useState } from 'react';
import { Pencil, Check, X } from 'lucide-react';

interface NoteEditorProps {
  value: string | null;
  onSave: (note: string) => void;
  disabled?: boolean;
}

export default function NoteEditor({ value, onSave, disabled }: NoteEditorProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value || '');

  const handleSave = () => {
    onSave(draft);
    setEditing(false);
  };

  const handleCancel = () => {
    setDraft(value || '');
    setEditing(false);
  };

  if (!editing) {
    return (
      <div className="flex items-center gap-1.5 group">
        <span className="text-xs text-[var(--foreground-muted)] truncate max-w-[150px]">
          {value || '-'}
        </span>
        <button
          onClick={() => setEditing(true)}
          disabled={disabled}
          className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-white/5 transition-all disabled:hidden"
        >
          <Pencil className="w-3 h-3 text-[var(--foreground-muted)]" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <input
        type="text"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        className="w-[150px] px-2 py-1 rounded-lg bg-[var(--background)] border border-[var(--glass-border)] text-xs text-[var(--foreground)] focus:border-[var(--gold)]/30 focus:outline-none"
        autoFocus
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSave();
          if (e.key === 'Escape') handleCancel();
        }}
      />
      <button onClick={handleSave} className="p-1 rounded hover:bg-green-500/10 transition-colors">
        <Check className="w-3.5 h-3.5 text-green-400" />
      </button>
      <button onClick={handleCancel} className="p-1 rounded hover:bg-red-500/10 transition-colors">
        <X className="w-3.5 h-3.5 text-red-400" />
      </button>
    </div>
  );
}
