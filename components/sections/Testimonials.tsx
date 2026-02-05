const Testimonials = () => {
  const testimonials = [
    {
      text: 'Kuralların net olması ortamı temiz tutuyor.',
      author: 'Üye'
    },
    {
      text: 'Sinyalden çok sistem öğretiyor.',
      author: 'Üye'
    },
    {
      text: 'Herkes alınmadığı için kalite korunuyor.',
      author: 'Üye'
    },
    {
      text: 'Bitget tarafı ciddiyet isteyenler için.',
      author: 'Üye'
    }
  ];

  return (
    <section className="section-spacing px-4 bg-[var(--background-secondary)]/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--foreground)]">
            Topluluktan Geri Bildirimler
          </h2>
          <p className="text-[var(--foreground-muted)]">
            Seçilmiş kullanıcı yorumları.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass-card glass-card-hover p-6"
            >
              <div className="mb-4">
                <svg className="w-8 h-8 text-[var(--gold)]/30" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-[var(--foreground)] mb-4 text-sm leading-relaxed">
                &quot;{testimonial.text}&quot;
              </p>
              <p className="text-[var(--foreground-muted)] text-xs">
                - {testimonial.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
