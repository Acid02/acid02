import Vue from 'vue'
import Router from 'vue-router'
import config from './config'

//1.安装
Vue.use(Router);

//2.创建路由对象
const router = new Router(config);

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  /* 详情页回到顶部 */
  if(to.name =='details' || to.name =='socket' ){
	  window.scrollTo({top:0});//过度 ,behavior:'smooth'
  }
  // console.log(to)
  next()
})
export default router