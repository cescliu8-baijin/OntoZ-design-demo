#!/usr/bin/env python3
"""Lucas local demo: standard-library HTTP server, durable jobs and SQLite state."""
import argparse, base64, copy, json, mimetypes, re, sqlite3, threading, time, uuid
from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler
from pathlib import Path
from urllib.parse import urlsplit, parse_qs
from lucas_benchmark import analyze
ROOT = Path(__file__).resolve().parent.parent
LOCK = threading.RLock()
DB = None
PAGES = ['home', 'products', 'product', 'about', 'contact']
def uid(): return uuid.uuid4().hex[:12]
def now(): return time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())
def initial():
    return dict(revision=0, site_id='lucas-local', draft=None, generated=False, job=None, published=None, versions=[], leads=[], notifications=[], settings={'domain':'','timezone':'Asia/Shanghai'}, recommendations={})
def read():
    with sqlite3.connect(DB) as db:
        row=db.execute('SELECT body FROM state WHERE id=1').fetchone()
        return json.loads(row[0]) if row else initial()
def write(s):
    with sqlite3.connect(DB) as db: db.execute('INSERT OR REPLACE INTO state VALUES (1,?)',(json.dumps(s,ensure_ascii=False),))
def notify(s,title,target):
    if not any(n['target']==target for n in s['notifications']): s['notifications'].insert(0,dict(id=uid(),title=title,target=target,time=now(),read=False))
def gaps(d):
    p=(d or {}).get('profile',{}); result=[]
    for k,label in [('name','企业名称'),('type','企业类型'),('industry','行业'),('intro','企业简介'),('goal','网站目标'),('customers','目标客户'),('product','产品名称'),('description','产品说明'),('owner','询盘负责人'),('cta','主 CTA')]:
        if not str(p.get(k,'')).strip(): result.append({'field':k,'label':label+'待补充'})
    if p.get('email') and not re.fullmatch(r'[^\s@]+@[^\s@]+\.[^\s@]+',p['email']): result.append({'field':'email','label':'业务邮箱格式无效'})
    return result
def check(s):
    d=s.get('draft') or {}; p=d.get('profile',{}); blocks=gaps(d)
    if not s['generated']: blocks.append({'field':'generate','label':'请先生成网站草稿'})
    if d.get('design',{}).get('hero')=='image' and not p.get('image'): blocks.append({'field':'image','label':'图片优先首屏尚未上传图片'})
    # White text on the primary CTA must have sufficient contrast.
    color=d.get('design',{}).get('primary','#6366f1')
    if re.fullmatch(r'#[0-9a-fA-F]{6}',color):
        rgb=[int(color[i:i+2],16)/255 for i in (1,3,5)]
        lum=sum(w*(v/12.92 if v<=.04045 else ((v+.055)/1.055)**2.4) for w,v in zip([.2126,.7152,.0722],rgb))
        if 1.05/(lum+.05)<4.5: blocks.append({'field':'primary','label':'主色与白色按钮文字对比度不足 4.5:1'})
    else: blocks.append({'field':'primary','label':'主色 HEX 格式无效'})
    return {'blocking':blocks,'warnings':['域名、邮箱验证及外网部署在本地 demo 中不执行','未上传的资质与客户 Logo 不会生成'], 'checkedAt':now()}
def worker():
    while True:
        time.sleep(.5)
        with LOCK:
            s=read(); j=s.get('job')
            if not j or j['status']!='running' or time.time()-j['heartbeat']<1.8: continue
            j['stage']+=1; j['heartbeat']=time.time(); j['updatedAt']=now()
            if j.get('simulateFailure') and j['stage']==3:
                j['status']='failed';j['error']='产品详情页生成模拟中断；已完成页面已保留。';notify(s,'部分页面生成失败，可继续重试','job:'+j['id']+':failed')
            elif j['stage']>=5:
                j['status']='ready';s['generated']=True;s['draft']=j['snapshot'];s['revision']+=1
                notify(s,'网站草稿已生成，待预览发布','job:'+j['id']+':ready')
            write(s)
class Handler(BaseHTTPRequestHandler):
    def log_message(self,*args): pass
    def respond(self,obj,status=200):
        data=json.dumps(obj,ensure_ascii=False).encode();self.send_response(status);self.send_header('Content-Type','application/json; charset=utf-8');self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(data)
    def body(self):
        length=int(self.headers.get('Content-Length','0'))
        if length>15*1024*1024: raise ValueError('请求内容过大')
        return json.loads(self.rfile.read(length) or b'{}')
    def do_GET(self):
        path=urlsplit(self.path).path; query=parse_qs(urlsplit(self.path).query)
        if path.startswith('/api/lucas/'):
            with LOCK:
                s=read()
                if path=='/api/lucas/state': return self.respond(s)
                if path=='/api/lucas/check': return self.respond(check(s))
                if path=='/api/lucas/content':
                    draft=query.get('draft')==['1'];d=s['draft'] if draft else (s['published'] or {}).get('snapshot')
                    if not d: return self.respond({'error':'尚无可查看的网站'},404)
                    # Public content never includes leads, internal notes or unpublished records.
                    p=copy.deepcopy(d['profile']);p.pop('owner',None);p.pop('originalIntro',None)
                    design=copy.deepcopy(d['design']);design['modules']=[m for m in design.get('modules',[]) if not m.get('hidden')]
                    active={m['id'] for m in design['modules']};pages=copy.deepcopy(d.get('pages',{}))
                    for content in pages.values():
                        if 'modules' in content:content['modules']={k:v for k,v in content['modules'].items() if k in active}
                    return self.respond({'design':design,'profile':p,'pages':pages,'test':draft,'version':(s['published'] or {}).get('version')})
            return self.respond({'error':'接口不存在'},404)
        if path in ['/lucas-site','/lucas-preview']:
            content=(ROOT/'index.html').read_text();html=content.split('<template id="lucasSiteDocument">')[1].split('</template>')[0]
            self.send_response(200);self.send_header('Content-Type','text/html; charset=utf-8');self.send_header('X-Robots-Tag','noindex, nofollow');self.end_headers();self.wfile.write(html.encode());return
        # Serve only application source/assets, never state, dotfiles or source control.
        rel=path.lstrip('/') or 'index.html'
        if '..' in Path(rel).parts or any(p.startswith('.') for p in Path(rel).parts) or not (rel in ['index.html','styles.css','lucide-icons.css'] or rel.startswith(('css/','js/','assets/'))): return self.respond({'error':'未找到资源'},404)
        file=(ROOT/rel).resolve()
        if not file.is_relative_to(ROOT) or not file.is_file(): return self.respond({'error':'未找到资源'},404)
        self.send_response(200);self.send_header('Content-Type',mimetypes.guess_type(file)[0] or 'application/octet-stream');self.end_headers();self.wfile.write(file.read_bytes())
    def do_POST(self):
        origin=self.headers.get('Origin')
        if origin and urlsplit(origin).netloc!=self.headers.get('Host'): return self.respond({'error':'不接受跨来源写入'},403)
        try:
            b=self.body(); path=urlsplit(self.path).path
            if path=='/api/lucas/benchmark':
                report=analyze(b.get('url'), b.get('ownHtml'), b.get('ownLabel','本站首页'))
                with LOCK:
                    s=read();s['competitorAnalysis']=report;write(s)
                return self.respond(report)
            with LOCK:
                s=read()
                if path=='/api/lucas/save':
                    if s.get('job') and s['job']['status']=='running': return self.respond({'error':'生成中，请等待当前输入快照完成'},409)
                    if b.get('revision')!=s['revision']: return self.respond({'error':'草稿已在其他窗口更新。请刷新后比较，本地输入仍保留。'},409)
                    d=b.get('draft');
                    if not isinstance(d,dict) or not isinstance(d.get('profile'),dict) or not isinstance(d.get('design'),dict): raise ValueError('无效的草稿')
                    previous_template=(s.get('draft') or {}).get('design',{}).get('templateId')
                    if d['design'].get('templateId')!=previous_template:
                        s['generated']=False;s['job']=None
                    s['draft']=d;s['revision']+=1
                elif path=='/api/lucas/restart':
                    if b.get('revision')!=s['revision']: return self.respond({'error':'草稿已更新，请刷新后重新开始建站'},409)
                    # Keep the live site and business records; cancel the old job under its worker lock.
                    s.update(draft=None, generated=False, job=None, recommendations={})
                    s['notifications']=[n for n in s['notifications'] if not n['target'].startswith('job:')]
                    s['revision']+=1
                elif path=='/api/lucas/generate':
                    if s.get('job') and s['job']['status']=='running': return self.respond(s)
                    missing=gaps(s['draft'])
                    if missing: return self.respond({'error':'请先补齐必填资料','missing':missing},400)
                    if b.get('retry') and s.get('job') and s['job']['status']=='failed': s['job'].update(status='running',simulateFailure=False,heartbeat=time.time())
                    else: s['job']=dict(id=uid(),status='running',stage=0,heartbeat=time.time(),updatedAt=now(),snapshot=copy.deepcopy(s['draft']),simulateFailure=bool(b.get('simulateFailure')))
                elif path=='/api/lucas/publish':
                    c=check(s)
                    if c['blocking']: return self.respond({'error':'发布检查未通过','check':c},400)
                    if b.get('revision')!=s['revision']: return self.respond({'error':'草稿发生变化，请重新检查'},409)
                    if s['published'] and s['published'].get('requestId')==b.get('requestId'): return self.respond(s)
                    launch=(s.get('draft') or {}).get('launch') or {}
                    domain=str(launch.get('domain','')).strip().lower()
                    email=str(launch.get('inquiryEmail','')).strip()
                    language=launch.get('language')
                    if len(domain)>253 or not re.fullmatch(r'(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}',domain):raise ValueError('请填写有效的网站域名')
                    if len(email)>254 or not re.fullmatch(r'[^\s@]+@[^\s@]+\.[^\s@]+',email):raise ValueError('请填写有效的询盘接收邮箱')
                    if language not in ['English','简体中文','Español','Deutsch','Français','日本語']:raise ValueError('请选择网站语言')
                    if b.get('simulateFailure'): return self.respond({'error':'模拟发布失败，原发布版本保持不变'},503)
                    s['settings'].update(domain=domain,inquiryEmail=email,language=language)
                    v=dict(version=(s['versions'][0]['version']+1 if s['versions'] else 1),snapshot=copy.deepcopy(s['draft']),time=now(),summary=b.get('summary','更新网站'),requestId=b.get('requestId'),author='本地演示账号')
                    s['published']=v;s['versions'].insert(0,v);s['versions']=s['versions'][:20];notify(s,'本地站点版本 v'+str(v['version'])+' 已发布','version:'+str(v['version']))
                elif path=='/api/lucas/restore':
                    if s.get('job') and s['job']['status']=='running': raise ValueError('生成中暂不能恢复版本')
                    v=next((v for v in s['versions'] if v['version']==b.get('version')),None)
                    if not v: raise ValueError('版本不存在')
                    s['draft']=copy.deepcopy(v['snapshot']);s['revision']+=1
                elif path=='/api/lucas/lead':
                    if b.get('test'): raise ValueError('预览不支持提交询盘，请在网站发布后提交')
                    if not re.fullmatch(r'[^\s@]+@[^\s@]+\.[^\s@]+',str(b.get('email',''))) or not str(b.get('message','')).strip(): raise ValueError('请填写有效邮箱和采购需求')
                    if not b.get('consent'): raise ValueError('请同意隐私说明')
                    submission=str(b.get('submission_id',''))
                    if not submission or len(submission)>100: raise ValueError('缺少提交标识')
                    found=next((l for l in s['leads'] if l['submission_id']==submission),None)
                    if found: return self.respond({'id':found['id']})
                    d=(s['published'] or {}).get('snapshot')
                    if not d: raise ValueError('站点尚未就绪')
                    lead={k:str(b.get(k,''))[:5000] for k in ['name','company','country','email','message']}
                    lead.update(id=uid(),submission_id=submission,test=False,read=False,status='new',notes='',time=now(),statusTime=now(),product=d['profile'].get('product',''),source='直接访问（本地 demo）',page=str(b.get('page','home'))[:50],site_id=s['site_id'])
                    s['leads'].insert(0,lead);notify(s,'收到询盘 · '+(lead['company'] or lead['email']),'lead:'+lead['id']);write(s);return self.respond({'id':lead['id']})
                elif path=='/api/lucas/lead-update':
                    l=next((l for l in s['leads'] if l['id']==b.get('id')),None)
                    if not l: raise ValueError('询盘不存在')
                    if 'read' in b:l['read']=bool(b['read'])
                    if 'notes' in b:l['notes']=str(b['notes'])[:10000]
                    if 'status' in b:
                        if b['status'] not in ['new','following','done','spam']:raise ValueError('状态无效')
                        l['status']=b['status'];l['statusTime']=now()
                elif path=='/api/lucas/notifications':
                    for n in s['notifications']:
                        if b.get('id') in ['all',n['id']]:n['read']=True
                elif path=='/api/lucas/settings':
                    domain=str(b.get('domain','')).strip()
                    if domain and not re.fullmatch(r'(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}',domain):raise ValueError('请输入有效域名，例如 www.example.com')
                    s['settings']['domain']=domain
                elif path=='/api/lucas/recommendation': s['recommendations'][str(b.get('id'))]=b.get('status')
                elif path=='/api/lucas/upload':
                    raw=base64.b64decode(b.get('data',''),validate=True)
                    if len(raw)>10*1024*1024:raise ValueError('图片不得超过 10MB')
                    ext='png' if raw.startswith(b'\x89PNG\r\n\x1a\n') else 'jpg' if raw.startswith(b'\xff\xd8\xff') else 'webp' if raw[:4]==b'RIFF' and raw[8:12]==b'WEBP' else None
                    if not ext:raise ValueError('只支持真实 JPG、PNG 或 WebP 图片')
                    directory=ROOT/'assets/lucas-uploads';directory.mkdir(exist_ok=True)
                    if len(list(directory.iterdir()))>=100:raise ValueError('本地素材已达到 100 张上限')
                    name=uid()+'.'+ext;(directory/name).write_bytes(raw);return self.respond({'url':'/assets/lucas-uploads/'+name})
                else:return self.respond({'error':'接口不存在'},404)
                write(s);return self.respond(s)
        except (ValueError,KeyError,TypeError) as e:self.respond({'error':str(e)},400)
        except Exception:self.respond({'error':'本地保存失败，请重试；现有资料仍保留'},500)
if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--port',type=int,default=8765);parser.add_argument('--data-dir',default=str(ROOT/'.lucas-demo'));args=parser.parse_args()
    directory=Path(args.data_dir);directory.mkdir(parents=True,exist_ok=True);DB=directory/'state.sqlite3'
    with sqlite3.connect(DB) as db:db.execute('CREATE TABLE IF NOT EXISTS state (id INTEGER PRIMARY KEY, body TEXT NOT NULL)')
    with LOCK:write(read())
    threading.Thread(target=worker,daemon=True).start()
    httpd=ThreadingHTTPServer(('127.0.0.1',args.port),Handler)
    print(f'Lucas demo: http://127.0.0.1:{httpd.server_port}/#lucas\nLocal demo account only. Data: {directory}',flush=True)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        httpd.server_close()
