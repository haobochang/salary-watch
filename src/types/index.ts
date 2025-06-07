import dayjs from 'dayjs';

// 常量类型定义
export const WORK_DAYS_PER_MONTH = 22 as const;
export const UPDATE_INTERVAL = 100 as const;

// 从dayjs命名空间导出Dayjs类型
export type Dayjs = dayjs.Dayjs;

// 薪资配置类型
export interface SalaryConfig {
  readonly monthlySalary: number;
  readonly startTime: string;
  readonly endTime: string;
  readonly disguiseMode: boolean;
}

// 状态信息类型
export interface StatusInfo {
  readonly status: string;
  readonly color: string;
}

// Form表单值类型
export interface FormValues {
  monthlySalary: number;
  startTime: Dayjs;
  endTime: Dayjs;
  disguiseMode: boolean;
}
