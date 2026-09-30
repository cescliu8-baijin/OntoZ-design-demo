// Root-source preview required. No real advertising services are called.
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');
const base=process.env.JOHN_BASE_URL||'http://127.0.0.1:19342/';
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  const errors=[],http=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)http.push(`${r.status()} ${r.url()}`)});
  const click=action=>page.locator(`#johnPage [data-jn="${action}"]:visible`).first().click();
  const state=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('ontoz-john-demo-041')));
  const settle=()=>page.waitForTimeout(180);
  const screen=()=>page.screenshot({path:`/private/tmp/john-${Date.now()}.png`,fullPage:true});
  const check=async label=>{await settle();assert(!await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),`${label}: page overflow`);assert.deepEqual(errors,[],`${label}: runtime errors`);};
  await page.goto(`${base}#john`);await check('welcome');
  await click('start');await click('website');
  await page.locator('[data-form="website"] button[type=submit]').click();
  await page.locator('[name=negative]').fill('free, wholesale jobs');await page.locator('[data-form=negative] button').click();
  await click('select-targets');assert.equal((await state()).negatives.filter(n=>n==='free').length,1);
  await page.locator('[data-form=selection] button[type=submit]').click();
  await page.locator('[data-form=planning] button[type=submit]').click();assert.match(await page.locator('#johnFlowError').innerText(),/确认/);
  for(const details of await page.locator('.jn-plan').all()){if(await details.getAttribute('open')===null)await details.locator('summary').click();await details.locator('[data-field=confirmed]').check();}
  await page.locator('[data-form=planning] button[type=submit]').click();
  await page.locator('[data-jn=publish]').waitFor({timeout:12000});await check('review');
  await page.screenshot({path:'/private/tmp/john-review.png',fullPage:true});
  await page.locator('[data-form=copilot] input').first().fill('更强调医院工程项目');await page.locator('[data-form=copilot] button').first().click();await click('confirm-modal');
  assert.match((await state()).plans[0].content.headlines[0],/Hospital/);
  await click('edit-draft');await page.locator('[name=descriptions]').fill('Commercial projects, with engineering support.');await click('confirm-modal');
  assert.equal((await state()).plans[0].content.descriptions.length,1);
  await click('publish');await page.keyboard.press('Escape');assert(!await page.locator('#johnDialog').evaluate(d=>d.open));assert.equal(await page.locator('[data-jn=publish]').evaluate(b=>b===document.activeElement),true);
  await click('publish');await click('confirm-modal');await page.locator('#johnHome').waitFor({timeout:12000});await check('home');
  assert.equal((await state()).campaigns.length,4);await page.reload();await page.locator('#johnHome').waitFor();
  await page.screenshot({path:'/private/tmp/john-home-1440.png',fullPage:true});
  for(const width of [320,360,390,767,768,1024,1135,1136,1280,1439,1440,1920,2560,3440]){
   await page.setViewportSize({width,height:900});await check(`home ${width}`);
   const m=await page.locator('#johnHome').evaluate(root=>{const css=getComputedStyle(root),width=root.clientWidth-parseFloat(css.paddingLeft)-parseFloat(css.paddingRight);const panel=root.querySelector('.av2-collab');return {width,compact:root.dataset.av2Compact==='true',drawer:panel.parentElement.tagName==='DIALOG',broken:[...root.querySelectorAll('img')].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src)};});
   assert.equal(m.compact,m.width<1024);assert.equal(m.drawer,m.compact);assert.deepEqual(m.broken,[]);
   if([390,768].includes(width))await page.screenshot({path:`/private/tmp/john-home-${width}.png`,fullPage:true});
  }
  await page.setViewportSize({width:1440,height:900});await settle();
  await page.locator('#johnPrompt').fill('跨断点保留的草稿');
  await page.evaluate(()=>window.johnPanelProbe=document.querySelector('#johnHome .av2-collab'));
  await page.setViewportSize({width:390,height:700});await settle();
  assert(await page.locator('#johnHomeDialog').evaluate(d=>d.open));
  assert.equal(await page.locator('#johnPrompt').inputValue(),'跨断点保留的草稿');
  assert(await page.evaluate(()=>window.johnPanelProbe===document.querySelector('#johnHome .av2-collab')));
  await page.keyboard.press('Escape');assert(!await page.locator('#johnHomeDialog').evaluate(d=>d.open));
  await page.setViewportSize({width:1440,height:900});await settle();await click('approve-budget');await click('confirm-modal');
  assert.equal((await state()).campaigns.find(c=>c.ownerId==='air').budget,130);
  await click('manage');await check('manage');await page.screenshot({path:'/private/tmp/john-manage.png',fullPage:true});
  await page.locator('#johnStrategySearch').fill('does-not-exist');assert(await page.locator('#johnSearchEmpty').isVisible());await page.locator('#johnStrategySearch').fill('');
  await page.locator('.jn-menu summary').first().click();await click('toggle-campaign');assert.equal((await state()).campaigns[0].status,'已暂停');
  await page.locator('.jn-menu summary').first().click();await click('toggle-campaign');await click('confirm-modal');assert.equal((await state()).campaigns[0].status,'数据积累中');
  await page.locator('.jn-creative .jn-menu summary').first().click();await click('toggle-ad');assert.equal((await state()).campaigns[0].adGroups[0].ads[0].status,'已暂停');
  await page.locator('.jn-creative .jn-menu summary').first().click();await click('toggle-ad');await click('confirm-modal');assert.equal((await state()).campaigns[0].adGroups[0].ads[0].status,'已启用');
  await click('new-creative');await page.locator('[name=direction]').fill('工程采购方案');await page.locator('[data-form=creative] button[type=submit]').click();
  await page.locator('[data-jn=publish]').waitFor({timeout:12000});await click('publish');await click('confirm-modal');await page.locator('#johnHome').waitFor({timeout:12000});
  assert.equal((await state()).campaigns[0].adGroups.length,2);assert.equal((await state()).campaigns.length,4);
  for(const route of ['john/ads','john/data','john/logs'])for(const width of [390,768,1440]){await page.setViewportSize({width,height:900});await page.goto(`${base}#${route}`);await check(`${route} ${width}`);}
  await page.setViewportSize({width:1440,height:900});await page.goto(`${base}#john/data`);
  const download=page.waitForEvent('download');await click('export');assert.match((await download).suggestedFilename(),/John/);await click('report-tab');await page.locator('[data-tab=reports]').click();await page.locator('.jn-report-row').first().click();await click('extend-report');assert((await state()).reports.some(r=>r.status==='延长观察'));
  await click('complete-report');assert((await state()).reports.some(r=>r.status==='已完成'));
  await page.goto(`${base}#john/ads`);await page.locator('.jn-menu summary').first().click();await click('delete-campaign');await click('confirm-modal');assert.equal((await state()).campaigns.length,3);assert((await state()).reports.some(r=>r.campaignDeleted));
  await page.goto(`${base}#john`);await click('discover');await click('select-targets');assert.equal((await state()).plans.length,1);
  await page.goto(`${base}#wendy`);assert(await page.locator('#wendyPage').isVisible());await page.goto(`${base}#lucas`);assert(await page.locator('#lucasPage').isVisible());
  assert.deepEqual(errors,[]);assert.deepEqual(http,[]);console.log(JSON.stringify({result:'PASS',checks:'first-launch, plan validation, creative adjustment, publish, persistence, 14 responsive widths, same-DOM draft, approval, search, pause/resume, new creative, reports, deletion history, discovery, adjacent routes',http},null,2));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
