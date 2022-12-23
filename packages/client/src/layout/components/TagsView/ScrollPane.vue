<template>
  <el-scrollbar
    ref="scrollContainer"
    :vertical="false"
    class="scroll-container"
  >
    <slot />
  </el-scrollbar>
</template>

<script lang="ts">
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  defineComponent,
  Ref,
  ComponentPublicInstance,
} from "vue";
const tagAndTagSpacing = 4; // tagAndTagSpacing
export default defineComponent({
  name: "ScrollPane",
  emits: ["scroll"],
  setup(props, { emit }) {
    const left = ref(0);

    const scrollContainer: Ref<
      Nullable<ComponentPublicInstance & HTMLElement>
    > = ref(null);
    const scrollWrapper = computed(() => {
      return (
        scrollContainer.value &&
        (scrollContainer.value?.$refs.wrap as HTMLElement)
      );
    });

    const handleScroll = (e: any) => {
      const eventDelta = e.wheelDelta || -e.deltaY * 40;
      const $scrollWrapper = scrollContainer.value && scrollContainer.value;
      $scrollWrapper!.scrollLeft = $scrollWrapper!.scrollLeft + eventDelta / 4;
    };

    const moveToTarget = (currentTag: any, tagList: any[]) => {
      const $container = scrollContainer.value && scrollContainer.value.$el;
      const $containerWidth = $container.offsetWidth;
      const $scrollWrapper = scrollWrapper.value;
      let firstTag = null;
      let lastTag = null;
      // find first tag and last tag
      if (tagList.length > 0) {
        firstTag = tagList[0];
        lastTag = tagList[tagList.length - 1];
      }
      if (firstTag === currentTag) {
        $scrollWrapper!.scrollLeft = 0;
      } else if (lastTag === currentTag) {
        $scrollWrapper!.scrollLeft =
          $scrollWrapper!.scrollWidth - $containerWidth;
      } else {
        // find preTag and nextTag
        const currentIndex = tagList.findIndex(
          (item: any) => item === currentTag
        );
        const prevTag = tagList[currentIndex - 1];
        const nextTag = tagList[currentIndex + 1];
        // the tag's offsetLeft after of nextTag
        const afterNextTagOffsetLeft =
          nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing;
        // the tag's offsetLeft before of prevTag
        const beforePrevTagOffsetLeft =
          prevTag.$el.offsetLeft - tagAndTagSpacing;
        if (
          afterNextTagOffsetLeft >
          $scrollWrapper!.scrollLeft + $containerWidth
        ) {
          $scrollWrapper!.scrollLeft = afterNextTagOffsetLeft - $containerWidth;
        } else if (beforePrevTagOffsetLeft < $scrollWrapper!.scrollLeft) {
          $scrollWrapper!.scrollLeft = beforePrevTagOffsetLeft;
        }
      }
    };

    const emitScroll = () => {
      emit("scroll");
    };
    onMounted(() => {
      scrollWrapper.value?.addEventListener("scroll", emitScroll, true);
    });
    onBeforeUnmount(() => {
      scrollWrapper.value?.removeEventListener("scroll", emitScroll);
    });
    return { left, scrollWrapper, handleScroll, moveToTarget, scrollContainer };
  },
});
</script>

<style lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  ::v-deep(.el-scrollbar__bar) {
    bottom: 0px;
  }
  ::v-deep(.el-scrollbar__wrap) {
    text-align: left;
  }
}
</style>
