<template>
	<div class="content-bg">
		<div class="content">
			<div class="login_box">
				<h3>用户登录</h3>
				<p class="p200"><span>账号：</span><input v-model="username" type="text" placeholder="请输入账号"/></p>
				<p class="p200"><span>密码：</span><input v-model="password" type="password" placeholder="请输入密码"/></p>
				<p  class="p200">
					<span>身份：</span>
					<select v-model="type">
					<option key="0" value="管理员">管理员</option>
					<option key="1" value="普通党员">普通党员</option>
					<option key="2" value="超级管理员">超级管理员</option>
				</select>
				</p>
				<p class="padding50"><input type="checkbox" v-model="checkbox"/><span>记住用户名和密码</span></p>
				<p style="width:100%;text-align: center;"><button @click="login">登录</button><button @click="apply">申请入党</button></p>
				<p><a href="#/fore/index">暂不登录</a></p>
			</div>
		</div>
	</div>
</template>

<script>
import $ from 'jQuery';
export default {
	data() {
		return {
			username: '',
			password: '',
			type: '普通党员',
			checkbox: true
		}
	},
	methods: {
		login(){
			console.log(this.username, this.password, this.type, this.checkbox)
			var _this = this
			if(_this.type == '普通党员' && this.username!='' && this.password !=''){
				$.ajax({
					url: 'http://localhost:5555/getLoginInfo',
					type: 'post',
					dataType: 'json',
					data: {
						username: _this.username
					},
					success(data){
						if(data != ''){
							if(_this.password === data[0].password){
								sessionStorage.setItem("sno", _this.username);
								if(_this.checkbox){
									sessionStorage.setItem("password", _this.password);
								}
								location.href = "#/fore/index"
							}else{
								alert('密码错误')
							}
						}else{
							alert('用户不存在')
						}
					}
				})
			}else if(_this.type == '管理员' && this.username!='' && this.password !=''){
				$.ajax({
					url: 'http://localhost:5555/getManagerLoginInfo',
					type: 'post',
					dataType: 'json',
					data: {
						username: _this.username
					},
					success(data){
						if(data != ''){
							if(_this.password === data[0].password){
								sessionStorage.setItem("managerLoginNum", _this.username);
								if(_this.checkbox){
									sessionStorage.setItem("managerLoginPassword", _this.password);
								}
								_this.$router.push({ path: '/tab', query:{type: 1} })
							}else{
								alert('密码错误')
							}
						}else{
							alert('用户不存在')
						}
					}
				})
			}else if(_this.type == '超级管理员' && this.username!='' && this.password !=''){
				$.ajax({
					url: 'http://localhost:5555/getSuperLoginInfo',
					type: 'post',
					dataType: 'json',
					data: {
						username: _this.username
					},
					success(data){
						if(data != ''){
							if(_this.password === data[0].password){
								sessionStorage.setItem("superLoginNum", _this.username);
								if(_this.checkbox){
									sessionStorage.setItem("superLoginPassword", _this.password);
								}
								_this.$router.push({ path: '/tab', query:{type: 0} })
							}else{
								alert('密码错误')
							}
						}else{
							alert('用户不存在')
						}
					}
				})
			}else{
				alert('用户名密码不能为空')
			}
		},
		apply() {
			this.$router.push('/fore/apply')
		}
	},
	mounted() {
		if(sessionStorage.getItem("sno")!=null) {
			this.username = sessionStorage.getItem("sno");
			this.password = sessionStorage.getItem("password");
		} else if(sessionStorage.getItem("superLoginNum")!=null){
			this.username = sessionStorage.getItem("superLoginNum");
			this.password = sessionStorage.getItem("superLoginPassword");
			this.type = '超级管理员'
		}
		
		if(this.username != '' && this.password != ''){
			this.checkbox = true
		}
	}
}
</script>

<style scoped>
	a {
		color: #333;
	}
	a:hover {
		color: #d93732;
	}
	.login_box{
		width: 300px;
		overflow: hidden;
		position: absolute;
		right: 200px;
		top: 25%;
		padding:20px;
		background: #f9f9f9;
		font-size: 12px;
	}
	.content-bg {
	    width: 100%;
	    height: 700px;
	    background: url(/imgs/login-bg.jpg) no-repeat;
	    background-size: cover;
	}
	h3{
		font-size: 18px;
		line-height: 30px;
		border-bottom:1px solid #ccc ;
		color: #333;
		padding-bottom: 10px;
	}
	.login_box p{
		line-height: 36px;
		margin-top: 15px;
		overflow: hidden;
		width: 270px;
	}
	.p200 input{
		width: 200px;
		height: 30px;
		outline: none;
		padding-left: 10px;
		float: right;
	}
	.p200 span{
		float: left;
    	width: 55px;
	}
	.padding50{
		padding-left: 60px;
	}
	.padding50 input{
		margin-top: 12px;
		margin-right: 5px;
		float: left;
	}
	button{
		width: 100px;
		outline: none;
		border: 0;
		background: #d93732;
		height: 30px;
		line-height: 30px;
		color: #fff;
		margin: 0 10px;
	}
</style>