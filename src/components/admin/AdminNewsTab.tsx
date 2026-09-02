import React, { useState } from 'react';
import { 
  Newspaper, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Sparkles, 
  Check, 
  X, 
  Calendar, 
  Clock, 
  Image as ImageIcon,
  Tag,
  Eye,
  ExternalLink
} from 'lucide-react';
import { NewsItem } from '../../types';

interface AdminNewsTabProps {
  news: NewsItem[];
  onSaveNews: (news: NewsItem[]) => void;
}

export const AdminNewsTab: React.FC<AdminNewsTabProps> = ({ news, onSaveNews }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddNew = () => {
    const newItem: NewsItem = {
      id: 'n_' + Date.now(),
      title: '',
      slug: '',
      category: 'Kegiatan SMK',
      summary: '',
      content: '',
      coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop',
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      readTime: '3 menit baca',
      author: 'Ade Vira Putri',
      authorRole: 'Siswa XII RPL',
      tags: ['SMK', 'Teknologi'],
      views: 0,
      featured: false
    };
    setEditingItem(newItem);
    setIsNew(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    if (!editingItem.title.trim()) {
      alert('Judul berita tidak boleh kosong');
      return;
    }

    let updatedNews: NewsItem[];
    if (isNew) {
      updatedNews = [editingItem, ...news];
      showToast('Berita baru berhasil ditambahkan dan disinkronkan ke Firebase!');
    } else {
      updatedNews = news.map((item) => (item.id === editingItem.id ? editingItem : item));
      showToast('Perubahan berita berhasil disimpan ke Firebase!');
    }

    onSaveNews(updatedNews);
    setEditingItem(null);
    setIsNew(false);
  };

  const handleDelete = (id: string) => {
    const updatedNews = news.filter((item) => item.id !== id);
    onSaveNews(updatedNews);
    setDeleteConfirmId(null);
    showToast('Berita telah dihapus dari Firebase & lokal.');
  };

  const handleToggleFeatured = (id: string) => {
    const updatedNews = news.map((item) => 
      item.id === id ? { ...item, featured: !item.featured } : item
    );
    onSaveNews(updatedNews);
    showToast('Status unggulan berita diperbarui.');
  };

  const filteredNews = news.filter((item) => {
    const matchCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const query = searchQuery.toLowerCase().trim();
    const matchSearch = 
      !query ||
      item.title.toLowerCase().includes(query) ||
      item.summary.toLowerCase().includes(query) ||
      item.tags.some(t => t.toLowerCase().includes(query));
    return matchCategory && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 px-4 py-3 rounded-2xl bg-emerald-600 text-white font-semibold text-sm shadow-xl flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header and Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>Manajemen Berita & Artikel ({news.length})</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Publikasikan catatan kegiatan SMK, artikel teknologi, atau kabar prestasi ke portofolio.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Berita Baru</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari judul atau topik artikel..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full sm:w-auto px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
        >
          <option value="all">Semua Kategori</option>
          <option value="Kegiatan SMK">Kegiatan SMK</option>
          <option value="Prestasi & Lomba">Prestasi & Lomba</option>
          <option value="Teknologi & Tutorial">Teknologi & Tutorial</option>
          <option value="Pengalaman PKL">Pengalaman PKL</option>
          <option value="Pengumuman">Pengumuman</option>
        </select>
      </div>

      {/* News List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredNews.map((item) => (
          <div
            key={item.id}
            className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            {/* Thumbnail and Info */}
            <div className="flex items-start gap-4 flex-1">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-700 shrink-0">
                <img
                  src={item.coverImage}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop';
                  }}
                />
              </div>

              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300">
                    {item.category}
                  </span>
                  {item.featured && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300">
                      <Sparkles className="w-3 h-3" />
                      <span>Utama</span>
                    </span>
                  )}
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">{item.date}</span>
                </div>

                <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white line-clamp-1">
                  {item.title}
                </h4>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                  {item.summary}
                </p>

                <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                  <span>Penulis: {item.author}</span>
                  <span>•</span>
                  <span>{item.readTime}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 dark:border-slate-700">
              <button
                onClick={() => handleToggleFeatured(item.id)}
                title={item.featured ? 'Hapus dari sorotan utama' : 'Jadikan sorotan utama'}
                className={`p-2 rounded-xl border text-xs font-bold transition ${
                  item.featured 
                    ? 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800' 
                    : 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                <Sparkles className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setEditingItem(item);
                  setIsNew(false);
                }}
                className="p-2 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 transition"
                title="Edit Berita"
              >
                <Edit className="w-4 h-4" />
              </button>

              <button
                onClick={() => setDeleteConfirmId(item.id)}
                className="p-2 rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200 dark:border-rose-800 hover:bg-rose-100 transition"
                title="Hapus Berita"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {filteredNews.length === 0 && (
          <div className="p-8 text-center bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-500 text-sm">
            Tidak ada berita ditemukan. Klik tombol "+ Tambah Berita Baru" untuk membuat artikel pertama.
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-slate-900/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>{isNew ? 'Tambah Berita / Artikel Baru' : 'Edit Berita'}</span>
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Judul Berita / Artikel *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  placeholder="Contoh: Kunjungan Industri ke Perusahaan Software House..."
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Category and Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Kategori
                  </label>
                  <select
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value as any })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="Kegiatan SMK">Kegiatan SMK</option>
                    <option value="Prestasi & Lomba">Prestasi & Lomba</option>
                    <option value="Teknologi & Tutorial">Teknologi & Tutorial</option>
                    <option value="Pengalaman PKL">Pengalaman PKL</option>
                    <option value="Pengumuman">Pengumuman</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Tanggal Publikasi
                  </label>
                  <input
                    type="text"
                    value={editingItem.date}
                    onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                    placeholder="Contoh: 15 Mei 2026"
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Cover Image URL */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  URL Gambar Sampul (Cover Image)
                </label>
                <input
                  type="url"
                  value={editingItem.coverImage}
                  onChange={(e) => setEditingItem({ ...editingItem, coverImage: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
                {editingItem.coverImage && (
                  <div className="mt-2 h-28 w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img src={editingItem.coverImage} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Summary */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Ringkasan Singkat (Summary) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingItem.summary}
                  onChange={(e) => setEditingItem({ ...editingItem, summary: e.target.value })}
                  placeholder="Ringkasan 1-2 kalimat yang menarik minat pembaca..."
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              {/* Full Content */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Isi Lengkap Artikel (Full Content) *
                </label>
                <textarea
                  rows={6}
                  required
                  value={editingItem.content}
                  onChange={(e) => setEditingItem({ ...editingItem, content: e.target.value })}
                  placeholder="Tuliskan cerita lengkap, pengalaman, poin-poin pelajaran, tips, dsb..."
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-sans leading-relaxed"
                />
              </div>

              {/* Author, Role & Read Time */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Nama Penulis
                  </label>
                  <input
                    type="text"
                    value={editingItem.author}
                    onChange={(e) => setEditingItem({ ...editingItem, author: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Peran Penulis
                  </label>
                  <input
                    type="text"
                    value={editingItem.authorRole}
                    onChange={(e) => setEditingItem({ ...editingItem, authorRole: e.target.value })}
                    placeholder="Contoh: Siswa XII RPL"
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Estimasi Waktu Baca
                  </label>
                  <input
                    type="text"
                    value={editingItem.readTime}
                    onChange={(e) => setEditingItem({ ...editingItem, readTime: e.target.value })}
                    placeholder="Contoh: 4 menit baca"
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Tags and Featured */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Tags (Pisahkan dengan koma)
                  </label>
                  <input
                    type="text"
                    value={editingItem.tags.join(', ')}
                    onChange={(e) => setEditingItem({ 
                      ...editingItem, 
                      tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
                    })}
                    placeholder="Contoh: Kegiatan SMK, Kunjungan Industri, RPL"
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="pt-4 sm:pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingItem.featured}
                      onChange={(e) => setEditingItem({ ...editingItem, featured: e.target.checked })}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                    />
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Jadikan Sorotan Utama (Featured Banner)
                    </span>
                  </label>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 text-sm font-semibold rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-sm flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Simpan ke Firebase</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">Hapus Berita Ini?</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Artikel ini akan dihapus secara permanen dari Firebase Firestore dan tampilan website.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-xs font-bold rounded-xl text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-rose-600 hover:bg-rose-700 text-white shadow-sm"
              >
                Ya, Hapus Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
