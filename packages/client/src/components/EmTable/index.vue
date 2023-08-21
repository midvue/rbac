<script lang="tsx">
import { defineComponent } from "vue";
import { useBtns, useCols, usePagination } from "./hooks";
import { props } from "./props";
export default defineComponent({
  name: "EmTable",
  props,
  setup(props, ctx) {
    const { attrs } = ctx;
    const renderBtns = useBtns(props);
    const renderCols = useCols(props);
    const renderPagination = usePagination(props, ctx);

    return () => (
      <>
        <el-table size="small" class="em-table" border stripe {...attrs}>
          {renderCols()}
          {renderBtns()}
        </el-table>
        {renderPagination()}
      </>
    );
  },
});
</script>

<style lang="scss" scoped>
.em-table {
  width: 100%;
}
.em-table-footer {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-pagination {
    text-align: right;
    padding-top: 10px;
    padding-bottom: 10px;
  }
}
</style>
