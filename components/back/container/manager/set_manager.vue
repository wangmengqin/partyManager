<template>
	<div class="content_box">
		<h4><img src="/imgs/icon_search.png"/>查看党员</h4>
		<p>
			
			<input type="text" placeholder="请输入关键字,无内容则搜索所有" v-model="inputContent"/>
			<button @click="getMemberByName">通过党员姓名搜索</button>
			<button @click="getMemberByInstitute">通过学院搜索</button>
			<button @click="getMemberBySno">通过党员编号搜索</button>
		</p>
		<table>
			<thead>
				<tr>
					<th>姓名</th>
					<th>性别</th>
					<th>年龄</th>
					<th>编号</th>
					<th>学院</th>
					<th>身份</th>
					<th>支部</th>
					<th>籍贯</th>
					<th>操作</th>
				</tr>
			</thead>
			<tr v-if="memberData==''" style="text-align:center;">
				<td style="line-height:50px;font-size:20px" colspan="9">无数据</td>
			</tr>
			<tr v-for="item in memberData">
				<td>{{item.name}}</td>
				<td>{{item.sex}}</td>
				<td>{{item.age}}</td>
				<td>{{item.sno}}</td>
				<td>{{item.institute}}</td>
				<td>{{item.identify}}</td>
				<td>{{item.branch}}</td>
				<td>{{item.native}}</td>
				<td><b @click="addManager(item)" class="del">设置管理员</b></td>
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
	  		memberData: [] // 党员信息数据
	  	}
	  },
	  methods: {
	  	getAll() {
	  		var _this = this
	  		_this.memberData = []
	    	$.ajax({
	    		url: 'http://localhost:5555/allMember',
	    		type: 'POST',
	    		dataType: 'json',
	    		success(data) {
	    			for (var i in data) {
	    				if(data[i].identify == '书记' && data[i].identify != '不通过'){
	    					_this.memberData.push(data[i])
	    				}
	    			}
	    		}
	    	})
	  	},
	  	getMemberByName() {
	  		var _this = this
	  		_this.memberData = []
	    	$.ajax({
	    		url: 'http://localhost:5555/getMemberByName',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			name: _this.inputContent
	    		},
	    		success(data) {
	    			for (var i in data) {
	    				if(data[i].identify == '书记' && data[i].identify != '不通过'){
	    					_this.memberData.push(data[i])
	    				}
	    			}
	    		}
	    	})
	  	},
	  	getMemberByInstitute(){
	  		var _this = this
	  		_this.memberData = []
	  		$.ajax({
	    		url: 'http://localhost:5555/getMemberByInstitute',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			institute: _this.inputContent
	    		},
	    		success(data) {
	    			for (var i in data) {
	    				if(data[i].identify == '书记' && data[i].identify != '不通过'){
	    					_this.memberData.push(data[i])
	    				}
	    			}
	    		}
	    	})
	  	},
	  	getMemberByMajor(){
	  		var _this = this
	  		_this.memberData = []
	  		$.ajax({
	    		url: 'http://localhost:5555/getMemberByMajor',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			major: _this.inputContent
	    		},
	    		success(data) {
	    			for (var i in data) {
	    				if(data[i].identify == '书记' && data[i].identify != '不通过'){
	    					_this.memberData.push(data[i])
	    				}
	    			}
	    		}
	    	})
	  	},
	  	getMemberBySno(){
	  		var _this = this
	  		_this.memberData = []
	  		$.ajax({
	    		url: 'http://localhost:5555/getMemberBySno',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			sno: _this.inputContent
	    		},
	    		success(data) {
	    			for (var i in data) {
	    				if(data[i].identify == '书记' && data[i].identify != '不通过'){
	    					_this.memberData.push(data[i])
	    				}
	    			}
	    		}
	    	})
	  	},
	  	addManager(memberInfo){
	  		var _this = this
	  		$.ajax({
	    		url: 'http://localhost:5555/addManager',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			name: memberInfo.name,
	    			sex: memberInfo.sex,
	    			age: memberInfo.age,
	    			sno: memberInfo.sno,
	    			institute: memberInfo.institute,
	    			becomeMemberTime: memberInfo.becomeMemberTime,
	    			memberTime: memberInfo.memberTime,
	    			branch: memberInfo.branch,
	    			native: memberInfo.native,
	    			head: memberInfo.head,
	    			password: memberInfo.password
	    		},
	    		success(data) {
	    			alert('设置成功')
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
	    padding: 0 10px;
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
	    background: #deepskyblue;
	    line-height: 30px;
	    color: #fff;
	    border-radius: 4px;
	    text-align: center;
	}
</style>