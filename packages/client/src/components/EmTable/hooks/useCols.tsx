import type { IProps } from "../props";
import type { ICol, RowScoped } from "../types";

export const useCols = (props: IProps) => {
  const renderCol = (col: ICol, key: number) => {
    const { render, renderHeader, ...rest } = col;

    const defaultAttr = { highlightCurrentRow: true, showOverflowTooltip: true, align: "center" };
    const cAttr = Object.assign(defaultAttr, rest);
    //插槽
    const vSlot = {} as Record<string, unknown>;
    if (render) {
      vSlot.default = (scoped: RowScoped) => render?.(scoped);
    }
    if (renderHeader) {
      vSlot.header = (scoped: RowScoped) => renderHeader?.(scoped);
    }
    return <el-table-column key={key} {...cAttr} v-slots={vSlot}></el-table-column>;
  };
  return () => (
    <>
      {props.cols.map((col, key) => {
        return renderCol(col, key);
      })}
    </>
  );
};
