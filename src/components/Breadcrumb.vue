<template>
	<div class="card-content">
		<nav class="breadcrumb">
			<ul>
				<li>
					<router-link :to="{name:$route.meta.BreadUrl}">
					{{$route.meta.BreadName}}
					</router-link>
				</li>
				<li class="is-active">
					<a href="javascript:;" aria-current="page">{{$route.params.name}}</a>
				</li>
			</ul>
		</nav>
	</div>
</template>

<script>
	export default {
		name: 'Breadcrumb'
	}
</script>

<style scoped>
	.card-content{
		background-color: var(--bgcolor);
		margin-bottom: calc(var(--margin) / 2);
	}
	.breadcrumb>ul{
		color: #6C5CE7;
		display: flex;
		align-items: flex-start;
		flex-wrap: wrap;
		justify-content: flex-start;
		line-height: 21px;
	}
	.breadcrumb>ul>li{
		display: flex;
		align-items: center;
		font-size: 14px;
	}
	.breadcrumb>ul>li{
		padding-right: 10.5px;
	}
	.is-active{
		color: #363636;
	}
	.is-active>a{
		cursor: default;
		padding: 0 10.5px;
		box-sizing: border-box;
		pointer-events:none;
	}
	.is-active::before{
		content: "\0002f";
		color: #b5b5b5;
		font-size:20px
	}
</style>
