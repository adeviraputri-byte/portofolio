import React from 'react';
import { 
  X, 
  ExternalLink, 
  Github, 
  CheckCircle2, 
  Layers, 
  Lightbulb,
  MessageCircle,
  Laptop
} from 'lucide-react';
import { ProjectItem, ProfileData } from '../types';

interface ProjectModalProps {
  project: ProjectItem | null;
  profile: ProfileData;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, profile, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400">
              {project.category}
            </span>
            <span className="text-xs text-slate-400 font-medium">Detail Proyek Portofolio</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition cursor-pointer"
            aria-label="Tutup detail modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Main Image */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 aspect-video">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Title & Long Description */}
          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
              {project.title}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Key Features List */}
          {project.features && project.features.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-850 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Fitur & Fungsionalitas Utama:</span>
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                {project.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Challenges & Learning Note */}
          {project.challenges && (
            <div className="p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 text-xs sm:text-sm">
              <h4 className="font-bold text-amber-900 dark:text-amber-300 mb-1 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Tantangan & Solusi yang Dipelajari:</span>
              </h4>
              <p className="text-amber-800 dark:text-amber-200/80 leading-relaxed">
                {project.challenges}
              </p>
            </div>
          )}

          {/* Tech Stack Badges */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
              Teknologi / Stack yang Digunakan:
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700 text-xs sm:text-sm font-bold transition"
              >
                <Github className="w-4 h-4" />
                <span>Lihat Kode GitHub</span>
              </a>
            )}

            <a
              href={`https://wa.me/${profile.whatsapp}?text=Halo%20${encodeURIComponent(profile.fullName)},%20saya%20tertarik%20dengan%20proyek%20${encodeURIComponent(project.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Tanya Pembuat</span>
            </a>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-750 transition cursor-pointer"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
