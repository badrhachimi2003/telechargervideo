export type Language = 'fr' | 'ar' | 'en';

export type PlatformType = 'youtube' | 'tiktok' | 'instagram' | 'facebook' | 'twitter' | 'reddit' | 'vimeo' | 'other';

export interface VideoFormat {
  id: string;
  quality: string;
  resolution: string;
  format: 'mp4' | 'mp3' | 'webm' | 'jpg';
  fileSize: string;
  hasAudio: boolean;
  downloadUrl: string;
}

export interface VideoAnalysisResult {
  url: string;
  platform: PlatformType;
  platformName: string;
  platformIcon: string;
  title: string;
  author: string;
  authorUrl?: string;
  thumbnail: string;
  duration?: string;
  videoId?: string;
  formats: VideoFormat[];
}

export interface FaqItem {
  question: {
    fr: string;
    ar: string;
    en: string;
  };
  answer: {
    fr: string;
    ar: string;
    en: string;
  };
}

export type ModalType = 'about' | 'privacy' | 'terms' | 'dmca' | 'contact' | 'hostinger' | null;
