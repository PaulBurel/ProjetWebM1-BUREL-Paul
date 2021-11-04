<template>
  <div id="app">
    <v-toolbar color="rgb(157, 220, 224)">
      <v-toolbar-title class="title"
        ><router-link to="/" class="logo"
          >WikiResto</router-link
        ></v-toolbar-title
      >
      <v-spacer></v-spacer>
    </v-toolbar>

    <h1 class="titre">{{ restaurant.name }}</h1>
    <p>
      Le restaurant situé dans le quartier de {{ restaurant.borough }} au
      {{ restaurant.address.building }} {{ restaurant.address.street }}
    </p>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <p>
      {{ restaurant.name }} propose une cuisine de type
      {{ restaurant.cuisine }}
    </p>
    <p>Ci dessous vous trouverez des photos prises par des clients</p>

    <br />

    <div class="carte">
      <l-map
        :center="center"
        :zoom="zoom"
        class="map"
        ref="map"
        @update:zoom="zoomUpdated"
      >
        <l-tile-layer :url="url"> </l-tile-layer>
        <l-marker :lat-lng="center">
          <l-icon ref="icon">
            <img class="restaurant-icon" :src="imageUrl" /> </l-icon
        ></l-marker>
      </l-map>
    </div>
    <div class="caroussel">
      <v-carousel style="width: 400px; height: 300px">
        <v-carousel-item
          v-for="(item, i) in items"
          :key="i"
          :src="item.src"
          reverse-transition="fade-transition"
          transition="fade-transition"
        ></v-carousel-item>
      </v-carousel>
    </div>
  </div>
</template>

<script>
import { LMap, LTileLayer } from "vue2-leaflet";
import { LIcon, LMarker } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";

export default {
  components: {
    LMap,
    LMarker,
    LIcon,
    LTileLayer,
  },
  name: "RestaurantDetail",
  props: {},
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  data: function () {
    return {
      restaurant: null,
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      center: [49.1193089, 6.1757156],
      zoom: 15,
      imageUrl: "https://img.icons8.com/doodle/48/000000/the-toast--v2.png",
      items: [
        {
          src: "https://cdn.pixabay.com/photo/2015/04/20/13/30/kitchen-731351_960_720.jpg",
        },
        {
          src: "https://cdn.pixabay.com/photo/2017/01/26/02/06/platter-2009590_960_720.jpg",
        },
        {
          src: "https://cdn.pixabay.com/photo/2015/04/08/13/13/food-712665_960_720.jpg",
        },
      ],
    };
  },
  mounted() {
    console.log("ca marche ");
    console.log(this.id);
    let url = "http://localhost:8080/api/restaurants/" + this.id;
    fetch(url)
      .then((reponse) => {
        return reponse.json();
      })
      .then((data) => {
        console.log(data.restaurant.name);
        this.restaurant = data.restaurant;
        this.center[0] = data.restaurant.address.coord[1];
        this.center[1] = data.restaurant.address.coord[0];
      });
  },
  methods: {
    getDetails() {},
    zoomUpdated(zoom) {
      this.zoom = zoom;
      console.log(this.markers);
    },
  },
};
</script>

<style scoped>
.map {
  position: absolute;
  top: 13%;
  left: 25%;
  width: 50%;
  height: 50%;
  overflow: hidden;
  border-radius: 5px;
  border: 1px solid rgb(172, 172, 172);
  background-color: rgb(246, 245, 240);
}
.restaurant-icon {
  height: 50px;
  width: auto;
}

.titre {
  text-align: center;
}

.carte {
  background-color: rgb(246, 245, 240);
  font-family: "Roboto";
}

p {
  text-align: center;
}

.caroussel {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  color: rgb(31, 31, 31);
  text-decoration: none;
  font-size: 1.5em;
}
.logo:active {
  color: rgb(31, 31, 31);
}
</style>