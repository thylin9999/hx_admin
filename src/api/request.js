// import axios from "axios"
//
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
//
// // 请求拦截器
// axios.interceptors.request.use(function (config) {
//     return config;
// }, function (error) {
//     return Promise.reject(error);
// })
// // 响应拦截器
// axios.interceptors.response.use(function (response) {
//     return response;
// }, function (error) {
//     return Promise.reject(error);
// })
//
// // 封装axios的post请求
// export function fetch(url, params) {
//     return new Promise((resolve, reject) => {
//         axios.post(url, params)
//             .then(response => {
//                 resolve(response.data);
//             })
//             .catch((error) => {
//                 reject(error);
//             })
//     })
// }

import axios from 'axios'
import {getToken} from "../util/cookie"

const instance = axios.create({
    timeout: 6000
})

const errorHandle = (error) => {
    console.log(error, '出错了')
    return Promise.reject(error)
}

instance.interceptors.request.use(config => {
    const token = getToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    // 请求拦截器
    return config
}, errorHandle)

instance.interceptors.request.use(config => {
    // 请求拦截器
    return config
}, errorHandle)

instance.interceptors.response.use(response => {
    // 响应拦截器
    return response
}, errorHandle)

export default instance

