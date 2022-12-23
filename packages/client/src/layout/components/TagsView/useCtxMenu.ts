import { TagViewState } from "../../type";
import { getCurrentInstance, onMounted, onBeforeUnmount } from "vue";
export const useCtxMenu = (state: TagViewState) => {
  //@ts-ignore
  const { proxy } = getCurrentInstance();
  // 右键打开菜单
  const openMenu = (tag: EmRouteRaw, e: PointerEvent) => {
    const menuMinWidth = 105;
    const offsetLeft = proxy.$el.getBoundingClientRect().left; // container margin left
    const offsetWidth = proxy.$el.offsetWidth; // container width
    const maxLeft = offsetWidth - menuMinWidth; // left boundary
    const left = e.clientX - offsetLeft + 15; // 15: margin right
    if (left > maxLeft) {
      state.left = maxLeft;
    } else {
      state.left = left;
    }
    state.top = e.clientY;
    state.visible = true;
    state.selectedTag = tag;
  };

  const refreshSelectedTag = () => {
    console.log(state.selectedTag);

    // proxy.$store.dispatch("tagsView/delCachedView", view).then(() => {
    //   const { fullPath } = view;
    //   proxy.$nextTick(() => {
    //     proxy.$router.replace({
    //       path: fullPath,
    //     });
    //   });
    // });
  };
  const moveToCurrentTag = () => {
    const tags = state.tagRefs;
    console.log(tags);
    proxy.$nextTick(() => {
      for (const tag of tags) {
        console.log(tag);
        // if (tag.to.path === proxy.$route.path) {
        //   proxy.$refs.scrollPaneRef.moveToTarget(tag, tags);
        //   // when query is different then update
        //   if (tag.to.fullPath !== proxy.$route.fullPath) {
        //     proxy.$store.dispatch("tagsView/updateVisitedView", proxy.$route);
        //   }
        //   break;
        // }
      }
    });
  };

  const closeOthersTags = () => {
    proxy.$router.push(state.selectedTag);
    // moveToCurrentTag();
  };

  const closeMenu = () => {
    state.visible = false;
  };

  onMounted(() => {
    document.body.addEventListener("click", closeMenu);
  });

  onBeforeUnmount(() => {
    document.body.removeEventListener("click", closeMenu);
  });
  return {
    openMenu,
    closeMenu,
    refreshSelectedTag,
    moveToCurrentTag,
    closeOthersTags,
  };
};
