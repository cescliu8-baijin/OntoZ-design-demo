"""Read-only public-page benchmark; no browser execution or search-rank estimates."""
import http.client
import ipaddress
import json
import socket
import ssl
import time
from html.parser import HTMLParser
from urllib.parse import urlsplit, urlunsplit, urljoin, quote

LIMIT = 2 * 1024 * 1024

def public_url(value):
    value = str(value or '').strip()
    if len(value) > 2048:
        raise ValueError('网址过长，请输入具体页面的公开地址')
    if '://' not in value:
        value = 'https://' + value
    try:
        p = urlsplit(value)
        host = (p.hostname or '').encode('idna').decode('ascii')
        port = p.port
    except (ValueError, UnicodeError):
        raise ValueError('请输入有效的公开网站网址')
    if p.scheme not in ('http', 'https') or not host or '.' not in host or p.username or p.password or port not in (None, 80, 443) or any(ord(c) < 33 for c in value):
        raise ValueError('请使用不含登录信息的公开 HTTP / HTTPS 网址')
    return urlunsplit((p.scheme, host + (':' + str(port) if port else ''), quote(p.path or '/', safe="/%:@-._~!$&'()*+,;="), quote(p.query, safe="%=&?/:@-._~!$'()*+,;"), ''))

def fetch_html(value):
    url = public_url(value)
    deadline = time.monotonic() + 20
    for _ in range(4):
        p = urlsplit(url)
        port = p.port or (443 if p.scheme == 'https' else 80)
        addresses = socket.getaddrinfo(p.hostname, port, type=socket.SOCK_STREAM)
        if not addresses or any(not ipaddress.ip_address(a[4][0]).is_global for a in addresses):
            raise ValueError('仅支持公开网站，不支持本机、内网或保留地址')
        remaining = deadline - time.monotonic()
        if remaining <= 0:
            raise ValueError('网站响应超时，请稍后重试')
        # Pin the validated address, retaining the original Host and TLS identity.
        family, kind, proto, _, address = addresses[0]
        sock = socket.socket(family, kind, proto)
        sock.settimeout(min(6, remaining))
        conn = http.client.HTTPConnection(p.hostname, port, timeout=min(6, remaining))
        try:
            sock.connect(address)
            if p.scheme == 'https':
                sock = ssl.create_default_context().wrap_socket(sock, server_hostname=p.hostname)
            conn.sock = sock
            conn.request('GET', urlunsplit(('', '', p.path, p.query, '')), headers={'Host': p.netloc, 'User-Agent': 'LucasPageCheck/1.0', 'Accept': 'text/html,application/xhtml+xml', 'Accept-Encoding': 'identity'})
            response = conn.getresponse()
            if response.status in (301, 302, 303, 307, 308):
                location = response.getheader('Location')
                if not location:
                    raise ValueError('网站重定向无效，请检查网址')
                url = public_url(urljoin(url, location))
                continue
            if response.status != 200:
                raise ValueError('网站暂时无法读取（HTTP %s），请换一个公开页面' % response.status)
            if response.headers.get_content_type() not in ('text/html', 'application/xhtml+xml'):
                raise ValueError('请输入网页地址，不支持图片或文件地址')
            if response.getheader('Content-Encoding', 'identity') != 'identity':
                raise ValueError('网站返回的压缩格式暂不支持，请尝试其他页面')
            body = bytearray()
            while len(body) <= LIMIT:
                remaining = deadline - time.monotonic()
                if remaining <= 0:
                    raise ValueError('网站响应超时，请稍后重试')
                sock.settimeout(min(6, remaining))
                part = response.read1(min(65536, LIMIT + 1 - len(body)))
                if not part:
                    break
                body.extend(part)
            if len(body) > LIMIT:
                raise ValueError('页面内容过大，请选择更具体的产品或介绍页面')
            charset = response.headers.get_content_charset() or 'utf-8'
            try:
                html = bytes(body).decode(charset, errors='replace')
            except LookupError:
                html = bytes(body).decode('utf-8', errors='replace')
            return url, html
        finally:
            conn.close()
            sock.close()
    raise ValueError('网站跳转次数过多，请输入最终页面地址')

class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.title = ''; self.description = ''; self.h1 = []; self.headings = 0
        self.canonical = ''; self.schemas = set(); self.images = 0; self.alt = 0
        self.capture = None; self.buffer = []; self.jsonld = False; self.skip = 0; self.text = []
    def handle_starttag(self, tag, attrs):
        a = {key: value or '' for key, value in attrs}
        if tag in ('title', 'h1'):
            self.capture = tag; self.buffer = []
        if tag in ('h2', 'h3'):
            self.headings += 1
        if tag == 'meta' and a.get('name', '').lower() == 'description':
            self.description = a.get('content', '')
        if tag == 'link' and 'canonical' in a.get('rel', '').lower().split():
            self.canonical = a.get('href', '')
        if tag == 'img':
            self.images += 1; self.alt += bool(a.get('alt', '').strip())
        if tag in ('script', 'style', 'noscript'):
            self.skip += 1
            if tag == 'script' and a.get('type', '').lower() == 'application/ld+json':
                self.jsonld = True; self.buffer = []
    def handle_data(self, data):
        if self.capture or self.jsonld:
            self.buffer.append(data)
        if not self.skip:
            self.text.append(data)
    def handle_endtag(self, tag):
        if tag == self.capture:
            value = ' '.join(''.join(self.buffer).split())[:300]
            if tag == 'title': self.title = value
            elif value: self.h1.append(value)
            self.capture = None; self.buffer = []
        if tag == 'script' and self.jsonld:
            try: self.walk(json.loads(''.join(self.buffer)))
            except (ValueError, RecursionError): pass
            self.jsonld = False; self.buffer = []
        if tag in ('script', 'style', 'noscript'):
            self.skip = max(0, self.skip - 1)
    def walk(self, value):
        if isinstance(value, list):
            for item in value: self.walk(item)
        elif isinstance(value, dict):
            types = value.get('@type', [])
            if isinstance(types, str): types = [types]
            if isinstance(types, list): self.schemas.update(t[:80] for t in types if isinstance(t, str))
            for item in value.values():
                if isinstance(item, (dict, list)): self.walk(item)
    def result(self):
        return dict(title=self.title, description=self.description[:400], h1=self.h1[:8], headings=self.headings, canonical=self.canonical[:300], schemas=sorted(self.schemas)[:20], images=self.images, alt=self.alt, textLength=len(' '.join(' '.join(self.text).split())))

def inspect(html):
    parser = Page(); parser.feed(html); return parser.result()

def analyze(url, own_html, own_label):
    if not isinstance(own_html, str) or len(own_html.encode()) > LIMIT:
        raise ValueError('本站页面内容无效或过大')
    try:
        final_url, html = fetch_html(url)
    except (OSError, http.client.HTTPException):
        raise ValueError('暂时无法连接该网站，请检查网址或稍后重试')
    return dict(url=final_url, requestedUrl=public_url(url), checkedAt=time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()), ownLabel=str(own_label)[:100], own=inspect(own_html), competitor=inspect(html))
