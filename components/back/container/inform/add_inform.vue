<template>
	<div class="content_box">
		<h4>发布公告</h4>
		<div class="input_box">
			<div><span>标题：</span><input type="text" placeholder="请输入标题" v-model="title"/></div>
			<div><span>作者：</span><input type="text" placeholder="请输入作者名字" v-model="author"/></div>
			<div><span>编号：</span><input type="text" placeholder="请输入发布者编号" v-model="num"/></div>
			<div style="overflow:hidden;margin-top: 20px;"><span style="float:left">内容：</span><vue-editor style="width:650px;float:left" v-model="content"></vue-editor></div>
			<div style="text-align:center"><button @click="addInform">确认</button></div>
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
        	num: '', // 编号
        	content: `` // 内容
        }
    },
    mounted() {
    },
    methods: {
    	addInform() {
    		var _this = this;
    		$.ajax({
	    		url: 'http://localhost:5555/addInform',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			title: _this.title,
	    			name: _this.author,
	    			sno: _this.num,
	    			content: _this.content,
	    			time: new Date().getTime()
	    		},
	    		success(data) {
	    			alert('添加成功')
	    			_this.title = '';
	    			_this.author = '';
	    			_this.num = '';
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