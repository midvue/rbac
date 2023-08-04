import type { BtnListState } from "../types";

export const useSearchForm = (state: BtnListState, getSearchList: () => void) => {
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
        <el-form-item label="按钮id">
          <el-input v-model={state.searcForm.id} placeholder="请输入用户id" clearable />
        </el-form-item>
        <el-form-item label="按钮名称">
          <el-input v-model={state.searcForm.name} placeholder="请输入用户名称" clearable />
        </el-form-item>
        <el-form-item label="按钮编码">
          <el-input v-model={state.searcForm.code} placeholder="请输入用户名称" clearable />
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
