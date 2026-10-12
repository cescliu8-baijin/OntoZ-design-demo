const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert=require('node:assert/strict');
const path=require('node:path');
const base=process.env.WENDY_BASE_URL || 'http://127.0.0.1:8877/';
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});try{
 const page=await browser.newPage({viewport:{width:1440,height:1154}});page.setDefaultTimeout(10000);const errors=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});page.on('response',r=>{if(r.status()>=400)errors.push(r.url())});
 await page.goto(`${base}#wendy`);await page.getByRole('link',{name:'与 Wendy 一起创作',exact:true}).click();await page.locator('#wsBriefForm').waitFor();assert.equal(new URL(page.url()).hash,'#wendy/ai');
 await page.screenshot({path:'/tmp/wendy-ai-form.png',fullPage:true});
 await page.locator('#wsBriefForm [type=submit]').click();assert.equal(await page.locator('[aria-invalid=true]').count(),2);
 await page.locator('#wdCreativeBrief').fill('为 NOX 生成一条面向欧洲制造业买家的新品介绍');await page.locator('#wsProduct').selectOption('nox');
 await page.locator('[data-wd=studio-platform][data-value=Instagram]').click();assert.equal(await page.locator('#wdCreativeBrief').inputValue(),'为 NOX 生成一条面向欧洲制造业买家的新品介绍');
 await page.locator('[data-wd=studio-style][data-value=real]').click();assert.equal(await page.locator('[data-wd=studio-style][data-value=real]').getAttribute('aria-pressed'),'true');
 await page.locator('[data-wd=studio-material]').click();await page.locator('[data-wd=studio-library][data-value=nox]').click();assert(await page.locator('.ws-style-custom img').isVisible());
 await page.locator('[data-wd=studio-remove-material]').click();assert.equal(await page.locator('.ws-style-custom img').count(),0);
 await page.locator('[data-wd=studio-material]').click();await page.locator('#wsFile').setInputFiles({name:'bad.txt',mimeType:'text/plain',buffer:Buffer.from('test')});assert(await page.locator('.ws-dialog').isVisible());
 await page.locator('#wsFile').setInputFiles(path.resolve(process.env.WENDY_SOURCE_ROOT || path.join(__dirname,'..'),'assets/nox-campaign/linkedin-02-global-standards.jpg'));await page.locator('.ws-dialog').waitFor({state:'detached'});
 await page.reload();await page.locator('#wsBriefForm').waitFor();assert.equal(await page.locator('#wsProduct').inputValue(),'nox');assert(await page.locator('.ws-style-custom img').isVisible());
 await page.locator('#wsBriefForm [type=submit]').click();await page.locator('.ws-progress').waitFor();await page.reload();await page.locator('.ws-result').first().waitFor();
 assert((await page.locator('#wsCopy-0').inputValue()).includes('欧洲制造业'));
 await page.locator('#wsFeedback').fill('强调工厂应用');await page.locator('#wsFeedbackForm [type=submit]').click();assert((await page.locator('#wsFeedbackForm button').textContent()).includes('1/8'));
 await page.locator('#wsCopy-0').fill('用户编辑的社媒文案');await page.locator('[data-wd=studio-save]').click();await page.locator('[data-wd=studio-save]').click();
 assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('ontoz-wendy-redesign-20260831-2')).posts.filter(p=>p.origin==='ai-studio').length),1);
 await page.reload();await page.locator('#wsCopy-0').waitFor();assert.equal(await page.locator('#wsCopy-0').inputValue(),'用户编辑的社媒文案');
 await page.locator('[data-studio-mode="0"]').selectOption('scheduled');await page.locator('[data-wd=studio-publish]').click();assert.equal(await page.locator('.ws-sync').count(),0);
 await page.locator('[data-studio-time="0"]').fill('2099-10-09T14:30');await page.locator('[data-wd=studio-publish]').click();await page.locator('.ws-sync').waitFor();
 await page.locator('[data-wd=studio-sync][data-value=LinkedIn]').click();await page.locator('[data-wd=studio-sync][data-value=TikTok]').click();await page.locator('[data-wd=studio-adapt]').click();assert.equal(await page.locator('.ws-result').count(),3);
 await page.locator('[data-wd=studio-publish][data-value="1"]').click();await page.locator('[data-wd=studio-save][data-value="2"]').click();
 assert((await page.locator('#wsCopy-1').inputValue()).includes('用户编辑的社媒文案'));
 await page.waitForFunction(()=>[...document.querySelectorAll('.ws-studio img')].every(i=>i.complete && i.naturalWidth));
 await page.screenshot({path:'/tmp/wendy-ai-results.png',fullPage:true});
 for(const width of [360,390,768,1280,1440,1920]){await page.setViewportSize({width,height:900});await page.waitForTimeout(250);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`overflow ${width}`);const broken=await page.locator('.ws-studio img').evaluateAll(imgs=>imgs.filter(i=>i.getClientRects().length&&(!i.complete||!i.naturalWidth)).map(i=>i.src));assert.deepEqual(broken,[]);if(width===390)await page.screenshot({path:'/tmp/wendy-ai-mobile-results.png',fullPage:true});}
 await page.locator('[data-wd=studio-back]').click();await page.locator('#wendyHome').waitFor();assert((await page.locator('.wd-home-calendar').textContent()).includes('2099'));assert((await page.locator('.wd-home-calendar').textContent()).includes('为 NOX 生成一条面向欧洲制造业买家的新品介绍'));
 await page.getByRole('link',{name:'与 Wendy 一起创作',exact:true}).click();await page.locator('.ws-result').first().waitFor();assert.equal(await page.locator('.ws-result').count(),3);
 await page.locator('[data-wd=studio-reset]').click();await page.getByRole('button',{name:'取消',exact:true}).click();assert.equal(await page.locator('.ws-result').count(),3);
 await page.locator('[data-wd=studio-reset]').click();await page.locator('[data-wd=studio-reset-confirm]').click();await page.locator('#wsBriefForm').waitFor();assert.equal(await page.locator('#wdCreativeBrief').inputValue(),'');
 for(const width of [360,390,768,1440]){await page.setViewportSize({width,height:900});await page.waitForTimeout(250);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));if(width===390)await page.screenshot({path:'/tmp/wendy-ai-mobile-form.png',fullPage:true});}
 assert.deepEqual(errors,[]);console.log('PASS direct entry, validation, platform/product/style selection, uploads, draft persistence, generation resume, revision, idempotent save, scheduling, channel adaptation, calendar return, reset and responsive layouts');
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exit(1)});
