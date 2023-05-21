<template>
  <div id="app">
   <Header/>
      <router-view></router-view>
   <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>
<script>
import Header from './components/Header/Header.vue'
import Footer from './components/Footer/Footer.vue'
export default {
  name: 'App',
data(){
  return{
    mas:'fdas'
  }
},
  components: {
    Header,
    Footer,
  },
  mounted(){
    //在根组件挂载完毕后发送，提前获取资源存储在仓库里，后续请求中就没有必要重复向服务器获取资源，而是向仓库中获取,主要是组件切换（销毁组件）
    this.$store.dispatch('home/categoryList')
  }
}
</script>

<style>

</style>
