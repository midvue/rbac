import { ElTree } from "element-plus";
import { reactive, ref } from "vue";
import type { Menu } from "../../../menuMg/types";
import { getRoleMenuPermit, updateMenuPermit } from "../../api";
import type { OpenPerrDialogFunc, Role } from "../../types";

interface PeState {
  form: Partial<Role>;
  isShow: boolean;
  menuTree: Array<Menu>;
}
type ElTreeInstance = InstanceType<typeof ElTree> & { setExpandedKeys: (keys: any) => void };

export const usePerrDialog = () => {
  const treeRef = ref<ElTreeInstance>();
  const rState: PeState = reactive({
    form: {},
    isShow: false,
    menuTree: [],
  });

  //获取菜单列表
  const getMenuTreeList = () => {
    getRoleMenuPermit({ id: rState.form.id }).then((res) => {
      const { list = [], menuIds } = res.data || {};
      const expandKeys: Array<number> = [];
      //list to tree
      rState.menuTree = list
        .filter((item) => {
          expandKeys.push(item.id);
          const children = list
            .filter((child) => {
              return item.id === child.pid;
            })
            .sort((a, b) => a.orderNum - b.orderNum);
          item.children = children;
          return item.pid === 0;
        })
        .sort((a, b) => a.orderNum - b.orderNum);

      treeRef.value?.setExpandedKeys(expandKeys);
      setTimeout(() => {
        treeRef.value?.setCheckedKeys(menuIds);
      }, 0);
    });
  };

  const handleSubmit = async () => {
    const params = { menuIds: treeRef.value!.getCheckedKeys(), roleId: rState.form.id };
    updateMenuPermit(params).then(() => {
      $EmMsg.success("操作成功");
      handleClose();
    });
  };

  const handleClose = async () => {
    rState.isShow = false;
    rState.form = {};
    rState.menuTree = [];
  };

  const openPerrDialog: OpenPerrDialogFunc = (form = {}) => {
    rState.form = Object.assign({ status: 1 }, form);
    getMenuTreeList();
    rState.isShow = true;
  };

  //深度替换选中状态
  const setDeepChecked = (data: Menu, isCheckd: boolean) => {
    if (data.children?.length) {
      //父级状态切换,子集跟着全部切换
      data.children.forEach((child) => {
        treeRef.value!.setChecked(child.id, isCheckd, true);
        setDeepChecked(child, isCheckd);
      });
    }
  };

  const handleCheckChange = async (data: Menu, isCheckd: boolean) => {
    //节点选中,父节点也跟着选中
    if (isCheckd && data.pid) {
      treeRef.value!.setChecked(data.pid, isCheckd, true);
    }

    //节点取消,判断子节点是否跟着取消
    if (!data.children?.length) return;
    if (!isCheckd) {
      const res = await $EmMsgBox
        .warning(`取消 (${data.name}) 页面 , 是否也将其下面的子菜单一起取消, 确定嘛! `, "警告", {
          cancelButtonText: "不一起",
          confirmButtonText: "确定",
        })
        .catch(() => false);
      if (!res) return;
    }
    setDeepChecked(data, isCheckd);
  };

  const treeProps = {
    value: "id",
    label: "name",
    children: "children",
  };

  return {
    openPerrDialog,
    render: () => (
      <div class="form-dialog">
        <el-dialog
          v-model={rState.isShow}
          title="分配权限"
          width="30%"
          onClose={handleClose}
          height={700}
        >
          <el-tree-v2
            class="tree"
            ref={treeRef}
            data={rState.menuTree}
            props={treeProps}
            highlight-current
            check-strictly
            height={600}
            node-key="id"
            show-checkbox
            onCheckChange={handleCheckChange}
          ></el-tree-v2>
          <div class="form-footer">
            <el-button onClick={() => handleClose()}>取消</el-button>
            <el-button type="primary" onClick={() => handleSubmit()}>
              保存
            </el-button>
          </div>
        </el-dialog>
      </div>
    ),
  };
};
