<template>
	<div class="content_box">
		<h4><img src="/imgs/icon_search.png"/>查看公告</h4>
		<p>
			
			<input type="text" placeholder="请输入关键字" v-model="inputContent"/>
			<button @click="getInformById">通过公告id搜索</button>
			<button @click="getInformByTitle">通过标题搜索</button>
			<button @click="getInformByName">通过发布者搜索</button>
			<button @click="getInformByContent">通过详细内容搜索</button>
		</p>
		<table>
			<thead>
				<tr>
					<th>姓名</th>
					<th>编号</th>
					<th>标题</th>
					<th>发布时间</th>
					<th>操作</th>
				</tr>
			</thead>
			<tr v-if="informData==''" style="text-align:center;">
				<td style="line-height:50px;font-size:20px" colspan="5">无数据</td>
			</tr>
			<tr v-for="item in informData">
				<td>{{item.name}}</td>
				<td>{{item.sno}}</td>
				<td>{{item.title}}</td>
				<td>{{item.time | formatDate}}</td>
				<td><a :href="'#/tab/editInform/'+item.id" class="edit">详情</a><b @click="deleteInformById(item.id)" class="del">删除</b></td>
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
	  		informData: [] // 新闻数据
	  	}
	  },
	  methods: {
	  	getAll() {
	  		var _this = this
	    	$.ajax({
	    		url: 'http://localhost:5555/allInform',
	    		type: 'POST',
	    		dataType: 'json',
	    		success(data) {
	    			console.log(data)
	    			_this.informData = data
	    		}
	    	})
	  	},
	  	getInformById() {
	  		var _this = this
	    	$.ajax({
	    		url: 'http://localhost:5555/getInformById',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			id: _this.inputContent
	    		},
	    		success(data) {
	    			_this.informData = data
	    		}
	    	})
	  	},
	  	getInformByTitle(){
	  		var _this = this
	  		$.ajax({
	    		url: 'http://localhost:5555/getInformByTitle',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			title: _this.inputContent
	    		},
	    		success(data) {
	    			_this.informData = data
	    		}
	    	})
	  	},
	  	getInformByName(){
	  		var _this = this
	  		$.ajax({
	    		url: 'http://localhost:5555/getInformByName',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			name: _this.inputContent
	    		},
	    		success(data) {
	    			_this.informData = data
	    		}
	    	})
	  	},
	  	getInformByContent(){
	  		var _this = this
	  		$.ajax({
	    		url: 'http://localhost:5555/getInformByContent',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			content: _this.inputContent
	    		},
	    		success(data) {
	    			_this.informData = data
	    		}
	    	})
	  	},
	  	deleteInformById(id){
	  		var _this = this
	  		$.ajax({
	    		url: 'http://localhost:5555/deleteInform',
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
	  	this.getAll()
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