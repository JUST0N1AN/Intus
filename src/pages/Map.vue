<template>
  <div class="row justify-center">
    <div id="MAP">
      <h3 class="row justify-center">Map Demo</h3>
      <div class="row justify-center q-mb-md">
        <q-btn @click="findCurrLoc" color="primary">Recenter</q-btn>
      </div>
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
        <Marker
          :options="{ position: center, icon: homeimg }"
          @click="markerClick"
        />
        <Marker
          v-for="m in markers"
          v-bind:key="m"
          :options="{ position: m.position }"
          @click="markerClick(m.position)"
        />
      </GoogleMap>
    </div>
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
          Relevent Business Information and Description would be here
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
import { defineComponent, ref } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";
let apiKey = "AIzaSyDiiDgmEFzFbSWwazFPKNwWctFyPjGppVs";
let markerID = 0;

export default {
  components: { GoogleMap, Marker },
  data() {
    return {
      center: { lat: 0, lng: 0 },
      markers: [{}],
      homeimg:
        "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
      carousel: false,
      slide: ref(1),
      busName: null,
      busDes: null,
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
      console.log(g.name);
      this.carousel = true;
      this.busName = g.name;
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
          name: "Test Business ",
          des: "Description of Business",
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

  mounted() {
    this.markers.push({
      position: {
        lat: 10.18054893099064,
        lng: -61.46154993919575,
        id: markerID++,
        name: "Test Business ",
        des: "Description of Business",
      },
    });
  },
};
</script>

<style></style>
