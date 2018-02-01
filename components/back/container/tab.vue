<template>
    <div style="width: 1200px;margin: 0 auto;">
        <router-view></router-view>
        <xsidemenu />
		<xfooter />
    </div>
</template>
<script>
// 引入公共组件
import xsidemenu from "../xsidemenu.vue";
import xfooter from "../xfooter.vue";

export default {
  components:{
      xsidemenu,
    xfooter
  }
}
</script>

