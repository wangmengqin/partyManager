<template>
	<swiper :options="swiperOption" ref="mySwiper" :class>
		<swiper-slide><img :src="imgArr[0]" class="swipersrc"/></swiper-slide>
		<swiper-slide><img :src="imgArr[1]" class="swipersrc"/></swiper-slide>
		<swiper-slide><img :src="imgArr[2]" class="swipersrc"/></swiper-slide>
		<swiper-slide><img :src="imgArr[3]" class="swipersrc"/></swiper-slide>
		<div class="swiper-pagination" slot="pagination"></div>
		<div class="swiper-button-prev" slot="button-prev"></div>
		  <div class="swiper-button-next" slot="button-next"></div>
	 </swiper>
</template>

<script>
	import Vue from 'vue'
	import VueAwesomeSwiper from 'vue-awesome-swiper';
	Vue.use(VueAwesomeSwiper) 
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	import '../../template/swiper-4.1.0.min.css';
	 export default{
	 	components:{
	 		swiper,
	 		swiperSlide
	 	},
    data(){
      return {
      	imgArr:[
			'/imgs/banner5.jpg',
			'/imgs/banner6.jpg',
			'/imgs/banner7.jpg',
			'/imgs/banner8.jpg'
		],
		swiperOption: { //以下配置不懂的，可以去swiper官网看api，链接http://www.swiper.com.cn/api/ 

		        notNextTick: true, 
		        autoplay: {
		       	delay:2000,        	
		       	disableOnInteraction:false        
		        },
		        loop: true,
		        direction: 'horizontal',
		        grabCursor: true,
		        setWrapperSize: true,
		        autoHeight: true,
		        pagination: {
		          el: '.swiper-pagination'
		        },
		        centeredSlides: true,
		        paginationClickable: true,
		        navigation: {
		          nextEl: '.swiper-button-next',
		          prevEl: '.swiper-button-prev'
		        },
		        keyboard: true,
		        mousewheelControl: true,
		        observeParents: true, // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
		        debugger: true
		     }
    }
  }
}

</script>

<style scoped>
	img{
		display: block;
	}
	.swipersrc{
		width:100%;
		height: 300px;
	}
	.swiper-pagination{
		
	}
</style>