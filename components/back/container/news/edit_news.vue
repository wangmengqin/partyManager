<template>
	<div class="content_box">
		<h4>编辑新闻</h4>
		<div class="input_box">
			<div><span>标题：</span><input type="text" placeholder="请输入标题" v-model="editData.title"/></div>
			<div><span>作者：</span><input type="text" placeholder="请输入作者名字" v-model="editData.author"/></div>
			<div><span>摘要：</span><input type="text" placeholder="请输入摘要内容" v-model="editData.remark"/></div>
			<div>
				<span>专题：</span>
				<select v-model="editData.theme">
					<option v-for="i in columnData" :key="i.id" :value="i.columnName">{{i.columnName}}</option>
				</select>
				<a href="#/tab/addcolumn">添加专题</a>
			</div>
			<div style="overflow:hidden"><span style="float:left">内容：</span><vue-editor style="width:650px;float:left" v-model="editData.content"></vue-editor></div>
			<div style="text-align:center">
				<button @click="editNews">保存</button>
				<button @click="back">返回</button>
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
        	columnData: [], // 专题内容
        	editData: []
        }
    },
    mounted() {
    	var _this = this
    	$.ajax({
    		url: 'http://localhost:5555/columns',
    		type: 'POST',
    		dataType: 'json',
    		success(data) {
    			_this.columnData = data
    		}
    	})
    	$.ajax({
    		url: 'http://localhost:5555/getNewsById',
    		type: 'POST',
    		dataType: 'json',
    		data: {id: _this.$route.params.id},
    		success(data){
    			console.log(data)
    			_this.editData = data[0]
    		}
    	})
    },
    methods: {
    	editNews() {
    		var _this = this;
    		$.ajax({
	    		url: 'http://localhost:5555/editNewsById',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			id: _this.$route.params.id,
	    			title: _this.editData.title,
	    			author: _this.editData.author,
	    			remark: _this.editData.remark,
	    			theme: _this.editData.theme,
	    			content: _this.editData.content,
	    			time: new Date().getTime()
	    		},
	    		success(data) {
	    			alert('修改成功')
	    			_this.back();
	    		}
	    	})
    	},
    	back(){
    		location.href = '#/tab/searchnews'
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