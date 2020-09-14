import Vue from 'vue'
import '@/assets/style/reset.css'
import '@/assets/style/iconfont.css'
import App from './App.vue'
import router from '@/router'
import store from '@/store'

//全局过滤器
import * as filters from './filters'
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

//全局方法
import * as utils from './utils'
Object.keys(utils).forEach(key => {
	Vue.prototype[key] = utils[key]
})

//better-scroll
// import Scroller from '@/components/Scroller'
// Vue.component('Scroller',Scroller)

//Loading
import Loading from '@/components/Loading.vue'
Vue.component('Loading',Loading)

Vue.config.productionTip = false
// import VConsole from 'vconsole'
// const vConsole = new VConsole()

store.dispatch('UserInfo/fetchDatas')

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
