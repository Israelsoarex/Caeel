import { auth } from "./firebase.js";
import { onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { carregarDadosDoUsuario } from "./user-data.js";
import { appState } from "./index.js";

onAuthStateChanged(auth, user => {
    if (!user) {
        mostrarLayerNaoLogado();
    } else {
        esconderLayerNaoLogado();
        appState.uid = user.uid;
        carregarDadosDoUsuario(user.uid);
    }
});

function mostrarLayerNaoLogado() {
    document.getElementById("authOverlay").classList.remove("hidden");
}

function esconderLayerNaoLogado() {
    document.getElementById("authOverlay").classList.add("hidden");
}


