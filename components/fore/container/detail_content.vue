<template>
	<div style="overflow: hidden;margin: 0 auto; width: 1200px;padding: 20px 0;background: #FDFDFD;">
		<div>
			<h3 class="text-c">{{detailData.title}}</h3>
			<div class="content" v-html="detailData.content"></div>
		</div>
	</div>
</template>
<script>
import $ from 'jQuery'
export default {
	data() {
		return {
			detailData: [] // 详情内容
		}
	},
	mounted() {
		var id = this.$route.params.id
		var sort = this.$route.params.sort
		var _this = this
		if(sort == 'news'){
			$.ajax({
	    		url: 'http://localhost:5555/getNewsById',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: { id: id },
	    		success(data){
	    			_this.detailData = data[0]
	    			console.log(_this.detailData)
	    		}
	    	})
		}
		else if(sort == 'inform') {
			$.ajax({
	    		url: 'http://localhost:5555/getInformById',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: { id: id },
	    		success(data){
	    			_this.detailData = data[0]
	    		}
	    	})
		} else if (sort == 'life') {
			$.ajax({
	    		url: 'http://localhost:5555/getLifeById',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: { id: id },
	    		success(data){
	    			_this.detailData = data[0]
	    		}
	    	})
		}
	}
}
</script>

<style scoped>
	h3 {
		line-height: 50px;
		font-size: 22px;
	}
	.content {
		line-height: 36px;
		font-size: 14px;
		color:  #333;
		text-indent: 2em;
		width: 900px;
		margin:  0 auto;
	}
</style>