<template>
	<div id="body-warp">
		<div class="body-bag">
			<img class="body-media" :src="media.images" alt="声之形" v-if="isAndroid">
			<video v-else class="body-media" ref="video" :src="media.video" :poster='media.videoPoster'
			 muted="muted" autoplay="autoplay" loop="loop" x5-video-player-fullscreen="true" webkit-playsinline="true"
			 x-webkit-airplay="true" playsinline="true" alt="beijing" />
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
				<a class="social-icon" href="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MjM5ODI0MjA1NA==&scene=110#wechat_redirect"
				 target="_blank" title="微信">
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
		<remote-js :js-url="'https://res.wx.qq.com/open/js/jweixin-1.0.0.js'" :js-load-call-back="loadRongJs" v-if="isWeiXin"></remote-js>
	</div>
</template>

<script>
	const RemoteJs =()=> import('@/components/RemoteJs');
	// import RemoteJs from '@/components/RemoteJs'
	import { getquotations,getThemedia } from '@/api/UserInfo.js' //随机语录//随机图片视频
	export default {
		name: 'BodyWrap',
		components: {
			RemoteJs
		},
		data() {
			return {
				titleIndex: 0,
				media:{
					images:'http://wx3.sinaimg.cn/mw690/006ZNE4cgy1gimo8xkzs8j316t0u07uu.jpg', //require('../assets/images/thumb-1920-826265.png')
					video:'http//f.video.weibocdn.com/0026cv2hgx07GlAPhuTJ01041200f7Ng0E010.mp4?label=mp4_1080p&template=1920x1080.25.0&trans_finger=0bde055d9aa01b9f6bc04ccac8f0b471&media_id=4547965721706523&tp=8x8A3El:YTkl0eM8&us=0&ori=1&bf=4&ot=h&ps=3lckmu&uid=6ZNE4c&ab=966-g1&Expires=1599813587&ssig=CKlshFBg24&KID=unistore,video',
				    videoPoster:'http://wx4.sinaimg.cn/mw690/006ZNE4cgy1gimntbsp3bj30u00u0nht.jpg',
				},
				title: "遥知朔漠多风雪，更待江南半月春。",
				isAndroid: this.judgeClient() == 'Android',
				isWeiXin: this.isWeiXin(),
			}
		},
		async created() {
			window.addEventListener('scroll', this.handleScroll);
			// let {data} = await getThemedia();
			// this.media = data
			// console.log(media)
			let { msg } = await getquotations();
			this.title = msg;
	
			this.Subtitle()
			// console.log('测试',this.isAndroid,this.isWeiXin)
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
				// this.$refs.video.play();	
				//微信内部浏览器自动播放
				if (window.WeixinJSBridge) {
					window.WeixinJSBridge.invoke('getNetworkType', {}, (res) => {
						this.$refs.video.play();
					})
				}else{
					document.addEventListener('WeixinJSBridgeReady', () => {
						this.$refs.video.play();
					}, false);
				}

			},
			goToTop(event) {
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

	@keyframes headerNoOpacity {
		from {
			transform: translateY(-50px);
		}

		to {
			transform: translateY(0);
		}
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
