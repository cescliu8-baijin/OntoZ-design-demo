// Run with a root preview and PLAYWRIGHT_MODULE pointing to the installed Playwright package.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const base = process.env.WENDY_BASE_URL || 'http://127.0.0.1:8877/';
(async () => {
  const browser = await chromium.launch({ channel: process.env.WENDY_BROWSER_CHANNEL || 'chrome', headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
    await page.goto(`${base}#wendy`);
    const settle = () => page.waitForTimeout(250);
    const measure = () => page.locator('#wendyHome').evaluate(root => {
      const rules = window.agentHomeResponsiveRules;
      const css = getComputedStyle(root);
      const contentWidth = root.clientWidth - parseFloat(css.paddingLeft) - parseFloat(css.paddingRight);
      const panel = root.querySelector('.av2-collab');
      const rect = el => { const r = el.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height, bottom: r.bottom }; };
      return {
        contentWidth, compact: root.dataset.av2Compact === 'true', small: root.dataset.av2Small === 'true',
        expectedCompact: contentWidth < rules.compactWidth, expectedSmall: innerWidth < rules.mobileWidth,
        expectedRail: Math.min(rules.railMax, Math.max(360, contentWidth * rules.railRatio)),
        rail: parseFloat(css.getPropertyValue('--av2-rail')), position: getComputedStyle(panel).position,
        dialogParent: panel.parentElement.matches('dialog'), panel: rect(panel), status: rect(root.querySelector('.av2-status')),
        height: parseFloat(css.getPropertyValue('--av2-panel-height')), overflow: document.documentElement.scrollWidth > innerWidth + 1,
        broken: [...root.querySelectorAll('img')].filter(img => img.getClientRects().length && (!img.complete || !img.naturalWidth)).map(img => img.src)
      };
    });
    for (const width of [360, 390, 767, 768, 820, 1024, 1135, 1136, 1280, 1439, 1440, 1920, 2560, 3440]) {
      await page.setViewportSize({ width, height: width < 768 ? 844 : 900 });
      await settle();
      const m = await measure();
      assert.equal(m.compact, m.expectedCompact, `${width}: shared content-width breakpoint`);
      assert.equal(m.small, m.expectedSmall, `${width}: shared mobile breakpoint`);
      assert(Math.abs(m.rail - m.expectedRail) < 1, `${width}: proportional right rail`);
      assert.equal(m.dialogParent, m.compact, `${width}: single panel moves into dialog`);
      assert.equal(m.overflow, false, `${width}: page overflow`);
      assert.deepEqual(m.broken, [], `${width}: broken images`);
      if (!m.compact) {
        assert.equal(m.position, 'sticky');
        assert(Math.abs(m.panel.height - m.height) < 1, `${width}: viewport panel height`);
        assert(Math.abs(m.panel.width - m.status.width) < 1 && Math.abs(m.panel.x - m.status.x) < 1, `${width}: shared column alignment`);
      }
      if ([360, 390, 820, 1440, 1920, 3440].includes(width)) await page.screenshot({ path: `/tmp/wendy-responsive-${width}.png`, fullPage: true, animations: 'disabled' });
      console.log(`PASS ${width}px: shared breakpoint, rail width, column alignment and resources`);
    }
    await page.setViewportSize({ width: 1440, height: 700 });
    await settle();
    const before = await measure();
    await page.locator('#collapseButton').click();
    await settle();
    const collapsed = await measure();
    assert(collapsed.contentWidth > before.contentWidth && collapsed.rail > before.rail, 'sidebar collapse grows the content and rail');
    assert(Math.abs(collapsed.rail - collapsed.expectedRail) < 1);
    await page.locator('#collapseButton').click();
    await settle();
    await page.locator('#wendyHome [data-av2-compose]').click();
    await page.locator('#wdHomeFeedback').fill('跨断点保留的创作需求');
    await page.evaluate(() => { window.wendyPanelProbe = document.querySelector('#wendyHome .av2-collab'); });
    const stream = page.locator('#wendyHome .av2-stream');
    const inputY = (await page.locator('#wdCollaborationForm').boundingBox()).y;
    assert(await stream.evaluate(el => el.scrollHeight > el.clientHeight), 'comments scroll within the viewport panel');
    await stream.evaluate(el => { el.scrollTop = el.scrollHeight; });
    assert(Math.abs((await page.locator('#wdCollaborationForm').boundingBox()).y - inputY) < 1, 'composer stays fixed while comments scroll');
    await page.setViewportSize({ width: 1135, height: 900 });
    await settle();
    assert(await page.locator('#wendyHomeDialog').evaluate(el => el.open), 'focused composer follows the panel into its drawer');
    assert(await page.evaluate(() => window.wendyPanelProbe === document.querySelector('#wendyHome .av2-collab')));
    assert.equal(await page.locator('#wdHomeFeedback').inputValue(), '跨断点保留的创作需求');
    await page.setViewportSize({ width: 390, height: 500 });
    await settle();
    const dialog = await page.locator('#wendyHomeDialog').boundingBox();
    const panel = await page.locator('#wendyHome .av2-collab').boundingBox();
    const submit = await page.locator('#wdCollaborationForm button').boundingBox();
    assert.equal(dialog.width, 390);
    assert(Math.abs(panel.height - dialog.height) < 1, 'mobile panel fills the dialog');
    assert(submit.y >= 0 && submit.y + submit.height <= 500, 'composer remains reachable on a short mobile viewport');
    await page.screenshot({ path: '/tmp/wendy-responsive-mobile-composer.png', animations: 'disabled' });
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('#wendyHomeDialog').evaluate(el => el.open), false);
    await page.setViewportSize({ width: 1920, height: 900 });
    await settle();
    assert.equal((await measure()).dialogParent, false);
    assert(await page.evaluate(() => window.wendyPanelProbe === document.querySelector('#wendyHome .av2-collab')));
    assert.equal(await page.locator('#wdHomeFeedback').inputValue(), '跨断点保留的创作需求');
    assert.deepEqual(errors, []);
    console.log('PASS sidebar toggle, internal scrolling, same panel and draft across breakpoints, short mobile viewport and Escape');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
