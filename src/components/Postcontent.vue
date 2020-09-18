<template>
	<div class="post-content">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name:'Postcontent'
	}
</script>

<style scoped>
	.post-content {width: 100%;min-height:calc(100vh - 300px);padding: 50px 40px;border-radius: 8px;box-sizing: border-box;text-align: justify;word-break: break-all;box-shadow: 0 4px 8px 6px rgba(7, 17, 27, .06);transition: all .5s;}
	.post-content:hover {box-shadow: 0 4px 12px 12px rgba(7, 17, 27, .15);}
	@media screen and (max-width: 768px) {
		.post-content {padding: 17px 14px;}
	}
</style>
