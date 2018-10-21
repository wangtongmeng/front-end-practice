import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import App from './App.vue'

Vue.use(VueAwesomeSwiper, /* { default global options } */)
import './assets/css/swiper.min.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
