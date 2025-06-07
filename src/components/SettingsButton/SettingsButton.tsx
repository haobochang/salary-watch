import { Button } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import type { ReactNode } from 'react';
import styles from './SettingsButton.module.scss';

// Button类型
type ButtonType = 'primary' | 'default' | 'dashed' | 'link' | 'text';
type ButtonSize = 'small' | 'middle' | 'large';

// 设置按钮组件Props
interface SettingsButtonProps {
  readonly onClick: () => void;
  readonly className?: string;
  readonly icon?: ReactNode;
  readonly size?: ButtonSize;
  readonly type?: ButtonType;
}

/**
 * 设置按钮组件
 * 用于切换显示配置界面
 */
const SettingsButton = ({
  onClick,
  className = '',
  icon = <SettingOutlined />,
  size = 'large',
  type = 'default',
}: SettingsButtonProps) => {
  return (
    <Button
      type={type}
      size={size}
      icon={icon}
      onClick={onClick}
      className={`${styles.settingsButton} ${className}`}
    >
      设置
    </Button>
  );
};

export default SettingsButton;
