<template>
  <div id="app">
	  <Masking v-if='$store.state.UserInfo.isLoading'>
	  		<Loading/>
	  </Masking>
	<template v-else>
		<!-- <div id="soketShow" @click="show = !show" title="网页聊天室" v-if="winWidth>790"></div> -->
			<keep-alive>
			    <router-view v-if="$route.meta.keepAlive" :winWidth='winWidth'/>
			</keep-alive>
			<router-view v-if="!$route.meta.keepAlive" :winWidth='winWidth'/>
	</template>
  </div>
</template>

<script>
import Masking from '@/components/Masking' //蒙层

export default {
  name: 'App',
  components: {Masking},
  data(){
	 return {
		 show:true,
		 winWidth:document.body.offsetWidth ||document.documentElement.offsetWidth,
	 }
  },
  created(){
	 window.onresize = ()=>{
		 this.winWidth = document.body.offsetWidth ||document.documentElement.offsetWidth;
	 }
  },
}
</script>

<style scoped="scoped">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
/* #soketShow{
	position: fixed;
	width: 80px;
	height: 80px;
	bottom: 24%;
	right: 2%;
	background: #6c5ce7 url(./assets/images/default_hd.jpg) no-repeat center/cover;
	border-radius: 50%;
	z-index: 9;
} */
</style>
