
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex)
import { reqCartList,reqUpdateCheckedByid,reqDeleteCartByid } from "../../api/index";
const actions={
   async getCarList(context){
      const result =await reqCartList()
      context.commit('GETCARTLIST',result.data)
  },
  async updateCheckedByid(context,{skuId,isChecked}){ 
    const result=await reqUpdateCheckedByid({skuId,isChecked})
    return new Promise((resolve,reject)=>{
      if(result.code==200){
        resolve('ok')
      }
      else
      reject('over')
    })

  },//删除记录
  async DeleteCart(context,skuId){
    const result = await reqDeleteCartByid(skuId)
    return  new Promise((resolve,reject)=>{
    if(result.code)
      resolve('ok')
    else{
        reject('fail')
      }
    })  
  },//删除全部记录
   deleteAllCheckedCart({dispatch,getters}){
       let PromiseAll=[];
       //遍历发请求，获取遍历的状态
       getters.carList.cartInfoList.forEach(async (item)=>{
          let promise= item.isChecked=='1' ?await dispatch('DeleteCart',item.skuId):'' ;
          PromiseAll.push(promise)
       }
       )
       //Promise.all里面只要有一个失败，就失败
       return Promise.all(PromiseAll)
  },//更改全部勾选状态
   updateAllCheckedByid({dispatch,getters},isChecked){
      let PromiseAll=[]
      getters.carList.cartInfoList.forEach(async (item)=>{
        let promise=await dispatch('updateCheckedByid',{skuId:item.skuId,isChecked}) ;
        await  PromiseAll.push(promise)
     })
    return Promise.all(PromiseAll)
      
  }
}
const mutations={
    GETCARTLIST(state,value){
      state.carList=value
    }
}
const state={
   carList:[]
}
const getters={
  carList:(state)=>{
    return  state.carList[0]||{}
  },
  
}
const shopCart={
    namespaced:true,
    actions,
    mutations,
    state,
    getters
}
export default shopCart