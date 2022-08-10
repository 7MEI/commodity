import VueRouter from "vue-router";
import Vue from "vue";
import Home from '../pages/Home';
import Search from '../pages/Search';
import Register from '../pages/Register/index';
import Login from '../pages/Login';

Vue.use(VueRouter)//使用插件

// 重写push和replace方法
// 1.先把vueRouter原型对象的push,replace方法保存
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
// 2.开始重写方法
// 第一个参数：告诉原来的push方法，往哪里跳转，传递的参数
// 第二个参数：成功的回调
// 第三个参数：失败的回调
VueRouter.prototype.push = function(location,resolve,reject){
    if(resolve && reject){
        // call和apply的区别
        // 相同点：都可以调用函数一次，都可以改变函数上下文一次
        // 不同点：call和apply传递参数，call传递参数用逗号隔开，apply传递数组
        originPush.call(this,location,resolve,reject);
    }else{
        originPush.call(this,location,()=>{},()=>{});
    }
}
VueRouter.prototype.replace = function(location,resolve,reject){
    if(resolve && reject){
        originReplace.call(this,location,resolve,reject);
    }else{
        originReplace.call(this,location,()=>{},()=>{});
    }
}

// 創建并暴露路由器
export default new VueRouter({
    routes:[
       
        {
            path:'/home',
            component:Home,
            meta:{show:true}
        },
        {
            path:'/search/:keyword?',
            component:Search,
            name:'search',
            meta:{show:true},
             //路由也可以传递props数据，拥有三种写法
            //如果 props 被设置为 true，params参数将会被设置为组件属性
            // props:true,
            // props:{a:1,b:2}
            props: (route) => ({ keyWord: route.params.keyWord})

        },
        {
            path:'/register',
            component:Register,
            meta:{show:false}
        },
        {
            path:'/login',
            component:Login,
            meta:{show:false}
        },
         // 重定向，访问/，立即定向到首页
         {
            path:'*',
            redirect:'/home'
        },
    ]
})