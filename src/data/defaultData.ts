import { ProfileData, SkillItem, ProjectItem, CertificateItem, EducationItem } from '../types';

export const defaultProfile: ProfileData = {
  fullName: 'Ade Vira Putri',
  nickname: 'Vira',
  headline: 'Siswa SMK Rekayasa Perangkat Lunak | Frontend & Junior Web Developer',
  role: 'Frontend & Junior Web Developer',
  school: 'SMK Negeri 1 Jakarta',
  major: 'Rekayasa Perangkat Lunak (RPL)',
  statusPkl: '🟢 Terbuka untuk Magang / PKL & Kerja',
  bio: 'Siswa SMK tingkat akhir jurusan Rekayasa Perangkat Lunak (RPL) dengan minat mendalam pada pengembangan Web Modern, UI/UX Design, dan Problem Solving. Memiliki pemahaman kuat tentang HTML, CSS, JavaScript, React, dan Tailwind CSS, serta terbiasa bekerja dengan Git & kolaborasi tim.',
  aboutStory: [
    'Halo! Saya seorang siswa SMK yang penuh antusiasme dalam dunia teknologi dan pemrograman. Sejak awal masuk jurusan RPL, saya aktif membangun berbagai proyek web, baik tugas sekolah maupun eksplorasi mandiri.',
    'Saya berfokus pada pengembangan antarmuka web yang responsif, cepat, dan ramah pengguna (user-friendly). Terbiasa memecahkan masalah logika pemrograman serta selalu haus mempelajari teknologi baru.',
    'Saat ini saya sedang mencari kesempatan Praktik Kerja Lapangan (PKL) / Magang di perusahaan teknologi atau software house untuk mengaplikasikan kemampuan, belajar alur kerja industri, dan memberikan kontribusi nyata.'
  ],
  location: 'Jakarta, Indonesia',
  email: 'adeviraputri@gmail.com',
  whatsapp: '6281234567890',
  github: 'https://github.com/adeviraputri',
  linkedin: 'https://linkedin.com/in/adeviraputri',
  instagram: 'https://instagram.com/adeviraputri',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
  stats: {
    projectsCount: 8,
    certificatesCount: 6,
    yearsCoding: 2,
    readinessScore: 100
  }
};

export const defaultSkills: SkillItem[] = [
  // Hard Skills - Frontend
  {
    id: 's1',
    name: 'HTML5 & Semantic Web',
    level: 95,
    category: 'frontend',
    icon: 'Code2',
    badge: 'Mahir',
    description: 'Struktur web bersih, aksesibilitas, SEO-friendly, dan standar W3C'
  },
  {
    id: 's2',
    name: 'CSS3 & Responsive Design',
    level: 90,
    category: 'frontend',
    icon: 'Palette',
    badge: 'Mahir',
    description: 'Flexbox, Grid, Media Queries, animasi CSS, mobile-first design'
  },
  {
    id: 's3',
    name: 'Tailwind CSS',
    level: 90,
    category: 'frontend',
    icon: 'Sparkles',
    badge: 'Mahir',
    description: 'Komponen modular, utility classes, custom theme & dark mode'
  },
  {
    id: 's4',
    name: 'JavaScript (ES6+)',
    level: 85,
    category: 'frontend',
    icon: 'FileCode',
    badge: 'Mahir',
    description: 'DOM Manipulation, Fetch API, Async/Await, Array Methods, OOP Dasar'
  },
  {
    id: 's5',
    name: 'React.js',
    level: 80,
    category: 'frontend',
    icon: 'Atom',
    badge: 'Menengah',
    description: 'Hooks (useState, useEffect), Component Lifecycle, Props, Context'
  },
  {
    id: 's6',
    name: 'Bootstrap 5',
    level: 85,
    category: 'frontend',
    icon: 'LayoutGrid',
    badge: 'Mahir',
    description: 'Grid system, UI components, modal, navbar, utilities'
  },

  // Hard Skills - Backend & Database
  {
    id: 's7',
    name: 'PHP & Laravel Dasar',
    level: 75,
    category: 'backend',
    icon: 'Server',
    badge: 'Menengah',
    description: 'Struktur MVC, CRUD, routing, blade template, koneksi database'
  },
  {
    id: 's8',
    name: 'MySQL / Database Relasional',
    level: 80,
    category: 'backend',
    icon: 'Database',
    badge: 'Menengah',
    description: 'Query SQL (SELECT, JOIN, GROUP BY), normalisasi data, relasi tabel'
  },
  {
    id: 's9',
    name: 'RESTful API Integration',
    level: 75,
    category: 'backend',
    icon: 'Cpu',
    badge: 'Menengah',
    description: 'Konsumsi API publik, JSON parsing, integrasi frontend-backend'
  },

  // Tools & Design
  {
    id: 's10',
    name: 'Git & GitHub',
    level: 85,
    category: 'tools',
    icon: 'GitBranch',
    badge: 'Mahir',
    description: 'Commit, branching, push/pull, pull request, GitHub Pages deployment'
  },
  {
    id: 's11',
    name: 'Figma (UI/UX Design)',
    level: 80,
    category: 'tools',
    icon: 'PenTool',
    badge: 'Menengah',
    description: 'Wireframing, prototyping interaktif, design system, auto-layout'
  },
  {
    id: 's12',
    name: 'VS Code & Web Dev Tools',
    level: 90,
    category: 'tools',
    icon: 'Terminal',
    badge: 'Mahir',
    description: 'Debugging, Chrome DevTools, extension workflow, linting'
  },

  // Soft Skills
  {
    id: 's13',
    name: 'Cepat Belajar (Fast Learner)',
    level: 95,
    category: 'softskill',
    icon: 'Zap',
    badge: 'Mahir',
    description: 'Mampu beradaptasi dengan stack teknologi atau tools baru secara mandiri'
  },
  {
    id: 's14',
    name: 'Kerja Sama Tim & Komunikasi',
    level: 90,
    category: 'softskill',
    icon: 'Users',
    badge: 'Mahir',
    description: 'Pengalaman tugas kelompok, diskusi teknis, dan presentasi proyek'
  },
  {
    id: 's15',
    name: 'Problem Solving & Logika',
    level: 85,
    category: 'softskill',
    icon: 'Lightbulb',
    badge: 'Mahir',
    description: 'Menganalisis error kode secara sistematis dan mencari solusi efektif'
  },
  {
    id: 's16',
    name: 'Manajemen Waktu & Disiplin',
    level: 90,
    category: 'softskill',
    icon: 'Clock',
    badge: 'Mahir',
    description: 'Terbiasa menyelesaikan tugas proyek sekolah tepat waktu sesuai deadline'
  }
];

export const defaultProjects: ProjectItem[] = [
  {
    id: 'p1',
    title: 'Sistem Informasi Kasir & Inventaris Toko (Point of Sale)',
    category: 'Sistem Informasi',
    description: 'Aplikasi web kasir dan pengelolaan stok barang toko dengan struk transaksi otomatis, laporan keuangan harian, dan grafik penjualan.',
    longDescription: 'Proyek tugas akhir sekolah (Uji Kompetensi Keahlian) untuk membantu UMKM mengelola stok produk, mencatat transaksi kasir secara instan, mencetak nota digital/fisik, dan melihat ringkasan omzet harian.',
    image: 'https://images.unsplash.com/photo-1556742049-0a67e5572263?q=80&w=900&auto=format&fit=crop',
    tags: ['PHP', 'MySQL', 'Bootstrap 5', 'JavaScript', 'Chart.js'],
    demoUrl: '#',
    githubUrl: 'https://github.com/adeviraputri/pos-kasir-smk',
    featured: true,
    features: [
      'Dashboard kasir responsif dengan pencarian produk cepat dan barcode scanner support',
      'Manajemen data produk, kategori, dan notifikasi stok menipis otomatis',
      'Cetak struk belanja format thermal printer dan export PDF',
      'Laporan omzet bulanan dengan visualisasi grafik interaktif',
      'Hak akses multi-user: Admin dan Kasir'
    ],
    challenges: 'Mengoptimalkan query database saat transaksi bersamaan dan merancang UI kasir yang sangat cepat dioperasikan menggunakan keyboard shortcut.'
  },
  {
    id: 'p2',
    title: 'Portal Presensi & Nilai Siswa SMK Digital',
    category: 'Web App',
    description: 'Aplikasi web presensi siswa berbasis QR Code dan monitoring nilai tugas harian untuk guru serta orang tua murid.',
    longDescription: 'Dibangun untuk mendigitalkan proses absensi manual di kelas. Siswa memindai QR code dinamis yang berganti setiap sesi, dan rekap kehadiran langsung terakumulasi dalam format Excel/PDF.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=900&auto=format&fit=crop',
    tags: ['React.js', 'Tailwind CSS', 'Node.js API', 'QR Scanner', 'Lucide Icons'],
    demoUrl: '#',
    githubUrl: 'https://github.com/adeviraputri/portal-sekolah-smk',
    featured: true,
    features: [
      'Scan QR Code absensi cepat dengan validasi waktu & lokasi',
      'Rekap absensi otomatis (Hadir, Izin, Sakit, Alpa) per mata pelajaran',
      'Portal nilai siswa dengan transparansi tugas & ujian',
      'Tampilan modern responsif untuk smartphone siswa & tablet guru',
      'Mode Gelap / Terang untuk kenyamanan mata'
    ],
    challenges: 'Mengintegrasikan kamera browser untuk scan QR code secara instan di berbagai perangkat smartphone tanpa lag.'
  },
  {
    id: 'p3',
    title: 'Landing Page Destinasi Wisata Kuliner Nusantara',
    category: 'Landing Page',
    description: 'Website promosi kuliner nusantara dengan desain interaktif, filter daerah makanan, peta lokasi kuliner, dan ulasan pengunjung.',
    longDescription: 'Proyek eksplorasi desain frontend modern yang mengutamakan visual storytelling, tipografi khas, performa loading kilat, dan animasi interaktif yang elegan.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=900&auto=format&fit=crop',
    tags: ['HTML5', 'Tailwind CSS', 'JavaScript Vanilla', 'Swiper.js', 'Figma'],
    demoUrl: '#',
    githubUrl: 'https://github.com/adeviraputri/kuliner-nusantara-landing',
    featured: false,
    features: [
      'Hero section dinamis dengan video background & search bar rekomendasi',
      'Filter makanan berdasarkan pulau/provinsi dan rentang harga',
      'Galeri foto interaktif dengan efek lightbox modern',
      'Form reservasi meja online dengan konfirmasi via WhatsApp'
    ],
    challenges: 'Membuat animasi transisi halaman yang smooth tanpa memberatkan performa rendering pada perangkat low-end.'
  },
  {
    id: 'p4',
    title: 'Redesign UI/UX Aplikasi Magang & Bursa Kerja Khusus (BKK) SMK',
    category: 'UI/UX Design',
    description: 'Desain prototipe antarmuka mobile & web untuk memudahkan siswa SMK mencari lowongan PKL dan menyalurkan alumni ke industri.',
    longDescription: 'Riset dan perancangan antarmuka pengguna (UI) serta pengalaman pengguna (UX) untuk aplikasi BKK SMK. Meliputi user persona, user journey map, wireframe low-fidelity hingga prototype high-fidelity di Figma.',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=900&auto=format&fit=crop',
    tags: ['Figma', 'UI/UX Research', 'Design System', 'Prototyping', 'User Flow'],
    demoUrl: '#',
    githubUrl: 'https://github.com/adeviraputri/bkk-smk-uiux-case-study',
    featured: false,
    features: [
      'Design system lengkap dengan komponen atomic, warna standar, dan tipografi',
      'Alur pencarian lowongan PKL berdasarkan keahlian kejuruan (RPL, TKJ, Multimedia, Mesin)',
      'Status tracking lamaran interaktif (Terkirim, Seleksi Berkas, Interview, Diterima)',
      'Prototype interaktif Figma yang dapat diuji coba langsung oleh pengguna'
    ],
    challenges: 'Menyederhanakan formulir pendaftaran magang yang biasanya rumit menjadi langkah step-by-step yang menyenangkan bagi siswa SMK.'
  }
];

export const defaultCertificates: CertificateItem[] = [
  {
    id: 'c1',
    title: 'Belajar Dasar Pemrograman Web',
    issuer: 'Dicoding Academy Indonesia',
    date: 'Januari 2025',
    credentialId: 'DICODING-WEB-884920',
    credentialUrl: 'https://www.dicoding.com/certificates',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop',
    skillsGained: ['HTML5 Semantic', 'CSS Flexbox & Grid', 'Responsive Web Design', 'JavaScript Dasar'],
    category: 'Kursus Online'
  },
  {
    id: 'c2',
    title: 'Sertifikat Kompetensi Keahlian Rekayasa Perangkat Lunak',
    issuer: 'Lembaga Sertifikasi Profesi (LSP) / BNSP',
    date: 'November 2024',
    credentialId: 'BNSP-LSP-RPL-2024-9912',
    credentialUrl: '#',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop',
    skillsGained: ['Pemrograman Terstruktur', 'Desain Basis Data SQL', 'Implementasi User Interface', 'Pengujian Aplikasi'],
    category: 'Sertifikasi Profesi'
  },
  {
    id: 'c3',
    title: 'Juara 2 LKS SMK Tingkat Kota - Bidang Web Technologies',
    issuer: 'Dinas Pendidikan Wilayah Kota',
    date: 'September 2024',
    credentialId: 'LKS-WEBTECH-2024-02',
    credentialUrl: '#',
    image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?q=80&w=800&auto=format&fit=crop',
    skillsGained: ['Frontend Speed Coding', 'Backend CRUD API', 'Responsive UI Layout', 'Git Version Control'],
    category: 'Prestasi / LKS'
  },
  {
    id: 'c4',
    title: 'Belajar Membuat Front-End Web untuk Pemula',
    issuer: 'Dicoding Academy Indonesia',
    date: 'Maret 2025',
    credentialId: 'DICODING-FE-339182',
    credentialUrl: 'https://www.dicoding.com/certificates',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=800&auto=format&fit=crop',
    skillsGained: ['DOM Manipulation', 'Web Storage API', 'Event Handling', 'Custom Element'],
    category: 'Kursus Online'
  }
];

export const defaultEducation: EducationItem[] = [
  {
    id: 'e1',
    schoolName: 'SMK Negeri 1 Jakarta',
    major: 'Rekayasa Perangkat Lunak (RPL)',
    period: '2023 - Sekarang (Kelas XII)',
    status: 'Siswa Aktif (Siap PKL / Magang)',
    gpaOrScore: 'Rata-rata Nilai Kejuruan: 91.5 / 100',
    description: 'Fokus mendalami algoritma pemrograman, perancangan database relasional, pemrograman web client-side dan server-side, serta metodologi pengembangan perangkat lunak (Agile/Scrum).',
    activities: [
      'Ketua Divisi Web & Programming - IT Club SMK',
      'Tim Inti Lomba Kompetensi Siswa (LKS) Bidang Web Technologies',
      'Asisten Laboratorium Komputer SMK untuk praktikum adik kelas'
    ]
  },
  {
    id: 'e2',
    schoolName: 'SMP Negeri 10 Jakarta',
    major: 'Sekolah Menengah Pertama',
    period: '2020 - 2023',
    status: 'Lulus',
    description: 'Aktif dalam ekstrakurikuler Komputer & Pramuka, mengasah kedisiplinan dan rasa ingin tahu di bidang teknologi informasi.',
    activities: ['Anggota OSIS Bidang Teknologi Informasi', 'Peserta Olimpiade Sains Komputer Tingkat Sekolah']
  }
];
