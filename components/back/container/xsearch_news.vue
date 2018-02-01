<template>
	<div class="content_box">
		<h4>查看新闻</h4>
		<p>
			<img src="/imgs/icon_search.png"/>
			<input type="text" placeholder="请输入关键字" />
			<button>搜索</button>
		</p>
	</div>
</template>

<script>
</script>

<style scoped>
	.content_box{
		width: 950px;
		float: right;
		background: #f9f9f9;
	}
	h4{
		padding-left: 20px;
		line-height: 50px;
		border-bottom: 1px solid #ccc;
	}
	.content_box p {
		line-height: 60px;
		text-align: center;
	}
	.content_box p img {
		width: 40px;
		height: 40px;
		vertical-align: middle;
	}
	.content_box p input{
		width: 200px;
		height: 30px;
		border: 0;
		border: 1px solid #ccc;
		padding-left: 10px;
		outline: none;
		margin: 0 20px;
	}
	.content_box p button{
		width: 80px;
		height: 30px;
		text-align: center;
		line-height: 30px;
		border: 0;
		background: #D93732;
		outline: none;
		color: #fff;
	}
</style>