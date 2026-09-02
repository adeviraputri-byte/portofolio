import React from 'react';
import { 
  ArrowRight, 
  Download, 
  MessageCircle, 
  Sparkles, 
  CheckCircle2, 
  Code, 
  Laptop, 
  Award, 
  Terminal,
  Layers,
  GraduationCap
} from 'lucide-react';
import { ProfileData } from '../types';

interface HeroProps {
  profile: ProfileData;
  onOpenCv: () => void;
}

export const Hero: React.FC<HeroProps> = ({ profile, onOpenCv }) => {
  const scrollToProjects = () => {
    const el = document.getElementById('proyek');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const el = document.getElementById('kontak');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="beranda" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-teal-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Introduction & CTA */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-bold mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{profile.statusPkl}</span>
            </div>

            {/* Main Greeting & Name */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-4">
              Halo, Saya <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
                {profile.fullName}
              </span>
            </h1>

            {/* Vocational Role & School */}
            <div className="flex flex-wrap items-center gap-2.5 text-base sm:text-xl font-bold text-slate-700 dark:text-slate-200 mb-5">
              <span className="text-blue-600 dark:text-blue-400">{profile.role}</span>
              <span className="text-slate-400">•</span>
              <span className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-300 font-medium">
                <GraduationCap className="w-4 h-4 text-slate-400" />
                {profile.school}
              </span>
            </div>

            {/* Short Bio */}
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
              {profile.bio}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10 w-full sm:w-auto">
              <button
                id="hero-see-projects-btn"
                onClick={scrollToProjects}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition duration-200 cursor-pointer"
              >
                <span>Lihat Proyek Saya</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-download-cv-btn"
                onClick={onOpenCv}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-100 font-bold text-sm sm:text-base border border-slate-200 dark:border-slate-700 hover:border-blue-500/50 hover:-translate-y-0.5 transition duration-200 shadow-sm cursor-pointer"
              >
                <Download className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Unduh CV (PDF)</span>
              </button>

              <a
                id="hero-whatsapp-btn"
                href={`https://wa.me/${profile.whatsapp}?text=Halo%20${encodeURIComponent(profile.fullName)},%20saya%20tertarik%20dengan%20portofolio%20Anda.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base shadow-md shadow-emerald-600/20 hover:-translate-y-0.5 transition duration-200"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat WA</span>
              </a>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 w-full">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">
                  {profile.stats.projectsCount}+
                </div>
                <div className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                  Proyek Selesai
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
                  {profile.stats.certificatesCount}+
                </div>
                <div className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                  Sertifikat Keahlian
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-sky-600 dark:text-sky-400">
                  {profile.stats.yearsCoding} Thn
                </div>
                <div className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                  Praktik Coding SMK
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                  100%
                </div>
                <div className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                  Siap Magang / PKL
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Profile Visual & Floating Badges */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-full max-w-xs sm:max-w-sm">
              
              {/* Outer Glow frame */}
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur-lg opacity-25 dark:opacity-40 animate-pulse-glow"></div>
              
              {/* Card Container */}
              <div className="relative rounded-3xl bg-white dark:bg-slate-900 border-4 border-white dark:border-slate-800 shadow-2xl overflow-hidden p-2">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
                  <img
                    src={profile.avatarUrl}
                    alt={`Foto profil ${profile.fullName}`}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />

                  {/* Gradient Overlay bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent flex flex-col justify-end p-4 text-white">
                    <p className="font-bold text-base leading-tight">{profile.fullName}</p>
                    <p className="text-xs text-blue-300 font-medium">{profile.major}</p>
                  </div>
                </div>
              </div>

              {/* Floating Badge: Top Left (Tech Stack) */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 px-3.5 py-2 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-2.5 animate-bounce" style={{ animationDuration: '3.5s' }}>
                <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                  <Terminal className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-slate-600 dark:text-slate-300">Stack Utama</div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">React & Tailwind</div>
                </div>
              </div>

              {/* Floating Badge: Bottom Right (PKL Ready) */}
              <div className="absolute -bottom-4 -right-4 sm:-right-6 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 px-3.5 py-2.5 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Siap Magang / PKL</div>
                  <div className="text-[10px] text-slate-600 dark:text-slate-300">Dedikasi Penuh</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
