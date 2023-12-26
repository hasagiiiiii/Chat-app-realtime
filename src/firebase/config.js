// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  FacebookAuthProvider,
  connectAuthEmulator,
} from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyACZNtjHLxdqxqVpnbuffonuL8-YX9AqIg",
  authDomain: "chat-app-2d821.firebaseapp.com",
  projectId: "chat-app-2d821",
  storageBucket: "chat-app-2d821.appspot.com",
  messagingSenderId: "431357669268",
  appId: "1:431357669268:web:7aee01ebd63ca796b86981",
  measurementId: "G-F3PPHFVT50",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
if (window.location.hostname === "localhost") {
  connectFirestoreEmulator(db, "127.0.0.1", 8080); // connect to FireStore
}
if (window.location.hostname === "localhost") {
  connectAuthEmulator(auth, "http://127.0.0.1:9099"); // connect to Auth
}
const provider = new FacebookAuthProvider(); // đăng nhập bằng FaceBook
export { auth, provider, db };
