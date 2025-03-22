import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics.js";

// ✅ Your Firebase Config (replace with your actual values)
const firebaseConfig = {
  apiKey: "AIzaSyAuaBUrGVfCVY5BVFzol2LZZGLAA_84uYo",
  authDomain: "phoneauthapp-12b05.firebaseapp.com",
  projectId: "phoneauthapp-12b05",
  storageBucket: "phoneauthapp-12b05.firebasestorage.app",
  messagingSenderId: "955898262083",
  appId: "1:955898262083:web:1aa18bc277d9f0049d9af6",
  measurementId: "G-48T8EB4T4P"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

//
// ✅ EMAIL AUTH HANDLERS
//

document.getElementById("signupBtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    document.getElementById("emailMessage").textContent = `✅ Signed up as: ${userCredential.user.email}`;
  } catch (error) {
    document.getElementById("emailMessage").textContent = `❌ ${error.message}`;
  }
});

document.getElementById("loginBtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    document.getElementById("emailMessage").textContent = `✅ Logged in as: ${userCredential.user.email}`;
  } catch (error) {
    document.getElementById("emailMessage").textContent = `❌ ${error.message}`;
  }
});

//
// ✅ PHONE AUTH SETUP
//

// reCAPTCHA setup
window.recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", {
  size: "invisible"
}, auth);

let confirmationResult = null;

document.getElementById("sendCodeBtn").addEventListener("click", async () => {
  const phoneNumber = document.getElementById("phoneNumber").value;

  try {
    confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
    document.getElementById("phoneMessage").textContent = "📩 Code sent! Check your SMS.";
  } catch (error) {
    document.getElementById("phoneMessage").textContent = `❌ ${error.message}`;
  }
});

document.getElementById("verifyCodeBtn").addEventListener("click", async () => {
  const code = document.getElementById("verificationCode").value;

  try {
    const result = await confirmationResult.confirm(code);
    document.getElementById("phoneMessage").textContent = `✅ Phone verified: ${result.user.phoneNumber}`;
  } catch (error) {
    document.getElementById("phoneMessage").textContent = "❌ Invalid code.";
  }
});
