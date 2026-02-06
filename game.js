// ====================================
// LOL MANAGER 2024 - COMPLETE EDITION v4.0 FIXED
// ====================================

// Estado Global do Jogo
const gameState = {
    currentTeam: null,
    currentWeek: 1,
    currentSplit: 1,
    currentYear: 2025,
    money: 500000,
    reputation: 75,
    morale: 85,
    matchHistory: [],
    currentSection: 'overview',
    currentCompetition: null,
    scoutReports: [],
    activeTrainings: [],
    activeScouting: [],
    injuries: [],
    objectives: {
        main: { desc: 'Terminar entre os 4 primeiros', completed: false, reward: 200000 },
        secondary: [
            { desc: 'Vencer 5 partidas seguidas', completed: false, reward: 50000, progress: 0 },
            { desc: 'Desenvolver 2 jogadores jovens', completed: false, reward: 30000, progress: 0 },
            { desc: 'Manter moral acima de 80%', completed: false, reward: 20000 }
        ],
        weekly: [
            { desc: 'Vencer próxima partida', completed: false, reward: 10000 },
            { desc: 'Treinar 2 jogadores', completed: false, reward: 5000, progress: 0 }
        ]
    },
    tactics: {
        style: 'balanced',
        focus: 'balanced',
        intensity: 'normal',
        priorities: {
            towers: 50,
            dragons: 70,
            baron: 60
        }
    }
};

// Database Completa de Times - LTA SUL
const teamsLTA = {
    loud: {
        name: "LOUD",
        logo: "🦁",
        color: "#00D64F",
        budget: 2000000,
        region: "Brasil",
        roster: [
            { name: "Robo", role: "TOP", overall: 73, age: 25, salary: 70000, contract: 2, morale: 90, injured: false, potential: 78 },
            { name: "Croc", role: "JG", overall: 71, age: 18, salary: 65000, contract: 2, morale: 89, injured: false, potential: 82, isWonderkid: true },
            { name: "tinowns", role: "MID", overall: 74, age: 27, salary: 85000, contract: 3, morale: 92, injured: false, potential: 77 },
            { name: "Route", role: "ADC", overall: 75, age: 24, salary: 90000, contract: 2, morale: 93, injured: false, potential: 80 },
            { name: "RedBert", role: "SUP", overall: 72, age: 22, salary: 65000, contract: 2, morale: 90, injured: false, potential: 77 },
            { name: "Celo", role: "ADC", overall: 70, age: 20, salary: 45000, contract: 1, morale: 85, injured: false, potential: 78 }
        ],
        achievements: ["Campeão CBLOL 2024", "Worlds 2024 Play-Ins"],
        fanbase: 98,
        facilities: 95
    },
    pain: {
        name: "paiN Gaming",
        logo: "💥",
        color: "#FF0000",
        budget: 1800000,
        region: "Brasil",
        roster: [
            { name: "Wizer", role: "TOP", overall: 71, age: 26, salary: 55000, contract: 2, morale: 88, injured: false, potential: 74 },
            { name: "CarioK", role: "JG", overall: 73, age: 24, salary: 70000, contract: 2, morale: 91, injured: false, potential: 77 },
            { name: "dyNquedo", role: "MID", overall: 72, age: 22, salary: 62000, contract: 2, morale: 89, injured: false, potential: 75 },
            { name: "TitaN", role: "ADC", overall: 74, age: 22, salary: 75000, contract: 2, morale: 92, injured: false, potential: 79 },
            { name: "Kuri", role: "SUP", overall: 70, age: 20, salary: 45000, contract: 2, morale: 87, injured: false, potential: 76 }
        ],
        achievements: ["Vice-Campeão CBLOL 2024"],
        fanbase: 95,
        facilities: 90
    },
    red: {
        name: "RED Canids",
        logo: "🐺",
        color: "#FF1744",
        budget: 1200000,
        region: "Brasil",
        roster: [
            { name: "fNb", role: "TOP", overall: 70, age: 27, salary: 52000, contract: 2, morale: 87, injured: false, potential: 72 },
            { name: "Aegis", role: "JG", overall: 67, age: 18, salary: 40000, contract: 1, morale: 84, injured: false, potential: 82, isWonderkid: true },
            { name: "Grevthar", role: "MID", overall: 68, age: 22, salary: 45000, contract: 2, morale: 85, injured: false, potential: 79 },
            { name: "Netuno", role: "ADC", overall: 67, age: 19, salary: 42000, contract: 1, morale: 84, injured: false, potential: 81, isWonderkid: true },
            { name: "Jojo", role: "SUP", overall: 68, age: 25, salary: 44000, contract: 2, morale: 85, injured: false, potential: 70 }
        ],
        achievements: ["Campeão CBLOL 2022"],
        fanbase: 82,
        facilities: 78
    },
    furia: {
        name: "FURIA Esports",
        logo: "🔥",
        color: "#000000",
        budget: 1500000,
        region: "Brasil",
        roster: [
            { name: "Kickoff", role: "TOP", overall: 69, age: 22, salary: 48000, contract: 2, morale: 86, injured: false, potential: 74 },
            { name: "Ranger", role: "JG", overall: 68, age: 18, salary: 45000, contract: 2, morale: 85, injured: false, potential: 80, isWonderkid: true },
            { name: "Envy", role: "MID", overall: 70, age: 23, salary: 52000, contract: 2, morale: 87, injured: false, potential: 75 },
            { name: "Flare", role: "ADC", overall: 69, age: 18, salary: 50000, contract: 2, morale: 86, injured: false, potential: 81, isWonderkid: true },
            { name: "Neat", role: "SUP", overall: 68, age: 21, salary: 42000, contract: 1, morale: 85, injured: false, potential: 73 }
        ],
        achievements: ["3º Lugar CBLOL 2024"],
        fanbase: 88,
        facilities: 85
    },
    keyd: {
        name: "Vivo Keyd Stars",
        logo: "⭐",
        color: "#6A1B9A",
        budget: 1100000,
        region: "Brasil",
        roster: [
            { name: "Boal", role: "TOP", overall: 67, age: 26, salary: 42000, contract: 2, morale: 84, injured: false, potential: 69 },
            { name: "Disamis", role: "JG", overall: 69, age: 20, salary: 50000, contract: 2, morale: 86, injured: false, potential: 75 },
            { name: "Mireu", role: "MID", overall: 68, age: 23, salary: 45000, contract: 2, morale: 85, injured: false, potential: 73 },
            { name: "Morttheus", role: "ADC", overall: 67, age: 24, salary: 43000, contract: 1, morale: 84, injured: false, potential: 71 },
            { name: "Trymbi", role: "SUP", overall: 70, age: 27, salary: 55000, contract: 2, morale: 87, injured: false, potential: 71 }
        ],
        achievements: ["Top 8 CBLOL 2024"],
        fanbase: 75,
        facilities: 70
    },
    fluxo: {
        name: "Fluxo",
        logo: "🌊",
        color: "#00CED1",
        budget: 1300000,
        region: "Brasil",
        roster: [
            { name: "curty", role: "TOP", overall: 66, age: 22, salary: 38000, contract: 1, morale: 83, injured: false, potential: 72 },
            { name: "Yampi", role: "JG", overall: 68, age: 23, salary: 44000, contract: 2, morale: 85, injured: false, potential: 73 },
            { name: "Fuuu", role: "MID", overall: 67, age: 19, salary: 42000, contract: 1, morale: 84, injured: false, potential: 78, isWonderkid: true },
            { name: "Marvin", role: "ADC", overall: 66, age: 21, salary: 38000, contract: 1, morale: 83, injured: false, potential: 72 },
            { name: "ProDelta", role: "SUP", overall: 67, age: 20, salary: 40000, contract: 2, morale: 84, injured: false, potential: 74 }
        ],
        achievements: ["Fusão Fluxo + W7M 2024"],
        fanbase: 85,
        facilities: 72
    },
    isurus: {
        name: "Isurus Gaming",
        logo: "🦈",
        color: "#4B0082",
        budget: 900000,
        region: "Argentina",
        roster: [
            { name: "ZOEN", role: "TOP", overall: 67, age: 24, salary: 40000, contract: 2, morale: 84, injured: false, potential: 70 },
            { name: "Josedeodo", role: "JG", overall: 72, age: 25, salary: 65000, contract: 2, morale: 90, injured: false, potential: 78 },
            { name: "Leza", role: "MID", overall: 68, age: 23, salary: 44000, contract: 2, morale: 85, injured: false, potential: 72 },
            { name: "Snaker", role: "ADC", overall: 67, age: 22, salary: 41000, contract: 1, morale: 84, injured: false, potential: 71 },
            { name: "Ackerman", role: "SUP", overall: 66, age: 24, salary: 38000, contract: 1, morale: 83, injured: false, potential: 69 }
        ],
        achievements: ["Campeão LLA 2023"],
        fanbase: 70,
        facilities: 65
    },
    leviatan: {
        name: "Leviatán Esports",
        logo: "🐙",
        color: "#8B008B",
        budget: 1000000,
        region: "Argentina/Chile",
        roster: [
            { name: "Zothve", role: "TOP", overall: 67, age: 25, salary: 41000, contract: 2, morale: 84, injured: false, potential: 69 },
            { name: "Scary", role: "JG", overall: 68, age: 23, salary: 43000, contract: 2, morale: 85, injured: false, potential: 73 },
            { name: "Hauz", role: "MID", overall: 69, age: 24, salary: 48000, contract: 2, morale: 86, injured: false, potential: 72 },
            { name: "Ceo", role: "ADC", overall: 68, age: 26, salary: 45000, contract: 1, morale: 85, injured: false, potential: 70 },
            { name: "TopLop", role: "SUP", overall: 66, age: 22, salary: 36000, contract: 1, morale: 83, injured: false, potential: 71 }
        ],
        achievements: ["Vice-Campeão LLA 2024"],
        fanbase: 72,
        facilities: 68
    }
};

// Database Completa - CIRCUITO DESAFIANTE
const teamsCircuito = {
    alpha7: {
        name: "Alpha7 Esports",
        logo: "7️⃣",
        color: "#FF6B6B",
        budget: 400000,
        region: "Brasil",
        roster: [
            { name: "Kiari", role: "TOP", overall: 62, age: 22, salary: 15000, contract: 2, morale: 85, injured: false, potential: 70 },
            { name: "Drakehero", role: "JG", overall: 61, age: 20, salary: 14000, contract: 2, morale: 83, injured: false, potential: 69 },
            { name: "random", role: "MID", overall: 63, age: 19, salary: 16000, contract: 2, morale: 86, injured: false, potential: 72 },
            { name: "Scuro", role: "ADC", overall: 62, age: 21, salary: 15000, contract: 2, morale: 84, injured: false, potential: 70 },
            { name: "Telas", role: "SUP", overall: 60, age: 23, salary: 13000, contract: 1, morale: 82, injured: false, potential: 67 }
        ],
        achievements: ["Top 4 Circuito 2024"],
        fanbase: 45,
        facilities: 60
    },
    corinthians: {
        name: "Corinthians Esports",
        logo: "⚽",
        color: "#000000",
        budget: 800000,
        region: "Brasil",
        roster: [
            { name: "zeKas", role: "TOP", overall: 64, age: 24, salary: 20000, contract: 2, morale: 88, injured: false, potential: 69 },
            { name: "Mewkyo", role: "JG", overall: 63, age: 22, salary: 18000, contract: 2, morale: 87, injured: false, potential: 70 },
            { name: "Aithusa", role: "MID", overall: 65, age: 20, salary: 22000, contract: 3, morale: 89, injured: false, potential: 73 },
            { name: "Celo", role: "ADC", overall: 64, age: 19, salary: 20000, contract: 2, morale: 88, injured: false, potential: 74 },
            { name: "Cavalo", role: "SUP", overall: 62, age: 25, salary: 17000, contract: 1, morale: 85, injured: false, potential: 66 }
        ],
        achievements: ["Time novo no cenário"],
        fanbase: 75,
        facilities: 80
    },
    flamengo: {
        name: "Flamengo Esports",
        logo: "🔴",
        color: "#FF0000",
        budget: 900000,
        region: "Brasil",
        roster: [
            { name: "Makes", role: "TOP", overall: 65, age: 23, salary: 25000, contract: 2, morale: 90, injured: false, potential: 70 },
            { name: "Dizin", role: "JG", overall: 64, age: 21, salary: 23000, contract: 2, morale: 89, injured: false, potential: 71 },
            { name: "Envy", role: "MID", overall: 66, age: 26, salary: 28000, contract: 2, morale: 91, injured: false, potential: 68 },
            { name: "Trigo", role: "ADC", overall: 65, age: 20, salary: 25000, contract: 3, morale: 90, injured: false, potential: 75 },
            { name: "Damage", role: "SUP", overall: 63, age: 27, salary: 20000, contract: 1, morale: 87, injured: false, potential: 65 }
        ],
        achievements: ["Time novo no cenário"],
        fanbase: 85,
        facilities: 85
    },
    kabum: {
        name: "KaBuM! IDL",
        logo: "💣",
        color: "#FFA500",
        budget: 500000,
        region: "Brasil",
        roster: [
            { name: "HiRit", role: "TOP", overall: 63, age: 22, salary: 17000, contract: 2, morale: 86, injured: false, potential: 69 },
            { name: "Wiz", role: "JG", overall: 62, age: 20, salary: 16000, contract: 2, morale: 85, injured: false, potential: 70 },
            { name: "Grevthar", role: "MID", overall: 64, age: 24, salary: 18000, contract: 2, morale: 87, injured: false, potential: 68 },
            { name: "Duduhh", role: "ADC", overall: 63, age: 21, salary: 17000, contract: 2, morale: 86, injured: false, potential: 82, isWonderkid: true },
            { name: "Guigs", role: "SUP", overall: 61, age: 23, salary: 15000, contract: 1, morale: 84, injured: false, potential: 67 }
        ],
        achievements: ["Campeão Circuito 2024"],
        fanbase: 60,
        facilities: 70
    },
    keydacademy: {
        name: "Keyd Stars Academy",
        logo: "🌟",
        color: "#6A1B9A",
        budget: 450000,
        region: "Brasil",
        roster: [
            { name: "Xyno", role: "TOP", overall: 61, age: 19, salary: 14000, contract: 2, morale: 84, injured: false, potential: 71 },
            { name: "Sarolu", role: "JG", overall: 60, age: 18, salary: 13000, contract: 2, morale: 83, injured: false, potential: 72 },
            { name: "Qats", role: "MID", overall: 62, age: 20, salary: 15000, contract: 2, morale: 85, injured: false, potential: 73 },
            { name: "Kisee", role: "ADC", overall: 61, age: 19, salary: 14000, contract: 2, morale: 84, injured: false, potential: 72 },
            { name: "scamber", role: "SUP", overall: 59, age: 17, salary: 12000, contract: 1, morale: 82, injured: false, potential: 78, isWonderkid: true }
        ],
        achievements: ["Academia da Keyd Stars"],
        fanbase: 50,
        facilities: 75
    },
    los: {
        name: "LOS",
        logo: "🌟",
        color: "#2ECC71",
        budget: 600000,
        region: "Brasil",
        roster: [
            { name: "SuperCleber", role: "TOP", overall: 64, age: 25, salary: 19000, contract: 2, morale: 87, injured: false, potential: 67 },
            { name: "Aegis", role: "JG", overall: 63, age: 23, salary: 18000, contract: 2, morale: 86, injured: false, potential: 68 },
            { name: "MG", role: "MID", overall: 65, age: 22, salary: 20000, contract: 2, morale: 88, injured: false, potential: 71 },
            { name: "Netuno", role: "ADC", overall: 64, age: 26, salary: 19000, contract: 1, morale: 87, injured: false, potential: 66 },
            { name: "Kabbie", role: "SUP", overall: 62, age: 24, salary: 16000, contract: 1, morale: 85, injured: false, potential: 67 }
        ],
        achievements: ["Top 3 Circuito 2024"],
        fanbase: 55,
        facilities: 65
    },
    redacademy: {
        name: "RED Academy",
        logo: "🔴",
        color: "#FF1744",
        budget: 550000,
        region: "Brasil",
        roster: [
            { name: "zynts", role: "TOP", overall: 62, age: 19, salary: 16000, contract: 2, morale: 85, injured: false, potential: 72 },
            { name: "Nero", role: "JG", overall: 61, age: 18, salary: 15000, contract: 2, morale: 84, injured: false, potential: 73 },
            { name: "Mago", role: "MID", overall: 63, age: 20, salary: 17000, contract: 2, morale: 86, injured: false, potential: 83, isWonderkid: true },
            { name: "Kojima", role: "ADC", overall: 62, age: 19, salary: 16000, contract: 2, morale: 85, injured: false, potential: 73 },
            { name: "uZent", role: "SUP", overall: 60, age: 21, salary: 14000, contract: 1, morale: 83, injured: false, potential: 69 }
        ],
        achievements: ["Academia da RED Canids"],
        fanbase: 48,
        facilities: 72
    },
    echamp: {
        name: "e-Champ Gaming",
        logo: "🎮",
        color: "#9B59B6",
        budget: 350000,
        region: "Brasil",
        roster: [
            { name: "Hakari", role: "TOP", overall: 61, age: 21, salary: 12000, contract: 1, morale: 83, injured: false, potential: 68 },
            { name: "Randal", role: "JG", overall: 60, age: 23, salary: 11000, contract: 1, morale: 82, injured: false, potential: 66 },
            { name: "Peco", role: "MID", overall: 62, age: 20, salary: 13000, contract: 2, morale: 84, injured: false, potential: 70 },
            { name: "Gru", role: "ADC", overall: 61, age: 22, salary: 12000, contract: 1, morale: 83, injured: false, potential: 68 },
            { name: "Bulecha", role: "SUP", overall: 59, age: 24, salary: 10000, contract: 1, morale: 81, injured: false, potential: 64 }
        ],
        achievements: ["Vice-campeão Circuito 2024"],
        fanbase: 40,
        facilities: 55
    }
};

// Jogadores Livres
const freeAgents = [
    { name: "brTT", role: "ADC", overall: 68, age: 33, price: 60000, salary: 35000, nationality: "Brasil", potential: 68 },
    { name: "Kami", role: "MID", overall: 67, age: 31, price: 55000, salary: 32000, nationality: "Brasil", potential: 67 },
    { name: "LEP", role: "TOP", overall: 66, age: 30, price: 45000, salary: 28000, nationality: "Brasil", potential: 66 },
    { name: "Ranger", role: "JG", overall: 69, age: 25, price: 70000, salary: 40000, nationality: "Brasil", potential: 71 },
    { name: "micaO", role: "MID", overall: 70, age: 26, price: 75000, salary: 42000, nationality: "Brasil", potential: 72 },
    { name: "Matsukaze", role: "ADC", overall: 68, age: 25, price: 65000, salary: 38000, nationality: "Brasil", potential: 70 },
    { name: "Yang", role: "TOP", overall: 65, age: 23, price: 40000, salary: 25000, nationality: "Coreia", potential: 72 },
    { name: "Straight", role: "MID", overall: 66, age: 24, price: 50000, salary: 30000, nationality: "Uruguay", potential: 69 },
    { name: "Grell", role: "JG", overall: 67, age: 25, price: 55000, salary: 32000, nationality: "Argentina", potential: 69 },
    { name: "WhiteLotus", role: "ADC", overall: 66, age: 22, price: 48000, salary: 28000, nationality: "Chile", potential: 70 }
];

// Sistema de Campeonato
const championship = {
    name: "",
    standings: [],
    currentRound: 1,
    totalRounds: 14,
    matches: [],
    schedule: []
};

// Sistema de Academia
const academySystem = {
    enabled: false,
    roster: [],
    monthlyBudget: 50000,
    
    createAcademy: function() {
        if (gameState.money < 200000) {
            showNotification('❌ Você precisa de R$ 200.000 para criar uma academia!', 'error');
            return;
        }
        
        gameState.money -= 200000;
        this.enabled = true;
        this.roster = this.generateYoungPlayers();
        
        showNotification('✅ Academia criada com sucesso!', 'success');
        atualizarHeader();
    },
    
    generateYoungPlayers: function() {
        const roles = ['TOP', 'JG', 'MID', 'ADC', 'SUP'];
        const firstNames = ['João', 'Pedro', 'Lucas', 'Gabriel', 'Rafael'];
        const lastNames = ['Silva', 'Santos', 'Costa', 'Oliveira', 'Souza'];
        const players = [];
        
        roles.forEach((role, index) => {
            players.push({
                name: `${firstNames[index]} "${role.toLowerCase()}er" ${lastNames[index]}`,
                role: role,
                age: 16 + Math.floor(Math.random() * 3),
                overall: 55 + Math.floor(Math.random() * 10),
                potential: 70 + Math.floor(Math.random() * 15),
                salary: 5000,
                contract: 2,
                morale: 80,
                development: 0,
                injured: false
            });
        });
        
        return players;
    },
    
    promotePlayer: function(academyIndex) {
        if (gameState.currentTeam.roster.length >= 10) {
            showNotification('❌ Elenco principal está cheio!', 'error');
            return;
        }
        
        const player = this.roster[academyIndex];
        gameState.currentTeam.roster.push({...player, salary: 15000});
        this.roster.splice(academyIndex, 1);
        
        const newPlayer = this.generateYoungPlayers()[0];
        this.roster.push(newPlayer);
        
        showNotification(`🎓 ${player.name} promovido ao time principal!`, 'success');
    }
};

// Sistema de Mídia Social
const socialMediaSystem = {
    followers: 10000,
    engagement: 50,
    sponsors: [],
    lastPostWeek: 0,
    
    postContent: function(type) {
        if (gameState.currentWeek - this.lastPostWeek < 1) {
            showNotification('⏰ Aguarde antes de postar novamente!', 'warning');
            return;
        }
        
        const contents = {
            'victory': { followers: 500, engagement: 5, cost: 0, message: '🏆 Postagem sobre vitória!' },
            'training': { followers: 200, engagement: 3, cost: 5000, message: '💪 Conteúdo de treino!' },
            'announcement': { followers: 300, engagement: 4, cost: 10000, message: '📢 Anúncio feito!' },
            'stream': { followers: 1000, engagement: 10, cost: 15000, message: '🎥 Stream realizada!' }
        };
        
        const content = contents[type];
        if (!content) return;
        
        if (gameState.money < content.cost) {
            showNotification('❌ Dinheiro insuficiente!', 'error');
            return;
        }
        
        gameState.money -= content.cost;
        this.followers += content.followers;
        this.engagement = Math.min(100, this.engagement + content.engagement);
        this.lastPostWeek = gameState.currentWeek;
        
        showNotification(`${content.message} +${content.followers} seguidores!`, 'success');
        atualizarHeader();
        
        if (this.followers > 50000 && Math.random() > 0.8) {
            this.addSponsor();
        }
    },
    
    addSponsor: function() {
        const sponsors = [
            { name: "TechCorp", value: 30000 },
            { name: "Energy Drink X", value: 20000 },
            { name: "Gaming Gear Pro", value: 25000 }
        ];
        
        const sponsor = sponsors[Math.floor(Math.random() * sponsors.length)];
        
        if (!this.sponsors.find(s => s.name === sponsor.name)) {
            this.sponsors.push(sponsor);
            showNotification(`🤝 Novo patrocinador: ${sponsor.name}! +R$ ${sponsor.value}/mês`, 'success');
        }
    },
    
    getMonthlyIncome: function() {
        return this.sponsors.reduce((total, sponsor) => total + sponsor.value, 0);
    }
};

// Sistema de Staff
const staffSystem = {
    psychologist: null,
    nutritionist: null,
    physicalTrainer: null,
    analyst: null,
    
    hireStaff: function(type) {
        const costs = {
            psychologist: { initial: 50000, monthly: 15000, bonus: 'Moral +10% recuperação' },
            nutritionist: { initial: 30000, monthly: 10000, bonus: '-20% chance lesão' },
            physicalTrainer: { initial: 40000, monthly: 12000, bonus: '+15% performance' },
            analyst: { initial: 60000, monthly: 20000, bonus: 'Análises detalhadas' }
        };
        
        const cost = costs[type];
        if (!cost || gameState.money < cost.initial) {
            showNotification('❌ Dinheiro insuficiente!', 'error');
            return;
        }
        
        gameState.money -= cost.initial;
        this[type] = {
            ...cost,
            hired: true,
            weeksActive: 0
        };
        
        showNotification(`✅ ${type} contratado! ${cost.bonus}`, 'success');
        atualizarHeader();
    }
};

// ====================================
// INICIALIZAÇÃO
// ====================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('LoL Manager 2024 - Complete Edition Loaded');
    
    setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('main-menu').style.display = 'flex';
    }, 2000);
    
    setupEventListeners();
});

function setupEventListeners() {
    document.getElementById('btn-novo-jogo')?.addEventListener('click', novoJogo);
    document.getElementById('btn-carregar-jogo')?.addEventListener('click', carregarJogo);
    document.getElementById('btn-creditos')?.addEventListener('click', mostrarCreditos);
    document.getElementById('btn-sair')?.addEventListener('click', sairJogo);
    document.getElementById('btn-voltar-menu')?.addEventListener('click', voltarMenu);
    document.getElementById('btn-advance-week')?.addEventListener('click', avancarSemana);
    document.getElementById('btn-save-game')?.addEventListener('click', salvarJogo);
    document.getElementById('btn-exit-to-menu')?.addEventListener('click', voltarMenuPrincipal);
    document.getElementById('btn-play-match')?.addEventListener('click', jogarPartida);
    document.getElementById('btn-close-modal')?.addEventListener('click', fecharModal);
    
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const section = e.currentTarget.dataset.section;
            mostrarSecao(section);
        });
    });
}

// ====================================
// MENU PRINCIPAL
// ====================================

function novoJogo() {
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('team-selection').style.display = 'block';
    renderCompetitionSelection();
}

function carregarJogo() {
    const saveData = localStorage.getItem('lolManagerSave');
    if (saveData) {
        const data = JSON.parse(saveData);
        Object.assign(gameState, data);
        
        const teams = gameState.currentCompetition === 'circuito' ? teamsCircuito : teamsLTA;
        gameState.currentTeam = teams[data.teamKey];
        
        document.getElementById('main-menu').style.display = 'none';
        document.getElementById('game-screen').style.display = 'grid';
        
        iniciarJogo();
        showNotification('✅ Jogo carregado com sucesso!', 'success');
    } else {
        showNotification('❌ Nenhum save encontrado!', 'error');
    }
}

function mostrarCreditos() {
    alert(`
        LoL Manager 2024 - Complete Edition v4.0
        
        Desenvolvido com ❤️ para os fãs de LoL Esports
        
        Features:
        • Todos os times da LTA Sul e Circuito Desafiante
        • Sistema completo de transferências
        • Academia de jovens talentos
        • Sistema de scouts internacional
        • Mídia social e patrocínios
        • Staff técnico completo
        • Táticas personalizadas
        • Sistema de lesões e moral
        
        Obrigado por jogar!
    `);
}

function sairJogo() {
    if (confirm('Tem certeza que deseja sair?')) {
        window.close();
        location.reload();
    }
}

// ====================================
// SELEÇÃO DE COMPETIÇÃO E TIME
// ====================================

function renderCompetitionSelection() {
    const grid = document.getElementById('teams-grid');
    if (!grid) return;
    
    grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; margin-bottom: 30px;">
            <h2 style="color: var(--primary-color); font-size: 36px;">Escolha a Competição</h2>
        </div>
        
        <div class="competition-card" onclick="selectCompetition('lta')" style="
            grid-column: span 4;
            background: linear-gradient(135deg, #1e3a5f 0%, #0c223b 100%);
            border: 3px solid var(--primary-color);
            padding: 40px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s;
        ">
            <div style="font-size: 64px; margin-bottom: 20px;">🏆</div>
            <h3 style="color: var(--primary-color); font-size: 32px;">LTA SUL 2025</h3>
            <p style="color: var(--secondary-color); font-size: 18px;">Liga Principal</p>
            <div style="color: var(--text-primary); margin-top: 20px; line-height: 1.8;">
                <p>✅ 8 times de elite</p>
                <p>✅ Classificação para MSI e Worlds</p>
                <p>✅ Maiores salários e orçamentos</p>
                <p>✅ Overall médio: 68-75</p>
            </div>
        </div>
        
        <div class="competition-card" onclick="selectCompetition('circuito')" style="
            grid-column: span 4;
            background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
            border: 3px solid #ff9800;
            padding: 40px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s;
        ">
            <div style="font-size: 64px; margin-bottom: 20px;">🥈</div>
            <h3 style="color: white; font-size: 32px;">CIRCUITO DESAFIANTE</h3>
            <p style="color: #fff3e0; font-size: 18px;">Segunda Divisão</p>
            <div style="color: white; margin-top: 20px; line-height: 1.8;">
                <p>⚔️ 8 times emergentes</p>
                <p>⚔️ Luta pelo acesso à LTA Sul</p>
                <p>⚔️ Orçamentos moderados</p>
                <p>⚔️ Overall médio: 60-66</p>
            </div>
        </div>
    `;
}

function selectCompetition(competition) {
    gameState.currentCompetition = competition;
    renderTeamSelection(competition);
}

function renderTeamSelection(competition) {
    const grid = document.getElementById('teams-grid');
    if (!grid) return;
    
    const teams = competition === 'circuito' ? teamsCircuito : teamsLTA;
    const competitionName = competition === 'circuito' ? 'CIRCUITO DESAFIANTE' : 'LTA SUL 2025';
    const competitionColor = competition === 'circuito' ? '#ff9800' : 'var(--primary-color)';
    
    grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; margin-bottom: 30px;">
            <h2 style="color: ${competitionColor}; font-size: 32px;">${competitionName}</h2>
            <h3 style="color: var(--secondary-color);">Escolha seu Time</h3>
        </div>
    `;
    
    Object.entries(teams).forEach(([key, team]) => {
        const avgOverall = Math.round(
            team.roster.reduce((sum, p) => sum + p.overall, 0) / team.roster.length
        );
        
        const teamCard = document.createElement('div');
        teamCard.className = 'team-card';
        teamCard.innerHTML = `
            <div class="team-logo">${team.logo}</div>
            <div class="team-name">${team.name}</div>
            <div class="team-info">
                💰 R$ ${team.budget.toLocaleString('pt-BR')}<br>
                ⭐ Overall: ${avgOverall}<br>
                🌎 ${team.region}<br>
                👥 ${team.roster.length} jogadores
            </div>
        `;
        teamCard.addEventListener('click', () => selecionarTime(key, competition));
        grid.appendChild(teamCard);
    });
}

function selecionarTime(teamKey, competition) {
    const teams = competition === 'circuito' ? teamsCircuito : teamsLTA;
    gameState.currentTeam = teams[teamKey];
    gameState.money = gameState.currentTeam.budget;
    gameState.currentCompetition = competition;
    
    if (competition === 'circuito') {
        gameState.reputation = 50;
        gameState.morale = 75;
    } else {
        gameState.reputation = 75;
        gameState.morale = 85;
    }
    
    gameState.teamKey = teamKey;
    
    document.getElementById('team-selection').style.display = 'none';
    document.getElementById('game-screen').style.display = 'grid';
    
    iniciarJogo();
}

function voltarMenu() {
    document.getElementById('team-selection').style.display = 'none';
    document.getElementById('main-menu').style.display = 'flex';
}

// ====================================
// INICIALIZAÇÃO DO JOGO
// ====================================

function iniciarJogo() {
    console.log('Iniciando jogo:', gameState.currentTeam.name, 'na', gameState.currentCompetition);
    
    atualizarHeader();
    
    document.getElementById('season-text').textContent = 
        `Split ${gameState.currentSplit} - ${gameState.currentYear}`;
    
    inicializarCampeonato();
    mostrarSecao('overview');
    atualizarMenuNavegacao();
}

function atualizarMenuNavegacao() {
    const navMenu = document.getElementById('nav-menu');
    if (!navMenu) return;
    
    const sections = [
        { id: 'overview', icon: '📊', label: 'Visão Geral' },
        { id: 'roster', icon: '👥', label: 'Elenco' },
        { id: 'tactics', icon: '📋', label: 'Táticas' },
        { id: 'transfers', icon: '💼', label: 'Transferências' },
        { id: 'scouts', icon: '🔍', label: 'Scouts' },
        { id: 'matches', icon: '🎮', label: 'Partidas' },
        { id: 'training', icon: '🎯', label: 'Treinamento' },
        { id: 'standings', icon: '🏆', label: 'Tabela' },
        { id: 'history', icon: '📜', label: 'Histórico' },
        { id: 'objectives', icon: '🎯', label: 'Objetivos' },
        { id: 'finances', icon: '📈', label: 'Finanças' },
        { id: 'academy', icon: '🎓', label: 'Academia' },
        { id: 'social', icon: '📱', label: 'Mídia Social' },
        { id: 'staff', icon: '👨‍⚕️', label: 'Staff' }
    ];
    
    navMenu.innerHTML = sections.map(section => `
        <li class="nav-item ${section.id === 'overview' ? 'active' : ''}" data-section="${section.id}">
            <span class="nav-icon">${section.icon}</span>
            <span>${section.label}</span>
        </li>
    `).join('');
    
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const section = e.currentTarget.dataset.section;
            mostrarSecao(section);
        });
    });
}

function atualizarHeader() {
    document.getElementById('team-name').textContent = gameState.currentTeam.name;
    document.getElementById('current-week').textContent = gameState.currentWeek;
    document.getElementById('money').textContent = `R$ ${gameState.money.toLocaleString('pt-BR')}`;
    document.getElementById('reputation').textContent = `${gameState.reputation}/100`;
    document.getElementById('team-morale').textContent = `${gameState.morale}%`;
}

function inicializarCampeonato() {
    const teams = gameState.currentCompetition === 'circuito' ? teamsCircuito : teamsLTA;
    
    championship.name = gameState.currentCompetition === 'circuito' ? 
        'Circuito Desafiante 2025' : 'LTA Sul Split 1 2025';
    
    championship.standings = Object.entries(teams).map(([key, team]) => ({
        teamKey: key,
        teamName: team.name,
        teamLogo: team.logo,
        played: 0,
        wins: 0,
        losses: 0,
        gamesWon: 0,
        gamesLost: 0,
        points: 0,
        form: []
    }));
    
    gerarCalendario();
}

function gerarCalendario() {
    championship.schedule = [];
    const teams = gameState.currentCompetition === 'circuito' ? teamsCircuito : teamsLTA;
    const teamKeys = Object.keys(teams);
    
    for (let round = 1; round <= championship.totalRounds; round++) {
        const roundMatches = [];
        const availableTeams = [...teamKeys];
        
        while (availableTeams.length > 1) {
            const homeIndex = Math.floor(Math.random() * availableTeams.length);
            const homeTeam = availableTeams[homeIndex];
            availableTeams.splice(homeIndex, 1);
            
            const awayIndex = Math.floor(Math.random() * availableTeams.length);
            const awayTeam = availableTeams[awayIndex];
            availableTeams.splice(awayIndex, 1);
            
            roundMatches.push({
                round: round,
                homeTeam: homeTeam,
                awayTeam: awayTeam,
                homeScore: null,
                awayScore: null,
                played: false
            });
        }
        
        championship.schedule.push(roundMatches);
    }
}

// [CONTINUA NA PRÓXIMA MENSAGEM COM O RESTO DAS FUNÇÕES...]

// ====================================
// NAVEGAÇÃO E SEÇÕES
// ====================================

function mostrarSecao(sectionName) {
    console.log('Mostrando seção:', sectionName);
    
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;
    
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.section === sectionName) {
            item.classList.add('active');
        }
    });
    
    switch(sectionName) {
        case 'overview':
            renderOverview(mainContent);
            break;
        case 'roster':
            renderRoster(mainContent);
            break;
        case 'tactics':
            renderTactics(mainContent);
            break;
        case 'transfers':
            renderTransfers(mainContent);
            break;
        case 'scouts':
            renderScouts(mainContent);
            break;
        case 'matches':
            renderMatches(mainContent);
            break;
        case 'training':
            renderTraining(mainContent);
            break;
        case 'standings':
            renderStandings(mainContent);
            break;
        case 'history':
            renderHistory(mainContent);
            break;
        case 'objectives':
            renderObjectives(mainContent);
            break;
        case 'finances':
            renderFinances(mainContent);
            break;
        case 'academy':
            renderAcademy(mainContent);
            break;
        case 'social':
            renderSocial(mainContent);
            break;
        case 'staff':
            renderStaff(mainContent);
            break;
    }
    
    gameState.currentSection = sectionName;
}

// ====================================
// TODAS AS SEÇÕES RENDERIZADAS
// ====================================

function renderOverview(container) {
    const position = getTeamPosition();
    const form = getTeamForm();
    const nextMatch = getNextMatch();
    const mvp = getTeamMVP();
    
    container.innerHTML = `
        <section class="content-section active">
            <h2>Visão Geral</h2>
            
            <div class="overview-cards">
                <div class="stat-card">
                    <h3>Posição</h3>
                    <div class="stat-value">${position}º</div>
                    <div class="stat-label">na tabela</div>
                </div>
                
                <div class="stat-card">
                    <h3>Forma</h3>
                    <div class="stat-value">${form}</div>
                    <div class="stat-label">últimos 5 jogos</div>
                </div>
                
                <div class="stat-card">
                    <h3>Próxima Partida</h3>
                    <div class="stat-value">${nextMatch.opponent || 'Sem partida'}</div>
                    <div class="stat-label">${nextMatch.when || ''}</div>
                </div>
                
                <div class="stat-card">
                    <h3>MVP do Time</h3>
                    <div class="stat-value">${mvp.name}</div>
                    <div class="stat-label">${mvp.rating} rating</div>
                </div>
            </div>

            <div class="news-section">
                <h3>📰 Últimas Notícias</h3>
                <div class="news-list">
                    ${generateNews()}
                </div>
            </div>
            
            <div class="alerts-section">
                <h3>⚠️ Alertas do Time</h3>
                <div class="alerts-list">
                    ${generateAlerts()}
                </div>
            </div>
        </section>
    `;
}

function renderRoster(container) {
    const roleIcons = {
        'TOP': '🛡️',
        'JG': '🗡️',
        'MID': '🔮',
        'ADC': '🏹',
        'SUP': '💚'
    };
    
    const starters = gameState.currentTeam.roster.slice(0, 5);
    const reserves = gameState.currentTeam.roster.slice(5);
    
    container.innerHTML = `
        <section class="content-section active">
            <h2>Elenco</h2>
            
            <div class="lineup-container">
                <h3>Time Titular</h3>
                <div class="lineup">
                    ${starters.map((player, index) => `
                        <div class="player-card ${player.injured ? 'injured' : ''}">
                            <div class="player-role">${roleIcons[player.role]}</div>
                            <div class="player-name">
                                ${player.name}
                                ${player.isWonderkid ? '⭐' : ''}
                            </div>
                            <div class="player-stats">
                                Overall: ${player.overall}<br>
                                Idade: ${player.age} anos<br>
                                Salário: R$ ${player.salary.toLocaleString('pt-BR')}<br>
                                Contrato: ${player.contract} ano(s)<br>
                                <div style="color: ${getMoraleColor(player.morale)}">
                                    Moral: ${player.morale}%
                                </div>
                                ${player.injured ? '<div style="color: #f44336;">🏥 Lesionado</div>' : ''}
                                ${player.potential > player.overall + 5 ? 
                                    `<div style="color: #4CAF50;">Potencial: ${player.potential}</div>` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            ${reserves.length > 0 ? `
                <div class="reserves-container">
                    <h3>Reservas</h3>
                    <div class="lineup">
                        ${reserves.map((player, index) => `
                            <div class="player-card ${player.injured ? 'injured' : ''}">
                                <div class="player-role">${roleIcons[player.role]}</div>
                                <div class="player-name">
                                    ${player.name}
                                    ${player.isWonderkid ? '⭐' : ''}
                                </div>
                                <div class="player-stats">
                                    Overall: ${player.overall}<br>
                                    Idade: ${player.age} anos<br>
                                    Salário: R$ ${player.salary.toLocaleString('pt-BR')}<br>
                                    <div style="color: ${getMoraleColor(player.morale)}">
                                        Moral: ${player.morale}%
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
        </section>
    `;
}

function renderTactics(container) {
    container.innerHTML = `
        <section class="content-section active">
            <h2>Configuração Tática</h2>
            
            <div class="tactics-grid">
                <div class="tactics-selection">
                    <h3>Estilo de Jogo</h3>
                    <div class="tactics-options">
                        ${['aggressive', 'scaling', 'splitpush', 'teamfight', 'balanced'].map(style => `
                            <div class="tactic-card ${gameState.tactics.style === style ? 'selected' : ''}" 
                                 onclick="selectTactic('${style}')">
                                <div class="tactic-icon">${getTacticIcon(style)}</div>
                                <div class="tactic-name">${getTacticName(style)}</div>
                                <div class="tactic-desc">${getTacticDesc(style)}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <button onclick="saveTactics()" class="btn-primary" style="margin-top: 30px;">
                💾 Salvar Configurações Táticas
            </button>
        </section>
    `;
}

function renderTransfers(container) {
    const allPlayers = [...freeAgents];
    
    const teams = gameState.currentCompetition === 'circuito' ? teamsCircuito : teamsLTA;
    Object.entries(teams).forEach(([key, team]) => {
        if (key !== gameState.teamKey) {
            team.roster.forEach(player => {
                allPlayers.push({
                    ...player,
                    team: team.name,
                    teamLogo: team.logo,
                    price: player.overall * 2000
                });
            });
        }
    });
    
    container.innerHTML = `
        <section class="content-section active">
            <h2>Mercado de Transferências</h2>
            
            <div class="transfer-list" id="transfer-list-content">
                ${renderTransferList(allPlayers)}
            </div>
        </section>
    `;
    
    window.transferPlayers = allPlayers;
}

function renderScouts(container) {
    container.innerHTML = `
        <section class="content-section active">
            <h2>Departamento de Scouts</h2>
            
            <div class="scouts-info">
                <p>Envie scouts para descobrir novos talentos!</p>
            </div>
            
            <div class="scout-missions">
                <h3>Missões Disponíveis</h3>
                <div class="missions-grid">
                    <div class="scout-mission">
                        <h4>🌎 Scout Internacional</h4>
                        <p>Descubra talentos na Coreia e China</p>
                        <p class="mission-cost">Custo: R$ 50.000</p>
                        <p class="mission-duration">Duração: 2 semanas</p>
                        <button onclick="startScoutMission('international')">Enviar Scout</button>
                    </div>
                    <div class="scout-mission">
                        <h4>🏠 Scout Nacional</h4>
                        <p>Procure promessas no cenário brasileiro</p>
                        <p class="mission-cost">Custo: R$ 20.000</p>
                        <p class="mission-duration">Duração: 1 semana</p>
                        <button onclick="startScoutMission('national')">Enviar Scout</button>
                    </div>
                </div>
            </div>
            
            <div class="scout-reports">
                <h3>📋 Relatórios de Scout</h3>
                <div id="scout-reports-list">
                    ${renderScoutReports()}
                </div>
            </div>
        </section>
    `;
}

function renderMatches(container) {
    const nextMatch = getDetailedNextMatch();
    
    if (!nextMatch) {
        container.innerHTML = `
            <section class="content-section active">
                <h2>Próxima Partida</h2>
                <div style="text-align: center; padding: 40px;">
                    <h3 style="color: var(--text-secondary);">Não há partidas nesta rodada</h3>
                    <button onclick="avancarSemana()" class="btn-primary" style="margin-top: 20px;">
                        ⏭️ Avançar Tempo
                    </button>
                </div>
            </section>
        `;
        return;
    }
    
    container.innerHTML = `
        <section class="content-section active">
            <h2>Próxima Partida - Rodada ${championship.currentRound}</h2>
            
            <div class="match-preview">
                <div class="team-preview">
                    <h3>${gameState.currentTeam.name}</h3>
                    <div style="font-size: 48px;">${gameState.currentTeam.logo}</div>
                    <p>Posição: ${getTeamPosition()}º</p>
                    <p style="color: ${getMoraleColor(gameState.morale)}">Moral: ${gameState.morale}%</p>
                </div>
                
                <div class="vs">VS</div>
                
                <div class="team-preview">
                    <h3>${nextMatch.opponent.name}</h3>
                    <div style="font-size: 48px;">${nextMatch.opponent.logo}</div>
                    <p>Overall: ${calculateTeamOverall(nextMatch.opponent)}</p>
                </div>
            </div>
            
            <button id="btn-play-match" class="btn-simulate">
                🎮 JOGAR PARTIDA
            </button>
        </section>
    `;
    
    document.getElementById('btn-play-match')?.addEventListener('click', jogarPartida);
}

function renderTraining(container) {
    container.innerHTML = `
        <section class="content-section active">
            <h2>Centro de Treinamento</h2>
            
            <div class="training-info">
                <p>Treine seus jogadores para melhorar suas habilidades!</p>
            </div>
            
            <div class="lineup">
                ${gameState.currentTeam.roster.map((player, index) => `
                    <div class="player-card">
                        <div class="player-name">${player.name}</div>
                        <div class="player-stats">
                            ${player.role} - Overall: ${player.overall}
                        </div>
                        <button class="btn-primary" onclick="treinarJogador(${index})">
                            Treinar (+1 Overall - R$ 10.000)
                        </button>
                    </div>
                `).join('')}
            </div>
        </section>
    `;
}

function renderStandings(container) {
    const sortedStandings = [...championship.standings].sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        const diffA = a.gamesWon - a.gamesLost;
        const diffB = b.gamesWon - b.gamesLost;
        return diffB - diffA;
    });
    
    container.innerHTML = `
        <section class="content-section active">
            <h2>Tabela de Classificação - ${championship.name}</h2>
            
            <table class="standings-table">
                <thead>
                    <tr>
                        <th>Pos</th>
                        <th>Time</th>
                        <th>J</th>
                        <th>V</th>
                        <th>D</th>
                        <th>Pts</th>
                        <th>Forma</th>
                    </tr>
                </thead>
                <tbody>
                    ${sortedStandings.map((team, index) => `
                        <tr class="${team.teamKey === gameState.teamKey ? 'my-team' : ''}">
                            <td>${index + 1}º</td>
                            <td>${team.teamLogo} ${team.teamName}</td>
                            <td>${team.played}</td>
                            <td>${team.wins}</td>
                            <td>${team.losses}</td>
                            <td><strong>${team.points}</strong></td>
                            <td>${team.form.slice(-5).map(r => r === 'W' ? '✅' : '❌').join(' ')}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </section>
    `;
}

function renderHistory(container) {
    container.innerHTML = `
        <section class="content-section active">
            <h2>Histórico de Partidas</h2>
            
            <div class="history-list">
                ${gameState.matchHistory.length === 0 ? 
                    '<p style="text-align: center; color: var(--text-secondary);">Nenhuma partida jogada ainda</p>' :
                    gameState.matchHistory.map(match => `
                        <div class="match-history-item" style="
                            background: var(--bg-medium);
                            padding: 15px;
                            margin-bottom: 10px;
                            border-left: 3px solid ${match.result === 'W' ? '#4CAF50' : '#f44336'};
                        ">
                            <div style="display: flex; justify-content: space-between;">
                                <span>Semana ${match.week}</span>
                                <span>${match.opponent}</span>
                                <span style="color: ${match.result === 'W' ? '#4CAF50' : '#f44336'}; font-weight: bold;">
                                    ${match.result === 'W' ? 'VITÓRIA' : 'DERROTA'} ${match.score}
                                </span>
                            </div>
                        </div>
                    `).join('')
                }
            </div>
        </section>
    `;
}

function renderObjectives(container) {
    container.innerHTML = `
        <section class="content-section active">
            <h2>Objetivos da Temporada</h2>
            
            <div class="objectives-grid">
                <div class="objective-card">
                    <h3>🏆 Objetivo Principal</h3>
                    <div class="objective-item">
                        <div>${gameState.objectives.main.desc}</div>
                        <div>Recompensa: R$ ${gameState.objectives.main.reward.toLocaleString('pt-BR')}</div>
                        <div>Status: ${gameState.objectives.main.completed ? '✅ Completo' : '⏳ Em progresso'}</div>
                    </div>
                </div>
                
                <div class="objective-card">
                    <h3>📊 Objetivos Secundários</h3>
                    ${gameState.objectives.secondary.map(obj => `
                        <div class="objective-item">
                            <div>${obj.desc}</div>
                            <div>Recompensa: R$ ${obj.reward.toLocaleString('pt-BR')}</div>
                            <div>Status: ${obj.completed ? '✅' : '❌'}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
    `;
}

function renderFinances(container) {
    const totalSalaries = gameState.currentTeam.roster.reduce((sum, p) => sum + p.salary, 0);
    const sponsorIncome = socialMediaSystem.getMonthlyIncome();
    
    container.innerHTML = `
        <section class="content-section active">
            <h2>Relatório Financeiro</h2>
            
            <div class="finance-summary">
                <div class="finance-card">
                    <h3>💰 Saldo Atual</h3>
                    <div class="finance-value">R$ ${gameState.money.toLocaleString('pt-BR')}</div>
                </div>
                
                <div class="finance-card">
                    <h3>💸 Despesa Mensal (Salários)</h3>
                    <div class="finance-value">R$ ${totalSalaries.toLocaleString('pt-BR')}</div>
                </div>
                
                <div class="finance-card">
                    <h3>💵 Receita de Patrocínios</h3>
                    <div class="finance-value">R$ ${sponsorIncome.toLocaleString('pt-BR')}</div>
                </div>
            </div>
            
            <div class="salary-section">
                <h3>Folha Salarial</h3>
                ${gameState.currentTeam.roster.map(player => `
                    <div style="display: flex; justify-content: space-between; padding: 10px; background: var(--bg-medium); margin-bottom: 5px;">
                        <span>${player.name} (${player.role})</span>
                        <span>R$ ${player.salary.toLocaleString('pt-BR')}/mês</span>
                    </div>
                `).join('')}
            </div>
        </section>
    `;
}

function renderAcademy(container) {
    container.innerHTML = `
        <section class="content-section active">
            <h2>🎓 Academia de Talentos</h2>
            
            ${!academySystem.enabled ? `
                <div style="text-align: center; padding: 40px;">
                    <h3>Academia não criada</h3>
                    <p>Crie uma academia para desenvolver jovens talentos!</p>
                    <button onclick="academySystem.createAcademy()" class="btn-primary" style="margin-top: 20px;">
                        Criar Academia (R$ 200.000)
                    </button>
                </div>
            ` : `
                <h3>Jogadores da Academia</h3>
                <div class="lineup">
                    ${academySystem.roster.map((player, index) => `
                        <div class="player-card">
                            <h4>${player.name}</h4>
                            <p>${player.role} | ${player.age} anos</p>
                            <p>Overall: ${player.overall} | Potencial: ${player.potential}</p>
                            <button onclick="academySystem.promotePlayer(${index})" class="btn-primary">
                                Promover
                            </button>
                        </div>
                    `).join('')}
                </div>
            `}
        </section>
    `;
}

function renderSocial(container) {
    container.innerHTML = `
        <section class="content-section active">
            <h2>📱 Mídia Social & Marketing</h2>
            
            <div class="social-stats">
                <div class="social-stat">
                    <div class="stat-value">${socialMediaSystem.followers.toLocaleString('pt-BR')}</div>
                    <div class="stat-label">Seguidores</div>
                </div>
                <div class="social-stat">
                    <div class="stat-value">${socialMediaSystem.engagement}%</div>
                    <div class="stat-label">Engajamento</div>
                </div>
                <div class="social-stat">
                    <div class="stat-value">R$ ${socialMediaSystem.getMonthlyIncome().toLocaleString('pt-BR')}</div>
                    <div class="stat-label">Renda Mensal</div>
                </div>
            </div>
            
            <div class="content-creation">
                <h3>📸 Criar Conteúdo</h3>
                <div class="content-actions">
                    <button onclick="socialMediaSystem.postContent('victory')" class="btn-primary">
                        🏆 Postar Vitória
                    </button>
                    <button onclick="socialMediaSystem.postContent('training')" class="btn-primary">
                        💪 Conteúdo de Treino (R$ 5.000)
                    </button>
                    <button onclick="socialMediaSystem.postContent('announcement')" class="btn-primary">
                        📢 Fazer Anúncio (R$ 10.000)
                    </button>
                    <button onclick="socialMediaSystem.postContent('stream')" class="btn-primary">
                        🎥 Fazer Stream (R$ 15.000)
                    </button>
                </div>
            </div>
            
            <div class="sponsors-list">
                <h3>🤝 Patrocinadores Ativos</h3>
                ${socialMediaSystem.sponsors.length === 0 ? 
                    '<p>Nenhum patrocinador ainda</p>' :
                    socialMediaSystem.sponsors.map(sponsor => `
                        <div style="padding: 10px; background: var(--bg-medium); margin-bottom: 10px;">
                            <strong>${sponsor.name}</strong> - R$ ${sponsor.value.toLocaleString('pt-BR')}/mês
                        </div>
                    `).join('')
                }
            </div>
        </section>
    `;
}

function renderStaff(container) {
    container.innerHTML = `
        <section class="content-section active">
            <h2>👨‍⚕️ Staff Técnico</h2>
            
            <div class="staff-grid">
                <div class="staff-card">
                    <h3>🧠 Psicólogo</h3>
                    ${!staffSystem.psychologist ? `
                        <p>Status: Não contratado</p>
                        <p>Custo: R$ 50.000 (inicial) + R$ 15.000/mês</p>
                        <p>Benefício: Moral +10% recuperação</p>
                        <button onclick="staffSystem.hireStaff('psychologist')" class="btn-primary">
                            Contratar Psicólogo
                        </button>
                    ` : `
                        <p>✅ Contratado</p>
                        <p>Custo mensal: R$ 15.000</p>
                    `}
                </div>
                
                <div class="staff-card">
                    <h3>🥗 Nutricionista</h3>
                    ${!staffSystem.nutritionist ? `
                        <p>Status: Não contratado</p>
                        <p>Custo: R$ 30.000 (inicial) + R$ 10.000/mês</p>
                        <p>Benefício: -20% chance de lesão</p>
                        <button onclick="staffSystem.hireStaff('nutritionist')" class="btn-primary">
                            Contratar Nutricionista
                        </button>
                    ` : `
                        <p>✅ Contratado</p>
                        <p>Custo mensal: R$ 10.000</p>
                    `}
                </div>
                
                <div class="staff-card">
                    <h3>💪 Preparador Físico</h3>
                    ${!staffSystem.physicalTrainer ? `
                        <p>Status: Não contratado</p>
                        <p>Custo: R$ 40.000 (inicial) + R$ 12.000/mês</p>
                        <p>Benefício: +15% performance</p>
                        <button onclick="staffSystem.hireStaff('physicalTrainer')" class="btn-primary">
                            Contratar Preparador
                        </button>
                    ` : `
                        <p>✅ Contratado</p>
                        <p>Custo mensal: R$ 12.000</p>
                    `}
                </div>
            </div>
        </section>
    `;
}

// ====================================
// FUNÇÕES AUXILIARES
// ====================================

function getTeamPosition() {
    const standing = championship.standings.find(s => s.teamKey === gameState.teamKey);
    if (!standing) return 1;
    
    championship.standings.sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        const diffA = a.gamesWon - a.gamesLost;
        const diffB = b.gamesWon - b.gamesLost;
        return diffB - diffA;
    });
    
    return championship.standings.indexOf(standing) + 1;
}

function getTeamForm() {
    if (gameState.matchHistory.length === 0) return 'Sem jogos';
    const lastFive = gameState.matchHistory.slice(-5);
    return lastFive.map(m => m.result === 'W' ? '✅' : '❌').join(' ');
}

function getNextMatch() {
    if (!championship.schedule[championship.currentRound - 1]) {
        return { opponent: null, when: null };
    }
    
    const round = championship.schedule[championship.currentRound - 1];
    const match = round.find(m => 
        !m.played && (m.homeTeam === gameState.teamKey || m.awayTeam === gameState.teamKey)
    );
    
    if (!match) return { opponent: null, when: null };
    
    const teams = gameState.currentCompetition === 'circuito' ? teamsCircuito : teamsLTA;
    const opponentKey = match.homeTeam === gameState.teamKey ? match.awayTeam : match.homeTeam;
    const opponent = teams[opponentKey];
    const isHome = match.homeTeam === gameState.teamKey;
    
    return {
        opponent: `${opponent.logo} ${opponent.name}`,
        when: isHome ? '🏠 Em casa' : '✈️ Fora'
    };
}

function getDetailedNextMatch() {
    if (!championship.schedule[championship.currentRound - 1]) return null;
    
    const round = championship.schedule[championship.currentRound - 1];
    const match = round.find(m => 
        !m.played && (m.homeTeam === gameState.teamKey || m.awayTeam === gameState.teamKey)
    );
    
    if (!match) return null;
    
    const teams = gameState.currentCompetition === 'circuito' ? teamsCircuito : teamsLTA;
    const opponentKey = match.homeTeam === gameState.teamKey ? match.awayTeam : match.homeTeam;
    const opponent = teams[opponentKey];
    
    return {
        opponent: opponent,
        isHome: match.homeTeam === gameState.teamKey
    };
}

function getTeamMVP() {
    if (!gameState.currentTeam || !gameState.currentTeam.roster) {
        return { name: 'Nenhum', rating: '0.0' };
    }
    
    const mvp = gameState.currentTeam.roster.reduce((best, player) => {
        const rating = player.overall * (player.morale / 100);
        const bestRating = best.overall * (best.morale / 100);
        return rating > bestRating ? player : best;
    });
    
    return { 
        name: mvp.name, 
        rating: (mvp.overall / 10).toFixed(1)
    };
}

function generateNews() {
    const news = [
        { date: 'Hoje', text: `${gameState.currentTeam.name} se prepara para próxima rodada` },
        { date: 'Ontem', text: gameState.currentCompetition === 'circuito' ? 
            'Circuito Desafiante esquenta disputa pelo acesso' : 
            'LTA Sul 2025 promete ser o split mais disputado' },
        { date: '2 dias', text: 'Transferências agitam o mercado brasileiro' }
    ];
    
    return news.map(item => `
        <div class="news-item">
            <span class="news-date">${item.date}</span>
            <span class="news-text">${item.text}</span>
        </div>
    `).join('');
}

function generateAlerts() {
    const alerts = [];
    
    const injured = gameState.currentTeam.roster.filter(p => p.injured);
    if (injured.length > 0) {
        alerts.push(`🏥 ${injured.length} jogador(es) lesionado(s)`);
    }
    
    if (gameState.morale < 60) {
        alerts.push('😔 Moral do time está baixa!');
    }
    
    if (gameState.money < 100000) {
        alerts.push('💸 Orçamento baixo!');
    }
    
    const expiring = gameState.currentTeam.roster.filter(p => p.contract === 1);
    if (expiring.length > 0) {
        alerts.push(`📝 ${expiring.length} contrato(s) expirando`);
    }
    
    if (alerts.length === 0) {
        alerts.push('✅ Tudo em ordem!');
    }
    
    return alerts.map(alert => `<div class="alert-item">${alert}</div>`).join('');
}

function getMoraleColor(morale) {
    if (morale >= 80) return '#4CAF50';
    if (morale >= 60) return '#ff9800';
    return '#f44336';
}

function calculateTeamOverall(team) {
    if (!team || !team.roster) return 60;
    return Math.round(team.roster.reduce((sum, p) => sum + p.overall, 0) / team.roster.length);
}

function renderTransferList(players) {
    const roleIcons = {
        'TOP': '🛡️',
        'JG': '🗡️',
        'MID': '🔮',
        'ADC': '🏹',
        'SUP': '💚'
    };
    
    return players.slice(0, 20).map((player, index) => `
        <div class="transfer-item">
            <div class="transfer-player-info">
                <div style="font-size: 24px;">${roleIcons[player.role]}</div>
                <div>
                    <div style="font-weight: bold;">
                        ${player.name} 
                        ${player.isWonderkid ? '⭐' : ''}
                    </div>
                    <div style="color: var(--text-secondary);">
                        ${player.role} - Overall: ${player.overall} - Idade: ${player.age}
                        ${player.team ? ` - ${player.teamLogo || ''} ${player.team}` : ' - Sem clube'}
                    </div>
                </div>
            </div>
            <div class="transfer-actions">
                <div style="margin-bottom: 5px; font-weight: bold;">
                    R$ ${player.price.toLocaleString('pt-BR')}
                </div>
                <button onclick="makeOffer(${index})" class="btn-transfer">
                    Fazer Proposta
                </button>
            </div>
        </div>
    `).join('');
}

function renderScoutReports() {
    if (gameState.scoutReports.length === 0) {
        return '<p style="color: var(--text-secondary);">Nenhum relatório disponível</p>';
    }
    
    return gameState.scoutReports.map(report => `
        <div class="scout-report">
            <h4>Semana ${report.week} - ${report.type}</h4>
            ${report.players.map(player => `
                <div class="scouted-player">
                    <strong>${player.name}</strong>
                    <span>${player.role} - Overall: ${player.overall}</span>
                </div>
            `).join('')}
        </div>
    `).join('');
}

function getTacticIcon(style) {
    const icons = {
        aggressive: '⚔️',
        scaling: '📈',
        splitpush: '🏃',
        teamfight: '👥',
        balanced: '⚖️'
    };
    return icons[style] || '❓';
}

function getTacticName(style) {
    const names = {
        aggressive: 'Agressivo',
        scaling: 'Scaling',
        splitpush: 'Split Push',
        teamfight: 'Team Fight',
        balanced: 'Balanceado'
    };
    return names[style] || 'Desconhecido';
}

function getTacticDesc(style) {
    const descriptions = {
        aggressive: 'Early game forte',
        scaling: 'Farm seguro, late game',
        splitpush: 'Pressão lateral',
        teamfight: 'Foco em lutas 5v5',
        balanced: 'Adaptação ao jogo'
    };
    return descriptions[style] || '';
}

// ====================================
// FUNÇÕES DE AÇÃO
// ====================================

window.selectTactic = function(style) {
    gameState.tactics.style = style;
    mostrarSecao('tactics');
}

window.saveTactics = function() {
    showNotification('✅ Táticas salvas com sucesso!', 'success');
}

window.makeOffer = function(index) {
    const player = window.transferPlayers[index];
    if (gameState.money >= player.price) {
        if (confirm(`Contratar ${player.name} por R$ ${player.price.toLocaleString('pt-BR')}?`)) {
            gameState.money -= player.price;
            gameState.currentTeam.roster.push({
                name: player.name,
                role: player.role,
                overall: player.overall,
                age: player.age,
                salary: player.salary,
                contract: 2,
                morale: 75,
                injured: false,
                potential: player.potential || player.overall + 5
            });
            
            atualizarHeader();
            showNotification(`✅ ${player.name} contratado!`, 'success');
            mostrarSecao('transfers');
        }
    } else {
        showNotification('❌ Dinheiro insuficiente!', 'error');
    }
}

window.startScoutMission = function(type) {
    const costs = {
        international: 50000,
        national: 20000,
        soloq: 10000
    };
    
    const durations = {
        international: 2,
        national: 1,
        soloq: 1
    };
    
    if (gameState.money < costs[type]) {
        showNotification('❌ Dinheiro insuficiente!', 'error');
        return;
    }
    
    gameState.money -= costs[type];
    gameState.activeScouting.push({
        type: type,
        name: type === 'international' ? 'Scout Internacional' : 
              type === 'national' ? 'Scout Nacional' : 'Análise SoloQ',
        weeksRemaining: durations[type]
    });
    
    atualizarHeader();
    showNotification('🔍 Scout enviado!', 'success');
    mostrarSecao('scouts');
}

window.treinarJogador = function(index) {
    if (gameState.money < 10000) {
        showNotification('❌ Dinheiro insuficiente!', 'error');
        return;
    }
    
    gameState.money -= 10000;
    gameState.currentTeam.roster[index].overall += 1;
    
    atualizarHeader();
    showNotification(`✅ ${gameState.currentTeam.roster[index].name} melhorou!`, 'success');
    mostrarSecao('training');
}

function jogarPartida() {
    const nextMatch = getDetailedNextMatch();
    if (!nextMatch) {
        showNotification('❌ Não há partida disponível!', 'error');
        return;
    }
    
    const myPower = calculateTeamOverall(gameState.currentTeam) + (gameState.morale / 10);
    const oppPower = calculateTeamOverall(nextMatch.opponent);
    
    const homeBonuus = nextMatch.isHome ? 5 : 0;
    const finalMyPower = myPower + homeBonuus;
    
    const vitoria = (finalMyPower + Math.random() * 20) > (oppPower + Math.random() * 20);
    const placar = vitoria ? '2 - 1' : '1 - 2';
    
    gameState.matchHistory.push({
        week: gameState.currentWeek,
        opponent: nextMatch.opponent.name,
        result: vitoria ? 'W' : 'L',
        score: placar
    });
    
    // Atualizar standings
    const myStanding = championship.standings.find(s => s.teamKey === gameState.teamKey);
    if (myStanding) {
        myStanding.played++;
        if (vitoria) {
            myStanding.wins++;
            myStanding.points += 3;
            myStanding.form.push('W');
        } else {
            myStanding.losses++;
            myStanding.form.push('L');
        }
    }
    
    // Marcar partida como jogada
    const round = championship.schedule[championship.currentRound - 1];
    const match = round.find(m => 
        (m.homeTeam === gameState.teamKey || m.awayTeam === gameState.teamKey) && !m.played
    );
    if (match) {
        match.played = true;
    }
    
    // Recompensas
    if (vitoria) {
        gameState.money += 50000;
        gameState.morale = Math.min(100, gameState.morale + 10);
        gameState.reputation = Math.min(100, gameState.reputation + 5);
        showNotification('🏆 VITÓRIA! +R$ 50.000', 'success');
    } else {
        gameState.money += 20000;
        gameState.morale = Math.max(0, gameState.morale - 10);
        gameState.reputation = Math.max(0, gameState.reputation - 3);
        showNotification('😔 DERROTA! +R$ 20.000', 'error');
    }
    
    // Simular outras partidas
    simularOutrasPartidas();
    
    // Avançar rodada se todas as partidas foram jogadas
    if (round.every(m => m.played)) {
        championship.currentRound++;
    }
    
    atualizarHeader();
    mostrarSecao('matches');
}

function simularOutrasPartidas() {
    const round = championship.schedule[championship.currentRound - 1];
    if (!round) return;
    
    round.forEach(match => {
        if (!match.played && match.homeTeam !== gameState.teamKey && match.awayTeam !== gameState.teamKey) {
            const teams = gameState.currentCompetition === 'circuito' ? teamsCircuito : teamsLTA;
            
            const homeTeam = teams[match.homeTeam];
            const awayTeam = teams[match.awayTeam];
            
            const homePower = calculateTeamOverall(homeTeam) + 5; // Home advantage
            const awayPower = calculateTeamOverall(awayTeam);
            
            const homeWin = (homePower + Math.random() * 20) > (awayPower + Math.random() * 20);
            
            const homeStanding = championship.standings.find(s => s.teamKey === match.homeTeam);
            const awayStanding = championship.standings.find(s => s.teamKey === match.awayTeam);
            
            if (homeStanding) {
                homeStanding.played++;
                if (homeWin) {
                    homeStanding.wins++;
                    homeStanding.points += 3;
                    homeStanding.form.push('W');
                } else {
                    homeStanding.losses++;
                    homeStanding.form.push('L');
                }
            }
            
            if (awayStanding) {
                awayStanding.played++;
                if (!homeWin) {
                    awayStanding.wins++;
                    awayStanding.points += 3;
                    awayStanding.form.push('W');
                } else {
                    awayStanding.losses++;
                    awayStanding.form.push('L');
                }
            }
            
            match.played = true;
        }
    });
}

function getStaffMonthlyCost() {
    let cost = 0;
    if (staffSystem.psychologist) cost += 15000;
    if (staffSystem.nutritionist) cost += 10000;
    if (staffSystem.physicalTrainer) cost += 12000;
    if (staffSystem.analyst) cost += 20000;
    return cost;
}

function endSeason() {
    const position = getTeamPosition();
    
    let message = `🏆 Temporada finalizada!\n\n`;
    message += `Posição final: ${position}º lugar\n`;
    
    if (position <= 4) {
        gameState.money += 200000;
        message += `✅ Objetivo principal cumprido! +R$ 200.000`;
    } else {
        message += `❌ Objetivo principal não cumprido`;
    }
    
    alert(message);
    
    // Reset para próxima temporada
    championship.currentRound = 1;
    gerarCalendario();
}

function salvarJogo() {
    const saveData = {
        ...gameState,
        socialMedia: {
            followers: socialMediaSystem.followers,
            engagement: socialMediaSystem.engagement,
            sponsors: socialMediaSystem.sponsors
        },
        academy: academySystem,
        staff: staffSystem
    };
    
    localStorage.setItem('lolManagerSave', JSON.stringify(saveData));
    showNotification('✅ Jogo salvo com sucesso!', 'success');
}

function voltarMenuPrincipal() {
    if (confirm('Deseja salvar antes de sair?')) {
        salvarJogo();
    }
    
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('main-menu').style.display = 'flex';
}

function fecharModal() {
    document.getElementById('match-result-modal').style.display = 'none';
}

function showNotification(message, type = 'info') {
    const container = document.getElementById('notification-container');
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.borderLeftColor = 
        type === 'success' ? '#4CAF50' :
        type === 'error' ? '#f44336' :
        type === 'warning' ? '#ff9800' : '#2196F3';
    
    notification.textContent = message;
    
    container.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Debug helpers
window.gameDebug = {
    state: gameState,
    championship: championship,
    addMoney: (amount) => {
        gameState.money += amount;
        atualizarHeader();
        showNotification(`+R$ ${amount.toLocaleString('pt-BR')}`, 'success');
    },
    setMorale: (value) => {
        gameState.morale = value;
        atualizarHeader();
    },
    winMatch: () => {
        gameState.matchHistory.push({
            week: gameState.currentWeek,
            opponent: 'Debug Team',
            result: 'W',
            score: '2-0'
        });
        showNotification('Debug: Vitória adicionada', 'success');
    }
};
// ====================================
// SISTEMA DE ANÁLISE PRÉ-JOGO DETALHADA
// ====================================

function renderPreMatchAnalysis(container, opponent) {
    const myTeamStats = calculateDetailedTeamStats(gameState.currentTeam);
    const oppTeamStats = calculateDetailedTeamStats(opponent);
    
    const tacticalAdvantages = analyzeTacticalAdvantage(myTeamStats, oppTeamStats);
    const keyPlayers = identifyKeyPlayers(gameState.currentTeam, opponent);
    const prediction = generateMatchPrediction(myTeamStats, oppTeamStats);
    
    return `
        <div class="pre-match-analysis">
            <div class="analysis-header">
                <h3 class="analysis-title">📊 Análise Pré-Jogo Detalhada</h3>
                <p style="color: var(--text-secondary);">Comparação completa entre os times</p>
            </div>
            
            <div class="team-comparison">
                <div class="team-stats">
                    <h4 style="color: var(--gold-primary); text-align: center; margin-bottom: 20px;">
                        ${gameState.currentTeam.name}
                    </h4>
                    ${renderTeamStatsBar('Overall', myTeamStats.overall, oppTeamStats.overall, true)}
                    ${renderTeamStatsBar('Ataque', myTeamStats.attack, oppTeamStats.attack, true)}
                    ${renderTeamStatsBar('Defesa', myTeamStats.defense, oppTeamStats.defense, true)}
                    ${renderTeamStatsBar('Macro', myTeamStats.macro, oppTeamStats.macro, true)}
                    ${renderTeamStatsBar('Early Game', myTeamStats.earlyGame, oppTeamStats.earlyGame, true)}
                    ${renderTeamStatsBar('Late Game', myTeamStats.lateGame, oppTeamStats.lateGame, true)}
                    ${renderTeamStatsBar('Team Fight', myTeamStats.teamfight, oppTeamStats.teamfight, true)}
                    ${renderTeamStatsBar('Objetivos', myTeamStats.objectives, oppTeamStats.objectives, true)}
                </div>
                
                <div class="vs-divider">VS</div>
                
                <div class="team-stats">
                    <h4 style="color: var(--gold-primary); text-align: center; margin-bottom: 20px;">
                        ${opponent.name}
                    </h4>
                    ${renderTeamStatsBar('Overall', oppTeamStats.overall, myTeamStats.overall, false)}
                    ${renderTeamStatsBar('Ataque', oppTeamStats.attack, myTeamStats.attack, false)}
                    ${renderTeamStatsBar('Defesa', oppTeamStats.defense, myTeamStats.defense, false)}
                    ${renderTeamStatsBar('Macro', oppTeamStats.macro, myTeamStats.macro, false)}
                    ${renderTeamStatsBar('Early Game', oppTeamStats.earlyGame, myTeamStats.earlyGame, false)}
                    ${renderTeamStatsBar('Late Game', oppTeamStats.lateGame, myTeamStats.lateGame, false)}
                    ${renderTeamStatsBar('Team Fight', oppTeamStats.teamfight, myTeamStats.teamfight, false)}
                    ${renderTeamStatsBar('Objetivos', oppTeamStats.objectives, myTeamStats.objectives, false)}
                </div>
            </div>
            
            <div class="tactical-advantage">
                <h4 class="advantage-title">💡 Análise Tática</h4>
                <ul class="advantage-list">
                    ${tacticalAdvantages.map(adv => `<li class="advantage-item">${adv}</li>`).join('')}
                </ul>
            </div>
            
            <div class="key-players-section" style="margin-top: 30px;">
                <h4 style="color: var(--blue-secondary); margin-bottom: 15px;">🌟 Jogadores-Chave</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div style="background: rgba(0, 0, 0, 0.3); padding: 15px; border-radius: 8px;">
                        <h5 style="color: var(--gold-primary); margin-bottom: 10px;">${gameState.currentTeam.name}</h5>
                        ${keyPlayers.myTeam.map(p => `
                            <div style="padding: 5px 0; color: var(--text-primary);">
                                ${p.role} - ${p.name} (${p.overall})
                            </div>
                        `).join('')}
                    </div>
                    <div style="background: rgba(0, 0, 0, 0.3); padding: 15px; border-radius: 8px;">
                        <h5 style="color: var(--gold-primary); margin-bottom: 10px;">${opponent.name}</h5>
                        ${keyPlayers.opponent.map(p => `
                            <div style="padding: 5px 0; color: var(--text-primary);">
                                ${p.role} - ${p.name} (${p.overall})
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <div class="match-prediction" style="
                margin-top: 30px;
                padding: 20px;
                background: linear-gradient(135deg, rgba(200, 155, 60, 0.1), transparent);
                border-radius: 8px;
                text-align: center;
            ">
                <h4 style="color: var(--gold-secondary); margin-bottom: 15px;">🎯 Previsão da Partida</h4>
                <div style="font-size: 24px; font-weight: 700; color: ${prediction.favorite === 'you' ? '#4CAF50' : '#f44336'};">
                    ${prediction.message}
                </div>
                <div style="margin-top: 15px; color: var(--text-secondary);">
                    Chance de vitória: ${prediction.winChance}%
                </div>
            </div>
        </div>
    `;
}

function calculateDetailedTeamStats(team) {
    const roster = team.roster;
    const avgOverall = roster.reduce((sum, p) => sum + p.overall, 0) / roster.length;
    
    // Calcular estatísticas específicas baseadas nas posições
    const topLaner = roster.find(p => p.role === 'TOP');
    const jungler = roster.find(p => p.role === 'JG');
    const midLaner = roster.find(p => p.role === 'MID');
    const adCarry = roster.find(p => p.role === 'ADC');
    const support = roster.find(p => p.role === 'SUP');
    
    return {
        overall: Math.round(avgOverall),
        attack: Math.round((adCarry.overall + midLaner.overall) / 2),
        defense: Math.round((topLaner.overall + support.overall) / 2),
        macro: Math.round((jungler.overall + support.overall) / 2),
        earlyGame: Math.round((jungler.overall + roster.filter(p => p.age < 23).length * 10) / 2),
        lateGame: Math.round((adCarry.overall + midLaner.overall + topLaner.overall) / 3),
        teamfight: Math.round(avgOverall + (support.overall / 10)),
        objectives: Math.round((jungler.overall + support.overall + gameState.tactics.priorities.dragons / 10) / 3)
    };
}

function renderTeamStatsBar(label, value1, value2, isLeft) {
    const percentage = (value1 / (value1 + value2)) * 100;
    const color = percentage > 50 ? 'var(--success)' : percentage < 50 ? 'var(--danger)' : 'var(--warning)';
    
    return `
        <div class="stat-comparison">
            ${isLeft ? `<span class="stat-value">${value1}</span>` : ''}
            <span class="stat-label">${label}</span>
            <div class="stat-bar">
                <div class="stat-fill" style="width: ${isLeft ? percentage : 100 - percentage}%; background: ${color};"></div>
            </div>
            ${!isLeft ? `<span class="stat-value">${value1}</span>` : ''}
        </div>
    `;
}

function analyzeTacticalAdvantage(myStats, oppStats) {
    const advantages = [];
    
    if (myStats.overall > oppStats.overall) {
        advantages.push('✅ Overall superior - Favorito para vencer');
    } else if (myStats.overall < oppStats.overall) {
        advantages.push('⚠️ Overall inferior - Jogue com cautela');
    }
    
    if (myStats.earlyGame > oppStats.earlyGame) {
        advantages.push('🎯 Vantagem no Early Game - Seja agressivo no início');
    }
    
    if (myStats.lateGame > oppStats.lateGame) {
        advantages.push('📈 Vantagem no Late Game - Jogue para escalar');
    }
    
    if (myStats.teamfight > oppStats.teamfight) {
        advantages.push('👥 Superior em Team Fights - Force lutas 5v5');
    }
    
    if (myStats.objectives > oppStats.objectives) {
        advantages.push('🐉 Melhor controle de objetivos - Priorize Dragões e Barão');
    }
    
    // Análise baseada na tática escolhida
    if (gameState.tactics.style === 'aggressive' && myStats.earlyGame > oppStats.earlyGame) {
        advantages.push('⚔️ Sua tática agressiva combina com a força early do time');
    } else if (gameState.tactics.style === 'scaling' && myStats.lateGame > oppStats.lateGame) {
        advantages.push('📊 Sua tática de scaling é ideal contra este oponente');
    }
    
    return advantages;
}

function identifyKeyPlayers(myTeam, oppTeam) {
    const getTopPlayers = (roster) => {
        return roster
            .sort((a, b) => b.overall - a.overall)
            .slice(0, 3);
    };
    
    return {
        myTeam: getTopPlayers(myTeam.roster),
        opponent: getTopPlayers(oppTeam.roster)
    };
}

function generateMatchPrediction(myStats, oppStats) {
    const totalMyStats = Object.values(myStats).reduce((a, b) => a + b, 0);
    const totalOppStats = Object.values(oppStats).reduce((a, b) => a + b, 0);
    
    const winChance = Math.round((totalMyStats / (totalMyStats + totalOppStats)) * 100);
    
    let message;
    if (winChance > 60) {
        message = 'Grande favorito para vencer! 🏆';
    } else if (winChance > 50) {
        message = 'Leve vantagem, mas partida equilibrada ⚖️';
    } else if (winChance > 40) {
        message = 'Partida muito equilibrada, qualquer um pode vencer 🎲';
    } else {
        message = 'Azarão - Precisará de uma grande performance! 💪';
    }
    
    return {
        winChance,
        message,
        favorite: winChance > 50 ? 'you' : 'opponent'
    };
}

// ====================================
// SIMULAÇÃO DE PARTIDA EM TEMPO REAL (ESTILO BRASFOOT)
// ====================================

let matchSimulation = {
    isRunning: false,
    minute: 0,
    homeScore: 0,
    awayScore: 0,
    events: [],
    interval: null,
    homeTeam: null,
    awayTeam: null,
    currentGame: 1,
    seriesScore: { home: 0, away: 0 }
};

function startMatchSimulation(homeTeam, awayTeam, isPlayerHome) {
    matchSimulation.homeTeam = isPlayerHome ? gameState.currentTeam : awayTeam;
    matchSimulation.awayTeam = isPlayerHome ? awayTeam : gameState.currentTeam;
    matchSimulation.isRunning = true;
    matchSimulation.minute = 0;
    matchSimulation.events = [];
    matchSimulation.currentGame = 1;
    matchSimulation.seriesScore = { home: 0, away: 0 };
    
    // Criar modal de simulação
    createMatchSimulationModal();
    
    // Iniciar simulação do primeiro jogo
    simulateGame();
}

function createMatchSimulationModal() {
    const modal = document.createElement('div');
    modal.id = 'match-simulation-modal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 1000px;">
            <div class="match-simulation">
                <div class="match-header">
                    <div class="team-match-info">
                        <div class="team-match-logo">${matchSimulation.homeTeam.logo}</div>
                        <div class="team-match-name">${matchSimulation.homeTeam.name}</div>
                        <div class="team-match-stats" id="home-team-stats"></div>
                    </div>
                    
                    <div style="text-align: center;">
                        <div class="match-score">
                            <span id="home-series-score">0</span>
                            <span style="margin: 0 20px; color: var(--text-secondary);">-</span>
                            <span id="away-series-score">0</span>
                        </div>
                        <div style="color: var(--text-secondary); margin-top: 10px;">
                            Melhor de 3
                        </div>
                        <div id="current-game-number" style="color: var(--gold-secondary); margin-top: 10px; font-weight: 600;">
                            Jogo 1
                        </div>
                    </div>
                    
                    <div class="team-match-info">
                        <div class="team-match-logo">${matchSimulation.awayTeam.logo}</div>
                        <div class="team-match-name">${matchSimulation.awayTeam.name}</div>
                        <div class="team-match-stats" id="away-team-stats"></div>
                    </div>
                </div>
                
                <div class="match-timer">
                    <div class="match-minute">
                        <span id="match-minute">0</span>'
                    </div>
                    <div id="game-phase" style="color: var(--text-secondary); margin-top: 10px;">
                        Early Game
                    </div>
                </div>
                
                <div class="game-stats" style="
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    gap: 20px;
                    margin: 20px 0;
                    text-align: center;
                ">
                    <div style="background: rgba(0, 0, 0, 0.3); padding: 15px; border-radius: 8px;">
                        <div style="color: var(--gold-secondary); font-size: 24px; font-weight: 700;" id="home-kills">0</div>
                        <div style="color: var(--text-secondary); font-size: 12px; text-transform: uppercase;">Kills</div>
                    </div>
                    
                    <div style="background: rgba(0, 0, 0, 0.3); padding: 15px; border-radius: 8px;">
                        <div style="color: var(--blue-secondary); font-size: 20px; font-weight: 700;" id="game-gold-diff">0k</div>
                        <div style="color: var(--text-secondary); font-size: 12px; text-transform: uppercase;">Gold Diff</div>
                    </div>
                    
                    <div style="background: rgba(0, 0, 0, 0.3); padding: 15px; border-radius: 8px;">
                        <div style="color: var(--gold-secondary); font-size: 24px; font-weight: 700;" id="away-kills">0</div>
                        <div style="color: var(--text-secondary); font-size: 12px; text-transform: uppercase;">Kills</div>
                    </div>
                </div>
                
                <div class="objectives-tracker" style="
                    display: flex;
                    justify-content: space-around;
                    margin: 20px 0;
                    padding: 15px;
                    background: rgba(0, 0, 0, 0.3);
                    border-radius: 8px;
                ">
                    <div style="text-align: center;">
                        <div style="font-size: 20px;">🗼</div>
                        <div id="home-towers" style="color: var(--gold-primary);">11</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 20px;">🐉</div>
                        <div id="dragons-count" style="color: var(--blue-secondary);">0</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 20px;">🟣</div>
                        <div id="baron-status" style="color: var(--text-secondary);">-</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 20px;">🗼</div>
                        <div id="away-towers" style="color: var(--gold-primary);">11</div>
                    </div>
                </div>
                
                <div class="match-events" id="match-events">
                    <div style="text-align: center; color: var(--text-secondary); padding: 20px;">
                        Aguardando início da partida...
                    </div>
                </div>
                
                <div style="display: flex; gap: 20px; justify-content: center; margin-top: 20px;">
                    <button id="btn-speed-up" class="btn-secondary" onclick="speedUpMatch()">
                        ⏩ Acelerar
                    </button>
                    <button id="btn-pause-match" class="btn-secondary" onclick="pauseMatch()">
                        ⏸️ Pausar
                    </button>
                    <button id="btn-skip-match" class="btn-primary" onclick="skipToResult()">
                        ⏭️ Pular para Resultado
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function simulateGame() {
    const homeTeamPower = calculateTeamPower(matchSimulation.homeTeam);
    const awayTeamPower = calculateTeamPower(matchSimulation.awayTeam);
    
    // Reset para novo jogo
    matchSimulation.minute = 0;
    matchSimulation.homeKills = 0;
    matchSimulation.awayKills = 0;
    matchSimulation.homeTowers = 11;
    matchSimulation.awayTowers = 11;
    matchSimulation.dragons = 0;
    matchSimulation.goldDiff = 0;
    matchSimulation.events = [];
    
    // Atualizar número do jogo
    document.getElementById('current-game-number').textContent = `Jogo ${matchSimulation.currentGame}`;
    document.getElementById('match-events').innerHTML = '';
    
    // Intervalo de simulação (a cada 500ms simula 1 minuto do jogo)
    matchSimulation.interval = setInterval(() => {
        if (!matchSimulation.isRunning) {
            clearInterval(matchSimulation.interval);
            return;
        }
        
        matchSimulation.minute++;
        document.getElementById('match-minute').textContent = matchSimulation.minute;
        
        // Atualizar fase do jogo
        updateGamePhase();
        
        // Gerar eventos baseados no minuto
        generateMatchEvents(homeTeamPower, awayTeamPower);
        
        // Verificar fim do jogo
        if (matchSimulation.minute >= 30 || matchSimulation.homeTowers === 0 || matchSimulation.awayTowers === 0) {
            endGame();
        }
    }, 500);
}

function updateGamePhase() {
    const phaseElement = document.getElementById('game-phase');
    if (matchSimulation.minute < 15) {
        phaseElement.textContent = 'Early Game';
        phaseElement.style.color = 'var(--blue-secondary)';
    } else if (matchSimulation.minute < 25) {
        phaseElement.textContent = 'Mid Game';
        phaseElement.style.color = 'var(--gold-secondary)';
    } else {
        phaseElement.textContent = 'Late Game';
        phaseElement.style.color = 'var(--danger)';
    }
}

function generateMatchEvents(homePower, awayPower) {
    const eventChance = Math.random();
    
    // Chance de eventos baseada no minuto
    if (eventChance < 0.3) { // 30% chance de kill
        const homeAdvantage = (homePower + Math.random() * 30) > (awayPower + Math.random() * 30);
        
        if (homeAdvantage) {
            matchSimulation.homeKills++;
            matchSimulation.goldDiff += 300;
            addMatchEvent(`⚔️ ${matchSimulation.homeTeam.name} consegue um abate!`, 'home');
        } else {
            matchSimulation.awayKills++;
            matchSimulation.goldDiff -= 300;
            addMatchEvent(`⚔️ ${matchSimulation.awayTeam.name} consegue um abate!`, 'away');
        }
        
        document.getElementById('home-kills').textContent = matchSimulation.homeKills;
        document.getElementById('away-kills').textContent = matchSimulation.awayKills;
        document.getElementById('game-gold-diff').textContent = 
            (matchSimulation.goldDiff > 0 ? '+' : '') + (matchSimulation.goldDiff / 1000).toFixed(1) + 'k';
    }
    
    // Torres
    if (matchSimulation.minute > 10 && eventChance < 0.15) { // 15% chance de torre
        const towerTeam = (homePower + matchSimulation.goldDiff/100 + Math.random() * 30) > 
                         (awayPower - matchSimulation.goldDiff/100 + Math.random() * 30);
        
        if (towerTeam && matchSimulation.awayTowers > 0) {
            matchSimulation.awayTowers--;
            matchSimulation.goldDiff += 650;
            addMatchEvent(`🗼 ${matchSimulation.homeTeam.name} destrói uma torre!`, 'home');
        } else if (matchSimulation.homeTowers > 0) {
            matchSimulation.homeTowers--;
            matchSimulation.goldDiff -= 650;
            addMatchEvent(`🗼 ${matchSimulation.awayTeam.name} destrói uma torre!`, 'away');
        }
        
        document.getElementById('home-towers').textContent = matchSimulation.homeTowers;
        document.getElementById('away-towers').textContent = matchSimulation.awayTowers;
    }
    
    // Dragões
    if (matchSimulation.minute % 5 === 0 && matchSimulation.minute >= 5) {
        const dragonTeam = (homePower + matchSimulation.goldDiff/100 + Math.random() * 30) > 
                          (awayPower - matchSimulation.goldDiff/100 + Math.random() * 30);
        
        matchSimulation.dragons++;
        if (dragonTeam) {
            addMatchEvent(`🐉 ${matchSimulation.homeTeam.name} mata o Dragão!`, 'objective');
        } else {
            addMatchEvent(`🐉 ${matchSimulation.awayTeam.name} mata o Dragão!`, 'objective');
        }
        
        document.getElementById('dragons-count').textContent = matchSimulation.dragons;
    }
    
    // Barão
    if (matchSimulation.minute >= 20 && eventChance < 0.1) {
        const baronTeam = (homePower + matchSimulation.goldDiff/100 + Math.random() * 30) > 
                         (awayPower - matchSimulation.goldDiff/100 + Math.random() * 30);
        
        if (baronTeam) {
            matchSimulation.goldDiff += 1500;
            addMatchEvent(`🟣 ${matchSimulation.homeTeam.name} mata o Barão Nashor!`, 'baron');
            document.getElementById('baron-status').textContent = matchSimulation.homeTeam.name.substring(0, 3);
        } else {
            matchSimulation.goldDiff -= 1500;
            addMatchEvent(`🟣 ${matchSimulation.awayTeam.name} mata o Barão Nashor!`, 'baron');
            document.getElementById('baron-status').textContent = matchSimulation.awayTeam.name.substring(0, 3);
        }
    }
}

function addMatchEvent(text, type) {
    const eventDiv = document.createElement('div');
    eventDiv.className = 'match-event';
    
    let icon = '📝';
    let color = 'var(--text-primary)';
    
    switch(type) {
        case 'home':
            icon = '⚔️';
            color = 'var(--success)';
            break;
        case 'away':
            icon = '⚔️';
            color = 'var(--danger)';
            break;
        case 'objective':
            icon = '🐉';
            color = 'var(--gold-secondary)';
            break;
        case 'baron':
            icon = '🟣';
            color = 'var(--gold-primary)';
            break;
    }
    
    eventDiv.innerHTML = `
        <span class="event-minute" style="color: var(--blue-secondary);">${matchSimulation.minute}'</span>
        <span class="event-icon">${icon}</span>
        <span class="event-text" style="color: ${color};">${text}</span>
    `;
    
    const eventsContainer = document.getElementById('match-events');
    eventsContainer.insertBefore(eventDiv, eventsContainer.firstChild);
    
    // Manter apenas os últimos 10 eventos visíveis
    while (eventsContainer.children.length > 10) {
        eventsContainer.removeChild(eventsContainer.lastChild);
    }
}

function endGame() {
    clearInterval(matchSimulation.interval);
    
    // Determinar vencedor do jogo
    const homeWon = matchSimulation.goldDiff > 0 || matchSimulation.awayTowers === 0;
    
    if (homeWon) {
        matchSimulation.seriesScore.home++;
        addMatchEvent(`🏆 ${matchSimulation.homeTeam.name} vence o Jogo ${matchSimulation.currentGame}!`, 'home');
    } else {
        matchSimulation.seriesScore.away++;
        addMatchEvent(`🏆 ${matchSimulation.awayTeam.name} vence o Jogo ${matchSimulation.currentGame}!`, 'away');
    }
    
    document.getElementById('home-series-score').textContent = matchSimulation.seriesScore.home;
    document.getElementById('away-series-score').textContent = matchSimulation.seriesScore.away;
    
    // Verificar se a série acabou (melhor de 3)
    if (matchSimulation.seriesScore.home === 2 || matchSimulation.seriesScore.away === 2) {
        endSeries();
    } else {
        // Próximo jogo após 2 segundos
        matchSimulation.currentGame++;
        setTimeout(() => {
            simulateGame();
        }, 2000);
    }
}

function endSeries() {
    const playerWon = (matchSimulation.homeTeam === gameState.currentTeam && matchSimulation.seriesScore.home > matchSimulation.seriesScore.away) ||
                      (matchSimulation.awayTeam === gameState.currentTeam && matchSimulation.seriesScore.away > matchSimulation.seriesScore.home);
    
    // Processar resultado
    processMatchResult(playerWon, matchSimulation.seriesScore);
    
    // Fechar modal após 3 segundos
    setTimeout(() => {
        document.getElementById('match-simulation-modal').remove();
        mostrarSecao('matches');
    }, 3000);
}

function processMatchResult(won, score) {
    // Adicionar ao histórico
    gameState.matchHistory.push({
        week: gameState.currentWeek,
        opponent: matchSimulation.homeTeam === gameState.currentTeam ? 
                  matchSimulation.awayTeam.name : matchSimulation.homeTeam.name,
        result: won ? 'W' : 'L',
        score: matchSimulation.homeTeam === gameState.currentTeam ? 
               `${score.home} - ${score.away}` : `${score.away} - ${score.home}`
    });
    
    // Atualizar standings
    const myStanding = championship.standings.find(s => s.teamKey === gameState.teamKey);
    if (myStanding) {
        myStanding.played++;
        if (won) {
            myStanding.wins++;
            myStanding.points += 3;
            myStanding.form.push('W');
            
            // Recompensas
            gameState.money += gameState.currentCompetition === 'circuito' ? 50000 : 75000;
            gameState.morale = Math.min(100, gameState.morale + 10);
            gameState.reputation = Math.min(100, gameState.reputation + 5);
            
            showNotification(`🏆 VITÓRIA! ${score.home} - ${score.away}`, 'success');
        } else {
            myStanding.losses++;
            myStanding.form.push('L');
            
            // Penalidades
            gameState.money += gameState.currentCompetition === 'circuito' ? 20000 : 30000;
            gameState.morale = Math.max(0, gameState.morale - 10);
            gameState.reputation = Math.max(0, gameState.reputation - 3);
            
            showNotification(`😔 DERROTA! ${score.home} - ${score.away}`, 'error');
        }
    }
    
    atualizarHeader();
}

function calculateTeamPower(team) {
    const avgOverall = team.roster.reduce((sum, p) => sum + p.overall, 0) / team.roster.length;
    const moraleFactor = team === gameState.currentTeam ? gameState.morale / 100 : 0.85;
    
    // Adicionar bônus baseado em táticas
    let tacticBonus = 0;
    if (team === gameState.currentTeam) {
        switch(gameState.tactics.style) {
            case 'aggressive':
                tacticBonus = 5;
                break;
            case 'scaling':
                tacticBonus = matchSimulation.minute > 20 ? 10 : -5;
                break;
            case 'teamfight':
                tacticBonus = matchSimulation.minute > 15 ? 7 : 0;
                break;
        }
    }
    
    return avgOverall * moraleFactor + tacticBonus;
}

// Funções de controle da simulação
window.speedUpMatch = function() {
    if (matchSimulation.interval) {
        clearInterval(matchSimulation.interval);
        // Acelerar para 100ms por minuto
        matchSimulation.interval = setInterval(() => {
            if (matchSimulation.minute < 30) {
                matchSimulation.minute++;
                document.getElementById('match-minute').textContent = matchSimulation.minute;
                updateGamePhase();
                generateMatchEvents(
                    calculateTeamPower(matchSimulation.homeTeam),
                    calculateTeamPower(matchSimulation.awayTeam)
                );
                
                if (matchSimulation.minute >= 30) {
                    endGame();
                }
            }
        }, 100);
    }
}

window.pauseMatch = function() {
    matchSimulation.isRunning = !matchSimulation.isRunning;
    const btn = document.getElementById('btn-pause-match');
    if (btn) {
        btn.textContent = matchSimulation.isRunning ? '⏸️ Pausar' : '▶️ Continuar';
    }
}

window.skipToResult = function() {
    clearInterval(matchSimulation.interval);
    
    // Simular resultado rápido
    const homePower = calculateTeamPower(matchSimulation.homeTeam);
    const awayPower = calculateTeamPower(matchSimulation.awayTeam);
    
    while (matchSimulation.seriesScore.home < 2 && matchSimulation.seriesScore.away < 2) {
        const gameWinner = (homePower + Math.random() * 30) > (awayPower + Math.random() * 30);
        if (gameWinner) {
            matchSimulation.seriesScore.home++;
        } else {
            matchSimulation.seriesScore.away++;
        }
    }
    
    endSeries();
}

// Atualizar a função de jogar partida para usar a nova simulação
function jogarPartida() {
    const nextMatch = getDetailedNextMatch();
    if (!nextMatch) {
        showNotification('❌ Não há partida disponível!', 'error');
        return;
    }
    
    // Iniciar simulação com o novo sistema
    startMatchSimulation(gameState.currentTeam, nextMatch.opponent, nextMatch.isHome);
}

// Atualizar a função renderMatches para incluir análise pré-jogo
function renderMatches(container) {
    const nextMatch = getDetailedNextMatch();
    
    if (!nextMatch) {
        container.innerHTML = `
            <section class="content-section active">
                <h2>Próxima Partida</h2>
                <div style="text-align: center; padding: 40px;">
                    <h3 style="color: var(--text-secondary);">Não há partidas nesta rodada</h3>
                    <button onclick="avancarSemana()" class="btn-primary" style="margin-top: 20px;">
                        ⏭️ Avançar Tempo
                    </button>
                </div>
            </section>
        `;
        return;
    }
    
    container.innerHTML = `
        <section class="content-section active">
            <h2>Próxima Partida - Rodada ${championship.currentRound}</h2>
            
            <div style="text-align: center; padding: 15px; background: rgba(200, 155, 60, 0.1); margin-bottom: 20px; border-radius: 8px;">
                <h3 style="color: var(--gold-secondary);">
                    ${nextMatch.isHome ? '🏠 Jogando em Casa (+10% Performance)' : '✈️ Jogando Fora'}
                </h3>
            </div>
            
            ${renderPreMatchAnalysis(container, nextMatch.opponent)}
            
            <button id="btn-play-match" class="btn-simulate">
                🎮 INICIAR PARTIDA
            </button>
        </section>
    `;
    
    document.getElementById('btn-play-match')?.addEventListener('click', jogarPartida);
}
// ====================================
// SISTEMA DE SIMULAÇÃO COMPLETA DO CAMPEONATO
// ====================================

function simularRodadaCompleta() {
    if (!championship.schedule[championship.currentRound - 1]) {
        showNotification('❌ Não há mais rodadas nesta temporada!', 'error');
        return;
    }
    
    const round = championship.schedule[championship.currentRound - 1];
    const teams = gameState.currentCompetition === 'circuito' ? teamsCircuito : teamsLTA;
    
    // Simular todas as partidas da rodada (exceto a do jogador se ainda não foi jogada)
    round.forEach(match => {
        if (!match.played && match.homeTeam !== gameState.teamKey && match.awayTeam !== gameState.teamKey) {
            const homeTeam = teams[match.homeTeam];
            const awayTeam = teams[match.awayTeam];
            
            // Simular partida
            const result = simularPartidaIA(homeTeam, awayTeam);
            
            // Atualizar standings
            updateStandingsAfterMatch(match.homeTeam, match.awayTeam, result);
            
            // Marcar como jogada
            match.played = true;
            match.homeScore = result.homeScore;
            match.awayScore = result.awayScore;
        }
    });
    
    // Mostrar resultados da rodada
    mostrarResultadosRodada();
}

function simularPartidaIA(homeTeam, awayTeam) {
    const homePower = calculateTeamOverall(homeTeam) + 5; // Vantagem de casa
    const awayPower = calculateTeamOverall(awayTeam);
    
    let homeWins = 0;
    let awayWins = 0;
    
    // Simular melhor de 3
    while (homeWins < 2 && awayWins < 2) {
        const gameResult = (homePower + Math.random() * 30) > (awayPower + Math.random() * 30);
        if (gameResult) {
            homeWins++;
        } else {
            awayWins++;
        }
    }
    
    return {
        homeScore: homeWins,
        awayScore: awayWins,
        winner: homeWins > awayWins ? 'home' : 'away'
    };
}

function updateStandingsAfterMatch(homeTeamKey, awayTeamKey, result) {
    const homeStanding = championship.standings.find(s => s.teamKey === homeTeamKey);
    const awayStanding = championship.standings.find(s => s.teamKey === awayTeamKey);
    
    if (homeStanding) {
        homeStanding.played++;
        homeStanding.gamesWon += result.homeScore;
        homeStanding.gamesLost += result.awayScore;
        
        if (result.winner === 'home') {
            homeStanding.wins++;
            homeStanding.points += 3;
            homeStanding.form.push('W');
        } else {
            homeStanding.losses++;
            homeStanding.form.push('L');
        }
        
        // Manter apenas últimos 5 jogos na forma
        if (homeStanding.form.length > 5) {
            homeStanding.form = homeStanding.form.slice(-5);
        }
    }
    
    if (awayStanding) {
        awayStanding.played++;
        awayStanding.gamesWon += result.awayScore;
        awayStanding.gamesLost += result.homeScore;
        
        if (result.winner === 'away') {
            awayStanding.wins++;
            awayStanding.points += 3;
            awayStanding.form.push('W');
        } else {
            awayStanding.losses++;
            awayStanding.form.push('L');
        }
        
        // Manter apenas últimos 5 jogos na forma
        if (awayStanding.form.length > 5) {
            awayStanding.form = awayStanding.form.slice(-5);
        }
    }
}

function mostrarResultadosRodada() {
    const round = championship.schedule[championship.currentRound - 1];
    const teams = gameState.currentCompetition === 'circuito' ? teamsCircuito : teamsLTA;
    
    let resultadosHTML = `
        <div style="background: var(--bg-card); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
            <h3 style="color: var(--gold-primary); margin-bottom: 20px;">📊 Resultados da Rodada ${championship.currentRound}</h3>
            <div style="display: grid; gap: 10px;">
    `;
    
    round.forEach(match => {
        if (match.played) {
            const homeTeam = teams[match.homeTeam];
            const awayTeam = teams[match.awayTeam];
            const isMyMatch = match.homeTeam === gameState.teamKey || match.awayTeam === gameState.teamKey;
            
            resultadosHTML += `
                <div style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 12px;
                    background: ${isMyMatch ? 'rgba(200, 155, 60, 0.1)' : 'rgba(0, 0, 0, 0.3)'};
                    border-radius: 8px;
                    border: 1px solid ${isMyMatch ? 'var(--gold-secondary)' : 'var(--border-primary)'};
                ">
                    <div style="display: flex; align-items: center; gap: 10px; flex: 1;">
                        <span style="font-size: 20px;">${homeTeam.logo}</span>
                        <span style="color: ${match.homeScore > match.awayScore ? 'var(--success)' : 'var(--text-secondary)'};">
                            ${homeTeam.name}
                        </span>
                    </div>
                    
                    <div style="
                        padding: 5px 15px;
                        background: var(--bg-primary);
                        border-radius: 4px;
                        font-weight: 700;
                        color: var(--gold-secondary);
                    ">
                        ${match.homeScore} - ${match.awayScore}
                    </div>
                    
                    <div style="display: flex; align-items: center; gap: 10px; flex: 1; justify-content: flex-end;">
                        <span style="color: ${match.awayScore > match.homeScore ? 'var(--success)' : 'var(--text-secondary)'};">
                            ${awayTeam.name}
                        </span>
                        <span style="font-size: 20px;">${awayTeam.logo}</span>
                    </div>
                </div>
            `;
        }
    });
    
    resultadosHTML += `
            </div>
        </div>
    `;
    
    // Criar modal temporário para mostrar resultados
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 800px;">
            ${resultadosHTML}
            <button onclick="this.closest('.modal').remove()" class="btn-primary" style="display: block; margin: 20px auto;">
                Continuar
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Atualizar a função de avançar semana para simular rodada completa
function avancarSemana() {
    // Verificar se há partidas não jogadas na rodada atual
    if (championship.schedule[championship.currentRound - 1]) {
        const round = championship.schedule[championship.currentRound - 1];
        const myMatch = round.find(m => 
            !m.played && (m.homeTeam === gameState.teamKey || m.awayTeam === gameState.teamKey)
        );
        
        if (myMatch) {
            showNotification('⚠️ Você ainda tem uma partida para jogar nesta rodada!', 'warning');
            return;
        }
        
        // Se todas as partidas do jogador foram jogadas, simular o resto
        if (round.some(m => !m.played)) {
            simularRodadaCompleta();
        }
        
        // Avançar para próxima rodada se todas as partidas foram jogadas
        if (round.every(m => m.played)) {
            championship.currentRound++;
            
            if (championship.currentRound > championship.totalRounds) {
                endSeason();
                return;
            }
        }
    }

    // Só avança o calendário quando a semana puder realmente progredir
    gameState.currentWeek++;
    
    // Processar scouts
    gameState.activeScouting = gameState.activeScouting.filter(scout => {
        scout.weeksRemaining--;
        if (scout.weeksRemaining <= 0) {
            generateScoutReport(scout);
            return false;
        }
        return true;
    });
    
    // Processar treinamentos
    processarTreinamentos();
    
    // Processar lesões e recuperação
    processarLesoes();
    
    // Pagar salários mensalmente
    if (gameState.currentWeek % 4 === 0) {
        pagarSalariosMensal();
    }
    
    // Eventos aleatórios
    gerarEventoAleatorio();
    
    // Desenvolver jogadores da academia
    if (academySystem.enabled) {
        academySystem.developPlayers();
    }
    
    atualizarHeader();
    showNotification(`📅 Semana ${gameState.currentWeek} - Rodada ${championship.currentRound}`, 'info');
}

// ====================================
// SISTEMA DE TREINAMENTO BALANCEADO
// ====================================

const trainingSystem = {
    types: {
        basic: {
            name: 'Treino Básico',
            icon: '💪',
            cost: 10000,
            duration: 1,
            maxImprovement: 1,
            energy: 10,
            injuryRisk: 5,
            description: 'Melhora geral nas habilidades'
        },
        intensive: {
            name: 'Treino Intensivo',
            icon: '🔥',
            cost: 25000,
            duration: 2,
            maxImprovement: 2,
            energy: 25,
            injuryRisk: 15,
            description: 'Maior ganho, maior risco'
        },
        tactical: {
            name: 'Treino Tático',
            icon: '🧠',
            cost: 15000,
            duration: 1,
            maxImprovement: 1,
            energy: 5,
            injuryRisk: 2,
            description: 'Foco em posicionamento e macro',
            bonus: 'teamwork'
        },
        recovery: {
            name: 'Recuperação',
            icon: '🏥',
            cost: 5000,
            duration: 1,
            maxImprovement: 0,
            energy: -20,
            injuryRisk: 0,
            description: 'Recupera energia e moral'
        },
        bootcamp: {
            name: 'Bootcamp',
            icon: '🏕️',
            cost: 50000,
            duration: 3,
            maxImprovement: 3,
            energy: 30,
            injuryRisk: 10,
            description: 'Treino completo da equipe',
            teamWide: true
        }
    },
    
    activeTrainings: []
};

function renderTraining(container) {
    container.innerHTML = `
        <section class="content-section active">
            <h2>Centro de Treinamento</h2>
            
            <div style="background: var(--bg-card); border-radius: 12px; padding: 20px; margin-bottom: 30px;">
                <h3 style="color: var(--gold-primary); margin-bottom: 15px;">📊 Status do Treinamento</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                    <div style="text-align: center;">
                        <div style="color: var(--text-secondary); font-size: 12px; text-transform: uppercase;">Sessões Ativas</div>
                        <div style="color: var(--gold-secondary); font-size: 24px; font-weight: 700;">
                            ${trainingSystem.activeTrainings.length}
                        </div>
                    </div>
                    <div style="text-align: center;">
                        <div style="color: var(--text-secondary); font-size: 12px; text-transform: uppercase;">Custo Semanal</div>
                        <div style="color: var(--gold-secondary); font-size: 24px; font-weight: 700;">
                            R$ ${calculateWeeklyTrainingCost().toLocaleString('pt-BR')}
                        </div>
                    </div>
                    <div style="text-align: center;">
                        <div style="color: var(--text-secondary); font-size: 12px; text-transform: uppercase;">Energia Média</div>
                        <div style="color: ${getAverageEnergy() > 70 ? 'var(--success)' : getAverageEnergy() < 40 ? 'var(--danger)' : 'var(--warning)'}; font-size: 24px; font-weight: 700;">
                            ${Math.round(getAverageEnergy())}%
                        </div>
                    </div>
                </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 30px;">
                <div>
                    <h3 style="color: var(--gold-primary); margin-bottom: 20px;">👥 Jogadores</h3>
                    <div style="display: grid; gap: 15px;">
                        ${gameState.currentTeam.roster.map((player, index) => renderPlayerTrainingCard(player, index)).join('')}
                    </div>
                </div>
                
                <div>
                    <h3 style="color: var(--gold-primary); margin-bottom: 20px;">📋 Tipos de Treino</h3>
                    <div style="display: grid; gap: 15px;">
                        ${Object.entries(trainingSystem.types).map(([key, type]) => `
                            <div style="
                                background: var(--bg-card);
                                border: 1px solid var(--border-primary);
                                border-radius: 8px;
                                padding: 15px;
                                cursor: pointer;
                                transition: all 0.3s;
                            " onclick="selectTrainingType('${key}')" 
                               onmouseover="this.style.borderColor='var(--gold-secondary)'"
                               onmouseout="this.style.borderColor='var(--border-primary)'">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                                    <span style="font-size: 24px;">${type.icon}</span>
                                    <span style="color: var(--gold-secondary); font-weight: 600;">
                                        R$ ${type.cost.toLocaleString('pt-BR')}
                                    </span>
                                </div>
                                <div style="color: var(--gold-primary); font-weight: 600; margin-bottom: 5px;">
                                    ${type.name}
                                </div>
                                <div style="color: var(--text-secondary); font-size: 12px; margin-bottom: 10px;">
                                    ${type.description}
                                </div>
                                <div style="display: flex; gap: 10px; font-size: 11px;">
                                    <span style="color: var(--blue-secondary);">⏱️ ${type.duration} sem</span>
                                    <span style="color: ${type.injuryRisk > 10 ? 'var(--danger)' : 'var(--warning)'};">
                                        ⚠️ Risco: ${type.injuryRisk}%
                                    </span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <div style="margin-top: 30px;">
                <h3 style="color: var(--gold-primary); margin-bottom: 20px;">🎯 Treinos em Andamento</h3>
                <div style="display: grid; gap: 10px;">
                    ${trainingSystem.activeTrainings.length === 0 ? 
                        '<p style="color: var(--text-secondary); text-align: center;">Nenhum treino em andamento</p>' :
                        trainingSystem.activeTrainings.map(training => `
                            <div style="
                                background: var(--bg-card);
                                border-left: 3px solid var(--gold-secondary);
                                border-radius: 4px;
                                padding: 12px;
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                            ">
                                <div>
                                    <span style="color: var(--gold-primary); font-weight: 600;">
                                        ${training.playerName}
                                    </span>
                                    <span style="color: var(--text-secondary); margin-left: 10px;">
                                        ${training.typeName}
                                    </span>
                                </div>
                                <div style="color: var(--blue-secondary);">
                                    ⏱️ ${training.weeksRemaining} semana(s) restante(s)
                                </div>
                            </div>
                        `).join('')
                    }
                </div>
            </div>
        </section>
    `;
}

function renderPlayerTrainingCard(player, index) {
    const energy = player.energy || 100;
    const isTraining = trainingSystem.activeTrainings.find(t => t.playerIndex === index);
    const energyColor = energy > 70 ? 'var(--success)' : energy < 40 ? 'var(--danger)' : 'var(--warning)';
    
    return `
        <div style="
            background: var(--bg-card);
            border: 2px solid ${isTraining ? 'var(--gold-secondary)' : 'var(--border-primary)'};
            border-radius: 8px;
            padding: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            ${player.injured ? 'opacity: 0.6;' : ''}
        ">
            <div style="display: flex; gap: 15px; align-items: center;">
                <div style="font-size: 24px;">${getRoleIcon(player.role)}</div>
                <div>
                    <div style="color: var(--gold-primary); font-weight: 600;">
                        ${player.name} ${player.isWonderkid ? '⭐' : ''}
                    </div>
                    <div style="color: var(--text-secondary); font-size: 12px;">
                        ${player.role} - Overall: ${player.overall} - Idade: ${player.age}
                    </div>
                    <div style="display: flex; gap: 15px; margin-top: 5px;">
                        <div style="font-size: 11px;">
                            <span style="color: var(--text-secondary);">Energia:</span>
                            <span style="color: ${energyColor}; font-weight: 600;">
                                ${energy}%
                            </span>
                        </div>
                        <div style="font-size: 11px;">
                            <span style="color: var(--text-secondary);">Moral:</span>
                            <span style="color: ${getMoraleColor(player.morale)}; font-weight: 600;">
                                ${player.morale}%
                            </span>
                        </div>
                        ${player.potential > player.overall ? `
                            <div style="font-size: 11px;">
                                <span style="color: var(--text-secondary);">Potencial:</span>
                                <span style="color: var(--gold-secondary); font-weight: 600;">
                                    ${player.potential}
                                </span>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
            
            <div>
                ${player.injured ? 
                    `<span style="color: var(--danger);">🏥 Lesionado (${player.injuryWeeks || 1} sem)</span>` :
                    isTraining ? 
                        `<span style="color: var(--gold-secondary);">🎯 Treinando</span>` :
                        `<button onclick="startPlayerTraining(${index})" class="btn-secondary" style="padding: 8px 16px;">
                            Treinar
                        </button>`
                }
            </div>
        </div>
    `;
}

function getRoleIcon(role) {
    const icons = {
        'TOP': '🛡️',
        'JG': '🗡️',
        'MID': '🔮',
        'ADC': '🏹',
        'SUP': '💚'
    };
    return icons[role] || '👤';
}

function calculateWeeklyTrainingCost() {
    return trainingSystem.activeTrainings.reduce((total, training) => {
        return total + (trainingSystem.types[training.type]?.cost || 0) / (trainingSystem.types[training.type]?.duration || 1);
    }, 0);
}

function getAverageEnergy() {
    const totalEnergy = gameState.currentTeam.roster.reduce((sum, player) => {
        return sum + (player.energy || 100);
    }, 0);
    return totalEnergy / gameState.currentTeam.roster.length;
}

let selectedTrainingType = null;

window.selectTrainingType = function(type) {
    selectedTrainingType = type;
    showNotification(`📋 ${trainingSystem.types[type].name} selecionado`, 'info');
}

window.startPlayerTraining = function(playerIndex) {
    if (!selectedTrainingType) {
        showNotification('⚠️ Selecione um tipo de treino primeiro!', 'warning');
        return;
    }
    
    const player = gameState.currentTeam.roster[playerIndex];
    const trainingType = trainingSystem.types[selectedTrainingType];
    
    // Verificar se o jogador já está treinando
    if (trainingSystem.activeTrainings.find(t => t.playerIndex === playerIndex)) {
        showNotification('⚠️ Este jogador já está treinando!', 'warning');
        return;
    }
    
    // Verificar dinheiro
    if (gameState.money < trainingType.cost) {
        showNotification('❌ Dinheiro insuficiente!', 'error');
        return;
    }
    
    // Verificar energia
    if (!player.energy) player.energy = 100;
    if (player.energy < trainingType.energy && selectedTrainingType !== 'recovery') {
        showNotification('⚠️ Jogador muito cansado! Use recuperação primeiro.', 'warning');
        return;
    }
    
    // Iniciar treino
    gameState.money -= trainingType.cost;
    player.energy = Math.max(0, Math.min(100, player.energy - trainingType.energy));
    
    // Verificar lesão
    if (Math.random() * 100 < trainingType.injuryRisk) {
        player.injured = true;
        player.injuryWeeks = Math.ceil(Math.random() * 3);
        showNotification(`🏥 ${player.name} se lesionou durante o treino!`, 'error');
        atualizarHeader();
        mostrarSecao('training');
        return;
    }
    
    // Adicionar treino ativo
    trainingSystem.activeTrainings.push({
        playerIndex: playerIndex,
        playerName: player.name,
        type: selectedTrainingType,
        typeName: trainingType.name,
        weeksRemaining: trainingType.duration,
        maxImprovement: trainingType.maxImprovement
    });
    
    showNotification(`✅ ${player.name} iniciou ${trainingType.name}!`, 'success');
    atualizarHeader();
    mostrarSecao('training');
}

function processarTreinamentos() {
    trainingSystem.activeTrainings = trainingSystem.activeTrainings.filter(training => {
        training.weeksRemaining--;
        
        if (training.weeksRemaining <= 0) {
            const player = gameState.currentTeam.roster[training.playerIndex];
            if (player) {
                const trainingType = trainingSystem.types[training.type];
                
                if (training.type === 'recovery') {
                    // Recuperação
                    player.energy = Math.min(100, (player.energy || 100) + 30);
                    player.morale = Math.min(100, player.morale + 10);
                    showNotification(`💪 ${player.name} se recuperou!`, 'success');
                } else {
                    // Melhoria de overall
                    const improvement = Math.min(
                        trainingType.maxImprovement,
                        Math.max(1, Math.floor(Math.random() * (trainingType.maxImprovement + 1)))
                    );
                    
                    // Limitar pelo potencial
                    const actualImprovement = Math.min(improvement, (player.potential || 99) - player.overall);
                    
                    if (actualImprovement > 0) {
                        player.overall += actualImprovement;
                        showNotification(`📈 ${player.name} melhorou! +${actualImprovement} Overall`, 'success');
                    } else {
                        showNotification(`⚠️ ${player.name} atingiu seu potencial máximo`, 'warning');
                    }
                    
                    // Bônus de moral por completar treino
                    player.morale = Math.min(100, player.morale + 5);
                }
            }
            return false;
        }
        return true;
    });
}

function processarLesoes() {
    gameState.currentTeam.roster.forEach(player => {
        if (player.injured && player.injuryWeeks) {
            player.injuryWeeks--;
            if (player.injuryWeeks <= 0) {
                player.injured = false;
                player.energy = 70;
                showNotification(`🏥 ${player.name} se recuperou da lesão!`, 'success');
            }
        }
        
        // Recuperação natural de energia
        if (!player.injured) {
            player.energy = Math.min(100, (player.energy || 100) + 10);
        }
    });
}

function pagarSalariosMensal() {
    const totalSalaries = gameState.currentTeam.roster.reduce((sum, p) => sum + p.salary, 0);
    const sponsorIncome = socialMediaSystem.getMonthlyIncome();
    const staffCost = getStaffMonthlyCost();
    const academyCost = academySystem.enabled ? 50000 : 0;
    
    const totalCost = totalSalaries + staffCost + academyCost;
    const netCost = totalCost - sponsorIncome;
    
    gameState.money -= netCost;
    
    // Notificação detalhada
    let message = `💸 Finanças Mensais:\n`;
    message += `Salários: -R$ ${totalSalaries.toLocaleString('pt-BR')}\n`;
    if (staffCost > 0) message += `Staff: -R$ ${staffCost.toLocaleString('pt-BR')}\n`;
    if (academyCost > 0) message += `Academia: -R$ ${academyCost.toLocaleString('pt-BR')}\n`;
    if (sponsorIncome > 0) message += `Patrocínios: +R$ ${sponsorIncome.toLocaleString('pt-BR')}\n`;
    message += `Total: ${netCost > 0 ? '-' : '+'}R$ ${Math.abs(netCost).toLocaleString('pt-BR')}`;
    
    showNotification(message, netCost > 0 ? 'warning' : 'success');
    
    if (gameState.money < 0) {
        showNotification('⚠️ ATENÇÃO: Orçamento negativo! Risco de falência!', 'error');
        gameState.reputation = Math.max(0, gameState.reputation - 10);
    }
}

function gerarEventoAleatorio() {
    if (Math.random() > 0.7) {
        const eventos = [
            {
                text: '📈 Jogador em ótima forma!',
                effect: () => {
                    const player = gameState.currentTeam.roster[Math.floor(Math.random() * gameState.currentTeam.roster.length)];
                    player.morale = Math.min(100, player.morale + 15);
                    return `${player.name} está motivado!`;
                }
            },
            {
                text: '😔 Conflito no vestiário',
                effect: () => {
                    gameState.morale = Math.max(0, gameState.morale - 10);
                    return 'Moral do time diminuiu';
                }
            },
            {
                text: '🎯 Sessão de treino extra produtiva!',
                effect: () => {
                    const player = gameState.currentTeam.roster[Math.floor(Math.random() * gameState.currentTeam.roster.length)];
                    if (player.overall < (player.potential || 99)) {
                        player.overall++;
                        return `${player.name} melhorou!`;
                    }
                    return 'Time focado nos treinos';
                }
            },
            {
                text: '💰 Bônus de patrocinador!',
                effect: () => {
                    const bonus = 20000 + Math.floor(Math.random() * 30000);
                    gameState.money += bonus;
                    return `+R$ ${bonus.toLocaleString('pt-BR')}`;
                }
            },
            {
                text: '🏥 Jogador com desconforto',
                effect: () => {
                    const player = gameState.currentTeam.roster[Math.floor(Math.random() * gameState.currentTeam.roster.length)];
                    player.energy = Math.max(0, (player.energy || 100) - 30);
                    return `${player.name} precisa descansar`;
                }
            }
        ];
        
        const evento = eventos[Math.floor(Math.random() * eventos.length)];
        const result = evento.effect();
        showNotification(`${evento.text} - ${result}`, 'info');
    }
}

function generateScoutReport(scout) {
    const report = {
        week: gameState.currentWeek,
        type: scout.type,
        players: []
    };
    
    const numPlayers = scout.type === 'international' ? 5 : scout.type === 'national' ? 3 : 2;
    
    for (let i = 0; i < numPlayers; i++) {
        const isWonderkid = Math.random() < (scout.type === 'international' ? 0.3 : 0.2);
        const baseOverall = scout.type === 'international' ? 65 : scout.type === 'national' ? 60 : 55;
        
        report.players.push({
            name: generatePlayerName(),
            role: ['TOP', 'JG', 'MID', 'ADC', 'SUP'][Math.floor(Math.random() * 5)],
            overall: baseOverall + Math.floor(Math.random() * 10),
            age: 17 + Math.floor(Math.random() * 6),
            price: 30000 + Math.floor(Math.random() * 70000),
            salary: 15000 + Math.floor(Math.random() * 35000),
            potential: isWonderkid ? 80 + Math.floor(Math.random() * 10) : 70 + Math.floor(Math.random() * 10),
            isWonderkid: isWonderkid
        });
    }
    
    gameState.scoutReports.push(report);
    showNotification(`🔍 Relatório de scout disponível! ${report.players.filter(p => p.isWonderkid).length} wonderkid(s) encontrado(s)!`, 'success');
}

function generatePlayerName() {
    const firstNames = ['Carlos', 'Lucas', 'Gabriel', 'Pedro', 'João', 'Rafael', 'Bruno', 'Felipe', 'Matheus', 'André'];
    const nicknames = ['Destroyer', 'Shadow', 'Lightning', 'Phoenix', 'Dragon', 'Ninja', 'Storm', 'Ace', 'King', 'Beast'];
    const lastNames = ['Silva', 'Santos', 'Costa', 'Oliveira', 'Souza', 'Lima', 'Ferreira', 'Alves', 'Ribeiro', 'Martins'];
    
    const useNickname = Math.random() > 0.5;
    if (useNickname) {
        return nicknames[Math.floor(Math.random() * nicknames.length)] + Math.floor(Math.random() * 99);
    } else {
        return firstNames[Math.floor(Math.random() * firstNames.length)] + ' "' + 
               nicknames[Math.floor(Math.random() * nicknames.length)].toLowerCase() + '" ' +
               lastNames[Math.floor(Math.random() * lastNames.length)];
    }
}

// Adicionar energia inicial aos jogadores
function initializePlayerEnergy() {
    gameState.currentTeam.roster.forEach(player => {
        if (!player.energy) {
            player.energy = 90 + Math.floor(Math.random() * 10);
        }
    });
}

// Chamar ao iniciar o jogo
document.addEventListener('DOMContentLoaded', () => {
    // ... código existente ...
    
    // Adicionar inicialização de energia quando o jogo começar
    if (gameState.currentTeam) {
        initializePlayerEnergy();
    }
});
console.log('LoL Manager 2024 Complete Edition - Todas as funções carregadas!');
console.log('Use gameDebug no console para debug.');