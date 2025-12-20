document.addEventListener("DOMContentLoaded", () => {
    const lista = document.getElementById("listaReprovadas");

    // Função para número ordinal
    function ordinal(n) {
        return n + (n === 1 ? "º" : "º"); // todos simplificados para "º"
    }

    // Popular os checkboxes por período
    let periodoNum = 1;
    for (const periodo in cursoEngenharia) {
        const divPeriodo = document.createElement("div");
        divPeriodo.className = "periodo-checkbox";

        const titulo = document.createElement("h4");
        titulo.textContent = `${ordinal(periodoNum)} Período`;
        divPeriodo.appendChild(titulo);

        cursoEngenharia[periodo].materias.forEach(m => {
            const label = document.createElement("label");
            label.className = "materia-checkbox-container";
            label.innerHTML = `
                <input type="checkbox" name="materia" value="${m.nome}">
                <span>${m.nome}</span>
            `;
            divPeriodo.appendChild(label);
        });

        lista.appendChild(divPeriodo);
        periodoNum++;
    }

    // Permitir apenas 1 matéria selecionada
    lista.addEventListener("change", e => {
        if (e.target.type === "checkbox") {
            const checkboxes = lista.querySelectorAll("input[type=checkbox]");
            checkboxes.forEach(c => {
                if (c !== e.target) c.checked = false;
            });
        }
    });

    // --- calcular impacto bola de neve ---
    function calcularImpacto(reprovadas) {
        const dependentes = {};
        const bloqueadasDiretas = new Set();
        const bloqueadasIndiretas = {};
        const fila = [...reprovadas];

        for (const periodo in cursoEngenharia) {
            for (const materia of cursoEngenharia[periodo].materias) {
                if (!materia.preRequisito) continue;
                const prereqs = Array.isArray(materia.preRequisito)
                    ? materia.preRequisito
                    : [materia.preRequisito];

                prereqs.forEach(pr => {
                    if (!dependentes[pr]) dependentes[pr] = [];
                    dependentes[pr].push(materia.nome);
                });
            }
        }

        const visitados = new Set();
        while (fila.length) {
            const atual = fila.shift();
            if (!dependentes[atual]) continue;

            dependentes[atual].forEach(dep => {
                if (!visitados.has(dep)) {
                    visitados.add(dep);
                    if (reprovadas.includes(atual)) {
                        bloqueadasDiretas.add(dep);
                    } else {
                        if (!bloqueadasIndiretas[dep]) bloqueadasIndiretas[dep] = [];
                        bloqueadasIndiretas[dep].push(atual);
                    }
                    fila.push(dep);
                }
            });
        }

        return {
            diretas: Array.from(bloqueadasDiretas),
            indiretas: bloqueadasIndiretas
        };
    }

    // --- render resultado ---
    function renderResultado({ diretas, indiretas }) {
        const painel = document.getElementById("painel");
        painel.innerHTML = "";

        function criarLista(titulo, arr) {
            const div = document.createElement("div");
            div.className = "resultado-lista";

            const h3 = document.createElement("h3");
            h3.textContent = `${titulo} (${Array.isArray(arr) ? arr.length : Object.keys(arr).length})`;
            div.appendChild(h3);

            const ul = document.createElement("ul");

            if (Array.isArray(arr)) {
                arr.forEach(nome => {
                    let periodoNome = "";
                    for (const periodo in cursoEngenharia) {
                        if (cursoEngenharia[periodo].materias.some(m => m.nome === nome)) {
                            periodoNome = periodo;
                            break;
                        }
                    }
                    const li = document.createElement("li");
                    li.textContent = `${nome} — Período: ${periodoNome}`;
                    ul.appendChild(li);
                });
            } else {
                for (const nome in arr) {
                    let periodoNome = "";
                    for (const periodo in cursoEngenharia) {
                        if (cursoEngenharia[periodo].materias.some(m => m.nome === nome)) {
                            periodoNome = periodo;
                            break;
                        }
                    }
                    const li = document.createElement("li");
                    li.innerHTML = `${nome} —  ${periodoNome} período <br><small>Bloqueada por: ${arr[nome].join(", ")}</small>`;
                    ul.appendChild(li);
                }
            }

            div.appendChild(ul);
            painel.appendChild(div);
        }

        criarLista("Bloqueadas Diretas", diretas);
        criarLista("Bloqueadas Indiretas", indiretas);
    }

    // --- eventos ---
    document.getElementById("simular").onclick = () => {
        const reprovadas = [...lista.querySelectorAll("input:checked")].map(i => i.value);
        if (!reprovadas.length) return alert("Selecione ao menos uma matéria.");
        const impacto = calcularImpacto(reprovadas);
        renderResultado(impacto);
    };

    document.getElementById("limpar").onclick = () => location.reload();
});