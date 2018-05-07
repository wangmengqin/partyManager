<template>
	<div style="overflow: hidden;margin: 0 auto; width: 1200px;padding: 20px 0;background: #FDFDFD;">
		<div class="width900">
			<h3 v-if="type=='active'">入党积极分子培训</h3>
			<h3 v-if="type=='party'">党课培训</h3>
			<h3 v-if="type=='topic'">专题培训</h3>
			<div style="overflow:hidden;margin:30px;">
				<ul>
					<!-- <li v-for="item in lectureData">
						<img v-if="item.img==''" src="/imgs/icon_active.png" class="active_img"/>
						<img v-if="item.img!=''" :src="item.img" class="active_img"/>
						<div class="fl">
							<h5>{{item.activity_name}}</h5>
							<strong v-if="item.activity_describe!=''">{{item.activity_describe}}</strong>
							<strong v-if="item.speaker!=''">演讲人：{{item.speaker}}</strong>
							<br v-if="item.activity_speaker!=''"/>
							<em style="display: block;">地点：{{item.place}}</em>
							<b>时间：{{item.time}} <a @click="joinActivity(item.activity_name,item.id)"><img src="/imgs/icon_return.png"/>我要参加</a></b>
						</div>
					</li> -->
					<li>
						<h4>
							1、以“弘扬光荣传统、发挥先锋模范作用”为主题的党课发挥先锋模范作用”为主题的党课
							<a href="javascript:" v-if="type=='party'"><img src="/imgs/icon_return.png"/>我要上党课</a>
							<a href="javascript:" v-else><img src="/imgs/icon_return.png"/>我要参加培训</a>
						</h4>
						<div>
							<strong>演讲人：XX学院总书记——张三</strong><span style="display:inline-block;width:150px;"></span>
							<em style="color: #333">地点：逸夫楼i413</em>
						</div>
						<div>
							<b style="color: #333">时间：2018年05月04日 下午2:00 </b>
							<span style="color: red">(tips：请注意时间，请勿迟到!)</span>
						</div>
					</li>
					<li>
						<h4>2、以“弘扬光荣传统、发挥先锋模范作用”为主题的党课发挥先锋模范作用”为主题的党课<a href="javascript:"><img src="/imgs/icon_return.png"/>我要上党课</a></h4>
						<div>
							<strong>演讲人：XX学院总书记——张三</strong><span style="display:inline-block;width:150px;"></span>
							<em style="color: #333">地点：逸夫楼i413</em>
						</div>
						<div>
							<b style="color: #333">时间：2018年05月04日 下午2:00 </b>
							<span style="color: red">(tips：请注意时间，请勿迟到!)</span>
						</div>
					</li>
					<li>
						<h4>
						3、以“弘扬光荣传统、发挥先锋模范作用”为主题的党课发挥先锋模范作用”为主题的党课<a href="javascript:"><img src="/imgs/icon_return.png"/>我要上党课</a></h4>
						<div>
							<strong>演讲人：XX学院总书记——张三</strong><span style="display:inline-block;width:150px;"></span>
							<em style="color: #333">地点：逸夫楼i413</em>
						</div>
						<div>
							<b style="color: #333">时间：2018年05月04日 下午2:00 </b>
							<span style="color: red">(tips：请注意时间，请勿迟到!)</span>
						</div>
					</li>
					<li>
						<h4>
						4、以“弘扬光荣传统、发挥先锋模范作用”为主题的党课发挥先锋模范作用”为主题的党课
							<a href="javascript:" v-if="type=='party'"><img src="/imgs/icon_return.png"/>我要上党课</a>
							<a href="javascript:" v-else><img src="/imgs/icon_return.png"/>我要参加培训</a>
						</h4>
						<div>
							<strong>演讲人：XX学院总书记——张三</strong><span style="display:inline-block;width:150px;"></span>
							<em style="color: #333">地点：逸夫楼i413</em>
						</div>
						<div>
							<b style="color: #333">时间：2018年05月04日 下午2:00 </b>
							<span style="color: red">(tips：请注意时间，请勿迟到!)</span>
						</div>
					</li>
					<li>
						<h4>5、以“弘扬光荣传统、发挥先锋模范作用”为主题的党课发挥先锋模范作用”为主题的党课<a href="javascript:"><img src="/imgs/icon_return.png"/>我要上党课</a></h4>
						<div>
							<strong>演讲人：XX学院总书记——张三</strong><span style="display:inline-block;width:150px;"></span>
							<em style="color: #333">地点：逸夫楼i413</em>
						</div>
						<div>
							<b style="color: #333">时间：2018年05月04日 下午2:00 </b>
							<span style="color: red">(tips：请注意时间，请勿迟到!)</span>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="active-detail">
			
			
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			type: '' // 培训类型
		}
	},
	watch: {
		type() {
			this.type = this.$route.query.type
		}
	},
	mounted() {
		this.type = this.$route.query.type
	}
}
</script>
<style scoped>
	.width900{
		width: 1195px;
		margin: 0px auto 30px;
		border: 1px solid #ccc;
		overflow: hidden;
	}
	h3{
		height: 46px;
		line-height: 46px;
		text-align: center;
		background: url('/imgs/life-bg.jpg') no-repeat;
		background-size: cover;
		color: #2D2D2D;
		font-weight: 500;
		border-bottom: 1px solid #ccc;
	}
	ul{
		width: 100%;
	}
	ul li{
		line-height: 36px;
		margin-bottom: 20px;
	}
	a{
		color: #333;
	}
	a:hover {
		color: #d93732;
	}
	i,em{
		font-style: normal;
		color: #8C8C8C;
		line-height: 26px;
	}
	strong,b{
		font-weight: 500;
		color: #8C8C8C;
		line-height: 26px;
	    white-space: pre;
	    text-overflow: ellipsis;
	    overflow: hidden;
	}
	ul li a img{
		width: 40px;
		height: 20px;
		vertical-align: middle;
	}
	ul li a{
		float: right;
		color: #333;
	}
</style>