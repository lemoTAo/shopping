//引入插件
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/vuex'
Vue.use(VueRouter)
// import {createRouter,createWebHistory} from 'vue-router'
// 获取原型对象push函数
const originalPush = VueRouter.prototype.push
// 获取原型对象replace函数
const originalReplace = VueRouter.prototype.replace
// 修改原型对象中的push函数
VueRouter.prototype.push = function push(location){
return originalPush.call(this , location).catch(err=>err)
}
// 修改原型对象中的replace函数
VueRouter.prototype.replace = function replace(location){
return originalReplace.call(this , location).catch(err=>err)
}
//引入路由配置项
import {routes} from './routes'
let router= new VueRouter({
    // history: createWebHistory(),
    routes,
    //配置后路由跳转，y对距离顶部的距离设置。。。。
    scrollBehavior () {
        return {
            y:100,
            behavior: 'smooth',}    
    }
}
)
//全局守卫:前值守卫(路由之间的跳转)
//重点，用户登录，用户身份信息携带
router.beforeEach(async(to,from,next)=>{
    //next('/)放行到指定的路由 
    //拿到用户信息，token
    let token= store.state.user.token
    //空对象永远为真
    let name=store.state.user.userInfo.name
    //用户登录pa
    if(token){
        //有token判断跳转

        if(to.path=='/login'){
            next('/home')
        }
        else{
            //跳转其他方向
           if(name){
            next()
           }
           else{
            //前端不能只靠token识别用户，还需要用户信息
              try{
                 await store.dispatch("user/getUserInfo")    
                 next()
                //每次刷新，vuex不是持久化，需要重新发送请求，来保持数据
              }
              catch(err){
                //有token，但是失败，服务颁发的token失效了，退出登录，重新登录
                await store.dispatch('user/userLogout')
                next('/login')
                
              }
           }
        }
    }else{
    let  defaultAddress=to.path
    //未登录，不能轻易交易相关的页面，还不能去支付页面 ，个人中心
    if(to.path.indexOf('/trade')!=-1||to.path.indexOf('center')!=-1||to.path.indexOf('/paySuccess')!=-1||to.path.indexOf('shopcart')!=-1)
     {   console.log('/login?redirect='+defaultAddress);
    
        next(`/login?redirect=${defaultAddress}`)}
    else{
         next()
    }
    }
})
export default  router