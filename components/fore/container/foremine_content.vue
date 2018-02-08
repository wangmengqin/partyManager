<template>
	<div style="overflow: hidden;margin: 0 auto; width: 1200px;padding: 20px 0;background: #FDFDFD;">
		<h3>我的信息</h3>
		<div class="my-info" style="overflow: hidden;    width: 600px;margin: 0 auto;">
			<div class="fl info-div">
				<p>姓名：张三</p>
				<p>编号：3425617283</p>
				<p>学院：电气与信息工程学院</p>
				<p>所属支部：一支部</p>
				<p>职位：预备党员</p>
				<p>入党时间：2016-11-30</p>
				<p>成为正式党员时间：2017-11-30</p>
				<p><a href="##">修改密码</a></p>
			</div>
			<div class="fr editImg">
				<p id=""><img :src="userphoto" id="upuserpic"/>	</p>
				<input type="file" name="" id="uploaderInput" value="" @click="showuserimg"/>
				<button>修改</button>
			</div>
		</div>
	</div>
</template>

<script>
	import $ from 'jQuery';
	export default{
		data(){
			return{
				userphoto:"/imgs/gray_wode.png"
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
		   }
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
	.info-div{
		line-height: 36px;
		padding: 10px;
	}
</style>