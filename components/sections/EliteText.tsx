export default function EliteText() {
  return (
    <section className="text-center py-12">
      <div className="gold-ornament mx-auto mb-8" />

      <p className="text-xl md:text-2xl font-light text-[var(--foreground)] mb-2 leading-relaxed tracking-tight">
        &ldquo;Kalabalık için değil,
      </p>
      <p className="text-xl md:text-2xl font-light text-[var(--foreground)] mb-6 leading-relaxed tracking-tight">
        <span className="text-[var(--gold)] font-medium">doğru ekip</span> için.&rdquo;
      </p>

      <p className="text-sm text-[var(--foreground-muted)] mb-8">
        Sınırlı kontenjanla profesyonellerin arasındasın.
      </p>

      <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-5 text-[13px] text-[var(--foreground-muted)]">
        <span className="flex items-center gap-2">
          <span className="w-1 h-1 rounded-full bg-emerald-500" />
          <span className="text-[var(--foreground)] font-medium">1,200+</span> aktif VIP
        </span>
        <span className="hidden sm:block w-px h-3 bg-[var(--card-border)]" />
        <span className="flex items-center gap-2">
          <span className="w-1 h-1 rounded-full bg-[var(--gold)]" />
          <span className="text-[var(--foreground)] font-medium">%92</span> memnuniyet
        </span>
        <span className="hidden sm:block w-px h-3 bg-[var(--card-border)]" />
        <span className="flex items-center gap-2">
          <span className="w-1 h-1 rounded-full bg-red-400" />
          Kontenjan <span className="text-red-400 font-medium">dolmak üzere</span>
        </span>
      </div>
    </section>
  );
}
