import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBtlipfrbktGmVJyuZ_JgfOss_81LG4tDQ",
  authDomain: "local-household-service-client.firebaseapp.com",
  projectId: "local-household-service-client",
  storageBucket: "local-household-service-client.firebasestorage.app",
  messagingSenderId: "503333993185",
  appId: "1:503333993185:web:9918dd63c86743641755a0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();