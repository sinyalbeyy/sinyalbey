'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import FilterBar from '@/components/admin/FilterBar';
import ApplicationsTable from '@/components/admin/ApplicationsTable';
import { Application, Status } from '@/types/application';

interface CekimTalebi {
  id: number;
  uid: string;
  rebate: string;
  address: string;
  donemler: string;
  durum: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<'basvurular' | 'cekim'>('basvurular');

  // Applications state
  const [applications, setApplications] = useState<Application[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [source, setSource] = useState('');
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');

  // Cekim state
  const [talepler, setTalepler] = useState<CekimTalebi[]>([]);
  const [cekimLoading, setCekimLoading] = useState(false);
  const [cekimUpdating, setCekimUpdating] = useState<number | null>(null);

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (source) params.set('source', source);
      if (status) params.set('status', status);
      if (search) params.set('search', search);
      params.set('page', page.toString());

      const res = await fetch(`/api/admin/applications?${params}`);
      if (!res.ok) throw new Error();

      const data = await res.json();
      setApplications(data.applications);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    } catch {
      setApplications([]);
    } finally {
      setLoading(false);
    }
  }, [source, status, search, page]);

  const fetchTalepler = useCallback(async () => {
    setCekimLoading(true);
    try {
      const res = await fetch('/api/admin/cekim-talepleri');
      const data = await res.json();
      setTalepler(data.talepler ?? []);
    } catch {
      setTalepler([]);
    } finally {
      setCekimLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  useEffect(() => {
    setPage(1);
  }, [source, status, search]);

  useEffect(() => {
    if (tab === 'cekim') fetchTalepler();
  }, [tab, fetchTalepler]);

  const handleStatusChange = async (id: string, newStatus: Status) => {
    setUpdating(id);
    try {
      const res = await fetch(`/api/admin/applications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        const data = await res.json();
        setApplications((prev) =>
          prev.map((app) => (app.id === id ? data.application : app))
        );
      }
    } finally {
      setUpdating(null);
    }
  };

  const handleNoteChange = async (id: string, note: string) => {
    setUpdating(id);
    try {
      const res = await fetch(`/api/admin/applications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminNote: note }),
      });

      if (res.ok) {
        const data = await res.json();
        setApplications((prev) =>
          prev.map((app) => (app.id === id ? data.application : app))
        );
      }
    } finally {
      setUpdating(null);
    }
  };

  const handleOdendi = async (id: number) => {
    setCekimUpdating(id);
    try {
      const res = await fetch(`/api/admin/cekim-talepleri/${id}`, {
        method: 'PATCH',
      });
      if (res.ok) {
        setTalepler((prev) =>
          prev.map((t) => (t.id === id ? { ...t, durum: 'odendi' } : t))
        );
      }
    } finally {
      setCekimUpdating(null);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 border-b border-[var(--glass-border)] bg-[var(--background)]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <h1 className="text-sm font-bold text-[var(--foreground)]">
            Sinyal Bey <span className="text-[var(--gold)]">Admin</span>
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-white/5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Çıkış
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Tabs */}
        <div className="flex gap-1 border-b border-[var(--glass-border)]">
          {(['basvurular', 'cekim'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
                tab === t
                  ? 'border-[var(--gold)] text-[var(--foreground)]'
                  : 'border-transparent text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
              }`}
            >
              {t === 'basvurular' ? 'Başvurular' : 'Çekim Talepleri'}
            </button>
          ))}
        </div>

        {/* Başvurular Tab */}
        {tab === 'basvurular' && (
          <>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-[var(--foreground)]">Başvurular</h2>
                <p className="text-xs text-[var(--foreground-muted)]">Toplam {total} başvuru</p>
              </div>
              <button
                onClick={fetchApplications}
                disabled={loading}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-white/5 border border-[var(--glass-border)] transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                Yenile
              </button>
            </div>

            <FilterBar
              source={source}
              status={status}
              search={search}
              onSourceChange={setSource}
              onStatusChange={setStatus}
              onSearchChange={setSearch}
            />

            <div className="glass-card overflow-hidden">
              {loading ? (
                <div className="flex items-center justify-center py-16">
                  <RefreshCw className="w-5 h-5 animate-spin text-[var(--gold)]" />
                </div>
              ) : (
                <ApplicationsTable
                  applications={applications}
                  onStatusChange={handleStatusChange}
                  onNoteChange={handleNoteChange}
                  updating={updating}
                />
              )}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-2 rounded-lg border border-[var(--glass-border)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-sm text-[var(--foreground-muted)]">
                  {page} / {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-2 rounded-lg border border-[var(--glass-border)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}

        {/* Çekim Talepleri Tab */}
        {tab === 'cekim' && (
          <>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-[var(--foreground)]">Çekim Talepleri</h2>
                <p className="text-xs text-[var(--foreground-muted)]">{talepler.length} talep</p>
              </div>
              <button
                onClick={fetchTalepler}
                disabled={cekimLoading}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-white/5 border border-[var(--glass-border)] transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${cekimLoading ? 'animate-spin' : ''}`} />
                Yenile
              </button>
            </div>

            <div className="glass-card overflow-x-auto">
              {cekimLoading ? (
                <div className="flex items-center justify-center py-16">
                  <RefreshCw className="w-5 h-5 animate-spin text-[var(--gold)]" />
                </div>
              ) : talepler.length === 0 ? (
                <div className="text-center py-16 text-[var(--foreground-muted)] text-sm">
                  Henüz çekim talebi yok.
                </div>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--glass-border)] text-left">
                      {['UID', 'Miktar', 'Adres', 'Dönemler', 'Durum', 'Tarih', ''].map((h) => (
                        <th
                          key={h}
                          className="px-4 py-3 text-xs font-medium text-[var(--foreground-muted)] whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {talepler.map((t) => (
                      <tr
                        key={t.id}
                        className="border-b border-[var(--glass-border)] last:border-0 hover:bg-white/2 transition-colors"
                      >
                        <td className="px-4 py-3 text-[var(--foreground)] font-mono text-xs">
                          {t.uid}
                        </td>
                        <td className="px-4 py-3 text-green-400 font-semibold whitespace-nowrap">
                          {t.rebate} USDT
                        </td>
                        <td className="px-4 py-3 text-[var(--foreground-muted)] font-mono text-xs max-w-[180px] truncate">
                          {t.address}
                        </td>
                        <td className="px-4 py-3 text-[var(--foreground-muted)] text-xs">
                          {t.donemler}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                              t.durum === 'odendi'
                                ? 'bg-green-900 text-green-400'
                                : 'bg-yellow-900 text-yellow-400'
                            }`}
                          >
                            {t.durum === 'odendi' ? 'Ödendi' : 'Beklemede'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-[var(--foreground-muted)] text-xs whitespace-nowrap">
                          {new Date(t.createdAt).toLocaleDateString('tr-TR')}
                        </td>
                        <td className="px-4 py-3">
                          {t.durum !== 'odendi' && (
                            <button
                              onClick={() => handleOdendi(t.id)}
                              disabled={cekimUpdating === t.id}
                              className="px-3 py-1 rounded text-xs bg-green-900 hover:bg-green-800 text-green-400 transition-colors disabled:opacity-50"
                            >
                              {cekimUpdating === t.id ? '...' : 'Ödendi'}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
