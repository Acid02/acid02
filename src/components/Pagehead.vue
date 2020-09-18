<template>
	<div class="PageHead" :style="{'background-image':`url(${background})`}">
		
		<slot name="header"></slot>
		<div id="page_site-info"><h1 id="site_title">{{title}}</h1></div>
	</div>
</template>

<script>
	export default {
		name:'Pagehead',
		props:{
			title:{
				type:String||Number,
				default:'Friends'
			},
			background:{
				type:String,
				default:'https://cdn.jsdelivr.net/gh/xingjiahui/CDN@latest/2020/05/25/1e004758c7c23f58bee8868c83407224.png'
			}
		}
	}
</script>

<style scoped>
	.PageHead{background: no-repeat center/cover;width: 100%;height: 400px;position: relative;animation: slots-name 1s;}
	@keyframes slots-name {
		from{opacity: 0;transform: translateY(-50px);}
		to{opacity: 1;}
	}
	
	.PageHead #page_site-info{position: absolute; padding: 0 .5rem;box-sizing:border-box;width: 100%;left: 50%;top: 50%;transform: translate(-50%,-50%);text-align: center;}
	.PageHead #page_site-info #site_title{color: #eee;font-size: 40px;font-weight: 700;text-shadow: rgba(0, 0, 0, 0.15) 2px 2px 4px;}
	
	
	@media screen and (max-width: 768px) {
		.PageHead {height: 280px;}
		.PageHead #page_site-info #site_title{font-size: 26px;}
	}
</style>
