import HeroBackground from '../backgrounds/HeroBackground';
import BreakingBar from './BreakingBar';
import CTAArea from './CTAArea';
import TrustStrip from './TrustStrip';
import HeroStats from './HeroStats';
import MiniProof from './MiniProof';
import MiniTestimonials from './MiniTestimonials';
import LiveActivity from './LiveActivity';

const Hero = () => {
  return (
    <>
      <BreakingBar />
      <section className="min-h-screen flex flex-col justify-center pt-28 pb-8 px-4 relative overflow-hidden">
        <HeroBackground />

        <div className="max-w-4xl mx-auto text-center relative z-10 w-full">
          {/* Title */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-gradient-gold">
            Sinyal Bey
          </h1>

          <p className="text-lg md:text-xl text-[var(--foreground)] mb-2 font-light">
            Seçilmiş sistem. Net kurallar. Disiplinli trade.
          </p>

          <p className="text-[var(--foreground-muted)] mb-8 text-sm">
            Kalabalık için değil, doğru ekip için.
          </p>

          {/* CTA Area */}
          <CTAArea />

          {/* Trust Strip */}
          <TrustStrip />

          {/* Stats Cards */}
          <HeroStats />

          {/* Mini Proof Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 max-w-2xl mx-auto">
            <MiniProof />
            <LiveActivity />
            <MiniTestimonials />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
