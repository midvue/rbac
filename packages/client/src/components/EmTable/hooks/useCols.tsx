import type { IProps } from "../props";
import type { ICol } from "../types";

export const useCols = (props: IProps) => {
  const renderCol = (col: ICol, key: number) => {
    const { render, renderHeader } = col;

    const defaultAttr = { highlightCurrentRow: true, showOverflowTooltip: true, align: "center" };
    const cAttr = Object.assign(defaultAttr, col);
    //插槽
    const vSlot = {} as Record<string, unknown>;
    if (render) {
      vSlot.default = (scoped: unknown) => render?.(scoped);
      delete cAttr.render;
    }
    if (renderHeader) {
      vSlot.header = (scoped: unknown) => renderHeader?.(scoped);
      delete cAttr.renderHeader;
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
