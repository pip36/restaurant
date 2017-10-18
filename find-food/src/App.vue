<template>
  <div id="app">
    <header-nav> </header-nav>
    <div class="container">
      <router-view/>
    </div>
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

}
.container{

}
</style>
