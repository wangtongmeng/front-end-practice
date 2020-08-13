import React from 'react'
import './App.less'
import { PageHeader, Button, Tag, Table } from 'antd'

class App extends React.Component {
  state = {
    columns: [
      {
        title: '编号',
        dataIndex: 'id'
      },
      {
        title: '任务描述',
        dataIndex: 'task'
      },
      {
        title: '状态',
        dataIndex: 'state',
        render: (text, row, index) => parseInt(text) === 1 ? '未完成' : '已完成'
      },
      {
        title: '完成时间',
        render: this.formatTime
      },
      {
        title: '操作'
      },
    ],
    data: [
      { id: 1, task: '任务1', state: 1, time: '2020-08-11 19:55', complete: '2020-08-11 19:55' },
      { id: 1, task: '任务2', state: 2, time: '2020-08-11 19:55', complete: '2020-08-11 19:55' },
    ]
  }
  addZero = val => {
    val = parseInt(val)
    if (!val) {
      return '00'
    }
    return val < 10 ? '0' + val : val
  }
  formatTime = (text, row, index) => {
    let time = parseInt(row.state) === 1 ? row.time : row.complete
    time = time.match(/\d+/g)
    return `${this.addZero(time(1))}-${this.addZero(time(2))}-${this.addZero(time(3))}-${this.addZero(time(4))}-${this.addZero(time(5))}`
  }
  render() {
    let { columns, data } = this.state
    return <div className="container">
      <PageHeader title="任务管理系统">
        <Button type="dashed">新增按钮</Button>
      </PageHeader>
      <div className="navBox">
        <Tag color="blue">全部</Tag>
        <Tag>未完成</Tag>
        <Tag>已完成</Tag>
      </div>
      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  }
}

export default App