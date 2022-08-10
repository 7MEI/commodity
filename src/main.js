import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
// 引入路由
import router from './router/index'
// 三级联动----全局组件
import TypeNav from './pages/Home/TypeNav'
// 全局组件--第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav);
// 映入mockServe
import './mock/mockServer'
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  // 註冊路由
  router,
  store
}).$mount('#app')
