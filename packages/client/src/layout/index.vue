<template>
  <div
    class="main-contrainer-wrapper"
    :class="{ hideSidebar: sidebarOption.hideSidebar }"
  >
    <div
      v-if="sidebarOption.isMobile && !sidebarOption.hideSidebar"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
        <tags-view />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { Navbar, Sidebar, AppMain, TagsView } from "./components";
import { useAppStore } from "@/store/modules/app";
import { DEVICE_TYPE } from "@/store/modules/types";
import { useSettingStore } from "@/store/modules/settings";
import { useRoute } from "vue-router";
export default defineComponent({
  name: "Layout",
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView,
  },
  setup() {
    const appStore = useAppStore();
    const setting = useSettingStore();

    const fixedHeader = computed(() => {
      return setting.fixedHeader;
    });

    const sidebarOption = computed(() => {
      return {
        hideSidebar: !appStore.sidebar.opened,
        withoutAnimation: appStore.sidebar.withoutAnimation,
        isMobile: appStore.device === DEVICE_TYPE.MOBILE,
      };
    });

    const isSubApp = () => {
      return window.self === window.top;
    };

    let isSidebar = computed(() => {
      return useRoute().meta?.isSidebar ?? true;
    });

    const handleClickOutside = () => {
      appStore.closeSideBar();
    };

    return {
      fixedHeader,
      sidebarOption,
      handleClickOutside,
      isSubApp,
      isSidebar,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/sidebar.scss";

.main-contrainer-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 999;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.18s ease-in-out;
}
.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
.iframe-wrapper {
  padding: 6px 6px 0 6px;
}
</style>
