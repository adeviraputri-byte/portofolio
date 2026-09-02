import React from 'react';
import { 
  X, 
  Printer, 
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  Briefcase,
  Code
} from 'lucide-react';
import { ProfileData, SkillItem, ProjectItem, CertificateItem, EducationItem } from '../types';

interface CvModalProps {
  profile: ProfileData;
  skills: SkillItem[];
  projects: ProjectItem[];
  certificates: CertificateItem[];
  education: EducationItem[];
  onClose: () => void;
}

export const CvModal: React.FC<CvModalProps> = ({
  profile,
  skills,
  projects,
  certificates,
  education,
  onClose,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const hardSkills = skills.filter((s) => s.category !== 'softskill');
  const softSkills = skills.filter((s) => s.category === 'softskill');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Curriculum Vitae (CV Siswa SMK)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Format ringkas standar industri untuk melamar PKL / Magang
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable CV Paper Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-slate-100 dark:bg-slate-950 flex justify-center">
          <div className="w-full max-w-3xl bg-white text-slate-900 p-8 sm:p-10 rounded-2xl shadow-md border border-slate-200 text-sm print:shadow-none print:border-none print:p-0">
            
            {/* Header: Name, Contact, Summary */}
            <div className="border-b-2 border-blue-600 pb-6 mb-6 flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {profile.fullName}
                </h1>
                <p className="text-blue-600 font-bold text-base mt-0.5">
                  {profile.role} • Siswa SMK {profile.school}
                </p>
                <p className="text-xs text-slate-600 mt-2 max-w-xl leading-relaxed">
                  {profile.bio}
                </p>
              </div>

              {/* Contact mini list */}
              <div className="text-xs space-y-1 text-slate-600 shrink-0 text-left sm:text-right">
                <div className="flex items-center sm:justify-end gap-1.5">
                  <span>{profile.email}</span>
                  <Mail className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <span>+{profile.whatsapp}</span>
                  <Phone className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <span>{profile.location}</span>
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                </div>
              </div>
            </div>

            {/* Grid 2 Column for CV Body */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Left Column (8 cols): Education, Projects */}
              <div className="md:col-span-8 space-y-6">
                
                {/* 1. Pendidikan */}
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-3 flex items-center gap-1.5 border-b border-slate-200 pb-1">
                    <GraduationCap className="w-4 h-4" />
                    <span>Pendidikan Formal</span>
                  </h2>
                  <div className="space-y-3">
                    {education.map((edu) => (
                      <div key={edu.id}>
                        <div className="flex justify-between items-baseline">
                          <strong className="text-slate-900 text-sm">{edu.schoolName}</strong>
                          <span className="text-xs text-slate-500 font-medium">{edu.period}</span>
                        </div>
                        <div className="text-blue-600 font-semibold text-xs">{edu.major}</div>
                        {edu.gpaOrScore && <div className="text-xs font-bold text-slate-700 mt-0.5">{edu.gpaOrScore}</div>}
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">{edu.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Proyek / Portofolio Kejuruan */}
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-3 flex items-center gap-1.5 border-b border-slate-200 pb-1">
                    <Briefcase className="w-4 h-4" />
                    <span>Proyek & Pengalaman Praktik</span>
                  </h2>
                  <div className="space-y-4">
                    {projects.slice(0, 3).map((proj) => (
                      <div key={proj.id}>
                        <div className="flex justify-between items-baseline">
                          <strong className="text-slate-900 text-sm">{proj.title}</strong>
                          <span className="text-[11px] font-bold text-slate-500">{proj.category}</span>
                        </div>
                        <div className="text-xs text-slate-600 mt-0.5">{proj.description}</div>
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {proj.tags.map((t, i) => (
                            <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-medium">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column (4 cols): Skills & Certificates */}
              <div className="md:col-span-4 space-y-6">
                
                {/* Hard Skills */}
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-3 flex items-center gap-1.5 border-b border-slate-200 pb-1">
                    <Code className="w-4 h-4" />
                    <span>Hard Skills</span>
                  </h2>
                  <div className="space-y-1.5">
                    {hardSkills.slice(0, 7).map((s) => (
                      <div key={s.id} className="text-xs">
                        <div className="flex justify-between text-slate-800 font-medium">
                          <span>{s.name}</span>
                          <span className="font-bold text-blue-600">{s.level}%</span>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-0.5">
                          <div className="bg-blue-600 h-full rounded-full" style={{ width: `${s.level}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Soft Skills */}
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-3 flex items-center gap-1.5 border-b border-slate-200 pb-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Soft Skills</span>
                  </h2>
                  <ul className="text-xs space-y-1 text-slate-700">
                    {softSkills.map((s) => (
                      <li key={s.id} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                        <span>{s.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sertifikasi */}
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-3 flex items-center gap-1.5 border-b border-slate-200 pb-1">
                    <Award className="w-4 h-4" />
                    <span>Sertifikasi</span>
                  </h2>
                  <div className="space-y-2 text-xs">
                    {certificates.map((c) => (
                      <div key={c.id}>
                        <div className="font-bold text-slate-900 leading-tight">{c.title}</div>
                        <div className="text-[11px] text-slate-500">{c.issuer} ({c.date})</div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Gunakan tombol "Cetak / PDF" untuk menyimpan sebagai berkas PDF resmi lamaran magang.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 cursor-pointer"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
