# Zoe 首页环形获客链路设计 QA

## 对照范围

- Source visual truth: `/var/folders/b2/c8cw_gq15rl366xv9frqp13m0000gn/T/codex-clipboard-f13863d6-3ca9-4282-8a0e-8ecff215d649.png`
- Retained QA reference: `/Users/baixing_12345/Documents/OntoZ/zoe-orbit-home-reference.png`
- Implementation URL: `http://localhost:3000/#zoe`
- Desktop viewport capture: `/Users/baixing_12345/Documents/OntoZ/zoe-orbit-home-desktop-1440.png`
- Tablet viewport capture: `/Users/baixing_12345/Documents/OntoZ/zoe-orbit-home-tablet.png`
- Mobile viewport capture: `/Users/baixing_12345/Documents/OntoZ/zoe-orbit-home-mobile.png`
- Same-input comparison: `/Users/baixing_12345/Documents/OntoZ/zoe-orbit-home-comparison.png`
- Background asset: `/Users/baixing_12345/Documents/OntoZ/assets/zoe-orbit-canvas-v1.png`
- Intentional product difference: the implementation retains the PRD-required Agent collaboration sidebar; the supplied reference covers the remaining home-page surface.

## Normalization

- Reference attachment: 1290 × 1528 px.
- Desktop check: 1440 × 900 CSS px; viewport screenshot is 1440 × 900 px.
- Tablet check: 1024 × 768 CSS px; viewport screenshot is 1024 × 768 px.
- Mobile check: 390 × 844 CSS px; viewport screenshot is 390 × 844 px.
- Full reference and desktop viewport implementation were rendered together in one comparison surface before final judgment.

## Findings

No actionable P0, P1, or P2 issues remain.

- Fonts and typography: the hero now uses the supplied editorial Songti/Georgia treatment, a materially larger scale, compact subtitle, and pill actions. The title wraps cleanly at tablet and mobile widths without clipping.
- Spacing and layout: the home retains a spacious hero followed by one large rounded system surface. The two metric cards, acquisition canvas, and chat sidebar use the reference's white-on-lavender hierarchy, fine borders, soft elevation, and generous gaps.
- Colors and tokens: violet actions, cyan metric icons, teal live states, cool gray copy, and the pale lavender page background map closely to the supplied visual.
- Image quality and asset fidelity: the technical grid, orbital path, and violet/teal glow are supplied by the generated raster asset `assets/zoe-orbit-canvas-v1.png`; no handcrafted SVG or CSS illustration is used for the background. Foreground controls remain crisp HTML UI.
- Copy and content: the hero, metrics, source-monitor status, live judgment, enterprise ontology, and four workflow steps all use realistic Zoe acquisition copy aligned to the reference and current PRD.
- Icons: all functional icons reuse the project's bundled Lucide family and stay consistent across metrics, source monitoring, ontology, workflow cards, Agent chat, and dialogs.
- Responsiveness: desktop keeps the Agent panel persistent; at 1320 px and below it becomes a right drawer/launcher so the acquisition canvas can keep the reference's wide visual hierarchy. Mobile converts the diagram to a readable sequential card flow. No horizontal overflow was observed at 1440, 1024, or 390 px.
- Accessibility: semantic headings, regions, tablist, buttons, dialog labels, live chat log, visible focus states, Escape handling, alt text, reduced-motion behavior, and mobile touch targets remain present.
- Interaction states: all four workflow cards select and open their real detail dialog. Agent chat auto-push, card quick actions, task switching, profile judgment auto-advance, strategy approve/ignore, lead add-to-pool, desktop collapse, and responsive drawer behavior remain wired.

## Mandatory comparison pass

- Reference hierarchy: large editorial hero → two KPI cards → one technical acquisition canvas.
- Implementation hierarchy: matches the same order and surface treatment, with the intentional addition of the existing collaboration sidebar.
- Reference workflow: source/search orchestration above a four-stage looping process, anchored by enterprise ontology.
- Implementation workflow: reproduces those same semantic landmarks with live source monitoring, real-time judgment, enterprise ontology, four clickable stages, and the same purple-to-cyan loop language.
- Visible fidelity adjustment after pass 1: replaced code-drawn grid/orbit decoration with a dedicated 1665 × 944 raster background asset, retaining HTML only for actual UI cards and controls.
- Visible responsiveness adjustment after pass 2: removed the compact takeover status from the mobile hero because it collided with the fixed app header; the title now starts cleanly below navigation.

## Interaction and viewport checks

- Clicked “AI 高潜力买家筛选” and verified the matching detail dialog opened with the correct copy and execution path.
- Closed the dialog and confirmed keyboard/focus restoration path remained intact.
- Verified one task-progress card on Zoe entry and the chat quick-action/card renderer remained available after the visual restructure.
- Verified customer-profile judgment advances to the next mocked customer after an action.
- Checked `scrollWidth === clientWidth` at 1440, 1024, and 390 px.
- Checked browser console warnings/errors after the visual and interaction path: none.
- Checked the final mobile hero at 390 px: no status overlap, no horizontal overflow, and both primary actions remain usable.

## Implementation checklist

- [x] Update hero title and spacing to match the supplied screenshot.
- [x] Rebuild the KPI row as two large reference-style metric cards.
- [x] Add source orchestration, live judgment, enterprise ontology, and four-stage orbital workflow.
- [x] Preserve clickable stage details and the complete Agent collaboration sidebar.
- [x] Add a production project asset for the technical canvas background.
- [x] Verify desktop, tablet, mobile, console, and core interaction behavior.

## Follow-up polish

- P3: production data can replace the current animated metric increments and source-monitor mocks without changing the visual or interaction contract.

final result: passed

---

# Lily v23 工作台布局设计 QA

## 对照范围

- Source visual truth: `/var/folders/b2/c8cw_gq15rl366xv9frqp13m0000gn/T/codex-clipboard-95e224a9-4656-4596-9156-06874e696349.png`
- Retained normalized reference: `/Users/baixing_12345/Documents/OntoZ/audit/lily-v23/reference-normalized.png`
- Implementation URL: `http://localhost:3001/site/index.html#lily`
- Desktop capture: `/Users/baixing_12345/Documents/OntoZ/audit/lily-v23/desktop.png`
- Mobile capture: `/Users/baixing_12345/Documents/OntoZ/audit/lily-v23/mobile.png`
- Same-input comparison: `/Users/baixing_12345/Documents/OntoZ/audit/lily-v23/comparison.png`
- State: Lily 首页初始状态；Agent 正在自主执行；右侧协作区位于顶部。

## 规格与归一化

- Reference attachment: 2880 × 1800 px，按 2× 密度等比降采样为 1440 × 900 px。
- Desktop implementation: 1440 × 900 CSS px，截图 1440 × 900 px。
- Mobile implementation: 390 × 844 CSS px，完整页面截图 390 × 3060 px。
- Same-input comparison: 1280 × 720 画布；参考图与实现图各以 640 × 400 等比呈现，用于判断宏观构图、比例与层级。

## Findings

No actionable P0, P1, or P2 issues remain.

- Fonts and typography: 主标题保留 OntoZ 现有宋体展示风格，正文继续使用现有中文系统字体；字号、字重和行高形成清晰的标题、分区标题、指标与辅助文字层级。长策略标题在卡片内正常换行，无裁切或碰撞。
- Spacing and layout rhythm: 实现与参考保持相同骨架——240px 左侧导航、顶部主标题与管理台、下方约 1.7:1 的主运行区和协作区。桌面首屏核心区域控制在 900px 视口内，右侧使用独立滚动承载更长的策略内容。
- Colors and visual tokens: 延续 OntoZ 的淡紫画布、白色工作面板、靛蓝主操作、青绿色运行状态和细灰边框；对比度和状态语义清晰。
- Image quality and asset fidelity: 参考图为结构线框，没有要求迁移的代表性图片。实现继续使用项目现有头像和 Lucide 图标，不存在缺失图片、拉伸位图或用代码图形冒充参考素材的问题。
- Copy and content: 新版 demo 的触达数据、策略生成、运行状态、策略应用与任务入口已改写为 OntoZ 语气；根据最新反馈，新工作区未加入“询盘消息中心”和“WhatsApp 消息”两个入口及其新增功能。
- Icons: 所有功能图标来自项目已内置的 Lucide 图标集，尺寸和线宽在指标、流程节点、按钮与入口间保持一致。
- Responsiveness: 1440px 使用参考图的三段构图；小屏按标题、管理台、核心数据、Agent 运行视图、协作区顺序单列堆叠。390px 检查中 `scrollWidth === 390`，无横向溢出。
- Accessibility: 主区使用语义化 heading、region、aside、nav 和 status；输入框有可访问名称，暂停按钮同步 `aria-pressed`，动态生成结果通过 live region 和 toast 反馈，保留键盘焦点样式与 reduced-motion 支持。
- States and interactions: “创建触达策略”可聚焦协作输入；空输入或自定义方向均可生成推荐策略；暂停/继续状态可切换；流程节点可查看状态；单条策略、历史高表现策略和批量应用均进入现有触达任务配置流程。

## Comparison history

- Pass 1 finding [P2]: 右侧策略生成卡继承了错误的横向 flex 方向，文本和输入框过度拥挤；左侧运行状态在首屏底部被轻微裁切。
- Fix: 将策略生成卡明确改为纵向布局，并把运行图高度从 330px 收紧到 290px，使输入、按钮和运行状态都在各自面板内完整显示。
- Pass 2 evidence: `audit/lily-v23/desktop.png` 显示顶部管理台、左侧数据/运行区与右侧协作区均完整对齐；`audit/lily-v23/comparison.png` 显示主要区域比例和阅读顺序与参考一致。
- Pass 2 finding [P2]: 移动端的面板高度继承桌面 100% 约束，导致滚动容器层级不自然。
- Fix: 在 1180px 以下解除主面板固定高度与内部滚动，改为自然高度单列文档流。
- Pass 3 evidence: 390px 页面无横向溢出，核心数据、流程节点、输入、入口和策略卡均保持可读与可操作。

## Focused region comparison

- 顶部区域：参考图的“主标题 + 两个操作 + 管理台”映射为 Lily 标题、创建策略/查看任务和今日触达概览，比例与左右对齐关系一致。
- 左侧主区：参考图的“核心数据 + Agent 运行视图”分别映射为四个结果指标和六节点 Lily 触达闭环，分区顺序和高度权重一致。
- 右侧协作区：参考图的单列协作面板映射为策略输入、内容策略库、触达任务和推荐策略，保留协作焦点并支持独立滚动。

## Interaction and console checks

- Tested pause → resume; label and `aria-pressed` update correctly.
- Tested empty-direction strategy generation; loading and success states update, then strategy cards refresh.
- Tested first recommended strategy → task configuration modal → close; modal opens with the selected strategy title and restores the Lily home.
- Tested mobile navigation open and scrim close at 390px.
- Confirmed no browser console warnings or errors during the checked flows.
- Confirmed no “询盘消息中心” or “WhatsApp 消息” entry exists in the new Lily collaboration area.

## Follow-up polish

- P3: when production data is connected, the independent right-column scroll position can be remembered per user without changing the current layout.

final result: passed
