import React from 'react';
import { 
  GraduationCap, 
  Calendar, 
  Award, 
  CheckCircle2, 
  BookOpen, 
  School
} from 'lucide-react';
import { EducationItem, ProfileData } from '../types';

interface ExperienceEducationProps {
  education: EducationItem[];
  profile: ProfileData;
}

export const ExperienceEducation: React.FC<ExperienceEducationProps> = ({ education, profile }) => {
  return (
    <section id="pendidikan" className="py-20 bg-slate-50 dark:bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-3">
            <School className="w-3.5 h-3.5" />
            <span>Riwayat Pendidikan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Latar Belakang Pendidikan & Organisasi
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Rekam jejak akademik, kegiatan ekstrakurikuler kejuruan, dan pencapaian selama menempuh studi.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {education.map((item, index) => (
            <div
              key={item.id}
              className="relative bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700/80 shadow-sm hover:shadow-md transition duration-300"
            >
              {/* Top Row: School, Period, Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-4 border-b border-slate-100 dark:border-slate-700/60">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                      <GraduationCap className="w-5 h-5" />
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {item.schoolName}
                    </h3>
                  </div>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm sm:text-base mt-1 ml-9">
                    {item.major}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 ml-9 sm:ml-0">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.period}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
                    {item.status}
                  </span>
                </div>
              </div>

              {/* GPA/Score if exists */}
              {item.gpaOrScore && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 mb-4">
                  <Award className="w-3.5 h-3.5" />
                  <span>{item.gpaOrScore}</span>
                </div>
              )}

              {/* Description */}
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-5">
                {item.description}
              </p>

              {/* Key Activities */}
              {item.activities && item.activities.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
                    Aktivitas & Peran Sekolah:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {item.activities.map((act, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{act}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
