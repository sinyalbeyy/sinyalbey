'use client';

import { useState } from 'react';

interface SorguResult {
  uid: string;
  totalFee: string;
  rebate: string;
  startDate: string;
  endDate: string;
}

interface Talep {
  id: number;
  rebate: string;
  address: string;
  donemler: string;
  durum: string;
  createdAt: string;
}

const TR_MONTHS_SHORT = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];

function isValidTRC20(address: string): boolean {
  return /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(address);
}

function formatDateTR(isoDate: string): string {
  const d = new Date(isoDate + 'T00:00:00Z');
  return `${d.getUTCDate()} ${TR_MONTHS_SHORT[d.getUTCMonth()]}`;
}

function shortenAddress(addr: string) {
  if (addr.length < 12) return addr;
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export default function UidSorguPage() {
  const [uid, setUid] = useState('');
  const [result, setResult] = useState<SorguResult | null>(null);
  const [address, setAddress] = useState('');
  const [addressTouched, setAddressTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [gecmis, setGecmis] = useState<Talep[]>([]);

  async function handleSorgu() {
    if (!uid.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setSubmitted(false);
    setGecmis([]);

    try {
      const [sorguRes, gecmisRes] = await Promise.all([
        fetch(`/api/uid-sorgu?uid=${encodeURIComponent(uid.trim())}`),
        fetch(`/api/cekim-gecmis?uid=${encodeURIComponent(uid.trim())}`),
      ]);

      const sorguData = await sorguRes.json();
      if (!sorguRes.ok) {
        setError(sorguData.error || 'Bir hata oluştu.');
      } else {
        setResult(sorguData);
      }

      if (gecmisRes.ok) {
        const gecmisData = await gecmisRes.json();
        setGecmis(gecmisData.talepler ?? []);
      }
    } catch {
      setError('Sunucuya ulaşılamadı.');
    } finally {
      setLoading(false);
    }
  }

  async function fetchGecmis() {
    if (!uid.trim()) return;
    try {
      const res = await fetch(`/api/cekim-gecmis?uid=${encodeURIComponent(uid.trim())}`);
      const data = await res.json();
      setGecmis(data.talepler ?? []);
    } catch { /* ignore */ }
  }

  const rebateNum = result ? parseFloat(result.rebate) : 0;
  const belowMin = rebateNum < 10;
  const addressValid = isValidTRC20(address);
  const addressError = addressTouched && address.length > 0 && !addressValid;

  async function handleCekim() {
    if (!result || !address.trim() || !addressValid || belowMin) return;
    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch('/api/cekim-talebi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: uid.trim(),
          rebate: result.rebate,
          address: address.trim(),
          donemler: [`${result.startDate}/${result.endDate}`],
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error || 'Talep gönderilemedi.');
      } else {
        setSubmitted(true);
        await fetchGecmis();
      }
    } catch {
      setSubmitError('Sunucuya ulaşılamadı.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh' }} className="px-4 py-16">
      <div className="w-full max-w-lg mx-auto space-y-6">

        {/* Header */}
        <div className="text-center mb-2">
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">İade Sorgula</h1>
          <p className="text-zinc-500 text-sm">
            Bitget UID&apos;ini gir, biriken iadenı talep et.
          </p>
        </div>

        {/* UID Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSorgu()}
            placeholder="Bitget UID numaranız"
            className="flex-1 bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 rounded-xl px-4 py-3 text-sm outline-none focus:border-zinc-600 transition-all"
          />
          <button
            onClick={handleSorgu}
            disabled={loading || !uid.trim()}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 disabled:from-zinc-700 disabled:to-zinc-700 disabled:cursor-not-allowed text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-green-900/30"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Sorgulanıyor
              </span>
            ) : 'Sorgula'}
          </button>
        </div>

        {error && (
          <div className="bg-red-950/60 border border-red-800/60 text-red-400 text-sm rounded-xl px-4 py-3">
            {error}
          </div>
        )}

        {/* Sonuç Kartı */}
        {result && !submitted && (
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-4">
            <div>
              <p className="text-zinc-500 text-xs mb-2">
                {formatDateTR(result.startDate)} - bugün arası birikmiş iade
              </p>
              <div className="flex items-end gap-2">
                <span className="text-green-400 font-bold text-3xl">{result.rebate}</span>
                <span className="text-green-400 font-semibold text-lg mb-0.5">USDT</span>
              </div>
              <p className="text-zinc-600 text-xs mt-1">İade (%80)</p>
            </div>

            {rebateNum === 0 && (
              <p className="text-zinc-600 text-sm text-center py-2">
                Henüz birikmiş iade bulunmuyor.
              </p>
            )}

            {rebateNum > 0 && belowMin && (
              <div className="bg-yellow-950/50 border border-yellow-800/50 text-yellow-500 text-xs rounded-lg px-3 py-2">
                Minimum çekim tutarı 10 USDT&apos;dir.
              </div>
            )}

            {rebateNum >= 10 && (
              <>
                <div className="border-t border-zinc-800" />

                <div>
                  <label className="text-zinc-400 text-xs block mb-1.5">TRC-20 USDT Adresi</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      onBlur={() => setAddressTouched(true)}
                      placeholder="T..."
                      className={`w-full bg-zinc-950 border text-white placeholder-zinc-600 rounded-xl px-4 py-2.5 pr-10 text-sm outline-none transition-colors ${
                        addressError
                          ? 'border-red-600 focus:border-red-500'
                          : addressValid && address.length > 0
                          ? 'border-green-600 focus:border-green-500'
                          : 'border-zinc-700 focus:border-zinc-500'
                      }`}
                    />
                    {address.length > 0 && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {addressValid ? (
                          <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                      </div>
                    )}
                  </div>
                  {addressError && <p className="text-red-500 text-xs mt-1">Geçersiz TRC-20 adresi</p>}
                </div>

                {submitError && <div className="text-red-400 text-xs">{submitError}</div>}

                <button
                  onClick={handleCekim}
                  disabled={submitting || !address.trim() || !addressValid}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 disabled:from-zinc-700 disabled:to-zinc-700 disabled:cursor-not-allowed text-white font-semibold text-sm py-3 rounded-xl transition-all duration-200 shadow-lg shadow-green-900/20"
                >
                  {submitting ? 'Gönderiliyor...' : 'Çekim Talebi Oluştur'}
                </button>
              </>
            )}
          </div>
        )}

        {/* Başarı */}
        {submitted && (
          <div className="bg-green-950/40 border border-green-700/50 text-green-400 text-sm rounded-2xl px-5 py-4 text-center">
            ✓ Çekim talebiniz alındı. En kısa sürede işleme alınacak.
          </div>
        )}

        {/* Geçmiş Talepler */}
        {gecmis.length > 0 && (
          <div className="space-y-3">
            <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Geçmiş Taleplerim</p>
            {gecmis.map((t) => (
              <div key={t.id} className="bg-zinc-900/60 border border-zinc-800 rounded-xl px-4 py-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-white text-sm font-medium">{t.rebate} USDT</div>
                  <div className="text-zinc-500 text-xs mt-0.5">
                    {shortenAddress(t.address)} · {new Date(t.createdAt).toLocaleDateString('tr-TR')}
                  </div>
                </div>
                <span className={`shrink-0 inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                  t.durum === 'odendi' ? 'bg-green-900/60 text-green-400' : 'bg-yellow-900/60 text-yellow-400'
                }`}>
                  {t.durum === 'odendi' ? 'Ödendi' : 'Beklemede'}
                </span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
