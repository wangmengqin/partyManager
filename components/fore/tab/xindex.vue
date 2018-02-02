<template>
	<div>
		<xbanner/>
		<xmenu />
		<indexContent />
	</div>
</template>

<script>
// 引入公共组件
import xmenu from "../xmenu.vue";
import xbanner from "../xbanner.vue";
import indexContent from "../container/index_content.vue";
export default {
  components:{
      xmenu,
    xbanner,
    indexContent
  }
}
</script>

<style>
</style>