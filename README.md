# OntoZ 产品工作台 Demo

面向外贸增长的多智能体演示：Lucas 建站、Wendy 社媒、John 投流、Zoe 获客、Lily 触达、Leo 展会，以及企业本体、客户池和询盘工作区。

业务前端使用原生 HTML/CSS/JavaScript 与 Hash 路由。React/Next 是托管外壳，`app/page.tsx` 跳转到 `/site/index.html`。Lucas 建站流程使用浏览器本地存储，无需配套后端服务。多数 AI、广告、社媒和消息动作仍为演示；Lucas 竞对分析使用明确标注的示例，发布仅切换当前浏览器的演示版本。

## 打开演示

访问已托管网页即可使用所有 Agent，包括 Lucas 完整建站流程；访问者无需启动本地服务。
开发时可用任何静态服务器预览，例如 `python3 -m http.server 8766 --bind 127.0.0.1`。
Lucas 的草稿、生成进度、询盘与版本保存在当前浏览器中，刷新后保留；不同浏览器或设备独立，清除网站数据会重置。
`lucas-site.html?preview=1` 是草稿预览，`lucas-site.html` 是当前浏览器已发布的演示版本。

历史 Python 服务与 `.lucas-demo/state.sqlite3` 保留供旧数据维护，不是当前前端的运行依赖，也不会自动导入浏览器。

## 源码和架构

```text
index.html                 页面结构与各业务视图
styles.css                 样式入口
css/                       设计变量、共享布局和业务样式
js/data.js                 公共演示数据
js/shared.js               公共工具
js/route.js                Hash 路由与导航状态
js/agent-home-layout.js    Agent 首页响应式与协作面板
js/                        各 Agent、询盘、本体与建站组件
assets/                    图片、图标、本地依赖和上传素材
scripts/                   本地服务、构建和回归测试
docs/                      PRD、开发规范与实施记录
app/、worker/、build/       Sites/Cloudflare 托管外壳
public/site/、dist/         自动生成产物，不是第二套源码
```

普通脚本按 `index.html` 顺序加载，页面通过 DOM 和共享函数协作。样式依赖导入顺序，新增功能应检查引用与作用域。

## 主要入口

| 地址 | 功能 |
| --- | --- |
| `#lucas` | 建站起点或日常首页 |
| `#lucas/editor`、`#lucas/confirm`、`#lucas/launch` | 草稿编辑、预览确认、上线设置 |
| `#lucas/leads`、`#lucas/settings` | 询盘和版本设置 |
| `lucas-site.html?preview=1`、`lucas-site.html` | 草稿预览、浏览器演示网站 |
| `#wendy`、`#wendy/accounts`、`#wendy/agent` | 社媒运营 |
| `#john`、`#john/ads`、`#john/create-ad`、`#john/data`、`#john/logs` | 投流与广告管理 |
| `#lily`、`#lily/scan`、`#lily/messages`、`#lily/templates`、`#lily/tasks` | 触达转化与询盘 |
| `#zoe`、`#leo` | 自主获客、展会营销 |
| `#ontology`、`#ontology/buyer-search-strategy` | 企业本体和买家策略 |
| `#ontology/buyer-search-strategy/keyword-validation` | 搜索词验证 |
| `#dashboard`、`#customers` | 数据看板、客户池 |
| `/lucas-animation.html` | 五步建站流程动画独立预览 |

## 回归验证

后端测试仅使用临时数据库：

```bash
python3 -B scripts/run-local-checks.py
```

完整回归包含 JavaScript 语法检查和现有六组 Chrome 浏览器脚本，自动启动独立服务并在结束后清理临时数据库：

```bash
python3 -B scripts/run-local-checks.py --browser
```

浏览器回归需要 Node >=22.13、Playwright 和 Google Chrome。脚本优先使用 PATH 中的 Node 和项目内 Playwright，也可识别 Codex 自带运行时；支持 `NODE_BINARY`、`PLAYWRIGHT_MODULE` 指定位置。用 `--port` 调整测试端口。截图按现有测试约定保存至系统临时目录。

## 构建与托管

构建需要 Node >=22.13 和 npm。跨 Intel/Apple 芯片迁移时，重新按锁文件安装依赖，不复用旧平台的二进制依赖：

```bash
npm ci
npm run build
```

`npm run dev` 和 `npm run build` 会先生成 `public/site/`；此托管管线包含 Lucas 浏览器版和静态网站预览页，可完成演示，不需要 Python Lucas 服务。不要手改部署镜像。

独立导出：

```bash
npm run build:wendy
npm run build:inquiry
python3 scripts/build-lucas-standalone.py
python3 scripts/build-lucas-animation.py
```

输出分别为 `dist/wendy-standalone.html`、`dist/inquiry-demo.html`、`dist/Lucas建站-独立版.zip`、`dist/Lucas建站流程动画.html`。Lucas 压缩包仍需启动其中的 Python 服务。

## 维护与迁移

- 阅读 [AGENTS.md](AGENTS.md)、[开发指南](docs/agent-project-guide.md)、[设计规范](docs/design-system/OntoZ平台设计规范.html)。新增 Agent 再读 [首页指南](docs/new-agent-development-guide.md)。
- 正式源码只在根目录维护；历史使用 Git，保留未提交文件和 stash，勿用旧部署产物覆盖源码。
- `.lucas-demo/`、`assets/lucas-uploads/` 被 Git 忽略，迁移时单独保全。
- John、Wendy、搜索历史等浏览器本地存储不随代码迁移；询盘聊天等页面内演示刷新后恢复示例数据。
- [Lucas 功能边界](docs/lucas-demo.md)、[John 0.4.1 接入记录](docs/implementation/john-demo-041.md)、[询盘说明](docs/inquiry-messaging-prd.md)、[新设备恢复记录](docs/implementation/device-recovery-20260929.md)。

## 浏览器版 Lucas（2026-10-01）

当前默认流程为纯浏览器演示。草稿、生成进度、询盘、发布快照保存在当前网站的 localStorage；刷新恢复，跨设备不共享，清除网站数据会重置。静态托管同时包含 `lucas-site.html`，支持 `/site/` 等子目录。Python / SQLite 为历史实现和数据保全用途，不再是前端运行依赖；旧数据库不会自动导入浏览器。

生成由时间戳模拟，重新打开时恢复进度，不运行后台任务。竞对分析固定示例并明确标注；发布不提供可跨浏览器分享的真实企业网站。
