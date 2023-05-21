import { reqAddressInfo,reqOrderInfo } from "@/api/index"
const actions={
    
    //获取用户地址信息
   async getUserAddress(context){
        let result=await reqAddressInfo()
        new Promise((resolve,reject)=>{
            if(result.code==200)
            {  
                context.commit('ADDRESSINFO',result.data)
            }
            else
            reject('fail')
        })
    },
    async getOrderInfo(context){
        let result=await reqOrderInfo()
       return new Promise((resolve,reject)=>{
            if(result.code==200)
            {   resolve(result.data)
                context.commit('GETORDERINFO',result.data)
            }
            else
              reject('fail')
       })
    }

}
const mutations={
    ADDRESSINFO(state,value){
        state.address=value
    },
    GETORDERINFO(state,value)
    {
        state.goodsList=value
    }

}
const state={
    address:[],
    goodsList:{}
}
const getters={
    goods(state){
        return state.goodsList.detailArrayList||[]
    }

}
const trade={
    namespaced:true,
    actions,
    mutations,
    state,
    getters
}
export default trade