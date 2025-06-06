import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import SalaryStopwatch from './components/SalaryStopwatch';
import styles from './App.module.scss';

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <div className={styles.App}>
        <SalaryStopwatch />
      </div>
    </ConfigProvider>
  );
}

export default App;
