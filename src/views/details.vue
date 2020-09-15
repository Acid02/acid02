<template>
	<div id="details" v-if="Allarticles">
		<Header @MaskShow="MaskShow" />
		<div id="web_bg" data-type="color">1</div>
		<div class="post-bg">
			<img :src="Allarticles.headerpic" width="100%" class="post-img">
			<div id="post-info">
				<div id="post-title">
					<div class="posttitle">{{Allarticles.title}}</div>
				</div>
				<div id="post-meta">
					<div class="meta-firstline">
						<time class="post-meta__date">
							<span class="post-meta__date-created" :title="Allarticles.date">
								发表于 {{Allarticles.date | timeago}}
							</span>
							<!-- <span class="post-meta__separator">|</span>
							<span class="post-meta__date-updated" title="更新于 2020-07-27 16:24:36">
								更新于 2020-07-27
							</span> -->
						</time>
						<span class="post-meta__categories">
							<span class="post-meta__separator">|</span>
							<a class="post-meta__categories" @click.prevent="$router.back(-1)">{{$route.params.parent}}</a>
						</span>
					</div>
					<div class="meta-secondline">
						<span class="post-meta-wordcount">
							<span>字数总计: </span>
							<span class="word-count">{{Allarticles.content | capitalize}}</span>
							<span class="post-meta__separator">|</span>
							<span>阅读时长: {{Allarticles.content | capitalize(500)}} 分钟</span>
							<span class="post-meta__separator">|</span>
							<span>阅读量: {{Allarticles.view || 0}}</span>
						</span>
					</div>
				</div>
			</div>
		</div>
		<main class="layout_post">
			<section class="content-inner">
				<article class="aside_left" v-if="winWidth>1200">
					<UserCard />
					<div class="aside-margin">
						<Notice />
					</div>
				</article>
				<article class="aside_center">
					<div class="post-content" v-html="Allarticles.content">
					</div>
				</article>
			</section>
		</main>
		<Masking :show="MaskingShow" @MaskShow="MaskShow">
			<Mobile @MaskShow="MaskShow"/>
		</Masking>
		<Footer />
		<GoUp />
	</div>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import {
		Upview
	} from '@/api/UserInfo.js';
	const Header = () => import('@/components/Header') //头部
	const UserCard = () => import('@/components/UserCard') //用户信息
	const Notice = () => import('@/components/Notice') // 公告
	const Masking = () => import('@/components/Masking') //蒙层
	const Mobile = () => import('@/components/Mobile') //移动端点击显示个人信息
	const Footer = () => import('@/components/Footer') //底部备案号
	const GoUp = () => import('@/components/GoUp') //返回顶部
	export default {
		name: "Details",
		components: {
			Header,
			UserCard,
			Footer,
			Masking,
			Mobile,
			Notice,
			GoUp
		},
		props: ['winWidth', 'parent', 'id'],
		data() {
			return {
				MaskingShow: false,
			}
		},

		created() {
			// console.log(this.$route.params)
		},
		computed: {
			...mapState({
				// ** this value needs to load before component mounted() runs **
				Allarticles: function(state) {
					let { Allarticles } = state.UserInfo.data;
					
					let result = [...Allarticles].filter(el => el.parent == this.parent && el.id == this.id);
					return result[0]
				}
			})
		},
		methods: {
			//头部点击侧边导航栏
			MaskShow() {
				this.MaskingShow = !this.MaskingShow
			},
		},
		watch: {
			Allarticles: {
				handler: function(val, oldVal) {
					if (!val) {
						this.$router.push({
							name: 'NotFound'
						})
					}
				},
				// 深度观察监听
				// deep: true,
				immediate:true
			},
			$route: {
				handler: function(val, oldVal) {
					if (val.name == 'details') {
						try{
							let params = {
								id: this.Allarticles.id,
								type: this.Allarticles.type,
							}
							Upview(params).then(res => {
								this.$store.commit('UserInfo/setReading', params)
								// console.log(params)
							})	
						}catch(e){
							//TODO handle the exception
						}
						
					}
				},
				// 深度观察监听
				// deep: true,
				immediate: true
			},
		}
	}
</script>
<style>
	.post-content img {
		max-width: 100%;
		height: auto !important;
	}
	.post-content pre{
		white-space: pre-wrap;
		word-wrap: break-word;
	}
	.post-content ul{
		list-style: none;
	}
</style>
<style scoped>
	
	#details {
		width: 100%;
		height: 100vh;
		/* background-color: #000000; */
		color: #FFFFFF;
		/* animation: slideMove .3s cubic-bezier(.62, 0.91, .45, 1.27); */
		    
	}
	@keyframes slideMove {
		from {
			transform: translate3d(100%, 0, 0);
		}
	
		to {
			transform: translate3d(0, 0, 0)
		}
	}
#web_bg{
	position: fixed;
	width: 100%;
	height: 100%;
	z-index: -999;
	 background: var(--light_bg_color);
	animation: to_show 4s;
}
@keyframes to_show {
		from {
			opacity: 0;filter: alpha(opacity=0);
		}

		to {
			opacity: 1;filter: none;
		}
	}
	

	.post-bg {
		height: 400px;
		position: relative;
		animation: slots-name 1s;
		/* opacity: 0; */
		z-index: 2;
	}
    @keyframes slots-name{
    	from{opacity: 0;transform: translateY(-50px);}
    	to{opacity: 1;}
    }
	.post-img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		z-index: 1;
	}

	.post-bg::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .5);
		z-index: 2;
	}

	#post-info {
		position: absolute;
		bottom: 1.5rem;
		padding: 0 8%;
		box-sizing: border-box;
		word-break: break-all;
		width: 100%;
		color: #eee;
		text-align: left;
		z-index: 3;
	}

	#post-info #post-title {
		margin-bottom: 8px;
		font-size: 30px;
		line-height: 1.5;
	}

	.meta-firstline,
	.meta-secondline {
		font-size: 13.3px;
	}

	#post-meta {
		line-height: 1.8;
	}

	.post-meta-wordcount {
		display: flex;
		flex-wrap: wrap;
	}

	.post-meta__separator {
		margin: 0 6px;
	}

	.layout_post {
		padding: 40px 15px;
		box-sizing: border-box;
		color: #4C4948;
		width: 100%;
		transition: all .5s;
		animation: slot-name 1s;
	}
    @keyframes slot-name{
    	from{
			opacity: 0;transform: translateY(50px);
		}
    	to{transform: translateY(0px);opacity: 1;}
    }
	
	.content-inner {
		display: flex;
		max-width: 1400px;
		margin: 0 auto;
	}

	.aside_left {
		width: 25%;
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

	.post-content {
		width: 100%;
		padding: 50px 40px;
		border-radius: 8px;
		box-sizing: border-box;
		text-align: justify;
		word-break: break-all;
		/* word-break: break-all; */
		box-shadow: 0 4px 8px 6px rgba(7, 17, 27, .06);
		transition: all .5s;
	}

	.post-content:hover {
		box-shadow: 0 4px 12px 12px rgba(7, 17, 27, .15);
	}

	@media screen and (max-width: 768px) {
		.post-bg {
			height: 360px;
		}

		.post-content {
			padding: 36px 14px;
		}

		.layout_post {
			padding: 20px 5px;
		}
	}
</style>
