/**
 * react hooks：react提供很多新的钩子函数，可以让函数式组件装有状态和常用的生命周期，以及ref/context等
 */

 import React, {} from 'react'

 export default function Test2(props){
  // 设置属性默认值
  let n = props.n ? props.n : 0
  let m = props.m ? props.m : 0

  return <div>
    {n} + {m} = {n + m}
    <button>+N</button>
    <button>+M</button>
  </div>


 }