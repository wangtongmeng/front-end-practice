import React from 'react';

export default class VoteHead extends React.Component {
	state = {
		n: 0
	}
	render() {
		let { title } = this.props;
		return (
			<>
				<h4>
					{title}
					(N:{this.state.n})
				</h4>
			</>
		);
	}
	componentDidMount(){
		this.props.eventBus.$on('plus', ()=>{
			this.setState({
				n: this.state.n + 1
			})
		})
	}
}
