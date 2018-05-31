<template>
	<div class="content_box">
		<h4>新增专题</h4>
		<div class="input_box">
			<div><span>名称：</span><input type="text" placeholder="请输入标题" v-model="name"/></div>
			<div><span>描述：</span><input type="text" placeholder="请输入专题描述" v-model="describe"/></div>
			<div style="text-align:center"><button @click="addCloumns">确认</button></div>
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
        	name: '', //名称
        	describe: '' // 专题描述
        }
    },
    methods: {
    	addCloumns() {
    		var _this = this;
    		if(_this.name != '') {
    			$.ajax({
	    			url: 'http://localhost:5555/addcolumns',
	    			type: 'POST',
	    			dataType: 'json',
	    			data: {
	    				name: _this.name,
	    				describe: _this.describe
	    			},
	    			success(data) {
	    				alert('添加成功')
	    				_this.name = ''
	    				_this.describe = ''
	    			}
	    		})
    		} else {
    			alert('专题名称不能为空')
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