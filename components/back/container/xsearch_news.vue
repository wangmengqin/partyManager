<template>
	<div class="content_box">
		<h4><img src="/imgs/icon_search.png"/>查看新闻</h4>
		<p>
			
			<input type="text" placeholder="请输入关键字" />
			<button>通过id搜索</button>
			<button>通过新闻标题搜索</button>
			<button>通过新闻内容搜索</button>
			<button>通过作者搜索</button>
		</p>
		<table>
			<thead>
				<tr>
					<th>ID</th>
					<th>标题</th>
					<th>作者</th>
					<th>摘要</th>
					<th>时间</th>
					<th>操作</th>
				</tr>
			</thead>
			<tr>
				<td>1</td>
				<td>Data</td>
				<td>Data12</td>
				<td>这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘</td>
				<td>2018/02/01</td>
				<td><a href="##" class="edit">编辑</a><a href="##" class="del">删除</a></td>
			</tr>
			<tr>
				<td>2</td>
				<td>Data</td>
				<td>Data12</td>
				<td>这是2这是2这是2这是2这是2这是2这是2这是2</td>
				<td>2018/02/01</td>
				<td><a href="##" class="edit">编辑</a><a href="##" class="del">删除</a></td>
			</tr>
			<tr>
				<td>3</td>
				<td>Data</td>
				<td>Data12</td>
				<td>这是2这是2这是2这是2这是2这是2这是2这是2</td>
				<td>2018/02/01</td>
				<td><a href="##" class="edit">编辑</a><a href="##" class="del">删除</a></td>
			</tr>
			<tr>
				<td>4</td>
				<td>Data</td>
				<td>Data12</td>
				<td>这是2这是2这是2这是2这是2这是2这是2这是2</td>
				<td>2018/02/01</td>
				<td><a href="##" class="edit">编辑</a><a href="##" class="del">删除</a></td>
			</tr>
			<tr>
				<td>5</td>
				<td>Data</td>
				<td>Data12</td>
				<td>这是2这是2这是2这是2这是2这是2这是2这是2</td>
				<td>2018/02/01</td>
				<td><a href="##" class="edit">编辑</a><a href="##" class="del">删除</a></td>
			</tr>
		</table>
		<xpagination />
	</div>
</template>

<script>
	import xpagination from "../xpagination.vue";
	export default {
	  components: {
	    xpagination
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
	.content_box p {
		line-height: 60px;
		text-align: center;
	}
	h4 img {
		width: 30px;
		height: 30px;
		vertical-align: middle;
		margin-right: 10px;
	}
	.content_box p input{
		width: 230px;
		height: 30px;
		border: 0;
		border: 1px solid #ccc;
		padding-left: 10px;
		outline: none;
		margin: 0 20px;
	}
	.content_box p button{
		height: 30px;
		text-align: center;
		line-height: 30px;
		border: 0;
		background: #D93732;
		outline: none;
		color: #fff;
		padding:0 10px;
	}
	table{
		width: 100%;
		border-collapse: collapse;
		font-size: 12px;
		color: #8c8c8c;
		margin-top: 30px;
		table-layout: fixed;
	}
	td{
		line-height: 26px;
		padding: 10px 0;
	}
	 table tr{
		text-align: center;
		border-bottom: 1px solid #eee;
	}
	 table thead{
		background: #f1f1f1;	
	}
	
	 table thead tr{
		line-height: 50px;
		font-size: 14px;
		color: #333;
		font-weight: 500;
		border-bottom:0;
	
	}
	.del{
		display: inline-block;
	    width: 35px;
	    height: 30px;
	    background: #ed5564;
	    line-height: 30px;
	    color: #fff;
	    border-radius: 4px;
	    text-align: center;
	    margin-left: 5px;
	}
	.edit{
		display: inline-block;
	    width: 35px;
	    height: 30px;
	    background: #ed5564;
	    line-height: 30px;
	    color: #fff;
	    border-radius: 4px;
	    text-align: center;
	}
</style>