import React, { useState } from 'react';

function computed(supNum, oppNum) {
	let total = supNum + oppNum;
	if (total === 0) {
		return '0%';
	}
	return ((supNum / total) * 100).toFixed(2) + '%';
}

export default function Vote(props) {
	let [state, setState] = useState(() => {
		return {
			supNum: 0,
			oppNum: 0,
		};
	});
	let { supNum, oppNum } = state;
	return (
		<div>
			<h4>{props.title}</h4>
			<div>
				<p>支持人数：{supNum}</p>
				<p>反对人数：{oppNum}</p>
				<p>支持率：{computed(supNum, oppNum)}</p>
			</div>
			<div>
				<button
					onClick={(ev) => {
						setState({
							...state,
							supNum: supNum + 10,
						});
					}}
				>
					支持
				</button>
				<button
					onClick={(ev) => {
						setState({
							...state,
							oppNum: oppNum + 1,
						});
					}}
				>
					反对
				</button>
			</div>
		</div>
	);
}
