<template>
	<transition name="fade">
		<div class="to-top" v-show="show" :class="[animations && 'to-topanim']" @click="goTop()"></div>
	</transition>
</template>

<script>
	export default {
		name:'GoUp',
		data(){
			return {
				show:false,
				animations:false
			}
		},
		created() {
			window.addEventListener('scroll', ()=>{
				let scrollTop = window.pageYOffset || document.documentElement.scrollTop ||
					document.body.scrollTop;
				if(scrollTop>=300){
					this.show = true
				}else{
					this.show = false
				}
			})
		},
		methods:{
			goTop(){
				if(!this.animations){
					this.animations = true;
					setTimeout(()=>{
						this.wayscroll(document.body)
						this.animations = false
					},500)
				}
			}
			
		}
	}
</script>

<style scoped>
	.to-top{
		    position: fixed;
		    bottom: 100px;
			right: 100px;
		    transform: translateY(0);
		    width: 62px;
		    height: 85px;
		    background-image: url(../assets/images/space-to-top.png);
		    background-position: -40px -44px;
			cursor: grab;
			z-index: 7;
	}
	.to-topanim{
		animation: spac 500ms steps(6);
	}
	.fade-enter-active, .fade-leave-active {
	    transition: opacity 500ms
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
	    opacity: 0
	}
	@keyframes spac{
		0%{background-position-x: -40px;}
		100%{background-position-x: -898px;}
	}
	@media screen and (max-width: 768px) {
		.to-top{
			bottom: 10px;
			right: 10px;
		}
	}
</style>
