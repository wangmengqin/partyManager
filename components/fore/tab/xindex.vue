<template>
	<div>
		<forebanner/>
		<xmenu />
		<indexContent />
	</div>
</template>

<script>
// 引入公共组件
import xmenu from "../xmenu.vue";
import forebanner from "../forebanner.vue";
import indexContent from "../container/index_content.vue";
export default {
  components:{
      xmenu,
    forebanner,
    indexContent
  }
}
</script>

<style>
</style>