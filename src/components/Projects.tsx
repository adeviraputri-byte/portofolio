import React, { useState } from 'react';
import { 
  FolderGit2, 
  Github, 
  ExternalLink, 
  Eye, 
  Sparkles,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { ProjectItem, ProfileData } from '../types';

interface ProjectsProps {
  projects: ProjectItem[];
  profile: ProfileData;
  onSelectProject: (project: ProjectItem) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ projects, profile, onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Semua Proyek' },
    { id: 'Sistem Informasi', label: 'Sistem Informasi / POS' },
    { id: 'Web App', label: 'Web Application' },
    { id: 'Landing Page', label: 'Landing Page & UI' },
    { id: 'UI/UX Design', label: 'UI/UX Research' },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="proyek" className="py-24 bg-slate-50 dark:bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Hasil Karya & Praktik SMK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Proyek Pilihan & Portofolio
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Kumpulan aplikasi nyata, website interaktif, dan proyek Uji Kompetensi Keahlian (UKK) yang telah saya selesaikan.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`project-tab-${cat.id.replace(/\s+/g, '-').toLowerCase()}`}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition duration-200 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-white dark:bg-slate-800/90 rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-700/90 shadow-sm hover:shadow-xl hover:border-blue-500/50 transition-all duration-300 flex flex-col"
            >
              {/* Image Preview */}
              <div 
                className="relative h-60 sm:h-72 overflow-hidden bg-slate-100 dark:bg-slate-800 cursor-pointer"
                onClick={() => onSelectProject(project)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Overlay Badge for Category */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-slate-950/80 text-white backdrop-blur-md border border-white/20">
                    {project.category}
                  </span>
                </div>

                {/* Featured Badge if any */}
                {project.featured && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-amber-500 text-white shadow-md">
                      <Sparkles className="w-3 h-3" />
                      Unggulan
                    </span>
                  </div>
                )}

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-blue-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                  <span className="px-4 py-2 rounded-xl bg-white text-slate-900 text-xs sm:text-sm font-bold shadow-lg flex items-center gap-2">
                    <Eye className="w-4 h-4 text-blue-600" />
                    Lihat Rincian Proyek
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 
                    onClick={() => onSelectProject(project)}
                    className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer flex items-start justify-between gap-2"
                  >
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0 mt-1" />
                  </h3>

                  <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-3">
                  <button
                    id={`view-detail-${project.id}`}
                    onClick={() => onSelectProject(project)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60 transition cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Lihat Detail</span>
                  </button>

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 transition"
                      title="Lihat Source Code di GitHub"
                    >
                      <Github className="w-4 h-4" />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
