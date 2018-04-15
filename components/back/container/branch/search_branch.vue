<template>
	<div class="content_box">
		<h4><img src="/imgs/icon_search.png"/>查看活动</h4>
		<p>
			
			<input type="text" placeholder="请输入关键字" v-model="inputContent"/>
			<button @click="getBranchByName">通过支部名称搜索</button>
			<button @click="getBranchByInstitute">通过学院搜索</button>
		</p>
		<table>
			<thead>
				<tr>
					<th>ID</th>
					<th>支部名称</th>
					<th>所属学院</th>
					<th>书记</th>
					<th>副书记</th>
					<th>宣传委员</th>
					<th>操作</th>
				</tr>
			</thead>
			<tr v-for="item in branchData">
				<td>{{item.id}}</td>
				<td>{{item.name}}</td>
				<td>{{item.institute}}</td>
				<td>{{item.secretary}}</td>
				<td>{{item.fu_secretary}}</td>
				<td>{{item.propagate}}</td>
				<td><a :href="'#/tab/editBranch/'+item.id" class="edit">编辑</a><b @click="deleteBranchById(item.id)" class="del">删除</b></td>
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
	  		inputContent: '',
	  		branchData: [] // 支部数据
	  	}
	  },
	  methods: {
	  	getAll() {
	  		var _this = this
	    	$.ajax({
	    		url: 'http://localhost:5555/allBranch',
	    		type: 'POST',
	    		dataType: 'json',
	    		success(data) {
	    			_this.branchData = data
	    		}
	    	})
	  	},
	  	getBranchByName() {
	  		var _this = this
	    	$.ajax({
	    		url: 'http://localhost:5555/getBranchByName',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			name: _this.inputContent
	    		},
	    		success(data) {
	    			_this.branchData = data
	    		}
	    	})
	  	},
	  	getBranchByInstitute(){
	  		var _this = this
	  		$.ajax({
	    		url: 'http://localhost:5555/getBranchByInstitute',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			institute: _this.inputContent
	    		},
	    		success(data) {
	    			_this.branchData = data
	    		}
	    	})
	  	},
	  	/*getNewsByRemark(){
	  		var _this = this
	  		$.ajax({
	    		url: 'http://localhost:5555/getNewsByRemark',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			remark: _this.inputContent
	    		},
	    		success(data) {
	    			_this.branchData = data
	    		}
	    	})
	  	},
	  	getNewsByAuthor(){
	  		var _this = this
	  		$.ajax({
	    		url: 'http://localhost:5555/getNewsByAuthor',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			author: _this.inputContent
	    		},
	    		success(data) {
	    			_this.branchData = data
	    		}
	    	})
	  	},*/
	  	deleteBranchById(id){
	  		var _this = this
	  		$.ajax({
	    		url: 'http://localhost:5555/deleteBranchById',
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
	  	var _this = this
    	$.ajax({
    		url: 'http://localhost:5555/allBranch',
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
	    width: 35px;
	    height: 30px;
	    background: #ed5564;
	    line-height: 30px;
	    color: #fff;
	    border-radius: 4px;
	    text-align: center;
	}
</style>