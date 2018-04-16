<template>
	<div class="content_box">
		<h4>发布活动</h4>
		<div class="input_box">
			<div><span>活动名称：</span><input type="text" placeholder="请输入活动名称" v-model="editData.activity_name"/></div>
			<div><span>演讲人：</span><input type="text" placeholder="请输入演讲人（非必填）" v-model="editData.speaker"/></div>
			<div><span>地点：</span><input type="text" placeholder="请输入活动地点" v-model="editData.place"/></div>
			<div><span>时间：</span><input type="text" placeholder="请输入活动时间" v-model="editData.time"/></div>
			<div><span>活动具体描述：</span><input type="text" placeholder="活动是干什么的" v-model="editData.activity_describe"/></div>
			<div>
				<span>举办支部：</span>
				<select v-model="editData.branch">
					<option v-for="i in branchData" :key="i.id" :value="i.name">{{i.name}}</option>
				</select>
				<a href="#/tab/addBranch">添加支部</a>
			</div>
			<div>
				<span>所属活动分类：</span>
				<select v-model="editData.type">
					<option key="0" value="讲座">讲座</option>
					<option key="1" value="支部活动">支部活动</option>
					<option key="2" value="组织生活">组织生活</option>
				</select>
			</div>
			<div><span>活动封面(建议100*100)：</span><input style="border:0" type="file"/></div>
			<div style="overflow:hidden"><span style="float:left">活动精彩瞬间：</span><vue-editor style="width:650px;float:left" v-model="editData.content"></vue-editor></div>
			<div style="text-align:center">
				<button @click="editActivity">确认修改</button>
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
        	editData: [],
        	branchData: []
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
    		url: 'http://localhost:5555/getActivityById',
    		type: 'POST',
    		dataType: 'json',
    		data: {
    			id: _this.$route.params.id
    		},
    		success(data) {
    			_this.editData = data[0]
    			console.log(_this.editData)
    		}
    	})
    },
    methods: {
    	editActivity() {
    		var _this = this;
    		$.ajax({
	    		url: 'http://localhost:5555/editActivity',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			id: _this.$route.params.id,
	    			name: _this.editData.activity_name,
	    			speaker: _this.editData.speaker,
	    			place: _this.editData.place,
	    			time: _this.editData.time,
	    			describe: _this.editData.activity_describe,
	    			branch: _this.editData.branch,
	    			content: _this.editData.content
	    		},
	    		success(data) {
	    			alert('添加成功')
	    			_this.back();
	    		}
	    	})
    	},
    	back(){
    		location.href = '#/tab/searchActivity'
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