<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane ref="scrollPaneRef" class="tags-view-wrapper">
      <router-link
        v-for="(tag, index) in visitedViews"
        :key="tag.path"
        :ref="(el) => tagRefs[index] = (el as HTMLElement)"
        :to="tag"
        class="tags-view-item"
        :class="isActive(tag) ? 'active' : ''"
        @click.middle="!isAffix(tag) ? closeSelectedTag(tag, index) : ''"
        @contextmenu.prevent="openMenu(tag, $event)"
      >
        <span>{{ tag.meta!.title }}</span>

        <svg-icon
          name="close"
          class="icon-close"
          @click.prevent.stop="closeSelectedTag(tag, index)"
        />
      </router-link>
    </scroll-pane>
    <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
      <li @click="refreshSelectedTag">刷新</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">关闭</li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags()">关闭所有</li>
    </ul>
  </div>
</template>

<script lang="ts">
import ScrollPane from "./ScrollPane.vue";
import { computed, reactive, ref, toRefs, watch, defineComponent } from "vue";
import { useRouter, useRoute, RouteLocationNormalizedLoaded } from "vue-router";
import { useTagViewsStore } from "@/store/modules/tagViews";
import type { TagViewState } from "../../type";
import SvgIcon from "@/icons/SvgIcon.vue";
import { useCtxMenu } from "./useCtxMenu";
import { usePath } from "../../usePath";

export default defineComponent({
  components: { ScrollPane, SvgIcon },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { resolve } = usePath();
    const tagStore = useTagViewsStore();

    const scrollPaneRef = ref(null);

    const state: TagViewState = reactive({
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {} as EmRouteRaw,
      affixTags: [],
      tagRefs: [],
      routes: [],
    });

    const visitedViews = computed(() => {
      return tagStore.tagViews;
    });

    const addTags = (route: RouteLocationNormalizedLoaded) => {
      const { name, meta, query, params } = route;
      if (!name || meta?.title === undefined) return;
      const tag = {
        path: route.path,
        fullPath: route.fullPath,
        name: route.name,
        meta: meta,
        query: query,
        params: params,
      } as EmRouteRaw;
      tagStore.addView(tag);
    };

    watch(
      () => route.fullPath,
      () => {
        addTags(route);
      },
      { immediate: true }
    );

    // 跳转到最后一个缓存路由
    const toLastView = (visitedViews: EmRouteRaw[]) => {
      const latestView = visitedViews.slice(-1)[0];
      if (latestView) {
        router.push(latestView.fullPath!);
      } else {
        router.push("/");
      }
    };

    const isAffix = (tag: Nullable<EmRouteRaw>) => {
      return tag?.meta?.affix;
    };

    const isActive = (view: EmRouteRaw) => {
      return view.fullPath === route.fullPath;
    };

    const closeSelectedTag = (tagview: EmRouteRaw, index?: number) => {
      tagStore.delView(tagview).then((tagViews) => {
        if (isActive(tagview)) {
          toLastView(tagViews);
        }
        // tag.idx = index;
      });
    };
    const closeAllTags = () => {
      tagStore.delAllViews().then(() => {
        router.push("/");
      });
    };

    const filterAffixTags = (routes: any[], basePath = "/") => {
      let tags: any[] = [];
      routes.forEach((route) => {
        if (route.meta && route.meta.affix) {
          const tagPath = resolve(basePath, route.path);
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta },
          });
        }
        if (route.children) {
          const tempTags = filterAffixTags(route.children, route.path);
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags];
          }
        }
      });
      return tags;
    };

    // eslint-disable-next-line no-unused-vars
    const initTags = () => {
      const affixTags = filterAffixTags(state.routes);
      for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
          // store.dispatch("tagsView/addVisitedView", tag);
        }
      }
    };

    return {
      visitedViews,
      isActive,
      isAffix,
      closeSelectedTag,
      scrollPaneRef,
      closeAllTags,
      ...toRefs(state),
      ...useCtxMenu(state),
    };
  },
});
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #ffffff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-flex;
      align-items: center;
      cursor: pointer;
      height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      .icon-close {
        border-radius: 50%;
        font-size: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 4px;
        margin-top: 2px;
        padding: 4px;

        &:hover {
          background-color: #b4bccc;
          color: #fff;
        }
      }
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &::before {
        content: "";
        display: inline-block;
        width: 3px;
        height: 4px;
      }
      &.active {
        background-color: var(--el-color-primary);
        color: #fff;
        border-color: var(--el-color-primary);
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
