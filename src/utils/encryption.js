import sha1 from 'js-sha1';

// 加密
export function encryption(ags) {
  return sha1(ags);
}
