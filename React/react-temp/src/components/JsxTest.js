import React, { Component } from 'react'
import logo from '../logo.svg'
import style from '../index.module.css'

class JsxTest extends Component {

	render() {
		const user = { firstName: 'wang', lastName: 'tongmeng' }
		function formatName(user) {
			return user.firstName + ' ' + user.lastName
		}

		const name = '标题'
		const showTitle = true
		const title = showTitle ? <h2>{name}</h2> : null
		const arr = [1, 2, 3].map(num => <li key={num}>{num}</li>)

		return (
			<div>
				<img src={logo} className={style.img} />
			</div>
		)
	}
}


export default JsxTest
