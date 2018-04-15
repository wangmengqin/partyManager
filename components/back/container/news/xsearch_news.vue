<template>
	<div class="content_box">
		<h4><img src="/imgs/icon_search.png"/>查看新闻</h4>
		<p>
			
			<input type="text" placeholder="请输入关键字" v-model="inputContent"/>
			<button @click="getNewsById">通过id搜索</button>
			<button @click="getNewsByTitle">通过新闻标题搜索</button>
			<button @click="getNewsByRemark">通过摘要内容搜索</button>
			<button @click="getNewsByAuthor">通过作者搜索</button>
		</p>
		<table>
			<thead>
				<tr>
					<th>ID</th>
					<th>标题</th>
					<th>作者</th>
					<th>摘要</th>
					<th>专题</th>
					<th>时间</th>
					<th>操作</th>
				</tr>
			</thead>
			<tr v-for="item in newsData">
				<td>{{item.id}}</td>
				<td>{{item.title}}</td>
				<td>{{item.author}}</td>
				<td>{{item.remark}}</td>
				<td>{{item.theme}}</td>
				<td>{{item.time | formatDate}}</td>
				<td><a :href="'#/tab/editnews/'+item.id" class="edit">编辑</a><b @click="deleteNewsById(item.id)" class="del">删除</b></td>
			</tr>
		</table>
		<xpagination />
	</div>
</template>

<script>
	import xpagination from "../../xpagination.vue";
	import {formatDate} from '../../../../template/date.js';
	import $ from 'jQuery';
	export default {
	  components: {
	    xpagination
	  },
	  data() {
	  	return {
	  		inputContent: '',
	  		newsData: [] // 新闻数据
	  	}
	  },
	  methods: {
	  	getAll() {
	  		var _this = this
	    	$.ajax({
	    		url: 'http://localhost:5555/allNews',
	    		type: 'POST',
	    		dataType: 'json',
	    		success(data) {
	    			_this.newsData = data
	    		}
	    	})
	  	},
	  	getNewsById() {
	  		var _this = this
	    	$.ajax({
	    		url: 'http://localhost:5555/getNewsById',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			id: _this.inputContent
	    		},
	    		success(data) {
	    			_this.newsData = data
	    		}
	    	})
	  	},
	  	getNewsByTitle(){
	  		var _this = this
	  		$.ajax({
	    		url: 'http://localhost:5555/getNewsByTitle',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			title: _this.inputContent
	    		},
	    		success(data) {
	    			_this.newsData = data
	    		}
	    	})
	  	},
	  	getNewsByRemark(){
	  		var _this = this
	  		$.ajax({
	    		url: 'http://localhost:5555/getNewsByRemark',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			remark: _this.inputContent
	    		},
	    		success(data) {
	    			_this.newsData = data
	    		}
	    	})
	  	},
	  	getNewsByAuthor(){
	  		var _this = this
	  		$.ajax({
	    		url: 'http://localhost:5555/getNewsByAuthor',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			author: _this.inputContent
	    		},
	    		success(data) {
	    			_this.newsData = data
	    		}
	    	})
	  	},
	  	deleteNewsById(id){
	  		var _this = this
	  		$.ajax({
	    		url: 'http://localhost:5555/deleteNewsById',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			id: id
	    		},
	    		success(data) {
	    			_this.getAll();
	    		}
	    	})
	  	}
	  },
	  filters: {
        formatDate(time) {
            var date = new Date(Number(time));
            return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
	  },
	  mounted() {
	  	var _this = this
    	$.ajax({
    		url: 'http://localhost:5555/allNews',
    		type: 'POST',
    		dataType: 'json',
    		success(data) {
    			_this.newsData = data
    		}
    	})
	  }
	};
</script>

<style scoped>
	.content_box{
		width: 950px;
		float: right;
		background: #f9f9f9;
		min-height: 620px;
	}
	h4{
		padding-left: 20px;
		line-height: 50px;
		border-bottom: 1px solid #ccc;
	}
	.content_box p {
		line-height: 60px;
		text-align: center;
	}
	h4 img {
		width: 30px;
		height: 30px;
		vertical-align: middle;
		margin-right: 10px;
	}
	.content_box p input{
		width: 230px;
		height: 30px;
		border: 0;
		border: 1px solid #ccc;
		padding-left: 10px;
		outline: none;
		margin: 0 20px;
	}
	.content_box p button{
		height: 30px;
		text-align: center;
		line-height: 30px;
		border: 0;
		background: #D93732;
		outline: none;
		color: #fff;
		padding:0 10px;
	}
	table{
		width: 100%;
		border-collapse: collapse;
		font-size: 12px;
		color: #8c8c8c;
		margin-top: 30px;
		table-layout: fixed;
	}
	td{
		line-height: 26px;
		padding: 10px 0;
	}
	 table tr{
		text-align: center;
		border-bottom: 1px solid #eee;
	}
	 table thead{
		background: #f1f1f1;	
	}
	
	 table thead tr{
		line-height: 50px;
		font-size: 14px;
		color: #333;
		font-weight: 500;
		border-bottom:0;
	
	}
	.del{
		display: inline-block;
	    width: 35px;
	    height: 30px;
	    background: #ed5564;
	    line-height: 30px;
	    color: #fff;
	    border-radius: 4px;
	    text-align: center;
	    margin-left: 5px;
	    font-weight: 500;
	    cursor: pointer;
	}
	.edit{
		display: inline-block;
	    width: 35px;
	    height: 30px;
	    background: #ed5564;
	    line-height: 30px;
	    color: #fff;
	    border-radius: 4px;
	    text-align: center;
	}
</style>