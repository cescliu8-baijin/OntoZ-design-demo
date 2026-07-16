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
const wendyPublisherPreviewText = document.querySelector('#wendyPublisherPreviewText');
const wendyPublisherMode = document.querySelector('#wendyPublisherMode');
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
  strategyRevisionCount: 0,
  calendarView: 'week',
  activePostId: null,
  scheduleMode: 'now',
  schedulePickerMonth: null
};

const wendySocialIconSources = {
  linkedin: 'assets/LinkedIn.svg',
  instagram: 'assets/Instagram.svg',
  tiktok: 'assets/TikTok.svg',
  x: 'assets/X.svg',
  facebook: 'assets/Facebook.svg',
  youtube: 'assets/YouTube.svg'
};

function getWendySocialIconKey(value = '') {
  const normalized = String(value).toLowerCase();
  if (normalized.includes('linkedin')) return 'linkedin';
  if (normalized.includes('instagram')) return 'instagram';
  if (normalized.includes('tiktok') || normalized === 'music-2') return 'tiktok';
  if (normalized === 'x' || normalized.includes('twitter')) return 'x';
  if (normalized.includes('facebook')) return 'facebook';
  if (normalized.includes('youtube')) return 'youtube';
  return '';
}

function renderWendySocialIcon(value, label = '') {
  const iconKey = getWendySocialIconKey(value);
  if (!iconKey) return renderIcon(value);
  const safeLabel = escapeHTML(label || iconKey);
  return `<img class="wendy-social-icon" data-wendy-social-icon="${iconKey}" src="${wendySocialIconSources[iconKey]}" alt="" aria-hidden="true" loading="lazy" decoding="async" title="${safeLabel}" />`;
}

function getWendyPostStatus(post) {
  if (!post) return 'draft';
  if (post.status === 'failed' || post.status === 'draft' || post.status === 'published') return post.status;
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
    account: account?.account || '@OntoZ',
    platform,
    bound: account?.bound !== false
  };
}

function getWendyImageInfo(platform) {
  if (platform.includes('TikTok')) return { label: '短视频封面', icon: 'play' };
  if (platform.includes('YouTube')) return { label: 'Shorts 封面', icon: 'youtube' };
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
  const safePostId = escapeHTML(post.id);
  const safePlatform = escapeHTML(post.platform);
  const safeTitle = escapeHTML(post.title);
  const safeTime = escapeHTML(post.time || '');
  const safeCopy = escapeHTML(post.copy || '');
  const failure = post.failureReason ? ` data-failure-reason="${escapeHTML(post.failureReason)}"` : '';

  return `
    <button class="wendy-event ${getWendyEventColor(post.platform)} ${escapeHTML(status)}" style="--start: ${getWendyWeekStart(post.time)}; --duration: .86;" data-wendy-event data-wendy-post-id="${safePostId}" data-platform="${safePlatform}" data-time="${safeTime}" data-copy="${safeCopy}" data-status="${escapeHTML(status)}"${failure} type="button">
      ${renderWendySocialIcon(post.platform, post.platform)}
      <span>${safePlatform} ${safeTitle}</span>
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
  const statusOrder = { scheduled: 1, draft: 2, failed: 3, published: 4 };
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
      const listAccountName = '@EricLiu';
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
            <span class="${escapeHTML(getWendyEventColor(post.platform))}" aria-label="${escapeHTML(imageInfo.label)}">${renderWendySocialIcon(imageInfo.icon, imageInfo.label)}</span>
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
      ? '月视图按自然月呈现全部已排期、已发布和失败记录，适合检查内容密度。'
      : view === 'list'
        ? '列表按状态分栏：已发布只能查看，草稿可编辑，失败项显示原因并支持重新发布。'
        : '本周最佳发布窗口集中在周二至周四 10:00-16:00，已自动避开内容冲突。';
    wendyCalendarHint.innerHTML = `${renderIcon('sparkles')}${escapeHTML(hintText)}`;
    refreshIcons();
  }
}

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

function renderWendyAccountCard(account) {
  const actionText = account.bound ? '解绑' : '去绑定';
  const status = account.bound
    ? `<span class="wendy-managed-account-status"><i data-lucide="circle-check"></i>已授权</span>`
    : '';

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
          <div class="wendy-preview-avatar ${escapeHTML(config.avatarClass)}">${renderWendySocialIcon(platform, platform)}</div>
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
          ${renderWendySocialIcon(config.icon, platform)}
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
            <button data-wendy-preview-confirm="${escapeHTML(platform)}" type="button"><i data-lucide="send"></i>发布</button>
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
}

function setWendyActiveButton(button, selector) {
  button.closest(selector)?.querySelectorAll('button').forEach(item => item.classList.remove('active', 'selected'));
  button.classList.add(selector.includes('media') ? 'selected' : 'active');
}

function getWendyEventColor(platform) {
  if (platform.includes('LinkedIn')) return 'blue';
  if (platform.includes('Instagram')) return 'pink';
  if (platform.includes('YouTube')) return 'youtube';
  return 'hot';
}

function setWendyPublisherAccess(status = 'draft', failureReason = '', showMode = true) {
  const readOnly = status === 'published';
  const form = document.querySelector('#wendyPublisher form');
  form?.classList.toggle('is-readonly', readOnly);
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

function openWendyPublisher({ platform = 'LinkedIn', time = '2026-07-15T10:30:00', copy = '', status = 'draft', postId = null, failureReason = '', showMode = true } = {}) {
  if (!wendyPublisher) return;
  wendyState.activePostId = postId;
  wendyPublisher.hidden = false;
  setWendyPublisherPlatform(platform);
  setWendyPublisherDateTime(time || '2026-07-15T10:30:00');
  setWendyScheduleMode(status === 'scheduled' || status === 'failed' ? 'schedule' : 'now');
  if (wendyCopyField) wendyCopyField.value = copy || '面向欧洲储能安装商的新一代并网组件已经完成批量测试。点击了解交付稳定性、认证资料和项目支持方案。';
  setWendyPublisherAccess(status, failureReason, showMode);
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

function startWendyAIGeneration(prompt = '帮我生成一条 LinkedIn 新品介绍，强调产品价值和独立站访问入口。', imageCount = 0) {
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
        time: post.time || '2026-07-15T10:30:00',
        copy: post.copy,
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
        time: post.time || '2026-07-15T10:30:00',
        copy: post.copy,
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
      wendyCopyField.value = '面向海外安装商的新一代并网组件已经完成批量测试。Wendy 已根据产品资料整理出认证、交付排期与售后响应亮点，帮助采购团队更快完成供应商评估。';
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
    const prompt = wendyPromptInput?.value.trim() || wendyState.pendingPrompt || '发布一条新品上市社媒，强调产品价值和独立站访问入口。';
    wendyState.pendingPrompt = prompt;
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
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !wendyPublisher?.hidden) {
    closeWendyPublisher();
  }
});
