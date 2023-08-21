import { Directive } from "vue";
import { usePermitStore } from "@/store/modules/permit";

const directive: Directive = {
  mounted(el: HTMLElement, binding) {
    // const permitStore = usePermitStore();
    // const buttons = permitStore.buttons;
    // const parentNode = el.parentNode;
    // //没有权限则移除当前dom节点
    // if (binding.value && buttons.length !== 0 && !buttons.includes(binding.value)) {
    //   if (parentNode) {
    //     parentNode.removeChild(el);
    //   }
    // }
  },
};

export default directive;
