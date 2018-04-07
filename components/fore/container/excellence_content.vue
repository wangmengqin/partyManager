<template>
	<div  style="overflow: hidden;margin: 0 auto; width: 1200px;padding: 20px 0;background: #FDFDFD;">
		<div class="width900">
			<h3>图解争先创优</h3>
			<div style="overflow:hidden;margin:30px;">
				<img class="fl" src="/imgs/life-pic1.jpg"><img class="fr" src="/imgs/life-pic2.jpg">
			</div>
		</div>
		<div class="width900">
			<h3>争先创优动态</h3>
			<div style="overflow:hidden;margin:30px;">
				<ul class="fl">
					<li v-for="item in lifeExperience"><a href="##">{{item.title}}</a></li>
				</ul>
				<ul class="fr">
					<li v-for="item in otherLife"><a href="##">{{item.title}}</a></li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
export default{
	data(){
		return {
			lifeExperience: [
				{
					id: 0,
					title: '莫让民主生活会成了“秀场”',
					content: '' 
				},
				{
					id: 1,
					title: '莫让“好人主义”搅坏了民主生活会',
					content: '' 
				},
				{
					id: 2,
					title: '有“辣味”才是“真滋味”',
					content: '' 
				},
				{
					id: 3,
					title: '开好民主生活关键在“四个要素”',
					content: '' 
				},
				{
					id: 4,
					title: '开好民主生活会请别忘了“后半段”',
					content: '' 
				},
				{
					id: 5,
					title: '敢于“自我革命” 永葆“肌体健康”',
					content: '' 
				},
				{
					id: 6,
					title: '缺了“辣味”的生活会见不到火热效果',
					content: '' 
				},
				{
					id: 7,
					title: '查摆问题切忌“降格以求”',
					content: '' 
				},
				{
					id: 8,
					title: '批评只是开始 整改才是关键',
					content: '' 
				},
				{
					id: 9,
					title: '扭住开好民主生活会的“关键点”',
					content: '' 
				}
			],
			otherLife: [
				{
					id: 0,
					title: '电气与信息工程学院召开2016年度民主生活会',
					content: '' 
				},
				{
					id: 1,
					title: '电气与信息工程学院学生党员一支部召开2016年度民主生活会',
					content: '' 
				},
				{
					id: 2,
					title: '法贸学院党员一支部召开2016年度民主生活会',
					content: '' 
				},
				{
					id: 3,
					title: '安全学院党员三支部召开2016年度民主生活会',
					content: '' 
				},
				{
					id: 4,
					title: '法贸学院党员一支部召开2016年度民主生活会',
					content: '' 
				},
				{
					id: 5,
					title: '电气与信息工程学院学生党员一支部召开2016年度民主生活会',
					content: '' 
				},
				{
					id: 6,
					title: '电气与信息工程学院学生党员一支部召开2016年度民主生活会',
					content: '' 
				},
				{
					id: 7,
					title: '电气与信息工程学院学生党员一支部召开2016年度民主生活会',
					content: '' 
				},
				{
					id: 8,
					title: '电气与信息工程学院学生党员一支部召开2016年度民主生活会',
					content: '' 
				},
				{
					id: 9,
					title: '电气与信息工程学院学生党员一支部召开2016年度民主生活会',
					content: '' 
				}
			]
		}
	}
}
</script>
<style scoped>
	.width900{
		width: 900px;
		margin: 0px auto 30px;
		border: 1px solid #ccc;
		overflow: hidden;
	}
	h3{
		height: 46px;
		line-height: 46px;
		padding-left: 20px;
		background: url('/imgs/life-bg.jpg') no-repeat;
		color: #2D2D2D;
		font-weight: 500;
		border-bottom: 1px solid #ccc;
	}
	.fl{
		float: left;
	}
	.fr{
		float: right;
	}
	ul li{
		line-height: 36px;
		list-style: circle inside;
	}
	a{
		color: #333;
	}
	a:hover {
		color: #d93732;
	}
	img{
		cursor: pointer;
	}
</style>