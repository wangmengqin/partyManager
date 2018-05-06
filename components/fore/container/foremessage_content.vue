<template>
	<div style="overflow: hidden;margin: 0 auto; width: 1200px;padding: 20px 0;background: #FDFDFD;">
		<div class="publish-box">
			<p><img :src="head"/></p>
			<div class="txt-box">
				<span class="trangle"></span>
				<textarea v-model="content" name="" rows="5" cols="80" placeholder="你在做什么？你在想什么？"></textarea><br />
				<button @click="addMessage">发表</button>
			</div>
		</div>
		<div class="other-message">
			<p class="message-menu">
				<span>交流</span>
				<a @click="fresh">刷新</a>
				<b style="float: right;margin-right:20px;" @click="lookMyMessage">查看我发表的</b>
				<b style="float: right;margin-right:20px;" @click="lookRecommandMessage">查看精选</b>
			</p>
			<div class="message-box" v-for="item in messageData" :key="item.id">
				<p class="img-p fl"><img :src="item.head"/></p>
				<div class="message-detail fl">
					<span class="trangle"></span>
					<h4><b>{{item.name}}</b>发表于<span>{{item.time | formatDate}}</span><a @click="deleteMyMessage(item.id)" v-if="item.name==memberName && item.sno == sno">删除</a></h4>
					<p>{{item.content}}</p>
				</div>
			</div>
			<!-- <div class="message-box">
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
			</div>  -->
			<xpagination v-show="isShowPagination" :total="model.total" :size="model.size" :page="model.page" :changge="getAll"/>
		</div>
	</div>
</template>

<script>
import xpagination from "../../pagination.vue";
import $ from 'jQuery'
import {formatDate} from '../../../template/date.js';
export default {
	components: {
	    xpagination
	},
	data() {
		return {
			model:{
	            total: 1,//总页数
	            size:5,//每页显示条目个数不传默认10
	            page:1,//当前页码
	        },
	        isShowPagination: true,
			messageData: [],
			content: '', // 发表的内容
			sno: null, // 登录的学号
			memberName: null,
			head: null
		}
	},
	filters: {
	    formatDate(time) {
	        var date = new Date(Number(time));
	        return formatDate(date, 'yyyy-MM-dd hh:mm');
	    }
	},
	methods: {
		getAll(val) {
			var _this = this
	  		this.model.page=val;
	  		this.isShowPagination = true
            $.ajax({
	    		url: 'http://localhost:5555/allShowMessageCount',
	    		type: 'POST',
	    		dataType: 'json',
	    		success(data) {
	    			_this.model.total = data[0].count
	    		}
	    	})
			this.sno = sessionStorage.getItem('sno')
			$.ajax({
	    		url: 'http://localhost:5555/getMemberBySno',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			sno: _this.sno
	    		},
	    		success(data) {
	    			_this.memberName = data[0].name
	    			_this.head = data[0].head
	    		}
	    	})
			$.ajax({
				url: 'http://localhost:5555/allShowMessage',
				type: 'POST',
				dataType: 'json',
				data: {
	    			size: _this.model.size,
	    			page: _this.model.page
	    		},
				success(data){
					_this.messageData = data
				}
			})
		},
		// 刷新
		fresh() {
			var _this = this
			$.ajax({
				url: 'http://localhost:5555/allShowMessage',
				type: 'POST',
				dataType: 'json',
				data: {
	    			size: _this.model.size,
	    			page: _this.model.page
	    		},
				success(data){
					_this.messageData = data
				}
			})
		},
		addMessage() {
			var _this = this
			this.sno = sessionStorage.getItem('sno')
			if (this.sno != null) {
				$.ajax({
		    		url: 'http://localhost:5555/getMemberBySno',
		    		type: 'POST',
		    		dataType: 'json',
		    		data: {
		    			sno: _this.sno
		    		},
		    		success(data) {
		    			_this.memberName = data[0].name
		    			_this.head = data[0].head
		    		}
		    	})
		    	.done(() => {
		    		if(_this.content != '') {
		    			$.ajax({
				    		url: 'http://localhost:5555/addMessage',
				    		type: 'POST',
				    		dataType: 'json',
				    		data: {
				    			sno: _this.sno,
					    		name: _this.memberName,
					    		head: _this.head,
					    		content: _this.content,
					    		time: new Date().getTime(),
					    		status: '显示'
				    		},
				    		success(data) {
				    			alert('发表成功')
				    			_this.getAll()
				    			_this.content = ''
				    		}
				    	})
		    		} else {
		    			alert('内容不能为空，请输入内容')
		    		}
		    	})
			}
			else{
				alert('获取信息失败，请重新登录')
				location.href = '#/login'
			}
		},
		lookMyMessage() {
			var _this = this
			$.ajax({
	    		url: 'http://localhost:5555/getMessageBySno',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			sno: _this.sno
	    		},
	    		success(data) {
	    			_this.messageData = data
	    		}
	    	})
		},
		lookRecommandMessage() {
			var _this = this
			$.ajax({
	    		url: 'http://localhost:5555/allRecommandMessage',
	    		type: 'POST',
	    		dataType: 'json',
	    		success(data) {
	    			_this.messageData = data
	    		}
	    	})
		},
		deleteMyMessage(id) {
			var _this = this
			$.ajax({
	    		url: 'http://localhost:5555/deleteMessage',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			id: id
	    		},
	    		success(data) {
	    			alert('删除成功')
	    			$.ajax({
						url: 'http://localhost:5555/allShowMessage',
						type: 'POST',
						dataType: 'json',
						data: {
			    			size: _this.model.size,
			    			page: _this.model.page
			    		},
						success(data){
							_this.messageData = data
						}
					})
	    		}
	    	})
		}
	},
	mounted() {
	}
}
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
	.message-menu a, .message-menu  b{
		color: #D93732;
		padding-right: 10px;
		cursor: pointer;
		font-weight: 500;
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