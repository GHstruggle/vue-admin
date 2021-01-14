<template>
  <div id="info-list">
    <el-row :gutter="15">
      <el-col :span="4">
        <div class="select-category">
          <label>类型:</label>
          <div class="select-content">
            <el-select v-model="category_title" placeholder="请选择">
              <el-option v-for="item in category_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="select-date">
          <label>日期:</label>
          <div class="select-content">
            <el-date-picker
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
          <el-button type="danger">搜索</el-button>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple">
          <el-button type="danger" @click="new_add = true">新增</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <div class="padding-bottom-30"></div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="selection"></el-table-column>
      <el-table-column align="center" prop="title" width="200" label="标题"></el-table-column>
      <el-table-column align="center" prop="category" label="类别"></el-table-column>
      <el-table-column align="center" prop="date" label="日期"></el-table-column>
      <el-table-column align="center" prop="name" label="管理人"></el-table-column>
      <el-table-column align="center" prop="" label="操作">
        <el-button type="danger" size="small" @click="infi_delete">删除</el-button>
        <el-button type="success" size="small">编辑</el-button>
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
            :page-sizes="[100, 200, 300, 400]"
            :total="400"
            background
            layout="total, sizes, prev, pager, next, jumper"
          ></el-pagination>
        </el-col>
      </div>
    </el-row>
    <!-- 批量删除/分页 end  -->
    <!-- 新增弹窗 -->
    <DialogInfo :flag.sync="new_add" />
  </div>
</template>
<script>
import { reactive, ref } from '@vue/composition-api';
import DialogInfo from './dialog/info';
import { globalConfirm } from '../../utils/globalConfirm';
export default {
  components: {
    DialogInfo
  },
  setup() {
    /**
     *  类型选择
     */
    let category_title = ref('');
    const category_options = reactive([
      { value: '1', label: '黄金糕' },
      { value: '2', label: '黄金糕' },
      { value: '3', label: '黄金糕' },
      { value: '4', label: '黄金糕' },
      { value: '5', label: '黄金糕' }
    ]);
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
     *  新增按钮弹窗
     */
    const new_add = ref(false);
    // const close_dialog = bool => {
    //   new_add.value = bool;
    // };
    /**
     *  表格
     */
    const tableData = reactive([
      { title: '上海市普陀区金沙江路 1518', name: '张三', category: '国内信息', date: '2016-05-02' },
      { title: '上海市普陀区金沙江路 1518', name: '张三', category: '国内信息', date: '2016-05-02' },
      { title: '上海市普陀区金沙江路 1518', name: '张三', category: '国内信息', date: '2016-05-02' },
      { title: '上海市普陀区金沙江路 1518', name: '张三', category: '国内信息', date: '2016-05-02' }
    ]);
    const { confirm } = globalConfirm();
    // 删除
    const infi_delete = () => {
      confirm({
        content: '此操作将永久删除该文件, 是否继续?',
        center: true,
        fn: confirmDelete,
        id: 'nszm'
      });
    };
    // 删除已选中
    const delete_select = () => {
      confirm({
        content: '确认删除已选中项吗?',
        center: true,
        fn: confirmDelete,
        id: '99'
      });
    };
    const confirmDelete = value => {
      console.log(value);
    };
    return {
      category_options,
      category_title,
      keyWord_options,
      keyWord_value,
      date_value,
      search_input,
      new_add,
      tableData,
      infi_delete,
      delete_select
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
