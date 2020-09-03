import Vue from 'vue'
import VueSocketIO from 'vue-socket.io';
var wesocket = {
	debug: process.env.NODE_ENV!='production',
	connection: process.env.NODE_ENV=='production' ? "ws://49.234.69.185:3000" :'ws://localhost:3000'
}

// "ws://49.234.69.185:3000"
Vue.use(new VueSocketIO(wesocket))

// // ws://localhost:3000/
// const socketio = async (qq)=>{
// 	let qqinfo = await MyiqInfo(qq);
// 	if(qqinfo.code != -1){
// 		wesocket.connection = 'ws://localhost:3000/'
// 		if (wesocket.connection != "") {
// 			Vue.use(new VueSocketIO(wesocket))
// 		    return qqinfo;
// 		}
// 	}else{
// 		alert('请输入正确的qq号')
// 	}
// }
