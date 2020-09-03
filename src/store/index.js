import Vue from 'vue'
import vuex from 'vuex'
//vuex模块
import UserInfo from './module/UserInfo';

//header
import handleHeader from './module/handleHeader';
Vue.use(vuex)
const store = new vuex.Store({
   modules:{
    UserInfo,
	handleHeader,
   }
})

export default store