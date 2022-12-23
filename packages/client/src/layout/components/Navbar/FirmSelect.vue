<template>
  <el-select
    v-model="currSite"
    :options="firmList"
    :clearable="false"
    placeholder="产品与服务"
    label-key="name"
    value-key="id"
    class="firm-select"
    @change="handleFirmSelect"
  ></el-select>
</template>

<script lang="ts">
import { computed, ref, defineComponent } from "vue";

export default defineComponent({
  name: "FirmSelect",
  components: {},
  setup() {
    const currSite = ref("");

    const firmList = computed(() => {
      return [];
    });

    // 切换系统
    const handleFirmSelect = (item: unknown) => {
      console.log(item);
    };

    return { firmList, currSite, handleFirmSelect };
  },
});
</script>

<style lang="scss" scoped>
.firm-select {
  width: 160px;
  height: 22px;

  ::v-deep(.el-input__inner) {
    border-radius: 2px;
    border: none;
    color: #ffffff;
    background: rgba(0, 0, 0, 0.1);
  }
}
</style>
