import React from 'react';
import { 
  User, 
  BookOpen, 
  MapPin, 
  Mail, 
  Phone, 
  Briefcase, 
  Zap, 
  Users, 
  CheckCircle, 
  Clock,
  Sparkles,
  Download
} from 'lucide-react';
import { ProfileData } from '../types';

interface AboutProps {
  profile: ProfileData;
  onOpenCv: () => void;
}

export const About: React.FC<AboutProps> = ({ profile, onOpenCv }) => {
  return (
    <section id="tentang" className="py-24 bg-white dark:bg-slate-900/50 border-y border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
            <User className="w-3.5 h-3.5" />
            <span>Profil Siswa</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Tentang Saya & Minat Kejuruan
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Mengenal lebih dekat motivasi, latar belakang keahlian, dan komitmen profesional saya sebagai siswa SMK.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Quick Biodata Table */}
          <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700/80 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>Biodata Ringkas</span>
            </h3>

            <div className="space-y-4 divide-y divide-slate-200/70 dark:divide-slate-700/70 text-sm">
              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Nama Lengkap</span>
                <span className="text-slate-900 dark:text-slate-100 font-bold">{profile.fullName}</span>
              </div>

              <div className="flex justify-between items-center pt-3">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Sekolah</span>
                <span className="text-slate-900 dark:text-slate-100 font-bold text-right">{profile.school}</span>
              </div>

              <div className="flex justify-between items-center pt-3">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Jurusan / Kompetensi</span>
                <span className="text-blue-600 dark:text-blue-400 font-bold text-right">{profile.major}</span>
              </div>

              <div className="flex justify-between items-center pt-3">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Domisili</span>
                <span className="text-slate-900 dark:text-slate-100 font-bold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {profile.location}
                </span>
              </div>

              <div className="flex justify-between items-center pt-3">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Status</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Siap PKL / Magang
                </span>
              </div>

              <div className="flex justify-between items-center pt-3">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Minat Karir</span>
                <span className="text-slate-900 dark:text-slate-100 font-bold">Frontend / Web Dev</span>
              </div>

              <div className="flex justify-between items-center pt-3">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Email</span>
                <a href={`mailto:${profile.email}`} className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
                  {profile.email}
                </a>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
              <button
                id="about-download-cv-btn"
                onClick={onOpenCv}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Lihat & Unduh Curriculum Vitae</span>
              </button>
            </div>
          </div>

          {/* Right Column: Narrative Story & Work Value Pillars */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Membangun Masa Depan Melalui Kode & Kreativitas
              </h3>

              <div className="space-y-4 text-slate-600 dark:text-slate-300 text-base leading-relaxed mb-8">
                {profile.aboutStory.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* 4 Work Ethic Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200/70 dark:border-slate-700/70">
                <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold mb-2.5">
                  <Zap className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Cepat Beradaptasi</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Siap mempelajari framework, tools baru, dan alur kerja perusahaan dalam waktu singkat.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200/70 dark:border-slate-700/70">
                <div className="w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold mb-2.5">
                  <Users className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Kerja Sama Tim</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Terbiasa berkoordinasi, menerima masukan (feedback), dan berkomunikasi secara santun.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200/70 dark:border-slate-700/70">
                <div className="w-9 h-9 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold mb-2.5">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Problem Solving Logis</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Menganalisis bug dan permasalahan kode secara runtut dan teliti hingga tuntas.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200/70 dark:border-slate-700/70">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold mb-2.5">
                  <Clock className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Disiplin & Tanggung Jawab</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Menghargai tenggat waktu tugas dan mematuhi etika serta standar kerja industri.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
