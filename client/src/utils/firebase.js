
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "voxai-e781d.firebaseapp.com",
  projectId: "voxai-e781d",
  storageBucket: "voxai-e781d.firebasestorage.app",
  messagingSenderId: "935404578525",
  appId: "1:935404578525:web:8c58021e19281cb0c49d34"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()


export { auth, provider }