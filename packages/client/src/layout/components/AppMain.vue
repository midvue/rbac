<template>
  <div class="wrapper">
    <router-view>
      <template #default="{ Component, route }">
        <keep-alive :include="cacheViews" max="16">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </template>
    </router-view>
  </div>
</template>

<script lang="ts">
import { useTagViewsStore } from "@/store/modules/tagViews";
import { defineComponent, watch } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "AppMain",
  setup() {
    const route = useRoute();
    const permitStore = useTagViewsStore();

    let cacheViews = permitStore.cacheViews;
    watch(
      () => route.fullPath,
      () => {
        cacheViews = permitStore.cacheViews;
      }
    );

    return { cacheViews };
  },
});
</script>

<style scoped>
.fixed-header + .wrapper {
  padding-top: 94px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
/* .el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
} */
</style>
