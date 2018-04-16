<template>
	<div style="overflow: hidden;margin: 0 auto; width: 1200px;padding: 20px 0;">
		<div class="theory" style="overflow: hidden;margin: 0 auto; width: 1200px;">
			<h3><img src="/imgs/icon_stydy.png"/>我要学习</h3>
			<ul>
				<h4>理论学习</h4>
				<li v-for="item in theoryData"><a href="##">{{item.title}}</a></li>
			</ul>
			<ul style="border-left: 1px solid #ccc;border-right: 1px solid #ccc;">
				<h4>时政新闻</h4>
				<li v-for="item in newsData"><a href="##">{{item.title}}</a></li>
			</ul>
			<ul>
				<h4>党史纵览</h4>
				<li v-for="item in historyData"><a href="##">{{item.title}}</a></li>
			</ul>
		</div>
		<div class="active_box">
			<h3><img src="/imgs/icon_active.png"/>推荐活动</h3>
			<ul>
				<li v-for="item in activityData">
					<img v-if="item.img==''" src="/imgs/activity.jpg" class="active_img"/>
					<img v-if="item.img!=''" :src="item.img" class="active_img"/>
					<div class="fl">
						<h5>{{item.activity_name}}</h5>
						<strong v-if="item.activity_describe!=''">{{item.activity_describe}}</strong>
						<strong v-if="item.speaker!=''">演讲人：{{item.speaker}}</strong>
						<br v-if="item.activity_speaker!=''"/>
						<em style="display: block;">地点：{{item.place}}</em>
						<b>时间：{{item.time}} <a @click="joinActivity(item.name,item.id)"><img src="/imgs/icon_return.png"/>我要参加</a></b>
					</div>
				</li>
			</ul>
			<div class="inform">
				<h4>公告栏</h4>
				<p><img src="/imgs/icon_inform.png"/><a href="##">关于李四同志任职的公示</a></p>
				<p><img src="/imgs/icon_inform.png"/><a href="##">关于李四同志任职的公示</a></p>
				<p><img src="/imgs/icon_inform.png"/><a href="##">关于李四同志任职的公示</a></p>
				<p><img src="/imgs/icon_inform.png"/><a href="##">关于李四同志任职的公示</a></p>
				<p><img src="/imgs/icon_inform.png"/><a href="##">关于李四同志任职的公示</a></p>
				<p><img src="/imgs/icon_inform.png"/><a href="##">关于李四同志任职的公示</a></p>
			</div>
		</div>
		<div class="zheng_box">
			<h3><img src="/imgs/icon_zheng.png"/>争先创优</h3>
			<dl>
				<dt><img src="/imgs/banner1.jpg"/></dt>
				<dd>十九大报告学习问答十九大报告学习问答十九大报告学习问答</dd>
			</dl>
			<dl>
				<dt><img src="/imgs/banner2.jpg"/></dt>
				<dd>十九大报告学习问答十九大报告学习问答十九大报告学习问答</dd>
			</dl>
			<dl>
				<dt><img src="/imgs/banner3.jpg"/></dt>
				<dd>十九大报告学习问答十九大报告学习问答</dd>
			</dl>
			<dl>
				<dt><img src="/imgs/banner4.jpg"/></dt>
				<dd>十九大报告学习问答十九大报告学习问答十九大报告学习问答十九大报告学习问答十九大报告学习问答</dd>
			</dl>
		</div>
		<div class="card_box">
			<h3><img src="/imgs/icon_xiaoxi.png"/>精选帖子</h3>
			<ul>
				<li>
					<h5>XXX</h5>
					<p><a href="##">这是论坛帖子这是论坛帖子这是论坛帖子这是论坛帖子这是论坛帖子是论坛帖子</a><span>2018-02-23 11:00:00</span></p>
				</li>
				<li>
					<h5>XXX</h5>
					<p><a href="##">这是论坛帖子这是论坛帖子这是论坛帖子这是论坛帖子这是论坛帖子是论坛帖子</a><span>2018-02-23 11:00:00</span></p>
				</li>
				<li>
					<h5>XXX</h5>
					<p><a href="##">这是论坛帖子这是论坛帖子这是论坛帖子这是论坛帖子这是论坛帖子是论坛帖子</a><span>2018-02-23 11:00:00</span></p>
				</li>
				<li>
					<h5>XXX</h5>
					<p><a href="##">这是论坛帖子这是论坛帖子这是论坛帖子这是论坛帖子这是论坛帖子是论坛帖子</a><span>2018-02-23 11:00:00</span></p>
				</li>
			</ul>
			<a class="look-more" href="##" title="查看更多">查看更多<img src="/imgs/more1.png"/></a>
		</div>
	</div>
</template>

<script>
import $ from 'jQuery'
export default {
	data(){
		return{
			theoryData: [], // 理论知识数据
			newsData: [], // 时政新闻数据
			historyData: [], // 党史数据
			lecture: {}, // 讲座活动
			branchActivity: {}, // 支部活动
			orgActivity: {}, // 组织生活
			activityData: []
		}
	},
	mounted() {
		var _this = this;
		$.ajax({
    		url: 'http://localhost:5555/getNewsByTheme',
    		type: 'POST',
    		dataType: 'json',
    		data: {theme: '理论学习'},
    		success(data){
    			_this.theoryData = data
    		}
    	})
    	$.ajax({
    		url: 'http://localhost:5555/getNewsByTheme',
    		type: 'POST',
    		dataType: 'json',
    		data: {theme: '时政新闻'},
    		success(data){
    			_this.newsData = data
    		}
    	})
    	$.ajax({
    		url: 'http://localhost:5555/getNewsByTheme',
    		type: 'POST',
    		dataType: 'json',
    		data: {theme: '党史纵览'},
    		success(data){
    			_this.historyData = data
    		}
    	})
    	$.ajax({
    		url: 'http://localhost:5555/allActivityDesc',
    		type: 'POST',
    		dataType: 'json',
    		success(data){
    			console.log(data)
    			_this.activityData = data
    		}
    	})
	},
	methods: {
		joinActivity(name, id) {
			
		}
	}
}
</script>

<style scoped>
	i,em{
		font-style: normal;
		color: #8C8C8C;
	}
	strong,b{
		font-weight: 500;
		color: #8C8C8C;
	}
	.theory ul{
		float: left;
		padding:0 50px;
		margin: 30px 0;
	}
	h3{
		font-weight: 500;
		font-size: 18px;
		line-height: 36px;
		border-bottom: 1px dashed #ccc;
	}
	h3 img{
		width: 20px;
		height: 20px;
		vertical-align: middle;
		margin-right: 5px;
	}
	.inform img{
		width: 20px;
		height: 20px;
		vertical-align: middle;
		margin-right: 5px;
	}
	ul li{
		line-height: 26px;
		overflow: hidden;
		zoom: 1;
	}
	.theory li{
		width: 295px;
		white-space: pre;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	ul li a{
		color: #333;
		font-size: 14px;
		cursor: pointer;
	}
	ul li a:hover{
		color: #D93732;
	}
	.active_box{
		overflow: hidden;
		zoom: 1;
	}
	.active_box ul{
		width: 800px;
		padding:30px;
		float: left;
		box-sizing: border-box;
	}
	.active_box ul li {
		font-size: 13px;
		margin-bottom: 20px;
	}
	h5{
		font-size: 16px;
	}
	.active_box ul li .active_img{
		float: left;
		width: 100px;
		height: 100px;
	}
	.active_box ul li a img{
		width: 20px;
		height: 20px;
		vertical-align: middle;
		margin-left: 80px;
	}
	.fl{
		float: left;
		margin-left: 20px;
	}
	
	.inform{
		width: 300px;
		float: left;
		text-align: center;
		background: #F9F9F9;
		margin-top: 30px;
		padding-bottom: 20px;
		margin-left: 20px;
	}
	.inform h4{
		line-height: 36px;
		background: #D93732;
		text-align: center;
		color: #fff;
		margin-bottom: 20px;
	}
	.inform p{
		line-height: 36px;
			font-size: 12px;
	}
	.inform a{
		color: #333;
	}
	.inform a:hover{
		color: #D93732;
	}
	.zheng_box{
		overflow: hidden;
	}
	.zheng_box dl{
		float: left;
		margin:0 22px;
		width: 250px;
		padding: 20px 0;
	}
	.zheng_box dl img{
		width: 250px;
	}
	.card_box h5{
		float: left;
		text-align: center;
		background: url(/imgs/gray_wode.png) no-repeat center top;
		padding-top: 40px;
		font-weight: 500;
	}
	.card_box ul li{
		width: 50%;
		float: left;
		margin-bottom: 20px;
	}
	.card_box ul{
		padding: 30px 30px 0;
		overflow: hidden;
	}
	.card_box ul p{
		width: 480px;
		white-space: pre;
		overflow: hidden;
		text-overflow: ellipsis;
		float: left;
    	line-height: 30px;
    	padding-left: 30px;
	}
	.card_box ul p span{
		display: block;
		font-size: 12px;
		color: #8C8C8C;
		text-align: right;
		margin-right: 20px;
	}
	.look-more{
		display: block;
	    width: 500px;
	    height: 40px;
	    line-height: 40px;
	    margin: 0 auto;
	    background: #eee;
	    color: #bfbfbf;
	    text-align: center;
	    font-size: 12px;
	}
	.look-more img{vertical-align: middle;width: 20px;height: 20px;}
	.look-more:hover{
		background: #DDDDD8;
		color: #333;
	}
</style>