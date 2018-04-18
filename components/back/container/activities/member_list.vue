<template>
	<div class="content_box">
		<h4><img src="/imgs/icon_search.png"/>查看活动</h4>
		<p>
			
			<input type="text" placeholder="请输入关键字,无内容则搜索所有" v-model="inputContent"/>
			<button @click="getActivityById">通过id搜索</button>
			<button @click="getActivityByName">通过名称搜索</button>
			<button @click="getActivityByBranch">通过支部搜索</button>
			<button @click="getActivityByDescribe">通过活动描述搜索</button>
		</p>
		<table>
			<thead>
				<tr>
					<th>活动名称</th>
					<th>学号</th>
					<th>姓名</th>
					<th>应缴费用</th>
					<th>缴费状态</th>
					<th>操作</th>
				</tr>
			</thead>
			<tr v-if="activityMemberData==''" style="text-align:center;">
				<td style="line-height:50px;font-size:20px" colspan="6">无要审核数据</td>
			</tr>
			<tr v-for="item in activityMemberData" :key="item.id">
				<td>{{item.activity_name}}</td>
				<td>{{item.member_sno}}</td>
				<td>{{item.member}}</td>
				<td>{{item.money}}</td>
				<td>{{item.money_status}}</td>
				<td><a :href="'#/tab/editActivity/'+item.id" class="edit">输入应缴费用</a></td>
			</tr>
		</table>
		<xpagination />
	</div>
</template>

<script>
	import xpagination from "../../xpagination.vue";
	import $ from 'jQuery';
	export default {
	  components: {
	    xpagination
	  },
	  data() {
	  	return {
	  		inputContent: '',
	  		activityMemberData: [] // 活动数据
	  	}
	  },
	  methods: {
	  	getAll() {
	  		var _this = this
	    	$.ajax({
	    		url: 'http://localhost:5555/allMemberActivity',
	    		type: 'POST',
	    		dataType: 'json',
	    		success(data) {
	    			_this.activityMemberData = data
	    		}
	    	})
	  	},
	  	getActivityById() {
	  		var _this = this
	    	$.ajax({
	    		url: 'http://localhost:5555/getActivityById',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			id: _this.inputContent
	    		},
	    		success(data) {
	    			_this.activityData = data
	    		}
	    	})
	  	},
	  	getActivityByName(){
	  		var _this = this
	  		$.ajax({
	    		url: 'http://localhost:5555/getActivityByName',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			name: _this.inputContent
	    		},
	    		success(data) {
	    			_this.activityData = data
	    		}
	    	})
	  	},
	  	getActivityByBranch(){
	  		var _this = this
	  		$.ajax({
	    		url: 'http://localhost:5555/getActivityByBranch',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			branch: _this.inputContent
	    		},
	    		success(data) {
	    			_this.activityData = data
	    		}
	    	})
	  	},
	  	getActivityByDescribe(){
	  		var _this = this
	  		$.ajax({
	    		url: 'http://localhost:5555/getActivityByDescribe',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			describe: _this.inputContent
	    		},
	    		success(data) {
	    			_this.activityData = data
	    		}
	    	})
	  	},
	  	deleteActivityById(id){
	  		var _this = this
	  		$.ajax({
	    		url: 'http://localhost:5555/deleteActivityById',
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
	    padding: 0 10px;
	    height: 30px;
	    background: #ed5564;
	    line-height: 30px;
	    color: #fff;
	    border-radius: 4px;
	    text-align: center;
	}
</style>