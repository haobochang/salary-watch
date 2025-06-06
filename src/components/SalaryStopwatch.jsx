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
  message,
  Switch,
} from 'antd';
import {
  SettingOutlined,
  DollarOutlined,
  FireOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import styles from './SalaryStopwatch.module.scss';

const { Title } = Typography;

const SalaryStopwatch = () => {
  const [form] = Form.useForm();
  const [config, setConfig] = useState(null);
  const [currentEarnings, setCurrentEarnings] = useState(0);
  const [showSettings, setShowSettings] = useState(true);
  const [tempDisguiseMode, setTempDisguiseMode] = useState(false);

  // 从localStorage加载配置
  useEffect(() => {
    const savedConfig = localStorage.getItem('salaryConfig');
    if (savedConfig) {
      const parsedConfig = JSON.parse(savedConfig);
      setConfig(parsedConfig);
      setShowSettings(false);
      setTempDisguiseMode(parsedConfig.disguiseMode || false);
      form.setFieldsValue({
        monthlySalary: parsedConfig.monthlySalary,
        startTime: dayjs(parsedConfig.startTime, 'HH:mm'),
        endTime: dayjs(parsedConfig.endTime, 'HH:mm'),
        disguiseMode: parsedConfig.disguiseMode || false,
      });
    } else {
      // 如果没有保存的配置，设置默认值
      setTempDisguiseMode(false);
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
      disguiseMode: values.disguiseMode || false,
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

  const getStatusMessage = () => {
    const { status } = getCurrentStatus();
    const isDisguise = config?.disguiseMode;

    if (isDisguise) {
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

  const getDisplayValue = () => {
    if (!config) return 0;

    if (config.disguiseMode) {
      // 伪装模式下转换为卡路里：假设1元=10卡路里
      return (currentEarnings * 10).toFixed(2);
    }
    return currentEarnings.toFixed(4);
  };

  const getUnit = () => {
    return config?.disguiseMode ? '卡路里' : '元';
  };

  const getMainTitle = () => {
    return config?.disguiseMode ? '卡路里燃烧器' : '薪资秒表';
  };

  const getMainIcon = () => {
    return config?.disguiseMode ? <FireOutlined /> : <DollarOutlined />;
  };

  const getEarningsTitle = () => {
    return config?.disguiseMode ? '今日燃烧' : '今日收入';
  };

  const getSecondRateText = () => {
    if (!config) return '';

    const totalWorkSeconds = dayjs(`2024-01-01 ${config.endTime}`).diff(
      dayjs(`2024-01-01 ${config.startTime}`),
      'second'
    );

    if (config.disguiseMode) {
      const secondCalories =
        (config.monthlySalary / 22 / totalWorkSeconds) * 10;
      return `每秒燃烧: ${secondCalories.toFixed(2)} 卡路里`;
    } else {
      const secondSalary = config.monthlySalary / 22 / totalWorkSeconds;
      return `每秒收入: ${secondSalary.toFixed(6)} 元`;
    }
  };

  const { status } = getCurrentStatus();

  return (
    <div className={styles.salaryStopwatch}>
      <div className={styles.container}>
        <Title level={1} className={styles.title}>
          {showSettings ? (
            tempDisguiseMode ? (
              <FireOutlined />
            ) : (
              <DollarOutlined />
            )
          ) : (
            getMainIcon()
          )}{' '}
          {showSettings
            ? tempDisguiseMode
              ? '卡路里燃烧器'
              : '薪资秒表'
            : getMainTitle()}
        </Title>

        {showSettings ? (
          <Card
            title={tempDisguiseMode ? '运动配置' : '薪资配置'}
            className={styles.configCard}
          >
            <Form form={form} onFinish={handleSaveConfig} layout='vertical'>
              <Form.Item
                label='伪装模式'
                name='disguiseMode'
                valuePropName='checked'
                extra='开启后界面将显示为卡路里燃烧应用'
              >
                <Switch onChange={checked => setTempDisguiseMode(checked)} />
              </Form.Item>

              <Form.Item
                label={
                  tempDisguiseMode ? '目标卡路里（对应月薪）' : '月薪（元）'
                }
                name='monthlySalary'
                rules={[
                  {
                    required: true,
                    message: tempDisguiseMode
                      ? '请输入目标卡路里'
                      : '请输入月薪',
                  },
                ]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  min={0}
                  placeholder={
                    tempDisguiseMode ? '请输入目标卡路里' : '请输入月薪'
                  }
                  formatter={value => {
                    const suffix = tempDisguiseMode ? ' 卡路里' : ' 元';
                    return `${value}${suffix}`.replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      ','
                    );
                  }}
                  parser={value => value.replace(/(卡路里|元)\s?|(,*)/g, '')}
                />
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label={tempDisguiseMode ? '开始运动时间' : '上班时间'}
                    name='startTime'
                    rules={[
                      {
                        required: true,
                        message: tempDisguiseMode
                          ? '请选择开始运动时间'
                          : '请选择上班时间',
                      },
                    ]}
                  >
                    <TimePicker
                      style={{ width: '100%' }}
                      format='HH:mm'
                      placeholder={
                        tempDisguiseMode ? '选择开始运动时间' : '选择上班时间'
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label={tempDisguiseMode ? '结束运动时间' : '下班时间'}
                    name='endTime'
                    rules={[
                      {
                        required: true,
                        message: tempDisguiseMode
                          ? '请选择结束运动时间'
                          : '请选择下班时间',
                      },
                    ]}
                  >
                    <TimePicker
                      style={{ width: '100%' }}
                      format='HH:mm'
                      placeholder={
                        tempDisguiseMode ? '选择结束运动时间' : '选择下班时间'
                      }
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
            <div className={styles.settingsButton}>
              <Button
                type='text'
                icon={<SettingOutlined />}
                onClick={() => {
                  setShowSettings(true);
                  setTempDisguiseMode(config?.disguiseMode || false);
                }}
                size='large'
              />
            </div>

            <Card className={styles.earningsCard}>
              <div className={styles.earningsDisplay}>
                <Title level={2} className={styles.earningsTitle}>
                  {getEarningsTitle()}
                </Title>
                <div className={styles.earningsAmount}>
                  <span>{getDisplayValue()}</span>
                  <span
                    style={{ fontSize: '0.6em', fontWeight: 400, opacity: 0.9 }}
                  >
                    {getUnit()}
                  </span>
                </div>
                <div className={styles.statusText}>{getStatusMessage()}</div>
                {config && (status === '工作中' || status === '运动中') && (
                  <div className={styles.rateInfo}>{getSecondRateText()}</div>
                )}
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default SalaryStopwatch;
