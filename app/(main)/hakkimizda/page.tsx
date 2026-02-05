import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımızda | Sinyal Bey",
  description: "Furkan kimdir? Sinyal Bey'in arkasındaki hikaye ve felsefe.",
};

export default function HakkimizdaPage() {
  return (
    <div className="pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient-gold">
            Furkan Kimdir?
          </h1>
        </div>

        <div className="glass-card p-8 md:p-12 mb-12">
          <div className="prose prose-invert max-w-none">
            <p className="text-lg md:text-xl text-[var(--foreground)] leading-relaxed mb-6">
              Ben Furkan. 20 yaşından beri aktif olarak kripto piyasalarında işlem açıyorum.
            </p>

            <p className="text-[var(--foreground-muted)] leading-relaxed mb-6">
              Bu süreçte edindiğim en önemli tecrübe, kazancın tek başına sinyalle değil,
              disiplinli bir sistem ve risk yönetimiyle geldiği oldu.
            </p>

            <p className="text-[var(--foreground-muted)] leading-relaxed mb-6">
              Sinyal Bey, kısa vadeli heyecanlar için değil;
              kuralları olan, kontrol edilen ve sürdürülebilir bir yapı kurmak amacıyla oluşturuldu.
            </p>

            <p className="text-[var(--foreground-muted)] leading-relaxed">
              Burada amaç herkesi içeri almak değil.
              Doğru ekip ile, doğru sistemle ilerlemek.
            </p>
          </div>
        </div>

        <div className="glass-card p-8 text-center border-[var(--gold)]/20">
          <p className="text-xl md:text-2xl text-[var(--gold)] font-medium">
            Rastgele işlem yok. Net kurallar var.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="glass-card glass-card-hover p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--gold)]/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-[var(--gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-[var(--foreground)]">
              Güven
            </h3>
            <p className="text-sm text-[var(--foreground-muted)]">
              Şeffaf süreç ve net kurallar
            </p>
          </div>

          <div className="glass-card glass-card-hover p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--gold)]/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-[var(--gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-[var(--foreground)]">
              Disiplin
            </h3>
            <p className="text-sm text-[var(--foreground-muted)]">
              Duygusal değil, sistemli trade
            </p>
          </div>

          <div className="glass-card glass-card-hover p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--gold)]/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-[var(--gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-[var(--foreground)]">
              Seçici Ekip
            </h3>
            <p className="text-sm text-[var(--foreground-muted)]">
              Kalite, kantite değil
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
