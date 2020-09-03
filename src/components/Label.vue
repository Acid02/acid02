<template>
	<div class="card-content">
		<div class="menu">
			<h3 class="menu-label">{{title}}</h3>
			<div class="field">
				<div class="control" v-for="(item,index) in Labeldata" :key='index'>
					<router-link :to="{name:'Labellist',params:{name:item.parent}}" class="tags">
						<span class="tag">{{item.parent}}</span>
						<span class="tag is-grey-lightest">{{item.count}}</span>
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Label",
		props:{
			title:{
				type:String||Number,
				default:'标签'
			},
			Labeldata:{
				type:Array,
				default:()=>[]
			}
		}
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
	.control{
		margin: 0 10.5px 10.5px 0;
	}
	.field{
		display: flex;
		flex-grow: 1;
		flex-wrap: wrap;
	}
	.tags{
		display: flex;
		align-items: center;
		justify-content: flex-start;
		text-decoration: none;
		color: #4A4A4A;
		font-size: 12px;
		border-radius: 4px;
		overflow: hidden;
	}
	.tag{
		padding: 0 7.875px;
		background-color: #f5f5f5;
		height: 21px;
		line-height: 1.9;
	}
	.is-grey-lightest{
		background-color: #ededed;
	}
	@media screen and (max-width: 768px) {
			.card-content{
				margin-bottom: 10px;
			}
		}
</style>
