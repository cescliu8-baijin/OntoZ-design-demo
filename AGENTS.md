# 项目维护规则

## 开发前必读

新增页面、组件或基于本项目开发新项目之前，先阅读 `docs/agent-project-guide.md`。
完整变量、图标、Auto Layout、响应式规则与接入示例见 `docs/design-system/OntoZ平台设计规范.html`。
新增 Agent 首页还需阅读 `docs/new-agent-development-guide.md`；当前响应式参数以新版指南及源码为准。

组件库入口：[OntoZ Figma 组件库](https://www.figma.com/design/oPNMfPosKibiZoqjOLh92h/OntoZ-%E7%BB%84%E4%BB%B6%E5%BA%93?node-id=3095-5236&t=aOkcUZreZOsizpMv-1)。页面开发时，AI Agent 必须通过 Figma 插件读取目标组件及其变体、样式和适用状态。按钮、输入框、弹窗、标签严格遵守组件库；其他类型可按需修改，仍遵守共享变量和自适应规则。具体执行顺序见 `docs/agent-project-guide.md` 第3.1节。

## 唯一源目录

本项目根目录是唯一源码目录。

正式源码包括：

- index.html
- css/
- js/
- assets/

Site、预览目录、构建目录和临时导出目录都不是源码目录。

禁止同时维护两套相同代码。

## 修改规则

1. 所有正式修改必须先写入项目源码。
2. 不要直接修改 Site 镜像文件作为最终版本。
3. 如果发现 Site 与项目目录内容不同，以项目目录为准。
4. 修改前先检查文件引用关系。
5. 修改完成后检查桌面端和移动端页面。
6. 不要随意重命名或移动 assets 中的文件。
7. 删除文件前先确认没有 HTML、CSS 或 JavaScript 引用它。
8. 不要创建 index-copy.html、style-final.css、app-new.js 等副本文件。
9. 如需保留历史版本，使用 Git，不要复制整个项目目录。

## 预览规则

每次修改后：

1. 启动本地预览。
2. 检查浏览器控制台是否有错误。
3. 检查图片、字体和图标是否正常加载。
4. 检查手机、平板和桌面宽度。
5. 确认无误后再更新 Site 或部署线上版本。

## 代码组织

- HTML 只负责页面结构和内容。
- CSS 放在 css/ 目录。
- JavaScript 放在 js/ 目录。
- 图片和图标放在 assets/ 目录。
- 避免把大段 CSS 和 JavaScript 直接写进 index.html。
