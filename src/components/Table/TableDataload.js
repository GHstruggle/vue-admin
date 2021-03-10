import { reactive } from '@vue/composition-api';
import { getUserList } from '@/api/user.js';
export function loadData() {
  const tableData = reactive({
    items: [],
    total: 0,
    loading: true
  });
  const tableDataLoad = params => {
    let requestJSON = params;
    let resquestData = {
      url: requestJSON.url,
      method: requestJSON.method,
      data: requestJSON.data || {}
    };
    getUserList(resquestData)
      .then(response => {
        let responseData = response.data;
        // console.log(responseData);
        if (responseData.data && responseData.data.length > 0) {
          // data.tableData.push(responseData.data);
          tableData.items = responseData.data;
          tableData.total = responseData.total;
          tableData.loading = false;
        }
      })
      .catch(error => error);
  };
  return {
    tableData,
    tableDataLoad
  };
}
