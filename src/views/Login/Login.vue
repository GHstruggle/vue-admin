<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          v-for="(item, index) in menuTab"
          :class="{ current: item.current }"
          :key="index"
          @click="toggleMenu(item)"
        >{{ item.text }}</li>
      </ul>
      <!-- 表单 start -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="login-from"
        size="medium"
      >
        <el-form-item prop="userEmail" class="item-form">
          <label>邮箱</label>
          <el-input type="text" v-model="ruleForm.userEmail" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="passWord" class="item-form">
          <label>密码</label>
          <el-input
            type="password"
            v-model="ruleForm.passWord"
            minlength="6"
            maxlength="19"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="passWords" v-if="menuTab[1].current" class="item-form">
          <label>确认密码</label>
          <el-input
            type="password"
            v-model="ruleForm.passWords"
            minlength="6"
            maxlength="19"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code" class="item-form">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <div class="grid-content bg-purple">
                <el-input v-model.number="ruleForm.code"></el-input>
              </div>
            </el-col>
            <el-col :span="9">
              <div class="grid-content bg-purple">
                <el-button type="primary" minlength="6" maxlength="6" class="block">验证码</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item class="margin-top">
          <el-button type="danger" class="block" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
      <!-- 表单 end -->
    </div>
  </div>
</template>
<script>
import { validate_userEmail, validate_passWord } from "@/utils/validate.js"
export default {
  name: "login",
  data() {
    // 验证码
    var checkCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('验证码不能为空'));
      }
      callback();
    };
    // 邮箱验证
    var validateUserEmail = (rule, value, callback) => {
      if (value === '') { callback(new Error('用户名不能为空')); }
      validate_userEmail(value) ? callback(new Error('用户名格式不正确')) : callback();
    };
    // 密码验证
    var validatePassWord = (rule, value, callback) => {
      if (value === '') { callback(new Error('密码不能为空')); }
      validate_passWord(value) ? callback(new Error('密码格式错误')) : callback();
    };
    // 确认密码
    var validatePassWords = (rule, value, callback) => {
      if (value === '') { callback(new Error('密码不能为空')); }
      this.ruleForm.passWord == value ? callback() : callback(new Error('两次密码不一致'));
    }
    return {
      menuTab: [
        { text: "登录", current: true },
        { text: "注册", current: false }
      ],
      // 表单数据
      ruleForm: {
        userEmail: '',
        passWord: '',
        passWords: '',
        code: ''
      },
      rules: {
        userEmail: [
          { validator: validateUserEmail, trigger: 'blur' }
        ],
        passWord: [
          { validator: validatePassWord, trigger: 'blur' },
        ],
        passWords: [
          { validator: validatePassWords, trigger: 'blur' }
        ],
        code: [
          { validator: checkCode, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    toggleMenu(data) {
      this.menuTab.forEach(item => (item.current = false));
      data.current = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
          // 清空表单
          this.$refs[formName].resetFields();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      // 清空表单
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
#login {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: url("../../assets/login/login.jpeg") no-repeat top center / cover;
  .menu-tab {
    li {
      display: inline-block;
      padding: 10px 14px;
      color: #fff;
      cursor: pointer;
    }
    .current {
      background-color: rgba($color: #2f4255, $alpha: 0.4);
    }
  }
}
.login-wrap {
  width: 323px;
  padding: 10px;
  background-color: rgba($color: #3e5c7a, $alpha: 0.8);
}
.login-from {
  margin-top: 28px;
  label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: #fff;
  }
  .item-form {
    margin-bottom: 13px;
  }
  .margin-top {
    margin-top: 18px;
  }
  .block {
    display: block;
    width: 100%;
  }
}
</style>
