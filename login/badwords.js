// 📋 LISTA COMPLETA DE PALAVRAS OFENSIVAS EM PORTUGUÊS
const palavrasProibidasCompletas = {
    // ========== PALAVRÕES FORTES ==========
    palavroes: [
        'porra', 'caralho', 'merda', 'bosta', 'cocô', 'rola', 'pica', 
        'piroca', 'buceta', 'xoxota', 'xana', 'pussy', 'vagina', 'pênis', 'piru', 'bilau', 'rolinha', 'carai', 'cacete', 'cacetada',
        'cacetão', 'foda', 'foder', 'fodido', 'fodão', 'vadia', 'puta', 'puto',
        'prostituta', 'rapariga', 'xereca', 'punheta', 'masturbação', 'orgasmo',
        'ejaculação', 'sêmen', 'porra', 'esperma', 'ânus','cool', 'brioco', 'cuzinho','cuzin'
    ],

    // ========== INSULTOS E OFENSAS ==========
    insultos: [
        'imbecil', 'idiota', 'burro', 'estúpido', 'cretino', 'babaca', 'otário',
        'trouxa', 'jumento', 'asno', 'animal', 'bestial', 'ignorante', 'analfabeto',
        'grosso', 'grosseria', 'arrombado', 'escroto', 'canalha', 'safado', 'vagabundo',
        'malandro', 'pilantra', 'ladrão', 'bandido', 'marginal', 'delinquente',
        'desgraçado', 'desprezível', 'nojento', 'nojentão', 'fedido', 'fedorento',
        'porco', 'sujo', 'imundo', 'vil', 'baixo', 'infame', 'traidor', 'falso',
        'mentiroso', 'enganador', 'charlatão', 'farsante', 'hipócrita', 'fingido',
        'covarde', 'fracote', 'frangote', 'mole', 'mariquinha', 'bicha', 'viado',
        'gayzão', 'baitola', 'boiola', 'sapatão', 'lésbica', 'sapatão', 'traveco',
        'travesti', 'trans', 'veado', 'bichinha', 'afeminado', 'mulherzinha','gostoso','mimas','turbando','turbano'
    ],

    // ========== TERMOS RACISTAS/XENÓFOBOS ==========
    racismo: [
        'preto', 'negro', 'negrinho', 'negrão', 'crioulo', 'macaco', 'símio',
        'bugre', 'indio', 'índio', 'caboclo', 'caipira', 'jeca', 'roceiro',
        'japonês', 'japa', 'china', 'chinês', 'coreano', 'coreia', 'alemão',
        'gringo', 'estrangeiro', 'baiano', 'cearense', 'paraíba', 'nordestino',
        'nortista', 'sulista', 'paulista', 'carioca', 'mineiro', 'gaúcho',
        'paranaense', 'bauru', 'portuga', 'português', 'espanhol', 'argentino',
        'boliviano', 'paraguaio', 'peruano', 'chileno', 'uruguaio', 'colombiano',
        'venezuelano', 'haitiano', 'senegalês', 'angolano', 'moçambicano'
    ],

    // ========== TERMOS HOMOFÓBICOS ==========
    homofobia: [
        'viadinho', 'bichinha', 'boiolinha', 'gayzinho', 'sapatão', 'sapatao',
        'lésbica', 'lesbica', 'traveco', 'travequinho', 'trans', 'transexual',
        'travesti', 'crossdresser', 'dragqueen', 'dragking', 'queer', 'lgbt',
        'homossexual', 'hetero', 'heterossexual', 'assexual', 'bissexual',
        'pansexual', 'não-binário', 'nao-binario', 'genderfluid', 'agênero',
        'cisgênero', 'cisgenero', 'transtorno', 'disforia', 'hormônio', 'hormonio', 'gay'
    ],

    // ========== NOMES HISTÓRICOS PROBLEMÁTICOS ==========
    nomesProibidos: [
        'hitler', 'adolf', 'adolfhitler', 'adolph', 'mussolini', 'benito',
        'stalin', 'josephstalin', 'maozedong', 'polpot', 'kimjong',
        'kimjongun', 'kimjongil', 'putin', 'vladimirputin',
        'jairbolsonaro', 'lula', 'luladrão', 'lularoubo', 'micheltemer'
    ],

    // ========== TERMOS POLÍTICOS OFENSIVOS ==========
    politicos: [
        'comunista', 'comuna', 'socialista', 'capitalista', 'liberal',
        'conservador', 'reacionário', 'reacionario', 'fascista', 'nazista',
        'nazi', 'skinhead', 'supremacista', 'white', 'black',
        'negro', 'racial', 'etnia', 'etnico', 'étnico', 'minoria'
    ],

    // ========== PALAVRÕES COM EMOJIS E CÓDIGOS ==========
    emojiCodigos: [
        'f0d4-53', 'f0d4s3', 'fodase', 'vtnc', 'vsf', 'vsft', 'pqp',
        'pnc', 'vai tomar', 'vai se fuder', 'vsfd', 'c@ralh0', 'p0rr@',
        'm3rd@', 'buc3t@', 'x0x0t@', 'put@', 'f0d@', 'arr0mb@d0', 'g4y'
    ],

    // ========== PALAVRÕES EM INGLÊS ==========
    ingles: [
        'shit', 'fuck', 'bitch', 'bastard', 'damn',
        'dick', 'cock', 'pussy', 'whore', 'slut', 'motherfucker'
    ],

    // ========== TERMOS DE ÓDIO ==========
    odio: [
        'morte', 'matar', 'assassinar', 'suicídio', 'suicidio', 'morrer',
        'enforcar', 'enforcamento', 'atirar', 'arma', 'faca',
        'esfaquear', 'esfaqueamento', 'bomba', 'explodir', 'explosão',
        'terrorista', 'terrorismo', 'jihad', 'alqaeda', 'taliban',
        'extremo', 'extremista', 'radical', 'radicalismo', 'fanático', 'fanatico'
    ]
};

function normalizarTexto(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]/g, "");
}
// 🔧 FUNÇÃO UNIFICADA DE VERIFICAÇÃO
export function criarFiltroDeConteudo() {
    const todasPalavras = [
        ...palavrasProibidasCompletas.palavroes,
        ...palavrasProibidasCompletas.insultos,
        ...palavrasProibidasCompletas.racismo,
        ...palavrasProibidasCompletas.homofobia,
        ...palavrasProibidasCompletas.nomesProibidos,
        ...palavrasProibidasCompletas.politicos,
        ...palavrasProibidasCompletas.emojiCodigos,
        ...palavrasProibidasCompletas.ingles,
        ...palavrasProibidasCompletas.odio
    ];

    const palavrasUnicas = [...new Set(todasPalavras)];

    return {
        lista: palavrasUnicas,

        verificar(texto) {
            const textoLower = texto.toLowerCase();
            const textoNormalizado = normalizarTexto(textoLower);
            const textoSemEspacos = textoLower.replace(/\s+/g, "");

            for (const palavra of this.lista) {
                if (
                    textoLower.includes(palavra) ||
                    textoNormalizado.includes(palavra) ||
                    textoSemEspacos.includes(palavra)
                ) {
                    return {
                        bloqueado: true,
                        palavra,
                        categoria: this.encontrarCategoria(palavra)
                    };
                }
            }

            if (this.verificarPadroesEvasao(textoLower)) {
                return {
                    bloqueado: true,
                    palavra: "evasao",
                    categoria: "evasão"
                };
            }

            return { bloqueado: false };
        },

        encontrarCategoria(palavra) {
            for (const categoria in palavrasProibidasCompletas) {
                if (palavrasProibidasCompletas[categoria].includes(palavra)) {
                    return categoria;
                }
            }
            return "desconhecida";
        },

        verificarPadroesEvasao(texto) {
            const padroes = [
                /(f[\W_]*o[\W_]*d[\W_]*a)/i,
                /(p[\W_]*o[\W_]*r[\W_]*r[\W_]*a)/i,
                /(v[\W_]*s[\W_]*f)/i,
                /(p[\W_]*q[\W_]*p)/i
            ];

            return padroes.some(p => p.test(texto));
        }
    };
}
