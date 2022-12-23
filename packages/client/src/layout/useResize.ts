import { watch, onBeforeMount, onBeforeUnmount, onMounted } from "vue";
import { useRoute } from "vue-router";

export const useResize = () => {
  const route = useRoute();
  const { body } = document;
  const WIDTH = 992; // refer to Bootstrap's responsive design

  const isMobile = () => {
    const rect = body.getBoundingClientRect();
    return rect.width - 1 < WIDTH;
  };

  const resizeHandler = () => {
    if (!document.hidden) {
      const _isMobile = isMobile();
      // store.dispatch("app/toggleDevice", _isMobile ? "mobile" : "desktop");
      if (_isMobile) {
        //  store.dispatch("app/closeSideBar", { withoutAnimation: true });
      }
    }
  };
  watch(
    () => route.path,
    () => {
      // if (
      //  // store.state.app.device === "mobile" &&
      //  // store.state.app.sidebar.opened
      // ) {
      //   // store.dispatch("app/closeSideBar", { withoutAnimation: false });
      // }
    }
  );

  onMounted(() => {
    const _isMobile = isMobile();
    if (_isMobile) {
      //   store.dispatch("app/toggleDevice", "mobile");
      //  store.dispatch("app/closeSideBar", { withoutAnimation: true });
    }
  });

  onBeforeMount(() => {
    window.addEventListener("resize", resizeHandler);
  });
  onBeforeUnmount(() => {
    window.removeEventListener("resize", resizeHandler);
  });
  return { isMobile };
};
