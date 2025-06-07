import { Form } from 'antd';
import { useSalaryCalculator } from './hooks/useSalaryCalculator';
import { useConfigManager } from './hooks/useConfigManager';
import {
  getCurrentStatus,
  formatDisplayValue,
  getUnit,
  getSecondRateText,
} from './utils/salaryHelpers';
import {
  getStatusMessage,
  getDisplayTitle,
  shouldShowRateInfo,
} from './utils/messageHelpers';
import EarningsDisplay from './EarningsDisplay/EarningsDisplay';
import SettingsButton from './SettingsButton/SettingsButton';
import AppTitle from './AppTitle/AppTitle';
import styles from './SalaryStopwatch.module.scss';

import ConfigForm from './ConfigForm/ConfigForm';
/**
 * 薪资秒表主组件
 * 支持实时计算薪资收入和伪装模式（卡路里燃烧器）
 */
const SalaryStopwatch = () => {
  const [form] = Form.useForm();

  // 使用自定义Hook管理配置
  const {
    config,
    showSettings,
    tempDisguiseMode,
    handleSaveConfig,
    showSettingsPanel,
    updateTempDisguiseMode,
  } = useConfigManager(form);

  // 使用自定义Hook计算收入
  const currentEarnings = useSalaryCalculator(config);

  // 获取当前状态
  const { status } = getCurrentStatus(config);

  return (
    <div className={styles.salaryStopwatch}>
      <div className={styles.container}>
        <AppTitle
          disguiseMode={showSettings ? tempDisguiseMode : config?.disguiseMode}
        />

        {showSettings ? (
          <ConfigForm
            form={form}
            onSaveConfig={handleSaveConfig}
            tempDisguiseMode={tempDisguiseMode}
            onDisguiseModeChange={updateTempDisguiseMode}
          />
        ) : (
          <>
            <SettingsButton onClick={showSettingsPanel} />

            <EarningsDisplay
              title={getDisplayTitle(config?.disguiseMode)}
              displayValue={formatDisplayValue(
                currentEarnings,
                config?.disguiseMode
              )}
              unit={getUnit(config?.disguiseMode)}
              statusMessage={getStatusMessage(status, config?.disguiseMode)}
              rateInfo={getSecondRateText(config)}
              showRateInfo={shouldShowRateInfo(config, status)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default SalaryStopwatch;
