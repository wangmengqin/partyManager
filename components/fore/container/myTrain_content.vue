<template>
	<div style="overflow: hidden;margin: 0 auto; width: 1200px;padding: 20px 0;background: #FDFDFD;">
		<h3>我参加的培训<span style="color:red">(请准时参加报名成功的培训)</span></h3>
		<table>
			<thead>
				<tr>
					<th>编号</th>
					<th>姓名</th>
					<th>培训名称</th>
					<th>培训类型</th>
					<th>报名时间</th>
					<th>状态</th>
					<th>操作</th>
				</tr>
			</thead>
			<tr v-if="myTrainData.length<=0" style="text-align:center;">
				<td style="line-height:50px;font-size:20px" colspan="7">无数据</td>
			</tr>
			<tr v-for="item in myTrainData">
				<td>{{item.sno}}</td>
				<td>{{item.member}}</td>
				<td>{{item.title}}</td>
				<td>{{item.type}}</td>
				<td>{{item.enrollTime | formatDate}}</td>
				<td :style="{'color': item.status=='已通过'?'green':(item.status=='不通过'?'red':'#666'), 'font-weight': '600'}">{{item.status}}</td>
				<td><a href="javascript:" class="edit" v-if="item.status=='待审核'" @click="cancelJoin(item.id)">我不想参加了</a></td>
			</tr>
		</table>
		<xpagination :total="model.total" :size="model.size" :page="model.page" :changge="getAll"/>
	</div>
</template>
<script>
import $ from 'jQuery'
import xpagination from "../../pagination.vue";
import {formatDate} from '../../../template/date.js';
export default {
	components: {
		xpagination
	},
	data(){
		return {
			model:{
        total: 1, // 总页数
        size:10, // 每页显示条目个数不传默认10
        page:1, // 当前页码
      },
			myTrainData: [],
			sno: null, // 登录账号
			memberInfo: [] // 获取的登陆者信息
		}
	},
	filters: {
    formatDate(time) {
        var date = new Date(Number(time));
        return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
	},
	methods: {
		getAll(val) {
			var _this = this
			this.model.page=val;
			this.sno = sessionStorage.getItem('sno')
			if (this.sno != null) {
				$.ajax({
		    		url: 'http://localhost:5555/getMemberBySno',
		    		type: 'POST',
		    		dataType: 'json',
		    		data: {
		    			sno: _this.sno
		    		}
		    	})
		    	.done(function(data) {
		    		_this.memberInfo = data
						$.ajax({
			    		url: 'http://localhost:5555/getMyTrainCount',
			    		type: 'POST',
			    		dataType: 'json',
			    		data: {
			    			sno: _this.sno,
			    			member: _this.memberInfo[0].name
			    		},
			    		success(data) {
			    			_this.model.total = data[0].count
			    		}
			    	})
			    	$.ajax({
			    		url: 'http://localhost:5555/getMyTrain',
			    		type: 'POST',
			    		dataType: 'json',
			    		data: {
			    			size: _this.model.size,
			    			page: _this.model.page,
			    			sno: _this.sno,
			    			member: _this.memberInfo[0].name
			    		},
			    		success(data) {
			    			_this.myTrainData = data
			    		}
			    	})
				})
			}else{
				alert('您还未登录或者获取信息失败')
				this.$router.push({ path: '/login' })
			}
		},
		cancelJoin(id) {
			var _this = this
			$.ajax({
	    		url: 'http://localhost:5555/deleteMyTrain',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			id: id
	    		},
	    		success(data) {
	    			alert('操作成功')
	    			$.ajax({
			    		url: 'http://localhost:5555/getMyTrain',
			    		type: 'POST',
			    		dataType: 'json',
			    		data: {
			    			size: _this.model.size,
			    			page: _this.model.page,
			    			sno: _this.sno,
			    			member: _this.memberInfo[0].name
			    		},
			    		success(data) {
			    			console.log('参加的培训', data)
			    			_this.myTrainData = data
			    		}
			    	})
	    		}
	    	})
		}
	},
	mounted() {
		
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
		padding: 0 10px;
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