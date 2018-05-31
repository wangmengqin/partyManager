<template>
	<div class="content_box">
		<h4>发布活动</h4>
		<div class="input_box">
			<div><span>活动名称：</span><input type="text" placeholder="请输入活动名称" v-model="activityName"/></div>
			<div><span>演讲人：</span><input type="text" placeholder="请输入演讲人（非必填）" v-model="speaker"/></div>
			<div><span>地点：</span><input type="text" placeholder="请输入活动地点" v-model="place"/></div>
			<div><span>时间：</span><input type="text" placeholder="请输入活动时间" v-model="time"/></div>
			<div><span>活动具体描述：</span><input type="text" placeholder="活动是干什么的" v-model="describe"/></div>
			<div>
				<span>举办支部：</span>
				<select v-model="branch">
					<option v-for="i in branchData" :key="i.id" :value="i.name">{{i.name}}</option>
				</select>
				<a href="#/tab/addBranch">添加支部</a>
			</div>
			<div>
				<span>所属活动分类：</span>
				<select v-model="type">
					<option key="0" value="讲座">讲座</option>
					<option key="1" value="支部活动">支部活动</option>
					<option key="2" value="组织生活">组织生活</option>
				</select>
			</div>
			<div>
				<span>活动封面(建议100*100)：</span>
				<div class="upload-box">
					<img src="/imgs/jia.png" alt="">
					<input style="border:0" type="file"/>
				</div>
			</div>
			<div style="text-align:center"><button @click="addActivity">确认发布活动</button></div>
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
        	activityName: '', // 活动名称
        	speaker: '', // 演讲者
        	place: '', // 活动地点
        	time: '', // 活动时间
        	branch: '重庆科技学院党总支',
        	describe: '', // 活动具体描述
        	img: '',
        	type: '支部活动',
        	branchData: []
        }
    },
    mounted() {
    	var _this = this
    	$.ajax({
    		url: 'http://localhost:5555/Branchs',
    		type: 'POST',
    		dataType: 'json',
    		success(data) {
    			_this.branchData = data
    		}
    	})
    },
    methods: {
    	addActivity() {
    		var _this = this;
    		if(_this.activityName != ''&&_this.place != ''&&_this.time != ''){
    			$.ajax({
		    		url: 'http://localhost:5555/addActivity',
		    		type: 'POST',
		    		dataType: 'json',
		    		data: {
		    			name: _this.activityName,
		    			speaker: _this.speaker,
		    			place: _this.place,
		    			time: _this.time,
		    			branch: _this.branch,
		    			describe: _this.describe,
		    			img: _this.img,
		    			type: _this.type
		    		},
		    		success(data) {
		    			alert('添加成功')
		    			_this.activityName = '';
		    			_this.speaker = '';
		    			_this.place = '';
		    			_this.branch = '重庆科技学院党总支';
		    			_this.time = '';
		    			_this.describe = '';
		    			_this.img = '',
		    			_this.type = '支部活动'
		    		}
		    	})
    		} else {
    			alert('活动名称、活动地点、活动时间不能为空')
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
	.upload-box{
		 display: inline-block;
	    width: 200px;
	    height: 200px;
	    border: 1px dashed #ccc;
	    text-align: center;
	    line-height: 200px;
	    position: relative;
	    vertical-align: middle;
	}
	.upload-box img{
	    width: 50px;
	    height: 50px;
	    position: absolute;
	    top: 36%;
	    left: 39%;
	    z-index: 1;
	}
	.upload-box input {
	    border: 0px;
	    width: 50px;
	    height: 50px;
	    position: absolute;
	    left: 33%;
	    top: 40%;
	    z-index: 100000;
	    opacity: 0;
	}
</style>