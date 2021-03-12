<template>
  <div>
    <!-- 新增按钮弹窗 -->
    <el-dialog :title="type_title" :visible.sync="new_add" @open="open" @close="close" width="575px">
      <el-form :model="form" ref="ruleForm">
        <el-form-item label="类型" :label-width="formLabelWidth" prop="options">
          <el-select v-model="form.options" placeholder="请选择">
            <el-option
              v-for="selectItem in form.selectItems"
              :label="selectItem.category_name"
              :key="selectItem.id"
              :value="selectItem.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.title" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="概况" :label-width="formLabelWidth" prop="content">
          <el-input type="textarea" v-model="form.content" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="danger" @click="addSubmit" :loading="addSubmitLoading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { addInfo, EditInfo } from '@/api/news.js';
import { ref, watch, reactive } from '@vue/composition-api';
// import { currentFormatDate } from '@/utils/transformDate.js';
export default {
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    category_options: {
      type: Array,
      default: () => []
    },
    edit_data: {
      type: Object,
      default: () => {}
    },
    type: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, { emit, root, refs }) {
    const new_add = ref(false);
    // 给父组件传值
    const close = () => {
      new_add.value = false;
      // 通过修饰器的方式修改
      emit('update:flag', false);
      // 关闭重置表单
      resetForm();
      resetFormData();
    };
    watch(
      () => props.flag,
      newValue => {
        new_add.value = newValue;
      }
    );
    /**
     *  from 表单
     */
    const type_title = ref('');
    const form = reactive({
      selectItems: [],
      options: '',
      title: '',
      content: ''
    });
    const formLabelWidth = ref('58px');
    const resetForm = () => {
      refs.ruleForm.resetFields();
    };
    const resetFormData = () => {
      form.selectItems = [];
      form.options = '';
      form.title = '';
      form.content = '';
    };
    const open = () => {
      form.selectItems = props.category_options;
      if (props.type.type == 'add') {
        type_title.value = props.type.title;
      }
      // 判断是否是编辑
      if (props.type.type == 'edit') {
        type_title.value = props.type.title;
        let data = props.edit_data.data;
        form.title = data.title;
        form.content = data.content;
        form.options = data.categoryId;
        edit_ID.value = data.id;
      }
    };
    /**
     *  确定添加
     */
    const addSubmitLoading = ref(false);
    const addSubmit = () => {
      let requestData = {
        categoryId: form.options,
        title: form.title,
        content: form.content
      };
      if (!form.options || !form.title || !form.content) {
        root.$message({
          message: '不能留空',
          type: 'error'
        });
        return false;
      }
      props.type.type == 'add' ? add_info(requestData) : edit_info(requestData);
    };
    // 添加
    const add_info = requestData => {
      addSubmitLoading.value = true;
      requestData.createDate = new Date().getTime();
      addInfo(requestData)
        .then(resquest => {
          root.$message({
            message: resquest.message,
            type: 'success'
          });
          addSubmitLoading.value = false;
          emit('addList', requestData);
          close();
        })
        .catch(error => {
          addSubmitLoading.value = false;
          return error;
        });
    };
    // 编辑
    const edit_ID = ref(''); // 编辑所需携带id；
    const edit_info = requestData => {
      requestData.id = edit_ID.value;
      addSubmitLoading.value = true;
      EditInfo(requestData)
        .then(response => {
          console.log('成功');
          console.log(response);
          root.$message({
            message: response.message,
            type: 'success'
          });
          addSubmitLoading.value = false;
          emit('GetList');
          close();
        })
        .catch(error => {
          root.$message({
            message: error.message,
            type: 'error'
          });
          addSubmitLoading.value = false;
        });
    };
    return {
      new_add,
      close,
      formLabelWidth,
      form,
      open,
      addSubmit,
      addSubmitLoading,
      type_title
    };
  }
};
</script>
<style lang="scss" scoped></style>
