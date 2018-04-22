<template>
	<div >
		<xmenu />
		<newsContent />
	</div>
</template>

<script>
	import xmenu from "../xmenu.vue";
	import newsContent from "../container/news_content.vue";
	export default {
	  components:{
	      xmenu,
	      newsContent
	  }
	}
</script>

<style>
</style>