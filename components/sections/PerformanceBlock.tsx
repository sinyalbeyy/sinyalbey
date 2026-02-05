import { ImageIcon, AlertCircle } from 'lucide-react';

const PerformanceBlock = () => {
  const stats = [
    { label: 'Günlük işlem', value: '2-5' },
    { label: 'Risk yönetimi', value: 'Sabit' },
    { label: 'Kontrol sıklığı', value: '48 saat' },
    { label: 'Sistem durumu', value: 'Aktif' }
  ];

  return (
    <section className="section-spacing px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--foreground)]">
            Süreç Odaklı Sonuçlar
          </h2>
          <p className="text-[var(--foreground-muted)] max-w-2xl mx-auto">
            Rastgele kazanç hikâyeleri değil, disiplinli sonuçlar.
          </p>
        </div>

        {/* Results Visual Areas */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Visual Placeholder 1 */}
          <div className="glass-card p-6 relative overflow-hidden min-h-[250px] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-[var(--foreground)]">Seçilmiş İşlemler</h3>
              <span className="text-[8px] uppercase tracking-wider text-[var(--gold)] bg-[var(--gold)]/10 px-2 py-0.5 rounded">
                Örnek
              </span>
            </div>
            <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-[var(--gold)]/5 to-transparent rounded-lg border border-dashed border-[var(--gold)]/20">
              <div className="text-center p-4">
                <ImageIcon className="w-12 h-12 mx-auto mb-3 text-[var(--gold)]/30" />
                <p className="text-xs text-[var(--foreground-muted)]">
                  İşlem görseli alanı
                </p>
              </div>
            </div>
            <p className="text-[9px] text-[var(--foreground-muted)]/60 mt-3 text-center italic">
              Her işlem paylaşılmaz.
            </p>
          </div>

          {/* Visual Placeholder 2 */}
          <div className="glass-card p-6 relative overflow-hidden min-h-[250px] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-[var(--foreground)]">Örnek Sonuçlar</h3>
              <span className="text-[8px] uppercase tracking-wider text-[var(--gold)] bg-[var(--gold)]/10 px-2 py-0.5 rounded">
                Geçmiş
              </span>
            </div>
            <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-[var(--gold)]/5 to-transparent rounded-lg border border-dashed border-[var(--gold)]/20">
              <div className="text-center p-4">
                <ImageIcon className="w-12 h-12 mx-auto mb-3 text-[var(--gold)]/30" />
                <p className="text-xs text-[var(--foreground-muted)]">
                  Sonuç görseli alanı
                </p>
              </div>
            </div>
            <p className="text-[9px] text-[var(--foreground-muted)]/60 mt-3 text-center italic">
              Geçmiş performans geleceği garanti etmez.
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="glass-card p-4 mb-8 border-yellow-500/20 bg-yellow-500/5">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-[var(--foreground)]">
                <strong>Önemli:</strong> Gösterilen sonuçlar seçilmiş örneklerdir.
              </p>
              <p className="text-xs text-[var(--foreground-muted)] mt-1">
                Her işlem paylaşılmaz. Geçmiş performans gelecek sonuçları garanti etmez. Kripto piyasaları yüksek risk içerir.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Table */}
        <div className="glass-card p-8 max-w-md mx-auto">
          <h3 className="text-xl font-semibold mb-6 text-[var(--foreground)] text-center">
            Sistem İstatistikleri
          </h3>
          <div className="space-y-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b border-[var(--glass-border)] last:border-0"
              >
                <span className="text-[var(--foreground-muted)]">{stat.label}</span>
                <span className="text-[var(--gold)] font-medium">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerformanceBlock;
