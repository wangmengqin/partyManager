<template>
    <div>
    	<foreheader />
    	<router-view></router-view>
		<forefooter />
    </div>
</template>
<script>
// 引入公共组件
import xmenu from "../xmenu.vue";
import forefooter from "../forefooter.vue";
import foreheader from "../foreheader.vue";
export default {
  components:{
      xmenu,
    forefooter,
    foreheader
  }
}
</script>

