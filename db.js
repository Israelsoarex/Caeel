let cursoEngenharia = {
    primeiro: {
        semestre: 1,
        totalCreditos: 26,
        materias: [
            { nome: "Cálculo Diferencial e Integral I", credito: 6, preRequisito: "", tipo: "geral" },
            { nome: "Geometria Analítica", credito: 4, preRequisito: "", tipo: "geral" },
            { nome: "Algoritmos e Programação", credito: 4, preRequisito: "", tipo: "geral" },
            { nome: "Química Geral", credito: 4, preRequisito: "", tipo: "geral" },
            { nome: "Ciências do Meio Ambiente", credito: 3, preRequisito: "", tipo: "geral" },
            { nome: "Introdução à Engenharia Elétrica", credito: 3, preRequisito: "", tipo: "geral" },
            { nome: "Instituições do Direito", credito: 2, preRequisito: "", tipo: "geral" }
        ]
    },
    segundo: {
        semestre: 2,
        totalCreditos: 28,
        materias: [
            { nome: "Cálculo Diferencial e Integral II", credito: 4, preRequisito: "Cálculo Diferencial e Integral I", tipo: "geral" },
            { nome: "Álgebra Linear", credito: 4, preRequisito: "Geometria Analítica", tipo: "geral" },
            { nome: "Programação Estruturada", credito: 4, preRequisito: "Algoritmos e Programação", tipo: "geral" },
            { nome: "Física I", credito: 4, preRequisito: "Cálculo Diferencial e Integral I", tipo: "geral" },
            { nome: "Laboratório de Física Experimental", credito: 2, preRequisito: "", tipo: "geral" },
            { nome: "Desenho Técnico", credito: 4, preRequisito: "", tipo: "geral" },
            { nome: "Circuitos Digitais", credito: 4, preRequisito: "", tipo: "curso" },
            { nome: "Laboratório de Circuitos Digitais", credito: 2, preRequisito: "", tipo: "curso" }
        ]
    },
    terceiro: {
        semestre: 3,
        totalCreditos: 28,
        materias: [
            { nome: "Cálculo Diferencial e Integral III", credito: 6, preRequisito: "Cálculo Diferencial e Integral II", tipo: "geral" },
            { nome: "Equações Diferenciais Ordinárias", credito: 4, preRequisito: ["Cálculo Diferencial e Integral II", "Álgebra Linear"], tipo: "geral" },
            { nome: "Probabilidade e Estatística", credito: 4, preRequisito: "Cálculo Diferencial e Integral II", tipo: "geral" },
            { nome: "Física II", credito: 4, preRequisito: "Física I", tipo: "geral" },
            { nome: "Arquitetura de Sistemas Computacionais", credito: 4, preRequisito: ["Circuitos Digitais", "Algoritmos e Programação"], tipo: "curso" },
            { nome: "Técnicas de CAD", credito: 4, preRequisito: "Desenho Técnico", tipo: "geral" },
            { nome: "Laboratório de Microcontroladores", credito: 2, preRequisito: "Programação Estruturada", tipo: "curso" }
        ]
    },
    quarto: {
        semestre: 4,
        totalCreditos: 28,
        materias: [
            { nome: "Eletromagnetismo I", credito: 6, preRequisito: "Cálculo Diferencial e Integral III", tipo: "curso" },
            { nome: "Análise de Sinais e Sistemas", credito: 4, preRequisito: "Equações Diferenciais Ordinárias", tipo: "curso" },
            { nome: "Circuitos Elétricos I", credito: 4, preRequisito: "Equações Diferenciais Ordinárias", tipo: "curso" },
            { nome: "Mecânica Geral", credito: 4, preRequisito: "Física I", tipo: "geral" },
            { nome: "Variáveis Complexas", credito: 4, preRequisito: "Cálculo Diferencial e Integral III", tipo: "geral" },
            { nome: "Laboratório de Circuitos Elétricos I", credito: 2, preRequisito: "", tipo: "curso" },
            { nome: "Métodos Numéricos", credito: 4, preRequisito: ["Equações Diferenciais Ordinárias", "Algoritmos e Programação"], tipo: "geral" }
        ]
    },
    quinto: {
        semestre: 5,
        totalCreditos: 23,
        materias: [
            { nome: "Eletromagnetismo II", credito: 4, preRequisito: "Eletromagnetismo I", tipo: "curso" },
            { nome: "Conversão Eletromecânica", credito: 4, preRequisito: "Circuitos Elétricos I", tipo: "curso" },
            { nome: "Circuitos Elétricos II", credito: 4, preRequisito: ["Circuitos Elétricos I", "Variáveis Complexas"], tipo: "curso" },
            { nome: "Dispositivos Eletrônicos", credito: 4, preRequisito: "Circuitos Elétricos I", tipo: "curso" },
            { nome: "Transporte de Calor e Massa", credito: 4, preRequisito: "Física II", tipo: "geral" },
            { nome: "Laboratório de Circuitos Elétricos II", credito: 1, preRequisito: "Laboratório de Circuitos Elétricos I", tipo: "curso" },
            { nome: "Laboratório de Dispositivos Eletrônicos", credito: 2, preRequisito: "Laboratório de Circuitos Elétricos I", tipo: "curso" }
        ]
    },
    
    sexto: {
        semestre: 6,
        totalCreditos: 23,
        materias: [
            { nome: "Eletrônica de Potência", credito: 4, preRequisito: "Dispositivos Eletrônicos" , tipo: "curso"  },
            { nome: "Máquinas Elétricas", credito: 4, preRequisito: "Conversão Eletromecânica", tipo: "curso" },
            { nome: "Análise de Sistemas de Potência", credito: 4, preRequisito: ["Circuitos Elétricos II", "Métodos Numéricos"], tipo: "curso" },
            { nome: "Eletrônica", credito: 4, preRequisito: ["Circuitos Elétricos II","Dispositivos Eletrônicos"], tipo: "curso" },
            { nome: "Sistemas de Controle", credito: 4, preRequisito: "Análise de Sinais e Sistemas", tipo: "curso" },
            { nome: "Laboratório de Máquinas Elétricas", credito: 1, preRequisito: "Laboratório de Circuitos Elétricos II", tipo: "curso" },
            { nome: "Laboratório de Eletrônica", credito: 2, preRequisito: "Laboratório de Dispositivos Eletrônicos", tipo: "curso" }
        ]
    },
    setimo: {
        semestre: 7,
        totalCreditos: 21,
        materias: [
            { nome: "Instalações Elétricas", credito: 4, preRequisito: "Circuitos Elétricos II", tipo: "curso" },
            { nome: "Princípios de Comunicações", credito: 4, preRequisito: "Análise de Sinais e Sistemas", tipo: "curso" },
            { nome: "Geração, Transmissão e Distribuição de Energia", credito: 4, preRequisito: "Circuitos Elétricos II", tipo: "curso" },
            { nome: "Laboratório de Instalações Elétricas", credito: 1, preRequisito: "Laboratório de Circuitos Elétricos II", tipo: "curso" },
            { nome: "Controle Digital", credito: 4, preRequisito: "Sistemas de Controle", tipo: "curso" },
            { nome: "Laboratório de Controle Digital", credito: 1, preRequisito: "Laboratório de Microcontroladores", tipo: "curso" },
            { nome: "Projeto Aplicado", credito: 2, preRequisito: ["Laboratório de Microcontroladores","Laboratório de Eletrônica","Laboratório de Circuitos Elétricos II"], tipo: "curso" },
            { nome: "Laboratório de Eletrônica de Potência", credito: 1, preRequisito: ["Eletrônica de Potência","Laboratório de Dispositivos Eletrônicos"], tipo: "curso" }
        ]
    },
    oitavo: {
        semestre: 8,
        totalCreditos: 26,
        materias: [
            { nome: "Optativa", credito: 4, preRequisito: "", tipo: "optativa" },
            { nome: "Optativa", credito: 4, preRequisito: "", tipo: "optativa" },
            { nome: "Optativa", credito: 4, preRequisito: "", tipo: "optativa" },
            { nome: "Materiais Elétricos", credito: 3, preRequisito: "Eletromagnetismo I", tipo: "curso" },
            { nome: "Empreendedorismo", credito: 4, preRequisito: "", tipo: "geral" },
            { nome: "Ergonomia e Segurança no Trabalho", credito: 3, preRequisito: "", tipo: "curso" },
            { nome: "Engenharia Econômica", credito: 4, preRequisito: "", tipo: "geral" }
        ]
    },
    nono: {
        semestre: 9,
        totalCreditos: 13,
        materias: [
            { nome: "Optativa", credito: 4, preRequisito: "", tipo: "optativa" },
            { nome: "Optativa", credito: 4, preRequisito: "", tipo: "optativa" },
            { nome: "Optativa", credito: 4, preRequisito: "", tipo: "optativa" },
            { nome: "Projeto de Conclusão", credito: 1, preRequisito: ["Laboratório de Microcontroladores","Laboratório de Eletrônica","Laboratório de Circuitos Elétricos II"], tipo: "curso" }
        ]
    },
    decimo: {
        semestre: 10,
        totalCreditos: 16,
        materias: [
            { nome: "Estágio Supervisionado", credito: 12, preRequisito: "", tipo: "estagio" },
            { nome: "Trabalho de Conclusão de Curso", credito: 4, preRequisito: "Projeto de Conclusão", tipo: "tcc" }
        ]
    }
};


for (let chave in cursoEngenharia) {
   for (let i = 0; i < cursoEngenharia[chave].materias.length; i++) {
      if(cursoEngenharia[chave].materias[i].preRequisito) {
          console.log(cursoEngenharia[chave].materias[i].preRequisito)
      }else {
          console.log("vazio")
      } 
       
   }
  

}
