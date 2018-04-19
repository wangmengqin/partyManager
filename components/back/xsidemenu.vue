<template>
	<div style="float: left;">
		<ul>
			<li v-for="(obj,index) in menuArr">
				<p @click="changeIsShow(index)"><img :src="obj.isShow?selectImg:img"/><span v-text="obj.txt"></span></p>
				<ul v-show="obj.isShow">
					<li><a :href="obj.url1">{{obj.menu1}}</a></li>
					<li><a :href="obj.url2">{{obj.menu2}}</a></li>
				</ul>
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				menuArr:[
					{
						id:0,
						txt:"新闻管理",
						isShow:false,
						url1:"#/tab/addnews",
						url2:"#/tab/searchnews",
						menu1: '增加新闻',
						menu2: '查询新闻信息'
					},
					{
						id:1,
						txt:"新闻专题",
						isShow:false,
						url1:"#/tab/addColumn",
						url2:"#/tab/searchColumn",
						menu1: '增加专题',
						menu2: '查询新闻专题'
					},
					{
						id:2,
						txt:"活动管理",
						isShow:false,
						url1:"#/tab/addActivity",
						url2:"#/tab/searchActivity",
						menu1: '增加活动',
						menu2: '查询活动'
					},
					{
						id:3,
						txt:"活动经费",
						isShow:false,
						url1:"#/tab/checkActivityMember",
						url2:"#/tab/activityMoney",
						menu1: '参加活动名单审核',
						menu2: '活动经费名单'
					},
					{
						id:2,
						txt:"支部管理",
						isShow:false,
						url1:"#/tab/addBranch",
						url2:"#/tab/searchBranch",
						menu1: '增加支部',
						menu2: '查询支部'
					},
					{
						id:3,
						txt:"组织管理",
						isShow:false,
						url1:"#/tab/addnews",
						url2:"#/tab/searchnews",
						menu1: '查看组织',
						menu2: '审核组织关系'
					},
					{
						id:4,
						txt:"党员管理",
						isShow:false,
						url1:"#/tab/checkMember",
						url2:"#/tab/searchMember",
						menu1: '审核新增党员',
						menu2: '查询党员信息'
					},
					{
						id:5,
						txt:"党费管理",
						isShow:false,
						url1:"#/tab/addnews",
						url2:"#/tab/searchnews",
						menu1: '审核党费情况',
						menu2: '查询党费收缴'
					},
					{
						id:6,
						txt:"党校管理",
						isShow:false,
						url1:"#/tab/addnews",
						url2:"#/tab/searchnews",
						menu1: '增加党课',
						menu2: '查询党校信息'
					},
					{
						id:7,
						txt:"留言管理",
						isShow:false,
						url1:"#/tab/checkMessage",
						url2:"#/tab/searchMessage",
						menu1: '留言审核',
						menu2: '查看留言'
					},
					{
						id:8,
						txt:"党务管理",
						isShow:false,
						url1:"#/tab/addnews",
						url2:"#/tab/searchnews",
						menu1: '增加',
						menu2: '查询党务信息'
					}
				],
				img:"/imgs/jia.png",
				selectImg:"/imgs/jian.png",
			}
		},
		methods:{
			changeIsShow(id){
				this.menuArr[id].isShow = !this.menuArr[id].isShow;
			}
		}
	}
</script>

<style scoped>
	ul{
		width: 200px;
		background: #f5f6fa;
		padding: 10px;
		text-align: center;
		font-size: 14px;
		min-height: 600px;
	}
	
	ul li p{
		line-height: 30px;
		background: #D93732;
		margin-bottom: 5px;
		border-radius: 15px;
		color: #fff;
	}

	li img{
		width: 14px;
		height: 14px;
		vertical-align: middle;
		margin-right: 10px;
	}
	ul li ul{
		min-height: auto;
		padding: 0;
	}
	ul li ul li{
		background: #fff;
		margin-bottom: 5px;
		border-radius: 15px;
		line-height: 30px;
	}
	a{
		color: #333;
	}
	span{
		cursor: pointer;
	}
</style>