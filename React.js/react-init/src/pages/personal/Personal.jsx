import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Info from './Info';
import Login from './Login';
import Register from './Register';

export default function Personal(props) {
	return (
		<Switch>
			<Route path="/personal" exact component={Info} />
			<Route path="/personal/login" component={Login} />
			<Route path="/personal/register" component={Register} />
		</Switch>
	);
}
