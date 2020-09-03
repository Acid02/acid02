<template>
	<div id="body-warp">
		<div class="body-bag">
			<!-- <video class="body-media" ref="video" src="https://dc.xhscdn.com/9379abe0-7ad8-11e9-8794-9320f6c9d557/%E8%83%8C%E6%99%AF%E8%A7%86%E9%A2%91.mp4" muted="muted" autoplay="autoplay" loop="loop" x5-video-player-fullscreen="true" webkit-playsinline="true" x-webkit-airplay="true" playsinline="true" alt="beijing" /> -->
		    <img class="body-media" src="../assets/images/thumb-1920-826265.png" alt="声之形">
		</div>
		<div class="body-header">
			<slot name="header"></slot>
		</div>
		<div id="site-info">
			<h1 id="site_title">{{$store.state.UserInfo.data.nickname}}</h1>
			<div id="site_subtitle">
				<span id="subtitle" :class="[
					this.titleIndex>=this.title.length && 'typecursor'
					]">{{title.slice(0,titleIndex)}}</span>
			</div>
			<div id="site_social_icons">
				<a class="social-icon" href="http://wpa.qq.com/msgrd?v=3&uin=1716815045&site=qq&menu=yes" target="_blank" title="联系博主">
					<i class="iconfont icon-iconfonticon6"></i>
				</a>
				<a class="social-icon" href="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MjM5ODI0MjA1NA==&scene=110#wechat_redirect" target="_blank" title="微信">
					<i class="iconfont icon-gongzhonghao"></i>
				</a>
				<a class="social-icon" href="https://github.com/acid02/" target="_blank" title="GitHub">
					<i class="iconfont icon-github"></i>
				</a>
				<a class="social-icon" href="Mailto:1716815045@qq.com" target="_blank" title="邮箱">
					<i class="iconfont icon-youxiang"></i>
				</a>
				<a class="social-icon" href="/contact/" target="_blank" title="图片和电影">
					<i class="iconfont icon-duomeiti6"></i>
				</a>
			</div>
		</div>
		<div id="scroll_down" @click="goToTop($event)">
			<i class="iconfont icon-35_xiangxiajiantou scroll_down-i"></i>
		</div>
		<!-- <remote-js :js-url="'https://res.wx.qq.com/open/js/jweixin-1.0.0.js'" :js-load-call-back="loadRongJs"></remote-js> -->
	</div>
</template>

<script>
	// import RemoteJs from '@/components/RemoteJs'// 导入组件
	import {getquotations} from '@/api/UserInfo.js' //随机语录
	export default {
		name: 'BodyWrap',
		// components: {
		//     RemoteJs
		// },
		data(){
			return {
				titleIndex:0,
				title:"遥知朔漠多风雪，更待江南半月春。"
			}
		},
		async created() {
			window.addEventListener('scroll', this.handleScroll)
			let {msg} = await getquotations();
			this.title = msg;
			this.Subtitle()
		},
		methods: {
			Subtitle() {
				let titmsg = this.title.length
				let time = setInterval(() => {
					if (this.titleIndex < titmsg) {
						++this.titleIndex;
					} else {
						clearInterval(time);
						setTimeout(() => {
							let timsjian = setInterval(() => {
								if (this.titleIndex > 0) {
									--this.titleIndex
								} else {
									clearInterval(timsjian);
									this.Subtitle()
								}
							}, 100)
						}, 1000)
					}
				}, 200)
			},
			//js加载完成
			loadRongJs() {
			     // 当使用远程js里的内容时请添加"//eslint-disable-line"防止eslint检测报错
			     // console.log(this.$refs.video) //eslint-disable-line
				 //微信内部浏览器自动播放
				 document.addEventListener("WeixinJSBridgeReady",()=> {
				 	// this.$refs.video.play();
				 }, false);
			},
			goToTop(event){
				// console.log(document.body.scrollIntoView())
				this.$emit('goToTop')
			},
		},
	}
	
</script>

<style scoped>
	#body-warp {
		position: relative;
		width: 100%;
		min-height: 100vh;
	}

	.body-bag {
		position: fixed;
		width: 100%;
		height: 100%;
		z-index: -1;
		background-color: azure;
	}

	.body-media {
		width: 100%;
		min-height: 100vh;
		object-fit: cover;
		z-index: -1;
	}
	#site_title {
		font-size: 40px;
		line-height: 1.5;
	}

	#site-info {
		color: #fff;
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	#subtitle {
		font-size: 24px;
		line-height: 1.5;
	}
    
	#subtitle::after {
		content: '|';
	}

	.typecursor::after {
		animation: typedjsBink 1s .25s;
	}

	#site_social_icons {
		display: none;
		line-height: 2;
	}

	.social-icon {
		margin: 0 10px;
		text-decoration: none;
		font-style: normal;
		color: #FFFFFF;
	}

	.social-icon>.iconfont {
		font-size: 20px;
	}

	#scroll_down {
		position: absolute;
		width: 100%;
		bottom: 0;
		cursor: pointer;
		animation: scroll-down-effect 1.5s infinite;
		text-align: center;
	}

	.scroll_down-i {
		font-size: 30px;
		font-weight: 900;
		color: #fff;
		line-height: 1.5;

	}
    @keyframes headerNoOpacity{
    	from{transform: translateY(-50px);}
    	to{transform: translateY(0);}
    }
	@keyframes typedjsBink {
		0% {
			opacity: 0;
		}

		25% {
			opacity: 0;
		}

		50% {
			opacity: 1;
		}

		100% {
			opacity: 1;
		}
	}

	@keyframes scroll-down-effect {
		0% {
			transform: translateY(0);
			opacity: .4;
		}


		50% {
			transform: translateY(-16px);
			opacity: 1;
		}

		100% {
			transform: translateY(0);
			opacity: .4;
		}
	}

	@media screen and (max-width: 768px) {
		#site_title {
			font-size: 26px;
		}

		#subtitle {
			font-size: 16px;
		}

	}
	@media screen and (max-width: 1200px) {
		#site_social_icons {
			display: block;
		}
	}
</style>
