<template>
	<div  style="overflow: hidden;margin: 0 auto; width: 1200px;padding: 20px 0;background: #FDFDFD;">
		<h3>请填写个人信息</h3>
		<form style="width:500px;margin:0 auto">
			<p>
				<label for="">姓名：</label><input type="text" v-model="name" placeholder="清填写姓名">
			</p>
			<p>
				<label for="">年龄：</label><input type="number" v-model="age" placeholder="清填写年龄" size="2">
			</p>
			<p>
				<label>性别：</label>
				<select v-model="sex">
					<option key="0" value="男">男</option>
					<option key="1" value="女">女</option>
				</select>
			</p>
			<p>
				<label for="">籍贯</label>
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
				<label>您的身份：</label>
				<select v-model="identify">
					<option key="0" value="学生">学生</option>
					<option key="1" value="教师">教师</option>
				</select>
			</p>
			<p>
				<label for="">学院：</label><input v-model="institute" type="text" placeholder="清填写学院">
			</p>
			<p>
				<label for="">专业：</label><input v-model="major" type="text" placeholder="清填写专业">
			</p>
			<p>
				<label for="">学号：</label><input type="text" v-model="sno" placeholder="清填写学号">
			</p>
			<p><label for="">入党申请书：</label><input type="file" class="noborder"></p>
			<p style="text-align:center;"><button @click="certainApply">确认申请</button><input type="reset" class="noborder reset" /></p>
		</form>
	</div>
</template>
<script>
import province from '../../../template/cityData.js';
import $ from 'jQuery'
export default{
	data(){
		return {
			province:province,
			cityArr:[],
			name: '', // 姓名
			age: '', // 年龄
			sex: '男', // 性别
			identify: '学生', // 身份（学生或教师）
			institute: '', // 学院
			major: '', // 专业
			sno: '', // 学号
			selectProvince: '', // 籍贯
			selectCity: '' // 城市
		}
	},
	mounted(){
		this.cityArr = this.province[0].list;
		this.selectProvince = this.province[0].id
		this.selectCity = this.cityArr[0].id
	},
	methods:{
		getSelect(e){
			this.cityArr = this.province[e.target.value].list;
			this.selectProvince = this.province[e.target.value].id
		},
		getSelectCity(e) {
			this.selectCity = this.cityArr[e.target.value].id
		},
		certainApply() {
			var _this = this
			console.log(this.province[this.selectProvince].txt, this.cityArr[this.selectCity].txt)
			$.ajax({
				url: 'http://localhost:5555/addMember',
				type: 'POST',
				dataType: 'json',
				data: {
					name: _this.name,
					age: _this.age,
					sex: _this.sex,
					type: _this.identify,
					institute: _this.institute,
					major: _this.major,
					sno: _this.sno,
					native: this.province[this.selectProvince].txt+this.cityArr[this.selectCity].txt
				},
				success(){
					alert('申请成功')
					_this.name = ''
					_this.age = ''
					_this.sex = '男'
					_this.identify = '学生'
					_this.institute = ''
					_this.major = ''
					_this.sno = ''
					_this.selectProvince = _this.province[0].id
					_this.selectCity = _this.cityArr[0].id
				}
			})
		}
	}
}
</script>
<style scoped>
    h3{
    	font-size: 18px;
    	font-weight: 500;
    	line-height: 50px;
    	color: #666;
    	border-bottom: 1px solid #eee;
    	text-align: center;
    }
	form p{
		line-height: 80px;
		color: #333;
	}
	label{
		display: inline-block;
		width: 100px;
		margin-right: 30px;
	}
	input{
		width: 300px;
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
	}
</style>