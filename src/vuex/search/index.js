//search 模块仓库
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import {reqGetSearchInfo} from '../../api/index'
const state={
    list:[]
}
const actions={
    async getList(context,params={}){
        let result = await reqGetSearchInfo(params)
        if(result.code==200)
        {
            context.commit('GETLIST',result.data)
        }
    },



}
const mutations={
    async GETLIST(state,value){
         state.list= await value
    } 
}
//简化仓库中的数据
const getters={
    attrsList(state){
       return  state.list.attrsList
    },
    goodsList(state){
        return  state.list.goodsList
    },
    trademarkList(state){
    return state.list.trademarkList
    }
}
const search={
    namespaced:true,
    state,
    actions,
    mutations,
    getters,
}
export default search