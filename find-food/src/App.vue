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
