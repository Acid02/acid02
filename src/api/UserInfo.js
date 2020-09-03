import axios from 'axios'
// import qs from 'qs';

//获取qq头像和用户名
export const MyiqInfo = async (qq=1716815045)=>{
	 // process.env.NODE_ENV ==''
	let reqs = await axios.get(`${process.env.VUE_APP_BASE_API}/qqxt/api.php?qq=${qq}`)
	return reqs.data
}

//获取用户信息
export const getUser = async ()=>{
	let params = {service:'userInfo'}
	let reqs = await axios.get(`${process.env.VUE_APP_USER_API}/userInfo/`,{params})
	
	if(!reqs.data.data.nickname || !reqs.data.data.useravatar){
		let resq = await MyiqInfo();
		if(resq.code == 1){
			reqs.data.data.useravatar = resq.imgurl;
			reqs.data.data.nickname = resq.name;
		}
		return reqs.data.data;
	}else{
		return reqs.data.data;
	}	
}


//获取分类信息
export const getArticle = async ()=>{
	let params = {service:'article'}
	let reqs = await axios.get(`${process.env.VUE_APP_USER_API}/userInfo/`,{params})
	return reqs.data.data;
}

//获取标签列表
export const getLabel = async ()=>{
	let params = {service:'label'}
	let reqs = await axios.get(`${process.env.VUE_APP_USER_API}/userInfo/`,{params})
	return reqs.data.data;
}

//更新阅读量
export const Upview = async (data={})=>{
	let params = {service:'reading',...data}
	let reqs = await axios.get(`${process.env.VUE_APP_USER_API}/userInfo/`,{params})
	return reqs.data.data;
}


//获取随机语录
export const getquotations = async ()=>{
	let params = {service:'quotations'}
	let reqs = await axios.get(`${process.env.VUE_APP_USER_API}/userInfo/`,{params})
	return reqs.data;
}
