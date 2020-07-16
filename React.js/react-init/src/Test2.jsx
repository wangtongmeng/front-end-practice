/**
 * react hooks：react提供很多新的钩子函数，可以让函数式组件装有状态和常用的生命周期，以及ref/context等
 * => useState(初始状态值) => [当前最新的状态值，修改状态的方法]
 */

 import React, {useState, useEffect} from 'react'

//  // 实现useState
//  let _state
//  function useState(initState) {
//    if (!_state) {
//      _state = initState
//    }
//    function change(val) {
//      _state = val
//      // 通知组件重新渲染(通知函数重新执行)
//    }
//    return [_state, change]
//  }

 export default function Test2(props){
  // 设置属性默认值
  // let n = props.n ? props.n : 0
  // let m = props.m ? props.m : 0

  // // 官方推荐：每一次useState只控制一个状态信息
  // let [n, changeN] = useState(0)
  // let [m, changeM] = useState(0)

  // let [state, setState] = useState({
  //   n: 0,
  //   m: 0
  // })
  let [state, setState] = useState(() => {
    // 初始状态设置写成函数：懒初始化状态(第一次初始化一次)
    return {
      n: 0,
      m: 0
    }
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



  // return <div>
  //   {n} {m}
  //   <button onClick={ev => {
  //     changeN(n+1) // 修改状态并且通知组件重新渲染(函数重新执行)
  //   }}>+N</button>
  //   <button onClick={ev => {
  //     changeM(m+1)
  //   }}>+M</button>
  // </div>

  return <div>
    {state.n} {state.m}
    <button onClick={ev => {
      setState({
        ...state,
        n: state.n + 1
      })
    }}>+N</button>
    <button onClick={ev => {
      setState({
        ...state,
        m: state.m + 1
      })
    }}>+M</button>
  </div>
 }