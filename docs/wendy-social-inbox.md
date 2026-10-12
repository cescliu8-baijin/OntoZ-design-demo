# Wendy 评论与线索统一收件箱

入口：`#wendy/fans`。首页评论 `#wendy/fans/hc*` 与旧 `#wendy/inbox/c*` 深链进入同一会话界面。

- 账号管理：LinkedIn、Instagram、Facebook、TikTok、YouTube 演示账号；添加、去重、断开与重连。断开后隐藏互动并阻止回复，保留历史数据。
- 消息筛选：账号、评论/私信/提及/评价、未读/已读、关键词、互动标签、处理状态组合筛选。
- 会话按接收账号与平台用户标识归并，保留不同消息类型和上下文，不凭姓名跨平台误合并。
- 每条互动有独立回复目标、公开/私信标识、草稿和标签。发送结果记录原消息 ID；回复正文转义。
- AI Assistant：语气、语言、回复要求、多选品牌知识、可编辑建议，使用建议后须人工点击发送。
- 标签可添加、移除、新建；支持标记未读、完成与重新打开。
- 沿用询盘消息的三栏结构、浅灰消息区、头像和气泡；窄屏切换列表/会话，资料浮层保留。

## 演示边界

本项目为本地原型。账号连接、刷新与发送均为本地演示，不进行 OAuth 或真实社媒 API 请求。AI 建议使用本地场景模板与示例知识资料，并非真实大模型生成；语气、语言、简短及演示邀请要求可演示，其余自由文本要求需人工核对。真实集成须接入各平台授权与能力校验、消息同步/回复适配器和服务端模型接口。

收件箱数据在现有 Wendy 浏览器存储的 `socialInbox` 字段持久化。首次进入迁移已有演示评论、会话和草稿；与原发布日历及创作数据共存。

## 设计依据

已通过 Figma 插件读取 [Buttons](https://www.figma.com/design/oPNMfPosKibiZoqjOLh92h?node-id=73-3681)、[Input](https://www.figma.com/design/oPNMfPosKibiZoqjOLh92h?node-id=3672-39)、[Dialog](https://www.figma.com/design/oPNMfPosKibiZoqjOLh92h?node-id=3801-465)、[Tag](https://www.figma.com/design/oPNMfPosKibiZoqjOLh92h?node-id=3194-1126)。采用项目共享颜色、字体、阴影变量。参考 [Vista Social AI Assistant](https://support.vistasocial.com/hc/en-us/articles/11761321250331-How-to-reply-to-messages-and-comments-with-AI-Assistant) 的建议回复交互，不包含自动化工作流。

## 验证

`scripts/test-wendy-inbox.cjs` 覆盖四类互动、组合筛选、无结果状态、历史、逐条草稿、回复归属、转义、标签、AI 人工发送边界、持久化、账号去重与重连、旧链接、弹窗焦点、320/390/768/1024/1280/1440/1920 响应式及资源/控制台检查。`scripts/test-wendy-home.cjs` 已更新评论入口断言。独立导出使用 `scripts/build-wendy-standalone.mjs`。
