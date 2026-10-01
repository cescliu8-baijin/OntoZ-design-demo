const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');
const base=(process.env.LUCAS_BASE_URL||'http://127.0.0.1:8768/site').replace(/\/$/,'');
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 try{
 const context=await browser.newContext(),p=await context.newPage(),errors=[],requests=[];
 context.on('request',r=>{if(r.url().includes('/api/lucas/'))requests.push(r.url());});
 p.on('pageerror',e=>errors.push(e.message));
 await p.goto(base+'/index.html#lucas');await p.locator('[data-action="browse"]').waitFor();
 const call=(path,body)=>p.evaluate(({path,body})=>LucasBrowser.request(path,body),{path,body});
 await p.locator('#lcCases [data-action="case-preview"][data-id="precision"]').click();
 await p.locator('#lucasDialog [data-action="save-reference"]').click();await p.waitForURL('**#lucas/style');
 await p.locator('[data-action="generate"]').click();await p.waitForURL('**#lucas/generating');
 const job=(await call('state')).job.id;await p.reload();
 await p.getByText('你的网站草稿，准备好了。').waitFor();assert.equal((await call('state')).job.id,job);
 await p.locator('[data-action="ready-preview"]').click();await p.waitForURL('**#lucas/confirm');
 await p.frameLocator('#lcPreview').locator('.site-wordmark').waitFor();
 for(const width of [390,768,1440]){
 await p.setViewportSize({width,height:1000});await p.waitForTimeout(400);
 await p.screenshot({path:'/tmp/lucas-browser-confirm-'+width+'.png',fullPage:true});
 assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
 const imgs=await p.frameLocator('#lcPreview').locator('img').evaluateAll(imgs=>imgs.filter(x=>!x.complete||!x.naturalWidth).map(x=>x.src));assert.deepEqual(imgs,[]);
 }
 const preview=await context.newPage();await preview.goto(base+'/lucas-site.html?preview=1#contact');await preview.locator('#siteInquiry').waitFor();assert(await preview.locator('button[type="submit"]').isDisabled());
 let s=await call('state');s.draft.launch={domain:'demo.example',inquiryEmail:'hello@example.com',language:'English'};s=await call('save',{revision:s.revision,draft:s.draft});await call('publish',{revision:s.revision,requestId:'first'});
 const live=await context.newPage();await live.goto(base+'/lucas-site.html#contact');await live.locator('#siteInquiry').waitFor();
 await live.locator('[name="email"]').fill('buyer@example.com');await live.locator('[name="message"]').fill('Demo inquiry');await live.locator('[name="consent"]').check();await live.locator('button[type="submit"]').click();await live.getByText(/Thank you!/).waitFor();assert.equal((await call('state')).leads.length,1);
 await p.goto(base+'/index.html#lucas/dashboard');await p.locator('#lucasHome').waitFor();
 if(await p.locator('.lc-benchmark-open').isVisible())await p.locator('.lc-benchmark-open').click();await p.locator('#lcCompetitorUrl').fill('www.example.com');await p.locator('#lcBenchmarkForm button[type="submit"]').click();await p.getByText('示例对标结果 · 未抓取竞对网站').waitFor();assert((await call('state')).competitorAnalysis.demo);
 s=await call('state');const conflict=await Promise.allSettled([call('save',{revision:s.revision,draft:s.draft}),live.evaluate(body=>LucasBrowser.request('save',body),{revision:s.revision,draft:s.draft})]);assert.equal(conflict.filter(r=>r.status==='fulfilled').length,1,'cross-tab stale save rejected');
 const before=await p.evaluate(()=>localStorage.getItem(LucasBrowser.key));
 const quota=await p.evaluate(async()=>{const original=Storage.prototype.setItem;Storage.prototype.setItem=()=>{throw new DOMException('Quota','QuotaExceededError')};try{await LucasBrowser.request('settings',{domain:'changed.example'});return ''}catch(e){return e.message}finally{Storage.prototype.setItem=original}});assert.match(quota,/未保存/);assert.equal(await p.evaluate(()=>localStorage.getItem(LucasBrowser.key)),before,'quota preserves previous snapshot');
 const isolated=await browser.newContext(),q=await isolated.newPage();await q.goto(base+'/lucas-site.html');await q.getByText(/此浏览器尚无/).waitFor();await isolated.close();
 s=await call('state');await call('restart',{revision:s.revision});s=await call('state');assert.equal(s.draft,null);assert(s.published);assert.equal(s.leads.length,1);
 await p.reload();await p.goto(base+'/index.html#lucas');await p.locator('[data-action="browse"]').waitFor();
 await p.evaluate(()=>localStorage.setItem(LucasBrowser.key,'broken'));await p.reload();await p.getByText('暂时无法读取演示数据').waitFor();assert.equal(await p.evaluate(()=>localStorage.getItem(LucasBrowser.key)),'broken');
 assert.deepEqual(requests,[]);assert.deepEqual(errors,[]);
 console.log('PASS: static subdirectory, responsive previews and assets, generation reload, preview/published inquiry, labeled benchmark, multi-tab conflict, quota rollback, browser isolation, restart preservation, corrupt-data protection; zero backend requests.');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
