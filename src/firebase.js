import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDadTMrVt-TtOEQuz3W1bOwc1c9-B6VQ6U",
  authDomain: "react-login-2023.firebaseapp.com",
  projectId: "react-login-2023",
  storageBucket: "react-login-2023.appspot.com",
  messagingSenderId: "766779052633",
  appId: "1:766779052633:web:2073ef3dbcd983c15a9748"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth};