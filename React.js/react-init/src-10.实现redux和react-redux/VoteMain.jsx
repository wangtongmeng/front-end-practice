import React from 'react';
import { connect } from './my-react-redux'

function computed(supNum, oppNum) {
	let total = supNum + oppNum;
	if (total === 0) {
		return '0%';
	}
	return ((supNum / total) * 100).toFixed(2) + '%';
}

class VoteMain extends React.Component {
	render() {
		const { supNum, oppNum } = this.props
		return <div>
			<p>支持人数：{supNum}</p>
			<p>反对人数：{oppNum}</p>
			<p>支持率：{computed(supNum, oppNum)}</p>
		</div>
	}
}
export default connect(state=>state.vote)(VoteMain)