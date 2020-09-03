export default {
    namespaced:true,//开启命名空间
    state:{
      data:[1],
      isShow:false,
    },
    mutations:{
      // 这里配置多种变异方式
      // state：原来的状态
      // payload：负荷，约定是一个数组
      setData(state,payload){
        state.isShow = payload;
      },
      // payload：负荷，true 或 false
      setIsShow(state,payload){
         state.isShow = payload;
      }
    },
    actions:{
      // async fetchDatas(context){
      //   context.commit('setIsShow',true)
      // }
    }
}