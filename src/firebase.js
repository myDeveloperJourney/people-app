// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { 
  signOut,
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged
 } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDR1L1301BejByrJklKjfOEwuvcGPyGdIc',
  authDomain: 'people-app-3b369.firebaseapp.com',
  projectId: 'people-app-3b369',
  storageBucket: 'people-app-3b369.appspot.com',
  messagingSenderId: '721846502722',
  appId: '1:721846502722:web:4b07583c1f3af58d3474db'
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Initialize our provider
const provider = new GoogleAuthProvider();

// Initialize a reference to our auth object
// TODO: why do we pass a ref to app? const auth = getAuth(app);
const auth = getAuth();

function login() {
    return signInWithPopup(auth, provider);
}

function logout() {
    return signOut(auth);
}

export { 
    auth, 
    login, 
    logout,
    onAuthStateChanged 
  }