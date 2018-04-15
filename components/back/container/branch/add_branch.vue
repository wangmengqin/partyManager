<template>
	<div class="content_box">
		<h4>增加支部</h4>
		<div class="input_box">
			<div><span>支部名称：</span><input type="text" placeholder="请输入支部名称" v-model="branchName"/></div>
			<div><span>所属学院：</span><input type="text" placeholder="请输入所属学院" v-model="institute"/></div>
			<div><span>书记：</span><input type="text" placeholder="请输入书记名字" v-model="secretary"/></div>
			<div><span>副书记：</span><input type="text" placeholder="请输入副书记名称" v-model="deputySecretary"/></div>
			<div><span>宣传委员：</span><input type="text" placeholder="请输入宣传委员名字" v-model="propagate"/></div>
			<div style="text-align:center"><button @click="addBranch">确认增加</button></div>
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
        	branchName: '', // 名称
        	institute: '', // 学院
        	secretary: '', // 书记
        	deputySecretary: '', // 副书记
        	propagate: '' // 宣传委员
        }
    },
    mounted() {
    	// var _this = this
    	// $.ajax({
    	// 	url: 'http://localhost:5555/allcolumns',
    	// 	type: 'POST',
    	// 	dataType: 'json',
    	// 	success(data) {
    	// 		_this.columnData = data
    	// 	}
    	// })
    },
    methods: {
    	addBranch() {
    		var _this = this;
    		$.ajax({
	    		url: 'http://localhost:5555/addBranch',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			branchName: _this.branchName, // 名称
		        	institute: _this.institute, // 学院
		        	secretary: _this.secretary, // 书记
		        	deputySecretary: _this.deputySecretary, // 副书记
		        	propagate: _this.propagate // 宣传委员
	    		},
	    		success(data) {
	    			alert('添加成功')
	    			_this.branchName = '';
	    			_this.institute = '';
	    			_this.secretary = '';
	    			_this.deputySecretary = '';
	    			_this.propagate = '';
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
		width: 190px;
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