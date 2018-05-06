<template>
	<div  style="overflow: hidden;margin: 0 auto; width: 1200px;padding: 20px 0;background: #FDFDFD;">
		<div class="width900">
			<h3>全部新闻动态</h3>
			<div style="overflow:hidden;margin:30px;">
				<ul class="fl">
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
			otherLife: []
		}
	},
	filters: {
	    formatDate(time) {
	        var date = new Date(Number(time));
	        return formatDate(date, 'yyyy-MM-dd hh:mm');
	    }
	},
	mounted() {
		var _this = this
		$.ajax({
			url: 'http://localhost:5555/News',
			type: 'POST',
			dataType: 'json',
			success(data) {
				_this.newsData = data
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
</style>