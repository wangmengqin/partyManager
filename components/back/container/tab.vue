<template>
    <div style="width: 1200px;margin: 0 auto;">
    	<xheader />
    	<div style="width: 1200px;margin: 0 auto;overflow: hidden;">
    		<xsidemenu />
        	<router-view></router-view>
    	</div>
        
		<xfooter />
    </div>
</template>
<script>
// 引入公共组件
import xsidemenu from "../xsidemenu.vue";
import xfooter from "../xfooter.vue";
import xheader from "../xheader.vue";
export default {
  components:{
      xsidemenu,
    xfooter,
    xheader
  }
}
</script>

