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

const descriptions = [
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

function generateRandomDate() {
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
    return new Date(thirtyDaysAgo + Math.random() * (Date.now() - thirtyDaysAgo));
}


module.exports = {
    generateRandomDate: generateRandomDate,
    titles: titles,
    descriptions: descriptions,
}




