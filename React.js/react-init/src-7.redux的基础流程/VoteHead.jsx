import React from 'react';


export default class VoteHead extends React.Component {

	render() {
		const ThemeContext = window.ThemeContext
		return <ThemeContext.Consumer>
			{context => {
				this.context = context
				// 获取公共状态信息
				const { title, supNum, oppNum } = this.context.store.getState()
				return <h4>
					{title}
							(N:{supNum + oppNum})
						</h4>
			}}
		</ThemeContext.Consumer>
	}
	componentDidMount(){
		const unsubscribe = this.context.store.subscribe(()=>{
			this.forceUpdate()
			// 把当前新增的方法从事件池中移除
			unsubscribe()
		})
	}
}
