import axios  from "axios";
import nprogress from "nprogress";
import'nprogress/nprogress.css'

//nprogress start:进度条开始，done():进度条结束
//nprogress需要将引入样式
//引入vuex下detail的UUID身份标识
import detail from '@/vuex/detail'
import user from '@/vuex/loginAndRegister'
const request=axios.create({
    //配制酒对象
    //基础路径。发送请求的时候，路径当中会出现API
    // baseURL:'/api ',
    //设置请求超时的时间为5S
    timeout:5000,
    baseURL: '/api',
})
//请求拦截器
request.interceptors.request.use((config)=>{
        //给请求头添加一个字段（userTempId）,需要与后台协商添加
        //在请求拦截器里面使用token标识用户还是UUID游客
        //需要请求数据是，使用token来标识用户
        console.log(config);
    if(detail.state.uuid_taken)
    {
        config.headers.userTempId= detail.state.uuid_taken       
    }
    if(user.state.token)
    config.headers.token=user.state.token
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