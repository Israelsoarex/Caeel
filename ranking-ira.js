import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

import { db, auth } from "./firebase.js";

/* =======================
   ESTADO GLOBAL
======================= */

let rankingData = [];
let modoAtual = "turma"; // "geral" | "turma"
let turmaAtual = null;
let carregando = false;

/* =======================
   FIRESTORE QUERIES
======================= */

async function carregarRankingGeral() {
  const q = query(
    collection(db, "users"),
    where("ira", ">", 0),
    orderBy("ira", "desc"),
    limit(50)
  );

  const snap = await getDocs(q);

  return snap.docs.map(doc => {
    const data = doc.data();
    return {
      nome: data.userIdName,
      ira: data.ira,
      avatar: data.fotoPerfil || "./images/avatar.jpg",
      turma: data.ingresso
    };
  });
}

async function carregarRankingPorTurma(turma) {
  const q = query(
    collection(db, "users"),
    where("ingresso", "==", turma),
    where("ira", ">", 0),
    orderBy("ira", "desc"),
    limit(50)
  );

  const snap = await getDocs(q);

  return snap.docs.map(doc => {
    const data = doc.data();
    return {
      nome: data.userIdName,
      ira: data.ira,
      avatar: data.fotoPerfil || "./images/avatar.jpg",
      turma: data.ingresso
    };
  });
}

/* =======================
   TURMA DO USUÁRIO
======================= */

async function carregarTurmaDoUsuario(uid) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return snap.data().ingresso;
}

/* =======================
   AUTH → START
======================= */

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    console.log("Usuário não logado");
    return;
  }

  turmaAtual = await carregarTurmaDoUsuario(user.uid);

  rankingData = await carregarRankingGeral();
  renderRanking();
});

/* =======================
   BOTÕES
======================= */

const btns = document.querySelectorAll("#rankingBtn div");

btns[0].onclick = async () => {
  if (!turmaAtual || carregando) return;

  carregando = true;
  modoAtual = "turma";
  rankingData = [];

  try {
    rankingData = await carregarRankingPorTurma(turmaAtual);
    renderRanking();
  } catch (e) {
    console.error(e);
  }

  carregando = false;
};

btns[1].onclick = async () => {
  if (carregando) return;

  carregando = true;
  modoAtual = "geral";
  rankingData = [];

  try {
    rankingData = await carregarRankingGeral();
    renderRanking();
  } catch (e) {
    console.error(e);
  }

  carregando = false;
};


/* =======================
   RENDER
======================= */

function renderRanking() {
  const dados = [...rankingData];

  renderPodium(dados.slice(0, 3));
  renderLista(dados);
}

function renderPodium(top3) {
  const posicoes = ["first", "second", "third"];

  top3.forEach((pessoa, index) => {
    const card = document.querySelector(`.podium.${posicoes[index]}`);
    if (!card) return;

    card.querySelector(".avatar").style.backgroundImage =
      `url(${pessoa.avatar})`;
    card.querySelector(".ira").innerText =
      `IRA ${pessoa.ira.toFixed(2)}`;
    card.querySelector(".name").innerText =
      pessoa.nome;
  });
}

function renderLista(lista) {
  const container = document.getElementById("rankingCardsDiv");
  container.innerHTML = "";

  lista.forEach((pessoa, index) => {
    const posicao = index+1;

    const card = document.createElement("div");
    card.id = "rankingCard";

    card.innerHTML = `
      <span class="indexSpan">${posicao}</span>
      <img src="${pessoa.avatar}">
      <p id="cardName">${pessoa.nome}</p>
      <p id="cardIra">${pessoa.ira.toFixed(2)}</p>
    `;

    container.appendChild(card);
  });
}
