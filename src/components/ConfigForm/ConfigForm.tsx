import {
  Card,
  Form,
  InputNumber,
  TimePicker,
  Button,
  Row,
  Col,
  Switch,
} from 'antd';
import type { FormInstance } from 'antd';
import type { FormValues } from '@/types';
import styles from './ConfigForm.module.scss';

// 配置表单组件Props
interface ConfigFormProps {
  readonly form: FormInstance<FormValues>;
  readonly onSaveConfig: (values: FormValues) => void;
  readonly tempDisguiseMode?: boolean;
  readonly onDisguiseModeChange?: (checked: boolean) => void;
  readonly title?: string;
}

/**
 * 配置表单组件
 * 用于设置薪资信息和工作时间
 */
const ConfigForm = ({
  form,
  onSaveConfig,
  tempDisguiseMode = false,
  onDisguiseModeChange = () => {},
  title,
}: ConfigFormProps) => {
  return (
    <Card
      title={title || (tempDisguiseMode ? '运动配置' : '薪资配置')}
      className={styles.configCard}
    >
      <Form form={form} onFinish={onSaveConfig} layout='vertical'>
        <Form.Item
          label='伪装模式'
          name='disguiseMode'
          valuePropName='checked'
          extra='开启后界面将显示为卡路里燃烧应用'
        >
          <Switch onChange={onDisguiseModeChange} />
        </Form.Item>

        <Form.Item
          label={tempDisguiseMode ? '目标卡路里（对应月薪）' : '月薪（元）'}
          name='monthlySalary'
          rules={[
            {
              required: true,
              message: tempDisguiseMode ? '请输入目标卡路里' : '请输入月薪',
            },
          ]}
        >
          <InputNumber
            style={{ width: '100%' }}
            min={0}
            placeholder={tempDisguiseMode ? '请输入目标卡路里' : '请输入月薪'}
            formatter={value => {
              const suffix = tempDisguiseMode ? ' 卡路里' : ' 元';
              return `${value}${suffix}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }}
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
  );
};

export default ConfigForm;
