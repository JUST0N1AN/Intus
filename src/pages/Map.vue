<template>
  <div>Div 1</div>
  <div>Div 2</div>
  <div id="MAP">
    MAP
    <button @click="findCurrLoc">Click to go to Location</button>
    <GoogleMap
      api-key="AIzaSyDiiDgmEFzFbSWwazFPKNwWctFyPjGppVs"
      style="
        width: 500px;
        height: 500px;
        display: block;
        margin-left: auto;
        margin-right: auto;
      "
      :center="center"
      :zoom="15"
      @click="createMarker"
    >
      <Marker :options="{ position: center }" @click="markerClick" />
      <Marker
        v-for="m in markers"
        v-bind:key="m"
        :options="{ position: m.position }"
        @click="deleteMarker(m.position)"
      />
    </GoogleMap>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";
let apiKey = "AIzaSyDiiDgmEFzFbSWwazFPKNwWctFyPjGppVs";
let markerID = 0;

export default {
  components: { GoogleMap, Marker },
  data() {
    return {
      center: { lat: 0, lng: 0 },
      markers: [{}],
    };
  },
  methods: {
    findCurrLoc() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position.coords.latitude);
          console.log(position.coords.longitude);
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
        },
        (error) => {
          console.log(error.message);
        }
      );
    },
    markerClick(g) {
      console.log(g.id);
    },
    createMarker(event) {
      console.log(event.latLng.lat());
      console.log(event.latLng.lng());
      //   console.log("Marker Created: " + markerID);
      this.markers.push({
        position: {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
          id: markerID++,
        },
      });
    },
    deleteMarker(mark) {
      //   console.log(this.markers[1].position.id);
      for (let i = 0; i < this.markers.length; i++) {
        if (this.markers[i + 1].position.id == mark.id) {
          this.markers.splice(i + 1, 1);
          break;
        }
      }
    },
  },
  beforeMount() {
    this.findCurrLoc();
  },

  mounted() {},
};
</script>

<style></style>
