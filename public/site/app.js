const strategies = {
  news: [
    {
      id: 'eu-carbon-compliance-window',
      title: '欧盟碳关税新规落地，出口企业迎来合规服务窗口期',
      description: '你的客户池中有 18 家制造企业受新规影响，建议以“碳足迹快速诊断”为切入点。',
      source: '欧盟 · 政策类'
    },
    {
      id: 'core-parts-price-increase',
      title: '头部厂商宣布核心部件涨价，下游客户正在寻找替代供应',
      description: '监测到 37 家目标企业近期密集搜索替代方案，其中 6 家与你的优势产品高度匹配。',
      source: '产业链'
    },
    {
      id: 'southeast-asia-storage-projects',
      title: '东南亚储能项目加速，工商储渠道进入集中招募期',
      description: '越南与泰国新增 12 个备案项目，可优先接触当地 EPC 与区域代理商。',
      source: '东南亚 · 市场'
    }
  ],
  new: [
    {
      id: 'new-procurement-roles',
      title: '7 家目标企业近期新增采购岗位，可能正在扩建供应链',
      description: '其中 3 家与你的核心客户画像高度一致，建议在采购方案确定前建立联系。',
      source: '招聘 · 组织变化'
    },
    {
      id: 'lookalike-potential-buyers',
      title: '发现 26 家与近期成交客户高度相似的潜在买家',
      description: '基于行业、规模、产品结构和技术栈综合匹配，平均相似度达到 87%。',
      source: 'AI匹配 · 企业图谱'
    },
    {
      id: 'east-china-supplier-certification',
      title: '华东 9 家新能源企业进入新一轮供应商认证周期',
      description: '认证窗口预计持续 30 天，你的 2 项资质可显著缩短其准入评估流程。',
      source: '华东 · 招采'
    }
  ],
  existing: [
    {
      id: 'renewal-risk-low-interaction',
      title: '5 家重点客户将在 60 天内到期，但近期互动明显减少',
      description: '建议提前开展价值复盘，其中 2 家客户存在被竞品替代的风险信号。',
      source: 'CRM · 续约预警'
    },
    {
      id: 'yuanhang-energy-expansion',
      title: '客户「远航能源」业务量增长 42%，具备扩容增购条件',
      description: '其新增产线与你的 Pro 系列适配，可在本月经营复盘中主动提出升级建议。',
      source: '客户动态'
    },
    {
      id: 'key-contact-job-changes',
      title: '12 位关键联系人本月发生岗位变动，建议及时重建关系',
      description: '包含 4 位决策者与 8 位项目负责人，部分新任职公司也符合目标画像。',
      source: '人脉 · 联系人动态'
    }
  ]
};

const keyCustomers = [
  {
    id: 'yuanhang-energy',
    company: '远航能源科技',
    contact: '张敏 · 采购负责人',
    lastContactTime: '今天 10:24',
    lastContactInfo: '询问 Pro 系列样品交期，并希望补充一页并网交付案例。',
    recommendedAction: '今天补发案例摘要和样品交期说明，顺势预约本周技术沟通。',
    badge: '高意向'
  },
  {
    id: 'northstar-storage',
    company: 'Northstar Storage',
    contact: 'Emily Carter · Project Director',
    lastContactTime: '昨天 16:40',
    lastContactInfo: '打开报价页 3 次，重点停留在质保响应和备件供应部分。',
    recommendedAction: '发送 15 分钟方案评估邀约，并突出本地备件支持与项目交付窗口。',
    badge: '需跟进'
  },
  {
    id: 'hengtong-new-materials',
    company: '恒通新材料',
    contact: '李睿 · 供应链总监',
    lastContactTime: '2 天前',
    lastContactInfo: '回复称下月启动供应商复评，要求确认认证资料是否已更新。',
    recommendedAction: '立即发送资质更新包，并附上近期同类客户交付记录。',
    badge: '复评窗口'
  }
];

const generatedStrategies = [
  {
    id: 'new-product-launch',
    marketingPlanId: 'sleeping-high-value',
    title: '新品发布策略',
    badge: '首轮冷启动',
    summary: '本策略目标是为了推广新品，针对高价值核心客户推送新品营销信，推动客户试用。通过分析客户池数据和企业知识库的数据结合全网搜索到的行业动态or节假日商机，我们为您推荐以下策略。',
    sections: [
      {
        title: '覆盖客户',
        expanded: true,
        body: '本策略当前覆盖了 123 家客户和 512 位联系人，以下是客户的筛选标签，后续新进高质量客户池且满足此条件的客户也会被当前策略触达',
        tags: ['亚洲', '阿拉伯国家', '动力电池客户', '储能电池客户', '消费电池客户'],
        actionLabel: '查看客户'
      },
      { title: '核心卖点', body: '围绕新品试用价值、适配场景和交付支持展开，突出核心客户最关心的性能提升和落地成本。' },
      { title: '推荐动作', body: '建议先发送新品营销信，再根据客户试用意向安排样品、资料包或 15 分钟演示沟通。' }
    ]
  },
  {
    id: 'us-storage-installer-cold-start',
    marketingPlanId: 'us-storage-installer',
    title: '美国储能安装商冷启动策略',
    badge: '首轮冷启动',
    summary: '面向美国住宅储能安装商，以并网交付、质保响应和供应稳定性作为首轮沟通切入点。通过客户池行为数据、历史高绩效策略和近期市场动态，为当前冷启动触达推荐以下策略。',
    sections: [
      {
        title: '覆盖客户',
        expanded: true,
        body: '本策略当前覆盖了 43 家客户和 126 位联系人，以下是客户的筛选标签，后续新进高质量客户池且满足此条件的客户也会被当前策略触达',
        tags: ['北美', '美国', '住宅储能', '安装商', 'EPC 客户'],
        actionLabel: '查看客户'
      },
      { title: '核心卖点', body: '用并网交付稳定性、质保响应和供应确定性建立信任，优先解决安装商首轮沟通的顾虑。' },
      { title: '推荐动作', body: '先发送 1 页方案摘要，引导对方确认项目窗口，再预约技术交流或样品方案沟通。' }
    ]
  },
  {
    id: 'read-no-reply-followup',
    marketingPlanId: 'read-no-reply',
    title: '已读未回客户二次触达策略',
    badge: '二次触达',
    summary: '针对已打开资料或停留报价页但未回复的客户，用更具体的价值主张推动下一步反馈。结合客户互动记录、报价页停留行为和项目窗口信号，为二次触达推荐以下策略。',
    sections: [
      {
        title: '覆盖客户',
        expanded: true,
        body: '本策略当前覆盖了 18 家客户和 54 位联系人，以下是客户的筛选标签，后续新进高质量客户池且满足此条件的客户也会被当前策略触达',
        tags: ['已读未回', '报价页停留', 'ROI 关注', '项目负责人', '二次跟进'],
        actionLabel: '查看客户'
      },
      { title: '核心卖点', body: '避开重复推销，改用案例、ROI 估算或交期节点提醒，让客户更容易给出明确反馈。' },
      { title: '推荐动作', body: '补充更具体的收益测算和项目窗口提醒，再用轻量问题引导客户确认下一步沟通意向。' }
    ]
  }
];

const grid = document.querySelector('#strategyGrid');
const myStrategyList = document.querySelector('#myStrategyList');
const input = document.querySelector('#opportunityInput');
const composer = document.querySelector('.composer');
const sendButton = document.querySelector('#sendButton');
const toast = document.querySelector('#toast');
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

function refreshIcons() {
  lucide.createIcons({ attrs: { 'stroke-width': 1.5 } });
}

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

document.querySelector('#collapseButton').addEventListener('click', () => {
  document.querySelector('#sidebar').classList.toggle('collapsed');
});

const lilyHome = document.querySelector('#lilyHome');
const lilyDashboard = document.querySelector('#lilyDashboard');
const lilyAgent = document.querySelector('#lilyAgent');
const appPages = {
  wendy: document.querySelector('#wendyPage'),
  'wendy/accounts': document.querySelector('#wendyAccountsPage'),
  'wendy/agent': document.querySelector('#wendyAgentPage'),
  lucas: document.querySelector('#lucasPage'),
  john: document.querySelector('#johnPage'),
  'john/keywords': document.querySelector('#johnKeywordsPage'),
  'john/ads': document.querySelector('#johnAdsPage'),
  'lily/messages': document.querySelector('#lilyInquiryPage'),
  'lily/templates': document.querySelector('#lilyTemplatesPage'),
  'lily/tasks': document.querySelector('#lilyTasksPage'),
  dashboard: document.querySelector('#dashboardPage'),
  customers: document.querySelector('#customersPage'),
  zoe: document.querySelector('#zoePage'),
  leo: document.querySelector('#leoPage')
};
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
const dashboardMetrics = {
  7: { reach: '12,480', delivered: '11,806', engaged: '3,284', opportunities: '426' },
  30: { reach: '42,760', delivered: '40,134', engaged: '11,082', opportunities: '1,368' },
  90: { reach: '118,920', delivered: '111,406', engaged: '30,621', opportunities: '3,842' }
};

const leads = [
  {
    company: 'Sustainable Power Solutions',
    country: '加拿大',
    type: '买家业务',
    contacts: '32 人',
    owner: '卢卓辰',
    site: 'http://www.narang.com',
    score: '10.0',
    products: ['Forklift', 'Scissor Lift', 'Electric Scissor Lift', 'Rough Terrain Scissor Lift', 'Indoor Scissor Lift', 'Outdoor Scissor Lift', '+12'],
    custom: ['新能源']
  },
  {
    company: 'Sustainable Power Solutions',
    country: '加拿大',
    type: '买家业务',
    contacts: '32 人',
    owner: '卢卓辰',
    site: 'http://www.narang.com',
    score: '10.0',
    products: ['Forklift', 'Scissor Lift', 'Electric Scissor Lift', 'Rough Terrain Scissor Lift', 'Indoor Scissor Lift', 'Outdoor Scissor Lift', '+12'],
    custom: ['新能源']
  },
  {
    company: 'Sustainable Power Solutions',
    country: '加拿大',
    type: '买家业务',
    contacts: '32 人',
    owner: '卢卓辰',
    site: 'http://www.narang.com',
    score: '10.0',
    products: ['Forklift', 'Scissor Lift', 'Electric Scissor Lift', 'Rough Terrain Scissor Lift', 'Indoor Scissor Lift', 'Outdoor Scissor Lift', '+12'],
    custom: ['新能源']
  },
  {
    company: 'Sustainable Power Solutions',
    country: '加拿大',
    type: '买家业务',
    contacts: '32 人',
    owner: '卢卓辰',
    site: 'http://www.narang.com',
    score: '10.0',
    products: ['Forklift', 'Scissor Lift', 'Electric Scissor Lift', 'Rough Terrain Scissor Lift', 'Indoor Scissor Lift', 'Outdoor Scissor Lift', '+12'],
    custom: ['新能源']
  },
  {
    company: 'Sustainable Power Solutions',
    country: '加拿大',
    type: '买家业务',
    contacts: '32 人',
    owner: '卢卓辰',
    site: 'http://www.narang.com',
    score: '10.0',
    products: ['Forklift', 'Scissor Lift', 'Electric Scissor Lift', 'Outdoor Scissor Lift', '+12'],
    custom: ['新能源']
  }
];

const thinkingScript = [
  { type: 'line', text: '正在读取你的客户池…看 Lily 拿到了什么' },
  { type: 'line', text: '正在分析客户分布，寻找值得触达的客户群…看 Lily 拿到了什么' },
  { type: 'line', text: 'Lily 已扫描全部 372 家客户' },
  { type: 'line', text: '已确认补充信息，正在继续生成可执行触达策略…' },
  { type: 'layer', text: '第 1 层 · 有询盘未报价的高价值客户 — 4 家公司' },
  { type: 'line', text: '正在核对询盘内容与你的产品参数、交期、认证…' },
  { type: 'line', text: '判断：报价前窗口优先级最高，建议生成确认邮件、人工确认后发送' },
  { type: 'layer', text: '第 2 层 · 美国储能安装商 — 43 家公司' },
  { type: 'line', text: '正在搜索该市场近期动态…看 Lily 拿到了什么' },
  { type: 'line', text: '找到：住宅储能并网交付成为采购关注点' },
  { type: 'line', text: '正在匹配你的产品卖点…建议用项目稳定性切入' },
  { type: 'line', text: '发现可参考的历史高绩效策略：美国储能首轮（询盘率 18%）' },
  { type: 'layer', text: '第 3 层 · 已读未回客户 — 18 家公司' },
  { type: 'line', text: '正在分析他们看过什么、停在哪一步…' },
  { type: 'line', text: '判断：认知已建立，建议换一个更具体的价值主张二次触达' },
  { type: 'layer', text: '第 4 层 · 德国技术角色 — 21 家公司' },
  { type: 'line', text: '正在搜索欧洲储能合规动态…看 Lily 拿到了什么' },
  { type: 'line', text: '已为 4 个客户层生成 3 条完整触达策略，正在整理…' }
];

const marketingPlans = {
  'sleeping-high-value': {
    fit: '匹配度 96%',
    subject: '关于储能项目交付与认证资料的快速确认',
    body: `Hi {{联系人姓名}}，\n\n看到贵司近期在关注储能项目交付、认证与售后稳定性，我们整理了一份适用于 {{公司名称}} 当前采购评估阶段的资料。\n\n结合你们此前的询盘信息，我们建议先确认三个关键点：\n1. 目标交期与可接受的备货窗口\n2. 项目所需认证与测试报告\n3. 后续技术对接与样品验证方式\n\n如果方便，我可以把完整参数表和交付排期发你，并约 15 分钟同步一下是否匹配贵司当前项目节奏。\n\n祝好，\nJohn`,
    summary: '4 家公司 · 27 位联系人',
    audience: [
      { company: 'NorthPeak Energy Solutions', signal: '有询盘未报价 · 预计采购额 ¥86万', contactCount: 8, contacts: ['Mia Carter · Procurement Director', 'Ethan Brooks · Technical Manager', 'Olivia Hill · Project Buyer'] },
      { company: 'BlueRiver Storage Inc.', signal: '近 7 天打开资料 3 次', contactCount: 7, contacts: ['Ava Wilson · VP Operations', 'Noah White · Sourcing Lead'] },
      { company: 'SolarGrid Partners', signal: '关注认证与交期', contactCount: 6, contacts: ['Liam Smith · Supply Chain Manager', 'Emma Johnson · Engineering Lead'] },
      { company: 'EverVolt Systems', signal: '高价值沉睡 42 天', contactCount: 6, contacts: ['Lucas Brown · Purchasing Manager', 'Sophia Davis · Product Engineer'] }
    ]
  },
  'us-storage-installer': {
    fit: '匹配度 92%',
    subject: '提升住宅储能项目并网交付稳定性的方案建议',
    body: `Hi {{联系人姓名}}，\n\n我们注意到 {{公司名称}} 正在扩展住宅储能安装项目。近期安装商普遍关注并网交付、质保响应和供应稳定性，因此 Lily 建议用“项目稳定性”作为首轮沟通切入。\n\n我们可以提供：\n- 面向安装商的标准化储能组件包\n- 明确的交付排期与备件支持\n- 适用于项目投标的认证与参数资料\n\n如果你正好在评估新的供应合作方，我可以先发一版 1 页方案摘要，供你判断是否值得进一步交流。\n\nBest,\nJohn`,
    summary: '43 家公司 · 126 位联系人',
    audience: [
      { company: 'SunHarbor Installers', signal: '新增安装团队招聘 · 美国西部', contactCount: 35, contacts: ['Daniel Miller · Founder', 'Grace Lee · Operations Manager', 'Henry Clark · Procurement'] },
      { company: 'BrightHome Energy', signal: '网站新增并网服务页', contactCount: 32, contacts: ['Charlotte Lewis · Business Development', 'James Walker · Technical Director'] },
      { company: 'PeakRoof Solar', signal: '近期扩展储能产品线', contactCount: 30, contacts: ['Amelia Young · General Manager', 'Benjamin Hall · Project Lead'] },
      { company: 'WattBridge Residential', signal: '与历史高绩效客户相似度 88%', contactCount: 29, contacts: ['Harper Allen · Partner Manager', 'Mason King · Installation Lead'] }
    ]
  },
  'read-no-reply': {
    fit: '匹配度 89%',
    subject: '补充一个更具体的项目收益测算给你参考',
    body: `Hi {{联系人姓名}}，\n\n上次发给你的资料可能还偏概览。我根据 {{公司名称}} 所在区域和项目类型，补充了一版更具体的收益与交期测算，方便你快速判断是否值得推进。\n\n这次建议你重点看三件事：\n1. 当前项目窗口期内可缩短的确认流程\n2. 预计节省的采购与沟通成本\n3. 相似客户的落地案例与风险点\n\n如果你愿意，我可以直接把测算表发你；也可以按你们当前项目参数再调整一版。\n\n祝好，\nJohn`,
    summary: '18 家公司 · 54 位联系人',
    audience: [
      { company: 'GreenNova Manufacturing', signal: '已读未回 · 停留报价页 2 分钟', contactCount: 14, contacts: ['Ella Moore · Procurement Lead', 'Logan Scott · Plant Manager'] },
      { company: 'Aster Power Components', signal: '打开案例资料 4 次', contactCount: 13, contacts: ['Victoria Adams · Category Manager', 'Jack Turner · Engineer'] },
      { company: 'HelioWorks Europe', signal: '关注 ROI 测算', contactCount: 15, contacts: ['Luna Baker · Commercial Manager', 'Owen Mitchell · Technical Buyer'] },
      { company: 'VectorCell Systems', signal: '上次互动 9 天前', contactCount: 12, contacts: ['Chloe Perez · Operations', 'William Carter · Sourcing'] }
    ]
  }
};

function showToast(message, duration = 2200) {
  toast.querySelector('span').textContent = message;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), duration);
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));
}

function renderIcon(name) {
  return `<i data-lucide="${escapeHTML(name)}"></i>`;
}

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

const standalonePageTitles = {
  wendy: '社媒运营 Wendy',
  'wendy/accounts': '账号管理 · 社媒运营 Wendy',
  'wendy/agent': '内容生成中 · 社媒运营 Wendy',
  lucas: '专业建站 Lucas',
  john: '24/7 投流 John',
  'john/keywords': '关键词管理 · 24/7 投流 John',
  'john/ads': '广告管理 · 24/7 投流 John',
  'lily/messages': '询盘消息',
  'lily/templates': '话术模板',
  'lily/tasks': '任务管理'
};

function getCurrentRoute() {
  const hash = window.location.hash.replace(/^#/, '') || 'lucas';
  const standalonePage = appPages[hash] ? hash : '';
  return {
    hash,
    standalonePage,
    showLilyDashboard: hash === 'lily/dashboard',
    showLilyAgent: hash === 'lily/scan',
    showStandalonePage: Boolean(standalonePage)
  };
}

function syncRoutePages(route) {
  lilyHome.hidden = route.showLilyDashboard || route.showLilyAgent || route.showStandalonePage;
  lilyDashboard.hidden = !route.showLilyDashboard || route.showStandalonePage;
  lilyAgent.hidden = !route.showLilyAgent || route.showStandalonePage;
  Object.entries(appPages).forEach(([name, page]) => {
    page.hidden = name !== route.standalonePage;
  });
}

function getActiveNavTarget(route) {
  if (route.standalonePage?.startsWith('lily/')) return 'lily';
  if (route.standalonePage?.startsWith('john/')) return 'john';
  if (route.standalonePage?.startsWith('wendy/')) return 'wendy';
  if (route.standalonePage) return route.standalonePage;
  if (route.showLilyDashboard) return 'dashboard';
  return 'lily';
}

function syncRouteNavigation(route) {
  const activeTarget = getActiveNavTarget(route);
  document.querySelectorAll('.nav-item').forEach(item => {
    const target = item.getAttribute('href').replace(/^#/, '');
    const active = target === activeTarget;
    item.classList.toggle('active', active);
    if (active) item.setAttribute('aria-current', 'page');
    else item.removeAttribute('aria-current');
  });
}

function getRouteTitle(route) {
  if (route.standalonePage) {
    const pageTitle = standalonePageTitles[route.standalonePage]
      || document.querySelector(`a[href="#${route.standalonePage}"] span`)?.textContent
      || 'OntoZ';
    return `${pageTitle} · OntoZ`;
  }
  if (route.showLilyDashboard) return '数据看板 · 触达转化 Lily';
  if (route.showLilyAgent) return '策略生成中 · 触达转化 Lily';
  return 'OntoZ · 触达转化 Lily';
}

function syncRouteTitle(route) {
  document.title = getRouteTitle(route);
}

function scrollToRouteTop(route) {
  if (route.showLilyDashboard || route.showLilyAgent || route.showStandalonePage) {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
}

function resumeAgentRoute() {
  if (lilyState.awaitingAdjustPrompt) {
    if (lilyState.submittedAdjustPrompt) {
      lilyState.submittedAdjustPrompt = false;
      startAgentScan({ withFollowup: false });
    } else {
      prepareAdjustStrategyInput(lilyState.pendingAdjustTitle);
    }
    return;
  }
  startAgentScan();
}

function runRouteEffects(route) {
  if (route.standalonePage === 'customers') renderLeads();
  if (route.standalonePage === 'wendy/accounts') renderWendyAccounts();
  if (route.standalonePage === 'wendy/agent') resumeWendyAgent();
  scrollToRouteTop(route);
  if (route.showStandalonePage) {
    refreshIcons();
    return;
  }
  if (route.showLilyAgent) resumeAgentRoute();
  if (!route.showLilyDashboard && !route.showLilyAgent && lilyState.customerPoolScanned) revealScannedHome();
}

function updateLilyRoute() {
  const route = getCurrentRoute();
  syncRoutePages(route);
  syncRouteNavigation(route);
  syncRouteTitle(route);
  runRouteEffects(route);
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
window.addEventListener('hashchange', updateLilyRoute);

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

const wendyPublisher = document.querySelector('#wendyPublisher');
const wendyPlatformField = document.querySelector('#wendyPublishPlatform');
const wendyTimeField = document.querySelector('#wendyPublishTime');
const wendyDateField = document.querySelector('#wendyPublishDate');
const wendyClockField = document.querySelector('#wendyPublishClock');
const wendyCopyField = document.querySelector('#wendyPublishCopy');
const wendyPublisherPreviewText = document.querySelector('#wendyPublisherPreviewText');
const wendyPublisherAvatar = document.querySelector('#wendyPublisherAvatar');
const wendyPublisherPostingTo = document.querySelector('#wendyPublisherPostingTo');
const wendyPromptInput = document.querySelector('#wendyPromptInput');
const wendyPromptSend = document.querySelector('#wendyPromptSend');
const wendyImageInput = document.querySelector('#wendyImageInput');
const wendyAttachImage = document.querySelector('#wendyAttachImage');
const wendyUploadStatus = document.querySelector('#wendyUploadStatus');
const wendyThinkingThread = document.querySelector('#wendyThinkingThread');
const wendyPlanStep = document.querySelector('#wendyPlanStep');
const wendyGeneratePlan = document.querySelector('#wendyGeneratePlan');
const wendyPlanUpload = document.querySelector('#wendyPlanUpload');
const wendyThinkingCard = document.querySelector('#wendyThinkingCard');
const wendyThinkingSteps = document.querySelector('#wendyThinkingSteps');
const wendyThinkingTitle = document.querySelector('#wendy-thinking-title');
const wendyThinkingToggle = document.querySelector('#wendyThinkingToggle');
const wendyThinkingResult = document.querySelector('#wendyThinkingResult');
const wendyPostPreviews = document.querySelector('#wendyPostPreviews');
const wendySinglePreview = document.querySelector('#wendySinglePreview');
const wendyStrategyComposer = document.querySelector('#wendyStrategyComposer');
const wendyStrategyPrompt = document.querySelector('#wendyStrategyPrompt');
const wendyStrategySend = document.querySelector('#wendyStrategySend');
const wendyImageReprompt = document.querySelector('#wendyImageReprompt');
const wendyRegenerateImage = document.querySelector('#wendyRegenerateImage');
const wendyImageRegenerateCount = document.querySelector('#wendyImageRegenerateCount');
const backFromWendyAgent = document.querySelector('#backFromWendyAgent');
const wendyAccountList = document.querySelector('#wendyAccountList');
const wendyAccountsBoundCount = document.querySelector('#wendyAccountsBoundCount');
const wendyAccountsTotalCount = document.querySelector('#wendyAccountsTotalCount');
const wendyAccountsPendingCount = document.querySelector('#wendyAccountsPendingCount');
const wendyHomeAccountCount = document.querySelector('.wendy-account-summary strong');
let wendyThinkingTimer = null;
const wendyState = {
  pendingPrompt: '',
  pendingImageCount: 0,
  agentStarted: false,
  planConfirmed: false,
  selectedPlatform: 'LinkedIn',
  selectedVisual: '超写实摄影',
  imageRegenerateCount: 0,
  imagePrompt: '',
  previewConfirmed: false,
  selectedSyncPlatforms: [],
  strategyPrompt: '',
  strategyRevisionCount: 0
};

const wendyPreviewPlatforms = {
  LinkedIn: {
    account: '@John Smith',
    badge: 'in',
    avatarClass: 'linkedin',
    mediaClass: 'linkedin',
    icon: 'factory',
    mediaLabel: 'Product launch',
    timeLabel: '立即发布',
    caption: '围绕新品上市生成一条面向海外买家的社媒 Post，突出产品价值、应用场景和访问独立站的行动入口。'
  },
  Instagram: {
    account: '@ontoz.global',
    badge: 'ig',
    avatarClass: 'instagram',
    mediaClass: 'instagram',
    icon: 'image',
    mediaLabel: 'Carousel cover',
    timeLabel: '立即发布',
    caption: '用更强视觉冲击呈现新品细节、应用场景和品牌可信度，引导海外买家收藏并访问独立站了解完整资料。'
  },
  TikTok: {
    account: '@ontoz_lab',
    badge: 'tt',
    avatarClass: 'tiktok',
    mediaClass: 'tiktok',
    icon: 'play',
    mediaLabel: 'Video cover',
    timeLabel: '立即发布',
    caption: '用短视频封面和直接钩子介绍新品亮点，突出测试流程、实际应用场景和快速了解产品资料的入口。'
  },
  YouTube: {
    account: '@OntoZ Shorts',
    badge: 'yt',
    avatarClass: 'youtube',
    mediaClass: 'youtube',
    icon: 'youtube',
    mediaLabel: 'Shorts cover',
    timeLabel: '立即发布',
    caption: '围绕新品应用场景生成一条 Shorts 预告内容，强调核心卖点、画面节奏和引导访问独立站的行动入口。'
  }
};

const wendySocialAccounts = [
  {
    id: 'linkedin',
    platform: 'LinkedIn',
    icon: 'linkedin',
    bound: true,
    account: '@OntoZ Power',
    detail: '用于 B2B 客户案例、行业观点和独立站资料导流。'
  },
  {
    id: 'instagram',
    platform: 'Instagram',
    icon: 'instagram',
    bound: true,
    account: '@ontoz.global',
    detail: '用于产品视觉、轮播图和海外项目现场内容。'
  },
  {
    id: 'tiktok',
    platform: 'TikTok',
    icon: 'music-2',
    bound: true,
    account: '@ontoz_lab',
    detail: '用于短视频、测试流程和工厂场景素材。'
  },
  {
    id: 'youtube',
    platform: 'YouTube Shorts',
    icon: 'youtube',
    bound: false,
    account: '未绑定账号',
    detail: '绑定后可同步管理 Shorts 内容和视频预告。'
  }
];

const wendyThinkingScript = [
  { type: 'line', text: '正在读取你的社媒诉求和上传素材…' },
  { type: 'line', text: '已确认发布平台和视觉方案，正在锁定生成约束…' },
  { type: 'line', text: '正在识别适合发布的平台、语气和内容长度…' },
  { type: 'layer', text: '第 1 层 · 内容目标' },
  { type: 'line', text: '判断：这条内容适合用新品价值点切入，并导流到独立站资料页' },
  { type: 'layer', text: '第 2 层 · 发布时间' },
  { type: 'line', text: '正在结合本周日历里的最佳发布时间，避开同平台密集发布时段…' },
  { type: 'layer', text: '第 3 层 · 素材与格式' },
  { type: 'line', text: '已生成 LinkedIn 长文、Instagram 轮播和 TikTok 短视频三个方向，正在整理…' }
];

function syncWendyPublisherPreview() {
  if (!wendyPublisherPreviewText || !wendyCopyField) return;
  wendyPublisherPreviewText.textContent = wendyCopyField.value.trim() || '发布预览会显示在这里';
}

function getWendyBoundCount() {
  return wendySocialAccounts.filter(account => account.bound).length;
}

function syncWendyAccountSummary() {
  const boundCount = getWendyBoundCount();
  const totalCount = wendySocialAccounts.length;
  if (wendyAccountsBoundCount) wendyAccountsBoundCount.textContent = String(boundCount);
  if (wendyAccountsTotalCount) wendyAccountsTotalCount.textContent = String(totalCount);
  if (wendyAccountsPendingCount) wendyAccountsPendingCount.textContent = String(totalCount - boundCount);
  if (wendyHomeAccountCount) wendyHomeAccountCount.innerHTML = `${boundCount}<small>/${totalCount}</small>`;
}

function renderWendyAccountRow(account) {
  const statusClass = account.bound ? 'bound' : 'unbound';
  const statusText = account.bound ? '已绑定' : '未绑定';
  const actionText = account.bound ? '解绑' : '去绑定';
  const supportingText = account.bound ? account.account : account.detail;

  return `
    <article class="wendy-account-row ${escapeHTML(account.id)}" data-wendy-account-id="${escapeHTML(account.id)}">
      <div class="wendy-account-main">
        <span class="wendy-account-icon">${renderIcon(account.icon)}</span>
        <div>
          <strong>${escapeHTML(account.platform)}</strong>
          <p>${escapeHTML(supportingText)}</p>
        </div>
      </div>
      <span class="wendy-account-status ${statusClass}">${statusText}</span>
      <button class="wendy-account-action ${account.bound ? '' : 'bind'}" data-wendy-account-toggle="${escapeHTML(account.id)}" type="button">${actionText}</button>
    </article>
  `;
}

function renderWendyAccounts() {
  if (!wendyAccountList) return;
  wendyAccountList.innerHTML = wendySocialAccounts.map(renderWendyAccountRow).join('');
  syncWendyAccountSummary();
  refreshIcons();
}

function syncWendyAgentSelections() {
  document.querySelectorAll('[data-wendy-agent-platform]').forEach(button => {
    const selected = button.dataset.wendyAgentPlatform === wendyState.selectedPlatform;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  document.querySelectorAll('[data-wendy-agent-visual]').forEach(button => {
    const selected = button.dataset.wendyAgentVisual === wendyState.selectedVisual;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
}

function showWendyPlanStep() {
  if (wendyPlanStep) wendyPlanStep.hidden = false;
  if (wendyThinkingThread) wendyThinkingThread.hidden = true;
  if (wendyThinkingTitle) wendyThinkingTitle.textContent = 'Wendy 正在生成社媒内容方案';
  syncWendyAgentSelections();
  refreshIcons();
}

function hideWendyPlanStep() {
  if (wendyPlanStep) wendyPlanStep.hidden = true;
  if (wendyThinkingThread) wendyThinkingThread.hidden = false;
}

function showWendyStrategyComposer() {
  if (!wendyStrategyComposer) return;
  wendyStrategyComposer.hidden = false;
  refreshIcons();
}

function hideWendyStrategyComposer() {
  if (!wendyStrategyComposer) return;
  wendyStrategyComposer.hidden = true;
}

function getWendyThinkingScript() {
  return wendyThinkingScript.map(item => {
    if (item.text.includes('已确认发布平台和视觉方案')) {
      return {
        ...item,
        text: `已确认 ${wendyState.selectedPlatform} 为主发布平台，视觉方案使用「${wendyState.selectedVisual}」`
      };
    }
    if (item.text.includes('已生成 LinkedIn 长文')) {
      return {
        ...item,
        text: `已生成 ${wendyState.selectedPlatform} 主发布内容，并补充跨平台延展建议，正在整理…`
      };
    }
    return item;
  });
}

function getWendyPreviewConfig() {
  return wendyPreviewPlatforms[wendyState.selectedPlatform] || wendyPreviewPlatforms.LinkedIn;
}

function getWendyPreviewCaption() {
  const config = getWendyPreviewConfig();
  if (!wendyState.strategyPrompt) return config.caption;
  return `${config.caption} 已根据策略修改补充：${wendyState.strategyPrompt}`;
}

function getWendySyncPlatformOptions() {
  return Object.keys(wendyPreviewPlatforms).filter(platform => platform !== wendyState.selectedPlatform);
}

function renderWendySyncPrompt() {
  const options = getWendySyncPlatformOptions();
  return `
    <section class="wendy-sync-card" aria-labelledby="wendy-sync-title">
      <h3 id="wendy-sync-title">是否将社媒内容同步发送至其他平台</h3>
      <div class="wendy-sync-options" role="group" aria-label="选择同步发送平台">
        ${options.map(platform => {
          const config = wendyPreviewPlatforms[platform];
          const selected = wendyState.selectedSyncPlatforms.includes(platform);
          return `
            <button class="wendy-sync-option ${selected ? 'selected' : ''} ${escapeHTML(config.avatarClass)}" data-wendy-sync-platform="${escapeHTML(platform)}" type="button" aria-pressed="${String(selected)}">
              ${renderIcon(config.icon)}
              <span>${escapeHTML(platform)}</span>
            </button>
          `;
        }).join('')}
      </div>
      <div class="wendy-sync-actions">
        <button class="wendy-sync-confirm" data-wendy-sync-confirm type="button">确认</button>
        <button class="wendy-sync-ignore" data-wendy-sync-ignore type="button">忽略</button>
      </div>
    </section>
  `;
}

function renderWendySinglePreview() {
  if (!wendySinglePreview) return;
  const platform = wendyState.selectedPlatform || 'LinkedIn';
  const config = getWendyPreviewConfig();
  const promptNote = wendyState.imagePrompt
    ? `<em>已按修改建议更新：${escapeHTML(wendyState.imagePrompt)}</em>`
    : `<em>${escapeHTML(wendyState.selectedVisual)} 视觉方案</em>`;
  const previewCaption = getWendyPreviewCaption();
  const captionMarkup = wendyState.previewConfirmed
    ? `<p class="wendy-confirmed-caption">${escapeHTML(previewCaption)}</p>`
    : `<textarea rows="8">${escapeHTML(previewCaption)}</textarea>`;
  wendySinglePreview.innerHTML = `
    <article class="wendy-post-preview-card ${wendyState.previewConfirmed ? 'confirmed' : ''}" data-preview-platform="${escapeHTML(platform)}">
      <header class="wendy-post-preview-top">
        <div class="wendy-preview-account">
          <div class="wendy-preview-avatar ${escapeHTML(config.avatarClass)}">OZ<i>${escapeHTML(config.badge)}</i></div>
          <div><strong>${escapeHTML(config.account)}</strong><span>${escapeHTML(platform)}</span></div>
        </div>
        <label class="wendy-preview-time">
          <span>发布时间</span>
          <select aria-label="${escapeHTML(platform)} 发布时间" ${wendyState.previewConfirmed ? 'disabled' : ''}>
            <option>${escapeHTML(config.timeLabel)}</option>
            <option>2026/07/10 09:30</option>
            <option>2026/07/10 13:00</option>
          </select>
        </label>
      </header>
      <div class="wendy-post-preview-body">
        <div class="wendy-preview-media ${escapeHTML(config.mediaClass)}" aria-label="${escapeHTML(platform)}素材预览">
          <i data-lucide="${escapeHTML(config.icon)}"></i>
          <strong>${escapeHTML(config.mediaLabel)}</strong>
          ${promptNote}
        </div>
        <section class="wendy-caption-card">
          <label>
            <span>推送文案</span>
            ${captionMarkup}
          </label>
        </section>
      </div>
      <footer class="wendy-post-preview-actions">
        ${wendyState.previewConfirmed
          ? `<div class="wendy-preview-confirmed"><i data-lucide="circle-check-big"></i><span>已确认社媒发布</span></div>`
          : `
            <button data-wendy-preview-save="${escapeHTML(platform)}" type="button"><i data-lucide="save"></i>保存草稿</button>
            <button data-wendy-preview-confirm="${escapeHTML(platform)}" type="button"><i data-lucide="check"></i>确认</button>
          `}
      </footer>
    </article>
    ${wendyState.previewConfirmed ? renderWendySyncPrompt() : ''}
  `;
  refreshIcons();
}

function normalizeWendyDateTime(value = '2026-07-07T10:30:00') {
  const [datePart = '2026-07-07', timePart = '10:30:00'] = String(value).split('T');
  const normalizedTime = timePart.length === 5 ? `${timePart}:00` : timePart.slice(0, 8);
  return { date: datePart, time: normalizedTime || '10:30:00', value: `${datePart}T${normalizedTime || '10:30:00'}` };
}

function setWendyPublisherDateTime(value) {
  const dateTime = normalizeWendyDateTime(value);
  if (wendyDateField) wendyDateField.value = dateTime.date;
  if (wendyClockField) wendyClockField.value = dateTime.time;
  if (wendyTimeField) wendyTimeField.value = dateTime.value;
}

function getWendyPublisherDateTime() {
  const date = wendyDateField?.value || '2026-07-07';
  const time = wendyClockField?.value || '10:30:00';
  const normalized = normalizeWendyDateTime(`${date}T${time}`);
  if (wendyTimeField) wendyTimeField.value = normalized.value;
  return normalized.value;
}

function setWendyPublisherPlatform(platform) {
  if (wendyPlatformField) wendyPlatformField.value = platform;
  document.querySelectorAll('[data-wendy-platform-option]').forEach(button => {
    button.classList.toggle('active', button.dataset.wendyPlatformOption === platform);
  });
  if (wendyPublisherPostingTo) wendyPublisherPostingTo.textContent = `Posting to ${platform}`;
  if (wendyPublisherAvatar) {
    const badge = platform.includes('Instagram') ? 'ig' : platform.includes('TikTok') ? 'tt' : platform.includes('YouTube') ? 'yt' : 'in';
    wendyPublisherAvatar.innerHTML = `OZ<i>${badge}</i>`;
  }
}

function setWendyActiveButton(button, selector) {
  button.closest(selector)?.querySelectorAll('button').forEach(item => item.classList.remove('active', 'selected'));
  button.classList.add(selector.includes('media') ? 'selected' : 'active');
}

function getWendyEventColor(platform, isLive = false) {
  if (isLive) return 'hot';
  if (platform.includes('LinkedIn')) return 'blue';
  if (platform.includes('Instagram')) return 'pink';
  if (platform.includes('YouTube')) return 'youtube';
  return 'hot';
}

function getWendyPlatformIcon(platform) {
  if (platform.includes('LinkedIn')) return 'linkedin';
  if (platform.includes('Instagram')) return 'instagram';
  if (platform.includes('YouTube')) return 'youtube';
  if (platform.includes('TikTok')) return 'music-2';
  return 'send';
}

function openWendyPublisher({ platform = 'LinkedIn', time = '2026-07-07T10:30:00', copy = '' } = {}) {
  if (!wendyPublisher) return;
  wendyPublisher.hidden = false;
  setWendyPublisherPlatform(platform);
  setWendyPublisherDateTime(time);
  if (wendyCopyField && copy) wendyCopyField.value = copy;
  syncWendyPublisherPreview();
  window.setTimeout(() => wendyCopyField?.focus(), 0);
  refreshIcons();
}

function closeWendyPublisher() {
  if (wendyPublisher) wendyPublisher.hidden = true;
}

function addWendyCalendarPost({ platform, time, copy, isLive = false }) {
  const date = new Date(time);
  const day = Number.isNaN(date.getTime()) ? 7 : date.getDate();
  const hour = Number.isNaN(date.getTime()) ? 9 : date.getHours();
  const minute = Number.isNaN(date.getTime()) ? 30 : date.getMinutes();
  const start = Math.min(12, Math.max(0, hour + minute / 60 - 8));
  const column = Array.from(document.querySelectorAll('.wendy-day-column'))
    .find(item => item.dataset.day?.includes(`7月${day}日`)) || document.querySelector('.wendy-day-column');
  if (!column) return;
  const label = isLive ? `${platform} 刚发布` : `${platform} 已排期`;
  column.insertAdjacentHTML('beforeend', `
    <button class="wendy-event ${getWendyEventColor(platform, isLive)}" style="--start: ${start}; --duration: .86;" data-wendy-event data-platform="${escapeHTML(platform)}" data-time="${escapeHTML(time)}" data-copy="${escapeHTML(copy)}" type="button">
      <i class="wendy-platform-icon" data-lucide="${getWendyPlatformIcon(platform)}"></i><span>${escapeHTML(label)}</span>
    </button>
  `);
  refreshIcons();
}

function resetWendyThinking() {
  window.clearInterval(wendyThinkingTimer);
  wendyThinkingTimer = null;
  if (wendyThinkingSteps) wendyThinkingSteps.innerHTML = '';
  if (wendyThinkingTitle) wendyThinkingTitle.textContent = 'Wendy 正在分析社媒内容诉求';
  wendyThinkingCard?.classList.remove('done', 'collapsed');
  wendyThinkingToggle?.setAttribute('aria-expanded', 'true');
  if (wendyThinkingResult) {
    wendyThinkingResult.hidden = true;
    wendyThinkingResult.classList.remove('ready');
  }
  if (wendyPostPreviews) {
    wendyPostPreviews.hidden = true;
  }
  hideWendyStrategyComposer();
}

function appendWendyThinkingItem(item, index) {
  if (!wendyThinkingSteps) return;
  const node = document.createElement(item.type === 'layer' ? 'p' : 'div');
  node.className = item.type === 'layer' ? 'wendy-thinking-layer' : 'wendy-thinking-line';
  node.textContent = item.text;
  node.style.setProperty('--delay', `${Math.min(index * 20, 180)}ms`);
  wendyThinkingSteps.appendChild(node);
}

function applyWendyStrategyRevisionToResult() {
  if (!wendyState.strategyPrompt || !wendyThinkingResult || wendyThinkingResult.hidden) return;
  const intentCard = Array.from(document.querySelectorAll('.wendy-result-brief article'))
    .find(item => item.querySelector('span')?.textContent === '发布意图');
  const styleCard = Array.from(document.querySelectorAll('.wendy-result-brief article'))
    .find(item => item.querySelector('span')?.textContent === '风格');
  if (intentCard) {
    intentCard.querySelector('strong').textContent = '已按你的补充诉求调整内容策略';
    intentCard.querySelector('p').textContent = `新的策略会优先响应「${wendyState.strategyPrompt}」，同时保留产品价值、应用场景和独立站行动入口。`;
  }
  if (styleCard) {
    styleCard.querySelector('p').textContent = `视觉方向仍使用「${wendyState.selectedVisual}」，但文案与画面重点会按你的补充诉求重新排序。`;
  }
}

function submitWendyStrategyPrompt() {
  const prompt = wendyStrategyPrompt?.value.trim() || '';
  if (!prompt) {
    showToast('请输入想修改的策略方向');
    wendyStrategyPrompt?.focus();
    return;
  }
  wendyState.strategyPrompt = prompt;
  wendyState.strategyRevisionCount += 1;
  appendWendyThinkingItem({
    type: 'line',
    text: `收到修改诉求：${prompt}，正在更新整体策略…`
  }, wendyThinkingSteps?.children.length || 0);
  applyWendyStrategyRevisionToResult();
  if (wendyStrategyPrompt) wendyStrategyPrompt.value = '';
  showToast('Wendy 已按补充诉求更新策略');
}

function completeWendyThinking(prompt) {
  window.clearInterval(wendyThinkingTimer);
  wendyThinkingTimer = null;
  if (wendyThinkingTitle) wendyThinkingTitle.textContent = 'Wendy 已生成社媒内容建议摘要';
  wendyThinkingCard?.classList.add('done', 'collapsed');
  wendyThinkingToggle?.setAttribute('aria-expanded', 'false');
  if (wendyThinkingResult) {
    wendyThinkingResult.hidden = false;
    window.requestAnimationFrame(() => {
      wendyThinkingResult.classList.add('ready');
      wendyThinkingResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
  if (wendyCopyField && prompt) {
    wendyCopyField.value = `围绕「${prompt.slice(0, 54)}」生成一条面向海外买家的社媒 Post，突出产品价值、应用场景和访问独立站的行动入口。`;
  }
  const targetPlatform = Array.from(document.querySelectorAll('.wendy-result-brief article'))
    .find(item => item.querySelector('span')?.textContent === '目标平台');
  const targetStyle = Array.from(document.querySelectorAll('.wendy-result-brief article'))
    .find(item => item.querySelector('span')?.textContent === '风格');
  if (targetPlatform) {
    targetPlatform.querySelector('strong').textContent = `主发布平台：${wendyState.selectedPlatform}`;
    targetPlatform.querySelector('p').textContent = `${wendyState.selectedPlatform} 将作为本次内容的主发布平台，Wendy 会优先匹配该平台的版式比例、内容长度、语气和行动入口；其他平台可在预览阶段继续扩展。`;
  }
  if (targetStyle) {
    targetStyle.querySelector('strong').textContent = wendyState.selectedVisual;
    targetStyle.querySelector('p').textContent = `视觉方向将优先采用「${wendyState.selectedVisual}」，并结合上传素材、企业知识库和平台展示习惯生成可编辑海报。`;
  }
  applyWendyStrategyRevisionToResult();
  showToast('Wendy 已生成社媒内容建议');
  refreshIcons();
}

function submitWendyPrompt() {
  const prompt = wendyPromptInput?.value.trim() || '';
  const imageCount = wendyImageInput?.files?.length || 0;
  if (!prompt && imageCount === 0) {
    showToast('先描述你想要的社媒内容，或上传图片');
    wendyPromptInput?.focus();
    return;
  }
  wendyState.pendingPrompt = prompt;
  wendyState.pendingImageCount = imageCount;
  wendyState.agentStarted = false;
  wendyState.planConfirmed = false;
  wendyState.selectedPlatform = 'LinkedIn';
  wendyState.selectedVisual = '超写实摄影';
  wendyState.imageRegenerateCount = 0;
  wendyState.imagePrompt = '';
  wendyState.previewConfirmed = false;
  wendyState.selectedSyncPlatforms = [];
  wendyState.strategyPrompt = '';
  wendyState.strategyRevisionCount = 0;
  if (wendyStrategyPrompt) wendyStrategyPrompt.value = '';
  if (wendyImageReprompt) wendyImageReprompt.value = '';
  if (wendyImageRegenerateCount) wendyImageRegenerateCount.textContent = '0';
  window.location.hash = 'wendy/agent';
}

function startWendyThinking() {
  const prompt = wendyState.pendingPrompt || wendyPromptInput?.value.trim() || '';
  const imageCount = wendyState.pendingImageCount || wendyImageInput?.files?.length || 0;
  hideWendyPlanStep();
  resetWendyThinking();
  showWendyStrategyComposer();
  if (wendyThinkingTitle) {
    wendyThinkingTitle.textContent = imageCount > 0
      ? `Wendy 正在分析诉求和 ${imageCount} 张图片`
      : 'Wendy 正在分析社媒内容诉求';
  }
  wendyState.agentStarted = true;
  showToast('Wendy 已收到选择，正在生成内容建议');

  let index = 0;
  const thinkingScript = getWendyThinkingScript();
  wendyThinkingTimer = window.setInterval(() => {
    appendWendyThinkingItem(thinkingScript[index], index);
    index += 1;
    if (index >= thinkingScript.length) {
      window.clearInterval(wendyThinkingTimer);
      wendyThinkingTimer = null;
      window.setTimeout(() => completeWendyThinking(prompt), 420);
    }
  }, 230);
}

function resumeWendyAgent() {
  if (wendyState.agentStarted || wendyThinkingTimer) return;
  if (!wendyState.pendingPrompt && !wendyState.pendingImageCount) {
    wendyState.pendingPrompt = '帮我生成一条 LinkedIn 新品介绍，强调产品价值和独立站访问入口。';
  }
  if (!wendyState.planConfirmed) {
    resetWendyThinking();
    showWendyPlanStep();
    return;
  }
  startWendyThinking();
}

function showWendyPostPreviews() {
  if (wendyThinkingResult) {
    wendyThinkingResult.classList.remove('ready');
    wendyThinkingResult.hidden = true;
  }
  hideWendyStrategyComposer();
  wendyState.previewConfirmed = false;
  wendyState.selectedSyncPlatforms = [];
  renderWendySinglePreview();
  if (wendyPostPreviews) {
    wendyPostPreviews.classList.remove('is-confirmed');
    wendyPostPreviews.hidden = false;
    wendyPostPreviews.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  if (wendyThinkingTitle) wendyThinkingTitle.textContent = 'Wendy 已生成社媒内容建议摘要';
  showToast(`已生成 ${wendyState.selectedPlatform} 预览`);
  refreshIcons();
}

function regenerateWendyImage() {
  if (wendyState.previewConfirmed) {
    showToast('已确认的预览不能继续改图');
    return;
  }
  const prompt = wendyImageReprompt?.value.trim() || '';
  if (!prompt) {
    showToast('请输入图片修改建议');
    wendyImageReprompt?.focus();
    return;
  }
  if (wendyState.imageRegenerateCount >= 8) {
    showToast('本次已达到 8 次重新生图上限');
    return;
  }
  wendyState.imageRegenerateCount += 1;
  wendyState.imagePrompt = prompt;
  if (wendyImageRegenerateCount) wendyImageRegenerateCount.textContent = String(wendyState.imageRegenerateCount);
  renderWendySinglePreview();
  showToast(`Wendy 已按建议重新生图 ${wendyState.imageRegenerateCount}/8`);
}

function confirmWendyPreview(platform) {
  wendyState.previewConfirmed = true;
  wendyState.selectedSyncPlatforms = [];
  renderWendySinglePreview();
  wendyPostPreviews?.classList.add('is-confirmed');
  showToast(`${platform} 预览已确认`);
  document.querySelector('.wendy-sync-card')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function toggleWendySyncPlatform(platform) {
  if (wendyState.selectedSyncPlatforms.includes(platform)) {
    wendyState.selectedSyncPlatforms = wendyState.selectedSyncPlatforms.filter(item => item !== platform);
  } else {
    wendyState.selectedSyncPlatforms = [...wendyState.selectedSyncPlatforms, platform];
  }
  renderWendySinglePreview();
}

wendyAttachImage?.addEventListener('click', () => {
  wendyImageInput?.click();
});

wendyImageInput?.addEventListener('change', () => {
  const files = Array.from(wendyImageInput.files || []);
  if (!wendyUploadStatus) return;
  wendyUploadStatus.textContent = files.length
    ? `已添加 ${files.length} 张图片`
    : '';
  showToast(files.length ? `已添加 ${files.length} 张图片` : '已清空图片');
});

wendyPromptSend?.addEventListener('click', submitWendyPrompt);

wendyPromptInput?.addEventListener('keydown', event => {
  if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
    event.preventDefault();
    submitWendyPrompt();
  }
});

wendyStrategySend?.addEventListener('click', submitWendyStrategyPrompt);

wendyStrategyPrompt?.addEventListener('keydown', event => {
  if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
    event.preventDefault();
    submitWendyStrategyPrompt();
  }
});

wendyThinkingToggle?.addEventListener('click', () => {
  const collapsed = wendyThinkingCard?.classList.toggle('collapsed');
  wendyThinkingToggle.setAttribute('aria-expanded', String(!collapsed));
});

backFromWendyAgent?.addEventListener('click', () => {
  window.clearInterval(wendyThinkingTimer);
  wendyThinkingTimer = null;
  wendyState.agentStarted = false;
  wendyState.planConfirmed = false;
  hideWendyStrategyComposer();
  window.location.hash = 'wendy';
});

document.querySelector('#wendyPage')?.addEventListener('click', event => {
  const accountManageButton = event.target.closest('[data-wendy-account-manage]');
  if (accountManageButton) {
    window.location.hash = 'wendy/accounts';
    return;
  }

  const closeButton = event.target.closest('[data-wendy-close-publisher]');
  if (closeButton) {
    closeWendyPublisher();
    return;
  }

  const openButton = event.target.closest('[data-wendy-open-publisher]');
  if (openButton) {
    openWendyPublisher();
    return;
  }

  const eventButton = event.target.closest('[data-wendy-event]');
  if (eventButton) {
    openWendyPublisher({
      platform: eventButton.dataset.platform || 'LinkedIn',
      time: eventButton.dataset.time || '2026-07-07T09:30',
      copy: eventButton.dataset.copy || ''
    });
    return;
  }

  const platformButton = event.target.closest('[data-wendy-platform-option]');
  if (platformButton) {
    setWendyPublisherPlatform(platformButton.dataset.wendyPlatformOption || 'LinkedIn');
    return;
  }

  const contentTypeButton = event.target.closest('.wendy-content-type-grid button');
  if (contentTypeButton) {
    setWendyActiveButton(contentTypeButton, '.wendy-content-type-grid');
    return;
  }

  const mediaButton = event.target.closest('.wendy-media-grid button');
  if (mediaButton) {
    setWendyActiveButton(mediaButton, '.wendy-media-grid');
    return;
  }

  const scheduleModeButton = event.target.closest('[data-wendy-schedule-mode]');
  if (scheduleModeButton) {
    setWendyActiveButton(scheduleModeButton, '.wendy-schedule-tabs');
    return;
  }

  const generateCaptionButton = event.target.closest('[data-wendy-generate-caption]');
  if (generateCaptionButton) {
    if (wendyCopyField) {
      wendyCopyField.value = '面向海外安装商的新一代并网组件已经完成批量测试。Wendy 已根据产品资料整理出认证、交付排期与售后响应亮点，帮助采购团队更快完成供应商评估。';
    }
    syncWendyPublisherPreview();
    showToast('Wendy 已生成 Post 文案');
    return;
  }

  const saveDraftButton = event.target.closest('[data-wendy-save-draft]');
  if (saveDraftButton) {
    const platform = wendyPlatformField?.value || 'LinkedIn';
    closeWendyPublisher();
    showToast(`${platform} 内容已保存为草稿`);
    return;
  }

  const scheduleButton = event.target.closest('[data-wendy-schedule-post]');
  if (scheduleButton) {
    const platform = wendyPlatformField?.value || 'LinkedIn';
    const time = getWendyPublisherDateTime();
    const copy = wendyCopyField?.value.trim() || '新的社媒内容';
    const mode = document.querySelector('.wendy-schedule-tabs button.active')?.dataset.wendyScheduleMode || 'schedule';
    addWendyCalendarPost({ platform, time, copy, isLive: mode === 'now' });
    closeWendyPublisher();
    showToast(mode === 'now' ? `${platform} 内容已发布` : `${platform} 内容已加入发布日历`);
    return;
  }

  const publishButton = event.target.closest('[data-wendy-publish-now]');
  if (publishButton) {
    const platform = wendyPlatformField?.value || 'LinkedIn';
    const time = getWendyPublisherDateTime();
    const copy = wendyCopyField?.value.trim() || '新的社媒内容';
    addWendyCalendarPost({ platform, time, copy, isLive: true });
    closeWendyPublisher();
    showToast(`${platform} Post 已发布`);
  }
});

document.querySelector('#wendyAccountsPage')?.addEventListener('click', event => {
  const backButton = event.target.closest('[data-wendy-back-home]');
  if (backButton) {
    window.location.hash = 'wendy';
    return;
  }

  const toggleButton = event.target.closest('[data-wendy-account-toggle]');
  if (!toggleButton) return;

  const account = wendySocialAccounts.find(item => item.id === toggleButton.dataset.wendyAccountToggle);
  if (!account) return;

  account.bound = !account.bound;
  if (account.bound && account.account === '未绑定账号') {
    account.account = account.id === 'youtube' ? '@OntoZ Shorts' : `@ontoz.${account.id}`;
  }
  renderWendyAccounts();
  showToast(`${account.platform} 已${account.bound ? '绑定' : '解绑'}`);
});

document.querySelector('#wendyAgentPage')?.addEventListener('click', event => {
  const platformButton = event.target.closest('[data-wendy-agent-platform]');
  if (platformButton) {
    wendyState.selectedPlatform = platformButton.dataset.wendyAgentPlatform || 'LinkedIn';
    syncWendyAgentSelections();
    return;
  }

  const visualButton = event.target.closest('[data-wendy-agent-visual]');
  if (visualButton) {
    wendyState.selectedVisual = visualButton.dataset.wendyAgentVisual || '超写实摄影';
    syncWendyAgentSelections();
    return;
  }

  const uploadButton = event.target.closest('#wendyPlanUpload');
  if (uploadButton) {
    wendyImageInput?.click();
    return;
  }

  const generatePlanButton = event.target.closest('#wendyGeneratePlan');
  if (generatePlanButton) {
    wendyState.planConfirmed = true;
    wendyState.agentStarted = false;
    startWendyThinking();
    return;
  }

  const confirmButton = event.target.closest('[data-wendy-agent-confirm]');
  if (confirmButton) {
    showWendyPostPreviews();
    return;
  }

  const regenerateImageButton = event.target.closest('#wendyRegenerateImage');
  if (regenerateImageButton) {
    regenerateWendyImage();
    return;
  }

  const saveButton = event.target.closest('[data-wendy-preview-save]');
  if (saveButton) {
    showToast(`${saveButton.dataset.wendyPreviewSave} Post 已保存为草稿`);
    return;
  }

  const previewConfirmButton = event.target.closest('[data-wendy-preview-confirm]');
  if (previewConfirmButton) {
    confirmWendyPreview(previewConfirmButton.dataset.wendyPreviewConfirm || wendyState.selectedPlatform);
    return;
  }

  const syncPlatformButton = event.target.closest('[data-wendy-sync-platform]');
  if (syncPlatformButton) {
    toggleWendySyncPlatform(syncPlatformButton.dataset.wendySyncPlatform);
    return;
  }

  const syncConfirmButton = event.target.closest('[data-wendy-sync-confirm]');
  if (syncConfirmButton) {
    const count = wendyState.selectedSyncPlatforms.length;
    showToast(count ? `已同步发送至 ${wendyState.selectedSyncPlatforms.join('、')}` : '请先选择需要同步的平台');
    return;
  }

  const syncIgnoreButton = event.target.closest('[data-wendy-sync-ignore]');
  if (syncIgnoreButton) {
    showToast('已跳过同步发送');
    return;
  }

  const scheduleButton = event.target.closest('[data-wendy-preview-schedule]');
  if (scheduleButton) {
    showToast(`${scheduleButton.dataset.wendyPreviewSchedule} Post 已发布`);
    return;
  }

  const discardButton = event.target.closest('[data-wendy-preview-discard]');
  if (discardButton) {
    showToast(`${discardButton.dataset.wendyPreviewDiscard} Post 已丢弃`);
  }
});

wendyImageReprompt?.addEventListener('keydown', event => {
  if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
    event.preventDefault();
    regenerateWendyImage();
  }
});

document.querySelector('#wendyPublisher form')?.addEventListener('submit', event => {
  event.preventDefault();
});

wendyCopyField?.addEventListener('input', syncWendyPublisherPreview);
wendyPlatformField?.addEventListener('change', () => {
  setWendyPublisherPlatform(wendyPlatformField.value);
});
wendyDateField?.addEventListener('change', getWendyPublisherDateTime);
wendyClockField?.addEventListener('change', getWendyPublisherDateTime);

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !wendyPublisher?.hidden) {
    closeWendyPublisher();
  }
});

const johnCampaignData = {
  performance: {
    label: '广告1 · 性能卖点',
    metrics: {
      impressions: '37,106',
      clicks: '2,290',
      cost: '$4,842',
      conversions: '229',
      ctr: '6.17%',
      cpa: '$21.14'
    },
    deltas: { impressions: '12%', clicks: '8%', cost: '5%', conversions: '15%' },
    segments: {
      country: [
        { label: 'US', value: '$329.24', color: '#3f7bdd' },
        { label: 'GB', value: '$2,515.67', color: '#5f8ff0' },
        { label: 'DE', value: '$1,359.20', color: '#8fb4f8' },
        { label: 'JP', value: '$637.83', color: '#b9d1fb' }
      ],
      channel: [
        { label: 'Google Search', value: '$2,126.40', color: '#3f7bdd' },
        { label: 'Meta Ads', value: '$1,194.68', color: '#5f8ff0' },
        { label: 'LinkedIn', value: '$986.32', color: '#8fb4f8' },
        { label: 'YouTube', value: '$534.60', color: '#b9d1fb' }
      ],
      audience: [
        { label: '安装商', value: '$1,822.48', color: '#3f7bdd' },
        { label: '批发商', value: '$1,384.21', color: '#5f8ff0' },
        { label: '工程采购', value: '$1,096.17', color: '#8fb4f8' },
        { label: '品牌商', value: '$539.14', color: '#b9d1fb' }
      ]
    }
  },
  retargeting: {
    label: '广告2 · 再营销唤醒',
    metrics: {
      impressions: '18,924',
      clicks: '1,482',
      cost: '$2,618',
      conversions: '164',
      ctr: '7.83%',
      cpa: '$15.96'
    },
    deltas: { impressions: '9%', clicks: '11%', cost: '3%', conversions: '19%' },
    segments: {
      country: [
        { label: 'US', value: '$1,042.80', color: '#3f7bdd' },
        { label: 'GB', value: '$724.16', color: '#5f8ff0' },
        { label: 'DE', value: '$516.92', color: '#8fb4f8' },
        { label: 'AU', value: '$334.12', color: '#b9d1fb' }
      ],
      channel: [
        { label: 'Meta Ads', value: '$1,098.32', color: '#3f7bdd' },
        { label: 'Google Display', value: '$782.44', color: '#5f8ff0' },
        { label: 'YouTube', value: '$472.10', color: '#8fb4f8' },
        { label: 'LinkedIn', value: '$265.14', color: '#b9d1fb' }
      ],
      audience: [
        { label: '访问过报价页', value: '$1,084.62', color: '#3f7bdd' },
        { label: '下载过手册', value: '$746.90', color: '#5f8ff0' },
        { label: '加入过询盘', value: '$512.28', color: '#8fb4f8' },
        { label: '看过案例页', value: '$274.20', color: '#b9d1fb' }
      ]
    }
  },
  launch: {
    label: '广告3 · 新品测试',
    metrics: {
      impressions: '12,760',
      clicks: '824',
      cost: '$1,936',
      conversions: '78',
      ctr: '6.46%',
      cpa: '$24.82'
    },
    deltas: { impressions: '16%', clicks: '6%', cost: '14%', conversions: '7%' },
    segments: {
      country: [
        { label: 'DE', value: '$628.90', color: '#3f7bdd' },
        { label: 'US', value: '$516.26', color: '#5f8ff0' },
        { label: 'NL', value: '$421.74', color: '#8fb4f8' },
        { label: 'JP', value: '$369.10', color: '#b9d1fb' }
      ],
      channel: [
        { label: 'Google Search', value: '$916.64', color: '#3f7bdd' },
        { label: 'LinkedIn', value: '$488.18', color: '#5f8ff0' },
        { label: 'Meta Ads', value: '$314.92', color: '#8fb4f8' },
        { label: 'YouTube', value: '$216.26', color: '#b9d1fb' }
      ],
      audience: [
        { label: '新品兴趣人群', value: '$746.12', color: '#3f7bdd' },
        { label: '竞品关注者', value: '$532.88', color: '#5f8ff0' },
        { label: '储能项目采购', value: '$418.36', color: '#8fb4f8' },
        { label: '行业内容读者', value: '$238.64', color: '#b9d1fb' }
      ]
    }
  }
};
let johnSegment = 'country';

function renderJohnDistribution() {
  const rows = johnCampaignData.performance.segments[johnSegment];
  const list = document.querySelector('#johnDistributionList');
  if (!list) return;
  list.innerHTML = rows.map(item => `
    <div class="john-distribution-row">
      <span><i style="background:${item.color}"></i>${escapeHTML(item.label)}</span>
      <strong>${escapeHTML(item.value)}</strong>
    </div>
  `).join('');
}

function updateJohnCampaign() {
  const data = johnCampaignData.performance;
  Object.entries(data.metrics).forEach(([key, value]) => {
    const metric = document.querySelector(`[data-john-metric="${key}"]`);
    if (metric) metric.textContent = value;
  });
  Object.entries(data.deltas).forEach(([key, value]) => {
    const delta = document.querySelector(`[data-john-delta="${key}"]`);
    if (delta) delta.textContent = value;
  });
  const subtitle = document.querySelector('#johnTrendSubtitle');
  if (subtitle) subtitle.textContent = `近 14 天 · ${data.label}`;
  renderJohnDistribution();
}

document.querySelectorAll('[data-john-segment]').forEach(button => {
  button.addEventListener('click', () => {
    johnSegment = button.dataset.johnSegment;
    document.querySelectorAll('[data-john-segment]').forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', String(active));
    });
    renderJohnDistribution();
  });
});

document.querySelector('#johnPage')?.addEventListener('click', event => {
  const actionButton = event.target.closest('[data-john-action], [data-john-entry], .john-insight-list button');
  if (!actionButton) return;
  if (actionButton.dataset.johnEntry) {
    window.location.hash = actionButton.dataset.johnEntry === '关键词管理' ? 'john/keywords' : 'john/ads';
    return;
  }
  if (actionButton.dataset.johnAction === 'diagnose') {
    showToast('John 已生成 3 条投流优化建议');
    return;
  }
  if (actionButton.dataset.johnAction === 'refresh') {
    showToast('John 已刷新投流提醒');
    return;
  }
  showToast(`已记录「${actionButton.textContent.trim()}」动作`);
});

function filterJohnKeywords() {
  const type = document.querySelector('[data-john-keyword-tab].active')?.dataset.johnKeywordTab || 'keyword';
  const ad = document.querySelector('#johnKeywordAdFilter')?.value || 'all';
  document.querySelectorAll('#johnKeywordRows tr').forEach(row => {
    const typeMatch = row.dataset.keywordType === type;
    const adMatch = ad === 'all' || row.dataset.adName === ad;
    row.hidden = !(typeMatch && adMatch);
  });
}

document.querySelectorAll('[data-john-keyword-tab]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-john-keyword-tab]').forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', String(active));
    });
    filterJohnKeywords();
  });
});

document.querySelector('#johnKeywordAdFilter')?.addEventListener('change', filterJohnKeywords);

document.querySelectorAll('[data-john-back]').forEach(button => {
  button.addEventListener('click', () => {
    window.location.hash = 'john';
  });
});

document.querySelector('#johnAdsPage')?.addEventListener('click', event => {
  const button = event.target.closest('[data-john-ad-action]');
  if (!button) return;
  const adName = button.closest('tr')?.querySelector('strong')?.textContent || '广告';
  const actionMap = { pause: '暂停', enable: '启用', edit: '编辑' };
  showToast(`正在${actionMap[button.dataset.johnAdAction]}「${adName}」`);
});

document.querySelector('#johnKeywordsPage')?.addEventListener('click', event => {
  const button = event.target.closest('[data-john-keyword-action]');
  if (!button) return;
  const keyword = button.closest('tr')?.querySelector('strong')?.textContent || '关键词';
  const actionMap = { pause: '停用', enable: '启用', delete: '删除' };
  showToast(`已${actionMap[button.dataset.johnKeywordAction]}「${keyword}」`);
});

const johnPromptInput = document.querySelector('#johnPromptInput');
const johnComposer = document.querySelector('.john-composer');
const johnPromptSend = document.querySelector('#johnPromptSend');

function updateJohnComposerState() {
  const hasValue = Boolean(johnPromptInput?.value.trim());
  johnComposer?.classList.toggle('has-value', hasValue);
}

johnPromptInput?.addEventListener('input', updateJohnComposerState);
johnPromptSend?.addEventListener('click', () => {
  const prompt = johnPromptInput.value.trim();
  if (!prompt) {
    johnComposer.classList.add('is-shaking');
    johnPromptInput.focus();
    window.setTimeout(() => johnComposer.classList.remove('is-shaking'), 300);
    return;
  }
  showToast('John 已收到投流分析诉求，正在生成优化建议');
});
updateJohnComposerState();

const lucasState = {
  assets: []
};

function getLucasRows() {
  return Array.from(document.querySelectorAll('#lucasCheckList [data-lucas-module]'));
}

function updateLucasProgress() {
  const rows = getLucasRows();
  const passed = rows.filter(row => row.classList.contains('is-passed')).length;
  const total = rows.length || 4;
  document.querySelector('#lucasPassedCount').textContent = String(passed);
  document.querySelector('#lucasProgressBar').style.width = `${Math.round((passed / total) * 100)}%`;
  document.querySelector('#lucasProgressCopy').textContent = passed === total
    ? '4 个模块已通过，可以生成网站草稿。'
    : `还有 ${total - passed} 个模块未通过，生成前建议先补齐。`;
  document.querySelector('#lucasPreviewStatus').textContent = passed === total ? '可生成' : '等待资料';
}

function completeLucasModule(row) {
  if (!row || row.classList.contains('is-passed')) return;
  const moduleName = row.dataset.lucasModule;
  row.classList.add('is-passed');
  row.querySelector('button').classList.remove('needed');
  row.querySelector('button').textContent = '已通过';
  showToast(`已补齐「${moduleName}」`);
  updateLucasProgress();
}

function addLucasAsset(asset) {
  lucasState.assets.push(asset);
  const list = document.querySelector('#lucasAssetList');
  list.insertAdjacentHTML('afterbegin', `
    <article>
      <span><i data-lucide="file-image"></i>${escapeHTML(asset.name)}</span>
      <strong>${escapeHTML(asset.type)}</strong>
    </article>
  `);
  document.querySelector('#lucasAssetCount').textContent = String(lucasState.assets.length);
  document.querySelector('#lucasAssetSummary span').textContent = '已记录当前 demo 建站素材';
  refreshIcons();
}

function resetLucasMaterialForm() {
  document.querySelector('#lucasMaterialType').value = '';
  document.querySelector('#lucasMaterialFiles').value = '';
  document.querySelector('#lucasFileSummary').textContent = '未选择任何文件';
  document.querySelectorAll('[data-material-type]').forEach(button => button.classList.remove('active'));
}

function openLucasMaterialModal() {
  const modal = document.querySelector('#lucasMaterialModal');
  modal.hidden = false;
  document.body.classList.add('modal-open');
  resetLucasMaterialForm();
  refreshIcons();
  window.setTimeout(() => document.querySelector('#lucasMaterialType').focus(), 0);
}

function closeLucasMaterialModal() {
  const modal = document.querySelector('#lucasMaterialModal');
  modal.hidden = true;
  document.body.classList.remove('modal-open');
}

function updateLucasFileSummary() {
  const input = document.querySelector('#lucasMaterialFiles');
  const files = Array.from(input.files || []);
  const summary = document.querySelector('#lucasFileSummary');
  if (!files.length) {
    summary.textContent = '未选择任何文件';
    return;
  }
  summary.textContent = files.length === 1 ? files[0].name : `已选择 ${files.length} 个文件`;
}

function saveLucasMaterials() {
  const typeInput = document.querySelector('#lucasMaterialType');
  const fileInput = document.querySelector('#lucasMaterialFiles');
  const materialType = typeInput.value.trim() || '未分类素材';
  const files = Array.from(fileInput.files || []);
  if (!files.length) {
    showToast('请选择图片文件');
    fileInput.focus();
    return;
  }
  files.forEach(file => {
    addLucasAsset({ name: file.name, type: materialType });
  });
  closeLucasMaterialModal();
  showToast(`已保存 ${files.length} 个「${materialType}」`);
}

function generateLucasSite() {
  const rows = getLucasRows();
  const pendingRows = rows.filter(row => !row.classList.contains('is-passed'));
  if (pendingRows.length) {
    showToast(`还差 ${pendingRows.length} 个资料模块，请先补齐`);
    pendingRows[0].querySelector('button')?.focus();
    return;
  }
  document.querySelector('#lucasPreviewStatus').textContent = '草稿已生成';
  document.querySelector('#lucasPreviewCopy').textContent = '面向海外采购商的专业独立站草稿已生成：首屏突出企业实力、主推产品、认证背书和询盘入口。';
  showToast('Lucas 已生成网站草稿');
}

document.querySelector('#lucasCheckList')?.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  const row = button.closest('[data-lucas-module]');
  if (row.classList.contains('is-passed')) {
    showToast(`「${row.dataset.lucasModule}」已通过`);
    return;
  }
  completeLucasModule(row);
});

document.querySelector('#lucasUploadHero')?.addEventListener('click', openLucasMaterialModal);
document.querySelector('#lucasUploadZone')?.addEventListener('click', openLucasMaterialModal);
document.querySelector('#lucasGenerateSite')?.addEventListener('click', generateLucasSite);
document.querySelector('#lucasOpenKnowledge')?.addEventListener('click', () => {
  showToast('已打开企业知识库资料视图');
});
document.querySelector('#lucasRefreshAudit')?.addEventListener('click', event => {
  const button = event.currentTarget;
  button.classList.add('loading');
  showToast('Lucas 已重新检测知识库资料');
  window.setTimeout(() => button.classList.remove('loading'), 500);
  updateLucasProgress();
});
document.querySelector('#lucasMaterialClose')?.addEventListener('click', closeLucasMaterialModal);
document.querySelector('#lucasMaterialCancel')?.addEventListener('click', closeLucasMaterialModal);
document.querySelector('#lucasMaterialSave')?.addEventListener('click', saveLucasMaterials);
document.querySelector('#lucasMaterialFiles')?.addEventListener('change', updateLucasFileSummary);
document.querySelector('#lucasMaterialModal')?.addEventListener('click', event => {
  if (event.target.id === 'lucasMaterialModal') closeLucasMaterialModal();
});
document.querySelectorAll('[data-material-type]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-material-type]').forEach(item => item.classList.toggle('active', item === button));
    document.querySelector('#lucasMaterialType').value = button.dataset.materialType;
  });
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !document.querySelector('#lucasMaterialModal')?.hidden) {
    closeLucasMaterialModal();
  }
});
updateLucasProgress();

document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', event => {
    const target = item.getAttribute('href');
    if (['#dashboard', '#customers', '#zoe', '#leo', '#lily', '#wendy', '#lucas', '#john'].includes(target)) return;
    event.preventDefault();
    showToast('该模块暂未在本次设计稿中展开', 1800);
  });
});

renderMyStrategies();
renderAgentStrategies();
renderStrategies('news');
updateJohnCampaign();
filterJohnKeywords();
syncWendyAccountSummary();
refreshIcons();
updateLilyRoute();
