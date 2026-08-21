// OntoZ root source module.

const sidebar = document.querySelector('#sidebar');
const collapseButton = document.querySelector('#collapseButton');
const mobileMenuButton = document.querySelector('#mobileMenuButton');
const mobileNavScrim = document.querySelector('#mobileNavScrim');
const mobilePageTitle = document.querySelector('#mobilePageTitle');
const mobileNavigationQuery = window.matchMedia('(max-width: 560px)');

function setMobileNavigation(open) {
  const nextOpen = Boolean(open && mobileNavigationQuery.matches);
  sidebar.classList.toggle('mobile-open', nextOpen);
  document.body.classList.toggle('mobile-nav-open', nextOpen);
  mobileNavScrim.hidden = !nextOpen;
  mobileMenuButton.setAttribute('aria-expanded', String(nextOpen));
  mobileMenuButton.setAttribute('aria-label', nextOpen ? '关闭主导航' : '打开主导航');
  if (mobileNavigationQuery.matches) {
    sidebar.inert = !nextOpen;
    sidebar.setAttribute('aria-hidden', String(!nextOpen));
    collapseButton.setAttribute('aria-expanded', String(nextOpen));
    collapseButton.setAttribute('aria-label', '关闭导航');
  } else {
    sidebar.inert = false;
    sidebar.removeAttribute('aria-hidden');
  }
}

function setDesktopSidebarCollapsed(collapsed) {
  const nextCollapsed = Boolean(collapsed && !mobileNavigationQuery.matches);
  sidebar.classList.toggle('collapsed', nextCollapsed);
  collapseButton.setAttribute('aria-expanded', String(!nextCollapsed));
  collapseButton.setAttribute('aria-label', nextCollapsed ? '展开导航' : '收起导航');
  collapseButton.innerHTML = renderIcon(nextCollapsed ? 'panel-left-open' : 'panel-left-close');
  refreshIcons();
}

collapseButton.addEventListener('click', () => {
  if (mobileNavigationQuery.matches) {
    setMobileNavigation(false);
    return;
  }
  setDesktopSidebarCollapsed(!sidebar.classList.contains('collapsed'));
});

mobileMenuButton.addEventListener('click', () => {
  setMobileNavigation(!sidebar.classList.contains('mobile-open'));
});

mobileNavScrim.addEventListener('click', () => setMobileNavigation(false));

mobileNavigationQuery.addEventListener('change', event => {
  setMobileNavigation(false);
  setDesktopSidebarCollapsed(event.matches ? false : sidebar.classList.contains('collapsed'));
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && sidebar.classList.contains('mobile-open')) {
    setMobileNavigation(false);
    mobileMenuButton.focus();
  }
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
  'john/ads': document.querySelector('#johnAdsPage'),
  'john/create-ad': document.querySelector('#johnCreateFlowPage'),
  'lily/messages': document.querySelector('#lilyInquiryPage'),
  'lily/templates': document.querySelector('#lilyTemplatesPage'),
  'lily/tasks': document.querySelector('#lilyTasksPage'),
  ontology: document.querySelector('#ontologyPage'),
  'ontology/buyer-search-strategy': document.querySelector('#buyerStrategyPage'),
  'ontology/buyer-search-strategy/keyword-validation': document.querySelector('#keywordValidationPage'),
  dashboard: document.querySelector('#dashboardPage'),
  customers: document.querySelector('#customersPage'),
  zoe: document.querySelector('#zoePage'),
  leo: document.querySelector('#leoPage')
};

const standalonePageTitles = {
  wendy: '社媒运营 Wendy',
  'wendy/accounts': '账号管理 · 社媒运营 Wendy',
  'wendy/agent': '内容生成中 · 社媒运营 Wendy',
  lucas: '专业建站 Lucas',
  john: '24/7 投流 John',
  'john/ads': '广告管理 · 24/7 投流 John',
  'john/create-ad': '新建广告 · 24/7 投流 John',
  'lily/messages': '询盘消息',
  'lily/templates': '话术模板',
  'lily/tasks': '任务管理',
  ontology: '企业本体',
  'ontology/buyer-search-strategy': '买家搜索策略 · 企业本体',
  'ontology/buyer-search-strategy/keyword-validation': '搜索词验证 · 买家搜索策略'
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
  if (route.standalonePage?.startsWith('ontology/')) return 'ontology';
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
  const routeTitle = getRouteTitle(route);
  document.title = routeTitle;
  mobilePageTitle.textContent = routeTitle
    .replace(/^OntoZ · /, '')
    .replace(/ · OntoZ$/, '');
}

function focusRouteHeading(route) {
  const routePage = route.showLilyDashboard
    ? lilyDashboard
    : route.showLilyAgent
      ? lilyAgent
      : route.showStandalonePage
        ? appPages[route.standalonePage]
        : lilyHome;
  const heading = routePage?.querySelector('h1');
  if (!heading) return;
  heading.setAttribute('tabindex', '-1');
  heading.focus({ preventScroll: true });
  heading.addEventListener('blur', () => heading.removeAttribute('tabindex'), { once: true });
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

function updateLilyRoute({ focusHeading = false } = {}) {
  const route = getCurrentRoute();
  syncRoutePages(route);
  syncRouteNavigation(route);
  syncRouteTitle(route);
  runRouteEffects(route);
  setMobileNavigation(false);
  if (focusHeading) window.setTimeout(() => focusRouteHeading(route), 0);
}

window.addEventListener('hashchange', () => updateLilyRoute({ focusHeading: true }));

document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', event => {
    const target = item.getAttribute('href');
    setMobileNavigation(false);
    if (['#ontology', '#dashboard', '#customers', '#zoe', '#leo', '#lily', '#wendy', '#lucas', '#john'].includes(target)) return;
    event.preventDefault();
    showToast('该模块暂未在本次设计稿中展开', 1800);
  });
});
