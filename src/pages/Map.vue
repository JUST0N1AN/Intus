<template>
  <div class="row justify-center">
    <div id="MAP">
      <h3 class="row justify-center">Map Demo</h3>
      <div class="row justify-center q-mb-md">
        <q-list bordered separator>
          <q-item v-ripple v-for="x in this.markers" :key="x">
            <q-item-section> {{ x.name }}</q-item-section>
            <q-item-section avatar>
              <q-avatar
                clickable
                rounded
                color="primary"
                text-color="white"
                icon="las la-map-marker"
                @click="goToLocation(x)"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-6 offset-3" id="map" />
  </div>

  <q-dialog v-model="carousel">
    <q-carousel
      transition-prev="slide-right"
      transition-next="slide-left"
      swipeable
      animated
      v-model="slide"
      control-color="primary"
      navigation-icon="radio_button_unchecked"
      navigation
      padding
      height="200px"
      class="bg-white shadow-1 rounded-borders"
    >
      <q-carousel-slide :name="1" class="column no-wrap flex-center">
        <q-icon name="las la-igloo" color="primary" size="56px" />
        <div class="q-mt-md text-center">
          <div class="text-h6">{{ busName }}</div>
          {{ busDes }}
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="2" class="column no-wrap flex-center">
        <q-icon name="las la-copy" color="primary" size="56px" />
        <div class="q-mt-md text-center">
          <div class="text-h6">Venue Requirements</div>
          Requirements to enter venue would be here
        </div>
      </q-carousel-slide>
    </q-carousel>
  </q-dialog>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";

import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { addDoc, setDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import db from "../boot/firebase.js";

import "mapbox-gl/dist/mapbox-gl.css";

import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

var mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

let markerID = 0;

export default {
  data() {
    return {
      accessToken:
        "pk.eyJ1Ijoic2hhbmUxMjM0NTYwMSIsImEiOiJjbDE0N2R5ZWQyM3JqM2NxaDZxcmI5c2tlIn0.kwJri8wGDxWD3oIz5rGh8g",
      center: { lat: 0, lng: 0 },
      markers: [],
      homeimg:
        "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
      carousel: false,
      slide: ref(1),
      busName: null,
      busDes: null,
      locSearch: null,
      map: null,
    };
  },
  methods: {
    findCurrLoc() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          this.map.flyTo({ center: this.center });
        },
        (error) => {
          console.log(error.message);
        }
      );
    },
    markerClick() {
      console.log("Marker Clicked");
      this.carousel = true;
      this.busName = g.name;
    },

    async getMarkers() {
      const auth = getAuth();
      const user = auth.currentUser;
      const querySnapshot = await getDocs(collection(db, "business"));
      querySnapshot.forEach((doc) => {
        if (doc.data().locations) {
          this.markers.push(doc.data());
        }
      });
    },
    searchLocation() {
      console.log(this.locSearch);
    },
    goToLocation(x) {
      const newLoc = { lat: x.locations.lat, lng: x.locations.lng };
      this.map.flyTo({ center: newLoc });
    },
  },
  beforeMount() {
    this.findCurrLoc();
  },

  mounted() {
    this.getMarkers();
    mapboxgl.accessToken = this.accessToken;
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic2hhbmUxMjM0NTYwMSIsImEiOiJjbDE0N2R5ZWQyM3JqM2NxaDZxcmI5c2tlIn0.kwJri8wGDxWD3oIz5rGh8g";
    this.map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-61, 10],
      zoom: 14,
    });

    this.map.on("click", (ev) => {
      // const marker = new mapboxgl.Marker()
      //   .setLngLat([ev.lngLat.lng, ev.lngLat.lat])
      //   .setPopup(popup)
      //   .addTo(this.map);
    });

    var geolocate = new mapboxgl.GeolocateControl({
      fitBoundsOptions: {
        zoom: 14,
      },
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: false,
      showAccuracyCircle: false,
    });

    this.map.addControl(geolocate, "top-left");
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    });
    this.map.addControl(geocoder);

    this.map.on("load", () => {
      geolocate.trigger();
      this.markers.forEach((x) => {
        const marker = new ClickableMarker()
          .setLngLat([x.locations.lng, x.locations.lat])
          .onClick(() => {
            this.carousel = true;
            this.busName = x.name;
            this.busDes = x.desc;
          })
          .addTo(this.map);
      });
    });

    class ClickableMarker extends mapboxgl.Marker {
      // new method onClick, sets _handleClick to a function you pass in
      onClick(handleClick) {
        this._handleClick = handleClick;
        return this;
      }

      // the existing _onMapClick was there to trigger a popup
      // but we are hijacking it to run a function we define
      _onMapClick(e) {
        const targetElement = e.originalEvent.target;
        const element = this._element;

        if (
          this._handleClick &&
          (targetElement === element || element.contains(targetElement))
        ) {
          this._handleClick();
        }
      }
    }

    geolocate.on("geolocate", function (e) {
      var lon = e.coords.longitude;
      var lat = e.coords.latitude;
      var position = [lon, lat];
    });
  },
};
</script>

<style>
#map {
  height: 100vh;
}
</style>
