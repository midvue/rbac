<script lang="tsx">
import { defineComponent, ref } from "vue";
import { formProps } from "./props";

export default defineComponent({
  name: "EmForm",
  inheritAttrs: false,
  props: formProps,
  setup(props, { attrs, expose, slots }) {
    const formRef = ref();

    const exposeMethod = [
      "clearValidate",
      "resetFields",
      "validate",
      "validateField",
      "validateFields",
    ].reduce((pre, curr) => {
      pre[curr] = (...args: any) => formRef.value[curr](...args);
      return pre;
    }, {} as Record<string, any>);
    expose(exposeMethod);

    const renderFormItem = () => {
      if (!props.items.length) {
        return slots.default?.();
      }
      return props.items.map((item, index) => (
        <el-form-item
          label={item.label}
          prop={item.field}
          {...item.attrs}
          key={index + "_" + item.field}
          rules={item.rules}
        >
          {{ default: () => item.render(props.model, index) }}
        </el-form-item>
      ));
    };

    //渲染子组件
    return () => (
      <div class="em-form">
        <el-form ref={formRef} labelWidth={props.labelWidth} model={props.model} {...attrs}>
          {{ default: () => renderFormItem() }}
        </el-form>
      </div>
    );
  },
});
</script>
<style></style>
