import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

// Vite配置文件：现代前端构建工具的配置
// https://vite.dev/config/
export default defineConfig({
  // 插件配置：扩展Vite功能的插件列表
  plugins: [
    // React插件：支持React JSX语法和快速刷新
    react({
      // 启用快速刷新：代码修改后页面无需完全重载，保持组件状态
      fastRefresh: true,
      // 处理的文件类型：包括jsx, js, ts, tsx文件
      include: '**/*.{jsx,js,ts,tsx}',
    }),
    // 构建分析插件：生成可视化的打包分析报告
    visualizer({
      filename: 'dist/stats.html', // 报告文件位置
      open: false, // 构建后不自动打开报告
      gzipSize: true, // 显示gzip压缩后的大小
      brotliSize: true, // 显示brotli压缩后的大小
    }),
  ],

  // CSS相关配置
  css: {
    modules: {
      // CSS Modules 配置：实现样式的模块化，避免全局污染
      localsConvention: 'camelCase', // 支持驼峰命名：class-name -> className
      generateScopedName: '[name]__[local]___[hash:base64:5]', // 类名生成规则：组件名__类名___哈希值
    },
  },

  // 开发服务器配置
  server: {
    port: 3000, // 开发服务器端口
    host: '0.0.0.0', // 允许外部访问（局域网内其他设备可访问）
    open: true, // 启动时自动打开浏览器

    // 热模块替换（HMR）配置：实现代码修改后的实时更新
    hmr: {
      port: 3000, // HMR WebSocket端口
      overlay: true, // 编译错误时在页面上显示错误覆盖层
    },

    // 文件监听配置：监听文件变化以触发重新构建
    watch: {
      usePolling: true, // 使用轮询方式监听文件变化（解决某些系统的文件监听问题）
    },
  },

  // 预览模式配置：用于预览生产构建结果
  preview: {
    port: 3001, // 预览服务器端口
    host: '0.0.0.0', // 允许外部访问
  },

  // 生产构建配置
  build: {
    // Rollup配置：Vite使用Rollup进行生产构建
    rollupOptions: {
      output: {
        // 手动代码分割：将代码拆分成多个chunk，提高加载性能
        manualChunks: {
          vendor: ['react', 'react-dom'], // React核心库单独打包
          antd: ['antd', '@ant-design/icons'], // Ant Design组件库单独打包
          utils: ['dayjs'], // 工具库单独打包
        },
      },
    },
    chunkSizeWarningLimit: 1000, // chunk大小警告阈值（KB）
    target: 'esnext', // 构建目标：使用最新的ES语法（假设现代浏览器环境）
    minify: 'esbuild', // 代码压缩工具：esbuild比terser更快
  },
});
