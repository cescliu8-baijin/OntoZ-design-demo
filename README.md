# OntoZ 静态前端 Demo

这是一个无需构建工具、可直接部署到任意静态托管服务的 OntoZ 产品工作台演示。

## 本地预览

不要直接维护部署镜像。所有源码都在项目根目录：

```bash
python3 -m http.server 8765
```

然后访问 `http://127.0.0.1:8765/`。

## 目录结构

```text
index.html          页面结构与所有演示视图
styles.css          样式入口
css/                按页面与组件拆分的样式
js/data.js          演示数据
js/shared.js        公共工具
js/route.js         Hash 路由与导航状态
js/lily.js          Lily 页面交互
js/wendy.js         Wendy 页面交互
js/john.js          John 页面交互
js/lucas.js         Lucas 页面交互
js/main.js          应用初始化
assets/             图片、图标与本地依赖
```

## 主要路由

- `#lucas`：专业建站 Lucas
- `#wendy`、`#wendy/accounts`、`#wendy/agent`：社媒运营 Wendy
- `#john`、`#john/keywords`、`#john/ads`：24/7 投流 John
- `#lily`、`#lily/scan`、`#lily/messages`、`#lily/templates`、`#lily/tasks`：触达转化 Lily
- `#ontology`：企业本体总览
- `#ontology/buyer-search-strategy`：买家搜索策略图谱
- `#dashboard`、`#customers`、`#zoe`、`#leo`：工作台与其他智能体视图

## 开发约定

- HTML 只维护页面结构和内容，样式与交互分别放在 `css/`、`js/`。
- 静态资源使用相对路径，保持 `file://` 与 HTTP 静态服务器均可运行。
- 修改后至少检查 390px、768px、1440px 三种视口，并确认控制台没有错误。
- 历史版本使用 Git 管理，不复制新的 `index-copy.html` 或 `style-final.css`。
