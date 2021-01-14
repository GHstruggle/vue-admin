<template>
  <div>
    <!-- 新增按钮弹窗 -->
    <el-dialog title="新增" :visible.sync="new_add" @close="close" width="575px">
      <el-form :model="form">
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.name" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="概况" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.name" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="danger">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { ref, watch, reactive } from '@vue/composition-api';
export default {
  props: {
    flag: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const new_add = ref(false);
    // 给父组件传值
    const close = () => {
      new_add.value = false;
      // 通过修饰器的方式修改
      emit('update:flag', false);
      // emit('close_dialog', false);
    };
    /**
     *  监听父组件传值
     */
    // watch(() => (new_add.value = props.flag));
    watch(
      () => props.flag,
      newValue => {
        console.log(11);
        new_add.value = newValue;
      }
    );
    /**
     *  from 表单
     */
    const form = reactive({
      name: '',
      region: '',
      date1: '',
      date2: '',
      delivery: false,
      type: [],
      resource: '',
      desc: ''
    });
    const formLabelWidth = ref('58px');
    return {
      new_add,
      close,
      formLabelWidth,
      form
    };
  }
};
</script>
<style lang="scss" scoped></style>
