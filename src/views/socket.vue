<template>
	<div id="socket">
		<div id="mask" v-if="!user.uid">
			<div class="panel">
				<div>请输入您的qq号。</div>
				<div><input type="text" v-model="isqq" maxlength="10"></div>
				<div class="ok">
					<span @click="$router.back(-1)">取消</span>
					<span @click="ok">确定</span>
				</div>
			</div>
		</div>

		<div class="main-inner" v-else>
			<div class="sd">
				<div class="m-hd">
					<div class="header">
						<div class="avatar">
							<img :src="user.nickpic">
						</div>
						<div class="info">
							<div class="name">{{user.username || '匿名'}}</div>
							<div class="menu" @click="$router.back(-1)">
							     <i class="iconfont icon-sang"></i>
							</div>
						</div>
					</div>
				</div>
				<div class="topnav_box">
					<div class="chat-item">
						<div class="avatar" :class="{'qunpic':group.length>1 }">
							<template v-for="item in group" v-if="group.length>1">
								<img :src="item.nickpic" >
							</template>
							<img src="../assets/images/default_hd.jpg" v-if="group.length<=1">
						</div>
						<div class="name">群聊（{{group.length}}）</div>
					</div>
				</div>
			</div>
			<div class="chat-box">
				<div class="chat-area">
					<div class="box-hd">
						<div class="title">群聊（{{group.length}}）</div>
					</div>
				</div>

				<div class="chat-bd" ref='tmck'>
					<div class="empty" v-if="currentChatList.length<1">暂时没有新消息</div>
					<template v-for="item in currentChatList" v-else>
						<div class="clearfix" :class="{'clearfixleft':!item.self }">
							<div class="nt-item">
								<div class="userrq">
									<div class="nt-username" v-if="!item.self">{{item.username}}</div>
									<div class="content" v-html="item.text"></div>
								</div>
								<img :src="item.nickpic" class="image">
							</div>
						</div>
					</template>
					<!-- <div class="clearfix clearfixleft">
						<div class="nt-item">
							<div class="userrq">
								<div class="nt-username">12312312</div>
								<div class="content" >23123</div>
							</div>
							<img src="item.nickpic" class="image">
						</div>
					</div>
					<div class="clearfix">
						<div class="nt-item">
							<div class="content" >23123</div>
							
							<img src="item.nickpic" class="image">
						</div>
					</div> -->
				</div>

				<div class="m-ft">
					<ul class="tool-tab">
						<li><i class="iconfont icon-github"></i></li>
						<li><i class="iconfont icon-github"></i></li>
						<li><i class="iconfont icon-github"></i></li>
					</ul>
					<div class="content">
						<div contenteditable="true" class="input" ref="input" @keyup.ctrl.enter="send"></div>
					</div>
					<div class="action">
						<span class="notice">按ctrl+enter发送</span>
						<a href="javascript:void(0)" class="u-send" @click="send">发送</a>
					</div>
				</div>
			</div>
		</div>
	</div>

	</div>
</template>

<script>
	import '@/api/socket'
	import { MyiqInfo } from '@/api/UserInfo.js'
	export default {
		name: 'Socket',
		components: {},
		data() {
			return {
				currentChatList: [], // 聊天记录
				isqq: '',
				user: {
					nickpic:require('../assets/images/default_hd.jpg'),
					username: '',
					uid: '',
					text: '',
					self:true,
				},
				//群聊人数
				group:[]
			}
		},
		async created() {
            if(sessionStorage.getItem('qq')){
				this.isqq = sessionStorage.getItem('qq')
				this.user.uid=sessionStorage.getItem('qq')
				this.ok()
			}
		},
		methods: {
			send() {
				let content = this.$refs.input.innerHTML;
				content = content.replace(/^\s*/g, '').replace(/\s*$/g, '').substr(0, 200); // max 最大发送200
				if (!content) {
					return;
				}
				this.user.text = content;
				this.$socket.emit("message", this.user);
				
			},
			async ok() {
				let qq = this.isqq.trim()
				if (qq && qq.length > 3) {
					let result = await MyiqInfo(qq);
					if(result.code != -1){
						this.user.username = result.name || '匿名';
						this.user.nickpic = result.imgurl;
						this.user.uid = qq;
						
						sessionStorage.setItem('qq',qq)//缓存账号
						//第一次发送信息//登录
						this.$socket.emit("login", this.user);
					}else{
						alert('未找到')
					}
					
				} else {
					alert('请输入正确的qq号')
				}
			},
			ScroolEnd(){
				let ele = this.$refs.tmck;
				ele.scrollTo({top:ele.scrollHeight,behavior:'smooth'})
				// ele.scrollTop = ele.scrollHeight;
			}
		},
		sockets:{
			connect() {
				// console.log('连接成功');
			},
			disconnect() {
				// console.log('断开链接')
			},
			reconnect() {
				// console.log('重新链接')
			},
			enter(data) {
				let obj = {};
				this.group = data;
				this.group = this.group.reduce((cur,next)=>{
					obj[next.uid] ? "" : obj[next.uid] = true && cur.push(next);   
					return cur;
				},[])
			
				// console.log("enter：", data)
			},
			message(data) {
				// console.log('message：', data)
				data.self = data.uid == this.user.uid ? true : false;
				this.currentChatList.push(data);
				this.$refs.input.innerHTML = '';
				setTimeout(()=>{
					this.ScroolEnd()
				},100)
				
			},
			leave(data) {
				this.group = data
				// console.log(data, 'leave结束')
			}
		}
	}
</script>

<style>
	.nt-item .content img{
		max-width: 100%;
		
	}
	.m-ft .content .input img{
		width: 22%;
	}
</style>
<style scoped>
	#socket {
		background: url(../assets/images/2zrdI1g.jpg) no-repeat 50%;
		background-size: cover;
		min-height: 100vh;
		padding: 2% 0;
	}

	.main-inner {
		display: flex;
		width: 1000px;
		max-width: 100%;
		height: 720px;
		max-height: 100vh;
		margin: 0 auto;

		border-radius: 3px;
		overflow: hidden;
	}

	.sd {
		width: 28%;
		background-color: #2E3238;
	}

	.chat-box {
		width: 72%;
		background-color: #EEEEEE;
	}

	.header {
		padding: 18px;
		box-sizing: border-box;
	}

	.avatar {
		float: left;
	}

	.avatar>img {
		width: 40px;
		height: 40px;
		border-radius: 3px;
		object-fit: cover;
	}
	.qunpic{
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}
    .qunpic>img{
		width: calc(38px / 3);
		height: calc(38px / 3);
	}
	.qunpic>img:nth-child(3n+2){
		margin:0 1px;
		margin-bottom: 1px;
		
	}
	.info {
		margin-left: 50px;
		height: 40px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #FFFFFF;
	}

	.header .info .name {
		font-size: 18px;
		line-height: initial;
	}

	.menu>i {
		line-height: 10;
		font-size: 10px;
		font-weight: 100;
	}

	.topnav_box {
		border-top: 1px solid #24272C;
	}

	.chat-item {
		display: flex;
		padding: 12px 18px;
		cursor: pointer;
		box-sizing: border-box;
		background-color: #3a3f45;
	}

	.chat-item .avatar {
		width: 50px;
	}

	.chat-item .name {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		word-wrap: normal;
		font-weight: 400;
		font-size: 13px;
		color: #fff;
		line-height: 20px;
	}

	.box-hd {
		position: relative;
		padding: 10px 0;
		margin: 0 19px;
		border-bottom: 1px solid #d6d6d6;
		background-color: #eee;
		text-align: center;
		z-index: 1024;
	}

	.box-hd .title {
		font-weight: 400;
		height: 25px;
		display: inline-block;
		font-size: 14px;
		line-height: 25px;
		cursor: pointer;
		position: relative;
	}

	.chat-bd {
		padding: 18px;
		height: 490px;
		box-sizing: border-box;
		top: 50px;
		right: 0;
		left: 0;
		overflow-y: auto;
	}

	.chat-bd .empty {
		text-align: center;
		padding: 20px;
		color: #bbb;
	}

	.clearfix {
		width: 100%;
		margin-bottom: 15px;
	}

	.nt-item {
		display: flex;
		justify-content: flex-end;
	}
	.nt-username{
		text-align: right;
		font-size: 12px;
		color: #B2B2B2;
		margin-bottom: 5px;
	}
	.nt-item .content {
		max-width: 580px;
		padding: 10px 10px;
		box-sizing: border-box;
		line-height: initial;
		background-color: #b1e281;
		position: relative;
		word-break: break-all;
		width: max-content;
	}
   
	.nt-item .content:before {
		content: '';
		position: absolute;
		border: 5px solid #b1e281;
		top: 15px;
		right: -5px;
		-webkit-transform: rotate(45deg);
		transform: rotate(45deg);
	}

	.image {
		width: 40px;
		height: 40px;
		margin-left: 12px;
		border-radius: 3px;
		object-fit: cover;
	}

	.m-ft {
		border-top: 1px solid #d6d6d6;
		height: 180px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.m-ft .tool-tab li {
		height: 30px;
		width: 30px;
		line-height: 30px;
		margin-right: 10px;
		text-align: center;
	}

	.m-ft .tool-tab li i {
		cursor: pointer;
		font-size: 22px;
	}

	.m-ft .content {
		padding: 0 17px;
		height: 80px;
		box-sizing: border-box;
	}

	.m-ft .content .input {
		width: 100%;
		height: 100%;
		outline: none;
		overflow-y: auto;
		overflow-x: hidden;
	}

	.m-ft .tool-tab {
		padding: 5px 17px;
		box-sizing: border-box;
		display: flex;
	}

	.m-ft .action {
		padding: 10px 17px;
		box-sizing: border-box;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		font-size: 14px;
	}

	.m-ft .action .notice {
		margin-right: 10px;
		color: #999;
	}

	.m-ft .action .u-send {
		text-decoration: none;
		background-color: #fff;
		padding: 8px 25px;
		border: 1px solid #aaa;
		border-radius: 3px;
		color: #666;
	}

	.clearfixleft .nt-item {
		justify-content: flex-start;
	}

	.clearfixleft .nt-item .userrq {
		order: 2;
	}
	.clearfixleft .nt-item .userrq .nt-username{
		text-align: left;
	}
   .clearfixleft .nt-item .content {
		background-color: #FFFFFF;
	}
	.clearfixleft .nt-item .content::before {
		right: unset;
		left: -5px;
		border-color: #FFFFFF;
	}

	.clearfixleft .nt-item .image {
		order: 1;
		margin-left: 0;
		margin-right: 12px;
	}

	#mask {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.4);
		z-index: 9999;
	}

	#mask .panel {
		background-color: #fff;
		margin-top: 200px;
		display: inline-block;
		padding: 20px;
		border-radius: 10px;
		margin-left: 45%;
		width: 200px;
		line-height: 30px;
		text-align: center;
	}

	#mask .panel {
		text-align: center;
	}

	#mask .panel input {
		text-align: center;
		height: 30px;
	}

	#mask .panel .ok {
		margin-top: 10px;
	}

	#mask .panel .ok span{
		padding: 5px 20px;
		cursor: pointer;
		border-radius: 4px;
		color: #fff;
	}
	#mask .panel .ok span:last-child{
		background-color: #4AB34A;
		border: 1px solid #4AB34A;
	}
	#mask .panel .ok span:first-child{
		border: 1px solid gray;
		color: #000000;
		margin-right: 2%;
	}
	@media screen and (max-width: 768px) {
		.main-inner{
			flex-direction: column;
			border-radius: 0;
		}
		.sd{
			width: 100%;
		}
		.chat-box{
			width: 100%;
		}
		.nt-item .content{
			max-width: 100%;
			width: 100%;
		}
		.chat-area,.m-ft .tool-tab{
			display: none;
		}
		.m-ft .content{
			padding: 2%;
		}
		.chat-bd{
			height: 50vh;
			padding: 2%;
		}
		.m-ft{
		   height: auto;	
		}
		#socket{
			padding: 0;
		}
		#mask .panel{
			margin-left:19%
		}
	}
</style>
