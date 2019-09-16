// 演示状态管理

import React, { Component } from 'react'

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

	componentDidMount() {
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
        console.log(this.state.counter)
        return { counter: nextState.counter + 1 }
      },
			() => {
				console.log(this.state.counter)
			}
		)
		console.log(this.state.counter)
		this.setState(
			nextState => {
        console.log(this.state.counter)
        return { counter: nextState.counter + 1 }
      },
			() => {
				console.log(this.state.counter)
			}
		)
		console.log(this.state.counter)
		this.setState(
			nextState => {
        console.log(this.state.counter)
        return { counter: nextState.counter + 1 }
      },
			() => {
				console.log(this.state.counter)
			}
		)
		console.log(this.state.counter)

		// 定时器
		this.timerId = setInterval(() => {
			// 通过 setState 更新状态
			this.setState({
				date: new Date(),
			})
		})
	}

	componentWillUnmount() {
		clearInterval(this.timerId)
	}

	render() {
		return <div>{this.state.date.toLocaleTimeString()}</div>
	}
}

export default function StateMgt() {
	return (
		<div>
			<Clock></Clock>
		</div>
	)
}
