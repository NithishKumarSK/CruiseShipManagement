// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator,setLogLevel} from "firebase/firestore"; // ✅ Add getFirestore
import { getAuth, connectAuthEmulator } from "firebase/auth"; // ✅ Add getAuth
//import { setLogLevel } from "firebase/logger";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmABA0n9qXzyowHDiR-9Yu1vMoEuThtu4",
  authDomain: "cruiseshipmanagement-4769c.firebaseapp.com",
  projectId: "cruiseshipmanagement-4769c",
  storageBucket: "cruiseshipmanagement-4769c.appspot.com", // ✅ Fixed incorrect storageBucket URL
  messagingSenderId: "93844080628",
  appId: "1:93844080628:web:cd807094687a1ffcad5ba1",
  measurementId: "G-BBGLCGV9EV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // ✅ No longer undefined
const auth = getAuth(app); // ✅ No longer undefined

// Enable Firebase emulators if in development mode
if (process.env.NODE_ENV === "emu") {
  connectFirestoreEmulator(db, "localhost", 8080);
  connectAuthEmulator(auth, "localhost", 9099);
}
setLogLevel("debug");
export { db, auth };
