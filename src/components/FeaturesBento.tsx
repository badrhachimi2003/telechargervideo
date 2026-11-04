import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { Zap, ShieldCheck, Headphones, Smartphone, Sparkles, CheckCircle2 } from 'lucide-react';

interface FeaturesBentoProps {
  lang: Language;
}

export const FeaturesBento: React.FC<FeaturesBentoProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <section id="how-it-works" className="w-full py-12 md:py-20 bg-slate-950 border-t border-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* How It Works: 3 Steps */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            {t.stepsTitle}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400">
            {lang === 'ar'
              ? 'ثلاث خطوات سريعة وبسيطة تفصلك عن تحميل أي مقطع فيديو على هاتفك أو حاسوبك'
              : 'Trois étapes simples et instantanées pour enregistrer n\'importe quelle vidéo sur votre appareil.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Step 1 */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 flex flex-col justify-between hover:border-slate-700 transition-colors">
            <div>
              <div className="text-2xl font-mono font-bold text-indigo-400 mb-4">
                {t.step1Num}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {t.step1Title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {t.step1Desc}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs text-slate-500">
              {lang === 'ar' ? 'يدعم الروابط القصيرة والمباشرة' : 'Prend en charge tous les liens de partage'}
            </div>
          </div>

          {/* Step 2 */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 flex flex-col justify-between hover:border-slate-700 transition-colors">
            <div>
              <div className="text-2xl font-mono font-bold text-indigo-400 mb-4">
                {t.step2Num}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {t.step2Title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {t.step2Desc}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs text-slate-500">
              {lang === 'ar' ? 'فحص تلقائي لمصدر الفيديو' : 'Détection automatique de la plateforme'}
            </div>
          </div>

          {/* Step 3 */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 flex flex-col justify-between hover:border-slate-700 transition-colors">
            <div>
              <div className="text-2xl font-mono font-bold text-indigo-400 mb-4">
                {t.step3Num}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {t.step3Title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {t.step3Desc}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs text-slate-500">
              {lang === 'ar' ? 'تحميل فوري بصيغة MP4 أو MP3' : 'Téléchargement direct sans redirection'}
            </div>
          </div>
        </div>

        {/* Bento Grid: Features & Capabilities */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            {t.featuresTitle}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400">
            {t.featuresSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Card 1: 4K & Formats (Spans 7 cols) with generated visual */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden flex flex-col justify-between">
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 mb-2">
                <Zap className="h-4 w-4" />
                <span>ULTRA HD & AUDIO FIDELITY</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {t.feat1Title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                {t.feat1Desc} {t.feat2Desc}
              </p>
            </div>
            <div className="relative w-full h-56 sm:h-64 overflow-hidden border-t border-slate-800">
              <img
                src="/src/assets/images/feature_formats_graphic_1793811152104.jpg"
                alt="4K Video Quality and Audio Formats"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
            </div>
          </div>

          {/* Card 2: Devices & Cross-Platform (Spans 5 cols) with generated visual */}
          <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden flex flex-col justify-between">
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 mb-2">
                <Smartphone className="h-4 w-4" />
                <span>RESPONSIVE MULTI-DEVICE</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {t.feat3Title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                {t.feat3Desc}
              </p>
            </div>
            <div className="relative w-full h-56 sm:h-64 overflow-hidden border-t border-slate-800">
              <img
                src="/src/assets/images/feature_devices_showcase_1793811152601.jpg"
                alt="Multi-device compatibility"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
            </div>
          </div>
        </div>

        {/* Proof Strips */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="rounded-xl border border-slate-800/80 bg-slate-900/30 p-4">
            <div className="text-xl sm:text-2xl font-bold text-white font-mono tabular-nums">100%</div>
            <div className="text-xs text-slate-400 mt-1">{lang === 'ar' ? 'مجاني بالكامل' : 'Gratuit à vie'}</div>
          </div>
          <div className="rounded-xl border border-slate-800/80 bg-slate-900/30 p-4">
            <div className="text-xl sm:text-2xl font-bold text-white font-mono tabular-nums">&lt; 1.5s</div>
            <div className="text-xs text-slate-400 mt-1">{lang === 'ar' ? 'زمن تحليل الرابط' : 'Vitesse d\'analyse'}</div>
          </div>
          <div className="rounded-xl border border-slate-800/80 bg-slate-900/30 p-4">
            <div className="text-xl sm:text-2xl font-bold text-white font-mono tabular-nums">0 filigrane</div>
            <div className="text-xs text-slate-400 mt-1">{lang === 'ar' ? 'بدون علامة مائية' : 'Fichiers propres'}</div>
          </div>
          <div className="rounded-xl border border-slate-800/80 bg-slate-900/30 p-4">
            <div className="text-xl sm:text-2xl font-bold text-white font-mono tabular-nums">256-bit</div>
            <div className="text-xs text-slate-400 mt-1">{lang === 'ar' ? 'تشفير آمن SSL' : 'Connexion chiffrée'}</div>
          </div>
        </div>
      </div>
    </section>
  );
};
