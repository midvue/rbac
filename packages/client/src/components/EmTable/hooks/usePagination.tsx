import type { SetupContext } from "vue";
import type { IProps } from "../props";

/**
 * 分页hook
 * @param props IProps
 * @returns jsxDom
 */
export const usePagination = (props: IProps, ctx: SetupContext) => {
  const handleSizeChange = (pageSize: number) => {
    ctx.emit("update:pagination", { ...props.pagination, pageSize });
    props.onPageChange?.(props.pagination.currentPage, pageSize);
  };

  const handleCurrentChange = (currentPage: number) => {
    ctx.emit("update:pagination", { ...props.pagination, currentPage });
    props.onPageChange?.(currentPage, props.pagination.pageSize);
  };

  return () => {
    if (!props.pagination.currentPage) return;
    return (
      <div class="em-table-footer">
        <div>
          <slot name="leftFooter" />
        </div>
        <el-pagination
          {...props.pagination}
          v-model:currentPage={props.pagination.currentPage}
          v-model:pageSize={props.pagination.pageSize}
          small="small"
          layout="total, sizes, prev, pager, next, jumper"
          onSizeChange={handleSizeChange}
          onCurrentChange={handleCurrentChange}
        />
      </div>
    );
  };
};
