const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');
const base=process.env.WENDY_BASE_URL||'http://127.0.0.1:8877/';
const key='ontoz-wendy-redesign-20260831-2';
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});try{
 const page=await browser.newPage({viewport:{width:1600,height:1050}});page.setDefaultTimeout(10000);const errors=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(r.url())});
 const state=()=>page.evaluate(k=>JSON.parse(localStorage.getItem(k)),key);
 const filters=async()=>{if(!await page.locator('#siFilterMenu').evaluate(e=>e.matches(':popover-open')))await page.locator('#siFilterTrigger').click();};
 const filter=async(k,v)=>{await filters();await page.locator(`[data-si-filter=${k}]`).selectOption(v);};
 const click=a=>page.locator(`[data-si=${a}]`).first().click();
 const open=async id=>{if(await page.locator('#siFilterMenu').evaluate(e=>e.matches(':popover-open')))await page.keyboard.press('Escape');await page.locator(`[data-si=select][data-id="${id}"]`).click();};
 const reset=async()=>{await filters();await page.locator('#siFilterMenu [data-si=reset]').click();await page.keyboard.press('Escape');};
 await page.goto(base+'#wendy/fans');await page.locator('.wsi').waitFor();
 assert.equal(await page.locator('.wsi-row').count(),12);
 for(const [type,count] of [['comment',10],['dm',2],['mention',1],['review',1]]){await filter('type',type);assert.equal(await page.locator('.wsi-row').count(),count,type);}
 await filter('account','fb');await filter('tag','售后');await filter('read','unread');assert.equal(await page.locator('.wsi-row').count(),1);
 await page.getByRole('searchbox',{name:'搜索消息'}).fill('calibration');assert.equal(await page.locator('.wsi-row').count(),1);
 await page.getByRole('searchbox',{name:'搜索消息'}).fill('不存在的关键词');assert.equal(await page.locator('.wsi-row').count(),0);assert(await page.locator('.wsi-empty-detail').isVisible());
 await reset();await open('c1');assert.equal(await page.locator('.wsi-message').count(),2);
 await page.locator('#siDraft').fill('Private draft <script>alert(1)</script>');
 await page.locator('[data-si=target][data-id=c1-history]').click();assert.equal(await page.locator('#siDraft').inputValue(),'');
 await page.locator('#siDraft').fill('Public comment draft');await page.locator('[data-si=target][data-id=c1-m0]').click();assert((await page.locator('#siDraft').inputValue()).startsWith('Private draft'));
 await page.locator('#siSend').click();let t=(await state()).socialInbox.threads.find(t=>t.id==='c1');assert.equal(t.messages.at(-1).replyTo,'c1-m0');assert.equal(t.messages.at(-1).type,'dm');assert.equal(await page.locator('.wsi-bubble script').count(),0);assert(await page.locator('#siSend').isDisabled());
 await page.locator('[data-si=target][data-id=c1-history]').click();assert.equal(await page.locator('#siDraft').inputValue(),'Public comment draft');
 await page.locator('[data-si=tags][data-id=c1-history]').first().click();await page.locator('[name=newTag]').fill('样品需求');await page.getByRole('button',{name:'保存标签',exact:true}).click();
 t=(await state()).socialInbox.threads.find(t=>t.id==='c1');assert(t.messages.find(m=>m.id==='c1-history').tags.includes('样品需求'));assert(!t.messages.find(m=>m.id==='c1-m0').tags.includes('样品需求'));
 await filter('tag','样品需求');assert.equal(await page.locator('.wsi-row').count(),1);await reset();await open('c1');await click('ai');
 await page.locator('.wsi-dialog select[name=tone]').selectOption('friendly');await page.locator('.wsi-dialog select[name=language]').selectOption('zh');await page.locator('.wsi-dialog [name=instruction]').fill('邀请预约演示，不承诺具体报价');await page.locator('.wsi-dialog [name=knowledge][value=sales]').check();
 const before=(await state()).socialInbox.threads.find(t=>t.id==='c1').messages.length;
 await page.getByRole('button',{name:'生成建议回复',exact:true}).click();let result=await page.locator('[name=result]').inputValue();assert(result.includes('您好'));assert(result.includes('演示'));assert(result.includes('报价与交期需根据数量'));
 assert.equal((await state()).socialInbox.threads.find(t=>t.id==='c1').messages.length,before);
 await click('apply-ai');assert.equal(await page.locator('#siDraft').inputValue(),result);assert.equal((await state()).socialInbox.threads.find(t=>t.id==='c1').messages.length,before);
 await page.goto(base+'#wendy/fans/c1');await page.reload();await page.locator('.wsi').waitFor();assert.equal(await page.locator('#siDraft').inputValue(),result);
 await click('ai');await page.keyboard.press('Escape');assert.equal(await page.locator('.wsi-dialog').count(),0);assert(await page.locator('[data-si=ai]').evaluate(e=>e===document.activeElement));
 await page.locator('[data-si=status]').click();await filter('status','done');assert(await page.locator('[data-si=select][data-id=c1]').count());await reset();
 await click('accounts');await page.locator('[data-si-form=account] [name=platform]').selectOption('Instagram');await page.locator('[name=name]').fill('Nova Asia');await page.locator('[name=handle]').fill('@nova.asia');await page.getByRole('button',{name:'连接演示账号',exact:true}).click();
 const newId=(await state()).socialInbox.accounts.find(a=>a.handle==='@nova.asia').id;await filter('account',newId);assert.equal(await page.locator('.wsi-row').count(),0);await reset();await click('accounts');
 await page.locator('[data-si-form=account] [name=platform]').selectOption('Instagram');await page.locator('[name=name]').fill('Nova Asia');await page.locator('[name=handle]').fill('NOVA.ASIA');await page.getByRole('button',{name:'连接演示账号',exact:true}).click();assert((await page.locator('.wsi-form-error').innerText()).includes('已存在'));
 await page.locator('[data-si=connect][data-id=fb]').click();await page.keyboard.press('Escape');await filter('type','review');assert.equal(await page.locator('.wsi-row').count(),0);await reset();await click('accounts');await page.locator('[data-si=connect][data-id=fb]').click();await page.keyboard.press('Escape');await filter('type','review');assert.equal(await page.locator('.wsi-row').count(),1);await reset();
 for(const width of [320,390,768,1024,1280,1440,1920]){
  await page.setViewportSize({width,height:900});await page.goto(base+'#wendy/fans');await page.locator('.wsi').waitFor();
  if(await page.locator('[data-si=back]').isVisible())await click('back');
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`overflow ${width}`);
  await open('c1');assert(await page.locator('#siDraft').isVisible());
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`chat overflow ${width}`);
  if(width<1250){await click('profile');assert(await page.locator('.wsi-profile').isVisible());await page.locator('.wsi-profile [data-si=profile]').click();assert(!await page.locator('.wsi-profile').isVisible());}
  if(width===390)await page.screenshot({path:'/tmp/wendy-inbox-mobile.png',fullPage:true});
 }
 await page.setViewportSize({width:1600,height:1000});await page.goto(base+'#wendy/fans/hc1');assert((await page.locator('.wsi-chat-head').innerText()).includes('marco.automation'));await page.screenshot({path:'/tmp/wendy-inbox-final.png',fullPage:true});
 const assets=await page.locator('.wsi img').evaluateAll(imgs=>imgs.filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src));assert.deepEqual(assets,[]);assert.deepEqual(errors,[]);
 console.log('PASS: four interaction types; compound filters and empty state; user history; target-specific drafts; safe reply routing and persistence; message tags; AI language/tone/knowledge and human-send gate; account add/dedup/disconnect/reconnect; legacy deep links; dialog focus; seven responsive widths; no console or asset errors.');
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exit(1)});
