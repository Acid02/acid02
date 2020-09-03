<template>
	<header id="Header" class="body-header" v-show="scroll.top" :class="[scroll.visible&&'visible',scroll.fixed&&'fixed']">
		<nav class="SubMenu">
			<ul class="SubMenu-left">
				<li class="SubMenu-name" @click="pages(0)">
					<router-link to="/">{{$store.state.UserInfo.data.nickname}}</router-link>
				</li>
			</ul>
			<ul class="SubMenu-center">
				<li>
					<a href="#"></a>
				</li>
			</ul>
			<ul class="SubMenu-right">
				
				<li @click="pages(item.type)" v-for="(item,index) in Header" :key='index'>
					<router-link :to="{name:item.url}">
						<i class="iconfont" :class="item.icon"></i>
						<span>{{item.name}}</span>
					</router-link>
				</li>
				<div class="SubMenu-right-icon" @click="MaskShow">
					<i class="iconfont icon-sang"></i>
				</div>
			</ul>
		</nav>
	</header>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		name: "Header",
		data() {
			return {
				scroll: {
					top: false, //第一次是否在顶端
					visible: false, //滑出
					fixed: false, //变色
				},
			}
		},
		computed:mapState('handleHeader',['Header']),
		created() {
			window.addEventListener('scroll', this.handleScroll)
			setTimeout(()=>{
				if (document.documentElement.scrollTop <= 0) {
					this.scroll.top = true;
				}
			},200)
					
		},
		methods: {
			MaskShow() {
				this.$emit('MaskShow')
			},
			handleScroll() {
				// 页面滚动距顶部距离
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop ||
					document.body.scrollTop
				var scroll = scrollTop - this.i;
				this.i = scrollTop;
				
				var a = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
				var b = document.documentElement.scrollTop == 0 ? document.body.scrollTop : document.documentElement.scrollTop;
				var c = document.documentElement.scrollTop == 0 ? document.body.scrollHeight : document.documentElement.scrollHeight;
			
				if (scroll < 0) {
					this.scroll.top = true;
					this.scroll.visible = false;
					this.scroll.fixed = true;
					// console.log('up')
				} else {
					if(scrollTop > 0){
						this.scroll.visible = true;
					}
					// console.log('down')
				}
				if(scrollTop<=0){
					this.scroll.fixed = false
				}
				if (document.body.scrollTop == 0 && document.documentElement.scrollTop == 0) {
					this.scroll.fixed = false;
					// console.log("到达顶端");
				}
				if (a + Math.floor(b) == c || a + Math.ceil(b) == c) {
					// console.log("到达底端");
				}
			},
			pages(e){
				if(e == 0){
					let pages = document.getElementById('pages');
					if(pages){
						this.wayscroll(pages);
					}
					
				}
			}
		}
	};
</script>

<style scoped>
	.SubMenu {
		width: 100%;
		height: 58px;
		display: flex;
		justify-content: space-between;
		padding: 10px 36px;
		box-sizing: border-box;
		line-height: 2;
	}

	/* @supports (-webkit-backdrop-filter:none) or (backdrop-filter:none) {
   .SubMenu{
	   backdrop-filter: blur(5px); 
   }
} */
	.SubMenu-name {
		font-weight: bold;
		font-size: 18px;
	}

	.SubMenu>ul {
		flex: 1;
		display: flex;
		align-items: center;
		line-height: initial;
	}

	ul.SubMenu-center {
		flex: 0;
	}

	.SubMenu>ul>li {
		cursor: pointer;
		line-height: initial;
	}

	.SubMenu>ul>li>a {
		text-decoration: none;
		color: unset;
		line-height: 1.3;
		display: flex;
		align-items: center;
	}

	.SubMenu>ul>li>a>i {
		margin-right: 5px;
	}

	.SubMenu>ul>li>a>span {}

	.SubMenu-right {
		justify-content: flex-end;
		font-size: 14px;
	}

	.SubMenu-right>li {
		margin-left: 14px;

	}

	.SubMenu-right-icon {
		display: none;
	}

	.body-header {
		z-index: 10;
		color: #FFFFFF;
		transition: transform .5s, background-color .2s;
		position: fixed;
		width: 100%;
		animation: 1s ease 0s 1 normal none running headerNoOpacity;
	}

	@keyframes headerNoOpacity {
		from {
			transform: translateY(-50px);
		}

		to {
			transform: translateY(0);
		}
	}

	.visible {
		transform: translateY(-60px);
	}
	
	.fixed{
		background-color: rgba(255,255,255,.8);
		color: var(--blackColor);
		box-shadow: 0 5px 6px -5px rgba(133,133,133,.6);
	}
	@supports (-webkit-backdrop-filter:none) or (backdrop-filter:none) {
	    .fixed {
	        background-color: hsla(0, 0%, 100%, .75);
	        -webkit-backdrop-filter: blur(5px);    
	        backdrop-filter: blur(5px);   
	    }
	}

	@media screen and (max-width: 768px) {
		.SubMenu-right>li {
			display: none;
		}

		.SubMenu-right-icon {
			display: flex;
			align-items: center;
		}

		.SubMenu {
			padding: 10px 16px;
		}
	}
</style>
