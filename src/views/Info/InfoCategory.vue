<template>
  <div dir="info-category">
    <el-button type="danger" @click="add_first_class({ type: 'add_first_class' })">添加一级分类</el-button>
    <hr class="line" />
    <div class="category-content">
      <el-row :gutter="36">
        <el-col :span="11">
          <div class="category-item">
            <div v-for="categoryItem in category_info.data" :key="categoryItem.id">
              <h4>
                <svg-icon iconClass="plus" />{{ categoryItem.category_name }}
                <div class="buttom-group">
                  <el-button
                    type="danger"
                    size="mini"
                    @click="edit_first_class({ categoryItem, type: 'edit_first_class' })"
                    round
                  >
                    编辑
                  </el-button>
                  <el-button type="success" size="mini" round>添加子类</el-button>
                  <el-button size="mini" @click="del_category(categoryItem.id)" round>删除</el-button>
                </div>
              </h4>
              <ul v-if="categoryItem.children">
                <li v-for="sonItem in categoryItem.children" :key="sonItem.id">
                  {{ sonItem.category_name }}
                  <div class="buttom-group">
                    <el-button type="danger" size="mini" round>编辑</el-button>
                    <el-button size="mini" round>删除</el-button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="13">
          <div class="category-edit" ref="abc">
            <h4>一级分类编辑</h4>
            <div class="edit-form">
              <el-form label-width="80px" :model="form_data">
                <el-form-item label="一级分类">
                  <el-input :disabled="first_class_disabled" v-model="form_data.firstValue"></el-input>
                </el-form-item>
                <el-form-item label="二级分类" v-if="second_class_disabled">
                  <el-input :disabled="second_class_disabled" v-model="form_data.secondValue"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button
                    :loading="determine_btn_loading"
                    :disabled="determine_btn_disabled"
                    @click="submit_btn"
                    type="danger"
                  >
                    确定
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { addFirstCategory, getInfoList, deleteCategory, editCategory } from '@/api/news.js';
import { reactive, ref, onMounted } from '@vue/composition-api';
import { globalConfirm } from '../../utils/globalConfirm';
export default {
  setup(props, { root }) {
    /**
     * 分类树形列表信息
     */
    const category_info = reactive({
      data: [],
      current: {}
    });
    // 生命周期钩子，dom挂载完执行
    onMounted(() => {
      // 获取分类树形列表信息
      getInfoList({}).then(response => {
        // console.log(response);
        category_info.data = response.data;
      });
    });
    // 编辑一级分类
    const edit_first_class = params => {
      disabled_states(false); // 改变表单的禁用状态
      console.log();
      form_data.firstValue = params.categoryItem.category_name;
      determine_btn_class.value = params.type;
      // 存储当前属性
      category_info.current = params.categoryItem;
    };
    // 修改分类方法
    const modify_category = () => {
      if (!form_data.firstValue) {
        root.$message({
          message: '不能为空！',
          type: 'warning'
        });
        return false;
      }
      determine_btn_loading.value = true;
      const responseDate = reactive({
        id: category_info.current.id,
        categoryName: form_data.firstValue
      });
      editCategory(responseDate)
        .then(response => {
          root.$message({
            message: response.message,
            type: 'success'
          });
          let data = response.data.data;
          category_info.data.map(item => {
            if (item.id == responseDate.id) {
              item.category_name = data.categoryName;
            }
          });
          // 充值表单
          resetForm();
          disabled_states(true);
          determine_btn_loading.value = false;
        })
        .catch(error => {
          resetForm();
          determine_btn_loading.value = true;
          return error;
        });
    };
    // 删除当前分类项
    const { confirm } = globalConfirm();
    const del_category = ID => {
      confirm({
        content: '删除后，不可恢复',
        fn: del_item,
        data: {
          categoryId: ID
        }
      });
    };
    // 删除方法
    const del_item = data => {
      deleteCategory(data).then(response => {
        // console.log(response);
        if (response.resCode == 0) {
          category_info.data.forEach((item, index) => {
            if (item.id == data.categoryId) {
              category_info.data.splice(index, 1);
            }
          });
          root.$message({
            message: response.message,
            type: 'success'
          });
        }
      });
    };
    /**
     *  表单
     */
    const determine_btn_class = ref(''); // 确定按钮类型（编辑/添加）
    const first_class_disabled = ref(true);
    const second_class_disabled = ref(true);
    const determine_btn_disabled = ref(true);
    const disabled_states = bool => {
      first_class_disabled.value = bool;
      second_class_disabled.value = bool;
      determine_btn_disabled.value = bool;
    };
    const form_data = reactive({
      firstValue: '',
      secondValue: ''
    });
    // 添加一级分类
    const add_first_class = params => {
      determine_btn_class.value = params.type;
      disabled_states(false); // 改变表单的禁用状态
    };
    // 确认添加
    const determine_btn_loading = ref(false); // btn状态
    const submit_btn = () => {
      switch (determine_btn_class.value) {
        case 'add_first_class':
          add_category();
          break;
        case 'edit_first_class':
          modify_category();
          break;
        default:
          break;
      }
    };
    // 添加分类
    const add_category = () => {
      if (!form_data.firstValue) {
        root.$message({
          message: '不能为空！',
          type: 'warning'
        });
        return false;
      }
      determine_btn_loading.value = true; // btn状态
      const responseData = reactive({
        categoryName: form_data.firstValue
      });
      addFirstCategory(responseData)
        .then(response => {
          console.log(response);
          category_info.data.push(response.data);
          root.$message({
            message: response.message,
            type: 'success'
          });
          // 重置表单
          resetForm();
          determine_btn_loading.value = false; // btn状态
        })
        .catch(error => {
          determine_btn_loading.value = false; // btn状态
          return error;
        });
    };
    // 重置表单方法
    const resetForm = () => {
      form_data.firstValue = '';
      form_data.secondValue = '';
    };
    return {
      form_data,
      first_class_disabled,
      second_class_disabled,
      determine_btn_disabled,
      add_first_class,
      submit_btn,
      determine_btn_loading,
      category_info,
      del_category,
      edit_first_class
    };
  }
};
</script>
<style lang="scss" scoped>
.category-item {
  position: relative;
  line-height: 44px;
  cursor: pointer;
  &:last-child::before {
    top: 30px;
  }
  &:first-child::before {
    bottom: 22px;
  }
  &::before {
    position: absolute;
    content: '';
    top: 0;
    left: 22px;
    bottom: 0;
    z-index: 2;
    border-left: 1px dotted #344a5f;
  }
  h4 {
    position: relative;
    padding-left: 38px;
    @include webkit(transition, all 0.4s ease 0s);
    .svg-icon {
      position: absolute;
      top: 50%;
      left: 14px;
      @include webkit(transform, translateY(-50%));
      font-size: 18px;
    }
    &:hover {
      background-color: #f3f3f3;
      .buttom-group {
        display: block;
      }
    }
  }
  li {
    position: relative;
    margin-left: 22px;
    padding-left: 40px;
    @include webkit(transition, all 0.4s ease 0s);
    &::before {
      position: absolute;
      top: 50%;
      left: 0;
      content: '';
      width: 32px;
      border-bottom: 1px dotted #344a5f;
    }
    &:hover {
      background-color: #f3f3f3;
      .buttom-group {
        display: block;
      }
    }
  }
}
.buttom-group {
  position: absolute;
  top: 0;
  right: 12px;
  font-size: 12px;
  display: none;
}

// 右
.category-edit {
  h4 {
    padding-left: 22px;
    line-height: 44px;
    background-color: #f3f3f3;
  }
  .edit-form {
    margin-top: 26px;
    padding-left: 10px;
    width: 60%;
  }
}
.line {
  margin: 30px -30px;
  border: 0;
  border-bottom: 1px solid #e9e9e9;
}
</style>
