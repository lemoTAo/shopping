<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-show="searchParams.categoryName" @click="removeCategoryName">{{searchParams.categoryName}}<i>×</i></li>
            <li class="with-x" v-show="searchParams.keyword" @click="removeKeyWord">{{searchParams.keyword}}<i>×</i></li>
            <li class="with-x" v-if="searchParams.trademark" @click="removeTrademark">{{searchParams.trademark.slice(2,searchParams.trademark.length)}}<i>×</i></li>
            <!-- 平台参数面包屑显示 -->
            <li class="with-x" v-for="attrValue,index in searchParams.props" :key="index" @click="removeAttr(index)">{{attrValue.split(":")[1]}}<i>×</i></li>
          </ul>
        </div>
        <!--selector-->
        <SearchSelector  @trademarkInfo='trademarkInfo' @attrInfo="attrInfo"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 排序 -->
              <ul class="sui-nav">
                <li :class="{active:isOne}" @click="ChangeOrder(1)" >
                  <a href="javascript:;">综合<span v-show="isOne" class="iconfont" :class="{'icon-long-arrow-down':isDesc,'icon-long-arrow-up':isAsc}"></span>
                  </a>
                </li>
                <li :class="{active:isTwo}" @click="ChangeOrder(2)">
                  <a href="javascript:;">价格<span v-show="isTwo" class="iconfont" :class="{'icon-long-arrow-down':isDesc,'icon-long-arrow-up':isAsc}"></span>
                  </a>
                </li> 
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id" >
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${goods.id}`"><img v-lazy="goods.defaultImg" /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{goods.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="goods.title">Apple苹果iPhone
                      6s (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s (A1699)</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger" >加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
              <v-Pagination :total="total" :continues="5" :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize"  @getpageNo="getpageNo"></v-Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "V-Search",
  data() {
    return {
      searchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        params: "",
        keyword: "",
        order: "1:desc",
        pageNo: 1,
        pageSize: 10,
        props: [],
        trademark: "",
      },
    };
  },
  watch: {
    deep: true,
    $route() {
      //合并参数
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      //发送ajax请求

      this.getData();
      /*        this.searchParams.categoryName=undefined;
        this.searchParams.category1Id=undefined;
        this.searchParams.category2Id=undefined;
        this.searchParams.category3Id=undefined; */
      //参数发生变化是重新获取参数
      this.$router.push({
        name: "Search",
        query: this.$route.query,
        params: this.$route.params,
      });
    },
  },
  computed: {
    ...mapGetters("search", {
      goodsList: "goodsList",
    }),
    ...mapState({
      total:(state)=>{
        return state.search.list.total
      }
    }),
    isOne(){
      return this.searchParams.order.includes('1') 
    },
    isTwo(){
      return  this.searchParams.order.includes('2') 
    },
    isDesc(){
      return  this.searchParams.order.includes('desc') 
    },
    isAsc(){
      return  this.searchParams.order.includes('asc') 
    },
  },
  methods: {
   async getData() {
      await this.$store.dispatch("search/getList", this.searchParams);
    },
    //移除query选项
    removeCategoryName() {
      //undefined 不会携带导服务器
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.getData();
      //此地只删除query参数
      if (this.$route.params) {
        this.$router.push({
          name: "Search",
          params: this.$route.params,
        });
      }
    }, //移除关键字
    removeKeyWord() {
      this.searchParams.keyword = undefined;
      this.getData();

      this.$bus.$emit("clearKeyword");
      if (this.$route.query) {
        this.$router.push({
          name: "Search",
          query: this.$route.query,
        });
      }
    }, //清除品牌面包屑
    removeTrademark() {
      this.searchParams.trademark = undefined;
      this.getData();
      /* this.$router.push({
          name:'Search',
          params:this.$route.params,
          query:this.$route.query
        })  */
    }, //自定义事件回调
    trademarkInfo(trademark) {
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.getData();
    },//清除所选参数
    removeAttr(index) {
      console.log(
        this.searchParams.props.splice(index, 1),
        this.searchParams.props
      );

      this.getData();
    },//自定义事件回调
    attrInfo(attrs, value) {
      let props = `${attrs.attrId}:${value}:${attrs.attrName}`;
      if (!this.searchParams.props.includes(props))
        this.searchParams.props.push(props);
      this.getData();
    },//排序操作
    ChangeOrder(flag){
      // let OriginOrder=this.searchParams.order
      let Orginflag=this.searchParams.order.split(':')[0]
      let OrginSort=this.searchParams.order.split(':')[1]
      
      if(Orginflag==flag){
        this.searchParams.order=`${Orginflag}:${OrginSort!=='asc'?'asc':'desc'}`
      }
      else{
        this.searchParams.order=`${flag}:Asc`
      }
      console.log(this.searchParams.order);
      this.getData()
    },
    getpageNo(e){
    this.searchParams.pageNo=e;
    this.getData()
    },
    toWard(){
      this.$router.push({
        name:'Detail'
      })
    }
  },
  components: {
    SearchSelector,
},
  created() {
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  beforeMount(){
    this.getData();
  }
 
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: 0px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>