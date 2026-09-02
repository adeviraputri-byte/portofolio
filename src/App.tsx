import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { ExperienceEducation } from './components/ExperienceEducation';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { ProjectModal } from './components/ProjectModal';
import { Certificates } from './components/Certificates';
import { CertificateModal } from './components/CertificateModal';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CvModal } from './components/CvModal';
import { AdminAuthModal } from './components/admin/AdminAuthModal';
import { AdminPanel } from './components/admin/AdminPanel';

import {
  defaultProfile,
  defaultSkills,
  defaultProjects,
  defaultCertificates,
  defaultEducation,
} from './data/defaultData';

import { ProfileData, SkillItem, ProjectItem, CertificateItem, EducationItem } from './types';

export default function App() {
  // 1. Dark Mode State with LocalStorage
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('smk_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('smk_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('smk_theme', 'light');
    }
  }, [darkMode]);

  // 2. Profile & Content Data State with LocalStorage Persistence
  const [profile, setProfile] = useState<ProfileData>(() => {
    const saved = localStorage.getItem('smk_profile_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return defaultProfile;
      }
    }
    return defaultProfile;
  });

  const [skills, setSkills] = useState<SkillItem[]>(() => {
    const saved = localStorage.getItem('smk_skills_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return defaultSkills;
      }
    }
    return defaultSkills;
  });

  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    const saved = localStorage.getItem('smk_projects_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return defaultProjects;
      }
    }
    return defaultProjects;
  });

  const [certificates, setCertificates] = useState<CertificateItem[]>(() => {
    const saved = localStorage.getItem('smk_certificates_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return defaultCertificates;
      }
    }
    return defaultCertificates;
  });

  const [education, setEducation] = useState<EducationItem[]>(() => {
    const saved = localStorage.getItem('smk_education_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return defaultEducation;
      }
    }
    return defaultEducation;
  });

  // 3. Modal States
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);
  const [isCvOpen, setIsCvOpen] = useState<boolean>(false);

  // Admin & Auth States
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState<boolean>(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState<boolean>(false);

  // Handlers for Save Operations
  const handleSaveProfile = (updated: ProfileData) => {
    setProfile(updated);
    localStorage.setItem('smk_profile_data', JSON.stringify(updated));
  };

  const handleSaveSkills = (updated: SkillItem[]) => {
    setSkills(updated);
    localStorage.setItem('smk_skills_data', JSON.stringify(updated));
  };

  const handleSaveProjects = (updated: ProjectItem[]) => {
    setProjects(updated);
    localStorage.setItem('smk_projects_data', JSON.stringify(updated));
  };

  const handleSaveCertificates = (updated: CertificateItem[]) => {
    setCertificates(updated);
    localStorage.setItem('smk_certificates_data', JSON.stringify(updated));
  };

  const handleSaveEducation = (updated: EducationItem[]) => {
    setEducation(updated);
    localStorage.setItem('smk_education_data', JSON.stringify(updated));
  };

  const handleImportAllData = (data: {
    profile?: ProfileData;
    skills?: SkillItem[];
    projects?: ProjectItem[];
    certificates?: CertificateItem[];
    education?: EducationItem[];
  }) => {
    if (data.profile) handleSaveProfile(data.profile);
    if (data.skills) handleSaveSkills(data.skills);
    if (data.projects) handleSaveProjects(data.projects);
    if (data.certificates) handleSaveCertificates(data.certificates);
    if (data.education) handleSaveEducation(data.education);
  };

  const handleResetToDefaults = () => {
    setProfile(defaultProfile);
    setSkills(defaultSkills);
    setProjects(defaultProjects);
    setCertificates(defaultCertificates);
    setEducation(defaultEducation);

    localStorage.removeItem('smk_profile_data');
    localStorage.removeItem('smk_skills_data');
    localStorage.removeItem('smk_projects_data');
    localStorage.removeItem('smk_certificates_data');
    localStorage.removeItem('smk_education_data');
  };

  // Check if admin is already authenticated
  const handleOpenAdminTrigger = () => {
    const savedAuth = localStorage.getItem('smk_admin_auth');
    if (savedAuth) {
      try {
        const parsed = JSON.parse(savedAuth);
        if (parsed.authenticated) {
          setIsAdminPanelOpen(true);
          return;
        }
      } catch (e) {}
    }
    setIsAdminAuthOpen(true);
  };

  const handleSuccessLogin = () => {
    setIsAdminAuthOpen(false);
    setIsAdminPanelOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('smk_admin_auth');
    setIsAdminPanelOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 selection:bg-blue-600 selection:text-white transition-colors duration-300">
      {/* Sticky Header Navbar */}
      <Navbar
        profile={profile}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenCv={() => setIsCvOpen(true)}
        onOpenAdmin={handleOpenAdminTrigger}
      />

      {/* Main Sections */}
      <main>
        {/* 1. Hero Section */}
        <Hero profile={profile} onOpenCv={() => setIsCvOpen(true)} />

        {/* 2. Tentang Saya Section */}
        <About profile={profile} onOpenCv={() => setIsCvOpen(true)} />

        {/* 3. Riwayat Pendidikan & Organisasi SMK */}
        <ExperienceEducation education={education} profile={profile} />

        {/* 4. Skill Teknis & Soft Skills */}
        <Skills skills={skills} />

        {/* 5. Proyek & Portofolio Siswa */}
        <Projects
          projects={projects}
          profile={profile}
          onSelectProject={(p) => setSelectedProject(p)}
        />

        {/* 6. Sertifikat & Prestasi Kejuruan */}
        <Certificates
          certificates={certificates}
          onSelectCertificate={(c) => setSelectedCertificate(c)}
        />

        {/* 7. Kontak & Hubungi via WhatsApp */}
        <Contact profile={profile} />
      </main>

      {/* Footer */}
      <Footer 
        profile={profile} 
        onOpenAdmin={handleOpenAdminTrigger} 
      />

      {/* Modals */}
      {/* 1. Project Detail Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          profile={profile}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* 2. Certificate Detail Modal */}
      {selectedCertificate && (
        <CertificateModal
          certificate={selectedCertificate}
          onClose={() => setSelectedCertificate(null)}
        />
      )}

      {/* 3. Printable CV Modal */}
      {isCvOpen && (
        <CvModal
          profile={profile}
          skills={skills}
          projects={projects}
          certificates={certificates}
          education={education}
          onClose={() => setIsCvOpen(false)}
        />
      )}

      {/* 4. Admin Authentication Login Modal */}
      <AdminAuthModal
        isOpen={isAdminAuthOpen}
        onSuccessLogin={handleSuccessLogin}
        onClose={() => setIsAdminAuthOpen(false)}
      />

      {/* 5. Full Admin Panel with CRUD and Security Settings */}
      <AdminPanel
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
        profile={profile}
        skills={skills}
        projects={projects}
        certificates={certificates}
        education={education}
        onSaveProfile={handleSaveProfile}
        onSaveSkills={handleSaveSkills}
        onSaveProjects={handleSaveProjects}
        onSaveCertificates={handleSaveCertificates}
        onSaveEducation={handleSaveEducation}
        onImportAllData={handleImportAllData}
        onResetToDefaults={handleResetToDefaults}
        onLogout={handleLogout}
      />
    </div>
  );
}
