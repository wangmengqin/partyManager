<template>
	<div class="content_box">
		<h4><img src="/imgs/icon_shezhi.png"/>修改密码</h4>
		<div class="input_box">
			<p><span>姓名：</span><input type="text" disabled="disabled" value="XXX"/></p>
			<p><span>编号：</span><input type="text" disabled="disabled" value="10002"/></p>
			<p><span>原密码：</span><input type="text" placeholder="请输入原密码" /><b class="result1">正确</b><b class="result2">密码错误</b></p>
			<p><span>新密码：</span><input type="text" placeholder="请输入新密码" /><b class="result1">通过</b><b class="result2">6-18位字符或数字下划线</b></p>
			<p><span>确认：</span><input type="text" placeholder="请再次输入新密码" /><b class="result1">密码一致</b><b class="result2">两次密码不一致</b></p>
			<p><button>确认修改</button></p>
		</div>
	</div>
</template>

<script>
	import xheader from "../xheader.vue";
	export default {
	  components: {
	    xheader
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
		width: 500px;
		margin: 0 auto;
		padding-top: 30px;
	}
	.input_box p{
		line-height: 50px;
	}
	.input_box p span{
		display: inline-block;
		width: 80px;
	}
	.input_box input {
		width: 200px;
		height: 30px;
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
		margin-left: 80px;
	}
	b{
		font-weight: 500;
		font-size: 12px;
		padding-left: 5px;
	}
	.result1{
		color: darkgreen;
	}
	.result2{
		color: red;
	}
</style>