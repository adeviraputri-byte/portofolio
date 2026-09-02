import React, { useState } from 'react';
import { 
  X, 
  User, 
  FolderGit2, 
  Code2, 
  Award, 
  GraduationCap, 
  Settings, 
  ShieldCheck, 
  LogOut, 
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { ProfileData, SkillItem, ProjectItem, CertificateItem, EducationItem } from '../../types';
import { AdminProfileTab } from './AdminProfileTab';
import { AdminProjectsTab } from './AdminProjectsTab';
import { AdminSkillsTab } from './AdminSkillsTab';
import { AdminCertificatesTab } from './AdminCertificatesTab';
import { AdminEducationTab } from './AdminEducationTab';
import { AdminSettingsTab } from './AdminSettingsTab';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  skills: SkillItem[];
  projects: ProjectItem[];
  certificates: CertificateItem[];
  education: EducationItem[];
  onSaveProfile: (profile: ProfileData) => void;
  onSaveSkills: (skills: SkillItem[]) => void;
  onSaveProjects: (projects: ProjectItem[]) => void;
  onSaveCertificates: (certificates: CertificateItem[]) => void;
  onSaveEducation: (education: EducationItem[]) => void;
  onImportAllData: (data: {
    profile?: ProfileData;
    skills?: SkillItem[];
    projects?: ProjectItem[];
    certificates?: CertificateItem[];
    education?: EducationItem[];
  }) => void;
  onResetToDefaults: () => void;
  onLogout: () => void;
}

type AdminTab = 'profile' | 'projects' | 'skills' | 'certificates' | 'education' | 'settings';

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  profile,
  skills,
  projects,
  certificates,
  education,
  onSaveProfile,
  onSaveSkills,
  onSaveProjects,
  onSaveCertificates,
  onSaveEducation,
  onImportAllData,
  onResetToDefaults,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('profile');

  if (!isOpen) return null;

  const tabs = [
    { id: 'profile', label: 'Profil & Bio', icon: User, count: null },
    { id: 'projects', label: 'Proyek', icon: FolderGit2, count: projects.length },
    { id: 'skills', label: 'Skill & Keahlian', icon: Code2, count: skills.length },
    { id: 'certificates', label: 'Sertifikat', icon: Award, count: certificates.length },
    { id: 'education', label: 'Pendidikan', icon: GraduationCap, count: education.length },
    { id: 'settings', label: 'Pengaturan & Akun', icon: Settings, count: null },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-md flex flex-col animate-in fade-in duration-200">
      
      {/* Top Navbar */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-3.5 flex items-center justify-between shrink-0 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
                Admin Panel Portofolio
              </h2>
              <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold border border-emerald-200 dark:border-emerald-800/80">
                Terautentikasi
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
              Kelola seluruh konten, proyek, skill, dan sertifikat siswa SMK
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Kembali ke Web (Live Preview)</span>
            <span className="sm:hidden">Lihat Web</span>
          </button>

          <button
            type="button"
            onClick={onLogout}
            className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition cursor-pointer"
            title="Keluar / Logout Admin"
          >
            <LogOut className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition cursor-pointer"
            title="Tutup Panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* Sidebar Tabs */}
        <aside className="w-full md:w-64 bg-slate-50 dark:bg-slate-900/70 border-r border-slate-200 dark:border-slate-800 p-3 flex md:flex-col gap-1.5 overflow-x-auto md:overflow-y-auto shrink-0">
          <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider hidden md:block">
            Menu Manajemen Konten
          </div>

          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 md:w-full ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </div>
                {tab.count !== null && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Tab Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-100/60 dark:bg-slate-950/60">
          <div className="max-w-5xl mx-auto">
            {activeTab === 'profile' && (
              <AdminProfileTab profile={profile} onSave={onSaveProfile} />
            )}

            {activeTab === 'projects' && (
              <AdminProjectsTab projects={projects} onSaveProjects={onSaveProjects} />
            )}

            {activeTab === 'skills' && (
              <AdminSkillsTab skills={skills} onSaveSkills={onSaveSkills} />
            )}

            {activeTab === 'certificates' && (
              <AdminCertificatesTab certificates={certificates} onSaveCertificates={onSaveCertificates} />
            )}

            {activeTab === 'education' && (
              <AdminEducationTab education={education} onSaveEducation={onSaveEducation} />
            )}

            {activeTab === 'settings' && (
              <AdminSettingsTab 
                profile={profile}
                skills={skills}
                projects={projects}
                certificates={certificates}
                education={education}
                onImportData={onImportAllData}
                onResetToDefaults={onResetToDefaults}
                onLogout={onLogout}
              />
            )}
          </div>
        </main>

      </div>

    </div>
  );
};
