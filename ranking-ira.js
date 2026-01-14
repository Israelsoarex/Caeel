const rankingData = [
    { nome: "Avatar 1", ira: 9.08, avatar: "./images/avatar.jpg", turma: "2023.1" },
    { nome: "Avatar 2", ira: 9.02, avatar: "./images/avatar.jpg", turma: "2023.1" },
    { nome: "Avatar 3", ira: 8.97, avatar: "./images/avatar.jpg", turma: "2023.1" },
    { nome: "Avatar 4", ira: 8.80, avatar: "./images/avatar.jpg", turma: "2023.1" },
    { nome: "Avatar 5", ira: 8.65, avatar: "./images/avatar.jpg", turma: "2022.2" },
    { nome: "Avatar 6", ira: 8.50, avatar: "./images/avatar.jpg", turma: "2022.2" },
    { nome: "Avatar 7", ira: 8.10, avatar: "./images/avatar.jpg", turma: "2023.1" }
];

const btns = document.querySelectorAll("#rankingBtn div");

btns[0].onclick = () => {
    modoAtual = "turma";
    renderRanking();
};

btns[1].onclick = () => {
    modoAtual = "geral";
    renderRanking();
};
let modoAtual = "geral"; // ou "turma"
const turmaAtual = "2023.1";


function renderRanking() {
    let dados = [...rankingData];

    if (modoAtual === "turma") {
        dados = dados.filter(p => p.turma === turmaAtual);
    }

    dados.sort((a, b) => b.ira - a.ira);

    renderPodium(dados.slice(0, 3));
    renderLista(dados.slice(3));
}

function renderPodium(top3) {
    const posicoes = ["first", "second", "third"];

    top3.forEach((pessoa, index) => {
        const card = document.querySelector(`.podium.${posicoes[index]}`);

        card.querySelector(".avatar").style.backgroundImage = `url(${pessoa.avatar})`;
        card.querySelector(".ira").innerText = `IRA ${pessoa.ira.toFixed(2)}`;
        card.querySelector(".name").innerText = pessoa.nome;
    });
}

function renderLista(lista) {
    const container = document.getElementById("rankingCardsDiv");
    container.innerHTML = "";

    lista.forEach((pessoa, index) => {
        const posicao = index + 4;

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

