<template>
	<div style="overflow: hidden;margin: 0 auto; width: 1200px;padding: 20px 0;background: #FDFDFD;">
		<h3>活动经费缴费情况</h3>
		<table>
			<thead>
				<tr>
					<th>活动</th>
					<th>编号</th>
					<th>姓名</th>
					<th>活动报名情况</th>
					<th>金额</th>
					<th>缴费情况</th>
					<th>操作</th>
				</tr>
			</thead>
			<tr v-if="freeData==''" style="text-align:center;">
				<td style="line-height:50px;font-size:20px" colspan="7">无数据</td>
			</tr>
			<tr v-for="item in freeData">
				<td>{{item.activity_name}}</td>
				<td>{{item.member_sno}}</td>
				<td>{{item.member}}</td>
				<td :style="{'color': item.status=='已通过'?'green':(item.status=='不通过'?'red':'#666'), 'font-weight': '600'}">{{item.status}}</td>
				<td v-if="item.money != ''">￥{{item.money}}</td>
				<td v-else>管理员未录入</td>
				<td>{{item.money_status}}</td>
				<td><a href="javascript:" class="edit" v-if="item.money_status=='未缴费' && item.status=='已通过'" @click="payMoney(item.id, item.money)">缴费</a></td>
			</tr>
		</table>
	</div>
</template>
<script>
import $ from 'jQuery'
export default {
	data(){
		return {
			freeData: [],
			sno: null, // 登录账号
			memberInfo: [] // 获取的登陆者信息
		}
	},
	methods: {
		payMoney(id, money) {
			var _this = this
			if(money != '') {
				$.ajax({
					url: 'http://localhost:5555/editMemberMoney',
					type: 'POST',
					dataType: 'json',
					data: { id: id, money: money, money_status: '待确认' },
					success() {
						alert('成功')
						$.ajax({
				    		url: 'http://localhost:5555/getMemberBySno',
				    		type: 'POST',
				    		dataType: 'json',
				    		data: {
				    			sno: _this.sno
				    		},
				    		success(data) {
				    			_this.memberInfo = data
				    			
				    		}
				    	})
				    	.done(function() {
							$.ajax({
					    		url: 'http://localhost:5555/memberActivity',
					    		type: 'POST',
					    		dataType: 'json',
					    		success(data) {
					    			for(var i in data) {
					    				if(_this.sno = data[i].member_sno && _this.memberInfo[0].name == data[i].member){
					    					_this.freeData.push(data[i])
					    				}
					    			}
					    		}
					    	})
						})
					}
				})
			} else {
				alert('无活动经费可缴！！')
			}
		}
	},
	mounted() {
		var _this = this
		this.sno = sessionStorage.getItem('sno')
		this.freeData = []
		if (this.sno != null) {
			$.ajax({
	    		url: 'http://localhost:5555/getMemberBySno',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			sno: _this.sno
	    		},
	    		success(data) {
	    			_this.memberInfo = data
	    			
	    		}
	    	})
	    	.done(function() {
				$.ajax({
		    		url: 'http://localhost:5555/memberActivity',
		    		type: 'POST',
		    		dataType: 'json',
		    		success(data) {
		    			for(var i in data) {
		    				if(_this.sno = data[i].member_sno && _this.memberInfo[0].name == data[i].member){
		    					_this.freeData.push(data[i])
		    				}
		    			}
		    		}
		    	})
			})
		}else{
			alert('您还未登录或者获取信息失败')
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