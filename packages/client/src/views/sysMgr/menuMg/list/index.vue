<script lang="tsx">
import { defineComponent, reactive } from "vue";
import { getMenuList, getMenuInfo } from "../api";
import type { MenuListState } from "../types";
import { useEditDialog } from "./dialog/useEditDialog";
import { useTree } from "./useTree";
import { useDetail } from "./useDetail";

export default defineComponent({
  name: "MenuMg",
  setup() {
    const state: MenuListState = reactive({
      listLoading: false,
      menuList: [],
      menuTree: [],
      currNodes: [],
      currBtns: [],
    });

    //更新菜单信息
    const handelMenuInfo = async () => {
      const { data } = await getMenuInfo({ id: state.currNodes[0].id });
      state.currNodes = [data];
    };

    //获取菜单列表
    const getSearchList = () => {
      const params = Object.assign({ type: 1 });
      state.listLoading = true;
      getMenuList(params)
        .then((res) => {
          state.listLoading = false;
          state.menuList = res.data.list || [];
        })
        .catch(() => {
          state.listLoading = false;
        });
    };

    getSearchList();

    const { render: renderDialog, openDialog } = useEditDialog(state, handelMenuInfo);
    const renderTree = useTree(state, openDialog);
    const renderDetail = useDetail(state, openDialog, getSearchList);

    return () => (
      <el-container class="menu-mg">
        {renderTree()}
        {renderDetail()}
        {renderDialog()}
      </el-container>
    );
  },
});
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
