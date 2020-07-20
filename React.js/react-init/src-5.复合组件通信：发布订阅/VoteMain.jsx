import React from 'react';

function computed(supNum, oppNum) {
	let total = supNum + oppNum;
	if (total === 0) {
		return '0%';
	}
	return ((supNum / total) * 100).toFixed(2) + '%';
}

export default class VoteMain extends React.Component {
	state ={
		supNum: 0,
		oppNum: 0
	}
	render() {
		let { supNum, oppNum } = this.state
		return (
			<div>
				<p>支持人数：{supNum}</p>
				<p>反对人数：{oppNum}</p>
				<p>支持率：{computed(supNum, oppNum)}</p>
			</div>
		);
	}
	componentDidMount(){
		this.props.eventBus.$on('plus', (type)=>{
			if(type==='SUP'){
				this.setState({
					supNum: this.state.supNum + 1
				})
				return
			}
			this.setState({
				oppNum: this.state.oppNum + 1
			})
		})
	}
}