<template>
	<div class="content_box">
		<h4><img src="/imgs/icon_search.png"/>查看活动</h4>
		<p>
			
			<input type="text" placeholder="请输入关键字,无内容则搜索所有" v-model="inputContent"/>
			<button @click="getTeacherMemberById">通过编号搜索</button>
			<button @click="getTeacherMemberByName">通过姓名搜索</button>
		</p>
		<table>
			<thead>
				<tr>
					
					<th>编号</th>
					<th>姓名</th>
					<th>成为正式党员时间</th>
					<th>身份</th>
					<th>年月</th>
					<th>工资</th>
					<th>操作</th>
				</tr>
			</thead>
			<tr v-if="memberData==''" style="text-align:center;">
				<td style="line-height:50px;font-size:20px" colspan="6">无要审核数据</td>
			</tr>
			<tr v-for="item in memberData" :key="item.id">
				<td>{{item.sno}}</td>
				<td>{{item.member}}</td>
				<td>{{item.memberTime | formatDate}}</td>
				<td>{{item.type}}</td>
				<td>{{new Date(Number(item.memberTime)).getFullYear() +'年'+ (new Date(Number(item.memberTime)).getMonth()+1)+'月'}}</td>
				<td v-if="item.salary!=''">{{item.salary}}元</td>
				<td v-else></td>
				<td><b v-show="item.salary==''" class="edit" @click="showFilter(item)">录入工资</b></td>
			</tr>
		</table>
		<p class="filter" v-show="isShow"></p>
		<ul v-show="isShow">
			<h3>请填写工资 <img style="width:20px;height:20px;position: absolute; right: 20px; top: 8px;" src="/imgs/icon_cancel.png" @click="hideFilter" /></h3>
			<li><span>用户：</span><b>{{itemInfo.member}}</b></li>
			<li><span>编号：</span><b>{{itemInfo.sno}}</b></li>
			<li><span>工资：</span><input v-model="salary" type="number" placeholder="该老师的工资">元</li>
			<li style="text-align: center;"><button @click="submitSalary">提交</button><button @click="hideFilter">取消</button></li>
		</ul>
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
	        isShow:false, // 显示输入框
	        itemInfo: [], // 要录入的用户的数据
	        salary: null, // 工资
	  		inputContent: '',
	  		memberData: [] // 党员数据
	  	}
	  },
	  filters: {
		    formatDate(time) {
		        var date = new Date(Number(time));
		        return formatDate(date, 'yyyy-MM-dd hh:mm');
		    }
		},
	  methods: {
	  	showFilter(item) {
	  		this.isShow=true;
	  		this.itemInfo = item
	  	},
	  	hideFilter(){
			this.isShow=false;
			$("html").css('overflowY','auto');
		},
		submitSalary() {
			var _this = this
			if(this.salary != ''){
				var free // 党费
				if(this.salary <= 3000) {
					free = this.salary * 0.005 * 3
				} else if(3000 < this.salary <= 5000) {
					free = this.salary * 0.01 * 3
				} else if(5000 < this.salary <= 10000) {
					free = this.salary * 0.015 * 3
				} else {
					free = this.salary * 0.02 * 3
				}
				$.ajax({
					url: 'http://localhost:5555/editTeacherSalary',
					type: 'POST',
					dataType: 'json',
					data: { id: _this.itemInfo.id, salary: _this.salary, price: free },
					success() {
						alert('工资录入成功')
						_this.salary = null
						_this.hideFilter()
					}
				}).done(function() {
					$.ajax({
			    		url: 'http://localhost:5555/allTeacherPartyFree',
			    		type: 'POST',
			    		dataType: 'json',
			    		data: {
			    			size: _this.model.size,
			    			page: _this.model.page,
			    			type: '教师'
			    		},
			    		success(data) {
			    			_this.memberData = data
			    		}
			    	})
				})
				
			} else {
				alert('请输入费用')
			}
		},
	  	getAll(val) {
	  		var _this = this
	  		this.model.page=val;
	  		this.isShowPagination = true
	  		$.ajax({
	    		url: 'http://localhost:5555/allTeacherPartyFreeCount',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			type: '教师'
	    		},
	    		success(data) {
	    			_this.model.total = data[0].count
	    		}
	    	})
	    	$.ajax({
	    		url: 'http://localhost:5555/allTeacherPartyFree',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			size: _this.model.size,
	    			page: _this.model.page,
	    			type: '教师'
	    		},
	    		success(data) {
	    			_this.memberData = data
	    		}
	    	})
	  	},
	  	getTeacherMemberById() {
	  		var _this = this
	  		if(_this.inputContent == '') {
	  			this.isShowPagination = true
	  			$.ajax({
		    		url: 'http://localhost:5555/allTeacherPartyFree',
		    		type: 'POST',
		    		dataType: 'json',
		    		data: {
		    			size: _this.model.size,
		    			page: _this.model.page,
		    			type: '教师'
		    		},
		    		success(data) {
		    			_this.memberData = data
		    		}
		    	})
	  		} else {
	  			this.isShowPagination = false
	  		}
	    	$.ajax({
	    		url: 'http://localhost:5555/getTeacherMemberById',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			sno: _this.inputContent,
	    			type: '教师'
	    		},
	    		success(data) {
	    			_this.memberData = data
	    		}
	    	})
	  	},
	  	getTeacherMemberByName(){
	  		var _this = this
	  		if(_this.inputContent == '') {
	  			this.isShowPagination = true
	  			$.ajax({
		    		url: 'http://localhost:5555/allTeacherPartyFree',
		    		type: 'POST',
		    		dataType: 'json',
		    		data: {
		    			size: _this.model.size,
		    			page: _this.model.page,
		    			type: '教师'
		    		},
		    		success(data) {
		    			_this.memberData = data
		    		}
		    	})
	  		} else {
	  			this.isShowPagination = false
	  		}
	  		$.ajax({
	    		url: 'http://localhost:5555/getTeacherMemberByName',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			name: _this.inputContent,
	    			type: '教师'
	    		},
	    		success(data) {
	    			_this.memberData = data
	    		}
	    	})
	  	}
	  },
	  mounted() {
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
	.edit:hover {
		cursor: pointer;
		color: #fff;
		background: deepskyblue;
	}
	.filter{
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,.2);
		position: fixed;
		left: 0;
		top: 0;
	}
	ul{
		width: 500px;
		position: fixed;
		top: 30%;
		left: 35%;
		background: #fff;
		font-size: 12px;
		overflow: hidden;
		padding-bottom: 20px;
	}
	ul h3{
		text-align: center;
		background: #eee;
		line-height: 36px;
		position: relative;
	}
	li{
		padding: 10px;
		overflow: hidden;
	}
	ul li span{
		float: left;
		width: 80px;
		text-align: right;
    	padding-right: 30px;
	}
	ul li input{
		outline: none;
		padding:10px ;
	}
	ul li button{
		width: 50px;
		height: 30px;
		background: #D93732;
		border: 0;
		color: #fff;
		outline: none;
		margin: 0 25px;
	}
</style>