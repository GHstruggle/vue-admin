import server from './axios.js';

/**
 *
 * @param {string} url [请求地址]
 * @param {string} method [请求方式如:'post']
 * @param {object} data [请求时携带参数]
 */
export function request(url, method, data) {
  return new Promise((resolve, reject) => {
    server
      .request({
        url,
        method,
        data
      })
      .then(res => {
        // console.log('request成功', res);
        resolve(res.data);
      })
      .catch(error => {
        // console.log('request失败', error);
        reject(error);
      });
  });
}
