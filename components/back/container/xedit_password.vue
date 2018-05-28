<template>
	<div class="content_box">
		<h4><img src="/imgs/icon_shezhi.png"/>修改密码</h4>
		<div class="input_box">
			<!-- <p><span>姓名：</span><input type="text" disabled="disabled" value="XXX"/></p>
			<p><span>编号：</span><input type="text" disabled="disabled" value="10002"/></p>
			<p><span>原密码：</span><input type="text" placeholder="请输入原密码" /><b class="result1">正确</b><b class="result2">密码错误</b></p>
			<p><span>新密码：</span><input type="text" placeholder="请输入新密码" /><b class="result1">通过</b><b class="result2">6-18位字符或数字下划线</b></p>
			<p><span>确认：</span><input type="text" placeholder="请再次输入新密码" /><b class="result1">密码一致</b><b class="result2">两次密码不一致</b></p>
			<p><button>确认修改</button></p> -->
			<div v-if="type==0">
				<div>
					<span>账号：</span>
					<input type="text" placeholder="请输入账号" disabled v-model="myInfo.username"/>
				</div>
			</div>
			<div v-else>
				<div>
					<span>姓名：</span>
					<input type="text" placeholder="请输入姓名" disabled v-model="myInfo.name"/>
				</div>
				<div>
					<span>性别：</span>
					<input type="text" placeholder="请输入姓名" disabled v-model="myInfo.sex"/>
				</div>
				<div>
					<span>年龄：</span>
					<input type="text" placeholder="请输入姓名" disabled v-model="myInfo.age"/>
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
					<span>所属支部：</span>
					<input type="text" placeholder="所属支部" disabled v-model="myInfo.branch"/>
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
			<div>
				<span>请输入原密码：</span>
				<input type="password" @blur="judgePassword" placeholder="请输入原密码" v-model="primePassword"/>
				<b v-show="isError" style="color: red;">原密码错误</b>
				<b v-show="isCorrect" style="color: green;">验证通过</b>
			</div>
			<div>
				<span>请输入新密码：</span>
				<input type="password" placeholder="请输入新密码" v-model="password"/>
			</div>
			<div>
				<span>请再次输入新密码：</span>
				<input type="password" placeholder="请再次输入新密码" v-model="password1"/>
			</div>
			<div style="text-align:center"><button @click="editPassword">确认</button></div>
		</div>
	</div>
</template>

<script>
	import xheader from "../xheader.vue";
	import $ from 'jQuery';
	import {formatDate} from '../../../template/date.js';
	export default {
		components: {
			xheader
		},
		data() {
			return {
				managerName: null,
				myInfo: {}, // 我的信息
				primePassword: null, // 输入的原密码
				password: null, // 输入的新密码
				password1: null, // 确认密码
				becomeMemberTime: '',
				memberTime: '',
				isError: false,
				isCorrect: false,
				type: 1 // 0表示超级管理员 1 表示管理员
			}
		},
		filters: {
		   formatDate(time) {
		        var date = new Date(Number(time));
		        return formatDate(date, 'yyyy-MM-dd');
		    }
		},
		methods: {
			getManagerByName() {
	   		var _this = this
				this.managerName = sessionStorage.getItem('managerLoginNum')
				if (this.managerName != null) {
					$.ajax({
			    		url: 'http://localhost:5555/getManagerLoginInfo',
			    		type: 'POST',
			    		dataType: 'json',
			    		data: {
			    			username: _this.managerName
			    		},
			    		success(data) {
			    			_this.myInfo = data[0]
			    		}
			    	})
			    	return true
				}
				else{
					alert('获取信息失败，请重新登录')
					location.href = '#/login'
					return false
				}
	    },
	    getSuperManagerByName() {
	   		var _this = this
				this.managerName = sessionStorage.getItem('superLoginNum')
				if (this.managerName != null) {
					$.ajax({
			    		url: 'http://localhost:5555/getSuperLoginInfo',
			    		type: 'POST',
			    		dataType: 'json',
			    		data: {
			    			username: _this.managerName
			    		},
			    		success(data) {
			    			_this.myInfo = data[0]
			    		}
			    	})
			    	return true
				}
				else{
					alert('获取信息失败，请重新登录')
					this.$router.puah({ path: '/login' })
					return false
				}
	    },
	    judgePassword() {
	    	if(this.primePassword == this.myInfo.password) {
	    		this.isCorrect = true
	    		this.isError = false
	    		return true
	    	} else {
	    		this.isError = true
	    		this.isCorrect = false
	    		return false
	    	}
	    },
	    editPassword() {
	    	var _this = this
	    	if(this.judgePassword() && this.getManagerByName() && this.password === this.password1)
	    	{
	    		$.ajax({
		    		url: 'http://localhost:5555/editManagerPassword',
		    		type: 'POST',
		    		dataType: 'json',
		    		data: {
		    			id: _this.myInfo.id,
		    			password: _this.password
		    		},
		    		success(data) {
		    			alert('修改成功,请重新登录')
		    			location.href = '#/login'
		    		}
		    	})
	    	} else {
	    		alert('两次输入密码不一致')
	    	}
	    }
		},
		mounted() {
			this.type = this.$route.query.type
			if(this.type == 0) {
				// 超级管理员
				this.getSuperManagerByName()
			} else {
				this.getManagerByName()
			}
		}
	};
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
	h4 img {
		width: 30px;
		height: 30px;
		vertical-align: middle;
		margin-right: 10px;
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