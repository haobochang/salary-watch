import { useState, useEffect } from 'react';
import {
  Card,
  Form,
  InputNumber,
  TimePicker,
  Button,
  Typography,
  Row,
  Col,
  Statistic,
  Space,
  message,
} from 'antd';
import { SettingOutlined, DollarOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import styles from './SalaryStopwatch.module.scss';

const { Title, Text } = Typography;

const SalaryStopwatch = () => {
  const [form] = Form.useForm();
  const [config, setConfig] = useState(null);
  const [currentEarnings, setCurrentEarnings] = useState(0);
  const [showSettings, setShowSettings] = useState(true);

  // 从localStorage加载配置
  useEffect(() => {
    const savedConfig = localStorage.getItem('salaryConfig');
    if (savedConfig) {
      const parsedConfig = JSON.parse(savedConfig);
      setConfig(parsedConfig);
      setShowSettings(false);
      form.setFieldsValue({
        monthlySalary: parsedConfig.monthlySalary,
        startTime: dayjs(parsedConfig.startTime, 'HH:mm'),
        endTime: dayjs(parsedConfig.endTime, 'HH:mm'),
      });
    }
  }, [form]);

  // 自动计算当前收入
  useEffect(() => {
    let timer;
    if (config) {
      timer = setInterval(() => {
        const now = dayjs();
        const today = now.format('YYYY-MM-DD');
        const startTime = dayjs(`${today} ${config.startTime}`);
        const endTime = dayjs(`${today} ${config.endTime}`);

        // 检查当前时间状态
        if (now.isBefore(startTime)) {
          // 还未上班，显示0
          setCurrentEarnings(0);
          return;
        } else if (now.isAfter(endTime)) {
          // 已经下班，显示全天收入（固定值）
          const dailySalary = config.monthlySalary / 22; // 假设每月22个工作日
          setCurrentEarnings(dailySalary);
          return;
        } else {
          // 工作中，实时计算收入
          const workedSeconds = now.diff(startTime, 'second');
          const totalWorkSeconds = endTime.diff(startTime, 'second');
          const dailySalary = config.monthlySalary / 22;
          const secondSalary = dailySalary / totalWorkSeconds;
          const earnings = workedSeconds * secondSalary;
          setCurrentEarnings(Math.max(0, earnings));
        }
      }, 100); // 100ms更新频率，保持丝滑
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [config]);

  const handleSaveConfig = values => {
    const configData = {
      monthlySalary: values.monthlySalary,
      startTime: values.startTime.format('HH:mm'),
      endTime: values.endTime.format('HH:mm'),
    };

    setConfig(configData);
    localStorage.setItem('salaryConfig', JSON.stringify(configData));
    setShowSettings(false);
    message.success('配置保存成功！');
  };

  const getCurrentStatus = () => {
    if (!config) return { status: '未配置', color: '#999' };

    const now = dayjs();
    const today = now.format('YYYY-MM-DD');
    const startTime = dayjs(`${today} ${config.startTime}`);
    const endTime = dayjs(`${today} ${config.endTime}`);

    if (now.isBefore(startTime)) {
      return { status: '未上班', color: '#faad14' };
    } else if (now.isAfter(endTime)) {
      return { status: '已下班', color: '#52c41a' };
    } else {
      return { status: '工作中', color: '#1890ff' };
    }
  };

  const getStatusMessage = () => {
    const { status } = getCurrentStatus();
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
  };

  const { status, color } = getCurrentStatus();

  return (
    <div className={styles.salaryStopwatch}>
      <div className={styles.container}>
        <Title level={1} className={styles.title}>
          <DollarOutlined /> 薪资秒表
        </Title>

        {showSettings ? (
          <Card title='薪资配置' className={styles.configCard}>
            <Form form={form} onFinish={handleSaveConfig} layout='vertical'>
              <Form.Item
                label='月薪（元）'
                name='monthlySalary'
                rules={[{ required: true, message: '请输入月薪' }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  min={0}
                  placeholder='请输入月薪'
                  formatter={value =>
                    `${value} 元`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={value => value.replace(/元\s?|(,*)/g, '')}
                />
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label='上班时间'
                    name='startTime'
                    rules={[{ required: true, message: '请选择上班时间' }]}
                  >
                    <TimePicker
                      style={{ width: '100%' }}
                      format='HH:mm'
                      placeholder='选择上班时间'
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label='下班时间'
                    name='endTime'
                    rules={[{ required: true, message: '请选择下班时间' }]}
                  >
                    <TimePicker
                      style={{ width: '100%' }}
                      format='HH:mm'
                      placeholder='选择下班时间'
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item>
                <Button type='primary' htmlType='submit' block size='large'>
                  保存配置
                </Button>
              </Form.Item>
            </Form>
          </Card>
        ) : (
          <>
            <Card className={styles.statusCard}>
              <Row gutter={24}>
                <Col span={8}>
                  <Statistic
                    title='当前状态'
                    value={status}
                    valueStyle={{ color }}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title='月薪'
                    value={config?.monthlySalary}
                    suffix='元'
                    formatter={value => value?.toLocaleString()}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title='工作时间'
                    value={`${config?.startTime} - ${config?.endTime}`}
                  />
                </Col>
              </Row>
            </Card>

            <Card className={styles.earningsCard}>
              <div className={styles.earningsDisplay}>
                <Title level={2} className={styles.earningsTitle}>
                  今日收入
                </Title>
                <div className={styles.earningsAmount}>
                  {currentEarnings.toFixed(4)} 元
                </div>
                <Text type='secondary'>{getStatusMessage()}</Text>
                {config && status === '工作中' && (
                  <div
                    style={{
                      marginTop: '10px',
                      fontSize: '12px',
                      color: '#666',
                    }}
                  >
                    每秒收入:{' '}
                    {(
                      config.monthlySalary /
                      22 /
                      dayjs(`2024-01-01 ${config.endTime}`).diff(
                        dayjs(`2024-01-01 ${config.startTime}`),
                        'second'
                      )
                    ).toFixed(6)}{' '}
                    元
                  </div>
                )}
              </div>
            </Card>

            <Card className={styles.controlCard}>
              <Space size='large'>
                <Button
                  icon={<SettingOutlined />}
                  onClick={() => setShowSettings(true)}
                >
                  修改配置
                </Button>
              </Space>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default SalaryStopwatch;
