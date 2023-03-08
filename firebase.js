// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxIYbUFZtojX7q3HY8NbbbCfo9Al0EU7I",
  authDomain: "netflix-project-6a1aa.firebaseapp.com",
  projectId: "netflix-project-6a1aa",
  storageBucket: "netflix-project-6a1aa.appspot.com",
  messagingSenderId: "738133433770",
  appId: "1:738133433770:web:49596cb492be6c85b91fd3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth=getAuth(app);

export {auth};