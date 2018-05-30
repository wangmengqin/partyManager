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
			<tr v-if="currentData.length>0" v-for="item in currentData">
				<td>{{item.member}}</td>
				<td>{{item.duration}}</td>
				<td>{{item.price==''?'管理员还没录入哦':(item.price+'元')}}</td>
				<td :style="{'color': item.status=='已缴费'?'green':(item.status=='未缴费'?'red':'#666'), 'font-weight': '600'}">{{item.status}}</td>
				<td><a href="javascript" class="edit" v-if="item.status=='未缴费'">缴费</a></td>
			</tr>
			<tr v-if="freeData.length>0 && (identify=='党员'||identify=='书记')" v-for="(item,index) in freeData">
				<td>{{item.member}}</td>
				<td>{{item.duration}}</td>
				<td>{{item.price==''?'管理员还没录入哦':(item.price+'元')}}</td>
				<td :style="{'color': item.status=='已缴费'?'green':(item.status=='未缴费'?'red':'#666'), 'font-weight': '600'}">{{item.status}}</td>
				<td><a href="javascript:" class="edit" v-if="item.status=='未缴费'" @click="pay(item.id, index)">缴费</a></td>
			</tr>
		</table>
		<xpagination :total="model.total" :size="model.size" :page="model.page" :changge="getAll"/>
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
      currentData: [], // 当前月的数据，若本月无记录，则先添加
			freeData: [] // 缴费记录数据
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
		    			let str = new Date().getFullYear() +'年'+ (new Date().getMonth()+1)+'月'
		    			_this.currentData = []
		    			for(var i in _this.freeData) {
		    				// 如果数据中没有当前月的缴费记录，则要在页面上先生成
		    				if(_this.currentData.filter(item=>item.member==_this.freeData[i].member).length<=0) {
		    					_this.currentData.push({
	  								sno: _this.freeData[i].sno,
	  								member: _this.freeData[i].member,
	  								memberTime: _this.freeData[i].memberTime,
	  								type: _this.freeData[i].type,
	  								salary: '',
	  								price: '',
	  								duration:str
	  							})
		    				}
		    				// 有记录的则删除
		    				let arr = _this.freeData.filter(item=>item.duration==str && item.member==_this.freeData[i].member)
		    				if(arr != undefined && arr.length>0){
		    					var name = arr[0].member
		    					// 删除
		    					_this.currentData.splice(_this.currentData.indexOf(_this.currentData.filter(item=>item.member == name)[0]), 1)
		    				}
		    				console.log(_this.currentData)
		    			}
		    		}
		    	})
	    	})
			}
			else{
				alert('获取信息失败，请重新登录')
				this.$router.push({ path: '/login' })
			}
		},
		pay(id,index) {
			console.log('缴费id', id)
			let _this = this
			$.ajax({
    		url: 'http://localhost:5555/payFreeById',
    		type: 'POST',
    		dataType: 'json',
    		data: {
    			id: id,
    			status: '待审核',
    			payTime: new Date().getTime()
    		},
    		success(data) {
    			alert('缴费成功，请等待管理员确认')
    			_this.freeData[index].status='待审核'
    		}
    	})
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