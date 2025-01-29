function criarPainel(cursoEngenharia) {
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
        periodo.materias.forEach((materia) => {
    const divMateria = document.createElement('div');
    divMateria.className = `materia ${materia.tipo}`;
    
    divMateria.innerHTML = `
        <p>${materia.nome}</p>
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
    const todasCumpridas = periodo.materias.every(materia => estaCumprido(materia.nome));
    if (todasCumpridas) {
        //divMateria.style.pointerEvents = 'none'; // Desativa o clique nas matérias cumpridas
       // divMateria.style.opacity = '0.6'; // Torna as matérias cumpridas semi-transparentes
    }

    // Adiciona o evento de clique para mostrar os detalhes
    divMateria.addEventListener('click', () => {
        const mode = document.querySelector('#toggleMode').getAttribute('data-mode');
        
        if (!todasCumpridas || mode === 'planejamento') {  // Verifica se o período não está cumprido
            mostrarDetalhes(materia);
        }
    });

    divPeriodo.appendChild(divMateria);
});

        // Adiciona o período ao painel
        painel.appendChild(divPeriodo);

        // Controla o overflow do período (ativa ou desativa dependendo se cumprido)
        const todasCumpridas = periodo.materias.every(materia => estaCumprido(materia.nome));
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

function mostrarDetalhes(materia) {
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

function criarLayerDetalhes() {
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

function criarSeletor(cursoEngenharia) {
    
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
        periodo.materias.forEach((materia) => {
            const checkboxContainer = document.createElement('label');
            checkboxContainer.innerHTML = `
               ${materia.sigla} <input type="checkbox" class="materia-checkbox" value="${materia.nome}">
                
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

// Exemplo de chamada da função
criarSeletor(cursoEngenharia)

// Adiciona um botão para capturar os valores selecionados
document.querySelector('.seletor').addEventListener('change', () => {
    const selecionados = Array.from(document.querySelectorAll('.materia-checkbox:checked'))
        .map((checkbox) => checkbox.value);
        criarPainel(cursoEngenharia)
 atualizarEstadoMaterias(cursoEngenharia)
});

function atualizarEstadoMaterias(cursoEngenharia) {
    const todosOsPeriodos = document.querySelectorAll(".periodo");

    todosOsPeriodos.forEach((divPeriodo, index) => {
        const periodoKey = Object.keys(cursoEngenharia)[index];
        const periodo = cursoEngenharia[periodoKey];

        // Verifica se todas as matérias do período estão cumpridas
        const todasCumpridas = periodo.materias.every((materia) => estaCumprido(materia.nome));

        if (todasCumpridas) {
            divPeriodo.style.backgroundColor = 'gray'; // Marca o período como cumprido
            divPeriodo.style.overflow = 'hidden'; // Desabilita o overflow para períodos cumpridos
            divPeriodo.classList.add('cumprido'); // Adiciona a classe 'cumprido' para efeitos visuais
            adicionarOverlay(divPeriodo); // Adiciona a sobreposição visual
        } else {
            divPeriodo.style.backgroundColor = ''; // Remove o estilo se não estiver cumprido
            divPeriodo.style.overflow = 'scroll'; // Permite o overflow para períodos não cumpridos
            divPeriodo.classList.remove('cumprido'); // Remove a classe 'cumprido' para efeitos visuais
            removerOverlay(divPeriodo); // Remove a sobreposição visual se não cumprido
        }

        // Atualiza o estado de cada matéria no período
        const materiasElements = divPeriodo.querySelectorAll('.materia');
        materiasElements.forEach((materiaElement) => {
            const nomeMateria = materiaElement.querySelector('p').textContent;
            const materia = encontrarMateria(cursoEngenharia, nomeMateria);
            const preRequisitos = Array.isArray(materia.preRequisito) ? materia.preRequisito : (materia.preRequisito ? [materia.preRequisito] : []);

            if (preRequisitos.length === 0 || preRequisitos.every(pr => estaCumprido(pr))) {
                // Matéria pode ser cumprida
                if (estaCumprido(nomeMateria)) {
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
function adicionarOverlay(periodoElement) {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    overlay.innerText = 'Já Cumprido';
    periodoElement.appendChild(overlay);
}

// Função para remover o overlay visual
function removerOverlay(periodoElement) {
    const overlay = periodoElement.querySelector('.overlay');
    if (overlay) {
        overlay.remove();
    }
}
/// remove classes 
function removedorDeClasse(elemento, classe) {
    elemento.classList.remove("curso");
    elemento.classList.remove("geral");
    elemento.classList.remove("optativa");
    elemento.classList.remove("estagio");
    elemento.classList.remove("tcc");
    elemento.classList.remove("especifica");
    elemento.className = `materia ${classe}`;
}


// Função para verificar se a matéria está cumprida (se está marcada no checkbox)
function estaCumprido(nomeMateria) {
    const checkboxes = document.querySelectorAll('.materia-checkbox:checked');
    return Array.from(checkboxes).some(checkbox => checkbox.value === nomeMateria);
}

// Função para encontrar a matéria no objeto de cursoEngenharia
function encontrarMateria(cursoEngenharia, nomeMateria) {
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
    const toggleButton = document.getElementById('toggleMode');
    const seletor = document.querySelector('.seletor');
    generateStatusColors();
    recuperarMateriasCumpridas();
    criarPainel(cursoEngenharia)
    atualizarEstadoMaterias(cursoEngenharia);
    toggleButton.addEventListener('click', () => {
        const mode = toggleButton.getAttribute('data-mode');

        if (mode === 'grade') {
            // Exibir a grade inteira
            generateCourseColors();
            criarLayerDetalhes();
criarPainel(cursoEngenharia);

const periodos = document.querySelectorAll('.periodo');
            periodos.forEach(periodo => {
                const materias = periodo.querySelectorAll('.materia');
                periodo.style.overflowY = "scroll"
                materias.forEach(materia => {
                    materia.style.opacity = '1';});
});

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

function salvarMateriasCumpridas() {
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

function limparMateriasCumpridas() {
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


function recuperarMateriasCumpridas() {
    const materiasCumpridas = JSON.parse(localStorage.getItem('materiasCumpridas')) || [];

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
