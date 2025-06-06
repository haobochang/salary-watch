// React应用的入口文件
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss'; // 全局样式
import App from './App.jsx';

/*
  React 18的新API：createRoot
  相比React 17的ReactDOM.render，提供了更好的并发特性支持
  
  StrictMode：React的严格模式
  - 帮助发现组件中的副作用
  - 验证过时的API使用
  - 在开发环境下进行额外的检查
  生产环境下StrictMode不会产生任何影响
*/
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
