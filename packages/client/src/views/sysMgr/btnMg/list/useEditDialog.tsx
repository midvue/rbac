import { reactive, ref } from "vue";
import { addBtn, updateBtn } from "../api";
import type { OpenDialogFunc, Btn, BtnListState } from "../types";
import type { FormRules } from "element-plus";
import { EmFormType } from "@/components";

interface BState {
  form: Partial<Btn>;
  isShow: boolean;
  isAdd: boolean;
}

export const useEditDialog = (state: BtnListState, getSearchList: () => void) => {
  const formRef = ref<HTMLFormElement>();
  const bState: BState = reactive({
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
    const apiFunc = bState.isAdd ? addBtn : updateBtn;
    apiFunc(bState.form).then(() => {
      getSearchList();
      $EmMsg.success("操作成功");
      handlCancel();
    });
  };

  const handlCancel = async () => {
    formRef.value?.clearValidate();
    bState.isShow = false;
  };

  const openDialog: OpenDialogFunc = async (form = {}) => {
    bState.isAdd = !form.id;
    bState.form = Object.assign({}, form);
    bState.isShow = true;
  };

  const items: EmFormType.Items = [
    {
      label: "按钮名称",
      field: "name",
      render: () => <el-input v-model={bState.form.name} placeholder="请输入按钮名称" />,
      rules: [{ required: true, message: "请输入按钮名称", trigger: "blur" }],
    },
    {
      label: "按钮编码",
      field: "code",
      render: () => (
        <el-input
          v-model={bState.form.code}
          placeholder="请输入按钮编码"
          onInput={(code: string) => {
            code = code.replace(/\W/g, "");
            bState.form.code = code!.slice(0, 1).toUpperCase() + code!.slice(1);
          }}
        />
      ),
      rules: [{ required: true, message: "请输入按钮编码", trigger: "blur" }],
    },
    {
      label: "按钮图标",
      field: "icon",
      render: () => <el-input v-model={bState.form.icon} placeholder="请输入按钮图标" />,
    },
    {
      label: "按钮排序",
      field: "orderNum",
      render: () => <el-input-number v-model={bState.form.orderNum} placeholder="排序号" />,
      rules: [{ required: true, message: "请输入按钮排序", trigger: "blur" }],
    },
    {
      label: "备注",
      field: "remark",
      render: () => (
        <el-input
          type="textarea"
          rows={3}
          v-model={bState.form.remark}
          placeholder="请输入备注"
          maxlength={128}
        />
      ),
    },
  ];
  return {
    openDialog,
    render: () => (
      <div class="form-dialog">
        <el-dialog
          v-model={bState.isShow}
          title={bState.isAdd ? "新增按钮" : "修改按钮"}
          width="540px"
          center
          onClose={handlCancel}
        >
          {{
            default: () => <em-form ref={formRef} model={bState.form} items={items}></em-form>,
            footer: () => (
              <div class="form-footer">
                <el-button onClick={() => handlCancel()}>取消</el-button>
                <el-button type="primary" onClick={() => handleSubmit()}>
                  确定
                </el-button>
              </div>
            ),
          }}
        </el-dialog>
      </div>
    ),
  };
};
