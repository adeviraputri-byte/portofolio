import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  Check, 
  X, 
  Save, 
  Star, 
  ExternalLink, 
  Github, 
  Image as ImageIcon,
  Layers,
  AlertCircle
} from 'lucide-react';
import { ProjectItem } from '../../types';

interface AdminProjectsTabProps {
  projects: ProjectItem[];
  onSaveProjects: (projects: ProjectItem[]) => void;
}

export const AdminProjectsTab: React.FC<AdminProjectsTabProps> = ({
  projects,
  onSaveProjects,
}) => {
  const [items, setItems] = useState<ProjectItem[]>(projects);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Editor Modal State
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  // Filtered List
  const filteredProjects = items.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleOpenAdd = () => {
    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: '',
      category: 'Web App',
      description: '',
      longDescription: '',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80',
      tags: ['React', 'Tailwind CSS'],
      demoUrl: 'https://demo-app.example.com',
      githubUrl: 'https://github.com/username/project',
      featured: false,
      features: ['Fitur Utama 1', 'Fitur Utama 2', 'Fitur Utama 3'],
      challenges: 'Tantangan teknis yang diselesaikan...'
    };
    setEditingProject(newProj);
    setIsNew(true);
  };

  const handleOpenEdit = (project: ProjectItem) => {
    setEditingProject({ ...project });
    setIsNew(false);
  };

  const handleDelete = (id: string) => {
    const updated = items.filter((p) => p.id !== id);
    setItems(updated);
    onSaveProjects(updated);
    setDeleteConfirmId(null);
    showToast('Proyek berhasil dihapus.');
  };

  const handleToggleFeatured = (id: string) => {
    const updated = items.map((p) => p.id === id ? { ...p, featured: !p.featured } : p);
    setItems(updated);
    onSaveProjects(updated);
  };

  const handleSaveEditor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    let updated: ProjectItem[];
    if (isNew) {
      updated = [editingProject, ...items];
      showToast('Proyek baru berhasil ditambahkan!');
    } else {
      updated = items.map((p) => p.id === editingProject.id ? editingProject : p);
      showToast('Perubahan proyek berhasil disimpan!');
    }

    setItems(updated);
    onSaveProjects(updated);
    setEditingProject(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-sm font-bold flex items-center gap-2 animate-in fade-in">
          <Check className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header with Search, Filter & Add Button */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari judul proyek, tag, atau deskripsi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Category Filter & Add Button */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
          >
            <option value="all">Semua Kategori</option>
            <option value="Sistem Informasi">Sistem Informasi</option>
            <option value="Web App">Web App</option>
            <option value="Landing Page">Landing Page</option>
            <option value="UI/UX Design">UI/UX Design</option>
          </select>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/20 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Proyek Baru</span>
          </button>
        </div>

      </div>

      {/* Projects Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.map((project) => (
          <div 
            key={project.id}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs flex flex-col hover:border-blue-500/50 transition group"
          >
            {/* Image Preview Thumbnail */}
            <div className="relative h-44 bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="absolute top-2.5 left-2.5 flex gap-1.5">
                <span className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-[11px] font-bold text-white">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500 text-[10px] font-extrabold text-white flex items-center gap-1">
                    <Star className="w-3 h-3 fill-white" /> Featured
                  </span>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col">
              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1.5 line-clamp-1">
                {project.title}
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-xs line-clamp-2 mb-3">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {project.tags.slice(0, 3).map((t, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-semibold text-slate-600 dark:text-slate-300">
                    {t}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span className="text-[10px] text-slate-400 font-semibold">+{project.tags.length - 3}</span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => handleToggleFeatured(project.id)}
                  title={project.featured ? "Hapus dari Featured" : "Tandai sebagai Featured"}
                  className={`p-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    project.featured 
                      ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 border border-amber-200 dark:border-amber-800' 
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-amber-500'
                  }`}
                >
                  <Star className={`w-4 h-4 ${project.featured ? 'fill-amber-500' : ''}`} />
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(project)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-xs font-bold transition cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => setDeleteConfirmId(project.id)}
                    className="p-1.5 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer"
                    title="Hapus Proyek"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 dark:text-slate-400 text-sm">Tidak ada proyek yang sesuai dengan kriteria pencarian.</p>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl max-w-sm w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-rose-500 flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-base">Hapus Proyek Ini?</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Tindakan ini akan menghapus proyek dari portofolio.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-xs"
              >
                Ya, Hapus Proyek
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit / Add Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div 
            className="relative w-full max-w-2xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {isNew ? 'Tambah Proyek Portofolio Baru' : `Edit Proyek: ${editingProject.title}`}
              </h3>
              <button
                onClick={() => setEditingProject(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <form onSubmit={handleSaveEditor} className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Judul Proyek <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    placeholder="Contoh: E-Kantin Siswa SMK"
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Kategori Proyek
                  </label>
                  <select
                    value={editingProject.category}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as any })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500"
                  >
                    <option value="Sistem Informasi">Sistem Informasi</option>
                    <option value="Web App">Web App</option>
                    <option value="Landing Page">Landing Page</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Deskripsi Singkat (Card Preview) <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  placeholder="Ringkasan fungsi utama aplikasi..."
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Deskripsi Lengkap (Detail Modal)
                </label>
                <textarea
                  rows={3}
                  value={editingProject.longDescription}
                  onChange={(e) => setEditingProject({ ...editingProject, longDescription: e.target.value })}
                  placeholder="Uraian latar belakang pembuatan, studi kasus di SMK, dan solusi..."
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    URL Gambar / Banner Thumbnail
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.image}
                    onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Teknologi / Tags (pisahkan dengan koma)
                  </label>
                  <input
                    type="text"
                    value={editingProject.tags.join(', ')}
                    onChange={(e) => setEditingProject({
                      ...editingProject,
                      tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                    })}
                    placeholder="React, TypeScript, Tailwind, MySQL"
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Link Demo / Live Preview
                  </label>
                  <input
                    type="text"
                    value={editingProject.demoUrl || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, demoUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Link Repository GitHub
                  </label>
                  <input
                    type="text"
                    value={editingProject.githubUrl || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Fitur-Fitur Utama (1 fitur per baris)
                </label>
                <textarea
                  rows={3}
                  value={editingProject.features.join('\n')}
                  onChange={(e) => setEditingProject({
                    ...editingProject,
                    features: e.target.value.split('\n').filter((l) => l.trim() !== '')
                  })}
                  placeholder="Katalog menu makanan&#10;Keranjang belanja realtime&#10;Dashboard admin kasir"
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Tantangan & Solusi yang Dipelajari
                </label>
                <textarea
                  rows={2}
                  value={editingProject.challenges || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, challenges: e.target.value })}
                  placeholder="Penerapan state management dan optimasi query..."
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featured-checkbox"
                  checked={editingProject.featured || false}
                  onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="featured-checkbox" className="text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                  Tampilkan sebagai Proyek Unggulan (Featured) di Hero & CV
                </label>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md"
                >
                  <Save className="w-4 h-4" />
                  <span>{isNew ? 'Tambahkan Proyek' : 'Simpan Perubahan'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
