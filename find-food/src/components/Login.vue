<template>
  <div class="login">

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
          <button class="button is-link" @click="login"> Login </button>
      </div>
      <div class='control'>
          <router-link class="button is-text" to="/signup"> Don't have an account? Sign up! </router-link>
      </div>
    </div>

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
