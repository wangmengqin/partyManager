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
					<th>学号</th>
					<th>姓名</th>
					<th>考核时间</th>
					<th>考核地点</th>
					<th>考核成绩</th>
					<th>录入时间</th>
					<th>操作</th>
				</tr>
			</thead>
			<tr v-if="trainTestData==''" style="text-align:center;">
				<td style="line-height:50px;font-size:20px" colspan="7">无数据</td>
			</tr>
			<tr v-for="(item,index) in trainTestData" :key="item.id">
				<td>{{item.sno}}</td>
				<td>{{item.member}}</td>
				<td>{{item.testTime}}</td>
				<td>{{item.testPlace}}</td>
				<td>{{item.testGrade==0 ? '' : item.testGrade}}</td>
				<td v-if="item.upTime==''||item.upTime==null"></td>
				<td v-else>{{item.upTime | formatDate}}</td>
				<td>
					<b v-if="item.testTime == '' && item.testPlace == ''" @click="showInfo(item)" class="edit">录入考核信息</b>
					<b v-else @click="showGrade(item)" class="del">录入成绩</b>
				</td>
			</tr>
		</table>
		<p class="filter" v-show="isShowFilter"></p>
		<!-- 录入考核信息 -->
		<ul v-show="isShowInfo && !isShowGrade">
			<h3>请填写考核信息 <img style="width:20px;height:20px;position: absolute; right: 20px; top: 8px;" src="/imgs/icon_cancel.png" @click="hideInfo" /></h3>
			<li><span>用户：</span><b>{{itemInfo.member}}</b></li>
			<li><span>编号：</span><b>{{itemInfo.sno}}</b></li>
			<li><span>考核时间：</span><input v-model="testTime" type="text" placeholder="请输入考核时间"></li>
			<li><span>考核地点：</span><input v-model="testPlace" type="text" placeholder="请输入考核地点"></li>
			<li><span>座位号：</span>
				<select v-model="testNumber">
					<option v-for="item in numMap" :key="item.key" :value="item.key">{{item.key}}</option>
				</select>
			</li>
			<li style="text-align: center;"><button @click="submitInfo">提交</button><button @click="hideInfo">取消</button></li>
		</ul>
		<!-- 录入考核成绩 -->
		<ul v-show="isShowGrade && !isShowInfo">
			<h3>请填写考核成绩 <img style="width:20px;height:20px;position: absolute; right: 20px; top: 8px;" src="/imgs/icon_cancel.png" @click="hideGrade" /></h3>
			<li><span>用户：</span><b>{{itemInfo.member}}</b></li>
			<li><span>编号：</span><b>{{itemInfo.sno}}</b></li>
			<li><span>成绩：</span><input v-model="testGrade" type="number" placeholder="请输入考核成绩"></li>
			<li style="text-align: center;"><button @click="submitGrade">提交</button><button @click="hideGrade">取消</button></li>
		</ul>
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
	  		trainTestData: [], // 要审核的参加活动名单数据
	  		inputContent: '',
	  		isShowFilter: false,
	  		isShowInfo: false,
	  		isShowGrade: false,
	  		testTime: '',
	  		testPlace: '',
	  		testNumber: 1,
	  		testGrade: '',
	  		itemInfo: [], // 要录入数据的信息
	  		numMap: [
	  			{key: 1},
	  			{key: 2},
	  			{key: 3},
	  			{key: 4},
	  			{key: 5},
	  			{key: 6},
	  			{key: 7},
	  			{key: 8},
	  			{key: 9},
	  			{key: 10},
	  			{key: 11},
	  			{key: 12},
	  			{key: 13},
	  			{key: 14},
	  			{key: 15},
	  			{key: 16},
	  			{key: 17},
	  			{key: 18},
	  			{key: 19},
	  			{key: 20},
	  			{key: 21},
	  			{key: 22},
	  			{key: 23},
	  			{key: 24},
	  			{key: 25},
	  			{key: 26},
	  			{key: 27},
	  			{key: 28},
	  			{key: 29},
	  			{key: 30}
	  		]
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
	    		url: 'http://localhost:5555/allTrainTestCount',
	    		type: 'POST',
	    		dataType: 'json',
	    		success(data) {
	    			_this.model.total = data[0].count
	    		}
	    	})
	    	.done(function() {
	    		$.ajax({
		    		url: 'http://localhost:5555/allTrainTest',
		    		type: 'POST',
		    		dataType: 'json',
		    		data: {
		    			size: _this.model.size,
		    			page: _this.model.page
		    		},
		    		success(data) {
		    			_this.trainTestData = data
		    		}
		    	})
	    	})
	  	},
	  	submitInfo() {
	  		// 提交录入的考核信息
	  		var _this = this
	  		$.ajax({
	    		url: 'http://localhost:5555/addTimeAndPlace',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			testTime: _this.testTime,
	    			testPlace: _this.testPlace,
	    			testNumber: _this.testNumber,
	    			id: _this.itemInfo.id
	    		},
	    		success(data) {
	    			alert('录入信息成功')
	    			_this.hideInfo()
	    			$.ajax({
			    		url: 'http://localhost:5555/allTrainTest',
			    		type: 'POST',
			    		dataType: 'json',
			    		data: {
			    			size: _this.model.size,
			    			page: _this.model.page
			    		},
			    		success(data) {
			    			_this.trainTestData = data
			    		}
			    	})
	    		}
	    	})
	  	},
	  	submitGrade() {
	  		// 提交录入的考核成绩
	  		var _this = this
	  		console.log(this.testGrade<0 || this.testGrade>100)
	  		if(this.testGrade<0 || this.testGrade>100) {
	  			alert('成绩范围在0-100之间')
	  		} else {
	  			$.ajax({
		    		url: 'http://localhost:5555/addGrade',
		    		type: 'POST',
		    		dataType: 'json',
		    		data: {
		    			testGrade: _this.testGrade,
		    			upTime: new Date().getTime(),
		    			id: _this.itemInfo.id
		    		},
		    		success(data) {
		    			alert('录入成绩成功')
		    			_this.hideGrade()
		    			$.ajax({
				    		url: 'http://localhost:5555/allTrainTest',
				    		type: 'POST',
				    		dataType: 'json',
				    		data: {
				    			size: _this.model.size,
				    			page: _this.model.page
				    		},
				    		success(data) {
				    			_this.trainTestData = data
				    		}
				    	})
		    		}
		    	})
	  		}
	  	},
	  	hideInfo() {
	  		this.isShowFilter = false,
	  		this.isShowInfo = false
	  	},
	  	hideGrade() {
	  		this.isShowFilter = false,
	  		this.isShowGrade = false
	  	},
	  	showInfo(item) {
	  		this.itemInfo = item
	  		this.isShowFilter = true,
	  		this.isShowInfo = true
	  	},
	  	showGrade(item) {
	  		this.itemInfo = item
	  		this.isShowFilter = true,
	  		this.isShowGrade = true
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
	    			_this.trainTestData = data
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
	    			_this.trainTestData = data
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