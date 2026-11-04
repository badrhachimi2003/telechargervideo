import React from 'react';
import { Language, ModalType } from '../types';
import { translations } from '../translations';
import { DownloadCloud, ShieldCheck } from 'lucide-react';

interface FooterProps {
  lang: Language;
  onOpenModal: (type: ModalType) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onOpenModal }) => {
  const t = translations[lang];

  return (
    <footer className="w-full border-t border-slate-900 bg-slate-950 py-12 text-slate-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Tagline */}
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-sm">
              <DownloadCloud className="h-4 w-4" />
            </div>
            <span className="text-base font-bold text-white tracking-tight">
              Telecharger<span className="text-indigo-400">Video</span>.com
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-xs text-slate-500">{t.tagline}</span>
          </div>

          {/* Legal Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-5 text-xs text-slate-400">
            <button
              onClick={() => onOpenModal('about')}
              className="hover:text-indigo-400 transition-colors cursor-pointer"
            >
              {t.aboutUs}
            </button>
            <button
              onClick={() => onOpenModal('privacy')}
              className="hover:text-indigo-400 transition-colors cursor-pointer"
            >
              {t.privacyPolicy}
            </button>
            <button
              onClick={() => onOpenModal('terms')}
              className="hover:text-indigo-400 transition-colors cursor-pointer"
            >
              {t.termsOfService}
            </button>
            <button
              onClick={() => onOpenModal('dmca')}
              className="hover:text-indigo-400 transition-colors cursor-pointer"
            >
              {t.dmcaPolicy}
            </button>
            <button
              onClick={() => onOpenModal('contact')}
              className="hover:text-indigo-400 transition-colors cursor-pointer"
            >
              {t.contactUs}
            </button>
          </nav>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>{t.footerLegalNotice}</p>
          <p>{t.footerCopyright}</p>
        </div>
      </div>
    </footer>
  );
};
