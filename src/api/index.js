//API进行统一管理
import request from "./request";
import ajaxMock from "./AjaxMock";
import { mock } from "mockjs";
//三级联动接口
export const reqCategoryList = ()=>(request({
    url: '/product/getBaseCategoryList',
    method:'get',
}))
// 轮播列表
export const reqBanner =()=>ajaxMock.get('/Banner')
// Floor
export const reqFloor =()=>ajaxMock.get('/Floor')