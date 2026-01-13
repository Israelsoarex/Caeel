// 🔥 Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import {
    getFirestore,
    doc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

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
const db = getFirestore(app);

// 📌 Seletores
const form = document.querySelector("#registerForm");

const $ = (selector) => document.querySelector(selector);

// 🧠 Submit
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = $("#nome").value.trim();
    const userId = $("#userId").value.trim();
    const nascimento = $("#nascimento").value;
    const ingresso = $("#ingresso").value;
    const matricula = $("#matricula").value.trim();
    const email = $("#email").value.trim();
    const senha = $("#senha").value;
    const confirmarSenha = $("#confirmarSenha").value;
    const iraRaw = $("#ira").value.trim();
    const ira = iraRaw ? Number(Number(iraRaw).toFixed(4)) : null;


    // 🔐 Validações
    if (senha !== confirmarSenha) {
        Toastify({
            text: "As senhas não coincidem",
            backgroundColor: "#e74c3c"
        }).showToast();
        return;
    }

    const ingressoRegex = /^(19|20)\d{2}\.(1|2)$/;

    if (!ingressoRegex.test(ingresso)) {
        Toastify({
            text: "Ano de ingresso inválido. Use o formato AAAA.1 ou AAAA.2",
            backgroundColor: "#e67e22"
        }).showToast();
        return;
    }

    try {
        // 👤 Criar usuário
        const cred = await createUserWithEmailAndPassword(auth, email, senha);
        const { uid } = cred.user;

        // 💾 Firestore
        const [ano, semestre] = ingresso.split(".");

        await setDoc(doc(db, "users", uid), {
            nome,
            userId,
            nascimento,
            ingresso,
            ingressoAno: Number(ano),
            ingressoSemestre: Number(semestre),
            matricula,
            email,
            ira,
            materiasCumpridas: [],
            criadoEm: serverTimestamp()
        });


        Toastify({
            text: "Cadastro realizado com sucesso ⚡",
            backgroundColor: "#2ecc71"
        }).showToast();

        setTimeout(() => {
            window.location.href = "./index.html";
        }, 1500);

    } catch (error) {
        Toastify({
            text: traduzErroFirebase(error.code),
            backgroundColor: "#e74c3c"
        }).showToast();
    }
});

// 🧠 Tradutor de erros Firebase (UX profissional)
function traduzErroFirebase(code) {
    const erros = {
        "auth/email-already-in-use": "Este email já está cadastrado",
        "auth/invalid-email": "Email inválido",
        "auth/weak-password": "A senha precisa ter pelo menos 6 caracteres"
    };

    return erros[code] || "Erro ao cadastrar usuário";
}
