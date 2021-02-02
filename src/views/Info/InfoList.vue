<template>
  <div id="info-list">
    <el-row :gutter="15">
      <el-col :span="4">
        <div class="select-category">
          <label>类型:</label>
          <div class="select-content">
            <el-select v-model="category_title" placeholder="请选择">
              <el-option
                v-for="item in category_options.item"
                :key="item.id"
                :label="item.category_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="select-date">
          <label>日期:</label>
          <div class="select-content">
            <el-date-picker
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd HH-mm-ss"
              v-model="date_value"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="select-keyword">
          <label>关键字:</label>
          <div class="select-content">
            <el-select v-model="keyWord_value" placeholder="请选择">
              <el-option v-for="item in keyWord_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content bg-purple">
          <el-input v-model="search_input" placeholder="请输入内容"></el-input>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple">
          <el-button type="danger" @click="GetList">搜索</el-button>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple">
          <el-button type="danger" @click="new_addInfo">新增</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <div class="padding-bottom-30"></div>
    <el-table :data="tableData.item" @selection-change="handleSelectionChange" v-loading="loading" border style="width: 100%">
      <el-table-column type="selection"></el-table-column>
      <el-table-column align="center" prop="title" label="标题"></el-table-column>
      <el-table-column align="center" prop="categoryId" :formatter="toCategory" label="类别"></el-table-column>
      <el-table-column align="center" prop="createDate" :formatter="toDate" label="日期"></el-table-column>
      <el-table-column align="center" prop="name" label="管理人"></el-table-column>
      <el-table-column align="center" prop="" label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click="info_delete(scope.row)">删除</el-button>
          <el-button type="success" size="small" @click="edit_info(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格 end -->
    <div class="padding-bottom-30"></div>
    <!-- 批量删除/分页  -->
    <el-row>
      <el-col :span="5">
        <el-button @click="delete_select">批量删除</el-button>
      </el-col>
      <div class="pull-right">
        <el-col :span="19">
          <el-pagination
            :page-sizes="[10, 20, 30, 40]"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :total="total"
            background
            layout="total, sizes, prev, pager, next, jumper"
          ></el-pagination>
        </el-col>
      </div>
    </el-row>
    <div class="padding-bottom-30"></div>
    <!-- 批量删除/分页 end  -->
    <!-- 新增弹窗 -->
    <DialogInfo
      @addList="addList"
      :type="type"
      :edit_data="edit_data"
      :category_options="category_options.item"
      :flag.sync="new_add"
    />
  </div>
</template>
<script>
import { reactive, ref, onMounted, watch } from '@vue/composition-api';
import DialogInfo from './dialog/info';
import { globalConfirm } from '../../utils/globalConfirm';
import { common } from '@/utils/common.js';
import { getList, DeleteInfo } from '@/api/news.js';
import { formatDate } from '@/utils/transformDate';
export default {
  components: {
    DialogInfo
  },
  setup(props, { root }) {
    const { getInfoCatigory, categoryItems } = common();
    /**
     *  类型选择
     */
    let category_title = ref('');
    const category_options = reactive({
      item: []
    });
    // 监听
    watch(
      () => categoryItems.items,
      newValue => {
        category_options.item = newValue;
      }
    );
    /**
     *  时间选择
     */
    const date_value = ref('');
    /**
     *  关键字搜索
     */
    const keyWord_value = ref('id');
    const keyWord_options = reactive([
      { value: 'id', label: 'ID' },
      { value: 'title', label: '标题' }
    ]);
    /**
     *  搜索框
     */
    const search_input = ref('');
    /**
     * 搜索按钮
     */
    // const search = () => {
    //   page.pageNumber = 1;
    //   GetList();
    // };
    // 搜索条件
    const search_factors = () => {
      let requestDate = {
        pageNumber: page.pageNumber,
        pageSize: page.pageSize
      };
      if (category_title.value) requestDate.categoryId = category_title.value;
      if (date_value.value.length > 0) {
        requestDate.startTiem = date_value.value[0];
        requestDate.endTime = date_value.value[1];
      }
      if (search_input.value) requestDate[keyWord_value.value] = search_input.value;
      return requestDate;
    };
    /**
     *  新增按钮弹窗
     */
    const new_add = ref(false);
    // const close_dialog = bool => {
    //   new_add.value = bool;
    // };
    const new_addInfo = () => {
      new_add.value = true;
      type.type = 'add';
      type.title = '添加';
    };
    const addList = value => {
      console.log(value);
      tableData.item.unshift(value);
    };
    /**
     *  表格
     */
    const total = ref(0); // 总条数
    const loading = ref(false); // 加载状态
    const page = reactive({
      pageNumber: 1,
      pageSize: 10
    });
    const delID = ref(null);
    // 数据
    const tableData = reactive({
      item: []
    });
    const { confirm } = globalConfirm();
    // 显示条数
    const handleSizeChange = value => {
      page.pageSize = value;
      GetList();
    };
    // 当前页
    const handleCurrentChange = value => {
      page.pageNumber = value;
      GetList();
    };
    // 获取表格据
    const GetList = () => {
      let requestData = search_factors();
      // 加载状态
      loading.value = true;
      getList(requestData).then(response => {
        // console.log(response);
        let data = response.data;
        tableData.item = data.data;
        total.value = data.total;
        // 加载状态
        loading.value = false;
      });
    };
    // 日期转换
    const toDate = row => {
      let a = formatDate(parseInt(row.createDate));
      return a;
    };
    // 类别
    const toCategory = row => {
      let categoryId = row.categoryId;
      // console.log(category_options.item);
      let categoryDate = category_options.item.filter(item => item.id == categoryId)[0];
      let categoryName = categoryDate.category_name;
      return categoryName;
    };
    // 删除
    const info_delete = row => {
      delID.value = [parseInt(row.id)];
      console.log(delID.value);
      confirm({
        content: '此操作将永久删除该文件, 是否继续?',
        center: true,
        fn: confirmDelete,
        data: delID.value
      });
    };
    // 多选删除
    const delete_select = () => {
      confirm({
        content: '确认删除已选中项吗?',
        center: true,
        fn: confirmDelete,
        data: delID.value
      });
    };
    const confirmDelete = id => {
      if (Object.keys(id).length == 0) {
        root.$message({
          message: '请选择要删除的数据',
          type: 'error'
        });
        return false;
      }
      DeleteInfo({ id: id })
        .then(response => {
          // console.log(response);
          root.$message({
            message: response.message,
            type: 'success'
          });
          GetList();
        })
        .catch(error => {
          root.$message({
            message: '删除失败',
            type: 'error'
          });
          return error;
        });
    };
    // 多选
    const handleSelectionChange = row => {
      // console.log(row);
      let arrID = row.map(item => parseInt(item.id));
      delID.value = arrID;
    };
    // 编辑
    const edit_data = reactive({
      data: {}
    });
    let type = reactive({
      type: '',
      title: ''
    }); // 辨别新增/编辑
    const edit_info = row => {
      // console.log(row);
      new_add.value = true;
      edit_data.data = row;
      type.type = 'edit';
      type.title = '编辑';
    };
    /**
     *  生命周期钩子
     */
    onMounted(() => {
      // 获分类
      getInfoCatigory();
      // 获取列表
      GetList();
    });
    return {
      category_options,
      category_title,
      keyWord_options,
      keyWord_value,
      date_value,
      search_input,
      new_add,
      new_addInfo,
      addList,
      tableData,
      toDate,
      toCategory,
      loading,
      total,
      handleSizeChange,
      handleCurrentChange,
      info_delete,
      delete_select,
      edit_info,
      handleSelectionChange,
      GetList,
      edit_data,
      type
    };
  }
};
</script>
<style lang="scss" scoped>
#info-list {
  .select-category {
    @include selectDom(58);
  }
  .select-date {
    @include selectDom(70, 94, right);
  }
  .select-keyword {
    @include selectDom(80, 98, right);
  }
}
.padding-bottom-30 {
  height: 30px;
}
</style>
