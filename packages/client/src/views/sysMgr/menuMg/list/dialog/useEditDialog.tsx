import { reactive, ref } from "vue";
import { addMenu, updateMenu } from "../../api";
import type { OpenDialogFunc, Menu, MenuListState } from "../../types";
import type { FormRules } from "element-plus";

interface IfState {
  form: Partial<Menu>;
  isShow: boolean;
  isAdd: boolean;
}

export const useEditDialog = (state: MenuListState, getSearchList: () => void) => {
  const formRef = ref<HTMLFormElement>();
  const mState: IfState = reactive({
    form: {},
    isShow: false,
    isAdd: false,
  });

  const rules = reactive<FormRules>({
    name: [
      { required: true, message: "请输入菜单名", trigger: "blur" },
      { min: 3, max: 12, message: "长度必须是3-12位", trigger: "blur" },
    ],
    code: [{ required: true, message: "请输入编码", trigger: "blur" }],
    url: [{ required: true, message: "请输入url", trigger: "blur" }],
    pids: [{ required: true, message: "请选择父级", trigger: "blur" }],
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
    mState.form.type = 1;
    mState.form.pid = mState.form.pids?.[mState.form.pids?.length - 1];
    delete mState.form.pids;
    userApi(mState.form).then(() => {
      getSearchList();
      $EmMsg.success("操作成功");
      handlCancel();
    });
  };

  const handlCancel = async () => {
    await formRef.value?.clearValidate();
    mState.isShow = false;
    mState.form = {};
  };

  const openDialog: OpenDialogFunc = (isAdd, form = {}) => {
    mState.form = Object.assign({ keepAlive: 0, isShow: 0 }, form);
    mState.form.pids = [mState?.form?.pid] as number[];
    mState.isAdd = isAdd;
    mState.isShow = true;
  };

  const props = {
    checkStrictly: true,
    value: "id",
    label: "name",
    children: "children",
  };

  return {
    openDialog,
    render: () => (
      <div class="form-dialog">
        <el-dialog
          v-model={mState.isShow}
          title={mState.isAdd ? "新增菜单" : "修改菜单"}
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
            <el-form-item label="菜单名称" required prop="name">
              <el-input v-model={mState.form.name} placeholder="请输入菜单名称" />
            </el-form-item>
            <el-form-item label="编码" required prop="code">
              <el-input v-model={mState.form.code} placeholder="请输入编码" />
            </el-form-item>
            <el-form-item label="url" required prop="url">
              <el-input v-model={mState.form.url} placeholder="请输入url" />
            </el-form-item>
            <el-form-item label="父级菜单" required prop="pids">
              <el-cascader
                v-model={mState.form.pids}
                options={state.menuTree}
                props={props}
                clearable
                style={{ width: "100%" }}
              />
            </el-form-item>
            <el-form-item label="图标">
              <el-input v-model={mState.form.icon} placeholder="请输入图标" />
            </el-form-item>
            <el-form-item label="排序">
              <el-input-number
                v-model={mState.form.orderNum}
                min={0}
                max={100}
                placeholder="请输入数字"
              />
            </el-form-item>
            <el-form-item label="是否显示">
              <el-radio-group v-model={mState.form.isShow}>
                <el-radio label={true}>显示</el-radio>
                <el-radio label={false}>隐藏</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否缓存">
              <el-radio-group v-model={mState.form.keepAlive}>
                <el-radio label={true}>是</el-radio>
                <el-radio label={false}>否</el-radio>
              </el-radio-group>
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
