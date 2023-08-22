import { h, resolveComponent, watch } from "vue";
import { deleteMenu, getMenuList } from "../api";
import type { Menu, MenuListState, OpenDialogFunc } from "../types";
import { useBasicBtnDialog } from "./dialog/useBasicBtnDialog";
import { useBtnDialog } from "./dialog/useBtnDialog";
import type { EmTableType } from "@/components";

/**
 * 右边菜单详情
 * @param state  MenuListState
 * @param openMenuDialog
 * @param getSearchList
 */
export const useDetail = (
  state: MenuListState,
  openMenuDialog: OpenDialogFunc,
  getSearchList: () => void
) => {
  const cols: EmTableType.Cols<Menu> = [
    {
      prop: "id",
      label: "编号",
      width: 60,
      align: "center",
    },
    {
      prop: "name",
      label: "菜单名",
      width: 110,
      align: "center",
    },
    {
      prop: "code",
      label: "菜单编码",
      width: 110,
      align: "center",
    },
    {
      prop: "icon",
      label: "图标",
      width: 60,
      align: "center",
      render: ({ row }) => {
        if (!row.icon) return null;
        return h(resolveComponent(row.icon), {
          style: { width: "1.5em", verticalAlign: "middle" },
        });
      },
    },

    {
      prop: "url",
      label: "路由地址",
      align: "center",
    },
    {
      prop: "url",
      label: "权限接口",
      align: "center",
    },
    {
      prop: "name",
      label: "父级菜单",
      width: 110,
      align: "center",
    },
    {
      prop: "orderNum",
      label: "排序",
      width: 60,
      align: "center",
    },
    {
      prop: "isShow",
      label: "是否显示",
      width: 70,
      align: "center",
      render: ({ row }) => <span>{row.isShow ? "是" : "否"}</span>,
    },
    {
      prop: "keepAlive",
      label: "是否缓存",
      width: 70,
      align: "center",
      render: ({ row }) => <span>{row.keepAlive ? "是" : "否"}</span>,
    },
  ];

  const tableAction: EmTableType.IAction<Menu> = {
    width: 130,
    buttons: [
      {
        title: "编辑",
        type: "primary",
        click: ({ row }) => openMenuDialog(row),
        permission: "Edit",
      },
      {
        title: "删除",
        type: "danger",
        click: ({ row }) => handleDelete(row.id),
        permission: "Del",
      },
    ],
  };

  const getBtnlist = () => {
    getMenuList({ pid: state.currNodes[0].id, type: 2 }).then((res) => {
      state.currBtns = res.data.list;
    });
  };

  watch(() => state?.currNodes[0]?.id, getBtnlist);

  const handleDelete = (id: number) => {
    $EmMsgBox.warning("确定永久删除当前菜单吗,请谨慎操作!", {}).then(async () => {
      deleteMenu({ id }).then(() => {
        getSearchList!();
        $EmMsg.success("删除成功");
      });
    });
  };

  const rendBtnTable = useBtnTable(state, getBtnlist);
  return () => (
    <el-main class="main">
      <em-table data={state.currNodes} cols={cols} action={tableAction}></em-table>
      {rendBtnTable()}
    </el-main>
  );
};

/**
 *  按钮hooK
 * @param state
 * @returns
 */
const useBtnTable = (state: MenuListState, getBtnlist: () => void) => {
  const btnCols: EmTableType.Cols<Menu> = [
    {
      label: "编号",
      prop: "id",
      align: "center",
      width: 55,
    },
    {
      label: "按钮名",
      prop: "name",
      align: "center",
    },
    {
      label: "按钮编码",
      prop: "code",
      align: "center",
    },
    {
      label: "图标",
      prop: "icon",
    },
    {
      label: "排序",
      prop: "orderNum",
      align: "center",
    },
  ];

  const tableAction: EmTableType.IAction<Menu> = {
    width: 130,
    buttons: [
      {
        title: "编辑",
        type: "primary",
        click: ({ row }) => openBtnDialog(row),
        permission: "EditBtn",
      },
      {
        title: "删除",
        type: "danger",
        click: ({ row }) => handleDelete(row.id),
        permission: "DelBtn",
      },
    ],
  };

  const handleDelete = (id: number) => {
    $EmMsgBox.warning("确定永久删除当前按钮吗,请谨慎操作!", {}).then(async () => {
      deleteMenu({ id }).then(() => {
        getBtnlist();
        $EmMsg.success("删除成功");
      });
    });
  };

  const { render: renderBtnDialog, openDialog: openBtnDialog } = useBtnDialog(state, getBtnlist);
  const { render: renderBaiscBtnDialog, openDialog: openBasicBtnDialog } = useBasicBtnDialog(
    state,
    getBtnlist
  );

  return () => (
    <>
      <div class="btn">
        <el-button
          type="primary"
          icon="plus"
          onClick={() => {
            const codes = state.currBtns.map((btn) => btn.code);
            const pid = state.currNodes[0].id || 0;
            openBasicBtnDialog(pid, codes);
          }}
        >
          同步基础按钮
        </el-button>
        <el-button type="primary" icon="plus" onClick={() => openBtnDialog()}>
          添加按钮
        </el-button>
      </div>
      <em-table data={state.currBtns} cols={btnCols} action={tableAction}></em-table>
      {renderBtnDialog()}
      {renderBaiscBtnDialog()}
    </>
  );
};
