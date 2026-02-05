import Link from 'next/link';

const MiniFaq = () => {
  const faqs = [
    {
      question: 'Bitget ücretsiz mi?',
      answer: 'Ücretsiz değil, şartlı. Belirli koşullara uyulursa erişim sağlanır.'
    },
    {
      question: '%1 Club neden ücretli?',
      answer: 'Ücret filtredir. Ciddi olmayanlar sistemde yer almaz.'
    },
    {
      question: 'Herkes girebilir mi?',
      answer: 'Hayır. Sistem seçici çalışır, kontenjan sınırlıdır.'
    }
  ];

  return (
    <section className="section-spacing px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--foreground)]">
            Sıkça Sorulan Sorular
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="glass-card glass-card-hover p-6"
            >
              <h3 className="text-lg font-semibold mb-2 text-[var(--gold)]">
                {faq.question}
              </h3>
              <p className="text-[var(--foreground-muted)]">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/sss"
            className="btn-secondary"
          >
            Tüm Soruları Gör
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MiniFaq;
