<template>
	<transition name="fade">
		<div id="masking" v-show="show" @click="MaskShow">
			<transition name="transform">
				<div v-show="show" class="dongh">
					<slot></slot>
				</div>
			</transition>
		</div>
	</transition>
</template>

<script>
	export default {
		name:"Masking",
	    props:{
			show:{
				type:Boolean,
				default:true
			}
		},
		methods:{
			MaskShow(){
				this.$emit('MaskShow')
			}
		}
	}
</script>

<style scoped>
	#masking{
		position: fixed;
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		background-color: rgba(0,0,0,0.8);
		z-index: 12;
	}
	.fade-enter-active, .fade-leave-active {
	  transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	  opacity: 0;
	}
	
	.transform-enter-active,.transform-leave-active{
	   transition: transform .5s;
	}
	.transform-enter, .transform-leave-to{
	   transform: translateX(100%);
	}
</style>
