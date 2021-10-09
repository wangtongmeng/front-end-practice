import React from 'react';

function computed(supNum, oppNum) {
	let total = supNum + oppNum;
	if (total === 0) {
		return '0%';
	}
	return ((supNum / total) * 100).toFixed(2) + '%';
}

export default class VoteMain extends React.Component {

	render() {
		const { supNum, oppNum } = this.props.store.getState().vote
		return <div>
			<p>支持人数：{supNum}</p>
			<p>反对人数：{oppNum}</p>
			<p>支持率：{computed(supNum, oppNum)}</p>
		</div>
	}
	componentDidMount() {
		this.props.store.subscribe(() => {
			this.forceUpdate()
		})
	}
}