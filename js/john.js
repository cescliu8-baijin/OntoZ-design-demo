// OntoZ root source module.

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

function labelJohnKeywordControls() {
  document.querySelectorAll('#johnKeywordRows tr').forEach(row => {
    const keyword = row.querySelector('strong')?.textContent?.trim() || '关键词';
    const [matchType, relatedAd] = row.querySelectorAll('select');
    matchType?.setAttribute('aria-label', `${keyword}的匹配类型`);
    relatedAd?.setAttribute('aria-label', `${keyword}关联的广告`);
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
labelJohnKeywordControls();
