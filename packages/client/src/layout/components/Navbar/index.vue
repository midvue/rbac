<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggle-click="toggleSideBar"
    />
    <rigt-menu />
  </div>
</template>

<script lang="ts">
import { useAppStore } from "@/store/modules/app";
import { computed, defineComponent } from "vue";
import Hamburger from "../Hamburger/index.vue";
import RigtMenu from "./RightMenu.vue";

export default defineComponent({
  name: "Navbar",
  components: {
    Hamburger,
    RigtMenu,
  },
  setup() {
    const appStore = useAppStore();
    const sidebar = computed(() => {
      return appStore.sidebar;
    });

    const toggleSideBar = () => {
      appStore.toggleSideBar();
    };

    return { sidebar, toggleSideBar };
  },
});
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  background: var(--el-color-primary);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    cursor: pointer;
    transition: all 0.24s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
}
</style>

<style lang="scss"></style>
