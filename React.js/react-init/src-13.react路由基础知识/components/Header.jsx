import React from 'react';
import { withRouter } from 'react-router-dom'
function Header(props) {
  console.log(props);
	return <>公共头部</>;
}
// withRouter：把非路由管控组件变为路由管控组件
export default withRouter(Header)