// home模块的小仓库
import { reqCategoryList, reqBanner, reqFloor } from '../../api/index'
// state:仓库存储数据的地方
const state = {
    categoryList: [],
    banner: [],
    floor: []
};
//mutations:修改state的唯一手段
const mutations = {
    CategoryList(state, categoryList) {
        state.categoryList = categoryList;
    },
    // 轮播图
    GETBANNER(state, banner) {
        state.banner = banner;
    },
    GETFLOOR(state,floor){
        state.floor = floor;
    }
};
// action:处理action,可以书写自己的业务逻辑，也可以处理异步
const actions = {
    async categoryList({ commit }) {
        let result = await reqCategoryList();
        if (result.code === 200) {
            commit("CategoryList", result.data);
        }
    },
    // 轮播图
    async getBanner({ commit }) {
        let result = await reqBanner();
        console.log('sss',result);
        if (result.code === 200) {
            commit("GETBANNER", result.data);
        }
    },
    // 
    async getFloor({commit}){
        let result = await reqFloor();
        
        if(result.code === 200){
            commit("GETFLOOR",result.data);
        }

    }
};
//getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据
const getters = {};
export default ({
    state,
    mutations,
    actions,
    getters
})