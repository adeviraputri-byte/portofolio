import React, { useState } from 'react';
import { 
  Code2, 
  Palette, 
  Sparkles, 
  FileCode, 
  Atom, 
  LayoutGrid, 
  Server, 
  Database, 
  Cpu, 
  GitBranch, 
  PenTool, 
  Terminal, 
  Zap, 
  Users, 
  Lightbulb, 
  Clock,
  Layers,
  Search,
  CheckCircle2
} from 'lucide-react';
import { SkillItem } from '../types';

interface SkillsProps {
  skills: SkillItem[];
}

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'Semua Keahlian' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend & Database' },
    { id: 'tools', label: 'Tools & Desain' },
    { id: 'softskill', label: 'Soft Skills' },
  ];

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Code2': return <Code2 className="w-5 h-5 text-blue-500" />;
      case 'Palette': return <Palette className="w-5 h-5 text-indigo-500" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-cyan-500" />;
      case 'FileCode': return <FileCode className="w-5 h-5 text-amber-500" />;
      case 'Atom': return <Atom className="w-5 h-5 text-sky-500" />;
      case 'LayoutGrid': return <LayoutGrid className="w-5 h-5 text-purple-500" />;
      case 'Server': return <Server className="w-5 h-5 text-emerald-500" />;
      case 'Database': return <Database className="w-5 h-5 text-blue-600" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-violet-500" />;
      case 'GitBranch': return <GitBranch className="w-5 h-5 text-orange-500" />;
      case 'PenTool': return <PenTool className="w-5 h-5 text-pink-500" />;
      case 'Terminal': return <Terminal className="w-5 h-5 text-slate-500" />;
      case 'Zap': return <Zap className="w-5 h-5 text-amber-500" />;
      case 'Users': return <Users className="w-5 h-5 text-teal-500" />;
      case 'Lightbulb': return <Lightbulb className="w-5 h-5 text-yellow-500" />;
      case 'Clock': return <Clock className="w-5 h-5 text-emerald-500" />;
      default: return <CheckCircle2 className="w-5 h-5 text-blue-500" />;
    }
  };

  const filteredSkills = skills.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skill" className="py-24 bg-white dark:bg-slate-900/60 border-b border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Kompetensi Keahlian</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Skill Teknis & Karakter Kerja
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Penguasaan bahasa pemrograman, framework modern, tools produktivitas, serta kemampuan komunikasi kerja.
          </p>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`skill-filter-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition duration-200 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari keahlian..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
          </div>
        </div>

        {/* Skills Grid */}
        {filteredSkills.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSkills.map((skill) => (
              <div
                key={skill.id}
                className="group relative bg-slate-50 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/80 hover:border-blue-500/40 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top: Icon + Name + Badge */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-700/70 border border-slate-200/80 dark:border-slate-600 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                        {getIconComponent(skill.icon)}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white text-base">
                          {skill.name}
                        </h3>
                        <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-400 capitalize">
                          {skill.category === 'softskill' ? 'Soft Skill' : skill.category}
                        </span>
                      </div>
                    </div>

                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      skill.badge === 'Mahir'
                        ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/60'
                        : skill.badge === 'Menengah'
                        ? 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 border border-blue-200/80 dark:border-blue-800/60'
                        : 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200/80 dark:border-amber-800/60'
                    }`}>
                      {skill.badge}
                    </span>
                  </div>

                  {/* Progress Bar & Percentage */}
                  <div className="mb-3">
                    <div className="flex justify-between items-center text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                      <span>Tingkat Pemahaman</span>
                      <span className="text-blue-600 dark:text-blue-400 font-bold">{skill.level}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all duration-700"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Skill Short Description */}
                  {skill.description && (
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {skill.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
            <Layers className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <p className="text-slate-600 dark:text-slate-400 font-medium">Tidak ada keahlian yang cocok dengan pencarian "{searchQuery}".</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-bold rounded-lg bg-blue-600 text-white"
            >
              Reset Filter
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
