import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { Globe, Server, DownloadCloud } from 'lucide-react';

interface NavbarProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenHostingerGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onLanguageChange,
  onOpenHostingerGuide,
}) => {
  const t = translations[lang];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-md shadow-indigo-600/30">
            <DownloadCloud className="h-5 w-5" />
          </div>
          <span>Telecharger<span className="text-indigo-400">Video</span>.com</span>
        </a>

        {/* Zone 2: 4 concise single-line text nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a
            href="#platforms"
            className="hover:text-indigo-400 transition-colors whitespace-nowrap shrink-0"
          >
            {t.navPlatforms}
          </a>
          <a
            href="#how-it-works"
            className="hover:text-indigo-400 transition-colors whitespace-nowrap shrink-0"
          >
            {t.navHowItWorks}
          </a>
          <a
            href="#faq"
            className="hover:text-indigo-400 transition-colors whitespace-nowrap shrink-0"
          >
            {t.navFaq}
          </a>
          <button
            onClick={onOpenHostingerGuide}
            className="inline-flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Server className="h-3.5 w-3.5" />
            <span>{t.navHostinger}</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action & Language switcher */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Language Switcher */}
          <div className="relative inline-flex items-center rounded-lg border border-slate-800 bg-slate-900 p-0.5 text-xs">
            <button
              type="button"
              onClick={() => onLanguageChange('fr')}
              className={`rounded-md px-2.5 py-1 font-medium transition-colors ${
                lang === 'fr'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              FR
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('ar')}
              className={`rounded-md px-2.5 py-1 font-medium transition-colors ${
                lang === 'ar'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              العربية
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              className={`rounded-md px-2.5 py-1 font-medium transition-colors ${
                lang === 'en'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          {/* Quick CTA to downloader input */}
          <a
            href="#downloader"
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            {t.downloadBtn}
          </a>
        </div>
      </div>
    </header>
  );
};
