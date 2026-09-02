import { ProfileData, SkillItem, ProjectItem, CertificateItem, EducationItem } from '../types';

export function generateSingleFileHtml(
  profile: ProfileData,
  skills: SkillItem[],
  projects: ProjectItem[],
  certificates: CertificateItem[],
  education: EducationItem[]
): string {
  const hardSkillsFrontend = skills.filter((s) => s.category === 'frontend');
  const hardSkillsBackend = skills.filter((s) => s.category === 'backend');
  const hardSkillsTools = skills.filter((s) => s.category === 'tools');
  const softSkills = skills.filter((s) => s.category === 'softskill');

  return `<!DOCTYPE html>
<html lang="id" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portofolio ${profile.fullName} | Siswa SMK ${profile.school}</title>
  <meta name="description" content="Portofolio pribadi ${profile.fullName}, siswa ${profile.major} di ${profile.school}. Siap PKL / Magang & Kerja.">
  
  <!-- GOOGLE FONTS -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Poppins:wght@500;600;700;800&display=swap" rel="stylesheet">
  
  <!-- FONT AWESOME ICONS -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

  <style>
    /* ==========================================================================
       RESET & ROOT VARIABLES (Ubah warna tema di sini dengan mudah)
       ========================================================================== */
    :root {
      --primary: #2563eb;         /* Warna Biru Utama */
      --primary-dark: #1d4ed8;    /* Warna Biru Gelap saat Hover */
      --primary-light: #dbeafe;   /* Warna Biru Muda */
      --secondary: #0ea5e9;       /* Warna Aksen Cyan/Sky */
      --accent: #6366f1;          /* Warna Aksen Indigo */
      --success: #10b981;         /* Warna Hijau Status */
      
      --bg-body: #f8fafc;         /* Background Halaman Terang */
      --bg-card: #ffffff;         /* Background Kartu */
      --bg-card-subtle: #f1f5f9;  /* Background Sub-elemen */
      --text-main: #0f172a;       /* Teks Utama Gelap */
      --text-muted: #64748b;      /* Teks Keterangan Abu-abu */
      --border-color: #e2e8f0;    /* Garis Batas */
      --shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
      --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.08), 0 2px 4px -2px rgba(0,0,0,0.05);
      --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.05);
      --shadow-hover: 0 20px 25px -5px rgba(37,99,235,0.15);
      --radius-sm: 8px;
      --radius-md: 12px;
      --radius-lg: 18px;
      --radius-full: 9999px;
      --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* MODE GELAP (DARK MODE) */
    body.dark-mode {
      --bg-body: #090d16;
      --bg-card: #111827;
      --bg-card-subtle: #1f2937;
      --text-main: #f9fafb;
      --text-muted: #9ca3af;
      --border-color: #1f2937;
      --primary-light: rgba(37, 99, 235, 0.2);
      --shadow-sm: 0 1px 3px rgba(0,0,0,0.4);
      --shadow-md: 0 4px 10px rgba(0,0,0,0.3);
      --shadow-lg: 0 10px 25px rgba(0,0,0,0.5);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background-color: var(--bg-body);
      color: var(--text-main);
      line-height: 1.6;
      overflow-x: hidden;
      transition: background-color 0.3s ease, color 0.3s ease;
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: 'Poppins', sans-serif;
      color: var(--text-main);
      font-weight: 700;
      line-height: 1.25;
    }

    a {
      text-decoration: none;
      color: inherit;
    }

    img {
      max-width: 100%;
      height: auto;
      display: block;
    }

    .container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
    }

    .section {
      padding: 90px 0;
    }

    .section-title-wrap {
      text-align: center;
      max-width: 680px;
      margin: 0 auto 50px auto;
    }

    .section-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      background: var(--primary-light);
      color: var(--primary);
      border-radius: var(--radius-full);
      font-size: 0.85rem;
      font-weight: 700;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      margin-bottom: 12px;
    }

    .section-title {
      font-size: 2.25rem;
      margin-bottom: 14px;
    }

    .section-desc {
      color: var(--text-muted);
      font-size: 1.05rem;
    }

    /* ==========================================================================
       BUTTONS & CTA
       ========================================================================== */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 12px 26px;
      font-size: 0.95rem;
      font-weight: 600;
      border-radius: var(--radius-md);
      cursor: pointer;
      border: 1px solid transparent;
      transition: var(--transition);
      white-space: nowrap;
    }

    .btn-primary {
      background-color: var(--primary);
      color: #ffffff;
      box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);
    }
    .btn-primary:hover {
      background-color: var(--primary-dark);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(37, 99, 235, 0.45);
    }

    .btn-secondary {
      background-color: var(--bg-card);
      color: var(--text-main);
      border-color: var(--border-color);
    }
    .btn-secondary:hover {
      border-color: var(--primary);
      color: var(--primary);
      transform: translateY(-2px);
    }

    .btn-whatsapp {
      background-color: #25d366;
      color: #ffffff;
    }
    .btn-whatsapp:hover {
      background-color: #20ba5a;
      transform: translateY(-2px);
    }

    /* ==========================================================================
       NAVBAR (STICKY)
       ========================================================================== */
    .navbar {
      position: sticky;
      top: 0;
      left: 0;
      width: 100%;
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border-color);
      z-index: 1000;
      transition: var(--transition);
    }
    body.dark-mode .navbar {
      background: rgba(17, 24, 39, 0.85);
    }

    .nav-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 72px;
    }

    .nav-logo {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 800;
      font-size: 1.3rem;
      color: var(--text-main);
    }
    .nav-logo-badge {
      width: 38px;
      height: 38px;
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      color: #ffffff;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
    }

    .nav-menu {
      display: flex;
      align-items: center;
      gap: 28px;
      list-style: none;
    }

    .nav-link {
      font-weight: 600;
      font-size: 0.95rem;
      color: var(--text-muted);
      transition: var(--transition);
      position: relative;
    }
    .nav-link:hover, .nav-link.active {
      color: var(--primary);
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .theme-toggle-btn {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      border: 1px solid var(--border-color);
      background: var(--bg-card);
      color: var(--text-main);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 1.1rem;
      transition: var(--transition);
    }
    .theme-toggle-btn:hover {
      border-color: var(--primary);
      color: var(--primary);
    }

    .mobile-menu-toggle {
      display: none;
      font-size: 1.4rem;
      background: none;
      border: none;
      color: var(--text-main);
      cursor: pointer;
    }

    /* ==========================================================================
       HERO SECTION
       ========================================================================== */
    .hero {
      padding: 100px 0 80px 0;
      position: relative;
      overflow: hidden;
    }

    .hero-grid {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 60px;
      align-items: center;
    }

    .hero-status-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      background: #dcfce7;
      color: #166534;
      border-radius: var(--radius-full);
      font-size: 0.85rem;
      font-weight: 700;
      margin-bottom: 20px;
      border: 1px solid #bbf7d0;
    }
    body.dark-mode .hero-status-pill {
      background: rgba(16, 185, 129, 0.15);
      color: #34d399;
      border-color: rgba(16, 185, 129, 0.3);
    }

    .hero-name {
      font-size: 3.2rem;
      margin-bottom: 12px;
      background: linear-gradient(135deg, var(--text-main) 40%, var(--primary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .hero-role {
      font-size: 1.4rem;
      color: var(--primary);
      font-weight: 600;
      margin-bottom: 18px;
    }

    .hero-bio {
      color: var(--text-muted);
      font-size: 1.1rem;
      margin-bottom: 32px;
      max-width: 580px;
    }

    .hero-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      margin-bottom: 40px;
    }

    .hero-stats {
      display: flex;
      gap: 30px;
      padding-top: 24px;
      border-top: 1px solid var(--border-color);
    }

    .stat-item h4 {
      font-size: 1.8rem;
      color: var(--primary);
    }
    .stat-item p {
      font-size: 0.85rem;
      color: var(--text-muted);
      font-weight: 500;
    }

    .hero-visual {
      position: relative;
      display: flex;
      justify-content: center;
    }

    .hero-img-card {
      position: relative;
      width: 320px;
      height: 380px;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: var(--shadow-lg);
      border: 6px solid var(--bg-card);
    }
    .hero-img-card img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .floating-tech-badge {
      position: absolute;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      padding: 8px 14px;
      border-radius: var(--radius-full);
      box-shadow: var(--shadow-md);
      font-size: 0.85rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--text-main);
      animation: float 4s ease-in-out infinite;
    }
    .badge-top-left { top: -10px; left: -20px; animation-delay: 0s; }
    .badge-bottom-right { bottom: 10px; right: -20px; animation-delay: 2s; }

    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }

    /* ==========================================================================
       ABOUT ME SECTION
       ========================================================================== */
    .about-grid {
      display: grid;
      grid-template-columns: 0.9fr 1.1fr;
      gap: 50px;
      align-items: center;
    }

    .about-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 32px;
      box-shadow: var(--shadow-md);
    }

    .about-info-row {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px dashed var(--border-color);
      font-size: 0.95rem;
    }
    .about-info-row:last-child {
      border-bottom: none;
    }
    .info-label {
      color: var(--text-muted);
      font-weight: 600;
    }
    .info-value {
      color: var(--text-main);
      font-weight: 700;
      text-align: right;
    }

    .about-story p {
      color: var(--text-muted);
      margin-bottom: 16px;
      font-size: 1rem;
    }

    .pillars-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-top: 24px;
    }

    .pillar-card {
      background: var(--bg-card-subtle);
      padding: 16px;
      border-radius: var(--radius-md);
      border: 1px solid var(--border-color);
    }
    .pillar-card h4 {
      font-size: 1rem;
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--primary);
    }
    .pillar-card p {
      font-size: 0.85rem;
      color: var(--text-muted);
      margin-bottom: 0;
    }

    /* ==========================================================================
       SKILLS SECTION
       ========================================================================== */
    .skills-category-tabs {
      display: flex;
      justify-content: center;
      gap: 12px;
      margin-bottom: 40px;
      flex-wrap: wrap;
    }

    .tab-btn {
      padding: 10px 22px;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-full);
      font-weight: 600;
      color: var(--text-muted);
      cursor: pointer;
      transition: var(--transition);
    }
    .tab-btn.active, .tab-btn:hover {
      background: var(--primary);
      color: #ffffff;
      border-color: var(--primary);
    }

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
    }

    .skill-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 20px;
      box-shadow: var(--shadow-sm);
      transition: var(--transition);
    }
    .skill-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-md);
      border-color: var(--primary);
    }

    .skill-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }
    .skill-name {
      font-weight: 700;
      font-size: 1.05rem;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .skill-badge {
      font-size: 0.75rem;
      padding: 3px 10px;
      border-radius: var(--radius-full);
      background: var(--primary-light);
      color: var(--primary);
      font-weight: 700;
    }

    .skill-progress-wrap {
      background: var(--bg-card-subtle);
      height: 8px;
      border-radius: var(--radius-full);
      overflow: hidden;
      margin-bottom: 8px;
    }
    .skill-progress-bar {
      height: 100%;
      background: linear-gradient(90deg, var(--primary), var(--secondary));
      border-radius: var(--radius-full);
      transition: width 1s ease-in-out;
    }

    .skill-desc {
      font-size: 0.85rem;
      color: var(--text-muted);
    }

    /* ==========================================================================
       PROJECTS SECTION
       ========================================================================== */
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: 30px;
    }

    .project-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-md);
      display: flex;
      flex-direction: column;
      transition: var(--transition);
    }
    .project-card:hover {
      transform: translateY(-6px);
      box-shadow: var(--shadow-hover);
      border-color: var(--primary);
    }

    .project-img-wrap {
      position: relative;
      height: 210px;
      overflow: hidden;
    }
    .project-img-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    .project-card:hover .project-img-wrap img {
      transform: scale(1.05);
    }

    .project-category-tag {
      position: absolute;
      top: 14px;
      left: 14px;
      background: rgba(15, 23, 42, 0.85);
      color: #ffffff;
      padding: 4px 12px;
      border-radius: var(--radius-full);
      font-size: 0.75rem;
      font-weight: 700;
      backdrop-filter: blur(4px);
    }

    .project-content {
      padding: 24px;
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .project-title {
      font-size: 1.25rem;
      margin-bottom: 10px;
    }

    .project-desc {
      font-size: 0.9rem;
      color: var(--text-muted);
      margin-bottom: 18px;
      flex: 1;
    }

    .project-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 20px;
    }
    .tech-tag {
      font-size: 0.75rem;
      padding: 3px 9px;
      background: var(--bg-card-subtle);
      border-radius: var(--radius-sm);
      color: var(--text-muted);
      font-weight: 600;
      border: 1px solid var(--border-color);
    }

    .project-actions {
      display: flex;
      gap: 10px;
    }
    .project-actions .btn {
      flex: 1;
      padding: 9px 14px;
      font-size: 0.85rem;
    }

    /* ==========================================================================
       CERTIFICATES & ACHIEVEMENTS
       ========================================================================== */
    .cert-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
      gap: 24px;
    }

    .cert-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 20px;
      box-shadow: var(--shadow-sm);
      transition: var(--transition);
      display: flex;
      flex-direction: column;
    }
    .cert-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-md);
      border-color: var(--primary);
    }

    .cert-img-box {
      height: 150px;
      border-radius: var(--radius-sm);
      overflow: hidden;
      margin-bottom: 16px;
      background: var(--bg-card-subtle);
    }
    .cert-img-box img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .cert-issuer {
      font-size: 0.8rem;
      color: var(--primary);
      font-weight: 700;
      text-transform: uppercase;
      margin-bottom: 4px;
    }

    .cert-title {
      font-size: 1.05rem;
      margin-bottom: 8px;
    }

    .cert-meta {
      font-size: 0.8rem;
      color: var(--text-muted);
      margin-bottom: 12px;
    }

    /* ==========================================================================
       CONTACT SECTION
       ========================================================================== */
    .contact-grid {
      display: grid;
      grid-template-columns: 0.8fr 1.2fr;
      gap: 40px;
    }

    .contact-info-cards {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .contact-item-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 18px 20px;
      display: flex;
      align-items: center;
      gap: 16px;
      box-shadow: var(--shadow-sm);
    }
    .contact-icon-box {
      width: 46px;
      height: 46px;
      background: var(--primary-light);
      color: var(--primary);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      flex-shrink: 0;
    }

    .contact-form-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 36px;
      box-shadow: var(--shadow-md);
    }

    .form-group {
      margin-bottom: 18px;
    }
    .form-label {
      display: block;
      font-size: 0.9rem;
      font-weight: 600;
      margin-bottom: 8px;
      color: var(--text-main);
    }
    .form-input, .form-textarea {
      width: 100%;
      padding: 12px 16px;
      border-radius: var(--radius-md);
      border: 1px solid var(--border-color);
      background: var(--bg-card-subtle);
      color: var(--text-main);
      font-family: inherit;
      font-size: 0.95rem;
      outline: none;
      transition: var(--transition);
    }
    .form-input:focus, .form-textarea:focus {
      border-color: var(--primary);
      background: var(--bg-card);
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
    }
    .form-textarea {
      resize: vertical;
      min-height: 120px;
    }

    /* ==========================================================================
       FOOTER
       ========================================================================== */
    .footer {
      background: var(--bg-card);
      border-top: 1px solid var(--border-color);
      padding: 40px 0 25px 0;
      text-align: center;
    }
    .footer-socials {
      display: flex;
      justify-content: center;
      gap: 16px;
      margin-bottom: 20px;
    }
    .social-btn {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--bg-card-subtle);
      border: 1px solid var(--border-color);
      color: var(--text-main);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      transition: var(--transition);
    }
    .social-btn:hover {
      background: var(--primary);
      color: #ffffff;
      border-color: var(--primary);
      transform: translateY(-3px);
    }

    .footer-text {
      color: var(--text-muted);
      font-size: 0.9rem;
    }

    /* ==========================================================================
       RESPONSIVE DESIGN (MEDIA QUERIES)
       ========================================================================== */
    @media (max-width: 992px) {
      .hero-grid, .about-grid, .contact-grid {
        grid-template-columns: 1fr;
      }
      .hero-visual {
        order: -1;
      }
      .hero-name {
        font-size: 2.5rem;
      }
    }

    @media (max-width: 768px) {
      .nav-menu {
        position: fixed;
        top: 72px;
        left: -100%;
        width: 100%;
        background: var(--bg-card);
        flex-direction: column;
        padding: 30px;
        border-bottom: 1px solid var(--border-color);
        box-shadow: var(--shadow-lg);
        transition: left 0.3s ease;
      }
      .nav-menu.open {
        left: 0;
      }
      .mobile-menu-toggle {
        display: block;
      }
      .section-title {
        font-size: 1.8rem;
      }
      .pillars-grid {
        grid-template-columns: 1fr;
      }
      .hero-stats {
        flex-wrap: wrap;
        gap: 16px;
      }
    }
  </style>
</head>
<body>

  <!-- ==========================================================================
       1. NAVBAR STICKY
       ========================================================================== -->
  <header class="navbar" id="navbar">
    <div class="container nav-container">
      <a href="#beranda" class="nav-logo">
        <div class="nav-logo-badge">
          <i class="fa-solid fa-code"></i>
        </div>
        <span>${profile.nickname || profile.fullName.split(' ')[0]}.Dev</span>
      </a>

      <ul class="nav-menu" id="navMenu">
        <li><a href="#beranda" class="nav-link active">Beranda</a></li>
        <li><a href="#tentang" class="nav-link">Tentang</a></li>
        <li><a href="#skill" class="nav-link">Skill</a></li>
        <li><a href="#proyek" class="nav-link">Proyek</a></li>
        <li><a href="#sertifikat" class="nav-link">Sertifikat</a></li>
        <li><a href="#kontak" class="nav-link">Kontak</a></li>
      </ul>

      <div class="nav-actions">
        <!-- Tombol Toggle Dark/Light Mode -->
        <button class="theme-toggle-btn" id="themeToggleBtn" title="Ganti Mode Gelap / Terang">
          <i class="fa-solid fa-moon" id="themeIcon"></i>
        </button>
        
        <!-- Tombol WhatsApp Langsung -->
        <a href="https://wa.me/${profile.whatsapp}?text=Halo%20${encodeURIComponent(profile.fullName)},%20saya%20melihat%20portofolio%20Anda." target="_blank" class="btn btn-primary" style="padding: 9px 18px; font-size: 0.85rem;">
          <i class="fa-brands fa-whatsapp"></i> Chat WA
        </a>

        <!-- Hamburger Menu Mobile -->
        <button class="mobile-menu-toggle" id="mobileMenuToggle" aria-label="Buka Menu">
          <i class="fa-solid fa-bars"></i>
        </button>
      </div>
    </div>
  </header>

  <main>
    <!-- ==========================================================================
         2. HERO SECTION
         ========================================================================== -->
    <section class="hero" id="beranda">
      <div class="container">
        <div class="hero-grid">
          <!-- Kolom Teks Pengenalan -->
          <div class="hero-content">
            <div class="hero-status-pill">
              <i class="fa-solid fa-circle-check"></i> ${profile.statusPkl}
            </div>
            
            <h1 class="hero-name">${profile.fullName}</h1>
            <div class="hero-role">
              <span>${profile.major} • ${profile.school}</span>
            </div>

            <p class="hero-bio">${profile.bio}</p>

            <div class="hero-buttons">
              <a href="#proyek" class="btn btn-primary">
                <i class="fa-solid fa-laptop-code"></i> Lihat Proyek
              </a>
              <a href="#kontak" class="btn btn-secondary">
                <i class="fa-solid fa-paper-plane"></i> Hubungi Saya
              </a>
              <a href="https://wa.me/${profile.whatsapp}" target="_blank" class="btn btn-whatsapp">
                <i class="fa-brands fa-whatsapp"></i> WhatsApp
              </a>
            </div>

            <!-- Statistik Singkat -->
            <div class="hero-stats">
              <div class="stat-item">
                <h4>${profile.stats.projectsCount}+</h4>
                <p>Proyek Selesai</p>
              </div>
              <div class="stat-item">
                <h4>${profile.stats.certificatesCount}+</h4>
                <p>Sertifikat Keahlian</p>
              </div>
              <div class="stat-item">
                <h4>${profile.stats.yearsCoding} Thn</h4>
                <p>Belajar Coding</p>
              </div>
              <div class="stat-item">
                <h4>100%</h4>
                <p>Siap PKL / Magang</p>
              </div>
            </div>
          </div>

          <!-- Kolom Foto Profil & Hiasan -->
          <div class="hero-visual">
            <div class="hero-img-card">
              <img src="${profile.avatarUrl}" alt="Foto Profil ${profile.fullName}">
            </div>

            <!-- Floating Tech Badges -->
            <div class="floating-tech-badge badge-top-left">
              <i class="fa-brands fa-react" style="color: #0284c7;"></i>
              <span>React & Tailwind</span>
            </div>
            <div class="floating-tech-badge badge-bottom-right">
              <i class="fa-solid fa-check-double" style="color: #16a34a;"></i>
              <span>Siap Magang SMK</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==========================================================================
         3. TENTANG SAYA SECTION
         ========================================================================== -->
    <section class="section" id="tentang">
      <div class="container">
        <div class="section-title-wrap">
          <span class="section-badge"><i class="fa-regular fa-user"></i> Biodata</span>
          <h2 class="section-title">Tentang Saya</h2>
          <p class="section-desc">Mengenal latar belakang pendidikan, minat keahlian, dan motivasi belajar saya.</p>
        </div>

        <div class="about-grid">
          <!-- Kartu Info Pribadi -->
          <div class="about-card">
            <h3 style="margin-bottom: 20px; font-size: 1.3rem;">Informasi Singkat</h3>
            <div class="about-info-row">
              <span class="info-label">Nama Lengkap</span>
              <span class="info-value">${profile.fullName}</span>
            </div>
            <div class="about-info-row">
              <span class="info-label">Sekolah</span>
              <span class="info-value">${profile.school}</span>
            </div>
            <div class="about-info-row">
              <span class="info-label">Jurusan</span>
              <span class="info-value">${profile.major}</span>
            </div>
            <div class="about-info-row">
              <span class="info-label">Domisili</span>
              <span class="info-value">${profile.location}</span>
            </div>
            <div class="about-info-row">
              <span class="info-label">Status</span>
              <span class="info-value" style="color: #10b981;">Siap Magang / PKL</span>
            </div>
            <div class="about-info-row">
              <span class="info-label">Email</span>
              <span class="info-value">${profile.email}</span>
            </div>
          </div>

          <!-- Cerita & Nilai Tambah -->
          <div class="about-story">
            <h3 style="margin-bottom: 16px; font-size: 1.5rem;">Antusias Membangun Solusi Digital</h3>
            ${profile.aboutStory.map((paragraph) => `<p>${paragraph}</p>`).join('\n            ')}

            <div class="pillars-grid">
              <div class="pillar-card">
                <h4><i class="fa-solid fa-bolt"></i> Cepat Belajar</h4>
                <p>Mudah memahami materi dan alur kerja baru di industri.</p>
              </div>
              <div class="pillar-card">
                <h4><i class="fa-solid fa-people-group"></i> Kerja Tim</h4>
                <p>Terbiasa kolaborasi tugas kelompok dan komunikasi santun.</p>
              </div>
              <div class="pillar-card">
                <h4><i class="fa-solid fa-code-branch"></i> Git Workflow</h4>
                <p>Memahami dasar version control untuk manajemen kode.</p>
              </div>
              <div class="pillar-card">
                <h4><i class="fa-solid fa-clock"></i> Disiplin Waktu</h4>
                <p>Berkomitmen menyelesaikan target pekerjaan tepat waktu.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==========================================================================
         4. SKILL SECTION
         ========================================================================== -->
    <section class="section" id="skill" style="background: var(--bg-card-subtle);">
      <div class="container">
        <div class="section-title-wrap">
          <span class="section-badge"><i class="fa-solid fa-gears"></i> Keahlian</span>
          <h2 class="section-title">Skill & Kompetensi Keahlian</h2>
          <p class="section-desc">Penguasaan teknologi teknis (Hard Skills) serta sikap kerja (Soft Skills) yang saya miliki.</p>
        </div>

        <h3 style="margin-bottom: 20px; font-size: 1.3rem;"><i class="fa-solid fa-code" style="color: var(--primary);"></i> Frontend Development</h3>
        <div class="skills-grid" style="margin-bottom: 40px;">
          ${hardSkillsFrontend.map((s) => `
          <div class="skill-card">
            <div class="skill-header">
              <span class="skill-name">${s.name}</span>
              <span class="skill-badge">${s.level}%</span>
            </div>
            <div class="skill-progress-wrap">
              <div class="skill-progress-bar" style="width: ${s.level}%;"></div>
            </div>
            <p class="skill-desc">${s.description || ''}</p>
          </div>
          `).join('')}
        </div>

        <h3 style="margin-bottom: 20px; font-size: 1.3rem;"><i class="fa-solid fa-server" style="color: var(--primary);"></i> Backend & Database</h3>
        <div class="skills-grid" style="margin-bottom: 40px;">
          ${hardSkillsBackend.map((s) => `
          <div class="skill-card">
            <div class="skill-header">
              <span class="skill-name">${s.name}</span>
              <span class="skill-badge">${s.level}%</span>
            </div>
            <div class="skill-progress-wrap">
              <div class="skill-progress-bar" style="width: ${s.level}%;"></div>
            </div>
            <p class="skill-desc">${s.description || ''}</p>
          </div>
          `).join('')}
        </div>

        <h3 style="margin-bottom: 20px; font-size: 1.3rem;"><i class="fa-solid fa-screwdriver-wrench" style="color: var(--primary);"></i> Tools & Soft Skills</h3>
        <div class="skills-grid">
          ${[...hardSkillsTools, ...softSkills].map((s) => `
          <div class="skill-card">
            <div class="skill-header">
              <span class="skill-name">${s.name}</span>
              <span class="skill-badge">${s.badge}</span>
            </div>
            <div class="skill-progress-wrap">
              <div class="skill-progress-bar" style="width: ${s.level}%;"></div>
            </div>
            <p class="skill-desc">${s.description || ''}</p>
          </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- ==========================================================================
         5. PROYEK / PORTOFOLIO SECTION
         ========================================================================== -->
    <section class="section" id="proyek">
      <div class="container">
        <div class="section-title-wrap">
          <span class="section-badge"><i class="fa-solid fa-folder-open"></i> Hasil Karya</span>
          <h2 class="section-title">Portofolio & Proyek</h2>
          <p class="section-desc">Kumpulan aplikasi web dan proyek yang telah saya kembangkan selama belajar di SMK.</p>
        </div>

        <div class="projects-grid">
          ${projects.map((p) => `
          <div class="project-card">
            <div class="project-img-wrap">
              <img src="${p.image}" alt="${p.title}">
              <span class="project-category-tag">${p.category}</span>
            </div>
            <div class="project-content">
              <h3 class="project-title">${p.title}</h3>
              <p class="project-desc">${p.description}</p>
              
              <div class="project-tags">
                ${p.tags.map((tag) => `<span class="tech-tag">${tag}</span>`).join('')}
              </div>

              <div class="project-actions">
                ${p.githubUrl ? `
                <a href="${p.githubUrl}" target="_blank" class="btn btn-secondary">
                  <i class="fa-brands fa-github"></i> GitHub
                </a>` : ''}
                <a href="https://wa.me/${profile.whatsapp}?text=Halo%20${encodeURIComponent(profile.fullName)},%20saya%20tertarik%20dengan%20proyek%20${encodeURIComponent(p.title)}" target="_blank" class="btn btn-primary">
                  <i class="fa-solid fa-comment-dots"></i> Tanya Proyek
                </a>
              </div>
            </div>
          </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- ==========================================================================
         6. SERTIFIKAT & PRESTASI SECTION
         ========================================================================== -->
    <section class="section" id="sertifikat" style="background: var(--bg-card-subtle);">
      <div class="container">
        <div class="section-title-wrap">
          <span class="section-badge"><i class="fa-solid fa-award"></i> Penghargaan</span>
          <h2 class="section-title">Sertifikat & Prestasi</h2>
          <p class="section-desc">Bukti pencapaian kompetensi dari kursus online terakreditasi, sertifikasi, dan perlombaan.</p>
        </div>

        <div class="cert-grid">
          ${certificates.map((c) => `
          <div class="cert-card">
            <div class="cert-img-box">
              <img src="${c.image}" alt="${c.title}">
            </div>
            <div class="cert-issuer">${c.issuer}</div>
            <h3 class="cert-title">${c.title}</h3>
            <p class="cert-meta"><i class="fa-regular fa-calendar"></i> ${c.date} • ID: ${c.credentialId}</p>
            <div class="project-tags" style="margin-top: auto;">
              ${c.skillsGained.map((sk) => `<span class="tech-tag">${sk}</span>`).join('')}
            </div>
          </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- ==========================================================================
         7. KONTAK SECTION
         ========================================================================== -->
    <section class="section" id="kontak">
      <div class="container">
        <div class="section-title-wrap">
          <span class="section-badge"><i class="fa-regular fa-envelope"></i> Hubungi</span>
          <h2 class="section-title">Mari Terhubung</h2>
          <p class="section-desc">Tertarik untuk menerima saya sebagai peserta PKL / Magang atau bekerja sama? Silakan hubungi saya.</p>
        </div>

        <div class="contact-grid">
          <!-- Info Kontak Langsung -->
          <div class="contact-info-cards">
            <div class="contact-item-card">
              <div class="contact-icon-box"><i class="fa-solid fa-envelope"></i></div>
              <div>
                <h4 style="font-size: 1rem; margin-bottom: 2px;">Email</h4>
                <a href="mailto:${profile.email}" style="color: var(--primary); font-size: 0.95rem;">${profile.email}</a>
              </div>
            </div>

            <div class="contact-item-card">
              <div class="contact-icon-box" style="background: rgba(37,211,102,0.15); color: #25d366;"><i class="fa-brands fa-whatsapp"></i></div>
              <div>
                <h4 style="font-size: 1rem; margin-bottom: 2px;">WhatsApp / Telepon</h4>
                <a href="https://wa.me/${profile.whatsapp}" target="_blank" style="color: var(--text-muted); font-size: 0.95rem;">+${profile.whatsapp}</a>
              </div>
            </div>

            <div class="contact-item-card">
              <div class="contact-icon-box"><i class="fa-solid fa-location-dot"></i></div>
              <div>
                <h4 style="font-size: 1rem; margin-bottom: 2px;">Lokasi</h4>
                <p style="color: var(--text-muted); font-size: 0.95rem;">${profile.location}</p>
              </div>
            </div>

            <div class="contact-item-card">
              <div class="contact-icon-box"><i class="fa-solid fa-graduation-cap"></i></div>
              <div>
                <h4 style="font-size: 1rem; margin-bottom: 2px;">Sekolah</h4>
                <p style="color: var(--text-muted); font-size: 0.95rem;">${profile.school} (${profile.major})</p>
              </div>
            </div>
          </div>

          <!-- Formulir Kontak Cepat (Langsung Direct ke WhatsApp) -->
          <div class="contact-form-card">
            <h3 style="margin-bottom: 20px; font-size: 1.3rem;">Kirim Pesan Cepat</h3>
            <form id="contactForm" onsubmit="handleContactSubmit(event)">
              <div class="form-group">
                <label class="form-label">Nama Anda / Perusahaan</label>
                <input type="text" id="senderName" class="form-input" placeholder="Contoh: HRD PT. Teknologi Digital" required>
              </div>
              <div class="form-group">
                <label class="form-label">Email atau Nomor WhatsApp Anda</label>
                <input type="text" id="senderContact" class="form-input" placeholder="email@perusahaan.com atau 0812xxxx" required>
              </div>
              <div class="form-group">
                <label class="form-label">Pesan / Tawaran PKL</label>
                <textarea id="senderMessage" class="form-textarea" placeholder="Tuliskan pesan atau penawaran magang di sini..." required></textarea>
              </div>
              <button type="submit" class="btn btn-primary" style="width: 100%;">
                <i class="fa-solid fa-paper-plane"></i> Kirim Pesan via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- ==========================================================================
       8. FOOTER
       ========================================================================== -->
  <footer class="footer">
    <div class="container">
      <div class="footer-socials">
        <a href="${profile.github}" target="_blank" class="social-btn" title="GitHub"><i class="fa-brands fa-github"></i></a>
        <a href="${profile.linkedin}" target="_blank" class="social-btn" title="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
        <a href="${profile.instagram}" target="_blank" class="social-btn" title="Instagram"><i class="fa-brands fa-instagram"></i></a>
        <a href="mailto:${profile.email}" class="social-btn" title="Email"><i class="fa-solid fa-envelope"></i></a>
      </div>
      <p class="footer-text">
        © <span id="currentYear"></span> <strong>${profile.fullName}</strong> — Siswa ${profile.school}. Hak Cipta Dilindungi.
      </p>
    </div>
  </footer>

  <!-- ==========================================================================
       JAVASCRIPT LOGIC (Dark Mode, Mobile Menu, Form WhatsApp, Scroll Active)
       ========================================================================== -->
  <script>
    // 1. Set Tahun Otomatis di Footer
    document.getElementById('currentYear').innerText = new Date().getFullYear();

    // 2. Dark / Light Mode Toggle
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeIcon = document.getElementById('themeIcon');
    
    // Cek preferensi tersimpan
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-mode');
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    }

    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      
      if (isDark) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
      } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
      }
    });

    // 3. Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');

    mobileMenuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileMenuToggle.querySelector('i');
      if (navMenu.classList.contains('open')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });

    // Tutup mobile menu saat link diklik
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = mobileMenuToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });

    // 4. Form Kontak ke WhatsApp
    function handleContactSubmit(event) {
      event.preventDefault();
      const name = document.getElementById('senderName').value;
      const contact = document.getElementById('senderContact').value;
      const message = document.getElementById('senderMessage').value;
      
      const whatsappNumber = "${profile.whatsapp}";
      const text = \`Halo ${profile.fullName},\\n\\nPerkenalkan saya: *\${name}*\\nKontak: \${contact}\\n\\nPesan:\\n\${message}\\n\\n(Dikirim dari Website Portofolio Siswa SMK)\`;
      
      const waUrl = \`https://wa.me/\${whatsappNumber}?text=\${encodeURIComponent(text)}\`;
      window.open(waUrl, '_blank');
    }
  </script>
</body>
</html>`;
}
