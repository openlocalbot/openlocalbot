<p align="center">
  <img src="docs/assets/openlocalbot-logo-text.png" alt="OpenLocalBot" width="400">
</p>

<h1 align="center">OpenLocalBot — 个人 AI 助手</h1>

<p align="center">
  <a href="README.md">🇺🇸 English</a> · <a href="README_zh-TW.md">🇹🇼 繁體中文</a> · <a href="README_ja.md">🇯🇵 日本語</a>
</p>

<p align="center">
  <a href="https://github.com/openlocalbot/openlocalbot/actions/workflows/ci.yml?branch=main"><img src="https://img.shields.io/github/actions/workflow/status/openlocalbot/openlocalbot/ci.yml?branch=main&style=for-the-badge" alt="CI 状态"></a>
  <a href="https://github.com/openlocalbot/openlocalbot/releases"><img src="https://img.shields.io/github/v/release/openlocalbot/openlocalbot?include_prereleases&style=for-the-badge" alt="GitHub 版本"></a>
  <a href="https://discord.gg/clawd"><img src="https://img.shields.io/discord/1456350064065904867?label=Discord&logo=discord&logoColor=white&color=5865F2&style=for-the-badge" alt="Discord"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="MIT 许可证"></a>
</p>

**OpenLocalBot** 是一个运行在您自己设备上的*个人 AI 助手*。
它可以在您常用的消息渠道（WhatsApp、Telegram、Slack、Discord、Google Chat、Signal、iMessage、Microsoft Teams、WebChat）上回复您，还支持扩展渠道如 BlueBubbles、Matrix、Zalo 和 Zalo Personal。它可以在 macOS/iOS/Android 上进行语音交互，并可以渲染您可控制的实时 Canvas。Gateway 只是控制平面——产品本身是助手。

如果您想要一个感觉本地化、快速且始终在线的个人单用户助手，这就是它。

[官网](https://openlocalbot.ai) · [文档](https://docs.openlocalbot.ai) · [DeepWiki](https://deepwiki.com/openlocalbot/openlocalbot) · [快速开始](https://docs.openlocalbot.ai/start/getting-started) · [更新指南](https://docs.openlocalbot.ai/install/updating) · [展示](https://docs.openlocalbot.ai/start/showcase) · [常见问题](https://docs.openlocalbot.ai/start/faq) · [配置向导](https://docs.openlocalbot.ai/start/wizard) · [Nix](https://github.com/openlocalbot/nix-clawdbot) · [Docker](https://docs.openlocalbot.ai/install/docker) · [Discord](https://discord.gg/clawd)

推荐配置方式：运行配置向导（`openlocalbot onboard`）。它会引导您完成网关、工作区、频道和技能的配置。CLI 向导是推荐路径，支持 **macOS、Linux 和 Windows（通过 WSL2；强烈推荐）**。

**新功能：Web 配置界面** - 如需图形化配置体验，使用 `openlocalbot onboard --web`。这将启动一个双语（English/中文）Web 界面，默认端口 9887。

支持 npm、pnpm 或 bun。
新安装？从这里开始：[快速开始](https://docs.openlocalbot.ai/start/getting-started)

**订阅 (OAuth):**

- **[Anthropic](https://www.anthropic.com/)** (Claude Pro/Max)
- **[OpenAI](https://openai.com/)** (ChatGPT/Codex)

**API 密钥提供商:**

- **[DeepSeek](https://platform.deepseek.com/)** — DeepSeek V3.2 官方 API（Chat + Reasoner 模式）
- **[Groq](https://console.groq.com/)** — 超快推理（Llama 4、Kimi K2、Qwen 3、GPT-OSS）
- **[OpenCode Zen](https://opencode.ai/)** — 多模型代理（Claude、GPT、Gemini、GLM、Kimi）
- **[硅基流动 SiliconFlow](https://cloud.siliconflow.cn/)** — DeepSeek、GLM、Qwen、Llama
- **[NVIDIA NIM](https://build.nvidia.com/)** — Llama、DeepSeek、Qwen、Mistral

模型说明：虽然支持任何模型，但我强烈推荐 **Anthropic Pro/Max (100/200) + Opus 4.5**，因为它具有更强的长上下文能力和更好的提示注入防护。参见 [配置指南](https://docs.openlocalbot.ai/start/onboarding)。

## 模型（选择 + 认证）

- 模型配置 + CLI：[模型](https://docs.openlocalbot.ai/concepts/models)
- 认证配置轮换（OAuth vs API 密钥）+ 故障转移：[模型故障转移](https://docs.openlocalbot.ai/concepts/model-failover)

## 安装（推荐方式）

运行环境：**Node ≥22**

```bash
npm install -g openlocalbot@latest
# 或者: pnpm add -g openlocalbot@latest

openlocalbot onboard --install-daemon
```

向导会安装 Gateway 守护进程（launchd/systemd 用户服务），使其保持运行。

### Web 配置界面（可选）

如需图形化配置体验，支持中英文双语：

```bash
openlocalbot onboard --web
# 或指定自定义端口：
openlocalbot onboard --web --web-port 9887
```

这将在 `http://127.0.0.1:9887` 启动一个现代化 Web 界面，引导您完成：

- 模型提供商选择（Anthropic、OpenAI、Google、硅基流动、OpenCode Zen、DeepSeek、Groq 等）
- API 密钥配置
- 网关设置
- 频道配置

Web 界面会自动在浏览器中打开。所有配置都保存在本地。

## 快速开始

运行环境：**Node ≥22**

完整新手指南（认证、配对、频道）：[快速开始](https://docs.openlocalbot.ai/start/getting-started)

```bash
openlocalbot onboard --install-daemon

openlocalbot gateway --port 18789 --verbose

# 发送消息
openlocalbot message send --to +1234567890 --message "来自 OpenLocalBot 的问候"

# 与助手对话（可选择将回复发送到任何已连接的频道：WhatsApp/Telegram/Slack/Discord/Google Chat/Signal/iMessage/BlueBubbles/Microsoft Teams/Matrix/Zalo/Zalo Personal/WebChat）
openlocalbot agent --message "待办事项清单" --thinking high
```

升级？[更新指南](https://docs.openlocalbot.ai/install/updating)（并运行 `openlocalbot doctor`）。

## 开发渠道

- **stable**：标签发布（`vYYYY.M.D` 或 `vYYYY.M.D-<patch>`），npm dist-tag `latest`。
- **beta**：预发布标签（`vYYYY.M.D-beta.N`），npm dist-tag `beta`（macOS 应用可能缺失）。
- **dev**：`main` 分支的移动头，npm dist-tag `dev`（发布时）。

切换渠道（git + npm）：`openlocalbot update --channel stable|beta|dev`。
详情：[开发渠道](https://docs.openlocalbot.ai/install/development-channels)。

## 从源码构建（开发）

从源码构建推荐使用 `pnpm`。Bun 是可选的，用于直接运行 TypeScript。

```bash
git clone https://github.com/openlocalbot/openlocalbot.git
cd openlocalbot

pnpm install
pnpm ui:build # 首次运行时自动安装 UI 依赖
pnpm build

pnpm openlocalbot onboard --install-daemon

# 开发循环（TypeScript 变更时自动重载）
pnpm gateway:watch
```

注意：`pnpm openlocalbot ...` 直接运行 TypeScript（通过 `tsx`）。`pnpm build` 生成 `dist/` 用于通过 Node / 打包的 `openlocalbot` 二进制文件运行。

## 安全默认值（私信访问）

OpenLocalBot 连接到真实的消息平台。将入站私信视为**不受信任的输入**。

完整安全指南：[安全](https://docs.openlocalbot.ai/gateway/security)

在 Telegram/WhatsApp/Signal/iMessage/Microsoft Teams/Discord/Google Chat/Slack 上的默认行为：

- **私信配对**（`dmPolicy="pairing"` / `channels.discord.dm.policy="pairing"` / `channels.slack.dm.policy="pairing"`）：未知发送者会收到一个简短的配对码，机器人不会处理他们的消息。
- 批准命令：`openlocalbot pairing approve <channel> <code>`（然后发送者会被添加到本地白名单存储中）。
- 公开入站私信需要明确的选择加入：设置 `dmPolicy="open"` 并在频道白名单中包含 `"*"`（`allowFrom` / `channels.discord.dm.allowFrom` / `channels.slack.dm.allowFrom`）。

运行 `openlocalbot doctor` 以显示风险/配置错误的私信策略。

## 主要特性

- **[本地优先网关](https://docs.openlocalbot.ai/gateway)** — 用于会话、频道、工具和事件的单一控制平面。
- **[多频道收件箱](https://docs.openlocalbot.ai/channels)** — WhatsApp、Telegram、Slack、Discord、Google Chat、Signal、iMessage、BlueBubbles、Microsoft Teams、Matrix、Zalo、Zalo Personal、WebChat、macOS、iOS/Android。
- **[多代理路由](https://docs.openlocalbot.ai/gateway/configuration)** — 将入站频道/账户/对等方路由到隔离的代理（工作区 + 每个代理的会话）。
- **[语音唤醒](https://docs.openlocalbot.ai/nodes/voicewake) + [对话模式](https://docs.openlocalbot.ai/nodes/talk)** — macOS/iOS/Android 上的始终在线语音，使用 ElevenLabs。
- **[实时 Canvas](https://docs.openlocalbot.ai/platforms/mac/canvas)** — 代理驱动的可视化工作区，带有 [A2UI](https://docs.openlocalbot.ai/platforms/mac/canvas#canvas-a2ui)。
- **[一流的工具](https://docs.openlocalbot.ai/tools)** — 浏览器、canvas、节点、定时任务、会话和 Discord/Slack 操作。
- **[伴侣应用](https://docs.openlocalbot.ai/platforms/macos)** — macOS 菜单栏应用 + iOS/Android [节点](https://docs.openlocalbot.ai/nodes)。
- **[配置向导](https://docs.openlocalbot.ai/start/wizard) + [技能](https://docs.openlocalbot.ai/tools/skills)** — 向导驱动的配置，带有内置/托管/工作区技能。

## Star 历史

[![Star History Chart](https://api.star-history.com/svg?repos=openlocalbot/openlocalbot&type=date&legend=top-left)](https://www.star-history.com/#openlocalbot/openlocalbot&type=date&legend=top-left)

## 我们构建的全部功能

### 核心平台

- [Gateway WS 控制平面](https://docs.openlocalbot.ai/gateway) 包含会话、在线状态、配置、定时任务、webhooks、[控制界面](https://docs.openlocalbot.ai/web) 和 [Canvas 主机](https://docs.openlocalbot.ai/platforms/mac/canvas#canvas-a2ui)。
- [CLI 界面](https://docs.openlocalbot.ai/tools/agent-send)：gateway、agent、send、[向导](https://docs.openlocalbot.ai/start/wizard) 和 [doctor](https://docs.openlocalbot.ai/gateway/doctor)。
- [Pi 代理运行时](https://docs.openlocalbot.ai/concepts/agent) 支持 RPC 模式，带有工具流和块流。
- [会话模型](https://docs.openlocalbot.ai/concepts/session)：`main` 用于直接聊天，群组隔离，激活模式，队列模式，回复返回。群组规则：[群组](https://docs.openlocalbot.ai/concepts/groups)。
- [媒体管道](https://docs.openlocalbot.ai/nodes/images)：图片/音频/视频，转录钩子，大小限制，临时文件生命周期。音频详情：[音频](https://docs.openlocalbot.ai/nodes/audio)。

### 频道

- [频道](https://docs.openlocalbot.ai/channels)：[WhatsApp](https://docs.openlocalbot.ai/channels/whatsapp) (Baileys)、[Telegram](https://docs.openlocalbot.ai/channels/telegram) (grammY)、[Slack](https://docs.openlocalbot.ai/channels/slack) (Bolt)、[Discord](https://docs.openlocalbot.ai/channels/discord) (discord.js)、[Google Chat](https://docs.openlocalbot.ai/channels/googlechat) (Chat API)、[Signal](https://docs.openlocalbot.ai/channels/signal) (signal-cli)、[iMessage](https://docs.openlocalbot.ai/channels/imessage) (imsg)、[BlueBubbles](https://docs.openlocalbot.ai/channels/bluebubbles) (扩展)、[Microsoft Teams](https://docs.openlocalbot.ai/channels/msteams) (扩展)、[Matrix](https://docs.openlocalbot.ai/channels/matrix) (扩展)、[Zalo](https://docs.openlocalbot.ai/channels/zalo) (扩展)、[Zalo Personal](https://docs.openlocalbot.ai/channels/zalouser) (扩展)、[WebChat](https://docs.openlocalbot.ai/web/webchat)。
- [群组路由](https://docs.openlocalbot.ai/concepts/group-messages)：提及门控，回复标签，每个频道的分块和路由。频道规则：[频道](https://docs.openlocalbot.ai/channels)。

### 应用 + 节点

- [macOS 应用](https://docs.openlocalbot.ai/platforms/macos)：菜单栏控制平面，[语音唤醒](https://docs.openlocalbot.ai/nodes/voicewake)/PTT，[对话模式](https://docs.openlocalbot.ai/nodes/talk) 覆盖层，[WebChat](https://docs.openlocalbot.ai/web/webchat)，调试工具，[远程网关](https://docs.openlocalbot.ai/gateway/remote) 控制。
- [iOS 节点](https://docs.openlocalbot.ai/platforms/ios)：[Canvas](https://docs.openlocalbot.ai/platforms/mac/canvas)，[语音唤醒](https://docs.openlocalbot.ai/nodes/voicewake)，[对话模式](https://docs.openlocalbot.ai/nodes/talk)，相机，屏幕录制，Bonjour 配对。
- [Android 节点](https://docs.openlocalbot.ai/platforms/android)：[Canvas](https://docs.openlocalbot.ai/platforms/mac/canvas)，[对话模式](https://docs.openlocalbot.ai/nodes/talk)，相机，屏幕录制，可选短信。
- [macOS 节点模式](https://docs.openlocalbot.ai/nodes)：system.run/notify + canvas/camera 暴露。

### 工具 + 自动化

- [浏览器控制](https://docs.openlocalbot.ai/tools/browser)：专用 openlocalbot Chrome/Chromium，快照，操作，上传，配置文件。
- [Canvas](https://docs.openlocalbot.ai/platforms/mac/canvas)：[A2UI](https://docs.openlocalbot.ai/platforms/mac/canvas#canvas-a2ui) 推送/重置，eval，快照。
- [节点](https://docs.openlocalbot.ai/nodes)：相机拍照/录像，屏幕录制，[location.get](https://docs.openlocalbot.ai/nodes/location-command)，通知。
- [定时任务 + 唤醒](https://docs.openlocalbot.ai/automation/cron-jobs)；[webhooks](https://docs.openlocalbot.ai/automation/webhook)；[Gmail Pub/Sub](https://docs.openlocalbot.ai/automation/gmail-pubsub)。
- [技能平台](https://docs.openlocalbot.ai/tools/skills)：内置、托管和工作区技能，带有安装门控 + UI。

### 运行时 + 安全

- [频道路由](https://docs.openlocalbot.ai/concepts/channel-routing)，[重试策略](https://docs.openlocalbot.ai/concepts/retry) 和 [流式/分块](https://docs.openlocalbot.ai/concepts/streaming)。
- [在线状态](https://docs.openlocalbot.ai/concepts/presence)，[输入指示器](https://docs.openlocalbot.ai/concepts/typing-indicators) 和 [使用量跟踪](https://docs.openlocalbot.ai/concepts/usage-tracking)。
- [模型](https://docs.openlocalbot.ai/concepts/models)，[模型故障转移](https://docs.openlocalbot.ai/concepts/model-failover) 和 [会话修剪](https://docs.openlocalbot.ai/concepts/session-pruning)。
- [安全](https://docs.openlocalbot.ai/gateway/security) 和 [故障排除](https://docs.openlocalbot.ai/channels/troubleshooting)。

### 运维 + 打包

- [控制界面](https://docs.openlocalbot.ai/web) + [WebChat](https://docs.openlocalbot.ai/web/webchat) 直接从 Gateway 提供。
- [Tailscale Serve/Funnel](https://docs.openlocalbot.ai/gateway/tailscale) 或 [SSH 隧道](https://docs.openlocalbot.ai/gateway/remote) 带有令牌/密码认证。
- [Nix 模式](https://docs.openlocalbot.ai/install/nix) 用于声明式配置；[Docker](https://docs.openlocalbot.ai/install/docker) 安装。
- [Doctor](https://docs.openlocalbot.ai/gateway/doctor) 迁移，[日志](https://docs.openlocalbot.ai/logging)。

## 支持的模型提供商

### 国际提供商

- **Anthropic** - Claude Opus 4.5、Sonnet 4.5、Haiku 4.5
- **OpenAI** - GPT-5.2、GPT-5.1、GPT-5、Codex 系列
- **Google** - Gemini 3 Pro、Gemini 3 Flash
- **OpenRouter** - 多模型聚合平台

### 国内提供商

- **硅基流动 (SiliconFlow)** - DeepSeek、GLM、Qwen、Llama 等
- **OpenCode Zen** - Claude、GPT、Gemini、GLM、Kimi 等
- **月之暗面 (Moonshot)** - Kimi K2、Kimi K2.5
- **智谱 (Z.AI)** - GLM-4.7、GLM-4.6
- **MiniMax** - MiniMax M2.1
- **通义千问 (Qwen)** - Qwen3 Coder

### 其他提供商

- **NVIDIA NIM** - 各种开源模型
- **Amazon Bedrock** - 多模型云服务
- **Azure OpenAI** - 企业级 OpenAI 服务

## 工作原理（简述）

```
WhatsApp / Telegram / Slack / Discord / Google Chat / Signal / iMessage / BlueBubbles / Microsoft Teams / Matrix / Zalo / Zalo Personal / WebChat
               │
               ▼
┌───────────────────────────────────┐
│             网关                   │
│          (控制平面)                │
│       ws://127.0.0.1:18789        │
└──────────────┬────────────────────┘
               │
               ├─ Pi 代理 (RPC)
               ├─ CLI (openlocalbot …)
               ├─ WebChat 界面
               ├─ macOS 应用
               └─ iOS / Android 节点
```

## 关键子系统

- **[Gateway WebSocket 网络](https://docs.openlocalbot.ai/concepts/architecture)** — 用于客户端、工具和事件的单一 WS 控制平面（运维：[Gateway 操作手册](https://docs.openlocalbot.ai/gateway)）。
- **[Tailscale 暴露](https://docs.openlocalbot.ai/gateway/tailscale)** — Gateway 仪表板 + WS 的 Serve/Funnel（远程访问：[远程](https://docs.openlocalbot.ai/gateway/remote)）。
- **[浏览器控制](https://docs.openlocalbot.ai/tools/browser)** — openlocalbot 托管的 Chrome/Chromium，带有 CDP 控制。
- **[Canvas + A2UI](https://docs.openlocalbot.ai/platforms/mac/canvas)** — 代理驱动的可视化工作区（A2UI 主机：[Canvas/A2UI](https://docs.openlocalbot.ai/platforms/mac/canvas#canvas-a2ui)）。
- **[语音唤醒](https://docs.openlocalbot.ai/nodes/voicewake) + [对话模式](https://docs.openlocalbot.ai/nodes/talk)** — 始终在线的语音和连续对话。
- **[节点](https://docs.openlocalbot.ai/nodes)** — Canvas、相机拍照/录像、屏幕录制、`location.get`、通知，以及仅 macOS 的 `system.run`/`system.notify`。

## Tailscale 访问（Gateway 仪表板）

OpenLocalBot 可以自动配置 Tailscale **Serve**（仅限 tailnet）或 **Funnel**（公开），同时 Gateway 保持绑定到回环地址。配置 `gateway.tailscale.mode`：

- `off`：无 Tailscale 自动化（默认）。
- `serve`：通过 `tailscale serve` 的仅限 tailnet 的 HTTPS（默认使用 Tailscale 身份头）。
- `funnel`：通过 `tailscale funnel` 的公开 HTTPS（需要共享密码认证）。

注意：

- 启用 Serve/Funnel 时 `gateway.bind` 必须保持 `loopback`（OpenLocalBot 强制执行）。
- Serve 可以通过设置 `gateway.auth.mode: "password"` 或 `gateway.auth.allowTailscale: false` 强制要求密码。
- 除非设置 `gateway.auth.mode: "password"`，否则 Funnel 拒绝启动。
- 可选：`gateway.tailscale.resetOnExit` 在关闭时撤销 Serve/Funnel。

详情：[Tailscale 指南](https://docs.openlocalbot.ai/gateway/tailscale) · [Web 界面](https://docs.openlocalbot.ai/web)

## 远程 Gateway（Linux 很棒）

在小型 Linux 实例上运行 Gateway 完全没问题。客户端（macOS 应用、CLI、WebChat）可以通过 **Tailscale Serve/Funnel** 或 **SSH 隧道** 连接，您仍然可以配对设备节点（macOS/iOS/Android）以在需要时执行设备本地操作。

- **Gateway 主机** 默认运行 exec 工具和频道连接。
- **设备节点** 通过 `node.invoke` 运行设备本地操作（`system.run`、相机、屏幕录制、通知）。
  简而言之：exec 在 Gateway 所在位置运行；设备操作在设备所在位置运行。

详情：[远程访问](https://docs.openlocalbot.ai/gateway/remote) · [节点](https://docs.openlocalbot.ai/nodes) · [安全](https://docs.openlocalbot.ai/gateway/security)

## 通过 Gateway 协议的 macOS 权限

macOS 应用可以在 **节点模式** 下运行，并通过 Gateway WebSocket 广播其功能 + 权限映射（`node.list` / `node.describe`）。客户端可以通过 `node.invoke` 执行本地操作：

- `system.run` 运行本地命令并返回 stdout/stderr/退出码；设置 `needsScreenRecording: true` 以要求屏幕录制权限（否则会得到 `PERMISSION_MISSING`）。
- `system.notify` 发布用户通知，如果通知被拒绝则失败。
- `canvas.*`、`camera.*`、`screen.record` 和 `location.get` 也通过 `node.invoke` 路由，并遵循 TCC 权限状态。

提升的 bash（主机权限）与 macOS TCC 分开：

- 使用 `/elevated on|off` 在启用 + 白名单时切换每个会话的提升访问权限。
- Gateway 通过 `sessions.patch`（WS 方法）持久化每个会话的切换，与 `thinkingLevel`、`verboseLevel`、`model`、`sendPolicy` 和 `groupActivation` 一起。

详情：[节点](https://docs.openlocalbot.ai/nodes) · [macOS 应用](https://docs.openlocalbot.ai/platforms/macos) · [Gateway 协议](https://docs.openlocalbot.ai/concepts/architecture)

## 代理到代理（sessions\_\* 工具）

- 使用这些工具在会话间协调工作，无需在聊天界面之间跳转。
- `sessions_list` — 发现活动会话（代理）及其元数据。
- `sessions_history` — 获取会话的记录日志。
- `sessions_send` — 向另一个会话发送消息；可选的回复返回乒乓 + 公告步骤（`REPLY_SKIP`、`ANNOUNCE_SKIP`）。

详情：[会话工具](https://docs.openlocalbot.ai/concepts/session-tool)

## 技能注册表（ClawHub）

ClawHub 是一个最小的技能注册表。启用 ClawHub 后，代理可以自动搜索技能并根据需要引入新技能。

[ClawHub](https://clawhub.com)

## 聊天命令

在 WhatsApp/Telegram/Slack/Google Chat/Microsoft Teams/WebChat 中发送这些命令（群组命令仅限群主）：

- `/status` — 简洁的会话状态（模型 + token 数，可用时显示费用）
- `/new` 或 `/reset` — 重置会话
- `/compact` — 压缩会话上下文（摘要）
- `/think <level>` — off|minimal|low|medium|high|xhigh（仅 GPT-5.2 + Codex 模型）
- `/verbose on|off`
- `/usage off|tokens|full` — 每次响应的使用量页脚
- `/restart` — 重启网关（群组中仅限群主）
- `/activation mention|always` — 群组激活切换（仅群组）

## 应用（可选）

Gateway 本身就能提供很好的体验。所有应用都是可选的，只是添加额外功能。

如果您计划构建/运行伴侣应用，请遵循以下平台操作手册。

### macOS (OpenLocalBot.app)（可选）

- Gateway 和健康状态的菜单栏控制。
- 语音唤醒 + 按键通话覆盖层。
- WebChat + 调试工具。
- 通过 SSH 的远程 gateway 控制。

注意：macOS 权限需要签名构建才能在重建后保持（参见 `docs/mac/permissions.md`）。

### iOS 节点（可选）

- 通过 Bridge 作为节点配对。
- 语音触发转发 + Canvas 界面。
- 通过 `openlocalbot nodes …` 控制。

操作手册：[iOS 连接](https://docs.openlocalbot.ai/platforms/ios)。

### Android 节点（可选）

- 通过与 iOS 相同的 Bridge + 配对流程配对。
- 暴露 Canvas、相机和屏幕捕获命令。
- 操作手册：[Android 连接](https://docs.openlocalbot.ai/platforms/android)。

## 代理工作区 + 技能

- 工作区根目录：`~/.openlocalbot/workspace`（可通过 `agents.defaults.workspace` 配置）。
- 注入的提示文件：`AGENTS.md`、`SOUL.md`、`TOOLS.md`。
- 技能：`~/.openlocalbot/workspace/skills/<skill>/SKILL.md`。

## 配置

最小配置 `~/.openlocalbot/openlocalbot.json`（模型 + 默认值）：

```json5
{
  agent: {
    model: "anthropic/claude-opus-4-5",
  },
}
```

使用国内提供商示例：

```json5
{
  agent: {
    model: "siliconflow/deepseek-ai-DeepSeek-V3.2",
  },
}
```

[完整配置参考（所有键 + 示例）](https://docs.openlocalbot.ai/gateway/configuration)

## 安全模型（重要）

- **默认：**工具在主机上为 **main** 会话运行，因此当只有您时，代理具有完全访问权限。
- **群组/频道安全：**设置 `agents.defaults.sandbox.mode: "non-main"` 以在每个会话的 Docker 沙箱中运行 **非 main 会话**（群组/频道）；然后 bash 会在 Docker 中为这些会话运行。
- **沙箱默认值：**白名单 `bash`、`process`、`read`、`write`、`edit`、`sessions_list`、`sessions_history`、`sessions_send`、`sessions_spawn`；黑名单 `browser`、`canvas`、`nodes`、`cron`、`discord`、`gateway`。

详情：[安全指南](https://docs.openlocalbot.ai/gateway/security) · [Docker + 沙箱](https://docs.openlocalbot.ai/install/docker) · [沙箱配置](https://docs.openlocalbot.ai/gateway/configuration)

## 频道配置

### [WhatsApp](https://docs.openlocalbot.ai/channels/whatsapp)

- 链接设备：`pnpm openlocalbot channels login`（凭证存储在 `~/.openlocalbot/credentials`）。
- 通过 `channels.whatsapp.allowFrom` 设置谁可以与助手交谈的白名单。
- 如果设置了 `channels.whatsapp.groups`，它就变成群组白名单；包含 `"*"` 以允许所有。

### [Telegram](https://docs.openlocalbot.ai/channels/telegram)

- 设置 `TELEGRAM_BOT_TOKEN` 或 `channels.telegram.botToken`（环境变量优先）。
- 可选：设置 `channels.telegram.groups`（带有 `channels.telegram.groups."*".requireMention`）；设置后，它是群组白名单（包含 `"*"` 以允许所有）。

```json5
{
  channels: {
    telegram: {
      botToken: "123456:ABCDEF",
    },
  },
}
```

### [Slack](https://docs.openlocalbot.ai/channels/slack)

- 设置 `SLACK_BOT_TOKEN` + `SLACK_APP_TOKEN`（或 `channels.slack.botToken` + `channels.slack.appToken`）。

### [Discord](https://docs.openlocalbot.ai/channels/discord)

- 设置 `DISCORD_BOT_TOKEN` 或 `channels.discord.token`（环境变量优先）。
- 可选：设置 `commands.native`、`commands.text` 或 `commands.useAccessGroups`，以及 `channels.discord.dm.allowFrom`、`channels.discord.guilds` 或 `channels.discord.mediaMaxMb`。

```json5
{
  channels: {
    discord: {
      token: "1234abcd",
    },
  },
}
```

### [Signal](https://docs.openlocalbot.ai/channels/signal)

- 需要 `signal-cli` 和 `channels.signal` 配置部分。

### [iMessage](https://docs.openlocalbot.ai/channels/imessage)

- 仅限 macOS；Messages 必须已登录。
- 如果设置了 `channels.imessage.groups`，它就变成群组白名单；包含 `"*"` 以允许所有。

### [Microsoft Teams](https://docs.openlocalbot.ai/channels/msteams)

- 配置 Teams 应用 + Bot Framework，然后添加 `msteams` 配置部分。
- 通过 `msteams.allowFrom` 设置谁可以交谈的白名单；群组访问通过 `msteams.groupAllowFrom` 或 `msteams.groupPolicy: "open"`。

### [WebChat](https://docs.openlocalbot.ai/web/webchat)

- 使用 Gateway WebSocket；无需单独的 WebChat 端口/配置。

浏览器控制（可选）：

```json5
{
  browser: {
    enabled: true,
    color: "#FF4500",
  },
}
```

## 文档

当您完成配置流程并需要更深入的参考时使用这些：

- [从文档索引开始导航和"什么在哪里"](https://docs.openlocalbot.ai)
- [阅读架构概述了解网关 + 协议模型](https://docs.openlocalbot.ai/concepts/architecture)
- [当您需要每个键和示例时使用完整配置参考](https://docs.openlocalbot.ai/gateway/configuration)
- [按手册运行网关与操作手册](https://docs.openlocalbot.ai/gateway)
- [了解控制 UI/Web 界面如何工作以及如何安全地暴露它们](https://docs.openlocalbot.ai/web)
- [了解通过 SSH 隧道或 tailnet 的远程访问](https://docs.openlocalbot.ai/gateway/remote)
- [跟随配置向导流程进行引导式设置](https://docs.openlocalbot.ai/start/wizard)
- [通过 webhook 界面连接外部触发器](https://docs.openlocalbot.ai/automation/webhook)
- [设置 Gmail Pub/Sub 触发器](https://docs.openlocalbot.ai/automation/gmail-pubsub)
- [了解 macOS 菜单栏伴侣详情](https://docs.openlocalbot.ai/platforms/mac/menu-bar)
- [平台指南：Windows (WSL2)](https://docs.openlocalbot.ai/platforms/windows)、[Linux](https://docs.openlocalbot.ai/platforms/linux)、[macOS](https://docs.openlocalbot.ai/platforms/macos)、[iOS](https://docs.openlocalbot.ai/platforms/ios)、[Android](https://docs.openlocalbot.ai/platforms/android)
- [使用故障排除指南调试常见问题](https://docs.openlocalbot.ai/channels/troubleshooting)
- [在暴露任何内容之前查看安全指南](https://docs.openlocalbot.ai/gateway/security)

## 高级文档（发现 + 控制）

- [发现 + 传输](https://docs.openlocalbot.ai/gateway/discovery)
- [Bonjour/mDNS](https://docs.openlocalbot.ai/gateway/bonjour)
- [Gateway 配对](https://docs.openlocalbot.ai/gateway/pairing)
- [远程 gateway README](https://docs.openlocalbot.ai/gateway/remote-gateway-readme)
- [控制界面](https://docs.openlocalbot.ai/web/control-ui)
- [仪表板](https://docs.openlocalbot.ai/web/dashboard)

## 运维与故障排除

- [健康检查](https://docs.openlocalbot.ai/gateway/health)
- [Gateway 锁](https://docs.openlocalbot.ai/gateway/gateway-lock)
- [后台进程](https://docs.openlocalbot.ai/gateway/background-process)
- [浏览器故障排除 (Linux)](https://docs.openlocalbot.ai/tools/browser-linux-troubleshooting)
- [日志](https://docs.openlocalbot.ai/logging)

## 深入探讨

- [代理循环](https://docs.openlocalbot.ai/concepts/agent-loop)
- [在线状态](https://docs.openlocalbot.ai/concepts/presence)
- [TypeBox 模式](https://docs.openlocalbot.ai/concepts/typebox)
- [RPC 适配器](https://docs.openlocalbot.ai/reference/rpc)
- [队列](https://docs.openlocalbot.ai/concepts/queue)

## 工作区与技能

- [技能配置](https://docs.openlocalbot.ai/tools/skills-config)
- [默认 AGENTS](https://docs.openlocalbot.ai/reference/AGENTS.default)
- [模板：AGENTS](https://docs.openlocalbot.ai/reference/templates/AGENTS)
- [模板：BOOTSTRAP](https://docs.openlocalbot.ai/reference/templates/BOOTSTRAP)
- [模板：IDENTITY](https://docs.openlocalbot.ai/reference/templates/IDENTITY)
- [模板：SOUL](https://docs.openlocalbot.ai/reference/templates/SOUL)
- [模板：TOOLS](https://docs.openlocalbot.ai/reference/templates/TOOLS)
- [模板：USER](https://docs.openlocalbot.ai/reference/templates/USER)

## 平台内部细节

- [macOS 开发设置](https://docs.openlocalbot.ai/platforms/mac/dev-setup)
- [macOS 菜单栏](https://docs.openlocalbot.ai/platforms/mac/menu-bar)
- [macOS 语音唤醒](https://docs.openlocalbot.ai/platforms/mac/voicewake)
- [iOS 节点](https://docs.openlocalbot.ai/platforms/ios)
- [Android 节点](https://docs.openlocalbot.ai/platforms/android)
- [Windows (WSL2)](https://docs.openlocalbot.ai/platforms/windows)
- [Linux 应用](https://docs.openlocalbot.ai/platforms/linux)

## 邮件钩子 (Gmail)

- [docs.openlocalbot.ai/gmail-pubsub](https://docs.openlocalbot.ai/automation/gmail-pubsub)

## 故障排除

### Windows 用户

强烈推荐使用 WSL2。原生 Windows 未经测试且问题更多。

如果网关服务安装失败（显示"拒绝访问"），您可以：

1. 以管理员身份运行配置向导
2. 或每次手动运行 `openlocalbot gateway run`

### 常见问题

1. **端口被占用** - 更改网关端口：`openlocalbot gateway --port 18790`
2. **API 密钥无效** - 重新运行 `openlocalbot onboard` 更新密钥
3. **模型不可用** - 检查您的订阅状态或切换到免费模型

## Molty

OpenLocalBot 是为 **Molty** 构建的，一个太空龙虾 AI 助手。🦞
由 Peter Steinberger 和社区开发。

- [openlocalbot.ai](https://openlocalbot.ai)
- [soul.md](https://soul.md)
- [steipete.me](https://steipete.me)
- [@openlocalbot](https://x.com/openlocalbot)

## 社区

参见 [CONTRIBUTING.md](CONTRIBUTING.md) 了解指南、维护者以及如何提交 PR。
欢迎 AI/vibe-coded PR！🤖

特别感谢 [Mario Zechner](https://mariozechner.at/) 的支持以及 [pi-mono](https://github.com/badlogic/pi-mono)。
特别感谢 Adam Doppelt 的 lobster.bot。

感谢所有 clawtributors：

<p align="left">
  <a href="https://github.com/steipete"><img src="https://avatars.githubusercontent.com/u/58493?v=4&s=48" width="48" height="48" alt="steipete" title="steipete"/></a> <a href="https://github.com/cpojer"><img src="https://avatars.githubusercontent.com/u/13352?v=4&s=48" width="48" height="48" alt="cpojer" title="cpojer"/></a> <a href="https://github.com/plum-dawg"><img src="https://avatars.githubusercontent.com/u/5909950?v=4&s=48" width="48" height="48" alt="plum-dawg" title="plum-dawg"/></a> <a href="https://github.com/bohdanpodvirnyi"><img src="https://avatars.githubusercontent.com/u/31819391?v=4&s=48" width="48" height="48" alt="bohdanpodvirnyi" title="bohdanpodvirnyi"/></a> <a href="https://github.com/iHildy"><img src="https://avatars.githubusercontent.com/u/25069719?v=4&s=48" width="48" height="48" alt="iHildy" title="iHildy"/></a> <a href="https://github.com/jaydenfyi"><img src="https://avatars.githubusercontent.com/u/213395523?v=4&s=48" width="48" height="48" alt="jaydenfyi" title="jaydenfyi"/></a> <a href="https://github.com/joaohlisboa"><img src="https://avatars.githubusercontent.com/u/8200873?v=4&s=48" width="48" height="48" alt="joaohlisboa" title="joaohlisboa"/></a> <a href="https://github.com/mneves75"><img src="https://avatars.githubusercontent.com/u/2423436?v=4&s=48" width="48" height="48" alt="mneves75" title="mneves75"/></a> <a href="https://github.com/MatthieuBizien"><img src="https://avatars.githubusercontent.com/u/173090?v=4&s=48" width="48" height="48" alt="MatthieuBizien" title="MatthieuBizien"/></a> <a href="https://github.com/MaudeBot"><img src="https://avatars.githubusercontent.com/u/255777700?v=4&s=48" width="48" height="48" alt="MaudeBot" title="MaudeBot"/></a>
  <a href="https://github.com/Glucksberg"><img src="https://avatars.githubusercontent.com/u/80581902?v=4&s=48" width="48" height="48" alt="Glucksberg" title="Glucksberg"/></a> <a href="https://github.com/rahthakor"><img src="https://avatars.githubusercontent.com/u/8470553?v=4&s=48" width="48" height="48" alt="rahthakor" title="rahthakor"/></a> <a href="https://github.com/vrknetha"><img src="https://avatars.githubusercontent.com/u/20596261?v=4&s=48" width="48" height="48" alt="vrknetha" title="vrknetha"/></a> <a href="https://github.com/radek-paclt"><img src="https://avatars.githubusercontent.com/u/50451445?v=4&s=48" width="48" height="48" alt="radek-paclt" title="radek-paclt"/></a> <a href="https://github.com/vignesh07"><img src="https://avatars.githubusercontent.com/u/1436853?v=4&s=48" width="48" height="48" alt="vignesh07" title="vignesh07"/></a> <a href="https://github.com/joshp123"><img src="https://avatars.githubusercontent.com/u/1497361?v=4&s=48" width="48" height="48" alt="joshp123" title="joshp123"/></a> <a href="https://github.com/tobiasbischoff"><img src="https://avatars.githubusercontent.com/u/711564?v=4&s=48" width="48" height="48" alt="Tobias Bischoff" title="Tobias Bischoff"/></a> <a href="https://github.com/czekaj"><img src="https://avatars.githubusercontent.com/u/1464539?v=4&s=48" width="48" height="48" alt="czekaj" title="czekaj"/></a> <a href="https://github.com/mukhtharcm"><img src="https://avatars.githubusercontent.com/u/56378562?v=4&s=48" width="48" height="48" alt="mukhtharcm" title="mukhtharcm"/></a> <a href="https://github.com/sebslight"><img src="https://avatars.githubusercontent.com/u/19554889?v=4&s=48" width="48" height="48" alt="sebslight" title="sebslight"/></a>
  <a href="https://github.com/maxsumrall"><img src="https://avatars.githubusercontent.com/u/628843?v=4&s=48" width="48" height="48" alt="maxsumrall" title="maxsumrall"/></a> <a href="https://github.com/xadenryan"><img src="https://avatars.githubusercontent.com/u/165437834?v=4&s=48" width="48" height="48" alt="xadenryan" title="xadenryan"/></a> <a href="https://github.com/rodrigouroz"><img src="https://avatars.githubusercontent.com/u/384037?v=4&s=48" width="48" height="48" alt="rodrigouroz" title="rodrigouroz"/></a> <a href="https://github.com/mbelinky"><img src="https://avatars.githubusercontent.com/u/132747814?v=4&s=48" width="48" height="48" alt="Mariano Belinky" title="Mariano Belinky"/></a> <a href="https://github.com/tyler6204"><img src="https://avatars.githubusercontent.com/u/64381258?v=4&s=48" width="48" height="48" alt="tyler6204" title="tyler6204"/></a> <a href="https://github.com/juanpablodlc"><img src="https://avatars.githubusercontent.com/u/92012363?v=4&s=48" width="48" height="48" alt="juanpablodlc" title="juanpablodlc"/></a> <a href="https://github.com/hsrvc"><img src="https://avatars.githubusercontent.com/u/129702169?v=4&s=48" width="48" height="48" alt="hsrvc" title="hsrvc"/></a> <a href="https://github.com/magimetal"><img src="https://avatars.githubusercontent.com/u/36491250?v=4&s=48" width="48" height="48" alt="magimetal" title="magimetal"/></a> <a href="https://github.com/zerone0x"><img src="https://avatars.githubusercontent.com/u/39543393?v=4&s=48" width="48" height="48" alt="zerone0x" title="zerone0x"/></a> <a href="https://github.com/meaningfool"><img src="https://avatars.githubusercontent.com/u/2862331?v=4&s=48" width="48" height="48" alt="meaningfool" title="meaningfool"/></a>
  <a href="https://github.com/patelhiren"><img src="https://avatars.githubusercontent.com/u/172098?v=4&s=48" width="48" height="48" alt="patelhiren" title="patelhiren"/></a> <a href="https://github.com/NicholasSpisak"><img src="https://avatars.githubusercontent.com/u/129075147?v=4&s=48" width="48" height="48" alt="NicholasSpisak" title="NicholasSpisak"/></a> <a href="https://github.com/jonisjongithub"><img src="https://avatars.githubusercontent.com/u/86072337?v=4&s=48" width="48" height="48" alt="jonisjongithub" title="jonisjongithub"/></a> <a href="https://github.com/AbhisekBasu1"><img src="https://avatars.githubusercontent.com/u/40645221?v=4&s=48" width="48" height="48" alt="abhisekbasu1" title="abhisekbasu1"/></a> <a href="https://github.com/jamesgroat"><img src="https://avatars.githubusercontent.com/u/2634024?v=4&s=48" width="48" height="48" alt="jamesgroat" title="jamesgroat"/></a> <a href="https://github.com/claude"><img src="https://avatars.githubusercontent.com/u/81847?v=4&s=48" width="48" height="48" alt="claude" title="claude"/></a> <a href="https://github.com/JustYannicc"><img src="https://avatars.githubusercontent.com/u/52761674?v=4&s=48" width="48" height="48" alt="JustYannicc" title="JustYannicc"/></a> <a href="https://github.com/SocialNerd42069"><img src="https://avatars.githubusercontent.com/u/118244303?v=4&s=48" width="48" height="48" alt="SocialNerd42069" title="SocialNerd42069"/></a> <a href="https://github.com/Hyaxia"><img src="https://avatars.githubusercontent.com/u/36747317?v=4&s=48" width="48" height="48" alt="Hyaxia" title="Hyaxia"/></a> <a href="https://github.com/dantelex"><img src="https://avatars.githubusercontent.com/u/631543?v=4&s=48" width="48" height="48" alt="dantelex" title="dantelex"/></a>
  <a href="https://github.com/daveonkels"><img src="https://avatars.githubusercontent.com/u/533642?v=4&s=48" width="48" height="48" alt="daveonkels" title="daveonkels"/></a> <a href="https://github.com/apps/google-labs-jules"><img src="https://avatars.githubusercontent.com/in/842251?v=4&s=48" width="48" height="48" alt="google-labs-jules[bot]" title="google-labs-jules[bot]"/></a> <a href="https://github.com/lc0rp"><img src="https://avatars.githubusercontent.com/u/2609441?v=4&s=48" width="48" height="48" alt="lc0rp" title="lc0rp"/></a> <a href="https://github.com/adam91holt"><img src="https://avatars.githubusercontent.com/u/9592417?v=4&s=48" width="48" height="48" alt="adam91holt" title="adam91holt"/></a> <a href="https://github.com/mousberg"><img src="https://avatars.githubusercontent.com/u/57605064?v=4&s=48" width="48" height="48" alt="mousberg" title="mousberg"/></a> <a href="https://github.com/hougangdev"><img src="https://avatars.githubusercontent.com/u/105773686?v=4&s=48" width="48" height="48" alt="hougangdev" title="hougangdev"/></a> <a href="https://github.com/gumadeiras"><img src="https://avatars.githubusercontent.com/u/5599352?v=4&s=48" width="48" height="48" alt="gumadeiras" title="gumadeiras"/></a> <a href="https://github.com/shakkernerd"><img src="https://avatars.githubusercontent.com/u/165377636?v=4&s=48" width="48" height="48" alt="shakkernerd" title="shakkernerd"/></a> <a href="https://github.com/mteam88"><img src="https://avatars.githubusercontent.com/u/84196639?v=4&s=48" width="48" height="48" alt="mteam88" title="mteam88"/></a> <a href="https://github.com/hirefrank"><img src="https://avatars.githubusercontent.com/u/183158?v=4&s=48" width="48" height="48" alt="hirefrank" title="hirefrank"/></a>
  <a href="https://github.com/joeynyc"><img src="https://avatars.githubusercontent.com/u/17919866?v=4&s=48" width="48" height="48" alt="joeynyc" title="joeynyc"/></a> <a href="https://github.com/orlyjamie"><img src="https://avatars.githubusercontent.com/u/6668807?v=4&s=48" width="48" height="48" alt="orlyjamie" title="orlyjamie"/></a> <a href="https://github.com/omniwired"><img src="https://avatars.githubusercontent.com/u/322761?v=4&s=48" width="48" height="48" alt="Eng. Juan Combetto" title="Eng. Juan Combetto"/></a> <a href="https://github.com/dbhurley"><img src="https://avatars.githubusercontent.com/u/5251425?v=4&s=48" width="48" height="48" alt="dbhurley" title="dbhurley"/></a> <a href="https://github.com/TSavo"><img src="https://avatars.githubusercontent.com/u/877990?v=4&s=48" width="48" height="48" alt="TSavo" title="TSavo"/></a> <a href="https://github.com/julianengel"><img src="https://avatars.githubusercontent.com/u/10634231?v=4&s=48" width="48" height="48" alt="julianengel" title="julianengel"/></a> <a href="https://github.com/bradleypriest"><img src="https://avatars.githubusercontent.com/u/167215?v=4&s=48" width="48" height="48" alt="bradleypriest" title="bradleypriest"/></a> <a href="https://github.com/benithors"><img src="https://avatars.githubusercontent.com/u/20652882?v=4&s=48" width="48" height="48" alt="benithors" title="benithors"/></a> <a href="https://github.com/rohannagpal"><img src="https://avatars.githubusercontent.com/u/4009239?v=4&s=48" width="48" height="48" alt="rohannagpal" title="rohannagpal"/></a> <a href="https://github.com/elliotsecops"><img src="https://avatars.githubusercontent.com/u/141947839?v=4&s=48" width="48" height="48" alt="elliotsecops" title="elliotsecops"/></a>
  <a href="https://github.com/timolins"><img src="https://avatars.githubusercontent.com/u/1440854?v=4&s=48" width="48" height="48" alt="timolins" title="timolins"/></a> <a href="https://github.com/benostein"><img src="https://avatars.githubusercontent.com/u/31802821?v=4&s=48" width="48" height="48" alt="benostein" title="benostein"/></a> <a href="https://github.com/f-trycua"><img src="https://avatars.githubusercontent.com/u/195596869?v=4&s=48" width="48" height="48" alt="f-trycua" title="f-trycua"/></a> <a href="https://github.com/Nachx639"><img src="https://avatars.githubusercontent.com/u/71144023?v=4&s=48" width="48" height="48" alt="nachx639" title="nachx639"/></a> <a href="https://github.com/pvoo"><img src="https://avatars.githubusercontent.com/u/20116814?v=4&s=48" width="48" height="48" alt="pvoo" title="pvoo"/></a> <a href="https://github.com/sreekaransrinath"><img src="https://avatars.githubusercontent.com/u/50989977?v=4&s=48" width="48" height="48" alt="sreekaransrinath" title="sreekaransrinath"/></a> <a href="https://github.com/gupsammy"><img src="https://avatars.githubusercontent.com/u/20296019?v=4&s=48" width="48" height="48" alt="gupsammy" title="gupsammy"/></a> <a href="https://github.com/cristip73"><img src="https://avatars.githubusercontent.com/u/24499421?v=4&s=48" width="48" height="48" alt="cristip73" title="cristip73"/></a> <a href="https://github.com/stefangalescu"><img src="https://avatars.githubusercontent.com/u/52995748?v=4&s=48" width="48" height="48" alt="stefangalescu" title="stefangalescu"/></a> <a href="https://github.com/nachoiacovino"><img src="https://avatars.githubusercontent.com/u/50103937?v=4&s=48" width="48" height="48" alt="nachoiacovino" title="nachoiacovino"/></a>
  <a href="https://github.com/vsabavat"><img src="https://avatars.githubusercontent.com/u/50385532?v=4&s=48" width="48" height="48" alt="Vasanth Rao Naik Sabavat" title="Vasanth Rao Naik Sabavat"/></a> <a href="https://github.com/petter-b"><img src="https://avatars.githubusercontent.com/u/62076402?v=4&s=48" width="48" height="48" alt="petter-b" title="petter-b"/></a> <a href="https://github.com/thewilloftheshadow"><img src="https://avatars.githubusercontent.com/u/35580099?v=4&s=48" width="48" height="48" alt="thewilloftheshadow" title="thewilloftheshadow"/></a> <a href="https://github.com/scald"><img src="https://avatars.githubusercontent.com/u/1215913?v=4&s=48" width="48" height="48" alt="scald" title="scald"/></a> <a href="https://github.com/andranik-sahakyan"><img src="https://avatars.githubusercontent.com/u/8908029?v=4&s=48" width="48" height="48" alt="andranik-sahakyan" title="andranik-sahakyan"/></a> <a href="https://github.com/davidguttman"><img src="https://avatars.githubusercontent.com/u/431696?v=4&s=48" width="48" height="48" alt="davidguttman" title="davidguttman"/></a> <a href="https://github.com/sleontenko"><img src="https://avatars.githubusercontent.com/u/7135949?v=4&s=48" width="48" height="48" alt="sleontenko" title="sleontenko"/></a> <a href="https://github.com/denysvitali"><img src="https://avatars.githubusercontent.com/u/4939519?v=4&s=48" width="48" height="48" alt="denysvitali" title="denysvitali"/></a> <a href="https://github.com/sircrumpet"><img src="https://avatars.githubusercontent.com/u/4436535?v=4&s=48" width="48" height="48" alt="sircrumpet" title="sircrumpet"/></a> <a href="https://github.com/peschee"><img src="https://avatars.githubusercontent.com/u/63866?v=4&s=48" width="48" height="48" alt="peschee" title="peschee"/></a>
  <a href="https://github.com/rafaelreis-r"><img src="https://avatars.githubusercontent.com/u/57492577?v=4&s=48" width="48" height="48" alt="rafaelreis-r" title="rafaelreis-r"/></a> <a href="https://github.com/nonggialiang"><img src="https://avatars.githubusercontent.com/u/14367839?v=4&s=48" width="48" height="48" alt="nonggialiang" title="nonggialiang"/></a> <a href="https://github.com/dominicnunez"><img src="https://avatars.githubusercontent.com/u/43616264?v=4&s=48" width="48" height="48" alt="dominicnunez" title="dominicnunez"/></a> <a href="https://github.com/lploc94"><img src="https://avatars.githubusercontent.com/u/28453843?v=4&s=48" width="48" height="48" alt="lploc94" title="lploc94"/></a> <a href="https://github.com/ratulsarna"><img src="https://avatars.githubusercontent.com/u/105903728?v=4&s=48" width="48" height="48" alt="ratulsarna" title="ratulsarna"/></a> <a href="https://github.com/lutr0"><img src="https://avatars.githubusercontent.com/u/76906369?v=4&s=48" width="48" height="48" alt="lutr0" title="lutr0"/></a> <a href="https://github.com/kiranjd"><img src="https://avatars.githubusercontent.com/u/25822851?v=4&s=48" width="48" height="48" alt="kiranjd" title="kiranjd"/></a> <a href="https://github.com/danielz1z"><img src="https://avatars.githubusercontent.com/u/235270390?v=4&s=48" width="48" height="48" alt="danielz1z" title="danielz1z"/></a> <a href="https://github.com/AdeboyeDN"><img src="https://avatars.githubusercontent.com/u/65312338?v=4&s=48" width="48" height="48" alt="AdeboyeDN" title="AdeboyeDN"/></a> <a href="https://github.com/Alg0rix"><img src="https://avatars.githubusercontent.com/u/53804949?v=4&s=48" width="48" height="48" alt="Alg0rix" title="Alg0rix"/></a>
  <a href="https://github.com/papago2355"><img src="https://avatars.githubusercontent.com/u/68721273?v=4&s=48" width="48" height="48" alt="papago2355" title="papago2355"/></a> <a href="https://github.com/emanuelst"><img src="https://avatars.githubusercontent.com/u/9994339?v=4&s=48" width="48" height="48" alt="emanuelst" title="emanuelst"/></a> <a href="https://github.com/evanotero"><img src="https://avatars.githubusercontent.com/u/13204105?v=4&s=48" width="48" height="48" alt="evanotero" title="evanotero"/></a> <a href="https://github.com/KristijanJovanovski"><img src="https://avatars.githubusercontent.com/u/8942284?v=4&s=48" width="48" height="48" alt="KristijanJovanovski" title="KristijanJovanovski"/></a> <a href="https://github.com/CashWilliams"><img src="https://avatars.githubusercontent.com/u/613573?v=4&s=48" width="48" height="48" alt="CashWilliams" title="CashWilliams"/></a> <a href="https://github.com/jlowin"><img src="https://avatars.githubusercontent.com/u/153965?v=4&s=48" width="48" height="48" alt="jlowin" title="jlowin"/></a> <a href="https://github.com/rdev"><img src="https://avatars.githubusercontent.com/u/8418866?v=4&s=48" width="48" height="48" alt="rdev" title="rdev"/></a> <a href="https://github.com/rhuanssauro"><img src="https://avatars.githubusercontent.com/u/164682191?v=4&s=48" width="48" height="48" alt="rhuanssauro" title="rhuanssauro"/></a> <a href="https://github.com/osolmaz"><img src="https://avatars.githubusercontent.com/u/2453968?v=4&s=48" width="48" height="48" alt="osolmaz" title="osolmaz"/></a> <a href="https://github.com/joshrad-dev"><img src="https://avatars.githubusercontent.com/u/62785552?v=4&s=48" width="48" height="48" alt="joshrad-dev" title="joshrad-dev"/></a>
  <a href="https://github.com/adityashaw2"><img src="https://avatars.githubusercontent.com/u/41204444?v=4&s=48" width="48" height="48" alt="adityashaw2" title="adityashaw2"/></a> <a href="https://github.com/search?q=sheeek"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="sheeek" title="sheeek"/></a> <a href="https://github.com/ryancontent"><img src="https://avatars.githubusercontent.com/u/39743613?v=4&s=48" width="48" height="48" alt="ryancontent" title="ryancontent"/></a> <a href="https://github.com/jasonsschin"><img src="https://avatars.githubusercontent.com/u/1456889?v=4&s=48" width="48" height="48" alt="jasonsschin" title="jasonsschin"/></a> <a href="https://github.com/obviyus"><img src="https://avatars.githubusercontent.com/u/22031114?v=4&s=48" width="48" height="48" alt="obviyus" title="obviyus"/></a> <a href="https://github.com/artuskg"><img src="https://avatars.githubusercontent.com/u/11966157?v=4&s=48" width="48" height="48" alt="artuskg" title="artuskg"/></a> <a href="https://github.com/Takhoffman"><img src="https://avatars.githubusercontent.com/u/781889?v=4&s=48" width="48" height="48" alt="Takhoffman" title="Takhoffman"/></a> <a href="https://github.com/onutc"><img src="https://avatars.githubusercontent.com/u/152018508?v=4&s=48" width="48" height="48" alt="onutc" title="onutc"/></a> <a href="https://github.com/pauloportella"><img src="https://avatars.githubusercontent.com/u/22947229?v=4&s=48" width="48" height="48" alt="pauloportella" title="pauloportella"/></a> <a href="https://github.com/HirokiKobayashi-R"><img src="https://avatars.githubusercontent.com/u/37167840?v=4&s=48" width="48" height="48" alt="HirokiKobayashi-R" title="HirokiKobayashi-R"/></a>
  <a href="https://github.com/ThanhNguyxn"><img src="https://avatars.githubusercontent.com/u/74597207?v=4&s=48" width="48" height="48" alt="ThanhNguyxn" title="ThanhNguyxn"/></a> <a href="https://github.com/yuting0624"><img src="https://avatars.githubusercontent.com/u/32728916?v=4&s=48" width="48" height="48" alt="yuting0624" title="yuting0624"/></a> <a href="https://github.com/neooriginal"><img src="https://avatars.githubusercontent.com/u/54811660?v=4&s=48" width="48" height="48" alt="neooriginal" title="neooriginal"/></a> <a href="https://github.com/ManuelHettich"><img src="https://avatars.githubusercontent.com/u/17690367?v=4&s=48" width="48" height="48" alt="manuelhettich" title="manuelhettich"/></a> <a href="https://github.com/minghinmatthewlam"><img src="https://avatars.githubusercontent.com/u/14224566?v=4&s=48" width="48" height="48" alt="minghinmatthewlam" title="minghinmatthewlam"/></a> <a href="https://github.com/manikv12"><img src="https://avatars.githubusercontent.com/u/49544491?v=4&s=48" width="48" height="48" alt="manikv12" title="manikv12"/></a> <a href="https://github.com/myfunc"><img src="https://avatars.githubusercontent.com/u/19294627?v=4&s=48" width="48" height="48" alt="myfunc" title="myfunc"/></a> <a href="https://github.com/travisirby"><img src="https://avatars.githubusercontent.com/u/5958376?v=4&s=48" width="48" height="48" alt="travisirby" title="travisirby"/></a> <a href="https://github.com/buddyh"><img src="https://avatars.githubusercontent.com/u/31752869?v=4&s=48" width="48" height="48" alt="buddyh" title="buddyh"/></a> <a href="https://github.com/connorshea"><img src="https://avatars.githubusercontent.com/u/2977353?v=4&s=48" width="48" height="48" alt="connorshea" title="connorshea"/></a>
  <a href="https://github.com/kyleok"><img src="https://avatars.githubusercontent.com/u/58307870?v=4&s=48" width="48" height="48" alt="kyleok" title="kyleok"/></a> <a href="https://github.com/mcinteerj"><img src="https://avatars.githubusercontent.com/u/3613653?v=4&s=48" width="48" height="48" alt="mcinteerj" title="mcinteerj"/></a> <a href="https://github.com/apps/dependabot"><img src="https://avatars.githubusercontent.com/in/29110?v=4&s=48" width="48" height="48" alt="dependabot[bot]" title="dependabot[bot]"/></a> <a href="https://github.com/amitbiswal007"><img src="https://avatars.githubusercontent.com/u/108086198?v=4&s=48" width="48" height="48" alt="amitbiswal007" title="amitbiswal007"/></a> <a href="https://github.com/John-Rood"><img src="https://avatars.githubusercontent.com/u/62669593?v=4&s=48" width="48" height="48" alt="John-Rood" title="John-Rood"/></a> <a href="https://github.com/timkrase"><img src="https://avatars.githubusercontent.com/u/38947626?v=4&s=48" width="48" height="48" alt="timkrase" title="timkrase"/></a> <a href="https://github.com/uos-status"><img src="https://avatars.githubusercontent.com/u/255712580?v=4&s=48" width="48" height="48" alt="uos-status" title="uos-status"/></a> <a href="https://github.com/gerardward2007"><img src="https://avatars.githubusercontent.com/u/3002155?v=4&s=48" width="48" height="48" alt="gerardward2007" title="gerardward2007"/></a> <a href="https://github.com/roshanasingh4"><img src="https://avatars.githubusercontent.com/u/88576930?v=4&s=48" width="48" height="48" alt="roshanasingh4" title="roshanasingh4"/></a> <a href="https://github.com/tosh-hamburg"><img src="https://avatars.githubusercontent.com/u/58424326?v=4&s=48" width="48" height="48" alt="tosh-hamburg" title="tosh-hamburg"/></a>
  <a href="https://github.com/azade-c"><img src="https://avatars.githubusercontent.com/u/252790079?v=4&s=48" width="48" height="48" alt="azade-c" title="azade-c"/></a> <a href="https://github.com/dlauer"><img src="https://avatars.githubusercontent.com/u/757041?v=4&s=48" width="48" height="48" alt="dlauer" title="dlauer"/></a> <a href="https://github.com/JonUleis"><img src="https://avatars.githubusercontent.com/u/7644941?v=4&s=48" width="48" height="48" alt="JonUleis" title="JonUleis"/></a> <a href="https://github.com/shivamraut101"><img src="https://avatars.githubusercontent.com/u/110457469?v=4&s=48" width="48" height="48" alt="shivamraut101" title="shivamraut101"/></a> <a href="https://github.com/bjesuiter"><img src="https://avatars.githubusercontent.com/u/2365676?v=4&s=48" width="48" height="48" alt="bjesuiter" title="bjesuiter"/></a> <a href="https://github.com/cheeeee"><img src="https://avatars.githubusercontent.com/u/21245729?v=4&s=48" width="48" height="48" alt="cheeeee" title="cheeeee"/></a> <a href="https://github.com/robbyczgw-cla"><img src="https://avatars.githubusercontent.com/u/239660374?v=4&s=48" width="48" height="48" alt="robbyczgw-cla" title="robbyczgw-cla"/></a> <a href="https://github.com/YuriNachos"><img src="https://avatars.githubusercontent.com/u/19365375?v=4&s=48" width="48" height="48" alt="YuriNachos" title="YuriNachos"/></a> <a href="https://github.com/badlogic"><img src="https://avatars.githubusercontent.com/u/514052?v=4&s=48" width="48" height="48" alt="badlogic" title="badlogic"/></a> <a href="https://github.com/conroywhitney"><img src="https://avatars.githubusercontent.com/u/249891?v=4&s=48" width="48" height="48" alt="conroywhitney" title="conroywhitney"/></a>
  <a href="https://github.com/j1philli"><img src="https://avatars.githubusercontent.com/u/3744255?v=4&s=48" width="48" height="48" alt="Josh Phillips" title="Josh Phillips"/></a> <a href="https://github.com/pookNast"><img src="https://avatars.githubusercontent.com/u/14242552?v=4&s=48" width="48" height="48" alt="pookNast" title="pookNast"/></a> <a href="https://github.com/Whoaa512"><img src="https://avatars.githubusercontent.com/u/1581943?v=4&s=48" width="48" height="48" alt="Whoaa512" title="Whoaa512"/></a> <a href="https://github.com/chriseidhof"><img src="https://avatars.githubusercontent.com/u/5382?v=4&s=48" width="48" height="48" alt="chriseidhof" title="chriseidhof"/></a> <a href="https://github.com/ngutman"><img src="https://avatars.githubusercontent.com/u/1540134?v=4&s=48" width="48" height="48" alt="ngutman" title="ngutman"/></a> <a href="https://github.com/ysqander"><img src="https://avatars.githubusercontent.com/u/80843820?v=4&s=48" width="48" height="48" alt="ysqander" title="ysqander"/></a> <a href="https://github.com/search?q=Yurii%20Chukhlib"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="Yurii Chukhlib" title="Yurii Chukhlib"/></a> <a href="https://github.com/aj47"><img src="https://avatars.githubusercontent.com/u/8023513?v=4&s=48" width="48" height="48" alt="aj47" title="aj47"/></a> <a href="https://github.com/kennyklee"><img src="https://avatars.githubusercontent.com/u/1432489?v=4&s=48" width="48" height="48" alt="kennyklee" title="kennyklee"/></a> <a href="https://github.com/superman32432432"><img src="https://avatars.githubusercontent.com/u/7228420?v=4&s=48" width="48" height="48" alt="superman32432432" title="superman32432432"/></a>
  <a href="https://github.com/grp06"><img src="https://avatars.githubusercontent.com/u/1573959?v=4&s=48" width="48" height="48" alt="grp06" title="grp06"/></a> <a href="https://github.com/Hisleren"><img src="https://avatars.githubusercontent.com/u/83217244?v=4&s=48" width="48" height="48" alt="Hisleren" title="Hisleren"/></a> <a href="https://github.com/antons"><img src="https://avatars.githubusercontent.com/u/129705?v=4&s=48" width="48" height="48" alt="antons" title="antons"/></a> <a href="https://github.com/austinm911"><img src="https://avatars.githubusercontent.com/u/31991302?v=4&s=48" width="48" height="48" alt="austinm911" title="austinm911"/></a> <a href="https://github.com/apps/blacksmith-sh"><img src="https://avatars.githubusercontent.com/in/807020?v=4&s=48" width="48" height="48" alt="blacksmith-sh[bot]" title="blacksmith-sh[bot]"/></a> <a href="https://github.com/damoahdominic"><img src="https://avatars.githubusercontent.com/u/4623434?v=4&s=48" width="48" height="48" alt="damoahdominic" title="damoahdominic"/></a> <a href="https://github.com/dan-dr"><img src="https://avatars.githubusercontent.com/u/6669808?v=4&s=48" width="48" height="48" alt="dan-dr" title="dan-dr"/></a> <a href="https://github.com/HeimdallStrategy"><img src="https://avatars.githubusercontent.com/u/223014405?v=4&s=48" width="48" height="48" alt="HeimdallStrategy" title="HeimdallStrategy"/></a> <a href="https://github.com/imfing"><img src="https://avatars.githubusercontent.com/u/5097752?v=4&s=48" width="48" height="48" alt="imfing" title="imfing"/></a> <a href="https://github.com/jalehman"><img src="https://avatars.githubusercontent.com/u/550978?v=4&s=48" width="48" height="48" alt="jalehman" title="jalehman"/></a>
  <a href="https://github.com/jarvis-medmatic"><img src="https://avatars.githubusercontent.com/u/252428873?v=4&s=48" width="48" height="48" alt="jarvis-medmatic" title="jarvis-medmatic"/></a> <a href="https://github.com/kkarimi"><img src="https://avatars.githubusercontent.com/u/875218?v=4&s=48" width="48" height="48" alt="kkarimi" title="kkarimi"/></a> <a href="https://github.com/mahmoudashraf93"><img src="https://avatars.githubusercontent.com/u/9130129?v=4&s=48" width="48" height="48" alt="mahmoudashraf93" title="mahmoudashraf93"/></a> <a href="https://github.com/pkrmf"><img src="https://avatars.githubusercontent.com/u/1714267?v=4&s=48" width="48" height="48" alt="pkrmf" title="pkrmf"/></a> <a href="https://github.com/RandyVentures"><img src="https://avatars.githubusercontent.com/u/149904821?v=4&s=48" width="48" height="48" alt="RandyVentures" title="RandyVentures"/></a> <a href="https://github.com/robhparker"><img src="https://avatars.githubusercontent.com/u/7404740?v=4&s=48" width="48" height="48" alt="robhparker" title="robhparker"/></a> <a href="https://github.com/search?q=Ryan%20Lisse"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="Ryan Lisse" title="Ryan Lisse"/></a> <a href="https://github.com/dougvk"><img src="https://avatars.githubusercontent.com/u/401660?v=4&s=48" width="48" height="48" alt="dougvk" title="dougvk"/></a> <a href="https://github.com/erikpr1994"><img src="https://avatars.githubusercontent.com/u/6299331?v=4&s=48" width="48" height="48" alt="erikpr1994" title="erikpr1994"/></a> <a href="https://github.com/fal3"><img src="https://avatars.githubusercontent.com/u/6484295?v=4&s=48" width="48" height="48" alt="fal3" title="fal3"/></a>
  <a href="https://github.com/search?q=Ghost"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="Ghost" title="Ghost"/></a> <a href="https://github.com/jonasjancarik"><img src="https://avatars.githubusercontent.com/u/2459191?v=4&s=48" width="48" height="48" alt="jonasjancarik" title="jonasjancarik"/></a> <a href="https://github.com/search?q=Keith%20the%20Silly%20Goose"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="Keith the Silly Goose" title="Keith the Silly Goose"/></a> <a href="https://github.com/search?q=L36%20Server"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="L36 Server" title="L36 Server"/></a> <a href="https://github.com/search?q=Marc"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="Marc" title="Marc"/></a> <a href="https://github.com/mitschabaude-bot"><img src="https://avatars.githubusercontent.com/u/247582884?v=4&s=48" width="48" height="48" alt="mitschabaude-bot" title="mitschabaude-bot"/></a> <a href="https://github.com/mkbehr"><img src="https://avatars.githubusercontent.com/u/1285?v=4&s=48" width="48" height="48" alt="mkbehr" title="mkbehr"/></a> <a href="https://github.com/neist"><img src="https://avatars.githubusercontent.com/u/1029724?v=4&s=48" width="48" height="48" alt="neist" title="neist"/></a> <a href="https://github.com/sibbl"><img src="https://avatars.githubusercontent.com/u/866535?v=4&s=48" width="48" height="48" alt="sibbl" title="sibbl"/></a> <a href="https://github.com/chrisrodz"><img src="https://avatars.githubusercontent.com/u/2967620?v=4&s=48" width="48" height="48" alt="chrisrodz" title="chrisrodz"/></a>
  <a href="https://github.com/search?q=Friederike%20Seiler"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="Friederike Seiler" title="Friederike Seiler"/></a> <a href="https://github.com/gabriel-trigo"><img src="https://avatars.githubusercontent.com/u/38991125?v=4&s=48" width="48" height="48" alt="gabriel-trigo" title="gabriel-trigo"/></a> <a href="https://github.com/Iamadig"><img src="https://avatars.githubusercontent.com/u/102129234?v=4&s=48" width="48" height="48" alt="iamadig" title="iamadig"/></a> <a href="https://github.com/jdrhyne"><img src="https://avatars.githubusercontent.com/u/7828464?v=4&s=48" width="48" height="48" alt="Jonathan D. Rhyne (DJ-D)" title="Jonathan D. Rhyne (DJ-D)"/></a> <a href="https://github.com/search?q=Joshua%20Mitchell"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="Joshua Mitchell" title="Joshua Mitchell"/></a> <a href="https://github.com/search?q=Kit"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="Kit" title="Kit"/></a> <a href="https://github.com/koala73"><img src="https://avatars.githubusercontent.com/u/996596?v=4&s=48" width="48" height="48" alt="koala73" title="koala73"/></a> <a href="https://github.com/manmal"><img src="https://avatars.githubusercontent.com/u/142797?v=4&s=48" width="48" height="48" alt="manmal" title="manmal"/></a> <a href="https://github.com/ogulcancelik"><img src="https://avatars.githubusercontent.com/u/7064011?v=4&s=48" width="48" height="48" alt="ogulcancelik" title="ogulcancelik"/></a> <a href="https://github.com/pasogott"><img src="https://avatars.githubusercontent.com/u/23458152?v=4&s=48" width="48" height="48" alt="pasogott" title="pasogott"/></a>
  <a href="https://github.com/petradonka"><img src="https://avatars.githubusercontent.com/u/7353770?v=4&s=48" width="48" height="48" alt="petradonka" title="petradonka"/></a> <a href="https://github.com/rubyrunsstuff"><img src="https://avatars.githubusercontent.com/u/246602379?v=4&s=48" width="48" height="48" alt="rubyrunsstuff" title="rubyrunsstuff"/></a> <a href="https://github.com/siddhantjain"><img src="https://avatars.githubusercontent.com/u/4835232?v=4&s=48" width="48" height="48" alt="siddhantjain" title="siddhantjain"/></a> <a href="https://github.com/spiceoogway"><img src="https://avatars.githubusercontent.com/u/105812383?v=4&s=48" width="48" height="48" alt="spiceoogway" title="spiceoogway"/></a> <a href="https://github.com/suminhthanh"><img src="https://avatars.githubusercontent.com/u/2907636?v=4&s=48" width="48" height="48" alt="suminhthanh" title="suminhthanh"/></a> <a href="https://github.com/svkozak"><img src="https://avatars.githubusercontent.com/u/31941359?v=4&s=48" width="48" height="48" alt="svkozak" title="svkozak"/></a> <a href="https://github.com/VACInc"><img src="https://avatars.githubusercontent.com/u/3279061?v=4&s=48" width="48" height="48" alt="VACInc" title="VACInc"/></a> <a href="https://github.com/wes-davis"><img src="https://avatars.githubusercontent.com/u/16506720?v=4&s=48" width="48" height="48" alt="wes-davis" title="wes-davis"/></a> <a href="https://github.com/zats"><img src="https://avatars.githubusercontent.com/u/2688806?v=4&s=48" width="48" height="48" alt="zats" title="zats"/></a> <a href="https://github.com/24601"><img src="https://avatars.githubusercontent.com/u/1157207?v=4&s=48" width="48" height="48" alt="24601" title="24601"/></a>
  <a href="https://github.com/ameno-"><img src="https://avatars.githubusercontent.com/u/2416135?v=4&s=48" width="48" height="48" alt="ameno-" title="ameno-"/></a> <a href="https://github.com/search?q=Chris%20Taylor"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="Chris Taylor" title="Chris Taylor"/></a> <a href="https://github.com/dguido"><img src="https://avatars.githubusercontent.com/u/294844?v=4&s=48" width="48" height="48" alt="dguido" title="dguido"/></a> <a href="https://github.com/djangonavarro220"><img src="https://avatars.githubusercontent.com/u/251162586?v=4&s=48" width="48" height="48" alt="Django Navarro" title="Django Navarro"/></a> <a href="https://github.com/evalexpr"><img src="https://avatars.githubusercontent.com/u/23485511?v=4&s=48" width="48" height="48" alt="evalexpr" title="evalexpr"/></a> <a href="https://github.com/henrino3"><img src="https://avatars.githubusercontent.com/u/4260288?v=4&s=48" width="48" height="48" alt="henrino3" title="henrino3"/></a> <a href="https://github.com/humanwritten"><img src="https://avatars.githubusercontent.com/u/206531610?v=4&s=48" width="48" height="48" alt="humanwritten" title="humanwritten"/></a> <a href="https://github.com/larlyssa"><img src="https://avatars.githubusercontent.com/u/13128869?v=4&s=48" width="48" height="48" alt="larlyssa" title="larlyssa"/></a> <a href="https://github.com/Lukavyi"><img src="https://avatars.githubusercontent.com/u/1013690?v=4&s=48" width="48" height="48" alt="Lukavyi" title="Lukavyi"/></a> <a href="https://github.com/odysseus0"><img src="https://avatars.githubusercontent.com/u/8635094?v=4&s=48" width="48" height="48" alt="odysseus0" title="odysseus0"/></a>
  <a href="https://github.com/oswalpalash"><img src="https://avatars.githubusercontent.com/u/6431196?v=4&s=48" width="48" height="48" alt="oswalpalash" title="oswalpalash"/></a> <a href="https://github.com/pcty-nextgen-service-account"><img src="https://avatars.githubusercontent.com/u/112553441?v=4&s=48" width="48" height="48" alt="pcty-nextgen-service-account" title="pcty-nextgen-service-account"/></a> <a href="https://github.com/pi0"><img src="https://avatars.githubusercontent.com/u/5158436?v=4&s=48" width="48" height="48" alt="pi0" title="pi0"/></a> <a href="https://github.com/rmorse"><img src="https://avatars.githubusercontent.com/u/853547?v=4&s=48" width="48" height="48" alt="rmorse" title="rmorse"/></a> <a href="https://github.com/search?q=Roopak%20Nijhara"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="Roopak Nijhara" title="Roopak Nijhara"/></a> <a href="https://github.com/Syhids"><img src="https://avatars.githubusercontent.com/u/671202?v=4&s=48" width="48" height="48" alt="Syhids" title="Syhids"/></a> <a href="https://github.com/search?q=Ubuntu"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="Ubuntu" title="Ubuntu"/></a> <a href="https://github.com/search?q=Aaron%20Konyer"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="Aaron Konyer" title="Aaron Konyer"/></a> <a href="https://github.com/aaronveklabs"><img src="https://avatars.githubusercontent.com/u/225997828?v=4&s=48" width="48" height="48" alt="aaronveklabs" title="aaronveklabs"/></a> <a href="https://github.com/andreabadesso"><img src="https://avatars.githubusercontent.com/u/3586068?v=4&s=48" width="48" height="48" alt="andreabadesso" title="andreabadesso"/></a>
  <a href="https://github.com/search?q=Andrii"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="Andrii" title="Andrii"/></a> <a href="https://github.com/cash-echo-bot"><img src="https://avatars.githubusercontent.com/u/252747386?v=4&s=48" width="48" height="48" alt="cash-echo-bot" title="cash-echo-bot"/></a> <a href="https://github.com/search?q=Clawd"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="Clawd" title="Clawd"/></a> <a href="https://github.com/search?q=ClawdFx"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="ClawdFx" title="ClawdFx"/></a> <a href="https://github.com/EnzeD"><img src="https://avatars.githubusercontent.com/u/9866900?v=4&s=48" width="48" height="48" alt="EnzeD" title="EnzeD"/></a> <a href="https://github.com/erik-agens"><img src="https://avatars.githubusercontent.com/u/80908960?v=4&s=48" width="48" height="48" alt="erik-agens" title="erik-agens"/></a> <a href="https://github.com/Evizero"><img src="https://avatars.githubusercontent.com/u/10854026?v=4&s=48" width="48" height="48" alt="Evizero" title="Evizero"/></a> <a href="https://github.com/fcatuhe"><img src="https://avatars.githubusercontent.com/u/17382215?v=4&s=48" width="48" height="48" alt="fcatuhe" title="fcatuhe"/></a> <a href="https://github.com/itsjaydesu"><img src="https://avatars.githubusercontent.com/u/220390?v=4&s=48" width="48" height="48" alt="itsjaydesu" title="itsjaydesu"/></a> <a href="https://github.com/ivancasco"><img src="https://avatars.githubusercontent.com/u/2452858?v=4&s=48" width="48" height="48" alt="ivancasco" title="ivancasco"/></a>
  <a href="https://github.com/ivanrvpereira"><img src="https://avatars.githubusercontent.com/u/183991?v=4&s=48" width="48" height="48" alt="ivanrvpereira" title="ivanrvpereira"/></a> <a href="https://github.com/search?q=Jarvis"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="Jarvis" title="Jarvis"/></a> <a href="https://github.com/jayhickey"><img src="https://avatars.githubusercontent.com/u/1676460?v=4&s=48" width="48" height="48" alt="jayhickey" title="jayhickey"/></a> <a href="https://github.com/jeffersonwarrior"><img src="https://avatars.githubusercontent.com/u/89030989?v=4&s=48" width="48" height="48" alt="jeffersonwarrior" title="jeffersonwarrior"/></a> <a href="https://github.com/search?q=jeffersonwarrior"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="jeffersonwarrior" title="jeffersonwarrior"/></a> <a href="https://github.com/jverdi"><img src="https://avatars.githubusercontent.com/u/345050?v=4&s=48" width="48" height="48" alt="jverdi" title="jverdi"/></a> <a href="https://github.com/longmaba"><img src="https://avatars.githubusercontent.com/u/9361500?v=4&s=48" width="48" height="48" alt="longmaba" title="longmaba"/></a> <a href="https://github.com/MarvinCui"><img src="https://avatars.githubusercontent.com/u/130876763?v=4&s=48" width="48" height="48" alt="MarvinCui" title="MarvinCui"/></a> <a href="https://github.com/mjrussell"><img src="https://avatars.githubusercontent.com/u/1641895?v=4&s=48" width="48" height="48" alt="mjrussell" title="mjrussell"/></a> <a href="https://github.com/odnxe"><img src="https://avatars.githubusercontent.com/u/403141?v=4&s=48" width="48" height="48" alt="odnxe" title="odnxe"/></a>
  <a href="https://github.com/optimikelabs"><img src="https://avatars.githubusercontent.com/u/31423109?v=4&s=48" width="48" height="48" alt="optimikelabs" title="optimikelabs"/></a> <a href="https://github.com/p6l-richard"><img src="https://avatars.githubusercontent.com/u/18185649?v=4&s=48" width="48" height="48" alt="p6l-richard" title="p6l-richard"/></a> <a href="https://github.com/philipp-spiess"><img src="https://avatars.githubusercontent.com/u/458591?v=4&s=48" width="48" height="48" alt="philipp-spiess" title="philipp-spiess"/></a> <a href="https://github.com/search?q=Pocket%20Clawd"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="Pocket Clawd" title="Pocket Clawd"/></a> <a href="https://github.com/robaxelsen"><img src="https://avatars.githubusercontent.com/u/13132899?v=4&s=48" width="48" height="48" alt="robaxelsen" title="robaxelsen"/></a> <a href="https://github.com/search?q=Sash%20Catanzarite"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="Sash Catanzarite" title="Sash Catanzarite"/></a> <a href="https://github.com/Suksham-sharma"><img src="https://avatars.githubusercontent.com/u/94667656?v=4&s=48" width="48" height="48" alt="Suksham-sharma" title="Suksham-sharma"/></a> <a href="https://github.com/T5-AndyML"><img src="https://avatars.githubusercontent.com/u/22801233?v=4&s=48" width="48" height="48" alt="T5-AndyML" title="T5-AndyML"/></a> <a href="https://github.com/tewatia"><img src="https://avatars.githubusercontent.com/u/22875334?v=4&s=48" width="48" height="48" alt="tewatia" title="tewatia"/></a> <a href="https://github.com/travisp"><img src="https://avatars.githubusercontent.com/u/165698?v=4&s=48" width="48" height="48" alt="travisp" title="travisp"/></a>
  <a href="https://github.com/search?q=VAC"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="VAC" title="VAC"/></a> <a href="https://github.com/search?q=william%20arzt"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="william arzt" title="william arzt"/></a> <a href="https://github.com/zknicker"><img src="https://avatars.githubusercontent.com/u/1164085?v=4&s=48" width="48" height="48" alt="zknicker" title="zknicker"/></a> <a href="https://github.com/0oAstro"><img src="https://avatars.githubusercontent.com/u/79555780?v=4&s=48" width="48" height="48" alt="0oAstro" title="0oAstro"/></a> <a href="https://github.com/abhaymundhara"><img src="https://avatars.githubusercontent.com/u/62872231?v=4&s=48" width="48" height="48" alt="abhaymundhara" title="abhaymundhara"/></a> <a href="https://github.com/aduk059"><img src="https://avatars.githubusercontent.com/u/257603478?v=4&s=48" width="48" height="48" alt="aduk059" title="aduk059"/></a> <a href="https://github.com/search?q=alejandro%20maza"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="alejandro maza" title="alejandro maza"/></a> <a href="https://github.com/Alex-Alaniz"><img src="https://avatars.githubusercontent.com/u/88956822?v=4&s=48" width="48" height="48" alt="Alex-Alaniz" title="Alex-Alaniz"/></a> <a href="https://github.com/alexstyl"><img src="https://avatars.githubusercontent.com/u/1665273?v=4&s=48" width="48" height="48" alt="alexstyl" title="alexstyl"/></a> <a href="https://github.com/andrewting19"><img src="https://avatars.githubusercontent.com/u/10536704?v=4&s=48" width="48" height="48" alt="andrewting19" title="andrewting19"/></a>
  <a href="https://github.com/anpoirier"><img src="https://avatars.githubusercontent.com/u/1245729?v=4&s=48" width="48" height="48" alt="anpoirier" title="anpoirier"/></a> <a href="https://github.com/araa47"><img src="https://avatars.githubusercontent.com/u/22760261?v=4&s=48" width="48" height="48" alt="araa47" title="araa47"/></a> <a href="https://github.com/arthyn"><img src="https://avatars.githubusercontent.com/u/5466421?v=4&s=48" width="48" height="48" alt="arthyn" title="arthyn"/></a> <a href="https://github.com/Asleep123"><img src="https://avatars.githubusercontent.com/u/122379135?v=4&s=48" width="48" height="48" alt="Asleep123" title="Asleep123"/></a> <a href="https://github.com/search?q=Ayush%20Ojha"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="Ayush Ojha" title="Ayush Ojha"/></a> <a href="https://github.com/Ayush10"><img src="https://avatars.githubusercontent.com/u/7945279?v=4&s=48" width="48" height="48" alt="Ayush10" title="Ayush10"/></a> <a href="https://github.com/bguidolim"><img src="https://avatars.githubusercontent.com/u/987360?v=4&s=48" width="48" height="48" alt="bguidolim" title="bguidolim"/></a> <a href="https://github.com/bolismauro"><img src="https://avatars.githubusercontent.com/u/771999?v=4&s=48" width="48" height="48" alt="bolismauro" title="bolismauro"/></a> <a href="https://github.com/championswimmer"><img src="https://avatars.githubusercontent.com/u/1327050?v=4&s=48" width="48" height="48" alt="championswimmer" title="championswimmer"/></a> <a href="https://github.com/chenyuan99"><img src="https://avatars.githubusercontent.com/u/25518100?v=4&s=48" width="48" height="48" alt="chenyuan99" title="chenyuan99"/></a>
  <a href="https://github.com/Chloe-VP"><img src="https://avatars.githubusercontent.com/u/257371598?v=4&s=48" width="48" height="48" alt="Chloe-VP" title="Chloe-VP"/></a> <a href="https://github.com/search?q=Clawdbot%20Maintainers"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="Clawdbot Maintainers" title="Clawdbot Maintainers"/></a> <a href="https://github.com/conhecendoia"><img src="https://avatars.githubusercontent.com/u/82890727?v=4&s=48" width="48" height="48" alt="conhecendoia" title="conhecendoia"/></a> <a href="https://github.com/dasilva333"><img src="https://avatars.githubusercontent.com/u/947827?v=4&s=48" width="48" height="48" alt="dasilva333" title="dasilva333"/></a> <a href="https://github.com/David-Marsh-Photo"><img src="https://avatars.githubusercontent.com/u/228404527?v=4&s=48" width="48" height="48" alt="David-Marsh-Photo" title="David-Marsh-Photo"/></a> <a href="https://github.com/search?q=Developer"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="Developer" title="Developer"/></a> <a href="https://github.com/search?q=Dimitrios%20Ploutarchos"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="Dimitrios Ploutarchos" title="Dimitrios Ploutarchos"/></a> <a href="https://github.com/search?q=Drake%20Thomsen"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="Drake Thomsen" title="Drake Thomsen"/></a> <a href="https://github.com/dylanneve1"><img src="https://avatars.githubusercontent.com/u/31746704?v=4&s=48" width="48" height="48" alt="dylanneve1" title="dylanneve1"/></a> <a href="https://github.com/search?q=Felix%20Krause"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="Felix Krause" title="Felix Krause"/></a>
  <a href="https://github.com/foeken"><img src="https://avatars.githubusercontent.com/u/13864?v=4&s=48" width="48" height="48" alt="foeken" title="foeken"/></a> <a href="https://github.com/frankekn"><img src="https://avatars.githubusercontent.com/u/4488090?v=4&s=48" width="48" height="48" alt="frankekn" title="frankekn"/></a> <a href="https://github.com/search?q=ganghyun%20kim"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="ganghyun kim" title="ganghyun kim"/></a> <a href="https://github.com/grrowl"><img src="https://avatars.githubusercontent.com/u/907140?v=4&s=48" width="48" height="48" alt="grrowl" title="grrowl"/></a> <a href="https://github.com/gtsifrikas"><img src="https://avatars.githubusercontent.com/u/8904378?v=4&s=48" width="48" height="48" alt="gtsifrikas" title="gtsifrikas"/></a> <a href="https://github.com/HazAT"><img src="https://avatars.githubusercontent.com/u/363802?v=4&s=48" width="48" height="48" alt="HazAT" title="HazAT"/></a> <a href="https://github.com/hrdwdmrbl"><img src="https://avatars.githubusercontent.com/u/554881?v=4&s=48" width="48" height="48" alt="hrdwdmrbl" title="hrdwdmrbl"/></a> <a href="https://github.com/hugobarauna"><img src="https://avatars.githubusercontent.com/u/2719?v=4&s=48" width="48" height="48" alt="hugobarauna" title="hugobarauna"/></a> <a href="https://github.com/search?q=Jamie%20Openshaw"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="Jamie Openshaw" title="Jamie Openshaw"/></a> <a href="https://github.com/search?q=Jane"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="Jane" title="Jane"/></a>
  <a href="https://github.com/search?q=Jarvis%20Deploy"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="Jarvis Deploy" title="Jarvis Deploy"/></a> <a href="https://github.com/search?q=Jefferson%20Nunn"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="Jefferson Nunn" title="Jefferson Nunn"/></a> <a href="https://github.com/jogi47"><img src="https://avatars.githubusercontent.com/u/1710139?v=4&s=48" width="48" height="48" alt="jogi47" title="jogi47"/></a> <a href="https://github.com/kentaro"><img src="https://avatars.githubusercontent.com/u/3458?v=4&s=48" width="48" height="48" alt="kentaro" title="kentaro"/></a> <a href="https://github.com/search?q=Kevin%20Lin"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="Kevin Lin" title="Kevin Lin"/></a> <a href="https://github.com/kira-ariaki"><img src="https://avatars.githubusercontent.com/u/257352493?v=4&s=48" width="48" height="48" alt="kira-ariaki" title="kira-ariaki"/></a> <a href="https://github.com/kitze"><img src="https://avatars.githubusercontent.com/u/1160594?v=4&s=48" width="48" height="48" alt="kitze" title="kitze"/></a> <a href="https://github.com/Kiwitwitter"><img src="https://avatars.githubusercontent.com/u/25277769?v=4&s=48" width="48" height="48" alt="Kiwitwitter" title="Kiwitwitter"/></a> <a href="https://github.com/levifig"><img src="https://avatars.githubusercontent.com/u/1605?v=4&s=48" width="48" height="48" alt="levifig" title="levifig"/></a> <a href="https://github.com/search?q=Lloyd"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="Lloyd" title="Lloyd"/></a>
  <a href="https://github.com/longjos"><img src="https://avatars.githubusercontent.com/u/740160?v=4&s=48" width="48" height="48" alt="longjos" title="longjos"/></a> <a href="https://github.com/loukotal"><img src="https://avatars.githubusercontent.com/u/18210858?v=4&s=48" width="48" height="48" alt="loukotal" title="loukotal"/></a> <a href="https://github.com/louzhixian"><img src="https://avatars.githubusercontent.com/u/7994361?v=4&s=48" width="48" height="48" alt="louzhixian" title="louzhixian"/></a> <a href="https://github.com/martinpucik"><img src="https://avatars.githubusercontent.com/u/5503097?v=4&s=48" width="48" height="48" alt="martinpucik" title="martinpucik"/></a> <a href="https://github.com/search?q=Matt%20mini"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="Matt mini" title="Matt mini"/></a> <a href="https://github.com/mertcicekci0"><img src="https://avatars.githubusercontent.com/u/179321902?v=4&s=48" width="48" height="48" alt="mertcicekci0" title="mertcicekci0"/></a> <a href="https://github.com/search?q=Miles"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="Miles" title="Miles"/></a> <a href="https://github.com/mitsuhiko"><img src="https://avatars.githubusercontent.com/u/7396?v=4&s=48" width="48" height="48" alt="mitsuhiko" title="mitsuhiko"/></a> <a href="https://github.com/mrdbstn"><img src="https://avatars.githubusercontent.com/u/58957632?v=4&s=48" width="48" height="48" alt="mrdbstn" title="mrdbstn"/></a> <a href="https://github.com/MSch"><img src="https://avatars.githubusercontent.com/u/7475?v=4&s=48" width="48" height="48" alt="MSch" title="MSch"/></a>
  <a href="https://github.com/search?q=Mustafa%20Tag%20Eldeen"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="Mustafa Tag Eldeen" title="Mustafa Tag Eldeen"/></a> <a href="https://github.com/mylukin"><img src="https://avatars.githubusercontent.com/u/1021019?v=4&s=48" width="48" height="48" alt="mylukin" title="mylukin"/></a> <a href="https://github.com/nathanbosse"><img src="https://avatars.githubusercontent.com/u/4040669?v=4&s=48" width="48" height="48" alt="nathanbosse" title="nathanbosse"/></a> <a href="https://github.com/ndraiman"><img src="https://avatars.githubusercontent.com/u/12609607?v=4&s=48" width="48" height="48" alt="ndraiman" title="ndraiman"/></a> <a href="https://github.com/nexty5870"><img src="https://avatars.githubusercontent.com/u/3869659?v=4&s=48" width="48" height="48" alt="nexty5870" title="nexty5870"/></a> <a href="https://github.com/Noctivoro"><img src="https://avatars.githubusercontent.com/u/183974570?v=4&s=48" width="48" height="48" alt="Noctivoro" title="Noctivoro"/></a> <a href="https://github.com/ppamment"><img src="https://avatars.githubusercontent.com/u/2122919?v=4&s=48" width="48" height="48" alt="ppamment" title="ppamment"/></a> <a href="https://github.com/prathamdby"><img src="https://avatars.githubusercontent.com/u/134331217?v=4&s=48" width="48" height="48" alt="prathamdby" title="prathamdby"/></a> <a href="https://github.com/ptn1411"><img src="https://avatars.githubusercontent.com/u/57529765?v=4&s=48" width="48" height="48" alt="ptn1411" title="ptn1411"/></a> <a href="https://github.com/reeltimeapps"><img src="https://avatars.githubusercontent.com/u/637338?v=4&s=48" width="48" height="48" alt="reeltimeapps" title="reeltimeapps"/></a>
  <a href="https://github.com/RLTCmpe"><img src="https://avatars.githubusercontent.com/u/10762242?v=4&s=48" width="48" height="48" alt="RLTCmpe" title="RLTCmpe"/></a> <a href="https://github.com/search?q=Rolf%20Fredheim"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="Rolf Fredheim" title="Rolf Fredheim"/></a> <a href="https://github.com/search?q=Rony%20Kelner"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="Rony Kelner" title="Rony Kelner"/></a> <a href="https://github.com/search?q=Samrat%20Jha"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="Samrat Jha" title="Samrat Jha"/></a> <a href="https://github.com/senoldogann"><img src="https://avatars.githubusercontent.com/u/45736551?v=4&s=48" width="48" height="48" alt="senoldogann" title="senoldogann"/></a> <a href="https://github.com/Seredeep"><img src="https://avatars.githubusercontent.com/u/22802816?v=4&s=48" width="48" height="48" alt="Seredeep" title="Seredeep"/></a> <a href="https://github.com/sergical"><img src="https://avatars.githubusercontent.com/u/3760543?v=4&s=48" width="48" height="48" alt="sergical" title="sergical"/></a> <a href="https://github.com/shiv19"><img src="https://avatars.githubusercontent.com/u/9407019?v=4&s=48" width="48" height="48" alt="shiv19" title="shiv19"/></a> <a href="https://github.com/shiyuanhai"><img src="https://avatars.githubusercontent.com/u/1187370?v=4&s=48" width="48" height="48" alt="shiyuanhai" title="shiyuanhai"/></a> <a href="https://github.com/siraht"><img src="https://avatars.githubusercontent.com/u/73152895?v=4&s=48" width="48" height="48" alt="siraht" title="siraht"/></a>
  <a href="https://github.com/snopoke"><img src="https://avatars.githubusercontent.com/u/249606?v=4&s=48" width="48" height="48" alt="snopoke" title="snopoke"/></a> <a href="https://github.com/search?q=techboss"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="techboss" title="techboss"/></a> <a href="https://github.com/testingabc321"><img src="https://avatars.githubusercontent.com/u/8577388?v=4&s=48" width="48" height="48" alt="testingabc321" title="testingabc321"/></a> <a href="https://github.com/search?q=The%20Admiral"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="The Admiral" title="The Admiral"/></a> <a href="https://github.com/thesash"><img src="https://avatars.githubusercontent.com/u/1166151?v=4&s=48" width="48" height="48" alt="thesash" title="thesash"/></a> <a href="https://github.com/search?q=Vibe%20Kanban"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="Vibe Kanban" title="Vibe Kanban"/></a> <a href="https://github.com/voidserf"><img src="https://avatars.githubusercontent.com/u/477673?v=4&s=48" width="48" height="48" alt="voidserf" title="voidserf"/></a> <a href="https://github.com/search?q=Vultr-Clawd%20Admin"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="Vultr-Clawd Admin" title="Vultr-Clawd Admin"/></a> <a href="https://github.com/search?q=Wimmie"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="Wimmie" title="Wimmie"/></a> <a href="https://github.com/search?q=wolfred"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="wolfred" title="wolfred"/></a>
  <a href="https://github.com/wstock"><img src="https://avatars.githubusercontent.com/u/1394687?v=4&s=48" width="48" height="48" alt="wstock" title="wstock"/></a> <a href="https://github.com/YangHuang2280"><img src="https://avatars.githubusercontent.com/u/201681634?v=4&s=48" width="48" height="48" alt="YangHuang2280" title="YangHuang2280"/></a> <a href="https://github.com/yazinsai"><img src="https://avatars.githubusercontent.com/u/1846034?v=4&s=48" width="48" height="48" alt="yazinsai" title="yazinsai"/></a> <a href="https://github.com/yevhen"><img src="https://avatars.githubusercontent.com/u/107726?v=4&s=48" width="48" height="48" alt="yevhen" title="yevhen"/></a> <a href="https://github.com/YiWang24"><img src="https://avatars.githubusercontent.com/u/176262341?v=4&s=48" width="48" height="48" alt="YiWang24" title="YiWang24"/></a> <a href="https://github.com/search?q=ymat19"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="ymat19" title="ymat19"/></a> <a href="https://github.com/search?q=Zach%20Knickerbocker"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="Zach Knickerbocker" title="Zach Knickerbocker"/></a> <a href="https://github.com/zackerthescar"><img src="https://avatars.githubusercontent.com/u/38077284?v=4&s=48" width="48" height="48" alt="zackerthescar" title="zackerthescar"/></a> <a href="https://github.com/0xJonHoldsCrypto"><img src="https://avatars.githubusercontent.com/u/81202085?v=4&s=48" width="48" height="48" alt="0xJonHoldsCrypto" title="0xJonHoldsCrypto"/></a> <a href="https://github.com/aaronn"><img src="https://avatars.githubusercontent.com/u/1653630?v=4&s=48" width="48" height="48" alt="aaronn" title="aaronn"/></a>
  <a href="https://github.com/Alphonse-arianee"><img src="https://avatars.githubusercontent.com/u/254457365?v=4&s=48" width="48" height="48" alt="Alphonse-arianee" title="Alphonse-arianee"/></a> <a href="https://github.com/atalovesyou"><img src="https://avatars.githubusercontent.com/u/3534502?v=4&s=48" width="48" height="48" alt="atalovesyou" title="atalovesyou"/></a> <a href="https://github.com/search?q=Azade"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="Azade" title="Azade"/></a> <a href="https://github.com/carlulsoe"><img src="https://avatars.githubusercontent.com/u/34673973?v=4&s=48" width="48" height="48" alt="carlulsoe" title="carlulsoe"/></a> <a href="https://github.com/search?q=ddyo"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="ddyo" title="ddyo"/></a> <a href="https://github.com/search?q=Erik"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="Erik" title="Erik"/></a> <a href="https://github.com/latitudeki5223"><img src="https://avatars.githubusercontent.com/u/119656367?v=4&s=48" width="48" height="48" alt="latitudeki5223" title="latitudeki5223"/></a> <a href="https://github.com/search?q=Manuel%20Maly"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="Manuel Maly" title="Manuel Maly"/></a> <a href="https://github.com/search?q=Mourad%20Boustani"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="Mourad Boustani" title="Mourad Boustani"/></a> <a href="https://github.com/odrobnik"><img src="https://avatars.githubusercontent.com/u/333270?v=4&s=48" width="48" height="48" alt="odrobnik" title="odrobnik"/></a>
  <a href="https://github.com/pcty-nextgen-ios-builder"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="pcty-nextgen-ios-builder" title="pcty-nextgen-ios-builder"/></a> <a href="https://github.com/search?q=Quentin"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="Quentin" title="Quentin"/></a> <a href="https://github.com/search?q=Randy%20Torres"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="Randy Torres" title="Randy Torres"/></a> <a href="https://github.com/rhjoh"><img src="https://avatars.githubusercontent.com/u/105699450?v=4&s=48" width="48" height="48" alt="rhjoh" title="rhjoh"/></a> <a href="https://github.com/ronak-guliani"><img src="https://avatars.githubusercontent.com/u/23518228?v=4&s=48" width="48" height="48" alt="ronak-guliani" title="ronak-guliani"/></a> <a href="https://github.com/search?q=William%20Stock"><img src="assets/avatar-placeholder.svg" width="48" height="48" alt="William Stock" title="William Stock"/></a>
</p>

## 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件。
