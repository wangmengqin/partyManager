<template>
	<div style="overflow: hidden;margin: 0 auto; width: 1200px;padding: 20px 0;background: #FDFDFD;">
		<h3>党费缴费情况</h3>
		<table>
			<thead>
				<tr>
					<th>姓名</th>
					<th>时间</th>
					<th>费用</th>
					<th>情况</th>
					<th>操作</th>
				</tr>
			</thead>
			<tr v-if="identify!='党员'&&identify!='书记'" style="text-align:center;">
				<td style="line-height:50px;font-size:20px" colspan="5">您是{{identify}}，不需要缴费哦</td>
			</tr>
			<tr v-if="freeData.length<=0 && (identify=='党员'||identify=='书记')" style="text-align:center;">
				<td style="line-height:50px;font-size:20px" colspan="5">您暂无缴费记录</td>
			</tr>
			<tr v-if="freeData.length>0 && (identify=='党员'||identify=='书记')" v-for="item in freeData">
				<td>{{item.member}}</td>
				<td>{{item.duration}}</td>
				<td>{{item.price==''?'管理员还没录入哦':item.price}}</td>
				<td>{{item.status}}</td>
				<td><a href="javascript" class="edit" v-if="item.status=='未缴费'">缴费</a></td>
			</tr>
		</table>
		<xpagination v-if="freeData.length>0 && (identify=='党员'||identify=='书记')" :total="model.total" :size="model.size" :page="model.page" :changge="getAll"/>
	</div>
</template>
<script>
import xpagination from "../../pagination.vue";
import $ from 'jQuery'
export default {
	components: {
		xpagination
	},
	data(){
		return {
			model:{
        total: 1, // 总页数
        size:5, // 每页显示条目个数不传默认10
        page:1, // 当前页码
      },
      memberName: '',
      sno: '',
      identify: '',
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
	},
	methods: {
		getAll(val) {
			this.model.page=val;
			var _this = this
			this.sno = sessionStorage.getItem('sno')
			if (this.sno != null) {
				$.ajax({
	    		url: 'http://localhost:5555/getMemberBySno',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			sno: _this.sno
	    		},
	    		success(data) {
	    			_this.memberName = data[0].name
	    			_this.identify = data[0].identify
	    		}
	    	})
	    	.done(() => {
	    		$.ajax({
		    		url: 'http://localhost:5555/getFreeBySnoNameCount',
		    		type: 'POST',
		    		dataType: 'json',
		    		data: {
		    			sno: _this.sno,
		    			member: _this.memberName
		    		},
		    		success(data) {
		    			_this.model.total = data[0].count
		    		}
		    	})
		    	$.ajax({
		    		url: 'http://localhost:5555/getFreeBySnoName',
		    		type: 'POST',
		    		dataType: 'json',
		    		data: {
		    			size: _this.model.size,
		    			page: _this.model.page,
		    			sno: _this.sno,
		    			member: _this.memberName
		    		},
		    		success(data) {
		    			_this.freeData = data
		    		}
		    	})
	    	})
			}
			else{
				alert('获取信息失败，请重新登录')
				this.$router.push({ path: '/login' })
			}
		}
	},
	mounted() {
		let _this = this
		this.sno = sessionStorage.getItem('sno')
		if (this.sno != null) {
			$.ajax({
	  		url: 'http://localhost:5555/getMemberBySno',
	  		type: 'POST',
	  		dataType: 'json',
	  		data: {
	  			sno: _this.sno
	  		},
	  		success(data) {
	  			_this.memberName = data[0].name
	  			_this.identify = data[0].identify
	  		}
	  	})
		}
		else{
			alert('获取信息失败，请重新登录')
			this.$router.push({ path: '/login' })
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
		color: #fff;
		background: deepskyblue;
	}
	img{
		cursor: pointer;
	}
</style>