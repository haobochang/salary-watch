import { useState, useEffect } from 'react';
import type { SalaryConfig } from '@/types';
import { UPDATE_INTERVAL } from '@/types';
import { calculateCurrentEarnings } from '../utils/salaryHelpers';

/**
 * 薪资计算Hook
 * @param config 薪资配置
 * @returns 当前收入
 */
export const useSalaryCalculator = (config: SalaryConfig | null): number => {
  const [currentEarnings, setCurrentEarnings] = useState<number>(0);

  useEffect(() => {
    if (!config) {
      setCurrentEarnings(0);
      return;
    }

    const updateEarnings = (): void => {
      const earnings = calculateCurrentEarnings(config);
      setCurrentEarnings(earnings);
    };

    // 立即更新一次
    updateEarnings();

    const timer: ReturnType<typeof setInterval> = setInterval(
      updateEarnings,
      UPDATE_INTERVAL
    );

    return () => {
      clearInterval(timer);
    };
  }, [config]);

  return currentEarnings;
};
