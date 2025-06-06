import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // 启用快速刷新
      fastRefresh: true,
      // 增强开发体验
      include: '**/*.{jsx,js,ts,tsx}',
    }),
    visualizer({
      filename: 'dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],

  css: {
    modules: {
      // CSS Modules 配置
      localsConvention: 'camelCase', // 支持驼峰命名
      generateScopedName: '[name]__[local]___[hash:base64:5]', // 类名生成规则
    },
  },

  server: {
    port: 3000,
    host: '0.0.0.0',
    open: true, // 自动打开浏览器
    hmr: {
      port: 3000,
      overlay: true, // 显示错误覆盖层
    },
    // 启用热重载
    watch: {
      usePolling: true,
    },
  },
  preview: {
    port: 3001,
    host: '0.0.0.0',
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          antd: ['antd', '@ant-design/icons'],
          utils: ['dayjs'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    target: 'esnext',
    minify: 'esbuild',
  },
});
