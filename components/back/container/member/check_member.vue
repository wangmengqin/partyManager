<template>
	<div class="content_box">
		<h4><img src="/imgs/icon_search.png"/>审核新增党员</h4>
		<table>
			<thead>
				<tr>
					<th>姓名</th>
					<th>性别</th>
					<th>年龄</th>
					<th>学号</th>
					<th>专业</th>
					<th>学院</th>
					<th>年级</th>
					<th>籍贯</th>
					<th>类型</th>
					<th>选择支部</th>
					<th>操作</th>
				</tr>
			</thead>
			<tr v-if="memberData==''" style="text-align:center;">
				<td style="line-height:50px;font-size:20px" colspan="10">无要审核数据</td>
			</tr>
			<tr v-for="(item,index) in memberData" :key="item.id">
				<td>{{item.name}}</td>
				<td>{{item.sex}}</td>
				<td>{{item.age}}</td>
				<td>{{item.sno}}</td>
				<td>{{item.major}}</td>
				<td>{{item.institute}}</td>
				<td>{{item.grade}}</td>
				<td>{{item.native}}</td>
				<td>{{item.type}}</td>
				<td>
					<select v-model="item.branch" style="width: 70px;">
						<option v-for="i in branchData" :key="i.id" :value="i.name">{{i.name}}</option>
					</select>
				</td>
				<td><b @click="passMember(item.id,index)" class="edit">通过</b><b @click="unPassMember(item.id)" class="del">不通过</b></td>
			</tr>
		</table>
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
	  		memberData: [], // 党员信息数据
	  		branchData: [] // 支部数据
	  	}
	  },
	  methods: {
	  	getAll(val) {
	  		var _this = this
	  		this.model.page=val;
	  		this.isShowPagination = true
	  		$.ajax({
	    		url: 'http://localhost:5555/allMemberCount',
	    		type: 'POST',
	    		dataType: 'json',
	    		success(data) {
	    			_this.model.total = data[0].count
	    		}
	    	})
	  		_this.memberData = []
	    	$.ajax({
	    		url: 'http://localhost:5555/allMember',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			size: _this.model.size,
	    			page: _this.model.page
	    		},
	    		success(data) {
	    			for (var i in data) {
	    				if(data[i].identify == ''){
	    					_this.memberData.push(data[i])
	    				}
	    			}
	    		}
	    	})
	  	},
	  	passMember(id,index){
	  		var _this = this
	  		console.log(index, _this.memberData[index].branch)
	  		$.ajax({
	    		url: 'http://localhost:5555/editMemberIdentify',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			id: id,
	    			identify: '入党积极分子',
	    			branch: _this.memberData[index].branch,
	    			head: '/imgs/gray_wode.png',
	    			password: '123456',
	    			time: new Date().getTime()
	    		},
	    		success(data) {
	    			alert('审核成功')
	    			_this.memberData = []
			    	$.ajax({
			    		url: 'http://localhost:5555/allMember',
			    		type: 'POST',
			    		dataType: 'json',
			    		data: {
			    			size: _this.model.size,
			    			page: _this.model.page
			    		},
			    		success(data) {
			    			for (var i in data) {
			    				if(data[i].identify == ''){
			    					_this.memberData.push(data[i])
			    				}
			    			}
			    		}
			    	})
	    		}
	    	})
	  	},
	  	unPassMember(id){
	  		var _this = this
	  		$.ajax({
	    		url: 'http://localhost:5555/editMemberIdentify',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			id: id,
	    			identify: '不通过'
	    		},
	    		success(data) {
	    			alert('审核成功')
	    			_this.memberData = []
			    	$.ajax({
			    		url: 'http://localhost:5555/allMember',
			    		type: 'POST',
			    		dataType: 'json',
			    		data: {
			    			size: _this.model.size,
			    			page: _this.model.page
			    		},
			    		success(data) {
			    			for (var i in data) {
			    				if(data[i].identify == ''){
			    					_this.memberData.push(data[i])
			    				}
			    			}
			    		}
			    	})
	    		}
	    	})
	  	}
	  },
	  mounted() {
	  	var _this = this
    	$.ajax({
    		url: 'http://localhost:5555/Branchs',
    		type: 'POST',
    		dataType: 'json',
    		success(data) {
    			_this.branchData = data
    		}
    	})
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