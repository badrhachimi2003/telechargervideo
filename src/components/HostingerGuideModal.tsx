import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { 
  X, 
  ShieldCheck, 
  Server, 
  Globe, 
  CheckCircle2, 
  Key, 
  Cpu, 
  Layers, 
  HelpCircle,
  Copy,
  Check
} from 'lucide-react';

interface HostingerGuideModalProps {
  isOpen: boolean;
  lang: Language;
  onClose: () => void;
}

export const HostingerGuideModal: React.FC<HostingerGuideModalProps> = ({
  isOpen,
  lang,
  onClose,
}) => {
  const t = translations[lang];
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 p-6 sm:p-8 shadow-2xl text-slate-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rtl:right-auto rtl:left-5 p-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
            <Server className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {lang === 'ar' ? 'دليل إعداد ونشر الموقع على Hostinger' : 'Guide de Déploiement Hostinger & SEO'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              telechargervideo.com · Sécurité, Hébergement, DNS & Monétisation AdSense
            </p>
          </div>
        </div>

        {/* 1-Click ZIP Download for Hostinger */}
        <div className="mb-6 rounded-xl border border-indigo-700/60 bg-gradient-to-r from-indigo-950/80 to-slate-900 p-5 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-1.5">
                📦 {lang === 'ar' ? 'ملف الموقع الجاهز للرفع' : 'Pack Prêt à l\'Emploi'}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white">
                {lang === 'ar' ? 'تحميل حزمة الموقع كاملة (ZIP) بضغطة زر واحدة' : 'Télécharger le Pack Complet du Site (ZIP)'}
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                {lang === 'ar'
                  ? 'يحتوي الملف على: index.html و assets ومجلدات الصور وملفات .htaccess و robots.txt و sitemap.xml، جاهز لرفعه وفك ضغطه مباشرة في public_html على Hostinger.'
                  : 'Contient l\'ensemble des fichiers de production optimisés prêts pour public_html sur Hostinger.'}
              </p>
            </div>
            <a
              href="/telechargervideo_hostinger.zip"
              download="telechargervideo_hostinger.zip"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/40 transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>⬇️ {lang === 'ar' ? 'تحميل ملف ZIP الآن' : 'Télécharger ZIP'}</span>
            </a>
          </div>
        </div>

        {/* Security Pledge Banner */}
        <div className="mb-6 rounded-xl border border-emerald-900/60 bg-emerald-950/30 p-4">
          <div className="flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-emerald-200 leading-relaxed">
              <strong>{lang === 'ar' ? 'مبدأ الأمان التام وعدم طلب كلمات السر :' : 'Garantie de Sécurité Absolue :'}</strong>{' '}
              {lang === 'ar'
                ? 'أنت لا تحتاج إلى إعطائي كلمة سر حساب Hostinger أو البريد الإلكتروني أو بيانات الدفع أو أكواد التحقق 2FA نهائياً! يمكنك إدارة كل شيء بنفسك بأمان وسأعطيك الخطوات الدقيقة كملفات وأوامر جاهزة للتنفيذ بضغطة زر.'
                : 'Vous n\'avez JAMAIS besoin de me donner votre mot de passe Hostinger, codes 2FA ou données de paiement. Vous gardez 100% du contrôle.'}
            </div>
          </div>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-slate-300">
          {/* Section 1: Hostinger Deployment Options */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-3">
              <Cpu className="h-4 w-4 text-indigo-400" />
              <span>{lang === 'ar' ? '1. طرق رفع الموقع على استضافة Hostinger' : '1. Options d\'Hébergement sur Hostinger'}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              {/* Option 1: Static React SPA (Shared Hosting / Public_html) */}
              <div className="rounded-lg border border-slate-800/80 bg-slate-900/60 p-4">
                <span className="font-bold text-white text-sm block mb-1">
                  {lang === 'ar' ? 'الخيار أ: استضافة عادية (Shared Hosting / hPanel)' : 'Option A : Hébergement Mutualisé (hPanel)'}
                </span>
                <p className="text-xs text-slate-400 mb-3">
                  {lang === 'ar'
                    ? 'مثالي للاستضافات العادية البسيطة. نقوم ببناء الملفات عبر الأمر npm run build ثم رفع مجلد dist مباشرة داخل مجلد public_html في مدير الملفات.'
                    : 'Générez les fichiers statiques de production (dist) et déposez-les dans public_html via le Gestionnaire de Fichiers Hostinger.'}
                </p>
                <div className="flex items-center justify-between rounded bg-slate-950 px-2.5 py-1.5 font-mono text-[11px] text-indigo-300 border border-slate-800">
                  <span>npm run build</span>
                  <button
                    onClick={() => copyText('npm run build', 'build_cmd')}
                    className="text-slate-400 hover:text-white"
                  >
                    {copiedKey === 'build_cmd' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>

              {/* Option 2: Node.js / Cloud VPS */}
              <div className="rounded-lg border border-slate-800/80 bg-slate-900/60 p-4">
                <span className="font-bold text-white text-sm block mb-1">
                  {lang === 'ar' ? 'الخيار ب: استضافة Cloud أو VPS مع Node.js' : 'Option B : Hostinger Cloud / VPS Node.js'}
                </span>
                <p className="text-xs text-slate-400 mb-3">
                  {lang === 'ar'
                    ? 'الخيار الأقوى لتشغيل خادم Express مع الـ Backend ومعالجة التدفقات. يتم ضبط Node.js في لوحة hPanel وتعيين ملف التشغيل server.ts أو server.js.'
                    : 'Idéal pour le traitement dynamique et les flux directs. Configurez l\'application Node.js depuis hPanel avec server.ts.'}
                </p>
                <div className="flex items-center justify-between rounded bg-slate-950 px-2.5 py-1.5 font-mono text-[11px] text-indigo-300 border border-slate-800">
                  <span>npm start</span>
                  <button
                    onClick={() => copyText('npm start', 'start_cmd')}
                    className="text-slate-400 hover:text-white"
                  >
                    {copiedKey === 'start_cmd' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Domain & DNS Configuration */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-3">
              <Globe className="h-4 w-4 text-indigo-400" />
              <span>{lang === 'ar' ? '2. إعداد النطاق telechargervideo.com وشهادة SSL' : '2. Configuration du Domaine & SSL'}</span>
            </h3>

            <div className="space-y-2 text-xs sm:text-sm text-slate-300">
              <p>
                {lang === 'ar'
                  ? 'من لوحة تحكم النطاق في Hostinger، تأكد من توجيه سجلات DNS الآتية :'
                  : 'Dans la gestion DNS de telechargervideo.com sur Hostinger :'}
              </p>
              <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-3 font-mono text-xs text-slate-300 space-y-1">
                <div>Type: <span className="text-indigo-400">A</span> | Name: <span className="text-indigo-400">@</span> | Points to: <span className="text-amber-300">[Hostinger IP]</span></div>
                <div>Type: <span className="text-indigo-400">CNAME</span> | Name: <span className="text-indigo-400">www</span> | Points to: <span className="text-indigo-400">telechargervideo.com</span></div>
              </div>
              <p className="text-slate-400 pt-1">
                {lang === 'ar'
                  ? 'ثم فعّل شهادة SSL المجانية (Let\'s Encrypt) بضغطة زر واحدة من تبويب "SSL" لتفعيل بروتوكول https:// الإجباري لترتيب Google وإعلانات AdSense.'
                  : 'Activez le certificat SSL gratuit (Let\'s Encrypt) en 1 clic dans l\'onglet SSL pour forcer le HTTPS.'}
              </p>
            </div>
          </div>

          {/* Section 3: Google SEO & AdSense Approval Roadmap */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-3">
              <Layers className="h-4 w-4 text-indigo-400" />
              <span>{lang === 'ar' ? '3. خطة تصدر نتائج البحث (SEO) وتحقيق أرباح Google AdSense' : '3. Stratégie SEO & Approbation Google AdSense'}</span>
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>{lang === 'ar' ? 'الصفحات القانونية الإلزامية :' : 'Pages Légales Obligatoires :'}</strong>{' '}
                  {lang === 'ar'
                    ? 'قمنا بالفعل بتضمين صفحات سياسة الخصوصية (المتوافقة مع كوكيز AdSense)، وشروط الاستخدام، وحقوق DMCA، ونموذج اتصل بنا، وهو شرط حاسم لقبول حساب AdSense.'
                    : 'Les pages Politiques de Confidentialité (RGPD + AdSense), Conditions d\'utilisation, DMCA et Contact sont déjà prêtes.'}
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>{lang === 'ar' ? 'استهداف الكلمات المفتاحية العضوية :' : 'Mots-clés SEO Ciblés :'}</strong>{' '}
                  {lang === 'ar'
                    ? 'النطاق telechargervideo.com يحتوي على الكلمة المفتاحية الذهبية بالفرنسية، وقمنا بتهيئة صفحات هبوط فرعية لكل منصة (تيك توك بدون علامة مائية، يوتيوب MP4، انستغرام ريلز) لجلب آلاف الزوار يومياً من جوجل فرنسا، والمغرب، والجزائر، وتونس، وكندا، والشرق الأوسط.'
                    : 'telechargervideo.com est un nom de domaine EMD (Exact Match Domain) très puissant pour capter le trafic de recherche organique.'}
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>{lang === 'ar' ? 'أماكن الإعلانات المعتمدة :' : 'Emplacements AdSense Conformes :'}</strong>{' '}
                  {lang === 'ar'
                    ? 'صممنا وحدات إعلانية مطابقة لمعايير IAB مع وسم إعلان صريح لتجنب النقرات غير المقصودة وحماية حسابك من الإغلاق.'
                    : 'Les espaces publicitaires respectent la politique Google AdSense avec étiquetage explicite "Publicité".'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-8 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors cursor-pointer"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
