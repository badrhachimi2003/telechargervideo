import React, { useState } from 'react';
import { Language, ModalType } from '../types';
import { translations } from '../translations';
import { X, ShieldAlert, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface LegalModalProps {
  type: ModalType;
  lang: Language;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, lang, onClose }) => {
  const t = translations[lang];

  // Contact form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState<{ success: boolean; msg: string } | null>(null);

  if (!type || type === 'hostinger') return null;

  const handleSubmitContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setFeedback(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Erreur lors de l\'envoi');
      }
      setFeedback({ success: true, msg: data.message || 'Message envoyé avec succès !' });
      setName('');
      setEmail('');
      setMessage('');
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Une erreur est survenue';
      setFeedback({ success: false, msg: errorMsg });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl text-slate-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rtl:right-auto rtl:left-5 p-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Content based on type */}
        {type === 'about' && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              {t.aboutUs} – TelechargerVideo.com
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <p>
                <strong>TelechargerVideo.com</strong> est une plateforme web moderne et gratuite conçue pour simplifier le téléchargement et la conversion de vidéos publiques sur les réseaux sociaux.
              </p>
              <p>
                Notre mission est d&apos;offrir aux créateurs de contenu, étudiants, journalistes et particuliers un outil rapide, fiable et sécurisé pour sauvegarder des vidéos en haute définition (1080p, 4K) ou extraire des bandes sonores en format MP3 stéréo de qualité studio.
              </p>
              <h3 className="text-base font-semibold text-white mt-4">Nos engagements :</h3>
              <ul className="list-disc list-inside space-y-1.5 text-slate-400">
                <li>Gratuité totale sans abonnement caché.</li>
                <li>Respect absolu de votre vie privée : aucun historique de navigation ni vidéo n&apos;est enregistré.</li>
                <li>Compatibilité universelle sur mobile, tablette et ordinateur.</li>
                <li>Sécurité maximale grâce à des connexions chiffrées SSL de bout en bout.</li>
              </ul>
            </div>
          </div>
        )}

        {type === 'privacy' && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              {t.privacyPolicy} (Google AdSense & GDPR Compliant)
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <p>
                Chez <strong>TelechargerVideo.com</strong>, la confidentialité de nos visiteurs est une priorité fondamentale. Cette politique de confidentialité détaille les types d&apos;informations collectées et la façon dont nous les utilisons.
              </p>

              <h3 className="text-sm font-semibold text-white mt-3">1. Fichiers journaux (Log Files)</h3>
              <p className="text-slate-400">
                Comme la plupart des sites web, TelechargerVideo.com utilise des fichiers journaux standards. Ces fichiers enregistrent les visiteurs lors de leur visite : adresses IP, type de navigateur, fournisseur d&apos;accès Internet (FAI), horodatage et pages de référence. Ces informations ne sont liées à aucune information identifiable personnellement.
              </p>

              <h3 className="text-sm font-semibold text-white mt-3">2. Cookies et Balises Web (Google AdSense)</h3>
              <p className="text-slate-400">
                Google, en tant que fournisseur tiers, utilise des cookies pour diffuser des annonces sur notre site. L&apos;utilisation par Google du cookie DART lui permet de diffuser des annonces aux utilisateurs en fonction de leur visite sur TelechargerVideo.com et d&apos;autres sites sur Internet. Les utilisateurs peuvent désactiver l&apos;utilisation du cookie DART en consultant les règles de confidentialité de Google relatives au réseau d&apos;annonces et de contenu.
              </p>

              <h3 className="text-sm font-semibold text-white mt-3">3. Hébergement des médias</h3>
              <p className="text-slate-400">
                TelechargerVideo.com n&apos;héberge, ne clone ni ne stocke aucune vidéo ou fichier audio sur ses serveurs. Toutes les vidéos sont téléchargées directement depuis les serveurs de distribution de contenu (CDN) respectifs des plateformes d&apos;origine.
              </p>

              <h3 className="text-sm font-semibold text-white mt-3">4. Conformité RGPD (GDPR)</h3>
              <p className="text-slate-400">
                Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez du droit d&apos;accès, de rectification et d&apos;effacement de toute donnée vous concernant en nous contactant à support@telechargervideo.com.
              </p>
            </div>
          </div>
        )}

        {type === 'terms' && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              {t.termsOfService}
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <p>
                En utilisant <strong>TelechargerVideo.com</strong>, vous acceptez pleinement et sans réserve les présentes conditions d&apos;utilisation.
              </p>
              <h3 className="text-sm font-semibold text-white mt-3">1. Usage strictement personnel et loyal</h3>
              <p className="text-slate-400">
                Notre service est mis à disposition uniquement pour un usage personnel et non commercial. L&apos;utilisateur s&apos;engage à n&apos;utiliser cet outil que pour télécharger des contenus dont il détient les droits légaux, ou pour lesquels il a reçu l&apos;autorisation préalable du titulaire des droits d&apos;auteur.
              </p>
              <h3 className="text-sm font-semibold text-white mt-3">2. Responsabilité de l&apos;utilisateur</h3>
              <p className="text-slate-400">
                TelechargerVideo.com ne peut en aucun cas être tenu responsable de l&apos;usage abusif ou illicite que vous pourriez faire des contenus téléchargés. Il vous appartient de vous conformer aux lois en vigueur dans votre juridiction.
              </p>
              <h3 className="text-sm font-semibold text-white mt-3">3. Disponibilité du service</h3>
              <p className="text-slate-400">
                Nous nous efforçons de maintenir le service disponible 24h/24 et 7j/7, mais nous ne garantissons pas l&apos;absence d&apos;interruptions pour maintenance technique ou modifications d&apos;APIs tierces.
              </p>
            </div>
          </div>
        )}

        {type === 'dmca' && (
          <div>
            <div className="flex items-center gap-2 mb-3 text-amber-400">
              <ShieldAlert className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-wider">DMCA Compliance</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              {t.dmcaPolicy} & Copyright Takedown
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <p>
                <strong>TelechargerVideo.com</strong> respecte scrupuleusement la propriété intellectuelle et les droits d&apos;auteur conformément au Digital Millennium Copyright Act (DMCA).
              </p>
              <p className="text-slate-400">
                Comme notre service agit uniquement en tant qu&apos;intermédiaire technique et ne stocke ni n&apos;indexe aucun fichier protégé sur ses serveurs, tout contenu diffusé provient directement de plateformes tierces (YouTube, TikTok, Instagram, Meta, etc.).
              </p>
              <h3 className="text-sm font-semibold text-white mt-3">Procédure de réclamation DMCA :</h3>
              <p className="text-slate-400">
                Si vous êtes titulaire de droits d&apos;auteur ou un mandataire officiel et estimez qu&apos;un lien ou contenu porte atteinte à vos droits, vous pouvez nous adresser une notification officielle comprenant :
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li>Votre nom, affiliation et adresse email de contact.</li>
                <li>La description précise de l&apos;œuvre protégée.</li>
                <li>L&apos;URL exacte concernée.</li>
                <li>Une déclaration sur l&apos;honneur confirmant votre bonne foi.</li>
              </ul>
              <p className="mt-3 text-indigo-400 font-medium">
                Email pour notifications DMCA : dmca@telechargervideo.com (réponse sous 24 à 48 heures ouvrées).
              </p>
            </div>
          </div>
        )}

        {type === 'contact' && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              {t.contactUs}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              Une question, une suggestion de partenariat ou un signalement technique ? Écrivez-nous directement.
            </p>

            {feedback && (
              <div
                className={`mb-5 p-3 rounded-lg flex items-center gap-2 text-xs sm:text-sm ${
                  feedback.success
                    ? 'bg-emerald-950/60 border border-emerald-800 text-emerald-300'
                    : 'bg-rose-950/60 border border-rose-800 text-rose-300'
                }`}
              >
                {feedback.success ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                <span>{feedback.msg}</span>
              </div>
            )}

            <form onSubmit={handleSubmitContact} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Votre nom"
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Adresse Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nom@exemple.com"
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Objet du message
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
                >
                  <option value="General Inquiry">Question générale / Information</option>
                  <option value="Technical Issue">Signaler un bug technique / Plateforme</option>
                  <option value="Partnership / Advertising">Publicité / Partenariat AdSense</option>
                  <option value="DMCA / Copyright">Droits d&apos;auteur / DMCA</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Décrivez votre demande en détail..."
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md hover:bg-indigo-500 disabled:opacity-60 transition-all cursor-pointer"
              >
                {isSending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Envoi en cours...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    <span>{t.send}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Modal Footer */}
        <div className="mt-8 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-slate-800 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
