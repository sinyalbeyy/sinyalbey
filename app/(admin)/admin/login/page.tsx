'use client';

import { useState } from 'react';
import { Loader2, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Giriş başarısız.');
        return;
      }

      router.push('/admin');
    } catch {
      setError('Bağlantı hatası. Tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="glass-card-strong p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/20 flex items-center justify-center">
              <Lock className="w-5 h-5 text-[var(--gold)]" />
            </div>
          </div>

          <h1 className="text-xl font-bold text-center text-[var(--foreground)] mb-1">
            Sinyal Bey Admin
          </h1>
          <p className="text-xs text-center text-[var(--foreground-muted)] mb-8">
            Yönetim paneline giriş yapın
          </p>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-xs font-medium text-[var(--foreground)]/80 mb-2">
                Kullanıcı Adı
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--glass-border)] text-[var(--foreground)] placeholder:text-[var(--foreground-muted)]/30 focus:border-[var(--gold)]/30 focus:ring-1 focus:ring-[var(--gold)]/10 focus:outline-none transition-all text-sm"
                required
                autoComplete="username"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-medium text-[var(--foreground)]/80 mb-2">
                Şifre
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--glass-border)] text-[var(--foreground)] placeholder:text-[var(--foreground-muted)]/30 focus:border-[var(--gold)]/30 focus:ring-1 focus:ring-[var(--gold)]/10 focus:outline-none transition-all text-sm"
                required
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[var(--gold)] to-[var(--gold-dark)] text-black font-semibold text-sm transition-all hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Giriş yapılıyor...
                </>
              ) : (
                'Giriş Yap'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
