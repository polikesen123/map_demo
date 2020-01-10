import axios from 'axios'
const http = axios.create({
    transformRequest(data) {
        // console.log(data)
        let str = '';
        for (var k in data) {
            str += `${k}=${data[k]}&`
        }
        return str
    },
    params: {
        t: Math.random()
    },
    timeout: 3000
})
// 添加请求拦截器
http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
// 添加响应拦截器
http.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error);
});
export default http