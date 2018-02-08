<template>
	<div style="overflow: hidden;margin: 0 auto; width: 1200px;padding: 20px 0;background: #FDFDFD;">
		<p>我所在支部：<span>学生党员第一支部</span></p>
		<p class="button-p"><button @click="showFilter">我是毕业生党员，申请迁出</button></p>
		<table>
			<tr>
				<th colspan="3">党建机构组织机构</th>
			</tr>
			<tr>
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
			</tr>
		</table>
		<p class="filter" v-show="isShow"></p>
		<ul v-show="isShow">
			<h3>请填写信息 <img style="width:20px;height:20px;position: absolute; right: 20px; top: 8px;" src="/imgs/icon_cancel.png" @click="hideFilter" /></h3>
			<li><span>你现在所在：</span><b>中共重庆科技学院学生党员第一支部</b></li>
			<li>
				<span>迁出至：</span>
				<select @change="getSelect">
					<option value="0">请选择省份</option>
					<option v-for="obj in province" :value="obj.id" v-text="obj.txt" ></option>
				</select>
				<select>
					<option value="0">请选择城市</option>
					<option v-for="item in cityArr" :value="item.id" v-text="item.txt"></option>
				</select>
			</li>
			<li><span>详细地址：</span><textarea cols="40" rows="2" placeholder="输入详细地址（居委会或工作地所在党支部）" v-model="address"></textarea></li>
			<li><button>提交</button><button @click="hideFilter">取消</button></li>
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
				isShow:false
			}
		},
		mounted(){
			this.cityArr = this.province[0].list;
		},
		methods:{
			getSelect(e){
				console.log(e.target.value);
				this.cityArr = this.province[e.target.value].list;
			},
			showFilter(){
				this.isShow=true;
				$("html").css('overflowY','hidden');
				/*$("body").css('overflowY','hidden');*/
			},
			hideFilter(){
				this.isShow=false;
				$("html").css('overflowY','auto');
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
		position: absolute;
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
		margin-left: 80px;
	}
</style>