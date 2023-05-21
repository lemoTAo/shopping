
import {reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLoginOut } from "../../api/index";
import { setToken,getToken, removeToken } from "@/utils/token";
const actions={
    //验证码
    async getCode(context,phone){
        // 将验证码发送手
        const result=await reqGetCode(phone)
        return new Promise((resolve,reject)=>{
            if(result.code==200)
            {
               context.commit('GETCODE',result.data)
            }
            else{
                reject('获取验证码失败')
            }
        })
    },
    async UserRegister(context,data){
        const result=await reqUserRegister(data)
        return new Promise((resolve,reject)=>{
            if(result.code==200)
            {
                
               resolve('注册成功')
            }
            else{
                reject('注册失败')
            }
        })
    },//登录是服务器下发token,用户唯一标识uuid（前台自己定义的），后主要是用token
    //将来通过token向服务器要用户信息展示
    async UserLogin(context,data){
        const result=await reqUserLogin(data)
        return new Promise((resolve,reject)=>{
            if(result.code==200)
            {   //获取token 
               setToken(result.data.token)
               context.commit('USERLOGIN')
              
               resolve('登录成功')
            }
            else{
                reject('登录失败')
            }
        })
    },
    //登录成功获取用户信息
    async getUserInfo(context){
       let result= await reqUserInfo()
       return new Promise((resolve,reject)=>{
        if(result.code==200)
        {   
           context.commit('GETUSERINFO',result.data)
           resolve('登录成功')
        }
        else{
            reject('登录失败')
        }
    })
    },//退出登录
    async userLogout(context){
        let result= await reqLoginOut()
        return new Promise((resolve,reject)=>{
         if(result.code==200)
         {   
            context.commit('CLEARALL',result.data)
            resolve('登录成功')
         }
         else{
            reject('登出失败')
         }
        })
     },
}
const mutations={
    GETCODE(state,value){
        state.Code=value
    },
    USERLOGIN(state){
        state.token=getToken()
    },
    GETUSERINFO(state,value){
        state.userInfo=value
    },
    CLEARALL(state){
        state.token=""
        state.userInfo={}
       removeToken()
    }
} 
const state={
    Code:"",
    token:getToken(),
    userInfo:{}
}
const getters={
 
}
const user={
    namespaced:true,
    actions,
    mutations,
    state,
    getters
}
export default user