<template>
	<div style="overflow: hidden;margin: 0 auto; width: 1200px;padding: 20px 0;background: #FDFDFD;">
		<div class="textCenter">
			<a href="#/fore/detail/life/1">
				<img src="/imgs/life1.jpg">
				<p>中央政治局召开民主生活会 习近平主持并发表重要讲话</p>
			</a>
		</div>
		<div class="width900">
			<h3>图解民主生活会</h3>
			<div style="overflow:hidden;margin:30px;">
				<a href="#/fore/detail/life/9"><img class="fl" src="/imgs/life-pic1.jpg"></a>
				<a href="#/fore/detail/life/8"><img class="fr" src="/imgs/life-pic2.jpg"></a>
			</div>
		</div>
		<div class="width900">
			<h3>其他动态</h3>
			<div style="overflow:hidden;margin:30px;">
				<ul>
					<li v-for="item in life"><a :href="'#/fore/detail/life/' + item.id">{{item.title}}</a><span class="fr">{{item.time | formatDate}}</span></li>
				</ul>
			</div>
		</div>
		<div class="width900">
			<h3>争先创优动态</h3>
			<div style="overflow:hidden;margin:30px;">
				<ul>
					<li v-for="item in excellent"><a :href="'#/fore/detail/life/' + item.id">{{item.title}}</a><span class="fr">{{item.time | formatDate}}</span></li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
import $ from 'jQuery'
import {formatDate} from '../../../template/date.js';
export default {
	data(){
		return {
			lifeData: [],
			life: [],
			excellent: []
		}
	},
	filters: {
	    formatDate(time) {
	        var date = new Date(Number(time));
	        return formatDate(date, 'yyyy-MM-dd hh:mm');
	    }
	},
	methods: {
		getAll() {
			var _this = this
			$.ajax({
	    		url: 'http://localhost:5555/Lifes',
	    		type: 'POST',
	    		dataType: 'json',
	    		success(data) {
	    			_this.lifeData = data
	    		}
	    	})
	    	.done(function() {
	    		_this.life = []
		    	_this.excellent = []
		    	for (var i in _this.lifeData) {
		    		if (_this.lifeData[i].type == '民主生活') {
		    			_this.life.push(_this.lifeData[i])
		    		} else {
		    			_this.excellent.push(_this.lifeData[i])
		    		}
		    	}
	    	})
		}
	},
	mounted() {
		this.getAll()
	}
}
</script>
<style scoped>
	.textCenter{
		text-align: center;
		margin-bottom: 20px;
	}
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
	ul{
		width: 100%;
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
	span {
		color: #666;
		font-size: 12px;
	}
</style>