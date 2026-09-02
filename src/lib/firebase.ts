import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { 
  getFirestore, 
  Firestore, 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  deleteDoc, 
  onSnapshot 
} from 'firebase/firestore';
import firebaseConfigJson from '../../firebase-applet-config.json';

const firebaseConfig = {
  projectId: firebaseConfigJson.projectId || 'clever-oasis-6cjpc',
  appId: firebaseConfigJson.appId || '1:984138051782:web:52becfd92cfd1cf03be7c7',
  apiKey: firebaseConfigJson.apiKey || 'AIzaSyBHhO5L4tAYsp2k5Ab7sAkGH8Sad9odqqw',
  authDomain: firebaseConfigJson.authDomain || 'clever-oasis-6cjpc.firebaseapp.com',
  firestoreDatabaseId: firebaseConfigJson.firestoreDatabaseId || 'ai-studio-portofoliosiswas-3f5a61c5-bebe-4f44-ae60-60c5fdca863b',
  storageBucket: firebaseConfigJson.storageBucket || 'clever-oasis-6cjpc.firebasestorage.app',
  messagingSenderId: firebaseConfigJson.messagingSenderId || '984138051782'
};

// Initialize Firebase App
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Initialize Firestore with custom databaseId
export const db: Firestore = firebaseConfig.firestoreDatabaseId 
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

export { firebaseConfig, app };
export { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  deleteDoc, 
  onSnapshot 
};
