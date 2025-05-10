
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA8cq2vrtjAi4kM1wUV9oDT4THryMut75c",
  authDomain: "student-dashboard-8ac0c.firebaseapp.com",
  projectId: "student-dashboard-8ac0c",
  storageBucket: "student-dashboard-8ac0c.appspot.com",
  messagingSenderId: "632057595470",
  appId: "1:632057595470:web:fe34d5c6f99bb82e21651f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);