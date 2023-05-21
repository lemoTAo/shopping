//该模块。对API接口进行统一的管理
import requests from "./request";
import mockRequest from './mock'
//三级联动地址
// /api/product/getBaseCategoryList   GET 无参数
 //发送axios 请求发送返回一个Promise对象
export const reqCatergoryList=()=> requests.get('/product/getBaseCategoryList')//api必须写在李阿敏，提取公用Baseurl报错
//获取bannerlist
export const reqGetBanner=()=>mockRequest.get('/banner')
//获取floorList
export const reqGetFloor=()=>mockRequest.get('/floor')   
export const reqGetSearchInfo = (params) =>
    requests({
        url: "/list",
        method: "post",
        data: params, //当前这个接口，给服务器传递参数params，至少是一个空对象
    });
//获取产品详情接口
export const reqGoodsInfo=(id)=>requests({
    url:`/item/${id}`,
    method:'GET'
})
//购物车商品添加
//通过post请求，向服务器存储购物车，
export const reqAddOrUpdateShopCar=(skuId,skuNum)=>requests({
        url: `/cart/addToCart/${skuId}/${skuNum}`,
        method:'POST'
})
//获取购物车列表，从post请求整理好然后读取
export const reqCartList=()=>requests({
    url:'/cart/cartList',
    method:'GET'
})
//修改商品的状态
export const reqUpdateCheckedByid=async ({skuId,isChecked})=>await requests({
    url:`/cart/checkCart/${skuId}/${isChecked}`,
    method:'GET'

})
//删除商品
export const reqDeleteCartByid=(skuId)=>requests({
    url:`/cart/deleteCart/${skuId}`,
    method:'DELETE'

})
//请求验证码
export const reqGetCode=(phone)=>requests({
    url:`/user/passport/sendCode/${phone}`
    ,method:"GET"
})
export const reqUserRegister=(data)=>requests({
    url:`/user/passport/register`,
    method:"POST",
    data,
})//登录
export const reqUserLogin=(data)=>requests({
    url:`/user/passport/login`,
    method:"POST",
    data,
})//携带token向服务要数据
export const reqUserInfo=()=>requests({
    url:`/user/passport/auth/getUserInfo`,
    method:"get",
})//退出登录
export const reqLoginOut=()=>requests({
    url:`/user/passport/logout`,
    method:"get",
})
//获取用户地址信息
export const reqAddressInfo=()=>requests({
    url:`/user/userAddress/auth/findUserAddressList`,
    method:"get",
})
//获取商品清单
export const reqOrderInfo=()=>requests({
    url:`/order/auth/trade`,
    method:"get"

})
//提交订单   
export const reqSubmitInfo=(tradeNO,data)=>requests({
    url:`/order/auth/submitOrder?tradeNo=${tradeNO}`,
    method:"POST",
    data

})
//获取支付信息
export const reqPayInfo=(TradeId)=>requests({
    url:`/payment/weixin/createNative/${TradeId}`,
    method:"GET",

})
//账单状态
export const reqPayStatus = (orderId) => requests({ 
    url: `/payment/weixin/queryPayStatus/${orderId}`, 
    method: 'get' 
});
//获取个人中心的数据
export const reMuOrderList=(page,limit)=>requests({
    url: `/order/auth/${page}/${limit}`, 
    method: 'get' 
})