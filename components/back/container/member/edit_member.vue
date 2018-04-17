<template>
	<div class="content_box">
		<h4>编辑党员信息</h4>
		<form style="width:900px;margin:0 auto">
			<p>
				<label>姓名：</label><input type="text" v-model="editData.name" placeholder="清填写姓名">
			</p>
			<p>
				<label>年龄：</label><input type="number" v-model="editData.age" placeholder="清填写年龄" size="2">
			</p>
			<p>
				<label>性别：</label>
				<select v-model="editData.sex">
					<option key="0" value="男">男</option>
					<option key="1" value="女">女</option>
				</select>
			</p>
			<p>
				<label>籍贯：</label>
				<select @change="getSelect" v-model="selectProvince">
					<option value="0">请选择省份</option>
					<option v-for="obj in province" :value="obj.id" v-text="obj.txt" ></option>
				</select>
				<select @click="getSelectCity" v-model="selectCity">
					<option value="0">请选择城市</option>
					<option v-for="item in cityArr" :value="item.id" v-text="item.txt"></option>
				</select>
			</p>
			<p>
				<label>学院：</label><input v-model="editData.institute" type="text" placeholder="清填写学院">
			</p>
			<p>
				<label>专业：</label><input v-model="editData.major" type="text" placeholder="清填写专业">
			</p>
			<p>
				<label>学号/工号：</label><input type="text" v-model="editData.sno" placeholder="清填写学号">
			</p>
			<p>
				<label>身份类型：</label>
				<select v-model="editData.type">
					<option key="0" value="学生">学生</option>
					<option key="1" value="教师">教师</option>
				</select>
			</p>
			<p>
				<label>所在支部：</label>
				<select v-model="editData.branch">
					<option v-for="i in branchData" :key="i.id" :value="i.name">{{i.name}}</option>
				</select>
				<a href="#/tab/addBranch">添加支部</a>
			</p>
			<p>
				<label>身份：</label>
				<select v-model="editData.identify">
					<option key="0" value="入党积极分子">入党积极分子</option>
					<option key="1" value="预备党员">预备党员</option>
					<option key="2" value="党员">党员</option>
					<option key="3" value="书记">书记</option>
					<option key="4" value="副书记">副书记</option>
				</select>
			</p>
			<p style="text-align:center;"><button @click="certainEdit">确认修改</button><input type="reset" class="noborder reset" /></p>
		</form>
	</div>
</template>
<script>
import province from '../../../../template/cityData.js';
import $ from 'jQuery'
export default{
	data(){
		return {
			province:province,
			cityArr:[],
			editData: [], // 要编辑的数据
			branchData: [],
			selectProvince: '', // 籍贯
			selectCity: '' // 城市
		}
	},
	mounted(){
		this.cityArr = this.province[0].list;
		this.selectProvince = this.province[0].id
		this.selectCity = this.cityArr[0].id
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
    		url: 'http://localhost:5555/getMemberById',
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
	methods:{
		getSelect(e){
			this.cityArr = this.province[e.target.value].list;
			this.selectProvince = this.province[e.target.value].id
		},
		getSelectCity(e) {
			this.selectCity = this.cityArr[e.target.value].id
		},
		certainEdit() {
			var _this = this
			console.log(this.province[this.selectProvince].txt, this.cityArr[this.selectCity].txt)
			$.ajax({
				url: 'http://localhost:5555/editMember',
				type: 'POST',
				dataType: 'json',
				data: {
					id: _this.$route.params.id,
					name: _this.editData.name,
					age: _this.editData.age,
					sex: _this.editData.sex,
					type: _this.editData.type,
					branch: _this.editData.branch,
					identify: _this.editData.identify,
					institute: _this.editData.institute,
					major: _this.editData.major,
					sno: _this.editData.sno,
					native: this.province[this.selectProvince].txt+this.cityArr[this.selectCity].txt
				},
				success(){
					alert('修改成功')
					location.href = '#/tab/searchMember'
				}
			})
		}
	}
}
</script>
<style scoped>
	a{
		display: inline-block;
		padding: 0 10px;
		line-height: 36px;
		background: #d93732;
		color: #fff;
		font-size: 12px;
		margin-left: 30px;
	}
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
	form p{
		line-height: 80px;
		color: #333;
	}
	label{
		display: inline-block;
		width: 190px;
		text-align: right;
		margin-right: 30px;
	}
	input{
		width: 600px;
		height: 36px;
		outline: none;
		border: 1px solid #eee;
		padding-left: 20px;
	}
	.noborder{
		border: none;
	}
	button{
		outline: none;
		width: 100px;
		height: 30px;
		text-align: center;
		line-height: 30px;
		border: 0;
		background: #d93732;
		color: #fff;
		margin-right: 30px;
	}
	.reset{
		outline: none;
		width: 100px;
		height: 30px;
		text-align: center;
		line-height: 30px;
		border: 0;
		background: #ccc;
		color: #fff;
		padding-left: 0;
		cursor: pointer;
	}
</style>