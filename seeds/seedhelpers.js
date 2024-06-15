const titles = [
    "Post interessante",
    "Dúvida sobre JavaScript",
    "Novidades em tecnologia",
    "Como fazer X em Y",
    "Discussão sobre política",
    "Experiência pessoal",
    "Pergunta rápida",
    "Projeto que estou trabalhando",
    "Tutorial passo a passo",
    "Problema que estou enfrentando"
];

const bodies = [
    "Isso é muito interessante!",
    "Alguém pode me ajudar com isso?",
    "Confira as últimas notícias do mundo da tecnologia",
    "Aprenda a fazer algo novo",
    "Vamos discutir os últimos acontecimentos políticos",
    "Quero compartilhar minha experiência com vocês",
    "Preciso de uma resposta rápida",
    "Estou trabalhando em um novo projeto, o que vocês acham?",
    "Siga este tutorial para resolver seu problema",
    "Alguém já enfrentou este problema antes?"
];

const tags = ['technology', 'science', 'health', 'travel', 'food', 'education', 
    'sports', 'entertainment', 'news', 'lifestyle'];

function getRandomTags(num) {
    const shuffled = tags.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

function generateRandomDate() {
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
    return new Date(thirtyDaysAgo + Math.random() * (Date.now() - thirtyDaysAgo));
}


module.exports = {
    generateRandomDate: generateRandomDate,
    getRandomTags: getRandomTags,
    titles: titles,
    bodies: bodies,
}




