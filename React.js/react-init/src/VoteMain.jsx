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
		return <div>
			<p>支持人数：</p>
			<p>反对人数：</p>
			<p>支持率：{computed(0, 0)}</p>
		</div>
	}
}