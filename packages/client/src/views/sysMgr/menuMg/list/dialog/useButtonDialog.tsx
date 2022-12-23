import { reactive, ref } from "vue";
import { addMenu, updateMenu } from "../../api";
import type { OpenDialogFunc, Menu, MenuListState } from "../../types";
import type { FormRules } from "element-plus";

interface IfState {
  form: Partial<Menu>;
  isShow: boolean;
  isAdd: boolean;
}

export const useButtonDialog = (state: MenuListState, getBtnlist: () => void) => {
  const formRef = ref<HTMLFormElement>();
  const mState: IfState = reactive({
    form: {},
    isShow: false,
    isAdd: false,
  });

  const rules = reactive<FormRules>({
    name: [
      { required: true, message: "请输入按钮名", trigger: "blur" },
      { min: 2, max: 12, message: "长度必须是2-12位", trigger: "blur" },
    ],
    code: [{ required: true, message: "请输入按钮编码", trigger: "blur" }],
  });

  const handleSubmit = async () => {
    const res = await formRef.value?.validate().catch(() => false);
    if (!res) return;
    let userApi;
    if (mState.isAdd) {
      userApi = addMenu;
    } else {
      userApi = updateMenu;
    }
    const postData = Object.assign({}, mState.form);
    postData.type = 2;
    postData.pid = state.currNodes[0].id;
    userApi(postData).then(() => {
      getBtnlist();
      $EmMsg.success("操作成功");
      handlCancel();
    });
  };

  const handlCancel = async () => {
    await formRef.value?.clearValidate();
    mState.isShow = false;
    mState.form = {};
  };

  const openBtnDialog: OpenDialogFunc = (isAdd, form = {}) => {
    mState.form = Object.assign({}, form, { gender: 1 });
    mState.isAdd = isAdd;
    mState.isShow = true;
  };

  // const props = {
  //   checkStrictly: true,
  // };

  return {
    openBtnDialog,
    render: () => (
      <div class="form-dialog">
        <el-dialog
          v-model={mState.isShow}
          title={mState.isAdd ? "新增按钮" : "修改按钮"}
          width="30%"
          onClose={handlCancel}
        >
          <el-form
            ref={formRef}
            class="el-form"
            model={mState.form}
            label-width="100px"
            rules={rules}
          >
            <el-form-item label="按钮名称" required prop="name">
              <el-input v-model={mState.form.name} placeholder="请输入按钮名称" />
            </el-form-item>
            <el-form-item label="按钮编码" required prop="code">
              <el-input v-model={mState.form.code} placeholder="请输入按钮编码" />
            </el-form-item>
            <el-form-item label="排序">
              <el-input-number
                v-model={mState.form.orderNum}
                min={0}
                max={100}
                placeholder="请输入数字"
              />
            </el-form-item>
            <el-form-item label="权限" prop="permissions">
              <el-input-number
                v-model={mState.form.permissions}
                min={0}
                max={100}
                placeholder="请输入数字"
              />
            </el-form-item>
            <el-form-item>
              <div class="form-footer">
                <el-button onClick={() => handlCancel()}>取消</el-button>
                <el-button type="primary" onClick={() => handleSubmit()}>
                  保存
                </el-button>
              </div>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
    ),
  };
};
