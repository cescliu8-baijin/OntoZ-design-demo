# 新设备恢复记录 · 2026-09-29

## 基线与数据保全

项目目录：`/Users/zhangxinyi/Documents/OntoZ`。开始时为 `main`，HEAD 为 `b4dae292`，含 15 个修改文件和 13 个未跟踪文件。原有 John 0.4.1、Lucas 动画、竞对分析等未提交工作全部保留；未切换分支、合并远端、清理 stash 或推送。

恢复备份位于：
`/Users/zhangxinyi/.codex/.chatgpt-projects/g-p-6ab3937ec28c8191980441acde5ac86a/recovery/20260929-224802/`

- `working-tree.patch`：相对 HEAD 的二进制兼容差异。
- `untracked.tar.gz`：当时未跟踪的文件，以及存在时的上传素材。
- `lucas-state.sqlite3`：通过 SQLite backup API 保存的一致性备份。
- `status.txt`、`refs.txt`、`stash.txt`：恢复前 Git 状态。

备份不包含完整 Git 对象库；它与现有仓库配套使用，不应单独当作完整仓库备份。历史分支和两个 stash 留在原仓库中。

恢复验收使用独立临时数据库；验收结束后对比原数据库与备份的 state 内容完全一致。原有发布版、8 个版本与 1 条询盘保留。浏览器 localStorage 无法从代码目录恢复。

## 本次修改

1. 补充共享 `.sr-only` 无障碍样式。原来 Wendy 的隐藏标签占据视觉布局，使 390×500 短屏内的发送按钮底部到达 504px；修复后标签仍保留可访问名称，按钮可完整操作。
2. Lucas 浏览器测试等待确认页实际渲染，再检查返回修改按钮；全局布局测试等待导航断点同步及两帧布局，消除固定延时造成的时序失败。
3. 新增 `scripts/run-local-checks.py`，统一运行后端与可选浏览器回归，自动管理独立服务和临时数据库，失败返回非零状态。
4. 本地服务在成功绑定端口后才输出就绪地址，支持正确显示随机端口，并在 Ctrl+C 时正常关闭。
5. 新增 macOS 双击启动入口 `scripts/start-local.command`，无需 Node 即可启动完整本地 Demo。
6. 更新 README 的技术栈、当前路由、运行方式、数据迁移边界和测试入口；修正 Lucas 草稿预览仍可提交测试询盘的旧说明；补充 npm 测试与 Lucas 构建命令。
7. 从唯一源码重新生成 `public/site/` 和四种独立导出，未手动维护部署镜像。

## 新设备验收结果

- Python 后端：发布 3 项、竞对分析 6 项，全部通过。
- JavaScript：业务脚本与构建/测试脚本语法检查通过。
- Lucas：完整建站、失败重试、发布校验、版本恢复、询盘幂等和响应式回归通过。
- John：完整投放、刷新恢复、预算审批、报告与广告管理、14 种宽度通过。
- 询盘：13 组消息、媒体、群组、账号隔离与响应式检查通过。
- Wendy：首页与响应式两组回归通过，短屏发送按钮、跨断点草稿和同一 DOM 保留通过。
- 全局：19 个路由 × 12 种宽度、导航、资源与字体规则通过。
- 离线产物：Wendy、询盘、Lucas 动画三个单文件均可离线加载，无页面脚本异常。
- Lucas ZIP：压缩包完整性、Python 语法、竞对模块包含性通过。
- `git diff --check` 通过；部署镜像与核对的入口、竞对脚本、基础样式一致。

运行环境使用本机 Python 3.9.6、Chrome，以及 Codex 自带 Node 24.19.0 和 Playwright。当前终端 PATH 未全局安装 Node/npm；双击启动不依赖它们，统一回归脚本支持自动发现本机 Codex 运行时。其他设备可安装 Node >=22.13，并用 `NODE_BINARY` / `PLAYWRIGHT_MODULE` 指定工具。

## 依赖与托管构建

已使用原 `package-lock.json` 重新安装 202 个包，原 Intel 依赖替换为 Apple 芯片的 esbuild、rolldown、workerd 等二进制。官方 npm 源下载缓慢，本次安装临时使用 `registry.npmmirror.com` 并保留锁文件完整性校验；没有修改项目默认源配置、依赖版本或锁文件。安装使用 `--ignore-scripts`，随后直接验证了实际构建。

2026-09-29 本机 `vinext build` 五个构建阶段全部成功。构建器提示根路由无法静态分类，这是 vinext 的分析提示，构建退出码为 0。没有进行线上部署。

## 后续边界

- 目前仍是 Demo。没有接入生产 AI、Google Ads、社媒发布、邮件/WhatsApp 发送或公网网站发布。
- 竞对后端测试使用受控 HTML 与网络模拟，不把它们当作真实外网可达性的保证。
- 保留三个远端及历史分支，尚未决定主远端、拉取或合并；后续协作前先确认仓库归属和需保留的分支成果。
- 托管外壳不包含 Python 服务，部署静态站不能自动获得 Lucas API。
