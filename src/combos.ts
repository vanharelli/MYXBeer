export type Combo = {
  id: number
  title: string
  items: string[]
  profile: string
  price?: string
  categoria: string
  emoji?: string
}

export type Produto = {
  id: number
  title: string
  profile: string
  categoria: string
  emoji?: string
}

// ─── COMBOS CRIATIVOS ───────────────────────────────────────────────
export const combosEspeciais: Combo[] = [
  // CLÁSSICOS
  {
    id: 101,
    title: 'SALVADOR DA PÁTRIA',
    items: ['1 Black Label', '5 Monster Energy', 'Gelo de Coco'],
    profile: 'O combo que salva qualquer festa que tava morrendo. Brinde: Copo Térmico.',
    categoria: 'Clássicos',
    emoji: '🦅',
  },
  {
    id: 102,
    title: 'SAIDEIRA',
    items: ['15 Budweiser', '1 Gin Seagers', '4 Tônicas'],
    profile: 'A última que virou dezessete. Brinde: Gelo de Frutas.',
    categoria: 'Clássicos',
    emoji: '🚪',
  },
  {
    id: 103,
    title: 'DOMINGO À NOITE',
    items: ['1 Vinho Tinto Suave', '1 Sprite 2L', 'Gelo'],
    profile: 'Pra quem não quer que o fim de semana acabe. Brinde: Taças de Acrílico.',
    categoria: 'Clássicos',
    emoji: '🌙',
  },
  {
    id: 104,
    title: 'TESÃO DE VACA',
    items: ['1 Garrafa de Cachaça 51', '4 Energéticos Red Bull', 'Gelo 5kg'],
    profile: 'O clássico das madrugadas sem volta. Cuidado com o dia seguinte.',
    categoria: 'Clássicos',
    emoji: '🐄',
  },
  {
    id: 105,
    title: 'ELA DEIXOU',
    items: ['1 Conhaque Presidente', '1 Contini', 'Coca-Cola 2L'],
    profile: 'Quando o coração aperta e a sede aumenta. Brinde: Amendoim Japonês.',
    categoria: 'Clássicos',
    emoji: '💔',
  },

  // CHURRASCO
  {
    id: 106,
    title: 'ANESTESIA DO CHURRASQUEIRO',
    items: ['24 Skol Lata', '1 Cachaça Artesanal', 'Carvão 4kg'],
    profile: 'O pitmaster não sente o calor da brasa nem o do copo. Brinde: Avental.',
    categoria: 'Churrasco',
    emoji: '🔥',
  },
  {
    id: 107,
    title: 'DIPLOMACIA ETÍLICA',
    items: ['12 Stella Artois', '1 Vinho Branco Seco', 'Gelo'],
    profile: 'Pra reunir a família sem guerra. Brinde: Saca-rolhas.',
    categoria: 'Churrasco',
    emoji: '🤝',
  },
  {
    id: 108,
    title: 'CHURRASCO RAIZ',
    items: ['2 Caixas de Cerveja Lata', 'Saco de Gelo 5kg'],
    profile: 'Simples. Gelado. Perfeito. Sem frescura.',
    categoria: 'Churrasco',
    emoji: '🥩',
  },
  {
    id: 109,
    title: 'VAR DE RESPEITO',
    items: ['12 Spaten Long Neck', '2 Batatas Chips', 'Gelo Mineral'],
    profile: 'Pro jogo que merece plateia e copo cheio. Brinde: Copos Black.',
    categoria: 'Churrasco',
    emoji: '⚽',
  },

  // DOMINGO
  {
    id: 110,
    title: 'ANTÍDOTO PRÉ-SEGUNDA',
    items: ['1 Conhaque Presidente', '1 Contini', 'Coca-Cola 2L'],
    profile: 'Cura o arrependimento do sábado com mais um pecado. Brinde: Amendoim.',
    categoria: 'Domingo',
    emoji: '😮‍💨',
  },
  {
    id: 111,
    title: 'SAIDEIRA INFINITA',
    items: ['15 Budweiser', '1 Gin Seagers', '4 Tônicas'],
    profile: 'Cada vez que você fala "última", vira mais uma. Brinde: Gelo de Frutas.',
    categoria: 'Domingo',
    emoji: '🔁',
  },
  {
    id: 112,
    title: 'MISERICÓRDIA',
    items: ['1 Vodka Smirnoff', '6 Red Bull', 'Gelo de Coco'],
    profile: 'Quando a ressaca tá braba mas a noite ainda chama.',
    categoria: 'Domingo',
    emoji: '🙏',
  },

  // EMERGÊNCIA
  {
    id: 113,
    title: 'REANIMAÇÃO TÁTICA',
    items: ['1 Absolut Vodka', '6 Red Bull', 'Gelo de Coco'],
    profile: 'UTI em formato de combo. Brinde: Copos de Dose.',
    categoria: 'Emergência',
    emoji: '🚨',
  },
  {
    id: 114,
    title: 'UTI DO COPO',
    items: ['1 Tequila José Cuervo', 'Suco de Tomate', 'Limão'],
    profile: 'O Bloody Mary que ressuscita os mortos. Brinde: Sal Grosso Temperado.',
    categoria: 'Emergência',
    emoji: '🏥',
  },
  {
    id: 115,
    title: 'CARTÃO VERMELHO NA SEDE',
    items: ['10 Heineken Latão', '1 Cachaça 51', 'Gelo 5kg'],
    profile: 'Expulso da sobriedade no primeiro tempo. Brinde: Limão Taiti.',
    categoria: 'Emergência',
    emoji: '🟥',
  },
  {
    id: 116,
    title: 'PRORROGAÇÃO ALCOÓLICA',
    items: ['1 Vodka Smirnoff', '5 Energéticos', 'Gelo de Coco'],
    profile: 'A festa acabou mas o combo manda continuar. Brinde: Canudos Ecológicos.',
    categoria: 'Emergência',
    emoji: '⏱️',
  },
  {
    id: 117,
    title: 'VAI QUE É TUA',
    items: ['1 Tequila Tradicional', 'Sal', 'Limão Taiti'],
    profile: 'Aquele momento de coragem líquida. Só desce.',
    categoria: 'Emergência',
    emoji: '💪',
  },

  // ROMANCE / PARA ELAS
  {
    id: 118,
    title: 'LUBRIFICANTE SOCIAL',
    items: ['1 Gin Tanqueray', '6 Tônicas Schweppes', 'Especiarias'],
    profile: 'Abre conversas, fecha acordos. Brinde: 2 Taças de Vidro.',
    categoria: 'Romance',
    emoji: '🍸',
  },
  {
    id: 119,
    title: 'COQUETEL DA PATROA',
    items: ['1 Espumante Chandon', 'Morangos Selecionados'],
    profile: 'Ela merece. Brinde: Chocolate Amargo.',
    categoria: 'Romance',
    emoji: '🥂',
  },
  {
    id: 120,
    title: 'DRINQUE DO PECADO',
    items: ['1 Licor 43', '4 Cafés Longos', 'Gelo'],
    profile: 'Doce demais pra ser inocente. Brinde: Canela em pau.',
    categoria: 'Romance',
    emoji: '😈',
  },
  {
    id: 121,
    title: 'AMOLECEU O JOELHO',
    items: ['1 Espumante Freixenet', 'Suco de Pêssego 1L', 'Gelo de Frutas'],
    profile: 'O combo que faz declarar amor pra pessoa errada.',
    categoria: 'Romance',
    emoji: '🫦',
  },

  // BALADA / FESTA
  {
    id: 122,
    title: 'FOGO NO PARQUINHO',
    items: ['1 Vodka Ciroc', '4 Energéticos Monster', 'Gelo de Coco'],
    profile: 'Entra na festa andando, sai voando.',
    categoria: 'Balada',
    emoji: '🎆',
  },
  {
    id: 123,
    title: 'PAREDÃO',
    items: ['1 Vodka Nacional', '5 Energéticos TNT/Baly', 'Saco de Gelo 5kg'],
    profile: 'O forró não para enquanto esse combo durar.',
    categoria: 'Balada',
    emoji: '🔊',
  },
  {
    id: 124,
    title: 'SEM VOLTA',
    items: ['1 Gin Beefeater', '6 Tônicas', 'Limão e Zimbro'],
    profile: 'Quando você decidiu que hoje vai até o fim.',
    categoria: 'Balada',
    emoji: '🛸',
  },
  {
    id: 125,
    title: 'TROPICAL VIBE',
    items: ['1 Vodka Absolut', '2L Suco de Laranja/Uva', 'Gelo de Frutas'],
    profile: 'Sol, praia e aquela vibe irresponsável.',
    categoria: 'Balada',
    emoji: '🌴',
  },
  {
    id: 126,
    title: 'ESQUECE ELA',
    items: ['1 Whisky Red Label', '4 Coca-Cola Lata', 'Gelo'],
    profile: 'O remix do coração partido. DJ, toca essa.',
    categoria: 'Balada',
    emoji: '🎵',
  },

  // PREMIUM
  {
    id: 127,
    title: 'OURO NEGRO',
    items: ['1 Whisky Black Label', '5 Red Bull', '1 Gelo de Coco', 'Saco de Gelo 5kg'],
    profile: 'O combo que você pede quando quer impressionar. Chegou junto, vai junto.',
    categoria: 'Premium',
    emoji: '🥃',
  },
  {
    id: 128,
    title: 'LONDON SUMMER',
    items: ['1 Gin Tanqueray/Beefeater', '6 Águas Tônicas', 'Especiarias Premium'],
    profile: 'Sofisticação em cada gole. Brinde: especiarias de zimbro e hibisco.',
    categoria: 'Premium',
    emoji: '🇬🇧',
  },
  {
    id: 129,
    title: 'DEGUSTAÇÃO',
    items: ['6 Long Necks Premium (Spaten/Corona)', '1 Balde de Gelo'],
    profile: 'Quem entende, não apressia. Aprecia.',
    categoria: 'Premium',
    emoji: '👑',
  },
  {
    id: 130,
    title: 'VIROU A MESA',
    items: ['1 Rum Bacardi 8 Anos', '6 Coca-Cola 350ml', 'Gelo e Limão'],
    profile: 'Quando o rolê virou história pra contar.',
    categoria: 'Premium',
    emoji: '🃏',
  },
]

// ─── PRODUTOS INDIVIDUAIS ─────────────────────────────────────────────
export const bebidasAlcoolicas: Produto[] = [
  { id: 201, title: 'Heineken LN 330ml', profile: 'A premium de sempre', categoria: 'Cerveja', emoji: '🍺' },
  { id: 202, title: 'Spaten Lata 350ml', profile: 'A preferida do churrasco', categoria: 'Cerveja', emoji: '🍺' },
  { id: 203, title: 'Corona Extra 330ml', profile: 'Com limão e boa vibe', categoria: 'Cerveja', emoji: '🍺' },
  { id: 204, title: 'Budweiser Lata 350ml', profile: 'The King of Beers', categoria: 'Cerveja', emoji: '🍺' },
  { id: 205, title: 'Stella Artois 550ml', profile: 'Belga. Gelada. Perfeita.', categoria: 'Cerveja', emoji: '🍺' },
  { id: 206, title: 'Skol Beats Senses', profile: 'Pra quem curte mistura', categoria: 'Cerveja', emoji: '🍺' },
  { id: 207, title: 'Whisky Red Label 1L', profile: 'O clássico que nunca decepciona', categoria: 'Destilado', emoji: '🥃' },
  { id: 208, title: 'Whisky Black Label 1L', profile: 'Pro momento que merece mais', categoria: 'Destilado', emoji: '🥃' },
  { id: 209, title: 'Vodka Smirnoff 1L', profile: 'Versátil e gelada', categoria: 'Destilado', emoji: '🍾' },
  { id: 210, title: 'Vodka Absolut 1L', profile: 'Premium sem exagero', categoria: 'Destilado', emoji: '🍾' },
  { id: 211, title: 'Gin Tanqueray 750ml', profile: 'O gin que faz a tônica brilhar', categoria: 'Destilado', emoji: '🍸' },
  { id: 212, title: 'Gin Beefeater 750ml', profile: 'London Dry clássico', categoria: 'Destilado', emoji: '🍸' },
  { id: 213, title: 'Cachaça 51 1L', profile: 'A rainha do boteco', categoria: 'Destilado', emoji: '🥂' },
  { id: 214, title: 'Tequila José Cuervo 750ml', profile: 'Shot ou drinque, sempre ela', categoria: 'Destilado', emoji: '🌵' },
  { id: 215, title: 'Vinho Casillero del Diablo', profile: 'Do diabo pro seu copo', categoria: 'Vinho', emoji: '🍷' },
  { id: 216, title: 'Espumante Chandon 750ml', profile: 'Pra celebrar do jeito certo', categoria: 'Vinho', emoji: '🥂' },
  { id: 217, title: 'Conhaque Presidente 900ml', profile: 'O clássico dos botecos', categoria: 'Destilado', emoji: '🍶' },
  { id: 218, title: 'Rum Bacardi 8 Anos 750ml', profile: 'Premium que combina com tudo', categoria: 'Destilado', emoji: '🍹' },
]

export const refrigerantes: Produto[] = [
  { id: 301, title: 'Coca-Cola Original 2L', profile: 'Clássica e gelada', categoria: 'Refrigerante', emoji: '🥤' },
  { id: 302, title: 'Coca-Cola Lata 350ml', profile: 'Prática e refrescante', categoria: 'Refrigerante', emoji: '🥤' },
  { id: 303, title: 'Coca-Cola Zero 350ml', profile: 'Zero açúcar, zero culpa', categoria: 'Refrigerante', emoji: '🥤' },
  { id: 304, title: 'Guaraná Antarctica 2L', profile: 'O sabor do Brasil', categoria: 'Refrigerante', emoji: '🥤' },
  { id: 305, title: 'Sprite 350ml Lata', profile: 'Refrescante e limpo', categoria: 'Refrigerante', emoji: '🥤' },
  { id: 306, title: 'Schweppes Tônica 350ml', profile: 'A base do gin perfeito', categoria: 'Refrigerante', emoji: '🥤' },
  { id: 307, title: 'Fanta Laranja 2L', profile: 'Doce e gelada', categoria: 'Refrigerante', emoji: '🥤' },
  { id: 308, title: 'Pepsi 2L', profile: 'A rival do copo', categoria: 'Refrigerante', emoji: '🥤' },
]

export const sucosAguas: Produto[] = [
  { id: 401, title: 'Suco de Laranja Prats 900ml', profile: 'Natural e gelado', categoria: 'Suco', emoji: '🍊' },
  { id: 402, title: 'Suco de Uva Aurora 1L', profile: 'Ideal pra misturar', categoria: 'Suco', emoji: '🍇' },
  { id: 403, title: 'Suco de Maracujá 1L', profile: 'Tropical e ácido', categoria: 'Suco', emoji: '🌟' },
  { id: 404, title: 'Água de Coco 1L', profile: 'Hidratação premium', categoria: 'Água', emoji: '🥥' },
  { id: 405, title: 'Água Mineral s/Gás 500ml', profile: 'Pura e fresca', categoria: 'Água', emoji: '💧' },
  { id: 406, title: 'Água Mineral c/Gás 500ml', profile: 'Com aquela bolhinha', categoria: 'Água', emoji: '💧' },
  { id: 407, title: 'Energético Red Bull 250ml', profile: 'Dá asas ao combo', categoria: 'Energético', emoji: '⚡' },
  { id: 408, title: 'Energético Monster 473ml', profile: 'O gigante da festa', categoria: 'Energético', emoji: '⚡' },
  { id: 409, title: 'Energético TNT 269ml', profile: 'Custo-benefício imbatível', categoria: 'Energético', emoji: '⚡' },
  { id: 410, title: 'Gelo de Coco (unidade)', profile: 'Não dilui, só refresca', categoria: 'Gelo', emoji: '🧊' },
  { id: 411, title: 'Saco de Gelo 5kg', profile: 'Pra gelar a caixa toda', categoria: 'Gelo', emoji: '🧊' },
]

export const tabacaria: Produto[] = [
  { id: 501, title: 'Cigarro Marlboro Gold', profile: 'O clássico premium', categoria: 'Cigarro', emoji: '🚬' },
  { id: 502, title: 'Cigarro Lucky Strike', profile: 'Sabor encorpado', categoria: 'Cigarro', emoji: '🚬' },
  { id: 503, title: 'Cigarro L&M', profile: 'Leveza e suavidade', categoria: 'Cigarro', emoji: '🚬' },
  { id: 504, title: 'Cigarro Parliament', profile: 'O filtro de recuo exclusivo', categoria: 'Cigarro', emoji: '🚬' },
  { id: 505, title: 'Cigarro Camel', profile: 'Sabor único inconfundível', categoria: 'Cigarro', emoji: '🚬' },
  { id: 506, title: 'Tabaco Drum 30g', profile: 'Para quem faz o próprio', categoria: 'Tabaco', emoji: '🌿' },
  { id: 507, title: 'Tabaco Palha de Milho', profile: 'Tradicional artesanal', categoria: 'Tabaco', emoji: '🌿' },
  { id: 508, title: 'Cigarro de Palha', profile: 'O clássico caipira', categoria: 'Tabaco', emoji: '🌿' },
  { id: 509, title: 'Isqueiro BIC Flame', profile: 'Confiável e colorido', categoria: 'Acessório', emoji: '🔥' },
  { id: 510, title: 'Piteira de Vidro', profile: 'Pratica e elegante', categoria: 'Acessório', emoji: '✨' },
  { id: 511, title: 'Seda King Size', profile: 'Para quem aprecia o ritual', categoria: 'Acessório', emoji: '📄' },
  { id: 512, title: 'Filtro Slim', profile: 'Mais leveza no trago', categoria: 'Acessório', emoji: '🌀' },
  { id: 513, title: 'Charuto Don Pepin Garcia', profile: 'Experiência premium', categoria: 'Charuto', emoji: '🏆' },
  { id: 514, title: 'Charuto Romeo y Julieta', profile: 'O romântico dos charutos', categoria: 'Charuto', emoji: '❤️' },
  { id: 515, title: 'Narguilê Pequeno', profile: 'Pra um momento especial', categoria: 'Narguilê', emoji: '💨' },
  { id: 516, title: 'Essência de Narguilê', profile: 'Variados sabores', categoria: 'Narguilê', emoji: '💨' },
]

export const snacks: Produto[] = [
  { id: 601, title: 'Amendoim Japonês 150g', profile: 'O petisco clássico do boteco', categoria: 'Petisco', emoji: '🥜' },
  { id: 602, title: 'Batata Chips Original', profile: 'Crocante e salgado', categoria: 'Petisco', emoji: '🥔' },
  { id: 603, title: 'Torresmo de Barriga', profile: 'O rei do churrasco', categoria: 'Petisco', emoji: '🥓' },
  { id: 604, title: 'Azeitonas Temperadas', profile: 'Tira-gosto sofisticado', categoria: 'Petisco', emoji: '🫒' },
  { id: 605, title: 'Castanha de Caju', profile: 'Premium e nutritiva', categoria: 'Petisco', emoji: '🌰' },
  { id: 606, title: 'Mix de Nuts', profile: 'Variado e gostoso', categoria: 'Petisco', emoji: '🥜' },
  { id: 607, title: 'Paçoca de Amendoim', profile: 'O clássico brasileiro', categoria: 'Docinho', emoji: '🍬' },
  { id: 608, title: 'Chocolate 70% Cacau', profile: 'Harmoniza com tudo', categoria: 'Docinho', emoji: '🍫' },
]
