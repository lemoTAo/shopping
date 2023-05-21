//home 模块仓库
import { reqCatergoryList,reqGetBanner,reqGetFloor} from '../../api/index'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state={
    categoryList:[],
    getBannerList:[],
    getFloorList:[],
}
const actions={
   async categoryList(context){
        let result= await reqCatergoryList()
        context.commit('GETEGORYLIST',result)
    },
    async getBannerList(context){
        let  result=await reqGetBanner()//mock数据是自拟数据，不会真的向服务器发送请求，所以是get不到服务返回数据
        if(result.code==200){
            context.commit('REQGETBANNER',result.data)  
        }
        
    },
    async getFloorList(context){
        let  result=await reqGetFloor()//mock数据是自拟数据，不会真的向服务器发送请求，所以是get不到服务返回数据
        if(result.code==200){
            context.commit('REQGETFLOOR',result.data)  
        }  
    },

}
const mutations={
    GETEGORYLIST(state,categoryList){
       const dealArry  =categoryList.data
        state.categoryList=dealArry.slice(0,15)
    },
    REQGETBANNER(state,getBannerList){
        state.getBannerList=getBannerList
    },
    REQGETFLOOR(state,getFloorList){
        state.getFloorList=getFloorList
    },
    
    
}
const getters={}
 const home={
    namespaced:true,
    state,
    actions,
    mutations,
    getters
}
export default home