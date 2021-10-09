import React from 'react'
import ReactDOM from 'react-dom'

import News from './News'
ReactDOM.render(<>
 <News index="1">
   双闭合调用组件
   <button>按钮</button>
   </News>
 <News index="1" />
</>, document.getElementById('root'))

