const SystemBlock = () => {
  const features = [
    {
      title: 'Sermaye korunur',
      description: 'Risk yönetimi her zaman ön planda.'
    },
    {
      title: 'Planla işlem açılır',
      description: 'Rastgele girişler yok, her işlem planlı.'
    },
    {
      title: 'Risk sabit tutulur',
      description: 'Her işlemde aynı disiplin uygulanır.'
    },
    {
      title: 'Disiplin ödüllendirilir',
      description: 'Kurallara uyanlar başarılı olur.'
    }
  ];

  return (
    <section className="section-spacing px-4 bg-[var(--background-secondary)]/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--foreground)]">
            Rastgele sinyal değil, süreç.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-card glass-card-hover p-6 text-center"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[var(--gold)]/10 flex items-center justify-center">
                <span className="text-[var(--gold)] text-xl font-bold">{index + 1}</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-[var(--foreground)]">
                {feature.title}
              </h3>
              <p className="text-sm text-[var(--foreground-muted)]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SystemBlock;
