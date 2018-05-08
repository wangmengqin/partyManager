<template>
	<div class="content_box">
		<h4>培训发布</h4>
		<div class="input_box">
			<div><span>培训主题：</span><input type="text" placeholder="请输入培训主题" v-model="trainTitle"/></div>
			<div><span>讲师：</span><input type="text" placeholder="请输入演讲人" v-model="teacher"/></div>
			<div><span>地点：</span><input type="text" placeholder="请输入培训地点" v-model="place"/></div>
			<div><span>时间：</span><input type="text" placeholder="请输入活动时间" v-model="time"/></div>
			<div><span>培训内容描述：</span><input type="text" placeholder="培训内容描述" v-model="describe"/></div>
			<div>
				<span>所属培训分类：</span>
				<select v-model="type">
					<option key="0" value="入党积极分子培训">入党积极分子培训</option>
					<option key="1" value="专题培训">专题培训</option>
					<option key="2" value="党课">党课</option>
				</select>
			</div>
			<div style="text-align:center"><button @click="addTrain">确认发布</button></div>
		</div>
	</div>
</template>

<script>
import $ from 'jQuery'
export default {
    data() {
        return {
        	trainTitle: '', // 活动名称
        	teacher: '', // 演讲者
        	place: '', // 地点
        	time: '', // 时间
        	describe: '', // 具体描述
        	type: '专题培训'
        }
    },
    mounted() {
    },
    methods: {
    	addTrain() {
    		var _this = this;
    		$.ajax({
	    		url: 'http://localhost:5555/addTrain',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			title: _this.trainTitle,
	    			teacher: _this.teacher,
	    			place: _this.place,
	    			time: _this.time,
	    			describe: _this.describe,
	    			type: _this.type
	    		},
	    		success(data) {
	    			alert('添加成功')
	    			_this.trainTitle = '';
	    			_this.teacher = '';
	    			_this.place = '';
	    			_this.time = '';
	    			_this.describe = '';
	    			_this.type = '专题培训'
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