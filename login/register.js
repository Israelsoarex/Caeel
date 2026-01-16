//  Firebase imports
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

const CLOUD_NAME = "drntmxv0m";
const UPLOAD_PRESET = "eng_eletrica_ufpi";


const profilePicDiv = document.querySelector("#profilePicDiv");
const profilePicInput = document.querySelector("#profilePicInput");

profilePicDiv.addEventListener("click", () => {
    profilePicInput.click();
});

let selectedImageFile = null;

profilePicInput.addEventListener("change", () => {
    const file = profilePicInput.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
        Toastify({
            text: "Selecione apenas imagens",
            backgroundColor: "#e74c3c"
        }).showToast();
        return;
    }
    if (file.size > 1_000_000) { // 1MB
        Toastify({
            text: "Imagem muito grande (máx. 1MB)",
            backgroundColor: "#e74c3c"
        }).showToast();
        return;
    }


    selectedImageFile = file;

    const previewUrl = URL.createObjectURL(file);

    profilePicDiv.onload = () => {
        URL.revokeObjectURL(previewUrl);
    };


    profilePicDiv.style.backgroundImage = `url(${previewUrl})`;
    profilePicDiv.style.backgroundSize = "cover";
    profilePicDiv.style.backgroundPosition = "center";
    profilePicDiv.innerText = "";
});



// 🔧 Configuração Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBVNgbRD9AGU4XCbEJ5J8ln4lnLupxpsLE",
    authDomain: "eng-eletrica-ufpi.firebaseapp.com",
    projectId: "eng-eletrica-ufpi",
    storageBucket: "eng-eletrica-ufpi.firebasestorage.app",
    messagingSenderId: "151889804874",
    appId: "1:151889804874:web:d2f7950e68fa5a69bcf0b3"
};

//  Inicialização
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

//  Seletores
const form = document.querySelector("#registerForm");

const $ = (selector) => document.querySelector(selector);

// Submit
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = $("#nome").value.trim();
    const userIdName = $("#userIdName").value.trim();
    const nascimento = $("#nascimento").value;
    const ingresso = $("#ingresso").value;
    const matricula = $("#matricula").value.trim();
    const email = $("#email").value.trim();
    const senha = $("#senha").value;
    const confirmarSenha = $("#confirmarSenha").value;
    const iraRaw = $("#ira").value.trim();
    const ira = iraRaw ? Number(Number(iraRaw).toFixed(4)) : null;


    //  Validações
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

    function idadeValida(dataNascimento) {
        const hoje = new Date();
        const nascimento = new Date(dataNascimento);

        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const mes = hoje.getMonth() - nascimento.getMonth();

        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--;
        }

        return idade >= 16;
    }

    // validação
    if (!idadeValida(nascimento)) {
        Toastify({
            text: "É necessário ter no mínimo 16 anos para se cadastrar",
            backgroundColor: "#e67e22"
        }).showToast();
        return;
    }

    if (!/^\d+$/.test(matricula)) {
        Toastify({
            text: "A matrícula deve conter apenas números",
            backgroundColor: "#e67e22"
        }).showToast();
        return;
    }

    try {
        showLoadingToast("Criando conta...");

        // 1️⃣ Criar usuário
        const cred = await createUserWithEmailAndPassword(auth, email, senha);
        const { uid } = cred.user;

        let photoUrl = null;

        // 2️⃣ Upload da imagem
        if (selectedImageFile) {
            updateLoadingToast("Enviando foto de perfil...");

            const formData = new FormData();
            formData.append("file", selectedImageFile);
            formData.append("upload_preset", UPLOAD_PRESET);
            formData.append("folder", `avatars/${uid}`);
            formData.append("public_id", "profile");

            const res = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
                { method: "POST", body: formData }
            );

            const data = await res.json();

            if (!data.secure_url) {
                throw new Error("Falha no upload da imagem");
            }

            photoUrl = data.secure_url.replace(
                "/upload/",
                "/upload/c_fill,g_face,w_400,h_400,q_auto,f_auto/"
            );
        }

        // 3️⃣ Firestore
        updateLoadingToast("Finalizando cadastro...");

        const [ano, semestre] = ingresso.split(".");

        await setDoc(doc(db, "users", uid), {
            nome,
            userIdName,
            nascimento,
            ingresso,
            ingressoAno: Number(ano),
            ingressoSemestre: Number(semestre),
            matricula,
            email,
            ira,
            fotoPerfil: photoUrl,
            materiasCumpridas: [],
            criadoEm: serverTimestamp()
        });

        hideLoadingToast();

        Toastify({
            text: "Cadastro realizado com sucesso ⚡",
            backgroundColor: "#2ecc71"
        }).showToast();

        setTimeout(() => {
            window.location.href = "../index.html";
        }, 1500);

    } catch (error) {
        hideLoadingToast();

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
let loadingToast = null;

function showLoadingToast(text) {
    loadingToast = Toastify({
        text,
        duration: -1,
        close: false,
        gravity: "top",
        position: "center",
        stopOnFocus: false,
        style: {
            background: "#3498db"
        }
    });
    loadingToast.showToast();
}

function updateLoadingToast(text) {
    if (!loadingToast) return;
    loadingToast.toastElement.textContent = text;
}

function hideLoadingToast() {
    if (loadingToast) {
        loadingToast.hideToast();
        loadingToast = null;
    }
}
