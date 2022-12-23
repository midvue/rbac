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

<script>
import { usePermitStore } from "@/store/modules/permit";
import { computed } from "vue";

export default {
  name: "AppMain",
  setup() {
    const permission = usePermitStore();
    const cacheViews = computed(() => {
      return permission.cacheViews;
    });

    const getTransitionName = (route) => {
      const name = "fade-slide";
      return route.transitionName || name;
    };

    return { cacheViews, getTransitionName };
  },
};
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
