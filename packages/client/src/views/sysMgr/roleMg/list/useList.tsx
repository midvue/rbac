import type { OpenDialogFunc, Role, RoleListState, OpenPerrDialogFunc } from "../types";
import { deleteRole, updateRoleStatus } from "../api";
import { ref } from "vue";

export const useList = (
  state: RoleListState,
  openDialog: OpenDialogFunc,
  openPerrDialog: OpenPerrDialogFunc,
  getSearchList: () => void
) => {
  const handleAdd = () => {
    openDialog(true);
  };

  const handleEdit = (row: Role) => {
    openDialog(false, row);
  };

  const handleDelete = (id: number) => {
    $EmMsgBox.warning("确定永久删除当前角色吗,请谨慎操作!", {}).then(async () => {
      deleteRole({ id }).then(() => {
        getSearchList!();
        $EmMsg.success("删除成功");
      });
    });
  };

  const handleSizeChange = (size: number) => {
    state.pagination.size = size;
    getSearchList();
  };
  const handleCurrentChange = (current: number) => {
    state.pagination.current = current;
    getSearchList();
  };

  const handlechangeStatus = ({ id, status }: Role) => {
    updateRoleStatus({ id, status })
      .then(() => $EmMsg.success(`${status === 0 ? "已禁用" : "已启用"}`))
      .catch(() => getSearchList());
  };

  const handlePermission = (row: Role) => {
    openPerrDialog(row);
  };

  const cols = ref([
    {
      prop: "id",
      label: "角色id",
      width: 80,
      align: "center",
    },
    {
      prop: "name",
      label: "角色名称",
      width: 150,
      align: "center",
    },
    {
      prop: "code",
      label: "角色编码",
      width: 150,
      align: "center",
    },
    {
      prop: "order",
      label: "排序",
      width: 80,
      align: "center",
    },
    {
      prop: "status",
      label: "状态",
      width: 130,
      align: "center",
      render: ({ row }: RowScoped<Role>) => (
        <el-switch
          v-model={row.status}
          inline-prompt
          active-text="已启用"
          inactive-text="已禁用"
          size="large"
          width="72px"
          active-value={1}
          inactive-value={0}
          onChange={() => handlechangeStatus(row)}
        />
      ),
    },
    {
      prop: "pid",
      label: "创建者",
      width: 150,
      align: "center",
    },
    {
      prop: "remark",
      label: "备注",
      align: "center",
    },
    {
      prop: "createTime",
      label: "创建时间",
      width: 150,
      align: "center",
    },
    {
      prop: "updateTime",
      label: "更新时间",
      width: 150,
      align: "center",
    },
  ]);

  const tableAction = {
    width: 250,
    buttons: [
      {
        title: "分配权限",
        type: "primary",
        click: ({ row }: RowScoped<Role>) => handlePermission(row),
        permission: "Sign",
      },
      {
        title: "编辑",
        type: "primary",
        click: ({ row }: RowScoped<Role>) => handleEdit(row),
        permission: "Edit",
      },
      {
        title: "删除",
        type: "danger",
        click: ({ row }: RowScoped<Role>) => handleDelete(row.id),
        permission: "Del",
      },
    ],
  };

  return () => (
    <>
      <div class="toolbar">
        <el-button type="primary" icon="plus" onClick={() => handleAdd()} v-permission="Add">
          添加角色
        </el-button>
      </div>
      <em-table data={state.roleList} cols={cols.value} action={tableAction}></em-table>
      <div class="footer">
        <el-pagination
          v-model:currentPage={state.pagination.current}
          v-model:page-size={state.pagination.size}
          total={state.pagination.total}
          pageSizes={[10, 20, 30, 50, 100]}
          onSizeChange={handleSizeChange}
          onCurrentChange={handleCurrentChange}
        ></el-pagination>
      </div>
    </>
  );
};
