<template>
	<div class="friendaside">
		<div class="post-content">
			<h2>{{title}}</h2>
			<div class="flink-list">
				<ul>
					<li v-for="item in friendlist" :key='item.id'>
						<a :href="item.link" :title="item.name" target="_blank">
							<img :src="item.avatar" class="userimg">
							<h4>{{item.name}}</h4> 
							<p>{{item.descr}}</p>
						</a>
					</li>
				</ul>
			</div>
			
		</div>
	</div>
</template>

<script>
	export default {
	     name:'FriendAside',
		 props:{
			 title:{
				 type:String,
				 default:'大佬们的链接',
			 },
			 friendlist:{
				 type:Array,
				 default:()=>{}
			 }
		 }
	}
</script>

<style scoped>
	.friendaside{padding: 0 calc(var(--margin) / 4);box-sizing: border-box;}
	
	.post-content>h2{color: #344c67;font-weight: 700;font-size: 21px;margin: 14px 0;}
	.flink-list ul{display: flex;flex-wrap: wrap;}
	.flink-list ul li{position: relative;width:32.5%;margin-bottom:1.25%;transition: all .3s ease-out;border-radius: 5px;background-color: #dfe6e9;}
	.flink-list ul li:nth-child(3n+2){margin-right: 1.25%;margin-left: 1.25%;}
	.flink-list ul li:hover{background-color: #F2F9FC;}
	.flink-list ul li:hover img{transform: rotate(45deg);}
	.flink-list ul li a{display: block;padding: 0 10px 0 90px;height: 90px;color: #555;}
	.flink-list ul li a img{width: 60px;height: 60px;border-radius: 50%; position: absolute;top: 15px;left: 15px;cursor: pointer;margin: 0;border: 0;transition: all .3s ease-out;}
	.flink-list ul li a h4,.flink-list ul li a p{cursor: pointer; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; margin: 0;}
	.flink-list ul li a h4{ padding-top: 20px;font-size: 16px;}
	.flink-list ul li a p{margin: 10px 0; line-height: 24px;}
	@media screen and (max-width: 768px) {
		.flink-list ul li{width: 100%;margin-bottom: 10px;}
		.flink-list ul li:nth-child(3n+2){margin: unset;margin-bottom: 10px}
	}
</style>
