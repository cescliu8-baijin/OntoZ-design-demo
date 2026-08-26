// OntoZ root source module.

const wendyPublisher = document.querySelector('#wendyPublisher');
const wendyPlatformField = document.querySelector('#wendyPublishPlatform');
const wendyTimeField = document.querySelector('#wendyPublishTime');
const wendyDateField = document.querySelector('#wendyPublishDate');
const wendyClockField = document.querySelector('#wendyPublishClock');
const wendyDateTimeRow = document.querySelector('#wendyDateTimeRow');
const wendyDatePickerTrigger = document.querySelector('#wendyDatePickerTrigger');
const wendyTimePickerTrigger = document.querySelector('#wendyTimePickerTrigger');
const wendyDatePickerLabel = document.querySelector('#wendyDatePickerLabel');
const wendyTimePickerLabel = document.querySelector('#wendyTimePickerLabel');
const wendyScheduleCalendarTitle = document.querySelector('#wendyScheduleCalendarTitle');
const wendyScheduleCalendarGrid = document.querySelector('#wendyScheduleCalendarGrid');
const wendyScheduleHour = document.querySelector('#wendyScheduleHour');
const wendyScheduleMinute = document.querySelector('#wendyScheduleMinute');
const wendyCopyField = document.querySelector('#wendyPublishCopy');
const wendyPublisherPanel = document.querySelector('#wendyPublisherPanel');
const wendyPublisherTitle = document.querySelector('#wendyPublisherTitle');
const wendyPublisherSubtitle = document.querySelector('#wendyPublisherSubtitle');
const wendyPublisherBody = document.querySelector('#wendyPublisherBody');
const wendyPublisherFooter = document.querySelector('#wendyPublisherFooter');
const wendyPublisherPreview = document.querySelector('#wendyPublisherPreview');
const wendyPublisherMode = document.querySelector('#wendyPublisherMode');
const wendySentPreview = document.querySelector('#wendySentPreview');
const wendyPublisherAvatar = document.querySelector('#wendyPublisherAvatar');
const wendyPublisherPostingTo = document.querySelector('#wendyPublisherPostingTo');
const wendyCalendarRange = document.querySelector('#wendyCalendarRange');
const wendyCalendarHint = document.querySelector('#wendyCalendarHint');
const wendyCalendarShell = document.querySelector('.wendy-calendar-shell');
const wendyCalendarToolbar = document.querySelector('.wendy-calendar-toolbar');
const wendyCalendarSubbar = document.querySelector('.wendy-calendar-subbar');
const wendyMonthGrid = document.querySelector('#wendyMonthGrid');
const wendyStatusList = document.querySelector('#wendyStatusList');
const wendyPromptInput = document.querySelector('#wendyPromptInput');
const wendyPromptSend = document.querySelector('#wendyPromptSend');
const wendyImageInput = document.querySelector('#wendyImageInput');
const wendyAttachImage = document.querySelector('#wendyAttachImage');
const wendyUploadStatus = document.querySelector('#wendyUploadStatus');
const wendyThinkingThread = document.querySelector('#wendyThinkingThread');
const wendyPlanStep = document.querySelector('#wendyPlanStep');
const wendyGeneratePlan = document.querySelector('#wendyGeneratePlan');
const wendyPlanProduct = document.querySelector('#wendyPlanProduct');
const wendyProductPicker = document.querySelector('#wendyProductPicker');
const wendyProductTrigger = document.querySelector('#wendyProductTrigger');
const wendyProductMenu = document.querySelector('#wendyProductMenu');
const wendyProductOptions = document.querySelector('#wendyProductOptions');
const wendyPlanUpload = document.querySelector('#wendyPlanUpload');
const wendyVisualGrid = document.querySelector('#wendyVisualGrid');
const wendyVisualDetailLabel = document.querySelector('#wendyVisualDetailLabel');
const wendyVisualDetailTitle = document.querySelector('#wendyVisualDetailTitle');
const wendyVisualDetailDescription = document.querySelector('#wendyVisualDetailDescription');
const wendyVisualPlatformName = document.querySelector('#wendyVisualPlatformName');
const wendySpecPlatform = document.querySelector('#wendySpecPlatform');
const wendySpecLocations = document.querySelector('#wendySpecLocations');
const wendyImageRatioMenu = document.querySelector('#wendyImageRatioMenu');
const wendyImageRatioLabel = document.querySelector('#wendyImageRatioLabel');
const wendyImageRatioOptions = document.querySelector('#wendyImageRatioOptions');
const wendyLanguageMenu = document.querySelector('#wendyLanguageMenu');
const wendyLanguageLabel = document.querySelector('#wendyLanguageLabel');
const wendyLanguageOptions = document.querySelector('#wendyLanguageOptions');
const wendyLanguageHint = document.querySelector('#wendyLanguageHint');
const wendyMarketingPlan = document.querySelector('#wendyMarketingPlan');
const wendyPosterRequirementsList = document.querySelector('#wendyPosterRequirementsList');
const wendyPosterRequirementCount = document.querySelector('#wendyPosterRequirementCount');
const wendyPosterRequirementsMenu = document.querySelector('#wendyPosterRequirementsMenu');
const wendyGenerationSummary = document.querySelector('#wendyGenerationSummary');
const wendyThinkingCard = document.querySelector('#wendyThinkingCard');
const wendyThinkingSteps = document.querySelector('#wendyThinkingSteps');
const wendyThinkingTitle = document.querySelector('#wendy-thinking-title');
const wendyThinkingToggle = document.querySelector('#wendyThinkingToggle');
const wendyThinkingResult = document.querySelector('#wendyThinkingResult');
const wendyPostPreviews = document.querySelector('#wendyPostPreviews');
const wendySinglePreview = document.querySelector('#wendySinglePreview');
const wendyImageReprompt = document.querySelector('#wendyImageReprompt');
const wendyRegenerateImage = document.querySelector('#wendyRegenerateImage');
const wendyImageRegenerateCount = document.querySelector('#wendyImageRegenerateCount');
const backFromWendyAgent = document.querySelector('#backFromWendyAgent');
const wendyAccountList = document.querySelector('#wendyAccountList');
const wendyAccountsBoundCount = document.querySelector('#wendyAccountsBoundCount');
const wendyAccountsTotalCount = document.querySelector('#wendyAccountsTotalCount');
const wendyAccountsPendingCount = document.querySelector('#wendyAccountsPendingCount');
const wendyHomeAccountCount = document.querySelector('.wendy-account-summary strong');
const wendyHomeAccountStatus = document.querySelector('#wendyHomeAccountStatus');
const wendyPlanOverview = document.querySelector('#wendyPlanOverview');
const wendyPlanOverviewMeta = document.querySelector('#wendyPlanOverviewMeta');
const wendyPlanReadyCount = document.querySelector('#wendyPlanReadyCount');
const wendyStrategyShell = document.querySelector('#wendyStrategyShell');
const wendyStrategyMessages = document.querySelector('#wendyStrategyMessages');
const wendyStrategyInput = document.querySelector('#wendyStrategyInput');
const wendyStrategyDimensionProgress = document.querySelector('#wendyStrategyDimensionProgress');
const wendyStrategyDimensionTitle = document.querySelector('#wendyStrategyDimensionTitle');
const wendyStrategyDimensionBar = document.querySelector('#wendyStrategyDimensionBar');
const wendyStrategyDimensionHint = document.querySelector('#wendyStrategyDimensionHint');
const wendyStrategyDimensionPrevious = document.querySelector('#wendyStrategyDimensionPrevious');
const wendyStrategyDimensionNext = document.querySelector('#wendyStrategyDimensionNext');
const wendyStrategyBriefSummary = document.querySelector('#wendyStrategyBriefSummary');
const wendyStrategyEstimate = document.querySelector('#wendyStrategyEstimate');
const wendyStrategyReviewSubtitle = document.querySelector('#wendyStrategyReviewSubtitle');
const wendyStrategyStats = document.querySelector('#wendyStrategyStats');
const wendyStrategyHeadline = document.querySelector('#wendyStrategyHeadline');
const wendyStrategyNarrative = document.querySelector('#wendyStrategyNarrative');
const wendyStrategyPillars = document.querySelector('#wendyStrategyPillars');
const wendyStrategyChannelRoles = document.querySelector('#wendyStrategyChannelRoles');
const wendyStrategyCalendarCount = document.querySelector('#wendyStrategyCalendarCount');
const wendyStrategyCalendarList = document.querySelector('#wendyStrategyCalendarList');
const wendySamplePlatformLabel = document.querySelector('#wendySamplePlatformLabel');
const wendySamplePostLabel = document.querySelector('#wendySamplePostLabel');
const wendyStrategySamplePreview = document.querySelector('#wendyStrategySamplePreview');
const wendyStrategySampleCopy = document.querySelector('#wendyStrategySampleCopy');
const wendyApproveSampleButton = document.querySelector('#wendyApproveSample');
const wendyStrategyCompleteText = document.querySelector('#wendyStrategyCompleteText');
const wendyStrategyCompleteMetrics = document.querySelector('#wendyStrategyCompleteMetrics');
let wendyThinkingTimer = null;
let wendyImageRegenerateTimer = null;
let wendyProductCatalogs = [];
const WENDY_DEFAULT_PRODUCT_ID = 1593;
const WENDY_DEFAULT_POSTER_IMAGE = 'assets/wendy-pallet-truck/pallet-truck-scenario-quality-4x5.png';
const WENDY_IMAGE_GENERATION_SECONDS = 30;
const WENDY_STRATEGY_LABELS = {
  period: {
    one_week: '未来一周',
    one_month: '未来一个月',
    custom: '自定义 3 周'
  },
  goal: {
    awareness: '提升品牌认知',
    launch: '新品推广',
    leads: '获取 B2B 线索',
    education: '产品教育'
  },
  product: {
    pallet_truck: 'Manual & Electric Pallet Truck',
    brand: 'NOX 企业品牌'
  },
  directions: {
    product_value: '产品价值',
    use_case: '应用场景',
    proof: '客户证明',
    industry: '行业洞察'
  }
};
const WENDY_STRATEGY_DIMENSIONS = [
  { label: '运营周期', hint: '选择计划覆盖时间' },
  { label: '营销目标', hint: '确认本周期主目标' },
  { label: '主推产品', hint: '引用企业知识库资料' },
  { label: '内容方向', hint: '可选择多个方向' },
  { label: '社媒渠道', hint: '可选择多个平台' },
  { label: '发布节奏', hint: '所有平台每周合计' }
];
const WENDY_STRATEGY_CHANNEL_ROLES = {
  LinkedIn: '专业洞察与 B2B 决策证据',
  Instagram: '产品视觉与品牌场景表达',
  TikTok: '短视频演示与真实使用瞬间',
  'YouTube Shorts': '产品知识与场景短视频'
};
const wendyStrategyState = {
  started: false,
  step: 'brief',
  dimensionStep: 0,
  period: 'one_month',
  goal: 'leads',
  product: 'pallet_truck',
  directions: ['product_value', 'use_case'],
  channels: ['LinkedIn', 'Instagram', 'TikTok'],
  cadence: 5,
  messages: [],
  posts: [],
  samplePostId: '',
  sampleCopy: '',
  propagated: false
};
const wendyState = {
  pendingPrompt: '',
  pendingImageCount: 0,
  agentStarted: false,
  planConfirmed: false,
  selectedPlatform: 'LinkedIn',
  selectedProductId: WENDY_DEFAULT_PRODUCT_ID,
  selectedVisual: '冷白商业棚拍',
  selectedRatio: '4:5',
  selectedLanguage: 'en',
  marketingPlan: '',
  marketingPlanInitialized: false,
  selectedPosterRequirements: ['productName', 'sellingPoints', 'certifications', 'scenarios', 'cta'],
  imageRegenerateCount: 0,
  imagePrompt: '',
  isImageRegenerating: false,
  imageGenerationMode: 'initial',
  imageGenerationRemaining: 0,
  previewConfirmed: false,
  selectedSyncPlatforms: [],
  syncPreviewPlatforms: [],
  confirmedSyncPlatforms: [],
  previewDrafts: {},
  calendarView: 'week',
  activePostId: null,
  scheduleMode: 'now',
  schedulePickerMonth: null,
  publisherImage: WENDY_DEFAULT_POSTER_IMAGE,
  publisherTitle: 'Manual & Electric Pallet Truck'
};

const wendySocialIconSources = {
  linkedin: 'assets/LinkedIn.svg',
  instagram: 'assets/Instagram.svg',
  tiktok: 'assets/TikTok.svg',
  youtube: 'assets/YouTube.svg'
};

function getWendySocialIconKey(value = '') {
  const normalized = String(value).toLowerCase();
  if (normalized.includes('linkedin')) return 'linkedin';
  if (normalized.includes('instagram')) return 'instagram';
  if (normalized.includes('tiktok')) return 'tiktok';
  if (normalized.includes('youtube')) return 'youtube';
  return '';
}

function renderWendySocialIcon(value, label = '') {
  const iconKey = getWendySocialIconKey(value);
  if (!iconKey) return renderIcon(value);
  const safeLabel = escapeHTML(label || iconKey);
  return `<img class="wendy-social-icon" data-wendy-social-icon="${iconKey}" src="${wendySocialIconSources[iconKey]}" alt="" aria-hidden="true" loading="lazy" decoding="async" title="${safeLabel}" />`;
}

function getWendyStrategyLabel(group, value) {
  return WENDY_STRATEGY_LABELS[group]?.[value] || String(value || '');
}

function getWendyStrategyWeeks() {
  if (wendyStrategyState.period === 'one_week') return 1;
  if (wendyStrategyState.period === 'custom') return 3;
  return 4;
}

function getWendyStrategyPostCount() {
  return getWendyStrategyWeeks() * Number(wendyStrategyState.cadence || 5);
}

function formatWendyStrategyDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  const weekday = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()];
  return `${date.getMonth() + 1}月${date.getDate()}日 ${weekday} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

function resetWendyStrategyState() {
  Object.assign(wendyStrategyState, {
    started: true,
    step: 'brief',
    dimensionStep: 0,
    period: 'one_month',
    goal: 'leads',
    product: 'pallet_truck',
    directions: ['product_value', 'use_case'],
    channels: ['LinkedIn', 'Instagram', 'TikTok'],
    cadence: 5,
    messages: [],
    posts: [],
    samplePostId: '',
    sampleCopy: '',
    propagated: false
  });
  if (wendyApproveSampleButton) {
    wendyApproveSampleButton.disabled = false;
    wendyApproveSampleButton.removeAttribute('aria-busy');
  }
}

function renderWendyStrategyMessages() {
  if (!wendyStrategyMessages) return;
  const conversation = wendyStrategyState.messages;
  wendyStrategyMessages.hidden = conversation.length === 0;
  wendyStrategyMessages.innerHTML = conversation.map(message => `
    <article class="wendy-strategy-message ${escapeHTML(message.role)}">
      <span class="wendy-strategy-message-avatar" aria-hidden="true">${message.role === 'assistant' ? 'W' : '你'}</span>
      <div><strong>${message.role === 'assistant' ? 'Wendy' : '你'}</strong><p>${escapeHTML(message.text)}</p></div>
    </article>
  `).join('');
  wendyStrategyMessages.scrollTop = wendyStrategyMessages.scrollHeight;
}

function renderWendyStrategyDimensionStep() {
  const total = WENDY_STRATEGY_DIMENSIONS.length;
  const activeIndex = Math.min(total - 1, Math.max(0, Number(wendyStrategyState.dimensionStep) || 0));
  const activeDimension = WENDY_STRATEGY_DIMENSIONS[activeIndex];
  wendyStrategyState.dimensionStep = activeIndex;

  document.querySelectorAll('[data-wendy-strategy-dimension]').forEach(card => {
    card.hidden = Number(card.dataset.wendyStrategyDimension) !== activeIndex;
  });
  if (wendyStrategyDimensionProgress) wendyStrategyDimensionProgress.textContent = `步骤 ${activeIndex + 1}/${total}`;
  if (wendyStrategyDimensionTitle) wendyStrategyDimensionTitle.textContent = activeDimension.label;
  if (wendyStrategyDimensionBar) wendyStrategyDimensionBar.style.width = `${((activeIndex + 1) / total) * 100}%`;
  if (wendyStrategyDimensionHint) wendyStrategyDimensionHint.textContent = activeDimension.hint;
  if (wendyStrategyDimensionPrevious) wendyStrategyDimensionPrevious.hidden = activeIndex === 0;
  if (wendyStrategyDimensionNext) {
    wendyStrategyDimensionNext.innerHTML = activeIndex === total - 1
      ? `完成设置${renderIcon('check')}`
      : `下一步${renderIcon('arrow-right')}`;
  }
  refreshIcons();
}

function moveWendyStrategyDimension(direction) {
  const lastIndex = WENDY_STRATEGY_DIMENSIONS.length - 1;
  if (direction > 0 && wendyStrategyState.dimensionStep === lastIndex) {
    showToast('六项需求已完成，可以生成整期策略');
    document.querySelector('#wendyGenerateStrategy')?.focus({ preventScroll: false });
    return;
  }
  wendyStrategyState.dimensionStep = Math.min(lastIndex, Math.max(0, wendyStrategyState.dimensionStep + direction));
  renderWendyStrategyDimensionStep();
}

function renderWendyStrategySelections() {
  document.querySelectorAll('[data-wendy-strategy-option]').forEach(button => {
    const group = button.dataset.group;
    const value = button.dataset.value;
    const selected = group === 'directions' || group === 'channels'
      ? wendyStrategyState[group].includes(value)
      : String(wendyStrategyState[group]) === value;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
}

function renderWendyStrategyBrief() {
  if (wendyStrategyBriefSummary) {
    const rows = [
      ['calendar-range', '运营周期', getWendyStrategyLabel('period', wendyStrategyState.period)],
      ['target', '营销目标', getWendyStrategyLabel('goal', wendyStrategyState.goal)],
      ['package-search', '主推产品', getWendyStrategyLabel('product', wendyStrategyState.product)],
      ['layout-grid', '内容方向', wendyStrategyState.directions.map(value => getWendyStrategyLabel('directions', value)).join('、')],
      ['share-2', '社媒渠道', wendyStrategyState.channels.join('、')],
      ['gauge', '发布节奏', `所有平台合计每周 ${wendyStrategyState.cadence} 篇`]
    ];
    wendyStrategyBriefSummary.innerHTML = rows.map(([icon, label, value]) => `
      <div><dt>${renderIcon(icon)}<span>${escapeHTML(label)}</span></dt><dd>${escapeHTML(value)}</dd></div>
    `).join('');
  }
  if (wendyStrategyEstimate) {
    wendyStrategyEstimate.textContent = `${getWendyStrategyPostCount()} 篇帖子`;
  }
  renderWendyStrategySelections();
  renderWendyStrategyDimensionStep();
  refreshIcons();
}

function setWendyStrategyOption(group, value, multiple = false) {
  if (!Object.prototype.hasOwnProperty.call(wendyStrategyState, group)) return;
  if (multiple) {
    const current = wendyStrategyState[group];
    const selected = current.includes(value);
    if (selected && current.length === 1) {
      showToast(group === 'channels' ? '至少保留 1 个社媒渠道' : '至少保留 1 个内容方向');
      return;
    }
    wendyStrategyState[group] = selected
      ? current.filter(item => item !== value)
      : [...current, value];
  } else {
    wendyStrategyState[group] = group === 'cadence' ? Number(value) : value;
  }
  renderWendyStrategyBrief();
}

function parseWendyStrategyMessage(message) {
  const text = String(message || '');
  if (/下个月|一个月|月度|未来一个月/.test(text)) wendyStrategyState.period = 'one_month';
  else if (/一周|7\s*天|本周|下周/.test(text)) wendyStrategyState.period = 'one_week';
  else if (/自定义|三周|3\s*周/.test(text)) wendyStrategyState.period = 'custom';

  if (/询盘|线索|获客|客户/.test(text)) wendyStrategyState.goal = 'leads';
  else if (/新品|上市|发布/.test(text)) wendyStrategyState.goal = 'launch';
  else if (/教育|科普|认知产品/.test(text)) wendyStrategyState.goal = 'education';
  else if (/品牌|曝光|认知/.test(text)) wendyStrategyState.goal = 'awareness';

  if (/托盘|搬运车|Pallet/i.test(text)) wendyStrategyState.product = 'pallet_truck';
  else if (/企业品牌|NOX\s*品牌/i.test(text)) wendyStrategyState.product = 'brand';

  const detectedDirections = [];
  if (/卖点|价值|性能|认证/.test(text)) detectedDirections.push('product_value');
  if (/场景|仓储|使用|演示/.test(text)) detectedDirections.push('use_case');
  if (/案例|客户证明|口碑/.test(text)) detectedDirections.push('proof');
  if (/行业|趋势|洞察/.test(text)) detectedDirections.push('industry');
  if (detectedDirections.length) wendyStrategyState.directions = [...new Set(detectedDirections)];

  const detectedChannels = ['LinkedIn', 'Instagram', 'TikTok', 'YouTube Shorts']
    .filter(platform => new RegExp(platform.replace(' ', '\\s*'), 'i').test(text));
  if (detectedChannels.length) wendyStrategyState.channels = detectedChannels;

  const cadenceMatch = text.match(/(?:每周\s*)?(\d+)\s*篇/);
  if (cadenceMatch) wendyStrategyState.cadence = Math.max(1, Math.min(14, Number(cadenceMatch[1])));
}

function submitWendyStrategyMessage() {
  const message = wendyStrategyInput?.value.trim() || '';
  if (!message) {
    wendyStrategyInput?.focus();
    return;
  }
  wendyStrategyState.messages.push({ role: 'user', text: message });
  parseWendyStrategyMessage(message);
  wendyStrategyState.messages.push({
    role: 'assistant',
    text: `已同步到 Brief：${getWendyStrategyLabel('period', wendyStrategyState.period)}，目标为“${getWendyStrategyLabel('goal', wendyStrategyState.goal)}”，覆盖 ${wendyStrategyState.channels.join('、')}，每周 ${wendyStrategyState.cadence} 篇。`
  });
  if (wendyStrategyInput) wendyStrategyInput.value = '';
  renderWendyStrategyMessages();
  renderWendyStrategyBrief();
}

function getWendyStrategyFormat(platform, index) {
  if (platform === 'TikTok' || platform === 'YouTube Shorts') return '视频';
  if (platform === 'LinkedIn' && index % 3 === 2) return '纯文';
  return index % 4 === 3 ? '视频' : '图文';
}

function getWendyStrategyCopy(platform, title, isSample = false) {
  if (isSample && wendyStrategyState.sampleCopy) return wendyStrategyState.sampleCopy;
  if (platform === 'Instagram') {
    return `${title}. Built for busy warehouses that need dependable handling, clear safety standards and lasting value. See the full NOX solution. #Warehouse #MaterialHandling #NOXRobotics`;
  }
  if (platform === 'TikTok') {
    return `${title} — see how dependable material handling keeps a busy warehouse moving. Built for daily work. #WarehouseTok #MaterialHandling`;
  }
  if (platform === 'YouTube Shorts') {
    return `${title} | A quick look at dependable pallet handling for modern warehouse teams. Explore NOX Robotics.`;
  }
  return `${title}. NOX Manual & Electric Pallet Trucks combine 2T / 3T / 5T capacity options, a reinforced steel frame and CE-certified reliability for demanding warehouse operations. Explore the solution and talk to our team.`;
}

function buildWendyStrategyPlan() {
  const weeks = getWendyStrategyWeeks();
  const cadence = Number(wendyStrategyState.cadence || 5);
  const channels = [...wendyStrategyState.channels];
  const directions = [...wendyStrategyState.directions];
  const topicSets = {
    product_value: ['为什么耐用结构决定长期使用成本', '2T / 3T / 5T 载重如何匹配业务', 'CE 认证背后的可靠性标准'],
    use_case: ['忙碌仓库中的高频搬运场景', '从卸货区到货架区的日常效率', '不同仓储动线中的灵活搬运'],
    proof: ['长期客户如何评价稳定性', '真实项目中的交付与使用反馈', '从采购到落地的客户体验'],
    industry: ['仓储自动化之外仍需关注的基本功', '现代仓储团队的设备选择趋势', '降低物料搬运总成本的关键']
  };
  const baseDate = new Date(2026, 6, 13, 9, 30, 0);
  const posts = [];
  for (let weekIndex = 0; weekIndex < weeks; weekIndex += 1) {
    for (let postIndex = 0; postIndex < cadence; postIndex += 1) {
      const absoluteIndex = weekIndex * cadence + postIndex;
      const platform = channels[absoluteIndex % channels.length];
      const direction = directions[absoluteIndex % directions.length];
      const directionTopics = topicSets[direction] || topicSets.product_value;
      const title = directionTopics[(weekIndex + postIndex) % directionTopics.length];
      const date = new Date(baseDate);
      date.setDate(baseDate.getDate() + weekIndex * 7 + Math.floor(postIndex * 7 / cadence));
      date.setHours([9, 11, 13, 15, 16][postIndex % 5], postIndex % 2 ? 0 : 30, 0, 0);
      const isoTime = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}T${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:00`;
      posts.push({
        id: `wendy-v2-${absoluteIndex + 1}`,
        sourceType: 'strategy-v2',
        week: weekIndex + 1,
        platform,
        title,
        time: isoTime,
        format: getWendyStrategyFormat(platform, absoluteIndex),
        direction,
        copy: getWendyStrategyCopy(platform, title),
        hashtags: '#NOXRobotics #Warehouse #MaterialHandling',
        image: WENDY_DEFAULT_POSTER_IMAGE,
        status: 'draft'
      });
    }
  }
  wendyStrategyState.posts = posts;
  const representative = posts.find(post => post.platform === 'LinkedIn') || posts[0];
  wendyStrategyState.samplePostId = representative?.id || '';
  wendyStrategyState.sampleCopy = representative ? getWendyStrategyCopy(representative.platform, representative.title) : '';
}

function getWendyStrategyHeadline() {
  const headlines = {
    awareness: '用一致的专业表达建立 NOX 品牌认知',
    launch: '围绕新品价值组织连续的上市传播节奏',
    leads: '用真实场景与专业证明推动 B2B 询盘',
    education: '用循序渐进的内容降低产品理解门槛'
  };
  return headlines[wendyStrategyState.goal] || headlines.leads;
}

function renderWendyStrategyReview() {
  if (!wendyStrategyState.posts.length) buildWendyStrategyPlan();
  const postCount = wendyStrategyState.posts.length;
  const videoCount = wendyStrategyState.posts.filter(post => post.format === '视频').length;
  const imageCount = wendyStrategyState.posts.filter(post => post.format === '图文').length;
  if (wendyStrategyReviewSubtitle) {
    wendyStrategyReviewSubtitle.textContent = `${getWendyStrategyLabel('period', wendyStrategyState.period)}，覆盖 ${wendyStrategyState.channels.length} 个平台，共 ${postCount} 篇内容。`;
  }
  if (wendyStrategyStats) {
    const stats = [
      ['calendar-days', getWendyStrategyLabel('period', wendyStrategyState.period), '运营周期'],
      ['send', `${postCount} 篇`, `每周 ${wendyStrategyState.cadence} 篇`],
      ['share-2', `${wendyStrategyState.channels.length} 个`, '社媒平台'],
      ['clapperboard', `${videoCount} 视频 · ${imageCount} 图文`, '内容组合']
    ];
    wendyStrategyStats.innerHTML = stats.map(([icon, value, label]) => `
      <article>${renderIcon(icon)}<div><strong>${escapeHTML(value)}</strong><span>${escapeHTML(label)}</span></div></article>
    `).join('');
  }
  if (wendyStrategyHeadline) wendyStrategyHeadline.textContent = getWendyStrategyHeadline();
  if (wendyStrategyNarrative) {
    wendyStrategyNarrative.textContent = `以“${getWendyStrategyLabel('goal', wendyStrategyState.goal)}”为主目标，围绕 ${getWendyStrategyLabel('product', wendyStrategyState.product)}，把专业产品事实拆分为连续、互补且适合不同平台的内容。`;
  }
  if (wendyStrategyPillars) {
    wendyStrategyPillars.innerHTML = wendyStrategyState.directions.map(direction => `<span>${escapeHTML(getWendyStrategyLabel('directions', direction))}</span>`).join('');
  }
  if (wendyStrategyChannelRoles) {
    wendyStrategyChannelRoles.innerHTML = wendyStrategyState.channels.map(platform => `
      <div><span>${renderWendySocialIcon(platform, platform)}</span><p><strong>${escapeHTML(platform)}</strong><small>${escapeHTML(WENDY_STRATEGY_CHANNEL_ROLES[platform] || '平台化内容表达')}</small></p></div>
    `).join('');
  }
  if (wendyStrategyCalendarCount) wendyStrategyCalendarCount.textContent = `${postCount} 篇`;
  if (wendyStrategyCalendarList) {
    wendyStrategyCalendarList.innerHTML = wendyStrategyState.posts.map(post => `
      <article>
        <span class="wendy-strategy-week-tag">第 ${post.week} 周</span>
        <time>${escapeHTML(formatWendyStrategyDate(post.time))}</time>
        <span class="wendy-strategy-calendar-platform">${renderWendySocialIcon(post.platform, post.platform)}${escapeHTML(post.platform)}</span>
        <div><strong>${escapeHTML(post.title)}</strong><small>${escapeHTML(getWendyStrategyLabel('directions', post.direction))}</small></div>
        <span class="wendy-strategy-format">${escapeHTML(post.format)}</span>
      </article>
    `).join('');
  }
}

function renderWendyStrategySample() {
  const post = wendyStrategyState.posts.find(item => item.id === wendyStrategyState.samplePostId) || wendyStrategyState.posts[0];
  if (!post) return;
  if (wendySamplePlatformLabel) wendySamplePlatformLabel.textContent = post.platform;
  if (wendySamplePostLabel) wendySamplePostLabel.textContent = `第 ${wendyStrategyState.posts.indexOf(post) + 1} 篇 · ${getWendyStrategyLabel('directions', post.direction)}`;
  if (wendyStrategySampleCopy) wendyStrategySampleCopy.value = wendyStrategyState.sampleCopy;
  if (wendyStrategySamplePreview) {
    const caption = getWendyPreviewCaptionParts(wendyStrategyState.sampleCopy);
    wendyStrategySamplePreview.innerHTML = post.platform === 'LinkedIn' || post.platform === 'Instagram'
      ? renderWendyNativePost(post.platform, {
          ...caption,
          image: post.image,
          title: post.title,
          time: post.time,
          metrics: { reactions: '—', comments: '—' }
        })
      : `
        <article class="wendy-strategy-short-preview">
          <img src="${escapeHTML(post.image)}" alt="${escapeHTML(post.title)}" />
          <div><span>${renderWendySocialIcon(post.platform, post.platform)}${escapeHTML(post.platform)}</span><p>${escapeHTML(wendyStrategyState.sampleCopy)}</p></div>
        </article>
      `;
  }
}

function syncWendyPlanOverview() {
  if (!wendyPlanOverview) return;
  const activePosts = wendyStrategyState.posts.filter(post => wendyStrategyState.propagated && post.sourceType === 'strategy-v2');
  wendyPlanOverview.hidden = !activePosts.length;
  if (!activePosts.length) return;
  if (wendyPlanOverviewMeta) {
    wendyPlanOverviewMeta.textContent = `${getWendyStrategyWeeks()} 周 · ${wendyStrategyState.channels.length} 个平台 · ${activePosts.length} 篇帖子`;
  }
  if (wendyPlanReadyCount) wendyPlanReadyCount.textContent = String(activePosts.length);
}

function applyWendyStrategyPlan() {
  for (let index = wendyCalendarPosts.length - 1; index >= 0; index -= 1) {
    if (wendyCalendarPosts[index].sourceType === 'strategy-v2') wendyCalendarPosts.splice(index, 1);
  }
  wendyStrategyState.posts.forEach((post, index) => {
    const isSample = post.id === wendyStrategyState.samplePostId;
    wendyCalendarPosts.push({
      ...post,
      copy: getWendyStrategyCopy(post.platform, post.title, isSample),
      id: `${post.id}-${Date.now()}-${index}`
    });
  });
}

function renderWendyStrategyComplete() {
  const posts = wendyStrategyState.posts;
  if (wendyStrategyCompleteText) {
    wendyStrategyCompleteText.textContent = `代表样稿已扩展为 ${posts.length} 篇帖子，覆盖 ${wendyStrategyState.channels.length} 个社媒平台。`;
  }
  if (wendyStrategyCompleteMetrics) {
    const metrics = [
      ['check-circle-2', '1 篇', '已确认样稿'],
      ['panels-top-left', `${wendyStrategyState.channels.length} 个`, '已适配平台'],
      ['files', `${posts.length} 篇`, '已创建草稿']
    ];
    wendyStrategyCompleteMetrics.innerHTML = metrics.map(([icon, value, label]) => `
      <article>${renderIcon(icon)}<strong>${escapeHTML(value)}</strong><span>${escapeHTML(label)}</span></article>
    `).join('');
  }
}

function renderWendyStrategyFlow() {
  if (!wendyStrategyShell) return;
  const steps = ['brief', 'review', 'sample', 'complete'];
  const currentIndex = Math.max(0, steps.indexOf(wendyStrategyState.step));
  wendyStrategyShell.dataset.step = wendyStrategyState.step;
  document.querySelectorAll('[data-wendy-strategy-view]').forEach(view => {
    view.hidden = view.dataset.wendyStrategyView !== wendyStrategyState.step;
  });
  document.querySelectorAll('[data-wendy-strategy-progress]').forEach(item => {
    const itemIndex = steps.indexOf(item.dataset.wendyStrategyProgress);
    item.classList.toggle('active', itemIndex === currentIndex);
    item.classList.toggle('done', itemIndex < currentIndex);
  });
  const pageTitle = document.querySelector('#wendy-agent-title');
  if (pageTitle) {
    pageTitle.textContent = wendyStrategyState.step === 'brief'
      ? '制定周期社媒运营策略'
      : wendyStrategyState.step === 'review'
        ? '确认整期策略与内容日历'
        : wendyStrategyState.step === 'sample'
          ? '确认代表样稿'
          : '整期计划已准备';
  }
  if (wendyStrategyState.step === 'brief') {
    renderWendyStrategyMessages();
    renderWendyStrategyBrief();
  } else if (wendyStrategyState.step === 'review') {
    renderWendyStrategyReview();
  } else if (wendyStrategyState.step === 'sample') {
    renderWendyStrategySample();
  } else {
    renderWendyStrategyComplete();
  }
  refreshIcons();
}

function startWendyStrategy({ reset = true } = {}) {
  if (reset) resetWendyStrategyState();
  else wendyStrategyState.started = true;
  if (window.location.hash === '#wendy/agent') renderWendyStrategyFlow();
  else window.location.hash = 'wendy/agent';
}

function generateWendyStrategy() {
  buildWendyStrategyPlan();
  wendyStrategyState.step = 'review';
  renderWendyStrategyFlow();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function approveWendyStrategySample() {
  if (wendyStrategyState.propagated) return;
  const samplePost = wendyStrategyState.posts.find(post => post.id === wendyStrategyState.samplePostId);
  wendyStrategyState.sampleCopy = wendyStrategySampleCopy?.value.trim() || wendyStrategyState.sampleCopy;
  if (samplePost) samplePost.copy = wendyStrategyState.sampleCopy;

  if (wendyApproveSampleButton) {
    wendyApproveSampleButton.disabled = true;
    wendyApproveSampleButton.setAttribute('aria-busy', 'true');
  }

  try {
    applyWendyStrategyPlan();
  } catch (error) {
    console.error('Failed to apply Wendy strategy plan', error);
    if (wendyApproveSampleButton) {
      wendyApproveSampleButton.disabled = false;
      wendyApproveSampleButton.removeAttribute('aria-busy');
    }
    showToast('计划推广未完成，请重试');
    return;
  }

  wendyStrategyState.propagated = true;
  wendyStrategyState.step = 'complete';
  renderWendyStrategyFlow();

  try {
    renderWendyCalendars();
    syncWendyPlanOverview();
  } catch (error) {
    console.error('Wendy strategy plan was created, but calendar refresh failed', error);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
  showToast(`已将代表样稿推广到 ${wendyStrategyState.posts.length} 篇计划帖子`);
}

function getWendyPostStatus(post) {
  if (!post) return 'draft';
  if (['failed', 'draft', 'published', 'current', 'scheduled'].includes(post.status)) return post.status;
  if (!post.time) return 'draft';
  const publishAt = new Date(post.time);
  if (!Number.isNaN(publishAt.getTime()) && publishAt > wendyToday) return 'scheduled';
  return 'published';
}

function formatWendyDateTime(value, fallback = '未排期') {
  if (!value) return fallback;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return fallback;
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  return `${month}月${day}日 ${hour}:${minute}`;
}

function getWendyPostById(postId) {
  return wendyCalendarPosts.find(post => post.id === postId);
}

function getWendyAccountInfo(platform) {
  const account = wendySocialAccounts.find(item => item.platform === platform);
  return {
    account: account?.account || '@NOXRobotics',
    platform,
    bound: account?.bound !== false
  };
}

function getWendyImageInfo(platform) {
  if (platform.includes('Instagram')) return { label: '轮播图', icon: 'image' };
  return { label: '图文配图', icon: 'image' };
}

function getWendyListActions(status, postId) {
  const safePostId = escapeHTML(postId);
  if (status === 'failed') {
    return `
      <button data-wendy-republish data-wendy-post-id="${safePostId}" type="button">重新发布</button>
      <button class="danger" data-wendy-delete-post data-wendy-post-id="${safePostId}" type="button">删除</button>
    `;
  }
  if (status === 'published') {
    return `
      <button data-wendy-event data-wendy-post-id="${safePostId}" type="button">查看</button>
      <button class="danger" data-wendy-delete-post data-wendy-post-id="${safePostId}" type="button">删除</button>
    `;
  }
  return `
    <button data-wendy-event data-wendy-post-id="${safePostId}" type="button">编辑</button>
    <button class="danger" data-wendy-delete-post data-wendy-post-id="${safePostId}" type="button">删除</button>
  `;
}

function renderWendyEventButton(post) {
  const status = getWendyPostStatus(post);
  const meta = wendyStatusMeta[status] || wendyStatusMeta.draft;
  const safePostId = escapeHTML(post.id);
  const safePlatform = escapeHTML(post.platform);
  const safeTitle = escapeHTML(post.title);
  const safeTime = escapeHTML(post.time || '');
  const safeCopy = escapeHTML(post.copy || '');
  const displayTime = escapeHTML(formatWendyDateTime(post.time, '').split(' ').pop() || '');
  const failure = post.failureReason ? ` data-failure-reason="${escapeHTML(post.failureReason)}"` : '';

  return `
    <button class="wendy-event ${getWendyEventColor(post.platform)} ${escapeHTML(status)}" style="--start: ${getWendyWeekStart(post.time)}; --duration: .86;" data-wendy-event data-wendy-post-id="${safePostId}" data-platform="${safePlatform}" data-time="${safeTime}" data-copy="${safeCopy}" data-status="${escapeHTML(status)}"${failure} type="button">
      ${renderWendySocialIcon(post.platform, post.platform)}
      <span><b>${safePlatform}</b> ${safeTitle}<small>${displayTime} · ${escapeHTML(meta.label)}</small></span>
    </button>
  `;
}

function getWendyWeekStart(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 1;
  return Math.min(12, Math.max(0, date.getHours() + date.getMinutes() / 60 - 8));
}

function renderWendyWeekCalendar() {
  document.querySelectorAll('.wendy-day-column').forEach(column => {
    const dateKey = column.dataset.day;
    const dayPosts = wendyCalendarPosts
      .filter(post => post.time?.startsWith(dateKey))
      .sort((a, b) => String(a.time).localeCompare(String(b.time)));
    column.innerHTML = dayPosts.map(renderWendyEventButton).join('');
  });
}

function renderWendyMonthCalendar() {
  if (!wendyMonthGrid) return;
  const monthPosts = wendyCalendarPosts.filter(post => post.time?.startsWith('2026-07'));
  const leadingDays = [
    { day: 29, muted: true, key: '2026-06-29' },
    { day: 30, muted: true, key: '2026-06-30' }
  ];
  const julyDays = Array.from({ length: 31 }, (_, index) => {
    const day = index + 1;
    return { day, muted: false, key: `2026-07-${String(day).padStart(2, '0')}` };
  });
  const trailingDays = [
    { day: 1, muted: true, key: '2026-08-01' },
    { day: 2, muted: true, key: '2026-08-02' }
  ];

  wendyMonthGrid.innerHTML = [...leadingDays, ...julyDays, ...trailingDays].map(dayInfo => {
    const dayPosts = monthPosts
      .filter(post => post.time?.startsWith(dayInfo.key))
      .sort((a, b) => String(a.time).localeCompare(String(b.time)));
    const classes = [
      'wendy-month-day',
      dayInfo.muted ? 'muted' : '',
      dayInfo.key === '2026-07-14' ? 'today' : ''
    ].filter(Boolean).join(' ');

    return `
      <section class="${classes}" aria-label="${dayInfo.key}">
        <header><strong>${dayInfo.day}</strong>${dayInfo.key === '2026-07-14' ? '<span>今天</span>' : ''}</header>
        <div class="wendy-month-events">
          ${dayPosts.slice(0, 3).map(post => {
            const status = getWendyPostStatus(post);
            const meta = wendyStatusMeta[status] || wendyStatusMeta.draft;
            return `
              <button class="wendy-month-event ${escapeHTML(getWendyEventColor(post.platform))} ${escapeHTML(meta.tone)}" data-wendy-event data-wendy-post-id="${escapeHTML(post.id)}" data-platform="${escapeHTML(post.platform)}" data-time="${escapeHTML(post.time || '')}" data-copy="${escapeHTML(post.copy || '')}" data-status="${escapeHTML(status)}" type="button">
                ${renderWendySocialIcon(post.platform, post.platform)}
                <span>${escapeHTML(formatWendyDateTime(post.time, '').split(' ').pop() || '')} ${escapeHTML(post.title)}</span>
              </button>
            `;
          }).join('')}
          ${dayPosts.length > 3 ? `<span class="wendy-month-more">还有 ${dayPosts.length - 3} 条</span>` : ''}
        </div>
      </section>
    `;
  }).join('');
}

function renderWendyStatusBoard() {
  if (!wendyStatusList) return;
  const statusOrder = { current: 1, scheduled: 2, draft: 3, failed: 4, published: 5 };
  const posts = [...wendyCalendarPosts].sort((a, b) => {
    const statusDiff = (statusOrder[getWendyPostStatus(a)] || 9) - (statusOrder[getWendyPostStatus(b)] || 9);
    if (statusDiff) return statusDiff;
    return String(a.time || '9999').localeCompare(String(b.time || '9999'));
  });

  wendyStatusList.innerHTML = `
    <div class="wendy-list-header" aria-hidden="true">
      <span>推送文案</span>
      <span>素材</span>
      <span>状态 ${renderIcon('chevrons-up-down')}</span>
      <span>账号信息</span>
      <span>操作</span>
    </div>
    ${posts.length ? posts.slice(0, 7).map(post => {
      const status = getWendyPostStatus(post);
      const meta = wendyStatusMeta[status] || wendyStatusMeta.draft;
      const accountInfo = getWendyAccountInfo(post.platform);
      const listAccountName = '@NOXRobotics';
      const imageInfo = getWendyImageInfo(post.platform);
      const timeText = status === 'failed' && post.failureReason
        ? `${formatWendyDateTime(post.time)} · ${post.failureReason}`
        : formatWendyDateTime(post.time);

      return `
        <article class="wendy-list-row ${escapeHTML(meta.tone)}">
          <div class="wendy-list-copy">
            <strong>${escapeHTML(post.title)}</strong>
            <p>${escapeHTML(post.copy)}</p>
          </div>
          <div class="wendy-list-image">
            ${post.image
              ? `<img src="${escapeHTML(post.image)}" alt="${escapeHTML(post.title)} artwork" loading="lazy" decoding="async" />`
              : `<span class="${escapeHTML(getWendyEventColor(post.platform))}" aria-label="${escapeHTML(imageInfo.label)}">${renderWendySocialIcon(imageInfo.icon, imageInfo.label)}</span>`}
          </div>
          <div class="wendy-list-status">
            <span>${renderIcon(meta.icon)}${escapeHTML(meta.label)}</span>
            <small class="${status === 'failed' ? 'wendy-list-failure' : ''}">${escapeHTML(timeText)}</small>
          </div>
          <div class="wendy-list-account">
            <span class="${escapeHTML(getWendyEventColor(post.platform))}">${renderWendySocialIcon(post.platform, post.platform)}</span>
            <div><strong>${escapeHTML(listAccountName)}</strong><small>${escapeHTML(accountInfo.platform)}</small></div>
          </div>
          <div class="wendy-list-actions">
            ${getWendyListActions(status, post.id)}
          </div>
        </article>
      `;
    }).join('') : '<p class="wendy-empty-status">暂无内容</p>'}
    <footer class="wendy-list-pagination" aria-label="列表分页">
      <button type="button" aria-label="上一页"><i data-lucide="chevron-left"></i>Previous</button>
      <button type="button">1</button>
      <button class="active" type="button" aria-current="page">2</button>
      <button type="button">3</button>
      <span><i data-lucide="ellipsis"></i></span>
      <button type="button">Next<i data-lucide="chevron-right"></i></button>
    </footer>
  `;
}

function renderWendyCalendars() {
  renderWendyWeekCalendar();
  renderWendyMonthCalendar();
  renderWendyStatusBoard();
  refreshIcons();
}

function setWendyCalendarView(view) {
  wendyState.calendarView = view;
  if (wendyCalendarShell) wendyCalendarShell.dataset.wendyView = view;
  document.querySelectorAll('[data-wendy-calendar-view]').forEach(button => {
    const active = button.dataset.wendyCalendarView === view;
    button.classList.toggle('active', active);
    button.setAttribute('aria-selected', String(active));
  });
  document.querySelectorAll('[data-wendy-calendar-panel]').forEach(panel => {
    panel.hidden = panel.dataset.wendyCalendarPanel !== view;
  });
  if (wendyCalendarToolbar) wendyCalendarToolbar.hidden = false;
  if (wendyCalendarSubbar) wendyCalendarSubbar.hidden = view === 'list';
  if (wendyCalendarRange) {
    wendyCalendarRange.textContent = view === 'month' ? '2026年7月' : view === 'list' ? '发布列表' : '2026年7月13日 - 19日';
  }
  if (wendyCalendarHint) {
    const hintText = view === 'month'
      ? '月视图汇总 NOX Global Launch 的已发送、当前待发和未来排期。'
      : view === 'list'
        ? '已发送内容打开为成帖预览；当前与未来内容可继续编辑。'
        : 'NOX Global Launch · LinkedIn + Instagram · English only';
    wendyCalendarHint.innerHTML = `${renderIcon('sparkles')}${escapeHTML(hintText)}`;
    refreshIcons();
  }
}

function getWendyPreviewCaptionParts(value = '') {
  const lines = String(value)
    .split(/\n+/)
    .map(line => line.trim())
    .filter(Boolean);
  return {
    copy: lines.filter(line => !line.startsWith('#')).join('\n'),
    hashtags: lines.filter(line => line.startsWith('#')).join(' ')
  };
}

function formatWendyNativeDateTime(value = '') {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Just now';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  }).format(date);
}

function renderWendyNoxAvatar(platform = 'LinkedIn', compact = false) {
  const platformClass = platform.includes('Instagram') ? 'instagram' : 'linkedin';
  return `
    <span class="wendy-nox-avatar ${platformClass} ${compact ? 'compact' : ''}" aria-label="NOX Robotics">
      <span class="wendy-nox-avatar-logo" aria-hidden="true"></span>
    </span>
  `;
}

function renderWendyLinkedInPost({
  copy = '',
  hashtags = '',
  image = WENDY_DEFAULT_POSTER_IMAGE,
  title = 'NOX Robotics',
  time = '',
  metrics = {},
  compact = false
} = {}) {
  const reactions = metrics.reactions || '96';
  const comments = metrics.comments || '18';
  return `
    <article class="wendy-native-post wendy-linkedin-post ${compact ? 'compact' : ''}" aria-label="LinkedIn post preview">
      <header class="wendy-native-post-header">
        ${renderWendyNoxAvatar('LinkedIn', compact)}
        <div class="wendy-native-identity">
          <strong>NOX Robotics</strong>
          <span>${compact ? '2,184 followers' : '2,184 followers · Robotics'}</span>
          <span>${escapeHTML(formatWendyNativeDateTime(time))} · ${renderIcon('globe-2')}</span>
        </div>
        <span class="wendy-native-more" aria-hidden="true">${renderIcon('ellipsis')}</span>
      </header>
      <div class="wendy-linkedin-copy">
        <p>${escapeHTML(copy || 'Your LinkedIn post will appear here.')}</p>
        ${hashtags ? `<p class="wendy-native-hashtags">${escapeHTML(hashtags)}</p>` : ''}
      </div>
      ${image ? `<img class="wendy-native-media" src="${escapeHTML(image)}" alt="${escapeHTML(title)} artwork" />` : ''}
      <div class="wendy-linkedin-engagement">
        <span class="wendy-linkedin-reactions" aria-label="${escapeHTML(reactions)} reactions">
          <i>${renderIcon('thumbs-up')}</i><i>${renderIcon('heart')}</i><i>${renderIcon('lightbulb')}</i>${escapeHTML(reactions)}
        </span>
        <span>${escapeHTML(comments)} comments</span>
      </div>
      <div class="wendy-linkedin-actions" aria-label="LinkedIn post actions">
        <span>${renderIcon('thumbs-up')}Like</span>
        <span>${renderIcon('message-square')}Comment</span>
        <span>${renderIcon('repeat-2')}Repost</span>
        <span>${renderIcon('send')}Send</span>
      </div>
    </article>
  `;
}

function renderWendyInstagramPost({
  copy = '',
  hashtags = '',
  image = WENDY_DEFAULT_POSTER_IMAGE,
  title = 'NOX Robotics',
  time = '',
  metrics = {},
  compact = false
} = {}) {
  const reactions = metrics.reactions || '184';
  const comments = metrics.comments || '27';
  return `
    <article class="wendy-native-post wendy-instagram-post ${compact ? 'compact' : ''}" aria-label="Instagram post preview">
      <header class="wendy-native-post-header">
        ${renderWendyNoxAvatar('Instagram', compact)}
        <div class="wendy-native-identity instagram">
          <strong>nox.robotics ${renderIcon('badge-check')}</strong>
          <span>NOX Robotics</span>
        </div>
        <span class="wendy-native-more" aria-hidden="true">${renderIcon('ellipsis')}</span>
      </header>
      ${image ? `<img class="wendy-native-media" src="${escapeHTML(image)}" alt="${escapeHTML(title)} artwork" />` : ''}
      <div class="wendy-instagram-actions" aria-label="Instagram post actions">
        <span>${renderIcon('heart')}</span>
        <span>${renderIcon('message-circle')}</span>
        <span>${renderIcon('send')}</span>
        <span class="save">${renderIcon('bookmark')}</span>
      </div>
      <div class="wendy-instagram-caption">
        <strong>${escapeHTML(reactions)} likes</strong>
        <p><b>nox.robotics</b> ${escapeHTML(copy || 'Your Instagram caption will appear here.')}</p>
        ${hashtags ? `<p class="wendy-native-hashtags">${escapeHTML(hashtags)}</p>` : ''}
        <span>View all ${escapeHTML(comments)} comments</span>
        <time>${escapeHTML(formatWendyNativeDateTime(time))}</time>
      </div>
    </article>
  `;
}

function renderWendyNativePost(platform, post, compact = false) {
  return platform.includes('Instagram')
    ? renderWendyInstagramPost({ ...post, compact })
    : renderWendyLinkedInPost({ ...post, compact });
}

function syncWendyPublisherPreview() {
  if (!wendyPublisherPreview || !wendyCopyField) return;
  const platform = wendyPlatformField?.value || 'LinkedIn';
  const caption = getWendyPreviewCaptionParts(wendyCopyField.value);
  wendyPublisherPreview.innerHTML = renderWendyNativePost(platform, {
    ...caption,
    image: wendyState.publisherImage,
    title: wendyState.publisherTitle,
    time: wendyTimeField?.value || '',
    metrics: platform.includes('Instagram')
      ? { reactions: '184', comments: '27' }
      : { reactions: '96', comments: '18' }
  }, true);
  refreshIcons();
}

function setWendyPublisherArtwork(image = WENDY_DEFAULT_POSTER_IMAGE, title = 'Manual & Electric Pallet Truck') {
  wendyState.publisherImage = image;
  wendyState.publisherTitle = title;
  syncWendyPublisherPreview();
}

function renderWendySentPreview(post = {}) {
  if (!wendySentPreview) return;
  const platform = post.platform || 'LinkedIn';
  const account = getWendyAccountInfo(platform);
  const stageLabel = post.campaignStage ? `NOX Global Launch · ${post.campaignStage}` : 'NOX Global Launch';
  wendySentPreview.innerHTML = `
    <section class="wendy-native-stage ${platform.includes('Instagram') ? 'instagram' : 'linkedin'}">
      <div class="wendy-native-stage-label">
        <span>${renderWendySocialIcon(platform, platform)}${escapeHTML(platform)} feed preview</span>
        <span>${renderIcon('circle-check-big')}Published as ${escapeHTML(account.account)}</span>
      </div>
      ${renderWendyNativePost(platform, {
        copy: post.copy || '',
        hashtags: post.hashtags || '',
        image: post.image || WENDY_DEFAULT_POSTER_IMAGE,
        title: post.title || 'NOX Robotics',
        time: post.time || '',
        metrics: post.metrics || {}
      })}
      <footer class="wendy-native-stage-footer">
        <span>${escapeHTML(stageLabel)}</span>
        <button class="wendy-secondary" data-wendy-close-publisher type="button">关闭预览</button>
      </footer>
    </section>
  `;
  refreshIcons();
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
  if (wendyHomeAccountStatus) {
    const pendingCount = totalCount - boundCount;
    wendyHomeAccountStatus.textContent = pendingCount
      ? `LinkedIn、Instagram 已绑定，${pendingCount} 个平台未授权`
      : '全部社媒平台均已授权';
  }
}

function renderWendyAccountCard(account) {
  const actionText = account.bound ? '解绑' : '去绑定';
  const status = account.bound
    ? `<span class="wendy-managed-account-status"><i data-lucide="circle-check"></i>已授权</span>`
    : `<span class="wendy-managed-account-status pending"><i data-lucide="circle-alert"></i>未授权</span>`;

  return `
    <article class="wendy-managed-account-card" data-wendy-account-id="${escapeHTML(account.id)}">
      ${status}
      <span class="wendy-managed-account-icon">${renderWendySocialIcon(account.id, account.platform)}</span>
      <strong>${escapeHTML(account.platform)}</strong>
      <button class="wendy-managed-account-action ${account.bound ? 'unbind' : 'bind'}" data-wendy-account-toggle="${escapeHTML(account.id)}" type="button">${actionText}</button>
    </article>
  `;
}

function renderWendyAccounts() {
  if (!wendyAccountList) return;
  wendyAccountList.innerHTML = wendySocialAccounts.map(renderWendyAccountCard).join('');
  syncWendyAccountSummary();
  refreshIcons();
}

function getWendyVisualStyles(platform = wendyState.selectedPlatform) {
  return wendyVisualStylesByPlatform[platform] || wendyVisualStylesByPlatform.LinkedIn;
}

function getWendyGenerationSpec(platform = wendyState.selectedPlatform) {
  return wendyPlatformGenerationSpecs[platform] || wendyPlatformGenerationSpecs.LinkedIn;
}

function getWendyPostLanguage(code = wendyState.selectedLanguage) {
  return wendyPostLanguages.find(language => language.code === code) || wendyPostLanguages[0];
}

function getWendyProducts() {
  return wendyProductCatalogs.flatMap(catalog => (catalog.products || []).map(product => ({
    ...product,
    catalogId: catalog.id,
    catalogName: catalog.catalogName
  })));
}

function getWendySelectedProductRecord() {
  const productId = Number(wendyState.selectedProductId || wendyPlanProduct?.value);
  return getWendyProducts().find(product => product.id === productId) || null;
}

function getWendySelectedProduct() {
  return getWendySelectedProductRecord()?.productName || '未选择商品';
}

function getWendyProductSummary(product) {
  return product?.productSummary || product?.productDescription || '暂无商品简介';
}

function renderWendyProductThumbnail(product) {
  const image = product?.localImage || product?.productImages?.[0];
  return `
    <span class="wendy-product-thumbnail${image ? '' : ' placeholder'}" aria-hidden="true">
      <i data-lucide="package"></i>
      ${image ? `<img data-wendy-product-image src="${escapeHTML(image)}" alt="" loading="lazy" decoding="async" />` : ''}
    </span>
  `;
}

function renderWendyProductSelection() {
  if (!wendyProductTrigger) return;
  const product = getWendySelectedProductRecord();

  if (wendyPlanProduct) wendyPlanProduct.value = product ? String(product.id) : '';
  wendyProductTrigger.innerHTML = product
    ? `
      ${renderWendyProductThumbnail(product)}
      <span class="wendy-product-trigger-copy">
        <strong>${escapeHTML(product.productName)}</strong>
        <small>${escapeHTML(product.catalogName)}</small>
      </span>
      <i class="wendy-product-chevron" data-lucide="chevrons-up-down" aria-hidden="true"></i>
    `
    : `
      <span class="wendy-product-thumbnail placeholder" aria-hidden="true"><i data-lucide="package-search"></i></span>
      <span class="wendy-product-trigger-copy">
        <strong>请选择商品</strong>
        <small>从商品库中选择本次内容引用的产品</small>
      </span>
      <i class="wendy-product-chevron" data-lucide="chevrons-up-down" aria-hidden="true"></i>
    `;
  wendyProductTrigger.setAttribute('aria-label', product ? `已选择 ${product.productName}，点击更换商品` : '请选择商品');
  refreshIcons();
}

function renderWendyProductOptions() {
  if (!wendyProductOptions) return;
  const selectedId = Number(wendyState.selectedProductId);
  const catalogs = wendyProductCatalogs.filter(catalog => Array.isArray(catalog.products) && catalog.products.length);

  if (!catalogs.length) {
    wendyProductOptions.innerHTML = '<div class="wendy-product-status"><span>暂无可选择的商品</span></div>';
    wendyProductOptions.setAttribute('aria-busy', 'false');
    return;
  }

  wendyProductOptions.innerHTML = catalogs.map(catalog => `
    <div class="wendy-product-catalog" role="group" aria-labelledby="wendy-product-catalog-${escapeHTML(catalog.id)}">
      <span class="wendy-product-catalog-title" id="wendy-product-catalog-${escapeHTML(catalog.id)}">${escapeHTML(catalog.catalogName)}</span>
      ${(catalog.products || []).map(product => {
        const selected = product.id === selectedId;
        return `
          <button class="wendy-product-option${selected ? ' selected' : ''}" data-wendy-product-id="${escapeHTML(product.id)}" type="button" role="option" aria-selected="${String(selected)}">
            ${renderWendyProductThumbnail(product)}
            <span class="wendy-product-option-copy">
              <strong>${escapeHTML(product.productName)}</strong>
              <small>${escapeHTML(getWendyProductSummary(product))}</small>
            </span>
            <i class="wendy-product-option-check" data-lucide="check" aria-hidden="true"></i>
          </button>
        `;
      }).join('')}
    </div>
  `).join('');
  wendyProductOptions.setAttribute('aria-busy', 'false');
  refreshIcons();
}

function setWendyProductPickerOpen(open) {
  if (!wendyProductPicker || !wendyProductTrigger || !wendyProductMenu) return;
  wendyProductPicker.classList.toggle('open', open);
  wendyProductTrigger.setAttribute('aria-expanded', String(open));
  wendyProductMenu.hidden = !open;
}

function selectWendyProduct(productId) {
  const product = getWendyProducts().find(item => item.id === Number(productId));
  if (!product) return;
  wendyState.selectedProductId = product.id;
  renderWendyProductSelection();
  renderWendyProductOptions();
  wendyPlanProduct?.dispatchEvent(new Event('change', { bubbles: true }));
  setWendyProductPickerOpen(false);
  wendyProductTrigger?.focus();
}

function loadWendyProducts() {
  if (!wendyProductOptions) return;

  try {
    wendyProductCatalogs = Array.isArray(wendyProductCatalogSource) ? wendyProductCatalogSource : [];
    const products = getWendyProducts();
    if (!products.some(product => product.id === Number(wendyState.selectedProductId))) {
      wendyState.selectedProductId = products.find(product => product.id === WENDY_DEFAULT_PRODUCT_ID)?.id || products[0]?.id || null;
    }
    renderWendyProductSelection();
    renderWendyProductOptions();
  } catch (error) {
    wendyProductOptions.setAttribute('aria-busy', 'false');
    wendyProductOptions.innerHTML = `
      <div class="wendy-product-status error">
        <span>商品信息加载失败，请刷新页面后重试。</span>
        <button class="wendy-product-retry" data-wendy-product-retry type="button">重新加载</button>
      </div>
    `;
  }
}

function getWendyDefaultMarketingPlan() {
  const product = getWendySelectedProductRecord();
  if (!product) return '营销目标产品，凸显企业知识库中已验证的产品认证、核心卖点与应用场景。';
  const verifiedFacts = [product.productSummary, product.productDescription]
    .filter(Boolean)
    .join(' ')
    .slice(0, 220);
  return `营销「${product.productName}」，凸显商品资料中已验证的认证与核心卖点：「${verifiedFacts}」。`;
}

function renderWendyGenerationSettings() {
  const spec = getWendyGenerationSpec();

  if (!spec.ratios.includes(wendyState.selectedRatio)) {
    wendyState.selectedRatio = spec.ratios[0];
  }
  if (!wendyPostLanguages.some(item => item.code === wendyState.selectedLanguage)) {
    wendyState.selectedLanguage = wendyPostLanguages[0].code;
  }
  if (!wendyState.marketingPlanInitialized) {
    wendyState.marketingPlan = getWendyDefaultMarketingPlan();
    wendyState.marketingPlanInitialized = true;
  }
  wendyState.selectedPosterRequirements = wendyState.selectedPosterRequirements.filter(id => (
    wendyPosterRequirements.some(item => item.id === id)
  ));
  if (!wendyState.selectedPosterRequirements.length) {
    wendyState.selectedPosterRequirements = [wendyPosterRequirements[0].id];
  }

  const language = getWendyPostLanguage();

  if (wendySpecPlatform) wendySpecPlatform.textContent = wendyState.selectedPlatform;
  if (wendyVisualPlatformName) wendyVisualPlatformName.textContent = wendyState.selectedPlatform;
  if (wendySpecLocations) {
    wendySpecLocations.textContent = `适用于 ${spec.locations.join('、')}`;
  }
  if (wendyImageRatioLabel) {
    wendyImageRatioLabel.textContent = `图片 ${wendyState.selectedRatio}`;
  }
  if (wendyImageRatioOptions) {
    wendyImageRatioOptions.innerHTML = spec.ratios.map(ratio => {
      const selected = ratio === wendyState.selectedRatio;
      return `<button class="${selected ? 'selected' : ''}" data-wendy-image-ratio="${escapeHTML(ratio)}" type="button" role="option" aria-selected="${String(selected)}"><span>图片 ${escapeHTML(ratio)}</span><small>${selected ? '当前规格' : '选择规格'}</small></button>`;
    }).join('');
  }
  if (wendyLanguageLabel) {
    wendyLanguageLabel.textContent = `${language.name} · ${language.code}`;
  }
  if (wendyLanguageOptions) {
    wendyLanguageOptions.innerHTML = wendyPostLanguages.map(item => {
      const selected = item.code === wendyState.selectedLanguage;
      return `<button class="${selected ? 'selected' : ''}" data-wendy-post-language="${escapeHTML(item.code)}" type="button" role="option" aria-selected="${String(selected)}"><span>${escapeHTML(item.name)}</span><small>${escapeHTML(item.code)}</small></button>`;
    }).join('');
  }
  if (wendyLanguageHint) {
    wendyLanguageHint.textContent = `当前使用${language.name}（${language.code}）生成 Post 文案`;
  }
  if (wendyMarketingPlan && wendyMarketingPlan.value !== wendyState.marketingPlan) {
    wendyMarketingPlan.value = wendyState.marketingPlan;
  }
  if (wendyPosterRequirementsList) {
    wendyPosterRequirementsList.innerHTML = wendyPosterRequirements.map(item => {
      const selected = wendyState.selectedPosterRequirements.includes(item.id);
      return `
        <li>
          <button class="${selected ? 'selected' : ''}" data-wendy-poster-requirement="${escapeHTML(item.id)}" type="button" aria-pressed="${String(selected)}">
            <span class="wendy-poster-check" aria-hidden="true">✓</span>
            <span>${escapeHTML(item.label)}</span>
          </button>
        </li>
      `;
    }).join('');
  }
  if (wendyPosterRequirementCount) {
    wendyPosterRequirementCount.textContent = `${wendyState.selectedPosterRequirements.length} 项`;
  }
  if (wendyGenerationSummary) {
    wendyGenerationSummary.innerHTML = `<strong>预计生成：</strong>1 张 ${escapeHTML(wendyState.selectedPlatform)} 海报（${escapeHTML(wendyState.selectedRatio)}）、1 套${escapeHTML(language.name)} Post 文案，海报保留 ${wendyState.selectedPosterRequirements.length} 项必含信息。`;
  }
}

function renderWendyVisualStyles() {
  const styles = getWendyVisualStyles();
  const selectedStyle = styles.find(style => style.name === wendyState.selectedVisual) || styles[0];

  if (wendyVisualGrid) {
    wendyVisualGrid.innerHTML = styles.map(style => {
      const selected = style.name === selectedStyle.name;
      return `
        <button class="wendy-visual-option${selected ? ' selected' : ''}" data-wendy-agent-visual="${escapeHTML(style.name)}" type="button" aria-pressed="${String(selected)}" aria-label="${escapeHTML(`${style.name}：${style.summary}`)}">
          <span class="wendy-visual-media">
            <img src="${escapeHTML(style.image)}" alt="" loading="lazy" decoding="async" />
            <span class="wendy-visual-check" aria-hidden="true"><i data-lucide="check"></i></span>
          </span>
          <span class="wendy-visual-copy">
            <strong>${escapeHTML(style.name)}</strong>
            <small>${escapeHTML(style.summary)}</small>
          </span>
        </button>
      `;
    }).join('');
  }

  if (wendyVisualDetailLabel) wendyVisualDetailLabel.textContent = `${wendyState.selectedPlatform} 推荐`;
  if (wendyVisualDetailTitle) wendyVisualDetailTitle.textContent = selectedStyle.name;
  if (wendyVisualDetailDescription) wendyVisualDetailDescription.textContent = selectedStyle.description;
}

function syncWendyAgentSelections() {
  document.querySelectorAll('[data-wendy-agent-platform]').forEach(button => {
    const selected = button.dataset.wendyAgentPlatform === wendyState.selectedPlatform;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });

  const styles = getWendyVisualStyles();
  if (!styles.some(style => style.name === wendyState.selectedVisual)) {
    wendyState.selectedVisual = styles[0].name;
  }
  renderWendyGenerationSettings();
  renderWendyVisualStyles();

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
  if (wendyPromptInput && wendyState.pendingPrompt && !wendyPromptInput.value.trim()) {
    wendyPromptInput.value = wendyState.pendingPrompt;
  }
  syncWendyAgentSelections();
  refreshIcons();
}

function hideWendyPlanStep() {
  if (wendyPlanStep) wendyPlanStep.hidden = true;
  if (wendyThinkingThread) wendyThinkingThread.hidden = false;
}

function getWendyThinkingScript() {
  const product = getWendySelectedProductRecord();
  return wendyThinkingScript.map(item => {
    if (item.text.includes('已确认发布平台和内容目标')) {
      return {
        ...item,
        text: `已确认 ${wendyState.selectedPlatform} 为主发布平台${product ? `，引用商品「${product.productName}」` : ''}，正在整理图片规格、语言和视觉风格选项…`
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

function getWendyPreviewConfig(platform = wendyState.selectedPlatform) {
  return wendyPreviewPlatforms[platform] || wendyPreviewPlatforms.LinkedIn;
}

function getWendyPreviewCaption(platform = wendyState.selectedPlatform) {
  const config = getWendyPreviewConfig(platform);
  return wendyLocalizedPostCopy[wendyState.selectedLanguage] || config.caption;
}

function getWendyPosterImage() {
  const product = getWendySelectedProductRecord();
  return product?.posterImage || WENDY_DEFAULT_POSTER_IMAGE;
}

function getWendySyncPlatformOptions() {
  return Object.keys(wendyPreviewPlatforms).filter(platform => platform !== wendyState.selectedPlatform);
}

function resetWendyPreviewDrafts() {
  wendyState.previewDrafts = {};
}

function getWendyPreviewDraft(platform) {
  if (!wendyState.previewDrafts[platform]) {
    const config = getWendyPreviewConfig(platform);
    wendyState.previewDrafts[platform] = {
      caption: getWendyPreviewCaption(platform),
      publishTime: config.timeLabel
    };
  }
  return wendyState.previewDrafts[platform];
}

function updateWendyPreviewDraft(platform, changes) {
  const draft = getWendyPreviewDraft(platform);
  Object.assign(draft, changes);
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
              ${renderWendySocialIcon(platform, platform)}
              <span>${escapeHTML(platform)}</span>
            </button>
          `;
        }).join('')}
      </div>
      <div class="wendy-sync-actions">
        <button class="wendy-sync-confirm" data-wendy-sync-confirm type="button">确认</button>
      </div>
    </section>
  `;
}

function renderWendyPreviewCard(platform, isConfirmed = false) {
  const config = getWendyPreviewConfig(platform);
  const draft = getWendyPreviewDraft(platform);
  const promptNote = wendyState.imagePrompt
    ? `<em>已按修改建议更新：${escapeHTML(wendyState.imagePrompt)}</em>`
    : `<em>${escapeHTML(wendyState.selectedVisual)} · ${escapeHTML(wendyState.selectedRatio)} · ${escapeHTML(getWendyPostLanguage().code)}</em>`;
  const product = getWendySelectedProductRecord();
  const posterImage = getWendyPosterImage();
  const isGenerating = wendyState.isImageRegenerating && platform === wendyState.selectedPlatform;
  const publishTimeOptions = [...new Set([
    config.timeLabel,
    '2026/07/10 09:30',
    '2026/07/10 13:00'
  ])];
  const captionMarkup = isConfirmed
    ? `<p class="wendy-confirmed-caption">${escapeHTML(draft.caption)}</p>`
    : `<textarea rows="8" data-wendy-preview-caption="${escapeHTML(platform)}">${escapeHTML(draft.caption)}</textarea>`;
  const generationTitle = wendyState.imageGenerationMode === 'initial' ? '正在生成海报' : '正在重新生成海报';
  const generationStage = wendyState.imageGenerationRemaining > 20
    ? '正在理解产品与使用场景'
    : wendyState.imageGenerationRemaining > 10
      ? '正在构建画面与认证信息'
      : '正在完成排版与细节';
  const loadingMarkup = isGenerating
    ? `
      <div class="wendy-preview-media-loading" role="status" aria-live="polite">
        <div class="wendy-generation-status">
          <span>${escapeHTML(generationTitle)}</span>
        </div>
        <div class="wendy-generation-dots" aria-hidden="true"></div>
        <p>${escapeHTML(generationStage)}</p>
      </div>
    `
    : '';
  return `
    <article class="wendy-post-preview-card ${isConfirmed ? 'confirmed' : ''} ${isGenerating ? 'is-busy' : ''}" data-preview-platform="${escapeHTML(platform)}" aria-busy="${String(isGenerating)}">
      <header class="wendy-post-preview-top">
        <div class="wendy-preview-account">
          <div class="wendy-preview-avatar ${escapeHTML(config.avatarClass)}">${renderWendySocialIcon(platform, platform)}</div>
          <div><strong>${escapeHTML(config.account)}</strong><span>${escapeHTML(platform)}</span></div>
        </div>
        <label class="wendy-preview-time">
          <span>发布时间</span>
          <select data-wendy-preview-time="${escapeHTML(platform)}" aria-label="${escapeHTML(platform)} 发布时间" ${isConfirmed || isGenerating ? 'disabled' : ''}>
            ${publishTimeOptions.map(time => `<option value="${escapeHTML(time)}" ${draft.publishTime === time ? 'selected' : ''}>${escapeHTML(time)}</option>`).join('')}
          </select>
        </label>
      </header>
      <div class="wendy-post-preview-body">
        <div class="wendy-preview-media ${escapeHTML(config.mediaClass)}" aria-label="${escapeHTML(platform)}素材预览">
          <img src="${escapeHTML(posterImage)}" alt="${escapeHTML(product?.productName || 'Manual & Electric Pallet Truck')} 海报" />
          ${promptNote}
          ${loadingMarkup}
        </div>
        ${isGenerating ? '' : `
          <section class="wendy-caption-card">
            <label>
              <span>推送文案</span>
              ${captionMarkup}
            </label>
          </section>
        `}
      </div>
      <footer class="wendy-post-preview-actions">
        ${isGenerating
          ? `<div class="wendy-generation-footer"><i data-lucide="sparkles"></i><span>生成中</span></div>`
          : isConfirmed
          ? `<div class="wendy-preview-confirmed"><i data-lucide="circle-check-big"></i><span>已确认社媒发布</span></div>`
          : `
            <button data-wendy-preview-save="${escapeHTML(platform)}" type="button"><i data-lucide="save"></i>保存草稿</button>
            <button data-wendy-preview-confirm="${escapeHTML(platform)}" type="button"><i data-lucide="send"></i>发布</button>
          `}
      </footer>
    </article>
  `;
}

function renderWendySinglePreview() {
  if (!wendySinglePreview) return;
  const platform = wendyState.selectedPlatform || 'LinkedIn';
  const syncPreviews = wendyState.syncPreviewPlatforms
    .map(syncPlatform => renderWendyPreviewCard(syncPlatform, wendyState.confirmedSyncPlatforms.includes(syncPlatform)))
    .join('');
  wendySinglePreview.innerHTML = `
    ${renderWendyPreviewCard(platform, wendyState.previewConfirmed)}
    ${wendyState.previewConfirmed && !syncPreviews ? renderWendySyncPrompt() : ''}
    ${syncPreviews}
  `;
  refreshIcons();
}

function setWendyImageRegenerationState(isGenerating, mode = wendyState.imageGenerationMode) {
  wendyState.isImageRegenerating = isGenerating;
  wendyState.imageGenerationMode = mode;
  wendyPostPreviews?.classList.toggle('is-generating', isGenerating);
  if (!wendyRegenerateImage) return;
  const busyLabel = mode === 'initial' ? 'AI 正在生成海报' : 'AI 正在重新生图';
  wendyRegenerateImage.disabled = isGenerating;
  wendyRegenerateImage.classList.toggle('is-generating', isGenerating);
  wendyRegenerateImage.setAttribute('aria-busy', String(isGenerating));
  wendyRegenerateImage.setAttribute('aria-label', isGenerating ? busyLabel : 'AI 重新生图');
}

function resetWendyImageRegeneration() {
  window.clearTimeout(wendyImageRegenerateTimer);
  wendyImageRegenerateTimer = null;
  wendyState.imageGenerationRemaining = 0;
  setWendyImageRegenerationState(false);
}

function startWendyImageGeneration(mode = 'initial', prompt = '') {
  resetWendyImageRegeneration();
  wendyState.imageGenerationRemaining = WENDY_IMAGE_GENERATION_SECONDS;
  setWendyImageRegenerationState(true, mode);
  renderWendySinglePreview();

  wendyImageRegenerateTimer = window.setTimeout(() => {
    wendyState.imageGenerationRemaining = 0;
    wendyImageRegenerateTimer = null;
    if (mode === 'regenerate') {
      wendyState.imageRegenerateCount += 1;
      wendyState.imagePrompt = prompt;
      if (wendyImageRegenerateCount) wendyImageRegenerateCount.textContent = String(wendyState.imageRegenerateCount);
      if (wendyImageReprompt) wendyImageReprompt.value = '';
    }
    setWendyImageRegenerationState(false, mode);
    renderWendySinglePreview();
    showToast(mode === 'regenerate'
      ? `Wendy 已按建议重新生图 ${wendyState.imageRegenerateCount}/8`
      : `已生成 ${wendyState.selectedPlatform} 预览`);
  }, WENDY_IMAGE_GENERATION_SECONDS * 1000);
}

function normalizeWendyDateTime(value = '2026-07-07T10:30:00') {
  const [datePart = '2026-07-07', timePart = '10:30:00'] = String(value).split('T');
  const normalizedTime = timePart.length === 5 ? `${timePart}:00` : timePart.slice(0, 8);
  return { date: datePart, time: normalizedTime || '10:30:00', value: `${datePart}T${normalizedTime || '10:30:00'}` };
}

function getWendyDateFromValue(value) {
  const [year, month, day] = String(value || '').split('-').map(Number);
  if (!year || !month || !day) return new Date(2026, 6, 7);
  return new Date(year, month - 1, day);
}

function getWendyDateValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatWendyPickerDate(value) {
  const date = getWendyDateFromValue(value);
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

function formatWendyPickerTime(value) {
  return String(value || '10:30:00').slice(0, 5);
}

function closeWendySchedulePickers() {
  document.querySelectorAll('[data-wendy-schedule-picker-popover]').forEach(popover => {
    popover.hidden = true;
  });
  document.querySelectorAll('[data-wendy-schedule-picker-trigger]').forEach(trigger => {
    trigger.setAttribute('aria-expanded', 'false');
  });
}

function ensureWendyTimeOptions() {
  if (wendyScheduleHour && !wendyScheduleHour.options.length) {
    wendyScheduleHour.innerHTML = Array.from({ length: 24 }, (_, hour) => {
      const value = String(hour).padStart(2, '0');
      return `<option value="${value}">${value}</option>`;
    }).join('');
  }
  if (wendyScheduleMinute && !wendyScheduleMinute.options.length) {
    wendyScheduleMinute.innerHTML = Array.from({ length: 60 }, (_, minute) => {
      const value = String(minute).padStart(2, '0');
      return `<option value="${value}">${value}</option>`;
    }).join('');
  }
}

function syncWendySchedulePicker() {
  const date = wendyDateField?.value || '2026-07-07';
  const time = wendyClockField?.value || '10:30:00';
  const [hour = '10', minute = '30'] = time.split(':');
  if (wendyDatePickerLabel) wendyDatePickerLabel.textContent = formatWendyPickerDate(date);
  if (wendyTimePickerLabel) wendyTimePickerLabel.textContent = formatWendyPickerTime(time);
  ensureWendyTimeOptions();
  if (wendyScheduleHour) wendyScheduleHour.value = hour;
  if (wendyScheduleMinute) wendyScheduleMinute.value = minute;
  renderWendyScheduleCalendar();
}

function renderWendyScheduleCalendar() {
  if (!wendyScheduleCalendarGrid || !wendyScheduleCalendarTitle) return;
  const selectedDate = getWendyDateFromValue(wendyDateField?.value || '2026-07-07');
  const monthDate = wendyState.schedulePickerMonth || new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = (firstDay.getDay() + 6) % 7;
  const selectedValue = wendyDateField?.value;
  wendyScheduleCalendarTitle.textContent = `${year}年${month + 1}月`;
  const blanks = Array.from({ length: startOffset }, () => '<span class="wendy-picker-calendar-blank" aria-hidden="true"></span>');
  const days = Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1;
    const dateValue = getWendyDateValue(new Date(year, month, day));
    const selected = dateValue === selectedValue ? ' selected' : '';
    return `<button class="wendy-picker-calendar-day${selected}" data-wendy-schedule-date="${dateValue}" type="button" role="gridcell" aria-label="${year}年${month + 1}月${day}日" aria-selected="${dateValue === selectedValue}">${day}</button>`;
  });
  wendyScheduleCalendarGrid.innerHTML = [...blanks, ...days].join('');
}

function setWendyScheduleMode(mode = 'now') {
  const normalizedMode = mode === 'schedule' ? 'schedule' : 'now';
  wendyState.scheduleMode = normalizedMode;
  document.querySelectorAll('[data-wendy-schedule-mode]').forEach(button => {
    const active = button.dataset.wendyScheduleMode === normalizedMode;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  if (wendyDateTimeRow) wendyDateTimeRow.hidden = normalizedMode !== 'schedule';
  if (normalizedMode === 'schedule') {
    wendyState.schedulePickerMonth = new Date(getWendyDateFromValue(wendyDateField?.value));
    syncWendySchedulePicker();
  } else {
    closeWendySchedulePickers();
  }
}

function toggleWendySchedulePicker(type) {
  if (wendyState.scheduleMode !== 'schedule') return;
  const popover = document.querySelector(`[data-wendy-schedule-picker-popover="${type}"]`);
  const trigger = document.querySelector(`[data-wendy-schedule-picker-trigger="${type}"]`);
  if (!popover || !trigger || trigger.disabled) return;
  const shouldOpen = popover.hidden;
  closeWendySchedulePickers();
  popover.hidden = !shouldOpen;
  trigger.setAttribute('aria-expanded', String(shouldOpen));
}

function setWendyPublisherDateTime(value) {
  const dateTime = normalizeWendyDateTime(value);
  if (wendyDateField) wendyDateField.value = dateTime.date;
  if (wendyClockField) wendyClockField.value = dateTime.time;
  if (wendyTimeField) wendyTimeField.value = dateTime.value;
  syncWendySchedulePicker();
}

function getWendyPublisherDateTime() {
  if (wendyState.scheduleMode === 'now') {
    const now = new Date();
    const date = getWendyDateValue(now);
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    const value = `${date}T${time}`;
    if (wendyTimeField) wendyTimeField.value = value;
    return value;
  }
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
    wendyPublisherAvatar.innerHTML = renderWendySocialIcon(platform, platform);
  }
  syncWendyPublisherPreview();
}

function setWendyActiveButton(button, selector) {
  button.closest(selector)?.querySelectorAll('button').forEach(item => item.classList.remove('active', 'selected'));
  button.classList.add(selector.includes('media') ? 'selected' : 'active');
}

function getWendyEventColor(platform) {
  if (platform.includes('LinkedIn')) return 'blue';
  if (platform.includes('Instagram')) return 'pink';
  return 'blue';
}

function setWendyPublisherAccess(status = 'draft', failureReason = '', showMode = true, post = {}) {
  const readOnly = status === 'published';
  wendyPublisherPanel?.classList.toggle('is-readonly', readOnly);
  wendyPublisherPanel?.classList.toggle('is-sent-preview', readOnly);
  if (wendyPublisherBody) wendyPublisherBody.hidden = readOnly;
  if (wendyPublisherFooter) wendyPublisherFooter.hidden = readOnly;
  if (wendySentPreview) wendySentPreview.hidden = !readOnly;
  if (readOnly) renderWendySentPreview(post);

  if (wendyPublisherTitle) {
    wendyPublisherTitle.textContent = readOnly
      ? '已发送内容预览'
      : status === 'current'
        ? '发送前检查'
        : status === 'scheduled'
          ? '编辑排期内容'
          : '快速发布';
  }
  if (wendyPublisherSubtitle) {
    wendyPublisherSubtitle.textContent = readOnly
      ? '按真实社媒成帖样式查看内容与演示数据'
      : status === 'current'
        ? '当前处于发布窗口，确认内容后即可发送'
        : '仅支持 LinkedIn 与 Instagram 英文内容';
  }
  if (wendyPublisherMode) {
    if (showMode) {
      const meta = wendyStatusMeta[status] || wendyStatusMeta.draft;
      const failureMarkup = status === 'failed' && failureReason
        ? `<strong>失败原因：${escapeHTML(failureReason)}</strong>`
        : `<strong>${escapeHTML(meta.hint)}</strong>`;
      wendyPublisherMode.hidden = false;
      wendyPublisherMode.className = `wendy-publisher-mode ${escapeHTML(meta.tone)}`;
      wendyPublisherMode.innerHTML = `
        <span>${renderIcon(meta.icon)}${escapeHTML(meta.label)}</span>
        ${failureMarkup}
      `;
    } else {
      wendyPublisherMode.hidden = true;
      wendyPublisherMode.className = 'wendy-publisher-mode';
      wendyPublisherMode.innerHTML = '';
    }
  }

  [
    wendyCopyField,
    wendyDateField,
    wendyClockField,
    wendyDatePickerTrigger,
    wendyTimePickerTrigger,
    wendyScheduleHour,
    wendyScheduleMinute
  ].forEach(field => {
    if (field) field.disabled = readOnly;
  });

  document.querySelectorAll('.wendy-platform-picker button, .wendy-content-type-grid button, .wendy-media-grid button, .wendy-schedule-tabs button, [data-wendy-schedule-picker-trigger], [data-wendy-schedule-month], .wendy-picker-calendar-day, [data-wendy-generate-caption], [data-wendy-save-draft], [data-wendy-schedule-post]').forEach(control => {
    control.disabled = readOnly;
  });

  const scheduleButton = document.querySelector('[data-wendy-schedule-post]');
  if (scheduleButton) {
    scheduleButton.innerHTML = status === 'failed'
      ? '<i data-lucide="refresh-cw"></i>重新发布'
      : '<i data-lucide="send"></i>发布';
  }
  refreshIcons();
}

function openWendyPublisher({
  platform = 'LinkedIn',
  title = 'Manual & Electric Pallet Truck',
  campaignStage = '',
  time = '2026-07-15T10:30:00',
  copy = '',
  hashtags = '',
  image = '',
  metrics = null,
  status = 'draft',
  postId = null,
  failureReason = '',
  showMode = true
} = {}) {
  if (!wendyPublisher) return;
  wendyState.activePostId = postId;
  wendyPublisher.hidden = false;
  setWendyPublisherPlatform(platform);
  setWendyPublisherDateTime(time || '2026-07-15T10:30:00');
  setWendyScheduleMode(status === 'scheduled' || status === 'failed' ? 'schedule' : 'now');
  if (wendyCopyField) {
    wendyCopyField.value = [copy || wendyLocalizedPostCopy.en, hashtags]
      .filter(Boolean)
      .join('\n\n');
  }
  setWendyPublisherArtwork(image || WENDY_DEFAULT_POSTER_IMAGE, title);
  setWendyPublisherAccess(status, failureReason, showMode, {
    platform,
    title,
    campaignStage,
    time,
    copy,
    hashtags,
    image,
    metrics
  });
  syncWendyPublisherPreview();
  if (status !== 'published') window.setTimeout(() => wendyCopyField?.focus(), 0);
  refreshIcons();
}

function closeWendyPublisher() {
  if (wendyPublisher) wendyPublisher.hidden = true;
  wendyState.activePostId = null;
  closeWendySchedulePickers();
}

function addWendyCalendarPost({ platform, time, copy, isLive = false }) {
  const existingPost = wendyState.activePostId ? getWendyPostById(wendyState.activePostId) : null;
  const nextStatus = isLive ? 'published' : 'scheduled';
  if (existingPost) {
    existingPost.platform = platform;
    existingPost.time = time;
    existingPost.copy = copy;
    existingPost.status = nextStatus;
    existingPost.failureReason = '';
  } else {
    wendyCalendarPosts.push({
      id: `wendy-post-${Date.now()}`,
      platform,
      title: isLive ? `${platform} 刚发布` : `${platform} 已排期`,
      time,
      copy,
      status: nextStatus
    });
  }
  renderWendyCalendars();
}

function saveWendyDraftPost({ platform, copy }) {
  const existingPost = wendyState.activePostId ? getWendyPostById(wendyState.activePostId) : null;
  if (existingPost) {
    existingPost.platform = platform;
    existingPost.time = '';
    existingPost.copy = copy;
    existingPost.status = 'draft';
    existingPost.failureReason = '';
  } else {
    wendyCalendarPosts.push({
      id: `wendy-draft-${Date.now()}`,
      platform,
      title: `${platform} 内容草稿`,
      time: '',
      copy,
      status: 'draft'
    });
  }
  renderWendyCalendars();
}

function resetWendyThinking() {
  window.clearInterval(wendyThinkingTimer);
  wendyThinkingTimer = null;
  resetWendyImageRegeneration();
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
}

function appendWendyThinkingItem(item, index) {
  if (!wendyThinkingSteps) return;
  const node = document.createElement(item.type === 'layer' ? 'p' : 'div');
  node.className = item.type === 'layer' ? 'wendy-thinking-layer' : 'wendy-thinking-line';
  node.textContent = item.text;
  node.style.setProperty('--delay', `${Math.min(index * 20, 180)}ms`);
  wendyThinkingSteps.appendChild(node);
}

function completeWendyThinking(prompt) {
  window.clearInterval(wendyThinkingTimer);
  wendyThinkingTimer = null;
  if (wendyThinkingTitle) wendyThinkingTitle.textContent = 'Wendy 已生成社媒内容建议摘要';
  wendyThinkingCard?.classList.add('done', 'collapsed');
  wendyThinkingToggle?.setAttribute('aria-expanded', 'false');
  syncWendyAgentSelections();
  if (wendyThinkingResult) {
    wendyThinkingResult.hidden = false;
    window.requestAnimationFrame(() => {
      wendyThinkingResult.classList.add('ready');
      wendyThinkingResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
  if (wendyCopyField && prompt) {
    wendyCopyField.value = getWendyPreviewCaption();
  }
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
  resetWendyImageRegeneration();
  wendyState.pendingPrompt = prompt;
  wendyState.pendingImageCount = imageCount;
  wendyState.agentStarted = false;
  wendyState.planConfirmed = false;
  wendyState.selectedPlatform = 'LinkedIn';
  wendyState.selectedProductId = WENDY_DEFAULT_PRODUCT_ID;
  wendyState.selectedVisual = '冷白商业棚拍';
  wendyState.selectedRatio = '4:5';
  wendyState.selectedLanguage = 'en';
  wendyState.marketingPlan = '';
  wendyState.marketingPlanInitialized = false;
  wendyState.selectedPosterRequirements = wendyPosterRequirements.map(item => item.id);
  wendyState.imageRegenerateCount = 0;
  wendyState.imagePrompt = '';
  wendyState.isImageRegenerating = false;
  wendyState.previewConfirmed = false;
  wendyState.selectedSyncPlatforms = [];
  wendyState.syncPreviewPlatforms = [];
  wendyState.confirmedSyncPlatforms = [];
  resetWendyPreviewDrafts();
  if (wendyImageReprompt) wendyImageReprompt.value = '';
  if (wendyImageRegenerateCount) wendyImageRegenerateCount.textContent = '0';
  renderWendyProductSelection();
  renderWendyProductOptions();
  window.location.hash = 'wendy/agent';
}

function startWendyAIGeneration(prompt = '为 Manual & Electric Pallet Truck 生成一条 LinkedIn 新品介绍，突出 2T / 3T / 5T 载重、CE 认证和耐用结构。', imageCount = 0) {
  resetWendyImageRegeneration();
  wendyState.pendingPrompt = prompt;
  wendyState.pendingImageCount = imageCount;
  wendyState.agentStarted = false;
  wendyState.planConfirmed = false;
  wendyState.selectedPlatform = 'LinkedIn';
  wendyState.selectedProductId = WENDY_DEFAULT_PRODUCT_ID;
  wendyState.selectedVisual = '冷白商业棚拍';
  wendyState.selectedRatio = '4:5';
  wendyState.selectedLanguage = 'en';
  wendyState.marketingPlan = '';
  wendyState.marketingPlanInitialized = false;
  wendyState.selectedPosterRequirements = wendyPosterRequirements.map(item => item.id);
  wendyState.imageRegenerateCount = 0;
  wendyState.imagePrompt = '';
  wendyState.isImageRegenerating = false;
  wendyState.previewConfirmed = false;
  wendyState.selectedSyncPlatforms = [];
  wendyState.syncPreviewPlatforms = [];
  wendyState.confirmedSyncPlatforms = [];
  resetWendyPreviewDrafts();
  if (wendyImageReprompt) wendyImageReprompt.value = '';
  if (wendyImageRegenerateCount) wendyImageRegenerateCount.textContent = '0';
  renderWendyProductSelection();
  renderWendyProductOptions();
  window.location.hash = 'wendy/agent';
}

function startWendyThinking() {
  const prompt = wendyState.pendingPrompt || wendyPromptInput?.value.trim() || '';
  const imageCount = wendyState.pendingImageCount || wendyImageInput?.files?.length || 0;
  hideWendyPlanStep();
  resetWendyThinking();
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
  if (!wendyStrategyState.started) resetWendyStrategyState();
  renderWendyStrategyFlow();
}

function showWendyPostPreviews() {
  if (wendyThinkingResult) {
    wendyThinkingResult.classList.remove('ready');
    wendyThinkingResult.hidden = true;
  }
  wendyState.previewConfirmed = false;
  wendyState.selectedSyncPlatforms = [];
  wendyState.syncPreviewPlatforms = [];
  wendyState.confirmedSyncPlatforms = [];
  resetWendyImageRegeneration();
  resetWendyPreviewDrafts();
  if (wendyPostPreviews) {
    wendyPostPreviews.classList.remove('is-confirmed');
    wendyPostPreviews.hidden = false;
    wendyPostPreviews.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  startWendyImageGeneration('initial');
  if (wendyThinkingTitle) wendyThinkingTitle.textContent = 'Wendy 已生成社媒内容建议摘要';
  showToast('Wendy 正在生成海报');
  refreshIcons();
}

function regenerateWendyImage() {
  if (wendyState.previewConfirmed) {
    showToast('已确认的预览不能继续改图');
    return;
  }
  if (wendyState.isImageRegenerating) {
    showToast('图片正在生成，请稍候');
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
  startWendyImageGeneration('regenerate', prompt);
  showToast('Wendy 正在重新生成海报');
}

function confirmWendyPreview(platform) {
  if (wendyState.isImageRegenerating) {
    showToast('图片生成完成后才能发布');
    return;
  }
  if (platform !== wendyState.selectedPlatform && wendyState.syncPreviewPlatforms.includes(platform)) {
    wendyState.confirmedSyncPlatforms = [...new Set([...wendyState.confirmedSyncPlatforms, platform])];
    renderWendySinglePreview();
    showToast(`${platform} 预览已确认`);
    return;
  }
  wendyState.previewConfirmed = true;
  wendyState.selectedSyncPlatforms = [];
  wendyState.syncPreviewPlatforms = [];
  wendyState.confirmedSyncPlatforms = [];
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

function showWendySyncPreviews() {
  if (!wendyState.selectedSyncPlatforms.length) return false;
  wendyState.syncPreviewPlatforms = [...wendyState.selectedSyncPlatforms];
  wendyState.selectedSyncPlatforms = [];
  wendyState.confirmedSyncPlatforms = [];
  renderWendySinglePreview();
  const previews = document.querySelectorAll('.wendy-post-preview-card');
  previews[previews.length - 1]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  showToast(`已生成 ${wendyState.syncPreviewPlatforms.join('、')} 的发布预览`);
  return true;
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

wendyPlanProduct?.addEventListener('change', () => {
  wendyState.marketingPlan = getWendyDefaultMarketingPlan();
  wendyState.marketingPlanInitialized = true;
  renderWendyGenerationSettings();
});

wendyProductPicker?.addEventListener('keydown', event => {
  if (event.key === 'Escape' && wendyProductMenu?.hidden === false) {
    event.preventDefault();
    setWendyProductPickerOpen(false);
    wendyProductTrigger?.focus();
    return;
  }

  if (event.target === wendyProductTrigger && event.key === 'ArrowDown') {
    event.preventDefault();
    setWendyProductPickerOpen(true);
    wendyProductOptions?.querySelector('[data-wendy-product-id]')?.focus();
    return;
  }

  const currentOption = event.target.closest('[data-wendy-product-id]');
  if (!currentOption || !['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
  const options = Array.from(wendyProductOptions?.querySelectorAll('[data-wendy-product-id]') || []);
  const currentIndex = options.indexOf(currentOption);
  if (currentIndex < 0) return;
  event.preventDefault();
  const nextIndex = event.key === 'Home'
    ? 0
    : event.key === 'End'
      ? options.length - 1
      : (currentIndex + (event.key === 'ArrowDown' ? 1 : -1) + options.length) % options.length;
  options[nextIndex]?.focus();
});

wendyMarketingPlan?.addEventListener('input', () => {
  wendyState.marketingPlan = wendyMarketingPlan.value;
  wendyState.marketingPlanInitialized = true;
  wendyMarketingPlan.setAttribute('aria-invalid', 'false');
});

[wendyImageRatioMenu, wendyLanguageMenu, wendyPosterRequirementsMenu].forEach(menu => {
  menu?.addEventListener('toggle', () => {
    if (!menu.open) return;
    [wendyImageRatioMenu, wendyLanguageMenu, wendyPosterRequirementsMenu].forEach(otherMenu => {
      if (otherMenu && otherMenu !== menu) otherMenu.open = false;
    });
  });
});

wendyPromptSend?.addEventListener('click', submitWendyPrompt);

wendyPromptInput?.addEventListener('keydown', event => {
  if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
    event.preventDefault();
    submitWendyPrompt();
  }
});

wendyThinkingToggle?.addEventListener('click', () => {
  const collapsed = wendyThinkingCard?.classList.toggle('collapsed');
  wendyThinkingToggle.setAttribute('aria-expanded', String(!collapsed));
});

backFromWendyAgent?.addEventListener('click', () => {
  window.clearInterval(wendyThinkingTimer);
  wendyThinkingTimer = null;
  resetWendyImageRegeneration();
  window.location.hash = 'wendy';
});

document.querySelector('#wendyPage')?.addEventListener('click', event => {
  const strategyCreateButton = event.target.closest('[data-wendy-strategy-create]');
  if (strategyCreateButton) {
    startWendyStrategy({ reset: true });
    return;
  }

  const activePlanButton = event.target.closest('[data-wendy-open-active-plan]');
  if (activePlanButton) {
    startWendyStrategy({ reset: false });
    return;
  }

  const accountManageButton = event.target.closest('[data-wendy-account-manage]');
  if (accountManageButton) {
    window.location.hash = 'wendy/accounts';
    return;
  }

  const aiGenerateButton = event.target.closest('[data-wendy-ai-generate]');
  if (aiGenerateButton) {
    startWendyAIGeneration();
    return;
  }

  const closeButton = event.target.closest('[data-wendy-close-publisher]');
  if (closeButton) {
    closeWendyPublisher();
    return;
  }

  const openButton = event.target.closest('[data-wendy-open-publisher]');
  if (openButton) {
    openWendyPublisher({ status: 'draft', postId: null, showMode: false });
    return;
  }

  const viewButton = event.target.closest('[data-wendy-calendar-view]');
  if (viewButton) {
    setWendyCalendarView(viewButton.dataset.wendyCalendarView || 'week');
    return;
  }

  const republishButton = event.target.closest('[data-wendy-republish]');
  if (republishButton) {
    const post = getWendyPostById(republishButton.dataset.wendyPostId);
    if (post) {
      openWendyPublisher({
        platform: post.platform,
        title: post.title,
        campaignStage: post.campaignStage,
        time: post.time || '2026-07-15T10:30:00',
        copy: post.copy,
        hashtags: post.hashtags,
        image: post.image,
        metrics: post.metrics,
        status: 'failed',
        postId: post.id,
        failureReason: post.failureReason || '发布失败'
      });
    }
    return;
  }

  const deletePostButton = event.target.closest('[data-wendy-delete-post]');
  if (deletePostButton) {
    const postIndex = wendyCalendarPosts.findIndex(post => post.id === deletePostButton.dataset.wendyPostId);
    if (postIndex >= 0) {
      const [deletedPost] = wendyCalendarPosts.splice(postIndex, 1);
      renderWendyCalendars();
      showToast(`${deletedPost.platform} 内容已删除`);
    }
    return;
  }

  const eventButton = event.target.closest('[data-wendy-event]');
  if (eventButton) {
    const post = getWendyPostById(eventButton.dataset.wendyPostId);
    if (post) {
      const status = getWendyPostStatus(post);
      openWendyPublisher({
        platform: post.platform,
        title: post.title,
        campaignStage: post.campaignStage,
        time: post.time || '2026-07-15T10:30:00',
        copy: post.copy,
        hashtags: post.hashtags,
        image: post.image,
        metrics: post.metrics,
        status,
        postId: post.id,
        failureReason: post.failureReason || ''
      });
      return;
    }
    openWendyPublisher({
      platform: eventButton.dataset.platform || 'LinkedIn',
      time: eventButton.dataset.time || '2026-07-07T09:30',
      copy: eventButton.dataset.copy || '',
      status: eventButton.dataset.status || 'scheduled',
      failureReason: eventButton.dataset.failureReason || ''
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
    setWendyScheduleMode(scheduleModeButton.dataset.wendyScheduleMode);
    return;
  }

  const pickerTrigger = event.target.closest('[data-wendy-schedule-picker-trigger]');
  if (pickerTrigger) {
    toggleWendySchedulePicker(pickerTrigger.dataset.wendySchedulePickerTrigger);
    return;
  }

  const pickerMonthButton = event.target.closest('[data-wendy-schedule-month]');
  if (pickerMonthButton) {
    const current = wendyState.schedulePickerMonth || getWendyDateFromValue(wendyDateField?.value);
    const shift = pickerMonthButton.dataset.wendyScheduleMonth === 'next' ? 1 : -1;
    wendyState.schedulePickerMonth = new Date(current.getFullYear(), current.getMonth() + shift, 1);
    renderWendyScheduleCalendar();
    refreshIcons();
    return;
  }

  const pickerDateButton = event.target.closest('[data-wendy-schedule-date]');
  if (pickerDateButton) {
    if (wendyDateField) wendyDateField.value = pickerDateButton.dataset.wendyScheduleDate;
    syncWendySchedulePicker();
    closeWendySchedulePickers();
    return;
  }

  const generateCaptionButton = event.target.closest('[data-wendy-generate-caption]');
  if (generateCaptionButton) {
    if (wendyCopyField) {
      wendyCopyField.value = wendyLocalizedPostCopy.en;
    }
    syncWendyPublisherPreview();
    showToast('Wendy 已生成 Post 文案');
    return;
  }

  const saveDraftButton = event.target.closest('[data-wendy-save-draft]');
  if (saveDraftButton) {
    const platform = wendyPlatformField?.value || 'LinkedIn';
    const copy = wendyCopyField?.value.trim() || '新的社媒内容';
    saveWendyDraftPost({ platform, copy });
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
    const defaultAccounts = {
      linkedin: '@NOXRobotics',
      instagram: '@nox.robotics',
      tiktok: '@nox.robotics',
      youtube: '@NOXRobotics'
    };
    account.account = defaultAccounts[account.id] || `@nox.${account.id}`;
  }
  renderWendyAccounts();
  showToast(`${account.platform} 已${account.bound ? '绑定' : '解绑'}`);
});

const wendyAgentPage = document.querySelector('#wendyAgentPage');

wendyAgentPage?.addEventListener('input', event => {
  if (event.target === wendyStrategySampleCopy) {
    wendyStrategyState.sampleCopy = wendyStrategySampleCopy.value;
    return;
  }
  const captionField = event.target.closest('[data-wendy-preview-caption]');
  if (!captionField) return;
  updateWendyPreviewDraft(captionField.dataset.wendyPreviewCaption, { caption: captionField.value });
});

wendyStrategyInput?.addEventListener('keydown', event => {
  if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
    event.preventDefault();
    submitWendyStrategyMessage();
  }
});

wendyApproveSampleButton?.addEventListener('click', event => {
  event.preventDefault();
  approveWendyStrategySample();
});

wendyAgentPage?.addEventListener('change', event => {
  const timeField = event.target.closest('[data-wendy-preview-time]');
  if (!timeField) return;
  updateWendyPreviewDraft(timeField.dataset.wendyPreviewTime, { publishTime: timeField.value });
});

wendyAgentPage?.addEventListener('click', event => {
  const strategyResetButton = event.target.closest('[data-wendy-strategy-reset]');
  if (strategyResetButton) {
    resetWendyStrategyState();
    renderWendyStrategyFlow();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const strategyOption = event.target.closest('[data-wendy-strategy-option]');
  if (strategyOption) {
    setWendyStrategyOption(
      strategyOption.dataset.group,
      strategyOption.dataset.value,
      strategyOption.dataset.multi === 'true'
    );
    return;
  }

  const strategyDimensionPrevious = event.target.closest('#wendyStrategyDimensionPrevious');
  if (strategyDimensionPrevious) {
    moveWendyStrategyDimension(-1);
    return;
  }

  const strategyDimensionNext = event.target.closest('#wendyStrategyDimensionNext');
  if (strategyDimensionNext) {
    moveWendyStrategyDimension(1);
    return;
  }

  const strategySendButton = event.target.closest('#wendyStrategySend');
  if (strategySendButton) {
    submitWendyStrategyMessage();
    return;
  }

  const generateStrategyButton = event.target.closest('#wendyGenerateStrategy');
  if (generateStrategyButton) {
    generateWendyStrategy();
    return;
  }

  const strategyBackButton = event.target.closest('[data-wendy-strategy-back]');
  if (strategyBackButton) {
    wendyStrategyState.step = strategyBackButton.dataset.wendyStrategyBack || 'brief';
    renderWendyStrategyFlow();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const confirmStrategyButton = event.target.closest('#wendyConfirmStrategy');
  if (confirmStrategyButton) {
    wendyStrategyState.step = 'sample';
    renderWendyStrategyFlow();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const finishStrategyButton = event.target.closest('#wendyFinishStrategy');
  if (finishStrategyButton) {
    setWendyCalendarView('month');
    window.location.hash = 'wendy';
    return;
  }

  const productTrigger = event.target.closest('#wendyProductTrigger');
  if (productTrigger) {
    setWendyProductPickerOpen(wendyProductMenu?.hidden !== false);
    return;
  }

  const productOption = event.target.closest('[data-wendy-product-id]');
  if (productOption) {
    selectWendyProduct(productOption.dataset.wendyProductId);
    return;
  }

  const productRetry = event.target.closest('[data-wendy-product-retry]');
  if (productRetry) {
    loadWendyProducts();
    return;
  }

  const platformButton = event.target.closest('[data-wendy-agent-platform]');
  if (platformButton) {
    wendyState.selectedPlatform = platformButton.dataset.wendyAgentPlatform || 'LinkedIn';
    wendyState.selectedRatio = getWendyGenerationSpec().ratios[0];
    syncWendyAgentSelections();
    return;
  }

  const ratioButton = event.target.closest('[data-wendy-image-ratio]');
  if (ratioButton) {
    wendyState.selectedRatio = ratioButton.dataset.wendyImageRatio || getWendyGenerationSpec().ratios[0];
    renderWendyGenerationSettings();
    if (wendyImageRatioMenu) wendyImageRatioMenu.open = false;
    return;
  }

  const languageButton = event.target.closest('[data-wendy-post-language]');
  if (languageButton) {
    wendyState.selectedLanguage = languageButton.dataset.wendyPostLanguage || 'en';
    renderWendyGenerationSettings();
    if (wendyLanguageMenu) wendyLanguageMenu.open = false;
    return;
  }

  const posterRequirementButton = event.target.closest('[data-wendy-poster-requirement]');
  if (posterRequirementButton) {
    const requirementId = posterRequirementButton.dataset.wendyPosterRequirement;
    const selected = wendyState.selectedPosterRequirements.includes(requirementId);
    if (selected && wendyState.selectedPosterRequirements.length === 1) {
      showToast('海报必含信息至少保留 1 项');
      return;
    }
    wendyState.selectedPosterRequirements = selected
      ? wendyState.selectedPosterRequirements.filter(id => id !== requirementId)
      : [...wendyState.selectedPosterRequirements, requirementId];
    renderWendyGenerationSettings();
    return;
  }

  const visualButton = event.target.closest('[data-wendy-agent-visual]');
  if (visualButton) {
    wendyState.selectedVisual = visualButton.dataset.wendyAgentVisual || getWendyVisualStyles()[0].name;
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
    const prompt = wendyPromptInput?.value.trim() || wendyState.pendingPrompt || '发布一条新品上市社媒，强调产品价值和独立站访问入口。';
    wendyState.pendingPrompt = prompt;
    wendyState.planConfirmed = true;
    wendyState.agentStarted = false;
    startWendyThinking();
    return;
  }

  const confirmButton = event.target.closest('[data-wendy-agent-confirm]');
  if (confirmButton) {
    const marketingPlan = wendyMarketingPlan?.value.trim() || '';
    if (!marketingPlan) {
      wendyMarketingPlan?.setAttribute('aria-invalid', 'true');
      showToast('请填写营销方案后再生成');
      wendyMarketingPlan?.focus();
      return;
    }
    if (!wendyState.selectedPosterRequirements.length) {
      showToast('请至少选择 1 项海报必含信息');
      return;
    }
    wendyState.marketingPlan = marketingPlan;
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
    if (wendyState.isImageRegenerating) {
      showToast('图片生成完成后才能保存草稿');
      return;
    }
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
    if (!showWendySyncPreviews()) showToast('请先选择需要同步的平台');
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
wendyScheduleHour?.addEventListener('change', () => {
  const minute = wendyScheduleMinute?.value || '00';
  if (wendyClockField) wendyClockField.value = `${wendyScheduleHour.value}:${minute}:00`;
  getWendyPublisherDateTime();
  syncWendySchedulePicker();
});
wendyScheduleMinute?.addEventListener('change', () => {
  const hour = wendyScheduleHour?.value || '00';
  if (wendyClockField) wendyClockField.value = `${hour}:${wendyScheduleMinute.value}:00`;
  getWendyPublisherDateTime();
  syncWendySchedulePicker();
});

document.addEventListener('click', event => {
  if (!event.target.closest('.wendy-picker-field')) closeWendySchedulePickers();
  if (!event.target.closest('.wendy-product-picker')) setWendyProductPickerOpen(false);
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && wendyProductMenu?.hidden === false) {
    setWendyProductPickerOpen(false);
  }
  if (event.key === 'Escape' && !wendyPublisher?.hidden) {
    closeWendyPublisher();
  }
});

document.addEventListener('error', event => {
  if (event.target.matches?.('[data-wendy-product-image]')) event.target.hidden = true;
}, true);

loadWendyProducts();
syncWendyPlanOverview();
