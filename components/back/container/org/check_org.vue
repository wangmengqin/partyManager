<template>
	<div class="content_box">
		<h4><img src="/imgs/icon_search.png"/>审核组织关系的迁入迁出</h4>
		<p>
			
			<input type="text" placeholder="请输入关键字,无内容则搜索所有" v-model="inputContent"/>
			<button @click="getOrgByName">通过党员姓名搜索</button>
			<button @click="getOrgByBranch">通过支部搜索</button>
		</p>
		<table>
			<thead>
				<tr>
					<th>姓名</th>
					<th>学号</th>
					<th>支部</th>
					<th>迁出城市</th>
					<th>详细地址</th>
					<th>申请时间</th>
					<th>审核时间</th>
					<th>状态</th>
					<th style="width: 200px;">操作</th>
				</tr>
			</thead>
			<tr v-if="orgData==''" style="text-align:center;">
				<td style="line-height:50px;font-size:20px" colspan="8">无要审核数据</td>
			</tr>
			<tr v-for="(item,index) in orgData" :key="item.id">
				<td>{{item.name}}</td>
				<td>{{item.sno}}</td>
				<td>{{item.branch}}</td>
				<td>{{item.city}}</td>
				<td>{{item.address}}</td>
				<td>{{item.applyTime | formatDate}}</td>
				<td>{{item.checkTime | formatDate}}</td>
				<td>{{item.status}}</td>
				<td v-if="item.status=='待审核'"><b @click="checkOrg(item.id,'已通过')" class="edit">确认收到回执</b><b @click="checkOrg(item.id,'不通过')" class="del">不通过</b></td>
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
	  		orgData: [], // 组织关系迁入迁出数据
	  		inputContent: '' // 搜索的内容
	  	}
	  },
	  filters: {
	    formatDate(time) {
	        var date = new Date(Number(time));
	        return formatDate(date, 'yyyy-MM-dd');
	    }
	  },
	  methods: {
	  	getAll() {
	  		var _this = this
	  		_this.memberData = []
	    	$.ajax({
	    		url: 'http://localhost:5555/allCheckOrg',
	    		type: 'POST',
	    		dataType: 'json',
	    		success(data) {
	    			_this.orgData = data
	    		}
	    	})
	  	},
	  	checkOrg(id,status){
	  		var _this = this
	  		$.ajax({
	    		url: 'http://localhost:5555/editOrgStatus',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			id: id,
	    			checkTime: new Date().getTime(),
	    			status: status
	    		},
	    		success(data) {
	    			alert('审核成功')
	    			_this.getAll();
	    		}
	    	})
	  	},
	  	getOrgByName() {
	  		var _this = this
	  		$.ajax({
	    		url: 'http://localhost:5555/getOrgByName',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			id: id,
	    			name: _this.inputContent
	    		},
	    		success(data) {
	    			_this.orgData = data
	    		}
	    	})
	  	},
	  	getOrgByBranch() {
	  		var _this = this
	  		$.ajax({
	    		url: 'http://localhost:5555/getOrgByBranch',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			id: id,
	    			branch: _this.inputContent
	    		},
	    		success(data) {
	    			_this.orgData = data
	    		}
	    	})
	  	}
	  },
	  mounted() {
	  	var _this = this
    	_this.getAll()
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