import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

/* redux */
import { Provider } from 'react-redux'
import store from './store'


/* antd */
import 'antd/dist/antd.css';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

ReactDOM.render(<Provider store={store}>
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>
</Provider>, document.getElementById('root'))

