<template>
  <div class="type-nav">
    <div class="container" @mouseleave="leaveNav">
      <h2 class="all" @mouseenter="enterNav">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <transition name="sort" appear >
        <div class="sort" v-if="show">
          <div class="all-sort-list2" @click="goSearch1" >
            <!-- 利用事件委派+编程式导航的实现路由跳转 -->
            <div
              class="item"
              v-for="(c1, index) in categoryList"
              :key="c1.categoryId"
              :class="{ cur: currentIndex == index }"
              @mouseenter="changIndex(index)"
              @mouseleave="leaveIndex"
            >
              <!-- 使用自定义样式则 使用逻辑值-->
              <h3>
                <a
                  :data-categoryName="c1.categoryName"
                  :data-categoryId="c1.categoryId"
                  >{{ c1.categoryName }}</a
                >
              </h3>
              <!-- 三级目录 -->
              <div class="item-list clearfix" v-show="currentIndex == index">
                <!--       -->
                <div class="subitem">
                  <dl
                    class="fore"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dt>
                      <a
                        :data-categoryName="c2.categoryName"
                        :data-category2Id="c2.categoryId"
                        >{{ c2.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a
                          :data-categoryName="c3.categoryName"
                          :data-category3Id="c3.categoryId"
                          >{{ c3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
 
<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";
import "animate.css";
export default {
  name: "TypeNav",
  //挂载完毕通知服务器
  data() {
    return {
      currentIndex: -1,
      show:false
    };
  },
  methods: {
    // 用来显示背景色，二级表示的显示
    changIndex: throttle(function (e) {
      this.currentIndex = e;
    }, 50),
    // 用来显示背景色，二级表示的显示
    leaveIndex() {
      this.currentIndex = -1;
      //good-type隐藏
    },
    /* leaveIndex:throttle(function(){
      this.currentIndex=-1   
    },5000) */  
    goSearch1(e) {
      //解决的方案编程式导航+事件委派 去解决来回切换内存和卡顿
      //问题把所有子节点的事件委派 给父节点
      //点击A标签时才会进行条状，如何决定是A标签
      //即使点击的是A标签如何确定自己点击的是几级路由标签
      // this.$router.push('/search')
      let { categoryname, categoryid, category2id, category3id } =
        e.target.dataset; //自定义属性获取，判断获取是哪一个节点
      if (categoryname) {
        let location = {  name:'Search'};
        let query = { categoryName: categoryname };

        if (categoryid) {
          query.category1Id = categoryid;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }
        if (this.$route.params) {
          location.params = this.$route.params;
          // 合并路径和参数
          location.query = query;
          // 路由调转
          this.$router.push(location);
        }
      }
    },
    //在search显示和隐藏全部商品分类
    enterNav() { 
        this.show = true;
    },
    leaveNav(){
      if(this.$route.name=='Home')
        return 
        else this.show=false
    }
  },
  mounted() {
    this.$store.dispatch("home/categoryList")
    this.show = (this.$route.path == "/home" ? true : false);
  },
  computed: {
    ...mapState({
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
  },
};
</script>

<style lang="less" >
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 31px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
              text-decoration: none;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
        .cur {
          background-color: wheat;
        }
      }
    }
    .sort-enter {
      height: 0px;
    }
    .sort-enter-to {
      height: 461px;
    }
    .sort-enter-active {
      transition: all 0.1s linear;
      overflow: hidden;
    }
  }
}
</style>