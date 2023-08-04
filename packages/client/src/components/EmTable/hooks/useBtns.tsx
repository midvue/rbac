import type { IProps } from "../props";
import type { RowScoped } from "../types";

export const useBtns = (props: IProps) => {
  return () => {
    if (!props.cols.length || !props.action.buttons.length) return;
    return (
      <el-table-column
        prop="em-oprerate"
        label="操作"
        align="center"
        width={props.action.width}
        fixed={props.action.fixed}
      >
        {{
          default: (scoped: RowScoped) => {
            return props.action.buttons.map((btn) => (
              <el-button
                type={btn.type || "primary"}
                size={btn.size || "small"}
                icon={btn.icon}
                onClick={(e: PointerEvent) => {
                  e.stopPropagation();
                  btn.click?.(scoped);
                }}
                v-permission={btn.permission}
              >
                {btn.title}
              </el-button>
            ));
          },
        }}
      </el-table-column>
    );
  };
};
