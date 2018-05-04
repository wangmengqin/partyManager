<template>
	<header>
		<h3><img src="/imgs/logo1.png"	/>党务管理工作平台</h3>
		<p>当前用户：{{loginNum}} <a href="javascript:" @click="linkToLogin">[退出]</a>|<a href="#/tab/editpassword">修改密码</a></p>
	</header>
</template>

<script>
export default {
	data() {
		return {
			loginNum: 'XXX'
		}
	},
	methods: {
		linkToLogin() {
			this.$router.push({ path: `/login` })
		}
	},
	mounted() {
		if(this.$route.query.type == 0) {
			this.loginNum = sessionStorage.getItem('superLoginNum')
		} else {
			this.loginNum = sessionStorage.getItem('managerLoginNum')
		}
		
	}
}
</script>

<style scoped>
	header{
		width: 1200px;
		overflow: hidden;
		margin: 0 auto;
		background: #D93732;
		box-sizing: border-box;
		padding: 0 40px;
		line-height: 100px;
		color: #fff;
		font-size: 12px;
	}
	h3{
		float: left;
		font-size: 24px;
	}
	h3 img{
		width: 80px;
		height: 80px;
		vertical-align: middle;
		margin-right: 10px;
	}
	p{
		float: right;
		
	}
	p a{
		color: #fff;
		margin: 0 10px;
	}
</style>