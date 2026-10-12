# Wendy 快速发布弹窗

快速发布、内容管理中的主动发布、LinkedIn 工作区的开始创作均在当前页面打开原生 dialog。关闭、取消、保存草稿与发布不改变路由。旧 `#wendy/quick` 链接兼容为首页上方的弹窗。

## 交互

- 居中 1120 × 800 弹窗；左侧编辑、右侧预览；头部和底部固定、内容独立滚动。手机使用单列内容。
- LinkedIn、Instagram、TikTok、YouTube 多选，选中平台可切换预览。复用统一收件箱演示账号；发布前校验已连接账号及视频/图片要求。
- 立即/定时发布，使用所选日期与时间（上海时间 UTC+8），拒绝过去时间。按平台生成独立记录。
- 文案、素材、平台与时间在 `quickPublisher` 字段持久化，取消或刷新后可恢复。保存草稿按发布组续编，避免重复记录。
- 支持知识库三张既有素材、本地文件选择与拖入，最多四张图片或一个视频。支持 JPG、PNG、WebP、MP4、WebM；浏览器本地演示上传总量限制为 2 MB。保存失败保留编辑内容，不产生成功提示。
- 原生模态隔离、Tab 循环、Esc/关闭/取消及关闭后回焦；用户文案与文件名转义。

## 设计依据

- [快速发布](https://www.figma.com/design/tCIZ3gUBM6T5GtLzFzCZwt?node-id=146-1492)
- [上传选择](https://www.figma.com/design/tCIZ3gUBM6T5GtLzFzCZwt?node-id=202-1735)
- [定时发布](https://www.figma.com/design/tCIZ3gUBM6T5GtLzFzCZwt?node-id=201-1160)
- 已读取组件库 [Buttons](https://www.figma.com/design/oPNMfPosKibiZoqjOLh92h?node-id=73-3681)、[Input](https://www.figma.com/design/oPNMfPosKibiZoqjOLh92h?node-id=3672-39)、[Dialog](https://www.figma.com/design/oPNMfPosKibiZoqjOLh92h?node-id=3801-465)。按用户指定业务稿保留黑色发布按钮、18px圆角和双栏结构，字体、颜色、焦点与阴影复用项目 token。
- 22 个静态 SVG 下载在 `assets/wendy-publisher/`，保留原始尺寸；TikTok 的原图为 48px，通过 16px 容器等比缩放。预览头像、文案、图片使用项目真实演示数据与用户素材，未使用设计截图或 Panda 示例作为界面图片。

## 演示边界

发布只更新本地演示记录，不发送到真实社媒；AI 润色执行保留原文的空白与段落整理，并通过提示说明为演示润色。真实发布、上传存储与 AI 润色需要服务端接入。

## 验证

`scripts/test-wendy-publisher.cjs` 覆盖不跳转、原页面DOM与关闭回焦、草稿恢复/续编/去重、文案转义、多平台定时、文件上传/移除/类型与大小校验、视频要求、存储失败回滚、Tab循环、旧入口、320至1920宽度及所有图标渲染尺寸。既有首页与日历测试用于关联回归。独立导出脚本已包含新样式与图标。
