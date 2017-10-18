<template>

  <nav class="navbar" role="navigation" aria-label="main navigation">

    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <img src="../assets/logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="100" height="28">
      </a>
      <button @click="toggleHamburger()" :class="{ 'is-active': hamburgerOpen }" class="button navbar-burger" data-target="main-nav">
        <span></span>
        <span></span>
        <span></span>
      </button>

    </div>

    <div :class="{ 'is-active': hamburgerOpen }" class="navbar-menu" id="main-nav">
      <div class="navbar-end">

        <a class="navbar-item" v-if="loggedIn()" @click="logout()">
          Log out
        </a>

        <router-link to="/signup" class="navbar-item" v-if="!loggedIn()"> Create Account </router-link>
        <router-link to="/login" class="navbar-item" v-if="!loggedIn()"> Login </router-link>

      </div>
    </div>

  </nav>

</template>

<script>
import firebase from 'firebase'
export default {
  name: 'headernav',
  data () {
    return {
      hamburgerOpen: false
    }
  },
  methods:{
    loggedIn() {
      let currentUser = firebase.auth().currentUser;
      return currentUser ? true : false
    },
    logout() {
      firebase.auth().signOut().then(
        () => this.$router.replace('/login')
      )
    },
    toggleHamburger(){
      (this.hamburgerOpen) ? this.hamburgerOpen = false : this.hamburgerOpen = true
    }
  }
}
</script>

<style scoped>
  .logo{
      height:140px;
      margin-top: -40px;
  }

  .navbar-brand{
    overflow: visible;
  }

  nav{
    z-index: 5;
  }
</style>
