<template>
	<div class="content_box">
		<h4><img src="/imgs/icon_search.png"/>审核党费收缴情况</h4>
		<p>
			
			<input type="text" placeholder="请输入关键字,无内容则搜索所有" v-model="inputContent"/>
			<button @click="getOrgByName">通过党员姓名搜索</button>
			<button @click="getOrgByBranch">通过月份搜索</button>
		</p>
		<table>
			<thead>
				<tr>
					<th>姓名</th>
					<th>编号</th>
					<th>转正时间</th>
					<th>类型</th>
					<th>工资</th>
					<th>月份</th>
					<th>党费</th>
					<th>状态</th>
					<th>缴费时间</th>
					<th style="width: 200px;">操作</th>
				</tr>
			</thead>
			<tr v-if="freeData==''" style="text-align:center;">
				<td style="line-height:50px;font-size:20px" colspan="10">无要审核数据</td>
			</tr>
			<tr v-for="(item,index) in freeData" :key="item.id">
				<td>{{item.member}}</td>
				<td>{{item.sno}}</td>
				<td>{{item.memberTime | formatDate}}</td>
				<td>{{item.type}}</td>
				<td v-if="item.type=='教师' || item.type=='书记'">{{item.salary}}</td>
				<td v-else>学生无工资</td>
				<td>{{item.duration}}</td>
				<td>{{item.price}}</td>
				<td>{{item.status}}</td>
				<td v-if="item.payTime==''"></td>
				<td v-else>{{item.payTime | formatDate}}</td>
				<td v-if="(item.type=='教师' || item.type=='书记') && item.salary==''">
					<b @click="goSetSalary" class="del">去设置工资</b>
				</td>
				<td v-else>
					<b v-if="item.status=='待审核'" @click="checkFree(item.id,'已缴费')" class="edit">已收到党费</b>
					<b v-if="item.status=='待审核'" @click="checkFree(item.id,'未缴费')" class="del">没收到</b>
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
	  		freeData: [], // 党费数据
	  		inputContent: '' // 搜索的内容
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
	    		url: 'http://localhost:5555/allPartyFreeCount',
	    		type: 'POST',
	    		dataType: 'json',
	    		success(data) {
	    			_this.model.total = data[0].count
	    		}
	    	})
	  		_this.memberData = []
	    	$.ajax({
	    		url: 'http://localhost:5555/allPartyFree',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			size: _this.model.size,
	    			page: _this.model.page
	    		},
	    		success(data) {
	    			_this.freeData = data
	    		}
	    	})
	  	},
	  	goSetSalary() {
	  		this.$router.push({ path: '/tab/addSalary' })
	  	},
	  	checkFree(id,status){
	  		var _this = this
	  		$.ajax({
	    		url: 'http://localhost:5555/editStatusById',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			id: id,
	    			checkTime: new Date().getTime(),
	    			status: status
	    		},
	    		success(data) {
	    			alert('审核成功')
	    			$.ajax({
			    		url: 'http://localhost:5555/allPartyFree',
			    		type: 'POST',
			    		dataType: 'json',
			    		data: {
			    			size: _this.model.size,
			    			page: _this.model.page
			    		},
			    		success(data) {
			    			_this.freeData = data
			    		}
			    	})
	    		}
	    	})
	  	},
	  	getOrgByName() {
	  		var _this = this
	  		this.isShowPagination = false
	  		$.ajax({
	    		url: 'http://localhost:5555/getOrgByName',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			id: id,
	    			name: _this.inputContent
	    		},
	    		success(data) {
	    			_this.freeData = data
	    		}
	    	})
	  	},
	  	getOrgByBranch() {
	  		var _this = this
	  		this.isShowPagination = false
	  		$.ajax({
	    		url: 'http://localhost:5555/getOrgByBranch',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			id: id,
	    			branch: _this.inputContent
	    		},
	    		success(data) {
	    			_this.freeData = data
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