<template>
	<div >
		<xmenu />
		<activitiesContent />
	</div>
</template>

<script>
	import xmenu from "../xmenu.vue";
	import activitiesContent from "../container/foreactivities_content.vue";
	export default {
	  components:{
	      xmenu,
	      activitiesContent
	  }
	}
</script>

<style>
</style>