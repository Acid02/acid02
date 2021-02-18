<template>
	<div class="frombox" @click.stop>
		<h2>友链申请</h2>
		<ul>
			<li>
				<label for='name'>&#12288;&#12288;昵称：</label>
				<input id="name" type="text" v-model="froms.name" placeholder='昵称'/>
			</li>
			<li>
				<label for='link'>&#12288;&#12288;网址：</label>
				<input id="link" type="text" v-model="froms.link" placeholder='网站地址'/>
			</li>
			<li>
				<label for='descr'>个人介绍：</label>
				<input id="descr" type="text" v-model="froms.descr" placeholder='个人介绍'/>
			</li>
			<li>
				<label for='avatar'>头像链接：</label>
				<input id="avatar" type="text" v-model="froms.avatar" placeholder='头像链接'/>
			</li>
			<li>
				<label for='email'>&#12288;&#12288;邮箱：</label>
				<input id="email" type="email" v-model="froms.email" placeholder='邮箱(填加友链后系统会自动提醒)'/>
			</li>
			<!-- <li>
				<label for='yanz'>&#12288;&#12288;1+1=</label>
				<input id="yanz" type="email" placeholder='验证'/>
			</li> -->
		</ul>
		<div class="gonen">
			<button @click="handscancel">取 消</button>
			<button @click="submit">提交申请</button>
		</div>
	</div>
</template>

<script>
	import { messageBox } from '@/components/JS/index'
	import { intfriend } from '@/api/UserInfo' //新增友链
	export default {
		name:'FromBox',
		data(){
			return {
				froms:{
					name:'',
					link:'',
					descr:'',
					avatar:'',
					email:'',
				}
			}
		},
		methods:{
			//提交
			async submit(){
				let that = this;
				if(this.froms.name == '' || this.froms.link ==''){
					messageBox({
						title:'提示',
						content:'昵称和站点地址不能为空💗',
						cancel:'none',
						ok:'确定',
						handleOK(){}
					})
				}else{
					let regex = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
					if(regex.test(this.froms.email)){
						let {name,link,descr,avatar,email} = this.froms;
						let resp = await intfriend(this.froms)
						if(resp.data == 200){
							messageBox({
								title:'申请成功',
								content:'申请成功，请等待站长审核，审核通过后系统会自动发送邮件通知你!',
								cancel:'none',
								ok:'确定',
								handleOK(){
									that.handscancel()
									that.initialize()
								}
							})
						}else{
							messageBox({
								title:'提示',
								content:`${resp.data}💗`,
								cancel:'none',
								ok:'确定',
								handleOK(){
									that.handscancel()
									that.initialize()
								}
							})
						}
					}else{
						messageBox({
							title:'提示',
							content:'邮箱不合法💗',
							cancel:'none',
							ok:'确定',
							handleOK(){}
						})
					}
				}
			},
			//取消
			handscancel(){
				this.$emit('cancel');
				this.initialize()
			},
			//清空
			initialize(){
				for(let x in this.froms){
					this.froms[x] = ''
				}
			}
		}
	}
</script>

<style scoped>
	.frombox{padding: 20px;box-sizing: border-box;background-color: #fff;border-radius: 5px;display: flex;flex-direction: column;z-index: 10;}
	.frombox>h2{color: #344c67;font-weight: 700;font-size: 21px; text-align: center;}
	.frombox>ul{margin: 10px auto;width: 100%;display: flex;flex-direction: column;}
	.frombox>ul>li{display: flex;align-items: center;margin: 10px auto;width: 100%;}
	.frombox>ul>li>label{width: 80px;}
	.frombox>ul>li>input{height: 30px;border:1px solid #DDDEE1;border-radius: 5px;flex: 1;text-indent: 5px;}
	.frombox>.gonen{text-align: center;}
	.frombox>.gonen>button{text-align: center;box-sizing: border-box;border: none; outline: 0; margin: 0; transition: .1s;font-weight: 500;padding: 12px 20px;font-size: 14px;border-radius: 4px;}
	.frombox>.gonen>button:last-child{margin-left: 10px;color: #fff; background-color: #409eff;}
	.frombox>.gonen>button:hover{box-shadow: inset 0 0 10px rgba(71,161,255,0.5);color: rgb(71,161,255);}
	.frombox>.gonen>button:last-child:hover{opacity: 0.8;box-shadow:unset;color: #FFFFFF;}
</style>
