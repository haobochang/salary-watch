# 薪资秒表 💰

一个精美的前端薪资计算应用，可以实时显示你今天已经赚了多少钱！

## 🌟 功能特性

- 📊 **实时收入计算** - 基于当前时间实时显示今日收入
- ⚙️ **简单配置** - 只需输入月薪和工作时间
- 💾 **本地存储** - 配置信息自动保存到浏览器
- 📱 **响应式设计** - 支持手机和电脑访问
- 🎨 **现代化UI** - 基于Ant Design的精美界面
- 🎯 **CSS Modules** - 模块化样式管理，避免样式冲突

## 🛠️ 技术栈

- ⚛️ React 19
- ⚡ Vite
- 🐜 Ant Design
- 📏 ESLint 9.0 + Prettier
- 📅 Day.js
- 🎨 Sass + CSS Modules

## 🚀 快速开始

### 安装依赖
\`\`\`bash
npm install
\`\`\`

### 启动开发服务器
\`\`\`bash
npm run dev
\`\`\`

### 构建生产版本
\`\`\`bash
npm run build
\`\`\`

### 代码检查和格式化
\`\`\`bash
npm run lint          # 检查代码质量
npm run lint:fix       # 自动修复问题
npm run format         # 格式化代码
\`\`\`

## 📖 使用说明

1. **首次使用配置**
   - 输入你的月薪
   - 设置每天的上班和下班时间
   - 点击"保存配置"

2. **开始计时**
   - 点击"开始计时"按钮
   - 应用会根据当前时间实时计算今日收入

3. **查看收入**
   - 主界面显示今日已赚取的金额
   - 状态栏显示当前工作状态（未上班/工作中/已下班）

## 💡 计算原理

- 日薪 = 月薪 / 22（每月工作日）
- 秒薪资 = 日薪 / 工作时长（秒）
- 当前收入 = 已工作秒数 × 秒薪资

## 🎯 特色亮点

- ✨ 渐变色背景，视觉效果优雅
- 🔄 实时更新，每0.1秒刷新收入数据
- 📱 移动端适配，随时随地查看
- 🛡️ 类型安全，ESLint严格检查
- 🎨 CSS Modules，样式模块化管理

## 🎨 CSS Modules 使用示例

本项目使用 CSS Modules 进行样式管理，支持以下特性：

### 基本用法
\`\`\`jsx
import styles from './Component.module.scss';

function Component() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>标题</h1>
      <button className={styles.primaryBtn}>按钮</button>
    </div>
  );
}
\`\`\`

### Sass 变量和混合器
\`\`\`scss
// 自动导入全局变量和混合器
.container {
  background: $primary-gradient;
  @include flex-center;
}

.primaryBtn {
  @include gradient-button($success-gradient, #52c41a);
}
\`\`\`

### 类名约定
- **camelCase**: \`className={styles.primaryBtn}\`
- **kebab-case**: 自动转换为 camelCase
- **全局样式**: 使用 \`:global(.ant-*)\` 访问 Ant Design 类名

## 📁 项目结构

\`\`\`
src/
├── components/
│   ├── SalaryStopwatch.jsx
│   └── SalaryStopwatch.module.scss
├── styles/
│   ├── _variables.scss     # 全局变量
│   └── _mixins.scss        # 混合器和工具函数
├── App.jsx
├── App.module.scss
├── index.scss              # 全局基础样式
└── main.jsx
\`\`\`

## 🔧 开发特性

- **热重载**: 保存时自动刷新浏览器
- **样式作用域**: CSS Modules 避免样式冲突
- **代码质量**: ESLint + Prettier 自动格式化
- **构建优化**: 代码分割，优化加载性能

## �� 许可证

MIT License
