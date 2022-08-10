//axios二次封装
import axios from "axios";
// 引入进度条
// start:进度条开始， done：进度条结束 2.引入进度条样式
import nprogress from 'nprogress';
import "../../node_modules/nprogress/nprogress.css"


// 1.'1:利用axios对象的方法create，去创建一个axios实例'
//2 : request就是axios，只不过稍微配置一下
const request = axios.create({
    //配置对象
    //基础路径,发请求的时候，路径当中会出现api
    baseURL:"/api",
    timeout:5000,
});
//请求拦截器:在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
request.interceptors.request.use((config)=>{
    // 进度条开始
    nprogress.start();
    //  config:配置对象，对象里面有一个属性很重要，headers请求头
    return config;
});
// 响应拦截器
request.interceptors.response.use((res)=>{
    // 进度条介绍
    nprogress.done();
    // /成功的回调函数:服务器相应数据回来以后，响应拦截器可以检测到，可以做一些事情
    return res.data;
},(error)=>{
    //响应失败的回调函数
    return Promise.reject(new Error('faile'));

})
export default request;