const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');
const base=process.env.WENDY_BASE_URL||'http://127.0.0.1:8877/';
const key='ontoz-wendy-redesign-20260831-2';
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});try{
 const page=await browser.newPage({viewport:{width:1440,height:900}});page.setDefaultTimeout(8000);const errors=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url())});
 const click=(a)=>page.locator(`[data-wd=quick-${a}]`).first().click();
 const open=()=>click('open');const state=()=>page.evaluate(k=>JSON.parse(localStorage.getItem(k)),key);
 const close=async()=>{await page.keyboard.press('Escape');await page.locator('.wqp-dialog').waitFor({state:'detached'});};
 const platform=p=>page.locator(`[data-wd=quick-platform][data-value="${p}"]`).click();
 const library=async()=>{await click('upload');await click('library');await page.locator('[data-wd=quick-library-select]').first().click();};
 await page.goto(base+'#wendy');await page.locator('#wendyHome').waitFor();await page.evaluate(()=>{window.originalHome=document.querySelector('#wendyHome');});
 const url=page.url();await open();assert.equal(page.url(),url);assert(await page.evaluate(()=>window.originalHome===document.querySelector('#wendyHome')));
 await click('confirm');assert((await page.locator('.wqp-error').innerText()).includes('文案'));assert.equal(await page.locator('.wqp-dialog').count(),1);
 const copy='X100 产品应用 <script>alert(1)</script>\n\n了解更多产品与解决方案。';
 await page.locator('#wdQuickCopy').fill(copy);assert.equal(await page.locator('.wqp-preview-copy').innerText(),copy);assert.equal(await page.locator('.wqp-dialog script').count(),0);
 await close();assert.equal(page.url(),url);assert(await page.locator('[data-wd=quick-open]').first().evaluate(e=>e===document.activeElement));
 assert(await page.evaluate(()=>window.originalHome===document.querySelector('#wendyHome')));await open();assert.equal(await page.locator('#wdQuickCopy').inputValue(),copy);
 await page.reload();await open();assert.equal(await page.locator('#wdQuickCopy').inputValue(),copy);
 await page.locator('[data-wd=quick-mode][data-value=scheduled]').click();await page.getByRole('textbox',{name:'发布日期'}).fill('2020-01-01');await click('confirm');assert((await page.locator('.wqp-error').innerText()).includes('晚于'));
 const future=new Date(Date.now()+3*864e5).toISOString().slice(0,10);await page.getByRole('textbox',{name:'发布日期'}).fill(future);await page.getByRole('textbox',{name:'发布时间',exact:true}).fill('16:45');
 await page.locator('[data-wd=quick-mode][data-value=now]').click();await page.locator('[data-wd=quick-mode][data-value=scheduled]').click();assert.equal(await page.locator('[name=quickDate]').inputValue(),future);
 await platform('Instagram');await click('confirm');assert((await page.locator('.wqp-error').innerText()).includes('图片'));
 await library();await page.locator('.wqp-compose').evaluate(e=>e.scrollTop=0);await page.screenshot({path:'/tmp/wendy-publisher-desktop.png'});
 await page.locator('[data-wd=quick-preview-platform][data-value=Instagram]').click();assert((await page.locator('.wqp-preview-platform').innerText()).includes('Instagram'));
 await click('confirm');await page.locator('.wqp-dialog').waitFor({state:'detached'});assert.equal(page.url(),url);
 let posts=(await state()).posts.filter(p=>p.origin==='manual');assert.equal(posts.length,2);assert(posts.every(p=>p.status==='scheduled'&&p.time===future+' 16:45'&&p.media.length===1));assert.deepEqual(posts.map(p=>p.platform).sort(),['Instagram','LinkedIn']);assert(posts.every(p=>p.scheduledAt===future+'T08:45:00.000Z'));
 await open();assert.equal(await page.locator('#wdQuickCopy').inputValue(),'');await page.locator('#wdQuickCopy').fill('可恢复的草稿');await platform('Instagram');await library();await click('save-draft');await page.locator('.wqp-dialog').waitFor({state:'detached'});assert.equal(page.url(),url);
 let saved=(await state()).posts.filter(p=>p.status==='manual-draft');assert.equal(saved.length,2);
 await page.goto(base+'#wendy/content');await page.locator(`[data-wd=select-catalog-post][data-id="${saved[0].id}"]`).click();await page.locator(`[data-wd=revise-catalog][data-id="${saved[0].id}"]`).click();assert.equal(page.url(),base+'#wendy/content');assert.equal(await page.locator('#wdQuickCopy').inputValue(),'可恢复的草稿');assert.equal(await page.locator('[data-wd=quick-platform][aria-pressed=true]').count(),2);
 await page.locator('#wdQuickCopy').fill('更新后的草稿');await click('save-draft');await page.locator('.wqp-dialog').waitFor({state:'detached'});saved=(await state()).posts.filter(p=>p.status==='manual-draft');assert.equal(saved.length,2);assert(saved.every(p=>p.copy==='更新后的草稿'));
 // Real upload, preview, removal, size/type errors and video-only channel gate.
 await open();await page.locator('#wdQuickCopy').fill('本地上传测试');
 await page.locator('#wqpFiles').setInputFiles({name:'invalid.txt',mimeType:'text/plain',buffer:Buffer.from('invalid')});assert((await page.locator('.wqp-error').innerText()).includes('请选择'));
 await page.locator('#wqpFiles').setInputFiles({name:'large.png',mimeType:'image/png',buffer:Buffer.alloc(2*1024*1024+1)});assert((await page.locator('.wqp-error').innerText()).includes('2 MB'));
 const png=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aP1sAAAAASUVORK5CYII=','base64');
 await page.locator('#wqpFiles').setInputFiles({name:'sample.png',mimeType:'image/png',buffer:png});await page.locator('.wqp-media-list article').waitFor();assert(await page.locator('.wqp-post-media img').evaluate(i=>i.src.startsWith('data:image/png')));
 await click('remove-media');assert.equal(await page.locator('.wqp-media-list article').count(),0);
 await platform('TikTok');await click('confirm');assert((await page.locator('.wqp-error').innerText()).includes('视频'));await platform('TikTok');
 await page.locator('#wdQuickCopy').fill('  保留原始内容    不要替换  ');await click('polish');assert.equal(await page.locator('#wdQuickCopy').inputValue(),'保留原始内容 不要替换');
 // Failed persistence must not dismiss the publisher or create records.
 const before=(await state()).posts.length;await page.evaluate(k=>{window.originalSet=Storage.prototype.setItem;Storage.prototype.setItem=function(key,value){if(key===k)throw new DOMException('full','QuotaExceededError');return window.originalSet.call(this,key,value);};},key);
 await click('confirm');assert((await page.locator('.wqp-error').innerText()).includes('未保存'));assert.equal((await state()).posts.length,before);
 await page.evaluate(()=>Storage.prototype.setItem=window.originalSet);await click('confirm');await page.locator('.wqp-dialog').waitFor({state:'detached'});assert.equal((await state()).posts.length,before+1);assert.equal(page.url(),base+'#wendy/content');
 // Modal focus boundaries, responsive overflow and footer access.
 await open();await page.locator('#wdQuickCopy').fill('响应式发布预览');await library();
 for(const width of [320,390,768,1024,1280,1440,1920]){
  await page.setViewportSize({width,height:900});await page.waitForTimeout(150);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'page overflow '+width);
  assert(await page.locator('.wqp-dialog').evaluate(d=>d.scrollWidth<=d.clientWidth+1),'dialog overflow '+width);
  assert(await page.locator('.wqp-footer').isVisible());
  const footer=await page.locator('.wqp-footer').boundingBox();assert(footer.y+footer.height<=901,'footer '+width);
  await page.locator('.wqp-close').focus();await page.keyboard.press('Shift+Tab');assert(await page.locator('[data-wd=quick-confirm]').evaluate(e=>e===document.activeElement));await page.keyboard.press('Tab');assert(await page.locator('.wqp-close').evaluate(e=>e===document.activeElement));
  if(width===390)await page.screenshot({path:'/tmp/wendy-publisher-mobile.png'});
 }
 await page.setViewportSize({width:1440,height:900});await page.locator('.wqp-compose').evaluate(e=>e.scrollTop=0);await page.locator('.wqp-preview').evaluate(e=>e.scrollTop=0);
 const bad=await page.locator('.wqp-dialog img').evaluateAll(imgs=>imgs.filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src));assert.deepEqual(bad,[]);
 const dims=await page.locator('.wqp-icon').evaluateAll(imgs=>imgs.filter(i=>i.getBoundingClientRect().width>0).map(i=>({name:i.src.split('/').pop(),width:i.getBoundingClientRect().width,height:i.getBoundingClientRect().height})));
 for(const d of dims){const expected=['like.svg','celebrate.svg','love.svg','insight.svg','curious.svg'].includes(d.name)?[25,25]:d.name==='support.svg'?[25.5,21.8754]:d.name==='dot.svg'?[3,3]:d.name==='globe.svg'?[15,15]:d.name==='more.svg'?[33,13]:d.name==='upload.svg'?[24,24]:['thumb.svg','comment.svg','share.svg','send-gray.svg'].includes(d.name)?[26,26]:[16,16];assert(Math.abs(d.width-expected[0])<.1&&Math.abs(d.height-expected[1])<.1,JSON.stringify(d));}
 await close();await page.goto(base+'#wendy/quick');await page.locator('.wqp-dialog').waitFor();assert.equal(page.url(),base+'#wendy');await close();assert(!await page.locator('body').evaluate(e=>e.classList.contains('wqp-open')));
 assert.deepEqual(errors,[]);
 console.log('PASS: no navigation; underlying DOM and focus preserved; draft reload/edit/dedup; live escaped preview; multi-platform schedule with Shanghai time; upload/type/size/removal; video gate; quota rollback; local publish; seven widths; keyboard focus; exact asset geometry; legacy deep link; no resource or console errors.');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exit(1)});
