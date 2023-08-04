import { reactive, ref } from "vue";
import { addMenu, updateMenu } from "../../api";
import type { OpenDialogFunc, Menu, MenuListState } from "../../types";
import type { EmFormType } from "@/components";
import { EnumMenuType } from "@/views/sysMgr/constant";

interface IfState {
  form: Partial<Menu>;
  isShow: boolean;
  isAdd: boolean;
}
/**
 * 基础按钮弹窗
 * @param state
 * @param getBtnlist
 * @returns
 */
export const useBtnDialog = (state: MenuListState, getBtnlist: () => void) => {
  const formRef = ref<EmFormType.Instance>();
  const bState: IfState = reactive({
    form: {},
    isShow: false,
    isAdd: false,
  });

  const handleSubmit = async () => {
    const res = await formRef.value?.validate();
    if (!res) return;
    const apiFunc = bState.isAdd ? addMenu : updateMenu;
    const postData = Object.assign({}, bState.form);
    postData.type = EnumMenuType.BUTTON;
    postData.pid = state.currNodes[0].id;
    apiFunc(postData).then(() => {
      getBtnlist();
      $EmMsg.success("操作成功");
      handlCancel();
    });
  };

  const handlCancel = async () => {
    formRef.value?.clearValidate();
    bState.isShow = false;
  };

  const items: EmFormType.Items = [
    {
      label: "按钮名称",
      field: "name",
      render: () => {
        return <el-input v-model={bState.form.name} placeholder="请输入按钮名称" />;
      },
      rules: [
        {
          required: true,
          message: "请输入按钮名称",
          trigger: "blur",
        },
      ],
    },
    {
      label: "按钮编码",
      field: "code",
      render: () => {
        return (
          <el-input
            v-model={bState.form.code}
            placeholder="请输入按钮编码"
            onInput={(code: string) => {
              code = code.replace(/\W/g, "");
              bState.form.code = code!.slice(0, 1).toUpperCase() + code!.slice(1);
            }}
          />
        );
      },
      rules: {
        required: true,
        message: "请输入按钮编码",
        trigger: "blur",
      },
    },
    {
      label: "按钮图标",
      field: "icon",
      render: () => {
        return <el-input v-model={bState.form.icon} placeholder="请输入按钮图标" />;
      },
    },
    {
      label: "排序",
      field: "orderNum",
      render: () => {
        return <el-input-number v-model={bState.form.orderNum} placeholder="请输入排序" />;
      },
      rules: [
        {
          required: true,
          message: "请输入排序",
          trigger: "blur",
        },
      ],
    },
  ];

  const openDialog: OpenDialogFunc = (form = {}) => {
    bState.isAdd = !form.id;
    bState.form = Object.assign({}, form);
    bState.isShow = true;
  };

  return {
    openDialog,
    render: () => (
      <div class="form-dialog">
        <el-dialog
          v-model={bState.isShow}
          title={bState.isAdd ? "添加按钮" : "修改按钮"}
          width="600px"
          center
          onClose={handlCancel}
        >
          {{
            default: () => (
              <em-form ref={formRef} model={bState.form} items={items} class="tz-form"></em-form>
            ),
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
