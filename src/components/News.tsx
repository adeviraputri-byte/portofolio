import React, { useState, useMemo } from 'react';
import { 
  Newspaper, 
  Search, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Tag, 
  Flame,
  Filter,
  Eye
} from 'lucide-react';
import { NewsItem } from '../types';

interface NewsProps {
  news: NewsItem[];
  onSelectNews: (news: NewsItem) => void;
}

export const News: React.FC<NewsProps> = ({ news, onSelectNews }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { key: 'all', label: 'Semua Berita' },
    { key: 'Kegiatan SMK', label: 'Kegiatan SMK' },
    { key: 'Prestasi & Lomba', label: 'Prestasi & Lomba' },
    { key: 'Teknologi & Tutorial', label: 'Teknologi & Tutorial' },
    { key: 'Pengalaman PKL', label: 'Pengalaman PKL' },
    { key: 'Pengumuman', label: 'Pengumuman' },
  ];

  const filteredNews = useMemo(() => {
    return news.filter((item) => {
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchSearch = 
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query) ||
        item.tags.some(t => t.toLowerCase().includes(query));
      return matchCategory && matchSearch;
    });
  }, [news, selectedCategory, searchQuery]);

  const featuredNews = useMemo(() => {
    return news.find(item => item.featured) || news[0];
  }, [news]);

  const categoryBadgeClasses: Record<string, string> = {
    'Kegiatan SMK': 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    'Prestasi & Lomba': 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    'Teknologi & Tutorial': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    'Pengalaman PKL': 'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-300 border-purple-200 dark:border-purple-800',
    'Pengumuman': 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-300 border-rose-200 dark:border-rose-800'
  };

  return (
    <section id="berita" className="py-20 bg-slate-50 dark:bg-slate-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 border border-blue-200 dark:border-blue-800 mb-4">
            <Newspaper className="w-3.5 h-3.5" />
            <span>Kabar, Artikel & Kegiatan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Berita & Catatan Perjalanan
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            Dokumentasi kegiatan sekolah, pengalaman kompetisi LKS, tips magang PKL, dan tulisan seputar pengembangan web siswa SMK.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Categories Pill Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer border ${
                  selectedCategory === cat.key
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari artikel atau topik..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Featured Banner Article (when no specific search is active) */}
        {!searchQuery && selectedCategory === 'all' && featuredNews && (
          <div 
            onClick={() => onSelectNews(featuredNews)}
            className="mb-12 bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-auto min-h-[280px] bg-slate-100 dark:bg-slate-700 overflow-hidden">
                <img
                  src={featuredNews.coverImage}
                  alt={featuredNews.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop';
                  }}
                />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-white shadow-md">
                    <Flame className="w-3.5 h-3.5 fill-current" />
                    <span>Artikel Utama</span>
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white border-white/20`}>
                    {featuredNews.category}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-blue-500" />
                      <span>{featuredNews.date}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span>{featuredNews.readTime}</span>
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition leading-snug">
                    {featuredNews.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                    {featuredNews.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {featuredNews.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-700/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {featuredNews.authorAvatar ? (
                      <img 
                        src={featuredNews.authorAvatar} 
                        alt={featuredNews.author} 
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                        {featuredNews.author.charAt(0)}
                      </div>
                    )}
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{featuredNews.author}</span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                    <span>Baca Selengkapnya</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* News Cards Grid */}
        {filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((item) => (
              <article
                key={item.id}
                onClick={() => onSelectNews(item)}
                className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700/80 hover:border-blue-300 dark:hover:border-blue-700 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  {/* Card Thumbnail */}
                  <div className="relative h-48 w-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop';
                      }}
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border backdrop-blur-md ${categoryBadgeClasses[item.category] || 'bg-white text-slate-800'}`}>
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-blue-500" />
                        <span>{item.date}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-500" />
                        <span>{item.readTime}</span>
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition line-clamp-2 leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-5 pb-5 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    {item.authorAvatar ? (
                      <img src={item.authorAvatar} alt={item.author} className="w-6 h-6 rounded-full object-cover" />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                        {item.author.charAt(0)}
                      </div>
                    )}
                    <span className="font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[110px]">{item.author}</span>
                  </div>

                  <span className="inline-flex items-center gap-1 font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                    <span>Baca</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700">
            <Newspaper className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-800 dark:text-white">Tidak ada berita atau artikel ditemukan</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Coba sesuaikan kata kunci pencarian atau pilih kategori lain.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
