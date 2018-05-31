<template>
	<div style="overflow: hidden;margin: 0 auto; width: 1200px;padding: 20px 0;background: #FDFDFD;">
		<p v-if="loginSno">我所在支部：<span>{{myInfo.branch}}</span></p>
		<p v-if="loginSno" class="button-p"><button @click="showFilter">我是毕业生党员，申请迁出</button></p>
		<table>
			<tr>
				<th colspan="3">党建机构组织机构</th>
			</tr>
			<tbody v-for="item in branchData">
				<tr>
					<td rowspan="3">{{item.institute}}<br />{{item.name}}</td>
					<td>书记</td>
					<td>{{item.secretary}}</td>
				</tr>
				<tr>
					<td>副书记</td>
					<td>{{item.fu_secretary}}</td>
				</tr>
				<tr>
					<td>宣传委员</td>
					<td>{{item.propagate}}</td>
				</tr>
			</tbody>
			
			<!-- <tr>
				<td rowspan="7">中共重庆科技学院<br />电气与信息工程学院<br />总支委员</td>
				<td>书记</td>
				<td>张三</td>
			</tr>
			<tr>
				<td>书记</td>
				<td>张三</td>
			</tr>
			<tr>
				<td>书记</td>
				<td>张三</td>
			</tr>
			<tr>
				<td>书记</td>
				<td>张三</td>
			</tr>
			<tr>
				<td>书记</td>
				<td>张三</td>
			</tr>
			<tr>
				<td>书记</td>
				<td>张三</td>
			</tr>
			<tr>
				<td>书记</td>
				<td>张三</td>
			</tr>
			<tr>
				<td rowspan="3">教工党员第一党支部</td>
				<td>书记</td>
				<td>张三</td>
			</tr>
			<tr>
				<td>组织委员</td>
				<td>张三</td>
			</tr>
			<tr>
				<td>宣传委员</td>
				<td>张三</td>
			</tr>
			<tr>
				<td rowspan="3">教工党员第二党支部</td>
				<td>书记</td>
				<td>张三</td>
			</tr>
			<tr>
				<td>组织委员</td>
				<td>张三</td>
			</tr>
			<tr>
				<td>宣传委员</td>
				<td>张三</td>
			</tr>
			<tr>
				<td rowspan="3">教工党员第三党支部</td>
				<td>书记</td>
				<td>张三</td>
			</tr>
			<tr>
				<td>组织委员</td>
				<td>张三</td>
			</tr>
			<tr>
				<td>宣传委员</td>
				<td>张三</td>
			</tr>
			<tr>
				<td rowspan="3">教工党员第四党支部</td>
				<td>书记</td>
				<td>张三</td>
			</tr>
			<tr>
				<td>组织委员</td>
				<td>张三</td>
			</tr>
			<tr>
				<td>宣传委员</td>
				<td>张三</td>
			</tr>
			<tr>
				<td rowspan="3">教工党员第五党支部</td>
				<td>书记</td>
				<td>张三</td>
			</tr>
			<tr>
				<td>组织委员</td>
				<td>张三</td>
			</tr>
			<tr>
				<td>宣传委员</td>
				<td>张三</td>
			</tr>
			<tr>
				<td rowspan="3">教工党员第六党支部</td>
				<td>书记</td>
				<td>张三</td>
			</tr>
			<tr>
				<td>组织委员</td>
				<td>张三</td>
			</tr>
			<tr>
				<td>宣传委员</td>
				<td>张三</td>
			</tr>
			<tr>
				<td rowspan="3">学生党员第一党支部</td>
				<td>书记</td>
				<td>张三</td>
			</tr>
			<tr>
				<td>组织委员</td>
				<td>张三</td>
			</tr>
			<tr>
				<td>宣传委员</td>
				<td>张三</td>
			</tr>
			<tr>
				<td rowspan="3">学生党员第二党支部</td>
				<td>书记</td>
				<td>张三</td>
			</tr>
			<tr>
				<td>组织委员</td>
				<td>张三</td>
			</tr>
			<tr>
				<td>宣传委员</td>
				<td>张三</td>
			</tr>
			<tr>
				<td rowspan="3">学生党员第三党支部</td>
				<td>书记</td>
				<td>张三以</td>
			</tr>
			<tr>
				<td>组织委员</td>
				<td>张三</td>
			</tr>
			<tr>
				<td>宣传委员</td>
				<td>张三</td>
			</tr>
			<tr>
				<td rowspan="3">学生党员第四党支部</td>
				<td>书记</td>
				<td>张三</td>
			</tr>
			<tr>
				<td>组织委员</td>
				<td>张三</td>
			</tr>
			<tr>
				<td>宣传委员</td>
				<td>张三</td>
			</tr> -->
		</table>
		<p class="filter" v-show="isShow"></p>
		<ul v-show="isShow">
			<h3>请填写信息 <img style="width:20px;height:20px;position: absolute; right: 20px; top: 8px;" src="/imgs/icon_cancel.png" @click="hideFilter" /></h3>
			<li><span>你现在所在：</span><b>{{myInfo.branch}}</b></li>
			<li>
				<span>迁出至：</span>
				<select @change="getSelect" v-model="selectProvince">
					<option value="0">请选择省份</option>
					<option v-for="obj in province" :value="obj.id" v-text="obj.txt" ></option>
				</select>
				<select @click="getSelectCity" v-model="selectCity">
					<option value="0">请选择城市</option>
					<option v-for="item in cityArr" :value="item.id" v-text="item.txt"></option>
				</select>
			</li>
			<li><span>详细地址：</span><textarea cols="40" rows="2" placeholder="输入详细地址（居委会或工作地所在党支部）" v-model="address"></textarea></li>
			<li style="text-align: center;"><button @click="submitOrg">提交</button><button @click="hideFilter">取消</button></li>
		</ul>
	</div>
</template>

<script>
	import $ from 'jQuery';
	import province from '../../../template/cityData.js';
	export default {
		data(){
			return {
				province:province,
				address:"",
				cityArr:[],
				isShow:false,
				loginSno: null, // 登录的编号
				selectProvince: '', // 省份
				selectCity: '', // 城市
				myInfo: {}, // 我的信息
				branchData: []
			}
		},
		mounted(){
			this.cityArr = this.province[0].list;
			this.selectProvince = this.province[0].id
			this.selectCity = this.cityArr[0].id
			var _this = this
			this.loginSno = sessionStorage.getItem('sno')
			var _this = this
			if (_this.loginSno != null) {
				$.ajax({
		    		url: 'http://localhost:5555/getMemberBySno',
		    		type: 'POST',
		    		dataType: 'json',
		    		data: {
		    			sno: _this.loginSno
		    		},
		    		success(data) {
		    			_this.myInfo = data[0]
		    		}
		    	})
			}
			$.ajax({
				url: 'http://localhost:5555/Branchs',
				type: 'POST',
				dataType: 'json',
			})
			.done(function(data) {
				_this.branchData = data
			})
			.fail(function() {
				console.log("error");
			})
		},
		methods:{
			getSelect(e){
				this.cityArr = this.province[e.target.value].list;
				this.selectProvince = this.province[e.target.value].id
			},
			getSelectCity(e) {
				this.selectCity = this.cityArr[e.target.value].id
			},
			showFilter(){
				this.loginSno = sessionStorage.getItem('sno')
				var _this = this
				if (_this.loginSno != null) {
					$.ajax({
			    		url: 'http://localhost:5555/getMemberBySno',
			    		type: 'POST',
			    		dataType: 'json',
			    		data: {
			    			sno: _this.loginSno
			    		},
			    		success(data) {
			    			_this.myInfo = data[0]
			    		}
			    	})
			    	.done(() => {
			    		if(_this.myInfo.grade != (new Date().getFullYear() - 4 + '级')){
			    			alert('不好意思,您不是毕业生党员')
			    		} else {
							$.ajax({
					    		url: 'http://localhost:5555/getOrgByName',
					    		type: 'POST',
					    		dataType: 'json',
					    		data: {
					    			name: _this.myInfo.name
					    		},
					    		success(data) {
					    			if(data == ''){
					    				console.log(data)
					    				_this.isShow=true;
										$("html").css('overflowY','hidden');
										/*$("body").css('overflowY','hidden');*/
					    			} else {
					    				for(var i in data){
						    				if(data[i].status=='已通过'){
							    				alert('您已迁出成功，迁出至：'+ data[i].city+data[i].address)
							    				_this.isShow=false;
												$("html").css('overflowY','auto');
							    				return;
							    			} else {
							    				_this.isShow=true;
												$("html").css('overflowY','hidden');
												/*$("body").css('overflowY','hidden');*/
							    			}
						    			}
					    			}
					    		}
					    	})
			    		}
			    	})
				} else {
					alert('获取信息失败，请重新登录')
					this.$router.push({ path: `/login` })
				}	
			},
			hideFilter(){
				this.isShow=false;
				$("html").css('overflowY','auto');
			},
			submitOrg() {
				console.log(this.province[this.selectProvince].txt, this.cityArr[this.selectCity].txt)
				var _this = this
				$.ajax({
		    		url: 'http://localhost:5555/addOrg',
		    		type: 'POST',
		    		dataType: 'json',
		    		data: {
		    			sno: _this.loginSno,
		    			name: _this.myInfo.name,
		    			branch: _this.myInfo.branch,
		    			city: _this.province[_this.selectProvince].txt + _this.cityArr[_this.selectCity].txt,
		    			address: _this.address,
		    			applyTime: new Date().getTime(),
		    			status: '待审核'
		    		},
		    		success(data) {
		    			alert('迁出申请提交成功')
		    			_this.address = ''
		    			_this.selectProvince = _this.province[0].id
						_this.selectCity = _this.cityArr[0].id
						_this.isShow=false;
						$("html").css('overflowY','auto');
		    		}
		    	})
			}
		}
	}
</script>

<style scoped>
	table{
		width: 800px;
		border: 1px solid #ccc;
		border-collapse: collapse;
		margin: 0 auto;
		line-height: 30px;
		font-size: 12px;
		text-align: center;
	}
	td{
		border: 1px solid #ccc;
	}
	p{
		text-align: center;
		font-size: 12px;
		line-height: 26px;
		margin-bottom: 10px;
	}
	.button-p button{
		padding: 0 10px;
		background: #D93732;
		color: #fff;
		height: 30px;
		line-height: 30px;
		border: 0;
		outline: none;
	}
	.filter{
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,.2);
		position: fixed;
		left: 0;
		top: 0;
	}
	ul{
		width: 500px;
		position: absolute;
		top: 30%;
		left: 35%;
		background: #fff;
		font-size: 12px;
		overflow: hidden;
		padding-bottom: 20px;
	}
	ul h3{
		text-align: center;
		background: #eee;
		line-height: 36px;
		position: relative;
	}
	li{
		padding: 10px;
		overflow: hidden;
	}
	ul li span{
		float: left;
		width: 80px;
		text-align: right;
    	padding-right: 30px;
	}
	textarea{
		outline: none;
		padding:10px ;
	}
	ul li button{
		width: 50px;
		height: 30px;
		background: #D93732;
		border: 0;
		color: #fff;
		outline: none;
		margin: 0 25px;
	}
</style>