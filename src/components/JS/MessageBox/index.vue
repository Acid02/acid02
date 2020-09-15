<template>
	<div class="messageBox">
		<h2>{{ title }}</h2>
		<p>{{ content }}</p>
		<div>
			<div @click="handleCancel">{{ cancel }}</div>
			<div @click="handleOK">{{ ok }}</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:'MessageBox'
	}
</script>

<style scoped>
	.messageBox{color:#333;width: 17em;padding-top: 10px;border-radius: 15px;font-family:'PT_Sans-Web-Regular';background-color: ghostwhite;position: fixed;left: 50%;top: 42%;transform: translate(-50%, -50%);text-align: center;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);}
	.messageBox>h2{font-weight: bold;font-size: 20px;font-family: '微软雅黑';line-height: 28.5714px;}
	.messageBox>p{color: pink;padding:0 2%;padding-bottom: 12px;line-height: 22.8571px;}
	.messageBox>div{display: flex;color: dodgerblue;font-weight: bold;font-size: 15px;font-family: '微软雅黑';cursor: pointer;}
	.messageBox>div div{flex: 1;text-align: center;border-top: 1px solid gainsboro;height: 2.5em;line-height: 2.5em;border-right: 1px solid gainsboro;}
	.messageBox>div div:last-child{border-right: none;}
</style>
