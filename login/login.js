// 🔥 Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

// 🔧 Configuração Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBVNgbRD9AGU4XCbEJ5J8ln4lnLupxpsLE",
  authDomain: "eng-eletrica-ufpi.firebaseapp.com",
  projectId: "eng-eletrica-ufpi",
  storageBucket: "eng-eletrica-ufpi.firebasestorage.app",
  messagingSenderId: "151889804874",
  appId: "1:151889804874:web:d2f7950e68fa5a69bcf0b3"
};

// 🚀 Inicialização
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🎯 Seletores
const form = document.querySelector(".login-card");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

// 👁️ Mostrar / esconder senha (mantém o teu código)
let icon = document.querySelector(".toggle-password");
icon.addEventListener("click", () => {
  const input = passwordInput;
  const isPassword = input.type === "password";
  input.type = isPassword ? "text" : "password";
  icon.classList.toggle("fa-eye", isPassword);
  icon.classList.toggle("fa-eye-slash", !isPassword);
});

// 🟦 Toast helpers
let loadingToast = null;

function showLoadingToast(text) {
  loadingToast = Toastify({
    text,
    duration: -1,
    gravity: "top",
    position: "center",
    close: false,
    style: {
      background: "#043E7D"
    }
  });
  loadingToast.showToast();
}

function hideLoadingToast() {
  if (loadingToast) {
    loadingToast.hideToast();
    loadingToast = null;
  }
}

// 🧠 Tradutor de erros Firebase
function traduzErroFirebase(code) {
  const erros = {
    "auth/user-not-found": "Usuário não encontrado",
    "auth/wrong-password": "Senha incorreta",
    "auth/invalid-email": "Email inválido",
    "auth/too-many-requests": "Muitas tentativas. Tente mais tarde"
  };

  return erros[code] || "Erro ao fazer login";
}

// 🟢 Submit do login
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || !password) {
    Toastify({
      text: "Preencha email e senha",
      style: { background: "#e67e22" }
    }).showToast();
    return;
  }

  try {
    showLoadingToast("Entrando...");

    await signInWithEmailAndPassword(auth, email, password);

    hideLoadingToast();

    Toastify({
      text: "Login realizado com sucesso ⚡",
      style: { background: "#2ecc71" }
    }).showToast();

    setTimeout(() => {
      window.location.href = "../index.html";
    }, 800);

  } catch (error) {
    hideLoadingToast();

    Toastify({
      text: traduzErroFirebase(error.code),
      style: { background: "#e74c3c" }
    }).showToast();
  }
});



