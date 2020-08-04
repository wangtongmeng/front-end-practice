import React from 'react';
import { connect } from 'react-redux'


class VoteHead extends React.Component {

	render() {
		const { title, supNum, oppNum } = this.props
		return <h4>
			{title}
			(N:{supNum+oppNum})
		</h4>
	}
}
/**
 * connect高阶组件
 * 	connect(mapStateToProps, mapDispatchToProps) mapStateToProps不传写为null
 * 	而且帮助我们做了一件事情：基于subscribe向事件池中追加了重新渲染当前组件的方法
 */
// function mapStateToProps(state) {
// 	// state => store.getState(): 获取容器中的公共状态
// 	return {
// 		// 返回谁就把谁当做属性传递给组件
// 		// title: state.vote.title,
// 		// supNum: state.vote.supNum
// 		...state.vote
// 	}
// }
// => 简写 state => state.vote
export default connect(state => state.vote)(VoteHead)

