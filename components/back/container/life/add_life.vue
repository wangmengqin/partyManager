<template>
	<div class="content_box">
		<h4>增加民主生活</h4>
		<div class="input_box">
			<div><span>标题：</span><input type="text" placeholder="请输入标题" v-model="title"/></div>
			<div>
				<span>支部：</span>
				<select v-model="branch">
					<option v-for="i in branchData" :key="i.id" :value="i.name">{{i.name}}</option>
				</select>
				<a href="#/tab/addBranch">添加支部</a>
			</div>
			<div>
				<span>类型：</span>
				<select v-model="type">
					<option key="0" value="民主生活">民主生活</option>
					<option key="1" value="争先创优">争先创优</option>
				</select>
			</div>
			<div style="overflow:hidden"><span style="float:left">内容：</span><vue-editor style="width:650px;float:left" v-model="content"></vue-editor></div>
			<div style="text-align:center"><button @click="addLife">确认</button></div>
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
        	title: '', //标题
        	branch: '重庆科技学院党总支', // 支部
        	type: '民主生活', // 类型
        	content: ``, // 内容
        	branchData: [] // 支部内容
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
    },
    methods: {
    	addLife() {
    		var _this = this;
    		if (this.title != '' && this.content != ''){
    			$.ajax({
		    		url: 'http://localhost:5555/addLife',
		    		type: 'POST',
		    		dataType: 'json',
		    		data: {
		    			title: _this.title,
		    			branch: _this.branch,
		    			type: _this.type,
		    			content: _this.content,
		    			time: new Date().getTime()
		    		},
		    		success(data) {
		    			alert('添加成功')
		    			_this.title = '';
		    			_this.branch = '重庆科技学院党总支';
		    			_this.type = '民主生活';
		    			_this.content = '';
		    		}
		    	})
    		} else {
    			alert('请输入标题，内容')
    		}
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