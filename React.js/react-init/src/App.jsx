import React from 'react'
import './App.less'
import { PageHeader, Button, Tag, Table, Modal, message, Input, DatePicker } from 'antd'
const { confirm } = Modal
const { TextArea } = Input;

class App extends React.Component {
  state = {
    columns: [
      {
        title: '编号',
        dataIndex: 'id',
        width: '8%'
      },
      {
        title: '任务描述',
        dataIndex: 'task',
        width: '49%'
      },
      {
        title: '状态',
        dataIndex: 'state',
        render: (text, row, index) => parseInt(text) === 1 ? '未完成' : '已完成',
        width: '10%'
      },
      {
        title: '完成时间',
        render: (text, row, index) => this.formatTime(text, row, index),
        width: '18%'
      },
      {
        title: '操作',
        width: '15%',
        render: (text, row) => {
          console.log('text', text);
          return <>
            <a>删除</a>
            &nbsp;&nbsp;
            {parseInt(text.state) === 1 ? <a>完成</a> : null}
          </>
        }
      },
    ],
    data: [
      { id: 1, task: '任务1任务1任务1任务1任务1任务1任务1任务1任务1任务1任务1任务1任务1任务1任务1任务1任务1', state: 1, time: '2020-08-11 19:55', complete: '2020-08-11 19:55' },
      { id: 2, task: '任务2', state: 2, time: '2020-08-11 19:55', complete: '2020-08-11 19:55' },
    ],
    // 控制模态框和表单内容
    visible: false
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
    return `${this.addZero(time[1])}-${this.addZero(time[2])} ${this.addZero(time[3])}:${this.addZero(time[4])}:${this.addZero(time[5])}`
  }
  // 处理模态框
  handleOK = () => {

  }
  handleCancel = () => {

  }
  render() {
    let { columns, data, visible } = this.state
    return <div className="container">
      <PageHeader title="任务管理系统">
        <Button type="dashed">新增按钮</Button>
      </PageHeader>
      <div className="navBox">
        <Tag color="blue">全部</Tag>
        <Tag>未完成</Tag>
        <Tag>已完成</Tag>
      </div>
      <Table columns={columns} dataSource={data} pagination={false} rowKey="id" />

      {/* 新增任务 */}
      <Modal
        title="新增任务"
        // visible={visible}
        visible={true}
        onOk={this.handleOK}
        onCancel={this.handleCancel}
      >
        <p>任务描述：</p>
        <TextArea rows={3} />
        <p>完成时间：</p>
        <DatePicker format="YYYY-MM-DD HH:mm:ss" />
      </Modal>
    </div>
  }
}

export default App