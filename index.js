import { salvarProgresso } from "./user-data.js";


document.querySelector('.seletor').addEventListener('change', async () => {
    appState.materiasCumpridas =
        Array.from(document.querySelectorAll('.materia-checkbox:checked'))
            .map(cb => cb.value);

    criarPainel(cursoEngenharia);
    atualizarEstadoMaterias(cursoEngenharia);

    if (appState.uid) {
        await salvarProgresso(appState.uid, appState);
    }
});


export const appState = {
    uid: null,
    materiasCumpridas: [],
    optativasSelecionadas: {}
};


 export function criarPainel(cursoEngenharia) {
    const painel = document.querySelector('.painel');
    painel.style.display = "flex";
    painel.innerHTML = "";

    for (let chave in cursoEngenharia) {
        const periodo = cursoEngenharia[chave];

        // Cria a div do período
        const divPeriodo = document.createElement('div');
        divPeriodo.className = 'periodo';

        // Adiciona o título do período
        const tituloPeriodo = document.createElement('div');
        tituloPeriodo.className = 'top';
        tituloPeriodo.innerHTML = `
            ${periodo.semestre}° Período <br>
            ${periodo.totalCreditos} Créditos
        `;
        divPeriodo.appendChild(tituloPeriodo);

        // Adiciona as matérias
        periodo.materias.forEach((materia, index) => {
            const divMateria = document.createElement('div');
            divMateria.className = `materia ${materia.tipo}`;
            divMateria.dataset.id = `${chave}-${index}`;

            const optativas = appState.optativasSelecionadas;
            const id = `${chave}-${index}`;

            const nomeExibido =
                materia.tipo === "optativa" && optativas[id]
                    ? optativas[id].nome
                    : materia.nome;

            divMateria.innerHTML = `
    <p>${nomeExibido}</p>
    <p>${materia.credito} Créditos</p>
`;


            // Adiciona a bolinha de notificação se houver pré-requisitos
            const preRequisitos = Array.isArray(materia.preRequisito) ? materia.preRequisito : (materia.preRequisito ? [materia.preRequisito] : []);
            if (preRequisitos.length > 0) {
                const notificacao = document.createElement('div');
                notificacao.className = 'notificacao';
                notificacao.textContent = preRequisitos.length;
                divMateria.appendChild(notificacao);
            }

            // Se o período está cumprido, desabilita o clique
            const todasCumpridas = periodo.materias.every((_, index) =>
                estaCumprido(`${chave}-${index}`)
            );



            // Adiciona o evento de 5ü clique para mostrar os detalhes
            divMateria.addEventListener('click', () => {
                const mode = document.querySelector('#toggleMode').getAttribute('data-mode');

                if (!todasCumpridas || mode === 'planejamento') {  // Verifica se o período não está cumprido
                    if (materia.tipo === "optativa") {
                        abrirSeletorOptativa(`${chave}-${index}`);
                    } else {
                        mostrarDetalhes(materia);
                    }
                }
            });

            divPeriodo.appendChild(divMateria);
        });

        // Adiciona o período ao painel
        painel.appendChild(divPeriodo);

        // Controla o overflow do período (ativa ou desativa dependendo se cumprido)
        const todasCumpridas = periodo.materias.every((_, index) =>
            estaCumprido(`${chave}-${index}`)
        );

        if (todasCumpridas) {
            divPeriodo.style.overflow = 'hidden'; // Desativa a rolagem para períodos cumpridos
        } else {
            divPeriodo.style.overflow = 'auto'; // Ativa a rolagem para períodos não cumpridos
        }
    }

    // Configura o Intersection Observer para resetar o scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const elemento = entry.target;

            // Reseta o scroll quando o elemento passar 60% para fora
            if (!entry.isIntersecting && entry.intersectionRatio < 0.6) {
                elemento.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }, {
        root: null, // Observa na viewport
        threshold: [0.6] // Detecta quando 60% do elemento está visível
    });

    // Aplica o Observer a todos os períodos
    document.querySelectorAll('.periodo').forEach(periodo => {
        observer.observe(periodo);
    });
}

export function criarLayerOptativa() {
    const layer = document.createElement('div');
    layer.id = 'optativaLayer';
    layer.className = 'detalhes-layer';

    layer.innerHTML = `
        <div class="detalhes-conteudo detalhes-optativa" >
            <h2 id="optativaTitulo">Selecionar Optativa</h2>
            <div id="optativaConteudo"></div>
            <button id="fecharOptativa">Fechar</button>
        </div>
    `;

    document.body.appendChild(layer);

    document.getElementById('fecharOptativa').onclick = () => {
        layer.style.display = 'none';
    };

    layer.addEventListener('click', e => {
        if (e.target.id === 'optativaLayer') {
            layer.style.display = 'none';
        }
    });
}
export function renderSelecaoArea(idSlot, container) {
    container.innerHTML = `
        <h3>Escolha a área</h3>
        <div class="optativa-area-lista"></div>
    `;

    const lista = container.querySelector('.optativa-area-lista');

    Object.keys(materiaOpitativa).forEach(area => {
        const card = document.createElement('div');
        card.className = 'optativa-area-card';
        const nome = materiaOpitativa[area].nome;
        const qtd = materiaOpitativa[area].materias.length;

        card.innerHTML = `
            <div class="optativa-area-titulo">${nome}</div>
            <div class="optativa-area-sub">${qtd} disciplinas disponíveis</div>
        `;

        card.onclick = () => renderListaOptativas(idSlot, area, container);

        lista.appendChild(card);
    });
}

export function renderListaOptativas(idSlot, area, container) {
    const nome = materiaOpitativa[area].nome;
    container.innerHTML = `<h3>${nome}</h3><div class="optativa-lista"></div>`;
    const lista = container.querySelector('.optativa-lista');

    materiaOpitativa[area].materias.forEach(opt => {
        const liberada = verificaPreRequisitos(opt.preRequisito);

        const card = document.createElement('div');
        card.className = `optativa-card ${!liberada ? 'bloqueada' : ''}`;

        const prereqs = Array.isArray(opt.preRequisito)
            ? opt.preRequisito
            : opt.preRequisito ? [opt.preRequisito] : [];

        card.innerHTML = `
            <div class="optativa-nome">${opt.nome}</div>
            ${!liberada && prereqs.length
                ? `<div class="optativa-prereq">
                        Pré-requisito: ${prereqs.join(', ')}
                       </div>`
                : ''
            }
        `;

        if (liberada) {
            card.onclick = () => {
                const optativas = appState.optativasSelecionadas;
                optativas[idSlot] = { ...opt, area };
                if (appState.uid) {
                    salvarProgresso(appState.uid, appState);
                }


                criarPainel(cursoEngenharia);
                generateStatusColors(); atualizarEstadoMaterias(cursoEngenharia);
                document.getElementById('optativaLayer').style.display = 'none';
            };
        }

        lista.appendChild(card);
    });
}

export function verificaPreRequisitos(preReqs = []) {
    const lista = Array.isArray(preReqs) ? preReqs : [preReqs];

    return lista.every(pr => {
        const id = obterIdDaMateriaPorNome(cursoEngenharia, pr);
        return id && estaCumprido(id);
    });
}
export function renderGerenciamentoOptativa(idSlot, opt, container) {
    const cumprida = estaCumprido(idSlot);


    const preReqs = opt.preRequisito
        ? (Array.isArray(opt.preRequisito) ? opt.preRequisito : [opt.preRequisito])
        : [];
    container.classList
    container.innerHTML = `
        <h3>Gerenciar Optativa</h3>

        <p><strong>Área:</strong> ${opt.area}</p>
        <p><strong>Matéria:</strong> ${opt.nome}</p>

        <p><strong>Pré-requisitos:</strong></p>
        <ul class="optativa-prereq">
            ${preReqs.length
            ? preReqs.map(pr => `<li>${pr}</li>`).join('')
            : '<li>Nenhum</li>'
        }
        </ul>

        <div class="optativa-actions">
            <button class="btn-add">
                ${cumprida ? 'Desmarcar como cumprida' : 'Marcar como cumprida'}
            </button>
            <button class="btn-change">Trocar matéria</button>
            <button class="btn-remove">Excluir</button>
        </div>
    `;

    // Marcar / desmarcar como cumprida
    container.querySelector('.btn-add').onclick = () => {
        const checkbox = document.querySelector(`.materia-checkbox[value="${idSlot}"]`);
        if (!checkbox) return;

        // Alterna o estado do checkbox
        checkbox.checked = !checkbox.checked;

        // Atualiza o estado visual
        atualizarEstadoMaterias(cursoEngenharia);
        // criarPainel(cursoEngenharia);
        generateStatusColors();
        document.getElementById('optativaLayer').style.display = 'none';
        // --- Salvar no localStorage ---
        const materiasCumpridas = appState.materiasCumpridas;

        if (checkbox.checked) {
            // adiciona se não existir
            if (!materiasCumpridas.includes(idSlot)) materiasCumpridas.push(idSlot);
        } else {
            // remove se estiver desmarcado
            const index = materiasCumpridas.indexOf(idSlot);
            if (index > -1) materiasCumpridas.splice(index, 1);
        }

        localStorage.setItem('materiasCumpridas', JSON.stringify(materiasCumpridas));
    };


    // Trocar optativa
    container.querySelector('.btn-change').onclick = () => {
        renderSelecaoArea(idSlot, container);
    };

    // Excluir optativa
    container.querySelector('.btn-remove').onclick = () => {
        const optativas = appState.optativasSelecionadas;
        delete optativas[idSlot];
        if (appState.uid) {
            salvarProgresso(appState.uid, appState);
        }

        criarPainel(cursoEngenharia);
        atualizarEstadoMaterias(cursoEngenharia);
        document.getElementById('optativaLayer').style.display = 'none';

        generateStatusColors();


        document.getElementById('optativaLayer').style.display = 'none';

    };
}

export function abrirSeletorOptativa(idSlot) {
    const layer = document.getElementById('optativaLayer');
    const conteudo = document.getElementById('optativaConteudo');

    const optativas = appState.optativasSelecionadas;

    const optativaAtual = optativas[idSlot];

    conteudo.innerHTML = '';

    if (optativaAtual) {
        renderGerenciamentoOptativa(idSlot, optativaAtual, conteudo);
    } else {
        renderSelecaoArea(idSlot, conteudo);
    }

    layer.style.display = 'flex';
}

export function mostrarDetalhes(materia) {
    const detalhesLayer = document.querySelector('#detalhesLayer');
    const detalhesTitulo = document.querySelector('#detalhesTitulo');
    const detalhesDescricao = document.querySelector('#detalhesDescricao');
    const detalhesPreRequisitos = document.querySelector('#detalhesPreRequisitos');

    // Preenche os detalhes com as informações da matéria
    detalhesTitulo.textContent = materia.nome;
    detalhesDescricao.textContent = materia.descricao || 'Sem descrição disponível';

    // Garantir que preRequisito seja um array, mesmo que seja uma string ou esteja vazio
    const preRequisitos = Array.isArray(materia.preRequisito) ? materia.preRequisito : (materia.preRequisito ? [materia.preRequisito] : []);

    // Preenche os pré-requisitos
    detalhesPreRequisitos.innerHTML = ''; // Limpa a lista existente
    if (preRequisitos.length > 0) {
        preRequisitos.forEach(prerequisito => {
            const li = document.createElement('li');
            li.textContent = prerequisito;
            detalhesPreRequisitos.appendChild(li);
        });
    } else {
        detalhesPreRequisitos.innerHTML = '<li>Sem pré-requisitos</li>';
    }

    // Exibe o layer de detalhes
    detalhesLayer.style.display = 'flex';
}
// Chama a função para criar o layer ao carregar o script

criarLayerDetalhes();
// Adiciona o evento para fechar o layer
document.querySelector('#fecharDetalhes').addEventListener('click', () => {
    document.querySelector('#detalhesLayer').style.display = 'none';
});

// Fecha o layer ao clicar na área fora do conteúdo
document.querySelector('#detalhesLayer').addEventListener('click', (event) => {
    if (event.target.id === 'detalhesLayer') {
        document.querySelector('#detalhesLayer').style.display = 'none';
    }
});

//criarPainel(cursoEngenharia);

export function criarLayerDetalhes() {
    // Cria o layer principal
    const detalhesLayer = document.createElement('div');
    detalhesLayer.id = 'detalhesLayer';
    detalhesLayer.className = 'detalhes-layer';

    // Cria o container interno
    const detalhesContainer = document.createElement('div');
    detalhesContainer.className = 'detalhes-conteudo';

    // Cria o título
    const detalhesTitulo = document.createElement('h2');
    detalhesTitulo.id = 'detalhesTitulo';

    // Cria a descrição
    const detalhesDescricao = document.createElement('p');
    detalhesDescricao.id = 'detalhesDescricao';

    // Cria o subtítulo de pré-requisitos
    const subtituloPreRequisitos = document.createElement('h3');
    subtituloPreRequisitos.textContent = 'Pré-Requisitos';

    // Cria a lista de pré-requisitos
    const detalhesPreRequisitos = document.createElement('ul');
    detalhesPreRequisitos.id = 'detalhesPreRequisitos';

    // Cria o botão de fechar
    const fecharBtn = document.createElement('button');
    fecharBtn.id = 'fecharDetalhes';
    fecharBtn.textContent = 'Fechar';
    fecharBtn.addEventListener('click', () => {
        detalhesLayer.style.display = 'none';
    });

    // Monta o container interno
    detalhesContainer.appendChild(detalhesTitulo);
    detalhesContainer.appendChild(detalhesDescricao);
    detalhesContainer.appendChild(subtituloPreRequisitos);
    detalhesContainer.appendChild(detalhesPreRequisitos);
    detalhesContainer.appendChild(fecharBtn);

    // Adiciona o container ao layer principal
    detalhesLayer.appendChild(detalhesContainer);

    // Adiciona o layer ao body
    document.body.appendChild(detalhesLayer);

    // Adiciona o evento para fechar ao clicar fora do conteúdo
    detalhesLayer.addEventListener('click', (event) => {
        if (event.target.id === 'detalhesLayer') {
            detalhesLayer.style.display = 'none';
        }
    });
}

export function criarSeletor(cursoEngenharia) {

    const seletor = document.querySelector('.seletor');

    // Itera por todos os períodos no objeto cursoEngenharia
    for (const chave in cursoEngenharia) {
        const periodo = cursoEngenharia[chave];

        // Adiciona título do período
        const titulo = document.createElement('h3');
        titulo.textContent = `${periodo.semestre}° Período`;
        seletor.appendChild(titulo);

        // Adiciona botão para selecionar todas as matérias do período
        const selecionarTodas = document.createElement('label');
        selecionarTodas.classList = "todosLabel";
        selecionarTodas.innerHTML = `
            <input type="checkbox" class="selecionar-todas"> Todas
        `;
        seletor.appendChild(selecionarTodas);

        // Container para as matérias
        const materiasContainer = document.createElement('div');
        materiasContainer.className = 'materias-container';

        // Adiciona cada matéria do período como checkbox
        periodo.materias.forEach((materia, index) => {
            const checkboxContainer = document.createElement('label');
            checkboxContainer.innerHTML = `
        ${materia.sigla}
        <input type="checkbox"
               class="materia-checkbox"
               value="${chave}-${index}"
               data-nome="${materia.nome}">
    `;
            materiasContainer.appendChild(checkboxContainer);
        });
        // Adiciona funcionalidade ao botão "selecionar todas"
        const selecionarTodasCheckbox = selecionarTodas.querySelector('input');
        selecionarTodasCheckbox.addEventListener('change', () => {
            const checkboxes = materiasContainer.querySelectorAll('.materia-checkbox');
            checkboxes.forEach((checkbox) => {
                checkbox.checked = selecionarTodasCheckbox.checked;
            });
        });

        // Adiciona o container de matérias ao seletor

        seletor.appendChild(materiasContainer);
    }
}


criarSeletor(cursoEngenharia)

// Adiciona um botão para capturar os valores selecionados
//////
document.querySelector('.seletor').addEventListener('change', () => {
    const selecionados = Array.from(document.querySelectorAll('.materia-checkbox:checked'))
        .map((checkbox) => checkbox.value);
    criarPainel(cursoEngenharia)
    atualizarEstadoMaterias(cursoEngenharia)

});

export function atualizarEstadoMaterias(cursoEngenharia) {
    const todosOsPeriodos = document.querySelectorAll(".periodo");

    todosOsPeriodos.forEach((divPeriodo, index) => {
        const periodoKey = Object.keys(cursoEngenharia)[index];
        const periodo = cursoEngenharia[periodoKey];

        // Verifica se todas as matérias do período estão cumpridas
        const todasCumpridas = periodo.materias.every((_, index) =>
            estaCumprido(`${periodoKey}-${index}`)
        );

        if (todasCumpridas) {
            divPeriodo.classList.add('cumprido');
            divPeriodo.style.overflow = 'hidden';
            adicionarOverlay(divPeriodo);
        } else {
            divPeriodo.classList.remove('cumprido');
            divPeriodo.style.overflow = 'scroll';
            removerOverlay(divPeriodo);
        }


        // Atualiza o estado de cada matéria no período
        const materiasElements = divPeriodo.querySelectorAll('.materia');
        materiasElements.forEach((materiaElement) => {
            const idMateria = materiaElement.dataset.id;

            // matéria base SEMPRE vem da grade
            const [periodoKeyMateria, indexMateria] = idMateria.split('-');
            let materia = cursoEngenharia[periodoKeyMateria].materias[indexMateria];

            // se for optativa, pode haver substituição
            let materiaReal = materia;

            if (materia.tipo === "optativa") {
                const optativas = appState.optativasSelecionadas;
                materiaReal = optativas[idMateria] || materia;
            }


            const preRequisitos = Array.isArray(materiaReal.preRequisito)
                ? materiaReal.preRequisito
                : (materiaReal.preRequisito ? [materiaReal.preRequisito] : []);

            if (preRequisitos.length === 0 || preRequisitos.every(pr => {
                const idPrereq = obterIdDaMateriaPorNome(cursoEngenharia, pr);
                return idPrereq && estaCumprido(idPrereq);
            })
            ) {
                // Matéria pode ser cumprida
                if (estaCumprido(idMateria)) {
                    removedorDeClasse(materiaElement, 'cumprida'); // Matéria já cumprida
                } else {
                    removedorDeClasse(materiaElement, 'pendente'); // Matéria pendente, mas liberada
                }
            } else {
                // Matéria não pode ser cumprida (pré-requisitos não atendidos)
                removedorDeClasse(materiaElement, 'bloqueada');
            }
        });
    });

}

// Função para adicionar o overlay visual
export function adicionarOverlay(periodoElement) {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    overlay.innerText = 'Já Cumprido';
    periodoElement.appendChild(overlay);
}

// Função para remover o overlay visual
export function removerOverlay(periodoElement) {
    const overlay = periodoElement.querySelector('.overlay');
    if (overlay) {
        overlay.remove();
    }
}
/// remove classes 
export function removedorDeClasse(elemento, classe) {
    elemento.classList.remove("curso");
    elemento.classList.remove("geral");
    elemento.classList.remove("optativa");
    elemento.classList.remove("estagio");
    elemento.classList.remove("tcc");
    elemento.classList.remove("especifica");
    elemento.className = `materia ${classe}`;
}


// Função para verificar se a matéria está cumprida (se está marcada no checkbox)
export function estaCumprido(idMateria) {
    return document.querySelector(
        `.materia-checkbox[value="${idMateria}"]:checked`
    ) !== null;
}
// Função para encontrar a matéria no objeto de cursoEngenharia
export function encontrarMateria(cursoEngenharia, nomeMateria) {
    for (const periodoKey in cursoEngenharia) {
        const periodo = cursoEngenharia[periodoKey];
        for (const materia of periodo.materias) {
            if (materia.nome === nomeMateria) {
                return materia;
            }
        }
    }
    return null;
}



document.addEventListener('DOMContentLoaded', () => {

    criarLayerDetalhes();
    criarLayerOptativa();

    const toggleButton = document.getElementById('toggleMode');
    const seletor = document.querySelector('.seletor');

    generateStatusColors();
    // recuperarMateriasCumpridas();
    criarPainel(cursoEngenharia);
    atualizarEstadoMaterias(cursoEngenharia);

    toggleButton.addEventListener('click', () => {
        const mode = toggleButton.getAttribute('data-mode');

        if (mode === 'grade') {
            generateCourseColors();
            criarPainel(cursoEngenharia);
            seletor.classList.add('hidden');
            toggleButton.textContent = 'Ver Planejamento';
            toggleButton.setAttribute('data-mode', 'planejamento');
        } else {
            generateStatusColors();
            atualizarEstadoMaterias(cursoEngenharia);
            seletor.classList.remove('hidden');
            toggleButton.textContent = 'Ver Grade Inteira';
            toggleButton.setAttribute('data-mode', 'grade');
        }
    });
});


export function obterIdDaMateriaPorNome(cursoEngenharia, nomeMateria) {
    for (const chave in cursoEngenharia) {
        const periodo = cursoEngenharia[chave];
        for (let i = 0; i < periodo.materias.length; i++) {
            if (periodo.materias[i].nome === nomeMateria) {
                return `${chave}-${i}`;
            }
        }
    }
    return null;
}


export function salvarMateriasCumpridas() {
    const checkboxes = document.querySelectorAll('.materia-checkbox:checked');
    const materiasCumpridas = Array.from(checkboxes).map(checkbox => checkbox.value);

    // Salva no localStorage
    localStorage.setItem('materiasCumpridas', JSON.stringify(materiasCumpridas));

    // Exibe notificação
    Toastify({
        text: "Matérias salvas com sucesso!",
        duration: 3000,
        gravity: "top",
        position: "center",
        backgroundColor: "#4CAF50"
    }).showToast();

    // Recarrega a página após 3 segundos
    setTimeout(() => location.reload(), 3000);
}

export function limparMateriasCumpridas() {
    // Remove do localStorage
    localStorage.removeItem('materiasCumpridas');

    // Desmarca todos os checkboxes
    document.querySelectorAll('.materia-checkbox').forEach(checkbox => checkbox.checked = false);

    // Exibe notificação
    Toastify({
        text: "Matérias limpas com sucesso!",
        duration: 3000,
        gravity: "top",
        position: "center",
        backgroundColor: "#4CAF50"
    }).showToast();

    // Recarrega a página após 3 segundos
    setTimeout(() => location.reload(), 3000);
}
document.getElementById('salvar').addEventListener('click', salvarMateriasCumpridas);
document.getElementById('limpar').addEventListener('click', limparMateriasCumpridas);


export function recuperarMateriasCumpridas() {
    const materiasCumpridas = appState.materiasCumpridas;


    // Marca os checkboxes das matérias cumpridas
    const checkboxes = document.querySelectorAll('.materia-checkbox');
    checkboxes.forEach(checkbox => {
        if (materiasCumpridas.includes(checkbox.value)) {
            checkbox.checked = true;
        }
    });

    // Atualiza o estado visual das matérias
    atualizarEstadoMaterias(cursoEngenharia);
}
export function aplicarEstadoDoUsuario({ materiasCumpridas, optativasSelecionadas }) {
    appState.materiasCumpridas = materiasCumpridas || [];
    appState.optativasSelecionadas = optativasSelecionadas || {};

    // refletir no DOM
    marcarCheckboxes();
    criarPainel(cursoEngenharia);
    atualizarEstadoMaterias(cursoEngenharia);
    generateStatusColors();
}
export function marcarCheckboxes() {
    document.querySelectorAll('.materia-checkbox').forEach(cb => {
        cb.checked = appState.materiasCumpridas.includes(cb.value);
    });
}

const generateCourseColors = () => {
    const coloGraph = document.querySelector('#coloGraph');
    coloGraph.innerHTML = '';  // Limpar qualquer conteúdo anterior

    const items = [
        { class: 'geral', label: 'Geral' },
        { class: 'curso', label: 'Curso' },
        { class: 'optativa', label: 'Optativa' },
        { class: 'estagio', label: 'Estágio' },
        { class: 'tcc', label: 'TCC' },
        { class: 'especifica', label: 'Específica' }
    ];

    items.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('color-item', item.class);

        const box = document.createElement('span');
        box.classList.add('color-box');

        const label = document.createElement('span');
        label.textContent = item.label;

        div.appendChild(box);
        div.appendChild(label);

        coloGraph.appendChild(div);
    });
};

const generateStatusColors = () => {
    const coloGraph = document.querySelector('#coloGraph');
    coloGraph.innerHTML = '';  // Limpar qualquer conteúdo anterior

    const items = [
        { class: 'bloqueada', label: 'Bloqueada' },
        { class: 'cumprida', label: 'Cumprida' },
        { class: 'pendente', label: 'Pendente' }
    ];

    items.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('color-item', item.class);

        const box = document.createElement('span');
        box.classList.add('color-box');

        const label = document.createElement('span');
        label.textContent = item.label;

        div.appendChild(box);
        div.appendChild(label);

        coloGraph.appendChild(div);
    });
};

export function contarMateriasCumpridasReais() {
    const obrigatoriasCumpridas = Array.isArray(appState.materiasCumpridas)
        ? appState.materiasCumpridas.length
        : 0;

    const optativasCumpridas = appState.optativasSelecionadas
        ? Object.keys(appState.optativasSelecionadas).length
        : 0;

    return obrigatoriasCumpridas + optativasCumpridas;
}

let contador = document.querySelector("#contador");

export function atualizarContadorReal(cursoEngenharia) {
    let totalMaterias = 0;

    for (const periodo in cursoEngenharia) {
        totalMaterias += cursoEngenharia[periodo].materias.length;
    }

    const cumpridas = contarMateriasCumpridasReais();
    const restantes = totalMaterias - cumpridas;

    contador.innerHTML =
        `Ainda restam ${restantes} matérias de ${totalMaterias}`;
}


document.addEventListener("firebaseReady", () => {
    atualizarContadorReal(cursoEngenharia);
});




//console.log(localStorage.getItem('materiasCumpridas') ? JSON.parse(localStorage.getItem('materiasCumpridas')) : 0)


export function layoutCursando() {
    let todasAsMaterias = [];
    let materiaPendentes = [];
    let materiaPaga = JSON.parse(localStorage.getItem('materiasCumpridas')) || [];
    for (const chave in cursoEngenharia) {
        const periodo = cursoEngenharia[chave];

        for (let i = 0; i < periodo.materias.length; i++) {
            todasAsMaterias.push(periodo.materias[i].nome)
        }

    }
    for (let i = 0; i < todasAsMaterias.length; i++) {


        for (let j = 0; j < materiaPaga.length; j++) {

            if (todasAsMaterias[i] != materiaPaga[j]) {
                materiaPendentes.push(todasAsMaterias[i]);

            }

        }
    }
    /* for(let i = 0; i<todasAsMaterias.length; i++){
        console.log(todasAsMaterias[i])
    } */
    for (let c = 0; c < materiaPendentes.length; c++) {
        //console.log(materiaPendentes[c])
    }
}

layoutCursando()
