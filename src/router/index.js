import Vue from 'vue'
import Router from 'vue-router'
import config from './config'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//进度条
NProgress.inc(0.2);
NProgress.configure({
  easing: 'ease',  // 动画方式
  speed: 500,  // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
})


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
   // 每次切换页面时，调用进度条
    NProgress.start();
  next()
})

router.afterEach(() => {
  // 在即将进入新的页面组件前，关闭掉进度条
  NProgress.done()
})

export default router