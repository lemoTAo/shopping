<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="list in cartInfoList" :key="list.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="list.isChecked"
              @change="updateChecked(list,$event.target.checked)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="list.imgUrl" />
            <div class="item-msg">{{ list.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ list.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <div>
              <a
                href="javascript:void(0)"
                class="mins"
                @click="handle('reduce', -1, list)"
                >-</a
              >
              <input
                autocomplete="off"
                type="text"
                :value="list.skuNum"
                minnum="1"
                class="itxt"
                @change="handle('change', $event.target.value * 1, list)"
              />
           
              <a
                href="javascript:void(0)"
                class="plus"
                @click="handle('add', +1, list)"
                >+</a
              >
            </div>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ list.skuPrice * list.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteGoods(list.skuId)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllCheck" @change="updateAllChecked($event.target.checked)"/>
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteAllChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from 'lodash/throttle'
export default {
  name: "ShopCart",
  data() {
    return {};
  },
  computed: {
    ...mapGetters("shopCart", {
      carList: "carList",
    }),
    cartInfoList() {
      return this.carList.cartInfoList || [];
    }, //总价
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        sum += item.skuNum * item.skuPrice;
      });
      return sum;
    },
    isAllCheck() {
      //every 返回BOOLEAN值，根据return 的表达判断
     
        const a=this.cartInfoList.length>0 ?this.cartInfoList.every((item) => { return  item.isChecked === 1}): false;
         return a
    },
  },
  methods: {
    getData() {
      this.$store.dispatch("shopCart/getCarList");
    },//type区分，changNum变化量，cart变化的那一条数据
     handle:throttle( async function(type, changNum, cart){
         switch (type) {
              case "reduce":
                changNum = cart.skuNum > 1 ? -1 : 0
                break;
              case "add":
                changNum = 1;
                console.log(1);
                
                break;
              case "change": //自己写入的两种情况
                if (isNaN(changNum) || changNum < 1) {
                  changNum = 0;
                } else {
                  changNum = parseInt(changNum) - cart.skuNum;
                }
            }
           try {
              
              await this.$store.dispatch("detail/addOrUpdateShopCar", {
                skuId: cart.skuId,
                skuNum: changNum
              });
              await   this.getData();
            } catch (err) {
              console.log(err);
            }
        },1000)
        ,//修改状态是否选中
     async updateChecked(cart,isChecked){
    try{
      let checked=isChecked?"1" :"0"
      await this.$store.dispatch('shopCart/updateCheckedByid',{skuId:cart.skuId,isChecked:checked*1})
       await this.getData()
     }
    catch(err){
      console.log(err);
      
    }
    },//删除产品，一次上一次
   async deleteGoods(skuId){
      try{
       await  this.$store.dispatch('shopCart/DeleteCart',skuId)
       this.getData()
      }
      catch(err){
        console.log(err);
        
      }
    },//删除全部产品
    async deleteAllChecked(){
    try{
      await this.$store.dispatch('shopCart/deleteAllCheckedCart')
      await this.getData()
    }
    catch(err){
      console.log(err.message);
      
    }
    },//修改全部选中状态
    async updateAllChecked(isChecked){
     try{
      const checked=isChecked?"1":"0"
      await  this.$store.dispatch('shopCart/updateAllCheckedByid',checked)
      this.getData()
     }catch(err){
      alert(err.message);
      
     }
    }
  },
  mounted() {
    this.getData();
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 5%;
          height: 82px;
          line-height: 82px;
        }

        .cart-list-con2 {
          padding-left: 10%;
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        // .cart-list-con3 {
        //   width: 10%;

        //   .item-txt {
        //     text-align: center;
        //   }
        // }

        .cart-list-con4 {
          width: 10%;
          height: 82px;
          line-height: 82px;
        }

        .cart-list-con5 {
          width: 15%;
          height: 82px;

          div {
            padding-top: 20px;
            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 12px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 40px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 12px;
            }
          }
        }

        .cart-list-con6 {
          width: 12%;
          height: 82px;
          line-height: 82px;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;
          height: 82px;
          line-height: 35px;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>