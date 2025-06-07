import { useState, useEffect } from 'react';
import { message } from 'antd';
import dayjs from 'dayjs';
import type { FormInstance } from 'antd';
import type { SalaryConfig, FormValues } from '@/types';

// 配置管理Hook返回类型
interface UseConfigManagerReturn {
  readonly config: SalaryConfig | null;
  readonly showSettings: boolean;
  readonly tempDisguiseMode: boolean;
  readonly handleSaveConfig: (values: FormValues) => void;
  readonly showSettingsPanel: () => void;
  readonly updateTempDisguiseMode: (checked: boolean) => void;
}

/**
 * 配置管理Hook
 */
export const useConfigManager = (
  form?: FormInstance<FormValues>
): UseConfigManagerReturn => {
  const [config, setConfig] = useState<SalaryConfig | null>(null);
  const [showSettings, setShowSettings] = useState<boolean>(true);
  const [tempDisguiseMode, setTempDisguiseMode] = useState<boolean>(false);

  // 从localStorage加载配置
  useEffect(() => {
    const savedConfig = localStorage.getItem('salaryConfig');
    if (savedConfig) {
      try {
        const parsedConfig: SalaryConfig = JSON.parse(savedConfig);
        setConfig(parsedConfig);
        setShowSettings(false);
        setTempDisguiseMode(parsedConfig.disguiseMode);

        form?.setFieldsValue({
          monthlySalary: parsedConfig.monthlySalary,
          startTime: dayjs(parsedConfig.startTime, 'HH:mm'),
          endTime: dayjs(parsedConfig.endTime, 'HH:mm'),
          disguiseMode: parsedConfig.disguiseMode,
        });
      } catch {
        localStorage.removeItem('salaryConfig');
      }
    }
  }, [form]);

  // 保存配置
  const handleSaveConfig = (values: FormValues): void => {
    const configData: SalaryConfig = {
      monthlySalary: values.monthlySalary,
      startTime: values.startTime.format('HH:mm'),
      endTime: values.endTime.format('HH:mm'),
      disguiseMode: values.disguiseMode,
    };

    setConfig(configData);
    localStorage.setItem('salaryConfig', JSON.stringify(configData));
    setShowSettings(false);
    message.success('配置保存成功！');
  };

  // 显示设置界面
  const showSettingsPanel = (): void => {
    setShowSettings(true);
    setTempDisguiseMode(config?.disguiseMode || false);
  };

  // 更新临时伪装模式
  const updateTempDisguiseMode = (checked: boolean): void => {
    setTempDisguiseMode(checked);
  };

  return {
    config,
    showSettings,
    tempDisguiseMode,
    handleSaveConfig,
    showSettingsPanel,
    updateTempDisguiseMode,
  };
};
