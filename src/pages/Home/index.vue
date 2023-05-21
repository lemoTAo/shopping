<template>
  <div>
   <TypeNav></TypeNav>
    <ListContainer :BannerList="getBannerList"></ListContainer>
    <recommend></recommend>
    <rank></rank>
    <like></like>
    <floor v-for="(floor) in FloorList" :key="floor.id" :list="floor"></floor>
    <brand></brand>
  </div>
</template>

<script>
  import ListContainer from './LIstContainer/index.vue'
  import recommend  from './recommend/index.vue'
  import rank from './rank/index.vue'
  import like from './like/index.vue'
  import floor from './floor/index.vue'
  import brand from './brand/index.vue'
import { mapState } from "vuex";
export default {
    name:'router-home',
    components:{
      ListContainer,
      recommend,
      rank,
      like,
      floor,
      brand,

},
mounted(){
  //floor返回来两组数据，需要在父组件里面发送请求，在遍历到组件里面
  this.$store.dispatch('home/getFloorList')
  this.$store.dispatch("home/getBannerList");


},
computed:{
  ...mapState({
    FloorList:(state)=>state.home.getFloorList,
    getBannerList: (state) => {
      return state.home.getBannerList;
    },
  }),
},



}
</script>

<style  lang="less">

</style>