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
const messages = document.querySelector('#zoeAcquisitionMessages');
const announcement = document.querySelector('#zoeAcquisitionAnnouncement');
const workspace = document.querySelector('#zoeAcquisitionWorkspace');
const drawer = document.querySelector('#zoeAcquisitionDrawer');
const statuses = { pending: '待执行', running: '执行中', paused: '已暂停', complete: '已完成', stopped: '已终止', partial: '部分完成', failed: '执行失败' };
const ratings = ['A', 'B', 'C', 'D'];
const tabs = ['企业概览', 'AI 背调', '匹配分析', '决策人'];
let tasks = [];
let active = null;
let view = 'chat';
let returnFocus;
let filters = {};
let detail;
let detailTrigger;

const esc = value => escapeHTML(String(value ?? ''));
const action = (name, label, primary = false) =>
  `<button type="button" data-acquisition-action="${name}" ${primary ? 'data-primary' : ''}>${label}</button>`;
const options = (values, current) => values.map(value =>
  `<option value="${esc(value)}"${current === value ? ' selected' : ''}>${esc(value)}</option>`).join('');
const grade = score => ratings[score >= 80 ? 0 : score >= 60 ? 1 : score >= 40 ? 2 : 3];

function parseIcp(text, previous) {
  const values = { ...previous };
  const target = text.split(/希望|想要|想找|寻找|开发|目标市场/).at(-1);
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

function makeCompanies(task) {
  const isValveDemo = task.icp.market === '德国' && /工业阀门/.test(task.icp.product);
  const bases = ['Aster', 'Boreal', 'Cedar', 'Delta', 'Elm', 'Flint', 'Grove', 'Harbor', 'Iris', 'Juniper'];
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
      id, name, type, business, customers, score, country: task.icp.market || '示例市场',
      site: `company-${index + 1}.example.com`,
      breakdown: dimensions.map((label, i) => [label, scores[i], weights[i]]),
      contacts: [0, 1].map(offset => ({
        name: `示例联系人 ${index * 2 + offset + 1}`,
        role: roles[(index + offset) % roles.length],
        email: `contact-${index * 2 + offset + 1}@example.com`
      }))
    };
  });
}

function push(task, role, text) {
  task.messages.push({ role, text });
}

function renderMessages() {
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
        <summary><span class="zoe-stream-indicator" aria-hidden="true"></span><span>${esc(run.summary || run.title)}</span><span class="zoe-stream-status"></span><i data-lucide="chevron-down" aria-hidden="true"></i></summary>
        <ol>${run.lines.map(line => `<li>${esc(line)}</li>`).join('')}<li class="zoe-stream-current" aria-hidden="true"></li></ol>
      </details>`;
      updateStream(entry, run);
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
  reply.hidden = view !== 'chat' || !active || !['draft', 'review'].includes(active.phase);
  const status = view === 'chat' && ['running', 'paused'].includes(active?.status) ? active.status : '';
  dockStatus.hidden = !status;
  if (dockStatus.dataset.status !== status) {
    const focused = dockStatus.contains(document.activeElement);
    dockStatus.dataset.status = status;
    dockStatus.innerHTML = status ? `<span role="status">${status === 'paused' ? '搜索任务已暂停' : 'Zoe 正在执行获客任务…'}</span>
      <div class="zoe-acquisition-actions">${status === 'paused' ? action('resume', '继续') : action('pause', '暂停')}${action('stop', '终止任务')}</div>` : '';
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
  current.textContent = run.preview;
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
    original: text, icp: {}, phase: 'draft', status: 'pending', stage: 0, count: 0, logs: [], messages: []
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
  task.beforeRevision = task.original && task.messages.length ? { ...task.icp } : null;
  task.original ||= text;
  task.phase = 'understanding';
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

function icpCard(task) {
  if (!task.original) return '<h2>目标客户画像</h2><p class="zoe-acquisition-help">发送获客需求后，Zoe 会在这里整理搜索条件。</p>';
  if (task.phase === 'understanding') return '';
  const changed = task.beforeRevision ? Object.entries(fields).filter(([key]) =>
    (task.beforeRevision[key] || '') !== (task.icp[key] || '')) : [];
  return `<h2>确认目标客户画像（ICP）</h2>
    ${task.beforeRevision ? `<p class="zoe-icp-changes">${changed.length ? changed.map(([key, label]) =>
      `${label}：${esc(task.icp[key] || '已清除')}`).join(' · ') : '本轮沿用已有画像，请确认或编辑条件。'}</p>` : ''}
    <p class="zoe-acquisition-help">这是模拟解析结果。编辑内容会自动应用到本轮搜索。</p>
    <div class="zoe-acquisition-fields">${Object.entries(fields).map(([key, label]) =>
      `<label>${label}<input data-icp="${key}" maxlength="200" value="${esc(task.icp[key])}" placeholder="待补充"></label>`).join('')}</div>
    <div class="zoe-acquisition-actions">${action('modify', '修改需求')}${action('start', '确认并开始搜索', true)}</div>`;
}

function startSearch(task) {
  task.messages.push({ role: 'snapshot', snapshot: { ...task.icp } });
  task.phase = 'pilot';
  task.status = 'running';
  task.stage = 2;
  task.tick = 0;
  task.count = 0;
  task.companies = makeCompanies(task);
  task.logs = ['已确认客户画像，开始小规模模拟搜索'];
  beginStream(task, 'Zoe 正在搜索潜在客户并开展背调');
  filters = {};
  render();
  schedule(task);
}

const searchLogs = ['分析目标行业关键词', '已生成 8 组搜索关键词', '模拟查询企业数据源', '已发现候选企业', '企业去重与初步筛选完成',
  '模拟分析企业官网', '已整理主营业务和产品类别', '已提取目标市场和客户群体', '已生成企业背调报告'];
const qualificationLogs = ['已计算六个维度的匹配分数', '已生成推荐理由与待验证信息', '正在识别采购与供应链角色', '已整理模拟决策人与客户清单'];

function schedule(task) {
  const pilot = task.phase === 'pilot';
  const log = (pilot ? searchLogs : qualificationLogs)[task.tick];
  streamStep(task, log, () => {
    task.logs.push(log);
    task.tick++;
    if (pilot) {
      task.stage = task.tick < 5 ? 2 : 3;
      task.count = task.tick < 3 ? 0 : Math.min(10, (task.tick - 2) * 4);
      if (task.tick === searchLogs.length) {
        task.phase = 'review';
        task.status = 'partial';
        task.run.state = 'complete';
        task.run.summary = '首批搜索完成 · 找到 10 家企业';
        push(task, 'agent', '已找到 10 家模拟企业并完成初步背调。这个方向符合预期吗？你可以继续搜索，或发消息修改条件。');
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
    refreshTask(task);
    if (task.status === 'running') schedule(task);
  });
}

function continueSearch(task) {
  task.phase = 'qualification';
  task.status = 'running';
  task.stage = 4;
  task.tick = 0;
  task.logs.push('用户确认搜索方向，已转为持续获客任务');
  push(task, 'agent', '已启动后续获客任务。你可以留在这里查看结果，也可以到任务列表跟进进度。');
  beginStream(task, 'Zoe 正在评估匹配度并识别决策人');
  render();
  schedule(task);
}

function progressCard(task) {
  if (task.phase === 'review' || task.phase === 'results') return '';
  return `<section class="zoe-acquisition-card">
    <h2>${esc(taskTitle(task))}</h2>
    <p>${statuses[task.status]} · ${steps[task.stage]} · 已发现 ${task.count} 家企业</p>
    ${task.phase === 'qualification' ? action('tasks', '查看任务') : ''}
  </section>`;
}

function taskTitle(task) {
  return [task.icp.market, task.icp.product, task.icp.type].filter(Boolean).join(' · ') || '新获客任务';
}

function taskList() {
  return `<h2 tabindex="-1">获客任务列表</h2>
    <p class="zoe-acquisition-help">Demo 模拟数据 · 任务在本次演示中运行</p>
    <div class="zoe-acquisition-actions">${action('new', '创建获客任务', true)} <a href="#customers">前往客户池</a></div>
    ${tasks.length ? tasks.map(task => `<article class="zoe-acquisition-card">
      <h3>${esc(taskTitle(task))}</h3>
      <p>${statuses[task.status]} · ${steps[task.stage]} · 已发现 ${task.count} 家企业</p>
      <details data-task-logs="${task.id}"><summary>模拟执行日志</summary>${task.logs.length ? `<ul>${task.logs.map(log => `<li>${log}</li>`).join('')}</ul>` : '<p>暂无执行日志</p>'}</details>
      <div class="zoe-acquisition-actions" data-task-id="${task.id}">
        ${action('open-task', task.status === 'complete' ? '查看客户清单' : '查看任务')}
        ${task.status === 'running' ? action('pause', '暂停') : ''}
        ${task.status === 'paused' ? action('resume', '继续') : ''}
        ${['running', 'paused', 'partial'].includes(task.status) ? action('stop', '终止任务') : ''}
      </div>
    </article>`).join('') : '<p>暂无任务。创建获客任务后可在这里查看进度。</p>'}`;
}

function hasResearch(task) {
  return ['review', 'qualification', 'results'].includes(task.previousPhase || task.phase);
}

function hasScores(task) {
  return task.phase === 'results' || ((task.previousPhase || task.phase) === 'qualification' && task.tick >= 2);
}

function companyTable(task) {
  const complete = task.phase === 'results';
  const scored = hasScores(task);
  const companies = task.companies.slice(0, task.count);
  return `<section class="zoe-acquisition-results zoe-acquisition-card">
    <h2>${complete ? '最终客户清单' : '候选企业'}</h2>
    <p class="zoe-acquisition-help">Demo 模拟数据</p>
    ${complete ? `<p>执行条件 · ${esc(taskTitle(task))}</p>
      <p>目标市场 · ${esc(task.icp.market || '未指定')}　企业 ${companies.length} 家　A级 ${companies.filter(c => grade(c.score) === 'A').length} 家　B级 ${companies.filter(c => grade(c.score) === 'B').length} 家　决策人 ${companies.reduce((sum, c) => sum + c.contacts.length, 0)} 位</p>` : ''}
    <div class="zoe-acquisition-toolbar">
      <input data-filter="query" type="search" aria-label="搜索企业名称" placeholder="搜索企业名称" value="${esc(filters.query)}">
      ${scored ? `<select data-filter="grade" aria-label="客户等级"><option value="">全部等级</option>${options(ratings, filters.grade)}</select>` : ''}
      <select data-filter="type" aria-label="企业类型"><option value="">全部类型</option>${options([...new Set(companies.map(c => c.type))], filters.type)}</select>
      <select data-filter="research" aria-label="背调状态"><option value="">全部背调状态</option>${options(['已背调', '待背调'], filters.research)}</select>
      ${scored ? `<select data-filter="sort" aria-label="匹配度排序">
        <option value="desc">匹配度从高到低</option><option value="asc" ${filters.sort === 'asc' ? 'selected' : ''}>匹配度从低到高</option>
      </select>` : ''}
    </div>
    <div class="zoe-acquisition-table"><table>
      <thead><tr><th>企业名称</th><th>国家或地区</th><th>企业类型</th><th>背调状态</th>${scored ? '<th>匹配度</th>' : ''}${complete ? '<th>决策人</th>' : ''}</tr></thead>
      <tbody></tbody>
    </table></div>
    ${task.phase === 'review' ? `<footer class="zoe-result-decision">
      <p>确认这批企业符合预期后，Zoe 会继续生成匹配评分并识别决策人。</p>
      <div class="zoe-acquisition-actions">${action('continue', '继续搜索', true)}${action('modify', '调整方向')}</div>
    </footer>` : complete ? `<footer class="zoe-result-decision">${action('tasks', '查看任务')}</footer>` : ''}
  </section>`;
}

function renderRows(task) {
  const tbody = workspace.querySelector('tbody');
  if (!tbody) return;
  const researched = hasResearch(task);
  const scored = hasScores(task);
  const status = researched ? '已背调' : '待背调';
  const companies = task.companies.slice(0, task.count).filter(company =>
    (!filters.query || company.name.toLowerCase().includes(filters.query.trim().toLowerCase())) &&
    (!filters.type || company.type === filters.type) &&
    (!filters.grade || (scored && grade(company.score) === filters.grade)) &&
    (!filters.research || status === filters.research));
  if (scored) companies.sort((a, b) => filters.sort === 'asc' ? a.score - b.score : b.score - a.score);
  tbody.innerHTML = companies.map(company => `<tr data-company-id="${company.id}">
    <td>${action('company', esc(company.name))}</td><td>${esc(company.country)}</td><td>${company.type}</td><td>${status}</td>
    ${scored ? `<td>${action('score', `${company.score} · ${grade(company.score)}级`)}</td>` : ''}
    ${task.phase === 'results' ? `<td>${company.contacts.length} 位</td>` : ''}</tr>`).join('')
    || `<tr><td colspan="${4 + Number(scored) + Number(task.phase === 'results')}">暂无符合条件的企业</td></tr>`;
}

function render() {
  const focused = document.activeElement;
  const filter = workspace.contains(focused) ? focused.dataset.filter : null;
  const selection = filter === 'query' ? [focused.selectionStart, focused.selectionEnd] : null;
  const openLogs = new Map([...workspace.querySelectorAll('details[data-task-logs]')].map(el => [el.dataset.taskLogs, el.open]));
  renderMessages();
  workspace.hidden = view === 'chat' && active.phase === 'understanding';
  if (view === 'tasks') workspace.innerHTML = taskList();
  else if (['draft', 'understanding'].includes(active.phase)) {
    workspace.innerHTML = active.phase === 'draft' ? `<article class="zoe-acquisition-card">${icpCard(active)}</article>` : '';
  }
  else {
    workspace.innerHTML = `${progressCard(active)}${active.count ? companyTable(active) : ''}`;
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

function showCompany(company, index, trigger) {
  detail = { company, tab: index, role: '', task: active };
  detailTrigger = trigger;
  renderCompany();
  drawer.showModal();
  drawer.querySelector('[data-acquisition-action="close-detail"]').focus();
}

function renderCompany() {
  const { company, task, tab } = detail;
  const researched = hasResearch(task);
  const scored = hasScores(task);
  const reasons = company.score >= 80 ? '产品线和目标客户类型匹配，具备模拟优先跟进价值。'
    : company.score >= 60 ? '产品或渠道部分匹配，建议先核实采购用途。' : '主营应用和目标客群存在差异，优先级较低。';
  const contacts = company.contacts.filter(person => !detail.role || person.role === detail.role);
  const panels = [
    `<dl><dt>企业名称</dt><dd>${esc(company.name)}</dd><dt>市场</dt><dd>${esc(company.country)}</dd>
      <dt>企业类型</dt><dd>${company.type}</dd><dt>模拟官网</dt><dd>${company.site}</dd>
      <dt>搜索状态</dt><dd>已发现</dd><dt>主营业务</dt><dd>${esc(company.business)}</dd></dl>`,
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
    task.phase === 'results' ? `<label>筛选职位 <select data-contact-role><option value="">全部职位</option>${options(roles, detail.role)}</select></label>
      ${contacts.map(person => `<details><summary>${person.name} · ${person.role}</summary>
        <dl><dt>所属企业</dt><dd>${esc(company.name)}</dd><dt>部门</dt><dd>${/Sales|CEO/.test(person.role) ? '业务管理' : '采购与供应链'}</dd>
        <dt>示例邮箱</dt><dd>${person.email}</dd><dt>电话</dt><dd>未提供</dd><dt>LinkedIn</dt><dd>未提供</dd>
        <dt>验证状态</dt><dd>未验证 · Demo</dd><dt>信息来源</dt><dd>预设联系人档案</dd></dl></details>`).join('') || '<p>此企业暂无符合该职位的模拟联系人。</p>'}`
      : '<p>联系人将在模拟识别完成后显示。</p>'
  ];
  drawer.innerHTML = `<div class="zoe-acquisition-header"><span>Demo 模拟数据</span>${action('close-detail', '关闭')}</div>
    <h2 id="zoeAcquisitionCompanyName">${esc(company.name)}</h2>
    <div class="zoe-acquisition-actions" role="tablist" aria-label="企业详情">${tabs.map((label, i) =>
      `<button type="button" id="zoe-detail-tab-${i}" role="tab" aria-selected="${i === tab}" tabindex="${i === tab ? 0 : -1}" aria-controls="zoe-detail-content" data-detail-tab="${i}">${label}</button>`).join('')}</div>
    <section id="zoe-detail-content" role="tabpanel" aria-labelledby="zoe-detail-tab-${tab}">${panels[tab]}</section>`;
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
      if (screen.hidden) returnFocus = button;
      newTask();
      break;
    case 'tasks':
      if (screen.hidden) returnFocus = button;
      resetMenu.open = false;
      show('tasks');
      break;
    case 'open-task': show('chat', task); break;
    case 'modify': reply.querySelector('textarea').focus(); break;
    case 'start': startSearch(task); break;
    case 'continue': continueSearch(task); break;
    case 'pause':
      task.status = 'paused';
      task.run.state = 'paused';
      clearTimeout(task.timer);
      task.logs.push('用户暂停任务');
      render();
      break;
    case 'resume':
      task.status = 'running';
      task.run.state = 'running';
      task.logs.push('用户继续任务');
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
      render();
      break;
    case 'company':
    case 'score': {
      const company = active.companies.find(item => item.id === button.closest('[data-company-id]')?.dataset.companyId);
      if (company) showCompany(company, name === 'score' ? 2 : 0, button);
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
  active = null;
  for (const form of [prompt, reply]) {
    form.reset();
    form.querySelector('[type="submit"]').disabled = true;
  }
  goHome();
});

workspace.addEventListener('input', event => {
  const { filter, icp } = event.target.dataset;
  if (icp) active.icp[icp] = event.target.value.trim();
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
