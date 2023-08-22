import { useDebounceFn } from "@vueuse/core";
import { ElTree } from "element-plus";
import { reactive, watch } from "vue";
import { getMenuInfo } from "../api";
import type { Menu, MenuListState, OpenDialogFunc } from "../types";
interface TreeState {
  inputValue: string;
  showInput: boolean;
  isExpand: boolean;
  menuTree: Array<Menu>;
  expandKeys: Array<number>;
}
type ElTreeInstance = InstanceType<typeof ElTree> & { setExpandedKeys: (keys: any) => void };

export const useTree = (state: MenuListState, openMenuDialog: OpenDialogFunc) => {
  const treeRef = $ref<ElTreeInstance>();

  const tState: TreeState = reactive({
    inputValue: "",
    showInput: false,
    isExpand: true,
    menuTree: [],
    expandKeys: [],
  });

  const treeProps = {
    value: "id",
    label: "name",
    children: "children",
  };

  const list2Tree = () => {
    const expandKeys: Array<number> = [];
    tState.menuTree = state.menuList
      .filter((item) => {
        expandKeys.push(item.id);
        const children = state.menuList
          .filter((child) => {
            return item.id === child.pid;
          })
          .sort((a, b) => a.orderNum - b.orderNum);
        item.children = children;
        return item.pid === 0;
      })
      .sort((a, b) => a.orderNum - b.orderNum);
    //设置展开
    tState.expandKeys = expandKeys;
    treeRef?.setExpandedKeys(expandKeys);
    handleNodeClick(tState.menuTree[0]);
    state.menuTree = Object.assign([], tState.menuTree);
    state.menuTree.unshift({ id: 0, name: "无" });
  };

  watch(() => state.menuList.length, list2Tree);

  //点击菜单节点
  const handleNodeClick = async ({ id }: Menu) => {
    const { data } = await getMenuInfo({ id });
    state.currNodes = [data];
  };

  //切换折叠和展开
  const handleToggleExpand = () => {
    const expandKeys = tState.isExpand ? [] : tState.expandKeys;
    treeRef!.setExpandedKeys(expandKeys);
    tState.isExpand = !tState.isExpand;
  };

  const hanldeInput = useDebounceFn((query: string) => {
    treeRef!.filter(query);
  }, 300);

  return () => (
    <el-aside width="260px" class="aside">
      <div class="btns">
        <el-button type="primary" onClick={() => openMenuDialog()} vPermission="Add">
          新增菜单
        </el-button>
        <el-button type="primary" onClick={() => handleToggleExpand()}>
          {tState.isExpand ? "折叠" : "展开"}
        </el-button>
        <el-button
          type={tState.showInput ? "info" : "primary"}
          onClick={() => (tState.showInput = !tState.showInput)}
        >
          {tState.showInput ? "关闭搜索" : "搜索"}
        </el-button>
      </div>
      <el-input
        v-show={tState.showInput}
        class="a-input"
        v-model={tState.inputValue}
        placeholder="请输入菜单名"
        clearable
        onInput={hanldeInput}
      ></el-input>

      <el-tree-v2
        class="tree"
        ref={$$(treeRef)}
        data={tState.menuTree}
        props={treeProps}
        highlight-current
        itemSize={36}
        height={700}
        node-key="id"
        defaultExpandedKeys={tState.expandKeys}
        filter-method={(v: string, node: Menu) => node.name.includes(v)}
        onNodeClick={handleNodeClick}
      ></el-tree-v2>
    </el-aside>
  );
};
