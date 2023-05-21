<template>
  <div class="spec-preview" v-if="imgObj.length>0" >
    <img :src="imgObj[currentIndex].imgUrl" />/<!-- 数组返回一个空数组，里面没有属性也会返回undefined 一层套一层解决问题 -->
    <div class="event" @mousemove="changeLocation()" ></div>
    <div class="big"  >
      <img :src="imgObj[currentIndex].imgUrl" ref="big"/>
    </div>
    <div class="mask"  ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "v-Zoom",
    data(){
      return {
        currentIndex:0,
        // isShow:'none'
      }
    },
    props:['skuImageList'],//返回数组，网速慢报错，先后顺序问题
    computed:{
      imgObj(){        
        return  this.skuImageList||{}
      }
    },
    methods:{
      //放大镜实现
      changeLocation(){
        //获取dom节点
        const mask=this.$refs.mask
        const big=this.$refs.big
        //offsetX相对元素的位置，...width元素宽度
        let X=event.offsetX-mask.offsetWidth/2;
        let Y=event.offsetY-mask.offsetHeight/2;
        //防止越界
        if(X<0){
          X=0
        }else if(X>=mask.offsetWidth){
          X=event.offsetX-mask.offsetWidth
        }
        if(Y<0){
          Y=0
        }else if(Y>=mask.offsetHeight){
         Y=mask.offsetHeight
        }
       
        // console.log(X,Y);
        mask.style.left=X+'px'
        mask.style.top=Y+'px'
       
        big.style.left=-X+'px'
        big.style.top=-Y+'px'
        
      },
    },
    mounted(){
      this.$bus.$on('changeIndex',(value)=>{
        this.currentIndex=value
      })
    }
    
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>