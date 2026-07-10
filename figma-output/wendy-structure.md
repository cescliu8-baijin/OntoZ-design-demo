# 社媒运营 Wendy - Figma 结构说明

源页面位置：
- `/Users/baixing_12345/Documents/OntoZ/index.html:710` 开始为 `#wendyPage`
- `/Users/baixing_12345/Documents/OntoZ/index.html:945` 开始为 `#wendyAgentPage`
- `/Users/baixing_12345/Documents/OntoZ/css/wendy.css:1` 为 Wendy 专属样式

## 设计 Token

### Color
- `canvas/default`: `#f1f1ff`
- `page/wendy`: `#fbfbfc`
- `surface/default`: `#ffffff`
- `surface/subtle`: `#fafafe`
- `surface/panel`: `#fbfcfe`
- `text/primary`: `#0a0a0a`
- `text/heading`: `#111116`
- `text/muted`: `#737373`
- `text/slate`: `#64748b`
- `border/default`: `#e5e5e5`
- `border/wendy`: `#e6e6eb`
- `border/control`: `#d8deea`
- `brand/primary`: `#17171f`
- `accent/purple`: `#7751d8`
- `platform/linkedin`: `#4a90f2`
- `platform/instagram`: `#df2b9d`
- `platform/tiktok`: `#8b46d8`
- `platform/youtube`: `#ba76d3`
- `event/linkedin/bg`: `#c8ddff`
- `event/linkedin/text`: `#2f83e8`
- `event/instagram/bg`: `#f1b8de`
- `event/instagram/text`: `#db238f`
- `event/purple/bg`: `#d8bee9`
- `event/purple/text`: `#7a39ce`
- `event/hot/bg`: `#d7199d`

### Typography
- `font/base`: `Inter, PingFang SC, Microsoft YaHei, system-ui, sans-serif`
- `font/display`: `Georgia, Songti SC, STSong, serif`
- `display/hero`: 46 / 54 / 500
- `heading/page-toolbar`: 24 / 32 / 700
- `heading/modal`: 22 / 30 / 700
- `heading/card`: 16 / 24 / 600
- `body/default`: 14 / 20 / 400
- `body/muted`: 13 / 20 / 400
- `caption`: 12 / 16-18 / 700
- `button/default`: 14 / 20 / 700

### Spacing / Radius / Effects
- `space/page-x`: 32
- `space/page-y`: 24
- `space/section-gap`: 20
- `space/card`: 16 / 18 / 20 / 24
- `space/grid-gap`: 10 / 12 / 16 / 18 / 36
- `calendar/hour-height`: 74
- `calendar/time-axis-width`: 72
- `calendar/day-min-width`: 126
- `radius/control`: 6 / 8 / 10
- `radius/card`: 12 / 14 / 18
- `radius/composer`: 24
- `radius/pill`: 999
- `shadow/card`: `0 1px 2px rgba(17,17,22,.06)`
- `shadow/modal`: `0 24px 70px rgba(15,23,42,.24)`
- `shadow/composer`: `0 1px 3px rgba(0,0,0,.1), 0 14px 30px rgba(17,17,22,.08)`

## Figma 层级树

```text
Page: 社媒运营 Wendy
└─ Frame: Wendy 社媒运营 / Desktop 1440
   ├─ Section Frame: Hero
   │  ├─ Text: 社媒运营智能体
   │  ├─ Text: Wendy 社媒发布日历
   │  └─ Text: 按最佳发布时间查看...
   ├─ Section Frame: Calendar Shell
   │  ├─ Component/Nav: Calendar Toolbar
   │  │  ├─ Component/Button: Today
   │  │  ├─ Component/IconButton: Previous Week
   │  │  ├─ Component/IconButton: Next Week
   │  │  ├─ Text: 2026年7月6日 - 12日
   │  │  ├─ Component/Tabs: 周 / 月 / 列表
   │  │  ├─ Component/IconButton: Settings
   │  │  └─ Component/Button/Primary: 发布 Post
   │  ├─ Component/Nav: Calendar Subbar
   │  │  ├─ Component/Button/Pill: 未来热门标签
   │  │  └─ Component/Legend: LinkedIn / Instagram / TikTok / YouTube
   │  └─ Component/Grid: Week Calendar
   │     ├─ Header Row: 6 周一 ... 12 周日
   │     ├─ Column: Time Axis
   │     └─ Day Columns x7
   │        └─ Component/Card: Calendar Event
   ├─ Section Frame: Bottom Composer
   │  ├─ Component/Input: Prompt Textarea
   │  ├─ Component/Button/Ghost: 添加资料
   │  └─ Component/Button/Secondary: 发送
   └─ Section Frame: Publisher Modal
      ├─ Overlay Backdrop
      └─ Component/Dialog: Publisher Panel
         ├─ Dialog Header
         ├─ Body Grid
         │  ├─ Main Column
         │  │  ├─ Component/Card: Platform Picker
         │  │  ├─ Component/Tabs: Content Type
         │  │  ├─ Component/Input: Caption Field
         │  │  └─ Component/Grid: Media Picker
         │  └─ Side Column
         │     ├─ Component/Card: Account + Schedule
         │     └─ Component/Card: Platform Preview
         └─ Dialog Footer
            ├─ Component/Button/Secondary: 保存草稿
            └─ Component/Button/Primary: 排期发布

└─ Frame: Wendy Agent / Desktop 1440
   ├─ Component/Nav: Agent Topbar
   ├─ Section Frame: Thinking Thread
   │  └─ Component/Card: Thinking Card
   ├─ Section Frame: Result Summary
   │  ├─ Header + Credit Badge + Confirm Button
   │  ├─ Component/Grid: Result Brief Cards x6
   │  ├─ Component/Grid: Platform Summary Cards x3
   │  └─ Component/Card: Result Notes
   └─ Section Frame: Post Previews
      ├─ Component/Card: Preview Heading
      ├─ Component/Card: LinkedIn Post Preview
      ├─ Component/Card: Instagram Post Preview
      └─ Component/Card: TikTok Post Preview
```

## Auto Layout 映射

- CSS `flex`：Figma `layoutMode = HORIZONTAL/VERTICAL`，用 `itemSpacing`、padding、`counterAxisAlignItems` 对齐。
- CSS `grid-template-columns: 72px repeat(7, minmax(126px, 1fr))`：Figma 中拆为横向 Auto Layout，第一列固定 72，后续 7 列固定 126 或填充。
- CSS `grid-template-columns: minmax(0, 1fr) 360px`：Figma 中 Dialog Body 使用横向 Auto Layout，主列 Fill，侧栏固定 360。
- CSS `grid-template-columns: repeat(4, minmax(0, 1fr))`：Figma 中用横向 Auto Layout + 等宽卡片模拟平台、内容类型和素材 grid。
- 绝对定位的日历事件：Figma 中每个 Day Column 使用普通 Frame，事件卡通过 `x/y` 模拟 `--start * 74px`。

## 组件标注

- `Component/Button`: Primary、Secondary、Ghost、Icon、Pill
- `Component/Tabs`: Segmented control、Schedule tabs
- `Component/Card`: Calendar shell、Event card、Result brief card、Preview card、Account card
- `Component/Input`: Textarea、Select、Datetime input
- `Component/Nav`: Calendar toolbar、Agent topbar
- `Component/Grid`: Week calendar、Platform picker、Media picker、Result brief grid
