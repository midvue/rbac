import type { OpenDialogFunc, Menu, MenuListState } from "../types";
import { deleteMenu, getMenuList } from "../api";
import { h, ref, resolveComponent, watch } from "vue";
import { useButtonDialog } from "./dialog/useButtonDialog";

export const useDetail = (
  state: MenuListState,
  openDialog: OpenDialogFunc,
  getSearchList: () => void
) => {
  const cols = ref([
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
      render: ({ row }: RowScoped<Menu>) => {
        if (!row.icon) return;
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
      render: ({ row }: RowScoped<Menu>) => <span>{row.isShow ? "是" : "否"}</span>,
    },
    {
      prop: "keepAlive",
      label: "是否缓存",
      width: 70,
      align: "center",
      render: ({ row }: RowScoped<Menu>) => <span>{row.keepAlive ? "是" : "否"}</span>,
    },
  ]);

  const tableAction = {
    width: 130,
    buttons: [
      {
        title: "编辑",
        type: "primary",
        click: ({ row }: RowScoped<Menu>) => openDialog(false, row),
        permission: "menu:edit",
      },
      {
        title: "删除",
        type: "danger",
        click: ({ row }: RowScoped<Menu>) => handleDelete(row.id),
        permission: "menu:del",
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
  const { render: renderDialog, openBtnDialog } = useButtonDialog(state, getBtnlist);
  const rendBtnTable = useBtnTable(state, openBtnDialog, getBtnlist);
  return () => (
    <el-main class="main">
      <em-table data={state.currNodes} cols={cols.value} action={tableAction}></em-table>
      {rendBtnTable()}
      {renderDialog()}
    </el-main>
  );
};

/**
 *  按钮hooK
 * @param state
 * @returns
 */
const useBtnTable = (
  state: MenuListState,
  openBtnDialog: OpenDialogFunc,
  getBtnlist: () => void
) => {
  const btnCols = ref([
    {
      prop: "id",
      label: "编号",
      align: "center",
      width: 55,
    },
    {
      prop: "name",
      label: "按钮名",
      align: "center",
    },
    {
      prop: "code",
      label: "按钮编码",
      align: "center",
    },
    {
      prop: "orderNum",
      label: "排序",
      align: "center",
    },
  ]);

  const tableAction = {
    width: 130,
    buttons: [
      {
        title: "编辑",
        type: "primary",
        click: ({ row }: RowScoped<Menu>) => openBtnDialog(false, row),
        permission: "menu:editbtn",
      },
      {
        title: "删除",
        type: "danger",
        click: ({ row }: RowScoped<Menu>) => handleDelete(row.id),
        permission: "menu:delbtn",
      },
    ],
  };

  const handleAddBtn = () => {
    openBtnDialog(true);
  };

  const handleDelete = (id: number) => {
    $EmMsgBox.warning("确定永久删除当前按钮吗,请谨慎操作!", {}).then(async () => {
      deleteMenu({ id }).then(() => {
        getBtnlist();
        $EmMsg.success("删除成功");
      });
    });
  };

  return () => (
    <>
      <div class="btn">
        <el-button
          type="primary"
          icon="plus"
          onClick={() => handleAddBtn()}
          v-permission="menu:addbtn"
        >
          添加按钮
        </el-button>
      </div>
      <em-table data={state.currBtns} cols={btnCols.value} action={tableAction}></em-table>
    </>
  );
};
