import axios from "axios";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { getToken } from '@/utils/auth';

const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 10000,
});
service.interceptors.request.use((config) => {
    const isToken = (config.headers || {}).isToken === false;
    // if (getToken() && !isToken) {
    //     config.headers['token'] = 'Bearer ' + getToken()
    // }
    NProgress.start();
    return config;
}, (error)=> {
    Promise.reject(error);
});
service.interceptors.response.use((res) => {
    NProgress.done();
    return Promise.resolve(res.data);
},
(error)=> {
    NProgress.done();
    console.log('err' + error);
    return Promise.reject(error)
});

export default service;
