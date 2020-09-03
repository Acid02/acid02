<template>
	<div class="card-content">
		<div class="item-headline">
			<i class="iconfont icon-gonggao fas card-announcement-animation"></i>
			<span>公告</span>
		</div>
		<div class="announcement_content">
			<p class="ann-p">关注公众号，与我 <span class="inline-tag red">取得联系</span> 呀！</p>
			<img width="100%" class="loading" src="@/assets/images/qwx.png">
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Notice',
	}
</script>

<style scoped>
	.card-content {
		box-shadow: var(--shadow);
		background-color: var(--bgcolor);
	}
	.item-headline {
		font-size: 16px;
	}

	.fas {
		font-weight: 900;
		display: inline-block;
		font-style: normal;
		font-variant: normal;
		text-rendering: auto;
		line-height: 1;
	}

	.card-announcement-animation {
		color: red;
		animation: announ_animation .6s linear infinite alternate;
	}

	.item-headline span {
		margin-left: 10px;
		font-size: 16px;
	}

	.announcement_content {
		font-size: 14px;
	}
    .ann-p{
		margin: 10px 0;
		line-height: 1.5;
	}
	span.inline-tag {
		display: inline;
		padding: 5px 7px;
		font-size: 90%;
		font-weight: 400;
		line-height: 1;
		color: #fff;
		text-align: center;
		white-space: nowrap;
		vertical-align: baseline;
		border-radius: 6px;
		background-color: rgb(233, 30, 100);
	}

	.loading {
		max-width: 100%;
	}

	@keyframes announ_animation {
		to {
			transform: scale(1.3)
		}
	}
</style>
