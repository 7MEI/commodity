// 利用mockjs来mock数据接口

import Mock from 'mockjs'
import banner from './Banner.json'
import floor from './Floor.json'

// 提供广告位轮播图数据接口
// 第一个参数请求地址，第二个参数：请求数据
Mock.mock("/mock/Banner",{code:200,data:banner});
Mock.mock("/mock/Floor",{code:200,data:floor});