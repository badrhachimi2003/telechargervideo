import React, { useState } from 'react';
import { Language } from '../types';
import { translations, faqs } from '../translations';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqSectionProps {
  lang: Language;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ lang }) => {
  const t = translations[lang];
  const faqList = faqs[lang];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full py-12 md:py-20 border-t border-slate-900 bg-slate-950/80">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 mb-3">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>FAQ & SUPPORT</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            {t.navFaq}
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            {lang === 'ar'
              ? 'إليك إجابات شافية على كافة الأسئلة الشائعة حول التحميل والأمان والصيغ'
              : 'Toutes les réponses à vos questions sur le téléchargement de vidéos, les formats et la légalité.'}
          </p>
        </div>

        <div className="space-y-3">
          {faqList.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-xl border border-slate-800 bg-slate-900/50 transition-all overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left rtl:text-right cursor-pointer hover:bg-slate-800/40 transition-colors"
                >
                  <span className="text-sm sm:text-base font-semibold text-slate-200">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-indigo-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
