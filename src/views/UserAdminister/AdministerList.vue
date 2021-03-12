<template>
  <div>
    <el-row :gutter="15">
      <el-col :span="6">
        <div class="label-wrap">
          <label>关键字:</label>
          <div class="select-content">
            <el-select v-model="category_title" placeholder="请选择">
              <el-option v-for="item in keyword" :key="item.id" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <el-input placeholder="请输入内容" v-model="search_content"></el-input>
      </el-col>
      <el-col :span="9">
        <el-button type="danger" @click="btnsearch">搜索</el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="danger" class="pull-right" @click="handlerAdd">添加用户</el-button>
      </el-col>
    </el-row>
    <div class="padding-bottom-30"></div>
    <Table ref="userTable" :config="tableConfig" :tableRow.sync="tableRow">
      <template v-slot:status="slotData">
        <el-switch
          v-model="slotData.data.status"
          @change="btnstatus(slotData.data)"
          active-value="2"
          inactive-value="1"
          active-color="#13ce66"
          inactive-color="#ff4949"
        ></el-switch>
      </template>
      <template v-slot:operation="data">
        <el-button size="small" type="danger" @click="btnDel(data)">删除</el-button>
        <el-button size="small" type="success" @click="btnEdit(data.data)">编辑</el-button>
      </template>
      <template slot="tableFooterLeft">
        <el-button @click="batchDel">批量删除</el-button>
      </template>
    </Table>
    <Add :flag.sync="new_add" @refreshTableData="refreshTableData" :isAddOrEdit="isAddOrEdit" :editData="editData"></Add>
  </div>
</template>
<script>
import { reactive, ref, toRefs } from '@vue/composition-api';
import requestURL from '@/api/requestURL.js';
import Table from '@/components/Table/index.vue';
import Add from './dialog/add';
import { globalConfirm } from '@/utils/globalConfirm';
import { deleteUser, actives } from '@/api/user';
export default {
  components: {
    Table,
    Add
  },
  setup(props, { root, refs }) {
    const { confirm } = globalConfirm();
    const new_add = ref(false);
    const data = reactive({
      category_title: '',
      keyword: [
        { value: 'truename', label: '姓名' },
        { value: 'phone', label: '手机号' }
      ],
      search_content: '',
      editData: {}, // 编辑携带数据
      // 判断是添加还是编辑
      isAddOrEdit: '',
      // 表格
      tableRow: {},
      tableConfig: {
        selection: true,
        tHead: [
          {
            label: '邮箱/用户名',
            field: 'username',
            width: '200'
          },
          {
            label: '真实姓名',
            field: 'truename'
          },
          {
            label: '手机号',
            field: 'phone'
          },
          {
            label: '地区',
            field: 'region'
          },
          {
            label: '角色',
            field: 'role'
          },
          {
            label: '禁用状态',
            field: 'status',
            columnType: 'slot',
            slotName: 'status'
          },
          {
            label: '操作',
            columnType: 'slot',
            slotName: 'operation',
            width: '180'
          }
        ],
        // 请求数据
        request_data: {
          url: requestURL.getUserList,
          method: 'post',
          data: {
            pageNumber: 1,
            pageSize: 3
          }
        },
        paginationLayout: 'total, sizes, prev, pager, next, jumper',
        paginationShow: true
      }
    });
    /**
     *  methods
     */
    // 搜索
    const btnsearch = () => {
      let requestData = {
        [data.category_title]: data.search_content
      };
      refs.userTable.search_redresh(requestData);
    };
    const handlerAdd = () => {
      data.isAddOrEdit = 'add';
      new_add.value = true;
    };
    // switch
    const btnstatus = params => {
      let requestData = {
        id: params.id,
        status: params.status
      };
      actives(requestData)
        .then(response => {
          root.$message({
            message: response.message,
            type: 'success'
          });
        })
        .catch(error => error);
    };
    // 批量删除
    const batchDel = () => {
      let idAggregate = data.tableRow.idItmes;
      if (!idAggregate || idAggregate.length == 0) {
        root.$message({
          message: '请选择要删除的用户！',
          type: 'error'
        });
        return false;
      }
      confirm({
        content: '删除后不可恢复',
        fn: userDel,
        data: idAggregate
      });
    };
    // 删除方法
    const userDel = params => {
      deleteUser({ id: params })
        .then(response => {
          console.log(response);
          root.$message({
            message: response.message,
            type: 'success'
          });
          // 刷新数据
          refreshTableData();
        })
        .catch(error => error);
    };
    // 单条数据删除按钮
    const btnDel = params => {
      data.tableRow.idItmes = [params.data.id];
      batchDel();
      console.log(data.tableRow.idItmes);
    };
    // 编辑
    const btnEdit = params => {
      console.log('编辑');
      data.isAddOrEdit = 'edit';
      new_add.value = true;
      data.editData = Object.assign({}, params);
    };
    // 刷新数据
    const refreshTableData = () => {
      refs.userTable.refreshData();
    };
    return {
      ...toRefs(data),
      handlerAdd,
      new_add,
      batchDel,
      btnDel,
      btnEdit,
      btnstatus,
      refreshTableData,
      btnsearch
    };
  }
};
</script>
<style lang="scss" scoped>
.label-wrap {
  @include selectDom(58);
}
</style>
