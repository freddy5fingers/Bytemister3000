// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
        apiKey: "AIzaSyBZwl6qTmuo_-SWJCMDNnLJgm3vIbOtoqI",
        authDomain: "bytemister3000.firebaseapp.com",
        projectId: "bytemister3000",
        storageBucket: "bytemister3000.appspot.com",
        messagingSenderId: "723831448134",
        appId: "1:723831448134:web:849569587a74cd49be6047",
        measurementId: "G-GFLFFNV56K"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Function to check authentication state
function checkAuthState() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('User is signed in:', user.uid);
      // Perform actions for signed-in user
    } else {
      console.log('User is signed out');
      // Perform actions for signed-out user
    }
  });
}

// Export necessary variables and functions
export { app, db, auth, checkAuthState };
