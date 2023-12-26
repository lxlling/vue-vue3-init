// import { DeepRequestStatic } from '@deep/request-types';
// const request: DeepRequestStatic = window.$bridge.request;
// import { generateHworkBaseUrl } from '@deep/shared';
// request.config({
//     baseURL: generateHworkBaseUrl('/api'),
//     timeout: 20000,
// });

// export default request;

import axios from 'axios';
import { message, Modal } from 'ant-design-vue';
import { useAppStore } from '@/store/app';
import { getToken } from '@/utils/auth';

const appStore = useAppStore();
// 创建axios实例
const service = axios.create({
    baseURL: '', //process.env.BASE_API, // api的base_url
    timeout: 5000, // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
    (config) => {
        // 如果登录了，有token，则请求携带token
        // Do something before request is sent
        if (appStore.token) {
            config.headers['X-Token'] = getToken(); // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
        }
        return config;
    },
    (error) => {
        // Do something with request error
        console.log(error); // for debug
        Promise.reject(error);
    },
);

// respone拦截器
service.interceptors.response.use(
    // response => response,
    /**
     * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
     * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
     */
    (response) => {
        const res = response.data;
        // 处理异常的情况
        if (res.code !== 200) {
            message.error({
                content: res.message,
                duration: 5 * 1000,
            });
            // 403:非法的token; 50012:其他客户端登录了;  401:Token 过期了;
            if (res.code === 403 || res.code === 50012 || res.code === 401) {
                Modal.confirm({
                    title: '确定登出',
                    okText: '重新登录',
                    cancelText: '取消',
                    content: '你已被登出，可以取消继续留在该页面，或者重新登录',
                    onOk: () => {
                        // store.dispatch('FedLogOut').then(() => {
                        //     location.reload(); // 为了重新实例化vue-router对象 避免bug
                        // });
                    },
                });
            }
            return Promise.reject(new Error('error'));
        } else {
            // 默认只返回data，不返回状态码和message
            // 通过 meta 中的 responseAll 配置来取决后台是否返回所有数据(包括状态码，message和data)
            return res.data;
        }
    },
    (error) => {
        console.log('err' + error); // for debug
        message.error({
            content: error.message,
            duration: 5 * 1000,
        });
        return Promise.reject(error);
    },
);

export default service;
