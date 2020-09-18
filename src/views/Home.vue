<template>
	<div id="Home">
		<transition name="fade">
			<BodyWrap @goToTop="backTop">
				<Header slot='header' @MaskShow="MaskShow" />
			</BodyWrap>
		</transition>
			<main class="layout_page" id='pages' ref='page'>
				<section class="bgcolor">
					<div class="aside aside_left">
						<UserCard />
						<div class="aside-margin">
							<Classify :Classifydata="data.article" /><!-- 分类 -->
						</div>
						<div class="aside-margin">
							<Label :Labeldata="data.label" /> <!-- 标签 -->
						</div>
						<div class="aside-margin" v-if="winWidth<=1200">
							<Notice />
						</div>
					</div>
					<div class="aside aside_center">
						<Breadcrumb v-show="$route.meta.BreadUrl" />
						<!-- <Tags v-if="$route.params.name"/> -->
						<keep-alive>
							<router-view :Classifydata='data.article' :Labeldata="data.label"></router-view>
						</keep-alive>
					</div>
					<div class="aside aside_right" v-if="winWidth>1200">
						<Notice />
					</div>
				</section>
				<Masking :show="MaskingShow" @MaskShow="MaskShow">
					<Mobile @MaskShow="MaskShow"/>
				</Masking>
			</main>
			<GoUp />
			<Footer />
	</div>
</template>

<script>
	import { mapState } from 'vuex';
	import BodyWrap from '@/components/BodyWrap' //第一页背景
	const Header = () => import('@/components/Header') //头部
	const UserCard = () => import('@/components/UserCard') //用户信息
	const Tags = () => import('@/components/Tags') //文章模块标签
	const Breadcrumb = () => import('@/components/Breadcrumb') //面包屑导航

	const Notice = () => import('@/components/Notice') // 公告

	const Classify = () => import('@/components/Classify') //分类
	const Label = () => import('@/components/Label') //标签
	const Masking = () => import('@/components/Masking') //蒙层

	const GoUp = () => import('@/components/GoUp') //返回顶部
	const Mobile = () => import('@/components/Mobile') //移动端点击显示个人信息
	const Footer = () => import('@/components/Footer') //底部备案号
	export default {
		name: 'Home',
		components: {
			BodyWrap,
			Header,
			UserCard,
			Tags,
			Breadcrumb,
			Notice,
			Masking,
			Classify,
			Label,
			GoUp,
			Mobile,
			Footer
		},
		props: {
			winWidth: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				MaskingShow: false,
			}
		},
		computed: mapState('UserInfo', ['data']),
		methods: {
			//头部点击侧边导航栏
			MaskShow() {
				this.MaskingShow = !this.MaskingShow
			},
			//返回底部
			backTop() {
				this.wayscroll(this.$refs.page);
			},
		},
		watch:{
			$route: {
			    handler: function(val, oldVal){
					// console.log(val.name)
					//监听是否点击分类页/标签
				  let routname =['Label','Labellist','Classify','Classifylist']
			      if(routname.includes(val.name)){
					  this.$nextTick(()=>{
						  this.backTop()
					  }) 
				  }
			    },
			    // 深度观察监听
			    // deep: true
				immediate:true
			  }
		}
	}
</script>

<style scoped>
	.layout_page {
		width: 100%;min-height: calc(100vh - 100px);
		background: #fff linear-gradient(90deg, rgba(247, 149, 51, .1) 0, rgba(243, 112, 85, .1) 15%, rgba(239, 78, 123, .1) 30%, rgba(161, 102, 171, .1) 44%, rgba(80, 115, 184, .1) 58%, rgba(16, 152, 173, .1) 72%, rgba(7, 179, 155, .1) 86%, rgba(109, 186, 130, .1) 100%);
	}

	.bgcolor {
		max-width: 1400px;
		margin: 0 auto;
		padding: 40px 10px;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.aside {
		flex: none;
		margin-bottom: 10px;
	}
	.aside_left,
	.aside_right {
		width: 25%;
		
	}
	.aside_left{
		position: sticky;
		top: 65px;
		height: 100%;
	}

	.aside-margin {
		margin: var(--margin) 0;
	}

	.aside_center {
		padding: 0 calc(var(--margin) / 4);
		box-sizing: border-box;
		width: 50%;
		flex: 1;
	}

	@media screen and (max-width: 768px) {

		.aside_left,
		.aside_right,
		.aside_center {
			width: 100%;
			margin-bottom: 0;
		}

		.aside_center {
			padding: 0;
			order: 1;
		}
        .aside_left{
			order: 2;
		}
		.aside_right {
			margin-top: calc(var(--margin) / 2);
		}
		.aside-margin {
			margin: 10px 0;
		}

		
	}
</style>
