import React, { useState, useEffect } from 'react';
import { Language, ModalType } from './types';
import { translations } from './translations';
import { Navbar } from './components/Navbar';
import { VideoDownloader } from './components/VideoDownloader';
import { PlatformGuide } from './components/PlatformGuide';
import { FeaturesBento } from './components/FeaturesBento';
import { FaqSection } from './components/FaqSection';
import { AdSenseSlot } from './components/AdSenseSlot';
import { Footer } from './components/Footer';
import { LegalModal } from './components/LegalModal';
import { HostingerGuideModal } from './components/HostingerGuideModal';
import { Sparkles, ShieldCheck, Zap, ArrowDown, Server } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>('fr');
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const t = translations[lang];

  // Sync html dir attribute for Arabic RTL
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Bar Navigation */}
      <Navbar
        lang={lang}
        onLanguageChange={(newLang) => setLang(newLang)}
        onOpenHostingerGuide={() => setActiveModal('hostinger')}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-6 md:pt-16 md:pb-8">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

          <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
            {/* Clean Editorial Kicker (No Pill Enclosures) */}
            <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-3">
              <Zap className="h-3.5 w-3.5" />
              <span>{t.tagline}</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">100% Gratuit & Illimité</span>
            </div>

            {/* Hero Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight" style={{ textWrap: 'balance' }}>
              {t.heroTitle}
            </h1>

            {/* Hero Subtitle */}
            <p className="mt-4 text-sm sm:text-base md:text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
              {t.heroSubtitle}
            </p>

            {/* Quick Trust Strip */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>{lang === 'ar' ? 'بدون برامج أو تثبيت' : 'Sans installation de logiciel'}</span>
              </div>
              <span className="text-slate-700 hidden sm:inline">·</span>
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span>{lang === 'ar' ? 'جودة أصلية فائقة HD' : 'Qualité originale 1080p HD'}</span>
              </div>
              <span className="text-slate-700 hidden sm:inline">·</span>
              <div className="flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-indigo-400" />
                <span>{lang === 'ar' ? 'سرعة تنزيل فائقة' : 'Vitesse de conversion éclair'}</span>
              </div>
            </div>
          </div>

          {/* Interactive Downloader Box */}
          <VideoDownloader lang={lang} />
        </section>

        {/* AdSense Leaderboard Slot #1 */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <AdSenseSlot slotType="leaderboard" lang={lang} />
        </div>

        {/* Features & 3-Step Bento Grid */}
        <FeaturesBento lang={lang} />

        {/* Platform-Specific Guides for SEO */}
        <PlatformGuide lang={lang} />

        {/* AdSense In-Feed Slot #2 */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <AdSenseSlot slotType="in-feed" lang={lang} />
        </div>

        {/* FAQ Section */}
        <FaqSection lang={lang} />

        {/* Hostinger & SEO Quick Action Callout */}
        <section className="w-full py-10 bg-gradient-to-b from-slate-950 to-slate-900 border-t border-slate-800">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-300 mb-3">
              <Server className="h-3.5 w-3.5" />
              <span>Hostinger & SEO Ready</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {lang === 'ar' ? 'جاهز للنشر على استضافة Hostinger والربط مع AdSense' : 'Prêt pour le Déploiement Hostinger & Google AdSense'}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
              {lang === 'ar'
                ? 'استعرض خطوات الربط بالسيرفر وتهيئة الـ DNS وإعدادات ملفات الإنتاج لضمان قبول موقعك في برنامج جوجل أدسنس وتحقيق زيارات مستمرة.'
                : 'Consultez le guide détaillé de configuration DNS, hébergement Node.js/statique et monétisation pour telechargervideo.com.'}
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <a
                href="/telechargervideo_hostinger.zip"
                download="telechargervideo_hostinger.zip"
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
              >
                <span>📦 {lang === 'ar' ? 'تحميل ملفات الموقع (ZIP) مباشرة' : 'Télécharger le ZIP Hostinger'}</span>
              </a>
              <button
                type="button"
                onClick={() => setActiveModal('hostinger')}
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-lg hover:bg-indigo-500 transition-colors cursor-pointer"
              >
                <Server className="h-4 w-4" />
                <span>{t.navHostinger}</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        onOpenModal={(type) => setActiveModal(type)}
      />

      {/* Legal & Contact Modals */}
      <LegalModal
        type={activeModal}
        lang={lang}
        onClose={() => setActiveModal(null)}
      />

      {/* Hostinger Guide Modal */}
      <HostingerGuideModal
        isOpen={activeModal === 'hostinger'}
        lang={lang}
        onClose={() => setActiveModal(null)}
      />
    </div>
  );
}
