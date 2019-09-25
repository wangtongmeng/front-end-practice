import React, { Component, useState, useEffect } from 'react'

function ClockFunc() {
	// useState创建一个状态和修改该状态的函数
	const [date, setDate] = useState(new Date())
	// useEffect编写副作用代码
	useEffect(() => {
		// 启动定时器是我们的副作用代码
		const timerID = setInterval(() => {
			setDate(new Date())
		}, 1000)
		// 返回清理函数
		return () => clearInterval(timerID)
	}, []) // 参数2传递空数组使我们参数1函数仅执行一次
	return <div>{date.toLocaleTimeString()}</div>
}

class Clock extends Component {
	constructor(props) {
		super(props)
		// 使用 state 属性维护状态，在构造函数中初始化状态
		this.state = {
			date: new Date(),
			counter: 0,
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
			{/* <Clock /> */}
			<ClockFunc />
		</div>
	)
}
