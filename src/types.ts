export interface SkillItem {
  id: string;
  name: string;
  level: number; // percentage (0 - 100)
  category: 'frontend' | 'backend' | 'tools' | 'softskill';
  icon: string;
  badge: 'Mahir' | 'Menengah' | 'Dasar';
  description?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Web App' | 'Landing Page' | 'Sistem Informasi' | 'UI/UX Design';
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  features: string[];
  challenges?: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  credentialUrl?: string;
  image: string;
  skillsGained: string[];
  category: 'Kursus Online' | 'Sertifikasi Profesi' | 'Prestasi / LKS' | 'Seminar';
}

export interface EducationItem {
  id: string;
  schoolName: string;
  major: string;
  period: string;
  status: string;
  gpaOrScore?: string;
  description: string;
  activities: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  slug?: string;
  category: 'Kegiatan SMK' | 'Prestasi & Lomba' | 'Teknologi & Tutorial' | 'Pengalaman PKL' | 'Pengumuman';
  summary: string;
  content: string;
  coverImage: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  authorAvatar?: string;
  tags: string[];
  views?: number;
  featured?: boolean;
}

export interface ProfileData {
  fullName: string;
  nickname: string;
  headline: string;
  role: string;
  school: string;
  major: string;
  statusPkl: string; // e.g. "Siap Magang / PKL 2025"
  bio: string;
  aboutStory: string[];
  location: string;
  email: string;
  whatsapp: string;
  github: string;
  linkedin: string;
  instagram: string;
  avatarUrl: string;
  cvUrl?: string;
  stats: {
    projectsCount: number;
    certificatesCount: number;
    yearsCoding: number;
    readinessScore: number;
  };
}
