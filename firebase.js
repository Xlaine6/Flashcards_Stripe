import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
 apiKey: "AIzaSyB5P6NV8EmnEBTByGc3qXCCNlIVrj1BUDE",
 authDomain: "flashcard-75412.firebaseapp.com",
 projectId: "flashcard-75412",
 storageBucket: "flashcard-75412.appspot.com",
 messagingSenderId: "734107993763",
 appId: "1:734107993763:web:61971350ef2bf076316116",

};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;