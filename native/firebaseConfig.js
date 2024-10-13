
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyADDTJyjcxXUkp5SYXv7xQQDqBgAAfrR7A",
    authDomain: "questforge-a4001.firebaseapp.com",
    projectId: "questforge-a4001",
    storageBucket: "questforge-a4001.appspot.com",
    messagingSenderId: "233417452690",
    appId: "1:233417452690:web:a4df8cec8d06cbf3d1ca4b",
    measurementId: "G-CCBJ5LD6GD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
