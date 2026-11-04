import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { 
  Check, 
  HelpCircle, 
  Smartphone, 
  Monitor, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface PlatformGuideProps {
  lang: Language;
}

interface PlatformData {
  id: string;
  name: string;
  badge: string;
  color: string;
  title: { fr: string; ar: string; en: string };
  desc: { fr: string; ar: string; en: string };
  features: { fr: string[]; ar: string[]; en: string[] };
  steps: { fr: string[]; ar: string[]; en: string[] };
}

export const PlatformGuide: React.FC<PlatformGuideProps> = ({ lang }) => {
  const t = translations[lang];
  const [selectedPlatform, setSelectedPlatform] = useState<string>('tiktok');

  const platforms: PlatformData[] = [
    {
      id: 'tiktok',
      name: 'TikTok',
      badge: 'Sans Filigrane',
      color: 'from-pink-500 to-rose-600',
      title: {
        fr: 'Téléchargeur de Vidéos TikTok Sans Filigrane',
        ar: 'تحميل فيديوهات تيك توك بدون العلامة المائية',
        en: 'TikTok Video Downloader Without Watermark',
      },
      desc: {
        fr: 'Enregistrez n\'importe quelle vidéo TikTok ou audio en qualité HD originale sans le logo TikTok ni l\'identifiant utilisateur.',
        ar: 'احفظ أي مقطع أو صوت تيك توك بجودة HD الأصلية الصافية بدون شعار تيك توك وبدون اسم المستخدم المائي.',
        en: 'Save any TikTok video or audio in pristine original HD quality without TikTok watermark or username overlay.',
      },
      features: {
        fr: [
          'Suppression automatique du filigrane TikTok',
          'Téléchargement MP4 haute définition',
          'Extraction de la piste audio MP3 tendance',
          'Compatible application mobile & version web',
        ],
        ar: [
          'إزالة تلقائية للعلامة المائية وشعار تيك توك',
          'تحميل بصيغة MP4 عالية الدقة',
          'استخراج الصوت والموسيقى التريند بصيغة MP3',
          'متوافق مع تطبيق الهاتف ونسخة المتصفح',
        ],
        en: [
          'Automatic TikTok watermark removal',
          'High definition MP4 video downloads',
          'Extract trending background audio in MP3',
          'Works with mobile app and web browser',
        ],
      },
      steps: {
        fr: [
          'Ouvrez TikTok et appuyez sur le bouton "Partager" de la vidéo.',
          'Touchez "Copier le lien".',
          'Collez le lien dans notre barre de recherche et appuyez sur Télécharger.',
        ],
        ar: [
          'افتح تطبيق تيك توك واضغط على زر "مشاركة" الموجود بجانب الفيديو.',
          'اختر "نسخ الرابط" (Copy link).',
          'الصق الرابط في مربع التحميل بأعلى الصفحة واضغط "تحميل الفيديو".',
        ],
        en: [
          'Open TikTok and tap the Share button on the video.',
          'Select "Copy Link".',
          'Paste the link into our downloader box above and click Download.',
        ],
      },
    },
    {
      id: 'youtube',
      name: 'YouTube',
      badge: '1080p & 4K',
      color: 'from-red-500 to-red-700',
      title: {
        fr: 'Téléchargeur de Vidéos YouTube & Shorts',
        ar: 'تحميل مقاطع يوتيوب وفيديوهات Shorts بجودة عالية',
        en: 'YouTube Video & Shorts Downloader',
      },
      desc: {
        fr: 'Convertissez et téléchargez des vidéos YouTube longues ou YouTube Shorts en 1080p, 720p ou fichier audio MP3.',
        ar: 'حمّل فيديوهات يوتيوب الطويلة ومقاطع يوتيوب القصيرة Shorts بدقة 1080p و 720p أو حولها إلى ملف صوتي MP3.',
        en: 'Convert and download YouTube long videos or YouTube Shorts in 1080p, 720p, or high quality MP3 audio.',
      },
      features: {
        fr: [
          'Support complet des vidéos classiques et Shorts',
          'Résolutions jusqu\'à 1080p Full HD',
          'Convertisseur rapide YouTube vers MP3 320 kbps',
          'Téléchargement gratuit sans limitation de durée',
        ],
        ar: [
          'دعم كامل للفيديوهات العادية ومقاطع Shorts',
          'جودات فائقة تصل إلى 1080p Full HD',
          'محول سريع من يوتيوب إلى MP3 بصوت نقي',
          'تحميل مجاني دون تقييد على طول الفيديو',
        ],
        en: [
          'Full support for standard videos and YouTube Shorts',
          'Resolutions up to 1080p Full HD',
          'Fast YouTube to MP3 converter (320 kbps)',
          'Free downloads with no video length limits',
        ],
      },
      steps: {
        fr: [
          'Sur YouTube, cliquez sur "Partager" sous la vidéo.',
          'Copiez l\'URL de la vidéo ou du Short.',
          'Collez l\'URL dans TelechargerVideo.com et sélectionnez votre format.',
        ],
        ar: [
          'في تطبيق يوتيوب، اضغط على زر "مشاركة" أسفل المقطع.',
          'انسخ رابط الفيديو أو رابط المقطع القصير Short.',
          'الصق الرابط في الموقع واختر الدقة المطلوبة ثم احفظ الملف.',
        ],
        en: [
          'On YouTube, click Share beneath the video player.',
          'Copy the video or Shorts URL.',
          'Paste the link on TelechargerVideo.com and pick your desired format.',
        ],
      },
    },
    {
      id: 'instagram',
      name: 'Instagram',
      badge: 'Reels & Stories',
      color: 'from-purple-500 to-pink-600',
      title: {
        fr: 'Téléchargeur Instagram Reels, Vidéos & Stories',
        ar: 'تحميل ريلز وفيديوهات وقصص انستغرام',
        en: 'Instagram Reels, Video & Story Downloader',
      },
      desc: {
        fr: 'Enregistrez les vidéos Reels, publications vidéo et carrousels d\'Instagram en qualité haute définition en un clin d\'œil.',
        ar: 'احفظ فيديوهات الريلز والمقاطع المنشورة على انستغرام بدقتها الأصلية الفائقة وبأعلى سرعة وبدون تسجيل الدخول.',
        en: 'Save Instagram Reels, video posts, and carousels in original HD clarity instantly without logging in.',
      },
      features: {
        fr: [
          'Téléchargement direct des Reels Instagram',
          'Qualité originale 1080p sans compression',
          'Compatible vidéos publiques et créateurs certifiés',
          'Fonctionne sur iPhone et Android sans application',
        ],
        ar: [
          'تحميل مباشر لريلز انستغرام الشهيرة',
          'جودة أصلية 1080p بدون أي ضغط للصورة',
          'يعمل مع الحسابات العامة وصناع المحتوى',
          'متوافق مع هواتف آيفون وأندرويد بسهولة',
        ],
        en: [
          'Direct Instagram Reels downloading',
          'Native 1080p quality without compression',
          'Compatible with public video posts',
          'Seamless on iOS and Android without extra apps',
        ],
      },
      steps: {
        fr: [
          'Ouvrez Instagram et touchez l\'icône de partage (avion en papier) ou les 3 points du Reel.',
          'Sélectionnez "Copier le lien".',
          'Collez le lien dans notre outil et téléchargez le fichier MP4.',
        ],
        ar: [
          'افتح انستغرام واضغط على أيقونة المشاركة أو النقاط الثلاث بجانب الريلز.',
          'اختر "نسخ الرابط" (Copy link).',
          'الصق الرابط في محرك البحث هنا واضغط تحميل.',
        ],
        en: [
          'Open Instagram and tap the Share icon or the three dots on the Reel.',
          'Select "Copy Link".',
          'Paste into TelechargerVideo.com and download your MP4.',
        ],
      },
    },
    {
      id: 'facebook',
      name: 'Facebook',
      badge: 'Watch & Reels',
      color: 'from-blue-600 to-indigo-700',
      title: {
        fr: 'Téléchargeur de Vidéos Facebook en HD',
        ar: 'تحميل فيديوهات فيسبوك بجودة عالية HD',
        en: 'Facebook Video Downloader in HD',
      },
      desc: {
        fr: 'Téléchargez les vidéos de groupes publics, les publications de pages et les Facebook Reels en MP4.',
        ar: 'احفظ مقاطع الفيديو من صفحات فيسبوك والمجموعات العامة ومقاطع Facebook Reels بصيغة MP4.',
        en: 'Download videos from public groups, page posts, and Facebook Watch reels in standard or full HD MP4.',
      },
      features: {
        fr: [
          'Qualité HD et SD disponible',
          'Prise en charge de Facebook Watch & Reels',
          'Conversion audio MP3 disponible',
          'Sécurisé et 100% anonyme',
        ],
        ar: [
          'خيارات جودة متعددة HD و SD',
          'دعم مقاطع Facebook Watch و Reels',
          'إمكانية استخراج الصوت MP3',
          'آمن ومحمي وبدون تتبع للبيانات',
        ],
        en: [
          'HD and SD quality options',
          'Supports Facebook Watch & Reels',
          'MP3 audio extraction available',
          'Private, secure, and anonymous',
        ],
      },
      steps: {
        fr: [
          'Sur Facebook, cliquez sur le bouton "Partager" de la vidéo.',
          'Choisissez "Copier le lien".',
          'Collez l\'URL sur TelechargerVideo.com pour obtenir le fichier.',
        ],
        ar: [
          'في فيسبوك، اضغط على زر "مشاركة" أسفل المقطع.',
          'اختر "نسخ الرابط".',
          'الصق الرابط في موقعنا لتحميل الفيديو مباشرة.',
        ],
        en: [
          'On Facebook, click the Share button below the video.',
          'Choose "Copy Link".',
          'Paste into TelechargerVideo.com to save the video file.',
        ],
      },
    },
    {
      id: 'twitter',
      name: 'X (Twitter)',
      badge: 'MP4 Rapide',
      color: 'from-slate-700 to-slate-900',
      title: {
        fr: 'Téléchargeur de Vidéos X (Twitter)',
        ar: 'تحميل مقاطع الفيديو من منصة X (تويتر)',
        en: 'X (Twitter) Video Downloader',
      },
      desc: {
        fr: 'Téléchargez rapidement les vidéos et GIFs publiés sur Twitter / X sur votre téléphone ou PC.',
        ar: 'احفظ فيديوهات التغريدات ومقاطع GIF المتحركة من منصة X (تويتر) على هاتفك أو حاسوبك بسهولة.',
        en: 'Quickly download videos and animated GIFs embedded in tweets on X / Twitter to your phone or computer.',
      },
      features: {
        fr: [
          'Téléchargement des vidéos et animations GIF',
          'Multiples résolutions proposées',
          'Vitesse de téléchargement instantanée',
          'Sans publicité intrusive',
        ],
        ar: [
          'تحميل الفيديوهات وملفات GIF المتحركة',
          'عدة جودات مختلفة للاختيار',
          'سرعة فائقة في معالجة الروابط',
          'تجربة نظيفة بدون إعلانات مزعجة',
        ],
        en: [
          'Download videos and animated GIFs',
          'Multiple resolutions available',
          'Instant parsing speed',
          'Clean and streamlined user experience',
        ],
      },
      steps: {
        fr: [
          'Cliquez sur l\'icône de partage sous le tweet contenant la vidéo.',
          'Sélectionnez "Copier le lien du post".',
          'Collez le lien dans TelechargerVideo.com et téléchargez.',
        ],
        ar: [
          'اضغط على أيقونة المشاركة أسفل التغريدة التي تحتوي على الفيديو.',
          'اختر "نسخ رابط التغريدة" (Copy link to post).',
          'الصق الرابط هنا واضغط تحميل.',
        ],
        en: [
          'Click the Share icon under the tweet with the video.',
          'Select "Copy link to post".',
          'Paste on TelechargerVideo.com and download.',
        ],
      },
    },
  ];

  const currentPlatform = platforms.find((p) => p.id === selectedPlatform) || platforms[0];

  return (
    <section id="platforms" className="w-full py-12 md:py-16 border-t border-slate-900 bg-slate-950/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            {t.platformsTitle}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400">
            {t.platformsSubtitle}
          </p>
        </div>

        {/* Platform Selector Buttons (Segmented Filter Bar) */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 max-w-2xl mx-auto rounded-xl bg-slate-900/80 border border-slate-800">
          {platforms.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPlatform(p.id)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                selectedPlatform === p.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Platform Details Card */}
        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left: Info & Features */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                  {currentPlatform.name}
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-xs text-slate-400">
                  {currentPlatform.badge}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {currentPlatform.title[lang]}
              </h3>

              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                {currentPlatform.desc[lang]}
              </p>

              <div className="mt-6 space-y-2.5">
                {currentPlatform.features[lang].map((feat, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <a
                  href="#downloader"
                  className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
                >
                  <span>{lang === 'ar' ? `تحميل من ${currentPlatform.name} الآن` : `Télécharger depuis ${currentPlatform.name}`}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Right: How to copy & download steps */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-6">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-indigo-400" />
                <span>{lang === 'ar' ? 'طريقة التحميل السهلة' : 'Guide étape par étape'}</span>
              </h4>

              <div className="space-y-4">
                {currentPlatform.steps[lang].map((stepText, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-600/20 text-indigo-400 font-mono text-xs font-bold">
                      0{idx + 1}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-300 pt-1">
                      {stepText}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Smartphone className="h-3.5 w-3.5" />
                  <span>iOS & Android</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Monitor className="h-3.5 w-3.5" />
                  <span>PC, Mac & Chrome</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
