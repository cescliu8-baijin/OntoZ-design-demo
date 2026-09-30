# 投流 John · demo 0.4.1 接入记录

参考：用户提供的 `John-demo-0.4.1-50fd892.zip`。正式实现仍位于根目录 `index.html`、`js/`、`css/` 与 `assets/`；未修改托管镜像。

## 覆盖范围

- 首次投放：业务理解与修正 → 网站确认 → 全局排除词 → 品牌/产品线选择 → 预算与落地页 → 地区、搜索词、排除词规划 → 广告生成 → 素材审核与方向调整 → 发布确认与上线进度。
- 运行首页：当前判断、四项指标、七天观察与集中优化流程、协作待办和草稿。
- 广告管理：全站/产品线分组、搜索、暂停/恢复、预算确认、删除策略、创建广告创意、广告暂停/恢复/删除、优化报告。
- 投放数据与 CSV 导出、报告详情与复查记录、工作日志、刷新恢复状态。
- 同一业务不重复创建策略；删除策略保留历史报告。新创意沿用系列预算，并产生新的观察报告。

## 与项目接入

`#john` 及其子路由共用 `#johnPage`；运行首页通过 `mountAgentHome()` 使用统一响应式规则。协作区跨断点移动同一 DOM，手机使用全屏 dialog。

前端状态保存到 `ontoz-john-demo-041`。旧版 John 的 localStorage key 保留，不覆盖或清除。首次打开进入引导；完成上线后概览展示运行首页。John 不设置顶部 Tab 栏，广告管理、投放数据和工作日志入口集中在运行首页右上角状态区；子页面提供返回首页入口。

数据、广告生成、网站理解、投放发布和方向建议均为 demo 行为，没有真实爬站、模型或 Google Ads 服务接入。首页指标来自附件样例；新建创意后不会编造新增成效。未附带的字体采用项目公共回退栈。

## Figma 依据

2026-09-24 通过 Figma MCP 读取实际组件、变体、样式与截图：

- [Primary Large 3352:349](https://www.figma.com/design/oPNMfPosKibiZoqjOLh92h/OntoZ?node-id=3352-349)：36px、14/20 Medium、10px 圆角、Indigo 500、shadow-xs。
- [Outline Large 1463:5737](https://www.figma.com/design/oPNMfPosKibiZoqjOLh92h/OntoZ?node-id=1463-5737)：36px、白底、1px border、10px 圆角；Hover 1463:5736 使用 Accent 表面。
- [Input 3671:30](https://www.figma.com/design/oPNMfPosKibiZoqjOLh92h/OntoZ?node-id=3671-30)：桌面32px、14/20、8px 圆角；读取 Focus 3671:42、Invalid 3671:3637 和 Mobile 3671:3653（36px、16/24）。
- [Dialog 3801:58](https://www.figma.com/design/oPNMfPosKibiZoqjOLh92h/OntoZ?node-id=3801-58)：512px、24px padding、10px 圆角、shadow-lg，原生 dialog 配合 Esc、Tab 循环与关闭后回焦。
- [Tag 3194:1125](https://www.figma.com/design/oPNMfPosKibiZoqjOLh92h/OntoZ?node-id=3194-1125)：24px、12/16、6px 圆角、Sky 50/500。

业务示意图沿用附件 `funnel-visual.tsx` 的 SVG 路径与文案，提取为本地 `assets/john-observation-funnel.svg`。组件示例中的可选图标按照业务用途使用项目已有 Lucide。

## 验证

使用项目现有服务预览根目录，避免纯静态服务缺少 Lucas API：

```sh
python3 scripts/lucas-demo-server.py --port 19342 --data-dir /private/tmp/ontoz-john-preview-state
PLAYWRIGHT_MODULE=/path/to/playwright node scripts/test-john-demo.cjs
```

验收脚本覆盖完整创建链路、规划校验、素材调整与编辑、发布、刷新恢复、预算审批、搜索、策略及广告暂停/恢复、新创意、报告复查、CSV 导出、删除后历史保留、新产品发现，以及 Wendy/Lucas 路由回归。

响应式宽度：320、360、390、767、768、1024、1135、1136、1280、1439、1440、1920、2560、3440；检查无页面横向溢出、图片完整加载、协作面板断点与同一 DOM 草稿保留。桌面、平板、手机截图人工检查。

最终结果：端到端脚本 PASS；无浏览器 JavaScript 异常，无 HTTP 资源错误。`node --check` 与 `git diff --check` 通过。
