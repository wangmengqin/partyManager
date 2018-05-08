<template>
	<div class="content_box">
		<h4>编辑培训</h4>
		<div class="input_box">
			<div><span>培训主题：</span><input type="text" placeholder="请输入培训主题" v-model="editData.title"/></div>
			<div><span>讲师：</span><input type="text" placeholder="请输入演讲人" v-model="editData.teacher"/></div>
			<div><span>地点：</span><input type="text" placeholder="请输入培训地点" v-model="editData.address"/></div>
			<div><span>时间：</span><input type="text" placeholder="请输入活动时间" v-model="editData.time"/></div>
			<div><span>培训内容描述：</span><input type="text" placeholder="培训内容描述" v-model="editData.trainDescribe"/></div>
			<div>
				<span>所属培训分类：</span>
				<select v-model="editData.type">
					<option key="0" value="入党积极分子培训">入党积极分子培训</option>
					<option key="1" value="专题培训">专题培训</option>
					<option key="2" value="党课">党课</option>
				</select>
			</div>
			<div style="text-align:center">
				<button @click="editTrain">确认修改</button>
				<button @click="back">返回</button>
			</div>
		</div>
	</div>
</template>

<script>
import $ from 'jQuery'
export default {
    data() {
        return {
        	editData: []
        }
    },
    mounted() {
    	var _this = this
    	$.ajax({
    		url: 'http://localhost:5555/getTrainById',
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
    	editTrain() {
    		var _this = this;
    		$.ajax({
	    		url: 'http://localhost:5555/editTrain',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			id: _this.$route.params.id,
	    			title: _this.editData.title,
	    			teacher: _this.editData.teacher,
	    			address: _this.editData.address,
	    			time: _this.editData.time,
	    			trainDescribe: _this.editData.trainDescribe,
	    			type: _this.editData.type
	    		},
	    		success(data) {
	    			alert('修改成功')
	    			_this.back();
	    		}
	    	})
    	},
    	back(){
    		this.$router.push({ path: `/tab/searchTrain` })
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