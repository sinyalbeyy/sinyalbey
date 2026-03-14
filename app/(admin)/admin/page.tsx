'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, RefreshCw, ChevronLeft, ChevronRight, Copy, Check } from 'lucide-react';
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

type CekimFilter = 'tumu' | 'beklemede' | 'odendi' | 'iptal';

function durumStyle(durum: string) {
  if (durum === 'odendi') return 'bg-green-900/60 text-green-400';
  if (durum === 'iptal') return 'bg-red-900/60 text-red-400';
  return 'bg-yellow-900/60 text-yellow-400';
}

function durumLabel(durum: string) {
  if (durum === 'odendi') return 'Ödendi';
  if (durum === 'iptal') return 'İptal';
  return 'Beklemede';
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }
  return (
    <button
      onClick={handleCopy}
      title={text}
      className="flex items-center gap-1 font-mono text-xs text-[var(--foreground-muted)] hover:text-white transition-colors max-w-[160px] truncate"
    >
      <span className="truncate">{text.slice(0, 8)}...{text.slice(-4)}</span>
      {copied
        ? <Check className="w-3 h-3 text-green-400 shrink-0" />
        : <Copy className="w-3 h-3 shrink-0 opacity-50" />}
    </button>
  );
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
  const [cekimFilter, setCekimFilter] = useState<CekimFilter>('tumu');
  const [uidFilter, setUidFilter] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  }

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

  useEffect(() => { fetchApplications(); }, [fetchApplications]);
  useEffect(() => { setPage(1); }, [source, status, search]);
  useEffect(() => { if (tab === 'cekim') fetchTalepler(); }, [tab, fetchTalepler]);

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
        setApplications((prev) => prev.map((app) => (app.id === id ? data.application : app)));
      }
    } finally { setUpdating(null); }
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
        setApplications((prev) => prev.map((app) => (app.id === id ? data.application : app)));
      }
    } finally { setUpdating(null); }
  };

  const handleDurumChange = async (id: number, durum: string) => {
    setCekimUpdating(id);
    try {
      const res = await fetch(`/api/admin/cekim-talepleri/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ durum }),
      });
      if (res.ok) {
        setTalepler((prev) => prev.map((t) => (t.id === id ? { ...t, durum } : t)));
      }
    } finally { setCekimUpdating(null); }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  // Filtered talepler
  const filteredTalepler = talepler.filter((t) => {
    if (uidFilter && t.uid !== uidFilter) return false;
    if (cekimFilter === 'tumu') return true;
    return t.durum === cekimFilter;
  });

  // Stats
  const bekleyenler = talepler.filter((t) => t.durum === 'beklemede');
  const odenenler = talepler.filter((t) => t.durum === 'odendi');
  const iptaller = talepler.filter((t) => t.durum === 'iptal');
  const bekleyenTutar = bekleyenler.reduce((s, t) => s + parseFloat(t.rebate), 0);
  const ödenenTutar = odenenler.reduce((s, t) => s + parseFloat(t.rebate), 0);

  const FILTERS: { key: CekimFilter; label: string }[] = [
    { key: 'tumu', label: 'Tümü' },
    { key: 'beklemede', label: 'Beklemede' },
    { key: 'odendi', label: 'Ödendi' },
    { key: 'iptal', label: 'İptal' },
  ];

  return (
    <div className="min-h-screen">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-zinc-800 border border-zinc-600 text-white text-sm px-4 py-2 rounded-lg shadow-xl">
          {toast}
        </div>
      )}

      {/* Top Bar */}
      <header className="sticky top-0 z-40 border-b border-[var(--glass-border)] bg-[var(--background)]/80 backdrop-blur-xl">
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
            <FilterBar source={source} status={status} search={search} onSourceChange={setSource} onStatusChange={setStatus} onSearchChange={setSearch} />
            <div className="glass-card overflow-hidden">
              {loading ? (
                <div className="flex items-center justify-center py-16">
                  <RefreshCw className="w-5 h-5 animate-spin text-[var(--gold)]" />
                </div>
              ) : (
                <ApplicationsTable applications={applications} onStatusChange={handleStatusChange} onNoteChange={handleNoteChange} updating={updating} />
              )}
            </div>
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="p-2 rounded-lg border border-[var(--glass-border)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-sm text-[var(--foreground-muted)]">{page} / {totalPages}</span>
                <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-2 rounded-lg border border-[var(--glass-border)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}

        {/* Çekim Talepleri Tab */}
        {tab === 'cekim' && (
          <>
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-[var(--foreground)]">Çekim Talepleri</h2>
                <p className="text-xs text-[var(--foreground-muted)]">{talepler.length} toplam talep</p>
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

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="glass-card p-4">
                <div className="text-xs text-[var(--foreground-muted)] mb-1">Bekleyen</div>
                <div className="text-lg font-bold text-yellow-400">{bekleyenler.length}</div>
                <div className="text-xs text-[var(--foreground-muted)] mt-0.5">{bekleyenTutar.toFixed(2)} USDT</div>
              </div>
              <div className="glass-card p-4">
                <div className="text-xs text-[var(--foreground-muted)] mb-1">Ödenen</div>
                <div className="text-lg font-bold text-green-400">{odenenler.length}</div>
                <div className="text-xs text-[var(--foreground-muted)] mt-0.5">{ödenenTutar.toFixed(2)} USDT</div>
              </div>
              <div className="glass-card p-4">
                <div className="text-xs text-[var(--foreground-muted)] mb-1">İptal</div>
                <div className="text-lg font-bold text-red-400">{iptaller.length}</div>
                <div className="text-xs text-[var(--foreground-muted)] mt-0.5">—</div>
              </div>
            </div>

            {/* Filtreler */}
            <div className="flex items-center gap-2 flex-wrap">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setCekimFilter(f.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    cekimFilter === f.key
                      ? 'bg-white/10 text-white border border-white/20'
                      : 'text-[var(--foreground-muted)] hover:text-white border border-[var(--glass-border)]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
              {uidFilter && (
                <button
                  onClick={() => setUidFilter(null)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-900/40 text-blue-400 border border-blue-800/50 flex items-center gap-1"
                >
                  UID: {uidFilter}
                  <span>×</span>
                </button>
              )}
            </div>

            {/* Tablo */}
            <div className="glass-card overflow-x-auto">
              {cekimLoading ? (
                <div className="flex items-center justify-center py-16">
                  <RefreshCw className="w-5 h-5 animate-spin text-[var(--gold)]" />
                </div>
              ) : filteredTalepler.length === 0 ? (
                <div className="text-center py-16 text-[var(--foreground-muted)] text-sm">
                  Talep bulunamadı.
                </div>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--glass-border)] text-left">
                      {['UID', 'Miktar', 'Adres', 'Dönemler', 'Durum', 'Tarih', 'İşlemler'].map((h) => (
                        <th key={h} className="px-4 py-3 text-xs font-medium text-[var(--foreground-muted)] whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTalepler.map((t) => (
                      <tr key={t.id} className="border-b border-[var(--glass-border)] last:border-0 hover:bg-white/2 transition-colors">
                        {/* UID */}
                        <td className="px-4 py-3">
                          <button
                            onClick={() => setUidFilter(uidFilter === t.uid ? null : t.uid)}
                            className={`font-mono text-xs transition-colors ${uidFilter === t.uid ? 'text-blue-400' : 'text-[var(--foreground)] hover:text-blue-400'}`}
                          >
                            {t.uid}
                          </button>
                        </td>
                        {/* Miktar */}
                        <td className="px-4 py-3 text-green-400 font-semibold whitespace-nowrap">
                          {t.rebate} USDT
                        </td>
                        {/* Adres */}
                        <td className="px-4 py-3">
                          <button
                            onClick={async () => {
                              await navigator.clipboard.writeText(t.address);
                              showToast('Adres kopyalandı!');
                            }}
                            title={t.address}
                            className="flex items-center gap-1.5 font-mono text-xs text-[var(--foreground-muted)] hover:text-white transition-colors"
                          >
                            <span>{t.address.slice(0, 6)}...{t.address.slice(-4)}</span>
                            <Copy className="w-3 h-3 shrink-0 opacity-50" />
                          </button>
                        </td>
                        {/* Dönemler */}
                        <td className="px-4 py-3 text-[var(--foreground-muted)] text-xs max-w-[160px] truncate">
                          {t.donemler}
                        </td>
                        {/* Durum */}
                        <td className="px-4 py-3">
                          <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${durumStyle(t.durum)}`}>
                            {durumLabel(t.durum)}
                          </span>
                        </td>
                        {/* Tarih */}
                        <td className="px-4 py-3 text-[var(--foreground-muted)] text-xs whitespace-nowrap">
                          {new Date(t.createdAt).toLocaleDateString('tr-TR')}
                        </td>
                        {/* İşlemler */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            {t.durum !== 'odendi' && (
                              <button
                                onClick={() => handleDurumChange(t.id, 'odendi')}
                                disabled={cekimUpdating === t.id}
                                className="px-2 py-1 rounded text-xs bg-green-900/60 hover:bg-green-800/80 text-green-400 transition-colors disabled:opacity-50"
                              >
                                Ödendi
                              </button>
                            )}
                            {t.durum !== 'iptal' && (
                              <button
                                onClick={() => handleDurumChange(t.id, 'iptal')}
                                disabled={cekimUpdating === t.id}
                                className="px-2 py-1 rounded text-xs bg-red-900/60 hover:bg-red-800/80 text-red-400 transition-colors disabled:opacity-50"
                              >
                                İptal
                              </button>
                            )}
                            {t.durum !== 'beklemede' && (
                              <button
                                onClick={() => handleDurumChange(t.id, 'beklemede')}
                                disabled={cekimUpdating === t.id}
                                className="px-2 py-1 rounded text-xs bg-yellow-900/60 hover:bg-yellow-800/80 text-yellow-400 transition-colors disabled:opacity-50"
                              >
                                Beklemede
                              </button>
                            )}
                          </div>
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
