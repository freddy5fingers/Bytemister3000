// Import the functions you need from the SDKs you need
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-database.js";
import { getFirestore, 
         collection, 
         doc,
         getDoc,
         addDoc,
         setDoc 
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js";
import { getStorage,
         uploadBytesResumable,
         getDownloadURL,
         ref as storageRef } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-storage.js";

console.log ('works!')


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBZwl6qTmuo_-SWJCMDNnLJgm3vIbOtoqI",
    authDomain: "bytemister3000.firebaseapp.com",
    projectId: "bytemister3000",
    storageBucket: "bytemister3000.appspot.com",
    messagingSenderId: "723831448134",
    appId: "1:723831448134:web:849569587a74cd49be6047",
    measurementId: "G-GFLFFNV56K"
  };


//-------------------------------------- Initialize Services------------------------------------------//
const db = getFirestore();
const storage = getStorage();






//play funtionality 
let masterPlay = document.getElementById('masterPlay');