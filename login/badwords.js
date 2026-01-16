// 📋 LISTA COMPLETA DE PALAVRAS OFENSIVAS EM PORTUGUÊS
const palavrasProibidasCompletas = {
    // ========== PALAVRÕES FORTES ==========
    palavroes: [
        'porra', 'caralho', 'merda', 'bosta', 'cocô', 'cu', 'rola', 'pica', 
        'piroca', 'pau', 'buceta', 'xoxota', 'xana', 'pussy', 'vagina', 'pênis',
        'pinto', 'piru', 'bilau', 'rolinha', 'carai', 'cacete', 'cacetada',
        'cacetão', 'foda', 'foder', 'fodido', 'fodão', 'vadia', 'puta', 'puto',
        'prostituta', 'rapariga', 'xereca', 'punheta', 'masturbação', 'orgasmo',
        'ejaculação', 'sêmen', 'porra', 'esperma', 'ânus', 'cu', 'cool', 'brioco'
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
        'travesti', 'trans', 'veado', 'bichinha', 'afeminado', 'mulherzinha'
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
        'cisgênero', 'cisgenero', 'transtorno', 'disforia', 'hormônio', 'hormonio'
    ],

    // ========== NOMES HISTÓRICOS PROBLEMÁTICOS ==========
    nomesProibidos: [
        'hitler', 'adolf', 'adolfhitler', 'adolph', 'mussolini', 'benito',
        'stalin', 'josephstalin', 'mao', 'maozedong', 'polpot', 'kimjong',
        'kimjongun', 'kimjongil', 'putin', 'vladimirputin', 'bolsonaro',
        'jairbolsonaro', 'lula', 'luladrão', 'lularoubo', 'dilmã', 'dilma',
        'temer', 'micheltemer', 'collor', 'fernandocollor', 'sarney', 'josésarney'
    ],

    // ========== TERMOS POLÍTICOS OFENSIVOS ==========
    politicos: [
        'comunista', 'comuna', 'socialista', 'capitalista', 'liberal',
        'conservador', 'reacionário', 'reacionario', 'fascista', 'nazista',
        'nazi', 'skinhead', 'supremacista', 'branco', 'white', 'black',
        'negro', 'racial', 'etnia', 'etnico', 'étnico', 'minoria'
    ],

    // ========== PALAVRÕES COM EMOJIS E CÓDIGOS ==========
    emojiCodigos: [
        'f0d4-53', 'f0d4s3', 'fodase', 'vtnc', 'vsf', 'vsft', 'pqp',
        'pnc', 'vai tomar', 'vai se fuder', 'vsfd', 'c@ralh0', 'p0rr@',
        'm3rd@', 'buc3t@', 'x0x0t@', 'put@', 'f0d@', 'arr0mb@d0'
    ],

    // ========== PALAVRÕES EM INGLÊS ==========
    ingles: [
        'shit', 'fuck', 'ass', 'bitch', 'bastard', 'damn', 'hell',
        'dick', 'cock', 'pussy', 'whore', 'slut', 'motherfucker',
        'mofo', 'son of a bitch', 'sob', 'wtf', 'omg', 'lmao', 'lmfao',
        'stfu', 'gtfo', 'af', 'asf', 'tf', 'fk', 'fck', 'fuk', 'sh1t',
        'f*ck', 'f**k', 's**t', 'a**', 'b****', 'd***'
    ],

    // ========== TERMOS DE ÓDIO ==========
    odio: [
        'morte', 'matar', 'assassinar', 'suicídio', 'suicidio', 'morrer',
        'enforcar', 'enforcamento', 'tiro', 'atirar', 'arma', 'faca',
        'esfaquear', 'esfaqueamento', 'bomba', 'explodir', 'explosão',
        'terrorista', 'terrorismo', 'jihad', 'isis', 'alqaeda', 'taliban',
        'extremo', 'extremista', 'radical', 'radicalismo', 'fanático', 'fanatico'
    ]
};

// 🔧 FUNÇÃO UNIFICADA DE VERIFICAÇÃO
function criarFiltroDeConteudo() {
    // Combina todas as listas em uma
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

    // Remove duplicatas
    const palavrasUnicas = [...new Set(todasPalavras)];

    return {
        lista: palavrasUnicas,
        
        verificar: function(texto) {
            const textoLower = texto.toLowerCase();
            const textoNormalizado = normalizarTexto(textoLower);
            
            // Verifica cada palavra
            for (const palavra of this.lista) {
                // Verifica a palavra completa
                if (textoLower.includes(palavra) || textoNormalizado.includes(palavra)) {
                    return {
                        bloqueado: true,
                        palavra: palavra,
                        categoria: this.encontrarCategoria(palavra)
                    };
                }
                
                // Verifica com espaços removidos
                const textoSemEspacos = textoLower.replace(/\s+/g, '');
                if (textoSemEspacos.includes(palavra)) {
                    return {
                        bloqueado: true,
                        palavra: palavra,
                        categoria: this.encontrarCategoria(palavra)
                    };
                }
            }
            
            // Verifica padrões comuns de evasão
            if (this.verificarPadroesEvasao(textoLower)) {
                return {
                    bloqueado: true,
                    palavra: 'padrão_evasivo',
                    categoria: 'evasão'
                };
            }
            
            return { bloqueado: false };
        },
        
        encontrarCategoria: function(pal
