'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Bot, MessageCircle, Bell, Video, Users, Quote } from 'lucide-react';
import PaymentModal from '@/components/PaymentModal';

export default function OnePercentClubPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({ name: '', price: 0 });

  const mainFeatures = [
    {
      icon: TrendingUp,
      title: "Günlük 2-5 İşlem",
      description: "Seçilmiş fırsatlar, net giriş-çıkış noktaları"
    },
    {
      icon: Bot,
      title: "Bot Destekli Kasa Yönetimi",
      description: "Otomatik portföy takibi ve risk kontrolü"
    },
    {
      icon: MessageCircle,
      title: "Birebir Risk & Strateji",
      description: "Kişisel danışmanlık ve strateji desteği"
    }
  ];

  const extraFeatures = [
    { icon: Bell, text: "Anlık Bildirimler" },
    { icon: Video, text: "Haftalık Yayınlar" },
    { icon: Users, text: "7/24 Aktif Sohbet" }
  ];

  const testimonials = [
    {
      text: "İlk ayda kasayı %340 büyüttüm. Kurallara uyunca sonuç geliyor.",
      profit: "+%340",
      period: "1. Ay"
    },
    {
      text: "3 haftada 2000$ ile başladım, şu an 11.500$ seviyesindeyim. Sistem gerçekten çalışıyor.",
      profit: "+%475",
      period: "3 Hafta"
    },
    {
      text: "Başka yerde bu kadar net sinyal görmedim. Ocak ayı tek başına +%890 getirdi.",
      profit: "+%890",
      period: "Ocak"
    },
    {
      text: "500$ ile girdim, 2 ayda 4200$ oldu. Disiplin her şey.",
      profit: "+%740",
      period: "2 Ay"
    },
    {
      text: "VIP aldım, 1 haftada ücretini çıkardım. Geri kalanı kâr.",
      profit: "+%1100",
      period: "6 Hafta"
    }
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const pricingPlans = [
    {
      name: "Aylık",
      price: 80,
      description: "aylık erişim",
      cta: "Erişimi Başlat",
      popular: false
    },
    {
      name: "Sınırsız",
      price: 120,
      description: "tek seferlik • ömür boyu",
      cta: "VIP'e Katıl",
      popular: true
    },
    {
      name: "3 Aylık",
      price: 100,
      description: "3 aylık erişim",
      cta: "Erişimi Başlat",
      popular: false
    }
  ];

  const handleSelectPlan = (plan: { name: string; price: number }) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-[var(--gold)] animate-pulse" />
              <span className="text-xs font-medium text-[var(--gold)]">Özel Üyelik</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient-gold">
              %1 Club
            </h1>
            <p className="text-lg md:text-xl text-[var(--foreground-muted)] max-w-2xl mx-auto leading-relaxed">
              Piyasanın %99&apos;u duyguyla kaybeder.<br />
              <span className="text-[var(--foreground)]">%1 disiplinle kazanır.</span>
            </p>
          </div>

          {/* Main Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {mainFeatures.map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-gradient-to-b from-[var(--gold)]/5 to-transparent border border-[var(--gold)]/10 hover:border-[var(--gold)]/30 transition-all duration-500"
              >
                <div className="w-14 h-14 mb-6 rounded-xl bg-gradient-to-br from-[var(--gold)]/20 to-[var(--gold)]/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-[var(--gold)]" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-[var(--foreground)]">
                  {feature.title}
                </h3>
                <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Extra Features Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
            {extraFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--background)] border border-[var(--glass-border)]"
              >
                <feature.icon className="w-4 h-4 text-[var(--gold)]/60" />
                <span className="text-sm text-[var(--foreground-muted)]">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Performance Stats Banner */}
          <div className="mb-8">
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="text-center p-4 rounded-xl bg-gradient-to-b from-green-500/10 to-transparent border border-green-500/20">
                <p className="text-3xl md:text-4xl font-bold text-green-400">+%1295</p>
                <p className="text-[10px] text-[var(--foreground-muted)] mt-1">Bu Ay Toplam</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-gradient-to-b from-[var(--gold)]/10 to-transparent border border-[var(--gold)]/20">
                <p className="text-3xl md:text-4xl font-bold text-[var(--gold)]">%87</p>
                <p className="text-[10px] text-[var(--foreground-muted)] mt-1">Başarı Oranı</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-gradient-to-b from-blue-500/10 to-transparent border border-blue-500/20">
                <p className="text-3xl md:text-4xl font-bold text-blue-400">735</p>
                <p className="text-[10px] text-[var(--foreground-muted)] mt-1">Aktif Üye</p>
              </div>
            </div>
          </div>

          {/* Live Stats Ticker */}
          <div className="mb-8 px-2">
            <div className="max-w-3xl mx-auto grid grid-cols-2 gap-2 md:gap-3">
              <div className="flex items-center gap-2 md:gap-3 p-2.5 md:p-3 rounded-xl bg-[var(--background)]/50 border border-[var(--glass-border)]">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-green-400 text-sm md:text-lg">📈</span>
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] md:text-xs text-[var(--foreground-muted)] truncate">Ort. Üye Kazancı</p>
                  <p className="text-xs md:text-sm font-bold text-green-400">+%412/ay</p>
                </div>
              </div>
              <div className="flex items-center gap-2 md:gap-3 p-2.5 md:p-3 rounded-xl bg-[var(--background)]/50 border border-[var(--glass-border)]">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[var(--gold)]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[var(--gold)] text-sm md:text-lg">🔥</span>
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] md:text-xs text-[var(--foreground-muted)] truncate">Kazanma Serisi</p>
                  <p className="text-xs md:text-sm font-bold text-[var(--gold)]">14 İşlem</p>
                </div>
              </div>
              <div className="flex items-center gap-2 md:gap-3 p-2.5 md:p-3 rounded-xl bg-[var(--background)]/50 border border-[var(--glass-border)]">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-400 text-sm md:text-lg">💎</span>
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] md:text-xs text-[var(--foreground-muted)] truncate">En Yüksek Tek İşlem</p>
                  <p className="text-xs md:text-sm font-bold text-purple-400">+%187</p>
                </div>
              </div>
              <div className="flex items-center gap-2 md:gap-3 p-2.5 md:p-3 rounded-xl bg-[var(--background)]/50 border border-[var(--glass-border)]">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-cyan-400 text-sm md:text-lg">⚡</span>
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] md:text-xs text-[var(--foreground-muted)] truncate">Bu Hafta</p>
                  <p className="text-xs md:text-sm font-bold text-cyan-400">+%89 Kâr</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Big Wins */}
          <div className="mb-12 px-2">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <p className="text-[10px] md:text-xs text-[var(--foreground-muted)] uppercase tracking-wider">Son Büyük Kazançlar</p>
              </div>
              <div className="grid grid-cols-3 gap-2 md:gap-3">
                <div className="text-center p-2 md:p-3 rounded-xl bg-gradient-to-b from-green-500/10 to-transparent border border-green-500/20">
                  <p className="text-[10px] md:text-xs text-[var(--foreground-muted)] mb-1">BTC/USDT</p>
                  <p className="text-lg md:text-xl font-bold text-green-400">+%67</p>
                  <p className="text-[8px] md:text-[9px] text-[var(--foreground-muted)]">2 saat önce</p>
                </div>
                <div className="text-center p-2 md:p-3 rounded-xl bg-gradient-to-b from-green-500/10 to-transparent border border-green-500/20">
                  <p className="text-[10px] md:text-xs text-[var(--foreground-muted)] mb-1">SOL/USDT</p>
                  <p className="text-lg md:text-xl font-bold text-green-400">+%124</p>
                  <p className="text-[8px] md:text-[9px] text-[var(--foreground-muted)]">5 saat önce</p>
                </div>
                <div className="text-center p-2 md:p-3 rounded-xl bg-gradient-to-b from-green-500/10 to-transparent border border-green-500/20">
                  <p className="text-[10px] md:text-xs text-[var(--foreground-muted)] mb-1">ETH/USDT</p>
                  <p className="text-lg md:text-xl font-bold text-green-400">+%43</p>
                  <p className="text-[8px] md:text-[9px] text-[var(--foreground-muted)]">8 saat önce</p>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials Slider */}
          <div className="mb-20">
            <div className="max-w-2xl mx-auto">
              <div className="relative p-8 rounded-2xl bg-gradient-to-b from-[var(--gold)]/5 to-transparent border border-[var(--gold)]/10">
                <Quote className="absolute top-4 left-4 w-8 h-8 text-[var(--gold)]/20" />

                <div className="relative min-h-[120px] flex flex-col items-center justify-center">
                  {testimonials.map((testimonial, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ${
                        index === currentTestimonial
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-4 pointer-events-none'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl md:text-4xl font-bold text-green-400">{testimonial.profit}</span>
                        <span className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-xs font-medium">
                          {testimonial.period}
                        </span>
                      </div>
                      <p className="text-center text-[var(--foreground)] text-sm md:text-base italic leading-relaxed max-w-lg">
                        &quot;{testimonial.text}&quot;
                      </p>
                    </div>
                  ))}
                </div>

                {/* Dots */}
                <div className="flex items-center justify-center gap-2 mt-6">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === currentTestimonial
                          ? 'bg-[var(--gold)] w-6'
                          : 'bg-[var(--foreground-muted)]/30 w-1.5'
                      }`}
                      aria-label={`Yorum ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-center text-[9px] text-[var(--foreground-muted)]/50 mt-3 italic">
                * Geçmiş performans gelecek sonuçları garanti etmez. Gösterilen sonuçlar seçilmiş üye geri bildirimleridir.
              </p>
            </div>
          </div>

          {/* Limited Spots Banner */}
          <div className="mb-8 px-2">
            <div className="max-w-md mx-auto p-3 md:p-4 rounded-2xl bg-gradient-to-r from-red-500/10 via-orange-500/10 to-red-500/10 border border-red-500/30">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[10px] md:text-xs text-red-400 font-medium">SINIRLI KONTENJAN</span>
                </div>
                <div className="hidden sm:block h-4 w-px bg-[var(--glass-border)]" />
                <p className="text-xs md:text-sm">
                  <span className="text-[var(--foreground)]">Kalan:</span>
                  <span className="text-red-400 font-bold ml-1">12 Kişilik</span>
                </p>
              </div>
            </div>
          </div>

          {/* Recent Join Activity */}
          <div className="mb-8 px-2">
            <div className="max-w-sm mx-auto space-y-2">
              <div className="flex items-center justify-between p-2.5 md:p-3 rounded-xl bg-[var(--background)]/50 border border-green-500/20">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] flex items-center justify-center text-black text-[10px] md:text-xs font-bold flex-shrink-0">A</div>
                  <div className="min-w-0">
                    <p className="text-[10px] md:text-xs text-[var(--foreground)] truncate">A***n VIP&apos;e katıldı</p>
                    <p className="text-[8px] md:text-[9px] text-[var(--foreground-muted)]">İstanbul</p>
                  </div>
                </div>
                <span className="text-[8px] md:text-[9px] text-green-400 flex-shrink-0 ml-2">3 dk önce</span>
              </div>
              <div className="flex items-center justify-between p-2.5 md:p-3 rounded-xl bg-[var(--background)]/50 border border-green-500/20">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] flex items-center justify-center text-black text-[10px] md:text-xs font-bold flex-shrink-0">M</div>
                  <div className="min-w-0">
                    <p className="text-[10px] md:text-xs text-[var(--foreground)] truncate">M***t VIP&apos;e katıldı</p>
                    <p className="text-[8px] md:text-[9px] text-[var(--foreground-muted)]">Ankara</p>
                  </div>
                </div>
                <span className="text-[8px] md:text-[9px] text-green-400 flex-shrink-0 ml-2">18 dk önce</span>
              </div>
              <div className="flex items-center justify-between p-2.5 md:p-3 rounded-xl bg-[var(--background)]/50 border border-green-500/20">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] flex items-center justify-center text-black text-[10px] md:text-xs font-bold flex-shrink-0">E</div>
                  <div className="min-w-0">
                    <p className="text-[10px] md:text-xs text-[var(--foreground)] truncate">E***a 3 Aylık aldı</p>
                    <p className="text-[8px] md:text-[9px] text-[var(--foreground-muted)]">Almanya</p>
                  </div>
                </div>
                <span className="text-[8px] md:text-[9px] text-green-400 flex-shrink-0 ml-2">42 dk önce</span>
              </div>
            </div>
          </div>

          {/* FOMO Text */}
          <div className="text-center mb-16">
            <p className="text-[var(--foreground-muted)] text-sm leading-relaxed">
              Bu erişim herkese açık değildir.<br />
              <span className="text-[var(--gold)]">Kabul edilenler bir sonraki döngüde bilgilendirilir.</span>
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6 items-end mb-16">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-2xl transition-all duration-300 ${
                  plan.popular
                    ? 'md:-mt-4 z-10'
                    : ''
                }`}
              >
                {/* VIP Card */}
                {plan.popular ? (
                  <div className="relative p-[1px] rounded-2xl bg-gradient-to-b from-[var(--gold)] via-[var(--gold)]/50 to-[var(--gold)]/20 shadow-[0_0_40px_rgba(212,175,55,0.15)]">
                    <div className="relative rounded-2xl bg-gradient-to-b from-[#0f1520] to-[var(--background)] p-8 overflow-hidden">
                      {/* Inner glow */}
                      <div className="absolute inset-0 bg-gradient-to-b from-[var(--gold)]/5 to-transparent pointer-events-none" />

                      {/* VIP Label */}
                      <div className="absolute -top-px left-1/2 -translate-x-1/2">
                        <div className="px-4 py-1.5 bg-gradient-to-r from-[var(--gold)] to-[var(--gold-dark)] rounded-b-lg">
                          <span className="text-[10px] font-bold text-black tracking-wider">
                            VIP • EN ÇOK TERCİH EDİLEN
                          </span>
                        </div>
                      </div>

                      <div className="relative pt-6 text-center">
                        <h3 className="text-2xl font-bold mb-2 text-[var(--foreground)]">
                          {plan.name}
                        </h3>
                        <div className="mb-2">
                          <span className="text-5xl font-bold bg-gradient-to-r from-[var(--gold-light)] via-[var(--gold)] to-[var(--gold-dark)] bg-clip-text text-transparent">
                            {plan.price}
                          </span>
                          <span className="text-lg text-[var(--gold)] ml-1">USDT</span>
                        </div>
                        <p className="text-xs text-[var(--foreground-muted)] mb-8">
                          {plan.description}
                        </p>
                        <button
                          onClick={() => handleSelectPlan({ name: plan.name, price: plan.price })}
                          className="w-full py-4 rounded-xl bg-gradient-to-r from-[var(--gold)] to-[var(--gold-dark)] text-black font-bold text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-[1.02]"
                        >
                          {plan.cta}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Standard Cards */
                  <div className="p-8 rounded-2xl bg-[var(--background)]/50 border border-[var(--glass-border)] hover:border-[var(--gold)]/20 transition-all duration-300">
                    <div className="text-center">
                      <h3 className="text-xl font-semibold mb-2 text-[var(--foreground-muted)]">
                        {plan.name}
                      </h3>
                      <div className="mb-2">
                        <span className="text-4xl font-bold text-[var(--foreground)]">
                          {plan.price}
                        </span>
                        <span className="text-sm text-[var(--foreground-muted)] ml-1">USDT</span>
                      </div>
                      <p className="text-xs text-[var(--foreground-muted)]/60 mb-6">
                        {plan.description}
                      </p>
                      <button
                        onClick={() => handleSelectPlan({ name: plan.name, price: plan.price })}
                        className="w-full py-3 rounded-xl border border-[var(--gold)]/30 text-[var(--gold)] font-medium text-sm transition-all duration-300 hover:bg-[var(--gold)]/10 hover:border-[var(--gold)]/50 hover:shadow-[0_0_20px_rgba(212,175,55,0.1)]"
                      >
                        {plan.cta}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Payment Info */}
          <div className="text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[var(--gold)]/5 border border-[var(--gold)]/10">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] flex items-center justify-center">
                <span className="text-[8px] font-bold text-black">₮</span>
              </div>
              <span className="text-sm text-[var(--foreground-muted)]">
                Ödeme: <span className="text-[var(--gold)] font-medium">USDT TRC20</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedPlan={selectedPlan}
      />
    </>
  );
}
