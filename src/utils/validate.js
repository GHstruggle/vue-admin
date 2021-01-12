/**
 * 邮箱验证
 */
export function validate_userEmail(value) {
  let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  return !reg.test(value);
}

/**
 * 密码验证
 */
export function validate_passWord(value) {
  let reg = /^(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/;
  return !reg.test(value);
}
