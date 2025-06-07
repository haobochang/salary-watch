# 薪资秒表组件 (TypeScript版本)

这是一个完全使用TypeScript开发的模块化薪资/卡路里燃烧计时器组件，支持伪装模式。

## 🚀 技术栈

- **TypeScript** - 完整的类型安全
- **React 19** - 现代React特性
- **Ant Design** - UI组件库
- **Day.js** - 日期时间处理
- **SCSS Modules** - 样式解决方案
- **Vite** - 构建工具

## 📁 项目结构

```
src/
├── types/                    # TypeScript类型定义
│   ├── index.ts             # 主要类型定义
│   └── global.d.ts          # 全局类型声明
├── components/              # 组件目录
│   ├── hooks/              # 自定义Hook
│   │   ├── useSalaryCalculator.ts
│   │   └── useConfigManager.ts
│   ├── utils/              # 工具函数
│   │   └── messageHelpers.ts
│   ├── ConfigForm/         # 配置表单组件
│   ├── EarningsDisplay/    # 收入显示组件
│   ├── SettingsButton/     # 设置按钮组件
│   ├── AppTitle/          # 应用标题组件
│   ├── SalaryStopwatch.tsx # 主组件
│   └── index.ts           # 组件导出
├── App.tsx                 # 应用主组件
└── main.tsx               # 应用入口
```

## 🔧 类型定义

### 核心类型

```typescript
interface SalaryConfig {
  monthlySalary: number;
  startTime: string;
  endTime: string;
  disguiseMode: boolean;
}

interface StatusInfo {
  status: string;
  color: string;
}

interface FormValues {
  monthlySalary: number;
  startTime: any; // dayjs对象
  endTime: any; // dayjs对象
  disguiseMode: boolean;
}
```

### 组件Props类型

```typescript
interface ConfigFormProps {
  form: FormInstance<FormValues>;
  onSaveConfig: (values: FormValues) => void;
  tempDisguiseMode?: boolean;
  onDisguiseModeChange?: (checked: boolean) => void;
  title?: string;
}

interface EarningsDisplayProps {
  title: string;
  displayValue: string | number;
  unit: string;
  statusMessage?: string;
  rateInfo?: string;
  showRateInfo?: boolean;
  className?: string;
}
```

## 📝 使用示例

### 基本使用

```typescript
import { SalaryStopwatch } from './components';

const App: React.FC = () => {
  return <SalaryStopwatch />;
};
```

### 使用自定义Hook

```typescript
import { useSalaryCalculator, useConfigManager } from './components';
import { Form } from 'antd';

const CustomComponent: React.FC = () => {
  const [form] = Form.useForm();
  const { config } = useConfigManager(form);
  const currentEarnings = useSalaryCalculator(config);

  return <div>当前收入: {currentEarnings}</div>;
};
```

### 单独使用子组件

```typescript
import { EarningsDisplay, AppTitle } from './components';
import type { EarningsDisplayProps } from './components';

const CustomApp: React.FC = () => {
  const earningsProps: EarningsDisplayProps = {
    title: "今日收入",
    displayValue: "1234.56",
    unit: "元",
    statusMessage: "正在工作中...",
    showRateInfo: true,
    rateInfo: "每秒收入: 0.05 元"
  };

  return (
    <div>
      <AppTitle disguiseMode={false} />
      <EarningsDisplay {...earningsProps} />
    </div>
  );
};
```

## 🛡️ 类型安全特性

1. **完整的TypeScript支持** - 所有组件和函数都有完整的类型定义
2. **Props类型检查** - 编译时检查组件Props的类型正确性
3. **Hook类型安全** - 自定义Hook的输入输出都有严格的类型定义
4. **工具函数类型化** - 所有工具函数都有明确的输入输出类型
5. **配置类型验证** - 配置对象的类型安全保证

## 🎨 开发特性

- **代码提示** - 完整的IDE代码补全和提示
- **编译时检查** - 在构建时发现类型错误
- **重构安全** - 重命名和重构时的类型保护
- **文档化** - JSDoc注释提供函数和组件的详细说明

## 🔧 构建和开发

```bash
# 安装依赖
npm install

# 开发模式启动
npm run dev

# 类型检查
npx tsc --noEmit

# 构建生产版本
npm run build

# 代码格式化
npm run lint:fix
```

## 📈 扩展和定制

项目结构支持轻松扩展：

1. **添加新组件** - 在对应目录创建新的.tsx文件
2. **扩展类型** - 在types/index.ts中添加新的类型定义
3. **新增Hook** - 在hooks目录创建新的自定义Hook
4. **工具函数** - 在utils目录添加类型化的工具函数

## 🏆 最佳实践

1. 所有组件都使用React.FC类型
2. Props使用interface定义，支持可选参数
3. Hook返回值使用明确的类型定义
4. 工具函数提供JSDoc注释
5. 使用严格的TypeScript配置确保类型安全 