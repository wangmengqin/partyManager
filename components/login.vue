<template>
	<div class="content-bg">
		<div class="content">
			<div class="login_box">
				<h3>用户登录</h3>
				<p class="p200"><span>账号：</span><input  type="text" placeholder="请输入账号"/></p>
				<p class="p200"><span>密码：</span><input type="password" placeholder="请输入密码"/></p>
				<p class="padding50"><input type="checkbox"/><span>记住用户名和密码</span></p>
				<p style="width:100%;text-align: center;"><button @click="login">登录</button><button @click="apply">申请入党</button></p>
			</div>
		</div>
	</div>
</template>

<script>
import $ from 'jQuery';
export default {
	data() {
		return {

		}
	},
	methods: {
		login(){
			$.ajax({
				url: 'http://localhost:5555/getList',
				type: 'post',
				dataType: 'json',
				success(data){
					console.log(data);
				}
			})
		},
		apply() {
			location.href = "#/fore/apply"
		}
	}
}
</script>

<style scoped>
	
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