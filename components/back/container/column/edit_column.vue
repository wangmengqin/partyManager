<template>
	<div class="content_box">
		<h4>修改新闻专题</h4>
		<div class="input_box">
			<div><span>id：</span><input type="text" disabled v-model="editData.id"/></div>
			<div><span>名称：</span><input type="text" placeholder="请输入标题" v-model="editData.columnName"/></div>
			<div><span>描述：</span><input type="text" placeholder="请输入专题描述" v-model="editData.columnDescribe"/></div>
			<div style="text-align:center">
				<button @click="editCloumns">确认</button>
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
        	editData: {} // 要修改的数据
        }
    },
    methods: {
    	editCloumns() {
    		var _this = this;
    		$.ajax({
    			url: 'http://localhost:5555/editColumnById',
    			type: 'POST',
    			dataType: 'json',
    			data: {
    				id: _this.$route.params.id,
    				name: _this.editData.columnName,
    				describe: _this.editData.columnDescribe
    			},
    			success(data) {
    				alert('修改成功')
    				_this.back()
    			}
    		})
    	},
    	back(){
    		location.href = '#/tab/searchColumn'
    	}
    },
    mounted() {
    	var _this = this;
    	$.ajax({
    		url: 'http://localhost:5555/getColumnById',
    		type: 'POST',
    		dataType: 'json',
    		data: {id: _this.$route.params.id},
    		success(data){
    			_this.editData = data[0]
    		}
    	})
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