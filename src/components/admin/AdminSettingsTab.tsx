import React, { useState } from 'react';
import { 
  KeyRound, 
  ShieldCheck, 
  Download, 
  Upload, 
  RotateCcw, 
  LogOut, 
  Check, 
  AlertCircle, 
  Eye, 
  EyeOff,
  Database,
  FileJson
} from 'lucide-react';
import { ProfileData, SkillItem, ProjectItem, CertificateItem, EducationItem } from '../../types';

interface AdminSettingsTabProps {
  profile: ProfileData;
  skills: SkillItem[];
  projects: ProjectItem[];
  certificates: CertificateItem[];
  education: EducationItem[];
  onImportData: (data: {
    profile?: ProfileData;
    skills?: SkillItem[];
    projects?: ProjectItem[];
    certificates?: CertificateItem[];
    education?: EducationItem[];
  }) => void;
  onResetToDefaults: () => void;
  onLogout: () => void;
}

export const AdminSettingsTab: React.FC<AdminSettingsTabProps> = ({
  profile,
  skills,
  projects,
  certificates,
  education,
  onImportData,
  onResetToDefaults,
  onLogout,
}) => {
  // Password change state
  const [username, setUsername] = useState(() => {
    const creds = localStorage.getItem('smk_admin_credentials');
    if (creds) {
      try {
        return JSON.parse(creds).username || 'admin';
      } catch (e) {}
    }
    return 'admin';
  });
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [pwdMsg, setPwdMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [resetConfirm, setResetConfirm] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleUpdateCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    setPwdMsg(null);

    const savedCredsRaw = localStorage.getItem('smk_admin_credentials');
    let validPass = 'admin123';
    if (savedCredsRaw) {
      try {
        const parsed = JSON.parse(savedCredsRaw);
        if (parsed.password) validPass = parsed.password;
      } catch (err) {}
    }

    if (currentPassword !== validPass) {
      setPwdMsg({ type: 'error', text: 'Kata sandi saat ini salah!' });
      return;
    }

    if (newPassword.length < 4) {
      setPwdMsg({ type: 'error', text: 'Kata sandi baru minimal 4 karakter!' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPwdMsg({ type: 'error', text: 'Konfirmasi kata sandi baru tidak cocok!' });
      return;
    }

    // Save updated credentials
    localStorage.setItem('smk_admin_credentials', JSON.stringify({
      username: username.trim() || 'admin',
      password: newPassword,
      updatedAt: new Date().toISOString()
    }));

    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPwdMsg({ type: 'success', text: 'Username & Kata sandi admin berhasil diperbarui!' });
  };

  const handleExportBackupJson = () => {
    const backupPayload = {
      app: 'SMK-Portfolio-Data-Backup',
      version: '2.0.0',
      exportedAt: new Date().toISOString(),
      data: {
        profile,
        skills,
        projects,
        certificates,
        education
      }
    };

    const blob = new Blob([JSON.stringify(backupPayload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `smk-portofolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);
        
        const payloadData = parsed.data || parsed;
        if (payloadData) {
          onImportData(payloadData);
          setImportStatus('Data berhasil diimpor dan diperbarui!');
          setTimeout(() => setImportStatus(null), 3000);
        } else {
          setImportStatus('Format JSON tidak sesuai template backup.');
        }
      } catch (err) {
        setImportStatus('Gagal membaca file JSON. Pastikan format valid.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="space-y-6">

      {/* Security & Password Change */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
            <KeyRound className="w-4 h-4" />
            <span>Keamanan & Akun Admin</span>
          </h3>
          <span className="text-xs text-slate-400">Ganti username & password akses</span>
        </div>

        {pwdMsg && (
          <div className={`p-4 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in ${
            pwdMsg.type === 'success' 
              ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' 
              : 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
          }`}>
            {pwdMsg.type === 'success' ? <Check className="w-4 h-4 text-emerald-500" /> : <AlertCircle className="w-4 h-4 text-rose-500" />}
            <span>{pwdMsg.text}</span>
          </div>
        )}

        <form onSubmit={handleUpdateCredentials} className="space-y-4 max-w-xl">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Username Admin
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Kata Sandi Saat Ini (Verifikasi) <span className="text-rose-500">*</span>
            </label>
            <input
              type="password"
              required
              placeholder="Masukkan password saat ini (default: admin123)"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Kata Sandi Baru <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Min. 4 karakter"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3.5 py-2 pr-10 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Konfirmasi Sandi Baru <span className="text-rose-500">*</span>
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Ketik ulang sandi baru"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Perbarui Sandi Admin</span>
          </button>
        </form>
      </div>

      {/* Backup & Restore Data */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
            <Database className="w-4 h-4" />
            <span>Cadangkan & Pulihkan Seluruh Data (Backup/Restore)</span>
          </h3>
          <span className="text-xs text-slate-400">JSON Format</span>
        </div>

        {importStatus && (
          <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200 text-xs font-bold flex items-center gap-2">
            <FileJson className="w-4 h-4 text-blue-500" />
            <span>{importStatus}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between gap-3">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                Ekspor / Download Data Portofolio
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Unduh salinan lengkap profil, skill, proyek, sertifikat, dan pendidikan dalam file JSON.
              </p>
            </div>
            <button
              type="button"
              onClick={handleExportBackupJson}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold hover:bg-slate-800 dark:hover:bg-white transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Backup JSON</span>
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between gap-3">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                Impor Data dari Backup
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Unggah file JSON cadangan untuk memulihkan seluruh konten portofolio sekaligus.
              </p>
            </div>
            <label className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-bold hover:bg-blue-100 dark:hover:bg-blue-900 transition cursor-pointer">
              <Upload className="w-4 h-4" />
              <span>Pilih File Backup JSON</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportJson}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Danger Zone: Reset to Defaults & Logout */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-rose-200 dark:border-rose-900/40 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>Zona Aksi Kritis & Keluar</span>
          </h3>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">
              Kembalikan ke Contoh Data Siswa SMK
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Mereset seluruh proyek, skill, dan biodata ke konfigurasi awal bawaan.
            </p>
          </div>

          {resetConfirm ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setResetConfirm(false)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  onResetToDefaults();
                  setResetConfirm(false);
                }}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white"
              >
                Konfirmasi Reset Semua
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setResetConfirm(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 border border-rose-200 dark:border-rose-800 transition cursor-pointer shrink-0"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Data Awal</span>
            </button>
          )}
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">
              Keluar Sesi Admin (Logout)
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Akhiri sesi login admin di perangkat ini.
            </p>
          </div>

          <button
            type="button"
            onClick={onLogout}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Admin</span>
          </button>
        </div>
      </div>

    </div>
  );
};
