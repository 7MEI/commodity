<template>
  <div id="app">
    <Header></Header>
    <router-view>
       
    </router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
import TypeNav from './pages/Home/TypeNav'
export default {
  name: 'App',
  components:{
    Header,
    Footer,
    TypeNav,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
