import React from 'react'
import './App.less'
import { connect } from 'react-redux'
import actions from './store/actions'
import { PageHeader, Button, Tag, Table, Modal, message, Input, DatePicker } from 'antd'
import api from './api'
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
            <a onClick={ev => {
              this.handleDelete(text)
            }}>删除</a>
            &nbsp;&nbsp;
            {parseInt(text.state) === 1 ? <a onClick={ev => {
              this.handleComplete(text)
            }}>完成</a> : null}
          </>
        }
      },
    ],
    // 控制模态框和表单内容
    visible: false,
    task: '',
    time: '',
    // 控制标签选中
    activeIndex: 0
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
  handleOK = async () => {
    let { task, time } = this.state
    let data = await api.task.addTask(task, time)
    if (parseInt(data.code) === 0) {
      message.success('恭喜您！任务增加成功')
      this.handleCancel()
      this.props.queryAll()
      return
    }
    message.error('很遗憾！任务增加失败，请稍后再试~~')

  }
  handleCancel = () => {
    this.setState({
      visible: false,
      task: '',
      time: ''
    })
  }
  openModal = () => {
    this.setState({
      visible: true
    })
  }
  render() {
    let { columns, visible, task, time, activeIndex } = this.state
    let { taskList } = this.props
    return <div className="container">
      <PageHeader title="任务管理系统">
        <Button type="dashed" onClick={this.openModal}>新增按钮</Button>
      </PageHeader>
      <div className="navBox">
        {['全部', '未完成', '已完成'].map((item, index) => {
          return <Tag key={index} color={activeIndex === index ? 'blue' : ''} onClick={this.handleTag.bind(this, index)}>{item}</Tag>
        })}
      </div>
      <Table columns={columns} dataSource={this.filterData(taskList)} pagination={false} rowKey="id" />

      {/* 新增任务 */}
      <Modal
        title="新增任务"
        visible={visible}
        onOk={this.handleOK}
        onCancel={this.handleCancel}
      >
        <p>任务描述：</p>
        <TextArea rows={3} value={task} onChange={ev => {
          this.setState({ task: ev.target.value })
        }} />
        <p>完成时间：</p>
        <DatePicker format="YYYY-MM-DD HH:mm:ss" onChange={(time, str) => {
          this.setState({ time: str })
        }} />
      </Modal>
    </div>
  }
  // 点击tag
  filterData = taskList => {
    if (!this.props.taskList) {
      this.props.queryAll()
      return []
    }
    let activeIndex = this.state.activeIndex
    if (activeIndex === 0) return taskList
    return taskList.filter(item => {
      return parseInt(item.state) === activeIndex
    })
  }
  // 完成或者删除
  handleComplete = text => {

  }
  handleDelete = text => {
    
  }
  handleTag = index => {
    this.setState({ activeIndex: index })
  }
  // 钩子函数
  componentDidMount() {
    // 第一次渲染组件，redux中没有任务信息，我们则派发获取即可
    if (!this.props.taskList) {
      this.props.queryAll()
    }
  }
}

export default connect(state => state.task, actions.task)(App)