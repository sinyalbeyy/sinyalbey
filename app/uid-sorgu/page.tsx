'use client';

import { useState, useEffect, useRef } from 'react';

interface Donem {
  donem: string;
  tip: 'gunluk' | 'haftalik';
  label: string;
  totalFee: string;
  rebate: string;
}

interface Talep {
  id: number;
  rebate: string;
  address: string;
  donemler: string;
  durum: string;
  createdAt: string;
}

function isValidTRC20(address: string): boolean {
  return /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(address);
}

function useCountUp(target: number, duration = 800) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (target === 0) { setValue(0); return; }
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(parseFloat((target * eased).toFixed(4)));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
      else setValue(target);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, duration]);

  return value;
}

function CountUp({ value }: { value: number }) {
  const animated = useCountUp(value);
  return <>{animated.toFixed(4)}</>;
}

function shortenAddress(addr: string) {
  if (addr.length < 12) return addr;
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export default function UidSorguPage() {
  const [uid, setUid] = useState('');
  const [allDonemler, setAllDonemler] = useState<Donem[]>([]);
  const [activeTab, setActiveTab] = useState<'gunluk' | 'haftalik'>('haftalik');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [address, setAddress] = useState('');
  const [addressTouched, setAddressTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [gecmis, setGecmis] = useState<Talep[]>([]);

  const donemler = allDonemler.filter((d) => d.tip === activeTab);

  async function handleSorgu() {
    if (!uid.trim()) return;
    setLoading(true);
    setError(null);
    setAllDonemler([]);
    setSelected(new Set());
    setSubmitted(false);
    setVisible(false);
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
        setAllDonemler(sorguData.donemler ?? []);
        setTimeout(() => setVisible(true), 50);
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

  function toggleSelect(donem: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(donem)) next.delete(donem);
      else next.add(donem);
      return next;
    });
    setSubmitted(false);
  }

  // Sekme değişince seçimi temizle
  function switchTab(tab: 'gunluk' | 'haftalik') {
    setActiveTab(tab);
    setSelected(new Set());
    setSubmitted(false);
    setSubmitError(null);
  }

  const selectedDonemler = donemler.filter((d) => selected.has(d.donem));
  const totalRebateNum = selectedDonemler.reduce((sum, d) => sum + parseFloat(d.rebate), 0);
  const totalRebate = totalRebateNum.toFixed(4);
  const belowMin = totalRebateNum < 10;
  const addressValid = isValidTRC20(address);
  const addressError = addressTouched && address.length > 0 && !addressValid;

  async function handleCekim() {
    if (selectedDonemler.length === 0 || !address.trim() || !addressValid || belowMin) return;
    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch('/api/cekim-talebi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: uid.trim(),
          rebate: totalRebate,
          address: address.trim(),
          donemler: selectedDonemler.map((d) => `${d.tip}:${d.donem}`),
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
            Bitget UID&apos;ini gir, dönemi seç, iadenı talep et.
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
            className="relative bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 disabled:from-zinc-700 disabled:to-zinc-700 disabled:cursor-not-allowed text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-green-900/30"
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

        {/* Bilgi Bölümü */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 space-y-5">
          <div>
            <h2 className="text-white font-bold text-lg mb-1">SinyalBey Komisyon İade Sistemi Nedir? 🚀</h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Burada borsaya haraç vermek yok, hakkın olanı geri almak var! İşte bilmen gereken 3 temel kural:
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex gap-3">
              <span className="text-green-400 font-bold text-sm shrink-0 mt-0.5">✓</span>
              <div>
                <p className="text-white text-sm font-semibold">Grup Şartı Yok</p>
                <p className="text-zinc-500 text-xs leading-relaxed mt-0.5">
                  İade almak için VIP gruba veya herhangi bir topluluğa katılman gerekmiyor. Tek şart; benim referansımla kayıt olman.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-green-400 font-bold text-sm shrink-0 mt-0.5">✓</span>
              <div>
                <p className="text-white text-sm font-semibold">Kâr/Zarar Fark Etmez</p>
                <p className="text-zinc-500 text-xs leading-relaxed mt-0.5">
                  İşlemin ister kârla kapansın ister zararla; borsa o komisyonu her türlü keser. Biz o kesilen parayı borsadan söküp alıyor ve sana geri veriyoruz.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-green-400 font-bold text-sm shrink-0 mt-0.5">✓</span>
              <div>
                <p className="text-white text-sm font-semibold">Her Gün Nakit Çekim</p>
                <p className="text-zinc-500 text-xs leading-relaxed mt-0.5">
                  İçeride biriken iadelerini her gün takip edebilir, sitemiz üzerinden çekim talebi oluşturarak nakit olarak cüzdanına çekebilirsin.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-4">
            <p className="text-white text-sm font-semibold mb-3">Nasıl Yapılır? (3 Basit Adım)</p>
            <div className="space-y-2">
              {[
                { step: '1', title: 'Kayıt Ol', desc: 'Aşağıdaki referans linkiyle Bitget\'te hesabını aç.' },
                { step: '2', title: 'İşlem Yap', desc: 'Her gün yaptığın işlemlerden komisyonun sistemde otomatik biriksin.' },
                { step: '3', title: 'Sorgula ve Çek', desc: 'UID numaranı sitemizden sorgula, biriken parayı gör ve "Çek" butonuna bas!' },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex gap-3 items-start">
                  <span className="w-5 h-5 rounded-full bg-green-500/20 text-green-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{step}</span>
                  <div>
                    <span className="text-white text-sm font-medium">{title}: </span>
                    <span className="text-zinc-500 text-xs">{desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Kayıt Linki */}
            <div className="mt-4 bg-zinc-950 border border-zinc-700 rounded-xl p-4 space-y-3">
              <p className="text-white text-sm font-semibold">Kayıt Linki</p>
              <p className="text-zinc-500 text-xs leading-relaxed">
                İade sisteminin çalışması için <span className="text-white font-medium">benim referansımla</span> kayıtlı olman şart.
                Başka biriyle kaydolduysan hesabını sil, <span className="text-white font-medium">24 saat bekle</span> ve aşağıdaki linkle yeni hesap aç.
              </p>
              <a
                href="https://partner.bitget.com/bg/4EAXT6"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-semibold text-sm py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-green-900/20"
              >
                Bitget&apos;e Kayıt Ol →
              </a>
            </div>
          </div>

          <div className="bg-red-950/30 border border-red-800/40 rounded-xl px-4 py-3 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-red-400 text-xs font-semibold">⚠️ Kontenjan Dolmak Üzere!</p>
              <span className="text-red-400 text-xs font-bold">190 / 200</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-red-500 to-orange-400"
                style={{ width: '95%' }}
              />
            </div>
            <p className="text-zinc-500 text-xs leading-relaxed">
              Kontenjanımız sınırlıdır. Sadece ilk <span className="text-white font-semibold">200 kişi</span> bu ayrıcalıktan faydalanacaktır. Yalnızca <span className="text-red-400 font-semibold">10 yer</span> kaldı — sistem dolduğunda yeni üyelere kapanacaktır.
            </p>
          </div>
        </div>

        {error && (
          <div className="bg-red-950/60 border border-red-800/60 text-red-400 text-sm rounded-xl px-4 py-3">
            {error}
          </div>
        )}

        {/* Tabs + Dönem Listesi */}
        {allDonemler.length > 0 && (
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.4s ease, transform 0.4s ease',
            }}
            className="space-y-3"
          >
            {/* Tabs */}
            <div className="flex gap-1 p-1 bg-zinc-900 rounded-xl border border-zinc-800">
              {(['haftalik', 'gunluk'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => switchTab(tab)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    activeTab === tab
                      ? 'bg-zinc-700 text-white shadow'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {tab === 'haftalik' ? 'Haftalık' : 'Günlük'}
                </button>
              ))}
            </div>

            {/* Dönem Kartları */}
            {donemler.length === 0 ? (
              <p className="text-zinc-600 text-sm text-center py-6">
                Bu dönem için iade bulunamadı.
              </p>
            ) : (
              <div className="space-y-2">
                <p className="text-zinc-500 text-xs">Çekmek istediğin dönemleri seç</p>
                {donemler.map((d, i) => {
                  const isSelected = selected.has(d.donem);
                  return (
                    <label
                      key={d.donem}
                      style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'translateY(0)' : 'translateY(8px)',
                        transition: `opacity 0.4s ease ${i * 60}ms, transform 0.4s ease ${i * 60}ms`,
                      }}
                      className={`flex items-center gap-3 rounded-xl px-4 py-4 cursor-pointer border transition-all duration-200 ${
                        isSelected
                          ? 'bg-green-950/30 border-green-500/60 shadow-lg shadow-green-900/20'
                          : 'bg-zinc-900/80 border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800/60'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-all duration-150 ${
                        isSelected ? 'bg-green-500 border-green-500' : 'border-zinc-600'
                      }`}>
                        {isSelected && (
                          <svg className="w-2.5 h-2.5 text-black" fill="none" viewBox="0 0 10 10">
                            <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      <input type="checkbox" checked={isSelected} onChange={() => toggleSelect(d.donem)} className="sr-only" />
                      <div className="flex-1 min-w-0">
                        <div className="text-white font-medium text-sm">{d.label}</div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-green-400 font-bold text-sm">{d.rebate} USDT</div>
                        <div className="text-zinc-600 text-xs">İade (%80)</div>
                      </div>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Çekim Formu */}
        {allDonemler.length > 0 && selected.size > 0 && !submitted && (
          <div style={{ animation: 'fadeIn 0.3s ease' }} className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-zinc-400 text-sm">Toplam İade</span>
              <span className="text-green-400 font-bold text-xl">
                <CountUp value={totalRebateNum} /> USDT
              </span>
            </div>

            {belowMin && (
              <div className="bg-yellow-950/50 border border-yellow-800/50 text-yellow-500 text-xs rounded-lg px-3 py-2">
                Minimum çekim tutarı 10 USDT&apos;dir. Daha fazla dönem seçin.
              </div>
            )}

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
              disabled={submitting || !address.trim() || !addressValid || belowMin}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 disabled:from-zinc-700 disabled:to-zinc-700 disabled:cursor-not-allowed text-white font-semibold text-sm py-3 rounded-xl transition-all duration-200 shadow-lg shadow-green-900/20"
            >
              {submitting ? 'Gönderiliyor...' : 'Çekim Talebi Oluştur'}
            </button>
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
                  <div className="text-zinc-600 text-xs mt-0.5 truncate">{t.donemler}</div>
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

        {/* Accordion */}
        <div className="border border-zinc-800 rounded-xl overflow-hidden">
          <button
            onClick={() => setAccordionOpen((v) => !v)}
            className="w-full flex items-center justify-between px-4 py-3.5 text-sm text-zinc-400 hover:text-white hover:bg-zinc-900/40 transition-colors"
          >
            <span>Nasıl hesaplanır?</span>
            <svg className={`w-4 h-4 transition-transform duration-200 ${accordionOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {accordionOpen && (
            <div className="px-4 pb-4 text-zinc-500 text-sm leading-relaxed border-t border-zinc-800 pt-3">
              Bitget referans komisyonunuzun <span className="text-white font-medium">%80&apos;i</span> her gün ve hafta bazında hesaplanarak iade edilir.
              UID numaranız üzerinden otomatik sorgulanır. Minimum çekim tutarı <span className="text-white font-medium">10 USDT</span>&apos;dir.
              İadeler TRC-20 USDT olarak gönderilir.
            </div>
          )}
        </div>

      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
