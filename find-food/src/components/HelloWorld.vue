<template>
  <div class="hello">
    <p v-if="geolocateSuccess == false" class='warning'> Can't get location data </p>
    <button v-if="restaurants.length == 0" @click="displayRestaurant()"> Find Restaurant </button>
    <h1 v-if="restaurants.length > 0"> {{ restaurants[currentRestaurant].name }} </h1>
    <p v-if="restaurants.length > 0"> Rating: {{ restaurants[currentRestaurant].rating }} </p>
    <a v-if="restaurants.length > 0" target="_blank" v-bind:href="restaurants[currentRestaurant].mapsrc"> View in google maps </a>
    <button @click="nextRestaurant"> Next! </button>
    <button @click="logout"> logout </button>
  </div>
</template>

<script>
import firebase from 'firebase'
import axios from 'axios'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      restaurants: [],
      currentRestaurant: 0,
      maxRestaurant: 0,
      latitude: null,
      longitude: null,
      geolocateSuccess: false


    }
  },
  mounted () {
    this.getLocation();
  },
  methods:{
    logout() {
      firebase.auth().signOut().then(
        () => this.$router.replace('/login')
      )
    },
    getLocation(){

      var self = this;
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition, showError);
      } else {
          alert("Geolocation is not supported by this browser.");
      }

      function showPosition(position) {
          self.latitude = position.coords.latitude;
          self.longitude = position.coords.longitude;
          self.geolocateSuccess = true;
      }

      function showError(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                console.log("User denied the request for Geolocation.")
                break;
            case error.POSITION_UNAVAILABLE:
                console.log("Location information is unavailable.")
                break;
            case error.TIMEOUT:
                console.log("The request to get user location timed out.")
                break;
            case error.UNKNOWN_ERROR:
                console.log("An unknown error occurred.")
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
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
