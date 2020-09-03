// import base from './base'
import axios from 'axios'
import qs from 'qs';
//主题api管理
export const UserInfo = async (params)=>{
   let resq = await axios.post('/user/user_api/Public/User/',qs.stringify(params));
   return resq.data.data
}