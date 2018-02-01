<template>
	<div style="float: left;">
		<ul>
			<li v-for="(obj,index) in menuArr">
				<p @click="changeIsShow(index)"><img :src="obj.isShow?selectImg:img"/><span v-text="obj.txt"></span></p>
				<ul v-show="obj.isShow">
					<li><a :href="obj.url1">增</a></li>
					<li><a :href="obj.url2">查</a></li>
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
						url2:"#/tab/searchnews"
					},
					{
						id:1,
						txt:"新闻管理",
						isShow:false,
						url1:"#/tab/addnews",
						url2:"#/tab/searchnews"
					},
					{
						id:2,
						txt:"新闻管理",
						isShow:false,
						url1:"#/tab/addnews",
						url2:"#/tab/searchnews"
					},
					{
						id:3,
						txt:"新闻管理",
						isShow:false,
						url1:"#/tab/addnews",
						url2:"#/tab/searchnews"
					},
					{
						id:4,
						txt:"新闻管理",
						isShow:false,
						url1:"#/tab/addnews",
						url2:"#/tab/searchnews"
					},
					{
						id:5,
						txt:"新闻管理",
						isShow:false,
						url1:"#/tab/addnews",
						url2:"#/tab/searchnews"
					},
					{
						id:6,
						txt:"新闻管理",
						isShow:false,
						url1:"#/tab/addnews",
						url2:"#/tab/searchnews"
					},
					{
						id:7,
						txt:"新闻管理",
						isShow:false,
						url1:"#/tab/addnews",
						url2:"#/tab/searchnews"
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
</style>