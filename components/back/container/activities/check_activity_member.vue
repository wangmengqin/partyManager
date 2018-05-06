<template>
	<div class="content_box">
		<h4><img src="/imgs/icon_search.png"/>审核参加活动名单</h4>
		<p>
			
			<input type="text" placeholder="请输入关键字,无内容则搜索所有" v-model="inputContent"/>
			<button @click="getActivityMemberByName">通过活动名称搜索</button>
			<button @click="getActivityMemberBySno">通过学生学号搜索</button>
		</p>
		<table>
			<thead>
				<tr>
					<th>活动名称</th>
					<th>学号</th>
					<th>姓名</th>
					<th>审核状态</th>
					<th>操作</th>
				</tr>
			</thead>
			<tr v-if="activityMemberData==''" style="text-align:center;">
				<td style="line-height:50px;font-size:20px" colspan="5">无要审核数据</td>
			</tr>
			<tr v-for="(item,index) in activityMemberData" :key="item.id">
				<td>{{item.activity_name}}</td>
				<td>{{item.member_sno}}</td>
				<td>{{item.member}}</td>
				<td>{{item.status}}</td>
				<td><b @click="pass(item.id,index)" class="edit">通过</b><b @click="unPass(item.id)" class="del">不通过</b></td>
			</tr>
		</table>
		<xpagination :total="model.total" :size="model.size" :page="model.page" :changge="getAll"/>
	</div>
</template>

<script>
	import xpagination from "../../../pagination.vue";
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
	  		activityMemberData: [], // 要审核的参加活动名单数据
	  		inputContent: ''
	  	}
	  },
	  methods: {
	  	getAll(val) {
	  		var _this = this
	  		this.model.page=val;
	  		$.ajax({
	    		url: 'http://localhost:5555/allCheckMemberActivityCount',
	    		type: 'POST',
	    		dataType: 'json',
	    		success(data) {
	    			_this.model.total = data[0].count
	    		}
	    	})
	    	.done(function() {
	    		$.ajax({
		    		url: 'http://localhost:5555/allCheckMemberActivity',
		    		type: 'POST',
		    		dataType: 'json',
		    		data: {
		    			size: _this.model.size,
		    			page: _this.model.page
		    		},
		    		success(data) {
		    			_this.activityMemberData = data
		    		}
		    	})
	    	})
	  	},
	  	pass(id,index){
	  		var _this = this
	  		$.ajax({
	    		url: 'http://localhost:5555/editMemberActivityStatus',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			id: id,
	    			status: '已通过'
	    		},
	    		success(data) {
	    			alert('审核成功')
	    			$.ajax({
			    		url: 'http://localhost:5555/allCheckMemberActivity',
			    		type: 'POST',
			    		dataType: 'json',
			    		data: {
			    			size: _this.model.size,
			    			page: _this.model.page
			    		},
			    		success(data) {
			    			console.log(data)
			    			_this.activityMemberData = data
			    		}
			    	})
	    		}
	    	})
	  	},
	  	unPass(id){
	  		var _this = this
	  		$.ajax({
	    		url: 'http://localhost:5555/deleteMemberActivityById',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			id: id
	    		},
	    		success(data) {
	    			alert('审核成功')
	    			$.ajax({
			    		url: 'http://localhost:5555/allCheckMemberActivity',
			    		type: 'POST',
			    		dataType: 'json',
			    		data: {
			    			size: _this.model.size,
			    			page: _this.model.page
			    		},
			    		success(data) {
			    			console.log(data)
			    			_this.activityMemberData = data
			    		}
			    	})
	    		}
	    	})
	  	},
	  	getActivityMemberByName() {},
	  	getActivityMemberBySno() {}
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
	 	width: 100%;
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