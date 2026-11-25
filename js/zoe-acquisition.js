import { companyProfiles, demoIcp, dimensions, example, fields, roles, steps } from './zoe-acquisition-data.js';

const home = document.querySelector('#zoeHome');
const screen = document.querySelector('#zoeAcquisition');
const page = screen.closest('#zoePage');
const prompt = document.querySelector('#zoeAcquisitionPrompt');
const reply = document.querySelector('#zoeAcquisitionReply');
const dock = reply.parentElement;
const dockStatus = document.querySelector('#zoeAcquisitionStatus');
const resetDialog = document.querySelector('#zoeAcquisitionReset');
const resetMenu = resetDialog.closest('#zoeAcquisition').querySelector('.zoe-acquisition-menu');
new ResizeObserver(() => {
  screen.style.setProperty('--zoe-reply-height', `${dock.offsetHeight}px`);
}).observe(dock);

const conversation = screen.querySelector('.zoe-acquisition-conversation');
new ResizeObserver(() => {
  const { left, width } = conversation.getBoundingClientRect();
  screen.style.setProperty('--zoe-conversation-left', `${left}px`);
  screen.style.setProperty('--zoe-conversation-width', `${width}px`);
}).observe(conversation);

const messages = document.querySelector('#zoeAcquisitionMessages');
const announcement = document.querySelector('#zoeAcquisitionAnnouncement');
const workspace = document.querySelector('#zoeAcquisitionWorkspace');
const roundSidebar = document.querySelector('#zoeAcquisitionSidebar');
const drawer = document.querySelector('#zoeAcquisitionDrawer');
const statuses = { pending: '待执行', running: '执行中', paused: '已暂停', complete: '已完成', stopped: '已终止', partial: '部分完成', failed: '执行失败' };
const precisionLabels = ['待标注', '精准', '不精准'];
const ratings = ['A', 'B', 'C', 'D'];
const tabs = ['企业概览', 'AI 背调', '匹配分析', '决策人'];
const taskStorageKey = 'ontoz-zoe-confirmed-tasks-v1';
let tasks = restoreTasks();

function restoreTasks() {
  try {
    const saved = JSON.parse(localStorage.getItem(taskStorageKey) || '[]');
    if (!Array.isArray(saved)) return [];
    return saved.filter(task => task?.confirmed && Array.isArray(task.messages)).map(task => {
      task.run = task.messages.findLast(message => message.run)?.run;
      if (task.phase === 'results' && !task.poolSelection) {
        task.poolSelection = resultCandidates(task).filter(company => company.precision === '精准').map(company => company.id);
      }
      if (task.status === 'running' && task.run) {
        task.status = 'paused';
        task.run.state = 'paused';
        task.logs.push('页面重新打开，任务已暂停，可在任务列表继续');
      }
      return task;
    });
  } catch {
    return [];
  }
}

function saveTasks() {
  try {
    const saved = tasks.filter(task => task.confirmed).map(({ timer, run, ...task }) => task);
    if (saved.length) localStorage.setItem(taskStorageKey, JSON.stringify(saved));
    else localStorage.removeItem(taskStorageKey);
    return true;
  } catch {
    return false;
  }
}
let active = null;
let view = 'chat';
let returnFocus;
let filters = {};
let detail;
let detailTrigger;
let sidebarMarkup = '';

const esc = value => escapeHTML(String(value ?? ''));
const action = (name, label, variant = 'outline') =>
  `<button type="button" data-acquisition-action="${name}" data-zoe-button="${variant}">${label}</button>`;
const options = (values, current) => values.map(value =>
  `<option value="${esc(value)}"${current === value ? ' selected' : ''}>${esc(value)}</option>`).join('');
const grade = score => ratings[score >= 80 ? 0 : score >= 60 ? 1 : score >= 40 ? 2 : 3];

function parseIcp(text, previous) {
  const values = { ...previous };
  const target = text.split(/排除|不要/, 1)[0].split(/希望|想要|想找|寻找|开发|目标市场/).at(-1);
  const market = target.match(/德国|英国|法国|美国|加拿大|日本|中国|越南|东南亚|欧洲|北美|中东|澳大利亚|巴西|印度|墨西哥/)?.[0];
  const product = text.match(/不锈钢工业阀门|工业阀门|流体控制设备|商用照明|工业机器人|包装机械|光伏组件|医疗器械|工业连接器/)?.[0];
  const type = target.match(/经销商|进口商|制造商|零售商|批发商|工程服务商/g)?.filter(item => item !== '制造商' || !text.includes('我们是'));
  if (market) values.market = market;
  if (product) values.product = product;
  if (type?.length) values.type = [...new Set(type)].join('、');
  if (/工业阀门/.test(product || '')) values.industry = demoIcp.industry;
  if (/OEM|ODM/i.test(text)) values.capability = 'OEM/ODM';
  const priority = text.match(/优先(?:找|考虑|选择)?[：:\s]*([^。；\n]+)/)?.[1];
  if (priority) values.priority = priority.replace(/[，,]+$/, '');
  const exclude = text.match(/(?:排除|不要)[：:\s]*([^。；\n]+)/)?.[1];
  if (exclude) values.exclude = exclude;
  for (const [key, label] of Object.entries(fields)) {
    const explicit = text.match(new RegExp(`${label}[：:]\\s*([^，。；\\n]+)`))?.[1];
    if (explicit) values[key] = explicit.trim();
  }
  return values;
}

function requestedTypes(value = '') {
  return value.match(/经销商|进口商|制造商|零售商|批发商|工程服务商/g) || [];
}

function makeCompanies(task) {
  const isValveDemo = task.icp.market === '德国' && /工业阀门/.test(task.icp.product);
  const bases = ['Aster', 'Boreal', 'Cedar', 'Delta', 'Elm', 'Flint', 'Grove', 'Harbor', 'Iris', 'Juniper'];
  const allowed = requestedTypes(task.icp.type);
  const blocked = requestedTypes(task.icp.exclude);
  const excludedTerms = (task.icp.exclude || '').split(/[、,，；;\s]+/).filter(Boolean);
  const typeQuery = (task.icp.type || '').trim();
  return companyProfiles.map(([name, type, business, customers, score], index) => {
    if (!isValveDemo) {
      name = `${bases[index]} ${['Distribution', 'Trading', 'Supply', 'Engineering'][index % 4]}`;
      business = `${task.icp.product || task.icp.industry || '行业产品'} · ${['渠道分销', '设备配套', '区域进口', '项目集成', '售后维护'][index % 5]}`;
      customers = ['区域分销商', '工业采购团队', '设备经营商', '系统集成商', '项目承包商'][index % 5];
    }
    const id = `${task.id}-${index + 1}`;
    const weights = [25, 20, 15, 15, 15, 10];
    const scores = weights.map(weight => Math.floor(score * weight / 100));
    for (let remaining = score - scores.reduce((sum, value) => sum + value, 0); remaining > 0; remaining--) {
      scores[(remaining - 1) % scores.length]++;
    }
    return {
      id, name, type, business, customers, score, precision: '待标注', country: task.icp.market || '示例市场',
      site: `company-${index + 1}.example.com`,
      breakdown: dimensions.map((label, i) => [label, scores[i], weights[i]]),
      contacts: [0, 1].map(offset => ({
        name: `示例联系人 ${index * 2 + offset + 1}`,
        role: roles[(index + offset) % roles.length],
        email: `contact-${index * 2 + offset + 1}@example.com`
      }))
    };
  }).filter(company => (!typeQuery || (allowed.length ? allowed.includes(company.type) : company.type.includes(typeQuery))) &&
    !blocked.includes(company.type) &&
    !excludedTerms.some(term => [company.name, company.business, company.customers].some(value => value.toLowerCase().includes(term.toLowerCase()))));

}

function push(task, role, text) {
  task.messages.push({ role, text });
}

function renderMessages() {
  const focusedRun = document.activeElement?.matches('details[data-run] > summary')
    ? document.activeElement.parentElement.dataset.run : null;
  const historyOpen = new Set([...messages.querySelectorAll('.zoe-icp-history[open]')].map(el => el.dataset.snapshot));
  const expanded = new Map([...messages.querySelectorAll('details[data-run]')].map(el => [
    el.dataset.run, { open: el.open, state: el.closest('[data-stream-state]').dataset.streamState }
  ]));
  messages.replaceChildren(...(active?.messages || []).map(({ role, text, run, snapshot }, index) => {
    const entry = document.createElement('div');
    entry.className = 'zoe-acquisition-message';
    entry.dataset.role = role;
    if (run) {
      const key = `${active.id}-${index}`;
      const previous = expanded.get(key);
      const open = previous?.state === run.state ? previous.open : run.state === 'running' || run.state === 'paused';
      entry.innerHTML = `<details data-run="${key}" ${open ? 'open' : ''}>
        <summary>
          <i class="zoe-stream-header-icon" data-lucide="brain" aria-hidden="true"></i>
          <span>${esc(run.summary || run.title)}</span>
          <span class="zoe-stream-status"></span>
          <i class="zoe-stream-chevron" data-lucide="chevron-down" aria-hidden="true"></i>
        </summary>
        <ol class="zoe-stream-steps" aria-label="模拟执行步骤">
          ${run.lines.map(line => `<li data-step-state="complete"><i data-lucide="check" aria-hidden="true"></i><span>${esc(line)}</span></li>`).join('')}
          <li data-step-state="active" class="zoe-stream-current" aria-hidden="true">
            <span class="zoe-stream-indicator"></span><span class="zoe-stream-preview"></span>
          </li>
        </ol>
      </details>`;
      updateStream(entry, run);
    } else if (role === 'task-guide') {
      entry.innerHTML = `<p></p>${action('tasks', '查看任务列表', 'outline')}`;
      entry.querySelector('p').textContent = text;
    } else if (snapshot) {
      const summary = [snapshot.market, snapshot.product, snapshot.type].filter(Boolean).map(esc).join(' · ');
      entry.innerHTML = `<details class="zoe-icp-history" data-snapshot="${active.id}-${index}" ${historyOpen.has(`${active.id}-${index}`) ? 'open' : ''}><summary>已确认画像 <span>${summary || '自定义条件'}</span></summary>
        <dl>${Object.entries(fields).filter(([key]) => snapshot[key]).map(([key, label]) =>
          `<dt>${label}</dt><dd>${esc(snapshot[key])}</dd>`).join('')}</dl></details>`;
    } else {
      entry.textContent = text;
    }
    return entry;
  }));
  if (focusedRun) messages.querySelector(`[data-run="${focusedRun}"] > summary`)?.focus({ preventScroll: true });
  reply.hidden = view !== 'chat' || !active || !['draft', 'review'].includes(active.phase);
  const status = view === 'chat' && ['running', 'paused'].includes(active?.status) ? active.status : '';
  dockStatus.hidden = !status;
  if (dockStatus.dataset.status !== status) {
    const focused = dockStatus.contains(document.activeElement);
    dockStatus.dataset.status = status;
    dockStatus.innerHTML = status ? `<span class="zoe-acquisition-announcement" role="status">${status === 'paused' ? '搜索任务已暂停' : '搜索任务执行中'}</span>
      <div class="zoe-acquisition-actions">${status === 'paused' ? action('resume', '继续') : action('pause', '暂停')}${action('stop', '终止任务', 'destructive')}</div>` : '';
    if (focused && status) dockStatus.querySelector('button').focus({ preventScroll: true });
  }
  dock.hidden = reply.hidden && dockStatus.hidden;
}

function updateStream(entry, run) {
  entry.dataset.streamState = run.state;
  entry.querySelector('.zoe-stream-status').textContent = {
    running: '模拟输出中', paused: '模拟执行已暂停', complete: '模拟执行已完成', stopped: '模拟执行已终止'
  }[run.state];
  const current = entry.querySelector('.zoe-stream-current');
  current.querySelector('.zoe-stream-preview').textContent = run.preview;
  current.hidden = !run.preview && run.state !== 'running';
}

function beginStream(task, title) {
  task.run = { title, lines: [], preview: '', state: 'running' };
  task.messages.push({ role: 'process', run: task.run });
}

function streamStep(task, line, commit) {
  clearTimeout(task.timer);
  const run = task.run;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function write() {
    if (run.state !== 'running') return;
    if (run.preview === line) {
      run.lines.push(line);
      run.preview = '';
      if (active === task && !screen.hidden) announcement.textContent = line;
      commit();
      return;
    }
    run.preview = line.slice(0, run.preview.length + (reduceMotion ? line.length : 2));
    const entry = [...messages.querySelectorAll('[data-role="process"]')].at(-1);
    if (!screen.hidden && active === task && entry) updateStream(entry, run);
    task.timer = setTimeout(write, reduceMotion ? 120 : 65);
  }
  task.timer = setTimeout(write, 130);
}

function show(next, task = null, moveFocus = true) {
  view = next;
  active = task;
  announcement.textContent = '';
  filters = {};
  screen.hidden = false;
  home.hidden = true;
  conversation.hidden = next === 'tasks';
  screen.classList.toggle('is-task-list', next === 'tasks');
  render();
  if (moveFocus) {
    window.scrollTo(0, 0);
    (next === 'tasks' ? workspace.querySelector('h2') : screen.querySelector('h1')).focus();
  }
}

function goHome() {
  if (drawer.open) drawer.close();
  screen.hidden = true;
  home.hidden = false;
  if (location.hash === '#zoe') (returnFocus?.isConnected ? returnFocus : prompt.querySelector('textarea')).focus();
}

function newTask(text = '') {
  const task = {
    id: Date.now().toString(36) + '-' + tasks.length,
    original: text, icp: {}, phase: 'draft', status: 'pending', stage: 0, count: 0, logs: [], messages: [], rounds: []
  };
  tasks.unshift(task);
  if (text) applyRequest(task, text);
  else push(task, 'agent', '告诉我你的产品、目标市场和想找的客户类型，我会整理成可编辑的目标客户画像。');
  reply.reset();
  reply.querySelector('[type="submit"]').disabled = true;
  show('chat', task);
  if (!text) reply.querySelector('textarea').focus();
}

function applyRequest(task, text) {
  clearTimeout(task.timer);
  if (task.count) {
    task.rounds.push({
      icp: { ...task.icp }, companies: task.companies.slice(0, task.count),
      count: task.count, phase: task.phase, tick: task.tick, previousPhase: task.previousPhase
    });
  }
  task.beforeRevision = task.original && task.messages.length ? { ...task.icp } : null;
  task.original ||= text;
  task.phase = 'understanding';
  delete task.previousPhase;
  task.status = 'pending';
  task.stage = 0;
  task.count = 0;
  task.companies = [];
  task.logs = [];
  task.icp = parseIcp(text, task.icp);
  push(task, 'user', text);
  beginStream(task, 'Zoe 正在整理获客需求');
  const lines = ['读取获客需求，提取目标市场和产品类别。', '整理客户类型和筛选条件。', '生成可编辑的目标客户画像。'];
  let step = 0;
  function advance() {
    if (step < lines.length) {
      streamStep(task, lines[step++], () => {
        refreshTask(task);
        advance();
      });
      return;
    }
    task.run.state = 'complete';
    task.run.summary = '画像已生成';
    task.stage = 1;
    task.phase = 'draft';
    push(task, 'agent', '请确认目标客户画像。你可以直接编辑字段，也可以继续用自然语言补充需求。');
    refreshTask(task);
  }
  advance();
}

function refreshTask(task) {
  if (!screen.hidden && (active === task || view === 'tasks')) render();
}

function icpValidation(icp) {
  const conflicts = requestedTypes(icp.type).filter(type => requestedTypes(icp.exclude).includes(type));
  const missing = ['product', 'market', 'type'].filter(key => !icp[key]);
  return `${conflicts.length ? `<p>条件冲突：${esc(conflicts.join('、'))}同时出现在企业类型与排除条件中，搜索时将排除。</p>` : ''}
    ${missing.length ? `<p>待补充：${missing.map(key => fields[key]).join('、')}。可先查看模拟候选，再补充需求。</p>` : ''}`;
}

function icpCard(task) {
  if (!task.original) return '<h2>目标客户画像</h2><p class="zoe-acquisition-help">发送获客需求后，Zoe 会在这里整理搜索条件。</p>';
  if (task.phase === 'understanding') return '';
  const changed = task.beforeRevision ? Object.entries(fields).filter(([key]) =>
    (task.beforeRevision[key] || '') !== (task.icp[key] || '')) : [];
  return `<h2>确认目标客户画像（ICP）</h2>
    ${task.beforeRevision ? `<p class="zoe-icp-changes">${changed.length ? changed.map(([key, label]) =>
      `${label}：${esc(task.beforeRevision[key] || '未填写')} → ${esc(task.icp[key] || '已清除')}`).join(' · ') : '本轮沿用已有画像，请确认或编辑条件。'}</p>` : ''}
    <p class="zoe-acquisition-help">产品、市场和企业类型用于确定搜索范围。排除条件优先于企业类型。优先条件供审核参考。</p>
    <div data-icp-validation aria-live="polite">${icpValidation(task.icp)}</div>
    ${[
      ['搜索范围', ['product', 'market', 'type']],
      ['已有业务信息', ['industry', 'size', 'capability']],
      ['优先与排除', ['priority', 'exclude']]
    ].map(([title, keys]) => `<section><h3>${title}</h3>
      <div class="zoe-acquisition-fields">${keys.map(key =>
        `<label>${fields[key]}<input data-icp="${key}" maxlength="200" value="${esc(task.icp[key])}" placeholder="待补充"></label>`).join('')}</div></section>`).join('')}
    <div class="zoe-acquisition-actions">${action('start', '确认并开始搜索', 'primary')}</div>`;
}

function startSearch(task) {
  task.messages.push({ role: 'snapshot', snapshot: { ...task.icp } });
  task.phase = 'pilot';
  task.status = 'running';
  task.stage = 2;
  task.tick = 0;
  task.count = 0;
  task.companies = makeCompanies(task);
  task.includeUnrated = false;
  task.logs = ['已确认客户画像，开始小规模模拟搜索'];
  beginStream(task, 'Zoe 正在搜索潜在客户并开展背调');
  filters = {};
  render();
  schedule(task);
}

const searchLogs = [
  () => '整理搜索条件与关键词',
  task => `按企业类型和排除条件筛出 ${task.companies.length} 家候选企业`,
  task => task.companies.length ? '已核对主营业务和服务市场，候选结果待确认' : '当前模拟样本没有符合条件的企业'
];
const qualificationLogs = ['已计算六个维度的匹配分数', '已生成推荐理由与待验证信息', '正在识别采购与供应链角色', '已整理模拟决策人与客户清单'];

function schedule(task) {
  const pilot = task.phase === 'pilot';
  const log = pilot ? searchLogs[task.tick](task) : qualificationLogs[task.tick];
  streamStep(task, log, () => {
    task.logs.push(log);
    task.tick++;
    if (pilot) {
      task.stage = task.tick < 2 ? 2 : 3;
      task.count = task.tick >= 2 ? task.companies.length : 0;
      if (task.tick === searchLogs.length) {
        task.phase = 'review';
        task.status = 'partial';
        task.run.state = 'complete';
        task.run.summary = `第 ${task.rounds.length + 1} 轮搜索完成 · 找到 ${task.count} 家企业`;
        push(task, 'agent', task.count ? `已找到 ${task.count} 家模拟企业。标注后可开始深度分析，也可以补充条件重新搜索。` : '当前没有符合条件的模拟企业。请在下方补充或放宽搜索条件。');
      }
    } else {
      task.stage = task.tick < 3 ? 4 : 5;
      if (task.tick === qualificationLogs.length) {
        task.status = 'complete';
        task.run.state = 'complete';
        task.run.summary = '匹配评分与决策人已生成';
        task.phase = 'results';
        push(task, 'agent', '模拟任务已完成。客户清单已包含匹配评分和决策人信息。');
      }
    }
    if (task.confirmed) saveTasks();
    refreshTask(task);
    if (task.status === 'running') schedule(task);
  });
}

function analysisCandidates(task) {
  return task.companies.filter(company => company.precision === '精准' || (task.includeUnrated && company.precision === '待标注'));
}

function resultCandidates(task) {
  return task.companies.slice(0, task.count).filter(company => !task.analysisIds || task.analysisIds.includes(company.id));
}

function continueSearch(task) {
  const companies = analysisCandidates(task);
  if (!companies.length) return;
  task.analysisIds = companies.map(company => company.id);
  task.poolSelection = companies.filter(company => company.precision === '精准').map(company => company.id);
  filters = {};

  task.phase = 'qualification';
  task.status = 'running';
  task.stage = 4;
  task.tick = 0;
  task.logs.push(`用户确认深度分析范围：${companies.length} 家企业`);
  task.confirmed = true;
  const guide = {
    role: 'task-guide',
    text: '获客任务已保存到当前浏览器。你可以在任务列表查看进度、暂停、继续或终止任务。'
  };
  task.messages.push(guide);
  beginStream(task, 'Zoe 正在评估匹配度并识别决策人');
  if (!saveTasks()) guide.text = '获客任务已启动。当前浏览器无法保存任务，本次会话中仍可在任务列表查看和管理。';
  render();
  schedule(task);
}

function roundCounts(companies) {
  return precisionLabels.map(label => [label, companies.filter(company => company.precision === label).length]);
}

function roundSummary(task, index, current) {
  const companies = task.companies.slice(0, task.count);
  const counts = roundCounts(companies);
  return `<details data-zoe-round="${index}">
    <summary><strong>第 ${index + 1} 轮${current ? ' · 当前轮' : ''}</strong><small>${counts.map(([label, count]) => `${label} ${count}`).join(' · ')}</small></summary>
    <p>${esc(taskTitle(task))}</p>
    ${!current ? `<details class="zoe-round-icp"><summary>本轮获客条件</summary><dl>
      ${Object.entries(fields).map(([key, label]) => `<dt>${label}</dt><dd>${esc(task.icp[key] || '未填写')}</dd>`).join('')}
    </dl></details>` : ''}
    ${companies.length ? `<ul>${companies.map(company => `<li data-company-id="${company.id}">
      ${action('company', esc(company.name), 'ghost')}<span>${company.precision}</span>
    </li>`).join('')}</ul>` : '<p>正在搜索企业…</p>'}
  </details>`;
}

function renderSidebar() {
  roundSidebar.hidden = view !== 'chat';
  if (roundSidebar.hidden) return;
  const focused = roundSidebar.contains(document.activeElement) ? document.activeElement : null;
  const focusId = focused?.closest('[data-company-id]')?.dataset.companyId;
  const focusRound = focused?.closest('[data-zoe-round]')?.dataset.zoeRound;
  const open = new Set([...roundSidebar.querySelectorAll('details[open][data-zoe-round]')].map(el => el.dataset.zoeRound));
  const openIcp = new Set([...roundSidebar.querySelectorAll('.zoe-round-icp[open]')].map(el => el.closest('[data-zoe-round]').dataset.zoeRound));
  const sameTask = roundSidebar.dataset.task === active.id;
  roundSidebar.dataset.task = active.id;
  const hasCurrentRound = Boolean(active.companies?.length);
  const analyzing = active.phase === 'understanding';
  const fieldsMarkup = Object.entries(fields).map(([key, label]) => `<dt>${label}</dt><dd>${
    analyzing ? '<div class="skeleton-line" aria-hidden="true"></div>'
      : `<span data-zoe-context-field="${key}">${esc(active.icp[key] || '未填写')}</span>`
  }</dd>`).join('');
  const markup = `<div class="zoe-sidebar-head"><h2>搜索上下文</h2>${action('latest-result', '查看最新结果', 'ghost')}</div>
    <section class="zoe-sidebar-profile">
      <h3>目标客户画像</h3>
      <p role="status">${analyzing ? '正在分析获客需求…' : hasCurrentRound ? '本轮已确认' : '待确认 · 可在对话中编辑'}</p>
      <dl aria-busy="${analyzing}">${fieldsMarkup}</dl>
    </section>
    <section><h3>每轮候选与标注</h3><p>你的标注用于复核与筛选。匹配评分由 Zoe 单独生成。</p>
      ${active.rounds.map((round, i) => roundSummary(round, i, false)).join('')}
      ${hasCurrentRound ? roundSummary(active, active.rounds.length, true) : ''}
      ${!active.rounds.length && !hasCurrentRound ? '<p>开始搜索后，这里会记录每轮结果。</p>' : ''}
    </section>`;
  if (sameTask && markup === sidebarMarkup) return;
  sidebarMarkup = markup;
  roundSidebar.innerHTML = markup;
  if (sameTask) {
    roundSidebar.querySelectorAll('[data-zoe-round]').forEach(entry => {
      entry.open = open.has(entry.dataset.zoeRound);
      const archivedIcp = entry.querySelector('.zoe-round-icp');
      if (archivedIcp) archivedIcp.open = openIcp.has(entry.dataset.zoeRound);
    });
    const round = focusRound !== undefined ? roundSidebar.querySelector(`[data-zoe-round="${focusRound}"]`) : null;
    const target = focusId ? round?.querySelector(`[data-company-id="${focusId}"] button`)
      : round?.querySelector('summary') || (focused ? roundSidebar.querySelector('[data-acquisition-action="latest-result"]') : null);
    target?.focus({ preventScroll: true });
  }
}

function taskTitle(task) {
  return [task.icp.market, task.icp.product, task.icp.type].filter(Boolean).join(' · ') || '新获客任务';
}

function taskList() {
  return `<h2 tabindex="-1">获客任务列表</h2>
    <p class="zoe-acquisition-help">Demo 模拟数据 · 已启动的获客任务保存在当前浏览器</p>
    <div class="zoe-acquisition-actions">${action('new', '创建获客任务', 'primary')} <a href="#customers">前往客户池</a></div>
    ${tasks.length ? tasks.map(task => `<article class="zoe-acquisition-card">
      <h3>${esc(taskTitle(task))}</h3>
      <p>${task.phase === 'review' ? '待确认' : statuses[task.status]} · ${steps[task.stage]} · ${task.status === 'complete' ? `已分析 ${resultCandidates(task).length} 家企业` : task.phase === 'review' ? `${task.companies.filter(company => company.precision === '待标注').length} 家待标注` : `已发现 ${task.count} 家企业`}</p>
      <details data-task-logs="${task.id}"><summary>模拟执行日志</summary>${task.logs.length ? `<ul>${task.logs.map(log => `<li>${esc(log)}</li>`).join('')}</ul>` : '<p>暂无执行日志</p>'}</details>
      <div class="zoe-acquisition-actions" data-task-id="${task.id}">
        ${action('open-task', task.status === 'complete' ? '查看结果' : task.phase === 'review' ? '继续审核' : '查看任务')}
        ${task.status === 'running' ? action('pause', '暂停') : ''}
        ${task.status === 'paused' ? action('resume', '继续执行') : ''}
        ${['running', 'paused', 'partial'].includes(task.status) ? action('stop', '终止任务', 'destructive') : ''}
      </div>
    </article>`).join('') : '<p>暂无任务。创建获客任务后可在这里查看进度。</p>'}`;
}

function hasResearch(task) {
  return ['review', 'qualification', 'results'].includes(task.previousPhase || task.phase);
}

function hasScores(task) {
  return task.phase === 'results' || ((task.previousPhase || task.phase) === 'qualification' && task.tick >= 2);
}

function precisionControl(company, placement = 'list') {
  return `<div class="zoe-precision-toggle" role="radiogroup" aria-label="${esc(company.name)} 精准度标注">
    ${precisionLabels.map(label => `<label>
      <input type="radio" name="zoe-precision-${placement}-${company.id}" value="${label}"
        data-company-precision="${company.id}" ${label === company.precision ? 'checked' : ''}>
      <span>${label}</span>
    </label>`).join('')}
  </div>`;
}

function companyTable(task) {
  const complete = task.phase === 'results';
  const scored = hasScores(task);
  const companies = resultCandidates(task);
  return `<section class="zoe-acquisition-results zoe-acquisition-card">
    <h2 tabindex="-1">${complete ? '最终客户清单' : '候选企业'}</h2>
    <p class="zoe-acquisition-help">Demo 模拟数据 · ${companies.filter(company => company.precision === '精准').length} 家精准 · ${companies.filter(company => company.precision === '不精准').length} 家不精准</p>
    ${complete ? `<p>执行条件 · ${esc(taskTitle(task))}</p>
      <p>目标市场 · ${esc(task.icp.market || '未指定')}　企业 ${companies.length} 家　A级 ${companies.filter(c => grade(c.score) === 'A').length} 家　B级 ${companies.filter(c => grade(c.score) === 'B').length} 家　决策人 ${companies.reduce((sum, c) => sum + c.contacts.length, 0)} 位</p>` : ''}
    <div class="zoe-acquisition-toolbar">
      <input data-filter="query" type="search" aria-label="搜索企业名称" placeholder="搜索企业名称" value="${esc(filters.query)}">
      ${scored ? `<select data-filter="grade" aria-label="客户等级"><option value="">全部等级</option>${options(ratings, filters.grade)}</select>` : ''}
      <select data-filter="type" aria-label="企业类型"><option value="">全部类型</option>${options([...new Set(companies.map(c => c.type))], filters.type)}</select>
      <select data-filter="precision" aria-label="精准度筛选"><option value="">全部精准度</option>${options(precisionLabels, filters.precision)}</select>
      <select data-filter="research" aria-label="背调状态"><option value="">全部背调状态</option>${options(['已背调', '待背调'], filters.research)}</select>
      ${scored ? `<select data-filter="sort" aria-label="匹配度排序">
        <option value="desc">匹配度从高到低</option><option value="asc" ${filters.sort === 'asc' ? 'selected' : ''}>匹配度从低到高</option>
      </select>` : ''}
    </div>
    <div class="zoe-acquisition-table"><table>
      <thead><tr>${complete ? '<th>加入客户池</th>' : ''}<th>企业名称</th><th>国家或地区</th><th>企业类型</th><th>背调状态</th><th>你的标注</th>${scored ? '<th>Zoe 匹配评分</th>' : ''}${complete ? '<th>决策人</th>' : ''}</tr></thead>
      <tbody></tbody>
    </table></div>
    ${task.phase === 'review' ? `<footer class="zoe-result-decision">
      <p>将分析 ${analysisCandidates(task).length} 家企业，生成匹配评分和决策人信息。跳过 ${companies.filter(company => company.precision === '不精准').length} 家不精准企业。</p>
      <label><input type="checkbox" data-include-unrated ${task.includeUnrated ? 'checked' : ''}>同时分析待标注企业</label>
      <div class="zoe-acquisition-actions"><button type="button" data-zoe-button="primary" data-acquisition-action="continue" ${analysisCandidates(task).length ? '' : 'disabled'}>开始深度分析</button></div>
    </footer>` : complete ? `<footer class="zoe-result-decision">
      <p>已选 <span data-pool-count>${(task.poolSelection || []).length}</span> 家 · 默认勾选精准企业。</p>
      <div class="zoe-acquisition-actions"><button type="button" data-zoe-button="primary" data-acquisition-action="add-pool" ${task.poolSelection?.length ? '' : 'disabled'}>加入客户池</button>${action('tasks', '查看任务')} <a href="#customers">前往客户池</a></div>
      <p role="status" data-pool-result>${esc(task.poolResult || '')}</p>
    </footer>` : ''}
  </section>`;
}

function renderRows(task) {
  const tbody = workspace.querySelector('tbody');
  if (!tbody) return;
  const researched = hasResearch(task);
  const scored = hasScores(task);
  const status = researched ? '已背调' : '待背调';
  const companies = resultCandidates(task).filter(company =>
    (!filters.query || company.name.toLowerCase().includes(filters.query.trim().toLowerCase())) &&
    (!filters.type || company.type === filters.type) &&
    (!filters.grade || (scored && grade(company.score) === filters.grade)) &&
    (!filters.research || status === filters.research) &&
    (!filters.precision || company.precision === filters.precision));
  if (scored) companies.sort((a, b) => filters.sort === 'asc' ? a.score - b.score : b.score - a.score);
  tbody.innerHTML = companies.map(company => `<tr data-company-id="${company.id}">
    ${task.phase === 'results' ? `<td><input type="checkbox" data-pool-select="${company.id}" aria-label="选中 ${esc(company.name)} 加入客户池" ${task.poolSelection?.includes(company.id) ? 'checked' : ''}></td>` : ''}
    <td>${action('company', esc(company.name), 'ghost')}</td><td>${esc(company.country)}</td><td>${company.type}</td><td>${status}</td><td>${precisionControl(company)}</td>
    ${scored ? `<td>${action('score', `${company.score} · ${grade(company.score)}级`, 'ghost')}</td>` : ''}
    ${task.phase === 'results' ? `<td>${company.contacts.length} 位</td>` : ''}</tr>`).join('')
    || `<tr><td colspan="${5 + Number(scored) + 2 * Number(task.phase === 'results')}">暂无符合条件的企业</td></tr>`;
}

function render() {
  const focused = document.activeElement;
  const filter = workspace.contains(focused) ? focused.dataset.filter : null;
  const selection = filter === 'query' ? [focused.selectionStart, focused.selectionEnd] : null;
  const openLogs = new Map([...workspace.querySelectorAll('details[data-task-logs]')].map(el => [el.dataset.taskLogs, el.open]));
  renderMessages();
  renderSidebar();
  workspace.hidden = view === 'chat' && active.phase === 'understanding';
  if (view === 'tasks') workspace.innerHTML = taskList();
  else if (['draft', 'understanding'].includes(active.phase)) {
    workspace.innerHTML = active.phase === 'draft' ? `<article class="zoe-acquisition-card">${icpCard(active)}</article>` : '';
  }
  else {
    workspace.innerHTML = `${active.count ? companyTable(active) : active.phase === 'review' ? '<p>暂无符合条件的候选企业。请在下方补充或放宽搜索条件。</p>' : ''}
      ${active.status === 'stopped' ? '<p role="status">任务已终止</p>' : ''}
      ${active.phase === 'qualification' ? action('tasks', '查看任务') : ''}`;
    renderRows(active);
  }
  workspace.querySelectorAll('details[data-task-logs]').forEach(el => {
    if (openLogs.has(el.dataset.taskLogs)) el.open = openLogs.get(el.dataset.taskLogs);
  });
  if (filter) {
    const restored = workspace.querySelector(`[data-filter="${filter}"]`);
    restored?.focus();
    if (selection && selection[0] !== null) restored.setSelectionRange(...selection);
  }
  refreshIcons();
}

function showCompany(company, index, trigger, task) {
  detail = { company, tab: index, role: '', task };
  detailTrigger = trigger;
  renderCompany();
  drawer.showModal();
  drawer.querySelector('[data-acquisition-action="close-detail"]').focus();
}

function renderCompany() {
  const { company, task, tab } = detail;
  const researched = hasResearch(task);
  const eligible = !task.analysisIds || task.analysisIds.includes(company.id);
  const scored = eligible && hasScores(task);
  const reasons = company.score >= 80 ? '产品线和目标客户类型匹配，具备模拟优先跟进价值。'
    : company.score >= 60 ? '产品或渠道部分匹配，建议先核实采购用途。' : '主营应用和目标客群存在差异，优先级较低。';
  const contacts = company.contacts.filter(person => !detail.role || person.role === detail.role);
  const currentRound = task === active;
  const fieldRows = values => Object.entries(values).map(([label, value]) => `<dt>${label}</dt><dd>${esc(value)}</dd>`).join('');
  const panels = [
    `<h3>企业概览</h3><p>${esc(company.name)} · ${esc(company.type)} · ${esc(company.country)}</p>
      <p>主营业务为${esc(company.business)}，主要服务${esc(company.customers)}。</p>`,
    researched ? `<p>${esc(company.name)} 的模拟业务为${esc(company.business)}，主要服务${esc(company.customers)}。</p>
      <details open><summary>主营业务与产品</summary><p>${esc(company.business)}</p></details>
      <details><summary>服务市场与客户群体</summary><p>${esc(company.country)} · ${esc(company.customers)}</p></details>
      <details><summary>采购、进口与合作机会</summary><p>可评估${esc(task.icp.product || '目标产品')}供应合作。采购需求与进口记录待验证。</p></details>
      <details><summary>模拟数据来源</summary><p>预设企业档案、模拟官网和行业目录摘要。</p></details>` : '<p>背调报告将在模拟研究完成后显示。</p>',
    scored ? `<p><strong>${company.score} / 100 · ${grade(company.score)}级</strong></p>
      <label>评分维度 <select data-dimension><option value="">全部维度</option>${options(dimensions)}</select></label>
      <dl>${company.breakdown.map(([label, score, max]) => `<dt data-dimension-row="${label}">${label}</dt><dd data-dimension-row="${label}">${score} / ${max}</dd>`).join('')}</dl>
      <h3>匹配理由</h3><p>${reasons} 企业主营${esc(company.business)}，服务${esc(company.customers)}。</p>
      <h3>限制与待验证</h3><p>${company.score < 80 ? '渠道覆盖或应用范围与目标存在差异。' : '现有样本无法确认近期采购意向。'}采购需求、进口记录与供应商准入条件待核实。</p>`
      : '<p>匹配分析将在模拟评分完成后显示。</p>',
    eligible && task.phase === 'results' ? `<label>筛选职位 <select data-contact-role><option value="">全部职位</option>${options(roles, detail.role)}</select></label>
      ${contacts.map(person => `<details><summary>${person.name} · ${person.role}</summary>
        <dl><dt>所属企业</dt><dd>${esc(company.name)}</dd><dt>部门</dt><dd>${/Sales|CEO/.test(person.role) ? '业务管理' : '采购与供应链'}</dd>
        <dt>示例邮箱</dt><dd>${person.email}</dd><dt>电话</dt><dd>未提供</dd><dt>LinkedIn</dt><dd>未提供</dd>
        <dt>验证状态</dt><dd>未验证 · Demo</dd><dt>信息来源</dt><dd>预设联系人档案</dd></dl></details>`).join('') || '<p>此企业暂无符合该职位的模拟联系人。</p>'}`
      : '<p>联系人将在模拟识别完成后显示。</p>'
  ];
  drawer.innerHTML = `<header class="zoe-acquisition-header">
      <div><h2 id="zoeAcquisitionCompanyName">${esc(company.name)}</h2><span class="zoe-acquisition-help">Demo 模拟数据</span></div>
      ${action('close-detail', '关闭')}
    </header>
    <div class="customer-detail-overview" aria-label="企业概要">
      <div class="customer-detail-overview-row"><span>官网地址</span><span>${esc(company.site)}（模拟）</span></div>
      <div class="customer-detail-overview-row"><span>主营产品</span><div class="customer-detail-chip-list"><span class="customer-detail-chip">${esc(company.business)}</span></div></div>
      <div class="customer-detail-overview-row"><span>你的标注</span><div>${currentRound ? precisionControl(company, 'detail') : company.precision}</div></div>
    </div>
    <div class="zoe-company-workbench">
      <div class="customer-detail-activity">
        <div class="zoe-acquisition-actions" role="tablist" aria-label="企业详情">${tabs.map((label, i) =>
          `<button type="button" id="zoe-detail-tab-${i}" role="tab" data-zoe-button="ghost" aria-selected="${i === tab}" tabindex="${i === tab ? 0 : -1}" aria-controls="zoe-detail-content" data-detail-tab="${i}">${label}</button>`).join('')}</div>
        <section id="zoe-detail-content" role="tabpanel" aria-labelledby="zoe-detail-tab-${tab}">${panels[tab]}</section>
      </div>
      <aside class="customer-company-detail" aria-label="公司详情">
        <header><h3>公司详情</h3></header>
        <details class="zoe-company-section" open><summary>基础信息</summary>
          <dl class="customer-company-fields">${fieldRows({
            公司名称: company.name, 国家地区: company.country, 官网地址: company.site,
            公司类型: company.type, 主营业务: company.business, 服务客户: company.customers
          })}</dl>
        </details>
        <details class="zoe-company-section" open><summary>获客信息</summary>
          <dl class="customer-company-fields">${fieldRows({
            搜索状态: '已发现', 背调状态: researched ? '已背调' : '待背调',
            推荐分数: scored ? `${company.score} / 100 · ${grade(company.score)}级` : '待评分'
          })}</dl>
        </details>
      </aside>
    </div>`;
  refreshIcons();

}

for (const form of [prompt, reply]) {
  const input = form.querySelector('textarea');
  const submit = form.querySelector('[type="submit"]');
  form.addEventListener('input', () => { submit.disabled = !input.value.trim(); });
  input.addEventListener('keydown', event => {
    if (event.key !== 'Enter' || event.shiftKey || event.isComposing || event.keyCode === 229) return;
    event.preventDefault();
    if (!submit.disabled) form.requestSubmit();
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text || (form === reply && !['draft', 'review'].includes(active?.phase))) return;
    input.value = '';
    submit.disabled = true;
    if (form === prompt) {
      returnFocus = input;
      newTask(text);
    } else {
      filters = {};
      applyRequest(active, text);
      render();
    }
  });
}

page.addEventListener('click', event => {
  const button = event.target.closest('[data-acquisition-action]');
  if (!button) return;
  const name = button.dataset.acquisitionAction;
  const task = tasks.find(item => item.id === button.closest('[data-task-id]')?.dataset.taskId) || active;
  switch (name) {
    case 'example': {
      const input = prompt.querySelector('textarea');
      input.value = example;
      prompt.querySelector('[type="submit"]').disabled = false;
      input.focus();
      break;
    }
    case 'back': resetMenu.open = false; goHome(); break;
    case 'reset':
      resetDialog.returnValue = '';
      resetDialog.showModal();
      break;
    case 'new':
      if (home.contains(button)) prompt.querySelector('textarea').focus();
      else newTask();
      break;
    case 'tasks':
      if (screen.hidden) returnFocus = button;
      resetMenu.open = false;
      show('tasks');
      break;
    case 'open-task': show('chat', task); break;
    case 'start': startSearch(task); break;
    case 'continue': continueSearch(task); break;
    case 'pause':
      task.status = 'paused';
      task.run.state = 'paused';
      clearTimeout(task.timer);
      task.logs.push('用户暂停任务');
      if (task.confirmed) saveTasks();
      render();
      break;
    case 'resume':
      task.status = 'running';
      task.run.state = 'running';
      task.logs.push('用户继续任务');
      if (task.confirmed) saveTasks();
      render();
      schedule(task);
      break;
    case 'stop':
      clearTimeout(task.timer);
      task.status = 'stopped';
      if (task.run.state !== 'complete') task.run.state = 'stopped';
      task.previousPhase = task.phase;
      task.phase = 'stopped';
      task.logs.push('用户终止任务');
      if (task.confirmed) saveTasks();
      render();
      break;
    case 'add-pool': {
      if (task.phase !== 'results') break;
      const selected = resultCandidates(task).filter(company => task.poolSelection.includes(company.id));
      const result = addZoeCustomerLeads(selected, {
        id: task.id, title: taskTitle(task), round: task.rounds.length + 1, industry: task.icp.industry
      });
      task.poolResult = result ? `新增 ${result.added} 家，重复 ${result.duplicates} 家。` : '保存失败，请重试。';
      saveTasks();
      workspace.querySelector('[data-pool-result]').textContent = task.poolResult;
      break;
    }
    case 'latest-result': {
      const destination = workspace.querySelector('h2') || messages.lastElementChild;
      if (destination) {
        destination.tabIndex = -1;
        destination.focus({ preventScroll: true });
        destination.scrollIntoView({ block: 'start' });
      }
      break;
    }
    case 'company':
    case 'score': {
      const roundIndex = Number(button.closest('[data-zoe-round]')?.dataset.zoeRound);
      const source = active.rounds[roundIndex] || active;
      const company = source.companies.find(item => item.id === button.closest('[data-company-id]')?.dataset.companyId);
      if (company) showCompany(company, name === 'score' ? 2 : 0, button, source);
      break;
    }
    case 'close-detail': drawer.close(); break;
  }
});

resetDialog.addEventListener('close', () => {
  if (resetDialog.returnValue !== 'reset') return;
  resetMenu.open = false;
  tasks.forEach(item => clearTimeout(item.timer));
  tasks = [];
  saveTasks();
  active = null;
  for (const form of [prompt, reply]) {
    form.reset();
    form.querySelector('[type="submit"]').disabled = true;
  }
  goHome();
});

page.addEventListener('change', event => {
  const control = event.target;
  if (control.matches('[data-include-unrated]')) {
    active.includeUnrated = control.checked;
    render();
    workspace.querySelector('[data-include-unrated]')?.focus({ preventScroll: true });
    return;
  }
  if (control.dataset.poolSelect && active?.phase === 'results') {
    const selection = new Set(active.poolSelection || []);
    if (control.checked) selection.add(control.dataset.poolSelect);
    else selection.delete(control.dataset.poolSelect);
    active.poolSelection = [...selection];
    workspace.querySelector('[data-pool-count]').textContent = selection.size;
    workspace.querySelector('[data-acquisition-action="add-pool"]').disabled = !selection.size;
    saveTasks();
    return;
  }
  const id = control.dataset.companyPrecision;
  if (!id || !precisionLabels.includes(control.value)) return;
  const company = active?.companies.find(item => item.id === id);
  if (!company) return;
  company.precision = control.value;
  if (active.confirmed) saveTasks();
  const fromList = workspace.contains(control);
  render();
  if (fromList) {
    const next = workspace.querySelector(`[data-company-precision="${id}"]:checked`)
      || workspace.querySelector('[data-filter="precision"]');
    next?.focus({ preventScroll: true });
  }
});

workspace.addEventListener('input', event => {
  const { filter, icp } = event.target.dataset;
  if (icp) {
    active.icp[icp] = event.target.value.trim();
    workspace.querySelector('[data-icp-validation]').innerHTML = icpValidation(active.icp);
    renderSidebar();
  }
  if (filter) {
    filters[filter] = event.target.value;
    renderRows(active);
  }
});

function selectTab(index) {
  detail.tab = index;
  renderCompany();
  drawer.querySelector(`[data-detail-tab="${index}"]`).focus();
}

drawer.addEventListener('click', event => {
  const tab = event.target.closest('[data-detail-tab]');
  if (tab) selectTab(Number(tab.dataset.detailTab));
});
drawer.addEventListener('keydown', event => {
  if (!event.target.matches('[data-detail-tab]')) return;
  const next = {
    ArrowLeft: (detail.tab + tabs.length - 1) % tabs.length,
    ArrowRight: (detail.tab + 1) % tabs.length,
    Home: 0,
    End: tabs.length - 1
  }[event.key];
  if (next === undefined) return;
  event.preventDefault();
  selectTab(next);
});
drawer.addEventListener('change', event => {
  if (event.target.matches('[data-contact-role]')) {
    detail.role = event.target.value;
    renderCompany();
    drawer.querySelector('[data-contact-role]').focus();
  }
  if (event.target.matches('[data-dimension]')) {
    drawer.querySelectorAll('[data-dimension-row]').forEach(row => {
      row.hidden = Boolean(event.target.value && row.dataset.dimensionRow !== event.target.value);
    });
  }
});
drawer.addEventListener('close', () => {
  if (!screen.hidden) (detailTrigger?.isConnected ? detailTrigger : screen.querySelector('h1')).focus();
});
window.addEventListener('hashchange', () => {
  if (location.hash !== '#zoe' && drawer.open) drawer.close();
});
