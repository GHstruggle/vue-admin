<template>
  <div>
    <el-dialog title="提示" :visible.sync="new_add" width="40%" @opened="opened" :before-close="handleClose">
      <el-form :model="ruleForm" :rules="rules" status-icon ref="ruleForm" :label-width="formLabelWidth" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input placeholder="请输入邮箱" v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="truename">
          <el-input placeholder="请输入姓名" v-model="ruleForm.truename"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input placeholder="请输入密码" type="password" v-model.number="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input placeholder="请输入手机号" v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="地区">
          <CityPicker :cityPickerData.sync="cityPickerData" />
        </el-form-item>
        <el-form-item label="是否启用" prop="status">
          <el-radio v-model="ruleForm.status" label="1">禁用</el-radio>
          <el-radio v-model="ruleForm.status" label="2">启用</el-radio>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-checkbox-group v-model="ruleForm.role">
            <el-checkbox v-for="item in roleItems" :key="item.role" :label="item.role">{{ item.name }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit" :loading="submitLoading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import CityPicker from '@/components/CityPicker/index';
import { watch, reactive, toRefs } from '@vue/composition-api';
import { validate_userEmail, validate_passWord, validate_phone } from '@/utils/validate.js';
import { getRole, addUser, userEdit } from '@/api/user';
import { encryption } from '@/utils/encryption';
export default {
  components: { CityPicker },
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    editData: {
      type: Object,
      default: () => {}
    },
    isAddOrEdit: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit, refs, root }) {
    const validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('用户名不能为空'));
      } else {
        validate_userEmail(value) ? callback(new Error('用户名格式不正确')) : callback();
      }
    };
    const validatePassWord = (rule, value, callback) => {
      if (ruleForm.id && !value) {
        callback();
      }
      if ((ruleForm.id && value) || !ruleForm.id) {
        if (value === '') {
          callback(new Error('密码不能为空'));
        } else {
          validate_passWord(value) ? callback(new Error('密码格式需要字母开头(长度6～20)')) : callback();
        }
      }
    };
    const validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('手机号不能为空'));
      } else {
        validate_phone(value) ? callback(new Error('手机号格式错误')) : callback();
      }
    };
    const validaterole = (rule, value, callback) => {
      if (value.length == 0) {
        callback(new Error('角色至少不低于一项'));
      } else {
        callback();
      }
    };
    // 表单数据
    const ruleForm = reactive({
      username: '',
      truename: '',
      password: '',
      phone: '',
      region: '',
      status: '1',
      role: []
    });
    const rules = reactive({
      username: [{ required: true, validator: validateUsername, trigger: 'blur' }],
      password: [{ required: true, validator: validatePassWord, trigger: 'blur' }],
      phone: [{ required: true, validator: validatePhone, trigger: 'blur' }],
      role: [{ required: true, validator: validaterole, trigger: 'blur' }],
      truename: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      ]
    });
    // 数据
    const data = reactive({
      new_add: false,
      submitLoading: false,
      formLabelWidth: '70px',
      // 地区
      cityPickerData: {},
      roleItems: []
    });
    /**
     *  监听
     */
    watch(
      () => props.flag,
      newValue => {
        data.new_add = newValue;
      }
    );
    /**
     *  methods
     */
    // 重置表单
    const resetForm = () => {
      data.cityPickerData = {};
      refs.ruleForm.resetFields();
    };
    const handleClose = () => {
      resetForm();
      emit('update:flag', false);
    };
    // 角色
    const getUserRole = () => {
      getRole()
        .then(response => {
          data.roleItems = response.data;
        })
        .catch(error => error);
    };
    const opened = () => {
      getUserRole();
      //  编辑
      let type = props.isAddOrEdit;
      if (type == 'edit') {
        let editData = props.editData;
        editData.role = editData.role ? editData.role.split(',') : [];
        for (const key in editData) {
          ruleForm[key] = editData[key];
        }
      } else {
        // 添加删除id
        ruleForm.id && delete ruleForm.id;
      }
    };
    // 提交
    const submit = () => {
      refs.ruleForm.validate(val => {
        if (val) {
          let requestData = Object.assign({}, ruleForm);
          requestData.region = JSON.stringify(data.cityPickerData);
          requestData.role = requestData.role.join(',');
          if (requestData.id) {
            if (requestData.password) {
              requestData.password = encryption(ruleForm.password);
            } else {
              delete requestData.password;
            }
            eidtUser(requestData); // 编辑
          } else {
            requestData.password = encryption(ruleForm.password);
            user_add(requestData); // 添加
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    };
    // 添加方法
    const user_add = requestData => {
      data.submitLoading = true;
      addUser(requestData)
        .then(response => {
          data.submitLoading = false;
          root.$message({
            message: response.message,
            type: 'success'
          });
          resetForm();
          data.new_add = false;
          emit('refreshTableData');
        })
        .catch(error => {
          data.submitLoading = false;
          return error;
        });
    };
    // 编辑方法
    const eidtUser = requestData => {
      userEdit(requestData)
        .then(response => {
          console.log(response);
          root.$message({
            message: response.message,
            type: 'success'
          });
          resetForm();
          data.new_add = false;
          emit('refreshTableData');
        })
        .catch(error => error);
    };
    return {
      ...toRefs(data),
      handleClose,
      opened,
      ruleForm,
      rules,
      submit
    };
  }
};
</script>
<style lang="scss" scoped></style>
