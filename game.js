const STORAGE_KEY = 'lol-manager-save-v6';

const NAV_ITEMS = [
  { id: 'overview', icon: '📊', label: 'Visão Geral' },
  { id: 'calendar', icon: '🗓️', label: 'Calendário' },
  { id: 'matches', icon: '🎮', label: 'Partidas' },
  { id: 'roster', icon: '👥', label: 'Elenco' },
  { id: 'standings', icon: '🏆', label: 'Classificação' },
  { id: 'finances', icon: '💰', label: 'Finanças' },
  { id: 'news', icon: '📰', label: 'Central de Notícias' }
];

const PLAYER_NAMES = {
  TOP: ['Robo', 'Miso', 'Asta', 'Loki', 'Atlas', 'Sion', 'Snow', 'C4t'],
  JG: ['Croc', 'Aegis', 'Ranger', 'Neko', 'F4ke', 'Aero', 'Night', 'Ryu'],
  MID: ['tinowns', 'Ayu', 'Magi', 'Kuri', 'Sage', 'Maven', 'Psy', 'Zed'],
  ADC: ['Route', 'TitaN', 'Kaze', 'Bolt', 'Neo', 'Hunter', 'Sky', 'Lux'],
  SUP: ['RedBert', 'Damage', 'Nia', 'Yoshi', 'Hex', 'Sora', 'Mint', 'Bard']
};


const TEAMS = {
  loud: { name: 'LOUD', logo: '🦁', budget: 2200000, facilities: 91, fanbase: 96, roster: seedRoster(74, 81) },
  pain: { name: 'paiN Gaming', logo: '💥', budget: 2000000, facilities: 89, fanbase: 95, roster: seedRoster(73, 80) },
  furia: { name: 'FURIA', logo: '🔥', budget: 1650000, facilities: 88, fanbase: 90, roster: seedRoster(71, 79) },
  red: { name: 'RED Canids', logo: '🐺', budget: 1500000, facilities: 86, fanbase: 87, roster: seedRoster(70, 78) },
  keyd: { name: 'Vivo Keyd', logo: '⭐', budget: 1300000, facilities: 84, fanbase: 82, roster: seedRoster(69, 77) },
  kabum: { name: 'KaBuM!', logo: '⚡', budget: 1250000, facilities: 83, fanbase: 80, roster: seedRoster(68, 76) },
  liberty: { name: 'Liberty', logo: '🛡️', budget: 1000000, facilities: 79, fanbase: 77, roster: seedRoster(67, 75) },
  fluxo: { name: 'Fluxo W7M', logo: '🌊', budget: 1050000, facilities: 80, fanbase: 76, roster: seedRoster(67, 74) }
};

const state = {
  teamKey: null,
  currentSection: 'overview',
  week: 1,
  year: 2025,
  split: 1,
  money: 0,
  reputation: 70,
  morale: 80,
  boardConfidence: 80,
  schedule: [],
  standings: [],
  playedRounds: 0,
  matchHistory: [],
  inbox: [],
  lastGeneratedNewsWeek: 0
};

const qs = (s) => document.querySelector(s);

function seedRoster(minOverall, maxPotential) {
  const roles = ['TOP', 'JG', 'MID', 'ADC', 'SUP'];
  return roles.map((role, i) => ({
    role,
    name: PLAYER_NAMES[role][Math.floor(Math.random() * PLAYER_NAMES[role].length)] + (Math.random() > 0.7 ? i : ''),
    overall: minOverall + Math.floor(Math.random() * 5),
    potential: maxPotential - Math.floor(Math.random() * 4),
    age: 18 + Math.floor(Math.random() * 9),
    salary: 25000 + Math.floor(Math.random() * 55000),
    morale: 75 + Math.floor(Math.random() * 21),
    fatigue: 5 + Math.floor(Math.random() * 20)
  }));
}

document.addEventListener('DOMContentLoaded', init);

function init() {
  setupEventListeners();
  showLoading();
}

function setupEventListeners() {
  qs('#btn-novo-jogo')?.addEventListener('click', startNewGameFlow);
  qs('#btn-carregar-jogo')?.addEventListener('click', loadGame);
  qs('#btn-creditos')?.addEventListener('click', showCredits);
  qs('#btn-sair')?.addEventListener('click', () => showNotification('Feche a aba para sair do jogo.', 'warning'));
  qs('#btn-voltar-menu')?.addEventListener('click', () => screen('main-menu'));
  qs('#btn-advance-week')?.addEventListener('click', advanceWeek);
  qs('#btn-save-game')?.addEventListener('click', saveGame);
  qs('#btn-exit-to-menu')?.addEventListener('click', () => screen('main-menu'));
}

function showLoading() {
  setTimeout(() => {
    qs('#loading-screen').style.display = 'none';
    screen('main-menu');
  }, 1200);
}

function startNewGameFlow() {
  renderTeamSelection();
  screen('team-selection');
}

function renderTeamSelection() {
  const grid = qs('#teams-grid');
  grid.innerHTML = '';
  Object.entries(TEAMS).forEach(([key, team]) => {
    const average = getTeamOverall(team).toFixed(1);
    const card = document.createElement('div');
    card.className = 'team-card';
    card.innerHTML = `
      <div class="team-logo">${team.logo}</div>
      <div class="team-name">${team.name}</div>
      <div class="team-info">
        <strong>Overall:</strong> ${average}<br>
        <strong>Torcida:</strong> ${team.fanbase}/100<br>
        <strong>Infraestrutura:</strong> ${team.facilities}/100<br>
        <strong>Orçamento:</strong> ${formatMoney(team.budget)}
      </div>`;
    card.onclick = () => selectTeam(key);
    grid.appendChild(card);
  });
}

function selectTeam(teamKey) {
  state.teamKey = teamKey;
  state.money = TEAMS[teamKey].budget;
  state.reputation = Math.max(50, TEAMS[teamKey].fanbase - 10);
  state.morale = 80;
  state.boardConfidence = 80;
  state.week = 1;
  state.playedRounds = 0;
  state.matchHistory = [];
  state.schedule = createDoubleRoundRobin(Object.keys(TEAMS));
  state.standings = Object.keys(TEAMS).map((key) => ({ teamKey: key, wins: 0, losses: 0, mapsFor: 0, mapsAgainst: 0 }));
  state.inbox = [{ week: 1, type: 'info', text: `Bem-vindo à ${TEAMS[teamKey].name}. Objetivo da diretoria: Top 4.` }];
  state.lastGeneratedNewsWeek = 0;
  startGame();
}

function startGame() {
  screen('game-screen');
  renderNav();
  updateHeader();
  renderSection(state.currentSection);
  showNotification('Nova temporada iniciada com sucesso!', 'success');
}

function renderNav() {
  const menu = qs('#nav-menu');
  menu.innerHTML = NAV_ITEMS.map((item) => `
    <li class="nav-item ${item.id === state.currentSection ? 'active' : ''}" data-section="${item.id}">
      <span class="nav-icon">${item.icon}</span>
      <span>${item.label}</span>
    </li>
  `).join('');

  menu.querySelectorAll('.nav-item').forEach((item) => {
    item.addEventListener('click', () => {
      state.currentSection = item.dataset.section;
      renderNav();
      renderSection(state.currentSection);
    });
  });
}

function updateHeader() {
  const team = TEAMS[state.teamKey];
  qs('#team-name').textContent = team.name;
  qs('#season-text').textContent = `Split ${state.split} - ${state.year}`;
  qs('#current-week').textContent = state.week;
  qs('#money').textContent = formatMoney(state.money);
  qs('#reputation').textContent = `${Math.round(state.reputation)}/100`;
  qs('#team-morale').textContent = `${Math.round(state.morale)}%`;
}

function renderSection(section) {
  const container = qs('#main-content');
  const renderers = {
    overview: renderOverview,
    calendar: renderCalendar,
    matches: renderMatches,
    roster: renderRoster,
    standings: renderStandings,
    finances: renderFinances,
    news: renderNews
  };
  container.innerHTML = '';
  (renderers[section] || renderOverview)(container);
}

function renderOverview(container) {
  const team = TEAMS[state.teamKey];
  const pos = getTable().findIndex((r) => r.teamKey === state.teamKey) + 1;
  const nextMatch = getNextMatch();
  container.innerHTML = `
    <section class="content-section">
      <h2>Visão Geral</h2>
      <div class="overview-cards">
        <div class="stat-card"><h3>Posição</h3><div class="stat-value">${pos || '-'}</div><div class="stat-label">Classificação atual</div></div>
        <div class="stat-card"><h3>Overall do Time</h3><div class="stat-value">${getTeamOverall(team).toFixed(1)}</div><div class="stat-label">Força média</div></div>
        <div class="stat-card"><h3>Confiança da Diretoria</h3><div class="stat-value">${Math.round(state.boardConfidence)}%</div><div class="stat-label">Objetivo: top 4</div></div>
        <div class="stat-card"><h3>Próximo Jogo</h3><div class="stat-value">${nextMatch ? nextMatch.opponent.logo : '—'}</div><div class="stat-label">${nextMatch ? nextMatch.opponent.name : 'Temporada encerrada'}</div></div>
      </div>
      <div class="objective-sliders">
        <p><strong>Resumo semanal:</strong> Treino melhora overall, fadiga cai no descanso e o calendário avança com rodada completa.</p>
        <button class="btn-primary" id="btn-train-team">Treino Intensivo (+overall, -moral)</button>
        <button class="btn-secondary" id="btn-rest-team">Dia de Folga (+moral, -fadiga)</button>
      </div>
    </section>`;

  qs('#btn-train-team').onclick = trainTeam;
  qs('#btn-rest-team').onclick = restTeam;
}

function renderCalendar(container) {
  const rows = state.schedule.map((round, i) => {
    const mine = round.find((m) => m.home === state.teamKey || m.away === state.teamKey);
    if (!mine) return '';
    const opponentKey = mine.home === state.teamKey ? mine.away : mine.home;
    const opponent = TEAMS[opponentKey];
    const where = mine.home === state.teamKey ? 'Casa' : 'Fora';
    return `<tr class="${i + 1 === state.week ? 'my-team' : ''}"><td>Semana ${i + 1}</td><td>${where}</td><td>${opponent.logo} ${opponent.name}</td><td>${mine.played ? mine.score : 'Pendente'}</td></tr>`;
  }).join('');

  container.innerHTML = `
    <section class="content-section">
      <h2>Calendário</h2>
      <table class="standings-table"><thead><tr><th>Semana</th><th>Local</th><th>Adversário</th><th>Resultado</th></tr></thead>
      <tbody>${rows}</tbody></table>
    </section>`;
}

function renderMatches(container) {
  const nextMatch = getNextMatch();
  if (!nextMatch) {
    container.innerHTML = '<section class="content-section"><h2>Partidas</h2><p>Split finalizado. Avance para nova temporada em breve.</p></section>';
    return;
  }
  const odds = predictWinChance(TEAMS[state.teamKey], nextMatch.opponent);
  container.innerHTML = `
    <section class="content-section">
      <h2>Partida da Semana</h2>
      <div class="match-simulation">
        <div class="match-header">
          <div class="team-match-info"><div class="team-match-logo">${TEAMS[state.teamKey].logo}</div><div class="team-match-name">${TEAMS[state.teamKey].name}</div></div>
          <div class="vs-divider">vs</div>
          <div class="team-match-info"><div class="team-match-logo">${nextMatch.opponent.logo}</div><div class="team-match-name">${nextMatch.opponent.name}</div></div>
        </div>
        <p>Chance estimada de vitória: <strong>${Math.round(odds)}%</strong></p>
        <button id="btn-play-now" class="btn-simulate">Jogar Agora (Bo3)</button>
      </div>
    </section>`;
  qs('#btn-play-now').onclick = () => {
    playPlayerMatch(nextMatch.match);
    updateHeader();
    renderSection('matches');
  };
}

function renderRoster(container) {
  const players = TEAMS[state.teamKey].roster;
  container.innerHTML = `
    <section class="content-section">
      <h2>Elenco</h2>
      <div class="teams-grid">
        ${players.map((p, i) => `
        <div class="player-card">
          <div class="player-role">${p.role}</div>
          <div class="player-name">${p.name}</div>
          <div class="player-stats">OVR ${p.overall} | POT ${p.potential}<br>Idade ${p.age} | Moral ${Math.round(p.morale)}%</div>
          <div class="player-morale">Fadiga: ${Math.round(p.fatigue)}%</div>
          <button class="btn-secondary" onclick="improvePlayer(${i})">Treino Individual</button>
        </div>`).join('')}
      </div>
    </section>`;
}

window.improvePlayer = function(index) {
  const p = TEAMS[state.teamKey].roster[index];
  if (!p) return;
  const cost = 15000;
  if (state.money < cost) return showNotification('Sem dinheiro para treino individual.', 'error');
  state.money -= cost;
  p.overall = Math.min(p.potential, p.overall + (Math.random() > 0.45 ? 1 : 0));
  p.fatigue = Math.min(100, p.fatigue + 12);
  p.morale = Math.max(40, p.morale - 4);
  recalcTeamMood();
  updateHeader();
  renderSection('roster');
  showNotification(`${p.name} completou um treino individual.`, 'success');
};

function renderStandings(container) {
  const rows = getTable().map((r, i) => {
    const t = TEAMS[r.teamKey];
    return `<tr class="${r.teamKey === state.teamKey ? 'my-team' : ''}"><td>${i + 1}</td><td>${t.logo} ${t.name}</td><td>${r.wins}</td><td>${r.losses}</td><td>${r.mapsFor}-${r.mapsAgainst}</td></tr>`;
  }).join('');
  container.innerHTML = `
    <section class="content-section"><h2>Classificação</h2>
    <table class="standings-table"><thead><tr><th>#</th><th>Time</th><th>V</th><th>D</th><th>Maps</th></tr></thead><tbody>${rows}</tbody></table>
    </section>`;
}

function renderFinances(container) {
  const payroll = TEAMS[state.teamKey].roster.reduce((sum, p) => sum + p.salary, 0);
  const sponsor = 90000 + Math.round(state.reputation * 200);
  container.innerHTML = `
    <section class="content-section">
      <h2>Finanças</h2>
      <div class="overview-cards">
        <div class="stat-card"><h3>Saldo</h3><div class="stat-value">${formatMoney(state.money)}</div><div class="stat-label">Caixa atual</div></div>
        <div class="stat-card"><h3>Folha salarial/semana</h3><div class="stat-value">${formatMoney(payroll)}</div><div class="stat-label">Pagamento de elenco</div></div>
        <div class="stat-card"><h3>Patrocínio/semana</h3><div class="stat-value">${formatMoney(sponsor)}</div><div class="stat-label">Depende da reputação</div></div>
      </div>
    </section>`;
}

function renderNews(container) {
  const inbox = [...state.inbox].sort((a, b) => b.week - a.week);
  container.innerHTML = `
    <section class="content-section">
      <h2>Central de Notícias</h2>
      <div class="match-events">
        ${inbox.length ? inbox.map((n) => `<div class="match-event"><span class="event-minute">Semana ${n.week}</span><span class="event-text">${n.text}</span></div>`).join('') : '<p>Sem notícias no momento.</p>'}
      </div>
    </section>`;
}

function getTable() {
  return [...state.standings].sort((a, b) => (b.wins - a.wins) || ((b.mapsFor - b.mapsAgainst) - (a.mapsFor - a.mapsAgainst)));
}

function getNextMatch() {
  const round = state.schedule[state.week - 1];
  if (!round) return null;
  const match = round.find((m) => m.home === state.teamKey || m.away === state.teamKey);
  if (!match) return null;
  return { match, opponent: TEAMS[match.home === state.teamKey ? match.away : match.home] };
}

function advanceWeek() {
  const round = state.schedule[state.week - 1];
  if (!round) return showNotification('Temporada finalizada. Em breve novo split.', 'warning');

  round.forEach((match) => {
    if (match.played) return;
    if (match.home === state.teamKey || match.away === state.teamKey) {
      playPlayerMatch(match, true);
    } else {
      simulateAutoMatch(match);
    }
  });

  settleEconomy();
  generateWeeklyNews();
  state.week += 1;
  state.playedRounds += 1;

  if (state.week > state.schedule.length) {
    finishSplit();
  }

  updateHeader();
  renderSection(state.currentSection);
  showNotification('Semana avançada com sucesso.', 'success');
}

function playPlayerMatch(match, silent = false) {
  if (match.played) return;
  const homeTeam = TEAMS[match.home];
  const awayTeam = TEAMS[match.away];
  const homePower = getTeamPower(homeTeam);
  const awayPower = getTeamPower(awayTeam);
  const homeWin = Math.random() < (homePower / (homePower + awayPower));
  const score = homeWin ? '2-1' : '1-2';
  applyMatchResult(match, score, homeWin ? match.home : match.away);

  if (!silent) {
    showNotification(`Resultado: ${homeTeam.name} ${score} ${awayTeam.name}`, 'info');
  }
}

function simulateAutoMatch(match) {
  const homePower = getTeamPower(TEAMS[match.home]);
  const awayPower = getTeamPower(TEAMS[match.away]);
  const homeWin = Math.random() < (homePower / (homePower + awayPower));
  const close = Math.random() > 0.35;
  const score = homeWin ? (close ? '2-1' : '2-0') : (close ? '1-2' : '0-2');
  applyMatchResult(match, score, homeWin ? match.home : match.away);
}

function applyMatchResult(match, score, winnerKey) {
  const [homeMaps, awayMaps] = score.split('-').map(Number);
  match.played = true;
  match.score = score;

  const homeStanding = state.standings.find((s) => s.teamKey === match.home);
  const awayStanding = state.standings.find((s) => s.teamKey === match.away);

  homeStanding.mapsFor += homeMaps;
  homeStanding.mapsAgainst += awayMaps;
  awayStanding.mapsFor += awayMaps;
  awayStanding.mapsAgainst += homeMaps;

  if (winnerKey === match.home) {
    homeStanding.wins += 1;
    awayStanding.losses += 1;
  } else {
    awayStanding.wins += 1;
    homeStanding.losses += 1;
  }

  if (match.home === state.teamKey || match.away === state.teamKey) {
    const isWin = winnerKey === state.teamKey;
    state.matchHistory.push({ week: state.week, opponent: TEAMS[match.home === state.teamKey ? match.away : match.home].name, result: isWin ? 'V' : 'D', score });

    state.reputation = clamp(state.reputation + (isWin ? 1.8 : -1.2), 20, 99);
    state.boardConfidence = clamp(state.boardConfidence + (isWin ? 2.2 : -2), 10, 100);
    adjustRosterMorale(isWin ? 3.5 : -4.5);
  }
}

function settleEconomy() {
  const roster = TEAMS[state.teamKey].roster;
  const payroll = roster.reduce((sum, p) => sum + p.salary, 0);
  const sponsor = 90000 + Math.round(state.reputation * 200);
  state.money += sponsor - payroll;
  if (state.money < 0) {
    state.boardConfidence = clamp(state.boardConfidence - 5, 0, 100);
    state.inbox.push({ week: state.week, type: 'warning', text: 'Alerta financeiro: caixa no vermelho.' });
  }
}

function trainTeam() {
  const roster = TEAMS[state.teamKey].roster;
  const cost = 50000;
  if (state.money < cost) return showNotification('Sem orçamento para treino intensivo.', 'error');
  state.money -= cost;
  roster.forEach((p) => {
    if (Math.random() > 0.45 && p.overall < p.potential) p.overall += 1;
    p.fatigue = clamp(p.fatigue + 18, 0, 100);
    p.morale = clamp(p.morale - 3, 35, 100);
  });
  recalcTeamMood();
  updateHeader();
  renderSection('overview');
}

function restTeam() {
  TEAMS[state.teamKey].roster.forEach((p) => {
    p.fatigue = clamp(p.fatigue - 20, 0, 100);
    p.morale = clamp(p.morale + 4, 35, 100);
  });
  recalcTeamMood();
  updateHeader();
  renderSection('overview');
}

function adjustRosterMorale(delta) {
  TEAMS[state.teamKey].roster.forEach((p) => {
    p.morale = clamp(p.morale + delta, 20, 100);
    p.fatigue = clamp(p.fatigue + (delta > 0 ? 4 : 8), 0, 100);
  });
  recalcTeamMood();
}

function recalcTeamMood() {
  const roster = TEAMS[state.teamKey].roster;
  state.morale = roster.reduce((sum, p) => sum + p.morale, 0) / roster.length;
}

function generateWeeklyNews() {
  if (state.lastGeneratedNewsWeek === state.week) return;
  state.lastGeneratedNewsWeek = state.week;
  const table = getTable();
  const leader = TEAMS[table[0].teamKey].name;
  const myPos = table.findIndex((t) => t.teamKey === state.teamKey) + 1;
  state.inbox.push({ week: state.week, type: 'info', text: `${leader} lidera o split após ${state.week} semana(s).` });
  state.inbox.push({ week: state.week, type: 'info', text: `Sua equipe está em ${myPos}º lugar.` });
}

function finishSplit() {
  const table = getTable();
  const myPos = table.findIndex((t) => t.teamKey === state.teamKey) + 1;
  const prizeByPos = [700000, 450000, 300000, 200000, 120000, 80000, 50000, 30000];
  state.money += prizeByPos[myPos - 1] || 0;
  state.inbox.push({ week: state.week, type: 'success', text: `Split encerrado! Você terminou em ${myPos}º e recebeu ${formatMoney(prizeByPos[myPos - 1] || 0)}.` });
  showNotification(`Split finalizado! Posição final: ${myPos}º`, 'success');
}

function createDoubleRoundRobin(teamKeys) {
  const firstLeg = roundRobin(teamKeys);
  const secondLeg = firstLeg.map((round) => round.map((m) => ({ home: m.away, away: m.home, played: false, score: null })));
  return [...firstLeg, ...secondLeg];
}

function roundRobin(teamKeys) {
  const teams = [...teamKeys];
  if (teams.length % 2 !== 0) teams.push(null);
  const rounds = [];
  for (let round = 0; round < teams.length - 1; round++) {
    const matches = [];
    for (let i = 0; i < teams.length / 2; i++) {
      const home = teams[i];
      const away = teams[teams.length - 1 - i];
      if (home && away) matches.push({ home, away, played: false, score: null });
    }
    rounds.push(matches);
    teams.splice(1, 0, teams.pop());
  }
  return rounds;
}

function getTeamOverall(team) {
  return team.roster.reduce((sum, p) => sum + p.overall, 0) / team.roster.length;
}

function getTeamPower(team) {
  const avg = getTeamOverall(team);
  const morale = team.roster.reduce((sum, p) => sum + p.morale, 0) / team.roster.length;
  const fatigue = team.roster.reduce((sum, p) => sum + p.fatigue, 0) / team.roster.length;
  return avg * 1.8 + morale * 0.55 - fatigue * 0.35 + Math.random() * 8;
}

function predictWinChance(myTeam, opponent) {
  const mine = getTeamPower(myTeam);
  const opp = getTeamPower(opponent);
  return clamp((mine / (mine + opp)) * 100, 10, 90);
}

function saveGame() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  showNotification('Jogo salvo com sucesso.', 'success');
}

function loadGame() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return showNotification('Nenhum save encontrado.', 'warning');
  try {
    const loaded = JSON.parse(raw);
    Object.assign(state, loaded);
    if (!state.teamKey || !TEAMS[state.teamKey]) throw new Error('save inválido');
    startGame();
    showNotification('Save carregado.', 'success');
  } catch {
    showNotification('Falha ao carregar save.', 'error');
  }
}

function showCredits() {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
  <div class="modal-content">
    <h2>Créditos</h2>
    <p>Rework completo da base do LoL Manager com foco em estabilidade, calendário funcional e progressão real.</p>
    <button class="btn-primary" id="close-credits">Fechar</button>
  </div>`;
  qs('#modal-container').appendChild(modal);
  qs('#close-credits').onclick = () => modal.remove();
}

function showNotification(message, type = 'info') {
  const box = document.createElement('div');
  box.className = `notification ${type}`;
  box.textContent = message;
  qs('#notification-container').appendChild(box);
  setTimeout(() => box.remove(), 2800);
}

function formatMoney(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function screen(screenId) {
  ['main-menu', 'team-selection', 'game-screen'].forEach((id) => {
    qs(`#${id}`).style.display = id === screenId ? (id === 'game-screen' ? 'grid' : 'block') : 'none';
  });
}
