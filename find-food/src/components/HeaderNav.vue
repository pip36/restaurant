<template>

  <nav class="navbar" role="navigation" aria-label="main navigation">

    <div class="navbar-brand">
      <a class="navbar-item">
        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" alt="Bulma">
      </a>
    </div>

    <div class="navbar-menu">
      <div class="navbar-end">
        <p class="navbar-item" v-if="loggedIn()">
          You are logged in
        </p>
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
    }
  }
}
</script>

<style scoped>

</style>
