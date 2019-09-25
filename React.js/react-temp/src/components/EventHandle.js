import React, { Component } from 'react'

export default class EventHandle extends Component {
	constructor(props) {
		super(props)

		this.state = {
			name: '',
		}

		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(e) {
		this.setState({ name: e.target.value })
	}

	render() {
		return (
			<div>
				{/* 使用箭头函数，不需要指定回调函数this，且便于传递参数 */}
				{/* <input
        type="text"
        value={this.state.name}
        onChange={e => this.handleChange(e)}
        /> */}
				{/* 直接指定回调函数，需要指定其this指向，或者将回调设置为箭头函数属性 */}
				<input type="text" value={this.state.name} onChange={this.handleChange} />
				<p>{this.state.name}</p>
			</div>
		)
	}
}
