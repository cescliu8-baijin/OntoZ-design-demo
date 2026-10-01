#!/usr/bin/env python3
"""Export Lucas from the canonical source tree; keep no second source copy."""
import hashlib
import json
import re
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / 'dist' / 'Lucas建站-独立版.zip'
PREFIX = 'Lucas建站独立版/'


def read(path):
    return (ROOT / path).read_text(encoding='utf-8')


def match(pattern, source):
    result = re.search(pattern, source, re.S)
    if not result:
        raise ValueError('Source structure changed: ' + pattern)
    return result.group(0)


html = read('index.html')
shell = html.split('<main class="app-workspace"')[0]
# Retain the existing responsive shell and only the Lucas navigation entry.
nav = match(r'<a class="nav-item active" href="#lucas".*?</a>', shell)
shell = re.sub(r'<nav class="sidebar-nav".*?</nav>',
               '<nav class="sidebar-nav" id="sidebarNavigation">' + nav + '</nav>', shell, flags=re.S)
shell = re.sub(r'^.*<link[^>]+(?:inquiry-messaging|wendy-home|zoe-agent-v2)[^>]*>\s*$', '', shell, flags=re.M)
section = match(r'<section class="lucas-app".*?</section>', html).replace(' hidden>', '>')
toast = match(r'<div class="toast" id="toast".*?</div>', html)
template = match(r'<template id="lucasSiteDocument">.*?</template>', html)
scripts = ['assets/lucide.min.js', 'js/shared.js', 'js/route.js', 'js/ontology.js',
           'js/agent-home-layout.js', 'js/lucas-browser.js', 'js/lucas-site.js', 'js/lucas-reference.js',
           'js/lucas-flow.js', 'js/lucas-carousel.js', 'js/lucas-benchmark.js', 'js/lucas.js']
html = (shell + '<main class="app-workspace" id="mainContent" tabindex="-1">\n' + section
        + '\n</main></div>\n' + toast + '\n' + template + '\n'
        + '\n'.join('<script src="' + p + '"></script>' for p in scripts) + '\n</body></html>\n')

# Reuse the source navigation controller, excluding unrelated page routing.
route = read('js/route.js').split("const lilyHome = document.querySelector('#lilyHome');")[0]
route += """
function syncLucasRoute() {
  if (!/^#lucas(?:\\/|$)/.test(location.hash)) history.replaceState(null, '', '#lucas');
  syncAgentNavigation();
  document.title = '专业建站 Lucas · OntoZ';
  mobilePageTitle.textContent = '专业建站 Lucas';
}
window.addEventListener('hashchange', syncLucasRoute);
document.querySelector('.nav-item').addEventListener('click', () => {
  setMobileNavigation(false);
  if (document.body.dataset.agentNav === 'rail') setDesktopSidebarCollapsed(true);
});
syncLucasRoute();
"""

css = ['css/design-tokens.css', 'css/base.css', 'css/lucas.css', 'css/lucas-animation.css', 'css/responsive.css']
styles = '\n'.join('@import url("./' + p + '");' for p in css) + '\n'
files = {'index.html': html.encode(), 'styles.css': styles.encode(), 'js/route.js': route.encode()}
for path in scripts + css + ['lucide-icons.css', 'css/agent-shared.css', 'css/project-layout.css',
                            'css/lucas-site.css', 'lucas-site.html']:
    if path not in files:
        files[path] = (ROOT / path).read_bytes()

# Include static resources actually referenced by the selected code and markup.
assets = set()
for data in files.values():
    assets.update(re.findall(r'assets/[A-Za-z0-9_./-]+\.(?:png|jpe?g|webp|svg|gif)', data.decode()))
for path in sorted(assets):
    files[path] = (ROOT / path).read_bytes()

files['README.md'] = """# Lucas 浏览器演示版

将整个解压目录发布到任意静态网站托管，访问 index.html 即可完整演示。
不需要 Python、SQLite 或 Lucas 后端。开发预览可使用任意静态服务器。

草稿、模拟进度、发布历史和询盘只保存在当前浏览器，不跨设备同步。
发布只切换演示网站版本；不绑定域名，不发送邮件，不提供公网企业网站。
竞对分析使用明确标注的固定示例，不读取输入网站。清除网站数据会重置演示。
""".encode()

OUTPUT.parent.mkdir(exist_ok=True)
with zipfile.ZipFile(OUTPUT, 'w', zipfile.ZIP_DEFLATED) as archive:
    for path, data in sorted(files.items()):
        info = zipfile.ZipInfo(PREFIX + path)
        info.compress_type = zipfile.ZIP_DEFLATED
        info.external_attr = (0o100755 if path.endswith('.command') else 0o100644) << 16
        archive.writestr(info, data)
print(f'{OUTPUT}\n{len(files)} files, {OUTPUT.stat().st_size / 1024 / 1024:.2f} MiB')
