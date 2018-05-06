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
					<th>操作</th>
				</tr>
			</thead>
			<tr v-if="activityMemberData==''" style="text-align:center;">
				<td style="line-height:50px;font-size:20px" colspan="6">无要审核数据</td>
			</tr>
			<tr v-if="item.status == '已通过'" v-for="item in activityMemberData" :key="item.id">
				<td>{{item.activity_name}}</td>
				<td>{{item.member_sno}}</td>
				<td>{{item.member}}</td>
				<td v-if="item.money!=''">{{item.money}}元</td>
				<td v-else></td>
				<td>{{item.money_status}}</td>
				<td><b v-show="item.money==''" class="edit" @click="showFilter(item)">输入应缴费用</b></td>
				<td><b v-show="item.money_status=='待审核'" class="edit">确认已缴费</b></td>
			</tr>
		</table>
		<p class="filter" v-show="isShow"></p>
		<ul v-show="isShow">
			<h3>请填写应缴费用 <img style="width:20px;height:20px;position: absolute; right: 20px; top: 8px;" src="/imgs/icon_cancel.png" @click="hideFilter" /></h3>
			<li><span>交费的用户：</span><b>{{itemInfo.member}}</b></li>
			<li><span>学号：</span><b>{{itemInfo.member_sno}}</b></li>
			<li><span>费用：</span><input v-model="money" type="number" placeholder="此次要交的活动经费">元</li>
			<li style="text-align: center;"><button @click="submitMoney">提交</button><button @click="hideFilter">取消</button></li>
		</ul>
		<xpagination v-show="isShowPagination" :total="model.total" :size="model.size" :page="model.page" :changge="getAll"/>
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
	        isShowPagination: true,
	        isShow:false, // 显示输入框
	        itemInfo: [], // 要交费人的数据
	        money: null, // 要交费用
	  		inputContent: '',
	  		activityMemberData: [] // 活动数据
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
		submitMoney() {
			var _this = this
			if(this.money != ''){
				$.ajax({
					url: 'http://localhost:5555/editMemberMoney',
					type: 'POST',
					dataType: 'json',
					data: { id: _this.itemInfo.id, money: _this.money, money_status: '未缴费' },
					success() {
						alert('费用录入成功')
						_this.money = null
						_this.hideFilter()
					}
				}).done(function() {
					$.ajax({
			    		url: 'http://localhost:5555/allMemberActivity',
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
				
			} else {
				alert('请输入费用')
			}
		},
	  	getAll(val) {
	  		var _this = this
	  		this.model.page=val;
	  		this.isShowPagination = true
	  		$.ajax({
	    		url: 'http://localhost:5555/allMemberActivityCount',
	    		type: 'POST',
	    		dataType: 'json',
	    		success(data) {
	    			_this.model.total = data[0].count
	    		}
	    	})
	    	$.ajax({
	    		url: 'http://localhost:5555/allMemberActivity',
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
	  	},
	  	getActivityById() {
	  		var _this = this
	  		if(_this.inputContent == null) {
	  			this.isShowPagination = true
	  		} else {
	  			this.isShowPagination = false
	  		}
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
	  		if(_this.inputContent == null) {
	  			this.isShowPagination = true
	  		} else {
	  			this.isShowPagination = false
	  		}
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
	  		if(_this.inputContent == null) {
	  			this.isShowPagination = true
	  		} else {
	  			this.isShowPagination = false
	  		}
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
	  		if(_this.inputContent == null) {
	  			this.isShowPagination = true
	  		} else {
	  			this.isShowPagination = false
	  		}
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
	    			$.ajax({
			    		url: 'http://localhost:5555/allMemberActivity',
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