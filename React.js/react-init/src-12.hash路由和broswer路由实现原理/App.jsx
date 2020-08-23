import React from 'react';
class App extends React.Component {
	render() {
		return (
			<div>
				<button
					onClick={(ev) => {
						// window.location.href = window.location.href.replace(/#[a-z]+/ig, '') + '#AAA'
						window.history.pushState({}, 'page', '/AA');
					}}
				>
					AAA
				</button>
				<button
					onClick={(ev) => {
						// window.location.href = window.location.href.replace(/#[a-z]+/ig, '') + '#BBB'
						window.history.pushState({}, 'page', '/BB');
					}}
				>
					BBB
				</button>
			</div>
		);
	}
}
export default App;
