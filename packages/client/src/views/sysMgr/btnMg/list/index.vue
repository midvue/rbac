<script lang="tsx">
import { defineComponent, reactive } from "vue";
import { getBtnList } from "../api";
import type { BtnListState } from "../types";
import { useEditDialog } from "./useEditDialog";
import { useList } from "./useList";
import { useSearchForm } from "./useSearchForm";
import { usePermission } from "@/vhooks/usePermission";

export default defineComponent({
  name: "BtnMg",
  setup() {
    const state: BtnListState = reactive({
      listLoading: false,
      btnList: [],
      searcForm: {},
      pagination: {
        current: 1,
        size: 20,
        total: 0,
      },
    });

    const [isAdd, addInfo] = usePermission("Add");
    console.log(isAdd, addInfo);

    //获取用户列表
    const getSearchList = () => {
      const params = Object.assign({}, state.searcForm, state.pagination);
      state.listLoading = true;
      getBtnList(params)
        .then((res) => {
          state.listLoading = false;
          state.btnList = res.data.list || [];
          state.pagination.total = res.data.count;
        })
        .catch(() => {
          state.listLoading = false;
        });
    };

    const renderSearch = useSearchForm(state, getSearchList);
    const { render: renderDialog, openDialog } = useEditDialog(state, getSearchList);
    const renderList = useList(state, openDialog, getSearchList);

    return () => (
      <div class="btn-mg">
        {renderSearch()}
        {renderList()}
        {renderDialog()}
      </div>
    );
  },
});
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
