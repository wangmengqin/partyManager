<template>
	<header  style="width: 1200px;margin: 0 auto;">
		<p class="fl logo-p"><img src="/imgs/logo.png"/><a href="##" title="首页">高校党务管理工作平台</a></p>
		<p class="fr headermenu"><a @click="linkToMy" style="margin: 0;"><img src="/imgs/icon_mine.png" title="我的"/></a><a @click="linkToLogin">[退出]</a>|<a @click="linkToMy">修改密码</a></p>
		<!--<img src="/imgs/ss.jpg" alt="" />-->
	</header>
</template>

<script>
import $ from 'jQuery'
export default {
	data() {
		return {
			loginNum: null // 登录的账号
		}
	},
	methods: {
		linkToMy() {
			this.loginNum = sessionStorage.getItem('sno')
			if(this.loginNum != null) {
				this.$router.push({ path: `/fore/mine` })
			} else {
				this.$router.push({ path: `/login` })
			}
		},
		linkToLogin() {
			sessionStorage.removeItem('sno')
			sessionStorage.removeItem('password')
			this.$router.push({ path: `/login`, query:{ type: 2 } })
		}
	}
}
</script>

<style scoped>
	header{
		overflow: hidden;
		/*background: url(/imgs/ss.jpg) no-repeat;
		background-size: contain;*/
		line-height: 50px;
		background:#FDFDFD;
	}
	header p{
		padding: 0 20px;
	}
	/*header img{
		width: 100%;
		height: 80px;
	}*/
	.fl{
		float: left;
	}
	.fr{
		float: right;
	}
	.logo-p img{
		width: 80px;
		height: 80px;
		vertical-align: middle;
	}
	.logo-p a{
		color: #333;
		font-weight: 800;
	}
	.headermenu{
		font-size: 12px;
		color: #f64141;
    	margin-top: 11px;
	}
	.headermenu a{
		color: #f64141;
	}
	
	.headermenu img{
		width: 24px;
		height: 24px ;
		vertical-align: middle;
	}
	.headermenu a{
		margin: 0 10px;
	}
</style>