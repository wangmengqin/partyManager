<template>
	<div style="overflow: hidden;margin: 0 auto; width: 1200px;padding: 20px 0;background: #FDFDFD;">
		<h3>我的信息</h3>
		<div class="content_box">
			<div class="input_box">
				<div>
					<span>姓名：</span>
					<input type="text" placeholder="请输入姓名" disabled v-model="myInfo.name"/>
				</div>
				<div>
					<span>编号：</span>
					<input type="text" placeholder="请输入编号" disabled v-model="myInfo.sno"/>
				</div>
				<div>
					<span>学院：</span>
					<input type="text" placeholder="请输入学院" disabled v-model="myInfo.institute"/>
				</div>
				<div>
					<span>专业：</span>
					<input type="text" placeholder="请输入专业" disabled v-model="myInfo.major"/>
				</div>
				<div>
					<span>所属支部：</span>
					<input type="text" placeholder="所属支部" disabled v-model="myInfo.branch"/>
				</div>
				<div>
					<span>职位：</span>
					<input type="text" placeholder="职位" disabled v-model="myInfo.identify"/>
				</div>
				<div>
					<span>入党时间：</span>
					<b>{{myInfo.becomeMemberTime | formatDate}}</b>
				</div>
				<div v-show="myInfo.memberTime != ''">
					<span>成为正式党员时间：</span>
					<b>{{myInfo.memberTime | formatDate}}</b>
				</div>
				<div>
					<span>请输入原密码：</span>
					<input type="password" @blur="judgePassword" placeholder="请输入原密码" v-model="primePassword"/>
					<b v-show="isError" style="color: red;">原密码错误</b>
					<b v-show="isCorrect" style="color: green;">验证通过</b>
				</div>
				<div>
					<span>请输入新密码：</span>
					<input type="password" placeholder="请输入新密码" v-model="password"/>
				</div>
				<div>
					<span>请再次输入新密码：</span>
					<input type="password" placeholder="请再次输入新密码" v-model="password1"/>
				</div>
				<div style="text-align:center"><button @click="editPassword">确认</button></div>
			</div>
		</div>
		<!-- <div class="my-info" style="overflow: hidden;width: 600px;margin: 0 auto;">
			<div class="fr editImg">
				<p id=""><img :src="userphoto" id="upuserpic"/>	</p>
				<input type="file" name="" id="uploaderInput" value="" @click="showuserimg"/>
				<button>修改</button>
			</div>
		</div> -->
	</div>
</template>

<script>
	import $ from 'jQuery';
	import {formatDate} from '../../../template/date.js';
	export default{
		data(){
			return{
				userphoto:"/imgs/gray_wode.png",
				sno: null, // 登录的学号
				myInfo: {}, // 我的信息
				primePassword: null, // 输入的原密码
				password: null, // 输入的新密码
				password1: null, // 确认密码
				becomeMemberTime: '',
				memberTime: '',
				isError: false,
				isCorrect: false
			}
		},
		filters: {
		    formatDate(time) {
		        var date = new Date(Number(time));
		        return formatDate(date, 'yyyy-MM-dd');
		    }
		},
		methods:{
			showuserimg(e){
		        var uploaderInput = $("#uploaderInput");
		        var imgFile = uploaderInput[0].files[0];
		        /*var fr = new FileReader();
		        fr.onload = function() {
		            var pic=$("#upuserpic");
		            pic[0].src = fr.result;
		        };
		        fr.readAsDataURL(imgFile);  */
		        /*var files = e.target.files ||e.dataTransfer.files;
			    if (!files.length)return;
			    console.log(files)
			    this.userphoto = files[0];*/
		   },
		   getMemberBySno() {
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
			    			_this.myInfo = data[0]
			    		}
			    	})
			    	return true
				}
				else{
					alert('获取信息失败，请重新登录')
					location.href = '#/login'
					return false
				}
		    },
		    judgePassword() {
		    	if(this.primePassword == this.myInfo.password) {
		    		this.isCorrect = true
		    		this.isError = false
		    		return true
		    	} else {
		    		this.isError = true
		    		this.isCorrect = false
		    		return false
		    	}
		    },
		    editPassword() {
		    	var _this = this
		    	if(this.judgePassword() && this.getMemberBySno() && this.password === this.password1)
		    	{
		    		$.ajax({
			    		url: 'http://localhost:5555/editMemberPassword',
			    		type: 'POST',
			    		dataType: 'json',
			    		data: {
			    			id: _this.myInfo.id,
			    			password: _this.password
			    		},
			    		success(data) {
			    			alert('修改成功,请重新登录')
			    			location.href = '#/login'
			    		}
			    	})
		    	} else {
		    		alert('两次输入密码不一致')
		    	}
		    	
		    }
		},
		mounted() {
			this.getMemberBySno()
		}
	}
</script>

<style scoped>
	h3{
		background: #D93732;
		color: #fff;
		font-size: 16px;
		line-height: 36px;
		text-align: center;
	}
	.fl{
		float: left;
	}
	.fr{
		float: right;
	}
	.editImg{
		text-align: center;
	}
	.editImg img{
		width: 100px;
		height: 100px;
	}
	.content_box{
		width: 1000px;
		margin: 0 auto;
		min-height: 620px;
	}
	h4{
		padding-left: 20px;
		line-height: 50px;
		border-bottom: 1px solid #ccc;
	}
	.input_box{
		width: 900px;
		margin: 0 auto;
	}
	.input_box span{
		display: inline-block;
		width: 150px;
		text-align: right;
		margin-right: 30px;
	}
	.input_box div{
		line-height: 50px;
	}
	.input_box input {
		width: 600px;
		height: 36px;
		outline: none;
		border: 0;
		border: 1px solid #eee;
		padding-left: 10px;
	}
	button{
		height: 30px;
		text-align: center;
		line-height: 30px;
		border: 0;
		background: #D93732;
		outline: none;
		color: #fff;
		padding:0 10px;
	}
</style>