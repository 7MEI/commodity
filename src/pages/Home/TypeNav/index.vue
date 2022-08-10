<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container" @mouseenter="mouseenter" @mouseleave="mouseleave">
      <h2 class="all">全部商品分类</h2>
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
      <!-- 过渡动画  transition-->
      <transition name="sort">
        <div class="sort" v-show="show" >
          <div class="all-sort-list2" @click="goSearch">
            <div class="item" v-for="(c1, index) in categoryList" :key="index">
              <h3>
                <a
                  :data-categoryName="c1.categoryName"
                  :data-category1Id="c1.categoryId"
                  >{{ c1.categoryName }}</a
                >
              </h3>
              <div class="item-list clearfix">
                <div
                  class="subitem"
                  v-for="(c2, index) in c1.categoryChild"
                  :key="index"
                >
                  <dl class="fore">
                    <dt>
                      <a
                        :data-categoryName="c2.categoryName"
                        :data-category2Id="c2.categoryId"
                        >{{ c2.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em v-for="(c3, index) in c2.categoryChild" :key="index">
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
import { computed } from "vue";
import { mapState } from "vuex";
export default {
  name: "TypeNav",
  //组件挂载完毕:可以向服务器发请求
  data() {
    return {
      show: true,
    };
  },
  mounted() {
    //通知Vuex发请求，获取数据，存储于仓库当中
    this.$store.dispatch("categoryList");
    // 当路径是home为true,其他为false
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      //右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
      //注入一个参数state，其实即为大仓库中的数据
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
  },
  methods: {
    // 路由跳转方法
      goSearch(event) {
      //点击a标签进行路由跳转：父节点代理的子节点的类型很多 div h3 dd dt em a
      //通过event可以获取到当前触发事件的节点
      let nodeElement = event.target;
      //给a标签添加自定义属性data-categoryName，保证这个节点带data-categoryName，一定是a标签
      //可以通过节点的dataset属性获取相应节点的自定义属性，返回的是一个对象KV【自定义属性相关的】
      //如果带有categoryname字段的一定是a标签
      let { categoryname, category1id, category2id, category3id } =
        nodeElement.dataset;
      //执行if语句：只能区分点击的标签是不是a
      if (categoryname) {
        //准备路由跳转的参数
        let location = { name: 'search' };
        let query = { categoryName: categoryname };
        //一级分类的a标签
        if (category1id) {
          query.category1Id = category1id;
          //二级分类的a标签
        } else if (category2id) {
          query.category2Id = category2id;
          //三级分类a标签
        } else {
          query.category3Id = category3id;
        }
        //路由跳转之前：看一下有没有params参数，如果有params参数需要携带给search
        if (this.$route.params) {
          //query参数
          location.query = query;
          //params
          location.params = this.$route.params;
          //如有有params参数也需要携带给search模块
          //home->search确实需要记录历史
          //search->search不需要存储历史记录
          if (this.$route.path != "/home") {
            this.$router.replace(location);
          } else {
            this.$router.push(location);
          }
        }
      }
    },
    // goSearch1(event) {
    //   //最好的解决方案:编程式导航＋事件委派
    //   //存在一些问题:事件委派，是把全部的子节点【h3、dt、dl、em】的事件委派给父亲节点//点击a标签的时候，才会进行路由跳转【怎么能确定点击的一定是a标签】
    //   //存在另外一个问题:即使你能确定点击的是a标签，如何区分是一级、二级、三级分类的标签。

    //   //第一个问题:把子节点当中a标签，我加上自定义属性data-categoryName，其余的子节点是没有的
    //   // 第二个问题 区分一级 二级 三级分类 加上自定义属性categoryId1,categoryId2,categoryId3
    //   let nodeElement = event.target;
    //   // console.log(ele)
    //   // //获取到当前出发这个事件的节点【h3、a、dt、dl】，需要带有data-categoryname这样节点【一定是a标签
    //   // //节点有一个属性dataset属性，可以获取节点的自定义属性与属性值
    //   let { categoryname, categoryid1, categoryid2, categoryid3 } =
    //     nodeElement.dataset;
    //   // //如果标签身上拥有categoryname一定是a标签
    //   console.log(nodeElement.dataset)
    //   console.log('777' +categoryname)
    //   if (true) {
    //     // 整理跳转的路由
    //     console.log('zouiF')
    //     let location = { name: "search", };
    //     let query = { categoryName: categoryname };
    //     if (categoryid1) {
    //       query.categoryId1 = categoryid1;
    //     } else if (categoryid2) {
    //       query.categoryId2 = categoryid2;
    //     } else {
    //       query.categoryId3 = categoryid3;
    //     }
    //   //   // 整理query
      
    //     location.query = query;
    //   //   // 路由跳转
    //     this.$router.push(location);
    //   }
    // },
    // 鼠标进入show变化
    mouseenter() {
      if (this.$route.path != "/home") {
        this.show = true;
      }
    },
    // 鼠标离开
    mouseleave() {
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
  },
};
</script>

<style lang="less">
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
        .item:hover {
          background-color: rgb(114, 167, 114);
        }
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
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
      }
    }
    // 过渡动画样式
    .sort-enter{
      height: 0;
    }
    .sort-enter-to{
      height: 461px;
    }
    .sort-enter-active{
      transition: all .5s linear;
    }
  }
}
</style>