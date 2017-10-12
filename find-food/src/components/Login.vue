<template>
  <div class="login">
    <h1> Log In </h1>
    <input type="email" v-model="email" placeholder="email"> </br>
    <input type="password" v-model="password" placeholder="password"> </br>
    <button @click="login"> Login </button> </br>
    <router-link to="/signup"> Don't have an account? Sign up! </router-link>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          this.$router.replace('hello');
        },
        (err) => {
          alert(err);
        }
      );

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
