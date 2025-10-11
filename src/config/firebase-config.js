// src/config/firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || 'your-firebase-api-key',
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || 'your-project.firebaseapp.com',
  projectId: process.env.FIREBASE_PROJECT_ID || 'your-project-id',
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'your-project.appspot.com',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: process.env.FIREBASE_APP_ID || '1:123456789:web:abcdef',
  measurementId: process.env.FIREBASE_MEASUREMENT_ID || 'G-XXXXXXXXXX',
};

// Khởi tạo Firebase chỉ khi có API key hợp lệ
let app = null;
let auth = null;
let googleProvider = null;

if (process.env.FIREBASE_API_KEY && process.env.FIREBASE_API_KEY !== 'your-firebase-api-key') {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
  } catch (error) {
    console.warn('Firebase initialization failed:', error.message);
  }
}

export { auth, googleProvider };
