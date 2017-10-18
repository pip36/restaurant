<template>

  <div class="hello">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <warning-message v-if="geolocateSuccess == 2">
      Cannot get location data. Make sure you have enabled location services, and try refreshing your browser.
    </warning-message>

    <warning-message v-if="geolocateSuccess == 3">
       Cannot get location data at this time, please try again later.
     </warning-message>

    <warning-message v-if="geolocateSuccess == 4">
      Your browser does not support location services. Please update to the latest version.
    </warning-message>

    <div class="main">

      <div v-if="geolocateSuccess == 1" class='field centered'>
        <div class='control'>
            <button class="button is-large is-outlined is-primary" v-if="restaurants.length == 0" @click="displayRestaurant()"> Find Restaurant </button>
        </div>
      </div>

      <div  v-if="restaurants.length > 0" class="centered">
        <h1 class="title is-4 is-spaced"> {{ restaurants[currentRestaurant].name }} </h1>
        <figure class="image">
          <img src="https://bulma.io/images/placeholders/640x480.png">
        </figure>

        <div class="columns">
          <div class="column">
            <span class="icon has-text-success">
              <i :class="{ unchecked: restaurants[currentRestaurant].rating < 0.5 }" class="fa fa-star fa-1x"></i>
              <i :class="{ unchecked: restaurants[currentRestaurant].rating < 1.5 }" class="fa fa-star fa-1x"></i>
              <i :class="{ unchecked: restaurants[currentRestaurant].rating < 2.5 }" class="fa fa-star fa-1x"></i>
              <i :class="{ unchecked: restaurants[currentRestaurant].rating < 3.5 }" class="fa fa-star fa-1x"></i>
              <i :class="{ unchecked: restaurants[currentRestaurant].rating < 4.5 }" class="fa fa-star fa-1x"></i>
            </span>
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <a class="button is-medium is-outlined is-primary" target="_blank" v-bind:href="restaurants[currentRestaurant].mapsrc"> Take me there </a>
          </div>
          <div class="column">
            <button class="button is-medium is-outlined is-primary" v-if="restaurants.length > 0" @click="nextRestaurant"> Next! </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import axios from 'axios'
import warningmessage from './WarningMessage'

export default {
  name: 'HelloWorld',
  components: {
    'warning-message': warningmessage
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      restaurants: [],
      currentRestaurant: 0,
      maxRestaurant: 0,
      latitude: null,
      longitude: null,
      geolocateSuccess: 0  //0-default, 1-success, 2-failed, 3-location unavailable, 4-unsupported-browser
    }
  },
  mounted () {
    this.getLocation();
  },
  methods:{
    getLocation(){

      var self = this;
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition, showError);
      } else {
          alert("Geolocation is not supported by this browser.");
          self.geolocateSuccess = 4;
      }

      function showPosition(position) {
          self.latitude = position.coords.latitude;
          self.longitude = position.coords.longitude;
          self.geolocateSuccess = 1;
      }

      function showError(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                console.log("User denied the request for Geolocation.")
                self.geolocateSuccess = 2
                break;
            case error.POSITION_UNAVAILABLE:
                console.log("Location information is unavailable.")
                self.geolocateSuccess = 3
                break;
            case error.TIMEOUT:
                console.log("The request to get user location timed out.")
                self.geolocateSuccess = 2
                break;
            case error.UNKNOWN_ERROR:
                console.log("An unknown error occurred.")
                self.geolocateSuccess = 2
                break;
        }
      }

    },
    displayRestaurant(){
      var self = this;
      if(!this.geolocateSuccess){
        console.log("no geolocation data available");
        return
      }
      axios.get('https://us-central1-find-food-c47ae.cloudfunctions.net/test?latitude=' + this.latitude + '&longitude=' + this.longitude)
        .then(function (response) {

          var newRestaurants = [];
          for(var i = 0; i < response.data.results.length; i++){
            var rest_data = response.data.results[i];
            if( (rest_data.opening_hours != undefined) && (rest_data.opening_hours.open_now == false || rest_data.opening_hours == undefined) ){ continue; }
            console.log(rest_data);
            var name = (rest_data.name) ? rest_data.name : null;
            var rating = (rest_data.rating != undefined) ? rest_data.rating : null;
            var price = (rest_data.price != undefined) ? rest_data.price : null;
            var photoref = (rest_data.photos != undefined) ? rest_data.photos[0].photo_reference : null;
            var open = (rest_data.opening_hours != undefined) ? rest_data.opening_hours.open_now : null;
            var latitude = rest_data.geometry.location.lat;
            var longitude = rest_data.geometry.location.lng;
            var mapsrc = "https://www.google.co.uk/maps/place/" + name + "/@"+ latitude + "," + longitude + ",19z";
  //https://www.google.co.uk/maps/place/Smilte+Restaurant/@51.576854,-0.011796,19z/
            var restaurant = {
              name: name,
              rating: rating,
              price: price,
              photoref: photoref,
              open: open,
              latitude: latitude,
              longitude: longitude,
              mapsrc: mapsrc
            }
            newRestaurants.push(restaurant);
          }
          self.restaurants = newRestaurants;
          self.maxRestaurant = newRestaurants.length;

        })
        .catch(function (error) {
          console.log(error);
        });

    },

    nextRestaurant() {
      if(this.currentRestaurant < this.maxRestaurant){ this.currentRestaurant += 1 }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main{
    margin-top: -60px;
    height: 100vh;
    position: relative;
  }

  .unchecked{
    color:grey;
  }
  ul{
    margin-top: 20px;
  }
  .columns{
    margin-top: 10px;
  }
  .column{
    text-align: center;
  }

  .centered{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
