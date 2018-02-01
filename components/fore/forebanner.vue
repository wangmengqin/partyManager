<template>
	<div style="overflow: hidden; position: relative; " @mouseover="stop()" @mouseout="move()">
		<transition-group tag="ul" name="image">  
			<li v-for="(item,index) in imgArr" :key="index" v-show="index===mark"><a href="##"><img :src="item"/></a></li>
		</transition-group>  
		<div class="bar">  
	      	<span v-for="(item, index) in imgArr" :key="index" :class="{ 'active':index===mark }" @click="change(index)"></span>  
	    </div>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				imgArr:[
					'/imgs/banner5.jpg',
					'/imgs/banner6.jpg',
					'/imgs/banner7.jpg',
					'/imgs/banner8.jpg'
				],
				mark:0
			}	
		},
		methods: {  
		    autoPlay () {  
			    this.mark++;  
			    if (this.mark === 4) { //当遍历到最后一张图片置零  
			    	this.mark = 0  
			     }
		    },  
		    play () {  
		      	setInterval(this.autoPlay, 3000)  
		    },  
		    change (i) {  
		      	this.mark = i  
		    },
		    stop () {  
		      	clearInterval(this.timer)  
		    },  
		    move () {  
		    	clearInterval(this.timer) ;
		      	this.timer = setInterval(this.autoPlay, 3000)  
		    }  
	  	},  
		created () {  
		    this.play()  
		}  
	}
</script>

<style scoped>
	ul{
		height: 300px;
	}
	li{
		position: relative;
	}
	ul li img{
		width: 100%;
		height: 300px;
		position: absolute;
		left: 0;
		top: 0;
	}
	.bar {  
	    position: absolute;  
	    width: 100%;  
	    bottom: 10px;  
	    margin: 0 auto;  
	    z-index: 10;  
	    text-align: center;  
	  }  
	.bar span {  
	    width: 20px;  
	    height: 5px;  
	    border: 1px solid;  
	    background: white;  
	    display: inline-block;  
	    margin-right: 10px;  
	}  
	.active {  
	    background: red !important;  
	}
	.image-enter-active {  
	    transform: translateX(0);  
	    transition: all 1.5s ease;  
	}  
	.image-leave-active {  
	    transform: translateX(-100%);  
	    transition: all 1.5s ease;  
	}  
	.image-enter {  
	    transform: translateX(100%);  
	}  
	.image-leave {  
	    transform: translateX(0);  
	}  
</style>