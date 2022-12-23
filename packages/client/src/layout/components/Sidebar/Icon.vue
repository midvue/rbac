<script lang="tsx">
import { defineComponent } from "vue";
export default defineComponent({
  name: "MenuIcon",
  functional: true,
  inheritAttrs: false,
  props: {
    icon: {
      type: String || null,
      default: "",
    },
  },
  setup(props) {
    const vnodes: JSX.Element[] = [];
    if (props.icon) {
      if (props.icon.includes("el-icon") || props.icon.includes("el-")) {
        vnodes.push(<i class={[props.icon, "sub-el-icon"]} />);
      } else {
        vnodes.push(<svg-icon name={props.icon} class="sub-el-icon" />);
      }
    }
    return () => <> {vnodes} </>;
  },
});
</script>

<style lang="scss">
@import "@/styles/sidebarVar.scss";

.sub-el-icon {
  flex: none;
  color: $menuText !important;
  width: 1em;
  height: 1em;
  font-size: 14px !important;
  margin-right: 8px;
}
</style>
