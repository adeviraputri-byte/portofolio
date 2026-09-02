import React from 'react';
import { 
  Code2, 
  ArrowUp, 
  Github, 
  Linkedin, 
  Instagram, 
  Heart, 
  Mail,
  GraduationCap,
  ShieldCheck
} from 'lucide-react';
import { ProfileData } from '../types';

interface FooterProps {
  profile: ProfileData;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, onOpenAdmin }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-100 dark:border-slate-800/80">
          
          {/* Logo & School Motto */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-slate-900 dark:text-white text-base">
                {profile.fullName}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-blue-500" />
                <span>{profile.school} • {profile.major}</span>
              </div>
            </div>
          </div>

          {/* Quick Nav in Footer */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-semibold">
            <a href="#beranda" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Beranda</a>
            <a href="#tentang" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Tentang</a>
            <a href="#pendidikan" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Pendidikan</a>
            <a href="#skill" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Skill</a>
            <a href="#proyek" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Proyek</a>
            <a href="#sertifikat" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Sertifikat</a>
            <a href="#kontak" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Kontak</a>
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline font-bold cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Login</span>
              </button>
            )}
          </div>

          {/* Back to top button */}
          <button
            id="back-to-top-btn"
            onClick={scrollToTop}
            className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition flex items-center justify-center cursor-pointer shadow-xs"
            aria-label="Kembali ke atas"
            title="Kembali ke atas"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
          <p>
            © {currentYear} <strong>{profile.fullName}</strong>. Portofolio Siswa SMK — Dibuat untuk Keperluan Magang / PKL & Kerja.
          </p>
          <div className="flex items-center gap-1">
            <span>SMK Bisa, SMK Hebat, Siap Kerja & Santun</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
