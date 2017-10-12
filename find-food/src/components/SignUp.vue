<template>
  <div class="signup">
    <h1> Create an Account </h1>
    <input type="email" v-model="email" placeholder="email"> </br>
    <input type="password" v-model="password" placeholder="password"> </br>
    <button @click="signup"> SignUp </button> </br>
    <router-link to="/login"> back to login </router-link>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'signup',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods:{
    signup(){
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          alert("Your account has been created");
          this.$router.replace('hello')
        },
        (err) => {
          alert("oops " + err.message)
        }
      );
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
