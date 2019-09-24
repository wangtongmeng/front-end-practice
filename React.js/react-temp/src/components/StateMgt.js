import React, { Component } from 'react'

class Clock extends Component {
	constructor(props) {
		super(props)
		// 使用 state 属性维护状态，在构造函数中初始化状态
		this.state = {
      date: new Date(),
      counter: 0
		}
	}

	componentDidMount() {
		// 组件挂载时启动定时器每秒更新状态
		this.timerID = setInterval(() => {
			// 使用 setState 方法更新状态
			this.setState({
				date: new Date(),
			})
		}, 1000)

    document.body.addEventListener('click', this.changeValue, false)
	}

	componentWillUnmount() {
		// 组件卸载时停止定时器
		clearInterval(this.timerID)
	}
	changeValue = () => {
		this.setState({ counter: this.state.counter + 1 })
		console.log(this.state.counter)
	}

	render() {
		return <div>{this.state.date.toLocaleTimeString()}</div>
	}
}

export default function StateMgt() {
	return (
		<div>
			<Clock />
		</div>
	)
}
