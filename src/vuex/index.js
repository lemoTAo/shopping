import Vue from "vue";
import Vuex from 'vuex'
Vue.use(Vuex)
import home from './home/index'
import search from './search/index'
import detail from './detail/index'
import shopCart from "./shopCart/index";
import user from './loginAndRegister/index'
import trade from "./Trade";
export default new Vuex.Store({
   modules:{
    home,
    search,
    detail,
    shopCart,
    user,
    trade
   }
})