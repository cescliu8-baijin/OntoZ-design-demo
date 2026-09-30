# Lucas 五步流程动画

已接入 Lucas 首页 `/#lucas/dashboard`，替换原六步运行图；独立预览入口为 `lucas-animation.html`。两处共用同一动画组件。

顺序：AI 建站 → 分析竞对网站 → 生成优化策略（SEO/GEO）→ 识别询盘流量 → 客户入池。

保留浅色卡片、紫色粒子连线与企业本体底座形式。
五步各 4.4 秒，完成状态停留 3 秒，总计 25 秒。首页移除动画 Header 及播放按钮，自动循环；独立预览保留暂停、重播。页面不可见暂停；
首页手机端默认折叠为线性摘要，展开显示完整静态卡片；独立预览手机默认静止，可点击播放。独立预览的减少动态效果模式提供手动下一步。

## 唯一源码与导出

- 共享结构与时间轴：`js/lucas-flow.js` 的 `html()` / `mount()`
- 独立预览外壳：`lucas-animation.html`
- 样式：`css/lucas-animation.css`，引用既有 design-tokens、base 与 lucas 按钮样式
- 独立预览挂载：`js/lucas-animation.js`
- 首页通过 `js/lucas.js` 挂载，共享布局调用 `setPaused()`；重渲染保存播放位置，离开页面销毁监听与观察器
- 单文件构建：`python3 scripts/build-lucas-animation.py`
- 导出：`dist/Lucas建站流程动画.html`，可离线直接打开，不手改产物

## 组件依据

已通过 Figma MCP 读取 [Buttons 402:654](https://www.figma.com/design/oPNMfPosKibiZoqjOLh92h/OntoZ?node-id=402-654) 的变体、状态和截图。
播放控件复用项目 `.lc-btn`，对应 Outline / Large，36px 高、10px 圆角、14/20 Medium，
默认白底，Hover 为 Secondary。对应节点 1463:5737，Hover 1463:5738（Default 尺寸状态参考）。
流程节点及图形为业务动画，使用共享颜色、字体、阴影变量与现有 Lucide 图标。

## 预览验证

本地静态服务打开 `/lucas-animation.html` 或 `/dist/Lucas建站流程动画.html`。
首页检查320、390、767、768、1024、1280、1440、1920、2560宽度；无页面横向溢出。按运行区宽度切换五列、三加二折行、单列。
已检查控制台、图标、暂停保持进度、重播回到第一步，以及手动走完五步到「客户已入池」。
