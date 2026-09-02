import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  Share2, 
  Check, 
  Tag, 
  Bookmark, 
  ArrowLeft,
  ExternalLink,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { NewsItem } from '../types';

interface NewsModalProps {
  news: NewsItem | null;
  onClose: () => void;
  onSelectRelated?: (news: NewsItem) => void;
  allNews?: NewsItem[];
}

export const NewsModal: React.FC<NewsModalProps> = ({
  news,
  onClose,
  onSelectRelated,
  allNews = []
}) => {
  const [copied, setCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  if (!news) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareToWhatsapp = () => {
    const text = encodeURIComponent(`Baca artikel menarik: "${news.title}" oleh ${news.author}\n${window.location.href}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const relatedArticles = allNews
    .filter((item) => item.id !== news.id)
    .slice(0, 3);

  const categoryColorMap: Record<string, string> = {
    'Kegiatan SMK': 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    'Prestasi & Lomba': 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    'Teknologi & Tutorial': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    'Pengalaman PKL': 'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-300 border-purple-200 dark:border-purple-800',
    'Pengumuman': 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-300 border-rose-200 dark:border-rose-800'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Close Button */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${categoryColorMap[news.category] || 'bg-slate-100 text-slate-800'}`}>
              {news.category}
            </span>
            {news.featured && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                <Sparkles className="w-3 h-3" />
                <span>Unggulan</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`p-2 rounded-xl border transition ${
                isSaved 
                  ? 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950/50 dark:text-blue-400 dark:border-blue-800' 
                  : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 hover:bg-slate-200'
              }`}
              title="Simpan artikel"
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition"
              title="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative w-full h-56 sm:h-72 bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <img 
            src={news.coverImage} 
            alt={news.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60" />
        </div>

        {/* Article Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Title & Metadata */}
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {news.title}
            </h1>

            {/* Author and Date Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-3">
                {news.authorAvatar ? (
                  <img 
                    src={news.authorAvatar} 
                    alt={news.author} 
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-500/20"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                    {news.author.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">{news.author}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{news.authorRole}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs sm:text-sm">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span>{news.date}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span>{news.readTime}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Summary Quote Box */}
          {news.summary && (
            <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border-l-4 border-blue-600 dark:border-blue-500 text-slate-700 dark:text-slate-300 italic text-sm sm:text-base leading-relaxed">
              "{news.summary}"
            </div>
          )}

          {/* Main Content Formatted */}
          <div className="text-slate-800 dark:text-slate-200 text-base sm:text-lg leading-relaxed whitespace-pre-line space-y-4">
            {news.content}
          </div>

          {/* Tags */}
          {news.tags && news.tags.length > 0 && (
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" />
                Tags:
              </span>
              {news.tags.map((tag, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Share Actions */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Bagikan Artikel Ini</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Bagikan inspirasi kegiatan dan pengalaman SMK kepada teman atau guru.</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={shareToWhatsapp}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Tersalin!' : 'Salin Link'}</span>
              </button>
            </div>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && onSelectRelated && (
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Artikel & Berita Terkait Lainnya
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedArticles.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onSelectRelated(item)}
                    className="p-3 text-left rounded-xl bg-slate-50 dark:bg-slate-800/40 hover:bg-blue-50 dark:hover:bg-blue-950/30 border border-slate-200 dark:border-slate-700/60 hover:border-blue-300 transition group flex flex-col justify-between"
                  >
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2">
                      {item.title}
                    </div>
                    <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                      <span>{item.date}</span>
                      <span>{item.readTime}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
