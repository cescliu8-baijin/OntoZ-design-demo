# OntoZ 设计系统与新项目开发前必读

版本：2.1 · 2026-09-17。对象：为 OntoZ 新增模块、或基于 OntoZ 视觉与交互规则开发新项目的 Coding Agent。

本指南以组件库文字/阴影样式、飞书第3章自适应规范及当前根目录源码为准，涵盖组件、图标、变量、Auto Layout 与响应式布局。它是开发约束，不是一次自动重构授权。现有业务不符合建议时，记录差异，不顺手改业务逻辑。

## 1. 开始前的阅读与判断

1. 先读项目根目录 `AGENTS.md`，再读本文，页面开发前执行第3.1节的 Figma 插件读取与组件复用规则。用户当前指令优先，其次项目规则。
2. 读 `index.html`、`styles.css` 的引用顺序，以及目标页面脚本和 CSS；不要只读单个组件选择器。
3. 先读 `css/design-tokens.css` 和 `css/project-layout.css`，再读 `css/base.css`、`css/agent-shared.css`、`js/agent-home-layout.js`、`js/route.js`；涉及 Zoe/Lily 时读 `css/zoe-agent-v2.css`，涉及 Wendy 时读 `css/wendy-home.css`。
4. 新增 Agent 首页再读 [首页专项规范](new-agent-development-guide.md)。其中历史规则如与当前实现冲突，以本文明确的当前参数与源码为准。
5. 查阅 [前端手册](design-system/OntoZ平台设计规范.html) 的完整颜色、图标、接入示例、业务例外和验收记录；[飞书产品设计规范](https://iihcw7mp26x.feishu.cn/docx/HGw5dksH4oRKR2xFTpscYfxZn3b)面向产品和设计（[本地源稿](design-system/product-design.feishu.xml)）。

先区分任务：现项目扩展应接入现有源码；独立新项目可将契约映射为框架组件与语义 token，不应整包复制演示业务、历史覆盖样式或部署镜像。

## 2. 唯一源码与技术边界

- 正式页面结构在 `index.html`，样式在 `css/`，交互在 `js/`，资源在 `assets/`。`styles.css` 是现有样式入口，`lucide-icons.css` 是导航图标适配。
- `public/site`、`dist`、Site 和预览目录都是产物，不是第二套源码。使用 Git 保留历史，不建 `index-copy.html` 等副本。
- 当前 UI 是静态 HTML + 普通脚本，不是已封装的 React 组件库。`app/page.tsx` 只是重定向到 `/site/index.html`，不能因存在 React 依赖就从托管壳重新实现页面。
- `styles.css` 首先导入 `css/design-tokens.css`，再导入基础和业务样式；HTML 后续加载询盘、共享首页、Wendy 首页、条件启用的 Zoe/Lily 适配层，最后加载 `css/project-layout.css`。改变顺序会改变最终规则。
- `css/zoe-agent-v2.css` 初始 disabled，由 `js/zoe.js` 在精确 `#zoe` / `#lily` 路由启用；不能因为文件含 Wendy 选择器就认为 Wendy 使用了它。
- 不移动/重命名资源；删除前检查 HTML/CSS/JS 引用。新增样式与行为必须限定作用域。

## 3. 组件契约

### 3.1 Figma 组件库与执行规则

组件库入口：[OntoZ Figma 组件库](https://www.figma.com/design/oPNMfPosKibiZoqjOLh92h/OntoZ-%E7%BB%84%E4%BB%B6%E5%BA%93?node-id=3095-5236&t=aOkcUZreZOsizpMv-1)。

页面开发时，AI Agent 必须通过 Figma 插件读取本组件库中的目标组件、变体、样式变量和适用状态，再进行实现或复用。该链接是组件库入口，需要在文件内定位实际组件；不能把入口节点当作所有组件的设计节点。

按钮、输入框、弹窗、标签四类组件必须严格遵守组件库中对应变体的样式与状态，包括尺寸、文字、颜色、间距、边框、圆角、阴影及状态表现。按组件库实际提供的状态核对，不自行改变已有状态样式，也不以项目旧实现替代组件库依据。

其他类型的组件可按业务需要调整结构、样式、布局与状态，不要求逐项严格复刻组件库；仍遵守项目共用变量、自适应规则和可访问性要求。其中嵌套的按钮、输入框、弹窗、标签仍按上述严格规则执行。

开发顺序：通过插件定位组件并读取所需变体及状态 → 核对并复用匹配的公共实现 → 缺少实现时依据组件库补齐 → 验收所用变体及适用状态，并在交付说明中记录组件链接或节点。未成功读取时说明缺失依据，不将推测标记为已对齐。

本规则优先于本文及历史指南中对四类组件的旧样式描述。组件目录、代码示例和现状预览用于定位已有实现，不能据此推定已经通过组件库一致性验收；其他组件的现有规格作为可按需调整的基线。

### 3.2 现有组件与复用入口

| 组件 | 要求 | 主要复用入口 |
| --- | --- | --- |
| 应用导航 | 展开240px、图标栏64px、手机顶栏56px；路由和可访问状态同步 | `css/base.css`、`js/route.js` |
| 页面标题区 | 标题、说明、一个主操作和可选次操作；允许换行 | `.av2-header`、`.av2-page-actions` |
| 状态/管理区 | 与协作栏同列线；自然增高；文字明确表达状态 | `.av2-status` 或现有业务别名 |
| 指标/主卡 | 白底、1px边框、16px圆角；数字用 tabular-nums | 各首页业务适配层 |
| 协作面板 | 唯一 DOM，Header/Stream/Composer；只有流滚动 | `.av2-collab`、`mountAgentHome()` |
| 决策/审核卡 | 标题→依据→影响或预览→主次操作；不裁切业务正文 | 各业务卡片 |
| 需求输入 | 宽100%、高96、padding16、gap12、圆角16；发送高32 | `.av2-prompt-box` |
| Tabs/列表/表格 | 只允许指定局部滚动；选中、空、搜索无结果明确 | 业务 CSS；询盘与客户池 |
| Dialog/Drawer | 优先原生 dialog；Esc、焦点循环、关闭后回焦 | `js/agent-home-layout.js` |
| Toast | 复用 live region 与工具函数，不新增独立全局提示系统 | `showToast()` / `#toast` |
| 运行流程 | 手机线性摘要，必要时展开；暂停规则与数据更新分离 | `onMotion` / `data-av2-flow-expanded` |

按钮、输入框、弹窗、标签按组件库中所用变体的适用状态验收。其他业务组件按需求覆盖加载、空、错误、处理结果与长内容；状态清单不代表现有全部状态已实现。

当前页面主操作渐变、模块主操作近黑色，这是现状记录；新开发的按钮样式以组件库所选变体为准。通用 `.av2-page-actions` 的主按钮类为 `.primary`；`.av2-primary` 等业务别名依赖适配层，不能脱离该层直接复用。

## 4. 图标与资源

通用图标使用 `assets/lucide.min.js`，通过 `<i data-lucide="send"></i>` 或 `renderIcon('send')` 创建。动态 DOM 插入后调用 `refreshIcons()`。基础图标16×16、描边1.5；页面操作图标描边1；尺寸18/24的局部变体按组件定义使用。

图标继承颜色；只有图标的按钮必须有 `aria-label`；装饰 SVG 使用 `aria-hidden="true"` 与 `focusable="false"`。不能以图标替换状态文字。动态文案使用 `escapeHTML()`，不要将用户文本直接拼接进 HTML。

平台标识复用 `assets/LinkedIn.svg`、`Facebook.svg`、`Instagram.svg`、`X.svg`、`TikTok.svg`、`YouTube.svg`，保留大小写和比例。不要下载相似图标覆盖原文件。完整静态引用目录见前端手册；动态构造的名称仍需核对实际渲染。

## 5. 变量与尺度

### 5.1 已实现的颜色变量

| 用途 | Token | 值 |
| --- | --- | --- |
| 画布 | `--oz-background-color` | `#EEF2FF` |
| 卡片/弹层 | `--oz-card` / `--oz-popover` | `#FFFFFF` |
| 正文 | `--oz-foreground` | `#0A0A0A` |
| 次级文字 | `--oz-muted-foreground` | `#737373` |
| 边框 | `--oz-border` / `--oz-input` | `#E5E5E5` |
| 模块主操作 | `--oz-primary` / `--oz-primary-foreground` | `#171717` / `#FAFAFA` |
| 次级表面 | `--oz-secondary` / `--oz-muted` | `#F5F5F5` |
| 品牌强调 | `--oz-indigo-500` | `#6366F1` |
| 危险操作 | `--oz-destructive` | `#DC2626` |

优先语义变量，图表和品牌可用色阶。`--indigo`、`--canvas`、`--foreground`、`--muted`、`--border`、`--panel` 是旧别名。成功/警告目前使用 green/amber 色阶，没有统一 `--oz-success` / `--oz-warning`。`--oz-shadow-soft` 只是颜色，不能直接作为完整 box-shadow。

### 5.2 全项目通用文字

全项目使用同一套通用文字变量，不按 Wendy、Zoe、Lily 划分。字体样式使用 Inter；13 档字号与对应行高均来自组件库，9 档字重共组成 117 个样式，默认字距 0、段落间距 0。正文、导航、按钮、表单、卡片标题、辅助文字均从此表选择。Agent 首页标题和指标数字属于独立展示样式，不纳入通用文字表。

| 样式 | 字号 px | 行高 px | CSS 变量 |
| --- | --- | --- | --- |
| Text-xs | 12 | 16 | --oz-text-xs / --oz-leading-xs |
| Text-sm | 14 | 20 | --oz-text-sm / --oz-leading-sm |
| Text-base | 16 | 24 | --oz-text-base / --oz-leading-base |
| Text-lg | 18 | 28 | --oz-text-lg / --oz-leading-lg |
| Text-xl | 20 | 28 | --oz-text-xl / --oz-leading-xl |
| Text-2xl | 24 | 32 | --oz-text-2xl / --oz-leading-2xl |
| Text-3xl | 30 | 36 | --oz-text-3xl / --oz-leading-3xl |
| Text-4xl | 36 | 40 | --oz-text-4xl / --oz-leading-4xl |
| Text-5xl | 48 | 48 | --oz-text-5xl / --oz-leading-5xl |
| Text-6xl | 60 | 60 | --oz-text-6xl / --oz-leading-6xl |
| Text-7xl | 72 | 72 | --oz-text-7xl / --oz-leading-7xl |
| Text-8xl | 96 | 96 | --oz-text-8xl / --oz-leading-8xl |
| Text-9xl | 128 | 128 | --oz-text-9xl / --oz-leading-9xl |

| Figma 字重 | CSS 后缀 | 值 |
| --- | --- | --- |
| Thin | thin | 100 |
| Extra Light | extralight | 200 |
| Light | light | 300 |
| Regular | normal | 400 |
| Medium | medium | 500 |
| Semi Bold | semibold | 600 |
| Bold | bold | 700 |
| Extra Bold | extrabold | 800 |
| Black | black | 900 |

实现使用 css/design-tokens.css。默认 UI 为 sm 14/20，辅助 xs 12/16，模块标题 base 16/24 或 lg 18/28；按钮 Default/Large 使用 sm + Medium，Small/XSmall 使用 xs + Regular。旧通用文字 10/11→12、13→14、15→16、17→18，旧 22→24；不通过缩小文字适配。手机输入使用 base 16/24。标题和指标例外必须限定在对应展示选择器，不得借用到普通文案。

公共字体栈为 Inter, PingFang SC, Microsoft YaHei, system-ui, sans-serif。设计变量另有 Geist Mono、Nunito Sans、Jetbrains Mono，代码/等宽文本可使用 --oz-font-family-mono。项目没有附带字体文件，设备缺少 Inter 时按同一栈回退，不再按 Agent 使用不同系统栈。首页宋体标题保留 48/56、紧凑40/48、手机30/40；指标的具体展示尺寸保留现有业务定义。

字距变量 tracking/tighter、tight、normal、wide、wider、widest 对应 -0.8、-0.4、0、0.4、0.8、1.6px；CSS 为 --oz-tracking-*。默认 normal。字重使用 --oz-weight-*，Regular 对应 normal；字体斜体为 --oz-font-style-italic / --oz-font-style-normal。leading/3…32 的原始变量也提供 --oz-leading-3…32，与按文字等级命名的行高别名并存。

### 5.3 margin、padding、gap 与圆角

| 属性 | px | 规则 |
| --- | --- | --- |
| 页面左右 padding | 16 / 24 / 32 | V<768 / 768≤V<1440 / V≥1440 |
| 模块 gap | 16 / 24 | 手机16；平板和桌面24；--oz-module-gap |
| 标题区下 margin | 16 / 24 | 与模块间距一致 |
| 副标题 margin-top | 12 | 标题与说明 |
| 操作区 margin-top | 12 / 20 | 按现有组件：Wendy12、共享20 |
| 状态 padding | 16px 24px | 宽 Fill、高 Hug、最小76；gap12 |
| 协作三区 padding | 12 | Header / Stream / Composer；Wendy 流保留上边距0 |
| PromptBox padding / gap | 16 / 12 | 固定高度96；发送按钮高度32 |
| 指标卡 padding | 16 / 20 / 24 | 组件内部留白，不作为模块间距 |

圆角：主卡/协作/输入16；内部卡/状态12；常规控件10；胶囊9999；头像50%；手机全屏协作0。组件内部间距与圆角仍在组件CSS中定义，不能引用未定义的 `--oz-space-*` 或 `--oz-radius-*`。

### 5.4 阴影

所有完整阴影在 `css/design-tokens.css` 定义，以 `--oz-shadow-` 加下表后缀引用。不要重新写一套相似值。

| 后缀 | 完整 CSS 值 | 用途 |
| --- | --- | --- |
| 2xs | 0 1px 0 0 rgb(0 0 0 / .05) | 最弱边缘 |
| xs | 0 1px 2px 0 rgb(0 0 0 / .1) | 按钮、轻量控件 |
| sm | 0 1px 3px 0 rgb(0 0 0 / .1) | 内容卡片、协作面板 |
| md | 0 2px 4px -2px rgb(0 0 0 / .1), 0 4px 6px -1px rgb(0 0 0 / .1) | 悬浮卡片 |
| lg | 0 4px 6px -4px rgb(0 0 0 / .1), 0 10px 15px -3px rgb(0 0 0 / .1) | 下拉、Toast |
| xl | 0 8px 10px -6px rgb(0 0 0 / .1), 0 20px 25px -5px rgb(0 0 0 / .1) | Dialog、Drawer |
| 2xl | 0 25px 50px -12px rgb(0 0 0 / .25) | 特大浮层，谨慎使用 |
| inner | inset 0 2px 4px 0 rgb(0 0 0 / .06) | 状态区内阴影 |
| none | none | 无阴影 |
| focus | 0 0 0 3px rgb(161 161 161 / .5) | 普通焦点环 |
| destructive | 0 0 0 3px rgb(220 38 38 / .2) | 危险/错误焦点环 |

shadow-sm 是单层；md/lg/xl 是双层。Focus ring 是 #A1A1A1 / 50%，不是 Indigo。`--oz-shadow-soft` 仅为旧颜色。

## 6. Auto Layout → 实现规则

| 设计模式 | CSS / DOM 约束 |
| --- | --- |
| Fill | 宽100%或flex:1；Grid使用minmax(0,1fr)；子项min-width:0 |
| Hug | 内容自然尺寸；文本不固定高度；长标题可换行 |
| Fixed | 只用于图标、明确尺寸的控件、输入框或视口约束面板 |
| 水平/垂直自动布局 | Flex/Grid；通过gap表达重复间隔 |
| Wrap | 按钮组flex-wrap:wrap；不能缩字号挤成单行 |
| 顶部共列线 | Header与Columns使用同一右栏变量和列间距 |
| 面板内部滚动 | Header/Composer flex:none；Stream flex:1,min-height:0,overflow-y:auto |
| 溢出处理 | 长链接overflow-wrap:anywhere；Tabs/表格局部横滚；页面不得横滚 |

普通文案不要绝对定位拼接。浮层、装饰、图谱连线和明确的整卡触发区可例外。Auto Layout 是源码映射，不表示项目已有 Figma Auto Layout 组件资产。

## 7. 全项目响应式契约

依据：[组件库](https://www.figma.com/design/oPNMfPosKibiZoqjOLh92h/OntoZ?node-id=3095-5236&view=variables)；[自适应规范第3章](https://iihcw7mp26x.feishu.cn/docx/FTHBdjdvyoZuGJxEzFncR3GAnzd)。

| 条件 | 数值 | 行为 |
| --- | --- | --- |
| V < 768 | N=0，P=16 | 56px 顶栏；菜单宽 min(288,V−48)，浮层覆盖 |
| 768 ≤ V < 1440 | N=64，P=24 | 默认图标栏64；展开240为浮层，内容不位移 |
| V ≥ 1440 | N=240 或64，P=32 | 默认展开，用户收起状态按 Agent/路由组保存 |
| C ≥ 1024 | R=clamp(360,0.3×C,480) | L=C−R−24；左右共列线；L最小640 |
| C < 1024 | 单列主体 | 协作移入480px抽屉；V<768时全屏 |
| 所有页面 | C=min(V−N,1664)−2P | 根容器最大1664，桌面内容最大1600；模块间距24/16 |

来源文档存在早期“左右40px”“右栏最大520px”的描述；以第3章跨端规则及其计算公式为准：左右16/24/32、根容器1664、右栏上限480、C=1024切换。本次移除共享函数的旧1040/640/520回退算法，新页面不再得到另一套默认值。

原文只规定 Agent 页面。本项目将导航、页面留白、最大宽度、模块间距、手机输入文字和局部溢出原则推广到全部业务路由。主工作区加侧栏在容器不足1024时改为单列；数据看板等信息侧栏顺排保留内容。询盘/编辑流程属于专用工作台，保留其会话、资料浮层与业务切换机制，不把资料栏当成 Agent 协作栏套用480px；内部继续按实际容器宽度决定收敛。

| V | N | P | C | L | R/抽屉 |
| --- | --- | --- | --- | --- | --- |
| 2560 | 240 | 32 | 1600 | 1096 | 480 |
| 1920 | 240 | 32 | 1600 | 1096 | 480 |
| 1600 | 240 | 32 | 1296 | 883.2 | 388.8 |
| 1440 | 240 | 32 | 1136 | 752 | 360 |
| 1439 | 64 | 24 | 1327 | 904.9 | 398.1 |
| 1366 | 64 | 24 | 1254 | 853.8 | 376.2 |
| 1280 | 64 | 24 | 1168 | 784 | 360 |
| 1200 | 64 | 24 | 1088 | 704 | 360 |
| 1136 | 64 | 24 | 1024 | 640 | 360 |
| 1135 | 64 | 24 | 1023 | 单列 | 抽屉 480 |
| 1024 | 64 | 24 | 912 | 单列 | 抽屉 480 |
| 768 | 64 | 24 | 656 | 单列 | 抽屉 480 |
| 767 | 0 | 16 | 735 | 单列 | 抽屉 767 |
| 390 | 0 | 16 | 358 | 单列 | 抽屉 390 |
| 320 | 0 | 16 | 288 | 单列 | 抽屉 320 |

共享配置为 `{ viewportPadding:true, compactWidth:1024, mobileWidth:768, railRatio:.3, railMax:480 }`，也是 `mountAgentHome` 的默认配置；新增首页仍建议显式传入以表达依赖。

桌面协作高度为 `max(320, innerHeight-max(16,columns.top)-16)`；sticky top16。手机dialog使用100dvh、visualViewport和safe-area；只移动同一个DOM，保留草稿、状态、滚动和焦点。运行图在手机、页面隐藏或减少动态效果时暂停；Zoe手动折叠、Wendy审批逻辑不随布局切换重置。

业务内部使用容器查询：Wendy主区<640时指标两列、流程线性，<340时指标一列；状态区<400可改方向。`project-layout.css` 将核心信息布局在容器<1024改单列、<640进一步收敛。询盘资料侧栏/会话模式保留专用业务机制；不得把它与Agent协作区混为一谈。

## 8. 新页面接入顺序与生命周期

1. 建立唯一 `.agent-v2` 根节点，唯一ID、`data-agent`；包含 `.av2-header`、`.av2-columns`、`.av2-main`、`.av2-collab`。
2. 协作区包含 `.av2-stream`、`.av2-compose`、`.av2-prompt-box`、`[data-av2-close]`；输入必须有可访问名称。通用状态类仅提供表面样式，内部排布需定义。
3. 接入 `mountAgentHome({root,count,flow,responsive,onMotion,...})`。`count` 是节点选择器；脚本提取其中数字并观察变化。布局层不负责业务提交。
4. 业务表单绑定submit、preventDefault、输入校验、disabled/加载/错误反馈；动态渲染后refreshIcons。监听 `agent:collaboration-open` 刷新待办。
5. 如协作卡打开业务弹窗，配置 `businessModal` 与 `yieldToModal`；当前恢复逻辑观察业务弹窗hidden属性，使用其他开关机制需扩展适配。
6. 重渲染前snapshot与destroy；替换根DOM后previous恢复状态。destroy清理监听与observer，但不会删除原dialog/attention/anchor，不能在同一未清理根上重复mount。
7. 接入js/route.js路由表、标题与显隐；全项目导航壳自动按路由组保存折叠状态，不再维护三首页白名单。
8. 为业务适配层限定根ID；避免直接全局启用Zoe/Lily样式；不修改同名类的所有业务页。

## 9. 完成定义

先启动根目录静态预览：`python3 -m http.server 8765`。以源码预览通过为前提，再按用户任务范围决定是否部署；文档更新本身不需要部署产品。

- [ ] 检查390、768、1440；复杂首页增加360、1024、1280、1920、2560、3440。
- [ ] 检查767/768、1135/1136、1439/1440，以及C=1023/1024两侧与导航展开/收起。
- [ ] 已通过 Figma 插件读取目标组件；四类严格组件的变体、样式和适用状态与组件库一致，交付记录包含组件链接或节点。
- [ ] 页面无横向溢出；长文、大数字、多卡片与空状态可用；指定局部滚动清晰。
- [ ] 协作同一DOM跨断点保留输入、卡片与滚动；Header/输入不随消息流滚走。
- [ ] Esc、Tab、焦点返回、图标按钮名称、减少动态效果和短视口/软键盘安全区有效。
- [ ] 浏览器控制台及HTTP资源无新增错误；图片自然尺寸非零；图标已渲染；字体回退正常。
- [ ] 新页面主路径和关联业务弹窗不受共享样式误伤。
- [ ] 对照git diff，保留已有工作区改动，不修改Site镜像或创建第二套源码。

可复用 `scripts/test-wendy-responsive.cjs`，按脚本要求配置Playwright路径和预览URL；它专门针对Wendy，不能把其通过当作所有页面通过。

## 10. 证据与维护

2026-09-17：组件库读取了117个Text样式与Box Shadow样式，并用Button实例核对。证据为 `docs/design-system/figma-foundations.json`、`figma-variables.json`。本次统一了公共文字、完整阴影、全项目导航/页面留白，并移除了旧响应式回退。

浏览器检查覆盖19条路由×12个宽度；业务回归与详细结果见 `docs/design-system/audit.json`。字体没有随项目分发，按公共回退栈使用。抽查不等于覆盖全部业务状态。

维护顺序：修改根目录源码 → 浏览器验证 → 同步本指南、前端手册与飞书规范。首页标题、指标数字的展示例外必须有明确作用域；不能为每个Agent重新定义通用文字和阴影。
