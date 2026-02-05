import { Lock, AlertTriangle, Users } from 'lucide-react';

const FomoBar = () => {
  return (
    <section className="py-6 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card p-5 border-[var(--gold)]/30 bg-gradient-to-r from-[var(--gold)]/10 via-transparent to-[var(--gold)]/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[var(--gold)]/10 flex items-center justify-center flex-shrink-0 border border-[var(--gold)]/30">
                <Lock className="w-5 h-5 text-[var(--gold)]" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-base font-bold text-[var(--foreground)] flex items-center gap-2">
                  Erişim Sınırlıdır
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                </h3>
                <p className="text-sm text-[var(--foreground-muted)]">
                  Kontenjan azaldı. Başvurular sırayla değerlendiriliyor.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 text-[var(--foreground-muted)]">
                <Users className="w-4 h-4" />
                <span className="text-xs">Sırada</span>
              </div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-bold">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                ALIMLAR: KISITLI
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FomoBar;
