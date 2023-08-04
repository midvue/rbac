import { EnumMenuType, ROOT_MENU_PID } from "@/views/sysMgr/constant";
import { reactive } from "vue";
import { addBatchMenu, getBasicBtnList } from "../../api";
import type { Menu, MenuListState } from "../../types";

interface DState {
  list: Menu[];
  checkAll: boolean;
  checkCodes: string[];
  isShow: boolean;
}
/**
 * 基础按钮弹窗
 * @param state
 * @returns
 */
export const useBasicBtnDialog = (state: MenuListState, getBtnlist: () => void) => {
  const bState: DState = reactive({
    isShow: false,
    list: [],
    checkAll: false,
    checkCodes: [],
  });

  const allCodes: string[] = [];
  let pid = ROOT_MENU_PID;

  const handleSubmit = async () => {
    const btns = bState.list
      .filter((btn) => bState.checkCodes.includes(btn.code) && !btn.disabled)
      .map((btn) => {
        const { code, name, orderNum, icon } = btn;
        return { code, name, orderNum, icon, pid, type: EnumMenuType.BUTTON };
      });
    addBatchMenu(btns).then(() => {
      $EmMsg.success("操作成功");
      getBtnlist();
      handlCancel();
    });
  };

  const handlCancel = async () => {
    bState.isShow = false;
  };

  const handleCheckAllChange = (isCheck: boolean) => {
    bState.checkCodes = isCheck ? allCodes : [];
  };

  const handleChecked = () => {
    bState.checkAll = bState.checkCodes.length === allCodes.length;
  };

  const getList = () => {
    getBasicBtnList().then((res) => {
      const list = res.data.list || [];
      //设置是否禁用
      list.forEach((item) => {
        item.disabled = bState.checkCodes.includes(item.code);
        allCodes.push(item.code);
      });
      //过来掉传过来的自定义的多余的code
      bState.checkCodes = bState.checkCodes.filter((code) => allCodes.includes(code));
      //设置是否全选
      bState.checkAll = bState.checkCodes.length === allCodes.length;
      bState.list = list;
    });
  };

  const openDialog = (_pid: number, codes: string[]) => {
    pid = _pid;
    bState.checkCodes = codes;
    getList();
    bState.isShow = true;
  };

  return {
    openDialog,
    render: () => (
      <div class="form-dialog">
        <el-dialog
          v-model={bState.isShow}
          title="同步基础按钮"
          width="600px"
          center
          onClose={handlCancel}
        >
          {{
            default: () => (
              <>
                <el-checkbox v-model={bState.checkAll} onChange={handleCheckAllChange}>
                  全选
                </el-checkbox>
                <el-checkbox-group v-model={bState.checkCodes} onChange={handleChecked}>
                  {bState.list.map((btn) => (
                    <el-checkbox key={btn.code} label={btn.code} disabled={btn.disabled}>
                      {btn.name}
                    </el-checkbox>
                  ))}
                </el-checkbox-group>
              </>
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
