import { getAuth, signOut, onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

import { getFirestore, doc, getDoc, updateDoc } 
from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

import { criarFiltroDeConteudo } from "./login/badwords.js";

import { app } from "./firebase.js";

const auth = getAuth(app);
const db = getFirestore(app);

const userNameEl = document.getElementById("userName");
const userIdEl = document.getElementById("userId");
const avatarEl = document.querySelector("#userInformations img");

const logoutBtn = document.getElementById("logoutBtn");
const editBtn = document.getElementById("profileEditBtn");
const overlay = document.getElementById("editProfileOverlay");

onAuthStateChanged(auth, async user => {
  if (!user) return;

  const snap = await getDoc(doc(db, "users", user.uid));
  if (!snap.exists()) return;

  const data = snap.data();

  userNameEl.textContent = data.nome;
  userIdEl.textContent = data.userIdName;
  avatarEl.src = data.fotoPerfil || "images/avatar.jpg";
});

logoutBtn.onclick = async () => {
  await signOut(auth);
  window.location.href = "login/login.html";
};

editBtn.onclick = () => {
  overlay.classList.remove("hidden");
};

function normalizarUserId(valor) {
    let id = valor.toLowerCase().trim();

    // remove espaços
    id = id.replace(/\s+/g, "");

    // adiciona @ se não tiver
    if (!id.includes("@")) {
        id = "@" + id;
    }

    return id;
}
function validarUserId(id, filtro) {
    if (/\s/.test(id)) {
        return "O ID não pode conter espaços";
    }

    if (/[A-Z]/.test(id)) {
        return "O ID não pode conter letras maiúsculas";
    }

    const ver = filtro.verificar(id);
    if (ver.bloqueado) {
        console.log(ver.palavra)
        return "ID contém termos proibidos";
    }

    return null;
}
function validarNome(nome, filtro) {
    if (/\d/.test(nome)) {
        return "O nome não pode conter números";
    }

    const ver = filtro.verificar(nome);
    if (ver.bloqueado) {
        console.log(ver.palavra)
        return "Nome contém termos proibidos";
    }

    return null;
}
function validarIngresso(ingresso) {
    const anoAtual = new Date().getFullYear();
    const match = ingresso.match(/^(\d{4})\.(1|2)$/);

    if (!match) return "Formato inválido (AAAA.1 ou AAAA.2)";

    const ano = Number(match[1]);

    if (ano < 2011 || ano > anoAtual) {
        return `Ano de ingresso deve estar entre 2011 e ${anoAtual}`;
    }

    return null;
}
function validarMatricula(matricula) {
    const anoAtual = new Date().getFullYear();

    if (!/^\d{9,11}$/.test(matricula)) {
        return "Matrícula deve ter entre 9 e 11 números";
    }

    const ano = Number(matricula.substring(0, 4));

    if (ano < 2011 || ano > anoAtual) {
        return "Ano da matrícula inválido";
    }

    return null;
}

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
async function uploadCloudinary(uid) {
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

    return data.secure_url.replace(
        "/upload/",
        "/upload/c_fill,g_face,w_400,h_400,q_auto,f_auto/"
    );
}
saveProfileBtn.onclick = async () => {
  const user = auth.currentUser;
  if (!user) return;

  const filtro = criarFiltroDeConteudo();

  const nome = editNome.value.trim();
  const userId = normalizarUserId(editUserId.value);
 const ira = editIra.value ? Number(Number(editIra.value).toFixed(4)) : null;
  const nascimento = editNascimento.value;
  const ingresso = editIngresso.value;

  let erro;
  if ((erro = validarNome(nome, filtro))) return Toastify({text: erro}).showToast();
  if ((erro = validarUserId(userId, filtro))) return Toastify({text: erro}).showToast();
  if ((erro = validarIngresso(ingresso))) return Toastify({text: erro}).showToast();
  if (!idadeValida(nascimento)) {
    Toastify({
        text: "É necessário ter no mínimo 16 anos",
        backgroundColor: "#e67e22"
    }).showToast();
    return;
}
const erroIra = validarIra(editIra.value);
if (erroIra) {
    Toastify({ text: erroIra, backgroundColor: "#e67e22" }).showToast();
    return;
}



  let photoUrl = null;
  if (selectedImageFile) {
    photoUrl = await uploadCloudinary(user.uid);
  }

  const update = {
    nome,
    userIdName: userId,
    ira,
    nascimento,
    ingresso
  };

  if (photoUrl) update.fotoPerfil = photoUrl;

  await updateDoc(doc(db, "users", user.uid), update);

  Toastify({ text: "Perfil atualizado ⚡", backgroundColor: "#2ecc71" }).showToast();
  editProfileOverlay.classList.add("hidden");
};

function idadeValida(dataNascimento) {
    if (!dataNascimento) return false;

    const hoje = new Date();
    const nasc = new Date(dataNascimento);

    let idade = hoje.getFullYear() - nasc.getFullYear();
    const m = hoje.getMonth() - nasc.getMonth();

    if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) {
        idade--;
    }

    return idade >= 16;
}
function validarIra(valor) {
    if (valor === null || valor === "") return null;

    const num = Number(valor);

    if (isNaN(num)) return "IRA inválido";
    if (num < 0 || num > 10) return "IRA deve estar entre 0 e 10";

    const casas = valor.split(".")[1];
    if (casas && casas.length > 4) {
        return "IRA deve ter no máximo 4 casas decimais";
    }

    return null;
}
cancelEditBtn.onclick = () => {
    editProfileOverlay.classList.add("hidden");
};
