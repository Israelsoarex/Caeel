function criarPainel(cursoEngenharia) {
    const painel = document.querySelector('.painel');

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

            // Adiciona o evento de clique para mostrar os detalhes
            divMateria.addEventListener('click', () => {
                mostrarDetalhes(materia);
            });

            divPeriodo.appendChild(divMateria);
        });

        // Adiciona o período ao painel
        painel.appendChild(divPeriodo);
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
    const detalhesLayer = document.getElementById('detalhesLayer');
    const detalhesTitulo = document.getElementById('detalhesTitulo');
    const detalhesDescricao = document.getElementById('detalhesDescricao');
    const detalhesPreRequisitos = document.getElementById('detalhesPreRequisitos');

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
// Adiciona o evento para fechar o layer
document.getElementById('fecharDetalhes').addEventListener('click', () => {
    document.getElementById('detalhesLayer').style.display = 'none';
});

document.getElementById('detalhesLayer').addEventListener("click", ()=>{
    document.getElementById('detalhesLayer').style.display = 'none';
});

criarPainel(cursoEngenharia)
