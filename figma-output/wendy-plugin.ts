// Figma Plugin TypeScript: 社媒运营 Wendy HTML/CSS 转 Figma 结构
// 用法：作为 Figma 插件的 main.ts。运行后会创建 Wendy 页面、Design Tokens 和本地组件示例。

type RGB = { r: number; g: number; b: number };
type FontStyle = "Regular" | "Medium" | "Semi Bold" | "Bold";

const T = {
  color: {
    canvas: "#f1f1ff",
    page: "#fbfbfc",
    white: "#ffffff",
    surface: "#fafafe",
    panel: "#fbfcfe",
    foreground: "#0a0a0a",
    heading: "#111116",
    muted: "#737373",
    slate: "#64748b",
    border: "#e5e5e5",
    borderWendy: "#e6e6eb",
    borderControl: "#d8deea",
    primary: "#17171f",
    purple: "#7751d8",
    purpleSubtle: "#f0eafd",
    linkedin: "#4a90f2",
    instagram: "#df2b9d",
    tiktok: "#8b46d8",
    youtube: "#ba76d3",
    eventBlueBg: "#c8ddff",
    eventBlueText: "#2f83e8",
    eventPinkBg: "#f1b8de",
    eventPinkText: "#db238f",
    eventPurpleBg: "#d8bee9",
    eventPurpleText: "#7a39ce",
    hot: "#d7199d",
    green: "#22c55e",
    sky: "#0ea5e9",
  },
  space: { xs: 4, s: 8, m: 10, l: 12, xl: 16, xxl: 18, xxxl: 24, pageX: 32, hour: 74 },
  radius: { control: 8, small: 6, card: 12, modal: 18, composer: 24, pill: 999 },
};

const events = [
  { day: 0, start: 3, title: "LinkedIn 案例图文", bg: T.color.eventBlueBg, fg: T.color.eventBlueText },
  { day: 1, start: 0, title: "Instagram 产品细节", bg: T.color.eventPurpleBg, fg: T.color.eventPurpleText },
  { day: 1, start: 6, title: "TikTok 工厂短视频", bg: T.color.hot, fg: T.color.white },
  { day: 1, start: 7, title: "LinkedIn 交付时间线", bg: T.color.eventBlueBg, fg: T.color.eventBlueText },
  { day: 1, start: 12, title: "Instagram 场景轮播", bg: T.color.eventPurpleBg, fg: T.color.eventPurpleText },
  { day: 2, start: 7, title: "Instagram FAQ 短图", bg: T.color.eventPinkBg, fg: T.color.eventPinkText },
  { day: 2, start: 13, title: "LinkedIn 买家投票", bg: T.color.eventBlueBg, fg: T.color.eventBlueText },
  { day: 3, start: 0, title: "YouTube Shorts 出货", bg: T.color.eventPurpleBg, fg: T.color.eventPurpleText },
  { day: 3, start: 4, title: "Instagram 项目现场", bg: T.color.eventPinkBg, fg: T.color.eventPinkText },
  { day: 4, start: 9, title: "Instagram 合作清单", bg: T.color.eventPinkBg, fg: T.color.eventPinkText },
  { day: 4, start: 11, title: "YouTube 售后短片", bg: T.color.eventPurpleBg, fg: T.color.eventPurpleText },
  { day: 4, start: 13, title: "LinkedIn 采购帖", bg: T.color.eventBlueBg, fg: T.color.eventBlueText },
  { day: 5, start: 5, title: "Instagram 照片合集", bg: T.color.eventPinkBg, fg: T.color.eventPinkText },
  { day: 5, start: 13, title: "LinkedIn 周总结", bg: T.color.eventBlueBg, fg: T.color.eventBlueText },
  { day: 6, start: 2, title: "YouTube 下周预告", bg: T.color.eventPurpleBg, fg: T.color.eventPurpleText },
];

function hexToRgb(hex: string): RGB {
  const v = hex.replace("#", "");
  return { r: parseInt(v.slice(0, 2), 16) / 255, g: parseInt(v.slice(2, 4), 16) / 255, b: parseInt(v.slice(4, 6), 16) / 255 };
}

function solid(hex: string, opacity = 1): SolidPaint {
  return { type: "SOLID", color: hexToRgb(hex), opacity };
}

async function loadFont(style: FontStyle = "Regular"): Promise<FontName> {
  const font = { family: "Inter", style };
  try {
    await figma.loadFontAsync(font);
    return font;
  } catch {
    const fallback = { family: "Arial", style: style === "Regular" ? "Regular" : "Bold" };
    await figma.loadFontAsync(fallback);
    return fallback;
  }
}

function frame(name: string, mode: "VERTICAL" | "HORIZONTAL" = "VERTICAL"): FrameNode {
  const node = figma.createFrame();
  node.name = name;
  node.layoutMode = mode;
  node.primaryAxisSizingMode = "AUTO";
  node.counterAxisSizingMode = "AUTO";
  node.itemSpacing = 0;
  node.fills = [];
  return node;
}

function pad(node: FrameNode | ComponentNode, top: number, right = top, bottom = top, left = right) {
  node.paddingTop = top;
  node.paddingRight = right;
  node.paddingBottom = bottom;
  node.paddingLeft = left;
}

async function text(label: string, size = 14, lineHeight = 20, color = T.color.foreground, style: FontStyle = "Regular"): Promise<TextNode> {
  const t = figma.createText();
  t.name = `Text / ${label.slice(0, 28)}`;
  t.fontName = await loadFont(style);
  t.characters = label;
  t.fontSize = size;
  t.lineHeight = { unit: "PIXELS", value: lineHeight };
  t.fills = [solid(color)];
  return t;
}

async function button(label: string, variant: "primary" | "secondary" | "ghost" | "pill" = "secondary"): Promise<FrameNode> {
  const b = frame(`Component/Button/${variant} / ${label}`, "HORIZONTAL");
  b.counterAxisAlignItems = "CENTER";
  b.primaryAxisAlignItems = "CENTER";
  b.itemSpacing = 8;
  b.cornerRadius = variant === "pill" ? T.radius.pill : T.radius.control;
  pad(b, 0, variant === "ghost" ? 8 : 16);
  b.resize(Math.max(86, label.length * 14 + 34), variant === "pill" ? 40 : 40);
  b.primaryAxisSizingMode = "FIXED";
  b.counterAxisSizingMode = "FIXED";
  b.fills = [solid(variant === "primary" ? T.color.primary : T.color.white)];
  b.strokes = variant === "ghost" ? [] : [solid(variant === "pill" ? T.color.purple : T.color.borderControl)];
  b.strokeWeight = variant === "pill" ? 2 : 1;
  b.appendChild(await text(label, 14, 20, variant === "primary" ? T.color.white : variant === "pill" ? T.color.purple : T.color.primary, "Bold"));
  return b;
}

async function chip(label: string, color = T.color.purple): Promise<FrameNode> {
  const c = frame(`Component/Badge / ${label}`, "HORIZONTAL");
  c.counterAxisAlignItems = "CENTER";
  c.cornerRadius = T.radius.pill;
  c.fills = [solid(T.color.purpleSubtle)];
  pad(c, 3, 8);
  c.appendChild(await text(label, 12, 16, color, "Bold"));
  return c;
}

async function card(name: string): Promise<FrameNode> {
  const c = frame(`Component/Card / ${name}`);
  c.cornerRadius = T.radius.card;
  c.fills = [solid(T.color.white)];
  c.strokes = [solid(T.color.border)];
  c.effects = [{ type: "DROP_SHADOW", color: { ...hexToRgb("#000000"), a: 0.08 }, offset: { x: 0, y: 1 }, radius: 1.5, spread: 0, visible: true, blendMode: "NORMAL" }];
  pad(c, 16, 20);
  c.itemSpacing = 12;
  return c;
}

async function sectionTitle(parent: FrameNode, title: string, meta: string) {
  const row = frame(`Annotation / ${meta}`, "HORIZONTAL");
  row.itemSpacing = 8;
  row.counterAxisAlignItems = "CENTER";
  row.appendChild(await chip(meta));
  row.appendChild(await text(title, 13, 18, T.color.muted, "Bold"));
  parent.appendChild(row);
}

async function buildTokens(x: number): Promise<FrameNode> {
  const root = frame("00 Design Tokens");
  root.x = x;
  root.y = 0;
  root.resize(360, 100);
  root.fills = [solid(T.color.white)];
  root.cornerRadius = 16;
  root.strokes = [solid(T.color.border)];
  root.itemSpacing = 14;
  pad(root, 24);
  root.appendChild(await text("Wendy Design Tokens", 24, 32, T.color.heading, "Bold"));
  for (const [name, value] of Object.entries(T.color)) {
    const row = frame(`Token/Color/${name}`, "HORIZONTAL");
    row.itemSpacing = 10;
    row.counterAxisAlignItems = "CENTER";
    const swatch = figma.createRectangle();
    swatch.name = value;
    swatch.resize(22, 22);
    swatch.cornerRadius = 6;
    swatch.fills = [solid(value)];
    swatch.strokes = [solid(T.color.border)];
    row.appendChild(swatch);
    row.appendChild(await text(`${name}: ${value}`, 12, 16, T.color.foreground));
    root.appendChild(row);
  }
  return root;
}

async function buildHero(): Promise<FrameNode> {
  const s = frame("Section/Hero");
  s.itemSpacing = 8;
  s.fills = [solid(T.color.page)];
  s.resize(1136, 120);
  s.counterAxisSizingMode = "FIXED";
  await sectionTitle(s, "社媒运营智能体", "section");
  s.appendChild(await text("Wendy 社媒发布日历", 46, 54, T.color.heading, "Medium"));
  s.appendChild(await text("按最佳发布时间查看、排期和直接发布 LinkedIn、Instagram、TikTok 与 YouTube Shorts 内容。", 14, 22, "#666672"));
  return s;
}

async function buildCalendar(): Promise<FrameNode> {
  const shell = await card("Calendar Shell");
  shell.name = "Section/Calendar Shell";
  shell.resize(1136, 100);
  shell.counterAxisSizingMode = "FIXED";
  shell.itemSpacing = 0;
  pad(shell, 0);

  const toolbar = frame("Component/Nav / Calendar Toolbar", "HORIZONTAL");
  toolbar.counterAxisAlignItems = "CENTER";
  toolbar.primaryAxisAlignItems = "SPACE_BETWEEN";
  toolbar.resize(1136, 68);
  toolbar.counterAxisSizingMode = "FIXED";
  toolbar.primaryAxisSizingMode = "FIXED";
  pad(toolbar, 16, 18, 10);

  const range = frame("Date Controls", "HORIZONTAL");
  range.itemSpacing = 10;
  range.counterAxisAlignItems = "CENTER";
  range.appendChild(await button("Today", "ghost"));
  range.appendChild(await button("<", "ghost"));
  range.appendChild(await button(">", "ghost"));
  range.appendChild(await text("2026年7月6日 - 12日", 24, 32, T.color.heading, "Bold"));

  const view = frame("View Controls", "HORIZONTAL");
  view.itemSpacing = 10;
  view.counterAxisAlignItems = "CENTER";
  view.appendChild(await text("Asia/Shanghai", 13, 18, "#747480"));
  view.appendChild(await segmented(["周", "月", "列表"], 0, "Component/Tabs / 日历视图"));
  view.appendChild(await button("设置", "secondary"));
  view.appendChild(await button("发布 Post", "primary"));
  toolbar.appendChild(range);
  toolbar.appendChild(view);

  const subbar = frame("Component/Nav / Calendar Subbar", "HORIZONTAL");
  subbar.primaryAxisAlignItems = "SPACE_BETWEEN";
  subbar.counterAxisAlignItems = "CENTER";
  subbar.resize(1136, 58);
  subbar.primaryAxisSizingMode = "FIXED";
  subbar.counterAxisSizingMode = "FIXED";
  pad(subbar, 8, 18, 18);
  subbar.appendChild(await button("# 未来热门标签", "pill"));
  const legend = frame("Component/Legend / Platforms", "HORIZONTAL");
  legend.itemSpacing = 14;
  for (const item of [["LinkedIn", T.color.linkedin], ["Instagram", T.color.instagram], ["TikTok", T.color.tiktok], ["YouTube", T.color.youtube]] as const) {
    const row = frame(`Legend/${item[0]}`, "HORIZONTAL");
    row.itemSpacing = 6;
    row.counterAxisAlignItems = "CENTER";
    const dot = figma.createEllipse();
    dot.resize(10, 10);
    dot.fills = [solid(item[1])];
    row.appendChild(dot);
    row.appendChild(await text(item[0], 12, 16, "#696974"));
    legend.appendChild(row);
  }
  subbar.appendChild(legend);

  const cal = frame("Component/Grid / Week Calendar");
  cal.resize(1136, 1238);
  cal.counterAxisSizingMode = "FIXED";
  cal.itemSpacing = 0;
  cal.strokes = [solid("#eeeeF2")];
  cal.strokeTopWeight = 1;
  const header = frame("Week Header", "HORIZONTAL");
  header.resize(1136, 54);
  header.primaryAxisSizingMode = "FIXED";
  header.counterAxisSizingMode = "FIXED";
  const empty = frame("Header Empty");
  empty.resize(72, 54);
  header.appendChild(empty);
  for (const d of ["6 周一", "7 周二", "8 周三", "9 周四", "10 周五", "11 周六", "12 周日"]) {
    const cell = frame(`Day Header / ${d}`);
    cell.resize(152, 54);
    cell.primaryAxisAlignItems = "MAX";
    cell.counterAxisAlignItems = "CENTER";
    cell.counterAxisSizingMode = "FIXED";
    cell.primaryAxisSizingMode = "FIXED";
    pad(cell, 0, 8, 14);
    cell.appendChild(await text(d, 14, 18, "#73737d", "Bold"));
    header.appendChild(cell);
  }
  const body = frame("Week Body", "HORIZONTAL");
  body.resize(1136, T.space.hour * 16);
  body.primaryAxisSizingMode = "FIXED";
  body.counterAxisSizingMode = "FIXED";
  const axis = frame("Time Axis");
  axis.resize(72, T.space.hour * 16);
  axis.primaryAxisSizingMode = "FIXED";
  axis.counterAxisSizingMode = "FIXED";
  for (const h of ["12AM", "1AM", "2AM", "3AM", "4AM", "5AM", "6AM", "7AM", "8AM", "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM"]) {
    const hour = frame(`Time/${h}`);
    hour.resize(72, T.space.hour);
    hour.counterAxisAlignItems = "MAX";
    hour.strokes = [solid("#e8e8ed")];
    hour.strokeTopWeight = 1;
    pad(hour, 8, 10, 0, 0);
    hour.appendChild(await text(h, 14, 18, "#666672", "Bold"));
    axis.appendChild(hour);
  }
  body.appendChild(axis);
  const days: FrameNode[] = [];
  for (let i = 0; i < 7; i++) {
    const day = figma.createFrame();
    day.name = `Day Column / ${i + 6}`;
    day.resize(152, T.space.hour * 16);
    day.fills = [solid(T.color.white)];
    day.strokes = [solid("#f0f0f4")];
    day.strokeRightWeight = 1;
    body.appendChild(day);
    days.push(day);
  }
  for (const e of events) {
    const ev = await eventCard(e.title, e.bg, e.fg);
    ev.x = 8;
    ev.y = e.start * T.space.hour + 4;
    days[e.day].appendChild(ev);
  }
  cal.appendChild(header);
  cal.appendChild(body);
  shell.appendChild(toolbar);
  shell.appendChild(subbar);
  shell.appendChild(cal);
  return shell;
}

async function segmented(items: string[], active: number, name: string): Promise<FrameNode> {
  const seg = frame(name, "HORIZONTAL");
  seg.counterAxisAlignItems = "CENTER";
  seg.cornerRadius = 6;
  seg.strokes = [solid("#e3e3e8")];
  seg.clipsContent = true;
  for (let i = 0; i < items.length; i++) {
    const item = frame(`Tab/${items[i]}`, "HORIZONTAL");
    item.resize(58, 40);
    item.primaryAxisSizingMode = "FIXED";
    item.counterAxisSizingMode = "FIXED";
    item.primaryAxisAlignItems = "CENTER";
    item.counterAxisAlignItems = "CENTER";
    item.fills = [solid(i === active ? T.color.purpleSubtle : T.color.white)];
    item.appendChild(await text(items[i], 15, 20, i === active ? "#5b2fd3" : T.color.heading, "Bold"));
    seg.appendChild(item);
  }
  return seg;
}

async function eventCard(label: string, bg: string, fg: string): Promise<FrameNode> {
  const ev = frame(`Component/Card/Event / ${label}`, "HORIZONTAL");
  ev.resize(136, 66);
  ev.primaryAxisSizingMode = "FIXED";
  ev.counterAxisSizingMode = "FIXED";
  ev.primaryAxisAlignItems = "SPACE_BETWEEN";
  ev.counterAxisAlignItems = "CENTER";
  ev.cornerRadius = 4;
  ev.fills = [solid(bg)];
  pad(ev, 0, 10, 0, 12);
  ev.appendChild(await text(label, 12, 16, fg, "Bold"));
  ev.appendChild(await text("●", 14, 14, fg, "Bold"));
  return ev;
}

async function buildComposer(): Promise<FrameNode> {
  const s = frame("Section/Bottom Composer");
  s.resize(806, 118);
  s.counterAxisSizingMode = "FIXED";
  s.cornerRadius = T.radius.composer;
  s.fills = [solid(T.color.white, 0.84)];
  s.strokes = [solid(T.color.border)];
  s.effects = [{ type: "DROP_SHADOW", color: { ...hexToRgb("#111116"), a: 0.08 }, offset: { x: 0, y: 14 }, radius: 30, spread: 0, visible: true, blendMode: "NORMAL" }];
  s.itemSpacing = 12;
  pad(s, 16);
  s.appendChild(await text("描述你想要的社媒内容，例如：帮我生成一条LinkedIn新品介绍", 14, 20, T.color.muted));
  const footer = frame("Composer Footer", "HORIZONTAL");
  footer.resize(774, 32);
  footer.primaryAxisSizingMode = "FIXED";
  footer.primaryAxisAlignItems = "SPACE_BETWEEN";
  footer.counterAxisAlignItems = "CENTER";
  footer.appendChild(await button("添加资料", "ghost"));
  footer.appendChild(await button("发送", "secondary"));
  s.appendChild(footer);
  return s;
}

async function buildPublisherModal(): Promise<FrameNode> {
  const overlay = frame("Section/Publisher Modal");
  overlay.resize(1200, 900);
  overlay.primaryAxisAlignItems = "CENTER";
  overlay.counterAxisAlignItems = "CENTER";
  overlay.fills = [solid("#0f172a", 0.48)];
  const modal = frame("Component/Dialog / Publisher Panel");
  modal.resize(1120, 820);
  modal.primaryAxisSizingMode = "FIXED";
  modal.counterAxisSizingMode = "FIXED";
  modal.cornerRadius = T.radius.modal;
  modal.fills = [solid(T.color.white)];
  modal.strokes = [solid("#e2e8f0")];
  modal.clipsContent = true;
  modal.effects = [{ type: "DROP_SHADOW", color: { ...hexToRgb("#0f172a"), a: 0.24 }, offset: { x: 0, y: 24 }, radius: 70, spread: 0, visible: true, blendMode: "NORMAL" }];
  const head = frame("Dialog Header", "HORIZONTAL");
  head.resize(1120, 92);
  head.primaryAxisSizingMode = "FIXED";
  head.counterAxisSizingMode = "FIXED";
  head.primaryAxisAlignItems = "SPACE_BETWEEN";
  head.counterAxisAlignItems = "CENTER";
  pad(head, 20, 24);
  const title = frame("Header Copy");
  title.itemSpacing = 4;
  title.appendChild(await text("Distribute", 12, 16, T.color.slate, "Bold"));
  title.appendChild(await text("发布 Post", 22, 30, "#0f172a", "Bold"));
  title.appendChild(await text("选择平台、内容类型、素材与排期，一次生成可发布的社媒内容。", 13, 20, T.color.slate));
  head.appendChild(title);
  head.appendChild(await button("关闭", "ghost"));
  const body = frame("Dialog Body Grid / Main + 360px Side", "HORIZONTAL");
  body.resize(1120, 650);
  body.primaryAxisSizingMode = "FIXED";
  body.counterAxisSizingMode = "FIXED";
  const main = frame("Publisher Main Column");
  main.resize(760, 650);
  main.counterAxisSizingMode = "FIXED";
  main.primaryAxisSizingMode = "FIXED";
  main.itemSpacing = 16;
  pad(main, 20, 24, 24);
  main.appendChild(await optionGrid("Component/Grid / Platform Picker", ["LinkedIn\nPost", "Instagram\nFeed Post", "TikTok\nVideo", "YouTube\nShort"], 92));
  main.appendChild(await optionGrid("Component/Tabs / Content Type", ["Post", "Article", "Carousel", "Short Video"], 38));
  main.appendChild(await fieldCard("Component/Input / Caption Field", "Post 文案", "面向欧洲储能安装商的新一代并网组件已经完成批量测试。点击了解交付稳定性、认证资料和项目支持方案。", 704));
  main.appendChild(await optionGrid("Component/Grid / Media Picker", ["产品测试图", "工厂场景", "资料页截图", "Upload"], 102));
  const side = frame("Publisher Side Column");
  side.resize(360, 650);
  side.counterAxisSizingMode = "FIXED";
  side.primaryAxisSizingMode = "FIXED";
  side.fills = [solid(T.color.panel)];
  side.strokes = [solid("#edf0f5")];
  side.strokeLeftWeight = 1;
  side.itemSpacing = 16;
  pad(side, 20, 24, 24);
  side.appendChild(await accountCard());
  side.appendChild(await segmented(["Schedule", "Now"], 0, "Component/Tabs / Schedule"));
  side.appendChild(await fieldCard("Component/Input / Publish Time", "发布时间", "2026-07-07T09:30", 312));
  side.appendChild(await previewMini());
  body.appendChild(main);
  body.appendChild(side);
  const foot = frame("Dialog Footer", "HORIZONTAL");
  foot.resize(1120, 78);
  foot.primaryAxisSizingMode = "FIXED";
  foot.counterAxisSizingMode = "FIXED";
  foot.primaryAxisAlignItems = "MAX";
  foot.counterAxisAlignItems = "CENTER";
  foot.itemSpacing = 12;
  pad(foot, 16, 24);
  foot.appendChild(await button("保存草稿", "secondary"));
  foot.appendChild(await button("排期发布", "primary"));
  modal.appendChild(head);
  modal.appendChild(body);
  modal.appendChild(foot);
  overlay.appendChild(modal);
  return overlay;
}

async function optionGrid(name: string, labels: string[], height: number): Promise<FrameNode> {
  const wrap = frame(name);
  wrap.itemSpacing = 12;
  wrap.appendChild(await text(name.includes("Platform") ? "Post to" : name.includes("Media") ? "Media" : "Content Type", 14, 20, "#0f172a", "Bold"));
  const row = frame("Auto Layout Grid / 4 columns", "HORIZONTAL");
  row.itemSpacing = 10;
  for (const label of labels) {
    const item = frame(`Component/Card/Option / ${label}`, "VERTICAL");
    item.resize(164, height);
    item.primaryAxisSizingMode = "FIXED";
    item.counterAxisSizingMode = "FIXED";
    item.primaryAxisAlignItems = "MAX";
    item.cornerRadius = 10;
    item.fills = [solid(label.includes("Upload") ? "#f8fafc" : T.color.white)];
    item.strokes = [solid(label === labels[0] ? "#0f172a" : T.color.borderControl)];
    pad(item, 12);
    item.appendChild(await text(label, 14, 20, "#334155", "Bold"));
    row.appendChild(item);
  }
  wrap.appendChild(row);
  return wrap;
}

async function fieldCard(name: string, label: string, value: string, width = 704): Promise<FrameNode> {
  const f = frame(name);
  f.itemSpacing = 8;
  f.appendChild(await text(label, 12, 16, "#475569", "Bold"));
  const box = frame("Field Surface");
  box.resize(width, value.length > 40 ? 160 : 42);
  box.primaryAxisSizingMode = "FIXED";
  box.counterAxisSizingMode = "FIXED";
  box.cornerRadius = 8;
  box.fills = [solid(T.color.white)];
  box.strokes = [solid(T.color.borderControl)];
  pad(box, value.length > 40 ? 12 : 10, 12);
  box.appendChild(await text(value, 14, 20, "#0f172a"));
  f.appendChild(box);
  return f;
}

async function accountCard(): Promise<FrameNode> {
  const c = await card("Account + Schedule");
  c.name = "Component/Card / Account";
  c.resize(312, 82);
  c.primaryAxisSizingMode = "FIXED";
  c.layoutMode = "HORIZONTAL";
  c.counterAxisAlignItems = "CENTER";
  c.itemSpacing = 10;
  pad(c, 12);
  const avatar = figma.createEllipse();
  avatar.name = "Component/Avatar / OZ";
  avatar.resize(46, 46);
  avatar.fills = [solid("#0f766e")];
  c.appendChild(avatar);
  const copy = frame("Account Copy");
  copy.appendChild(await text("Posting as", 12, 18, T.color.slate));
  copy.appendChild(await text("@OntoZ Power", 14, 20, "#0f172a", "Bold"));
  copy.appendChild(await text("Posting to LinkedIn", 12, 18, T.color.slate));
  c.appendChild(copy);
  return c;
}

async function previewMini(): Promise<FrameNode> {
  const p = await card("Platform Preview");
  p.resize(312, 250);
  p.primaryAxisSizingMode = "FIXED";
  const media = frame("Preview Media");
  media.resize(288, 150);
  media.primaryAxisSizingMode = "FIXED";
  media.counterAxisSizingMode = "FIXED";
  media.primaryAxisAlignItems = "MAX";
  media.cornerRadius = 12;
  media.fills = [solid("#2563eb")];
  pad(media, 14);
  media.appendChild(await text("Product testing", 14, 20, T.color.white, "Bold"));
  p.appendChild(media);
  p.appendChild(await text("面向欧洲储能安装商的新一代并网组件已经完成批量测试。点击了解交付稳定性、认证资料和项目支持方案。", 12, 18, T.color.slate));
  return p;
}

async function buildAgentPage(): Promise<FrameNode> {
  const root = frame("Wendy Agent / Desktop 1440");
  root.resize(1200, 1600);
  root.primaryAxisSizingMode = "FIXED";
  root.counterAxisSizingMode = "FIXED";
  root.fills = [solid(T.color.canvas)];
  root.itemSpacing = 18;
  pad(root, 56, 200, 160);
  const top = frame("Component/Nav / Agent Topbar", "HORIZONTAL");
  top.resize(800, 40);
  top.primaryAxisSizingMode = "FIXED";
  top.primaryAxisAlignItems = "SPACE_BETWEEN";
  top.counterAxisAlignItems = "CENTER";
  top.fills = [solid("#f1f1ff", 0.86)];
  top.appendChild(await button("返回日历", "ghost"));
  top.appendChild(await text("Wendy 正在生成社媒内容方案", 16, 24, T.color.foreground));
  top.appendChild(await button("面板", "ghost"));
  root.appendChild(top);
  const thinking = frame("Section/Thinking Thread");
  thinking.resize(800, 86);
  thinking.primaryAxisSizingMode = "FIXED";
  thinking.layoutMode = "HORIZONTAL";
  thinking.itemSpacing = 8;
  pad(thinking, 0);
  const rail = frame("Status Rail");
  rail.resize(16, 80);
  rail.counterAxisSizingMode = "FIXED";
  rail.counterAxisAlignItems = "CENTER";
  rail.appendChild(await text("✓", 16, 20, T.color.green, "Bold"));
  thinking.appendChild(rail);
  const tc = frame("Component/Card / Thinking Card");
  tc.itemSpacing = 12;
  tc.appendChild(await text("Wendy 正在分析社媒内容诉求", 14, 20, T.color.foreground));
  tc.appendChild(await text("正在读取你的社媒诉求和上传素材...\n匹配 LinkedIn、Instagram、TikTok 的平台格式...\n整理素材、事实依据和预计生成消耗...", 12, 18, T.color.muted));
  thinking.appendChild(tc);
  root.appendChild(thinking);
  root.appendChild(await resultSummary());
  root.appendChild(await postPreviews());
  return root;
}

async function resultSummary(): Promise<FrameNode> {
  const s = await card("Result Summary");
  s.name = "Section/Result Summary";
  s.resize(800, 520);
  s.primaryAxisSizingMode = "FIXED";
  s.itemSpacing = 14;
  const head = frame("Result Header", "HORIZONTAL");
  head.resize(760, 48);
  head.primaryAxisSizingMode = "FIXED";
  head.primaryAxisAlignItems = "SPACE_BETWEEN";
  head.counterAxisAlignItems = "MIN";
  const copy = frame("Header Copy");
  copy.appendChild(await text("已生成社媒内容建议", 16, 24, T.color.foreground, "Bold"));
  copy.appendChild(await text("Wendy 已整理本次发布的目标、素材来源、平台适配和生成消耗。", 12, 18, T.color.muted));
  head.appendChild(copy);
  head.appendChild(await chip("含 AI 海报生成时预计消耗 18 点"));
  s.appendChild(head);
  const grid = frame("Component/Grid / Result Brief x6", "HORIZONTAL");
  grid.itemSpacing = 10;
  for (const label of ["发布意图", "目标平台", "素材来源", "素材用途", "产品对象与事实", "风格"]) {
    grid.appendChild(await summaryMini(label));
  }
  s.appendChild(grid);
  const platform = frame("Component/Grid / Platform Summary x3", "HORIZONTAL");
  platform.itemSpacing = 10;
  for (const label of ["LinkedIn", "Instagram", "TikTok"]) platform.appendChild(await summaryMini(label));
  s.appendChild(platform);
  s.appendChild(await text("预计动作：每个平台将创建 1 个平台发布项，包含 1 张海报和 1 套平台文案。\n消耗提示：AI 自行生成海报会产生生成消耗；直接发布已有图片不产生海报生成消耗。", 12, 18, T.color.muted));
  return s;
}

async function summaryMini(label: string): Promise<FrameNode> {
  const c = frame(`Component/Card/Summary / ${label}`);
  c.resize(120, 136);
  c.primaryAxisSizingMode = "FIXED";
  c.counterAxisSizingMode = "FIXED";
  c.fills = [solid(T.color.surface)];
  c.strokes = [solid("#eeeeF2")];
  c.cornerRadius = 10;
  c.itemSpacing = 10;
  pad(c, 12);
  c.appendChild(await chip(label));
  c.appendChild(await text(label.includes("LinkedIn") ? "专业可信" : "完成一组面向海外买家的新品社媒发布", 14, 20, T.color.foreground, "Bold"));
  c.appendChild(await text("清晰产品主视觉、克制卖点表达和明确行动入口。", 12, 18, T.color.muted));
  return c;
}

async function postPreviews(): Promise<FrameNode> {
  const s = frame("Section/Post Previews");
  s.resize(800, 100);
  s.primaryAxisSizingMode = "FIXED";
  s.itemSpacing = 18;
  const heading = await card("Preview Heading");
  heading.resize(800, 82);
  heading.primaryAxisSizingMode = "FIXED";
  heading.layoutMode = "HORIZONTAL";
  heading.primaryAxisAlignItems = "SPACE_BETWEEN";
  heading.counterAxisAlignItems = "CENTER";
  const copy = frame("Preview Heading Copy");
  copy.appendChild(await text("Post 预览", 18, 26, T.color.foreground, "Bold"));
  copy.appendChild(await text("确认生成后，Wendy 已按不同社媒格式拆分出可编辑预览。", 13, 20, T.color.muted));
  heading.appendChild(copy);
  heading.appendChild(await chip("将消耗 18 点"));
  s.appendChild(heading);
  for (const p of [
    ["LinkedIn", "@OntoZ Power", "Product testing", T.color.linkedin],
    ["Instagram", "@ontoz_power", "Carousel 1/4", T.color.instagram],
    ["TikTok", "@ontoz_power", "15s video", T.color.tiktok],
  ] as const) {
    s.appendChild(await postPreviewCard(p[0], p[1], p[2], p[3]));
  }
  return s;
}

async function postPreviewCard(platform: string, account: string, media: string, color: string): Promise<FrameNode> {
  const c = await card(`${platform} Post Preview`);
  c.name = `Component/Card/Post Preview / ${platform}`;
  c.resize(800, 430);
  c.primaryAxisSizingMode = "FIXED";
  c.itemSpacing = 0;
  pad(c, 0);
  const top = frame("Preview Top", "HORIZONTAL");
  top.resize(800, 82);
  top.primaryAxisSizingMode = "FIXED";
  top.primaryAxisAlignItems = "SPACE_BETWEEN";
  top.counterAxisAlignItems = "CENTER";
  pad(top, 18, 24);
  top.appendChild(await text(`${account}\n${platform}`, 15, 20, "#111827", "Bold"));
  top.appendChild(await button("Publish on 2026/07/09", "secondary"));
  const body = frame("Preview Body", "HORIZONTAL");
  body.resize(800, 270);
  body.primaryAxisSizingMode = "FIXED";
  body.itemSpacing = 36;
  pad(body, 28, 24, 34);
  const visual = frame(`Media / ${media}`);
  visual.resize(250, 280);
  visual.counterAxisSizingMode = "FIXED";
  visual.primaryAxisSizingMode = "FIXED";
  visual.primaryAxisAlignItems = "MAX";
  visual.cornerRadius = 0;
  visual.fills = [solid(color)];
  pad(visual, 18);
  visual.appendChild(await text(media, 18, 24, T.color.white, "Bold"));
  const caption = frame("Component/Input / Caption Card");
  caption.resize(458, 280);
  caption.primaryAxisSizingMode = "FIXED";
  caption.counterAxisSizingMode = "FIXED";
  caption.itemSpacing = 8;
  caption.cornerRadius = 6;
  caption.fills = [solid(T.color.white)];
  caption.strokes = [solid(T.color.borderControl)];
  pad(caption, 16);
  caption.appendChild(await text("Post Caption", 14, 20, "#6b7280", "Bold"));
  caption.appendChild(await text("面向欧洲储能安装商的新一代并网组件已经完成批量测试。我们把认证资料、交付排期和售后响应流程整理成一页资料，帮助项目团队更快完成供应商评估。", 18, 26, "#111827"));
  body.appendChild(visual);
  body.appendChild(caption);
  const actions = frame("Preview Actions", "HORIZONTAL");
  actions.resize(800, 78);
  actions.primaryAxisSizingMode = "FIXED";
  actions.primaryAxisAlignItems = "MAX";
  actions.counterAxisAlignItems = "CENTER";
  actions.itemSpacing = 12;
  pad(actions, 18, 24);
  actions.appendChild(await button("保存草稿", "secondary"));
  actions.appendChild(await button("排期发布", "primary"));
  c.appendChild(top);
  c.appendChild(body);
  c.appendChild(actions);
  return c;
}

async function buildComponentsPage(): Promise<FrameNode> {
  const root = frame("99 Component Annotations");
  root.resize(560, 760);
  root.primaryAxisSizingMode = "FIXED";
  root.fills = [solid(T.color.white)];
  root.cornerRadius = 16;
  root.strokes = [solid(T.color.border)];
  root.itemSpacing = 18;
  pad(root, 24);
  root.appendChild(await text("Local Component Map", 24, 32, T.color.heading, "Bold"));
  root.appendChild(await button("Primary Button", "primary"));
  root.appendChild(await button("Secondary Button", "secondary"));
  root.appendChild(await button("Ghost Button", "ghost"));
  root.appendChild(await button("Pill Button", "pill"));
  root.appendChild(await eventCard("Calendar Event", T.color.eventBlueBg, T.color.eventBlueText));
  root.appendChild(await accountCard());
  return root;
}

async function main() {
  await Promise.all([loadFont("Regular"), loadFont("Medium"), loadFont("Bold")]);
  const page = figma.createPage();
  page.name = "社媒运营 Wendy";
  figma.currentPage = page;

  const tokens = await buildTokens(0);
  page.appendChild(tokens);

  const mainFrame = frame("Wendy 社媒运营 / Desktop 1440");
  mainFrame.x = 420;
  mainFrame.y = 0;
  mainFrame.resize(1200, 1850);
  mainFrame.primaryAxisSizingMode = "FIXED";
  mainFrame.counterAxisSizingMode = "FIXED";
  mainFrame.fills = [solid(T.color.page)];
  mainFrame.itemSpacing = 20;
  pad(mainFrame, 24, 32, 184);
  mainFrame.appendChild(await buildHero());
  mainFrame.appendChild(await buildCalendar());
  mainFrame.appendChild(await buildComposer());
  mainFrame.appendChild(await buildPublisherModal());
  page.appendChild(mainFrame);

  const agent = await buildAgentPage();
  agent.x = 1680;
  agent.y = 0;
  page.appendChild(agent);

  const components = await buildComponentsPage();
  components.x = 2920;
  components.y = 0;
  page.appendChild(components);

  figma.viewport.scrollAndZoomIntoView([mainFrame, agent, tokens, components]);
  figma.closePlugin("已生成 Wendy 社媒运营 Figma 结构、Token 与组件标注。");
}

main().catch((error) => {
  figma.closePlugin(`生成失败：${error instanceof Error ? error.message : String(error)}`);
});
