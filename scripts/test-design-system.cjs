// Start a root-source preview; set DESIGN_SYSTEM_BASE_URL and PLAYWRIGHT_MODULE if needed.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const base = process.env.DESIGN_SYSTEM_BASE_URL || 'http://127.0.0.1:8893/';
const routes = ['wendy','zoe','lily','lucas','john','leo','ontology','dashboard','customers','lily/messages','lily/templates','lily/tasks','lily/dashboard','lily/scan','john/ads','john/create-ad','ontology/buyer-search-strategy','ontology/buyer-search-strategy/keyword-validation','wendy/content'];
(async () => {
  const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'chrome', headless:true });
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
    for (const route of routes) {
      await page.goto(`${base}#${route}`);
      for (const width of [320,390,767,768,1024,1135,1136,1280,1439,1440,1920,2560]) {
        await page.setViewportSize({ width, height:900 });
        await page.waitForFunction(() => document.body.dataset.agentNav === (innerWidth < 768 ? 'mobile' : innerWidth < 1440 ? 'rail' : 'desktop'));
        await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
        const state = await page.evaluate(() => ({
          overflow:document.documentElement.scrollWidth > innerWidth + 1,
          nav:document.body.dataset.agentNav,
          workspaceX:document.querySelector('.app-workspace').getBoundingClientRect().x,
          broken:[...document.images].filter(image => image.getClientRects().length && (!image.complete || !image.naturalWidth)).map(image => image.src)
        }));
        assert.equal(state.overflow, false, `${route} ${width}: page overflow`);
        assert.equal(state.nav, width < 768 ? 'mobile' : width < 1440 ? 'rail' : 'desktop', `${route} ${width}: shell mode`);
        assert.equal(state.workspaceX, width < 768 ? 0 : width < 1440 ? 64 : 240, `${route} ${width}: occupied navigation width`);
        assert.deepEqual(state.broken, [], `${route} ${width}: image resources`);
      }
    }
    // Expanding a tablet rail must not displace the business content.
    await page.setViewportSize({ width:1200, height:900 });
    await page.goto(`${base}#dashboard`);
    const before = await page.locator('#dashboardPage').boundingBox();
    await page.locator('#collapseButton').click();
    await page.waitForFunction(() => document.querySelector('#sidebar').getBoundingClientRect().width === 240);
    assert.equal(await page.locator('#sidebar').evaluate(el => el.getBoundingClientRect().width),240);
    assert.equal((await page.locator('#dashboardPage').boundingBox()).x,before.x);
    await page.keyboard.press('Escape');
    assert(await page.locator('#sidebar').evaluate(el => el.classList.contains('collapsed')));
    await page.setViewportSize({ width:390, height:900 });
    await page.locator('#mobileMenuButton').click();
    assert.equal(await page.locator('#sidebar').evaluate(el => el.inert),false);
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('#sidebar').evaluate(el => el.inert),true);
    // Common typography and the display-title exception coexist on all three homepages.
    const typography = [];
    for (const [route,root] of [['wendy','#wendyHome'],['zoe','#zoeHome'],['lily','#lilyOverview']]) {
      await page.setViewportSize({ width:1440, height:900 });
      await page.goto(`${base}#${route}`);
      await page.waitForTimeout(150);
      typography.push(await page.locator(root).evaluate(el => {
        const body = getComputedStyle(el), title = getComputedStyle(el.querySelector('h1'));
        return { family:body.fontFamily,size:body.fontSize,line:body.lineHeight,titleFamily:title.fontFamily,titleSize:title.fontSize,titleLine:title.lineHeight };
      }));
    }
    assert(typography.every(t => t.family === typography[0].family && t.size === typography[0].size && t.line === typography[0].line));
    assert(typography.every(t => t.titleFamily.includes('Songti') && t.titleSize === '48px' && t.titleLine === '56px'));
    assert.deepEqual(errors, []);
    console.log('PASS 19 routes × 12 widths; shared navigation, overlay stability, resources, shared typography and display exceptions.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
