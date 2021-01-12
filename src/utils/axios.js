import axios from 'axios';
import { Message } from 'element-ui';
const BASEURL = process.env.NODE_ENV == 'development' ? '/devAPI' : '';

// 自定义配置新建一个 axios 实例
const server = axios.create({
  baseURL: BASEURL,
  timeout: 1000
});

// 在请求或响应被 then 或 catch 处理前拦截它们。
// 添加请求拦截器
server.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
server.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    const data = response.data;
    // rescode不等于0抛出错误
    if (data.resCode !== 0) {
      Message.error(data.message);
      Promise.reject(data);
    } else {
      return response;
    }
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default server;
