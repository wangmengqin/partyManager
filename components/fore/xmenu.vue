<template>
	<div style="background: #F9F9F9;">
		<ul>
			<li><a href="#/fore/index">首页</a></li>
			<li @mouseover="changeShow" @mouseout="changeShow"><a href="#/fore/studyKnow" >我要学习</a>
				<ul v-show="isShow">
					<li><a href="#/fore/studyKnow">党章学习</a></li>
					<li><a href="javascript:" @click="linkToTrain('active')">积极分子培训</a></li>
					<li><a href="javascript:" @click="linkToTrain('party')">党课培训</a></li>
					<li><a href="#/fore/test">结业考核</a></li>
					<li><a href="javascript:" @click="linkToTrain('topic')">专题培训</a></li>
				</ul>
			</li>
			<li><a href="#/fore/allActivities">查看活动</a></li>
			<li @mouseover="changeShowFill" @mouseout="changeShowFill"><a href="#/fore/partyFree">我要缴费</a>
				<ul v-show="isShowFill">
					<li><a href="#/fore/partyFree">党费</a></li>
					<li><a href="#/fore/activeFree">活动经费</a></li>
				</ul>
			</li>
			<li><a href="#/fore/life">民主生活</a></li>
			<li><a href="#/fore/news">新闻资讯</a></li>
			<li><a href="#/fore/organize">组织结构</a></li>
			<li><a href="#/fore/message">论坛留言</a></li>
			<li><a href="#/fore/apply">申请入党</a></li>
			<li><a href="#/fore/mine">我的</a></li>
		</ul>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				isShow:false,
				isShowFill:false
			}
		},
		methods:{
			changeShow(){
				this.isShow=!this.isShow;
			},
			changeShowFill(){
				this.isShowFill=!this.isShowFill;
			},
			linkToTrain(type) {
				this.$router.push({ path: '/fore/train', query:{type: type} } )
			}
		}
	}
</script>

<style scoped>
	ul{
		width: 1200px;
		margin: 0 auto;
		overflow: hidden;
		line-height: 50px;
		
	}
	li{
		float: left;
		text-align: center;
		width: 10%;
	}
	li a{
		color: #333;
		padding: 0 20px;
	}
	li:hover{
		background: #D93732;
	}
	li:hover a{
		color: #fff;
	}
	li:hover ul li a{
		color: #333;
	}
	ul li ul {
		position: absolute;
		background: #f9f9f9;
		width: 120px;
	}
	ul li ul li{
		float: none;
		font-size: 12px;
		width: 100%;
	}
	ul li ul li:hover a{
		color: #fff;
	}
</style>