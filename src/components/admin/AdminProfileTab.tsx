import React, { useState } from 'react';
import { 
  Save, 
  RotateCcw, 
  Check, 
  User, 
  GraduationCap, 
  Briefcase, 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  Plus, 
  Trash2, 
  Sparkles,
  Link,
  Info
} from 'lucide-react';
import { ProfileData } from '../../types';
import { ImageUploader } from '../common/ImageUploader';

interface AdminProfileTabProps {
  profile: ProfileData;
  onSave: (updatedProfile: ProfileData) => void;
}

export const AdminProfileTab: React.FC<AdminProfileTabProps> = ({ profile, onSave }) => {
  const [formData, setFormData] = useState<ProfileData>({ ...profile });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (field: keyof ProfileData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleStatsChange = (statField: keyof ProfileData['stats'], value: number) => {
    setFormData((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        [statField]: value,
      },
    }));
  };

  const handleStoryChange = (index: number, value: string) => {
    const updated = [...formData.aboutStory];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, aboutStory: updated }));
  };

  const handleAddStoryParagraph = () => {
    setFormData((prev) => ({
      ...prev,
      aboutStory: [...prev.aboutStory, 'Paragraf cerita baru tentang perjalanan belajar coding...'],
    }));
  };

  const handleRemoveStoryParagraph = (index: number) => {
    if (formData.aboutStory.length <= 1) return;
    setFormData((prev) => ({
      ...prev,
      aboutStory: prev.aboutStory.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-sm font-bold flex items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-emerald-500 shrink-0" />
            <span>Profil dan biodata portofolio berhasil disimpan secara permanen!</span>
          </div>
        </div>
      )}

      {/* Section 1: Identitas Utama */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>1. Data Pribadi & Hero Header</span>
          </h3>
          <span className="text-xs text-slate-400">Identitas utama di website</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Nama Lengkap <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Nama Panggilan (Navbar Logo) <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.nickname}
              onChange={(e) => handleChange('nickname', e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Headline Sub-title
            </label>
            <input
              type="text"
              value={formData.headline}
              onChange={(e) => handleChange('headline', e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Fokus Peran / Keahlian
            </label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => handleChange('role', e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Status Kesiapan Magang (Pill Badge)
            </label>
            <input
              type="text"
              value={formData.statusPkl}
              onChange={(e) => handleChange('statusPkl', e.target.value)}
              placeholder="Contoh: Siap Magang / PKL 2025"
              className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500"
            />
          </div>
        </div>

        {/* Foto Profil Image Uploader */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
          <ImageUploader
            id="admin-profile-avatar"
            label="Foto Profil Siswa (Hero & Tentang Saya)"
            value={formData.avatarUrl}
            onChange={(url) => handleChange('avatarUrl', url)}
            aspectRatio="avatar"
            placeholder="https://images.unsplash.com/photo-..."
            helperText="Unggah foto profil formal/semi-formal siswa SMK atau gunakan link gambar langsung."
            presets={[
              { label: 'Siswa Putri Hijab', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop' },
              { label: 'Siswa Dev', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop' },
              { label: 'Avatar Coding', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop' },
              { label: 'Minimalist Student', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop' }
            ]}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Bio Ringkas (Hero Section)
          </label>
          <textarea
            rows={2}
            value={formData.bio}
            onChange={(e) => handleChange('bio', e.target.value)}
            className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500"
          />
        </div>
      </div>

      {/* Section 2: Sekolah & Kontak */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            <span>2. Sekolah, Kontak & Media Sosial</span>
          </h3>
          <span className="text-xs text-slate-400">Informasi komunikasi</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Nama SMK
            </label>
            <input
              type="text"
              value={formData.school}
              onChange={(e) => handleChange('school', e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Jurusan / Kompetensi Keahlian
            </label>
            <input
              type="text"
              value={formData.major}
              onChange={(e) => handleChange('major', e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Domisili / Kota
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Nomor WhatsApp (format: 62812xxxx)
            </label>
            <input
              type="text"
              value={formData.whatsapp}
              onChange={(e) => handleChange('whatsapp', e.target.value.replace(/\D/g, ''))}
              className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Alamat Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              URL Profil GitHub
            </label>
            <input
              type="text"
              value={formData.github}
              onChange={(e) => handleChange('github', e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              URL Profil LinkedIn
            </label>
            <input
              type="text"
              value={formData.linkedin}
              onChange={(e) => handleChange('linkedin', e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              URL Profil Instagram
            </label>
            <input
              type="text"
              value={formData.instagram}
              onChange={(e) => handleChange('instagram', e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Section 3: Statistik Hero */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            <span>3. Angka Statistik Ringkas</span>
          </h3>
          <span className="text-xs text-slate-400">Tampil di hero & CV</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Jumlah Proyek
            </label>
            <input
              type="number"
              min="0"
              value={formData.stats.projectsCount}
              onChange={(e) => handleStatsChange('projectsCount', parseInt(e.target.value) || 0)}
              className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Jumlah Sertifikat
            </label>
            <input
              type="number"
              min="0"
              value={formData.stats.certificatesCount}
              onChange={(e) => handleStatsChange('certificatesCount', parseInt(e.target.value) || 0)}
              className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Tahun Belajar Coding
            </label>
            <input
              type="number"
              min="0"
              value={formData.stats.yearsCoding}
              onChange={(e) => handleStatsChange('yearsCoding', parseInt(e.target.value) || 0)}
              className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Skor Kesiapan (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={formData.stats.readinessScore}
              onChange={(e) => handleStatsChange('readinessScore', parseInt(e.target.value) || 100)}
              className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Section 4: Cerita / Kisah Tentang Saya */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>4. Narasi Cerita "Tentang Saya" (About Story)</span>
          </h3>
          <button
            type="button"
            onClick={handleAddStoryParagraph}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Paragraf</span>
          </button>
        </div>

        <div className="space-y-3">
          {formData.aboutStory.map((paragraph, index) => (
            <div key={index} className="flex gap-2 items-start">
              <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold flex items-center justify-center shrink-0 mt-2">
                {index + 1}
              </span>
              <textarea
                rows={3}
                value={paragraph}
                onChange={(e) => handleStoryChange(index, e.target.value)}
                className="flex-1 px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500"
              />
              {formData.aboutStory.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveStoryParagraph(index)}
                  className="w-8 h-8 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 flex items-center justify-center transition cursor-pointer shrink-0 mt-1"
                  title="Hapus Paragraf Ini"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Save Action Bar */}
      <div className="sticky bottom-4 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <Info className="w-4 h-4 text-blue-500" />
          <span>Klik tombol simpan untuk menerapkan seluruh perubahan ke website portofolio</span>
        </div>
        <button
          type="submit"
          id="admin-save-profile-btn"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 transition cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Simpan Perubahan Profil</span>
        </button>
      </div>
    </form>
  );
};
