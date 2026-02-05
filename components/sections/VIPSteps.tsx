'use client';

import { useState } from 'react';
import { ArrowRight, ChevronDown, Copy, Check, CircleAlert, Loader2, Send, ShieldCheck, CheckCircle } from 'lucide-react';
import SpotsCounter from './SpotsCounter';

const BITGET_REF_LINK = 'https://partner.bitget.fit/bg/4EAXT6';
const BITGET_REF_CODE = '11wm';

export default function VIPSteps() {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const [formData, setFormData] = useState({ telegramUsername: '', bitgetUid: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const copyCode = async () => {
    await navigator.clipboard.writeText(BITGET_REF_CODE);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.telegramUsername.trim() || !formData.bitgetUid.trim()) return;

    setFormStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'BITGET_CLUB',
          telegramUsername: formData.telegramUsername.trim(),
          bitgetUid: formData.bitgetUid.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Başvuru gönderilemedi.');
      }

      setFormStatus('success');
    } catch (err) {
      setFormStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const inputClass = 'w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[rgba(255,255,255,0.05)] text-[var(--foreground)] placeholder:text-[var(--foreground-muted)]/30 focus:border-[var(--gold)]/30 focus:ring-1 focus:ring-[var(--gold)]/10 focus:outline-none transition-all text-sm';

  return (
    <section className="mb-16">
      <div className="flex items-center gap-3 mb-2">
        <span className="gold-ornament" />
        <h2 className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-medium">
          Nasıl Katılırım
        </h2>
      </div>
      <h3 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-3 tracking-tight">
        3 Adımda Katıl
      </h3>
      <p className="text-sm text-[var(--foreground-muted)] mb-12 leading-relaxed">
        Sayfadan ayrılmadan tüm süreci tamamla.
      </p>

      <div className="space-y-4">

        {/* ── ADIM 1: KAYIT ── */}
        <div className="glass-card p-6 md:p-8">
          <div className="flex items-center gap-3.5 mb-6">
            <span className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-[var(--gold-light)] to-[var(--gold-dark)] text-[#0a0a0a] text-sm font-bold shadow-[0_0_16px_rgba(201,168,76,0.12)]">
              1
            </span>
            <div>
              <h3 className="text-base font-semibold text-[var(--foreground)] leading-tight">Kayıt Ol</h3>
              <p className="text-xs text-[var(--foreground-muted)] mt-0.5">Referans linki ile hesap aç</p>
            </div>
          </div>

          <p className="text-sm text-[var(--foreground-muted)] mb-5 leading-relaxed">
            Aşağıdaki butonla <strong className="text-[var(--foreground)] font-medium">Sinyal Bey referans linki</strong> üzerinden Bitget hesabını oluştur. Referans kodu otomatik tanımlanır.
          </p>

          <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[var(--background)]/80 border border-[var(--card-border)] mb-6">
            <span className="text-xs text-[var(--foreground-muted)]">Referans Kodu</span>
            <span className="font-mono text-sm font-bold text-[var(--gold)] tracking-wider">{BITGET_REF_CODE}</span>
            <button onClick={copyCode} className="p-1 rounded-lg hover:bg-white/5 transition-colors" title="Kopyala">
              {codeCopied
                ? <Check className="w-3.5 h-3.5 text-emerald-400" />
                : <Copy className="w-3.5 h-3.5 text-[var(--foreground-muted)]" />
              }
            </button>
          </div>

          <div>
            <a
              href={BITGET_REF_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold-glossy inline-flex items-center gap-2.5 px-7 py-3 text-sm font-semibold"
            >
              Bitget&apos;e Kayıt Ol
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="flex items-center gap-2 mt-5 pt-5 border-t border-[var(--card-border)]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500/60" strokeWidth={1.5} />
            <p className="text-xs text-[var(--foreground-muted)]">
              Son 24 saatte <span className="text-[var(--foreground)] font-medium">23 kişi</span> bu linkle kayıt oldu.
            </p>
          </div>
        </div>

        {/* ── ADIM 2: FONLA ── */}
        <div className="glass-card p-6 md:p-8">
          <div className="flex items-center gap-3.5 mb-6">
            <span className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-[var(--gold-light)] to-[var(--gold-dark)] text-[#0a0a0a] text-sm font-bold shadow-[0_0_16px_rgba(201,168,76,0.12)]">
              2
            </span>
            <div>
              <h3 className="text-base font-semibold text-[var(--foreground)] leading-tight">Fonla</h3>
              <p className="text-xs text-[var(--foreground-muted)] mt-0.5">Minimum 100$ bakiye yükle</p>
            </div>
          </div>

          <p className="text-sm text-[var(--foreground-muted)] mb-1.5 leading-relaxed">
            Hesabına <strong className="text-[var(--foreground)] font-medium">en az 100$ bakiye aktarımı</strong> yap ve işlem yapmaya başla.
          </p>
          <p className="text-xs text-[var(--foreground-muted)] mb-6">
            VIP sinyallerden verim almak için yeterli bakiye gereklidir.
          </p>

          {/* Accordion */}
          <div className="rounded-xl border border-[var(--card-border)] overflow-hidden">
            <button
              onClick={() => setAccordionOpen(!accordionOpen)}
              className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-white/[0.02] transition-colors"
            >
              <span className="text-xs font-medium text-[var(--foreground)]">Başka Borsadan Nasıl Para Gönderilir?</span>
              <ChevronDown className={`w-4 h-4 text-[var(--foreground-muted)] transition-transform duration-300 ${accordionOpen ? 'rotate-180' : ''}`} />
            </button>

            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${accordionOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
              <div className="px-4 pb-4 pt-3 space-y-4 border-t border-[var(--card-border)]">
                <div className="flex flex-wrap items-center gap-2 py-2 text-xs text-[var(--foreground-muted)]">
                  <span className="text-[var(--foreground)] font-medium">Binance</span>
                  <ArrowRight className="w-3 h-3 text-[var(--gold)]/50" />
                  <span>Çekme</span>
                  <ArrowRight className="w-3 h-3 text-[var(--gold)]/50" />
                  <span className="text-[var(--foreground)] font-medium">USDT</span>
                  <ArrowRight className="w-3 h-3 text-[var(--gold)]/50" />
                  <span className="text-[var(--gold)] font-medium">TRC20</span>
                  <ArrowRight className="w-3 h-3 text-[var(--gold)]/50" />
                  <span className="text-[var(--foreground)] font-medium">Bitget Adresi</span>
                </div>

                <ol className="space-y-2.5 text-xs text-[var(--foreground-muted)]">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--gold)] font-semibold mt-px">1.</span>
                    <span><strong className="text-[var(--foreground)] font-medium">Binance/TrBinance</strong> &rarr; Cüzdan &rarr; Spot &rarr; Çekme</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--gold)] font-semibold mt-px">2.</span>
                    <span>Coin: <strong className="text-[var(--foreground)] font-medium">USDT</strong> &bull; Ağ: <strong className="text-[var(--gold)] font-medium">TRC20</strong></span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--gold)] font-semibold mt-px">3.</span>
                    <span><strong className="text-[var(--foreground)] font-medium">Bitget</strong> &rarr; Varlıklar &rarr; Yatır &rarr; USDT TRC20 adresini kopyala</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--gold)] font-semibold mt-px">4.</span>
                    <span>Adresi Binance&apos;e yapıştır, miktarı gir, <strong className="text-[var(--foreground)] font-medium">Çekme</strong></span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--gold)] font-semibold mt-px">5.</span>
                    <span>Transfer genellikle <strong className="text-[var(--foreground)] font-medium">1-5 dakika</strong> içinde ulaşır.</span>
                  </li>
                </ol>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[var(--background)]/50 border border-[var(--card-border)]">
                  <CircleAlert className="w-3.5 h-3.5 text-[var(--gold)]/70 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <p className="text-xs text-[var(--foreground-muted)]">
                    Ağ seçimini mutlaka <strong className="text-[var(--foreground)] font-medium">TRC20</strong> yapın. Yanlış ağ seçimi kayba yol açabilir.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── UYARI: MEVCUT HESAP ── */}
        <div className="glass-card-strong p-6 md:p-8">
          <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3 tracking-tight">
            Mevcut Bitget Hesabı Olanlar
          </h3>
          <p className="text-[var(--foreground-muted)] text-xs leading-relaxed mb-5">
            Hali hazırda Bitget hesabı olanlar bu avantajdan faydalanamaz.
            VIP ekibine katılmak için <strong className="text-[var(--foreground)] font-medium">mevcut hesabınızı silip 24 saat sonra referans linkimizle yeni hesap açmalısınız.</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-2 text-xs text-[var(--foreground-muted)]">
            <span className="px-3.5 py-2 rounded-xl bg-[var(--background)]/50 border border-[var(--card-border)]">
              <span className="text-[var(--gold)] font-semibold">1.</span> Hesabı silin
            </span>
            <span className="px-3.5 py-2 rounded-xl bg-[var(--background)]/50 border border-[var(--card-border)]">
              <span className="text-[var(--gold)] font-semibold">2.</span> 24 saat bekleyin
            </span>
            <span className="px-3.5 py-2 rounded-xl bg-[var(--background)]/50 border border-[var(--card-border)]">
              <span className="text-[var(--gold)] font-semibold">3.</span> Referansla yeni hesap
            </span>
          </div>
        </div>

        {/* ── KONTENJAN SAYACI ── */}
        <SpotsCounter />

        {/* ── ADIM 3: UID FORMU ── */}
        <div className="glass-card-strong p-6 md:p-8 relative overflow-hidden">
          {/* Floating glow */}
          <div className="pointer-events-none absolute -top-24 -right-24 w-[280px] h-[280px] rounded-full bg-[var(--gold)] opacity-[0.025] blur-[100px]" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-[220px] h-[220px] rounded-full bg-[var(--gold)] opacity-[0.015] blur-[80px]" aria-hidden="true" />

          <div className="relative">
            <div className="flex items-center gap-3.5 mb-1">
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-[var(--gold-light)] to-[var(--gold-dark)] text-[#0a0a0a] text-sm font-bold shadow-[0_0_16px_rgba(201,168,76,0.12)]">
                3
              </span>
              <h3 className="text-base font-semibold text-[var(--foreground)]">UID Onayı & VIP Erişim</h3>
            </div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--gold)]/70 mb-7 ml-[52px] font-medium">
              Sınırlı Erişim
            </p>

            {formStatus === 'success' ? (
              <div className="text-center py-8">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-[var(--foreground)] mb-2">
                  Başvurun Alındı!
                </h4>
                <p className="text-sm text-[var(--foreground-muted)] mb-6 max-w-sm mx-auto leading-relaxed">
                  Başvurun inceleniyor. Onay sonrası Telegram üzerinden bilgilendirileceksin.
                </p>
                <a
                  href="https://t.me/beydestek"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--gold)]/20 text-[var(--gold)] text-sm font-medium hover:bg-[var(--gold)]/5 transition-colors"
                >
                  Telegram Destek
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ) : (
              <>
                <p className="text-sm text-[var(--foreground-muted)] leading-relaxed mb-1.5">
                  Bitget hesabına ait UID numaranı ve Telegram kullanıcı adını aşağıya gir.
                  Kontrol sonrası uygun bulunan hesaplara VIP grup erişimi açılır.
                </p>
                <p className="text-xs font-medium text-[var(--gold)]/80 mb-8">
                  Bu adım herkese açık değildir.
                </p>

                {formStatus === 'error' && (
                  <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="telegramUsername" className="block text-xs font-medium text-[var(--foreground)]/80 mb-2 tracking-wide">
                      Telegram Kullanıcı Adın
                    </label>
                    <input
                      id="telegramUsername"
                      type="text"
                      placeholder="@kullaniciadi"
                      value={formData.telegramUsername}
                      onChange={(e) => setFormData(prev => ({ ...prev, telegramUsername: e.target.value }))}
                      className={inputClass}
                      required
                    />
                    <p className="text-[11px] text-[var(--foreground-muted)]/60 mt-1.5">
                      VIP erişim bu kullanıcı adına tanımlanır.
                    </p>
                    <p className="text-[11px] text-red-400 mt-1">
                      Telegram adresini doğru yazdığından emin ol, aksi halde özel grup linki gönderilemez.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="bitgetUid" className="block text-xs font-medium text-[var(--foreground)]/80 mb-2 tracking-wide">
                      Bitget UID Numaran
                    </label>
                    <input
                      id="bitgetUid"
                      type="text"
                      placeholder="Örn: 8291038271"
                      value={formData.bitgetUid}
                      onChange={(e) => setFormData(prev => ({ ...prev, bitgetUid: e.target.value }))}
                      className={inputClass}
                      required
                    />
                    <p className="text-[11px] text-[var(--foreground-muted)]/60 mt-1.5">
                      Bitget uygulaması &rarr; Profil &rarr; UID
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="btn-gold-glossy w-full flex items-center justify-center gap-2.5 py-3.5 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formStatus === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Gönderiliyor...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        VIP Erişim Talebi Gönder
                      </>
                    )}
                  </button>
                  <p className="text-center text-[11px] text-[var(--foreground-muted)]/50">
                    Başvurun doğrudan yetkili hesaba iletilir.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
