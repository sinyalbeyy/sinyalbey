import Link from 'next/link';

export default function IadeCta() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-green-950/60 border border-green-800/50 text-green-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Otomatik Hesaplama
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
          Yaptığınız Komisyonun
          <br />
          <span className="text-green-400">İadesini Alın!</span>
        </h2>

        <p className="text-zinc-400 text-base mb-8 max-w-md mx-auto leading-relaxed">
          Bitget üzerinden işlem yaptıysanız komisyonunuzun{' '}
          <span className="text-white font-medium">%80&apos;i</span> size iade ediliyor.
          UID numaranızı girin, anında öğrenin.
        </p>

        <Link
          href="/uid-sorgu"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-semibold text-base px-8 py-4 rounded-xl transition-all duration-200 shadow-xl shadow-green-900/30 hover:shadow-green-800/40 hover:-translate-y-0.5"
        >
          İademi Sorgula
          <span>→</span>
        </Link>
      </div>
    </section>
  );
}
