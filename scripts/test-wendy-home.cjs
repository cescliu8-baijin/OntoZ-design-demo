// Run against a static preview of the project root. Uses an isolated browser profile.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const base = process.env.WENDY_BASE_URL || 'http://127.0.0.1:8877/';
(async () => {
  const browser = await chromium.launch({ channel: process.env.WENDY_BROWSER_CHANNEL || 'chrome', headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 914 } });
    page.setDefaultTimeout(8000);
    const errors = [], failures = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    page.on('response', response => { if (response.status() >= 400) failures.push(response.url()); });
    const home = async () => {
      await page.goto(`${base}#wendy`);
      await page.locator('#wendyHome').waitFor();
      await page.waitForTimeout(250);
      if (await page.locator('#wendyHomeDialog[open]').count()) await page.locator('#wendyHome [data-av2-close]').click();
    };
    const noOverflow = async () => assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'page overflows viewport');
    const fields = () => page.locator('.wd-goal-review').evaluate(el => [...el.children].map(item => item.textContent.trim()));
    await home();
    await page.locator('[data-wd="view-home-goal"]').click();
    assert(await page.locator('.wd-goal-summary-dialog').isVisible());
    const confirmation = await fields();
    assert.deepEqual(await page.locator('.wd-goal-review dt').allTextContents(), ['目标', '周期', '主推产品', '目标受众', '主运营平台', '同步平台', '内容设置', '执行指导']);
    await page.screenshot({ path: '/tmp/wendy-goal-dialog.png', animations: 'disabled' });
    await page.keyboard.press('Escape');
    await page.locator('.wd-goal-summary-dialog').waitFor({ state: 'detached' });
    assert(await page.locator('[data-wd="view-home-goal"]').evaluate(el => el === document.activeElement));
    await page.goto(`${base}#wendy/goal/4`);
    await page.locator('.wd-goal-review').waitFor();
    assert.deepEqual(await fields(), confirmation, 'dialog fields differ from the final confirmation step');
    console.log('PASS goal dialog shares all confirmation fields; Escape restores focus');
    await home();
    const comments = await page.locator('.wd-home-comment-item').evaluateAll(nodes => nodes.map(el => ({ id: el.dataset.id, name: el.querySelector('b').childNodes[0].textContent, text: el.querySelector('p').textContent })));
    for (const comment of comments) {
      await page.locator(`[data-wd="read-home-comment"][data-id="${comment.id}"]`).click();
      await page.locator('.wd-comment-thread').waitFor();
      assert.equal(new URL(page.url()).hash, `#wendy/fans/${comment.id}`);
      assert(await page.locator('.wd-comment-messages h1').evaluate(el => el === document.activeElement));
      assert.equal(await page.locator('.wd-comment-thread article b').textContent(), comment.name);
      assert.equal(await page.locator('.wd-comment-thread article p').textContent(), comment.text);
      await page.reload();
      await page.locator('.wd-comment-thread').waitFor();
      assert.equal(await page.locator('.wd-comment-thread article p').textContent(), comment.text);
      await page.goBack();
      await page.locator('#wendyHome').waitFor();
      assert(await page.locator(`[data-id="${comment.id}"].wd-home-comment-item`).evaluate(el => el.classList.contains('read')));
    }
    console.log('PASS all five comments open the correct message, survive refresh/back and retain read state');
    await page.locator('[data-wd="schedule-edit"]').click();
    await page.locator('.wd-schedule-time').fill('18:45');
    await page.locator('[data-wd="schedule-save"]').click();
    assert((await page.locator('.wd-review-meta').textContent()).includes('18:45'));
    await page.locator('[data-wd="home-revise"]').click();
    await page.waitForURL('**/#wendy/post/p1/home');
    await home();
    await page.locator('#wendyHome [data-av2-compose]').click();
    await page.locator('#wdHomeFeedback').fill('测试欧洲市场的工业传感器内容');
    await page.locator('#wdCollaborationForm button[type="submit"]').click();
    await page.waitForURL('**/#wendy/ai');
    assert.equal(await page.locator('#wdCreativeBrief').inputValue(), '测试欧洲市场的工业传感器内容');
    console.log('PASS schedule editing, post editing and Wendy collaboration remain available');
    for (const width of [1440, 1280, 820, 390, 360]) {
      await page.setViewportSize({ width, height: width < 768 ? 844 : 914 });
      await home();
      await noOverflow();
      await page.screenshot({ path: `/tmp/wendy-home-${width}.png`, fullPage: true, animations: 'disabled' });
      const broken = await page.locator('#wendyHome img').evaluateAll(images => images.filter(img => img.getClientRects().length && (!img.complete || !img.naturalWidth)).map(img => img.src));
      assert.deepEqual(broken, [], `broken visible images at ${width}`);
      assert(await page.locator('#wendyHome svg').count() > 10);
      await page.locator('[data-wd="view-home-goal"]').click();
      await noOverflow();
      await page.locator('.wd-goal-summary-dialog button[aria-label="关闭目标详情"]').click();
      if (await page.locator('#wendyHome').getAttribute('data-av2-compact') === 'true') await page.locator('#wendyHome .av2-attention').click();
      await page.locator('[data-wd="read-home-comment"][data-id="hc2"]').click();
      await page.locator('.wd-comment-thread').waitFor();
      await noOverflow();
      if (width === 390) {
        await page.waitForTimeout(500); // Let navigation and focus transitions settle.
        await page.screenshot({ path: '/tmp/wendy-comment-mobile.png', fullPage: true });
      }
      console.log(`PASS ${width}px: homepage, goal dialog, comment navigation, images and icons`);
    }
    await page.setViewportSize({ width: 1440, height: 914 });
    await home();
    for (let index = 0; index < 3; index++) await page.locator('[data-wd="home-approve"]').click();
    assert(await page.locator('[data-wd-live-home]').isVisible());
    console.log('PASS approval queue advances and restores runtime animation');
    assert.deepEqual(errors, [], 'browser errors');
    assert.deepEqual(failures, [], 'failed resources');
    console.log('PASS no browser console errors or failed resources');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
