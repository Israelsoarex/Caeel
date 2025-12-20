let cursoEngenharia = {
    primeiro: {
        semestre: 1,
        totalCreditos: 26,
        materias: [
            { nome: "Cálculo Diferencial e Integral I", credito: 6, preRequisito: "", tipo: "geral" , sigla: "CAL1"},
            { nome: "Geometria Analítica", credito: 4, preRequisito: "", tipo: "geral" , sigla: "GA" },
            { nome: "Algoritmos e Programação", credito: 4, preRequisito: "", tipo: "geral" , sigla: "AP" },
            { nome: "Química Geral", credito: 4, preRequisito: "", tipo: "geral" , sigla: "QUIM" },
            { nome: "Ciências do Meio Ambiente", credito: 3, preRequisito: "", tipo: "geral" , sigla: "CMA" },
            { nome: "Introdução à Engenharia Elétrica", credito: 3, preRequisito: "", tipo: "geral" , sigla: "INTRO" },
            { nome: "Instituições do Direito", credito: 2, preRequisito: "", tipo: "geral" , sigla: "ID"}
        ]
    },
    segundo: {
        semestre: 2,
        totalCreditos: 28,
        materias: [
            { nome: "Cálculo Diferencial e Integral II", credito: 4, preRequisito: "Cálculo Diferencial e Integral I", tipo: "geral" , sigla: "CAL2"},
            { nome: "Álgebra Linear", credito: 4, preRequisito: "Geometria Analítica", tipo: "geral" , sigla: "AL"},
            { nome: "Programação Estruturada", credito: 4, preRequisito: "Algoritmos e Programação", tipo: "geral" , sigla: "PE"},
            { nome: "Física I", credito: 4, preRequisito: "Cálculo Diferencial e Integral I", tipo: "geral" , sigla: "FIS1"},
            { nome: "Laboratório de Física Experimental", credito: 2, preRequisito: "", tipo: "geral" , sigla: "LF1"},
            { nome: "Desenho Técnico", credito: 4, preRequisito: "", tipo: "geral" , sigla: "DT"},
            { nome: "Circuitos Digitais", credito: 4, preRequisito: "", tipo: "curso" , sigla: "" , sigla: "CD" },
            { nome: "Laboratório de Circuitos Digitais", credito: 2, preRequisito: "", tipo: "curso" , sigla: "LCD" }
        ]
    },
    terceiro: {
        semestre: 3,
        totalCreditos: 28,
        materias: [
            { nome: "Cálculo Diferencial e Integral III", credito: 6, preRequisito: "Cálculo Diferencial e Integral II", tipo: "geral" , sigla: "CAL3"},
            { nome: "Equações Diferenciais Ordinárias", credito: 4, preRequisito: ["Cálculo Diferencial e Integral II", "Álgebra Linear"], tipo: "geral" , sigla: "EDO"},
            { nome: "Probabilidade e Estatística", credito: 4, preRequisito: "Cálculo Diferencial e Integral II", tipo: "geral" , sigla: "PROB"},
            { nome: "Física II", credito: 4, preRequisito: "Física I", tipo: "geral" , sigla: "FIS2"},
            { nome: "Arquitetura de Sistemas Computacionais", credito: 4, preRequisito: ["Circuitos Digitais", "Algoritmos e Programação"], tipo: "curso" , sigla: "ASC" },
            { nome: "Técnicas de CAD", credito: 4, preRequisito: "Desenho Técnico", tipo: "geral" , sigla: "CAD"},
            { nome: "Laboratório de Microcontroladores", credito: 2, preRequisito: ["Programação Estruturada","Laboratório de Circuitos Digitais"], tipo: "curso" , sigla: "LM" }
        ]
    },
    quarto: {
        semestre: 4,
        totalCreditos: 28,
        materias: [
            { nome: "Eletromagnetismo I", credito: 6, preRequisito: "Cálculo Diferencial e Integral III", tipo: "curso" , sigla: "ELM1" },
            { nome: "Análise de Sinais e Sistemas", credito: 4, preRequisito: "Equações Diferenciais Ordinárias", tipo: "curso" , sigla: "ASS" },
            { nome: "Circuitos Elétricos I", credito: 4, preRequisito: "Equações Diferenciais Ordinárias", tipo: "curso" , sigla: "CE1" },
            { nome: "Mecânica Geral", credito: 4, preRequisito: "Física I", tipo: "geral" , sigla: "MEC"},
            { nome: "Variáveis Complexas", credito: 4, preRequisito: "Cálculo Diferencial e Integral III", tipo: "geral" , sigla: "VC"},
            { nome: "Laboratório de Circuitos Elétricos I", credito: 2, preRequisito: "", tipo: "curso" , sigla: "LCE1" },
            { nome: "Métodos Numéricos", credito: 4, preRequisito: ["Equações Diferenciais Ordinárias", "Algoritmos e Programação"], tipo: "geral" , sigla: "MN"}
        ]
    },
    quinto: {
        semestre: 5,
        totalCreditos: 23,
        materias: [
            { nome: "Eletromagnetismo II", credito: 4, preRequisito: "Eletromagnetismo I", tipo: "curso" , sigla: "ELM2" },
            { nome: "Conversão Eletromecânica", credito: 4, preRequisito: "Circuitos Elétricos I", tipo: "curso" , sigla: "CEM" },
            { nome: "Circuitos Elétricos II", credito: 4, preRequisito: ["Circuitos Elétricos I", "Variáveis Complexas"], tipo: "curso" , sigla: "CE2" },
            { nome: "Dispositivos Eletrônicos", credito: 4, preRequisito: "Circuitos Elétricos I", tipo: "curso" , sigla: "DE" },
            { nome: "Transporte de Calor e Massa", credito: 4, preRequisito: "Física II", tipo: "geral" , sigla: "TCM"},
            { nome: "Laboratório de Circuitos Elétricos II", credito: 1, preRequisito: "Laboratório de Circuitos Elétricos I", tipo: "curso" , sigla: "LCE2" },
            { nome: "Laboratório de Dispositivos Eletrônicos", credito: 2, preRequisito: "Laboratório de Circuitos Elétricos I", tipo: "curso" , sigla: "LDE" }
        ]
    },
    
    sexto: {
        semestre: 6,
        totalCreditos: 23,
        materias: [
            { nome: "Eletrônica de Potência", credito: 4, preRequisito: "Dispositivos Eletrônicos" , tipo: "curso" , sigla: "EP"  },
            { nome: "Máquinas Elétricas", credito: 4, preRequisito: "Conversão Eletromecânica", tipo: "curso" , sigla: "ME" },
            { nome: "Análise de Sistemas de Potência", credito: 4, preRequisito: ["Circuitos Elétricos II", "Métodos Numéricos"], tipo: "curso" , sigla: "ASP" },
            { nome: "Eletrônica", credito: 4, preRequisito: ["Circuitos Elétricos II","Dispositivos Eletrônicos"], tipo: "curso" , sigla: "EL" },
            { nome: "Sistemas de Controle", credito: 4, preRequisito: "Análise de Sinais e Sistemas", tipo: "curso" , sigla: "SC" },
            { nome: "Laboratório de Máquinas Elétricas", credito: 1, preRequisito: "Laboratório de Circuitos Elétricos II", tipo: "curso" , sigla: "LME" },
            { nome: "Laboratório de Eletrônica", credito: 2, preRequisito: "Laboratório de Dispositivos Eletrônicos", tipo: "curso" , sigla: "LEL" }
        ]
    },
    setimo: {
        semestre: 7,
        totalCreditos: 21,
        materias: [
            { nome: "Instalações Elétricas", credito: 4, preRequisito: "Circuitos Elétricos II", tipo: "curso" , sigla: "IEL" },
            { nome: "Princípios de Comunicações", credito: 4, preRequisito: "Análise de Sinais e Sistemas", tipo: "curso" , sigla: "PCOM" },
            { nome: "Geração, Transmissão e Distribuição de Energia", credito: 4, preRequisito: "Circuitos Elétricos II", tipo: "curso" , sigla: "GTDE" },
            { nome: "Laboratório de Instalações Elétricas", credito: 1, preRequisito: "Laboratório de Circuitos Elétricos II", tipo: "curso" , sigla: "LIEL" },
            { nome: "Controle Digital", credito: 4, preRequisito: "Sistemas de Controle", tipo: "curso" , sigla: "CDG" },
            { nome: "Laboratório de Controle Digital", credito: 1, preRequisito: "Laboratório de Microcontroladores", tipo: "curso" , sigla: "LCDG" },
            { nome: "Projeto Aplicado", credito: 2, preRequisito: ["Laboratório de Microcontroladores","Laboratório de Eletrônica","Laboratório de Circuitos Elétricos II"], tipo: "curso" , sigla: "PA" },
            { nome: "Laboratório de Eletrônica de Potência", credito: 1, preRequisito: ["Eletrônica de Potência","Laboratório de Dispositivos Eletrônicos"], tipo: "curso" , sigla: "LEP" }
        ]
    },
    oitavo: {
        semestre: 8,
        totalCreditos: 26,
        materias: [
            { nome: "Optativa", credito: 4, preRequisito: "", tipo: "optativa" , sigla: "OP"},
            { nome: "Optativa", credito: 4, preRequisito: "", tipo: "optativa" , sigla: "OP"},
            { nome: "Optativa", credito: 4, preRequisito: "", tipo: "optativa" , sigla: "OP"},
            { nome: "Materiais Elétricos", credito: 3, preRequisito: "Eletromagnetismo I", tipo: "curso" , sigla: "MTEL" },
            { nome: "Empreendedorismo", credito: 4, preRequisito: "", tipo: "geral" , sigla: "EMP"},
            { nome: "Ergonomia e Segurança no Trabalho", credito: 3, preRequisito: "", tipo: "curso" , sigla: "EST" },
            { nome: "Engenharia Econômica", credito: 4, preRequisito: "", tipo: "geral" , sigla: "EEC"}
        ]
    },
    nono: {
        semestre: 9,
        totalCreditos: 13,
        materias: [
            { nome: "Optativa", credito: 4, preRequisito: "", tipo: "optativa" , sigla: "OP"},
            { nome: "Optativa", credito: 4, preRequisito: "", tipo: "optativa" , sigla: "OP"},
            { nome: "Optativa", credito: 4, preRequisito: "", tipo: "optativa" , sigla: "OP"},
            { nome: "Projeto de Conclusão", credito: 1, preRequisito: ["Laboratório de Microcontroladores","Laboratório de Eletrônica","Laboratório de Circuitos Elétricos II"], tipo: "curso" , sigla: "PC" }
        ]
    },
    decimo: {
        semestre: 10,
        totalCreditos: 16,
        materias: [
            { nome: "Estágio Supervisionado", credito: 12, preRequisito: "", tipo: "estagio" , sigla: "ESP"},
            { nome: "Trabalho de Conclusão de Curso", credito: 4, preRequisito: "Projeto de Conclusão", tipo: "tcc", sigla: "TCC" }
        ]
    }
};


let materiaOpcional = {
    eletronica: {
        nome: "Eletrônica",
        materias: [
            {
                nome: "Sistemas de Compensação de Energia", credito: 4, preRequisito: ["Circuitos Elétricos II", "Eletrônica de Potência"], tipo: "optativa", sigla: "SISCOMPE"
            },
            {
                nome:"Inversores Multiníveis", credito: 4, preRequisito: ["Eletrônica de Potência"], tipo: "optativa", sigla: "INVMTN"
            },
            {
                nome:"Conversores Ressonantes", credito: 4, preRequisito: ["Eletrônica de Potência"], tipo: "optativa", sigla: "CONVRES"
            },
              {
                nome:"Modelagem e Controle de Conversores", credito: 4, preRequisito: ["Eletrônica de Potência"], tipo: "optativa", sigla: "MODCTRLCON"
            },
            {
                nome:"Retificadores Controlados", credito: 4, preRequisito: ["Eletrônica de Potência"], tipo: "optativa", sigla: "RETCTRL"
            },
            {
                nome:"Tópicos Especiais", credito: 4 , preRequisito: [""], tipo: "optativa", sigla: ""
            }
        ]
    }
}

//console.log(materiaOpcional);



/* {
                nome:"", credito: 4, preRequisito: [""], tipo: "optativa", sigla: ""
            }, */