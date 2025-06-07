import type { SalaryConfig } from '@/types';

/**
 * 获取状态消息
 * @param status 当前状态
 * @param disguiseMode 是否为伪装模式
 * @returns 状态消息字符串
 */
export const getStatusMessage = (
  status: string,
  disguiseMode?: boolean
): string => {
  if (disguiseMode) {
    switch (status) {
      case '准备运动':
        return '💪 准备开始燃烧卡路里';
      case '运动中':
        return '🔥 正在燃烧卡路里中...';
      case '运动完成':
        return '🎉 今日运动完成！';
      default:
        return '请先配置运动计划';
    }
  } else {
    switch (status) {
      case '未上班':
        return '😴 还没到上班时间';
      case '工作中':
        return '💰 每秒都在赚钱中...';
      case '已下班':
        return '🎉 今日工作完成！';
      default:
        return '请先配置薪资信息';
    }
  }
};

/**
 * 获取显示标题
 * @param disguiseMode 是否为伪装模式
 * @param customTitle 自定义标题
 * @returns 显示标题
 */
export const getDisplayTitle = (
  disguiseMode?: boolean,
  customTitle?: string
): string => {
  if (customTitle) return customTitle;
  return disguiseMode ? '今日燃烧' : '今日收入';
};

/**
 * 检查是否应该显示速率信息
 * @param config 薪资配置
 * @param status 当前状态
 * @returns 是否显示速率信息
 */
export const shouldShowRateInfo = (
  config: SalaryConfig | null,
  status: string
): boolean => {
  return Boolean(config && (status === '工作中' || status === '运动中'));
};
