import { reactive } from '@vue/composition-api';
export function paginationHook() {
  const pageData = reactive({
    currentPage: 1,
    pageSize: 3,
    pageSizes: [3, 6, 10, 20],
    total: 0
  });
  const totalCount = val => {
    pageData.total = val;
  };
  const handleSizeChange = val => {
    pageData.pageSize = val;
  };
  const handleCurrentChange = val => {
    pageData.currentPage = val;
  };
  return {
    pageData,
    handleSizeChange,
    handleCurrentChange,
    totalCount
  };
}
