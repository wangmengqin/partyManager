<template>
	<div >
		<xmenu />
		<messageContent />
	</div>
</template>

<script>
	import xmenu from "../xmenu.vue";
	import messageContent from "../container/foremessage_content.vue";
	export default {
	  components:{
	      xmenu,
	      messageContent
	  }
	}
</script>

<style>
</style>