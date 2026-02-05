import Link from 'next/link';

const Footer = () => {
  const TG_MAIN = process.env.NEXT_PUBLIC_TG_MAIN || '#';
  const TG_ONEPERCENT = process.env.NEXT_PUBLIC_TG_ONEPERCENT || '#';
  const TG_BITGET = process.env.NEXT_PUBLIC_TG_BITGET || '#';

  return (
    <footer className="border-t border-[var(--glass-border)] mt-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-gradient-gold font-semibold text-lg mb-4">Sinyal Bey</h3>
            <p className="text-[var(--foreground-muted)] text-sm leading-relaxed">
              Seçilmiş sistem. Net kurallar. Disiplinli trade.
            </p>
          </div>

          <div>
            <h4 className="text-[var(--foreground)] font-medium mb-4">Sayfalar</h4>
            <nav className="flex flex-col gap-2">
              <Link
                href="/hakkimizda"
                className="text-[var(--foreground-muted)] hover:text-[var(--gold)] transition-colors text-sm"
              >
                Hakkımızda
              </Link>
              <Link
                href="/one-percent-club"
                className="text-[var(--foreground-muted)] hover:text-[var(--gold)] transition-colors text-sm"
              >
                %1 Club
              </Link>
              <Link
                href="/bitget-elite"
                className="text-[var(--foreground-muted)] hover:text-[var(--gold)] transition-colors text-sm"
              >
                Bitget Seçilmiş Ekip
              </Link>
              <Link
                href="/sss"
                className="text-[var(--foreground-muted)] hover:text-[var(--gold)] transition-colors text-sm"
              >
                SSS
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="text-[var(--foreground)] font-medium mb-4">Bağlantı</h4>
            <nav className="flex flex-col gap-2">
              <a
                href={TG_MAIN}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--foreground-muted)] hover:text-[var(--gold)] transition-colors text-sm"
              >
                Telegram (Genel)
              </a>
              <a
                href={TG_ONEPERCENT}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--foreground-muted)] hover:text-[var(--gold)] transition-colors text-sm"
              >
                %1 Club
              </a>
              <a
                href={TG_BITGET}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--foreground-muted)] hover:text-[var(--gold)] transition-colors text-sm"
              >
                Bitget Başvuru
              </a>
            </nav>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--glass-border)]">
          <p className="text-[var(--foreground-muted)] text-xs text-center">
            Bu site yatırım tavsiyesi içermez. Kripto para piyasaları yüksek risk içermektedir.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
