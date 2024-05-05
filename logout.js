// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
import { getAuth, 
         signOut
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-auth.js";

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


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize auth
const auth = getAuth();

//Logout user
const logoutBtn = document.getElementById("logout")
logoutBtn.addEventListener('click', (e)=>{
  signOut(auth)
  .then(() => {
    // Sign out  
    window.location.href = "index.html"
  })
  .catch((err) => {
    const errorCode = err.code;
    const errorMessage = err.message;
    console.log(errorMessage)
  })
})