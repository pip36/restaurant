<template>
  <div id="app">
    <header-nav> </header-nav>
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
import headernav from './components/HeaderNav'
//https://us-central1-find-food-c47ae.cloudfunctions.net/test?latitude=-33.8670522&longitude=151.1957362
export default {
  name: 'app',
  components:{
    'header-nav': headernav
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
