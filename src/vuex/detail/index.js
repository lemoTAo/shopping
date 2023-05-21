import Vue from "vue";
import Vuex from 'vuex'
Vue.use(Vuex)
import {reqGoodsInfo,reqAddOrUpdateShopCar} from '../../api/index'
import {getUuid} from '../../utils/uuid_taken'
const actions={
   async getGoodInfo(context,value){
       let result= await reqGoodsInfo(value)
        if(result.code==200)
    {
        context.commit('GETGOODINFO',result.data)
    }
    },
    async addOrUpdateShopCar(context,{skuId,skuNum}){
        const result= await reqAddOrUpdateShopCar(skuId,skuNum)
         //返回数据为空不需要存储
         return new Promise((resolve,reject)=>{
             if(result.code==200){
                  resolve('ok')
                  console.log('请求成功');
             }
             else
             reject('failen')
         })
     }
}
const mutations={
    GETGOODINFO(state,value){
        state.goodInfo=value
    }
} 
const state={
    //如果是一个空对象。在getter返回值是需要在后面添加||{}，因为对象不能接受undefined
    goodInfo:{},
    //用户身份表示
    uuid_taken:getUuid()
} 
const getters={
    categoryView(state){
        //导航简化的数据
        return  (state.goodInfo.categoryView)||{}//网速慢没有及时返回
    },
    skuInfo(state){
        //简化商品信息
        return  (state.goodInfo.skuInfo)||{}//网速慢没有及时返回
    },
    spuSaleAttrList (state){
        //返售卖属性
        return  (state.goodInfo.spuSaleAttrList)||[]//网速慢没有及时返回
    },
} 
const detail={
    namespaced:true,
    actions,
    mutations,
    state,
    getters
}
export default detail