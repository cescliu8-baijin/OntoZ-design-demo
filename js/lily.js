// OntoZ root source module.

const grid = document.querySelector('#strategyGrid');
const myStrategyList = document.querySelector('#myStrategyList');
const input = document.querySelector('#opportunityInput');
const composer = document.querySelector('.composer');
const sendButton = document.querySelector('#sendButton');

const lilyState = {
  currentScene: 'news',
  homeOpportunityPrompt: '',
  scanStarted: false,
  customerPoolScanned: false,
  awaitingAdjustPrompt: false,
  pendingAdjustTitle: '',
  submittedAdjustPrompt: false,
  waitingForFollowup: false,
  currentMarketingPlan: null,
  currentMarketingStrategyId: '',
  currentMarketingStrategyTitle: '',
  sequenceStepCount: 3,
  sequenceDelayDays: { 2: 3, 3: 3, 4: 7, 5: 10 },
  sequenceTemplateByStep: {},
  currentTaskStatus: 'all'
};

function renderStrategies(scene) {
  lilyState.currentScene = scene;
  grid.innerHTML = strategies[scene].map((item, index) => `
    <article class="strategy-card" data-strategy-id="${escapeHTML(item.id)}">
      <div class="card-top">
        <span class="trend-badge"><i data-lucide="trending-up"></i>热度上升</span>
        <time>32分钟前</time>
      </div>
      <h3>${escapeHTML(item.title)}</h3>
      <p>${escapeHTML(item.description)}</p>
      <footer>
        <span>${escapeHTML(item.source)}</span>
        <div class="card-actions">
          <button class="bookmark-button" type="button" aria-label="收藏策略"><i data-lucide="bookmark"></i></button>
          <button class="use-strategy" data-index="${index}" type="button">应用策略 <i data-lucide="arrow-right"></i></button>
        </div>
      </footer>
    </article>
  `).join('');
  refreshIcons();
}

function updateOpportunityComposerState() {
  const hasValue = Boolean(input.value.trim());
  composer.classList.toggle('has-value', hasValue);
  sendButton.disabled = false;
  sendButton.setAttribute('aria-disabled', 'false');
}

document.querySelectorAll('.scene-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    if (!tab.dataset.scene) return;
    document.querySelectorAll('.scene-tab').forEach(item => {
      const active = item === tab;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', String(active));
    });
    renderStrategies(tab.dataset.scene);
  });
});

grid.addEventListener('click', event => {
  const bookmark = event.target.closest('.bookmark-button');
  if (bookmark) {
    bookmark.classList.toggle('saved');
    bookmark.innerHTML = `<i data-lucide="bookmark"${bookmark.classList.contains('saved') ? ' fill="currentColor"' : ''}></i>`;
    refreshIcons();
    return;
  }

  const useButton = event.target.closest('.use-strategy');
  if (!useButton) return;
  const strategy = strategies[lilyState.currentScene][Number(useButton.dataset.index)];
  input.value = `基于“${strategy.title}”这一策略，帮我筛选最值得触达的客户，并生成合适的营销话术。`;
  updateOpportunityComposerState();
  input.focus();
});

document.querySelector('#nextStrategies').addEventListener('click', event => {
  const button = event.currentTarget;
  button.classList.add('loading');
  button.innerHTML = '更新中 <i data-lucide="loader-circle"></i>';
  refreshIcons();
  window.setTimeout(() => {
    renderStrategies(lilyState.currentScene);
    button.classList.remove('loading');
    button.innerHTML = '换一批 <i data-lucide="refresh-cw"></i>';
    refreshIcons();
  }, 650);
});

const scanCustomerPool = document.querySelector('#scanCustomerPool');
if (scanCustomerPool) {
  scanCustomerPool.addEventListener('click', event => {
    const button = event.currentTarget;
    button.disabled = true;
    button.innerHTML = '<i data-lucide="loader-circle"></i><span>Lily正在扫描客户池</span>';
    refreshIcons();
    window.setTimeout(() => {
      button.disabled = false;
      button.innerHTML = '<i data-lucide="scan-search"></i><span>Lily扫描客户池</span>';
      refreshIcons();
      resetAgentScan();
      window.location.hash = 'lily/scan';
    }, 1000);
  });
}

input.addEventListener('input', updateOpportunityComposerState);

sendButton.addEventListener('click', () => {
  const prompt = input.value.trim();
  if (!prompt) {
    composer.classList.add('shake');
    input.focus();
    window.setTimeout(() => composer.classList.remove('shake'), 300);
    return;
  }
  if (lilyState.awaitingAdjustPrompt) {
    lilyState.submittedAdjustPrompt = true;
    agentPromptInput.value = prompt;
    window.location.hash = 'lily/scan';
    return;
  }
  lilyState.homeOpportunityPrompt = prompt;
  resetAgentScan();
  window.location.hash = 'lily/scan';
});

updateOpportunityComposerState();

const myStrategyPanel = document.querySelector('#myStrategyPanel');
const strategyTitle = document.querySelector('#strategy-title');
const thinkingCard = document.querySelector('#thinkingCard');
const thinkingSteps = document.querySelector('#thinkingSteps');
const thinkingTitle = document.querySelector('#thinking-title');
const agentStrategies = document.querySelector('#agentStrategies');
const toggleThinking = document.querySelector('#toggleThinking');
const followupCard = document.querySelector('#followupCard');
const zoeAcquireOption = document.querySelector('#zoeAcquireOption');
const followupAnswerInput = document.querySelector('#followupAnswerInput');
const confirmFollowup = document.querySelector('#confirmFollowup');
const regenerateFollowup = document.querySelector('#regenerateFollowup');
const agentPromptInput = document.querySelector('#agentPromptInput');
const marketingDrawer = document.querySelector('#marketingDrawer');
const sequencePanel = document.querySelector('#sequencePanel');
const mailSubject = document.querySelector('#mailSubject');
const mailBody = document.querySelector('#mailBody');
const mailFitScore = document.querySelector('#mailFitScore');
const marketingTitle = document.querySelector('#marketing-title');
const sequenceName = document.querySelector('#sequenceName');
const sequenceFitScore = document.querySelector('#sequenceFitScore');
const sequenceStepPreset = document.querySelector('#sequenceStepPreset');
const sequenceRoundTrigger = document.querySelector('#sequenceRoundTrigger');
const sequenceRoundMenu = document.querySelector('#sequenceRoundMenu');
const sequenceRoundValue = document.querySelector('#sequenceRoundValue');
const sequenceSteps = document.querySelector('#sequenceSteps');
const deliveryStart = document.querySelector('#deliveryStart');
const deliveryEnd = document.querySelector('#deliveryEnd');
const confirmMarketingButton = document.querySelector('#confirmMarketing');
let scanTimer = null;
const followupBreakIndex = 3;

function renderKeyCustomerCard(customer) {
  return `
    <article class="my-strategy-card key-customer-card" data-customer-id="${escapeHTML(customer.id)}">
      <div class="card-top">
        <span class="trend-badge">${renderIcon('gem')}${escapeHTML(customer.badge)}</span>
        <time>${escapeHTML(customer.lastContactTime)}</time>
      </div>
      <h3>${escapeHTML(customer.company)}</h3>
      <p class="key-customer-contact">${renderIcon('user-round')}${escapeHTML(customer.contact)}</p>
      <div class="key-customer-detail">
        <span>最后联系</span>
        <p>${escapeHTML(customer.lastContactInfo)}</p>
      </div>
      <div class="key-customer-detail">
        <span>推荐动作</span>
        <p>${escapeHTML(customer.recommendedAction)}</p>
      </div>
      <footer>
        <span>${renderIcon('clock-3')}建议今日处理</span>
        <button class="adjust-strategy" type="button" data-key-customer-action="follow">立即跟进 ${renderIcon('arrow-right')}</button>
      </footer>
    </article>
  `;
}

function renderMyStrategies() {
  myStrategyList.innerHTML = keyCustomers.map(renderKeyCustomerCard).join('');
}

function renderAgentTag(tag) {
  return `<span>${escapeHTML(tag)}</span>`;
}

function renderAgentSection(section) {
  const isOpen = Boolean(section.expanded);
  return `
    <section class="agent-accordion-item${isOpen ? ' is-open' : ''}">
      <button type="button" aria-expanded="${String(isOpen)}">${escapeHTML(section.title)} ${renderIcon('chevron-down')}</button>
      <div class="agent-accordion-detail"${isOpen ? '' : ' hidden'}>
        <p>${escapeHTML(section.body)}</p>
        ${section.tags ? `<div class="agent-filter-tags">${section.tags.map(renderAgentTag).join('')}</div>` : ''}
        ${section.actionLabel ? `
          <div class="agent-detail-actions">
            <button class="agent-detail-button" type="button">${renderIcon('users-round')}${escapeHTML(section.actionLabel)}</button>
          </div>
        ` : ''}
      </div>
    </section>
  `;
}

function renderAgentStrategyCard(strategy) {
  return `
    <article class="agent-strategy-card" data-strategy-id="${escapeHTML(strategy.id)}" data-marketing-plan-id="${escapeHTML(strategy.marketingPlanId)}">
      <header>
        <div class="agent-card-title">
          <h2>${escapeHTML(strategy.title)}</h2>
          <span class="priority-badge">${escapeHTML(strategy.badge)}</span>
        </div>
      </header>
      <p class="agent-strategy-summary">${escapeHTML(strategy.summary)}</p>
      <div class="agent-tags">
        <span class="tag-purple">${renderIcon('locate-fixed')}由头类型</span>
        <span class="tag-amber">${renderIcon('users-round')}推荐角色</span>
        <span class="tag-neutral">${renderIcon('globe')}数据来源</span>
      </div>
      <div class="agent-accordion">
        ${strategy.sections.map(renderAgentSection).join('')}
      </div>
      <footer>
        <label class="agent-feedback">
          <span>对这条策略有想法？告诉Lily</span>
          <input class="agent-feedback-input" type="text" placeholder="对这条策略有想法？告诉Lily" />
        </label>
        <div class="agent-card-actions">
          <button class="agent-primary" type="button">${renderIcon('send')}确认策略</button>
          <button class="agent-feedback-cancel" type="button">${renderIcon('users-round')}取消</button>
          <button class="agent-feedback-send" type="button" disabled>${renderIcon('send')}发送</button>
        </div>
      </footer>
    </article>
  `;
}

function renderAgentStrategies() {
  agentStrategies.innerHTML = generatedStrategies.map(renderAgentStrategyCard).join('');
}

function renderLeads() {
  const list = document.querySelector('#leadList');
  if (!list || list.dataset.rendered) return;
  list.innerHTML = leads.map(lead => `
    <article class="lead-card">
      <div class="lead-info">
        <div class="lead-title-row">
          <span class="fake-check" aria-hidden="true"></span>
          <strong>${escapeHTML(lead.company)}</strong>
          <span class="tag sky">新能源设备制造商</span>
          <span class="tag purple"><i data-lucide="gem"></i>${escapeHTML(lead.score)}</span>
        </div>
        <div class="lead-meta">
          <span><i data-lucide="map-pin"></i>${escapeHTML(lead.country)}</span>
          <span><i data-lucide="briefcase-business"></i>${escapeHTML(lead.type)}</span>
          <span><i data-lucide="users-round"></i>${escapeHTML(lead.contacts)}</span>
          <span><i data-lucide="at-sign"></i>${escapeHTML(lead.owner)}</span>
          <span><i data-lucide="link"></i>${escapeHTML(lead.site)}</span>
        </div>
        <div class="lead-tags">
          <small>主营产品</small>
          ${lead.products.map(product => `<span class="tag">${escapeHTML(product)}</span>`).join('')}
        </div>
        <div class="lead-tags">
          <small>自定义标签</small>
          ${lead.custom.map(tag => `<span class="tag purple">${escapeHTML(tag)}</span>`).join('')}
          <span class="tag">+</span>
        </div>
      </div>
      <div class="lead-actions">
        <button type="button" aria-label="撤回"><i data-lucide="undo-2"></i></button>
        <button type="button" aria-label="收藏"><i data-lucide="heart"></i></button>
      </div>
    </article>
  `).join('');
  list.dataset.rendered = 'true';
}

function revealScannedHome() {
  lilyState.customerPoolScanned = true;
  lilyHome.classList.add('scanned');
  myStrategyPanel.hidden = false;
  strategyTitle.textContent = '推荐策略';
  refreshIcons();
}

document.querySelector('#openDashboard')?.addEventListener('click', () => {
  window.location.hash = 'lily/dashboard';
});
document.querySelector('#showMyStrategyTab').addEventListener('click', () => {
  lilyState.customerPoolScanned = true;
  revealScannedHome();
});
document.querySelector('#showRecommendTab').addEventListener('click', () => {
  lilyState.customerPoolScanned = false;
  lilyHome.classList.remove('scanned');
  myStrategyPanel.hidden = true;
  renderStrategies(lilyState.currentScene);
  refreshIcons();
});
document.querySelectorAll('[data-lily-page]').forEach(button => {
  button.addEventListener('click', () => {
    window.location.hash = button.dataset.lilyPage;
  });
});
document.querySelectorAll('.back-to-lily').forEach(button => {
  button.addEventListener('click', () => {
    window.location.hash = 'lily';
  });
});
document.querySelectorAll('.compact-tabs').forEach(tabGroup => {
  tabGroup.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button || !tabGroup.contains(button)) return;
    tabGroup.querySelectorAll('button').forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', String(active));
    });
  });
});
document.querySelectorAll('.inquiry-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.inquiry-item').forEach(row => row.classList.toggle('active', row === item));
    const name = item.querySelector('strong').textContent;
    document.querySelector('.inquiry-chat h2').textContent = name;
    document.querySelector('.inquiry-chat .avatar').textContent = name.charAt(0);
  });
});
document.querySelectorAll('.template-card button, .new-template, .lily-task-card footer button, .reply-box button').forEach(button => {
  button.addEventListener('click', () => {
    const label = button.textContent.trim() || button.getAttribute('aria-label') || '操作';
    showToast(`已触发「${label}」`);
  });
});
document.querySelector('#backToLily').addEventListener('click', () => {
  window.location.hash = 'lily';
});
document.querySelector('#backFromAgent').addEventListener('click', () => {
  if (agentStrategies.classList.contains('ready') || lilyState.customerPoolScanned) {
    revealScannedHome();
  }
  resetAgentScan();
  window.location.hash = 'lily';
});

function resetAgentScan({ keepAdjustment = false } = {}) {
  window.clearInterval(scanTimer);
  scanTimer = null;
  lilyState.scanStarted = false;
  thinkingSteps.innerHTML = '';
  thinkingTitle.textContent = 'Lily 正在扫描全部 372 家客户，为你生成触达转化策略';
  thinkingCard.classList.remove('done', 'collapsed');
  toggleThinking.setAttribute('aria-expanded', 'true');
  followupCard.hidden = true;
  followupCard.classList.remove('ready');
  zoeAcquireOption.classList.add('active');
  zoeAcquireOption.setAttribute('aria-pressed', 'true');
  followupAnswerInput.value = '';
  lilyState.waitingForFollowup = false;
  agentStrategies.hidden = true;
  agentStrategies.classList.remove('ready');
  closeMarketingDrawer();
  if (!keepAdjustment) {
    lilyState.awaitingAdjustPrompt = false;
    lilyState.pendingAdjustTitle = '';
    lilyState.submittedAdjustPrompt = false;
    lilyAgent.classList.remove('adjusting-strategy');
    agentPromptInput.value = '';
    agentPromptInput.placeholder = '基于选中的策略，更详细的描述你的诉求，例如：帮我找到最近有扩产计划的华东新能源企业，并分析合适的营销话术';
  }
}

function appendThinkingItem(item, index) {
  const node = document.createElement(item.type === 'layer' ? 'p' : 'div');
  node.className = item.type === 'layer' ? 'thinking-layer' : 'thinking-line';
  node.textContent = item.text;
  node.style.setProperty('--delay', `${Math.min(index * 20, 180)}ms`);
  thinkingSteps.appendChild(node);
}

function streamThinkingScript(startIndex, endIndex, onDone) {
  let index = startIndex;
  scanTimer = window.setInterval(() => {
    appendThinkingItem(thinkingScript[index], index);
    index += 1;
    if (index >= endIndex) {
      window.clearInterval(scanTimer);
      scanTimer = null;
      onDone?.();
    }
  }, 230);
}

function showFollowupCard() {
  lilyState.scanStarted = false;
  lilyState.waitingForFollowup = true;
  thinkingTitle.textContent = 'Lily 已扫描全部 372 家客户';
  followupCard.hidden = false;
  window.requestAnimationFrame(() => followupCard.classList.add('ready'));
  refreshIcons();
}

function continueAfterFollowup() {
  if (!lilyState.waitingForFollowup || lilyState.scanStarted) return;
  lilyState.waitingForFollowup = false;
  followupCard.classList.remove('ready');
  followupCard.hidden = true;
  lilyState.scanStarted = true;
  streamThinkingScript(followupBreakIndex, thinkingScript.length, () => {
    window.setTimeout(completeAgentScan, 520);
  });
}

function completeAgentScan() {
  window.clearInterval(scanTimer);
  scanTimer = null;
  lilyState.scanStarted = false;
  lilyState.waitingForFollowup = false;
  followupCard.hidden = true;
  followupCard.classList.remove('ready');
  thinkingTitle.textContent = 'Lily 已扫描全部 372 家客户，为你生成 3 条触达转化策略';
  thinkingCard.classList.add('done', 'collapsed');
  toggleThinking.setAttribute('aria-expanded', 'false');
  agentStrategies.hidden = false;
  window.requestAnimationFrame(() => agentStrategies.classList.add('ready'));
  document.title = '策略已生成 · 触达转化 Lily';
  lilyState.customerPoolScanned = true;
  refreshIcons();
}

function startAgentScan({ withFollowup = true } = {}) {
  if (lilyState.scanStarted || agentStrategies.classList.contains('ready')) return;
  const keepAdjustment = lilyState.awaitingAdjustPrompt;
  const shouldAskFollowup = withFollowup && !keepAdjustment;
  resetAgentScan({ keepAdjustment });
  if (!keepAdjustment) agentPromptInput.value = '';
  lilyState.awaitingAdjustPrompt = false;
  lilyState.pendingAdjustTitle = '';
  lilyState.submittedAdjustPrompt = false;
  lilyAgent.classList.remove('adjusting-strategy');
  agentPromptInput.placeholder = shouldAskFollowup ? '请输入' : '基于选中的策略，更详细的描述你的诉求，例如：帮我找到最近有扩产计划的华东新能源企业，并分析合适的营销话术';
  if (lilyState.homeOpportunityPrompt) agentPromptInput.value = lilyState.homeOpportunityPrompt;
  lilyState.scanStarted = true;
  refreshIcons();
  const endIndex = shouldAskFollowup ? followupBreakIndex : thinkingScript.length;
  streamThinkingScript(0, endIndex, () => {
    if (shouldAskFollowup) {
      showFollowupCard();
      return;
    }
    window.setTimeout(completeAgentScan, 520);
  });
}

function prepareAdjustStrategyInput(title) {
  resetAgentScan({ keepAdjustment: true });
  lilyState.awaitingAdjustPrompt = true;
  lilyState.pendingAdjustTitle = title;
  lilyAgent.classList.add('adjusting-strategy');
  agentPromptInput.value = `帮我优化「${title}」这条策略，优化方向是：`;
  agentPromptInput.placeholder = '补充你希望 Lily 优化的方向';
  refreshIcons();
  window.setTimeout(() => agentPromptInput.focus(), 0);
}

toggleThinking.addEventListener('click', () => {
  const collapsed = thinkingCard.classList.toggle('collapsed');
  toggleThinking.setAttribute('aria-expanded', String(!collapsed));
});

zoeAcquireOption.addEventListener('click', () => {
  const active = zoeAcquireOption.classList.toggle('active');
  zoeAcquireOption.setAttribute('aria-pressed', String(active));
});

confirmFollowup.addEventListener('click', () => {
  const hasZoeOption = zoeAcquireOption.classList.contains('active');
  const hasAnswer = Boolean(followupAnswerInput.value.trim());
  if (!hasZoeOption && !hasAnswer) {
    showToast('请选择一个选项，或输入你的答案');
    followupAnswerInput.focus();
    return;
  }
  continueAfterFollowup();
});

regenerateFollowup.addEventListener('click', () => {
  continueAfterFollowup();
});

function setStrategyFeedbackFocused(card, isFocused) {
  card.classList.toggle('feedback-focused', isFocused);
}

function updateStrategyFeedbackState(input) {
  const card = input.closest('.agent-strategy-card');
  const hasValue = Boolean(input.value.trim());
  const sendButton = card.querySelector('.agent-feedback-send');
  card.classList.toggle('feedback-has-value', hasValue);
  sendButton.disabled = !hasValue || card.classList.contains('is-refreshing');
}

function ensureStrategySkeleton(card) {
  let skeleton = card.querySelector('.strategy-skeleton');
  if (skeleton) return skeleton;
  skeleton = document.createElement('div');
  skeleton.className = 'strategy-skeleton';
  skeleton.setAttribute('aria-hidden', 'true');
  skeleton.innerHTML = `
    <div class="skeleton-line title"></div>
    <div class="skeleton-line medium"></div>
    <div class="skeleton-line medium"></div>
    <div class="skeleton-panel"></div>
    <div class="skeleton-footer">
      <div class="skeleton-line"></div>
      <div class="skeleton-line"></div>
    </div>
  `;
  card.appendChild(skeleton);
  return skeleton;
}

function refreshStrategyCard(card, prompt) {
  const refreshedTitle = prompt.includes('东南亚') ? '东南亚市场高意向客户触达策略' : '基于反馈优化后的客户触达策略';
  const refreshedSummary = prompt.includes('东南亚')
    ? '结合东南亚市场需求，优先筛选近期有采购信号和渠道扩张动作的高意向客户，强化本地化触达节奏。'
    : '结合你的补充想法，重新排序客户优先级，并更新触达话术、推荐动作和可执行跟进路径。';
  card.querySelector('h2').textContent = refreshedTitle;
  card.querySelector('.priority-badge').textContent = '已优化策略';
  card.querySelector('.agent-strategy-summary').textContent = refreshedSummary;
  card.querySelector('.agent-tags').innerHTML = `
    <span class="tag-purple"><i data-lucide="locate-fixed"></i>由头类型</span>
    <span class="tag-amber"><i data-lucide="users-round"></i>推荐角色</span>
    <span class="tag-neutral"><i data-lucide="globe"></i>数据来源</span>
  `;
  const details = card.querySelectorAll('.agent-accordion-detail > p');
  details[0].textContent = '根据你的补充说明，优先匹配近期询盘、展会互动、网站访问和渠道扩张信号更集中的客户。';
  details[1].textContent = '建议先用区域案例、交付稳定性和本地服务能力建立信任，再引导对方确认下一步沟通窗口。';
  details[2].textContent = '结合目标市场近期采购节奏变化，突出供货确定性、认证覆盖和快速响应能力。';
  card.querySelectorAll('.agent-accordion-item > button').forEach(button => {
    button.setAttribute('aria-expanded', 'false');
    button.nextElementSibling.hidden = true;
    button.parentElement.classList.remove('is-open');
  });
  const firstAccordionButton = card.querySelector('.agent-accordion-item > button');
  if (firstAccordionButton) {
    firstAccordionButton.setAttribute('aria-expanded', 'true');
    firstAccordionButton.nextElementSibling.hidden = false;
    firstAccordionButton.parentElement.classList.add('is-open');
  }
  lucide.createIcons();
}

function closeOtherStrategyFeedback(activeCard) {
  document.querySelectorAll('.agent-strategy-card.feedback-focused').forEach(card => {
    if (card === activeCard) return;
    card.querySelector('.agent-feedback-input')?.blur();
    setStrategyFeedbackFocused(card, false);
  });
}

function sendStrategyFeedback(card) {
  const input = card.querySelector('.agent-feedback-input');
  const title = card.querySelector('h2').textContent;
  const prompt = input.value.trim();
  if (!prompt) {
    input.focus();
    updateStrategyFeedbackState(input);
    return;
  }
  ensureStrategySkeleton(card);
  card.classList.add('is-refreshing');
  card.setAttribute('aria-busy', 'true');
  card.querySelector('.agent-feedback-send').disabled = true;
  input.blur();
  setStrategyFeedbackFocused(card, false);
  window.setTimeout(() => {
    refreshStrategyCard(card, prompt);
    input.value = '';
    card.classList.remove('is-refreshing', 'feedback-has-value');
    card.removeAttribute('aria-busy');
    updateStrategyFeedbackState(input);
    showToast(`已根据你的反馈刷新「${title}」`);
  }, 900);
}

agentStrategies.addEventListener('click', event => {
  const accordionButton = event.target.closest('.agent-accordion-item > button');
  if (accordionButton && agentStrategies.contains(accordionButton)) {
    const detail = accordionButton.nextElementSibling;
    const expanded = accordionButton.getAttribute('aria-expanded') === 'true';
    accordionButton.setAttribute('aria-expanded', String(!expanded));
    detail.hidden = expanded;
    accordionButton.parentElement.classList.toggle('is-open', !expanded);
    return;
  }

  const actionButton = event.target.closest('.agent-action, .agent-detail-button');
  if (actionButton && agentStrategies.contains(actionButton)) {
    showToast(`已打开「${actionButton.textContent.trim()}」`);
    return;
  }

  const cancelButton = event.target.closest('.agent-feedback-cancel');
  if (cancelButton && agentStrategies.contains(cancelButton)) {
    const card = cancelButton.closest('.agent-strategy-card');
    card.querySelector('.agent-feedback-input').blur();
    setStrategyFeedbackFocused(card, false);
    return;
  }

  const sendFeedbackButton = event.target.closest('.agent-feedback-send');
  if (sendFeedbackButton && agentStrategies.contains(sendFeedbackButton)) {
    sendStrategyFeedback(sendFeedbackButton.closest('.agent-strategy-card'));
    return;
  }

  const primaryButton = event.target.closest('.agent-primary');
  if (primaryButton && agentStrategies.contains(primaryButton)) {
    const card = primaryButton.closest('.agent-strategy-card');
    openMarketingDrawer(card.dataset.strategyId, card.querySelector('h2').textContent);
  }
});

agentStrategies.addEventListener('focusin', event => {
  const input = event.target.closest('.agent-feedback-input');
  if (!input || !agentStrategies.contains(input)) return;
  const card = input.closest('.agent-strategy-card');
  closeOtherStrategyFeedback(card);
  setStrategyFeedbackFocused(card, true);
  updateStrategyFeedbackState(input);
});

agentStrategies.addEventListener('input', event => {
  const input = event.target.closest('.agent-feedback-input');
  if (!input || !agentStrategies.contains(input)) return;
  updateStrategyFeedbackState(input);
});

document.addEventListener('pointerdown', (event) => {
  if (event.target.closest('.agent-feedback, .agent-feedback-cancel, .agent-feedback-send')) return;
  document.querySelectorAll('.agent-strategy-card.feedback-focused').forEach(card => {
    card.querySelector('.agent-feedback-input').blur();
    setStrategyFeedbackFocused(card, false);
  });
});

function getStepCopy(stepNumber) {
  const copies = [
    {
      title: '第 1 封 初次触达',
      delay: '立即发送',
      body: lilyState.currentMarketingPlan.body
    },
    {
      title: '第 2 封 强化建联',
      delay: '等待 3 天',
      body: `Hi {{联系人姓名}}，\n\n我也可以按 {{公司名称}} 的采购阶段，补充相似客户的落地案例和风险提示，帮助你内部评估时更快推进。\n\n祝好，\nJohn`
    },
    {
      title: '第 3 封 推动行动',
      delay: '等待 3 天',
      body: `Hi {{联系人姓名}}，\n\n我补充一个更具体的参考：我们可以按 {{公司名称}} 的采购阶段，提供相似客户的落地案例、常见风险点和建议确认顺序。\n\n如果你们正在内部评估供应稳定性或认证资料，我可以直接把这版对比资料发你。\n\n祝好，\nJohn`
    },
    {
      title: '第 4 封 轻量参数对比',
      delay: '等待 7 天',
      body: `Hi {{联系人姓名}}，\n\n如果当前项目还在早期筛选阶段，我可以先提供一个轻量版参数对比表，不需要占用你太多时间。\n\n你可以先判断是否匹配当前窗口，再决定是否继续沟通。\n\nJohn`
    },
    {
      title: '第 5 封 最后同步资料包',
      delay: '等待 10 天',
      body: `Hi {{联系人姓名}}，\n\n我会在本周最后同步一次资料包。如果你们已有明确供应商，也欢迎告诉我，我们后续按更合适的节点再联系。\n\n祝顺利，\nJohn`
    }
  ];
  return copies[stepNumber - 1] || {
    title: `第 ${stepNumber} 封 · 自定义跟进`,
    delay: '等待 5 天',
    body: `Hi {{联系人姓名}}，\n\n我根据 {{公司名称}} 最近的客户信号，补充一个更具体的下一步理由，方便你快速判断是否值得继续。\n\nBest,\nJohn`
  };
}

function closeSequenceDropdowns(exceptMenu = null) {
  document.querySelectorAll('.sequence-dropdown:not([hidden])').forEach(menu => {
    if (menu === exceptMenu) return;
    menu.hidden = true;
    const trigger = document.querySelector(`[aria-controls="${menu.id}"]`);
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
  });
}

function toggleSequenceDropdown(trigger, menu) {
  const willOpen = menu.hidden;
  closeSequenceDropdowns(willOpen ? menu : null);
  menu.hidden = !willOpen;
  trigger.setAttribute('aria-expanded', String(willOpen));
}

function renderMenuCheck(button, selected) {
  button.setAttribute('aria-selected', String(selected));
  const existingIcon = button.querySelector('i[data-lucide="check"]');
  if (selected && !existingIcon) {
    button.insertAdjacentHTML('beforeend', '<i data-lucide="check" aria-hidden="true"></i>');
  }
  if (!selected && existingIcon) existingIcon.remove();
}

function updateSequenceRoundMenu() {
  sequenceRoundValue.textContent = `${lilyState.sequenceStepCount}轮`;
  sequenceRoundMenu.querySelectorAll('[data-step-count]').forEach(button => {
    renderMenuCheck(button, Number(button.dataset.stepCount) === lilyState.sequenceStepCount);
  });
  sequenceStepPreset.value = String(lilyState.sequenceStepCount);
}

function resizeSequenceTextareas() {
  sequenceSteps.querySelectorAll('.sequence-step-copy').forEach(textarea => {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  });
}

function renderSequenceSteps() {
  const delayOptions = [3, 7, 14, 28];
  const templateOptions = ['首次开发信·观察破冰', '圣诞节营销模版', '展会营销系列', '自动开发客户'];
  sequenceSteps.innerHTML = Array.from({ length: lilyState.sequenceStepCount }, (_, index) => {
    const stepNumber = index + 1;
    const copy = getStepCopy(stepNumber);
    const selectedDelay = lilyState.sequenceDelayDays[stepNumber] || 3;
    const selectedTemplate = lilyState.sequenceTemplateByStep[stepNumber] || templateOptions[0];
    return `
      <article class="sequence-step">
        <div class="sequence-step-top">
          <h3>${escapeHTML(copy.title)}</h3>
          ${stepNumber > 1 ? `
            <div class="sequence-delay">
              <i data-lucide="clock"></i>
              <button type="button" data-sequence-select="delay" data-step-number="${stepNumber}" aria-haspopup="listbox" aria-expanded="false" aria-controls="sequenceDelayMenu${stepNumber}">
                等待 ${selectedDelay} 天
              </button>
              <div class="sequence-dropdown sequence-delay-menu" id="sequenceDelayMenu${stepNumber}" role="listbox" aria-label="第 ${stepNumber} 封发送间隔" hidden>
                ${delayOptions.map(day => `
                  <button type="button" role="option" data-delay-days="${day}" ${day === selectedDelay ? 'aria-selected="true"' : ''}>
                    ${day}${day === selectedDelay ? '<i data-lucide="check" aria-hidden="true"></i>' : ''}
                  </button>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
        <div class="sequence-step-body">
          <textarea class="sequence-step-copy" rows="8" aria-label="第 ${stepNumber} 封邮件内容">${escapeHTML(copy.body)}</textarea>
          <div class="sequence-personal-note">
            <i data-lucide="sparkles"></i>
            <span>已自动带入客户行业痛点，发送内容会根据客户具体信息调整，为每位联系人私人订制</span>
          </div>
          <div class="sequence-step-actions" aria-label="第 ${stepNumber} 封邮件操作">
            <div class="sequence-template-select">
              <button class="sequence-template-button" type="button" data-sequence-select="template" data-step-number="${stepNumber}" aria-haspopup="listbox" aria-expanded="false" aria-controls="sequenceTemplateMenu${stepNumber}">选择模版</button>
              <div class="sequence-dropdown sequence-template-menu" id="sequenceTemplateMenu${stepNumber}" role="listbox" aria-label="第 ${stepNumber} 封邮件模版" hidden>
                ${templateOptions.map(template => `
                  <button type="button" role="option" data-template-name="${escapeHTML(template)}" ${template === selectedTemplate ? 'aria-selected="true"' : ''}>
                    ${escapeHTML(template)}${template === selectedTemplate ? '<i data-lucide="check" aria-hidden="true"></i>' : ''}
                  </button>
                `).join('')}
              </div>
            </div>
            <button class="sequence-polish-button" type="button" data-sequence-action="润色">润色</button>
            <button class="sequence-preview-button" type="button" data-sequence-action="预览">预览</button>
          </div>
        </div>
      </article>
    `;
  }).join('');
  resizeSequenceTextareas();
}

sequenceRoundTrigger.setAttribute('aria-controls', 'sequenceRoundMenu');
sequenceRoundTrigger.addEventListener('click', event => {
  event.stopPropagation();
  toggleSequenceDropdown(sequenceRoundTrigger, sequenceRoundMenu);
});

sequenceRoundMenu.addEventListener('click', event => {
  const option = event.target.closest('[data-step-count]');
  if (!option) return;
  lilyState.sequenceStepCount = Number(option.dataset.stepCount);
  updateSequenceRoundMenu();
  renderSequenceSteps();
  closeSequenceDropdowns();
  showToast(`已切换为 ${lilyState.sequenceStepCount} 轮邮件`);
  refreshIcons();
});

sequenceSteps.addEventListener('click', event => {
  const selectTrigger = event.target.closest('[data-sequence-select]');
  if (selectTrigger && sequenceSteps.contains(selectTrigger)) {
    event.stopPropagation();
    const menu = document.querySelector(`#${selectTrigger.getAttribute('aria-controls')}`);
    if (menu) toggleSequenceDropdown(selectTrigger, menu);
    return;
  }

  const delayOption = event.target.closest('[data-delay-days]');
  if (delayOption && sequenceSteps.contains(delayOption)) {
    const menu = delayOption.closest('.sequence-delay-menu');
    const trigger = document.querySelector(`[aria-controls="${menu.id}"]`);
    const stepNumber = Number(trigger.dataset.stepNumber);
    const delayDays = Number(delayOption.dataset.delayDays);
    lilyState.sequenceDelayDays[stepNumber] = delayDays;
    trigger.textContent = `等待 ${delayDays} 天`;
    menu.querySelectorAll('[data-delay-days]').forEach(button => {
      renderMenuCheck(button, Number(button.dataset.delayDays) === delayDays);
    });
    closeSequenceDropdowns();
    showToast(`第 ${stepNumber} 封邮件已设置为等待 ${delayDays} 天`);
    refreshIcons();
    return;
  }

  const templateOption = event.target.closest('[data-template-name]');
  if (templateOption && sequenceSteps.contains(templateOption)) {
    const menu = templateOption.closest('.sequence-template-menu');
    const trigger = document.querySelector(`[aria-controls="${menu.id}"]`);
    const stepNumber = Number(trigger.dataset.stepNumber);
    lilyState.sequenceTemplateByStep[stepNumber] = templateOption.dataset.templateName;
    menu.querySelectorAll('[data-template-name]').forEach(button => {
      renderMenuCheck(button, button.dataset.templateName === templateOption.dataset.templateName);
    });
    closeSequenceDropdowns();
    showToast(`第 ${stepNumber} 封邮件已选择「${templateOption.dataset.templateName}」`);
    refreshIcons();
    return;
  }

  const button = event.target.closest('[data-sequence-action]');
  if (!button || !sequenceSteps.contains(button)) return;
  const title = button.closest('.sequence-step').querySelector('h3').textContent;
  showToast(`已触发「${title}」的${button.dataset.sequenceAction}`);
});

sequenceSteps.addEventListener('input', event => {
  if (event.target.matches('.sequence-step-copy')) resizeSequenceTextareas();
});

document.addEventListener('click', () => closeSequenceDropdowns());

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeSequenceDropdowns();
});

function renderSequenceSettings() {
  if (!lilyState.currentMarketingPlan) return;
  sequenceFitScore.textContent = lilyState.currentMarketingPlan.fit;
  updateSequenceRoundMenu();
  renderSequenceSteps();
}

function openMarketingDrawer(strategyId, displayTitle = '') {
  const strategy = generatedStrategies.find(item => item.id === strategyId) || generatedStrategies[0];
  const strategyTitle = displayTitle || strategy.title;
  const plan = marketingPlans[strategy.marketingPlanId] || marketingPlans['sleeping-high-value'];
  lilyState.currentMarketingPlan = plan;
  lilyState.currentMarketingStrategyId = strategy.id;
  lilyState.currentMarketingStrategyTitle = strategyTitle;
  lilyState.sequenceStepCount = 3;
  lilyState.sequenceDelayDays = { 2: 3, 3: 3, 4: 7, 5: 10 };
  lilyState.sequenceTemplateByStep = {};
  sequenceStepPreset.value = '3';
  sequenceName.value = `${strategyTitle.replace(/策略$/, '')} sequence`;
  marketingTitle.textContent = `「${strategyTitle}」触达任务`;
  document.querySelector('#sequence-title').textContent = `${strategyTitle.replace(/策略$/, '')}任务_0702`;
  mailFitScore.textContent = plan.fit;
  mailSubject.textContent = plan.subject;
  mailBody.textContent = plan.body;
  marketingDrawer.dataset.stage = 'sequence';
  renderSequenceSettings();
  confirmMarketingButton.innerHTML = '<i data-lucide="send"></i>发布任务';
  marketingDrawer.hidden = false;
  marketingDrawer.classList.add('open');
  marketingDrawer.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  refreshIcons();
  resizeSequenceTextareas();
}

function closeMarketingDrawer() {
  marketingDrawer.classList.remove('open');
  marketingDrawer.setAttribute('aria-hidden', 'true');
  marketingDrawer.hidden = true;
  document.body.classList.remove('modal-open');
}

document.querySelector('#closeMarketingDrawer').addEventListener('click', closeMarketingDrawer);

document.querySelector('#saveMarketingDraft').addEventListener('click', () => {
  showToast('Sequence 草稿已保存');
});

sequenceStepPreset.addEventListener('change', () => {
  lilyState.sequenceStepCount = Number(sequenceStepPreset.value);
  updateSequenceRoundMenu();
  renderSequenceSettings();
  showToast(`已切换为 ${lilyState.sequenceStepCount} 轮邮件`);
  refreshIcons();
});

confirmMarketingButton.addEventListener('click', () => {
  if (!sequenceSteps.querySelectorAll('.sequence-step-copy').length) {
    showToast('请至少保留 1 封邮件');
    return;
  }
  if (deliveryStart.value >= deliveryEnd.value) {
    showToast('发送结束时间需要晚于开始时间');
    deliveryEnd.focus();
    return;
  }
  showToast(`已发布 ${lilyState.sequenceStepCount} 轮触达任务`);
  closeMarketingDrawer();
});

document.querySelector('#addSequenceStep').addEventListener('click', () => {
  lilyState.sequenceStepCount = lilyState.sequenceStepCount < 3 ? 3 : 5;
  renderSequenceSettings();
  showToast(`已切换为 ${lilyState.sequenceStepCount} 轮邮件`);
  refreshIcons();
});

document.querySelector('#agentPromptSend').addEventListener('click', () => {
  const prompt = agentPromptInput.value.trim();
  if (lilyState.waitingForFollowup) {
    showToast('请先点击下一步，Lily 再继续生成策略');
    return;
  }
  if (!prompt) {
    document.querySelector('.agent-composer').classList.add('shake-agent');
    agentPromptInput.focus();
    window.setTimeout(() => document.querySelector('.agent-composer').classList.remove('shake-agent'), 300);
    return;
  }
  if (lilyState.awaitingAdjustPrompt) {
    startAgentScan({ withFollowup: false });
    return;
  }
  showToast('Lily 已收到补充诉求，正在更新策略建议');
});

document.addEventListener('click', event => {
  const button = event.target.closest('#myStrategyList button');
  if (!button) return;
  const card = button.closest('.my-strategy-card');
  const customer = keyCustomers.find(item => item.id === card.dataset.customerId);
  const company = customer?.company || card.querySelector('h3').textContent;
  if (button.dataset.keyCustomerAction === 'follow') {
    showToast(`已为「${company}」生成跟进建议`);
    return;
  }
  showToast(`正在打开「${company}」`);
});

document.querySelectorAll('.date-range').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.date-range').forEach(item => item.classList.toggle('active', item === button));
    const values = dashboardMetrics[button.dataset.range];
    Object.entries(values).forEach(([key, value]) => {
      document.querySelector(`[data-metric="${key}"]`).textContent = value;
    });
    document.querySelector('.trend-panel header p').textContent = `近 ${button.dataset.range} 天每日触达人数与产生商机数`;
  });
});

document.querySelector('.export-dashboard').addEventListener('click', () => {
  showToast('数据看板已加入导出队列');
});

function filterTasks() {
  const query = document.querySelector('#taskSearch').value.trim().toLowerCase();
  let visibleCount = 0;
  document.querySelectorAll('#taskTableBody tr').forEach(row => {
    const statusMatch = lilyState.currentTaskStatus === 'all' || row.dataset.status === lilyState.currentTaskStatus;
    const queryMatch = !query || row.textContent.toLowerCase().includes(query);
    const visible = statusMatch && queryMatch;
    row.hidden = !visible;
    if (visible) visibleCount += 1;
  });
  document.querySelector('#taskEmpty').hidden = visibleCount > 0;
}

document.querySelectorAll('.task-tabs button').forEach(button => {
  button.addEventListener('click', () => {
    lilyState.currentTaskStatus = button.dataset.status;
    document.querySelectorAll('.task-tabs button').forEach(item => item.classList.toggle('active', item === button));
    filterTasks();
  });
});
document.querySelector('#taskSearch').addEventListener('input', filterTasks);
document.querySelectorAll('.task-detail').forEach(button => {
  button.addEventListener('click', () => {
    const taskName = button.closest('tr').querySelector('strong').textContent;
    showToast(`正在打开「${taskName}」任务详情`);
  });
});
