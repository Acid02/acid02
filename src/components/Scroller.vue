<template>
	<div class="wrapper" ref='wrapper'>
		<slot></slot>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	export default {
		name:"Scroller",
		mounted() {
			this.$nextTick(()=>{
				var scrool = new BScroll(this.$refs.wrapper)
			})
			
		}
	}
</script>

<style scoped>
	.wrapper{
		height: 100%;
	}
</style>
