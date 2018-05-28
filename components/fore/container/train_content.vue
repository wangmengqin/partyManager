<template>
	<div style="overflow: hidden;margin: 0 auto; width: 1200px;padding: 20px 0;background: #FDFDFD;">
		<div class="width900">
			<h3 v-if="type=='active'">入党积极分子培训</h3>
			<h3 v-if="type=='party'">党课培训</h3>
			<h3 v-if="type=='topic'">专题培训</h3>
			<div style="overflow:hidden;margin:30px;">
				<ul>
					<li v-for="(item,index) in dataInfo" :key="index">
						<h4>
							{{index+1}}、{{item.title}}
							<a href="javascript:" v-if="type=='party'" @click="joinTrain(type, item.title)"><img src="/imgs/icon_return.png"/>我要上党课</a>
							<a href="javascript:" v-else  @click="joinTrain(type, item.title)"><img src="/imgs/icon_return.png"/>我要参加培训</a>
						</h4>
						<p class="c-8c">{{item.trainDescribe}}</p>
						<div>
							<strong>演讲人：{{item.teacher}}</strong><span style="display:inline-block;width:150px;"></span>
							<em style="color: #333">地点：{{item.address}}</em>
						</div>
						<div>
							<b style="color: #333">时间：{{item.time}} </b>
							<span style="color: red">(tips：请注意时间，请勿迟到!)</span>
						</div>
					</li>
					<!--<li>
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
					</li> -->
				</ul>
			</div>
		</div>
		<div class="active-detail">
			
			
		</div>
	</div>
</template>
<script>
import $ from 'jQuery'
export default {
	data() {
		return {
			type: '', // 培训类型
			dataInfo: [], // 显示的数据
			sno: '',
			memberName: '' // 登陆者姓名
		}
	},
	watch: {
		$route() {
			this.type = this.$route.query.type
			console.log(this.type)
			if(this.type == 'active') {
				this.getData('入党积极分子培训')
			} else if (this.type == 'party') {
				this.getData('党课')
			} else {
				this.getData('专题培训')
			}
		}
	},
	methods: {
		getData(type) {
			var _this = this
			$.ajax({
	    		url: 'http://localhost:5555/getTrainByType',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			type: type
	    		},
	    		success(data) {
	    			_this.dataInfo = data
	    			console.log(data)
	    		}
	    	})
		},
		joinTrain(type, title) {
			// 参加培训
			var _this = this
			let joinType = ''
			if(type == 'active') {
				joinType = '入党积极分子培训'
			} else if (type == 'party') {
				joinType = '党课'
			} else {
				joinType = '专题培训'
			}
			_this.sno = sessionStorage.getItem("sno");
			if(this.sno != null){
				$.ajax({
		    		url: 'http://localhost:5555/getMemberBySno',
		    		type: 'POST',
		    		dataType: 'json',
		    		data: {
		    			sno: _this.sno
		    		},
		    		success(data) {
		    			_this.memberName = data[0].name
		    		}
		    	})
		    	.done(() => {
		    		$.ajax({
			    		url: 'http://localhost:5555/getTrainMemberBySnoName',
			    		type: 'POST',
			    		dataType: 'json',
			    		data: {
			    			sno: _this.sno,
			    			title: title,
				    		member: _this.memberName
			    		},
			    		success(data) {
			    			if(data.length<=0 || data[data.length-1].status=='不通过'){
			    				console.log("join the activity success");
					    		$.ajax({
						    		url: 'http://localhost:5555/joinTrain',
						    		type: 'POST',
						    		dataType: 'json',
						    		data: {
						    			sno: _this.sno,
						    			member: _this.memberName,
						    			title: title,
						    			type: joinType,
						    			enrollTime: new Date().getTime(),
						    			status: '待审核'
						    		},
						    		success(data) {
						    			alert('报名成功')
						    		}
						    	})
			    			}else{
			    				if(data[data.length-1].status=='待审核') {
			    					alert('你已报名参加该培训！请耐心等待审核')
			    				} else {
			    					alert('你已参加该培训')
			    				}
			    			}
			    		}
			    	})
		    		
		    	})
			}
			else{
				alert('获取信息失败，请重新登录')
				this.$router.push({ path: '/login' })
			}
			$.ajax({
	    		url: 'http://localhost:5555/getTrainByType',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: {
	    			type: joinType
	    		},
	    		success(data) {
	    			_this.dataInfo = data
	    			console.log(data)
	    		}
	    	})
		}
	},
	mounted() {
		this.type = this.$route.query.type
		if(this.type == 'active') {
			this.getData('入党积极分子培训')
		} else if (this.type == 'party') {
			this.getData('党课')
		} else {
			this.getData('专题培训')
		}
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
	.c-8c{
		color: #8C8C8C;
		font-size: 12px;
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