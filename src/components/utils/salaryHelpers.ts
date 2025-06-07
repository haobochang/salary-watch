import dayjs from 'dayjs';
import type { SalaryConfig, StatusInfo } from '@/types';
import { WORK_DAYS_PER_MONTH } from '@/types';

/**
 * 获取当前工作状态
 * @param config 薪资配置
 * @returns 状态信息
 */
export const getCurrentStatus = (config: SalaryConfig | null): StatusInfo => {
  if (!config) return { status: '未配置', color: '#999' };

  const now = dayjs();
  const today = now.format('YYYY-MM-DD');
  const startTime = dayjs(`${today} ${config.startTime}`);
  const endTime = dayjs(`${today} ${config.endTime}`);

  const isDisguise = config.disguiseMode;

  if (now.isBefore(startTime)) {
    return {
      status: isDisguise ? '准备运动' : '未上班',
      color: '#faad14',
    };
  } else if (now.isAfter(endTime)) {
    return {
      status: isDisguise ? '运动完成' : '已下班',
      color: '#52c41a',
    };
  } else {
    return {
      status: isDisguise ? '运动中' : '工作中',
      color: '#1890ff',
    };
  }
};

/**
 * 计算当前收入
 * @param config 薪资配置
 * @returns 当前收入金额
 */
export const calculateCurrentEarnings = (
  config: SalaryConfig | null
): number => {
  if (!config) return 0;

  const now = dayjs();
  const today = now.format('YYYY-MM-DD');
  const startTime = dayjs(`${today} ${config.startTime}`);
  const endTime = dayjs(`${today} ${config.endTime}`);

  // 检查当前时间状态
  if (now.isBefore(startTime)) {
    return 0;
  } else if (now.isAfter(endTime)) {
    const dailySalary = config.monthlySalary / WORK_DAYS_PER_MONTH;
    return dailySalary;
  } else {
    const workedSeconds = now.diff(startTime, 'second');
    const totalWorkSeconds = endTime.diff(startTime, 'second');
    const dailySalary = config.monthlySalary / WORK_DAYS_PER_MONTH;
    const secondSalary = dailySalary / totalWorkSeconds;
    const earnings = workedSeconds * secondSalary;
    return Math.max(0, earnings);
  }
};

/**
 * 格式化显示值
 * @param currentEarnings 当前收入
 * @param disguiseMode 是否为伪装模式
 * @returns 格式化后的显示值
 */
export const formatDisplayValue = (
  currentEarnings: number,
  disguiseMode?: boolean
): string => {
  if (disguiseMode) {
    // 伪装模式下直接显示卡路里（与薪资数值1:1对应）
    return currentEarnings.toFixed(2);
  }
  return currentEarnings.toFixed(4);
};

/**
 * 获取显示单位
 * @param disguiseMode 是否为伪装模式
 * @returns 显示单位
 */
export const getUnit = (disguiseMode?: boolean): string => {
  return disguiseMode ? '卡路里' : '元';
};

/**
 * 获取速率文本信息
 * @param config 薪资配置
 * @returns 速率文本
 */
export const getSecondRateText = (config: SalaryConfig | null): string => {
  if (!config) return '';

  const totalWorkSeconds = dayjs(`2024-01-01 ${config.endTime}`).diff(
    dayjs(`2024-01-01 ${config.startTime}`),
    'second'
  );

  if (config.disguiseMode) {
    const secondCalories =
      config.monthlySalary / WORK_DAYS_PER_MONTH / totalWorkSeconds;
    return `每秒燃烧: ${secondCalories.toFixed(2)} 卡路里`;
  } else {
    const secondSalary =
      config.monthlySalary / WORK_DAYS_PER_MONTH / totalWorkSeconds;
    return `每秒收入: ${secondSalary.toFixed(6)} 元`;
  }
};
