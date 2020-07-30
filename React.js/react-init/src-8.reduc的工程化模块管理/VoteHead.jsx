import React from 'react';
export default class VoteHead extends React.Component {

	render() {
		const { title, supNum, oppNum } = this.props.store.getState().vote
		return <h4>
			{title}
			(N:{supNum+oppNum})
		</h4>
	}
	componentDidMount(){
		this.props.store.subscribe(()=>{
			this.forceUpdate()
		})
	}
}
