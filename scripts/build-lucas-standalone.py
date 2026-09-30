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
           'js/agent-home-layout.js', 'js/lucas-site.js', 'js/lucas-reference.js',
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
                            'css/lucas-site.css', 'scripts/lucas-demo-server.py', 'scripts/lucas_benchmark.py', 'scripts/test-lucas-demo.cjs']:
    if path not in files:
        files[path] = (ROOT / path).read_bytes()

# Include static resources actually referenced by the selected code and markup.
assets = set()
for data in files.values():
    assets.update(re.findall(r'assets/[A-Za-z0-9_./-]+\.(?:png|jpe?g|webp|svg|gif)', data.decode()))
for path in sorted(assets):
    files[path] = (ROOT / path).read_bytes()

files['package.json'] = (json.dumps({
    'name': 'lucas-standalone', 'version': '1.0.0', 'private': True,
    'scripts': {'demo:lucas': 'python3 scripts/lucas-demo-server.py --port 8766'}
}, ensure_ascii=False, indent=2) + '\n').encode()
files['启动Lucas.command'] = '''#!/bin/sh
cd "$(dirname "$0")" || exit 1
echo '启动后打开 http://127.0.0.1:8766/#lucas；停止服务请按 Ctrl+C。'
python3 scripts/lucas-demo-server.py --port 8766
'''.encode()
files['启动Lucas.bat'] = '''@echo off
cd /d "%~dp0"
echo Open http://127.0.0.1:8766/#lucas after the server starts.
py -3 scripts\lucas-demo-server.py --port 8766
pause
'''.replace('\n', '\r\n').encode()
files['README.md'] = '''# Lucas 建站独立版

包含 Lucas 建站向导、案例与轮播、风格配置、生成流程、草稿编辑、网站预览、
本地发布、经营看板、询盘管理和网站设置。已移除其他 Agent 页面和业务脚本。
页面和资源从 OntoZ 根目录源码自动导出，保留现有公共样式与响应式导航。

## 启动

先完整解压。需要 Python 3.9 或以上版本，无需安装第三方依赖或 npm 包。

- macOS：双击「启动Lucas.command」；如系统不允许直接打开，使用下面的终端命令。
- Windows：安装 Python 3（含 Python Launcher），双击「启动Lucas.bat」。
- macOS / Linux：在解压目录打开终端，执行：

```sh
python3 scripts/lucas-demo-server.py --port 8766
```

然后用现代浏览器访问 http://127.0.0.1:8766/#lucas 。
不能直接双击 index.html，也不能用普通静态服务器替代此服务。
终端保持运行，按 Ctrl+C 停止。端口被占用时将 8766 改为其他空闲端口，并修改访问地址。

## 数据与演示范围

首次启动是全新的建站状态，演示企业为 NOX Robotics。
本包不包含原项目的运行数据库、历史询盘或用户上传文件。
新建的草稿、任务、询盘和发布版本保存在本目录的 .lucas-demo/，重启后保留；
上传图片保存在 assets/lucas-uploads/。迁移使用中的数据时需同时保留这两个目录。
字体使用系统字体栈，图标与案例图片已随包提供，不依赖 CDN。

AI 文案与生成过程为本地模拟；发布仅切换本地网站版本，不会上线公网，
不执行真实域名绑定、邮件发送或访客统计。服务仅监听本机地址。
草稿预览路径为 /lucas-preview，发布后网站路径为 /lucas-site。

## 文件说明

- index.html、styles.css、css/、js/、assets/：页面与资源。
- scripts/lucas-demo-server.py：Python 标准库 HTTP 与 SQLite 服务。
- scripts/test-lucas-demo.cjs：原项目端到端测试，需要额外的 Playwright 和 Chrome。
- MANIFEST.json：导出文件 SHA-256 校验清单。

重新打包请在原 OntoZ 源目录执行 python3 scripts/build-lucas-standalone.py。
此压缩包是导出产物，不应作为 OntoZ 的第二份维护源码。
'''.encode()
files['MANIFEST.json'] = (json.dumps({p: hashlib.sha256(data).hexdigest() for p, data in sorted(files.items())},
                                    ensure_ascii=False, indent=2) + '\n').encode()
OUTPUT.parent.mkdir(exist_ok=True)
with zipfile.ZipFile(OUTPUT, 'w', zipfile.ZIP_DEFLATED) as archive:
    for path, data in sorted(files.items()):
        info = zipfile.ZipInfo(PREFIX + path)
        info.compress_type = zipfile.ZIP_DEFLATED
        info.external_attr = (0o100755 if path.endswith('.command') else 0o100644) << 16
        archive.writestr(info, data)
print(f'{OUTPUT}\n{len(files)} files, {OUTPUT.stat().st_size / 1024 / 1024:.2f} MiB')
