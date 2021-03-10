<template>
  <div>
    <el-table
      v-loading="loadingStatus.loading"
      :data="tableData.items"
      border
      @selection-change="TableComponentChange"
      style="width: 100%"
    >
      <!-- 多选 -->
      <el-table-column v-if="tableConfig.selection" type="selection" width="50"></el-table-column>
      <template v-for="item in tableConfig.tHead">
        <el-table-column
          v-if="item.columnType == 'slot'"
          :key="item.field"
          :width="item.width"
          :prop="item.field"
          :label="item.label"
        >
          <template slot-scope="scope">
            <slot :name="item.slotName" :data="scope.row"></slot>
          </template>
        </el-table-column>
        <el-table-column align="center" v-else :key="item.field" :prop="item.field" :label="item.label"></el-table-column>
      </template>
    </el-table>
    <div class="padding-bottom-30"></div>
    <div class="table-footer">
      <el-row>
        <el-col :span="4">
          <slot name="tableFooterLeft"></slot>
        </el-col>
        <el-col :span="20">
          <el-pagination
            class="pull-right"
            v-if="tableConfig.paginationShow"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageData.currentPage"
            :page-sizes="pageData.pageSizes"
            :page-size="100"
            :layout="tableConfig.paginationLayout"
            :total="pageData.total"
            background
          >
          </el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { reactive, onBeforeMount, watch } from '@vue/composition-api';
import { loadData } from './TableDataload';
import { paginationHook } from './pagination.js';
export default {
  name: 'Table',
  props: {
    config: {
      type: Object,
      default: () => {}
    },
    tableRow: {
      type: Object,
      defalut: () => {}
    }
  },
  setup(props, { emit }) {
    const { tableData, tableDataLoad } = loadData();
    const { pageData, handleSizeChange, handleCurrentChange, totalCount } = paginationHook();
    const data = reactive({
      loadingStatus: {
        loading: true
      },
      // 父组件传值
      tableConfig: {
        selection: false,
        recordCheckbox: false,
        request_data: {},
        tHead: [],
        paginationLayout: 'total, sizes, prev, pager, next, jumper',
        paginationShow: true
      },
      tableData: {
        items: []
      }
    });
    /**
     *  watch
     */
    watch([() => tableData.items, () => tableData.total, () => tableData.loading], ([tableData, total, loading]) => {
      data.tableData.items = tableData;
      data.loadingStatus.loading = loading;
      totalCount(total);
    });
    // 分页
    watch([() => pageData.currentPage, () => pageData.pageSize], ([currentPage, pageSize]) => {
      let requestData = data.tableConfig.request_data;
      if (requestData) {
        requestData.data.pageNumber = currentPage;
        requestData.data.pageSize = pageSize;
        tableDataLoad(requestData);
      }
    });
    /**
     *  方法
     */
    // 初始化table配置项
    const initTableConfig = () => {
      let configData = props.config;
      let keys = Object.keys(data.tableConfig);
      for (const key in configData) {
        if (keys.includes(key)) {
          data.tableConfig[key] = configData[key];
        }
      }
    };
    // 多选
    const TableComponentChange = val => {
      let rowData = {
        idItmes: val.map(item => item.id)
      };
      emit('update:tableRow', rowData);
    };
    // 数据刷新
    const refreshData = () => {
      tableDataLoad(data.tableConfig.request_data);
    };
    const search_redresh = params => {
      let requestData = Object.assign({}, params, {
        pageNumber: data.tableConfig.request_data.data.pageNumber,
        pageSize: data.tableConfig.request_data.data.pageSize
      });
      data.tableConfig.request_data.data = requestData;
      tableDataLoad(data.tableConfig.request_data);
    };
    /**
     *  生命周期
     */
    onBeforeMount(() => {
      initTableConfig();
      tableDataLoad(data.tableConfig.request_data);
      // data.tableConfig.tHead = props.config.tHead;
      // data.tableConfig.selection = props.config.selection;
    });
    return {
      ...data,
      handleSizeChange,
      handleCurrentChange,
      pageData,
      TableComponentChange,
      refreshData,
      search_redresh
    };
  }
};
</script>
<style lang="scss" scoped></style>
