# 薪资秒表 💰

一个实时显示当天已赚取收入的React应用，让你直观感受每一秒的价值！

## ✨ 功能特性

- **实时收入计算** - 以秒为单位实时显示当前收入
- **个性化配置** - 设置月薪、上下班时间
- **状态显示** - 显示当前工作状态（未上班/工作中/已下班）
- **响应式设计** - 完美适配手机、平板、桌面端
- **数据持久化** - 配置信息自动保存到本地存储

## 🚀 技术栈

### 前端框架
- **React 19** - 最新版本的React，支持并发特性
- **Vite 6** - 现代化构建工具，开发体验极佳

### UI组件库
- **Ant Design 5** - 企业级UI组件库
- **@ant-design/icons** - 图标组件

### 样式方案
- **Sass** - CSS预处理器，支持变量、嵌套、混合器
- **CSS Modules** - 样式模块化，避免全局污染

### 工具库
- **Day.js** - 轻量级日期时间库（2KB），Moment.js的现代替代

### 开发工具
- **ESLint 9** - 代码质量检查
- **Prettier** - 代码格式化
- **Rollup Plugin Visualizer** - 构建分析工具

## 📦 项目结构

```
salary-watch/
├── public/                 # 静态资源
├── src/
│   ├── components/        # React组件
│   │   ├── SalaryStopwatch.jsx          # 主组件
│   │   └── SalaryStopwatch.module.scss  # 组件样式
│   ├── App.jsx           # 根组件
│   ├── App.module.scss   # 应用样式
│   ├── main.jsx          # 应用入口
│   └── index.scss        # 全局样式
├── vite.config.js        # Vite配置
├── eslint.config.js      # ESLint配置
└── package.json          # 项目配置
```

## 🛠️ 开发指南

### 环境要求
- Node.js 18+
- npm 或 yarn

### 安装依赖
```bash
npm install
```

### 开发命令

```bash
# 启动开发服务器（支持热重载）
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview

# 代码质量检查
npm run lint

# 自动修复代码问题
npm run lint:fix

# 格式化代码
npm run format
```

### 开发服务器特性
- **热模块替换** - 代码修改后无需刷新页面
- **错误覆盖层** - 编译错误直接显示在页面上
- **自动打开浏览器** - 启动后自动打开默认浏览器
- **局域网访问** - 支持手机等设备访问测试

## 🏗️ 构建优化

### 代码分割
- **vendor.js** - React核心库
- **antd.js** - Ant Design组件库
- **utils.js** - 工具库（Day.js等）

### 性能特性
- **Tree Shaking** - 自动移除未使用代码
- **代码压缩** - 使用esbuild压缩，比terser更快
- **Gzip/Brotli压缩** - 支持现代压缩算法

## 💡 核心算法

### 收入计算公式
```javascript
// 日薪计算
const dailySalary = monthlySalary / 22; // 假设每月22个工作日

// 每秒收入
const totalWorkSeconds = endTime.diff(startTime, 'second');
const secondSalary = dailySalary / totalWorkSeconds;

// 当前收入
const workedSeconds = now.diff(startTime, 'second');
const currentEarnings = workedSeconds * secondSalary;
```

### 实时更新机制
- 使用 `setInterval` 每100ms更新一次
- 精确到秒级的时间计算
- 使用 `useEffect` 清理定时器防止内存泄漏

## 📱 响应式设计

### 断点设计
- **手机端**: < 768px
- **平板端**: 768px - 1024px
- **桌面端**: 1024px - 1200px
- **大屏端**: > 1200px
- **超宽屏**: > 1600px

### 适配策略
- 移动端优先的设计理念
- 弹性布局和流式网格
- 根据屏幕尺寸调整字体大小和间距

## 🎨 设计特色

### 视觉设计
- **渐变背景** - 现代感的紫色渐变
- **毛玻璃效果** - backdrop-filter实现的透明效果
- **卡片阴影** - 层次分明的阴影设计
- **动画过渡** - 流畅的悬停和点击效果

### 交互体验
- **即时反馈** - 按钮悬停效果
- **状态指示** - 清晰的工作状态显示
- **数据持久化** - 配置自动保存
- **错误提示** - 友好的用户提示

## 🔧 开发注意事项

### CSS Modules使用
```javascript
// 导入样式
import styles from './Component.module.scss';

// 使用类名
<div className={styles.container}>
  <div className={styles.titleText}>
</div>

// 访问全局类名（如Ant Design）
:global(.ant-card-body) {
  padding: 20px;
}
```

### Day.js时间处理
```javascript
// 创建时间对象
const now = dayjs();
const startTime = dayjs('09:00', 'HH:mm');

// 时间比较
if (now.isBefore(startTime)) {
  // 还没到上班时间
}

// 计算时间差
const workedSeconds = now.diff(startTime, 'second');
```

### React Hooks最佳实践
```javascript
// useEffect依赖数组
useEffect(() => {
  // 副作用逻辑
}, [dependency1, dependency2]); // 明确列出所有依赖

// 清理函数
useEffect(() => {
  const timer = setInterval(() => {}, 1000);
  
  return () => {
    clearInterval(timer); // 清理定时器
  };
}, []);
```

## 📈 性能优化建议

1. **避免不必要的重渲染** - 使用React.memo包装纯组件
2. **合理使用useCallback** - 缓存函数引用
3. **懒加载组件** - 使用React.lazy动态导入
4. **优化图片资源** - 使用WebP格式和合适尺寸
5. **减少Bundle大小** - 按需引入第三方库

## 🤝 贡献指南

1. Fork本项目
2. 创建功能分支: `git checkout -b feature/amazing-feature`
3. 提交更改: `git commit -m 'Add amazing feature'`
4. 推送分支: `git push origin feature/amazing-feature`
5. 提交Pull Request

## 📄 许可证

本项目采用MIT许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

---

**享受每一秒的价值！** ⏰💎
