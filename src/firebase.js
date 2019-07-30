import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB7F1GpVVlRSqJ_PNQ8B6IfHPGe8PKOVtc",
    authDomain: "treeviewapp-39f5d.firebaseapp.com",
    databaseURL: "https://treeviewapp-39f5d.firebaseio.com",
    projectId: "treeviewapp-39f5d",
    storageBucket: "treeviewapp-39f5d.appspot.com",
    messagingSenderId: "477092432322",
    appId: "1:477092432322:web:1395c3fcaa69e7a3"
};

firebase.initializeApp(firebaseConfig);

export default firebase;