import { getUser,getArticle,getLabel,getThemedia } from '@/api/UserInfo'
export default {
	namespaced:true,//开启命名空间
	state:{
		data:{
			useravatar:"https://q.qlogo.cn/headimg_dl?dst_uin=1716815045&spec=100",
			nickname:"Gnomeshgh",
			article:[],
			label:[],
			Allarticles:[],
		},
		media:{},
		isLoading:true,
	},
	mutations:{
		setData(state,payLoad){
			Object.assign(state.data,payLoad)
		},
		setArticle(state,payLoad){
			state.data.article = payLoad
		},
		setLabel(state,payLoad){
			state.data.label = payLoad
		},
		setAllarticles(state,payLoad){
			state.data.Allarticles = payLoad
		},
		setLoading(state,payLoad){
			state.isLoading = payLoad
		},
		//更新阅读量
		setReading(state,payLoad){
			switch (payLoad.type){
				case "article":
				 state.data.Allarticles.forEach(el=>{
					 if(el.id == payLoad.id  && el.type == payLoad.type){
						el.view++
					 }
				 })
				break;
				case "label":
				state.data.Allarticles.forEach(el=>{
					 if(el.id == payLoad.id && el.type == payLoad.type){
						 el.view++
					 }
				})
				break;
				default:
				return 200;
			}
			// state.isLoading = payLoad
		},
		//更新背景图片或视频
		setMedia(state,payLoad){
			state.media = payLoad
		}
	},
	actions:{
	  async fetchDatas(context){
		 let myiqInfo = await getUser();//获取用户基本信息
		 let myArticle = await getArticle();//获取分类信息
		 let myLabel = await getLabel();//获取标签列表
		 
		 //个人信息
		 context.commit('setData',myiqInfo)
		 
		 //全部文章
		 context.commit('setAllarticles',myArticle.concat(myLabel).reverse())
		
		
		//去除重复标签
		let obj = {};
		let classify = myArticle.reduce((cur,next)=>{
			obj[next.parent] ? "" : obj[next.parent] = true && cur.push(next);
			return cur;
		},[]).map(item=>{
			let count=1;
			myArticle.forEach(dd => {
			    if (item.parent === dd.parent) {
					item.count = count++
			    }
			})
			return item;
		})
		context.commit('setArticle',classify)
		
		
		let obj1 = {};
		let Label = myLabel.reduce((cur,next)=>{
			obj1[next.parent] ? "" : obj1[next.parent] = true && cur.push(next);   
			return cur;
		},[]).map(item=>{
			let count=1;
			myLabel.forEach(dd => {
			    if (item.parent === dd.parent) {
					item.count = count++
			    }
			})
			return item;
		})
		context.commit('setLabel',Label);
		
		
		//获取图片或视频背景
		let {data:media} = await getThemedia();
		context.commit('setMedia',media)
		
		
		// setTimeout(()=>{
			context.commit('setLoading',false);
		// },500) //模拟网络请求
		
	  }
	}
}