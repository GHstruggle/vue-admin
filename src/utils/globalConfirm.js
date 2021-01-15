import { MessageBox } from 'element-ui';
export function globalConfirm() {
  const confirm = params => {
    MessageBox.confirm(params.content, params.tip || '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: params.type || 'warning',
      center: params.center || false
    })
      .then(() => {
        // root.$message({
        //   type: 'success',
        //   message: '删除成功!'
        // });
        let data = params.data || {};
        params.fn && params.fn(data);
      })
      .catch(() => {
        // root.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // });
      });
  };
  return {
    confirm
  };
}
