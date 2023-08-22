import type { OpenDialogFunc, User, UserListState } from "../types";
import { deleteUser } from "../api";
import { ref } from "vue";

export const useList = (
  state: UserListState,
  openDialog: OpenDialogFunc,
  getSearchList: () => void
) => {
  const handleAdd = () => {
    openDialog(true);
  };

  const handleEdit = (row: User) => {
    openDialog(false, row);
  };

  const handleDelete = (id: number) => {
    $EmMsgBox.warning("确定永久删除当前用户嘛,请谨慎操作!", {}).then(async () => {
      deleteUser({ id }).then(() => {
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

  const cols = ref([
    {
      prop: "id",
      label: "序号",
      align: "center",
      width: 55,
    },
    {
      prop: "account",
      label: "账号",
      align: "center",
    },
    {
      prop: "nickname",
      label: "昵称",
      align: "center",
    },
    {
      prop: "phone",
      label: "手机号",
      align: "center",
    },
    {
      prop: "roleName",
      label: "角色",
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
      align: "center",
    },
    {
      prop: "updateTime",
      label: "更新时间",
      align: "center",
    },
  ]);

  const tableAction = {
    width: 210,
    buttons: [
      {
        title: "编辑",
        type: "primary",
        click: ({ row }: RowScoped<User>) => handleEdit(row),
        permission: "Edit",
      },
      {
        title: "删除",
        type: "danger",
        click: ({ row }: RowScoped<User>) => handleDelete(row.id),
        permission: "Del",
      },
    ],
  };

  return () => (
    <>
      <div class="toolbar">
        <el-button type="primary" icon="plus" onClick={() => handleAdd()} v-permission="Add">
          添加用户
        </el-button>
      </div>
      <em-table data={state.userList} cols={cols.value} action={tableAction}></em-table>
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
