<template>
	<div class="content_box">
		<h4><img src="/imgs/icon_search.png"/>审核参加培训名单</h4>
		<p>
			
			<input type="text" placeholder="请输入关键字,无内容则搜索所有" v-model="inputContent"/>
			<button @click="getTrainMemberByName">通过学生姓名搜索</button>
			<button @click="getTrainMemberByTitle">通过活动名称搜索</button>
		</p>
		<table>
			<thead>
				<tr>
					<th>培训名称</th>
					<th>学号</th>
					<th>姓名</th>
					<th>类型</th>
					<th>报名时间</th>
					<th>审核状态</th>
					<th>审核时间</th>
					<th>操作</th>
				</tr>
			</thead>
			<tr v-if="trainMemberData==''" style="text-align:center;">
				<td style="line-height:50px;font-size:20px" colspan="8">无要审核数据</td>
			</tr>
			<tr v-for="(item,index) in trainMemberData" :key="item.id">
				<td>{{item.title}}</td>
				<td>{{item.sno}}</td>
				<td>{{item.member}}</td>
				<td>{{item.type}}</td>
				<td>{{item.enrollTime | formatDate}}</td>
				<td>{{item.status}}</td>
				<td v-if="item.checkTime==''||item.checkTime==null"></td>
				<td v-else>{{item.checkTime | formatDate}}</td>
				<td>
					<b @click="check(0,item.id, item)" class="edit">通过</b>
					<b @click="check(1,item.id, item)" class="del">不通过</b>
				</td>
			</tr>
		</table>
		<xpagination :total="model.total" :size="model.size" :page="model.page" :changge="getAll"/>
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
	  		trainMemberData: [], // 要审核的参加活动名单数据
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
	  		$.ajax({
	    		url: 'http://localhost:5555/allTrainMemberCount',
	    		type: 'POST',
	    		dataType: 'json',
	    		success(data) {
	    			_this.model.total = data[0].count
	    		}
	    	})
	    	.done(function() {
	    		$.ajax({
		    		url: 'http://localhost:5555/allTrainMember',
		    		type: 'POST',
		    		dataType: 'json',
		    		data: {
		    			size: _this.model.size,
		    			page: _this.model.page
		    		},
		    		success(data) {
		    			_this.trainMemberData = data
		    		}
		    	})
	    	})
	  	},
	  	check(num, id, item){
	  		let status
	  		num == 0 ? status='已通过' : status = '不通过'
	  		var _this = this
	  		$.ajax({
	    		url: 'http://localhost:5555/checkTrain',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			id: id,
	    			status: status,
	    			checkTime: new Date().getTime()
	    		},
	    		success(data) {
	    			alert('审核成功')
	    			$.ajax({
			    		url: 'http://localhost:5555/allTrainMember',
			    		type: 'POST',
			    		dataType: 'json',
			    		data: {
			    			size: _this.model.size,
			    			page: _this.model.page
			    		},
			    		success(data) {
			    			_this.trainMemberData = data
			    		}
			    	})
			    	console.log(num, item)
			    	// 参加了党课培训，往考核表插入学号姓名，好安排考核
			    	if(num==0 && item.type == '党课') {
			    		$.ajax({
				    		url: 'http://localhost:5555/getTrainTestBySnoName',
				    		type: 'POST',
				    		dataType: 'json',
				    		data: {
				    			sno: item.sno,
				    			member: item.member
				    		},
				    		success(data) {
				    			if(data.length<=0) {
				    				console.log('没考核过')
				    				$.ajax({
							    		url: 'http://localhost:5555/addTrainTest',
							    		type: 'POST',
							    		dataType: 'json',
							    		data: {
							    			sno: item.sno,
				    						member: item.member
							    		},
							    		success(data) {
							    			console.log('插入成功')
							    		}
							    	})
				    			}
				    		}
				    	})
			    	}
	    		}
	    	})
	  	},
	  	getTrainMemberByName() {
	  		var _this = this
	  		this.isShowPagination = false
	  		$.ajax({
	    		url: 'http://localhost:5555/getTrainMemberByName',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			member: _this.inputContent
	    		},
	    		success(data) {
	    			_this.trainMemberData = data
	    		}
	    	})
	  	},
	  	getTrainMemberByTitle() {
	  		var _this = this
	  		this.isShowPagination = false
	  		$.ajax({
	    		url: 'http://localhost:5555/getTrainMemberByTitle',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			title: _this.inputContent
	    		},
	    		success(data) {
	    			_this.trainMemberData = data
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