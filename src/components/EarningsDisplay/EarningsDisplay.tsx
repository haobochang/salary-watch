import { Typography, Card } from 'antd';
import styles from './EarningsDisplay.module.scss';

const { Title, Text } = Typography;

// 收入显示组件Props
interface EarningsDisplayProps {
  readonly title: string;
  readonly displayValue: string | number;
  readonly unit: string;
  readonly statusMessage?: string;
  readonly rateInfo?: string;
  readonly showRateInfo?: boolean;
  readonly className?: string;
}

/**
 * 收入显示组件
 * 用于显示当前收入或燃烧的卡路里
 */
const EarningsDisplay = ({
  title,
  displayValue,
  unit,
  statusMessage = '',
  rateInfo = '',
  showRateInfo = false,
  className = '',
}: EarningsDisplayProps) => {
  return (
    <Card className={`${styles.earningsCard} ${className || ''}`}>
      <div className={styles.content}>
        <Title level={4} className={styles.title}>
          {title}
        </Title>

        <div className={styles.earningsValue}>
          <span className={styles.value}>{displayValue}</span>
          <span className={styles.unit}>{unit}</span>
        </div>

        {statusMessage && (
          <Text type='secondary' className={styles.statusMessage}>
            {statusMessage}
          </Text>
        )}

        {showRateInfo && rateInfo && (
          <Text type='secondary' className={styles.rateInfo}>
            {rateInfo}
          </Text>
        )}
      </div>
    </Card>
  );
};

export default EarningsDisplay;
