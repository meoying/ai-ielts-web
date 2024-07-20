import { ACCESS_TOKEN, logout, REFRESH_TOKEN } from '@/utils/index';
import { message } from 'antd';
import axios, { AxiosHeaders, AxiosRequestConfig, AxiosResponse } from 'axios';
import store from 'store';

// const baseURL = '/api/'; //
const baseURL = process.env.BASE_URL || 'http://localhost:8080';
export interface Result<T> {
  code: number;
  msg: string;
  data: T;
}

const instance = axios.create({
  // 这边记得修改你对应的配置文件
  baseURL: baseURL,
  withCredentials: true,
});

instance.interceptors.response.use(
  (resp) => {
    const status = resp?.status || 500;
    if (status == 401) {
      message.error("请登录!")
      logout()
    }
    return resp;
  },
  (err) => {
    const status = err?.response?.status || 500;
    if (status == 401) {
      message.error("请登录!")
      logout()
    }
    return Promise.reject(err)
  },
);

instance.interceptors.request.use(
  (req) => {
    return req;
  },
  (err) => {
    console.log(err);
  },
);

export function get<T>(url: string, cfg?: AxiosRequestConfig) {
  return instance.get<Result<T>>(url, cfg);
}

export function post<T>(url: string, data?: any, cfg?: AxiosRequestConfig) {
  return instance.post<Result<T>>(url, data, cfg);
}
