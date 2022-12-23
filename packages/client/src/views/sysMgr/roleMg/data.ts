// 0:通用,1:货代,2:香港,3:大陆,4:海运,5:报关单,6:电商
export const systemTypeInfo = {
  0: "通用",
  1: "货代",
  2: "香港关务",
  3: "大陆报关",
  4: "海运舱单",
  5: "报关单",
  6: "跨境电商",
};

export const systemTypeList = Object.entries(systemTypeInfo).map(
  ([key, label]) => {
    return { label: label, value: Number(key) };
  }
);

// 1:pdf,2:word,3:excel
export const downloadTypeInfo = {
  1: "pdf",
  2: "word",
  3: "excel",
};

export const downloadTypeList = Object.entries(downloadTypeInfo).map(
  ([key, label]) => {
    return { label: label, value: key };
  }
);

export const operateTypeInfo = {
  insert: "添加",
  delete: "删除",
  update: "更新",
  reset: "还原",
};

export const operateTypeList = Object.entries(operateTypeInfo).map(
  ([key, label]) => {
    return { label: label, value: key };
  }
);
