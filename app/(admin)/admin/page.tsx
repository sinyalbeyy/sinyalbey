'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import FilterBar from '@/components/admin/FilterBar';
import ApplicationsTable from '@/components/admin/ApplicationsTable';
import { Application, Status } from '@/types/application';

export default function AdminDashboard() {
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  // Filters
  const [source, setSource] = useState('');
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');

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

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [source, status, search]);

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
        {/* Stats */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Başvurular</h2>
            <p className="text-xs text-[var(--foreground-muted)]">
              Toplam {total} başvuru
            </p>
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

        {/* Filters */}
        <FilterBar
          source={source}
          status={status}
          search={search}
          onSourceChange={setSource}
          onStatusChange={setStatus}
          onSearchChange={setSearch}
        />

        {/* Table */}
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

        {/* Pagination */}
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
      </div>
    </div>
  );
}
