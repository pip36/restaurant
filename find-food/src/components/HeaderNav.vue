<template>
  <div class="headernav">
    <p v-if="loggedIn()"> You are logged in </p>
  </div>
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
    }
  }
}
</script>

<style scoped>

</style>
