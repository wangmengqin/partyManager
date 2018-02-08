<template>
	<div style="overflow: hidden;margin: 0 auto; width: 1200px;padding: 20px 0;background: #FDFDFD;">
		<div class="publish-box">
			<p><img src="/imgs/gray_wode.png"/></p>
			<div class="txt-box">
				<span class="trangle"></span>
				<textarea name="" rows="5" cols="80" placeholder="你在做什么？你在想什么？"></textarea><br />
				<button>发表</button>
			</div>
		</div>
		<div class="other-message">
			<p class="message-menu">
				<span>交流</span>
				<a href="##">刷新</a>
			</p>
			<div class="message-box">
				<p class="img-p fl"><img src="/imgs/icon_mine.png"/></p>
				<div class="message-detail fl">
					<span class="trangle"></span>
					<h4><b>XXX</b>发表于<span>2018-02-07 11:23</span><a href="##">删除</a></h4>
					<p>呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵</p>
				</div>
			</div>
			<div class="message-box">
				<p class="img-p fl"><img src="/imgs/icon_mine.png"/></p>
				<div class="message-detail fl">
					<span class="trangle"></span>
					<h4><b>XXX</b>发表于<span>2018-02-07 11:23</span><a href="##">删除</a></h4>
					<p>呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵</p>
				</div>
			</div>
			<div class="message-box">
				<p class="img-p fl"><img src="/imgs/icon_mine.png"/></p>
				<div class="message-detail fl">
					<span class="trangle"></span>
					<h4><b>XXX</b>发表于<span>2018-02-07 11:23</span><a href="##">删除</a></h4>
					<p>呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵</p>
				</div>
			</div>
			<div class="message-box">
				<p class="img-p fl"><img src="/imgs/icon_mine.png"/></p>
				<div class="message-detail fl">
					<span class="trangle"></span>
					<h4><b>XXX</b>发表于<span>2018-02-07 11:23</span><a href="##">删除</a></h4>
					<p>呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵</p>
				</div>
			</div> 
		</div>
	</div>
</template>

<script>
</script>

<style scoped>
	.publish-box{
		overflow: hidden;
		zoom: 1;
		width: 800px;
		margin: 0 auto;
		padding-bottom: 20px;
	}
	.publish-box p{
		float: left;
		width: 80px;
		height: 80px;
		border-radius: 50%;
		border: 1px solid #eee;
		margin-right: 30px;
		margin-left: 10px;
		overflow: hidden;
	}
	.publish-box p img{
		width: 80px;
		height: 80px;
	}
	.txt-box{
		float: left;
		border: 1px solid #eee;
		padding: 20px;
		position: relative;
	}
	.trangle {
		position: absolute;
		width: 0;
	    height: 0;
	    border-top: 10px solid #FDFDFD;
	    border-right: 10px solid #F1F1F1;
	    border-bottom: 10px solid #FDFDFD;
	    top: 20px;
	    left: -10px;
	}
	.txt-box textarea{
		border: 0;
		border: 1px solid #666666;
		background: #FDFDFD;
		padding: 10px;
		outline: none;
	}
	.txt-box button {
		float: right;
		width: 100px;
		height: 30px;
		text-align: center;
		line-height: 30px;
		border: 0;
		background: #D93732;
		color: #fff;
		outline: none;
	}
	.other-message{
		overflow: hidden;
		zoom: 1;
		width: 800px;
		margin: 0 auto;
		position: relative;
	}
	.message-menu{
		line-height: 36px;
		border-bottom: 1px solid #eee;
		overflow: hidden;
		zoom: 1;
		width: 780px;
	}
	.message-menu a{
		float: right;
	}
	.message-menu span{
		display: inline-block;
		margin: 0 40px;
		padding: 0 10px;
		border: 1px solid #eee;
		border-bottom:0 ;
		position: absolute;
		top: 0px;
		background: #FDFDFD;
		color: #666;
	}
	.message-menu a{
		color: #D93732;
		padding-right: 10px;
	}
	.fl{
		float: left;
	}
	.message-box{
		overflow: hidden;
		zoom: 1;
		padding: 20px 0;
	}
	.img-p{
		width: 60px;
		height: 60px;
		border-radius: 50%;
		border: 1px solid #eee;
		margin-right: 30px;
		margin-left: 30px;
		overflow: hidden;
	}
	.img-p img {
		width: 60px;
		height: 60px;
	}
	.message-detail{
		/*border: 1px solid #eee;*/
		width: 640px;
		position: relative;
	}
	.message-detail h4{
		line-height: 36px;
		padding: 0 20px ;
		background: #D93732;
		color: #fff ;
		font-size: 14px;
	}
	.message-detail .trangle{
		border-right: 10px solid #D93732;
		top: 10px;
		margin: 0;
	}
	.message-detail b,.message-detail span,.message-detail a{
		margin: 0 10px ;
	}
	.message-detail a{
		color: #333;
	}
	.message-detail p{
		border: 1px solid #ccc;
		border-top: 0;
		padding-top: 10px;
		padding-left: 20px;
		padding-right: 20px;
		min-height: 50px;
		color: #333;
		line-height: 26px;
	}
</style>