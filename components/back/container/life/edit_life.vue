<template>
	<div class="content_box">
		<h4>修改信息</h4>
		<div class="input_box">
			<div><span>标题：</span><input type="text" placeholder="请输入标题" v-model="editData.title"/></div>
			<div>
				<span>支部：</span>
				<select v-model="editData.branch">
					<option v-for="i in branchData" :key="i.id" :value="i.name">{{i.name}}</option>
				</select>
				<a href="#/tab/addBranch">添加支部</a>
			</div>
			<div>
				<span>类型：</span>
				<select v-model="editData.type">
					<option key="0" value="民主生活">民主生活</option>
					<option key="1" value="争先创优">争先创优</option>
				</select>
			</div>
			<div style="overflow:hidden"><span style="float:left">内容：</span><vue-editor style="width:650px;float:left" v-model="editData.content"></vue-editor></div>
			<div style="text-align:center">
				<button @click="editLife">确认</button>
				<button class="cancel" @click="linkToSearch">取消</button>
			</div>
		</div>
	</div>
</template>

<script>
import $ from 'jQuery'
import { VueEditor } from 'vue2-editor'
export default {
	components: {
    	VueEditor
    },

    data() {
        return {
        	editData: [], // 要编辑的
        	branchData: [] // 支部内容
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
    	$.ajax({
    		url: 'http://localhost:5555/getLifeById',
    		type: 'POST',
    		dataType: 'json',
    		data: {
    			id: _this.$route.params.id
    		},
    		success(data) {
    			_this.editData = data[0]
    		}
    	})
    },
    methods: {
    	editLife() {
    		var _this = this;
    		if (this.title != '' && this.content != ''){
    			$.ajax({
		    		url: 'http://localhost:5555/editLife',
		    		type: 'POST',
		    		dataType: 'json',
		    		data: {
		    			id: _this.$route.params.id,
		    			title: _this.editData.title,
		    			branch: _this.editData.branch,
		    			type: _this.editData.type,
		    			content: _this.editData.content,
		    			time: new Date().getTime()
		    		},
		    		success(data) {
		    			alert('修改成功')
		    			_this.$router.push({ path: `/tab/searchLife` })
		    		}
		    	})
    		} else {
    			alert('请输入标题，内容')
    		}
    	},
    	linkToSearch() {
    		this.$router.push({ path: `/tab/searchLife` })
    	}
    }
}
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
	.input_box{
		width: 900px;
		margin: 0 auto;
	}
	.input_box span{
		display: inline-block;
		width: 150px;
		text-align: right;
		margin-right: 30px;
	}
	.input_box div{
		line-height: 50px;
	}
	a{
		display: inline-block;
		padding: 0 10px;
		line-height: 36px;
		background: #d93732;
		color: #fff;
		font-size: 12px;
		margin-left: 30px;
	}
	.input_box input {
		width: 600px;
		height: 36px;
		outline: none;
		border: 0;
		border: 1px solid #eee;
		padding-left: 10px;
	}
	button{
		height: 30px;
		text-align: center;
		line-height: 30px;
		border: 0;
		background: #D93732;
		outline: none;
		color: #fff;
		padding:0 10px;
	}
</style>