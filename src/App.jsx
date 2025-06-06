// React应用的根组件
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN'; // Ant Design中文语言包
import SalaryStopwatch from './components/SalaryStopwatch';
import styles from './App.module.scss'; // CSS Modules样式

function App() {
  return (
    /* 
      ConfigProvider：Ant Design的全局配置组件
      locale={zhCN}：设置所有Ant Design组件为中文显示
      包括日期选择器、表单验证消息等
    */
    <ConfigProvider locale={zhCN}>
      {/* 应用主容器，应用CSS Modules样式 */}
      <div className={styles.App}>
        {/* 薪资秒表主组件 */}
        <SalaryStopwatch />
      </div>
    </ConfigProvider>
  );
}

export default App;
