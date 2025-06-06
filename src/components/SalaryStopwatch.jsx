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
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  SettingOutlined,
  DollarOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import './SalaryStopwatch.css';

const { Title, Text } = Typography;

const SalaryStopwatch = () => {
  const [form] = Form.useForm();
  const [isRunning, setIsRunning] = useState(false);
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

  // 计算当前收入
  useEffect(() => {
    let timer;
    if (isRunning && config) {
      timer = setInterval(() => {
        const now = dayjs();
        const today = now.format('YYYY-MM-DD');
        const startTime = dayjs(`${today} ${config.startTime}`);
        const endTime = dayjs(`${today} ${config.endTime}`);

        // 检查是否在工作时间内
        if (now.isBefore(startTime) || now.isAfter(endTime)) {
          setCurrentEarnings(0);
          return;
        }

        // 计算工作时长（精确到秒）
        const workedSeconds = now.diff(startTime, 'second');
        const totalWorkSeconds = endTime.diff(startTime, 'second');

        // 计算日薪
        const dailySalary = config.monthlySalary / 22; // 假设每月22个工作日
        const secondSalary = dailySalary / totalWorkSeconds;

        // 计算当前收入（精确到分）
        const earnings = workedSeconds * secondSalary;
        const newEarnings = Math.max(0, earnings);

        // 更新数字
        setCurrentEarnings(newEarnings);
      }, 100); // 提高更新频率到100ms，更丝滑
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, config]);

  const handleStart = () => {
    if (!config) {
      message.warning('请先设置薪资配置！');
      return;
    }
    setIsRunning(true);
    message.success('薪资计时开始！');
  };

  const handlePause = () => {
    setIsRunning(false);
    message.info('薪资计时已暂停');
  };

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

  const { status, color } = getCurrentStatus();

  return (
    <div className='salary-stopwatch'>
      <div className='container'>
        <Title level={1} className='title'>
          <DollarOutlined /> 薪资秒表
        </Title>

        {showSettings ? (
          <Card title='薪资配置' className='config-card'>
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
            <Card className='status-card'>
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

            <Card className='earnings-card'>
              <div className='earnings-display'>
                <Title level={2} className='earnings-title'>
                  今日收入
                </Title>
                <div className='earnings-amount'>
                  {currentEarnings.toFixed(4)} 元
                </div>
                <Text type='secondary'>
                  {isRunning ? '💰 每秒都在赚钱中...' : '点击开始计时'}
                </Text>
                {config && isRunning && (
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

            <Card className='control-card'>
              <Space size='large'>
                {!isRunning ? (
                  <Button
                    type='primary'
                    size='large'
                    icon={<PlayCircleOutlined />}
                    onClick={handleStart}
                    className='start-btn'
                  >
                    开始计时
                  </Button>
                ) : (
                  <Button
                    size='large'
                    icon={<PauseCircleOutlined />}
                    onClick={handlePause}
                    className='pause-btn'
                  >
                    暂停计时
                  </Button>
                )}

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
