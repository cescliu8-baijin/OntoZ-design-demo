// Run against the canonical static preview; isolated browser storage only.
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert=require('node:assert/strict');
const base=process.env.WENDY_BASE_URL || 'http://127.0.0.1:8877/';
const key='ontoz-wendy-redesign-20260831-2';
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});try{
 const page=await browser.newPage({viewport:{width:1440,height:1050}});page.setDefaultTimeout(10000);const errors=[];
 const monitor=p=>{p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400)errors.push(r.url())});};monitor(page);
 const state=()=>page.evaluate(k=>JSON.parse(localStorage.getItem(k)),key);
 const post=async id=>(await state()).posts.find(p=>p.id===id);
 const view=async name=>{await page.getByRole('button',{name:`${name}视图`,exact:true}).click();await page.waitForTimeout(60);};
 const date=async value=>{await page.locator('[data-cal-input=anchor]').fill(value);await page.locator('[data-cal-input=anchor]').press('Tab');await page.waitForTimeout(60);};
 await page.goto(`${base}#wendy`);await page.locator('.wcal').waitFor();await page.waitForTimeout(200);
 assert.equal(await page.locator('.wcal').getAttribute('data-cal-view'),'week');assert((await page.locator('.wcal-scroll').evaluate(e=>e.scrollTop))>0,'initial daytime scroll');
 assert.equal(await page.locator('[data-cal-input=account] option').count(),7);
 assert.equal(await page.locator('[data-cal-post=calendar-demo-x] img').getAttribute('alt'),'X');
 assert.equal(await page.locator('[data-cal-date="2026-09-11"][data-cal-time="09:00"] .wcal-post').count(),2);
 await page.screenshot({path:'/tmp/wendy-calendar-week.png',fullPage:true});
 await view('日');assert.equal(await page.locator('.wcal-time-head > button').count(),1);await page.locator('[data-cal-input=account]').selectOption('nox-europe-li');assert.equal(await page.locator('.wcal-post').count(),1);
 await page.reload();await page.locator('.wcal').waitFor();assert.equal(await page.locator('[data-cal-input=account]').inputValue(),'nox-europe-li');assert.equal(await page.locator('.wcal').getAttribute('data-cal-view'),'day');
 await page.locator('[data-cal-input=account]').selectOption('all');await page.locator('[data-cal-input=status]').selectOption('scheduled');assert.equal(await page.locator('.wcal-post').count(),4);await page.locator('[data-cal-input=status]').selectOption('all');
 await view('月');await date('2026-01-31');await page.locator('[data-wd=cal-next]').click();assert.equal((await state()).calendar.anchor,'2026-02-28');
 await date('2028-02-29');assert.equal(await page.locator('.wcal-month-day[data-cal-date="2028-02-29"]').count(),1);assert.equal(await page.locator('.wcal-month-day').count(),35);
 await date('2026-09-11');await page.screenshot({path:'/tmp/wendy-calendar-month.png',fullPage:true});
 const li='calendar-demo-li';
 const alignCalendar=async()=>{await page.evaluate(()=>window.scrollTo(0,document.querySelector('.wcal').getBoundingClientRect().top+scrollY-16));await page.waitForTimeout(80);};
 await alignCalendar();
 await alignCalendar();await page.locator(`[data-cal-post=${li}] .wcal-post-main`).dragTo(page.locator('.wcal-month-day[data-cal-date="2026-09-14"]'));
 assert.equal((await post(li)).time,'2026-09-14 09:00');assert.equal((await post(li)).accountId,'default-LinkedIn');
 await page.locator('[data-wd=cal-undo]').click();assert.equal((await post(li)).time,'2026-09-11 09:00');
 await alignCalendar();await page.locator(`[data-cal-post=${li}] .wcal-post-main`).dragTo(page.locator('.wcal-month-day[data-cal-date="2026-09-14"]'));
 await page.reload();await page.locator('.wcal').waitFor();assert.equal((await post(li)).time,'2026-09-14 09:00');assert.equal((await post('calendar-demo-x')).platform,'X');
 await date('2026-09-14');await view('周');
 await alignCalendar();await page.locator(`[data-cal-post=${li}] .wcal-post-main`).dragTo(page.locator('[data-cal-date="2026-09-15"][data-cal-time="10:30"]'));
 assert.equal((await post(li)).time,'2026-09-15 10:30');assert.equal((await post(li)).status,'approved');
 await date('2026-09-09');await view('日');assert.equal(await page.locator('[data-cal-post=calendar-demo-done]').getAttribute('draggable'),'false');await page.locator('[data-cal-post=calendar-demo-done] .wcal-post-main').click();assert(await page.locator('.wcal-dialog input[name=date]').isDisabled());await page.keyboard.press('Escape');await page.locator('.wcal-dialog').waitFor({state:'detached'});assert.equal(await page.locator('.wcal-dialog').count(),0);assert(await page.locator('[data-cal-post=calendar-demo-done] .wcal-post-main').evaluate(e=>e===document.activeElement));
 await date('2026-09-11');await page.locator('[data-cal-post=p1] .wcal-post-main').click();await page.locator('.wcal-dialog input[name=date]').fill('2026-10-02');await page.locator('.wcal-dialog input[name=time]').fill('23:45');await page.getByRole('button',{name:'保存排期',exact:true}).click();assert.equal((await post('p1')).time,'2026-10-02 23:45');assert.equal((await post('p1')).status,'pending');await page.locator('[data-wd=schedule-edit]').click();assert.equal(await page.locator('.wd-schedule-day').inputValue(),'2026-10-02');await page.locator('[data-wd=schedule-cancel]').click();
 await date('2031-06-03');assert(await page.locator('.wcal-empty').isVisible());await page.locator('[data-wd=cal-today]').click();
 for(const width of [360,390,768,1280,1440,1920]){
  await page.setViewportSize({width,height:900});for(const name of ['日','周','月']){await view(name);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${width} ${name} overflow`);assert(await page.locator('.wcal-toolbar').isVisible());}
  if(width===390)await page.screenshot({path:'/tmp/wendy-calendar-mobile-month.png',fullPage:true});
 }
 await view('日');await page.screenshot({path:'/tmp/wendy-calendar-day.png',fullPage:true});
 const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});const mobile=await context.newPage();monitor(mobile);await mobile.goto(`${base}#wendy`);await mobile.locator('.wcal').waitFor();await mobile.getByRole('button',{name:'日视图',exact:true}).click();await mobile.locator('.wcal-scroll').scrollIntoViewIfNeeded();await mobile.waitForTimeout(200);
 const handle=mobile.locator('[data-cal-handle=calendar-demo-li]'),target=mobile.locator('[data-cal-date="2026-09-11"][data-cal-time="10:00"]');await handle.scrollIntoViewIfNeeded();
 const a=await handle.boundingBox(),b=await target.boundingBox();const cdp=await context.newCDPSession(mobile);const x=a.x+a.width/2,y=a.y+a.height/2,tx=b.x+b.width/2,ty=b.y+b.height/2;
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});for(let i=1;i<=8;i++)await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x+(tx-x)*i/8,y:y+(ty-y)*i/8}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await mobile.waitForTimeout(200);
 assert.equal(await mobile.evaluate(k=>JSON.parse(localStorage.getItem(k)).posts.find(p=>p.id==='calendar-demo-li').time,key),'2026-09-11 10:00','touch handle reschedules');
 await mobile.waitForTimeout(500);await mobile.locator('[data-cal-post=calendar-demo-li] .wcal-post-main').click();await mobile.locator('.wcal-dialog input[name=time]').fill('17:15');await mobile.getByRole('button',{name:'保存排期',exact:true}).click();assert.equal(await mobile.evaluate(k=>JSON.parse(localStorage.getItem(k)).posts.find(p=>p.id==='calendar-demo-li').time,key),'2026-09-11 17:15');await mobile.screenshot({path:'/tmp/wendy-calendar-mobile-day.png',fullPage:true});
 assert.deepEqual(errors,[]);console.log('PASS day/week/month, account/status filters, leap month, cross-date native drag, half-hour slots, undo, persistence, X identity, published lock, pending schedule, keyboard dialog focus, empty state, 6 responsive widths and touch drag.');
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exit(1)});
