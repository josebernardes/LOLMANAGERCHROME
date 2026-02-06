const SAVE_KEY = 'nexus-dynasty-save-v1';

const LEAGUE_TEAMS = [
  ['loud', 'LOUD', '🦁', 76, 95, 2200000],
  ['pain', 'paiN', '💥', 75, 93, 2050000],
  ['furia', 'FURIA', '🔥', 73, 89, 1700000],
  ['red', 'RED', '🐺', 72, 86, 1500000],
  ['keyd', 'Vivo Keyd', '⭐', 71, 82, 1380000],
  ['kabum', 'KaBuM!', '⚡', 70, 80, 1270000],
  ['liberty', 'Liberty', '🛡️', 69, 77, 1080000],
  ['fluxo', 'Fluxo', '🌊', 68, 76, 990000]
];

const NAV = [
  ['dashboard', 'Dashboard'], ['calendar', 'Calendário'], ['matchday', 'Partida'],
  ['squad', 'Elenco'], ['market', 'Mercado'], ['training', 'Treino'],
  ['standings', 'Classificação'], ['finance', 'Finanças'], ['news', 'Notícias']
];

const FREE_AGENTS = [
  ['Astra', 'MID', 70, 79, 20, 50000, 290000],
  ['Hexa', 'JG', 69, 77, 21, 47000, 240000],
  ['Rook', 'TOP', 68, 75, 22, 42000, 200000],
  ['Nox', 'ADC', 71, 74, 25, 56000, 280000],
  ['Vail', 'SUP', 67, 78, 19, 39000, 210000]
];

const ROLES = ['TOP', 'JG', 'MID', 'ADC', 'SUP'];

const state = {
  running: false,
  screen: 'dashboard',
  userTeam: null,
  year: 2025,
  split: 1,
  week: 1,
  teams: [],
  standings: [],
  schedule: [],
  money: 0,
  reputation: 72,
  board: 80,
  inbox: [],
  transferPool: [],
  splitFinished: false
};

const $ = (q) => document.querySelector(q);
const byId = (id) => document.getElementById(id);

const app = {
  init() {
    this.bindCore();
    this.renderNav();
    this.renderTopbar();
    this.renderView();
  },

  bindCore() {
    byId('new-save').onclick = () => this.openTeamSelect();
    byId('load-save').onclick = () => this.load();
    byId('save-game').onclick = () => this.save();
    byId('reset-game').onclick = () => this.reset();
  },

  openTeamSelect() {
    const teamsHTML = LEAGUE_TEAMS.map(([key, name, logo, ovr, fan, budget]) => `
      <button class="ghost" data-team="${key}" style="text-align:left;">
        <strong>${logo} ${name}</strong><br>
        <span class="muted">OVR ${ovr} • Fanbase ${fan} • Caixa ${money(budget)}</span>
      </button>
    `).join('');

    this.modal(`
      <h2>Escolha seu time</h2>
      <div class="grid" style="margin-top:10px;">${teamsHTML}</div>
    `, () => {
      document.querySelectorAll('[data-team]').forEach((btn) => {
        btn.onclick = () => {
          this.startNew(btn.dataset.team);
          this.closeModal();
        };
      });
    });
  },

  startNew(teamKey) {
    const teams = LEAGUE_TEAMS.map(([key, name, logo, ovr, fan, budget]) => ({
      key, name, logo, baseOvr: ovr, fanbase: fan, budget,
      roster: this.generateRoster(key, ovr)
    }));

    state.userTeam = teamKey;
    state.year = 2025;
    state.split = 1;
    state.week = 1;
    state.screen = 'dashboard';
    state.teams = teams;
    state.standings = teams.map((t) => ({ key: t.key, wins: 0, losses: 0, mapsFor: 0, mapsAgainst: 0 }));
    state.schedule = createDoubleRoundRobin(teams.map((t) => t.key));
    state.money = teams.find((t) => t.key === teamKey).budget;
    state.reputation = 72;
    state.board = 80;
    state.inbox = [{ week: 1, text: 'Nova era iniciada. Objetivo: Top 4.', type: 'good' }];
    state.transferPool = FREE_AGENTS.map((p, i) => ({ id: i, name: p[0], role: p[1], ovr: p[2], pot: p[3], age: p[4], salary: p[5], price: p[6] }));
    state.splitFinished = false;
    state.running = true;

    this.renderNav();
    this.renderTopbar();
    this.renderView();
    this.toast('Novo jogo criado!', 'good');
  },

  generateRoster(prefix, baseOvr) {
    return ROLES.map((role, i) => ({
      id: `${prefix}-${role}-${i}`,
      name: `${role}_${String.fromCharCode(65 + i)}${Math.floor(Math.random() * 9)}`,
      role,
      ovr: baseOvr - rand(0, 3),
      pot: baseOvr + rand(1, 6),
      age: rand(18, 27),
      morale: rand(74, 90),
      fatigue: rand(8, 22),
      salary: rand(30000, 75000),
      injury: 0
    }));
  },

  renderNav() {
    const nav = byId('nav');
    nav.innerHTML = NAV.map(([id, label]) =>
      `<button class="nav-item ${state.screen === id ? 'active' : ''}" data-nav="${id}">${label}</button>`
    ).join('');
    nav.querySelectorAll('[data-nav]').forEach((b) => {
      b.onclick = () => { state.screen = b.dataset.nav; this.renderNav(); this.renderView(); };
    });
  },

  renderTopbar() {
    const team = this.userTeam();
    byId('topbar').innerHTML = `
      <div class="kpi"><div class="label">Time</div><div class="value">${team ? `${team.logo} ${team.name}` : '—'}</div></div>
      <div class="kpi"><div class="label">Temporada</div><div class="value">S${state.split} • ${state.year}</div></div>
      <div class="kpi"><div class="label">Semana</div><div class="value">${state.week}</div></div>
      <div class="kpi"><div class="label">Caixa</div><div class="value">${money(state.money)}</div></div>
      <div class="kpi"><div class="label">Reputação</div><div class="value">${Math.round(state.reputation)}</div></div>
      <div class="kpi"><div class="label">Diretoria</div><div class="value">${Math.round(state.board)}%</div></div>
    `;
  },

  renderView() {
    if (!state.running) {
      byId('view').innerHTML = `
        <div class="card">
          <h2>Bem-vindo ao NEXUS DYNASTY</h2>
          <p class="muted">Novo jogo de gerenciamento competitivo com identidade totalmente nova.</p>
          <p class="muted" style="margin-top:8px;">Clique em <strong>Novo Jogo</strong> para começar.</p>
        </div>`;
      return;
    }

    const map = {
      dashboard: () => this.viewDashboard(),
      calendar: () => this.viewCalendar(),
      matchday: () => this.viewMatchday(),
      squad: () => this.viewSquad(),
      market: () => this.viewMarket(),
      training: () => this.viewTraining(),
      standings: () => this.viewStandings(),
      finance: () => this.viewFinance(),
      news: () => this.viewNews()
    };
    (map[state.screen] || map.dashboard)();
  },

  viewDashboard() {
    const team = this.userTeam();
    const pos = this.sortedTable().findIndex((r) => r.key === state.userTeam) + 1;
    const avgOvr = avg(team.roster.map((p) => p.ovr)).toFixed(1);
    const avgMorale = avg(team.roster.map((p) => p.morale)).toFixed(0);
    const next = this.userMatchForWeek(state.week);
    const opp = next ? this.teamByKey(next.home === state.userTeam ? next.away : next.home) : null;

    byId('view').innerHTML = `
      <div class="grid cols-3">
        <div class="card"><h3>Classificação</h3><div style="font-size:36px;font-weight:800;">${pos}º</div><p class="muted">Objetivo Top 4</p></div>
        <div class="card"><h3>Força Média</h3><div style="font-size:36px;font-weight:800;">${avgOvr}</div><p class="muted">OVR do elenco</p></div>
        <div class="card"><h3>Moral Média</h3><div style="font-size:36px;font-weight:800;">${avgMorale}%</div><p class="muted">Vestiário</p></div>
      </div>
      <div class="card" style="margin-top:12px;">
        <h3>Próximo jogo</h3>
        <p class="muted" style="margin:6px 0 10px;">${opp ? `${team.logo} ${team.name} vs ${opp.logo} ${opp.name}` : 'Split encerrado.'}</p>
        <button class="primary" id="dash-advance">Avançar Semana</button>
      </div>
    `;
    byId('dash-advance').onclick = () => this.advanceWeek();
  },

  viewCalendar() {
    const rows = state.schedule.map((round, i) => {
      const m = round.matches.find((x) => x.home === state.userTeam || x.away === state.userTeam);
      const opp = this.teamByKey(m.home === state.userTeam ? m.away : m.home);
      const place = m.home === state.userTeam ? 'Casa' : 'Fora';
      return `<tr class="${i + 1 === state.week ? 'me' : ''}">
        <td>Semana ${i + 1}</td><td>${place}</td><td>${opp.logo} ${opp.name}</td><td>${m.played ? m.score : 'Pendente'}</td>
      </tr>`;
    }).join('');
    byId('view').innerHTML = `
      <div class="card"><h2>Calendário</h2>
      <table class="table"><thead><tr><th>Semana</th><th>Local</th><th>Adversário</th><th>Resultado</th></tr></thead><tbody>${rows}</tbody></table>
      </div>`;
  },

  viewMatchday() {
    if (state.splitFinished) {
      byId('view').innerHTML = `<div class="card"><h2>Split Encerrado</h2><p class="muted">Inicie um novo jogo para continuar.</p></div>`;
      return;
    }
    const user = this.userTeam();
    const match = this.userMatchForWeek(state.week);
    const opp = this.teamByKey(match.home === state.userTeam ? match.away : match.home);
    const chance = this.winChance(user, opp);

    byId('view').innerHTML = `
      <div class="card">
        <h2>Matchday — Semana ${state.week}</h2>
        <p style="margin-top:8px;">${user.logo} ${user.name} vs ${opp.logo} ${opp.name}</p>
        <p class="muted" style="margin-top:6px;">Chance de vitória: ${Math.round(chance)}%</p>
        <div style="display:flex;gap:8px;margin-top:12px;">
          <button class="primary" id="play-series">Jogar Série BO3</button>
          <button class="ghost" id="sim-series">Simular Série</button>
          <button class="ghost" id="advance-after">Avançar Semana</button>
        </div>
        <div id="series-log" style="margin-top:12px;"></div>
      </div>
    `;

    byId('play-series').onclick = () => this.playUserSeries(false);
    byId('sim-series').onclick = () => this.playUserSeries(true);
    byId('advance-after').onclick = () => this.advanceWeek();
  },

  playUserSeries(simulated) {
    const round = this.currentRound();
    const match = round.matches.find((m) => m.home === state.userTeam || m.away === state.userTeam);
    if (match.played) return this.toast('Sua série já foi jogada.', 'warn');

    const result = this.simulateSeries(match.home, match.away);
    this.applyResult(match, result);

    const won = result.winner === state.userTeam;
    state.reputation = clamp(state.reputation + (won ? 2 : -1.5), 20, 99);
    state.board = clamp(state.board + (won ? 2.2 : -3), 0, 100);

    this.userTeam().roster.forEach((p) => {
      p.fatigue = clamp(p.fatigue + rand(7, 13), 0, 100);
      p.morale = clamp(p.morale + (won ? rand(1, 4) : -rand(2, 5)), 20, 100);
    });

    const log = byId('series-log');
    if (log) {
      log.innerHTML = `
        <div class="card">
          <p><strong>Resultado:</strong> ${this.teamByKey(result.home).name} ${result.score} ${this.teamByKey(result.away).name}</p>
          <p class="muted"><strong>MVP:</strong> ${result.mvp}</p>
          <p class="muted">${simulated ? 'Série simulada automaticamente.' : 'Série disputada com foco tático.'}</p>
        </div>`;
    }

    this.renderTopbar();
    this.toast('Série concluída.', 'good');
  },

  viewSquad() {
    const roster = this.userTeam().roster;
    byId('view').innerHTML = `
      <div class="grid cols-2">
      ${roster.map((p, i) => `
        <div class="card">
          <h3>${p.role} • ${p.name}</h3>
          <p class="muted">OVR ${p.ovr} / POT ${p.pot} • ${p.age} anos</p>
          <p class="muted">Moral ${Math.round(p.morale)}% • Fadiga ${Math.round(p.fatigue)}%</p>
          <p class="muted">Salário ${money(p.salary)} ${p.injury ? `• Lesão ${p.injury} sem.` : ''}</p>
          <button class="ghost" data-train="${i}" style="margin-top:8px;">Treino Individual</button>
        </div>`).join('')}
      </div>`;
    document.querySelectorAll('[data-train]').forEach((b) => {
      b.onclick = () => this.trainPlayer(Number(b.dataset.train));
    });
  },

  trainPlayer(idx) {
    const p = this.userTeam().roster[idx];
    const cost = 20000;
    if (state.money < cost) return this.toast('Caixa insuficiente.', 'bad');
    state.money -= cost;
    if (Math.random() < 0.55 && p.ovr < p.pot) p.ovr += 1;
    p.fatigue = clamp(p.fatigue + rand(10, 16), 0, 100);
    p.morale = clamp(p.morale + rand(1, 3), 20, 100);
    this.renderTopbar();
    this.viewSquad();
    this.toast(`${p.name} evoluiu no treino.`, 'good');
  },

  viewMarket() {
    const rows = state.transferPool.map((p, i) => `
      <tr>
        <td>${p.name}</td><td>${p.role}</td><td>${p.ovr}</td><td>${p.pot}</td><td>${p.age}</td>
        <td>${money(p.price)}</td><td>${money(p.salary)}</td>
        <td><button class="ghost" data-buy="${i}">Assinar</button></td>
      </tr>`).join('');
    byId('view').innerHTML = `
      <div class="card">
        <h2>Mercado de Jogadores</h2>
        <table class="table"><thead><tr><th>Nome</th><th>Função</th><th>OVR</th><th>POT</th><th>Idade</th><th>Preço</th><th>Salário</th><th>Ação</th></tr></thead>
        <tbody>${rows || '<tr><td colspan="8">Sem opções.</td></tr>'}</tbody></table>
      </div>`;
    document.querySelectorAll('[data-buy]').forEach((b) => {
      b.onclick = () => this.buyPlayer(Number(b.dataset.buy));
    });
  },

  buyPlayer(i) {
    const p = state.transferPool[i];
    if (!p) return;
    const cost = p.price + p.salary;
    if (state.money < cost) return this.toast('Sem dinheiro para contratar.', 'bad');
    state.money -= cost;
    this.userTeam().roster.push({
      id: `new-${Date.now()}`,
      name: p.name,
      role: p.role,
      ovr: p.ovr,
      pot: p.pot,
      age: p.age,
      morale: 82,
      fatigue: 14,
      salary: p.salary,
      injury: 0
    });
    state.transferPool.splice(i, 1);
    state.inbox.push({ week: state.week, text: `${p.name} assinou com seu time.`, type: 'good' });
    this.renderTopbar();
    this.viewMarket();
    this.toast('Contratação concluída.', 'good');
  },

  viewTraining() {
    byId('view').innerHTML = `
      <div class="grid cols-3">
        <div class="card"><h3>Intenso</h3><p class="muted">+evolução, +fadiga, -moral</p><button class="primary" id="tr-intense">Aplicar</button></div>
        <div class="card"><h3>Balanceado</h3><p class="muted">+constância, fadiga moderada</p><button class="ghost" id="tr-balanced">Aplicar</button></div>
        <div class="card"><h3>Recuperação</h3><p class="muted">-fadiga, +moral</p><button class="ghost" id="tr-recovery">Aplicar</button></div>
      </div>`;
    byId('tr-intense').onclick = () => this.teamTraining('intense');
    byId('tr-balanced').onclick = () => this.teamTraining('balanced');
    byId('tr-recovery').onclick = () => this.teamTraining('recovery');
  },

  teamTraining(mode) {
    const cost = { intense: 75000, balanced: 50000, recovery: 25000 }[mode];
    if (state.money < cost) return this.toast('Caixa insuficiente.', 'bad');
    state.money -= cost;

    this.userTeam().roster.forEach((p) => {
      if (mode !== 'recovery' && Math.random() < (mode === 'intense' ? 0.6 : 0.45) && p.ovr < p.pot) p.ovr += 1;
      if (mode === 'intense') { p.fatigue = clamp(p.fatigue + rand(12, 18), 0, 100); p.morale = clamp(p.morale - rand(1, 4), 20, 100); }
      if (mode === 'balanced') { p.fatigue = clamp(p.fatigue + rand(8, 13), 0, 100); p.morale = clamp(p.morale + rand(0, 2), 20, 100); }
      if (mode === 'recovery') { p.fatigue = clamp(p.fatigue - rand(16, 26), 0, 100); p.morale = clamp(p.morale + rand(2, 6), 20, 100); }
    });

    this.renderTopbar();
    this.toast('Treino de equipe aplicado.', 'good');
    this.viewTraining();
  },

  viewStandings() {
    const rows = this.sortedTable().map((r, i) => {
      const t = this.teamByKey(r.key);
      return `<tr class="${r.key === state.userTeam ? 'me' : ''}"><td>${i + 1}</td><td>${t.logo} ${t.name}</td><td>${r.wins}</td><td>${r.losses}</td><td>${r.mapsFor}-${r.mapsAgainst}</td></tr>`;
    }).join('');

    byId('view').innerHTML = `<div class="card"><h2>Classificação</h2>
      <table class="table"><thead><tr><th>#</th><th>Time</th><th>V</th><th>D</th><th>Maps</th></tr></thead><tbody>${rows}</tbody></table>
    </div>`;
  },

  viewFinance() {
    const payroll = this.userTeam().roster.reduce((s, p) => s + p.salary, 0);
    const sponsor = this.sponsorPerWeek();
    byId('view').innerHTML = `
      <div class="grid cols-3">
        <div class="card"><h3>Saldo Atual</h3><p style="font-size:28px;font-weight:800;">${money(state.money)}</p></div>
        <div class="card"><h3>Patrocínio Semanal</h3><p style="font-size:28px;font-weight:800;">${money(sponsor)}</p></div>
        <div class="card"><h3>Folha Semanal</h3><p style="font-size:28px;font-weight:800;">${money(payroll)}</p></div>
      </div>`;
  },

  viewNews() {
    const items = [...state.inbox].sort((a, b) => b.week - a.week);
    byId('view').innerHTML = `<div class="grid">${items.map((n) => `<div class="card"><span class="tag ${n.type}">S${n.week}</span><p style="margin-top:6px;">${n.text}</p></div>`).join('')}</div>`;
  },

  advanceWeek() {
    if (state.splitFinished) return this.toast('Split já terminou.', 'warn');
    const round = this.currentRound();
    if (!round) return;

    round.matches.forEach((m) => {
      if (m.played) return;
      const r = this.simulateSeries(m.home, m.away);
      this.applyResult(m, r);
    });

    this.weeklyEconomy();
    this.weeklyHealth();
    this.weeklyNews();

    state.week += 1;
    if (state.week > state.schedule.length) this.finishSplit();

    this.renderTopbar();
    this.renderView();
    this.renderNav();
    this.toast('Semana avançada.', 'good');
  },

  weeklyEconomy() {
    const payroll = this.userTeam().roster.reduce((s, p) => s + p.salary, 0);
    state.money += this.sponsorPerWeek() - payroll;
    const pos = this.sortedTable().findIndex((r) => r.key === state.userTeam) + 1;
    if (pos <= 3) state.money += 30000;
    if (state.money < 0) state.board = clamp(state.board - 5, 0, 100);
  },

  weeklyHealth() {
    this.userTeam().roster.forEach((p) => {
      if (p.injury > 0) p.injury -= 1;
      else if (Math.random() < Math.max(0, (p.fatigue - 78) / 220)) p.injury = rand(1, 3);
      p.fatigue = clamp(p.fatigue - rand(4, 8), 0, 100);
    });
  },

  weeklyNews() {
    const table = this.sortedTable();
    const leader = this.teamByKey(table[0].key).name;
    const me = table.findIndex((r) => r.key === state.userTeam) + 1;
    state.inbox.push({ week: state.week, text: `${leader} lidera após a semana ${state.week}.`, type: 'warn' });
    state.inbox.push({ week: state.week, text: `Você está em ${me}º lugar.`, type: me <= 4 ? 'good' : 'bad' });
  },

  finishSplit() {
    state.splitFinished = true;
    const pos = this.sortedTable().findIndex((r) => r.key === state.userTeam) + 1;
    const prize = [800000, 500000, 300000, 200000, 120000, 70000, 50000, 30000][pos - 1] || 0;
    state.money += prize;
    state.inbox.push({ week: state.week, text: `Split finalizado em ${pos}º. Premiação: ${money(prize)}.`, type: 'good' });
    this.toast(`Fim do split: ${pos}º lugar`, 'good');
  },

  simulateSeries(home, away) {
    const th = this.teamByKey(home);
    const ta = this.teamByKey(away);
    const ph = this.teamPower(th);
    const pa = this.teamPower(ta);
    const homeWin = Math.random() < (ph / (ph + pa));
    const clean = Math.random() < 0.35;
    const score = homeWin ? (clean ? '2-0' : '2-1') : (clean ? '0-2' : '1-2');
    const winner = homeWin ? home : away;
    const mvp = pickMvp(homeWin ? th.roster : ta.roster).name;
    return { home, away, score, winner, mvp };
  },

  applyResult(match, result) {
    match.played = true;
    match.score = result.score;
    const [hm, am] = result.score.split('-').map(Number);
    const sh = state.standings.find((s) => s.key === match.home);
    const sa = state.standings.find((s) => s.key === match.away);
    sh.mapsFor += hm; sh.mapsAgainst += am;
    sa.mapsFor += am; sa.mapsAgainst += hm;
    if (result.winner === match.home) { sh.wins++; sa.losses++; }
    else { sa.wins++; sh.losses++; }
  },

  sponsorPerWeek() {
    return Math.round(100000 + state.reputation * 180 + this.userTeam().fanbase * 110);
  },

  currentRound() {
    return state.schedule[state.week - 1];
  },

  userMatchForWeek(week) {
    const round = state.schedule[week - 1];
    return round?.matches.find((m) => m.home === state.userTeam || m.away === state.userTeam) || null;
  },

  sortedTable() {
    return [...state.standings].sort((a, b) => (b.wins - a.wins) || ((b.mapsFor - b.mapsAgainst) - (a.mapsFor - a.mapsAgainst)) || (b.mapsFor - a.mapsFor));
  },

  userTeam() {
    return state.teams.find((t) => t.key === state.userTeam);
  },

  teamByKey(k) {
    return state.teams.find((t) => t.key === k);
  },

  teamPower(team) {
    const ovr = avg(team.roster.map((p) => p.ovr));
    const morale = avg(team.roster.map((p) => p.morale));
    const fatigue = avg(team.roster.map((p) => p.fatigue));
    const injuries = team.roster.filter((p) => p.injury > 0).length;
    return ovr * 1.75 + morale * 0.5 - fatigue * 0.32 - injuries * 3 + Math.random() * 8;
  },

  winChance(a, b) {
    const pa = this.teamPower(a), pb = this.teamPower(b);
    return clamp((pa / (pa + pb)) * 100, 10, 90);
  },

  save() {
    if (!state.running) return this.toast('Nada para salvar.', 'warn');
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    this.toast('Jogo salvo.', 'good');
  },

  load() {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return this.toast('Sem save encontrado.', 'warn');
    try {
      const loaded = JSON.parse(raw);
      if (!loaded?.teams || !loaded?.schedule || !loaded?.standings) throw new Error('bad');
      Object.assign(state, loaded);
      this.renderNav();
      this.renderTopbar();
      this.renderView();
      this.toast('Save carregado.', 'good');
    } catch {
      this.toast('Save inválido.', 'bad');
    }
  },

  reset() {
    localStorage.removeItem(SAVE_KEY);
    Object.assign(state, {
      running: false, screen: 'dashboard', userTeam: null, year: 2025, split: 1, week: 1,
      teams: [], standings: [], schedule: [], money: 0, reputation: 72, board: 80,
      inbox: [], transferPool: [], splitFinished: false
    });
    this.renderNav();
    this.renderTopbar();
    this.renderView();
    this.toast('Reset concluído.', 'warn');
  },

  modal(html, afterRender) {
    const m = byId('modal');
    m.classList.remove('hidden');
    m.innerHTML = `<div class="modal-content">${html}<div style="margin-top:12px;"><button class="ghost" id="close-modal">Fechar</button></div></div>`;
    byId('close-modal').onclick = () => this.closeModal();
    if (afterRender) afterRender();
  },

  closeModal() {
    const m = byId('modal');
    m.classList.add('hidden');
    m.innerHTML = '';
  },

  toast(text, tone = 'warn') {
    const el = document.createElement('div');
    el.className = `toast-item`;
    el.innerHTML = `<span class="tag ${tone}">${tone.toUpperCase()}</span> <span style="margin-left:6px;">${text}</span>`;
    byId('toast').appendChild(el);
    setTimeout(() => el.remove(), 2500);
  }
};

function createDoubleRoundRobin(teamKeys) {
  const first = roundRobin(teamKeys);
  const second = first.map((r) => ({
    week: r.week + first.length,
    matches: r.matches.map((m) => ({ home: m.away, away: m.home, played: false, score: null }))
  }));
  return [...first, ...second];
}

function roundRobin(teams) {
  const list = [...teams];
  if (list.length % 2 !== 0) list.push('__bye__');
  const rounds = [];
  for (let r = 0; r < list.length - 1; r++) {
    const matches = [];
    for (let i = 0; i < list.length / 2; i++) {
      const h = list[i], a = list[list.length - 1 - i];
      if (h !== '__bye__' && a !== '__bye__') matches.push({ home: h, away: a, played: false, score: null });
    }
    rounds.push({ week: r + 1, matches });
    list.splice(1, 0, list.pop());
  }
  return rounds;
}

function pickMvp(roster) {
  let best = roster[0], bestScore = -Infinity;
  for (const p of roster) {
    const score = p.ovr + p.morale * 0.22 - p.fatigue * 0.12 + Math.random() * 8;
    if (score > bestScore) { bestScore = score; best = p; }
  }
  return best;
}

function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function avg(arr) { return arr.reduce((s, x) => s + x, 0) / (arr.length || 1); }
function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
function money(v) { return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }); }

document.addEventListener('DOMContentLoaded', () => app.init());
