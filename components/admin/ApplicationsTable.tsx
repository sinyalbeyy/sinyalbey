'use client';

import { Application, SOURCE_LABELS, Source, Status } from '@/types/application';
import StatusDropdown from './StatusDropdown';
import NoteEditor from './NoteEditor';
import CopyButton from './CopyButton';

interface ApplicationsTableProps {
  applications: Application[];
  onStatusChange: (id: string, status: Status) => void;
  onNoteChange: (id: string, note: string) => void;
  updating: string | null;
}

export default function ApplicationsTable({
  applications,
  onStatusChange,
  onNoteChange,
  updating,
}: ApplicationsTableProps) {
  if (applications.length === 0) {
    return (
      <div className="text-center py-16 text-[var(--foreground-muted)] text-sm">
        Başvuru bulunamadı.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-[var(--glass-border)]">
            <th className="px-4 py-3 text-xs font-medium text-[var(--foreground-muted)] uppercase tracking-wider">Tarih</th>
            <th className="px-4 py-3 text-xs font-medium text-[var(--foreground-muted)] uppercase tracking-wider">Kaynak</th>
            <th className="px-4 py-3 text-xs font-medium text-[var(--foreground-muted)] uppercase tracking-wider">Telegram</th>
            <th className="px-4 py-3 text-xs font-medium text-[var(--foreground-muted)] uppercase tracking-wider">UID / TxID</th>
            <th className="px-4 py-3 text-xs font-medium text-[var(--foreground-muted)] uppercase tracking-wider">Plan</th>
            <th className="px-4 py-3 text-xs font-medium text-[var(--foreground-muted)] uppercase tracking-wider">Durum</th>
            <th className="px-4 py-3 text-xs font-medium text-[var(--foreground-muted)] uppercase tracking-wider">Not</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--glass-border)]">
          {applications.map((app) => (
            <tr key={app.id} className="hover:bg-white/[0.02] transition-colors">
              <td className="px-4 py-3 text-xs text-[var(--foreground-muted)] whitespace-nowrap">
                {new Date(app.createdAt).toLocaleDateString('tr-TR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </td>
              <td className="px-4 py-3">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium border ${
                  app.source === Source.BITGET_CLUB
                    ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                    : 'bg-[var(--gold)]/10 text-[var(--gold)] border-[var(--gold)]/20'
                }`}>
                  {SOURCE_LABELS[app.source]}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm text-[var(--foreground)]">{app.telegramUsername}</span>
                  <CopyButton text={app.telegramUsername} />
                  {(() => {
                    const username = app.telegramUsername?.trim();
                    const isValid = username && username.length > 1;
                    const tgHandle = isValid
                      ? username.startsWith('@') ? username.slice(1) : username
                      : '';
                    return (
                      <a
                        href={isValid ? `https://t.me/${tgHandle}` : undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => !isValid && e.preventDefault()}
                        aria-disabled={!isValid}
                        title={isValid ? `Telegram'dan Yaz: ${username}` : 'Geçersiz kullanıcı adı'}
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium border transition-all duration-200 whitespace-nowrap ${
                          isValid
                            ? 'bg-[var(--gold)]/10 text-[var(--gold)] border-[var(--gold)]/20 hover:bg-[var(--gold)]/20 hover:border-[var(--gold)]/40 hover:shadow-[0_0_8px_rgba(var(--gold-rgb),0.15)] cursor-pointer'
                            : 'bg-white/5 text-[var(--foreground-muted)]/40 border-[var(--glass-border)] cursor-not-allowed opacity-50'
                        }`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 shrink-0">
                          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                        </svg>
                        <span className="hidden sm:inline">Telegram'dan Yaz</span>
                      </a>
                    );
                  })()}
                </div>
              </td>
              <td className="px-4 py-3 text-sm text-[var(--foreground-muted)]">
                {app.bitgetUid ? (
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs">{app.bitgetUid}</span>
                    <CopyButton text={app.bitgetUid} />
                  </div>
                ) : '-'}
              </td>
              <td className="px-4 py-3 text-sm text-[var(--foreground-muted)]">
                {app.selectedPlan || '-'}
              </td>
              <td className="px-4 py-3">
                <StatusDropdown
                  value={app.status}
                  onChange={(status) => onStatusChange(app.id, status)}
                  disabled={updating === app.id}
                />
              </td>
              <td className="px-4 py-3">
                <NoteEditor
                  value={app.adminNote}
                  onSave={(note) => onNoteChange(app.id, note)}
                  disabled={updating === app.id}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
