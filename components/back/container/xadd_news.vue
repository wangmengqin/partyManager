<template>
	<div class="content_box">
		<h4>发布新闻</h4>
		<div class="input_box">
			<p><span>标题：</span><input type="text" placeholder="请输入标题" /></p>
			<p><span>标题：</span><input type="text" placeholder="请输入标题" /></p>
			<p><span>标题：</span><input type="text" placeholder="请输入标题" /></p>
			<p><span>标题：</span><input type="text" placeholder="请输入标题" /></p>
			<p><span>标题：</span><input type="text" placeholder="请输入标题" /></p>
			<p><button>确认</button></p>
		</div>
	</div>
</template>

<script>
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
		width: 400px;
		margin: 0 auto;
	}
	.input_box p{
		line-height: 36px;
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
	}
</style>