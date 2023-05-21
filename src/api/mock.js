import axios  from "axios";
import nprogress from "nprogress";
import'nprogress/nprogress.css'
//nprogress start:进度条开始，done():进度条结束
//nprogress需要将引入样式
const request=axios.create({
    //配制酒对象
    //基础路径。发送请求的时候，路径当中会出现API
    baseURL:'/mock',
    //设置请求超时的时间为5S
    timeout:5000,
})
//请求拦截器
request.interceptors.request.use((config)=>{
    nprogress.start()//进度条开始
    return config; 

})
//响应拦截器
request.interceptors.response.use((res)=>{
    nprogress.done()//进度条结束
    return Promise.resolve(res.data)

},()=>{
    return  Promise.reject(new Error('fail'))

})
export default request;