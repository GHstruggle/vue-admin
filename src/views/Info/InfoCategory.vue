<template>
  <div dir="info-category">
    <el-button type="danger">添加一级分类</el-button>
    <hr class="line" />
    <div class="category-content">
      <el-row :gutter="36">
        <el-col :span="11">
          <div class="category-item">
            <h4>
              <svg-icon iconClass="plus" />新闻
              <div class="buttom-group">
                <el-button type="danger" size="mini" round>编辑</el-button>
                <el-button type="success" size="mini" round>添加子类</el-button>
                <el-button size="mini" round>删除</el-button>
              </div>
            </h4>
            <ul>
              <li>
                国内
                <div class="buttom-group">
                  <el-button type="danger" size="mini" round>编辑</el-button>
                  <el-button size="mini" round>删除</el-button>
                </div>
              </li>
              <li>
                国内
                <div class="buttom-group">
                  <el-button type="danger" size="mini" round>编辑</el-button>
                  <el-button size="mini" round>删除</el-button>
                </div>
              </li>
              <li>
                国内
                <div class="buttom-group">
                  <el-button type="danger" size="mini" round>编辑</el-button>
                  <el-button size="mini" round>删除</el-button>
                </div>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="13">
          <div class="category-edit">
            <h4>一级分类编辑</h4>
            <div class="edit-form">
              <el-form label-width="80px" :model="formLabelAlign">
                <el-form-item label="一级分类">
                  <el-input v-model="formLabelAlign.name"></el-input>
                </el-form-item>
                <el-form-item label="二级分类">
                  <el-input v-model="formLabelAlign.region"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="danger">确定</el-button>
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
import { reactive } from '@vue/composition-api';
export default {
  setup() {
    const formLabelAlign = reactive({
      name: '',
      region: '',
      type: ''
    });
    return {
      formLabelAlign
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
