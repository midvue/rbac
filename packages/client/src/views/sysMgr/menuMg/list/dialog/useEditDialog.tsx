import { EmFormType } from "@/components";
import { reactive, ref } from "vue";
import { addMenu, updateMenu } from "../../api";
import type { Menu, MenuListState, OpenDialogFunc } from "../../types";

interface IfState {
  form: Partial<Menu>;
  isShow: boolean;
  isAdd: boolean;
}

export const useEditDialog = (state: MenuListState, getSearchList: () => void) => {
  const formRef = ref<EmFormType.Instance>();
  const mState: IfState = reactive({
    form: {},
    isShow: false,
    isAdd: false,
  });

  const items: EmFormType.Items = [
    {
      label: "父级菜单",
      field: "pids",
      render: () => (
        <el-cascader
          v-model={mState.form.pids}
          options={state.menuTree}
          props={{
            checkStrictly: true,
            value: "id",
            label: "name",
            children: "children",
          }}
          clearable
          style={{ width: "100%" }}
        />
      ),
      rules: [{ required: true, message: "请选择父级", trigger: "blur" }],
    },
    {
      label: "菜单名称",
      field: "name",
      render: () => <el-input v-model={mState.form.name} placeholder="请输入菜单名称"></el-input>,
      rules: [
        { required: true, message: "请输入菜单名", trigger: "blur" },
        { min: 3, max: 12, message: "长度必须是3-12位", trigger: "blur" },
      ],
    },
    {
      label: "编码",
      field: "code",
      render: () => <el-input v-model={mState.form.code} placeholder="请输入编码"></el-input>,
      rules: [{ required: true, message: "请输入编码", trigger: "blur" }],
    },
    {
      label: "路由地址",
      field: "url",
      render: () => <el-input v-model={mState.form.url} placeholder="请输入路由地址"></el-input>,
      rules: [{ required: true, message: "请输入路由地址", trigger: "blur" }],
    },

    {
      label: "图标",
      field: "icon",
      render: () => <el-input v-model={mState.form.icon} placeholder="请输入图标" />,
    },
    {
      label: "排序",
      field: "orderNum",
      render: () => (
        <el-input-number
          v-model={mState.form.orderNum}
          min={0}
          max={100}
          placeholder="请输入数字"
        />
      ),
      rules: [{ required: true, message: "请输入排序号", trigger: "blur" }],
    },

    {
      label: "是否显示",
      field: "isShow",
      render: () => (
        <el-radio-group v-model={mState.form.isShow}>
          <el-radio label={true}>显示</el-radio>
          <el-radio label={false}>隐藏</el-radio>
        </el-radio-group>
      ),
    },
    {
      label: "是否缓存",
      field: "keepAlive",
      render: () => (
        <el-radio-group v-model={mState.form.keepAlive}>
          <el-radio label={true}>是</el-radio>
          <el-radio label={false}>否</el-radio>
        </el-radio-group>
      ),
    },
  ];

  const handleSubmit = async () => {
    const res = await formRef.value?.validate().catch(() => false);
    if (!res) return;
    const apiFunc = mState.isAdd ? addMenu : updateMenu;
    mState.form.type = 1;
    mState.form.pid = mState.form.pids?.[mState.form.pids?.length - 1];
    delete mState.form.pids;
    apiFunc(mState.form).then(() => {
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

  const openDialog: OpenDialogFunc = (form = {}) => {
    mState.isAdd = !form.id;
    mState.form = Object.assign({ keepAlive: 0, isShow: 0 }, form);
    mState.form.pids = [mState?.form?.pid] as number[];
    mState.isShow = true;
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
          {{
            default: () => <em-form ref={formRef} model={mState.form} items={items}></em-form>,
            footer: () => (
              <div class="form-footer">
                <el-button onClick={() => handlCancel()}>取消</el-button>
                <el-button type="primary" onClick={() => handleSubmit()}>
                  保存
                </el-button>
              </div>
            ),
          }}
        </el-dialog>
      </div>
    ),
  };
};
