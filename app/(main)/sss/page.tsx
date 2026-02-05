import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sıkça Sorulan Sorular | Sinyal Bey",
  description: "Sinyal Bey hakkında sıkça sorulan sorular ve cevapları.",
};

export default function SSSPage() {
  const faqs = [
    {
      category: "Genel",
      questions: [
        {
          q: "Sinyal Bey nedir?",
          a: "Sinyal Bey, disiplinli trade ve risk yönetimi odaklı bir kripto topluluğudur. Amaç rastgele sinyal vermek değil, sürdürülebilir bir sistem oluşturmaktır."
        },
        {
          q: "Herkes girebilir mi?",
          a: "Hayır. Sistem seçici çalışır ve kontenjan sınırlıdır. Kaliteyi korumak için herkes alınmaz."
        },
        {
          q: "Bu bir yatırım tavsiyesi mi?",
          a: "Hayır. Bu site ve topluluk yatırım tavsiyesi içermez. Kripto para piyasaları yüksek risk içerir. Kararlarınız tamamen size aittir."
        }
      ]
    },
    {
      category: "%1 Club",
      questions: [
        {
          q: "%1 Club nedir?",
          a: "%1 Club, topluluk odaklı bir aile grubudur. Spot & piyasa bakışı, günlük 2-5 işlem, bot destekli kasa yönetimi ve daha fazlasını içerir."
        },
        {
          q: "%1 Club neden ücretli?",
          a: "Ücret filtredir. Ciddi olmayanlar sistemde yer almaz. Bu sayede kalite korunur ve ortam temiz tutulur."
        },
        {
          q: "%1 Club fiyatları nelerdir?",
          a: "Aylık 80$, 3 Aylık 100$, Sınırsız 120$. Bu fiyatlar herkese açık değildir ve güncellenebilir."
        },
        {
          q: "Sınırsız üyelik ne demek?",
          a: "Tek seferlik ödeme ile ömür boyu erişim. En çok tercih edilen seçenektir."
        }
      ]
    },
    {
      category: "Bitget Seçilmiş Ekip",
      questions: [
        {
          q: "Bitget sistemi ücretsiz mi?",
          a: "Ücretsiz değil, şartlı. Belirli koşullara uyulursa erişim sağlanır. Şart bozan ekipten çıkarılır."
        },
        {
          q: "Bitget'te nasıl başvurabilirim?",
          a: "Telegram üzerinden başvuru yapabilirsiniz. Başvurunuz değerlendirilecek ve size dönülecektir."
        },
        {
          q: "Mevcut Bitget hesabım var, ne yapmalıyım?",
          a: "Close account yapın ve 24 saat bekleyin. Ardından yeni hesap oluşturun."
        },
        {
          q: "Param Bitget'te, ne yapmalıyım?",
          a: "Başka borsaya gönderin, yeni Bitget hesabı oluşturun, ardından geri gönderin."
        },
        {
          q: "UID kontrolü ne sıklıkla yapılır?",
          a: "48 saatte bir UID kontrolü yapılır. Uyumsuzluk durumunda ekipten çıkarılırsınız."
        }
      ]
    },
    {
      category: "Sistem ve İşleyiş",
      questions: [
        {
          q: "Günlük kaç işlem yapılıyor?",
          a: "Günlük 2-5 işlem paylaşılır. Kaliteli ve seçilmiş fırsatlar öne çıkarılır."
        },
        {
          q: "Risk yönetimi nasıl yapılıyor?",
          a: "Risk sabit tutulur. Her işlemde aynı disiplin uygulanır ve sermaye korunur."
        },
        {
          q: "Sinyaller garanti mi?",
          a: "Hayır. Hiçbir sinyal garanti değildir. Geçmiş performans geleceği garanti etmez. Kripto piyasaları yüksek risk içerir."
        }
      ]
    }
  ];

  return (
    <div className="pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient-gold">
            Sıkça Sorulan Sorular
          </h1>
          <p className="text-[var(--foreground-muted)]">
            Merak ettiğiniz her şey burada.
          </p>
        </div>

        <div className="space-y-12">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h2 className="text-2xl font-bold mb-6 text-[var(--gold)]">
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.questions.map((faq, faqIndex) => (
                  <div
                    key={faqIndex}
                    className="glass-card glass-card-hover p-6"
                  >
                    <h3 className="text-lg font-semibold mb-3 text-[var(--foreground)]">
                      {faq.q}
                    </h3>
                    <p className="text-[var(--foreground-muted)] leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-[var(--foreground-muted)] mb-6">
            Başka sorularınız mı var?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/one-percent-club"
              className="btn-secondary w-full sm:w-auto"
            >
              %1 Club
            </Link>
            <Link
              href="/bitget-elite"
              className="btn-primary w-full sm:w-auto"
            >
              Bitget Başvurusu
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
