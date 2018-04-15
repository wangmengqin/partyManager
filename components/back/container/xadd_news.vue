<template>
	<div class="content_box">
		<h4>发布新闻</h4>
		<div class="input_box">
			<div><span>标题：</span><input type="text" placeholder="请输入标题" v-model="title"/></div>
			<div><span>作者：</span><input type="text" placeholder="请输入作者名字" v-model="author"/></div>
			<div><span>摘要：</span><input type="text" placeholder="请输入摘要内容" v-model="remark"/></div>
			<div>
				<span>专题：</span>
				<select v-model="theme">
					<option v-for="i in columnData" :key="i.id" :value="i.columnName">{{i.columnName}}</option>
				</select>
				<a href="#/tab/addcolumn">添加专题</a>
			</div>
			<div style="overflow:hidden"><span style="float:left">内容：</span><vue-editor style="width:650px;float:left" v-model="content"></vue-editor></div>
			<div style="text-align:center"><button @click="addNews">确认</button></div>
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
        	author: '', // 作者
        	remark: '', // 摘要
        	theme: '其他', // 专题
        	content: ``, // 内容
        	columnData: [] // 专题内容
        }
    },
    mounted() {
    	var _this = this
    	$.ajax({
    		url: 'http://localhost:5555/allcolumns',
    		type: 'POST',
    		dataType: 'json',
    		success(data) {
    			_this.columnData = data
    		}
    	})
    },
    methods: {
    	addNews() {
    		var _this = this;
    		$.ajax({
	    		url: 'http://localhost:5555/addNews',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			title: _this.title,
	    			author: _this.author,
	    			remark: _this.remark,
	    			column: _this.theme,
	    			content: _this.content,
	    			time: new Date().getTime()
	    		},
	    		success(data) {
	    			alert('添加成功')
	    			_this.title = '';
	    			_this.author = '';
	    			_this.remark = '';
	    			_this.theme = '其他';
	    			_this.content = '';
	    		}
	    	})
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