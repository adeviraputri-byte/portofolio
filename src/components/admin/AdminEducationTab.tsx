import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  Save, 
  GraduationCap, 
  Calendar,
  AlertCircle
} from 'lucide-react';
import { EducationItem } from '../../types';

interface AdminEducationTabProps {
  education: EducationItem[];
  onSaveEducation: (education: EducationItem[]) => void;
}

export const AdminEducationTab: React.FC<AdminEducationTabProps> = ({
  education,
  onSaveEducation,
}) => {
  const [items, setItems] = useState<EducationItem[]>(education);
  const [editingItem, setEditingItem] = useState<EducationItem | null>(null);
  const [activitiesInput, setActivitiesInput] = useState<string>('');
  const [isNew, setIsNew] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const handleOpenAdd = () => {
    const newItem: EducationItem = {
      id: `edu-${Date.now()}`,
      schoolName: 'SMK Negeri 1 Contoh',
      major: 'Rekayasa Perangkat Lunak',
      period: '2023 - Sekarang (Kelas XII)',
      status: 'Siswa Aktif',
      gpaOrScore: 'Rata-rata Nilai: 88.5',
      description: 'Fokus pada pengembangan aplikasi web, basis data, dan logika pemrograman berorientasi objek.',
      activities: ['Ketua Ekstrakurikuler IT Club', 'Peserta LKS Web Tech']
    };
    setEditingItem(newItem);
    setActivitiesInput(newItem.activities?.join(', ') || '');
    setIsNew(true);
  };

  const handleOpenEdit = (item: EducationItem) => {
    setEditingItem({ ...item });
    setActivitiesInput(item.activities?.join(', ') || '');
    setIsNew(false);
  };

  const handleDelete = (id: string) => {
    const updated = items.filter((e) => e.id !== id);
    setItems(updated);
    onSaveEducation(updated);
    setDeleteConfirmId(null);
    showToast('Riwayat pendidikan berhasil dihapus.');
  };

  const handleSaveEditor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    const parsedActivities = activitiesInput
      .split(',')
      .map((a) => a.trim())
      .filter(Boolean);

    const itemToSave: EducationItem = {
      ...editingItem,
      activities: parsedActivities
    };

    let updated: EducationItem[];
    if (isNew) {
      updated = [...items, itemToSave];
      showToast('Riwayat pendidikan baru berhasil ditambahkan!');
    } else {
      updated = items.map((e) => e.id === itemToSave.id ? itemToSave : e);
      showToast('Perubahan pendidikan berhasil disimpan!');
    }

    setItems(updated);
    onSaveEducation(updated);
    setEditingItem(null);
  };

  return (
    <div className="space-y-6">
      {toastMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-sm font-bold flex items-center gap-2 animate-in fade-in">
          <Check className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">
            Riwayat Pendidikan & Organisasi
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Kelola jenjang sekolah, jurusan keahlian, dan aktivitas ekstrakurikuler
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/20 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Pendidikan</span>
        </button>
      </div>

      {/* List */}
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-start justify-between gap-4 hover:border-blue-500/40 transition"
          >
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-base">
                  {item.schoolName}
                </h4>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-300 text-xs font-bold">
                  {item.status}
                </span>
              </div>

              <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                {item.major} • <span className="text-slate-500 font-normal">{item.period}</span>
              </div>

              {item.gpaOrScore && (
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  {item.gpaOrScore}
                </div>
              )}

              <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl">
                {item.description}
              </p>

              {item.activities && item.activities.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.activities.map((act, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px] font-medium text-slate-600 dark:text-slate-300">
                      • {act}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-start">
              <button
                onClick={() => handleOpenEdit(item)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-xs font-bold transition cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => setDeleteConfirmId(item.id)}
                className="p-1.5 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer"
                title="Hapus"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl max-w-sm w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-rose-500 flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-base">Hapus Riwayat Ini?</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Data sekolah/pendidikan ini akan dihapus dari website.
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
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit / Add Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div 
            className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {isNew ? 'Tambah Riwayat Pendidikan' : `Edit: ${editingItem.schoolName}`}
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditor} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Nama Sekolah / Lembaga <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.schoolName}
                  onChange={(e) => setEditingItem({ ...editingItem, schoolName: e.target.value })}
                  placeholder="Contoh: SMKN 1 Kota..."
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Jurusan / Program
                  </label>
                  <input
                    type="text"
                    value={editingItem.major}
                    onChange={(e) => setEditingItem({ ...editingItem, major: e.target.value })}
                    placeholder="Rekayasa Perangkat Lunak"
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Periode / Tahun
                  </label>
                  <input
                    type="text"
                    value={editingItem.period}
                    onChange={(e) => setEditingItem({ ...editingItem, period: e.target.value })}
                    placeholder="2023 - Sekarang"
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Status Siswa / Kelulusan
                  </label>
                  <input
                    type="text"
                    value={editingItem.status}
                    onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value })}
                    placeholder="Siswa Aktif / Lulusan"
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Nilai Rata-rata / Prestasi
                  </label>
                  <input
                    type="text"
                    value={editingItem.gpaOrScore || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, gpaOrScore: e.target.value })}
                    placeholder="Rata-rata Nilai: 88.5"
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Deskripsi / Fokus Pembelajaran
                </label>
                <textarea
                  rows={2}
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  placeholder="Fokus materi dan kurikulum yang dipelajari..."
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Aktivitas & Organisasi (pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  id="admin-edu-activities"
                  value={activitiesInput}
                  onChange={(e) => setActivitiesInput(e.target.value)}
                  placeholder="Ketua IT Club, OSIS, Tim LKS"
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md"
                >
                  <Save className="w-4 h-4" />
                  <span>{isNew ? 'Tambah Riwayat' : 'Simpan Perubahan'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
