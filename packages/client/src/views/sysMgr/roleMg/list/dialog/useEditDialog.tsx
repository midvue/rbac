import { reactive, ref } from "vue";
import { addRole, updateRole } from "../../api";
import { getUserInfo } from "@/utils";
import type { OpenDialogFunc, Role } from "../../types";
import type { FormRules } from "element-plus";

interface IfState {
  form: Partial<Role>;
  isShow: boolean;
  isAdd: boolean;
}
export const useEditDialog = (getSearchList: () => void) => {
  const formRef = ref<HTMLFormElement>();
  const uState: IfState = reactive({
    form: {},
    isShow: false,
    isAdd: false,
  });

  const { roles: roleList, id: uid } = getUserInfo() || {};

  const rules = reactive<FormRules>({
    name: [{ required: true, message: "请输入角色名", trigger: "blur" }],
    code: [{ required: true, message: "请输入角色编码", trigger: "blur" }],
    pid: [{ required: true, message: "请选择父角色", trigger: "blur" }],
  });

  const handleSubmit = async () => {
    const res = await formRef.value?.validate().catch(() => false);

    if (!res) return;

    let userApi;
    if (uState.isAdd) {
      userApi = addRole;
    } else {
      userApi = updateRole;
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

  const openDialog: OpenDialogFunc = (isAdd, form = {}) => {
    uState.form = Object.assign({ status: 1 }, form);
    uState.isAdd = isAdd;
    uState.isShow = true;
  };

  return {
    openDialog,
    render: () => (
      <div class="form-dialog">
        <el-dialog
          v-model={uState.isShow}
          title={uState.isAdd ? "新增角色" : "编辑角色"}
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
            <el-form-item label="角色名称" required prop="name">
              <el-input v-model={uState.form.name} placeholder="请输入角色名称" />
            </el-form-item>
            <el-form-item label="角色编码" required prop="code">
              <el-input v-model={uState.form.code} placeholder="请输入角色编码" />
            </el-form-item>
            {uid != 1 && (
              <el-form-item label="父级角色" required prop="pid">
                <el-select v-model={uState.form.pid} placeholder="请选择父级角色" clearable>
                  {roleList?.map((item) => (
                    <el-option key={item.roleId} label={item.roleName} value={item.roleId} />
                  ))}
                </el-select>
              </el-form-item>
            )}
            <el-form-item label="状态">
              <el-radio-group v-model={uState.form.status}>
                <el-radio-button label={0}>禁用</el-radio-button>
                <el-radio-button label={1}>启用</el-radio-button>
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
