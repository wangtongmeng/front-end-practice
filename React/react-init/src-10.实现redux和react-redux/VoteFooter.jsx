import React from 'react';
import action from './store/actions/index';
import { connect } from './my-react-redux';

class VoteFooter extends React.Component {
	render() {
		let { changeSupNum, changeOppNum } = this.props;
		return <>
				<button onClick={(ev) => {
          changeSupNum()
        }}>支持</button>
				<button onClick={(ev) => {
          changeOppNum()
        }}>反对</button>
			</>
	}
}
/* function mapDispatchToProps(dispatch) {
	// dispatch => store.dispatch
	return {
		changeSupNum() {
			dispatch(action.vote.changeSupNum());
		},
		changeOppNum() {
			dispatch(action.vote.changeOppNum());
		},
	};
} */
// connect会帮我们把下面的模式变成上面的标准模式=>reac-redux帮我们把action-creators变为派发的形式
/* {
  // 写成函数返回的形式，主要是为react-redux准备的
  changeSupNum() {
    return {
      type: TYPES.VOTE_SUPPORT
    }
  },
  changeOppNum() {
    return {
      type: TYPES.VOTE_OPPOSE
    }
  }
} */
export default connect(null, action.vote)(VoteFooter);
