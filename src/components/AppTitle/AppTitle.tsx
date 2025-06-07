import { Typography } from 'antd';
import { DollarOutlined, FireOutlined } from '@ant-design/icons';
import type { ReactNode } from 'react';
import styles from './AppTitle.module.scss';

const { Title } = Typography;

// Title类型
type TitleLevel = 1 | 2 | 3 | 4 | 5;

// 应用标题组件Props
interface AppTitleProps {
  readonly disguiseMode?: boolean;
  readonly className?: string;
  readonly level?: TitleLevel;
  readonly customIcon?: ReactNode;
  readonly customTitle?: string;
}

/**
 * 应用标题组件
 * 用于显示应用的标题和图标
 */
const AppTitle = ({
  disguiseMode = false,
  className = '',
  level = 1,
  customIcon,
  customTitle,
}: AppTitleProps) => {
  const icon =
    customIcon || (disguiseMode ? <FireOutlined /> : <DollarOutlined />);
  const title = customTitle || (disguiseMode ? '卡路里燃烧器' : '薪资秒表');

  return (
    <div className={`${styles.appTitle} ${className}`}>
      <Title level={level} className={styles.title}>
        <span className={styles.icon}>{icon}</span>
        {title}
      </Title>
    </div>
  );
};

export default AppTitle;
