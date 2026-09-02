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
import { News } from './components/News';
import { NewsModal } from './components/NewsModal';
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
  defaultNews,
} from './data/defaultData';

import { 
  ProfileData, 
  SkillItem, 
  ProjectItem, 
  CertificateItem, 
  EducationItem, 
  NewsItem 
} from './types';

import {
  loadInitialDataFromFirebase,
  saveProfileData,
  saveSkillsData,
  saveProjectsData,
  saveCertificatesData,
  saveEducationData,
  saveNewsData,
  subscribeToFirebaseUpdates
} from './lib/dbService';

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

  // 2. State for all portfolio data
  const [profile, setProfile] = useState<ProfileData>(() => {
    const saved = localStorage.getItem('smk_profile_data');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return defaultProfile;
  });

  const [skills, setSkills] = useState<SkillItem[]>(() => {
    const saved = localStorage.getItem('smk_skills_data');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return defaultSkills;
  });

  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    const saved = localStorage.getItem('smk_projects_data');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return defaultProjects;
  });

  const [certificates, setCertificates] = useState<CertificateItem[]>(() => {
    const saved = localStorage.getItem('smk_certificates_data');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return defaultCertificates;
  });

  const [education, setEducation] = useState<EducationItem[]>(() => {
    const saved = localStorage.getItem('smk_education_data');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return defaultEducation;
  });

  const [news, setNews] = useState<NewsItem[]>(() => {
    const saved = localStorage.getItem('smk_news_data');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return defaultNews;
  });

  // 3. Load from Firebase on Mount and listen for updates
  useEffect(() => {
    loadInitialDataFromFirebase().then((res) => {
      setProfile(res.profile);
      setSkills(res.skills);
      setProjects(res.projects);
      setCertificates(res.certificates);
      setEducation(res.education);
      setNews(res.news);
    });

    const unsubscribe = subscribeToFirebaseUpdates({
      onProfileUpdate: (p) => setProfile(p),
      onSkillsUpdate: (s) => setSkills(s),
      onProjectsUpdate: (pr) => setProjects(pr),
      onCertificatesUpdate: (c) => setCertificates(c),
      onEducationUpdate: (e) => setEducation(e),
      onNewsUpdate: (n) => setNews(n)
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // 4. Modal States
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isCvOpen, setIsCvOpen] = useState<boolean>(false);

  // Admin & Auth States
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState<boolean>(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState<boolean>(false);

  // Handlers for Save Operations (Persisting to Firebase & LocalStorage)
  const handleSaveProfile = (updated: ProfileData) => {
    setProfile(updated);
    saveProfileData(updated);
  };

  const handleSaveSkills = (updated: SkillItem[]) => {
    setSkills(updated);
    saveSkillsData(updated);
  };

  const handleSaveProjects = (updated: ProjectItem[]) => {
    setProjects(updated);
    saveProjectsData(updated);
  };

  const handleSaveCertificates = (updated: CertificateItem[]) => {
    setCertificates(updated);
    saveCertificatesData(updated);
  };

  const handleSaveEducation = (updated: EducationItem[]) => {
    setEducation(updated);
    saveEducationData(updated);
  };

  const handleSaveNews = (updated: NewsItem[]) => {
    setNews(updated);
    saveNewsData(updated);
  };

  const handleImportAllData = (data: {
    profile?: ProfileData;
    skills?: SkillItem[];
    projects?: ProjectItem[];
    certificates?: CertificateItem[];
    education?: EducationItem[];
    news?: NewsItem[];
  }) => {
    if (data.profile) handleSaveProfile(data.profile);
    if (data.skills) handleSaveSkills(data.skills);
    if (data.projects) handleSaveProjects(data.projects);
    if (data.certificates) handleSaveCertificates(data.certificates);
    if (data.education) handleSaveEducation(data.education);
    if (data.news) handleSaveNews(data.news);
  };

  const handleResetToDefaults = () => {
    handleSaveProfile(defaultProfile);
    handleSaveSkills(defaultSkills);
    handleSaveProjects(defaultProjects);
    handleSaveCertificates(defaultCertificates);
    handleSaveEducation(defaultEducation);
    handleSaveNews(defaultNews);
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

        {/* 7. Berita, Artikel & Catatan Kegiatan SMK */}
        <News 
          news={news} 
          onSelectNews={(n) => setSelectedNews(n)} 
        />

        {/* 8. Kontak & Hubungi via WhatsApp */}
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

      {/* 3. News Article Detail Reader Modal */}
      {selectedNews && (
        <NewsModal
          news={selectedNews}
          allNews={news}
          onClose={() => setSelectedNews(null)}
          onSelectRelated={(n) => setSelectedNews(n)}
        />
      )}

      {/* 4. Printable CV Modal */}
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

      {/* 5. Admin Authentication Login Modal */}
      <AdminAuthModal
        isOpen={isAdminAuthOpen}
        onSuccessLogin={handleSuccessLogin}
        onClose={() => setIsAdminAuthOpen(false)}
      />

      {/* 6. Full Admin Panel with CRUD and Security Settings */}
      <AdminPanel
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
        profile={profile}
        skills={skills}
        projects={projects}
        certificates={certificates}
        education={education}
        news={news}
        onSaveProfile={handleSaveProfile}
        onSaveSkills={handleSaveSkills}
        onSaveProjects={handleSaveProjects}
        onSaveCertificates={handleSaveCertificates}
        onSaveEducation={handleSaveEducation}
        onSaveNews={handleSaveNews}
        onImportAllData={handleImportAllData}
        onResetToDefaults={handleResetToDefaults}
        onLogout={handleLogout}
      />
    </div>
  );
}
