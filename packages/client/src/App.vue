<template>
  <el-config-provider :locale="locale" :size="size" :z-index="zIndex">
    <router-view />
  </el-config-provider>
</template>
<script>
import { defineComponent } from "vue";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
export default defineComponent({
  name: "App",
  components: {},
  setup() {
    // const color = useCssVar("--el-color-primary");
    // color.value = "#1c78ef";
    // useCssVar("--el-border-radius-base").value = "2px";

    const locale = zhCn;
    return { locale, zIndex: 2000, size: "default" };
  },
});
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
