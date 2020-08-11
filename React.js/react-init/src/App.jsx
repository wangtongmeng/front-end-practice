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
        render: (text, row, index) => {
          return parseInt(text) === 1 ? '未完成' : '已完成'
        }
      },
      {
        title: '完成时间',
        dataIndex: 'time',
        key: 'time'
      },
      {
        title: '操作'
      },
    ],
    data: [
      { id: 1, task: '任务1', state: 1, time: '2020-08-11 19:55', complete: '2020-08-11 19:55' }
    ]
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