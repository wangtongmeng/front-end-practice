// 演示状态管理

import React, { Component, useState, useEffect } from 'react'

// 函数组件状态管理：useState, useEffect
// hooks 只能在16.8.x以后使用
function ClockFunc () {
	// 创建状态, useState 返回状态和修改状态的函数所组成的数组
	const [date, setDate] = useState(new Date())

	// 定时器是副作用，需要用到 useEffect；副作用包括异步操作、dom操作、ajax、定时器等
	useEffect(() => {
		const timerId = setInterval(() => {
			// 通过 setState 更新状态
			setDate(new Date())
		})

		return () => {
			clearInterval(timerId)
		};
	}, []) // 参数2 指的是依赖状态，本例中没有依赖而且仅执行一次，放一个空数组

	return (
		<div>{date.toLocaleTimeString()}</div>
	)
}



// class 组件，通过 state 和 setState 维护状态
class Clock extends Component {
	constructor(props) {
		super(props)
		// 初始化状态
		this.state = {
			date: new Date(),
			counter: 0,
		}
	}

	componentDidMount () {
		// 假如 counter 初始值为0，执行三次以后其结果是多少？
		// 若同一个 key 多次出现，最后那个起作用
		// this.setState({ counter: this.state.counter + 1 }, () => {
		//   console.log(this.state.counter) // 1
		// })
		// this.setState({ counter: this.state.counter + 1 }, () => {
		//   console.log(this.state.counter) // 1
		// })
		// this.setState({ counter: this.state.counter + 1 }, () => {
		//   console.log(this.state.counter) // 1
		// })

		// console.log(this.state.counter) // 0

		this.setState(
			nextState => {
				console.log(this.state.counter) // 0
				return { counter: nextState.counter + 1 } // 1
			},
			() => {
				console.log(this.state.counter) // 3
			}
		)
		setTimeout(() => {
			console.log('setTimeout ', this.state.counter) // 3 最新的值
		}, 0)
		this.setState(
			nextState => {
				console.log(nextState.counter) // 1
				return { counter: nextState.counter + 1 } // 2
			},
			() => {
				console.log(this.state.counter) // 3
			}
		)
		this.setState(
			nextState => {
				console.log(nextState.counter) // 2
				return { counter: nextState.counter + 1 } // 3
			},
			() => {
				console.log(this.state.counter) // 3
			}
		)
		// 定时器
		this.timerId = setInterval(() => {
			// 通过 setState 更新状态
			this.setState({
				date: new Date(),
			})
		})
	}

	componentWillUnmount () {
		clearInterval(this.timerId)
	}

	render () {
		return <div>{this.state.date.toLocaleTimeString()}</div>
	}
}

export default function StateMgt () {
	return (
		<div>
			<Clock></Clock>
			<ClockFunc></ClockFunc>
		</div>
	)
}
