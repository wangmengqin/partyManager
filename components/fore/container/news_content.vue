<template>
	<div  style="overflow: hidden;margin: 0 auto; width: 1200px;padding: 20px 0;background: #FDFDFD;">
		<div class="width900 no-border">
			<div class="fl c-w10"><b>新闻专题：</b></div>
			<div class="fl  c-w90">
				<strong :key="-1" @click="toColumnNews('',-1)" :class="{'c-bg-blue': select==-1}">所有专题</strong>
				<strong v-for="(item,index) in columns" :key="item.id" @click="toColumnNews(item.columnName,index)" :class="{'c-bg-blue': select==index}">{{item.columnName}}</strong>
			</div>
			
		</div>
		<div class="width900">
			<h3>{{select==-1?'全部新闻动态':columns[select].columnName}}</h3>
			<div style="overflow:hidden;margin:30px;">
				<div v-if="newsData.length<=0" class="c-textAlign-c">暂无新闻信息</div>
				<ul v-else class="fl">
					<li v-for="item in newsData">
						<a :href="'#/fore/detail/news/'+item.id">{{item.title}}</a>
						<span class="fr">{{item.time | formatDate}}</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
import $ from 'jQuery'
import {formatDate} from '../../../template/date.js';
export default{
	data(){
		return {
			newsData: [],
			columns: [],
			select: -1,
		}
	},
	filters: {
	    formatDate(time) {
	        var date = new Date(Number(time));
	        return formatDate(date, 'yyyy-MM-dd hh:mm');
	    }
	},
	methods: {
		toColumnNews(name, index) {
			var _this = this
			this.select = index
			if(name == '') {
				$.ajax({
					url: 'http://localhost:5555/News',
					type: 'POST',
					dataType: 'json',
					success(data) {
						_this.newsData = data
					}
				})
			} else {
				$.ajax({
					url: 'http://localhost:5555/getNewsByColumn',
					type: 'POST',
					dataType: 'json',
					data: { column: name },
					success(data) {
						_this.newsData = data
					}
				})
			}
		}
	},
	mounted() {
		var _this = this
		this.select = -1
		$.ajax({
			url: 'http://localhost:5555/News',
			type: 'POST',
			dataType: 'json',
			success(data) {
				_this.newsData = data
			}
		})
		$.ajax({
			url: 'http://localhost:5555/columns',
			type: 'POST',
			dataType: 'json',
			success(data) {
				console.log(data)
				_this.columns = data
			}
		})
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
	.no-border{
		border: 0;
	}
	ul {
		width: 100%;
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
		overflow: hidden;
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
	span {
		color: #666;
		font-size: 12px;
	}
	strong{
		display: inline-block;
		color: #fff;
		padding: 0 10px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		background-color: #d93732;
		border-radius: 5px;
		cursor: pointer;
		margin: 0 10px 5px;
		font-size: 14px;
	}
	strong:hover {
		color: #fff;
		background-color: deepskyblue;
	}
	.c-bg-blue{ background-color: deepskyblue;  }
</style>