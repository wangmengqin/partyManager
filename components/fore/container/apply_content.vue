<template>
	<div style="overflow: hidden;margin: 0 auto; width: 1200px;padding: 20px 0;background: #FDFDFD;">
		<div v-if='isShowApply'>
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
				<p v-if="identify=='学生'">
					<label>您的年级：</label>
					<select v-model="grade">
						<option key="0" value="2014级">2014级</option>
						<option key="1" value="2015级">2015级</option>
						<option key="2" value="2016级">2016级</option>
						<option key="3" value="2017级">2017级</option>
					</select>
				</p>
				<p>
					<label for="">学号：</label><input type="text" v-model="sno" placeholder="清填写学号">
				</p>
				<p><label for="">入党申请书：</label><input type="file" class="noborder"></p>
				<p style="text-align:center;"><button @click="certainApply">确认申请</button><input type="reset" class="noborder reset" /></p>
			</form>
		</div>
		<div v-else>
			<h3>您已申请入党，信息如下</h3>
			<div class="input_box">
				<div>
					<span>姓名：</span>
					<input type="text" placeholder="请输入姓名" disabled v-model="myInfo.name"/>
				</div>
				<div>
					<span>编号：</span>
					<input type="text" placeholder="请输入编号" disabled v-model="myInfo.sno"/>
				</div>
				<div>
					<span>学院：</span>
					<input type="text" placeholder="请输入学院" disabled v-model="myInfo.institute"/>
				</div>
				<div>
					<span>专业：</span>
					<input type="text" placeholder="请输入专业" disabled v-model="myInfo.major"/>
				</div>
				<div>
					<span>所属支部：</span>
					<input type="text" placeholder="所属支部" disabled v-model="myInfo.branch"/>
				</div>
				<div>
					<span>职位：</span>
					<input v-show="myInfo.identify != '不通过'" type="text" placeholder="职位" disabled v-model="myInfo.identify"/>
					<b style="color: red" v-show="myInfo.identify=='不通过'">{{myInfo.identify}}</b>
				</div>
				<div>
					<span>入党时间：</span>
					<b>{{myInfo.becomeMemberTime | formatDate}}</b>
				</div>
				<div v-show="myInfo.memberTime != ''">
					<span>成为正式党员时间：</span>
					<b>{{myInfo.memberTime | formatDate}}</b>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import province from '../../../template/cityData.js';
import {formatDate} from '../../../template/date.js';
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
			grade: '',
			sno: '', // 学号
			selectProvince: '', // 籍贯
			selectCity: '', // 城市
			loginSno: null, // 登录的账号
			isShowApply: true, // 是否显示申请组件
			userphoto:"/imgs/gray_wode.png",
			myInfo: {} // 我的信息
		}
	},
	filters: {
	    formatDate(time) {
	        var date = new Date(Number(time));
	        return formatDate(date, 'yyyy-MM-dd');
	    }
	},
	mounted(){
		this.cityArr = this.province[0].list;
		this.selectProvince = this.province[0].id
		this.selectCity = this.cityArr[0].id
		this.loginSno = sessionStorage.getItem('sno')
		var _this = this
		if (this.loginSno != null) {
			this.isShowApply = false
			$.ajax({
	    		url: 'http://localhost:5555/getMemberBySno',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			sno: _this.loginSno
	    		},
	    		success(data) {
	    			_this.myInfo = data[0]
	    			console.log(data)
	    		}
	    	})
		}
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
					grade: _this.grade,
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
					_this.grade = ''
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
</style>