import type { RoleListState } from "../types";

export const useSearchForm = (state: RoleListState, getSearchList: () => void) => {
  const handleSearch = () => {
    getSearchList();
  };
  handleSearch();

  const handleReset = () => {
    state.searcForm = {};
    getSearchList();
  };

  return () => (
    <div class="search-form">
      <el-form class="el-form" model={state.searcForm} label-width="100px">
        <el-form-item label="角色名称">
          <el-input v-model={state.searcForm.name} placeholder="请输入角色名称" clearable />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model={state.searcForm.status} placeholder="请选择状态" clearable>
            <el-option value={1} label="启用" />
            <el-option value={0} label="禁用" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" onClick={() => handleSearch()}>
            查询
          </el-button>
          <el-button onClick={() => handleReset()}>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  );
};
