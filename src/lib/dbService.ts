import { 
  db, 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  getDocs, 
  onSnapshot 
} from './firebase';
import { 
  ProfileData, 
  SkillItem, 
  ProjectItem, 
  CertificateItem, 
  EducationItem, 
  NewsItem 
} from '../types';
import {
  defaultProfile,
  defaultSkills,
  defaultProjects,
  defaultCertificates,
  defaultEducation,
  defaultNews
} from '../data/defaultData';

// Firestore collection & document keys
const PROFILE_DOC = doc(db, 'portfolio_data', 'profile');
const SKILLS_DOC = doc(db, 'portfolio_data', 'skills');
const PROJECTS_DOC = doc(db, 'portfolio_data', 'projects');
const CERTIFICATES_DOC = doc(db, 'portfolio_data', 'certificates');
const EDUCATION_DOC = doc(db, 'portfolio_data', 'education');
const NEWS_DOC = doc(db, 'portfolio_data', 'news');

/**
 * Fetch all collections from Firestore with fallback to localStorage & defaults
 */
export async function loadInitialDataFromFirebase(): Promise<{
  profile: ProfileData;
  skills: SkillItem[];
  projects: ProjectItem[];
  certificates: CertificateItem[];
  education: EducationItem[];
  news: NewsItem[];
  isCloudConnected: boolean;
}> {
  let isCloudConnected = false;
  let profile = defaultProfile;
  let skills = defaultSkills;
  let projects = defaultProjects;
  let certificates = defaultCertificates;
  let education = defaultEducation;
  let news = defaultNews;

  // Check localStorage first as fast cached fallback
  const localProfile = localStorage.getItem('smk_profile_data');
  if (localProfile) {
    try { profile = JSON.parse(localProfile); } catch (e) {}
  }
  const localSkills = localStorage.getItem('smk_skills_data');
  if (localSkills) {
    try { skills = JSON.parse(localSkills); } catch (e) {}
  }
  const localProjects = localStorage.getItem('smk_projects_data');
  if (localProjects) {
    try { projects = JSON.parse(localProjects); } catch (e) {}
  }
  const localCerts = localStorage.getItem('smk_certificates_data');
  if (localCerts) {
    try { certificates = JSON.parse(localCerts); } catch (e) {}
  }
  const localEdu = localStorage.getItem('smk_education_data');
  if (localEdu) {
    try { education = JSON.parse(localEdu); } catch (e) {}
  }
  const localNews = localStorage.getItem('smk_news_data');
  if (localNews) {
    try { news = JSON.parse(localNews); } catch (e) {}
  }

  try {
    // Attempt to read from Firestore
    const [profileSnap, skillsSnap, projectsSnap, certsSnap, eduSnap, newsSnap] = await Promise.all([
      getDoc(PROFILE_DOC),
      getDoc(SKILLS_DOC),
      getDoc(PROJECTS_DOC),
      getDoc(CERTIFICATES_DOC),
      getDoc(EDUCATION_DOC),
      getDoc(NEWS_DOC)
    ]);

    isCloudConnected = true;

    // Profile
    if (profileSnap.exists()) {
      profile = profileSnap.data() as ProfileData;
    } else {
      // Seed default profile to Firestore
      await setDoc(PROFILE_DOC, profile);
    }

    // Skills
    if (skillsSnap.exists() && Array.isArray(skillsSnap.data().items)) {
      skills = skillsSnap.data().items;
    } else {
      await setDoc(SKILLS_DOC, { items: skills });
    }

    // Projects
    if (projectsSnap.exists() && Array.isArray(projectsSnap.data().items)) {
      projects = projectsSnap.data().items;
    } else {
      await setDoc(PROJECTS_DOC, { items: projects });
    }

    // Certificates
    if (certsSnap.exists() && Array.isArray(certsSnap.data().items)) {
      certificates = certsSnap.data().items;
    } else {
      await setDoc(CERTIFICATES_DOC, { items: certificates });
    }

    // Education
    if (eduSnap.exists() && Array.isArray(eduSnap.data().items)) {
      education = eduSnap.data().items;
    } else {
      await setDoc(EDUCATION_DOC, { items: education });
    }

    // News
    if (newsSnap.exists() && Array.isArray(newsSnap.data().items)) {
      news = newsSnap.data().items;
    } else {
      await setDoc(NEWS_DOC, { items: news });
    }

    // Update localStorage cache
    localStorage.setItem('smk_profile_data', JSON.stringify(profile));
    localStorage.setItem('smk_skills_data', JSON.stringify(skills));
    localStorage.setItem('smk_projects_data', JSON.stringify(projects));
    localStorage.setItem('smk_certificates_data', JSON.stringify(certificates));
    localStorage.setItem('smk_education_data', JSON.stringify(education));
    localStorage.setItem('smk_news_data', JSON.stringify(news));
  } catch (error) {
    console.warn('Firebase Firestore fetch warning (using local cache):', error);
  }

  return {
    profile,
    skills,
    projects,
    certificates,
    education,
    news,
    isCloudConnected
  };
}

/**
 * Save Profile Data to Firestore and localStorage
 */
export async function saveProfileData(profile: ProfileData): Promise<boolean> {
  localStorage.setItem('smk_profile_data', JSON.stringify(profile));
  try {
    await setDoc(PROFILE_DOC, profile);
    return true;
  } catch (error) {
    console.error('Error saving profile to Firestore:', error);
    return false;
  }
}

/**
 * Save Skills Data to Firestore and localStorage
 */
export async function saveSkillsData(skills: SkillItem[]): Promise<boolean> {
  localStorage.setItem('smk_skills_data', JSON.stringify(skills));
  try {
    await setDoc(SKILLS_DOC, { items: skills });
    return true;
  } catch (error) {
    console.error('Error saving skills to Firestore:', error);
    return false;
  }
}

/**
 * Save Projects Data to Firestore and localStorage
 */
export async function saveProjectsData(projects: ProjectItem[]): Promise<boolean> {
  localStorage.setItem('smk_projects_data', JSON.stringify(projects));
  try {
    await setDoc(PROJECTS_DOC, { items: projects });
    return true;
  } catch (error) {
    console.error('Error saving projects to Firestore:', error);
    return false;
  }
}

/**
 * Save Certificates Data to Firestore and localStorage
 */
export async function saveCertificatesData(certificates: CertificateItem[]): Promise<boolean> {
  localStorage.setItem('smk_certificates_data', JSON.stringify(certificates));
  try {
    await setDoc(CERTIFICATES_DOC, { items: certificates });
    return true;
  } catch (error) {
    console.error('Error saving certificates to Firestore:', error);
    return false;
  }
}

/**
 * Save Education Data to Firestore and localStorage
 */
export async function saveEducationData(education: EducationItem[]): Promise<boolean> {
  localStorage.setItem('smk_education_data', JSON.stringify(education));
  try {
    await setDoc(EDUCATION_DOC, { items: education });
    return true;
  } catch (error) {
    console.error('Error saving education to Firestore:', error);
    return false;
  }
}

/**
 * Save News / Articles Data to Firestore and localStorage
 */
export async function saveNewsData(news: NewsItem[]): Promise<boolean> {
  localStorage.setItem('smk_news_data', JSON.stringify(news));
  try {
    await setDoc(NEWS_DOC, { items: news });
    return true;
  } catch (error) {
    console.error('Error saving news to Firestore:', error);
    return false;
  }
}

/**
 * Setup Real-time Firestore Listeners
 */
export function subscribeToFirebaseUpdates(callbacks: {
  onProfileUpdate?: (profile: ProfileData) => void;
  onSkillsUpdate?: (skills: SkillItem[]) => void;
  onProjectsUpdate?: (projects: ProjectItem[]) => void;
  onCertificatesUpdate?: (certs: CertificateItem[]) => void;
  onEducationUpdate?: (edu: EducationItem[]) => void;
  onNewsUpdate?: (news: NewsItem[]) => void;
}) {
  const unsubscribes: (() => void)[] = [];

  try {
    if (callbacks.onProfileUpdate) {
      unsubscribes.push(
        onSnapshot(PROFILE_DOC, (docSnap) => {
          if (docSnap.exists()) {
            callbacks.onProfileUpdate!(docSnap.data() as ProfileData);
          }
        }, (err) => console.warn('Profile listener error:', err))
      );
    }

    if (callbacks.onSkillsUpdate) {
      unsubscribes.push(
        onSnapshot(SKILLS_DOC, (docSnap) => {
          if (docSnap.exists() && Array.isArray(docSnap.data()?.items)) {
            callbacks.onSkillsUpdate!(docSnap.data()?.items);
          }
        }, (err) => console.warn('Skills listener error:', err))
      );
    }

    if (callbacks.onProjectsUpdate) {
      unsubscribes.push(
        onSnapshot(PROJECTS_DOC, (docSnap) => {
          if (docSnap.exists() && Array.isArray(docSnap.data()?.items)) {
            callbacks.onProjectsUpdate!(docSnap.data()?.items);
          }
        }, (err) => console.warn('Projects listener error:', err))
      );
    }

    if (callbacks.onCertificatesUpdate) {
      unsubscribes.push(
        onSnapshot(CERTIFICATES_DOC, (docSnap) => {
          if (docSnap.exists() && Array.isArray(docSnap.data()?.items)) {
            callbacks.onCertificatesUpdate!(docSnap.data()?.items);
          }
        }, (err) => console.warn('Certificates listener error:', err))
      );
    }

    if (callbacks.onEducationUpdate) {
      unsubscribes.push(
        onSnapshot(EDUCATION_DOC, (docSnap) => {
          if (docSnap.exists() && Array.isArray(docSnap.data()?.items)) {
            callbacks.onEducationUpdate!(docSnap.data()?.items);
          }
        }, (err) => console.warn('Education listener error:', err))
      );
    }

    if (callbacks.onNewsUpdate) {
      unsubscribes.push(
        onSnapshot(NEWS_DOC, (docSnap) => {
          if (docSnap.exists() && Array.isArray(docSnap.data()?.items)) {
            callbacks.onNewsUpdate!(docSnap.data()?.items);
          }
        }, (err) => console.warn('News listener error:', err))
      );
    }
  } catch (error) {
    console.warn('Realtime subscription error:', error);
  }

  return () => {
    unsubscribes.forEach((unsub) => unsub());
  };
}
