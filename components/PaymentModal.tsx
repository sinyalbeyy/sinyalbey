'use client';

import { useState, useEffect } from 'react';
import { X, Copy, Check, ChevronDown, ChevronUp, AlertTriangle, Loader2, CheckCircle, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: {
    name: string;
    price: number;
  };
}

const STEPS = [
  { id: 1, label: 'Plan' },
  { id: 2, label: 'Ödeme' },
  { id: 3, label: 'Bilgi' },
  { id: 4, label: 'Tamam' },
];

const PaymentModal = ({ isOpen, onClose, selectedPlan }: PaymentModalProps) => {
  const [copied, setCopied] = useState(false);
  const [telegramUsername, setTelegramUsername] = useState('');
  const [txId, setTxId] = useState('');
  const [guideOpen, setGuideOpen] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  const USDT_ADDRESS = process.env.NEXT_PUBLIC_USDT_TRC20_ADDRESS || 'ADRES_BULUNAMADI';

  // Update step based on form state
  useEffect(() => {
    if (submitStatus === 'success') {
      setCurrentStep(4);
    } else if (telegramUsername.trim() && txId.trim()) {
      setCurrentStep(3);
    } else if (copied) {
      setCurrentStep(2);
    } else {
      setCurrentStep(1);
    }
  }, [copied, telegramUsername, txId, submitStatus]);

  // Trigger confetti on success
  useEffect(() => {
    if (submitStatus === 'success') {
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors: ['#c9a84c', '#e0c56e', '#a68b3a', '#22c55e', '#4ade80'],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors: ['#c9a84c', '#e0c56e', '#a68b3a', '#22c55e', '#4ade80'],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [submitStatus]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(USDT_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Kopyalama başarısız:', err);
    }
  };

  const handlePaymentComplete = async () => {
    if (!telegramUsername.trim() || !txId.trim()) return;

    setSubmitStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'ONEPERCENT_CLUB',
          telegramUsername: telegramUsername.trim(),
          bitgetUid: txId.trim(),
          selectedPlan: selectedPlan.name,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Başvuru gönderilemedi.');
      }

      setSubmitStatus('success');
    } catch (err) {
      setSubmitStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const handleClose = () => {
    setSubmitStatus('idle');
    setTelegramUsername('');
    setTxId('');
    setErrorMessage('');
    setCopied(false);
    setCurrentStep(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full sm:max-w-lg max-h-[90vh] overflow-y-auto bg-[var(--background)] border border-[var(--gold)]/30 sm:rounded-2xl rounded-t-2xl shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-[var(--background)] border-b border-[var(--glass-border)] p-4 flex items-center justify-between z-10">
          <h2 className="text-lg font-bold text-[var(--foreground)]">
            {submitStatus === 'success' ? 'Başvuru Alındı' : 'Ödeme Bilgileri'}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-[var(--gold)]/10 transition-colors"
          >
            <X className="w-5 h-5 text-[var(--foreground-muted)]" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-5 pt-4">
          <div className="flex items-center justify-between mb-2">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      currentStep >= step.id
                        ? 'bg-gradient-to-r from-[var(--gold)] to-[var(--gold-dark)] text-black'
                        : 'bg-[var(--glass-border)] text-[var(--foreground-muted)]'
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <span
                    className={`text-[10px] mt-1 transition-colors ${
                      currentStep >= step.id
                        ? 'text-[var(--gold)]'
                        : 'text-[var(--foreground-muted)]'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <div className="flex-1 mx-2 mb-4">
                    <div className="h-1 rounded-full bg-[var(--glass-border)] overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r from-[var(--gold)] to-[var(--gold-dark)] transition-all duration-500 ${
                          currentStep > step.id ? 'w-full' : 'w-0'
                        }`}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 space-y-5">
          {submitStatus === 'success' ? (
            <div className="text-center py-8">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center animate-bounce">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
              </div>
              <h4 className="text-lg font-semibold text-[var(--foreground)] mb-2">
                Başvurun Alındı!
              </h4>
              <p className="text-sm text-[var(--foreground-muted)] mb-6 leading-relaxed">
                Ödeme kontrolü sonrası Telegram üzerinden bilgilendirileceksin.
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
              {/* Selected Plan */}
              <div className="glass-card p-4 border-[var(--gold)]/30 bg-gradient-to-r from-[var(--gold)]/10 to-transparent">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[var(--foreground-muted)]">Seçilen Paket</p>
                    <p className="text-lg font-bold text-[var(--foreground)]">{selectedPlan.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[var(--foreground-muted)]">Tutar</p>
                    <p className="text-2xl font-bold text-[var(--gold)]">{selectedPlan.price} USDT</p>
                  </div>
                </div>
              </div>

              {/* Network Info */}
              <div className="glass-card p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                    <span className="text-red-400 font-bold text-xs">TRC</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--foreground)]">USDT (TRC20 - TRON)</p>
                    <p className="text-[10px] text-[var(--foreground-muted)]">Sadece bu ağı kullanın</p>
                  </div>
                </div>

                {/* Address */}
                <div className="mt-3">
                  <label className="text-xs text-[var(--foreground-muted)] mb-1 block">Gönderim Adresi</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={USDT_ADDRESS}
                      readOnly
                      className="flex-1 bg-[var(--background)] border border-[var(--glass-border)] rounded-lg px-3 py-2.5 text-sm text-[var(--foreground)] font-mono truncate"
                    />
                    <button
                      onClick={handleCopy}
                      className={`flex items-center gap-1.5 px-3 py-2.5 rounded-lg font-medium text-sm transition-all ${
                        copied
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'bg-[var(--gold)]/10 text-[var(--gold)] border border-[var(--gold)]/30 hover:bg-[var(--gold)]/20'
                      }`}
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Kopyalandı</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Kopyala</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Telegram Username */}
              <div>
                <label className="text-xs text-[var(--foreground-muted)] mb-1 block">
                  Telegram Kullanıcı Adın <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={telegramUsername}
                  onChange={(e) => setTelegramUsername(e.target.value)}
                  placeholder="@kullaniciadi"
                  className="w-full bg-[var(--background)] border border-[var(--glass-border)] rounded-lg px-3 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--foreground-muted)]/50 focus:border-[var(--gold)]/50 focus:outline-none transition-colors"
                  required
                />
                <p className="text-[10px] text-[var(--foreground-muted)] mt-1">
                  VIP erişim bu kullanıcı adına tanımlanır.
                </p>
                <p className="text-[10px] text-red-400 mt-1">
                  Telegram adresini doğru yazdığından emin ol, aksi halde özel grup linki gönderilemez.
                </p>
              </div>

              {/* TxID Input */}
              <div>
                <label className="text-xs text-[var(--foreground-muted)] mb-1 block">
                  TxID / Hash <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={txId}
                  onChange={(e) => setTxId(e.target.value)}
                  placeholder="İşlem onaylandıktan sonra TxID'yi buraya yapıştırın"
                  className="w-full bg-[var(--background)] border border-[var(--glass-border)] rounded-lg px-3 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--foreground-muted)]/50 focus:border-[var(--gold)]/50 focus:outline-none transition-colors"
                  required
                />
                <p className="text-[10px] text-[var(--foreground-muted)] mt-1">
                  Ödeme işleminin TxID&apos;sini cüzdan/borsa işlem geçmişinden bulabilirsin.
                </p>
              </div>

              {/* Mini Guide Accordion */}
              <div className="glass-card overflow-hidden">
                <button
                  onClick={() => setGuideOpen(!guideOpen)}
                  className="w-full p-4 flex items-center justify-between text-left hover:bg-[var(--gold)]/5 transition-colors"
                >
                  <span className="text-sm font-semibold text-[var(--foreground)]">
                    Nasıl ödeme yaparım?
                  </span>
                  {guideOpen ? (
                    <ChevronUp className="w-5 h-5 text-[var(--gold)]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[var(--gold)]" />
                  )}
                </button>

                {guideOpen && (
                  <div className="px-4 pb-4 border-t border-[var(--glass-border)]">
                    <ol className="mt-3 space-y-2 text-sm text-[var(--foreground-muted)]">
                      <li className="flex gap-2">
                        <span className="text-[var(--gold)] font-bold">1.</span>
                        <span>Borsanda/cüzdanında USDT çek (Withdraw) bölümüne gir</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[var(--gold)] font-bold">2.</span>
                        <span>Ağ olarak <strong className="text-[var(--foreground)]">TRC20 (TRON)</strong> seç</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[var(--gold)] font-bold">3.</span>
                        <span>Bu sayfadaki adresi kopyala-yapıştır</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[var(--gold)] font-bold">4.</span>
                        <span>Tutarı seçtiğin paket kadar gir ve gönder</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[var(--gold)] font-bold">5.</span>
                        <span>İstersen TxID/Hash&apos;i işlem detaylarından kopyala</span>
                      </li>
                    </ol>

                    <div className="mt-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-yellow-500">
                          <strong>Uyarı:</strong> Sadece USDT TRC20 gönderin. Yanlış ağda yapılan transferler geri alınamaz.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Error message */}
              {submitStatus === 'error' && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                  {errorMessage}
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleClose}
                  className="flex-1 py-3 px-4 rounded-xl border border-[var(--glass-border)] text-[var(--foreground-muted)] font-medium hover:bg-[var(--gold)]/5 transition-colors"
                >
                  Kapat
                </button>
                <button
                  onClick={handlePaymentComplete}
                  disabled={submitStatus === 'submitting' || !telegramUsername.trim()}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[var(--gold)] to-[var(--gold-dark)] text-black font-semibold hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitStatus === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Gönderiliyor...</span>
                    </>
                  ) : (
                    <span>Ödedim, Başvur</span>
                  )}
                </button>
              </div>

              <p className="text-[10px] text-center text-[var(--foreground-muted)]">
                Başvurun sisteme kaydedilir ve ödeme kontrolü yapılır.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
