<template>
	<div id="user-card" class="tools-item">
		<div class="photo-background">
			<div class="photo-background media"></div>
		</div>
		<div class="photo-wrapper clearfix">
			<div class="photo-wrapper-tip text-center">
				<img :src="UserInfo.useravatar" alt="头像" class="about-photo">
		    </div>
		</div>
		<p class="desc">{{UserInfo.nickname}}</p>
		<div id="user-card-info"><a id="user-card-article" class="giligili-left">
				<p class="num">{{UserInfo.Allarticles.length}}</p>
				<p class="text">文章</p>
			</a> <a id="user-card-shuoshuo" class="giligili-left">
				<p class="num">{{UserInfo.label.length}}</p>
				<p class="text">标签</p>
			</a> <a id="user-card-comment" class="giligili-left">
				<p class="num">{{UserInfo.article.length}}</p>
				<p class="text">分类</p>
			</a></div>
		<div class="textwidget">
			<div class="links-of-author motion-element">
				<span class="links-of-author-item">
					<a href="http://wpa.qq.com/msgrd?v=3&uin=1716815045&site=qq&menu=yes" target="_blank" title="qq" class="el-tooltip item">
						<i class="iconfont icon-iconfonticon6"></i>
					</a>
				</span>
				<span class="links-of-author-item">
					<a href="http://mp.weixin.qq.com/mp/getmasssendmsg?__biz=MjM5ODI0MjA1NA==#wechat_redirect" target="_blank" title="联系博主" class="el-tooltip item">
					   <i class="iconfont icon-gongzhonghao"></i>
				    </a>
				</span>
				<span class="links-of-author-item">
					<a href="https://github.com/acid02/" target="_blank" title="GitHub" class="el-tooltip item">
						<i class="iconfont icon-github"></i>
					</a>
				</span>
				<span class="links-of-author-item">
					<a href="Mailto:1716815045@qq.com" target="_blank" title="邮箱" class="el-tooltip item">
						<i class="iconfont icon-youxiang"></i>
					</a>
				</span>
				<span class="links-of-author-item">
					<a href="" target="_blank" title="图片和电影" class="el-tooltip item">
						<i class="iconfont icon-duomeiti6"></i>
					</a>
				</span>
				
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'UserCard',
		data(){
			return{
				UserInfo:this.$store.state.UserInfo.data
			}
		}
	}
</script>

<style scoped>
	#user-card{
		text-align: center;
		box-shadow: var(--shadow);
		padding-bottom: 20px;
		border-radius: var(--radius);
		overflow: hidden;
		background-color: var(--bgcolor);
	}
	.about-photo{
		left: 133px;
		margin: -50px 0 0;
		width: 90px;
		height: 90px;
		border: 4px solid hsla(0,0%,100%,.4);
		border-radius: 50%;
		transition: all .3s;
		cursor: pointer;
	}
	.about-photo:hover{
		transform: scale(1.3) rotate(1turn);
	}
	.desc{
		margin: 16px 0;
	}
	.photo-background{
	    height: 160px;
	}
	.photo-background .media{
		background: url('../assets/images/banner1.jpg') top/cover no-repeat;
	}
	.photo-wrapper{
	    width: 100%;
	}
	#user-card-info{
		line-height: 2;
	    overflow: hidden;
	}
	#user-card-info>a{
	    width: 33.3%;
	    text-align: center;
	    float: left;
	    cursor: pointer;
	}
	#user-card-info .num{
	    letter-spacing: 0;
	    font-weight: 700;
	    font-size: 14px;
	    color: #6C5CE7;
	}
	.links-of-author{
	    display: flex;
	    flex-wrap: wrap;
	    justify-content: center;
	}
	
	.links-of-author-item{
	    margin: 5px 4px 0;
	    border-radius: 50%;
	}
	.links-of-author-item a{
	    display: block;
	    text-decoration: none;
	    overflow: visible;
	    max-width: 216px;
	    box-sizing: border-box;
	    display: inline-block;
	    margin-right: 0;
	    margin-bottom: 0;
	    padding: 0 5px;
	    overflow: hidden;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	    border-bottom: none;
	    font-size: 16px;
	    width: 42px;
	    height: 42px;
	    line-height: 42px;
	    border-radius: 7px;
	    color: rgba(0,0,0,.5);
	    background-color: rgba(0,0,0,.1);
	    font-style: normal;
	    display: flex;
	    vertical-align: middle;
	    align-items: center;
	    justify-content: center;
	}
	@media (min-width: 768px) and (max-width: 1200px) {
		.photo-background{
			height: 108px;
		}
		.about-photo{
			width: 70px;
			height: 70px;
			margin: -40px 0 0;
		}
		.desc{
			margin: 10px 0;
		}
		.links-of-author-item a{
			width: 30px;
			height: 30px;
		}
		.text{
			font-size: 12px;
		}
	}
</style>
