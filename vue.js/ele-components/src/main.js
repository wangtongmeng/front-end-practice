import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import formCreate from '@form-create/element-ui'
Vue.use(ElementUI);
Vue.use(formCreate)
// element 二次封装
import eleconfig from './eleComponents/index'
Vue.use(eleconfig)

import VueFormGenerator from 'vue-form-generator'
import 'vue-form-generator/dist/vfg.css'
Vue.use(VueFormGenerator)

import { RecycleScroller } from 'vue-virtual-scroller'
Vue.component('RecycleScroller', RecycleScroller)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
