 # AI Chatbot with Next.js

一个基于 Next.js 15 和 Fireworks AI 的智能聊天机器人应用。

## 功能特性

- 🤖 基于 Fireworks AI 的智能对话
- 💬 实时流式响应
- 🎨 现代化的 UI 设计
- 📱 响应式设计，支持移动端
- ⚡ 基于 Next.js 15 和 App Router

## 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/enzeberg/ai-chatbot-nextjs.git
cd ai-chatbot-nextjs
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

创建 `.env.local` 文件并添加你的 Fireworks API Key：

```bash
# Fireworks AI API Key
FIREWORKS_API_KEY=your_fireworks_api_key_here

# Next.js configuration
NEXT_PUBLIC_APP_NAME=AI Chatbot
```

### 4. 获取 Fireworks API Key

1. 访问 [Fireworks AI](https://fireworks.ai/)
2. 注册账户并登录
3. 在 API Keys 页面创建新的 API Key
4. 将 API Key 复制到 `.env.local` 文件中

### 5. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 项目结构

```
ai-chatbot-nextjs/
├── app/                    # Next.js App Router
│   ├── api/               # API 路由
│   │   └── chat/         # 聊天 API
│   ├── globals.css       # 全局样式
│   ├── layout.tsx        # 根布局
│   └── page.tsx          # 首页
├── components/            # React 组件
│   ├── ui/              # UI 基础组件
│   ├── ChatInterface.tsx # 聊天界面
│   ├── ChatInput.tsx    # 输入组件
│   └── ChatMessage.tsx  # 消息组件
├── hooks/               # 自定义 Hooks
├── lib/                 # 工具库
└── public/              # 静态资源
```

## 技术栈

- **前端框架**: Next.js 15 (App Router)
- **UI 组件**: Radix UI + Tailwind CSS
- **AI SDK**: Vercel AI SDK
- **AI 服务**: Fireworks AI
- **语言**: TypeScript

## 部署

### Vercel 部署

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 在环境变量中设置 `FIREWORKS_API_KEY`
4. 部署完成

### 其他平台

确保在部署平台的环境变量中设置 `FIREWORKS_API_KEY`。

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 代码检查
npm run lint
```

## 许可证

MIT License