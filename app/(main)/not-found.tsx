import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-bold text-gradient-gold mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-[var(--foreground)] mb-4">
          Sayfa Bulunamadı
        </h2>
        <p className="text-[var(--foreground-muted)] mb-8 max-w-md mx-auto">
          Aradığınız sayfa mevcut değil veya taşındı.
        </p>
        <Link href="/" className="btn-primary">
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
}
