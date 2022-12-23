import { reactive, ref } from "vue";
import { addUser, updateUser } from "../api";
import type { OpenDialogFunc, User, UserListState } from "../types";
import type { FormRules } from "element-plus";

interface IfState {
  form: Partial<User>;
  isShow: boolean;
  isAdd: boolean;
}

export const useEditDialog = (state: UserListState, getSearchList: () => void) => {
  const formRef = ref<HTMLFormElement>();
  const uState: IfState = reactive({
    form: {},
    isShow: false,
    isAdd: false,
  });

  const rules = reactive<FormRules>({
    account: [
      { required: true, message: "请输入账号名", trigger: "blur" },
      { min: 3, max: 12, message: "长度必须是3-12位", trigger: "blur" },
    ],
    nickname: [
      { required: true, message: "请输入昵称", trigger: "blur" },
      { min: 3, max: 12, message: "长度必须是3-12位", trigger: "blur" },
    ],
    password: [{ required: true, min: 3, max: 12, message: "长度必须是3-12位", trigger: "blur" }],
    roleIds: [{ required: true, message: "请选择角色", trigger: "blur" }],
  });

  const handleSubmit = async () => {
    const res = await formRef.value?.validate().catch(() => false);
    if (!res) return;
    let userApi;
    if (uState.isAdd) {
      userApi = addUser;
    } else {
      userApi = updateUser;
    }
    userApi(uState.form).then(() => {
      getSearchList();
      $EmMsg.success("操作成功");
      handlCancel();
    });
  };

  const handlCancel = async () => {
    await formRef.value?.clearValidate();
    uState.isShow = false;
    uState.form = {};
  };

  const openDialog: OpenDialogFunc = async (isAdd, form = {}) => {
    uState.form = Object.assign({ gender: 0 }, form);
    uState.form.roleIds = form.roleId?.split(",").map((rid) => Number(rid));
    uState.isAdd = isAdd;
    uState.isShow = true;
  };

  return {
    openDialog,
    render: () => (
      <div class="form-dialog">
        <el-dialog
          v-model={uState.isShow}
          title={uState.isAdd ? "新增用户" : "修改用户"}
          width="30%"
          onClose={handlCancel}
        >
          <el-form
            ref={formRef}
            class="el-form"
            model={uState.form}
            label-width="100px"
            rules={rules}
          >
            <el-form-item label="账号名" required prop="account">
              <el-input v-model={uState.form.account} placeholder="请输入用户名" />
            </el-form-item>
            <el-form-item label="用户名" required prop="nickname">
              <el-input v-model={uState.form.nickname} placeholder="请输入用户名" />
            </el-form-item>
            <el-form-item label="昵称">
              <el-input v-model={uState.form.nickname} placeholder="请输入昵称" />
            </el-form-item>
            <el-form-item label="密码" required prop="password">
              <el-input v-model={uState.form.password} placeholder="请输入密码" type="password" />
            </el-form-item>
            <el-form-item label="角色" required prop="roleIds">
              <el-select
                v-model={uState.form.roleIds}
                multiple
                placeholder="请选择角色"
                style={{ width: "100%" }}
                clearable
              >
                {state.roleList.map((item) => (
                  <el-option key={item.id} label={item.name} value={item.id} />
                ))}
              </el-select>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model={uState.form.phone} placeholder="请输入手机号" maxlength={11} />
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model={uState.form.gender}>
                <el-radio label={0}>男</el-radio>
                <el-radio label={1}>女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="备注">
              <el-input
                type="textarea"
                rows={3}
                v-model={uState.form.remark}
                placeholder="请输入备注"
                maxlength={128}
              />
            </el-form-item>
            <el-form-item>
              <div class="form-footer">
                <el-button onClick={() => handlCancel()}>取消</el-button>
                <el-button type="primary" onClick={() => handleSubmit()}>
                  确定
                </el-button>
              </div>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
    ),
  };
};
