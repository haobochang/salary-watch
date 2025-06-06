// ESLint配置文件：定义代码质量和格式化规则
import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import react from 'eslint-plugin-react';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    // 忽略dist目录：构建产物不需要检查
    ignores: ['dist'],
  },
  {
    // 应用于所有JS和JSX文件
    files: ['**/*.{js,jsx}'],

    // 语言选项配置
    languageOptions: {
      ecmaVersion: 2020, // 支持ES2020语法
      sourceType: 'module', // 使用ES模块系统
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // 启用JSX语法支持
        },
      },
      // 全局变量定义：防止ESLint报告这些全局变量为未定义
      globals: {
        window: 'readonly', // 浏览器window对象
        document: 'readonly', // DOM document对象
        console: 'readonly', // 控制台对象
        process: 'readonly', // Node.js process对象
        localStorage: 'readonly', // 浏览器本地存储
        setInterval: 'readonly', // 定时器函数
        clearInterval: 'readonly', // 清除定时器函数
      },
    },

    // React相关设置
    settings: {
      react: {
        version: 'detect', // 自动检测React版本
      },
    },

    // 插件配置：扩展ESLint功能的插件
    plugins: {
      react, // React相关规则
      'react-hooks': reactHooks, // React Hooks规则
      'react-refresh': reactRefresh, // 热刷新相关规则
      prettier, // 代码格式化规则
    },

    // 规则配置：定义具体的检查规则
    rules: {
      // 继承推荐的基础规则
      ...js.configs.recommended.rules, // JavaScript基础规则
      ...react.configs.recommended.rules, // React推荐规则
      ...reactHooks.configs.recommended.rules, // React Hooks规则
      ...prettierConfig.rules, // Prettier兼容性规则

      // React快速刷新：只有导出组件的文件才允许快速刷新
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }, // 允许导出常量
      ],

      // React 17+不需要在JSX文件中导入React
      'react/react-in-jsx-scope': 'off',

      // 关闭PropTypes检查：使用TypeScript时不需要
      'react/prop-types': 'off',

      // Prettier格式化规则：统一代码风格
      'prettier/prettier': [
        'error', // 格式化错误视为ESLint错误
        {
          printWidth: 80, // 单行最大字符数
          tabWidth: 2, // 缩进宽度
          useTabs: false, // 使用空格而不是Tab
          semi: true, // 语句末尾加分号
          singleQuote: true, // 使用单引号
          jsxSingleQuote: true, // JSX中使用单引号
          trailingComma: 'es5', // 对象和数组末尾加逗号（ES5兼容）
          bracketSpacing: true, // 对象大括号内加空格
          bracketSameLine: false, // JSX标签的>换行
          arrowParens: 'avoid', // 箭头函数单参数不加括号
          endOfLine: 'lf', // 使用LF换行符
        },
      ],
    },
  },
];
