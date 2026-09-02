import React, { useState, useEffect } from 'react';
import { 
  Code2, 
  Moon, 
  Sun, 
  Menu, 
  X, 
  FileText,
  ShieldCheck
} from 'lucide-react';
import { ProfileData } from '../types';

interface NavbarProps {
  profile: ProfileData;
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  onOpenCv: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  darkMode,
  setDarkMode,
  onOpenCv,
  onOpenAdmin,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('beranda');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['beranda', 'tentang', 'pendidikan', 'skill', 'proyek', 'sertifikat', 'berita', 'kontak'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'tentang', label: 'Tentang' },
    { id: 'pendidikan', label: 'Pendidikan' },
    { id: 'skill', label: 'Skill' },
    { id: 'proyek', label: 'Proyek' },
    { id: 'sertifikat', label: 'Sertifikat' },
    { id: 'berita', label: 'Berita' },
    { id: 'kontak', label: 'Kontak' },
  ];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border-b border-slate-200/80 dark:border-slate-800'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Name */}
          <button
            id="nav-logo-btn"
            onClick={() => scrollToSection('beranda')}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight">
                {profile.nickname || profile.fullName.split(' ')[0]}
                <span className="text-blue-600 dark:text-blue-400">.dev</span>
              </span>
              <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400">
                Siswa SMK RPL
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1 bg-slate-100/70 dark:bg-slate-800/60 p-1.5 rounded-full border border-slate-200/60 dark:border-slate-700/60">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                      : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Admin Panel Button with Auth Protection */}
            <button
              id="admin-panel-nav-btn"
              onClick={onOpenAdmin}
              title="Panel Admin (CRUD Konten, Skill, Proyek & Sertifikat)"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xs shadow-blue-500/30 transition cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Panel</span>
            </button>

            {/* CV Modal */}
            <button
              id="view-cv-btn"
              onClick={onOpenCv}
              title="Lihat Format CV Siap Cetak"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>CV</span>
            </button>

            {/* Theme Toggle */}
            <button
              id="theme-toggle-btn"
              onClick={() => setDarkMode((prev) => !prev)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer border border-slate-200/80 dark:border-slate-800"
              aria-label="Ganti mode gelap/terang"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              id="mobile-admin-btn"
              onClick={onOpenAdmin}
              className="p-2 rounded-lg bg-blue-600 text-white"
              title="Admin Panel"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>
            <button
              id="mobile-theme-toggle"
              onClick={() => setDarkMode((prev) => !prev)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Ganti mode gelap/terang"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Buka menu navigasi"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-1.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-semibold transition ${
                  activeSection === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{item.label}</span>
                {activeSection === item.id && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
              </button>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold bg-blue-600 text-white shadow-md shadow-blue-500/20"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Panel (CRUD & Autentikasi)</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCv();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
            >
              <FileText className="w-4 h-4" />
              <span>Lihat Format CV</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
