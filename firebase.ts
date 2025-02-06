import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: "xxxxxxxxxxxxxxx",
  authDomain: "toledoindexprice.firebaseapp.com",
  projectId: "toledoindexprice",
  storageBucket: "toledoindexprice.firebasestorage.app",
  messagingSenderId: "xxxxxxxx",
  appId: "xxxxxxxxxxxxxx",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

