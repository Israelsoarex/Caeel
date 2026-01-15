import { db } from "./firebase.js";
import {
    doc,
    getDoc,
    updateDoc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

import { aplicarEstadoDoUsuario } from "./index.js";

export function carregarDadosDoUsuario(uid) {
    const userRef = doc(db, "users", uid);

    // 🔹 Leitura inicial + tempo real
    onSnapshot(userRef, (snap) => {
        if (!snap.exists()) return;

        const data = snap.data();

        aplicarEstadoDoUsuario(data);

        document.dispatchEvent(new Event("firebaseReady"));
    });
}

export async function salvarProgresso(uid, appState) {
    await updateDoc(doc(db, "users", uid), {
        materiasCumpridas: appState.materiasCumpridas,
        optativasSelecionadas: appState.optativasSelecionadas
    });
}
