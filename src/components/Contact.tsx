import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageCircle, 
  Github, 
  Linkedin, 
  Instagram, 
  CheckCircle2, 
  Sparkles,
  School,
  Clock
} from 'lucide-react';
import { ProfileData } from '../types';

interface ContactProps {
  profile: ProfileData;
}

export const Contact: React.FC<ContactProps> = ({ profile }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    contactInfo: '',
    category: 'Magang / PKL Siswa SMK',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format message to WhatsApp
    const waText = `Halo ${profile.fullName},%0A%0A*Nama Pengirim:* ${encodeURIComponent(formData.name)}%0A*Instansi/Perusahaan:* ${encodeURIComponent(formData.company || '-')}%0A*Kontak:* ${encodeURIComponent(formData.contactInfo)}%0A*Keperluan:* ${encodeURIComponent(formData.category)}%0A%0A*Pesan:*%0A${encodeURIComponent(formData.message)}%0A%0A_(Dikirim melalui Portofolio Web Siswa SMK)_`;
    
    const waUrl = `https://wa.me/${profile.whatsapp}?text=${waText}`;
    
    // Open WhatsApp
    window.open(waUrl, '_blank');
    setSubmitted(true);
  };

  return (
    <section id="kontak" className="py-24 bg-slate-50 dark:bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>Hubungi Saya</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Mari Bekerja Sama & Terhubung
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Saya siap menerima tawaran Magang / PKL, rekrutmen kerja, maupun proyek kolaborasi web development.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact Information Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Availability Banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20 relative overflow-hidden">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>Siap Magang / PKL 2025</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Terbuka untuk Kesempatan Baru</h3>
                <p className="text-blue-100 text-sm leading-relaxed mb-4">
                  Dapat bekerja onsite di area {profile.location} maupun secara remote (WFA). Memiliki laptop kerja pribadi dan koneksi internet stabil.
                </p>
                <div className="flex items-center gap-2 text-xs font-semibold text-blue-100">
                  <Clock className="w-4 h-4" />
                  <span>Respon Cepat via WhatsApp</span>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Resmi</div>
                <a 
                  href={`mailto:${profile.email}`} 
                  className="text-sm sm:text-base font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition truncate block"
                >
                  {profile.email}
                </a>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">WhatsApp / Telp</div>
                <a 
                  href={`https://wa.me/${profile.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm sm:text-base font-bold text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition"
                >
                  +{profile.whatsapp}
                </a>
              </div>
            </div>

            {/* Location & School */}
            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Domisili & Sekolah</div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {profile.location} • {profile.school}
                </p>
              </div>
            </div>

            {/* Social Links Bar */}
            <div className="pt-2">
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-3">
                Media Sosial & Profil Developer:
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-slate-900 dark:hover:border-white flex items-center justify-center transition shadow-xs"
                  title="GitHub Profile"
                >
                  <Github className="w-5 h-5" />
                </a>

                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-slate-700 hover:border-blue-600 flex items-center justify-center transition shadow-xs"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5" />
                </a>

                <a
                  href={profile.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-white dark:bg-slate-800 text-pink-600 dark:text-pink-400 border border-slate-200 dark:border-slate-700 hover:border-pink-600 flex items-center justify-center transition shadow-xs"
                  title="Instagram Profile"
                >
                  <Instagram className="w-5 h-5" />
                </a>

                <a
                  href={`https://wa.me/${profile.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 border border-slate-200 dark:border-slate-700 hover:border-emerald-600 flex items-center justify-center transition shadow-xs"
                  title="WhatsApp Chat"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-700/80 shadow-md">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Kirim Pesan / Tawaran Magang
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
              Pesan Anda akan langsung diformat rapi dan diteruskan ke WhatsApp pribadi saya secara otomatis.
            </p>

            {submitted && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-sm flex items-center gap-3 animate-in fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Pesan telah disiapkan! Jendela WhatsApp terbuka untuk mengirim pesan secara langsung.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
                    Nama Lengkap Anda <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Bpk. Hendra Pratama"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-700 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
                    Perusahaan / Instansi (Opsional)
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: PT. Solusi Digital Indonesia"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-700 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
                    Email / No. HP Anda <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="email@perusahaan.com / 0812xxxx"
                    value={formData.contactInfo}
                    onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                    className="w-full px-4 py-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-700 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
                    Keperluan / Subjek
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-700 transition"
                  >
                    <option value="Magang / PKL Siswa SMK">Tawaran Magang / PKL Siswa SMK</option>
                    <option value="Lowongan Kerja Junior Dev">Lowongan Kerja / Junior Developer</option>
                    <option value="Proyek Pembuatan Website">Proyek Pembuatan Website / Freelance</option>
                    <option value="Diskusi & Kolaborasi">Diskusi & Tanya Seputar Portofolio</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
                  Isi Pesan <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tuliskan detail tawaran magang, jadwal interview, atau pesan Anda..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-700 transition resize-y"
                ></textarea>
              </div>

              <button
                type="submit"
                id="contact-submit-btn"
                className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition duration-200 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Kirim Pesan Langsung ke WhatsApp</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
