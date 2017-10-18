// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import bulma from 'bulma'

Vue.config.productionTip = false

// Initialize Firebase
let app;
let config = {
  apiKey: "AIzaSyCDxKYY1gWfZE4D3lhA8UiT96cncw28wkY",
  authDomain: "find-food-c47ae.firebaseapp.com",
  databaseURL: "https://find-food-c47ae.firebaseio.com",
  projectId: "find-food-c47ae",
  storageBucket: "",
  messagingSenderId: "553381444532"
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user){
  if(!app){
    /* eslint-disable no-new */
    new Vue({
      el: '#app',
      router,
      template: '<App/>',
      components: { App }
    })
  }
});
