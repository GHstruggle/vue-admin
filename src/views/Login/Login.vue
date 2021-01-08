<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li v-for="(item, index) in menuTab" :class="{ current: item.current }" :key="index" @click="toggleMenu(item)">
          {{ item.text }}
        </li>
      </ul>
      <!-- 表单 start -->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-from" size="medium">
        <el-form-item prop="userEmail" class="item-form">
          <label>邮箱</label>
          <el-input type="text" v-model="ruleForm.userEmail" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="passWord" class="item-form">
          <label>密码</label>
          <el-input type="password" v-model="ruleForm.passWord" minlength="6" maxlength="19" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="passWords" v-if="menuTab[1].current" class="item-form">
          <label>确认密码</label>
          <el-input type="password" v-model="ruleForm.passWords" minlength="6" maxlength="19" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="code" class="item-form">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <div class="grid-content bg-purple">
                <el-input v-model="ruleForm.code"></el-input>
              </div>
            </el-col>
            <el-col :span="9">
              <div class="grid-content bg-purple">
                <el-button
                  type="primary"
                  minlength="6"
                  maxlength="6"
                  @click="getSms"
                  :disabled="codeBtnStatus.staus"
                  class="block"
                >
                  {{ codeBtnStatus.text }}
                </el-button>
              </div>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item class="margin-top">
          <el-button type="danger" class="block" @click="submitForm('ruleForm')">
            {{ menuTab[1].current ? '注册' : '登录' }}
          </el-button>
        </el-form-item>
      </el-form>
      <!-- 表单 end -->
    </div>
  </div>
</template>
<script>
import { reactive, onMounted, ref } from '@vue/composition-api';
import { validateUserEmail, validatePassWord, validatePassWords, checkCode } from '@/views/Login/login.js';
import { getCode, register, login } from '@/api/login.js';
import { validate_userEmail } from '@/utils/validate.js';
import { setInterval, clearInterval } from 'timers';
export default {
  name: 'login',
  setup(props, context) {
    const menuTab = reactive([
      { text: '登录', current: true },
      { text: '注册', current: false }
    ]);
    // 注册登录切换
    const toggleMenu = data => {
      menuTab.forEach(item => (item.current = false));
      data.current = true;
      // 清空表单
      clearFormData();
      // 清除倒计时
      clearCountDown();
    };
    // 清空表单数据
    const clearFormData = () => {
      context.refs.ruleForm.resetFields();
    };
    // 表单数据
    const ruleForm = reactive({
      userEmail: '',
      passWord: '',
      passWords: '',
      code: ''
    });
    // 表单规则
    const rules = reactive({
      userEmail: [{ validator: validateUserEmail, trigger: 'blur' }],
      passWord: [{ validator: validatePassWord, trigger: 'blur' }],
      passWords: [{ validator: validatePassWords, trigger: 'blur' }],
      code: [{ validator: checkCode, trigger: 'blur' }]
    });
    // 表单的提交处理
    const submitForm = formName => {
      // 请求所需参数
      const requestData = reactive({
        username: ruleForm.userEmail,
        password: ruleForm.passWord,
        code: ruleForm.code
      });
      context.refs[formName].validate(valid => {
        if (valid) {
          // 判断是注册还是登录
          menuTab[0].current ? submitLogin(requestData) : submitRegister(requestData);
          // 清空表单
          clearFormData();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    };
    // 登录方法
    const submitLogin = data => {
      login(data)
        .then(res => console.log(res))
        .catch(error => error);
    };
    // 注册方法
    const submitRegister = data => {
      register(data)
        .then(res => console.log(res))
        .catch(error => error);
    };
    // 验证码按钮状态
    const codeBtnStatus = reactive({
      staus: false,
      text: '发送验证码'
    });
    // 更新验证码按钮状态方法
    const updataCodeBtnStatus = params => {
      codeBtnStatus.staus = params.staus;
      codeBtnStatus.text = params.text;
    };
    // 定时器 ID
    const setIntervalID = ref(null);
    // 发请求获取验证码
    const getSms = () => {
      // 先验证邮箱格式
      if (ruleForm.userEmail == '') {
        context.root.$message.error('邮箱不能为空！');
        return false;
      }
      if (validate_userEmail(ruleForm.userEmail)) {
        context.root.$message.error('邮箱格式不正确！');
        return false;
      }
      updataCodeBtnStatus({
        staus: true,
        text: '发送中'
      });
      // 请求携带数据
      const requestData = reactive({
        username: ruleForm.userEmail,
        module: menuTab[0].current ? 'login' : 'register'
      });
      console.log(requestData.module);
      getCode(requestData)
        .then(res => {
          // 开启定时器
          countDown(60);
          console.log(res);
        }) // 错误处理
        .catch(error => error);
    };
    // 定时器
    const countDown = number => {
      setIntervalID.value = setInterval(() => {
        number--;
        if (number === 0) {
          // 清除定时器
          clearInterval(setIntervalID.value);
          // 并修改验证码按钮状态
          updataCodeBtnStatus({
            tatus: false,
            text: '再次获取'
          });
        } else {
          codeBtnStatus.text = `倒计时${number}秒`;
        }
      }, 1000);
    };
    // 登录注册之间切换清除定时器
    const clearCountDown = () => {
      updataCodeBtnStatus({
        tatus: false,
        text: '发送验证码'
      });
      // 清除定时器
      clearInterval(setIntervalID.value);
    };
    // 生命周期
    onMounted(() => {});
    return {
      menuTab,
      ruleForm,
      rules,
      submitForm,
      toggleMenu,
      getSms,
      codeBtnStatus
    };
  }
};
</script>
<style lang="scss" scoped>
#login {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: url('../../assets/login/login.jpeg') no-repeat top center / cover;
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
