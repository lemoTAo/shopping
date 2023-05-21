import Vue from 'vue'
import App from './App.vue'
//三级联动组件--全局组件
import TypeNav from './components/TypeNav/TypeNav.vue'
Vue.component(TypeNav.name,TypeNav)
import carousel from './components/carousel'
Vue.component(carousel.name,carousel)
import Pagination from './components/PagiNation/index.vue'
Vue.component(Pagination.name,Pagination)
//引入配置router
Vue.config.productionTip = false
import router from './router/index'
import {Button,MessageBox} from 'element-ui'
Vue.component(Button.name,Button)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//vuex
import vuex from 'vuex'
Vue.use(vuex)
import store from './vuex/index'
//引入所用API
import * as API from '@/api'
//vue 图片懒加载
import VueLazyload from 'vue-lazyload'
import ikun from '@/assets/R-C.gif'
Vue.use(VueLazyload,{
  loading:ikun
})
import '@/plugins/validate'
//测试
import {reqCatergoryList,reqGetSearchInfo} from './api/index'
//mockDev
import './mock/mockDev'
//引入swiper样式
import 'swiper/swiper-bundle.css'
reqCatergoryList()
reqGetSearchInfo()
new Vue({
  render: h => h(App), 
  store,
  router,
  beforeCreate(){
   Vue.prototype.$bus=this
   //将所有的请求绑定到原型链上
   Vue.prototype.$API=API
  }
 
}).$mount('#app')


