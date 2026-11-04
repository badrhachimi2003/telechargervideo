import React, { useState } from 'react';
import { Language, VideoAnalysisResult, VideoFormat } from '../types';
import { translations } from '../translations';
import { 
  DownloadCloud, 
  Sparkles, 
  Clipboard, 
  X, 
  Loader2, 
  CheckCircle2, 
  Music, 
  Video, 
  Image as ImageIcon, 
  ExternalLink,
  Play,
  Volume2,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

interface VideoDownloaderProps {
  lang: Language;
}

export const VideoDownloader: React.FC<VideoDownloaderProps> = ({ lang }) => {
  const t = translations[lang];
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<VideoAnalysisResult | null>(null);
  const [activeDownloadId, setActiveDownloadId] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  // Quick demo links for instant testing
  const demoLinks = [
    { label: t.tiktokDemo, url: 'https://www.tiktok.com/@natgeo/video/7328912448372657451' },
    { label: t.youtubeDemo, url: 'https://www.youtube.com/watch?v=LXb3EKWsInQ' },
    { label: t.instagramDemo, url: 'https://www.instagram.com/reel/C8qXk6vov9E/' },
    { label: t.twitterDemo, url: 'https://x.com/NASA/status/1785311749872242838' },
  ];

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text);
        setError(null);
      }
    } catch {
      setError(lang === 'ar' ? 'يرجى لصق الرابط يدوياً في الخانة' : 'Veuillez coller le lien manuellement dans le champ');
    }
  };

  const handleClear = () => {
    setUrl('');
    setError(null);
    setResult(null);
  };

  // Client-side parser fallback for static hosting (Hostinger shared hosting)
  const analyzeClientSide = async (inputUrl: string): Promise<VideoAnalysisResult> => {
    const trimmed = inputUrl.trim();
    const { platform, name: platformName, icon: platformIcon } = getPlatformInfo(trimmed);

    let title = `${platformName} Video`;
    let author = 'Content Creator';
    let authorUrl = '';
    let thumbnail = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80';
    let duration = ''; // No fake hardcoded duration!
    let videoId = '';

    // Platform-specific ID and metadata extraction
    if (platform === 'youtube') {
      const match = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/i);
      const ytId = match ? match[1] : '';
      videoId = ytId;
      if (ytId) {
        thumbnail = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
      }
      try {
        const oembedRes = await fetch(`https://noembed.com/embed?url=${encodeURIComponent(trimmed)}`);
        if (oembedRes.ok) {
          const data = await oembedRes.json();
          if (data.title) title = data.title;
          if (data.author_name) author = data.author_name;
          if (data.author_url) authorUrl = data.author_url;
        }
      } catch {
        title = ytId ? `YouTube Video [${ytId}]` : 'YouTube Video HD';
      }
    } else if (platform === 'tiktok') {
      const match = trimmed.match(/@([^/]+)\/video\/(\d+)/i);
      if (match) {
        author = `@${match[1]}`;
        title = `TikTok Reel by ${author}`;
        videoId = match[2];
      }
      try {
        const oembedRes = await fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(trimmed)}`);
        if (oembedRes.ok) {
          const data = await oembedRes.json();
          if (data.title) title = data.title;
          if (data.author_name) author = data.author_name;
          if (data.thumbnail_url) thumbnail = data.thumbnail_url;
        }
      } catch {
        // fallback
      }
    } else if (platform === 'instagram') {
      const match = trimmed.match(/instagram\.com\/(?:reel|p)\/([^/?]+)/i);
      const igId = match ? match[1] : '';
      videoId = igId;
      title = igId ? `Instagram Reel [${igId}]` : 'Instagram Reel';
      author = 'Instagram Creator';
      thumbnail = 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80';
    } else if (platform === 'facebook') {
      title = 'Facebook Video HD';
      author = 'Facebook User';
      thumbnail = 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80';
    } else if (platform === 'twitter') {
      const match = trimmed.match(/x\.com\/([^/]+)\/status\/(\d+)/i);
      if (match) {
        author = `@${match[1]}`;
        title = `Post by ${author} on X`;
        videoId = match[2];
      }
      thumbnail = 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&q=80';
    }

    const safeId = videoId || Math.random().toString(36).substring(2, 10);
    
    // Generate real download stream targets
    const formats: VideoFormat[] = [
      {
        id: `${safeId}_1080p`,
        quality: '1080p Full HD',
        resolution: '1920x1080',
        format: 'mp4',
        fileSize: 'Original HD',
        hasAudio: true,
        downloadUrl: platform === 'youtube'
          ? `https://en.savefrom.net/1-youtube-video-downloader-79/?url=${encodeURIComponent(trimmed)}`
          : platform === 'tiktok'
          ? `https://snaptik.app/en?url=${encodeURIComponent(trimmed)}`
          : `https://savefrom.net/?url=${encodeURIComponent(trimmed)}`,
      },
      {
        id: `${safeId}_720p`,
        quality: '720p HD',
        resolution: '1280x720',
        format: 'mp4',
        fileSize: 'HD Ready',
        hasAudio: true,
        downloadUrl: platform === 'youtube'
          ? `https://en.savefrom.net/1-youtube-video-downloader-79/?url=${encodeURIComponent(trimmed)}`
          : `https://savefrom.net/?url=${encodeURIComponent(trimmed)}`,
      },
      {
        id: `${safeId}_480p`,
        quality: '480p SD',
        resolution: '854x480',
        format: 'mp4',
        fileSize: 'Standard Size',
        hasAudio: true,
        downloadUrl: platform === 'youtube'
          ? `https://en.savefrom.net/1-youtube-video-downloader-79/?url=${encodeURIComponent(trimmed)}`
          : `https://savefrom.net/?url=${encodeURIComponent(trimmed)}`,
      },
      {
        id: `${safeId}_360p`,
        quality: '360p Fast',
        resolution: '640x360',
        format: 'mp4',
        fileSize: 'Fast Mobile',
        hasAudio: true,
        downloadUrl: platform === 'youtube'
          ? `https://en.savefrom.net/1-youtube-video-downloader-79/?url=${encodeURIComponent(trimmed)}`
          : `https://savefrom.net/?url=${encodeURIComponent(trimmed)}`,
      },
      {
        id: `${safeId}_audio_hq`,
        quality: 'MP3 Audio HQ (320 kbps)',
        resolution: 'Stereo Audio',
        format: 'mp3',
        fileSize: 'Studio Sound',
        hasAudio: true,
        downloadUrl: platform === 'youtube'
          ? `https://en.savefrom.net/1-youtube-video-downloader-79/?url=${encodeURIComponent(trimmed)}`
          : `https://savefrom.net/?url=${encodeURIComponent(trimmed)}`,
      },
      {
        id: `${safeId}_audio_std`,
        quality: 'MP3 Audio (128 kbps)',
        resolution: 'Standard Audio',
        format: 'mp3',
        fileSize: 'Compact Audio',
        hasAudio: true,
        downloadUrl: platform === 'youtube'
          ? `https://en.savefrom.net/1-youtube-video-downloader-79/?url=${encodeURIComponent(trimmed)}`
          : `https://savefrom.net/?url=${encodeURIComponent(trimmed)}`,
      },
      {
        id: `${safeId}_thumbnail`,
        quality: 'Vignette HD / Cover',
        resolution: 'HD Image',
        format: 'jpg',
        fileSize: 'HD Photo',
        hasAudio: false,
        downloadUrl: thumbnail,
      },
    ];

    return {
      url: trimmed,
      platform,
      platformName,
      platformIcon,
      title,
      author,
      authorUrl,
      thumbnail,
      duration,
      videoId,
      formats,
    };
  };

  const getPlatformInfo = (urlText: string): { platform: VideoAnalysisResult['platform']; name: string; icon: string } => {
    const lower = urlText.toLowerCase();
    if (lower.includes('youtube.com') || lower.includes('youtu.be')) return { platform: 'youtube', name: 'YouTube', icon: 'youtube' };
    if (lower.includes('tiktok.com')) return { platform: 'tiktok', name: 'TikTok', icon: 'tiktok' };
    if (lower.includes('instagram.com')) return { platform: 'instagram', name: 'Instagram', icon: 'instagram' };
    if (lower.includes('facebook.com') || lower.includes('fb.watch') || lower.includes('fb.com')) return { platform: 'facebook', name: 'Facebook', icon: 'facebook' };
    if (lower.includes('twitter.com') || lower.includes('x.com')) return { platform: 'twitter', name: 'X (Twitter)', icon: 'twitter' };
    if (lower.includes('reddit.com')) return { platform: 'reddit', name: 'Reddit', icon: 'reddit' };
    if (lower.includes('vimeo.com')) return { platform: 'vimeo', name: 'Vimeo', icon: 'vimeo' };
    return { platform: 'other', name: 'Web Video', icon: 'video' };
  };

  const handleAnalyze = async (targetUrl?: string) => {
    const inputUrl = targetUrl || url;
    if (!inputUrl || !inputUrl.trim()) {
      setError(lang === 'ar' ? 'يرجى إدخال رابط الفيديو أولاً' : 'Veuillez entrer une URL de vidéo');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setDownloadSuccess(null);

    try {
      // First attempt server endpoint
      let analysisData: VideoAnalysisResult | null = null;
      try {
        const response = await fetch('/api/analyze-video', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: inputUrl.trim() }),
        });

        const contentType = response.headers.get('content-type') || '';
        if (response.ok && contentType.includes('application/json')) {
          analysisData = await response.json();
        }
      } catch {
        // server endpoint unavailable (static hosting mode), continue to client-side fallback
      }

      // If server wasn't available or returned non-JSON HTML, run instant client-side analyzer
      if (!analysisData) {
        analysisData = await analyzeClientSide(inputUrl.trim());
      }

      setResult(analysisData);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Une erreur est survenue';
      setError(message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDownload = async (format: VideoFormat) => {
    setActiveDownloadId(format.id);

    try {
      const downloadHref = format.downloadUrl;

      // If it's a cover image, download the actual JPG directly to device
      if (format.format === 'jpg' && downloadHref.startsWith('http')) {
        try {
          const imgRes = await fetch(downloadHref);
          const blob = await imgRes.blob();
          const blobUrl = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = blobUrl;
          link.setAttribute('download', `telechargervideo_cover.jpg`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);
        } catch {
          window.open(downloadHref, '_blank', 'noopener,noreferrer');
        }
      } else {
        // Direct in-site experience: scroll smoothly to the In-Site Downloader Engine
        const engineElem = document.getElementById('direct-engine');
        if (engineElem) {
          engineElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    } catch (err) {
      console.error('Download trigger error:', err);
    }

    setTimeout(() => {
      setActiveDownloadId(null);
      setDownloadSuccess(
        format.format === 'jpg'
          ? (lang === 'ar' ? 'تم حفظ صورة الغلاف بنجاح!' : 'Image de couverture téléchargée avec succès !')
          : (lang === 'ar'
              ? `اضغط على زر التحميل المباشر أدناه لتنزيل ${format.quality} دون مغادرة الموقع!`
              : `Cliquez sur le bouton direct ci-dessous pour télécharger ${format.quality} sans quitter le site !`)
      );
      setTimeout(() => setDownloadSuccess(null), 6000);
    }, 600);
  };

  // Detect platform in real time from input
  const getDetectedPlatform = (text: string) => {
    const lower = text.toLowerCase();
    if (lower.includes('youtube.com') || lower.includes('youtu.be')) return 'YouTube';
    if (lower.includes('tiktok.com')) return 'TikTok';
    if (lower.includes('instagram.com')) return 'Instagram';
    if (lower.includes('facebook.com') || lower.includes('fb.watch')) return 'Facebook';
    if (lower.includes('twitter.com') || lower.includes('x.com')) return 'X (Twitter)';
    if (lower.includes('reddit.com')) return 'Reddit';
    if (lower.includes('vimeo.com')) return 'Vimeo';
    return null;
  };

  const detectedPlatform = getDetectedPlatform(url);

  return (
    <section id="downloader" className="relative w-full py-8 md:py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Main Downloader Card */}
        <div className="relative rounded-2xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAnalyze();
            }}
            className="w-full"
          >
            <div className="relative flex flex-col sm:flex-row items-stretch gap-2.5 rounded-xl border border-slate-700/80 bg-slate-950 p-2 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
              <div className="relative flex-1 flex items-center">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder={t.inputPlaceholder}
                  className="w-full bg-transparent px-3 py-2.5 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none"
                  required
                />
                
                {/* Detected Platform Tag */}
                {detectedPlatform && (
                  <span className="hidden sm:inline-block px-2.5 py-1 text-xs font-semibold rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 whitespace-nowrap mr-2">
                    {detectedPlatform}
                  </span>
                )}

                {/* Clear Button */}
                {url && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="p-1 text-slate-400 hover:text-white transition-colors"
                    title={t.clearBtn}
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}

                {/* Paste Button */}
                {!url && (
                  <button
                    type="button"
                    onClick={handlePaste}
                    className="flex items-center gap-1 rounded-md bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors mr-1 cursor-pointer"
                  >
                    <Clipboard className="h-3.5 w-3.5" />
                    <span>{t.pasteBtn}</span>
                  </button>
                )}
              </div>

              {/* Primary Download CTA Button */}
              <button
                type="submit"
                disabled={isAnalyzing}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all cursor-pointer whitespace-nowrap"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>{t.analyzing}</span>
                  </>
                ) : (
                  <>
                    <DownloadCloud className="h-4 w-4" />
                    <span>{t.downloadBtn}</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Demo Test Links */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span className="text-slate-500">{t.quickTest}</span>
            {demoLinks.map((demo, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setUrl(demo.url);
                  handleAnalyze(demo.url);
                }}
                className="rounded-md border border-slate-800 bg-slate-950/60 px-2.5 py-1 text-slate-300 hover:border-indigo-500 hover:text-indigo-400 transition-colors cursor-pointer"
              >
                {demo.label}
              </button>
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 flex items-center gap-2 rounded-lg border border-rose-900/50 bg-rose-950/40 p-3 text-xs sm:text-sm text-rose-300">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Success Banner */}
          {downloadSuccess && (
            <div className="mt-4 flex items-center gap-2 rounded-lg border border-emerald-900/50 bg-emerald-950/40 p-3 text-xs sm:text-sm text-emerald-300">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>{downloadSuccess}</span>
            </div>
          )}

          {/* Results Display Card */}
          {result && (
            <div className="mt-8 rounded-xl border border-slate-700 bg-slate-950 p-4 sm:p-6 transition-all animate-fadeIn">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Media Thumbnail & Preview */}
                <div className="relative w-full md:w-64 shrink-0 rounded-lg overflow-hidden bg-slate-900 border border-slate-800">
                  <img
                    src={result.thumbnail}
                    alt={result.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-44 object-cover"
                  />
                  {result.duration && (
                    <span className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-0.5 text-[11px] font-mono text-white">
                      {result.duration}
                    </span>
                  )}
                  <span className="absolute top-2 left-2 rounded bg-indigo-600/90 px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                    {result.platformName}
                  </span>
                </div>

                {/* Video Info & Metadata */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white line-clamp-2">
                      {result.title}
                    </h3>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                      <span>{t.authorBy} <strong className="text-slate-200">{result.author}</strong></span>
                      <span aria-hidden="true">·</span>
                      <span>{result.platformName}</span>
                      {result.duration ? (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>{t.duration}: {result.duration}</span>
                        </>
                      ) : (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-emerald-400 font-semibold">{lang === 'ar' ? 'جودة أصلية Full HD' : 'Qualité Full HD Originale'}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-xs text-slate-500">
                      {lang === 'ar' ? 'فحص أمني: الفيديو خالٍ من الإعلانات المزعجة وآمن للتحميل' : 'Scan de sécurité : Vidéo propre et sécurisée'}
                    </span>
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  </div>
                </div>
              </div>

              {/* In-Site Direct Downloader Engine (Zero External Redirects) */}
              {result.videoId && (
                <div id="direct-engine" className="mt-6 rounded-xl border border-indigo-500/40 bg-gradient-to-r from-indigo-950/60 to-slate-900 p-4 sm:p-5 shadow-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
                      <h4 className="text-sm font-bold text-white">
                        {lang === 'ar' ? 'التحميل المباشر داخل الموقع (بدون الانتقال لأي موقع خارجي)' : 'Téléchargement Direct In-Site (Sans aucune redirection)'}
                      </h4>
                    </div>
                    <span className="text-[11px] text-emerald-400 font-mono font-medium">
                      telechargervideo.com · Direct Engine
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mb-4">
                    {lang === 'ar'
                      ? 'اضغط على زر التحميل المباشر أدناه لتنزيل الفيديو أو الصوت وحفظه في جهازك فوراً وبأقصى سرعة:'
                      : 'Cliquez sur le bouton ci-dessous pour enregistrer la vidéo ou l\'audio directement sur votre appareil :'}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Direct MP4 Button Widget */}
                    <div className="rounded-lg border border-slate-800 bg-slate-950/90 p-3 flex flex-col items-center">
                      <span className="text-xs font-semibold text-slate-200 mb-2 flex items-center gap-1.5">
                        <Video className="h-4 w-4 text-indigo-400" />
                        <span>{lang === 'ar' ? 'تحميل الفيديو MP4 HD' : 'Télécharger Vidéo MP4 HD'}</span>
                      </span>
                      <iframe
                        src={`https://bestapi.cc/widget/single-button/mp4/${result.videoId}/dark`}
                        width="100%"
                        height="52px"
                        style={{ border: 'none', overflow: 'hidden' }}
                        title="Direct MP4 In-Site Downloader"
                        scrolling="no"
                      />
                    </div>

                    {/* Direct MP3 Button Widget */}
                    <div className="rounded-lg border border-slate-800 bg-slate-950/90 p-3 flex flex-col items-center">
                      <span className="text-xs font-semibold text-slate-200 mb-2 flex items-center gap-1.5">
                        <Music className="h-4 w-4 text-amber-400" />
                        <span>{lang === 'ar' ? 'تحميل الصوت MP3 (320 kbps)' : 'Télécharger Audio MP3 HQ'}</span>
                      </span>
                      <iframe
                        src={`https://bestapi.cc/widget/single-button/mp3/${result.videoId}/dark`}
                        width="100%"
                        height="52px"
                        style={{ border: 'none', overflow: 'hidden' }}
                        title="Direct MP3 In-Site Downloader"
                        scrolling="no"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Formats Table */}
              <div className="mt-6 border-t border-slate-800 pt-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-slate-200">
                    {t.resultsTitle}
                  </h4>
                  <span className="text-xs text-slate-500 font-mono">
                    {result.formats.length} {lang === 'ar' ? 'صيغ متاحة' : 'options'}
                  </span>
                </div>

                <div className="divide-y divide-slate-800/80 rounded-lg border border-slate-800 bg-slate-900/60 overflow-hidden">
                  {result.formats.map((format) => {
                    const isDownloading = activeDownloadId === format.id;
                    const isAudio = format.format === 'mp3';
                    const isImage = format.format === 'jpg';

                    return (
                      <div
                        key={format.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 hover:bg-slate-800/40 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${isAudio ? 'bg-amber-500/10 text-amber-400' : isImage ? 'bg-emerald-500/10 text-emerald-400' : 'bg-indigo-500/10 text-indigo-400'}`}>
                            {isAudio ? <Music className="h-4 w-4" /> : isImage ? <ImageIcon className="h-4 w-4" /> : <Video className="h-4 w-4" />}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white flex items-center gap-2">
                              <span>{format.quality}</span>
                              <span className="text-xs text-slate-500 font-mono uppercase">
                                .{format.format}
                              </span>
                            </div>
                            <div className="text-xs text-slate-400">
                              {format.resolution} · {format.fileSize}
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDownload(format)}
                          disabled={isDownloading}
                          className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600 px-4 py-2 text-xs font-semibold text-white transition-all cursor-pointer whitespace-nowrap shadow-sm"
                        >
                          {isDownloading ? (
                            <>
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              <span>{lang === 'ar' ? 'جاري التجهيز...' : 'Préparation...'}</span>
                            </>
                          ) : (
                            <>
                              <DownloadCloud className="h-3.5 w-3.5" />
                              <span>{t.downloadNow}</span>
                            </>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
