<template>
  <div class="signup">

    <div class='field'>
      <div class='label'> Email </div>
      <div class='control'>
        <input class="input" type="email" v-model="email" placeholder="email">
      </div>
    </div>

    <div class='field'>
      <div class='label'> Password </div>
      <div class='control'>
          <input class="input" type="password" v-model="password" placeholder="password">
      </div>
    </div>

    <div class='field is-grouped'>
      <div class='control'>
          <button class="button is-link" @click="signup"> SignUp </button>
      </div>
      <div class='control'>
          <router-link class="button is-text" to="/login"> already have an account? </router-link>
      </div>
    </div>

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
