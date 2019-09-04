import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'

// 全局引入 SvgIcon 组件
Vue.component('svg-icon', SvgIcon)

// require.context
const req = require.context('./svg', false, /\.svg$/)
// ['qq.svg', 'wx.svg]
req.keys().map(req)
