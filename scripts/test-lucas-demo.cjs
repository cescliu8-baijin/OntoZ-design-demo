// Use a dedicated data directory for testing; see docs/lucas-demo.md.
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');
const base=process.env.LUCAS_BASE_URL||'http://127.0.0.1:8767';
(async()=>{
const browser=await chromium.launch({channel:'chrome',headless:true});
const context=await browser.newContext({viewport:{width:1440,height:1000}});
const p=await context.newPage(),errors=[];
p.on('pageerror',err=>errors.push(err.message));
p.on('console',m=>{if(m.type()==='error'&&!m.text().includes('503'))errors.push(m.text())});
const click=async a=>p.locator(`#lucasApp [data-action="${a}"]`).first().click();
const get=async()=> (await context.request.get(base+'/api/lucas/state')).json();
try{
await p.goto(base+'/#lucas');await p.locator('[data-action="browse"]').waitFor();
for(const width of [390,768,1440]){await p.setViewportSize({width,height:1000});await p.waitForTimeout(300);assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'welcome overflow '+width);await p.screenshot({path:'/tmp/lucas-welcome-'+width+'.png',fullPage:true});}
await p.setViewportSize({width:1440,height:1000});
await p.locator('#lcCases [data-action="case-preview"][data-id="precision"]').click();
assert.equal(await p.locator('#lcReferenceAddForm,#lcReferencePageName,.lc-reference-choice').count(),0,'no custom pages or mixed-template styles');
assert.equal(await p.locator('#lucasDialog > footer').count(),0,'no footer close');
assert(await p.locator('.lc-reference-dialog-header [data-action="close"] svg.lucide-x').isVisible(),'close icon rendered');
assert.equal(await p.locator('#lcReferencePages,[data-action="reference-remove-page"]').count(),0,'page editing moved out of template preview');
assert.equal(await p.locator('[data-action="reference-style"]').count(),4,'independent palette/font choices');
assert.equal(await p.locator('[data-toggle-group] .lc-btn').count(),0,'toggle groups do not use button component');
assert.equal(await p.locator('[data-toggle-group] [aria-pressed="true"][data-value="template"]').count(),2,'both default to template');
const paletteToggle=p.locator('[data-kind="palette"][data-value="template"]');
await paletteToggle.press('ArrowRight');assert.equal(await p.locator('[data-kind="palette"][data-value="ai"]').getAttribute('aria-pressed'),'true');
await p.locator('[data-kind="palette"][data-value="ai"]').press('Home');assert.equal(await paletteToggle.getAttribute('aria-pressed'),'true');
await paletteToggle.click();assert.equal(await paletteToggle.getAttribute('aria-pressed'),'true','selection cannot be cleared');

for(const width of [390,768,1440]){
 await p.setViewportSize({width,height:1000});await p.waitForTimeout(200);
 assert(await p.locator('#lucasDialog').evaluate(e=>e.scrollWidth<=e.clientWidth+1),'template modal overflow '+width);
 const bounds=await p.locator('.lc-reference-dialog-header').evaluate(e=>{const h=e.getBoundingClientRect(),b=e.querySelector('button').getBoundingClientRect();return {right:h.right-b.right-parseFloat(getComputedStyle(e).paddingRight),top:b.top-h.top-parseFloat(getComputedStyle(e).paddingTop)}});
 assert(bounds.right<=1&&bounds.top>=0&&bounds.top<20,'close top right '+width);
 await p.screenshot({path:'/tmp/lucas-single-template-'+width+'.png',fullPage:true});
}
await p.locator('#lucasDialog [data-action="save-reference"]').click();await p.waitForURL('**/#lucas/style');
const reference=await get();assert.equal(reference.draft.design.templateId,'precision');assert.equal(reference.draft.design.primary,'#17243e');assert.equal(reference.draft.design.fontKey,'plex');assert.equal(reference.draft.design.sitePages.length,5);
assert.equal(await p.locator('.lc-reference-saved,[data-action="case-preview"],[data-action="module-copy"],[data-action="module-hide"]').count(),0,'removed controls');
assert(!(await p.locator('.lc-canvas > footer').innerText()).includes('编辑范围'),'no unsupported editing hint');
assert.equal(await p.locator('.lc-page-editor .lc-modules').count(),1,'page and module controls grouped');
assert.equal(await p.locator('.lc-stepbar,[data-action="undo"],[data-action="redo"]').count(),0,'no step bar or history arrows in style');
assert.equal(await p.locator('.lc-page-pills,.lc-reference-restore,[data-action="remove-page"],[data-action="restore-page"]').count(),0,'website page controls removed');
assert(!(await p.locator('.lc-page-editor').innerText()).includes('网站页面'),'website page heading removed');
const originalModules=(await get()).draft.design.modules;
await p.locator('[data-action="module-delete"][data-id="about"]').click();await click('save');
assert(!(await get()).draft.design.modules.some(m=>m.id==='about'),'module deleted');
await click('add-module');await p.locator('[data-action="insert-module"][data-value="about"]').click();await click('save');
assert((await get()).draft.design.modules.some(m=>m.type==='about'),'removed preset can be restored');
const restoredModules=(await get()).draft.design.modules;
await click('add-module');assert.deepEqual(await p.locator('[data-action="insert-module"]').evaluateAll(items=>items.map(x=>x.dataset.value)),['faq'],'only missing preset modules offered');
assert.equal(await p.locator('#lucasDialog input,#lucasDialog textarea').count(),0,'no custom module input');
await p.locator('[data-action="insert-module"][data-value="faq"]').click();await click('save');await p.reload();
await p.locator('[data-action="module-delete"][data-id="faq"]').click();await click('save');
assert.deepEqual((await get()).draft.design.modules,restoredModules,'add/delete persists and preserves other modules');
await p.goto(base+'/#lucas/welcome');await p.locator('#lcCases [data-action="case-preview"][data-id="form"]').click();
await p.locator('[data-action="reference-style"][data-kind="palette"][data-value="ai"]').click();
await p.locator('#lucasDialog [data-action="close"]').click();assert.equal((await get()).draft.design.templateId,'precision','cancel keeps old template');
for(const [paletteMode,fontMode] of [['ai','template'],['template','ai'],['ai','ai']]){
 await p.goto(base+'/#lucas/welcome');await p.locator('#lcCases [data-action="case-preview"][data-id="form"]').click();
 for(const [kind,value] of [['palette',paletteMode],['font',fontMode]])await p.locator(`[data-action="reference-style"][data-kind="${kind}"][data-value="${value}"]`).click();
 await p.locator('#lucasDialog [data-action="save-reference"]').click();await p.waitForURL('**/#lucas/style');
 const design=(await get()).draft.design;
 assert.deepEqual(design.styleSources,{palette:paletteMode,font:fontMode});
 assert.equal(design.primary,paletteMode==='ai'?'#1e40af':'#7b6653');
 assert.equal(design.fontKey,fontMode==='ai'?'plex':'editorial');
 await p.reload();await p.locator('.lc-page-editor').waitFor();
 assert.deepEqual((await get()).draft.design.styleSources,design.styleSources,'style choice persists');
 await p.frameLocator('#lcPreview').locator('.lc-site').waitFor();
 assert.equal(await p.frameLocator('#lcPreview').locator('.lc-site').evaluate(el=>getComputedStyle(el).getPropertyValue('--site-primary')),design.primary,'preview applies palette');
 assert(await p.frameLocator('#lcPreview').locator('.site-font-'+design.fontKey).count(),'preview applies font');
}
await p.goto(base+'/#lucas/welcome');
await p.locator('#lcCases [data-action="case-preview"][data-id="form"]').click();
await p.locator('#lucasDialog [data-action="save-reference"]').click();await p.waitForURL('**/#lucas/style');
const mixed=await get();assert.equal(mixed.draft.design.primary,'#7b6653','new template replaces palette');assert.equal(mixed.draft.design.font,'serif');assert.equal(mixed.draft.design.templateId,'form');assert.deepEqual(Object.values(mixed.draft.design.references).map(x=>x.id),['form','form','form']);assert(mixed.draft.design.sitePages.some(x=>x.id==='craft'));assert(!mixed.draft.design.sitePages.some(x=>x.id==='capabilities'));
for(const width of [390,768,1440]){
 await p.setViewportSize({width,height:1000});await p.waitForTimeout(200);
 assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'style overflow '+width);
 await p.locator('.lc-page-editor').scrollIntoViewIfNeeded();
 await p.screenshot({path:'/tmp/lucas-style-editing-'+width+'.png',fullPage:true});
}
await p.setViewportSize({width:1440,height:1000});
await p.reload();await p.locator('[data-action="palette"]').first().click();
await p.locator('[data-action="font"][data-value="serif"]').click();
await p.locator('[data-action="module-down"][data-id="products"]').click();
// Mock mode must work even when the real ontology page is unavailable.
await p.evaluate(()=>{document.querySelector('#ontologyPage')?.remove();document.querySelector('#buyerGraphCanvas')?.remove();});
assert.equal(await p.locator('[data-action="next-profile"],[data-action="next-review"]').count(),0,'no ontology or brief confirmation steps');
await click('generate');await p.waitForURL('**/#lucas/generating');
await p.locator('.lc-generation[data-generation-status="running"]').waitFor();
assert(await p.locator('.lc-generation-icon.is-loading svg').isVisible(),'loading animation visible');
assert.equal(await p.locator('.lc-generation-icon.is-loading svg').evaluate(el=>getComputedStyle(el).animationName),'lc-generation-spin');
const firstJob=(await get()).job.id;
await p.getByText('正在理解建站目标',{exact:true}).waitFor({timeout:12000});
assert((await p.locator('.lc-generation-log').innerText()).includes('NOX'),'progress uses enterprise data');
assert((await p.locator('.lc-generation-log').innerText()).includes('United States'),'progress uses target market');
for(const width of [390,768,1440]){
 await p.setViewportSize({width,height:1000});
 assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'generation overflow '+width);
 await p.screenshot({path:'/tmp/lucas-direct-loading-'+width+'.png',fullPage:true});
}
await p.emulateMedia({reducedMotion:'reduce'});
assert.equal(await p.locator('.lc-generation-icon.is-loading svg').evaluate(el=>getComputedStyle(el).animationName),'none');
await p.emulateMedia({reducedMotion:'no-preference'});
const beforeReload=(await get()).job.stage;await p.reload();await p.locator('.lc-generation').waitFor();
assert.equal((await get()).job.id,firstJob,'refresh preserves task');assert((await get()).job.stage>=beforeReload,'refresh preserves progress');
await p.getByText('你的网站草稿，准备好了。').waitFor({timeout:20000});
assert.equal(await p.locator('.lc-generation [role="progressbar"]').getAttribute('aria-valuenow'),'100');
assert.equal(await p.locator('.is-loading').count(),0,'animation stops on completion');
const profile=await get();assert(profile.draft.profile.name==='NOX Robotics Ltd.');assert.equal(profile.draft.ontology.version,'lucas-mock-v1');assert(profile.draft.profile.email&&profile.draft.profile.countries&&profile.draft.profile.specs&&profile.draft.profile.image,'ontology automatically populated');assert(profile.draft.design.font==='serif');assert(profile.draft.design.modules[1].id==='about');
// Exercise durable failure/retry through the test API; no failure switch in the product flow.
await context.request.post(base+'/api/lucas/generate',{data:{simulateFailure:true}});
await p.reload();
await p.getByText('部分页面需要重试',{exact:true}).waitFor({timeout:20000});
const job=(await get()).job.id;await p.reload();await click('retry-job');
await p.getByText('你的网站草稿，准备好了。').waitFor({timeout:20000});assert.equal((await get()).job.id,job,'retry same job');
assert.equal((await get()).notifications.filter(n=>n.target==='job:'+job+':ready').length,1,'one completion notification');
await click('ready-preview');await p.waitForURL('**/#lucas/confirm');
await p.locator('.lc-confirmation > footer [data-action="editor"]').waitFor();
assert.equal(await p.locator('#lucasDialog[open]').count(),0,'no confirmation modal');
assert.equal(await p.locator('#lcPublishSummary,#lcPublishFailure').count(),0,'no release metadata or failure demo');
assert.equal((await get()).published,null,'preview does not publish');
assert.equal(await p.locator('.lc-confirmation > header [data-action="editor"]').count(),0,'back button removed from header');
assert.equal(await p.locator('.lc-confirmation > footer [data-action="editor"]').count(),1,'back button in footer');
assert.equal(await p.locator('.lc-confirmation [data-action="preview"].lc-primary').count(),0,'preview is secondary');
assert.equal(await p.locator('.lc-confirmation [data-action="launch"].lc-primary').count(),1,'publish is primary');
const website=p.frameLocator('#lcPreview'),confirmedProfile=(await get()).draft.profile;
await website.locator('.site-wordmark').waitFor();
assert.equal(await website.locator('.site-wordmark').innerText(),confirmedProfile.name,'generated company shown');
assert((await website.locator('#siteRoot').innerText()).includes(confirmedProfile.product),'generated product shown');
await p.locator('.lc-confirm-pages [data-value="contact"]').click();
await website.locator('#siteInquiry').waitFor();
assert((await website.locator('#siteRoot').innerText()).includes(confirmedProfile.email),'enterprise contact shown');
await website.locator('.site-wordmark').click();
await p.waitForFunction(()=>document.querySelector('.lc-confirm-pages [data-value="home"]').getAttribute('aria-pressed')==='true');
for(const width of [390,768,1440]){
 await p.setViewportSize({width,height:1000});await p.waitForTimeout(300);
 assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'confirmation overflow '+width);
 await p.screenshot({path:'/tmp/lucas-confirm-'+width+'.png',fullPage:true});
}
await p.locator('[data-action="device"][data-value="mobile"]').click();
assert.equal(await p.locator('.lc-browser.is-mobile').count(),1,'mobile preview');
await p.locator('[data-action="device"][data-value="desktop"]').click();
await p.reload();await p.locator('.lc-confirmation').waitFor();
assert.equal((await get()).published,null,'refresh does not publish');
await p.goto(base+'/#lucas/editor');await p.locator('#lcEditTitle').fill('Robotics for real-world workflows.');
await p.locator('#lcAiPrompt').fill('让这里更简洁');await click('ai-propose');
await p.locator('#lcEditText').fill('New manual copy 2026. Keep this fact.');await click('ai-accept');
assert((await p.locator('#toast').innerText()).includes('重新生成'),'conflict protects manual input');
await click('ai-discard');await click('save');await click('publish-check');await p.waitForURL('**/#lucas/confirm');
await click('launch');await p.waitForURL('**/#lucas/launch');
await p.waitForFunction(()=>document.querySelector('[data-action="publish"]')&&!document.querySelector('[data-action="publish"]').disabled);
assert.equal((await get()).leads.length,0,'publishing no longer requires a test inquiry');
assert.equal(await p.locator('[data-field="test"]').count(),0,'test inquiry gate removed');
assert.equal(await p.locator('.lc-confirm-checks [data-field]').count(),0,'checks passed');
assert.equal(await p.locator('[name="inquiryEmail"]').inputValue(),confirmedProfile.email,'prefills enterprise email');
await p.locator('[name="domain"]').fill('https://invalid/path');await click('publish');assert.equal((await get()).published,null,'invalid domain cannot publish');
await p.locator('[name="domain"]').fill('www.nox.example');await p.locator('[name="inquiryEmail"]').fill('inquiries@nox.example');await p.locator('[name="language"]').selectOption('Deutsch');
await p.locator('[data-action="confirm"]').click();await click('launch');await p.reload();await p.locator('[name="domain"]').waitFor();
assert.equal(await p.locator('[name="domain"]').inputValue(),'www.nox.example','settings survive back and reload');
assert.equal(await p.locator('[name="language"]').inputValue(),'Deutsch');
for(const width of [390,768,1440]){await p.setViewportSize({width,height:1000});await p.waitForTimeout(300);assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'launch overflow '+width);await p.screenshot({path:'/tmp/lucas-launch-'+width+'.png',fullPage:true});}
const previewPopupPromise=context.waitForEvent('page');await click('preview');const previewPopup=await previewPopupPromise;await previewPopup.waitForLoadState();await previewPopup.close();assert.equal((await get()).published,null,'online preview does not publish');
await click('publish');await p.waitForURL('**/#lucas/dashboard');await p.locator('#lucasHome').waitFor();
assert.equal(await p.locator('#lcAgentFlow > header').count(),0,'animation header removed');
assert.equal(await p.locator('#lucasHome .av2-collab-header,#lcCollabForm').count(),0,'collaboration title and composer removed');
assert.equal(await p.locator('#lucasHome .av2-page-actions [data-action="live"],#lucasHome .av2-page-actions [data-action="preview"]').count(),0,'view site button removed');
assert.equal(await p.locator('#lucasHome .lc-site-link').getAttribute('href'),'/lucas-site','management URL opens published site');
const leadPayload={name:'Alex',company:'Demo Buyer',email:'buyer@example.com',message:'Interested in a warehouse pilot.',consent:true,submission_id:'published-inquiry-regression',page:'contact'};
const removedTest=await context.request.post(base+'/api/lucas/lead',{data:{...leadPayload,test:true}});assert.equal(removedTest.status(),400,'test inquiry endpoint removed');
const submitted=await context.request.post(base+'/api/lucas/lead',{data:leadPayload});assert.equal(submitted.status(),200);
const repeated=await context.request.post(base+'/api/lucas/lead',{data:leadPayload});assert.equal(repeated.status(),200);assert.equal((await get()).leads.length,1,'idempotent public inquiry');assert.equal((await get()).leads[0].test,false);
const publishedSettings=(await get()).settings;assert.equal(publishedSettings.domain,'www.nox.example');assert.equal(publishedSettings.inquiryEmail,'inquiries@nox.example');assert.equal(publishedSettings.language,'Deutsch');
assert.equal((await get()).draft.profile.email,confirmedProfile.email,'inquiry recipient does not replace public contact');
assert.equal((await get()).published.version,1);assert.equal(await p.locator('#lucasHome [data-action="editor"]:visible').count(),0,'manual editing entry hidden');assert.equal(await p.locator('#lcAgentFlow').count(),1,'Agent animation present');assert.equal(await p.locator('#lucasHome a[href="#lucas/leads"]').count(),1,'inquiry secondary page');assert.equal(await p.locator('#lucasHome a[href="#lucas/settings"]').count(),1,'settings secondary page');
await p.goto(base+'/#lucas');await p.locator('#lucasHome').waitFor();assert(await p.locator('#lucasHome .av2-collab').count(),'daily homepage is agent home');
for(const width of [360,390,767,768,1024,1135,1136,1280,1439,1440,1920,2560]){await p.setViewportSize({width,height:900});await p.waitForTimeout(300);assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'dashboard overflow '+width);const m=await p.locator('#lucasHome').evaluate(el=>({compact:el.dataset.av2Compact==='true',content:el.clientWidth-parseFloat(getComputedStyle(el).paddingLeft)*2,inDialog:el.querySelector('.av2-collab').parentElement.tagName==='DIALOG'}));assert.equal(m.compact,m.content<1024,'shared breakpoint '+width);assert.equal(m.inDialog,m.compact,'one panel in dialog '+width);if([390,768,1440].includes(width))await p.screenshot({path:'/tmp/lucas-dashboard-'+width+'.png',fullPage:true});}
await p.setViewportSize({width:1440,height:1000});await p.locator('#lucasHome a[href="#lucas/leads"]').click();await click('lead-detail');assert.equal(await p.locator('#lcLeadStatus').inputValue(),'new');await p.locator('#lcLeadStatus').selectOption('following');await p.locator('#lcLeadNotes').fill('Arrange local test call');await p.locator('#lucasDialog [data-action="save-lead"]').click();assert.equal((await get()).leads[0].status,'following');
await p.goto(base+'/#lucas/editor');await p.locator('#lcEditTitle').fill('Version two');await click('save');
await click('publish-check');await p.waitForURL('**/#lucas/confirm');
const beforeFailed=await get();const failed=await context.request.post(base+'/api/lucas/publish',{data:{revision:beforeFailed.revision,requestId:'failure-test',simulateFailure:true}});assert.equal(failed.status(),503);assert.equal((await get()).published.version,1,'failed publish preserves live');
await click('launch');await p.waitForURL('**/#lucas/launch');await p.waitForFunction(()=>document.querySelector('[data-action="publish"]')&&!document.querySelector('[data-action="publish"]').disabled);await click('publish');await p.waitForURL('**/#lucas/dashboard');assert.equal((await get()).published.version,2);
await p.goto(base+'/#lucas/settings');await p.locator('[data-action="restore"][data-version="1"]').click();await p.locator('#lucasDialog [data-action="confirm-restore"]').click();await p.locator('#lcEditTitle').waitFor();assert.equal((await get()).published.version,2,'restore only affects draft');assert.equal((await get()).leads[0].notes,'Arrange local test call');
for(const route of ['welcome','style','profile','review','confirm','launch','editor','leads','settings','notifications']){await p.goto(base+'/#lucas/'+route);await p.waitForTimeout(250);for(const width of [390,768,1440]){await p.setViewportSize({width,height:900});await p.waitForTimeout(300);assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),route+' overflow '+width);const broken=await p.locator('#lucasPage img').evaluateAll(imgs=>imgs.filter(x=>x.getClientRects().length&&(!x.complete||!x.naturalWidth)).map(x=>x.src));assert.deepEqual(broken,[],route+' images');if(['profile','review'].includes(route))assert(p.url().endsWith('#lucas/style'),'legacy confirmation route redirects');if(route==='editor')await p.screenshot({path:'/tmp/lucas-editor-'+width+'.png',fullPage:true});}}
assert.deepEqual(errors,[],'browser errors');console.log('PASS: default toggle groups and keyboard selection, close icon, direct generation with automatic ontology, animated snapshot progress, configuration persistence, partial retry, draft editing/conflicts, website confirmation, publication gates, inquiry idempotence, publish failure, restore isolation, responsive layouts and resources.');
}finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
