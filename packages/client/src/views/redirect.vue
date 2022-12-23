<template>
  <div />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  name: "Redirect",
  setup() {
    const route = useRoute();
    const router = useRouter();
    if (route.query.tzToken) {
      router.replace("/");
    }
    router.replace("/404");
  },
});
</script>
