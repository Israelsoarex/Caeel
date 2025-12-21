let cursoEngenharia = {
    primeiro: {
        semestre: 1,
        totalCreditos: 26,
        materias: [
            { nome: "Cálculo Diferencial e Integral I", credito: 6, preRequisito: "", tipo: "geral", sigla: "CAL1" },
            { nome: "Geometria Analítica", credito: 4, preRequisito: "", tipo: "geral", sigla: "GA" },
            { nome: "Algoritmos e Programação", credito: 4, preRequisito: "", tipo: "geral", sigla: "AP" },
            { nome: "Química Geral", credito: 4, preRequisito: "", tipo: "geral", sigla: "QUIM" },
            { nome: "Ciências do Meio Ambiente", credito: 3, preRequisito: "", tipo: "geral", sigla: "CMA" },
            { nome: "Introdução à Engenharia Elétrica", credito: 3, preRequisito: "", tipo: "geral", sigla: "INTRO" },
            { nome: "Instituições do Direito", credito: 2, preRequisito: "", tipo: "geral", sigla: "ID" }
        ]
    },
    segundo: {
        semestre: 2,
        totalCreditos: 28,
        materias: [
            { nome: "Cálculo Diferencial e Integral II", credito: 4, preRequisito: "Cálculo Diferencial e Integral I", tipo: "geral", sigla: "CAL2" },
            { nome: "Álgebra Linear", credito: 4, preRequisito: "Geometria Analítica", tipo: "geral", sigla: "AL" },
            { nome: "Programação Estruturada", credito: 4, preRequisito: "Algoritmos e Programação", tipo: "geral", sigla: "PE" },
            { nome: "Física I", credito: 4, preRequisito: "Cálculo Diferencial e Integral I", tipo: "geral", sigla: "FIS1" },
            { nome: "Laboratório de Física Experimental", credito: 2, preRequisito: "", tipo: "geral", sigla: "LF1" },
            { nome: "Desenho Técnico", credito: 4, preRequisito: "", tipo: "geral", sigla: "DT" },
            { nome: "Circuitos Digitais", credito: 4, preRequisito: "", tipo: "curso", sigla: "", sigla: "CD" },
            { nome: "Laboratório de Circuitos Digitais", credito: 2, preRequisito: "", tipo: "curso", sigla: "LCD" }
        ]
    },
    terceiro: {
        semestre: 3,
        totalCreditos: 28,
        materias: [
            { nome: "Cálculo Diferencial e Integral III", credito: 6, preRequisito: "Cálculo Diferencial e Integral II", tipo: "geral", sigla: "CAL3" },
            { nome: "Equações Diferenciais Ordinárias", credito: 4, preRequisito: ["Cálculo Diferencial e Integral II", "Álgebra Linear"], tipo: "geral", sigla: "EDO" },
            { nome: "Probabilidade e Estatística", credito: 4, preRequisito: "Cálculo Diferencial e Integral II", tipo: "geral", sigla: "PROB" },
            { nome: "Física II", credito: 4, preRequisito: "Física I", tipo: "geral", sigla: "FIS2" },
            { nome: "Arquitetura de Sistemas Computacionais", credito: 4, preRequisito: ["Circuitos Digitais", "Algoritmos e Programação"], tipo: "curso", sigla: "ASC" },
            { nome: "Técnicas de CAD", credito: 4, preRequisito: "Desenho Técnico", tipo: "geral", sigla: "CAD" },
            { nome: "Laboratório de Microcontroladores", credito: 2, preRequisito: ["Programação Estruturada", "Laboratório de Circuitos Digitais"], tipo: "curso", sigla: "LM" }
        ]
    },
    quarto: {
        semestre: 4,
        totalCreditos: 28,
        materias: [
            { nome: "Eletromagnetismo I", credito: 6, preRequisito: "Cálculo Diferencial e Integral III", tipo: "curso", sigla: "ELM1" },
            { nome: "Análise de Sinais e Sistemas", credito: 4, preRequisito: "Equações Diferenciais Ordinárias", tipo: "curso", sigla: "ASS" },
            { nome: "Circuitos Elétricos I", credito: 4, preRequisito: "Equações Diferenciais Ordinárias", tipo: "curso", sigla: "CE1" },
            { nome: "Mecânica Geral", credito: 4, preRequisito: "Física I", tipo: "geral", sigla: "MEC" },
            { nome: "Variáveis Complexas", credito: 4, preRequisito: "Cálculo Diferencial e Integral III", tipo: "geral", sigla: "VC" },
            { nome: "Laboratório de Circuitos Elétricos I", credito: 2, preRequisito: "", tipo: "curso", sigla: "LCE1" },
            { nome: "Métodos Numéricos", credito: 4, preRequisito: ["Equações Diferenciais Ordinárias", "Algoritmos e Programação"], tipo: "geral", sigla: "MN" }
        ]
    },
    quinto: {
        semestre: 5,
        totalCreditos: 23,
        materias: [
            { nome: "Eletromagnetismo II", credito: 4, preRequisito: "Eletromagnetismo I", tipo: "curso", sigla: "ELM2" },
            { nome: "Conversão Eletromecânica", credito: 4, preRequisito: ["Circuitos Elétricos I", "Eletromagnetismo I"], tipo: "curso", sigla: "CEM" },
            { nome: "Circuitos Elétricos II", credito: 4, preRequisito: ["Circuitos Elétricos I", "Variáveis Complexas"], tipo: "curso", sigla: "CE2" },
            { nome: "Dispositivos Eletrônicos", credito: 4, preRequisito: "Circuitos Elétricos I", tipo: "curso", sigla: "DE" },
            { nome: "Transporte de Calor e Massa", credito: 4, preRequisito: "Física II", tipo: "geral", sigla: "TCM" },
            { nome: "Laboratório de Circuitos Elétricos II", credito: 1, preRequisito: "Laboratório de Circuitos Elétricos I", tipo: "curso", sigla: "LCE2" },
            { nome: "Laboratório de Dispositivos Eletrônicos", credito: 2, preRequisito: "Laboratório de Circuitos Elétricos I", tipo: "curso", sigla: "LDE" }
        ]
    },

    sexto: {
        semestre: 6,
        totalCreditos: 23,
        materias: [
            { nome: "Eletrônica de Potência", credito: 4, preRequisito: "Dispositivos Eletrônicos", tipo: "curso", sigla: "EP" },
            { nome: "Máquinas Elétricas", credito: 4, preRequisito: "Conversão Eletromecânica", tipo: "curso", sigla: "ME" },
            { nome: "Análise de Sistemas de Potência", credito: 4, preRequisito: ["Circuitos Elétricos II", "Métodos Numéricos"], tipo: "curso", sigla: "ASP" },
            { nome: "Eletrônica", credito: 4, preRequisito: ["Circuitos Elétricos II", "Dispositivos Eletrônicos"], tipo: "curso", sigla: "EL" },
            { nome: "Sistemas de Controle", credito: 4, preRequisito: "Análise de Sinais e Sistemas", tipo: "curso", sigla: "SC" },
            { nome: "Laboratório de Máquinas Elétricas", credito: 1, preRequisito: "Laboratório de Circuitos Elétricos II", tipo: "curso", sigla: "LME" },
            { nome: "Laboratório de Eletrônica", credito: 2, preRequisito: "Laboratório de Dispositivos Eletrônicos", tipo: "curso", sigla: "LEL" }
        ]
    },
    setimo: {
        semestre: 7,
        totalCreditos: 21,
        materias: [
            { nome: "Instalações Elétricas", credito: 4, preRequisito: "Circuitos Elétricos II", tipo: "curso", sigla: "IEL" },
            { nome: "Princípios de Comunicações", credito: 4, preRequisito: "Análise de Sinais e Sistemas", tipo: "curso", sigla: "PCOM" },
            { nome: "Geração, Transmissão e Distribuição de Energia", credito: 4, preRequisito: "Circuitos Elétricos II", tipo: "curso", sigla: "GTDE" },
            { nome: "Laboratório de Instalações Elétricas", credito: 1, preRequisito: "Laboratório de Circuitos Elétricos II", tipo: "curso", sigla: "LIEL" },
            { nome: "Controle Digital", credito: 4, preRequisito: "Sistemas de Controle", tipo: "curso", sigla: "CDG" },
            { nome: "Laboratório de Controle Digital", credito: 1, preRequisito: "Laboratório de Microcontroladores", tipo: "curso", sigla: "LCDG" },
            { nome: "Projeto Aplicado", credito: 2, preRequisito: ["Laboratório de Microcontroladores", "Laboratório de Eletrônica", "Laboratório de Circuitos Elétricos II"], tipo: "curso", sigla: "PA" },
            { nome: "Laboratório de Eletrônica de Potência", credito: 1, preRequisito: ["Eletrônica de Potência", "Laboratório de Dispositivos Eletrônicos"], tipo: "curso", sigla: "LEP" }
        ]
    },
    oitavo: {
        semestre: 8,
        totalCreditos: 26,
        materias: [
            { nome: "Optativa", credito: 4, preRequisito: "", tipo: "optativa", sigla: "OP" },
            { nome: "Optativa", credito: 4, preRequisito: "", tipo: "optativa", sigla: "OP" },
            { nome: "Optativa", credito: 4, preRequisito: "", tipo: "optativa", sigla: "OP" },
            { nome: "Materiais Elétricos", credito: 3, preRequisito: "Eletromagnetismo I", tipo: "curso", sigla: "MTEL" },
            { nome: "Empreendedorismo", credito: 4, preRequisito: "", tipo: "geral", sigla: "EMP" },
            { nome: "Ergonomia e Segurança no Trabalho", credito: 3, preRequisito: "", tipo: "curso", sigla: "EST" },
            { nome: "Engenharia Econômica", credito: 4, preRequisito: "", tipo: "geral", sigla: "EEC" }
        ]
    },
    nono: {
        semestre: 9,
        totalCreditos: 13,
        materias: [
            { nome: "Optativa", credito: 4, preRequisito: "", tipo: "optativa", sigla: "OP" },
            { nome: "Optativa", credito: 4, preRequisito: "", tipo: "optativa", sigla: "OP" },
            { nome: "Optativa", credito: 4, preRequisito: "", tipo: "optativa", sigla: "OP" },
            { nome: "Projeto de Conclusão", credito: 1, preRequisito: ["Laboratório de Microcontroladores", "Laboratório de Eletrônica", "Laboratório de Circuitos Elétricos II"], tipo: "curso", sigla: "PC" }
        ]
    },
    decimo: {
        semestre: 10,
        totalCreditos: 16,
        materias: [
            { nome: "Estágio Supervisionado", credito: 12, preRequisito: "", tipo: "estagio", sigla: "ESP" },
            { nome: "Trabalho de Conclusão de Curso", credito: 4, preRequisito: "Projeto de Conclusão", tipo: "tcc", sigla: "TCC" }
        ]
    }
};


let materiaOpitativa = {
    eletronica: {
        nome: "Eletrônica",
        materias: [
            {
                nome: "Sistemas de Compensação de Energia",
                credito: 4,
                preRequisito: ["Circuitos Elétricos II", "Eletrônica de Potência"],
                tipo: "optativa",
                sigla: "SISCOMPE"
            },
            {
                nome: "Inversores Multiníveis", credito: 4, preRequisito: ["Eletrônica de Potência"], tipo: "optativa", sigla: "INVMTN"
            },
            {
                nome: "Conversores Ressonantes", credito: 4, preRequisito: ["Eletrônica de Potência"], tipo: "optativa", sigla: "CONVRES"
            },
            {
                nome: "Modelagem e Controle de Conversores", credito: 4, preRequisito: ["Eletrônica de Potência"], tipo: "optativa", sigla: "MODCTRLCON"
            },
            {
                nome: "Retificadores Controlados", credito: 4, preRequisito: ["Eletrônica de Potência"], tipo: "optativa", sigla: "RETCTRL"
            },
            {
                nome: "Tópicos Especiais em Eletrônica de Potência", credito: 4, preRequisito: ["Eletrônica de Potência"], tipo: "optativa", sigla: "TEELPOT"
            },
            {
                nome: "Acionamentos Elétricos Industriais", credito: 4, preRequisito: ["Eletrônica de Potência", "Máquinas Elétricas"], tipo: "optativa", sigla: "ACELIN"
            },
            {
                nome: "Fontes de Alimentação Chaveada", credito: 4, preRequisito: ["Modelagem e Controle de Conversores"], tipo: "optativa", sigla: "FONTCHAV"
            },
            {
                nome: "Sistemas Robóticos", credito: 4, preRequisito: ["Sistemas de Controle", "Eletrônica"], tipo: "optativa", sigla: "SISROB"
            },
            {
                nome: "Sistemas de Processamento de Imagem e Vídeo", credito: 4, preRequisito: ["Eletrônica"], tipo: "optativa", sigla: "PROCIMGVD"
            },
            {
                nome: "Instrumentação Eletrônica", credito: 4, preRequisito: ["Eletrônica"], tipo: "optativa", sigla: "INSTEL"
            },
            {
                nome: "Circuitos Para Comunicações", credito: 4, preRequisito: ["Eletrônica"], tipo: "optativa", sigla: "CIRCCOM"
            },
            {
                nome: "Projeto de CI's Analógicos e Mistos", credito: 4, preRequisito: ["Eletrônica"], tipo: "optativa", sigla: "PROCIAM"
            },
            {
                nome: "Projeto Avançado de Circuitos Analógicos", credito: 4, preRequisito: ["Projeto de CI's Analógicos e Mistos"], tipo: "optativa", sigla: "PRACA"
            },
            {
                nome: "Tópicos Especiais em Eletrônica", credito: 4, preRequisito: ["Eletrônica", "Arquitetura de Sistemas Computacionais", "Laboratório de Microcontroladores"], tipo: "optativa", sigla: "TPESPEL"
            },
            {
                nome: "Projeto de Circuitos VLSI", credito: 4, preRequisito: ["Arquitetura de Sistemas Computacionais", "Laboratório de Microcontroladores"], tipo: "optativa", sigla: "PROJVLSI"
            }

        ]
    },
    controle: {
        nome: "Controle",
        materias: [
            {
                nome: "Técnicas de Otimização",
                credito: 4,
                preRequisito: ["Controle Digital"],
                tipo: "optativa",
                sigla: "TEOT"
            },
            {
                nome: "Controle Robusto",
                credito: 4,
                preRequisito: ["Controle Digital"],
                tipo: "optativa",
                sigla: "CTRLROB"
            },
            {
                nome: "Sistemas de Automação Industrial",
                credito: 4,
                preRequisito: ["Controle Digital"],
                tipo: "optativa",
                sigla: "SISAUIND"
            },
            {
                nome: "Identificação de Sistemas Dinâmicos",
                credito: 4,
                preRequisito: ["Controle Digital"],
                tipo: "optativa",
                sigla: "IDSISDIN"
            },
            {
                nome: "Tópicos Especiais em Controle",
                credito: 4,
                preRequisito: ["Controle Digital"],
                tipo: "optativa",
                sigla: "TOPESPCTRL"
            },
            {
                nome: "Sistemas Lineares",
                credito: 4,
                preRequisito: ["Sistemas de Controle"],
                tipo: "optativa",
                sigla: "SISLN"
            },
            {
                nome: "Inteligência Computacional Aplicada",
                credito: 4,
                preRequisito: ["Programação Estruturada", "Análise de Sinais e Sistemas"],
                tipo: "optativa",
                sigla: "ICOMAP"
            },
            {
                nome: "Estimação e Identificação de Sistemas",
                credito: 4,
                preRequisito: ["Análise de Sinais e Sistemas"],
                tipo: "optativa",
                sigla: "ESTIDSIS"
            },
            {
                nome: "Redes de Computadores",
                credito: 4,
                preRequisito: ["Análise de Sinais e Sistemas"],
                tipo: "optativa",
                sigla: "REDCOMP"
            },
             {
                nome: "Processamento Digital de Sinais", 
                credito: 4, 
                preRequisito: ["Análise de Sinais e Sistemas"],
                tipo: "optativa", 
                sigla: "PRCDIGSIN"
            },
            {
                nome: "Reconhecimento de Padrões", 
                credito: 4, 
                preRequisito: ["Análise de Sinais e Sistemas"],
                tipo: "optativa", 
                sigla: "RECPAD"
            },
            {
                nome: "Redes Neurais", 
                credito: 4, 
                preRequisito:  ["Análise de Sinais e Sistemas"],
                tipo: "optativa", 
                sigla: "RDNEU"
            }
        ]
    },
    telecomunicacoes:{
        nome: "Telecomunicações",
        materias: [
             {
                nome: "Sistemas de Comunicação", 
                credito: 4, 
                preRequisito: ["Princípios de Comunicações"], 
                tipo: "optativa", 
                sigla: "SISCOM"
            },
            {
                nome: "Sistemas de Comunicação Via Rádio", 
                credito: 4, 
                preRequisito: ["Princípios de Comunicações"], 
                tipo: "optativa", 
                sigla: "COMVRAD"
            },
            {
                nome: "Sistemas Telefônicos", 
                credito: 4, 
                preRequisito: ["Princípios de Comunicações"], 
                tipo: "optativa", 
                sigla: "SISTEL"
            },
            {
                nome: "Tópicos Especiais em Telecomunicações", 
                credito: 4, 
                preRequisito: ["Princípios de Comunicações"], 
                tipo: "optativa", 
                sigla: "TPESPTEL"
            },
            {
                nome: "Comunicações Móveis", 
                credito: 4, 
                preRequisito: ["Sistemas de Comunicação"], 
                tipo: "optativa", 
                sigla: "COMMOV"
            },
             {
                nome: "Comunicações Ópticas", 
                credito: 4, 
                preRequisito: ["Sistemas de Comunicação"], 
                tipo: "optativa", 
                sigla: "COMOPT"
            },
            {
                nome: "Comunicações Digitais", 
                credito: 4, 
                preRequisito: ["Sistemas de Comunicação"], 
                tipo: "optativa", 
                sigla: "COMDIG"
            }
        ]
    },
     sistemasPotencia: {
        nome: "Sistemas de Potência",
        materias: [
            {
                nome: "Eficiência Energética", 
                credito: 4, 
                preRequisito: ["Geração, Transmissão e Distribuição de Energia"], 
                tipo: "optativa", 
                sigla: "EFENRG"
            },
            {
                nome: "Subestação e Equipamentos de Potência", 
                credito: 4, 
                preRequisito: ["Geração, Transmissão e Distribuição de Energia"], 
                tipo: "optativa", 
                sigla: "SUBEQPOT"
            },
            {
                nome: "Aterramentos Elétricos", 
                credito: 4, 
                preRequisito: ["Instalações Elétricas"], 
                tipo: "optativa", 
                sigla: "ATEREL"
            },
            {
                nome: "Instalações Elétricas Industriais", 
                credito: 4, 
                preRequisito: ["Instalações Elétricas"], 
                tipo: "optativa", 
                sigla: "INSELIND"
            },
            {
                nome: "Transformadores", 
                credito: 4, 
                preRequisito: ["Circuitos Elétricos II"], 
                tipo: "optativa", 
                sigla: "TRAFO"
            },
             {
                nome: "Qualidade de Energia", 
                credito: 4, 
                preRequisito: ["Análise de Sistemas de Potência"], 
                tipo: "optativa", 
                sigla: "QUALENRG"
            },
            {
                nome: "Transitórios em Sistemas de Energia Elétrica", 
                credito: 4, 
                preRequisito: ["Análise de Sistemas de Potência"], 
                tipo: "optativa", 
                sigla: "TRASISTEEL"
            },
            {
                nome: "Planejamento e Operação de Sistemas de Energia Elétrica", 
                credito: 4, 
                preRequisito: ["Análise de Sistemas de Potência"], 
                tipo: "optativa", 
                sigla: "PLOPSISEL"
            },
            {
                nome: "Distribuição de Energia Elétrica", 
                credito: 4, 
                preRequisito: ["Análise de Sistemas de Potência","Geração, Transmissão e Distribuição de Energia"], 
                tipo: "optativa", 
                sigla: "DISTEEL"
            },
             {
                nome: "Transmissão de Energia Elétrica", 
                credito: 4, 
                preRequisito: ["Análise de Sistemas de Potência","Geração, Transmissão e Distribuição de Energia"], 
                tipo: "optativa", 
                sigla: "TRAEEL"
            },
            {
                nome: "Geração de Energia Elétrica", 
                credito: 4, 
                preRequisito: ["Análise de Sistemas de Potência","Geração, Transmissão e Distribuição de Energia"], 
                tipo: "optativa", 
                sigla: "GEREEL"
            },
            {
                nome: "Proteção de Sistemas Elétricos", 
                credito: 4, 
                preRequisito: ["Análise de Sistemas de Potência","Geração, Transmissão e Distribuição de Energia"], 
                tipo: "optativa", 
                sigla: "PROTSISEL"
            },
            {
                nome: "Tópicos Especiais em Sistemas de Potência", 
                credito: 4, 
                preRequisito: ["Análise de Sistemas de Potência","Geração, Transmissão e Distribuição de Energia"], 
                tipo: "optativa", 
                sigla: "TOPESPSISEP"
            },
            {
                nome: "Manutenção de Sistemas Elétricos", 
                credito: 4, 
                preRequisito: ["Distribuição de Energia Elétrica"], 
                tipo: "optativa", 
                sigla: "MANSISEL"
            },
        ]
    }
}

//console.log(materiaOpitativa.eletronica);



/* {
                nome:"", credito: 4, preRequisito: [""], tipo: "optativa", sigla: ""
            }, */