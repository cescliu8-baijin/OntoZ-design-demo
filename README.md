# OntoZ 产品工作台 Demo

面向外贸增长的多智能体演示：Lucas 建站、Wendy 社媒、John 投流、Zoe 获客、Lily 触达、Leo 展会，以及企业本体、客户池和询盘工作区。

业务前端使用原生 HTML/CSS/JavaScript 与 Hash 路由。React/Next 是托管外壳，`app/page.tsx` 跳转到 `/site/index.html`。Lucas 另有 Python 标准库 HTTP 服务和 SQLite 本地存储。多数 AI、广告、社媒和消息动作仍为演示；Lucas 竞对分析实际读取公开网页 HTML，发布仅切换本地版本。

## 在新设备启动

最简单的完整预览只需要 Python 3，无需安装第三方 Python 依赖。从项目根目录执行：

```bash
python3 -B scripts/lucas-demo-server.py --port 8766
```

macOS 也可双击 `scripts/start-local.command`。保持终端打开，在浏览器访问 <http://127.0.0.1:8766/#lucas>，其他 Agent 通过侧栏进入。端口被占用时可改用另一个 `--port`。

配置、任务、询盘和发布版本保存在被 Git 忽略的 `.lucas-demo/state.sqlite3`。使用 `--data-dir /tmp/ontoz-demo-example` 可创建独立演示数据，不要删除原数据库来重置测试。

仅查看静态页面时可执行 `python3 -m http.server 8765 --bind 127.0.0.1`，但该方式不提供 Lucas API。直接打开 HTML 也无法提供 Lucas 的保存、生成、询盘和发布功能。

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
| `/lucas-preview`、`/lucas-site` | 本地草稿预览、已发布网站 |
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

`npm run dev` 和 `npm run build` 会先生成 `public/site/`；此托管管线没有包含 Python Lucas 服务，不能替代完整本地演示，也不会自动提供生产 API。不要手改部署镜像。

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
