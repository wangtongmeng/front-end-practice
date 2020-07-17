/**
 * react hooks：react提供很多新的钩子函数，可以让函数式组件装有状态和常用的生命周期，以及ref/context等
 * => useState(初始状态值) => [当前最新的状态值，修改状态的方法]
 */

 import React, {useState, useEffect, useRef, useReducer} from 'react'
 console.dir(React);

function reducer(state, action) {
  state = {...state}
  switch (action.type) {
    case 'ADDN':
      state.n++
      break;
    case 'ADDM':
      state.m++
      break;
  }
  return state
}

 export default function Test2(props){
  //  类似于redux的管理机制 dispatch => reducer => 修改状态 
  let [state, dispatch] = useReducer(reducer, {
    n: 0,
    m: 0
  })

  // 使用生命周期
  useEffect(()=>{
    // DidMount && DidMount
    console.log('ALL');
  })
  useEffect(()=>{
    // DidMount
    console.log('DidMount');
  }, [])
  useEffect(()=>{
    // 只有依赖的状态改变才会执行
    console.log('changeN');
  }, [state.n])

  return <div>
    {state.n} {state.m}
    <button onClick={ev => {
      dispatch({
        type: 'ADDN'
      })
    }}>+N</button>
    <button onClick={ev => {
      dispatch({
        type: 'ADDM'
      })
    }}>+M</button>
  </div>
 }