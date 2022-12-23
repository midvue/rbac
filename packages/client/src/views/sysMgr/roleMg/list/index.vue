<script lang="tsx">
import { defineComponent, reactive } from "vue";
import { getRoleList } from "../api";
import { RoleListState } from "../types";
import { useEditDialog } from "./dialog/useEditDialog";
import { usePerrDialog } from "./dialog/usePerrDialog";
import { useList } from "./useList";
import { useSearchForm } from "./useSearchForm";

export default defineComponent({
  name: "RoleMg",
  setup() {
    const state: RoleListState = reactive({
      listLoading: false,
      roleList: [],
      searcForm: {},
      pagination: {
        current: 1,
        size: 10,
        total: 0,
      },
    });

    //获取用户列表
    const getSearchList = () => {
      const params = Object.assign({}, state.searcForm, state.pagination);
      state.listLoading = true;
      getRoleList(params)
        .then((res) => {
          state.listLoading = false;
          state.roleList = res.data.list || [];
          state.pagination.total = res.data.count;
        })
        .catch(() => {
          state.listLoading = false;
        });
    };

    const renderSearch = useSearchForm(state, getSearchList);
    const { render: renderDialog, openDialog } = useEditDialog(getSearchList);
    const { render: renderPerrDialog, openPerrDialog } = usePerrDialog();
    const renderList = useList(state, openDialog, openPerrDialog, getSearchList);

    return () => (
      <div class="role-mg">
        {renderSearch()}
        {renderList()}
        {renderDialog()}
        {renderPerrDialog()}
      </div>
    );
  },
});
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
