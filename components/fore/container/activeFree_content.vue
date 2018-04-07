<template>
	<div style="overflow: hidden;margin: 0 auto; width: 1200px;padding: 20px 0;background: #FDFDFD;">
		<h3>活动经费缴费情况</h3>
		<table>
			<thead>
				<tr>
					<th>年份</th>
					<th>时间</th>
					<th>情况</th>
					<th>操作</th>
				</tr>
			</thead>
			<tr v-for="item in freeData">
				<td>{{item.year}}</td>
				<td>{{item.monthTime}}</td>
				<td>{{item.situation}}</td>
				<td><a href="##" class="edit" v-if="item.situation=='未缴费'">缴费</a></td>
			</tr>
		</table>
	</div>
</template>
<script>
export default {
	data(){
		return {
			freeData: [
				{
					id: 0,
					year: '2018年',
					monthTime: '04-06月',
					situation: '未缴费'
				},
				{
					id: 1,
					year: '2018年',
					monthTime: '01-03月',
					situation: '已缴费'
				},
				{
					id: 2,
					year: '2017年',
					monthTime: '10-12月',
					situation: '已缴费'
				},
				{
					id: 3,
					year: '2017年',
					monthTime: '07-09月',
					situation: '已缴费'
				},
				{
					id: 4,
					year: '2017年',
					monthTime: '04-06月',
					situation: '已缴费'
				}
			]
		}
	}
}
</script>
<style scoped>
	h3{
		height: 46px;
		line-height: 46px;
		padding-left: 20px;
		color: #2D2D2D;
		font-weight: 500;
		border-bottom: 1px solid #ccc;
		text-align: center;
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
	a{
		display: inline-block;
		color: #fff;
		width: 50px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		background: #d93732;
		border-radius: 5px;
	}
	a:hover {
		color: #d93732;
	}
	img{
		cursor: pointer;
	}
</style>