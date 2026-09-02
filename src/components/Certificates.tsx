import React, { useState } from 'react';
import { 
  Award, 
  Calendar, 
  CheckCircle2, 
  Eye, 
  ShieldCheck, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { CertificateItem } from '../types';

interface CertificatesProps {
  certificates: CertificateItem[];
  onSelectCertificate: (cert: CertificateItem) => void;
}

export const Certificates: React.FC<CertificatesProps> = ({
  certificates,
  onSelectCertificate,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Semua Sertifikat' },
    { id: 'Kursus Online', label: 'Kursus Online' },
    { id: 'Sertifikasi Profesi', label: 'Sertifikasi BNSP/LSP' },
    { id: 'Prestasi / LKS', label: 'Lomba & Prestasi' },
  ];

  const filteredCerts = filterCategory === 'all'
    ? certificates
    : certificates.filter((c) => c.category === filterCategory);

  return (
    <section id="sertifikat" className="py-24 bg-white dark:bg-slate-900/60 border-t border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Bukti Kompetensi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Sertifikat & Prestasi Kejuruan
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Sertifikasi resmi dari lembaga pelatihan terakreditasi, sertifikasi BNSP, serta kejuaraan tingkat SMK.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`cert-tab-${cat.id.replace(/\s+/g, '-').toLowerCase()}`}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition duration-200 cursor-pointer ${
                filterCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              onClick={() => onSelectCertificate(cert)}
              className="group bg-slate-50 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-700/80 hover:border-blue-500/50 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              {/* Preview Thumbnail */}
              <div className="relative h-44 overflow-hidden bg-slate-200 dark:bg-slate-700">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-slate-950/80 text-white backdrop-blur-md">
                    {cert.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-blue-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3 py-1.5 rounded-lg bg-white text-slate-900 text-xs font-bold shadow-md flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-blue-600" />
                    Lihat Sertifikat
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
                    {cert.issuer}
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm leading-snug mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {cert.date}
                  </p>
                </div>

                {/* Skills tags preview */}
                <div className="pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex flex-wrap gap-1">
                  {cert.skillsGained.slice(0, 2).map((sk, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600"
                    >
                      {sk}
                    </span>
                  ))}
                  {cert.skillsGained.length > 2 && (
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 text-slate-400">
                      +{cert.skillsGained.length - 2}
                    </span>
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
