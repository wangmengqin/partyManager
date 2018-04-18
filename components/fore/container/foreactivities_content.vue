<template>
	<div style="overflow: hidden;margin: 0 auto; width: 1200px;padding: 20px 0;background: #FDFDFD;">
		<div class="active-detail">
			<h3>支部活动</h3>
			<ul>
				<li v-for="item in lectureData">
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
				</li>
				<!-- <li>
					<img src="/imgs/icon_active.png" class="active_img"/>
					<div class="fl">
						<h5>以“弘扬光荣传统、发挥先锋模范作用”为主题的党课</h5>
						<strong>演讲人：张三（XX学院总书记）</strong><br />
						<em style="display: block;">地点：逸夫楼i413</em>
						<b>时间：2018年05月04日 下午2:00 <a href="##"><img src="/imgs/icon_return.png"/>我要参加</a></b>
					</div>
				</li>
				<li>
					<img src="/imgs/icon_active.png" class="active_img"/>
					<div class="fl">
						<h5>以“弘扬光荣传统、发挥先锋模范作用”为主题的党课</h5>
						<strong>演讲人：张三（XX学院总书记）</strong><br />
						<em style="display: block;">地点：逸夫楼i413</em>
						<b>时间：2018年05月04日 下午2:00 <a href="##"><img src="/imgs/icon_return.png"/>我要参加</a></b>
					</div>
				</li>
				<li>
					<img src="/imgs/icon_active.png" class="active_img"/>
					<div class="fl">
						<h5>“七一”党内关怀送温暖活动</h5>
						<strong>走访慰问建国前入党老党员和困难党员</strong><br />
						<em style="display: block;">地点：容二门口集合</em>
						<b>时间：2018年07月01日 上午10:00 <a href="##"><img src="/imgs/icon_return.png"/>我要参加</a></b>
					</div>
				</li>
				<li>
					<img src="/imgs/icon_active.png" class="active_img"/>
					<div class="fl">
						<h5>党的十八届六中全会专题学习报告会</h5>
						<strong>深入推进“两学一做”学习教育</strong><br />
						<em style="display: block;">地点：逸夫楼学术报告厅（i413）</em>
						<b>时间：2018年11月25日（周五）下午2:30  <a href="##"><img src="/imgs/icon_return.png"/>我要参加</a></b>
					</div>
				</li> -->
			</ul>
		</div>
		<div class="active-detail">
			<h3>讲座</h3>
			<ul>
				<li v-for="item in branchActivityData">
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
				</li>
				<!-- <li>
					<img src="/imgs/icon_active.png" class="active_img"/>
					<div class="fl">
						<h5>以“弘扬光荣传统、发挥先锋模范作用”为主题的党课</h5>
						<strong>演讲人：张三（XX学院总书记）</strong><br />
						<em style="display: block;">地点：逸夫楼i413</em>
						<b>时间：2018年05月04日 下午2:00 <a href="##"><img src="/imgs/icon_return.png"/>我要参加</a></b>
					</div>
				</li>
				<li>
					<img src="/imgs/icon_active.png" class="active_img"/>
					<div class="fl">
						<h5>以“弘扬光荣传统、发挥先锋模范作用”为主题的党课</h5>
						<strong>演讲人：张三（XX学院总书记）</strong><br />
						<em style="display: block;">地点：逸夫楼i413</em>
						<b>时间：2018年05月04日 下午2:00 <a href="##"><img src="/imgs/icon_return.png"/>我要参加</a></b>
					</div>
				</li>
				<li>
					<img src="/imgs/icon_active.png" class="active_img"/>
					<div class="fl">
						<h5>“七一”党内关怀送温暖活动</h5>
						<strong>走访慰问建国前入党老党员和困难党员</strong><br />
						<em style="display: block;">地点：容二门口集合</em>
						<b>时间：2018年07月01日 上午10:00 <a href="##"><img src="/imgs/icon_return.png"/>我要参加</a></b>
					</div>
				</li>
				<li>
					<img src="/imgs/icon_active.png" class="active_img"/>
					<div class="fl">
						<h5>党的十八届六中全会专题学习报告会</h5>
						<strong>深入推进“两学一做”学习教育</strong><br />
						<em style="display: block;">地点：逸夫楼学术报告厅（i413）</em>
						<b>时间：2018年11月25日（周五）下午2:30  <a href="##"><img src="/imgs/icon_return.png"/>我要参加</a></b>
					</div>
				</li> -->
			</ul>
		</div>
		<div class="active-detail">
			<h3>组织生活</h3>
			<ul>
				<li v-for="item in orgActivityData">
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
				</li>
				<!-- <li>
					<img src="/imgs/icon_active.png" class="active_img"/>
					<div class="fl">
						<h5>以“弘扬光荣传统、发挥先锋模范作用”为主题的党课</h5>
						<strong>演讲人：张三（XX学院总书记）</strong><br />
						<em style="display: block;">地点：逸夫楼i413</em>
						<b>时间：2018年05月04日 下午2:00 <a href="##"><img src="/imgs/icon_return.png"/>我要参加</a></b>
					</div>
				</li>
				<li>
					<img src="/imgs/icon_active.png" class="active_img"/>
					<div class="fl">
						<h5>以“弘扬光荣传统、发挥先锋模范作用”为主题的党课</h5>
						<strong>演讲人：张三（XX学院总书记）</strong><br />
						<em style="display: block;">地点：逸夫楼i413</em>
						<b>时间：2018年05月04日 下午2:00 <a href="##"><img src="/imgs/icon_return.png"/>我要参加</a></b>
					</div>
				</li>
				<li>
					<img src="/imgs/icon_active.png" class="active_img"/>
					<div class="fl">
						<h5>“七一”党内关怀送温暖活动</h5>
						<strong>走访慰问建国前入党老党员和困难党员</strong><br />
						<em style="display: block;">地点：容二门口集合</em>
						<b>时间：2018年07月01日 上午10:00 <a href="##"><img src="/imgs/icon_return.png"/>我要参加</a></b>
					</div>
				</li>
				<li>
					<img src="/imgs/icon_active.png" class="active_img"/>
					<div class="fl">
						<h5>党的十八届六中全会专题学习报告会</h5>
						<strong>深入推进“两学一做”学习教育</strong><br />
						<em style="display: block;">地点：逸夫楼学术报告厅（i413）</em>
						<b>时间：2018年11月25日（周五）下午2:30  <a href="##"><img src="/imgs/icon_return.png"/>我要参加</a></b>
					</div>
				</li> -->
			</ul>
		</div>
	</div>
</template>

<script>
	import $ from 'jQuery'
	export default {
		data(){
			return {
				lectureData: [], // 讲座数据
				branchActivityData: [], // 支部活动
				orgActivityData: [], // 组织生活
				sno: null, // 登陆的用户工号、学号
				memberName: null
			}
		},
		mounted() {
			var _this = this
			$.ajax({
				url: 'http://localhost:5555/getActivityByType',
				type: 'POST',
				dataType: 'json',
				data: {type: '讲座'},
				success(data) {
					_this.lectureData = data
				}
			})
			$.ajax({
				url: 'http://localhost:5555/getActivityByType',
				type: 'POST',
				dataType: 'json',
				data: {type: '支部活动'},
				success(data) {
					_this.branchActivityData = data
				}
			})
			$.ajax({
				url: 'http://localhost:5555/getActivityByType',
				type: 'POST',
				dataType: 'json',
				data: {type: '组织生活'},
				success(data) {
					_this.orgActivityData = data
				}
			})
		},
		methods: {
			joinActivity(activityName, id) {
				var _this = this
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
				    		url: 'http://localhost:5555/getMemberActivityBySnoName',
				    		type: 'POST',
				    		dataType: 'json',
				    		data: {
				    			sno: _this.sno,
				    			activity_name: activityName,
					    		member: _this.memberName
				    		},
				    		success(data) {
				    			if(data == ''){
				    				console.log("join the activity success");
						    		$.ajax({
							    		url: 'http://localhost:5555/addMemberActivity',
							    		type: 'POST',
							    		dataType: 'json',
							    		data: {
							    			activity_name: activityName,
							    			member_sno: _this.sno,
							    			member: _this.memberName,
							    			money_status: '未缴费',
							    			status: '待审核'
							    		},
							    		success(data) {
							    			alert('报名成功')
							    		}
							    	})
				    			}else{
				    				alert('你已参加此次活动')
				    			}
				    		}
				    	})
			    		
			    	})
				}
				else{
					alert('获取信息失败，请重新登录')
					location.href = '#/login'
				}
			}
		}
	}
</script>

<style scoped>
	i,em{
		font-style: normal;
		color: #8C8C8C;
		line-height: 26px;
	}
	strong,b{
		font-weight: 500;
		color: #8C8C8C;
		line-height: 26px;
		width: 100%;
	    display: inline-block;
	    white-space: pre;
	    text-overflow: ellipsis;
	    overflow: hidden;
	}
	h3{
		color: #D93732;
		text-align: center;
	}
	.active-detail{
		overflow: hidden;
		zoom: 1;
	}
	.active-detail ul{
		width: 100%;
		padding:30px;
		float: left;
		box-sizing: border-box;
	}
	.active-detail ul li {
		font-size: 13px;
		margin-bottom: 20px;
		float: left;
		overflow: hidden;
		zoom: 1;
		padding:0 30px 20px 30px;
		width: 504px;
	}
	h5{
		font-size: 16px;
	}
	.active-detail ul li .active_img{
		float: left;
		width: 100px;
		height: 100px;
	}
	.active-detail ul li a img{
		width: 20px;
		height: 20px;
		vertical-align: middle;
	}
	.active-detail ul li a{
		float: right;
		color: #333;
	}
	.fl{
		float: left;
		margin-left: 20px;
		width: 384px;
	}
	.fl b{
		display: block;
    	width: 380px;
	}
	ul li a:hover{
		color: #D93732;
	}
</style>