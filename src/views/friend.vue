<template>
	<div id="friend">
		<Paghead>
			<Header slot='header' @MaskShow="MaskShow"/>
		</Paghead>
		<Layout :length='winWidth>1200?"12":"2"'>
			<div slot='left' v-if="winWidth>1200">
				<UserCard />
				<div class="aside-margin">
					<Notice />
				</div>
			</div>
			<div slot='center'>
				<Postcontent>
					<FriendAside :friendlist='friendlist'/>
					
					<hr></hr>
					<blockquote class="blockquote">
						<h2>本站信息</h2>
						<div class="blockquote-post">
							<ul>
								<li>名称：Gnomeshgh</li>
								<li>描述：既然选择了远方,便只顾风雨兼程</li>
								<li>网址：https://www.acid02.com/</li>
								<li>头像：https://q.qlogo.cn/headimg_dl?dst_uin=1716815045&spec=100</li>
							</ul>
						</div>
						<h2>友链申请要求</h2>
						<div class="blockquote-post">
							<ul>
								<li>1.申请时请先加上本站的链接。</li>
							</ul>
						</div>
					</blockquote>
					<hr></hr>
					
					<button class="button" @click="buttomMk = !buttomMk">点击申请</button>
				</Postcontent>
				
			</div>
		</Layout>
		
		<!-- 提交信息-->
		<Masking :show="buttomMk"  @MaskShow="buttomMk = !buttomMk">
			<div slot='center'>
				<FromBox @cancel='buttomMk = !buttomMk'/>
			</div>
		</Masking>
		
		<!-- 我的模块 -->
		<Masking :show="MaskingShow" @MaskShow="MaskShow">
			<Mobile @MaskShow="MaskShow"/>
		</Masking>
		<Footer />
		<GoUp />
	</div>
</template>

<script>
	import { getfriend } from '@/api/UserInfo' //获取友链
	import { messageBox } from '@/components/JS/index'
	// import Paghead from '@/components/Pagehead'
	// import Layout from '@/components/Layout'
	// import FriendAside from '@/components/FriendAside'
	const Paghead = () => import('@/components/Pagehead')
	const Layout = () => import('@/components/Layout')
	const FriendAside = () => import('@/components/FriendAside')
	const Header = () => import('@/components/Header') //头部
	const Postcontent = () => import('@/components/Postcontent') //中间框
	const UserCard = () => import('@/components/UserCard') //用户信息
	const Notice = () => import('@/components/Notice') // 公告
	const Masking = () => import('@/components/Masking') //蒙层
	const Mobile = () => import('@/components/Mobile') //移动端点击显示个人信息
	const Footer = () => import('@/components/Footer') //底部备案号
	const GoUp = () => import('@/components/GoUp') //返回顶部
	
	const FromBox = () => import('@/components/FromBox') //表单弹窗
	export default {
		name:'Friend',
		components:{Header,Paghead,Postcontent,UserCard,Layout,Notice,Masking,Mobile,Footer,GoUp,FriendAside,FromBox},
		props: ['winWidth'],
		data(){
			return {
				MaskingShow: false,
				buttomMk:false,
				friendlist:[],
			}
		},
		async created(){
			let {data} = await getfriend()
			this.friendlist = data;
		},
		methods: {
			//头部点击侧边导航栏
			MaskShow() {
				this.MaskingShow = !this.MaskingShow
			},
		},
	}
</script>

<style scoped>
	hr {position: relative; margin: 2rem auto; border: 2px dashed #d2ebfd; width: calc(100% - 4px);}
	.blockquote{padding: 0 calc(var(--margin) / 4);box-sizing: border-box;}
	.blockquote>h2{color: #344c67;font-weight: 700;font-size: 21px; margin: 14px 0;}
	.blockquote-post{}
	.blockquote-post ul>li{line-height: 1.5;font-size: 19px;}
	.button{margin: 0 calc(var(--margin) / 4);color: #fff; background-color: #67c23a;border-color: #67c23a;transition: .1s;font-weight: 500;padding: 12px 20px;font-size: 14px;border-radius: 4px;line-height: 1;}
	@media screen and (max-width: 768px) {
		.blockquote-post ul>li{font-size: 12px;}
	}
</style>
