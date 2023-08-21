<template>
  <template v-if="hasOneMenu(item.children, item) && !menuItem?.children">
    <template v-if="!!menuItem?.meta">
      <el-menu-item
        :index="resolvePath(menuItem.path)"
        :class="{ 'submenu-title-noDropdown': !isNest }"
        @click="hanldeClickMenuItem(item.path)"
      >
        <menu-icon
          :icon="menuItem.meta.icon || (item.meta && item.meta.icon)"
          :title="menuItem.meta.title"
        />
        <template #title>
          <span v-if="menuItem.meta.title">{{ menuItem.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
  </template>

  <el-sub-menu v-else ref="subMenuRef" :index="resolvePath(item.path)" teleported>
    <template #title>
      <menu-icon v-if="item.meta" :icon="item.meta && item.meta.icon" />
      <span v-if="item.meta && item.meta.title">{{ item.meta.title }}</span>
    </template>
    <template v-for="child in item.children" :key="child.path">
      <sidebar-item
        v-if="!child.hidden"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(item.path)"
        class="nest-menu"
      />
    </template>
  </el-sub-menu>
</template>

<script lang="ts">
import { ref, defineComponent, Ref, PropType } from "vue";
import MenuIcon from "./Icon.vue";
import { usePath } from "../../usePath";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "SidebarItem",
  components: { MenuIcon },
  inheritAttrs: false,
  props: {
    item: {
      type: Object as PropType<EmRouteRaw>,
      required: true,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const router = useRouter();
    const { isExternal, resolve } = usePath();

    const subMenuRef: Ref<Nullable<HTMLElement>> = ref(null);
    const menuItem: Ref<Nullable<EmRouteRaw>> = ref(null);

    const hasOneMenu = (children: Array<EmRouteRaw> = [], parent: EmRouteRaw) => {
      // 判断是否有children
      const showingChildren = children.filter((item) => {
        return !item.hidden;
      });

      // 如果没有子child,就显示自身
      if (showingChildren.length === 0) {
        menuItem.value = { ...parent, children: undefined };
        return true;
      }

      // 如果有一个child,取出子child
      if (showingChildren.length === 1) {
        menuItem.value = showingChildren[0];
        return true;
      }
      return false;
    };

    const resolvePath = (routePath: string) => {
      if (isExternal(routePath) || isExternal(props.basePath)) {
        return routePath || props.basePath;
      } else {
        return resolve(props.basePath, routePath);
      }
    };

    const hanldeClickMenuItem = (path: string) => {
      const url = resolvePath(path);
      if (isExternal(url)) {
        window.open(url);
      } else {
        router.push(url);
      }
    };

    return {
      hasOneMenu,
      resolvePath,
      menuItem,
      subMenuRef,
      hanldeClickMenuItem,
    };
  },
});
</script>
