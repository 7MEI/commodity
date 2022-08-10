<template>
  <div>
    <!-- 三级联动全局组件：三级联动已经注册为全局组件，不需要再引入 -->
     <TypeNav></TypeNav>
     <ListContainer/>
     <TodayCommend/>
     <RankList/>
     <Like/>
     <Floor/>
     <Floor/>
  </div>
</template>

<script>
import ListContainer from './ListContainer'
import TodayCommend from './TodayCommend'
import RankList from './RankList'
import Like from './Like'
import Floor from './Floor'
  export default {
      name:'',
      components:{
        ListContainer,
        TodayCommend,
        RankList,
        Like,
        Floor
      }
  }
</script>

<style>

</style>