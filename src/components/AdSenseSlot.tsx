import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { ShieldCheck } from 'lucide-react';

interface AdSenseSlotProps {
  slotType: 'leaderboard' | 'rectangle' | 'in-feed';
  lang: Language;
  className?: string;
}

export const AdSenseSlot: React.FC<AdSenseSlotProps> = ({ slotType, lang, className = '' }) => {
  const t = translations[lang];

  return (
    <div className={`w-full my-6 flex flex-col items-center ${className}`}>
      {/* Required AdSense Policy Disclosure */}
      <div className="flex items-center gap-1.5 text-[11px] font-medium tracking-wider uppercase text-slate-500 mb-1.5">
        <ShieldCheck className="h-3 w-3 text-slate-500" />
        <span>{t.adNotice}</span>
      </div>

      {/* Ad Container Box */}
      <div className="w-full max-w-4xl rounded-xl border border-slate-800/80 bg-slate-900/60 p-3 sm:p-4 text-center">
        {slotType === 'leaderboard' && (
          <div className="min-h-[90px] w-full flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-700/60 bg-slate-950/40 p-4 text-slate-400 text-xs">
            <span className="font-semibold text-slate-300">Emplacement Google AdSense Responsive</span>
            <span className="mt-1 text-slate-500 text-[11px]">
              Taille IAB standard : Leaderboard 728x90 / Mobile 320x100
            </span>
            <span className="mt-2 text-[10px] text-slate-600 font-mono">
              &lt;ins class=&quot;adsbygoogle&quot; data-ad-client=&quot;ca-pub-XXXXXXXXXXXXXXXX&quot; data-ad-slot=&quot;1234567890&quot;&gt;&lt;/ins&gt;
            </span>
          </div>
        )}

        {slotType === 'rectangle' && (
          <div className="min-h-[250px] max-w-[300px] sm:max-w-[336px] mx-auto flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-700/60 bg-slate-950/40 p-4 text-slate-400 text-xs">
            <span className="font-semibold text-slate-300">Emplacement AdSense Rectangle</span>
            <span className="mt-1 text-slate-500 text-[11px]">Taille standard : 300x250 / 336x280</span>
            <span className="mt-2 text-[10px] text-slate-600 font-mono">
              &lt;ins class=&quot;adsbygoogle&quot; data-ad-format=&quot;rectangle&quot;&gt;&lt;/ins&gt;
            </span>
          </div>
        )}

        {slotType === 'in-feed' && (
          <div className="min-h-[100px] w-full flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-700/60 bg-slate-950/40 p-3 text-slate-400 text-xs">
            <span className="font-semibold text-slate-300">Format d&apos;annonce In-Feed Native</span>
            <span className="mt-1 text-slate-500 text-[11px]">Optimisé pour un taux de clic élevé et le respect des règles AdSense</span>
          </div>
        )}
      </div>
    </div>
  );
};
