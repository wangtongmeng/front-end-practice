import React from 'react';

export default class VoteHead extends React.Component {
	render() {
		let { title, total } = this.props;
		return (
			<>
				<h4>
					{title}
					(N:{total})
				</h4>
			</>
		);
	}
}
