<template>
	<div class="card-content">
		<div class="menu">
			<h3 class="menu-label">{{title}}</h3>
			<ul class="menu-list">
				<li v-for="(item,index) in Classifydata" :key='index'>
					<router-link :to="{name:'Classifylist',params:{'name':item.parent}}" class="level">
						<span class="level-start">
							 <span class="level-item">{{item.parent}}</span>
						</span>
						 <span class="level-end">
							 <span class="level-item tag">{{item.count}}</span>
						</span>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Classify',
		props:{
			title:{
				type:String||Number,
				default:'分类'
			},
			Classifydata:{
				type:Array,
				default:()=> []
			}
		},
	}
</script>

<style scoped>
	.card-content{
		background-color: var(--bgcolor);
	}
	.menu-label{
		color: #7a7a7a;
		font-size: 12px;
		margin-bottom: 10.5px;
		
	}
	.menu-list{
		line-height: 1.25;
	}

	.level{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 7px 10.5px;
	}
	.level:hover{
		background-color: #F5F5F5;
	}
	.level-start{
		font-size: 14px;
		font-size: normal;
		font-weight: 400;
	}
	.level-end{
		padding: 0 7.875px;
		background-color: #f5f5f5;
		height: 21px;
		line-height: 1.9;
		font-size: 12px;
		border-radius: 4px;
	}
	@media screen and (max-width: 768px) {
		.card-content{
			margin-bottom: 10px;
		}
	}
	
</style>
