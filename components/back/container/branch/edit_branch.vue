<template>
	<div class="content_box">
		<h4>增加支部</h4>
		<div class="input_box">
			<div><span>支部名称：</span><input type="text" placeholder="请输入支部名称" v-model="editData.name"/></div>
			<div><span>所属学院：</span><input type="text" placeholder="请输入所属学院" v-model="editData.institute"/></div>
			<div><span>书记：</span><input type="text" placeholder="请输入书记名字" v-model="editData.secretary"/></div>
			<div><span>副书记：</span><input type="text" placeholder="请输入副书记名称" v-model="editData.fu_secretary"/></div>
			<div><span>宣传委员：</span><input type="text" placeholder="请输入宣传委员名字" v-model="editData.propagate"/></div>
			<div style="text-align:center">
				<button @click="editBranch">确认修改</button>
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
        	editData: []
        }
    },
    mounted() {
    	var _this = this
    	$.ajax({
    		url: 'http://localhost:5555/getBranchById',
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
    	editBranch() {
    		var _this = this;
    		$.ajax({
	    		url: 'http://localhost:5555/editBranch',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			id: _this.$route.params.id,
	    			name: _this.editData.name, // 名称
		        	institute: _this.editData.institute, // 学院
		        	secretary: _this.editData.secretary, // 书记
		        	deputySecretary: _this.editData.fu_secretary, // 副书记
		        	propagate: _this.editData.propagate // 宣传委员
	    		},
	    		success(data) {
	    			alert('添加成功')
	    			_this.back();
	    		}
	    	})
    	},
    	back() {
    		location.href = '#/tab/searchBranch'
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
		cursor: pointer;
	}
</style>