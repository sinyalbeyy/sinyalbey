'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const TG_MAIN = process.env.NEXT_PUBLIC_TG_MAIN || 'https://t.me/sinyalbeyss';

  return (
    <header className="fixed top-[36px] left-0 right-0 z-50 bg-[var(--background)]/80 backdrop-blur-2xl border-b border-[rgba(255,255,255,0.04)]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 rounded-full overflow-hidden ring-1 ring-[var(--gold)]/20 group-hover:ring-[var(--gold)]/40 transition-all">
              <Image
                src="/logo.png"
                alt="Sinyal Bey"
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-[var(--foreground)] font-semibold text-sm tracking-tight hidden sm:block">
              Sinyal <span className="text-[var(--gold)]">Bey</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/hakkimizda"
              className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors text-[13px]"
            >
              Hakkımızda
            </Link>
            <Link
              href="/sss"
              className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors text-[13px]"
            >
              SSS
            </Link>
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href={TG_MAIN}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors text-[13px] px-3 py-1.5"
            >
              Telegram
            </a>
            <Link href="/one-percent-club" className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors text-[13px] px-3 py-1.5">
              %1 Club
            </Link>
            <Link href="/bitget-elite" className="btn-gold-glossy text-[12px] py-1.5 px-4 font-medium">
              VIP Bitget
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative w-8 h-8 flex items-center justify-center"
            aria-label="Menü"
          >
            <div className="flex flex-col items-end gap-[5px]">
              <span
                className={`block h-[1.5px] bg-[var(--foreground)] rounded-full transition-all duration-300 origin-center ${
                  isMenuOpen ? 'w-4 rotate-45 translate-y-[6.5px]' : 'w-5'
                }`}
              />
              <span
                className={`block h-[1.5px] bg-[var(--gold)] rounded-full transition-all duration-300 ${
                  isMenuOpen ? 'w-0 opacity-0' : 'w-3.5'
                }`}
              />
              <span
                className={`block h-[1.5px] bg-[var(--foreground)] rounded-full transition-all duration-300 origin-center ${
                  isMenuOpen ? 'w-4 -rotate-45 -translate-y-[6.5px]' : 'w-4'
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
            isMenuOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="py-4 border-t border-[rgba(255,255,255,0.04)]">
            <div className="flex flex-col gap-1">
              <Link
                href="/hakkimizda"
                className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors py-2.5 px-1 text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Hakkımızda
              </Link>
              <Link
                href="/sss"
                className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors py-2.5 px-1 text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                SSS
              </Link>
              <a
                href={TG_MAIN}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors py-2.5 px-1 text-sm"
              >
                Telegram
              </a>
              <Link
                href="/one-percent-club"
                className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors py-2.5 px-1 text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                %1 Club
              </Link>
            </div>
            <div className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.04)]">
              <Link
                href="/bitget-elite"
                className="btn-gold-glossy block text-center text-sm py-2.5 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                VIP Bitget Club
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
