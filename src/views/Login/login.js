import { validate_userEmail, validate_passWord } from "@/utils/validate.js";
// 邮箱验证
const validateUserEmail = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("用户名不能为空"));
  } else {
    validate_userEmail(value) ? callback(new Error("用户名格式不正确")) : callback();
  }
};
// 密码验证
let passWord = "";
const validatePassWord = (rule, value, callback) => {
  passWord = value;
  if (value === "") {
    callback(new Error("密码不能为空"));
  } else {
    validate_passWord(value) ? callback(new Error("密码格式错误")) : callback();
  }
};
// 确认密码
const validatePassWords = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("密码不能为空"));
  } else {
    passWord == value ? callback() : callback(new Error("两次密码不一致"));
  }
};
// 验证码
const checkCode = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("验证码不能为空"));
  } else {
    callback();
  }
};
export { validateUserEmail, validatePassWord, validatePassWords, checkCode };
