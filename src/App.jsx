import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import SalaryStopwatch from './components/SalaryStopwatch';
import './App.css';

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <div className="App">
        <SalaryStopwatch />
      </div>
    </ConfigProvider>
  );
}

export default App;
