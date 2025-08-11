import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCk1JUnneI2w-yzukcjNbgsaZR9gxUUyS4",
  authDomain: "silverfix-connect.firebaseapp.com",
  projectId: "silverfix-connect",
  storageBucket: "silverfix-connect.appspot.com",
  messagingSenderId: "612183287492",
  appId: "1:612183287492:web:4d004afb54881bb87bcb91",
  measurementId: "G-83604ZQ8MS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };