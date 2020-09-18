<template>
	<main id="layout">
		<div id="web_bg"></div>
		<section class="content-inner">
			<article class="aside  aside_left" v-if="length.includes('1')">
				<slot name="left"></slot>
			</article>
			<article class="aside  aside_center" v-if="length.includes('2')">
				<slot name="center"></slot>
			</article>
			<article class="aside aside_right" v-if="length.includes('3')">
				<slot name="right"></slot>
			</article>
		</section>
	</main>
</template>

<script>
	export default {
		name:'Layout',
		props:{
			length:{
				type:String || Number,
				default:123,
			}
		}
	}
</script>

<style scoped>
	#layout .content-inner{max-width: 1400px;margin: 0 auto;padding: 40px 10px;box-sizing: border-box;display: flex;flex-wrap: wrap;justify-content: center;animation: slot-name 1s;}
	@keyframes slot-name{
		from{opacity: 0;transform: translateY(50px);}
		to{transform: translateY(0px);opacity: 1;}
	}
	/* 背景墙 */
	#web_bg{position: fixed;top:0;width: 100%;height: 100%;z-index: -999;background: var(--light_bg_color);opacity: 0;animation: to_show 4s 1s forwards;}
	@keyframes to_show {
		from {opacity: 0;filter: alpha(opacity=0);}
	    to {opacity: 1;filter: none;}
	}
	#layout .content-inner .aside{margin-bottom: 10px;}
    #layout .content-inner .aside_left,.aside_right {width: 25%;}
	#layout .content-inner .aside_left{position: sticky;top: 65px;height: 100%;}
	/* #layout .content-inner .aside-margin {margin: var(--margin) 0;} */
	#layout .content-inner .aside_center {padding: 0 calc(var(--margin) / 4);box-sizing: border-box;width: 50%;flex: 1;}
	@media screen and (max-width: 768px) {
		#layout .content-inner {padding: 20px 5px;}
		#layout .content-inner .aside_left,.aside_right,.aside_center {width: 100%;margin-bottom: 0;}
		#layout .content-inner .aside_center {padding: 0;order: 1;}
		#layout .content-inner .aside_left{order: 2;}
		#layout .content-inner .aside_right {margin-top: calc(var(--margin) / 2);}
		/* .aside-margin {margin: 10px 0;} */
	}
</style>
