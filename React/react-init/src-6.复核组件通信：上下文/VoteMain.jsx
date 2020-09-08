import React from 'react';
import PropTypes from 'prop-types'

function computed(supNum, oppNum) {
	let total = supNum + oppNum;
	if (total === 0) {
		return '0%';
	}
	return ((supNum / total) * 100).toFixed(2) + '%';
}

export default class VoteMain extends React.Component {
	// 获取上下文中的信息
	static contextTypes = {
		supNum: PropTypes.number,
		oppNum: PropTypes.number
	}
	render() {
		let { supNum, oppNum } = this.context
		return (
			<div>
				<p>支持人数：{supNum}</p>
				<p>反对人数：{oppNum}</p>
				<p>支持率：{computed(supNum, oppNum)}</p>
			</div>
		);
	}
}