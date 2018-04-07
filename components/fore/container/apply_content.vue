<template>
	<div  style="overflow: hidden;margin: 0 auto; width: 1200px;padding: 20px 0;background: #FDFDFD;">
		<h3>请填写个人信息</h3>
		<form style="width:500px;margin:0 auto">
			<p>
				<label for="">姓名：</label><input type="text" placeholder="清填写姓名">
			</p>
			<p>
				<label for="">性别：</label><input type="text" placeholder="清填写姓名">
			</p>
			<p>
				<label for="">籍贯</label>
				<select @change="getSelect">
					<option value="0">请选择省份</option>
					<option v-for="obj in province" :value="obj.id" v-text="obj.txt" ></option>
				</select>
				<select>
					<option value="0">请选择城市</option>
					<option v-for="item in cityArr" :value="item.id" v-text="item.txt"></option>
				</select>
			</p>
			<p>
				<label for="">学院：</label><input type="text" placeholder="清填写学院">
			</p>
			<p>
				<label for="">专业：</label><input type="text" placeholder="清填写专业">
			</p>
			<p>
				<label for="">学号：</label><input type="text" placeholder="清填写学号">
			</p>
			<p><label for="">入党申请书：</label><input type="file" class="noborder"></p>
			<p style="text-align:center;"><button>确认申请</button><input type="reset" class="noborder reset" /></p>
		</form>
	</div>
</template>
<script>
import province from '../../../template/cityData.js';
export default{
	data(){
		return {
			province:province,
			cityArr:[]
		}
	},
	mounted(){
		this.cityArr = this.province[0].list;
	},
	methods:{
		getSelect(e){
			console.log(e.target.value);
			this.cityArr = this.province[e.target.value].list;
		}
	}
}
</script>
<style scoped>
    h3{
    	font-size: 18px;
    	font-weight: 500;
    	line-height: 50px;
    	color: #666;
    	border-bottom: 1px solid #eee;
    	text-align: center;
    }
	form p{
		line-height: 80px;
		color: #333;
	}
	label{
		display: inline-block;
		width: 100px;
		margin-right: 30px;
	}
	input{
		width: 300px;
		height: 36px;
		outline: none;
		border: 1px solid #eee;
		padding-left: 20px;
	}
	.noborder{
		border: none;
	}
	button{
		outline: none;
		width: 100px;
		height: 30px;
		text-align: center;
		line-height: 30px;
		border: 0;
		background: #d93732;
		color: #fff;
		margin-right: 30px;
	}
	.reset{
		outline: none;
		width: 100px;
		height: 30px;
		text-align: center;
		line-height: 30px;
		border: 0;
		background: #ccc;
		color: #fff;
		padding-left: 0;
	}
</style>