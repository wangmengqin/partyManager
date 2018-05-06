<template>
	<div class="content_box">
		<h4><img src="/imgs/icon_search.png"/>审核留言</h4>
		<p>
			
			<input type="text" placeholder="请输入关键字,无内容则搜索所有" v-model="inputContent"/>
			<button @click="getMessageByContent">通过内容搜索</button>
			<button @click="getMessageBySno">通过学号搜索</button>
		</p>
		<table>
			<thead>
				<tr>
					<th>头像</th>
					<th>学号</th>
					<th>姓名</th>
					<th>内容</th>
					<th>时间</th>
					<th>状态</th>
					<th>操作</th>
				</tr>
			</thead>
			<tr v-if="messageData==''" style="text-align:center;">
				<td style="line-height:50px;font-size:20px" colspan="7">无数据</td>
			</tr>
			<tr v-for="(item,index) in messageData" :key="item.id">
				<td><img :src="item.head" alt="用户头像"></td>
				<td>{{item.sno}}</td>
				<td>{{item.name}}</td>
				<td>{{item.content}}</td>
				<td>{{item.time | formatDate}}</td>
				<td>{{item.status}}</td>
				<td>
					<b v-show="item.status=='隐藏'" @click="editStatus(item.id, '显示')" class="edit">显示</b>
					<b v-show="item.status=='显示' || item.status=='精选'" @click="editStatus(item.id, '隐藏')" class="del">隐藏</b>
					<b v-show="item.status=='显示'" @click="editStatus(item.id, '精选')" class="del">精选</b>
				</td>
			</tr>
		</table>
		<xpagination v-show="isShowPagination" :total="model.total" :size="model.size" :page="model.page" :changge="getAll"/>
	</div>
</template>

<script>
	import xpagination from "../../../pagination.vue";
	import {formatDate} from '../../../../template/date.js';
	import $ from 'jQuery';
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
	  		messageData: [], // 留言信息数据
	  		inputContent: ''
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
	    		url: 'http://localhost:5555/allMessageCount',
	    		type: 'POST',
	    		dataType: 'json',
	    		success(data) {
	    			_this.model.total = data[0].count
	    		}
	    	})
	    	$.ajax({
	    		url: 'http://localhost:5555/allMessage',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			size: _this.model.size,
	    			page: _this.model.page
	    		},
	    		success(data) {
	    			_this.messageData = data
	    		}
	    	})
	  	},
	  	editStatus(id, status){
	  		var _this = this
	  		$.ajax({
	    		url: 'http://localhost:5555/editMessageStatus',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			id: id,
	    			status: status
	    		},
	    		success(data) {
	    			alert('设置成功')
	    			$.ajax({
			    		url: 'http://localhost:5555/allMessage',
			    		type: 'POST',
			    		dataType: 'json',
			    		data: {
			    			size: _this.model.size,
			    			page: _this.model.page
			    		},
			    		success(data) {
			    			_this.messageData = data
			    		}
			    	})
	    		}
	    	})
	  	},
	  	getMessageByContent() {
	  		var _this = this
	  		this.isShowPagination = false
	  		$.ajax({
	    		url: 'http://localhost:5555/getMessageByContent',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			content: _this.inputContent
	    		},
	    		success(data) {
	    			_this.messageData = data
	    		}
	    	})
	  	},
	  	getMessageBySno() {
	  		var _this = this
	  		this.isShowPagination = false
	  		$.ajax({
	    		url: 'http://localhost:5555/getMessageBySno',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			sno: _this.inputContent
	    		},
	    		success(data) {
	    			_this.messageData = data
	    		}
	    	})
	  	}
	  },
	  mounted() {
	  	var _this = this
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
	table img {
		width: 64px;
		height: 64px;
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
	    padding: 0 5px;
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
	    padding: 0 5px;
	    height: 30px;
	    background: deepskyblue;
	    line-height: 30px;
	    color: #fff;
	    border-radius: 4px;
	    text-align: center;
	    cursor: pointer;
	}
</style>