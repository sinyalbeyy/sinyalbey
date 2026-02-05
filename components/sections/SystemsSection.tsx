import Link from 'next/link';

const SystemsSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">
            İki ayrı sistem. Tek çatı.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* %1 Club Card */}
          <div className="glass-card glass-card-hover p-6 md:p-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gradient-gold">%1 Club</h3>
              <span className="text-[10px] uppercase tracking-wider text-[var(--foreground-muted)] bg-[var(--gold)]/5 px-2 py-1 rounded">
                Aile Grubu
              </span>
            </div>

            <p className="text-sm text-[var(--foreground-muted)] mb-6 leading-relaxed">
              Ücret filtredir. Uzun vadeli disiplin.
            </p>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="text-center p-3 rounded-lg bg-[var(--background)]/50">
                <p className="text-lg font-bold text-[var(--gold)]">80$</p>
                <p className="text-[10px] text-[var(--foreground-muted)]">Aylık</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-[var(--background)]/50">
                <p className="text-lg font-bold text-[var(--gold)]">100$</p>
                <p className="text-[10px] text-[var(--foreground-muted)]">3 Aylık</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-[var(--background)]/50 border border-[var(--gold)]/20">
                <p className="text-lg font-bold text-[var(--gold)]">120$</p>
                <p className="text-[10px] text-[var(--foreground-muted)]">Sınırsız</p>
              </div>
            </div>

            <Link
              href="/one-percent-club"
              className="btn-primary w-full text-center block text-sm py-3"
            >
              %1 Club&apos;a Gir
            </Link>
          </div>

          {/* Bitget Card */}
          <div className="glass-card glass-card-hover p-6 md:p-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gradient-gold">Bitget</h3>
              <span className="text-[10px] uppercase tracking-wider text-[var(--foreground-muted)] bg-[var(--gold)]/5 px-2 py-1 rounded">
                Seçilmiş Ekip
              </span>
            </div>

            <p className="text-sm text-[var(--foreground-muted)] mb-6 leading-relaxed">
              Şartlı erişim.
            </p>

            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-sm text-[var(--foreground-muted)]">
                <span className="w-1 h-1 rounded-full bg-[var(--gold)]"></span>
                Sadece Bitget
              </li>
              <li className="flex items-center gap-2 text-sm text-[var(--foreground-muted)]">
                <span className="w-1 h-1 rounded-full bg-[var(--gold)]"></span>
                Günlük 2-5 işlem
              </li>
              <li className="flex items-center gap-2 text-sm text-[var(--foreground-muted)]">
                <span className="w-1 h-1 rounded-full bg-[var(--gold)]"></span>
                48 saatte bir UID kontrol
              </li>
            </ul>

            <Link
              href="/bitget-elite"
              className="btn-secondary w-full text-center block text-sm py-3"
            >
              Bitget Başvurusu
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SystemsSection;
