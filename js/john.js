// OntoZ root source module — John advertising agent demo.

const JOHN_CAMPAIGNS_KEY = 'ontoz-john-campaigns-v2';
const JOHN_STATE_KEY = 'ontoz-john-ads-state-v4';
const JOHN_LEGACY_STATE_KEY = 'ontoz-john-ads-state-v3';
const JOHN_SUGGESTIONS_KEY = 'ontoz-john-suggestions-v1';
const johnCountries = [
  { code: 'US', name: '美国', flag: '🇺🇸' },
  { code: 'GB', name: '英国', flag: '🇬🇧' },
  { code: 'DE', name: '德国', flag: '🇩🇪' },
  { code: 'FR', name: '法国', flag: '🇫🇷' },
  { code: 'CA', name: '加拿大', flag: '🇨🇦' },
  { code: 'AU', name: '澳大利亚', flag: '🇦🇺' },
  { code: 'JP', name: '日本', flag: '🇯🇵' },
  { code: 'AE', name: '阿联酋', flag: '🇦🇪' }
];

const johnDefaultCampaigns = [
  {
    id: 'aurora-brand',
    name: 'Aurora Headphones Search Campaign',
    productLine: 'Aurora 降噪耳机',
    domain: 'aurora-audio.com',
    countries: ['US', 'GB'],
    status: 'enabled',
    budget: 120,
    startDate: '2026-06-01',
    endDate: '',
    headlines: ['Premium Noise Cancelling', 'Aurora Wireless Headphones', 'Immersive Sound, All Day'],
    descriptions: ['Advanced noise cancelling headphones with immersive sound and all-day comfort.'],
    keywords: ['noise cancelling headphones', 'wireless headphones supplier', 'premium anc headphones'],
    negativeKeywords: ['used', 'repair', 'free'],
    sitelinks: [{ text: 'Products', url: '/products' }, { text: 'Contact Us', url: '/contact' }],
    callouts: ['Free Shipping', '2-Year Warranty'],
    metrics: { impressions: 16840, clicks: 1048, cost: 2186, conversions: 112 }
  },
  {
    id: 'aurora-remarketing',
    name: 'Aurora Remarketing Search Campaign',
    productLine: 'Aurora 降噪耳机',
    domain: 'aurora-audio.com',
    countries: ['US'],
    status: 'enabled',
    budget: 60,
    startDate: '2026-06-06',
    endDate: '',
    headlines: ['Save $40 On Aurora', 'Hear The Difference Today'],
    descriptions: ['Come back to immersive listening. Order Aurora headphones today and save $40.'],
    keywords: ['aurora headphones offer', 'aurora anc discount'],
    negativeKeywords: ['coupon generator', 'second hand'],
    sitelinks: [{ text: 'Special Offer', url: '/offer' }, { text: 'Reviews', url: '/reviews' }],
    callouts: ['Limited Offer', 'Fast Delivery'],
    metrics: { impressions: 8940, clicks: 682, cost: 1124, conversions: 76 }
  },
  {
    id: 'lumos-search',
    name: 'Lumos Smart Lamp Search Campaign',
    productLine: 'Lumos 智能台灯',
    domain: 'lumos-light.com',
    countries: ['US', 'JP'],
    status: 'paused',
    budget: 80,
    startDate: '2026-06-10',
    endDate: '',
    headlines: ['Smart Light For Better Focus', 'Lumos Eye-Care Desk Lamp'],
    descriptions: ['Flicker-free smart lighting with adaptive brightness for work, study and rest.'],
    keywords: ['smart desk lamp', 'eye care lamp', 'flicker free lighting'],
    negativeKeywords: ['repair', 'used'],
    sitelinks: [{ text: 'Smart Lighting', url: '/smart-lighting' }, { text: 'Support', url: '/support' }],
    callouts: ['Flicker Free', 'Adaptive Light'],
    metrics: { impressions: 11326, clicks: 560, cost: 1532, conversions: 41 }
  }
];

function cloneJohnValue(value) {
  return JSON.parse(JSON.stringify(value));
}

function splitJohnLegacyCampaigns(campaigns) {
  const splitCampaigns = [];
  const ads = [];
  campaigns.forEach(legacy => {
    const {
      headlines = [], descriptions = [], keywords = [], negativeKeywords = [], sitelinks = [], callouts = [],
      ...campaign
    } = legacy;
    splitCampaigns.push({
      ...campaign,
      keywords: normalizeJohnKeywords(keywords),
      negativeKeywords: [...negativeKeywords],
      keywordUpdatedAt: campaign.startDate || johnToday()
    });
    if (headlines.length || descriptions.length || keywords.length || sitelinks.length || callouts.length) {
      ads.push({
        id: `${campaign.id}-legacy-ad`,
        campaignId: campaign.id,
        name: `${campaign.productLine || campaign.name} · 广告 1`,
        status: campaign.status === 'paused' ? 'paused' : 'enabled',
        headlines: [...headlines],
        descriptions: [...descriptions],
        sitelinks: sitelinks.map(normalizeJohnSitelink),
        callouts: [...callouts],
        metrics: cloneJohnValue(campaign.metrics || { impressions: 0, clicks: 0, cost: 0, conversions: 0 }),
        createdAt: campaign.startDate || johnToday(),
        updatedAt: campaign.startDate || johnToday()
      });
    }
  });
  return { version: 4, campaigns: splitCampaigns, ads };
}

function migrateJohnStateToV4(state) {
  const campaigns = cloneJohnValue(state.campaigns || []);
  const ads = cloneJohnValue(state.ads || []);
  campaigns.forEach(campaign => {
    const campaignAds = ads.filter(ad => ad.campaignId === campaign.id);
    const sourceKeywords = [
      ...(campaign.keywords || []),
      ...campaignAds.flatMap(ad => ad.keywords || [])
    ];
    const keywordMap = new Map();
    normalizeJohnKeywords(sourceKeywords).forEach(keyword => {
      const key = keyword.text.trim().toLowerCase();
      if (key && !keywordMap.has(key)) keywordMap.set(key, { text: keyword.text.trim(), group: keyword.group || 'manual' });
    });
    const negativeMap = new Map();
    [...(campaign.negativeKeywords || []), ...campaignAds.flatMap(ad => ad.negativeKeywords || [])].forEach(keyword => {
      const text = String(keyword).trim();
      if (text && !negativeMap.has(text.toLowerCase())) negativeMap.set(text.toLowerCase(), text);
    });
    campaign.keywords = [...keywordMap.values()];
    campaign.negativeKeywords = [...negativeMap.values()];
    campaign.keywordUpdatedAt = campaign.keywordUpdatedAt || campaign.startDate || johnToday();
  });
  const migratedAds = ads.map(ad => {
    const { keywords, negativeKeywords, ...nextAd } = ad;
    return nextAd;
  });
  return { version: 4, campaigns, ads: migratedAds };
}

function loadJohnState() {
  try {
    const savedState = JSON.parse(localStorage.getItem(JOHN_STATE_KEY) || 'null');
    if (savedState?.version === 4 && Array.isArray(savedState.campaigns) && Array.isArray(savedState.ads)) {
      return migrateJohnStateToV4(savedState);
    }
    const legacyState = JSON.parse(localStorage.getItem(JOHN_LEGACY_STATE_KEY) || 'null');
    if (legacyState?.version === 3 && Array.isArray(legacyState.campaigns) && Array.isArray(legacyState.ads)) {
      return migrateJohnStateToV4(legacyState);
    }
    const savedCampaigns = JSON.parse(localStorage.getItem(JOHN_CAMPAIGNS_KEY) || 'null');
    return splitJohnLegacyCampaigns(Array.isArray(savedCampaigns) && savedCampaigns.length ? savedCampaigns : cloneJohnValue(johnDefaultCampaigns));
  } catch {
    return splitJohnLegacyCampaigns(cloneJohnValue(johnDefaultCampaigns));
  }
}

const johnInitialState = loadJohnState();
let johnCampaigns = johnInitialState.campaigns;
let johnAds = johnInitialState.ads;
let johnDashboardMetric = 'impressions';
let johnDashboardRange = 14;
const johnDashboardHiddenCampaigns = new Set();
const johnDashboardLineColors = ['#a855f7', '#22c55e', '#f59e0b', '#ec4899', '#3b82f6', '#8b5cf6', '#ef4444', '#14b8a6'];
const johnDashboardMetricConfigs = [
  { key: 'impressions', label: '展示次数' },
  { key: 'clicks', label: '点击次数' },
  { key: 'cost', label: '费用', money: true },
  { key: 'conversions', label: '转化次数' }
];

function saveJohnCampaigns() {
  localStorage.setItem(JOHN_STATE_KEY, JSON.stringify({ version: 4, campaigns: johnCampaigns, ads: johnAds }));
}

function johnDashboardHash(value) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function johnDashboardRng(seed) {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function johnDashboardSeries(seed, dailyAverage, days) {
  const rng = johnDashboardRng(johnDashboardHash(seed));
  const values = [];
  let momentum = 0;
  for (let index = 0; index < days; index += 1) {
    momentum = momentum * .55 + (rng() - .45) * dailyAverage * .35;
    values.push(Math.max(dailyAverage * .25, dailyAverage + momentum + Math.sin(index / 4 + rng()) * dailyAverage * .12));
  }
  return values;
}

function johnDashboardNiceMax(value) {
  if (value <= 0) return 10;
  const magnitude = 10 ** Math.floor(Math.log10(value));
  const normalized = value / magnitude;
  const step = normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10;
  return step * magnitude;
}

function johnFormatInteger(value) {
  return Math.round(Number(value) || 0).toLocaleString('en-US');
}

function johnFormatPercent(value) {
  return `${((Number(value) || 0) * 100).toFixed(2)}%`;
}

function johnFormatDashboardMetric(key, value) {
  return key === 'cost' ? formatJohnMoney(value, 0) : johnFormatInteger(value);
}

function johnCountryLabels(countries) {
  return (countries || []).map(code => johnCountries.find(country => country.code === code)?.name || code).join('、') || '未设置';
}

function renderJohnPerformanceChart() {
  const chart = document.querySelector('#johnPerformanceChart');
  const legend = document.querySelector('#johnPerformanceLegend');
  const metricSelect = document.querySelector('#johnDashboardMetricSelect');
  if (!chart || !legend) return;
  if (metricSelect) metricSelect.value = johnDashboardMetric;

  const series = johnCampaigns.map((campaign, index) => ({
    campaign,
    color: johnDashboardLineColors[index % johnDashboardLineColors.length],
    values: johnDashboardSeries(
      `${campaign.id}-${johnDashboardMetric}`,
      (Number(campaign.metrics?.[johnDashboardMetric]) || 0) / 7,
      johnDashboardRange
    )
  }));
  const visibleSeries = series.filter(item => !johnDashboardHiddenCampaigns.has(item.campaign.id));

  document.querySelectorAll('[data-john-range]').forEach(button => {
    const active = Number(button.dataset.johnRange) === johnDashboardRange;
    button.classList.toggle('active', active);
    button.setAttribute('aria-selected', String(active));
  });

  const endDate = new Date(2026, 7, 11);
  const dates = Array.from({ length: johnDashboardRange }, (_, index) => {
    const date = new Date(endDate);
    date.setDate(endDate.getDate() - (johnDashboardRange - 1 - index));
    return date;
  });
  const formatDate = date => `${date.getMonth() + 1}月${date.getDate()}日`;
  if (!visibleSeries.length) {
    chart.innerHTML = '<div class="john-performance-empty">至少启用一个 Campaign 图例以查看趋势</div>';
  } else {
    const width = 1080;
    const height = 350;
    const padding = { left: 54, right: 176, top: 24, bottom: 46 };
    const plotWidth = width - padding.left - padding.right;
    const plotHeight = height - padding.top - padding.bottom;
    const maxValue = johnDashboardNiceMax(Math.max(1, ...visibleSeries.flatMap(item => item.values)));
    const x = index => padding.left + (index / Math.max(1, johnDashboardRange - 1)) * plotWidth;
    const y = value => padding.top + plotHeight - (value / maxValue) * plotHeight;
    const config = johnDashboardMetricConfigs.find(metric => metric.key === johnDashboardMetric);
    const tickMarkup = Array.from({ length: 5 }, (_, index) => {
      const value = (maxValue / 4) * index;
      const yPosition = y(value);
      const label = config?.money ? `$${Math.round(value).toLocaleString('en-US')}` : Math.round(value).toLocaleString('en-US');
      return `<g><line class="grid-line" x1="${padding.left}" x2="${width - padding.right}" y1="${yPosition}" y2="${yPosition}"></line><text class="axis-label" x="${padding.left - 9}" y="${yPosition + 4}" text-anchor="end">${label}</text></g>`;
    }).join('');
    const xStep = Math.max(1, Math.ceil(johnDashboardRange / 7));
    const dateMarkup = dates.map((date, index) => {
      if (index % xStep !== 0 && index !== dates.length - 1) return '';
      return `<text class="axis-label" x="${x(index)}" y="${height - 14}" text-anchor="middle">${formatDate(date)}</text>`;
    }).join('');
    const lineMarkup = visibleSeries.map(item => {
      const path = item.values.map((value, index) => `${index === 0 ? 'M' : 'L'} ${x(index).toFixed(2)} ${y(value).toFixed(2)}`).join(' ');
      return `<path class="campaign-line" d="${path}" stroke="${item.color}"></path>`;
    }).join('');
    chart.setAttribute('aria-label', `近 ${johnDashboardRange} 天${config?.label || ''}趋势，共 ${visibleSeries.length} 个 Campaign`);
    chart.innerHTML = `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMinYMin meet" aria-hidden="true">${tickMarkup}${dateMarkup}${lineMarkup}</svg>`;
  }

  legend.innerHTML = series.map(item => {
    const hidden = johnDashboardHiddenCampaigns.has(item.campaign.id);
    return `<button class="${hidden ? 'is-hidden' : ''}" type="button" data-john-dashboard-campaign="${escapeHTML(item.campaign.id)}" aria-pressed="${!hidden}"><i style="background:${hidden ? '#cbd5e1' : item.color}"></i><span>${escapeHTML(item.campaign.name)}</span></button>`;
  }).join('');
}

function renderJohnDashboard() {
  const totals = johnCampaigns.reduce((sum, campaign) => ({
    cost: sum.cost + (Number(campaign.metrics?.cost) || 0),
    impressions: sum.impressions + (Number(campaign.metrics?.impressions) || 0),
    clicks: sum.clicks + (Number(campaign.metrics?.clicks) || 0),
    conversions: sum.conversions + (Number(campaign.metrics?.conversions) || 0)
  }), { cost: 0, impressions: 0, clicks: 0, conversions: 0 });

  const values = {
    cost: formatJohnMoney(totals.cost, 0),
    impressions: johnFormatInteger(totals.impressions),
    clicks: johnFormatInteger(totals.clicks),
    conversions: johnFormatInteger(totals.conversions)
  };
  Object.entries(values).forEach(([key, value]) => {
    const node = document.querySelector(`[data-john-metric="${key}"]`);
    if (node) node.textContent = value;
  });

  const rows = document.querySelector('#johnDashboardCampaignRows');
  if (rows) rows.innerHTML = johnCampaigns.map(campaign => {
    const metrics = campaign.metrics || {};
    const impressions = Number(metrics.impressions) || 0;
    const clicks = Number(metrics.clicks) || 0;
    const cost = Number(metrics.cost) || 0;
    const conversions = Number(metrics.conversions) || 0;
    const ctr = impressions ? clicks / impressions : 0;
    const cpc = clicks ? cost / clicks : 0;
    const conversionRate = clicks ? conversions / clicks : 0;
    const cpa = conversions ? cost / conversions : 0;
    const dateLabel = campaign.endDate ? `${campaign.startDate} 至 ${campaign.endDate}` : `${campaign.startDate || '未设置'} 起持续投放`;
    return `<tr>
      <td><div class="john-dashboard-campaign-name"><i class="${campaign.status === 'paused' ? 'paused' : ''}"></i><strong title="${escapeHTML(campaign.name)}">${escapeHTML(campaign.name)}</strong></div><small>${escapeHTML(dateLabel)}</small></td>
      <td><span class="john-dashboard-product">${escapeHTML(campaign.productLine || '全部内容')}</span></td>
      <td>${escapeHTML(johnCountryLabels(campaign.countries))}</td>
      <td>${formatJohnMoney(campaign.budget, 2)}/天</td>
      <td>${formatJohnMoney(cost, 2)}</td>
      <td>${johnFormatInteger(impressions)}</td>
      <td>${johnFormatInteger(clicks)}</td>
      <td>${johnFormatPercent(ctr)}</td>
      <td>${formatJohnMoney(cpc, 2)}</td>
      <td>${johnFormatInteger(conversions)}</td>
      <td>${johnFormatPercent(conversionRate)}</td>
      <td>${formatJohnMoney(cpa, 2)}</td>
    </tr>`;
  }).join('');

  renderJohnPerformanceChart();
}

function updateJohnCampaign() {
  renderJohnDashboard();
}

function loadJohnSuggestionStates() {
  try {
    return JSON.parse(localStorage.getItem(JOHN_SUGGESTIONS_KEY) || '{}');
  } catch {
    return {};
  }
}

let johnSuggestionStates = loadJohnSuggestionStates();

function renderJohnSuggestionStates() {
  document.querySelectorAll('[data-john-suggestion]').forEach(card => {
    const state = johnSuggestionStates[card.dataset.johnSuggestion];
    card.classList.toggle('is-resolved', Boolean(state));
    const actions = card.querySelector('.john-insight-actions');
    if (actions) actions.dataset.stateLabel = state === 'accepted' ? '已采纳' : state === 'ignored' ? '已忽略' : '';
  });
}

document.querySelector('#johnPage')?.addEventListener('click', event => {
  const rangeButton = event.target.closest('[data-john-range]');
  if (rangeButton) {
    johnDashboardRange = Number(rangeButton.dataset.johnRange);
    renderJohnPerformanceChart();
    return;
  }

  const campaignLegendButton = event.target.closest('[data-john-dashboard-campaign]');
  if (campaignLegendButton) {
    const campaignId = campaignLegendButton.dataset.johnDashboardCampaign;
    if (johnDashboardHiddenCampaigns.has(campaignId)) johnDashboardHiddenCampaigns.delete(campaignId);
    else johnDashboardHiddenCampaigns.add(campaignId);
    renderJohnPerformanceChart();
    return;
  }

  const suggestionButton = event.target.closest('[data-john-suggestion-action]');
  if (suggestionButton) {
    const card = suggestionButton.closest('[data-john-suggestion]');
    const accepted = suggestionButton.dataset.johnSuggestionAction === 'accept';
    johnSuggestionStates[card.dataset.johnSuggestion] = accepted ? 'accepted' : 'ignored';
    localStorage.setItem(JOHN_SUGGESTIONS_KEY, JSON.stringify(johnSuggestionStates));
    renderJohnSuggestionStates();
    showToast(accepted ? 'John 已执行建议并记录到优化历史' : '已忽略，本条建议将不再提醒');
    return;
  }

  const actionButton = event.target.closest('[data-john-action], [data-john-entry]');
  if (!actionButton) return;
  if (actionButton.dataset.johnEntry) {
    window.location.hash = 'john/ads';
    return;
  }
  if (actionButton.dataset.johnAction === 'diagnose') {
    johnSuggestionStates = {};
    localStorage.removeItem(JOHN_SUGGESTIONS_KEY);
    renderJohnSuggestionStates();
    document.querySelector('#johnInsightList')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    showToast('John 已完成诊断，3 条建议已更新');
    return;
  }
  if (actionButton.dataset.johnAction === 'refresh') {
    johnSuggestionStates = {};
    localStorage.removeItem(JOHN_SUGGESTIONS_KEY);
    renderJohnSuggestionStates();
    showToast('John 已刷新投流提醒');
  }
});

document.querySelector('#johnDashboardMetricSelect')?.addEventListener('change', event => {
  johnDashboardMetric = event.currentTarget.value;
  renderJohnPerformanceChart();
});

function formatJohnMoney(value, decimals = 0) {
  return `$${Number(value || 0).toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`;
}

let johnManagementTab = 'campaigns';
let johnRecentlyCreatedAdId = '';

function setJohnManagementTab(tab) {
  johnManagementTab = tab === 'ads' ? 'ads' : 'campaigns';
  document.querySelectorAll('[data-john-management-tab]').forEach(button => {
    const active = button.dataset.johnManagementTab === johnManagementTab;
    button.classList.toggle('active', active);
    button.setAttribute('aria-selected', String(active));
  });
  document.querySelectorAll('[data-john-management-panel]').forEach(panel => {
    panel.hidden = panel.dataset.johnManagementPanel !== johnManagementTab;
  });
}

function johnCampaignAds(campaignId) {
  return johnAds.filter(ad => ad.campaignId === campaignId);
}

function renderJohnAds() {
  const container = document.querySelector('#johnAdList');
  const campaignFilter = document.querySelector('#johnAdCampaignFilter');
  const statusFilter = document.querySelector('#johnAdStatusFilter');
  if (!container || !campaignFilter || !statusFilter) return;
  const previousCampaign = campaignFilter.value;
  campaignFilter.innerHTML = `<option value="all">全部广告系列</option>${johnCampaigns.map(campaign => `<option value="${escapeHTML(campaign.id)}">${escapeHTML(campaign.name)}</option>`).join('')}`;
  campaignFilter.value = johnCampaigns.some(campaign => campaign.id === previousCampaign) ? previousCampaign : 'all';
  const visibleAds = johnAds.filter(ad => (campaignFilter.value === 'all' || ad.campaignId === campaignFilter.value) && (statusFilter.value === 'all' || ad.status === statusFilter.value));
  document.querySelector('#johnAdResultCount').textContent = `共 ${visibleAds.length} 个广告`;
  if (!johnCampaigns.length) {
    container.innerHTML = '<div class="john-campaign-empty"><div><strong>请先创建广告系列</strong><span>从新建广告 AI Flow 配置系列、关键词和首条广告。</span><button type="button" data-john-create-flow data-john-flow-mode="new">开始创建</button></div></div>';
    return;
  }
  if (!visibleAds.length) {
    container.innerHTML = '<div class="john-campaign-empty"><div><strong>还没有符合条件的广告</strong><span>为现有广告系列创建第一个子广告。</span><button type="button" data-john-create-flow data-john-flow-mode="existing">新建广告</button></div></div>';
    return;
  }
  container.innerHTML = `<section class="john-product-card"><header><div><h2>全部广告</h2><p>广告继承所属系列的投放范围与关键词，仅独立维护广告素材。</p></div><span>Google Search</span></header><div class="john-manage-table-wrap"><table class="john-manage-table john-ad-table"><thead><tr><th>广告</th><th>所属广告系列</th><th>状态</th><th>系列关键词</th><th>点击</th><th></th></tr></thead><tbody>${visibleAds.map(ad => {
    const campaign = johnCampaigns.find(item => item.id === ad.campaignId);
    const enabled = ad.status === 'enabled';
    return `<tr class="${ad.id === johnRecentlyCreatedAdId ? 'is-new' : ''}" data-john-ad-id="${escapeHTML(ad.id)}"><td><strong>${escapeHTML(ad.name)}</strong><small>${(ad.headlines || []).length} 条标题 · ${(ad.descriptions || []).length} 条描述</small></td><td><strong class="john-parent-name">${escapeHTML(campaign?.name || '未知广告系列')}</strong><small>${escapeHTML(campaign?.domain || '')}</small></td><td><span class="john-status ${enabled ? 'good' : 'watch'}">${enabled ? '已启用' : '已暂停'}</span></td><td>${(campaign?.keywords || []).length}</td><td>${johnFormatInteger(ad.metrics?.clicks)}</td><td><button data-john-ad-action="edit" type="button">管理素材</button><button data-john-ad-action="${enabled ? 'pause' : 'enable'}" type="button">${enabled ? '暂停' : '启用'}</button></td></tr>`;
  }).join('')}</tbody></table></div></section>`;
}

function renderJohnCampaigns() {
  const container = document.querySelector('#johnCampaignGroups');
  if (!container) return;
  const enabledCount = johnCampaigns.filter(campaign => campaign.status === 'enabled').length;
  document.querySelector('#johnCampaignTotal').textContent = johnCampaigns.length;
  document.querySelector('#johnCampaignEnabled').textContent = enabledCount;
  document.querySelector('#johnCampaignPaused').textContent = johnCampaigns.length - enabledCount;
  document.querySelector('#johnCampaignTabCount').textContent = johnCampaigns.length;
  document.querySelector('#johnAdTabCount').textContent = johnAds.length;

  if (!johnCampaigns.length) {
    container.innerHTML = '<div class="john-campaign-empty"><div><strong>还没有广告系列</strong><span>通过 AI Flow 配置投放范围、关键词和首条广告。</span><button type="button" data-john-create-flow data-john-flow-mode="new">开始创建</button></div></div>';
  } else {
    container.innerHTML = `<section class="john-product-card"><header><div><h2>广告系列</h2><p>系列是广告的父级，统一管理投放范围、预算、排期与关键词。</p></div><span>Google Search</span></header><div class="john-manage-table-wrap"><table class="john-manage-table john-ad-table"><thead><tr><th>广告系列</th><th>状态</th><th>广告数量</th><th>系列关键词</th><th>日预算</th><th>投放国家</th><th></th></tr></thead><tbody>${johnCampaigns.map(campaign => {
      const campaignAds = johnCampaignAds(campaign.id);
      const enabled = campaign.status === 'enabled';
      const statusLabel = campaign.status === 'draft' ? '待添加广告' : enabled ? '投放中' : '已暂停';
      const statusClass = campaign.status === 'draft' ? 'draft' : enabled ? 'good' : 'watch';
      return `<tr data-john-campaign-id="${escapeHTML(campaign.id)}"><td><strong>${escapeHTML(campaign.name)}</strong><small>${escapeHTML(campaign.domain)} · ${escapeHTML(campaign.startDate || '未设置日期')}</small></td><td><span class="john-status ${statusClass}">${statusLabel}</span></td><td><button class="john-child-count" data-john-campaign-action="show-ads" type="button">${campaignAds.length} 个广告</button></td><td>${(campaign.keywords || []).length}</td><td>${formatJohnMoney(campaign.budget)}/天</td><td>${escapeHTML(johnCountryLabels(campaign.countries))}</td><td><button data-john-campaign-action="new-ad" type="button">＋ 创建广告</button><button data-john-campaign-action="${enabled ? 'pause' : 'enable'}" type="button">${enabled ? '暂停' : '启用'}</button><button data-john-campaign-action="edit" type="button">设置</button></td></tr>`;
    }).join('')}</tbody></table></div></section>`;
  }
  renderJohnAds();
  renderJohnDashboard();
  setJohnManagementTab(johnManagementTab);
  refreshIcons();
}

document.querySelectorAll('[data-john-back]').forEach(button => button.addEventListener('click', () => { window.location.hash = 'john'; }));
document.querySelector('#johnAdCampaignFilter')?.addEventListener('change', renderJohnAds);
document.querySelector('#johnAdStatusFilter')?.addEventListener('change', renderJohnAds);

document.querySelector('#johnAdsPage')?.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button.dataset.johnManagementTab) {
    setJohnManagementTab(button.dataset.johnManagementTab);
    return;
  }
  if (button.hasAttribute('data-john-create-flow')) return startJohnCreateFlow({ mode: button.dataset.johnFlowMode || '' });

  if (button.dataset.johnCampaignAction) {
    const campaign = johnCampaigns.find(item => item.id === button.closest('[data-john-campaign-id]')?.dataset.johnCampaignId);
    if (!campaign) return;
    const action = button.dataset.johnCampaignAction;
    if (action === 'edit') return openJohnCampaignSetupDialog(campaign);
    if (action === 'new-ad') return startJohnCreateFlow({ mode: 'existing', campaignId: campaign.id });
    if (action === 'show-ads') {
      setJohnManagementTab('ads');
      const filter = document.querySelector('#johnAdCampaignFilter');
      filter.value = campaign.id;
      renderJohnAds();
      return;
    }
    if (action === 'enable' && !johnCampaignAds(campaign.id).some(ad => ad.status === 'enabled')) {
      showToast('请先为该广告系列创建并启用至少一个广告');
      return;
    }
    campaign.status = action === 'pause' ? 'paused' : 'enabled';
    saveJohnCampaigns();
    renderJohnCampaigns();
    showToast(`已${campaign.status === 'enabled' ? '启用' : '暂停'}「${campaign.name}」`);
    return;
  }

  if (button.dataset.johnAdAction) {
    const ad = johnAds.find(item => item.id === button.closest('[data-john-ad-id]')?.dataset.johnAdId);
    if (!ad) return;
    if (button.dataset.johnAdAction === 'edit') return openJohnAdDialog(ad);
    ad.status = button.dataset.johnAdAction === 'pause' ? 'paused' : 'enabled';
    saveJohnCampaigns();
    renderJohnCampaigns();
    showToast(`已${ad.status === 'enabled' ? '启用' : '暂停'}广告「${ad.name}」`);
  }
});

const johnDialog = document.querySelector('#johnCampaignDialog');
const johnForm = document.querySelector('#johnCampaignForm');
const johnWizardError = document.querySelector('#johnWizardError');
let johnWizardStep = 0;
let johnWizardMaxStep = 0;
let johnEditingAdId = '';
let johnAnalysisRun = 0;
let johnAnalysisStage = -1;
let johnDraft = null;
const johnSitelinkLimit = 6;

function normalizeJohnSitelink(item = {}) {
  return {
    text: item.text || '',
    description1: item.description1 || '',
    description2: item.description2 || '',
    url: item.url || ''
  };
}

function johnToday() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function emptyJohnDraft() {
  return {
    campaignId: '', name: '', domain: '', productLine: '', analyzed: false,
    headlines: [], descriptions: [], keywords: [], negativeKeywords: [],
    sitelinks: [], callouts: []
  };
}

function adToJohnDraft(ad) {
  const campaign = johnCampaigns.find(item => item.id === ad.campaignId);
  return {
    campaignId: ad.campaignId,
    name: ad.name || '',
    domain: campaign?.domain || '',
    productLine: campaign?.productLine || '',
    analyzed: true,
    headlines: (ad.headlines || []).map(text => ({ text, checked: true })),
    descriptions: (ad.descriptions || []).map(text => ({ text, checked: true })),
    keywords: normalizeJohnKeywords(campaign?.keywords || []),
    negativeKeywords: [...(campaign?.negativeKeywords || [])],
    sitelinks: (ad.sitelinks || []).map(normalizeJohnSitelink),
    callouts: (ad.callouts || []).map(text => ({ text, checked: true }))
  };
}

function normalizeJohnDomain(value) {
  return String(value).trim().replace(/^https?:\/\//i, '').replace(/\/.*$/, '');
}

const johnCampaignSetupDialog = document.querySelector('#johnCampaignSetupDialog');
const johnCampaignSetupForm = document.querySelector('#johnCampaignSetupForm');
const johnCampaignError = document.querySelector('#johnCampaignError');
let johnCampaignStep = 0;
let johnEditingCampaignId = '';
let johnCampaignDraft = null;

function emptyJohnCampaignDraft() {
  return { name: '', domain: '', countries: [], productLine: '', startDate: johnToday(), endDate: '', budget: '' };
}

function campaignToSetupDraft(campaign) {
  return {
    name: campaign.name || '', domain: campaign.domain || '', countries: [...(campaign.countries || [])],
    productLine: campaign.productLine === '全部产品' ? '' : campaign.productLine || '', startDate: campaign.startDate || johnToday(),
    endDate: campaign.endDate || '', budget: String(campaign.budget || '')
  };
}

function renderJohnCampaignSetup() {
  document.querySelectorAll('[data-john-campaign-panel]').forEach((panel, index) => {
    panel.hidden = index !== johnCampaignStep;
    panel.classList.toggle('active', index === johnCampaignStep);
  });
  document.querySelectorAll('[data-john-campaign-step]').forEach((button, index) => {
    button.classList.toggle('active', index === johnCampaignStep);
    button.classList.toggle('complete', index < johnCampaignStep || Boolean(johnEditingCampaignId && index !== johnCampaignStep));
    button.disabled = index > johnCampaignStep && !johnEditingCampaignId;
  });
  document.querySelector('#johnCampaignCountryGrid').innerHTML = johnCountries.map(country => `<label><input type="checkbox" value="${country.code}" ${johnCampaignDraft.countries.includes(country.code) ? 'checked' : ''}><span>${country.flag} ${country.code}</span></label>`).join('');
  document.querySelector('#johnCampaignDomain').value = johnCampaignDraft.domain;
  const productSelect = document.querySelector('#johnCampaignProductLine');
  if (johnCampaignDraft.productLine && ![...productSelect.options].some(option => option.value === johnCampaignDraft.productLine)) {
    productSelect.add(new Option(johnCampaignDraft.productLine, johnCampaignDraft.productLine));
  }
  productSelect.value = johnCampaignDraft.productLine;
  document.querySelector('#johnCampaignName').value = johnCampaignDraft.name;
  document.querySelector('#johnCampaignStartDate').value = johnCampaignDraft.startDate;
  document.querySelector('#johnCampaignEndDate').value = johnCampaignDraft.endDate;
  document.querySelector('#johnCampaignBudget').value = johnCampaignDraft.budget;
  document.querySelector('#johnCampaignBack').hidden = johnCampaignStep === 0;
  document.querySelector('#johnCampaignNext').textContent = johnCampaignStep === 1 ? (johnEditingCampaignId ? '保存设置' : '创建广告系列') : '下一步';
  document.querySelector('#johnCampaignProgress').textContent = `第 ${johnCampaignStep + 1} 步，共 2 步`;
  johnCampaignError.hidden = true;
  refreshIcons();
}

function openJohnCampaignSetupDialog(campaign = null) {
  johnEditingCampaignId = campaign?.id || '';
  johnCampaignDraft = campaign ? campaignToSetupDraft(campaign) : emptyJohnCampaignDraft();
  johnCampaignStep = 0;
  document.querySelector('#john-campaign-setup-title').textContent = campaign ? '管理广告系列' : '新建广告系列';
  renderJohnCampaignSetup();
  johnCampaignSetupDialog.showModal();
  document.body.style.overflow = 'hidden';
  window.setTimeout(() => document.querySelector('#johnCampaignDomain')?.focus(), 0);
}

function closeJohnCampaignSetupDialog() {
  johnCampaignSetupDialog.close();
  document.body.style.overflow = '';
}

function setJohnCampaignError(message) {
  johnCampaignError.textContent = message;
  johnCampaignError.hidden = false;
}

function validateJohnCampaignStep() {
  if (johnCampaignStep === 0) {
    if (!normalizeJohnDomain(johnCampaignDraft.domain)) return '请输入独立站域名。';
    if (!johnCampaignDraft.countries.length) return '请至少选择一个投放国家。';
  }
  if (johnCampaignStep === 1) {
    if (!johnCampaignDraft.name.trim()) return '请输入广告系列名称。';
    if (!johnCampaignDraft.startDate) return '请选择投放开始日期。';
    if (johnCampaignDraft.endDate && johnCampaignDraft.endDate < johnCampaignDraft.startDate) return '结束日期不能早于开始日期。';
    if (Number(johnCampaignDraft.budget) < 1) return '请输入大于 0 的日预算。';
  }
  return '';
}

function saveJohnCampaignSetup() {
  const existing = johnCampaigns.find(campaign => campaign.id === johnEditingCampaignId);
  const campaign = {
    id: existing?.id || `john-campaign-${Date.now().toString(36)}`,
    name: johnCampaignDraft.name.trim(), domain: normalizeJohnDomain(johnCampaignDraft.domain),
    countries: [...johnCampaignDraft.countries], productLine: johnCampaignDraft.productLine || '全部产品',
    status: existing?.status || 'draft', budget: Number(johnCampaignDraft.budget),
    startDate: johnCampaignDraft.startDate, endDate: johnCampaignDraft.endDate,
    keywords: normalizeJohnKeywords(existing?.keywords || []),
    negativeKeywords: [...(existing?.negativeKeywords || [])],
    keywordUpdatedAt: existing?.keywordUpdatedAt || '',
    metrics: existing?.metrics || { impressions: 0, clicks: 0, cost: 0, conversions: 0 }
  };
  if (existing) Object.assign(existing, campaign);
  else johnCampaigns.push(campaign);
  saveJohnCampaigns();
  renderJohnCampaigns();
  closeJohnCampaignSetupDialog();
  window.location.hash = 'john/ads';
  setJohnManagementTab('campaigns');
  showToast(existing ? '广告系列设置已保存' : '广告系列已创建，现在可以为它创建广告', 2800);
}

johnCampaignSetupForm?.addEventListener('input', event => {
  const target = event.target;
  if (target.id === 'johnCampaignDomain') johnCampaignDraft.domain = target.value;
  if (target.id === 'johnCampaignProductLine') johnCampaignDraft.productLine = target.value;
  if (target.id === 'johnCampaignName') johnCampaignDraft.name = target.value;
  if (target.id === 'johnCampaignStartDate') johnCampaignDraft.startDate = target.value;
  if (target.id === 'johnCampaignEndDate') johnCampaignDraft.endDate = target.value;
  if (target.id === 'johnCampaignBudget') johnCampaignDraft.budget = target.value;
  if (target.closest('#johnCampaignCountryGrid')) johnCampaignDraft.countries = [...document.querySelectorAll('#johnCampaignCountryGrid input:checked')].map(input => input.value);
  johnCampaignError.hidden = true;
});

document.querySelector('#johnCampaignNext')?.addEventListener('click', () => {
  const error = validateJohnCampaignStep();
  if (error) return setJohnCampaignError(error);
  if (johnCampaignStep === 0) {
    johnCampaignStep = 1;
    if (!johnCampaignDraft.name.trim()) {
      const scope = johnCampaignDraft.productLine || 'All Products';
      johnCampaignDraft.name = `${normalizeJohnDomain(johnCampaignDraft.domain)} ${scope} Search Campaign`;
    }
    renderJohnCampaignSetup();
    return;
  }
  saveJohnCampaignSetup();
});

document.querySelector('#johnCampaignBack')?.addEventListener('click', () => { johnCampaignStep = 0; renderJohnCampaignSetup(); });
document.querySelectorAll('[data-john-campaign-step]').forEach(button => button.addEventListener('click', () => {
  const target = Number(button.dataset.johnCampaignStep);
  if (target <= johnCampaignStep || johnEditingCampaignId) { johnCampaignStep = target; renderJohnCampaignSetup(); }
}));
document.querySelector('[data-john-campaign-close]')?.addEventListener('click', closeJohnCampaignSetupDialog);
johnCampaignSetupDialog?.addEventListener('cancel', event => { event.preventDefault(); closeJohnCampaignSetupDialog(); });
johnCampaignSetupDialog?.addEventListener('click', event => { if (event.target === johnCampaignSetupDialog) closeJohnCampaignSetupDialog(); });
document.querySelector('#johnPage [data-john-create-campaign]')?.addEventListener('click', openJohnCampaignSetupDialog);
document.querySelector('#johnPage [data-john-create-ad]')?.addEventListener('click', () => openJohnAdDialog());

function fillJohnGeneratedAssets() {
  const parent = johnCampaigns.find(campaign => campaign.id === johnDraft.campaignId);
  const product = String(parent?.productLine || 'Energy Storage').replace(/[^\x20-\x7E]/g, '').trim() || 'Energy Storage';
  johnDraft.keywords = [
    { text: 'energy storage manufacturer', group: 'supplier' },
    { text: 'commercial battery supplier', group: 'supplier' },
    { text: 'battery sourcing partner', group: 'supplier' },
    { text: 'oem battery factory', group: 'oem' },
    { text: 'custom battery manufacturer', group: 'oem' },
    { text: 'solar battery wholesale', group: 'solution' },
    { text: 'home energy storage system', group: 'solution' }
  ];
  johnDraft.negativeKeywords = ['free', 'cheap', 'diy', 'used', 'repair', 'jobs'];
  johnDraft.headlines = [
    `${product} Factory`.slice(0, 30),
    'Factory Direct Energy Storage',
    'OEM Solutions For Brands',
    'Reliable Battery Supplier',
    'Fast Quote, Strict Quality'
  ].map(text => ({ text, checked: true }));
  johnDraft.descriptions = [
    'Reliable energy storage systems for global distributors, installers and project buyers.',
    'Factory direct OEM support with fast quotes, strict quality control and global delivery.'
  ].map(text => ({ text, checked: true }));
  johnDraft.sitelinks = [
    { text: 'Products', description1: 'Explore energy storage products', description2: 'Find the right solution for your project', url: '/products' },
    { text: 'OEM Services', description1: 'Custom solutions for global brands', description2: 'From design to reliable production', url: '/oem-services' },
    { text: 'Quality Control', description1: 'Strict testing at every stage', description2: 'Built for safe and stable performance', url: '/quality' },
    { text: 'Contact Us', description1: 'Talk with our project specialists', description2: 'Get a fast quote for your requirements', url: '/contact' }
  ];
  johnDraft.callouts = ['Fast Quotation', 'OEM Customization', 'Strict Quality Control', 'Global Export Support'].map(text => ({ text, checked: true }));
  johnDraft.analyzed = true;
}

const johnKeywordGroups = [
  { key: 'supplier', label: '供应商与采购', description: '面向正在寻找长期供应伙伴的采购人' },
  { key: 'oem', label: 'OEM 与工厂', description: '聚焦定制、生产与工厂能力' },
  { key: 'solution', label: '产品与解决方案', description: '覆盖具体产品和应用场景' },
  { key: 'manual', label: '手动添加', description: '你补充的高价值搜索词' }
];

function normalizeJohnKeywords(keywords = []) {
  return keywords.map(keyword => typeof keyword === 'string' ? { text: keyword, group: 'manual' } : keyword);
}

function renderJohnKeywordTags(items, type) {
  if (!items.length) return '<p class="john-keyword-group-empty">暂无关键词，可以在下方手动添加。</p>';
  return `<div class="john-editable-tags">${items.map((item, index) => {
    const text = type === 'negative' ? item : item.text;
    const key = type === 'negative' ? index : johnDraft.keywords.indexOf(item);
    return `<span>${escapeHTML(text)}<button type="button" data-john-remove-keyword="${type}" data-index="${key}" aria-label="删除关键词 ${escapeHTML(text)}"><i data-lucide="x"></i></button></span>`;
  }).join('')}</div>`;
}

function renderJohnKeywordWorkspace() {
  const workspace = document.querySelector('#johnKeywordWorkspace');
  if (!workspace || !johnDraft) return;
  workspace.hidden = johnWizardStep !== 0;
  document.querySelector('#johnAdPreview').hidden = johnWizardStep === 0;
  if (johnWizardStep !== 0) return;

  if (johnAnalysisStage >= 0) {
    const stages = [
      ['读取网站内容', '识别产品页、应用场景与核心卖点'],
      ['提取业务信号', '判断产品能力、服务模式和市场定位'],
      ['识别搜索意图', '区分 B2B 采购意图与低价值流量'],
      ['组织关键词组', '生成核心关键词与否定词建议']
    ];
    workspace.innerHTML = `<header class="john-keyword-workspace-header"><span>AI 分析中</span><strong>John 正在读懂你的业务</strong><p>分析过程会在这里实时呈现</p></header><div class="john-ai-thinking"><div class="john-thinking-orbit"><i data-lucide="sparkles"></i></div><div class="john-thinking-steps">${stages.map((stage, index) => `<div class="${index < johnAnalysisStage ? 'complete' : index === johnAnalysisStage ? 'active' : ''}"><span>${index < johnAnalysisStage ? '<i data-lucide="check"></i>' : index === johnAnalysisStage ? '<i data-lucide="loader-circle"></i>' : index + 1}</span><p><strong>${stage[0]}</strong><small>${stage[1]}</small></p></div>`).join('')}</div></div>`;
    refreshIcons();
    return;
  }

  if (!johnDraft.analyzed) {
    workspace.innerHTML = `<div class="john-keyword-empty"><span><i data-lucide="scan-search"></i></span><h3>等待分析关键词</h3><p>填写左侧的网站与目标市场，John 会在这里按搜索意图整理关键词和否定词。</p><div><small><i data-lucide="layers-3"></i>关键词自动分组</small><small><i data-lucide="pencil-line"></i>支持手动增删</small></div></div>`;
    refreshIcons();
    return;
  }

  johnDraft.keywords = normalizeJohnKeywords(johnDraft.keywords);
  const groups = johnKeywordGroups.map(group => ({ ...group, items: johnDraft.keywords.filter(keyword => keyword.group === group.key) })).filter(group => group.items.length || group.key === 'manual');
  workspace.innerHTML = `<header class="john-keyword-workspace-header complete"><span><i data-lucide="circle-check"></i>分析完成</span><strong>关键词与否定词</strong><p>已识别 B2B 采购意图，建议投放前完成审核</p><div><b>${johnDraft.keywords.length}</b> 个关键词<span></span><b>${johnDraft.negativeKeywords.length}</b> 个否定词</div></header><div class="john-keyword-workspace-body"><section class="john-result-section"><div class="john-result-title"><div><strong>关键词</strong><small>按搜索意图分组</small></div></div>${groups.map(group => `<article class="john-keyword-group"><header><div><strong>${group.label}</strong><small>${group.description}</small></div><span>${group.items.length}</span></header>${renderJohnKeywordTags(group.items, 'keyword')}</article>`).join('')}<div class="john-keyword-add" data-john-add-keyword-form="keyword"><select aria-label="选择关键词分组">${johnKeywordGroups.map(group => `<option value="${group.key}" ${group.key === 'manual' ? 'selected' : ''}>${group.label}</option>`).join('')}</select><input name="keyword" type="text" placeholder="输入英文关键词" autocomplete="off" aria-label="手动添加关键词"><button type="button" data-john-add-keyword aria-label="添加关键词"><i data-lucide="plus"></i></button></div></section><section class="john-result-section john-negative-section"><div class="john-result-title"><div><strong>否定词</strong><small>排除低意图与无关流量</small></div><span>${johnDraft.negativeKeywords.length}</span></div>${renderJohnKeywordTags(johnDraft.negativeKeywords, 'negative')}<div class="john-keyword-add" data-john-add-keyword-form="negative"><input name="keyword" type="text" placeholder="输入英文否定词" autocomplete="off" aria-label="手动添加否定词"><button type="button" data-john-add-keyword aria-label="添加否定词"><i data-lucide="plus"></i></button></div></section></div>`;
  refreshIcons();
}

function renderJohnAssetFields() {
  const groups = [
    { key: 'headlines', selector: '#johnHeadlineFields', max: 30 },
    { key: 'descriptions', selector: '#johnDescriptionFields', max: 90 }
  ];
  groups.forEach(group => {
    const container = document.querySelector(group.selector);
    container.innerHTML = johnDraft[group.key].map((item, index) => `<div class="john-asset-row"><input type="checkbox" data-john-asset-check="${group.key}" data-index="${index}" ${item.checked ? 'checked' : ''} aria-label="使用这条${group.key === 'headlines' ? '标题' : '描述'}"><input type="text" value="${escapeHTML(item.text)}" maxlength="${group.max + 20}" data-john-asset-text="${group.key}" data-index="${index}"><small class="${item.text.length > group.max ? 'over' : ''}">${item.text.length}/${group.max}</small><button type="button" data-john-remove-asset="${group.key}" data-index="${index}" aria-label="删除"><i data-lucide="trash-2"></i></button></div>`).join('');
  });
}

function renderJohnSitelinks() {
  johnDraft.sitelinks = johnDraft.sitelinks.map(normalizeJohnSitelink).slice(0, johnSitelinkLimit);
  document.querySelector('#johnSitelinkFields').innerHTML = johnDraft.sitelinks.map((item, index) => `<article class="john-sitelink-module">
    <header><strong>站内链接 ${index + 1}</strong><button type="button" data-john-remove-sitelink data-index="${index}" aria-label="删除站内链接 ${index + 1}"><i data-lucide="trash-2"></i>删除</button></header>
    <div class="john-sitelink-fields">
      <label><span>站内链接文字</span><input type="text" value="${escapeHTML(item.text)}" data-john-sitelink-field="text" data-index="${index}" placeholder="例如：Products"></label>
      <label><span>站内链接说明（第一行）</span><input type="text" value="${escapeHTML(item.description1)}" data-john-sitelink-field="description1" data-index="${index}" placeholder="例如：Explore our product range"></label>
      <label><span>广告描述（第二行）</span><input type="text" value="${escapeHTML(item.description2)}" data-john-sitelink-field="description2" data-index="${index}" placeholder="例如：Solutions for global buyers"></label>
      <label><span>站内链接网址</span><input type="text" inputmode="url" value="${escapeHTML(item.url)}" data-john-sitelink-field="url" data-index="${index}" placeholder="例如：/products"></label>
    </div>
  </article>`).join('');
  const addButton = document.querySelector('[data-john-add-sitelink]');
  const atLimit = johnDraft.sitelinks.length >= johnSitelinkLimit;
  addButton.disabled = atLimit;
  addButton.setAttribute('aria-disabled', String(atLimit));
  addButton.title = atLimit ? '最多添加 6 个站内链接' : '';
  document.querySelector('#johnSitelinkCount').textContent = `${johnDraft.sitelinks.length} / ${johnSitelinkLimit}`;
}

function renderJohnCallouts() {
  document.querySelector('#johnCalloutFields').innerHTML = johnDraft.callouts.map((item, index) => `<label><input type="checkbox" data-john-callout data-index="${index}" ${item.checked ? 'checked' : ''}><span>${escapeHTML(item.text)}</span></label>`).join('');
}

function updateJohnPreview() {
  if (!johnDraft) return;
  const domain = normalizeJohnDomain(johnDraft.domain);
  const domainParts = domain.split('.');
  const brandPart = domainParts[0].toLowerCase() === 'www' && domainParts[1] ? domainParts[1] : domainParts[0];
  const brand = domain ? brandPart.replace(/[-_]/g, ' ') : 'Your Company';
  const headline = johnDraft.headlines.filter(item => item.checked && item.text.trim()).slice(0, 3).map(item => item.text.trim()).join(' | ') || 'Custom Energy Solutions | Factory Direct';
  const description = johnDraft.descriptions.find(item => item.checked && item.text.trim())?.text || 'Reliable OEM manufacturing, strict quality control and global delivery support.';
  const links = johnDraft.sitelinks.filter(item => item.text.trim()).slice(0, 4);
  document.querySelector('#johnPreviewBrand').textContent = brand.replace(/\b\w/g, char => char.toUpperCase());
  document.querySelector('#johnPreviewUrl').textContent = `https://${domain || 'yourcompany.com'}`;
  document.querySelector('#johnPreviewHeadline').textContent = headline;
  document.querySelector('#johnPreviewDescription').textContent = description;
  document.querySelector('#johnPreviewLinks').innerHTML = (links.length ? links : [{ text: 'Products' }, { text: 'Contact Us' }]).map(item => `<span>${escapeHTML(item.text)}</span>`).join('');
}

function renderJohnAdParent() {
  const select = document.querySelector('#johnAdCampaignSelect');
  select.innerHTML = johnCampaigns.map(campaign => `<option value="${escapeHTML(campaign.id)}">${escapeHTML(campaign.name)}</option>`).join('');
  select.value = johnDraft.campaignId;
  const parent = johnCampaigns.find(campaign => campaign.id === johnDraft.campaignId);
  document.querySelector('#johnAdParentScope').innerHTML = parent
    ? `<span>继承自广告系列</span><strong>${escapeHTML(parent.domain)}</strong><small>${escapeHTML(johnCountryLabels(parent.countries))} · ${escapeHTML(parent.productLine || '全部产品')} · ${formatJohnMoney(parent.budget)}/天</small>`
    : '';
}

function renderJohnWizard() {
  document.querySelectorAll('[data-john-panel]').forEach((panel, index) => {
    const active = index === johnWizardStep;
    panel.hidden = !active;
    panel.classList.toggle('active', active);
  });
  document.querySelectorAll('[data-john-wizard-step]').forEach((button, index) => {
    button.classList.toggle('active', index === johnWizardStep);
    button.classList.toggle('complete', index < johnWizardMaxStep || (johnEditingAdId && index !== johnWizardStep));
    button.disabled = index > johnWizardMaxStep && !johnEditingAdId;
  });
  document.querySelector('#johnWizardBack').hidden = johnWizardStep === 0;
  document.querySelector('#johnWizardNext').textContent = johnWizardStep === 3 ? (johnEditingAdId ? '保存广告' : '创建并启用广告') : '下一步';
  document.querySelector('#johnWizardProgress').textContent = `第 ${johnWizardStep + 1} 步，共 4 步`;
  johnWizardError.hidden = true;
  renderJohnAdParent();
  renderJohnKeywordWorkspace();
  renderJohnAssetFields();
  renderJohnSitelinks();
  renderJohnCallouts();
  document.querySelector('#johnAdName').value = johnDraft.name;
  updateJohnPreview();
  refreshIcons();
}

function openJohnAdDialog(ad = null, campaignId = '') {
  if (!johnCampaigns.length) {
    window.location.hash = 'john/ads';
    setJohnManagementTab('campaigns');
    showToast('请先创建广告系列，再添加广告');
    return;
  }
  johnEditingAdId = ad?.id || '';
  johnDraft = ad ? adToJohnDraft(ad) : emptyJohnDraft();
  if (!ad) {
    const parent = johnCampaigns.find(campaign => campaign.id === campaignId) || johnCampaigns[0];
    johnDraft.campaignId = parent.id;
    johnDraft.domain = parent.domain;
    johnDraft.productLine = parent.productLine;
    johnDraft.name = `${parent.productLine || 'Google Search'} · 广告 ${johnCampaignAds(parent.id).length + 1}`;
  }
  johnWizardStep = 0;
  johnWizardMaxStep = ad ? 3 : 0;
  johnAnalysisStage = -1;
  const analyzeButton = document.querySelector('#johnAnalyzeButton');
  analyzeButton.disabled = false;
  analyzeButton.classList.remove('is-loading');
  analyzeButton.innerHTML = ad ? '<i data-lucide="circle-check"></i>分析完成，可重新生成' : '<i data-lucide="sparkles"></i>让 John 分析网站并生成关键词';
  document.querySelector('#john-campaign-dialog-title').textContent = ad ? '编辑广告' : '新建广告';
  renderJohnWizard();
  johnDialog.showModal();
  document.body.style.overflow = 'hidden';
  window.setTimeout(() => document.querySelector('#johnAdName')?.focus(), 0);
}

function closeJohnCampaignDialog() {
  johnAnalysisRun += 1;
  johnDialog.close();
  document.body.style.overflow = '';
}

document.querySelector('[data-john-dialog-close]')?.addEventListener('click', closeJohnCampaignDialog);
johnDialog?.addEventListener('cancel', event => { event.preventDefault(); closeJohnCampaignDialog(); });
johnDialog?.addEventListener('click', event => { if (event.target === johnDialog) closeJohnCampaignDialog(); });

function setJohnError(message) {
  johnWizardError.textContent = message;
  johnWizardError.hidden = false;
}

function johnEnglish(value) {
  return /^[\x20-\x7E]+$/.test(String(value).trim());
}

function validateJohnStep(step) {
  if (step === 0) {
    if (!johnCampaigns.some(campaign => campaign.id === johnDraft.campaignId)) return '请选择有效的广告系列。';
    if (!johnDraft.name.trim()) return '请输入广告名称。';
    if (!johnDraft.analyzed) return '请先让 John 完成网站与关键词分析。';
    if (!johnDraft.keywords.length) return '请至少保留一个关键词。';
  }
  if (step === 1) {
    const headlines = johnDraft.headlines.filter(item => item.checked);
    const descriptions = johnDraft.descriptions.filter(item => item.checked);
    if (!headlines.length || !descriptions.length) return '请至少保留一条广告标题和一条广告描述。';
    if (headlines.some(item => !johnEnglish(item.text) || item.text.length > 30)) return '广告标题必须为英文且不超过 30 个字符。';
    if (descriptions.some(item => !johnEnglish(item.text) || item.text.length > 90)) return '广告描述必须为英文且不超过 90 个字符。';
  }
  if (step === 2) {
    if (!johnDraft.sitelinks.length) return '请至少添加一条站内链接。';
    const incomplete = johnDraft.sitelinks.some(item => !item.text.trim() || !item.description1.trim() || !item.description2.trim() || !item.url.trim());
    if (incomplete) return '请完整填写每条站内链接的文字、两行说明和网址。';
    const nonEnglish = johnDraft.sitelinks.some(item => !johnEnglish(item.text) || !johnEnglish(item.description1) || !johnEnglish(item.description2));
    if (nonEnglish) return '站内链接文字和两行说明必须使用英文字符。';
  }
  if (step === 3 && johnDraft.callouts.filter(item => item.checked).some(item => !johnEnglish(item.text) || item.text.length > 25)) return '宣传信息必须为英文且不超过 25 个字符。';
  return '';
}

document.querySelector('#johnAnalyzeButton')?.addEventListener('click', async event => {
  johnDraft.campaignId = document.querySelector('#johnAdCampaignSelect').value;
  johnDraft.name = document.querySelector('#johnAdName').value;
  const parent = johnCampaigns.find(campaign => campaign.id === johnDraft.campaignId);
  if (!parent || !johnDraft.name.trim()) {
    setJohnError('请先选择所属广告系列并填写广告名称。');
    return;
  }
  johnDraft.domain = parent.domain;
  johnDraft.productLine = parent.productLine;
  const button = event.currentTarget;
  const run = ++johnAnalysisRun;
  const stages = ['正在读取网站内容…', '正在提取业务信号…', '正在识别搜索意图…', '正在组织关键词组…'];
  button.disabled = true;
  button.classList.add('is-loading');
  for (const [index, stage] of stages.entries()) {
    if (run !== johnAnalysisRun) return;
    johnAnalysisStage = index;
    button.innerHTML = `<i data-lucide="loader-circle"></i>${stage}`;
    renderJohnKeywordWorkspace();
    refreshIcons();
    await new Promise(resolve => window.setTimeout(resolve, 650));
  }
  if (run !== johnAnalysisRun) return;
  fillJohnGeneratedAssets();
  johnAnalysisStage = -1;
  button.disabled = false;
  button.classList.remove('is-loading');
  button.innerHTML = '<i data-lucide="circle-check"></i>分析完成，可重新生成';
  johnWizardError.hidden = true;
  renderJohnKeywordWorkspace();
  updateJohnPreview();
  refreshIcons();
});

document.querySelector('#johnWizardBack')?.addEventListener('click', () => {
  if (johnWizardStep > 0) {
    johnWizardStep -= 1;
    renderJohnWizard();
  }
});

document.querySelector('#johnWizardNext')?.addEventListener('click', () => {
  const error = validateJohnStep(johnWizardStep);
  if (error) {
    setJohnError(error);
    return;
  }
  if (johnWizardStep < 3) {
    johnWizardStep += 1;
    johnWizardMaxStep = Math.max(johnWizardMaxStep, johnWizardStep);
    renderJohnWizard();
    return;
  }
  saveJohnAdDraft();
});

document.querySelectorAll('[data-john-wizard-step]').forEach(button => button.addEventListener('click', () => {
  const target = Number(button.dataset.johnWizardStep);
  if (target <= johnWizardMaxStep || johnEditingAdId) {
    johnWizardStep = target;
    renderJohnWizard();
  }
}));

function saveJohnAdDraft() {
  const existing = johnAds.find(ad => ad.id === johnEditingAdId);
  const parent = johnCampaigns.find(campaign => campaign.id === johnDraft.campaignId);
  if (!parent) return setJohnError('请选择有效的广告系列。');
  const metrics = existing?.metrics || {
    impressions: Math.round(parent.budget * 7 * 122),
    clicks: Math.round(parent.budget * 7 * 4.4),
    cost: Math.round(parent.budget * 7 * .9),
    conversions: Math.max(1, Math.round(parent.budget * 7 * .035))
  };
  const ad = {
    id: existing?.id || `john-ad-${Date.now().toString(36)}`,
    campaignId: parent.id,
    name: johnDraft.name.trim(),
    status: existing?.status || 'enabled',
    headlines: johnDraft.headlines.filter(item => item.checked).map(item => item.text.trim()),
    descriptions: johnDraft.descriptions.filter(item => item.checked).map(item => item.text.trim()),
    sitelinks: johnDraft.sitelinks.filter(item => item.text.trim() && item.url.trim()),
    callouts: johnDraft.callouts.filter(item => item.checked).map(item => item.text),
    metrics,
    createdAt: existing?.createdAt || johnToday(),
    updatedAt: johnToday()
  };
  parent.keywords = normalizeJohnKeywords(johnDraft.keywords);
  parent.negativeKeywords = [...johnDraft.negativeKeywords];
  parent.keywordUpdatedAt = johnToday();
  if (existing) Object.assign(existing, ad);
  else {
    johnAds.push(ad);
    parent.metrics = {
      impressions: (Number(parent.metrics?.impressions) || 0) + metrics.impressions,
      clicks: (Number(parent.metrics?.clicks) || 0) + metrics.clicks,
      cost: (Number(parent.metrics?.cost) || 0) + metrics.cost,
      conversions: (Number(parent.metrics?.conversions) || 0) + metrics.conversions
    };
    if (parent.status === 'draft') parent.status = 'paused';
  }
  saveJohnCampaigns();
  renderJohnCampaigns();
  closeJohnCampaignDialog();
  window.location.hash = 'john/ads';
  setJohnManagementTab('ads');
  showToast(existing ? '广告更改已保存' : '广告已创建并启用，可确认系列设置后开始投放', 2800);
}

johnForm?.addEventListener('input', event => {
  const target = event.target;
  if (target.id === 'johnAdCampaignSelect') {
    const parent = johnCampaigns.find(campaign => campaign.id === target.value);
    johnDraft.campaignId = target.value;
    johnDraft.domain = parent?.domain || '';
    johnDraft.productLine = parent?.productLine || '';
    johnDraft.analyzed = false;
    johnAnalysisStage = -1;
    document.querySelector('#johnAnalyzeButton').innerHTML = '<i data-lucide="sparkles"></i>让 John 分析网站并生成关键词';
    renderJohnKeywordWorkspace();
    renderJohnAdParent();
  }
  if (target.id === 'johnAdName') johnDraft.name = target.value;
  if (target.dataset.johnAssetText) {
    johnDraft[target.dataset.johnAssetText][Number(target.dataset.index)].text = target.value;
    const count = target.nextElementSibling;
    const max = target.dataset.johnAssetText === 'headlines' ? 30 : 90;
    count.textContent = `${target.value.length}/${max}`;
    count.classList.toggle('over', target.value.length > max);
  }
  if (target.dataset.johnAssetCheck) johnDraft[target.dataset.johnAssetCheck][Number(target.dataset.index)].checked = target.checked;
  if (target.dataset.johnSitelinkField) johnDraft.sitelinks[Number(target.dataset.index)][target.dataset.johnSitelinkField] = target.value;
  if (target.hasAttribute('data-john-callout')) johnDraft.callouts[Number(target.dataset.index)].checked = target.checked;
  johnWizardError.hidden = true;
  updateJohnPreview();
});

johnForm?.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button.dataset.johnAddAsset) {
    const key = button.dataset.johnAddAsset === 'headline' ? 'headlines' : 'descriptions';
    johnDraft[key].push({ text: '', checked: true });
    renderJohnAssetFields(); refreshIcons();
  }
  if (button.dataset.johnRemoveAsset) {
    johnDraft[button.dataset.johnRemoveAsset].splice(Number(button.dataset.index), 1);
    renderJohnAssetFields(); updateJohnPreview(); refreshIcons();
  }
  if (button.hasAttribute('data-john-add-sitelink')) {
    if (johnDraft.sitelinks.length >= johnSitelinkLimit) return;
    johnDraft.sitelinks.push(normalizeJohnSitelink());
    renderJohnSitelinks(); refreshIcons();
  }
  if (button.hasAttribute('data-john-remove-sitelink')) {
    johnDraft.sitelinks.splice(Number(button.dataset.index), 1);
    renderJohnSitelinks(); updateJohnPreview(); refreshIcons();
  }
  if (button.hasAttribute('data-john-add-callout')) {
    const input = document.querySelector('#johnCalloutInput');
    const value = input.value.trim();
    if (!value) return;
    if (!johnEnglish(value) || value.length > 25) { setJohnError('宣传信息必须为英文且不超过 25 个字符。'); return; }
    johnDraft.callouts.push({ text: value, checked: true });
    input.value = '';
    renderJohnCallouts();
  }
  if (button.dataset.johnRemoveKeyword) {
    const type = button.dataset.johnRemoveKeyword;
    const index = Number(button.dataset.index);
    if (type === 'negative') johnDraft.negativeKeywords.splice(index, 1);
    else johnDraft.keywords.splice(index, 1);
    renderJohnKeywordWorkspace();
  }
  if (button.hasAttribute('data-john-add-keyword')) {
    const form = button.closest('[data-john-add-keyword-form]');
  const input = form.querySelector('input[name="keyword"]');
  const value = input.value.trim();
  if (!value) return;
  if (!johnEnglish(value)) { setJohnError('关键词必须使用英文字符。'); return; }
  const type = form.dataset.johnAddKeywordForm;
  const exists = type === 'negative'
    ? johnDraft.negativeKeywords.some(keyword => keyword.toLowerCase() === value.toLowerCase())
    : normalizeJohnKeywords(johnDraft.keywords).some(keyword => keyword.text.toLowerCase() === value.toLowerCase());
  if (exists) { setJohnError('这个词已经在列表中。'); return; }
  if (type === 'negative') johnDraft.negativeKeywords.push(value);
  else johnDraft.keywords.push({ text: value, group: form.querySelector('select').value });
  johnWizardError.hidden = true;
  renderJohnKeywordWorkspace();
  }
});

const johnFlowStepOrder = ['campaign', 'keywords', 'schedule', 'ad', 'complete'];
let johnFlowKeywordRun = 0;
let johnFlowAdRun = 0;

function emptyJohnFlowCampaignDraft() {
  return {
    name: '', domain: '', countries: [], productLine: '', startDate: johnToday(), endDate: '', budget: '100',
    keywords: [], negativeKeywords: []
  };
}

function emptyJohnFlowAdDraft(campaignId = '') {
  return {
    campaignId,
    name: '',
    headlines: [], descriptions: [], sitelinks: [], callouts: []
  };
}

function createJohnFlowState({ mode = '', campaignId = '' } = {}) {
  return {
    mode,
    step: 'campaign',
    campaignId,
    campaignPage: 1,
    campaignDraft: emptyJohnFlowCampaignDraft(),
    repairingExisting: false,
    campaignCreated: false,
    keywordsAnalyzed: false,
    keywordsStale: false,
    keywordStage: -1,
    keywordThinkingCollapsed: false,
    adDraft: emptyJohnFlowAdDraft(campaignId),
    adGenerated: false,
    adStage: -1,
    previewCollapsed: false,
    dirty: false,
    lastAd: null
  };
}

let johnFlowState = createJohnFlowState();

function startJohnCreateFlow(options = {}) {
  johnFlowKeywordRun += 1;
  johnFlowAdRun += 1;
  johnFlowState = createJohnFlowState(options);
  if (options.campaignId && johnCampaigns.some(campaign => campaign.id === options.campaignId)) {
    johnFlowState.mode = 'existing';
    johnFlowState.campaignId = options.campaignId;
  }
  window.location.hash = 'john/create-ad';
  renderJohnCreateFlow();
}

function johnFlowCampaignToDraft(campaign) {
  return {
    name: campaign.name || '',
    domain: campaign.domain || '',
    countries: [...(campaign.countries || [])],
    productLine: campaign.productLine === '全部产品' ? '' : campaign.productLine || '',
    startDate: campaign.startDate || johnToday(),
    endDate: campaign.endDate || '',
    budget: String(campaign.budget || ''),
    keywords: normalizeJohnKeywords(campaign.keywords || []),
    negativeKeywords: [...(campaign.negativeKeywords || [])]
  };
}

function johnFlowStatusLabel(campaign) {
  if (campaign.endDate && campaign.endDate < johnToday()) return '已结束';
  if (campaign.status === 'enabled') return '投放中';
  if (campaign.status === 'draft') return '待完善';
  return '已暂停';
}

function renderJohnFlowCampaignList() {
  const list = document.querySelector('#johnFlowCampaignList');
  if (!list) return;
  if (!johnCampaigns.length) {
    list.innerHTML = '<div class="john-flow-empty"><i data-lucide="folder-plus"></i><strong>还没有广告系列</strong><p>切换到“新建广告系列”，John 会带你完成系列和首条广告。</p><button type="button" data-john-flow-switch-new>新建广告系列</button></div>';
  } else {
    const pageSize = 5;
    const totalPages = Math.max(1, Math.ceil(johnCampaigns.length / pageSize));
    johnFlowState.campaignPage = Math.min(Math.max(1, johnFlowState.campaignPage), totalPages);
    const pageStart = (johnFlowState.campaignPage - 1) * pageSize;
    const campaigns = johnCampaigns.slice(pageStart, pageStart + pageSize);
    const rows = campaigns.map(campaign => {
      const selected = campaign.id === johnFlowState.campaignId;
      const ended = Boolean(campaign.endDate && campaign.endDate < johnToday());
      const running = campaign.status === 'enabled' && !ended;
      return `<button class="${selected ? 'selected' : ''} ${ended ? 'is-ended' : ''}" type="button" data-john-flow-campaign-id="${escapeHTML(campaign.id)}" aria-pressed="${selected}">
        <span class="john-flow-campaign-icon"><i data-lucide="presentation"></i></span>
        <span class="john-flow-campaign-copy"><strong>${escapeHTML(campaign.name)}</strong><small>${escapeHTML(campaign.domain)} · ${escapeHTML(johnCountryLabels(campaign.countries))} · ${formatJohnMoney(campaign.budget)}/天</small></span>
        <span class="john-flow-campaign-meta"><b class="${running ? 'is-running' : ''}">${running ? '运行中' : johnFlowStatusLabel(campaign)}</b><small>${(campaign.keywords || []).length} 个关键词 · ${johnCampaignAds(campaign.id).length} 个广告</small></span>
      </button>`;
    }).join('');
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1).map(page => `<button class="${page === johnFlowState.campaignPage ? 'active' : ''}" type="button" data-john-flow-campaign-page="${page}" aria-label="第 ${page} 页" aria-current="${page === johnFlowState.campaignPage ? 'page' : 'false'}">${page}</button>`).join('');
    list.innerHTML = `${rows}<nav class="john-flow-campaign-pagination" aria-label="广告系列分页"><button type="button" data-john-flow-campaign-page="${johnFlowState.campaignPage - 1}" aria-label="上一页" ${johnFlowState.campaignPage === 1 ? 'disabled' : ''}><i data-lucide="chevron-left"></i></button>${pages}<button type="button" data-john-flow-campaign-page="${johnFlowState.campaignPage + 1}" aria-label="下一页" ${johnFlowState.campaignPage === totalPages ? 'disabled' : ''}><i data-lucide="chevron-right"></i></button></nav>`;
  }
  refreshIcons();
}

function renderJohnFlowCampaignForm() {
  const draft = johnFlowState.campaignDraft;
  const analyzing = johnFlowState.keywordStage >= 0;
  const countryGrid = document.querySelector('#johnFlowCountryGrid');
  if (!countryGrid) return;
  countryGrid.innerHTML = johnCountries.map(country => `<label role="option" aria-selected="${draft.countries.includes(country.code)}"><input type="checkbox" value="${country.code}" ${draft.countries.includes(country.code) ? 'checked' : ''}><span><b>${country.flag} ${country.code}</b><small>${country.name}</small><i data-lucide="check"></i></span></label>`).join('');
  setJohnFlowCountryDropdown(false);
  updateJohnFlowCountrySelect();
  document.querySelector('#johnFlowDomain').value = draft.domain;
  document.querySelector('#johnFlowProductLine').value = draft.productLine;
  document.querySelector('#johnFlowCampaignName').value = draft.name;
  document.querySelectorAll('#johnFlowNewPanel input, #johnFlowNewPanel select, #johnFlowCountryTrigger').forEach(control => {
    control.disabled = analyzing;
  });
  const stale = document.querySelector('#johnFlowKeywordStaleNote');
  stale.hidden = !johnFlowState.keywordsStale;
  const keywordButton = document.querySelector('#johnFlowStartKeywords');
  keywordButton.disabled = analyzing;
  keywordButton.classList.toggle('is-loading', analyzing);
  keywordButton.classList.toggle('is-regenerate', johnFlowState.keywordsAnalyzed && !johnFlowState.keywordsStale && !analyzing);
  keywordButton.innerHTML = analyzing
    ? '<i data-lucide="loader-circle"></i>正在生成中'
    : johnFlowState.keywordsAnalyzed && !johnFlowState.keywordsStale
      ? '<i data-lucide="refresh-cw"></i>重新生成'
      : '<i data-lucide="sparkles"></i>分析网站并生成关键词';
  refreshIcons();
}

function setJohnFlowCountryDropdown(open) {
  const trigger = document.querySelector('#johnFlowCountryTrigger');
  const menu = document.querySelector('#johnFlowCountryMenu');
  if (!trigger || !menu) return;
  trigger.setAttribute('aria-expanded', String(open));
  menu.hidden = !open;
}

function updateJohnFlowCountrySelect() {
  const selected = johnCountries.filter(country => johnFlowState.campaignDraft.countries.includes(country.code));
  const value = document.querySelector('#johnFlowCountryValue');
  const count = document.querySelector('#johnFlowCountryCount');
  const trigger = document.querySelector('#johnFlowCountryTrigger');
  if (value) {
    value.innerHTML = selected.length
      ? selected.map(country => `<span class="john-flow-country-chip">${escapeHTML(country.name)}<i data-lucide="x"></i></span>`).join('')
      : '请选择';
    value.classList.toggle('placeholder', !selected.length);
  }
  if (count) count.textContent = selected.length ? `已选择 ${selected.length} 个国家` : '尚未选择';
  if (trigger) trigger.title = selected.map(country => country.name).join('、');
  document.querySelectorAll('#johnFlowCountryGrid label').forEach(label => {
    label.setAttribute('aria-selected', String(label.querySelector('input')?.checked));
  });
  refreshIcons();
}

function johnFlowKeywordThinkingScript() {
  const draft = johnFlowState.campaignDraft;
  const domain = normalizeJohnDomain(draft.domain) || '你的独立站';
  const product = draft.productLine || '全部产品';
  const markets = johnCountryLabels(draft.countries);
  return [
    { type: 'line', text: `正在读取 ${domain} 的网站结构与核心页面…` },
    { type: 'line', text: `已识别当前产品范围：${product}` },
    { type: 'layer', text: '网站与业务信号' },
    { type: 'line', text: '正在提取产品能力、应用场景、认证与供应信息…' },
    { type: 'line', text: '判断：以 B2B 采购、供应商筛选和解决方案搜索作为主要意图。' },
    { type: 'layer', text: `目标市场 · ${markets}` },
    { type: 'line', text: '正在匹配目标市场常用表达，并排除消费级与低价值查询…' },
    { type: 'line', text: '已筛出制造商、供应商、OEM 与批发采购等高意图主题。' },
    { type: 'layer', text: '关键词与否定词组织' },
    { type: 'line', text: '正在按搜索意图分组，并检查关键词重复与覆盖范围…' },
    { type: 'line', text: '分析完成，正在整理可审核的系列关键词与否定词。' }
  ];
}

function renderJohnFlowKeywordWorkspace() {
  const workspace = document.querySelector('#johnFlowKeywordWorkspace');
  if (!workspace) return;
  const draft = johnFlowState.campaignDraft;
  const script = johnFlowKeywordThinkingScript();
  const analyzing = johnFlowState.keywordStage >= 0;
  const complete = johnFlowState.keywordsAnalyzed && !analyzing;
  const visibleItems = analyzing ? script.slice(0, johnFlowState.keywordStage + 1) : script;
  const collapsed = johnFlowState.keywordThinkingCollapsed;
  const thinkingTitle = complete
    ? `John 已完成网站分析，并生成 ${draft.keywords.length} 个系列关键词`
    : 'John 正在进行网站分析并生成关键词';
  const thinking = `<section class="john-flow-thinking-card ${complete ? 'done' : ''} ${collapsed ? 'collapsed' : ''}">
    <div class="john-flow-thinking-rail" aria-hidden="true"><i data-lucide="${complete ? 'circle-check-big' : 'loader-circle'}"></i><span></span></div>
    <div class="john-flow-thinking-content">
      <button class="john-flow-thinking-summary" id="johnFlowThinkingToggle" type="button" aria-expanded="${!collapsed}" aria-controls="johnFlowThinkingSteps">
        <span>${escapeHTML(thinkingTitle)}</span><i data-lucide="chevron-down"></i>
      </button>
      <div class="john-flow-thinking-stream" id="johnFlowThinkingSteps">${visibleItems.map((item, index) => `<${item.type === 'layer' ? 'p' : 'div'} class="${item.type === 'layer' ? 'john-flow-thinking-layer' : 'john-flow-thinking-line'}" style="--delay:${Math.min(index * 20, 180)}ms">${escapeHTML(item.text)}</${item.type === 'layer' ? 'p' : 'div'}>`).join('')}</div>
    </div>
  </section>`;
  if (analyzing) {
    workspace.innerHTML = thinking;
    refreshIcons();
    return;
  }
  draft.keywords = normalizeJohnKeywords(draft.keywords || []);
  const groups = johnKeywordGroups.map(group => ({ ...group, items: draft.keywords.filter(keyword => keyword.group === group.key) })).filter(group => group.items.length || group.key === 'manual');
  if (johnFlowState.mode === 'new') {
    const renderTags = (items, type) => `<div class="john-flow-keyword-tags">${items.map(item => {
      const value = typeof item === 'string' ? item : item.text;
      return `<span>${escapeHTML(value)}<button type="button" data-john-flow-remove-keyword="${type}" data-keyword="${escapeHTML(value)}" aria-label="删除 ${escapeHTML(value)}"><i data-lucide="x"></i></button></span>`;
    }).join('')}</div>`;
    const groupMarkup = groups.map(group => `<article class="john-flow-keyword-group ${group.key === 'manual' ? 'is-manual' : ''}"><header><strong>${group.label}</strong><span>${group.items.length}</span></header>${group.items.length ? renderTags(group.items, 'keyword') : ''}${group.key === 'manual' ? `<div class="john-flow-keyword-add" data-john-flow-keyword-form="keyword"><input name="keyword" type="text" placeholder="输入关键词" aria-label="手动添加关键词" /><button type="button" data-john-flow-add-keyword aria-label="添加关键词"><i data-lucide="plus"></i></button></div>` : ''}</article>`).join('');
    const scheduleStarted = johnFlowStepOrder.indexOf(johnFlowState.step) >= johnFlowStepOrder.indexOf('schedule');
    const resultAction = scheduleStarted
      ? '<button class="john-flow-secondary" type="button" data-john-flow-regenerate-keywords><i data-lucide="refresh-cw"></i>重新生成</button>'
      : '<button class="john-flow-primary" id="johnFlowConfirmKeywords" type="button">确认关键词并继续</button>';
    workspace.innerHTML = `${thinking}<section class="john-flow-keyword-result"><header class="john-flow-keyword-result-header"><h2>以下是生成的关键词</h2><p>同一系列下的所有广告都会共享这组关键词与否定词</p></header><section class="john-flow-keyword-panel"><header><h3>关键词</h3><p>按搜索意图分组</p></header>${groupMarkup}</section><section class="john-flow-keyword-panel john-flow-negative-column"><header><h3>否定词</h3><p>排除低意图与无关流量</p></header>${renderTags(draft.negativeKeywords, 'negative')}<div class="john-flow-keyword-add simple" data-john-flow-keyword-form="negative"><input name="keyword" type="text" placeholder="输入关键词" aria-label="手动添加否定词" /><button type="button" data-john-flow-add-keyword aria-label="添加否定词"><i data-lucide="plus"></i></button></div></section><footer>${resultAction}</footer></section>`;
  } else {
    workspace.innerHTML = `${thinking}<div class="john-flow-keyword-result"><div class="john-flow-keyword-summary"><div><span><i data-lucide="circle-check"></i>分析完成</span><strong>${draft.keywords.length}</strong><small>个关键词</small></div><div><strong>${draft.negativeKeywords.length}</strong><small>个否定词</small></div></div><div class="john-flow-keyword-columns"><section><header><div><h3>关键词</h3><p>按搜索意图分组，可继续增删。</p></div></header>${groups.map(group => `<article class="john-flow-keyword-group"><header><div><strong>${group.label}</strong><small>${group.description}</small></div><span>${group.items.length}</span></header><div class="john-flow-keyword-tags">${group.items.length ? group.items.map(item => `<span>${escapeHTML(item.text)}<button type="button" data-john-flow-remove-keyword="keyword" data-keyword="${escapeHTML(item.text)}" aria-label="删除 ${escapeHTML(item.text)}"><i data-lucide="x"></i></button></span>`).join('') : '<small>暂无手动关键词</small>'}</div></article>`).join('')}<div class="john-flow-keyword-add" data-john-flow-keyword-form="keyword"><select aria-label="选择关键词分组">${johnKeywordGroups.map(group => `<option value="${group.key}" ${group.key === 'manual' ? 'selected' : ''}>${group.label}</option>`).join('')}</select><input name="keyword" type="text" placeholder="输入英文关键词" /><button type="button" data-john-flow-add-keyword><i data-lucide="plus"></i></button></div></section><section class="john-flow-negative-column"><header><div><h3>否定词</h3><p>排除低意图与无关流量。</p></div></header><div class="john-flow-keyword-tags">${draft.negativeKeywords.map(keyword => `<span>${escapeHTML(keyword)}<button type="button" data-john-flow-remove-keyword="negative" data-keyword="${escapeHTML(keyword)}" aria-label="删除 ${escapeHTML(keyword)}"><i data-lucide="x"></i></button></span>`).join('')}</div><div class="john-flow-keyword-add simple" data-john-flow-keyword-form="negative"><input name="keyword" type="text" placeholder="输入英文否定词" /><button type="button" data-john-flow-add-keyword><i data-lucide="plus"></i></button></div></section></div></div>`;
  }
  refreshIcons();
}

function renderJohnFlowAdAssets() {
  const draft = johnFlowState.adDraft;
  const renderAssets = (items, key, max) => items.map((item, index) => {
    const field = key === 'descriptions'
      ? `<textarea maxlength="${max + 20}" data-john-flow-asset-text="${key}" data-index="${index}">${escapeHTML(item.text)}</textarea>`
      : `<input type="text" value="${escapeHTML(item.text)}" maxlength="${max + 20}" data-john-flow-asset-text="${key}" data-index="${index}">`;
    return `<div class="john-flow-asset-row ${key === 'descriptions' ? 'is-description' : ''}"><input type="checkbox" data-john-flow-asset-check="${key}" data-index="${index}" ${item.checked ? 'checked' : ''} aria-label="使用这条${key === 'headlines' ? '标题' : '描述'}">${field}<small class="${item.text.length > max ? 'over' : ''}">${item.text.length}/${max}</small><button type="button" data-john-flow-remove-asset="${key}" data-index="${index}" aria-label="删除"><i data-lucide="trash-2"></i></button></div>`;
  }).join('');
  document.querySelector('#johnFlowHeadlineFields').innerHTML = renderAssets(draft.headlines, 'headlines', 30);
  document.querySelector('#johnFlowDescriptionFields').innerHTML = renderAssets(draft.descriptions, 'descriptions', 90);
  draft.sitelinks = draft.sitelinks.map(normalizeJohnSitelink).slice(0, johnSitelinkLimit);
  document.querySelector('#johnFlowSitelinkFields').innerHTML = draft.sitelinks.map((item, index) => `<article><header><strong>站内链接 ${index + 1}</strong><button type="button" data-john-flow-remove-sitelink data-index="${index}"><i data-lucide="trash-2"></i>删除</button></header><div><label><span>链接文字</span><input value="${escapeHTML(item.text)}" data-john-flow-sitelink-field="text" data-index="${index}" placeholder="Products"></label><label><span>说明第一行</span><input value="${escapeHTML(item.description1)}" data-john-flow-sitelink-field="description1" data-index="${index}" placeholder="Explore our product range"></label><label><span>说明第二行</span><input value="${escapeHTML(item.description2)}" data-john-flow-sitelink-field="description2" data-index="${index}" placeholder="Solutions for global buyers"></label><label><span>网址</span><input value="${escapeHTML(item.url)}" data-john-flow-sitelink-field="url" data-index="${index}" placeholder="/products"></label></div></article>`).join('');
  const calloutFields = document.querySelector('#johnFlowCalloutFields');
  if (calloutFields) calloutFields.innerHTML = draft.callouts.map((item, index) => `<label><input type="checkbox" data-john-flow-callout data-index="${index}" ${item.checked ? 'checked' : ''}><span>${escapeHTML(item.text)}</span></label>`).join('');
  document.querySelector('#johnFlowAdAssets').hidden = !johnFlowState.adGenerated;
  document.querySelector('#johnFlowAdResult').hidden = !johnFlowState.adGenerated;
  document.querySelector('#johnFlowCreateAd').disabled = !johnFlowState.adGenerated;
  refreshIcons();
}

function updateJohnFlowPreview() {
  const campaign = johnCampaigns.find(item => item.id === johnFlowState.campaignId);
  const draft = johnFlowState.adDraft;
  if (!campaign || !draft) return;
  const domain = normalizeJohnDomain(campaign.domain);
  const parts = domain.split('.');
  const brandPart = parts[0]?.toLowerCase() === 'www' && parts[1] ? parts[1] : parts[0];
  const brand = brandPart ? brandPart.replace(/[-_]/g, ' ').replace(/\b\w/g, char => char.toUpperCase()) : 'Your Company';
  const product = String(campaign.productLine && campaign.productLine !== '全部产品' ? campaign.productLine : 'Energy Storage').replace(/[^\x20-\x7E]/g, '').trim() || 'Energy Storage';
  const headline = draft.headlines.filter(item => item.checked && item.text.trim()).slice(0, 3).map(item => item.text.trim()).join(' | ') || `${product} Factory | Factory Direct ${product} | OEM Solutions For Brands`;
  const description = draft.descriptions.find(item => item.checked && item.text.trim())?.text || `Reliable ${product.toLowerCase()} systems for global distributors, installers and project buyers.`;
  const links = draft.sitelinks.filter(item => item.text.trim()).slice(0, 4);
  document.querySelector('#johnFlowPreviewBrand').textContent = brand;
  document.querySelector('#johnFlowPreviewUrl').textContent = `https://${domain || 'yourcompany.com'}`;
  document.querySelector('#johnFlowPreviewHeadline').textContent = headline;
  document.querySelector('#johnFlowPreviewDescription').textContent = description;
  document.querySelector('#johnFlowPreviewLinks').innerHTML = (links.length ? links : [{ text: 'Products' }, { text: 'OEM Services' }, { text: 'Quality Control' }, { text: 'Contact Us' }]).map(item => `<span>${escapeHTML(item.text)}</span>`).join('');
}

function johnFlowAdThinkingScript() {
  const campaign = johnCampaigns.find(item => item.id === johnFlowState.campaignId);
  const domain = normalizeJohnDomain(campaign?.domain) || '你的独立站';
  const product = campaign?.productLine || '全部产品';
  const markets = johnCountryLabels(campaign?.countries || []);
  return [
    { type: 'line', text: `正在读取 ${domain} 的网站结构与核心页面…` },
    { type: 'line', text: `已识别当前产品范围：${product}` },
    { type: 'layer', text: '网站与业务信号' },
    { type: 'line', text: '正在提取产品能力、应用场景、认证与供应信息…' },
    { type: 'line', text: '判断：以 B2B 采购、供应商筛选和解决方案搜索作为主要意图' },
    { type: 'layer', text: `目标市场 · ${markets}` },
    { type: 'line', text: '正在匹配目标市场常用表达，并排除消费级与低价值查询…' },
    { type: 'line', text: '已筛出制造商、供应商、OEM 与批发采购等高意图主题' },
    { type: 'layer', text: '关键词与否定词组织' },
    { type: 'line', text: '正在按搜索意图分组，并检查关键词重复与覆盖范围…' },
    { type: 'line', text: '分析完成，正在整理可审核的标题、描述与站内链接。' }
  ];
}

function renderJohnFlowAdThinking() {
  const thinking = document.querySelector('#johnFlowAdThinking');
  const generating = johnFlowState.adStage >= 0;
  thinking.hidden = !generating;
  if (!generating) return;
  const visibleItems = johnFlowAdThinkingScript().slice(0, johnFlowState.adStage + 1);
  thinking.innerHTML = `<div class="john-flow-ad-thinking-rail" aria-hidden="true"><i data-lucide="loader-circle"></i><span></span></div><div class="john-flow-ad-thinking-content"><strong>John 正在生成广告素材</strong><div class="john-flow-ad-thinking-stream">${visibleItems.map(item => `<${item.type === 'layer' ? 'p' : 'div'} class="${item.type === 'layer' ? 'john-flow-ad-thinking-layer' : 'john-flow-ad-thinking-line'}">${escapeHTML(item.text)}</${item.type === 'layer' ? 'p' : 'div'}>`).join('')}</div></div>`;
  refreshIcons();
}

function renderJohnFlowAdStep() {
  const campaign = johnCampaigns.find(item => item.id === johnFlowState.campaignId);
  if (!campaign) return;
  const ended = Boolean(campaign.endDate && campaign.endDate < johnToday());
  const running = campaign.status === 'enabled' && !ended;
  const status = running ? '运行中' : johnFlowStatusLabel(campaign);
  document.querySelector('#johnFlowAdContextCopy').textContent = `广告将继承「${campaign.name}」的投放范围与 ${campaign.keywords.length} 个关键词。`;
  document.querySelector('#johnFlowAdParentSummary').innerHTML = `<span class="john-flow-parent-icon"><i data-lucide="presentation"></i></span><div class="john-flow-parent-copy"><span>所属广告系列</span><strong>${escapeHTML(campaign.name)}</strong><small>${escapeHTML(campaign.domain)} · ${escapeHTML(johnCountryLabels(campaign.countries))} · ${formatJohnMoney(campaign.budget)}/天</small></div><div class="john-flow-parent-meta"><b class="${running ? 'is-running' : ''}">${escapeHTML(status)}</b><small>${campaign.keywords.length} 个关键词 · ${johnCampaignAds(campaign.id).length} 个广告</small></div>`;
  document.querySelector('#johnFlowAdName').value = johnFlowState.adDraft.name;
  const preview = document.querySelector('.john-flow-preview');
  const previewToggle = document.querySelector('#johnFlowPreviewToggle');
  preview.classList.toggle('collapsed', johnFlowState.previewCollapsed);
  previewToggle.setAttribute('aria-expanded', String(!johnFlowState.previewCollapsed));
  previewToggle.setAttribute('aria-label', '关闭广告预览');
  previewToggle.innerHTML = '<i data-lucide="x"></i>';
  const generating = johnFlowState.adStage >= 0;
  const generateButton = document.querySelector('#johnFlowGenerateAd');
  generateButton.disabled = generating;
  generateButton.innerHTML = generating
    ? '<i data-lucide="loader-circle"></i><span>正在生成中</span>'
    : johnFlowState.adGenerated
      ? '<i data-lucide="refresh-cw"></i><span>重新生成</span>'
      : '<i data-lucide="sparkles"></i><span>生成广告素材</span>';
  renderJohnFlowAdThinking();
  renderJohnFlowAdAssets();
  updateJohnFlowPreview();
}

function renderJohnFlowScheduleStep() {
  const draft = johnFlowState.campaignDraft;
  document.querySelector('#johnFlowScheduleStartDate').value = draft.startDate;
  document.querySelector('#johnFlowScheduleEndDate').value = draft.endDate;
  document.querySelector('#johnFlowScheduleBudget').value = draft.budget;
}

function renderJohnFlowSuccess() {
  const ad = johnFlowState.lastAd;
  const campaign = johnCampaigns.find(item => item.id === ad?.campaignId);
  const summary = document.querySelector('#johnFlowSuccessSummary');
  if (!summary || !ad) return;
  summary.innerHTML = `<div><span>广告名称</span><strong>${escapeHTML(ad.name)}</strong></div><div><span>所属广告系列</span><strong>${escapeHTML(campaign?.name || '')}</strong></div><div><span>状态</span><strong>已启用${campaign?.status === 'paused' ? ' · 系列已暂停' : ''}</strong></div><div><span>素材</span><strong>${ad.headlines.length} 条标题 · ${ad.descriptions.length} 条描述 · ${ad.sitelinks.length} 条链接</strong></div>`;
}

function renderJohnCreateFlow() {
  const mode = johnFlowState.mode;
  if (mode === 'existing' && !johnFlowState.campaignId && johnCampaigns.length) {
    johnFlowState.campaignId = johnCampaigns.find(campaign => !campaign.endDate || campaign.endDate >= johnToday())?.id || johnCampaigns[0].id;
  }
  document.querySelectorAll('[data-john-flow-mode]').forEach(button => {
    const selected = button.dataset.johnFlowMode === mode;
    button.classList.toggle('selected', selected);
    if (button.getAttribute('role') === 'radio') button.setAttribute('aria-checked', String(selected));
  });
  const currentIndex = johnFlowStepOrder.indexOf(johnFlowState.step);
  const adIndex = johnFlowStepOrder.indexOf('ad');
  const setupVisible = currentIndex >= 0 && currentIndex < adIndex;
  const keywordVisible = johnFlowState.keywordStage >= 0 || johnFlowState.keywordsAnalyzed || johnFlowState.step === 'keywords';
  const keywordBusy = johnFlowState.keywordStage >= 0;
  const newKeywordFlow = mode === 'new' && keywordVisible && setupVisible;
  const newKeywordResult = newKeywordFlow && johnFlowState.keywordsAnalyzed && !keywordBusy;
  const scheduleVisible = setupVisible && mode === 'new' && johnFlowState.keywordsAnalyzed && currentIndex >= johnFlowStepOrder.indexOf('schedule');
  document.querySelector('.john-flow-mode-card').hidden = newKeywordFlow;
  document.querySelector('#johnFlowExistingPanel').hidden = mode !== 'existing';
  document.querySelector('#johnFlowNewPanel').hidden = mode !== 'new';
  document.querySelector('#johnCreateFlowPage').classList.toggle('keyword-flow-active', newKeywordFlow);
  document.querySelector('#johnCreateFlowPage').classList.toggle('keyword-generating', newKeywordFlow && keywordBusy);
  document.querySelector('#johnCreateFlowPage').classList.toggle('keyword-result-active', newKeywordResult);
  const adVisible = johnFlowState.step === 'ad';
  const adGenerating = adVisible && johnFlowState.adStage >= 0;
  const previewOpen = adVisible && !johnFlowState.previewCollapsed && (adGenerating || johnFlowState.adGenerated);
  document.querySelector('#johnCreateFlowPage').classList.toggle('ad-flow-active', adVisible);
  document.querySelector('#johnCreateFlowPage').classList.toggle('ad-generated', adVisible && johnFlowState.adGenerated);
  document.querySelector('#johnCreateFlowPage').classList.toggle('ad-generating', adGenerating);
  document.querySelector('#johnCreateFlowPage').classList.toggle('ad-preview-open', previewOpen);
  document.querySelector('#johnFlowCampaignStep').hidden = !setupVisible;
  document.querySelector('#johnFlowKeywordStep').hidden = !setupVisible || !keywordVisible;
  document.querySelector('#johnFlowKeywordStep').classList.toggle('is-generating', newKeywordFlow && keywordBusy);
  document.querySelector('#johnFlowKeywordStep').classList.toggle('is-result', newKeywordResult);
  document.querySelector('#johnFlowScheduleStep').hidden = !scheduleVisible;
  document.querySelector('#johnFlowAdStep').hidden = !adVisible;
  document.querySelector('#johnFlowCompleteStep').hidden = johnFlowState.step !== 'complete';
  document.querySelectorAll('[data-john-flow-step]').forEach(section => {
    section.classList.toggle('current', section.dataset.johnFlowStep === johnFlowState.step);
    section.classList.toggle('history', johnFlowStepOrder.indexOf(section.dataset.johnFlowStep) < currentIndex);
  });
  document.querySelectorAll('[data-john-flow-step-target]').forEach((button, index) => {
    button.classList.toggle('active', index === currentIndex);
    button.classList.toggle('complete', index < currentIndex);
    button.disabled = index > currentIndex || (index === 1 && !johnFlowState.keywordsAnalyzed) || (index === 2 && !johnFlowState.keywordsAnalyzed) || (index === 3 && !johnFlowState.campaignId) || index === 4;
  });
  if (mode === 'existing') renderJohnFlowCampaignList();
  if (mode === 'new') renderJohnFlowCampaignForm();
  if (setupVisible && keywordVisible) renderJohnFlowKeywordWorkspace();
  if (scheduleVisible) renderJohnFlowScheduleStep();
  document.querySelector('#johnFlowRegenerateKeywords').disabled = keywordBusy;
  document.querySelectorAll('#johnFlowConfirmCampaign, #johnFlowConfirmKeywords').forEach(button => { button.disabled = keywordBusy; });
  document.querySelector('#johnFlowKeywordStep [data-john-flow-back="campaign"]').disabled = keywordBusy;
  if (adVisible) renderJohnFlowAdStep();
  if (johnFlowState.step === 'complete') renderJohnFlowSuccess();
  refreshIcons();
}

function setJohnFlowError(selector, message = '') {
  const element = document.querySelector(selector);
  if (!element) return;
  element.textContent = message;
  element.hidden = !message;
}

function validateJohnFlowCampaignDraft() {
  const draft = johnFlowState.campaignDraft;
  if (!normalizeJohnDomain(draft.domain)) return '请输入独立站域名。';
  if (!draft.countries.length) return '请至少选择一个投放国家。';
  if (!draft.name.trim()) return '请输入广告系列名称。';
  return '';
}

function validateJohnFlowSchedule() {
  const draft = johnFlowState.campaignDraft;
  if (!draft.startDate) return '请选择投放开始日期。';
  if (draft.endDate && draft.endDate < draft.startDate) return '结束日期不能早于开始日期。';
  const budget = Number(draft.budget);
  if (!Number.isFinite(budget) || budget < 1) return '请输入不小于 1 美元的日预算。';
  return '';
}

async function generateJohnFlowKeywords() {
  const draft = johnFlowState.campaignDraft;
  const run = ++johnFlowKeywordRun;
  johnFlowState.step = 'keywords';
  johnFlowState.keywordStage = 0;
  johnFlowState.keywordThinkingCollapsed = false;
  renderJohnCreateFlow();
  if (johnFlowState.mode !== 'new') {
    window.requestAnimationFrame(() => document.querySelector('#johnFlowKeywordStep')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }
  const script = johnFlowKeywordThinkingScript();
  for (let index = 1; index < script.length; index += 1) {
    await new Promise(resolve => window.setTimeout(resolve, 230));
    if (run !== johnFlowKeywordRun) return;
    johnFlowState.keywordStage = index;
    renderJohnFlowKeywordWorkspace();
  }
  await new Promise(resolve => window.setTimeout(resolve, 360));
  if (run !== johnFlowKeywordRun) return;
  const product = String(draft.productLine || 'Energy Storage').replace(/[^\x20-\x7E]/g, '').trim() || 'Energy Storage';
  draft.keywords = [
    { text: `${product.toLowerCase()} manufacturer`, group: 'supplier' },
    { text: `${product.toLowerCase()} supplier`, group: 'supplier' },
    { text: 'b2b sourcing partner', group: 'supplier' },
    { text: `oem ${product.toLowerCase()} factory`, group: 'oem' },
    { text: `custom ${product.toLowerCase()} manufacturer`, group: 'oem' },
    { text: `${product.toLowerCase()} wholesale`, group: 'solution' },
    { text: `${product.toLowerCase()} solution`, group: 'solution' }
  ].filter((keyword, index, items) => items.findIndex(item => item.text === keyword.text) === index);
  draft.negativeKeywords = ['free', 'cheap', 'diy', 'used', 'repair', 'jobs'];
  johnFlowState.keywordStage = -1;
  johnFlowState.keywordsAnalyzed = true;
  johnFlowState.keywordsStale = false;
  johnFlowState.keywordThinkingCollapsed = true;
  johnFlowState.dirty = true;
  renderJohnCreateFlow();
}

function enterJohnFlowAdStep(campaignId) {
  const campaign = johnCampaigns.find(item => item.id === campaignId);
  if (!campaign) return;
  johnFlowState.campaignId = campaignId;
  johnFlowState.step = 'ad';
  johnFlowState.adDraft = emptyJohnFlowAdDraft(campaignId);
  johnFlowState.adGenerated = false;
  johnFlowState.adStage = -1;
  johnFlowState.previewCollapsed = false;
  setJohnFlowError('#johnFlowAdError');
  renderJohnCreateFlow();
  window.setTimeout(() => {
    document.querySelector('#johnFlowAdStep')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 0);
}

function enterJohnFlowScheduleStep() {
  if (!johnFlowState.campaignDraft.keywords.length) return setJohnFlowError('#johnFlowKeywordError', '请至少保留一个关键词。');
  setJohnFlowError('#johnFlowKeywordError');
  johnFlowState.step = 'schedule';
  renderJohnCreateFlow();
  window.requestAnimationFrame(() => {
    document.querySelector('#johnFlowScheduleStep')?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    document.querySelector('#johnFlowScheduleStartDate')?.focus({ preventScroll: true });
  });
}

function confirmJohnFlowCampaign() {
  const draft = johnFlowState.campaignDraft;
  if (!draft.keywords.length) return setJohnFlowError('#johnFlowKeywordError', '请至少保留一个关键词。');
  if (johnFlowState.mode === 'new') {
    const error = validateJohnFlowSchedule();
    if (error) return setJohnFlowError('#johnFlowScheduleError', error);
    setJohnFlowError('#johnFlowScheduleError');
  }
  let campaign = johnCampaigns.find(item => item.id === johnFlowState.campaignId);
  if (johnFlowState.mode === 'new' && !johnFlowState.campaignCreated) {
    campaign = {
      id: `john-campaign-${Date.now().toString(36)}`,
      name: draft.name.trim(),
      domain: normalizeJohnDomain(draft.domain),
      countries: [...draft.countries],
      productLine: draft.productLine || '全部产品',
      status: 'draft',
      budget: Number(draft.budget),
      startDate: draft.startDate,
      endDate: draft.endDate,
      keywords: normalizeJohnKeywords(draft.keywords),
      negativeKeywords: [...draft.negativeKeywords],
      keywordUpdatedAt: johnToday(),
      metrics: { impressions: 0, clicks: 0, cost: 0, conversions: 0 }
    };
    johnCampaigns.push(campaign);
    johnFlowState.campaignCreated = true;
    johnFlowState.campaignId = campaign.id;
  } else if (campaign) {
    if (johnFlowState.mode === 'new') {
      campaign.name = draft.name.trim();
      campaign.domain = normalizeJohnDomain(draft.domain);
      campaign.countries = [...draft.countries];
      campaign.productLine = draft.productLine || '全部产品';
      campaign.budget = Number(draft.budget);
      campaign.startDate = draft.startDate;
      campaign.endDate = draft.endDate;
    }
    campaign.keywords = normalizeJohnKeywords(draft.keywords);
    campaign.negativeKeywords = [...draft.negativeKeywords];
    campaign.keywordUpdatedAt = johnToday();
  }
  if (!campaign) return setJohnFlowError('#johnFlowKeywordError', '广告系列不存在，请返回重新选择。');
  saveJohnCampaigns();
  renderJohnCampaigns();
  setJohnFlowError('#johnFlowKeywordError');
  enterJohnFlowAdStep(campaign.id);
}

function fillJohnFlowGeneratedAd() {
  const draft = johnFlowState.adDraft;
  const campaign = johnCampaigns.find(item => item.id === draft.campaignId);
  const product = String(campaign?.productLine || 'Energy Storage').replace(/[^\x20-\x7E]/g, '').trim() || 'Energy Storage';
  draft.headlines = [
    `${product} Factory`.slice(0, 30),
    'Factory Direct Solutions',
    'OEM Solutions For Brands',
    'Reliable Global Supplier',
    'Fast Quote, Strict Quality'
  ].map(text => ({ text, checked: true }));
  draft.descriptions = [
    'Reliable solutions for global distributors, installers and project buyers.',
    'Factory direct OEM support with fast quotes, strict quality control and global delivery.'
  ].map(text => ({ text, checked: true }));
  draft.sitelinks = [
    { text: 'Products', description1: 'Explore our complete product range', description2: 'Find the right solution for your project', url: '/products' },
    { text: 'OEM Services', description1: 'Custom solutions for global brands', description2: 'From design to reliable production', url: '/oem-services' },
    { text: 'Quality Control', description1: 'Strict testing at every stage', description2: 'Built for safe and stable performance', url: '/quality' },
    { text: 'Contact Us', description1: 'Talk with our project specialists', description2: 'Get a fast quote for your requirements', url: '/contact' }
  ];
  draft.callouts = ['Fast Quotation', 'OEM Customization', 'Strict Quality Control', 'Global Export Support'].map(text => ({ text, checked: true }));
}

async function generateJohnFlowAd() {
  const name = document.querySelector('#johnFlowAdName').value.trim();
  if (!name) return setJohnFlowError('#johnFlowAdError', '请先填写广告名称。');
  johnFlowState.adDraft.name = name;
  const run = ++johnFlowAdRun;
  const stages = johnFlowAdThinkingScript();
  johnFlowState.adGenerated = false;
  johnFlowState.adStage = 0;
  johnFlowState.previewCollapsed = false;
  renderJohnCreateFlow();
  for (let index = 1; index < stages.length; index += 1) {
    await new Promise(resolve => window.setTimeout(resolve, 230));
    if (run !== johnFlowAdRun) return;
    johnFlowState.adStage = index;
    renderJohnFlowAdThinking();
  }
  await new Promise(resolve => window.setTimeout(resolve, 320));
  if (run !== johnFlowAdRun) return;
  fillJohnFlowGeneratedAd();
  johnFlowState.adGenerated = true;
  johnFlowState.adStage = -1;
  johnFlowState.dirty = true;
  setJohnFlowError('#johnFlowAdError');
  renderJohnCreateFlow();
}

function validateJohnFlowAd() {
  const draft = johnFlowState.adDraft;
  const campaign = johnCampaigns.find(item => item.id === draft.campaignId);
  if (!campaign) return '请选择有效的广告系列。';
  if (!(campaign.keywords || []).length) return '所属广告系列至少需要一个关键词。';
  if (!draft.name.trim()) return '请输入广告名称。';
  if (!johnFlowState.adGenerated) return '请先让 John 生成广告素材。';
  const headlines = draft.headlines.filter(item => item.checked);
  const descriptions = draft.descriptions.filter(item => item.checked);
  if (!headlines.length || !descriptions.length) return '请至少保留一条广告标题和一条广告描述。';
  if (headlines.some(item => !johnEnglish(item.text) || item.text.length > 30)) return '广告标题必须为英文且不超过 30 个字符。';
  if (descriptions.some(item => !johnEnglish(item.text) || item.text.length > 90)) return '广告描述必须为英文且不超过 90 个字符。';
  if (!draft.sitelinks.length) return '请至少添加一条站内链接。';
  if (draft.sitelinks.some(item => !item.text.trim() || !item.description1.trim() || !item.description2.trim() || !item.url.trim())) return '请完整填写每条站内链接的文字、两行说明和网址。';
  if (draft.sitelinks.some(item => !johnEnglish(item.text) || !johnEnglish(item.description1) || !johnEnglish(item.description2))) return '站内链接文字和说明必须使用英文字符。';
  if (draft.callouts.filter(item => item.checked).some(item => !johnEnglish(item.text) || item.text.length > 25)) return '宣传信息必须为英文且不超过 25 个字符。';
  return '';
}

function createJohnFlowAd() {
  johnFlowState.adDraft.name = document.querySelector('#johnFlowAdName').value.trim();
  const error = validateJohnFlowAd();
  if (error) return setJohnFlowError('#johnFlowAdError', error);
  const parent = johnCampaigns.find(campaign => campaign.id === johnFlowState.campaignId);
  const draft = johnFlowState.adDraft;
  const metrics = {
    impressions: Math.round(parent.budget * 7 * 122),
    clicks: Math.round(parent.budget * 7 * 4.4),
    cost: Math.round(parent.budget * 7 * .9),
    conversions: Math.max(1, Math.round(parent.budget * 7 * .035))
  };
  const ad = {
    id: `john-ad-${Date.now().toString(36)}`,
    campaignId: parent.id,
    name: draft.name.trim(),
    status: 'enabled',
    headlines: draft.headlines.filter(item => item.checked).map(item => item.text.trim()),
    descriptions: draft.descriptions.filter(item => item.checked).map(item => item.text.trim()),
    sitelinks: draft.sitelinks.filter(item => item.text.trim() && item.url.trim()),
    callouts: draft.callouts.filter(item => item.checked).map(item => item.text),
    metrics,
    createdAt: johnToday(),
    updatedAt: johnToday()
  };
  johnAds.push(ad);
  parent.metrics = {
    impressions: (Number(parent.metrics?.impressions) || 0) + metrics.impressions,
    clicks: (Number(parent.metrics?.clicks) || 0) + metrics.clicks,
    cost: (Number(parent.metrics?.cost) || 0) + metrics.cost,
    conversions: (Number(parent.metrics?.conversions) || 0) + metrics.conversions
  };
  if (parent.status === 'draft') parent.status = 'paused';
  saveJohnCampaigns();
  johnRecentlyCreatedAdId = ad.id;
  johnFlowState.lastAd = cloneJohnValue(ad);
  johnFlowState.step = 'complete';
  johnFlowState.dirty = false;
  renderJohnCampaigns();
  renderJohnCreateFlow();
  window.requestAnimationFrame(() => document.querySelector('#johnFlowCompleteStep')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
}

function handleJohnFlowBack(target) {
  if (target === 'campaign') {
    johnFlowAdRun += 1;
    johnFlowState.step = 'campaign';
    renderJohnCreateFlow();
    window.requestAnimationFrame(() => document.querySelector('#johnFlowCampaignStep')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }
}

document.querySelector('#johnPage [data-john-create-flow]')?.addEventListener('click', event => {
  startJohnCreateFlow({ mode: event.currentTarget.dataset.johnFlowMode || '' });
});

document.querySelector('#johnCreateFlowPage')?.addEventListener('input', event => {
  const target = event.target;
  if (target.closest('#johnFlowNewPanel')) {
    const draft = johnFlowState.campaignDraft;
    if (target.id === 'johnFlowDomain') draft.domain = target.value;
    if (target.id === 'johnFlowProductLine') draft.productLine = target.value;
    if (target.id === 'johnFlowCampaignName') draft.name = target.value;
    if (target.closest('#johnFlowCountryGrid')) {
      draft.countries = [...document.querySelectorAll('#johnFlowCountryGrid input:checked')].map(input => input.value);
      updateJohnFlowCountrySelect();
    }
    if (johnFlowState.keywordsAnalyzed) {
      johnFlowState.keywordsStale = true;
      document.querySelector('#johnFlowKeywordStaleNote').hidden = false;
    }
    johnFlowState.dirty = true;
    setJohnFlowError('#johnFlowCampaignError');
  }
  if (target.closest('#johnFlowScheduleStep')) {
    const draft = johnFlowState.campaignDraft;
    if (target.id === 'johnFlowScheduleStartDate') draft.startDate = target.value;
    if (target.id === 'johnFlowScheduleEndDate') draft.endDate = target.value;
    if (target.id === 'johnFlowScheduleBudget') draft.budget = target.value;
    johnFlowState.dirty = true;
    setJohnFlowError('#johnFlowScheduleError');
  }
  if (target.id === 'johnFlowAdName') johnFlowState.adDraft.name = target.value;
  if (target.dataset.johnFlowAssetText) {
    const key = target.dataset.johnFlowAssetText;
    johnFlowState.adDraft[key][Number(target.dataset.index)].text = target.value;
    const max = key === 'headlines' ? 30 : 90;
    target.nextElementSibling.textContent = `${target.value.length}/${max}`;
    target.nextElementSibling.classList.toggle('over', target.value.length > max);
  }
  if (target.dataset.johnFlowAssetCheck) johnFlowState.adDraft[target.dataset.johnFlowAssetCheck][Number(target.dataset.index)].checked = target.checked;
  if (target.dataset.johnFlowSitelinkField) johnFlowState.adDraft.sitelinks[Number(target.dataset.index)][target.dataset.johnFlowSitelinkField] = target.value;
  if (target.hasAttribute('data-john-flow-callout')) johnFlowState.adDraft.callouts[Number(target.dataset.index)].checked = target.checked;
  if (target.closest('#johnFlowAdStep')) {
    johnFlowState.dirty = true;
    setJohnFlowError('#johnFlowAdError');
    updateJohnFlowPreview();
  }
});

document.querySelector('#johnCreateFlowPage')?.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button.id === 'johnFlowCountryTrigger') {
    setJohnFlowCountryDropdown(button.getAttribute('aria-expanded') !== 'true');
    return;
  }
  if (button.hasAttribute('data-john-flow-country-done')) {
    setJohnFlowCountryDropdown(false);
    document.querySelector('#johnFlowCountryTrigger')?.focus();
    return;
  }
  if (button.id === 'johnFlowThinkingToggle') {
    johnFlowState.keywordThinkingCollapsed = !johnFlowState.keywordThinkingCollapsed;
    renderJohnFlowKeywordWorkspace();
    return;
  }
  if (button.hasAttribute('data-john-flow-exit')) {
    if (johnFlowState.dirty && !window.confirm('当前内容尚未创建，确定离开吗？')) return;
    johnFlowState.dirty = false;
    window.location.hash = 'john';
    return;
  }
  if (button.hasAttribute('data-john-flow-reset')) {
    if (johnFlowState.dirty && !window.confirm('重新开始会清空当前未创建的内容，是否继续？')) return;
    startJohnCreateFlow();
    return;
  }
  if (button.hasAttribute('data-john-flow-switch-new')) {
    johnFlowState.mode = 'new';
    johnFlowState.campaignId = '';
    renderJohnCreateFlow();
    return;
  }
  if (button.dataset.johnFlowMode) {
    johnFlowState.mode = button.dataset.johnFlowMode;
    johnFlowState.campaignId = '';
    johnFlowState.repairingExisting = false;
    johnFlowState.dirty = true;
    renderJohnCreateFlow();
    return;
  }
  if (button.dataset.johnFlowCampaignId) {
    johnFlowState.campaignId = button.dataset.johnFlowCampaignId;
    johnFlowState.dirty = true;
    setJohnFlowError('#johnFlowExistingError');
    renderJohnFlowCampaignList();
    return;
  }
  if (button.dataset.johnFlowCampaignPage) {
    johnFlowState.campaignPage = Number(button.dataset.johnFlowCampaignPage) || 1;
    renderJohnFlowCampaignList();
    return;
  }
  if (button.id === 'johnFlowUseCampaign') {
    const campaign = johnCampaigns.find(item => item.id === johnFlowState.campaignId);
    if (!campaign) return setJohnFlowError('#johnFlowExistingError', '请选择一个广告系列。');
    if (campaign.endDate && campaign.endDate < johnToday()) return setJohnFlowError('#johnFlowExistingError', '该广告系列已结束，请先在广告管理中调整排期。');
    if (!(campaign.keywords || []).length) {
      johnFlowState.campaignDraft = johnFlowCampaignToDraft(campaign);
      johnFlowState.repairingExisting = true;
      johnFlowState.keywordsAnalyzed = false;
      generateJohnFlowKeywords();
      return;
    }
    enterJohnFlowAdStep(campaign.id);
    return;
  }
  if (button.id === 'johnFlowStartKeywords') {
    const error = validateJohnFlowCampaignDraft();
    if (error) return setJohnFlowError('#johnFlowCampaignError', error);
    setJohnFlowError('#johnFlowCampaignError');
    if (johnFlowState.keywordsAnalyzed && !johnFlowState.keywordsStale) {
      if (!window.confirm('重新生成会覆盖当前关键词修改，是否继续？')) return;
      generateJohnFlowKeywords();
    } else generateJohnFlowKeywords();
    return;
  }
  if (button.id === 'johnFlowRegenerateKeywords' || button.hasAttribute('data-john-flow-regenerate-keywords')) {
    if (johnFlowState.keywordsAnalyzed && !window.confirm('重新生成会覆盖当前关键词修改，是否继续？')) return;
    generateJohnFlowKeywords();
    return;
  }
  if (button.dataset.johnFlowRemoveKeyword) {
    const value = button.dataset.keyword.toLowerCase();
    if (button.dataset.johnFlowRemoveKeyword === 'negative') johnFlowState.campaignDraft.negativeKeywords = johnFlowState.campaignDraft.negativeKeywords.filter(keyword => keyword.toLowerCase() !== value);
    else johnFlowState.campaignDraft.keywords = normalizeJohnKeywords(johnFlowState.campaignDraft.keywords).filter(keyword => keyword.text.toLowerCase() !== value);
    johnFlowState.dirty = true;
    renderJohnFlowKeywordWorkspace();
    return;
  }
  if (button.hasAttribute('data-john-flow-add-keyword')) {
    const form = button.closest('[data-john-flow-keyword-form]');
    const input = form.querySelector('input[name="keyword"]');
    const value = input.value.trim();
    if (!value) return;
    if (!johnEnglish(value)) return setJohnFlowError('#johnFlowKeywordError', '关键词必须使用英文字符。');
    const negative = form.dataset.johnFlowKeywordForm === 'negative';
    const exists = negative
      ? johnFlowState.campaignDraft.negativeKeywords.some(keyword => keyword.toLowerCase() === value.toLowerCase())
      : normalizeJohnKeywords(johnFlowState.campaignDraft.keywords).some(keyword => keyword.text.toLowerCase() === value.toLowerCase());
    if (exists) return setJohnFlowError('#johnFlowKeywordError', '这个词已经在列表中。');
    if (negative) johnFlowState.campaignDraft.negativeKeywords.push(value);
    else johnFlowState.campaignDraft.keywords.push({ text: value, group: form.querySelector('select')?.value || 'manual' });
    input.value = '';
    setJohnFlowError('#johnFlowKeywordError');
    johnFlowState.dirty = true;
    renderJohnFlowKeywordWorkspace();
    return;
  }
  if (button.id === 'johnFlowConfirmKeywords') return johnFlowState.mode === 'new' ? enterJohnFlowScheduleStep() : confirmJohnFlowCampaign();
  if (button.id === 'johnFlowConfirmCampaign' || button.id === 'johnFlowConfirmSchedule') return confirmJohnFlowCampaign();
  if (button.dataset.johnFlowBack) return handleJohnFlowBack(button.dataset.johnFlowBack);
  if (button.id === 'johnFlowGenerateAd') {
    if (johnFlowState.adGenerated && !window.confirm('重新生成会覆盖当前广告素材修改，是否继续？')) return;
    return generateJohnFlowAd();
  }
  if (button.id === 'johnFlowPreviewToggle') {
    johnFlowState.previewCollapsed = true;
    renderJohnCreateFlow();
    return;
  }
  if (button.dataset.johnFlowAddAsset) {
    const key = button.dataset.johnFlowAddAsset === 'headline' ? 'headlines' : 'descriptions';
    johnFlowState.adDraft[key].push({ text: '', checked: true });
    renderJohnFlowAdAssets();
    return;
  }
  if (button.dataset.johnFlowRemoveAsset) {
    johnFlowState.adDraft[button.dataset.johnFlowRemoveAsset].splice(Number(button.dataset.index), 1);
    renderJohnFlowAdAssets();
    updateJohnFlowPreview();
    return;
  }
  if (button.hasAttribute('data-john-flow-add-sitelink')) {
    if (johnFlowState.adDraft.sitelinks.length >= johnSitelinkLimit) return setJohnFlowError('#johnFlowAdError', '最多添加 6 条站内链接。');
    johnFlowState.adDraft.sitelinks.push(normalizeJohnSitelink());
    renderJohnFlowAdAssets();
    return;
  }
  if (button.hasAttribute('data-john-flow-remove-sitelink')) {
    johnFlowState.adDraft.sitelinks.splice(Number(button.dataset.index), 1);
    renderJohnFlowAdAssets();
    updateJohnFlowPreview();
    return;
  }
  if (button.hasAttribute('data-john-flow-add-callout')) {
    const input = document.querySelector('#johnFlowCalloutInput');
    const value = input.value.trim();
    if (!value) return;
    if (!johnEnglish(value) || value.length > 25) return setJohnFlowError('#johnFlowAdError', '宣传信息必须为英文且不超过 25 个字符。');
    johnFlowState.adDraft.callouts.push({ text: value, checked: true });
    input.value = '';
    renderJohnFlowAdAssets();
    return;
  }
  if (button.id === 'johnFlowCreateAd') return createJohnFlowAd();
  if (button.id === 'johnFlowGoManage') {
    johnFlowState.dirty = false;
    setJohnManagementTab('ads');
    window.location.hash = 'john/ads';
    window.setTimeout(() => document.querySelector(`[data-john-ad-id="${johnRecentlyCreatedAdId}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
    return;
  }
  if (button.id === 'johnFlowContinueAd') {
    johnFlowState.lastAd = null;
    johnFlowState.dirty = false;
    enterJohnFlowAdStep(johnFlowState.campaignId);
    return;
  }
  if (button.dataset.johnFlowStepTarget) {
    const targetIndex = johnFlowStepOrder.indexOf(button.dataset.johnFlowStepTarget);
    const currentIndex = johnFlowStepOrder.indexOf(johnFlowState.step);
    if (targetIndex < currentIndex) {
      johnFlowState.step = button.dataset.johnFlowStepTarget;
      renderJohnCreateFlow();
    }
  }
});

document.addEventListener('click', event => {
  if (!event.target.closest('#johnFlowCountrySelect')) setJohnFlowCountryDropdown(false);
});

document.addEventListener('keydown', event => {
  if (event.key !== 'Escape' || document.querySelector('#johnFlowCountryMenu')?.hidden) return;
  setJohnFlowCountryDropdown(false);
  document.querySelector('#johnFlowCountryTrigger')?.focus();
});

window.addEventListener('beforeunload', event => {
  if (!johnFlowState.dirty || window.location.hash !== '#john/create-ad') return;
  event.preventDefault();
  event.returnValue = '';
});

renderJohnCampaigns();
renderJohnSuggestionStates();
renderJohnCreateFlow();
