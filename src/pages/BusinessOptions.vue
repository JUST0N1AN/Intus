<template>
  <div>
    <h3 class="row justify-center">Business Options</h3>
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        outside-arrows
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="entryreq" label="Entry Requirements" />
        <q-tab name="selectloc" label="Select Location" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="entryreq">
          <div class="text-h6 row justify-center">Entry Requirements</div>
          <div class="row justify-left">
            <q-checkbox
              dense
              v-model="govID"
              label="Government Issued ID"
              color="primary"
            />
          </div>
          <div class="row justify-left">
            <q-checkbox
              dense
              v-model="vaxRec"
              label="Covid Vaccination Record"
              color="primary"
            />
          </div>
          <div class="row justify-left">
            <q-checkbox
              dense
              v-model="covTest"
              label="PCR/Rapid Covid Test"
              color="red"
            />
          </div>
          <div class="q-pa-md q-pb-lg">
            <q-badge color="primary">
              Minimum Age: {{ age }} Years Old
            </q-badge>
          </div>

          <q-slider
            v-model="age"
            marker-labels
            :min="0"
            :max="21"
            :step="3"
            label
            label-always
            color="primary"
          />

          <p class="row justify-center q-pt-lg">
            <q-btn @click="updateRequirements" color="primary"
              >Update Business Requirements</q-btn
            >
          </p>
        </q-tab-panel>

        <q-tab-panel name="selectloc">
          <div class="text-h6 row justify-center">Select Location</div>
          <div v-if="this.positions.length > 0">
            <div>These are your current positions</div>
            <div v-for="x in this.positions" :key="x">{{ x }}</div>
          </div>
          <div v-else>You currently have no locations on the map.</div>

          <q-btn class="q-ma-md" @click="loadMap" color="primary"
            >Display Map</q-btn
          >

          <div v-if="instructions">
            Find the location you would like to pin and click it on the map
          </div>

          <div id="map"></div>

          <q-dialog v-model="confirm" persistent>
            <q-card>
              <q-card-section>
                <span class="q-ml-sm row items-center"
                  >Add this location to the map?</span
                >

                <span class="q-ml-sm row items-center"
                  >Lng = {{ this.newPositions.lng }}</span
                >
                <span class="q-ml-sm row items-center"
                  >Lat = {{ this.newPositions.lat }}</span
                >
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" v-close-popup />
                <q-btn
                  flat
                  label="Add Location"
                  color="primary"
                  v-close-popup
                  @click="updatePositions"
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import db from "../boot/firebase.js";
import { ref } from "vue";

import "mapbox-gl/dist/mapbox-gl.css";

import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

var mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

export default {
  setup() {
    return {
      tab: ref("entryreq"),
      govID: ref(true),
      vaxRec: ref(false),
      covTest: ref(true),
      cyan: ref(false),
      age: ref(0),
    };
  },
  data() {
    return {
      req: [],
      positions: [],
      mapModal: false,
      accessToken:
        "pk.eyJ1Ijoic2hhbmUxMjM0NTYwMSIsImEiOiJjbDE0N2R5ZWQyM3JqM2NxaDZxcmI5c2tlIn0.kwJri8wGDxWD3oIz5rGh8g",
      center: { lat: 0, lng: 0 },
      markers: [{}],
      homeimg:
        "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
      carousel: false,
      slide: ref(1),
      busName: null,
      busDes: null,
      locSearch: null,
      map: null,
      instructions: false,
      confirm: false,
      newPositions: null,
    };
  },
  methods: {
    async loadReqs() {
      const auth = getAuth();
      const user = auth.currentUser;
      const docRef = doc(db, "business", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.data().req) {
        this.govID = ref(docSnap.data().req[0]);
        this.vaxRec = ref(docSnap.data().req[1]);
        this.covTest = ref(docSnap.data().req[2]);
        this.age = ref(docSnap.data().req[3]);
      }
    },
    updateRequirements() {
      const auth = getAuth();
      const user = auth.currentUser;
      this.req = [];
      this.req.push(this.govID);
      this.req.push(this.vaxRec);
      this.req.push(this.covTest);
      this.req.push(this.age);
      updateDoc(doc(db, "business", user.uid), {
        req: this.req,
      });
      alert("Requirements Updated");
    },
    async getPositions() {
      const auth = getAuth();
      const user = auth.currentUser;
      const docRef = doc(db, "business", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.data().locations) {
        this.positions.push(docSnap.data().locations);
      }
    },
    async updatePositions() {
      const auth = getAuth();
      const user = auth.currentUser;
      const docRef = doc(db, "business", user.uid);
      const docSnap = await getDoc(docRef);
      let tempPos;
      console.log(this.newPositions);
      this.positions.push();
      await updateDoc(docRef, {
        locations: {
          lat: this.newPositions.lat,
          lng: this.newPositions.lng,
        },
      });
      this.getPositions();
      alert("Requirements Updated");
    },

    // Map methods
    loadMap() {
      this.instructions = true;
      mapboxgl.accessToken =
        "pk.eyJ1Ijoic2hhbmUxMjM0NTYwMSIsImEiOiJjbDE0N2R5ZWQyM3JqM2NxaDZxcmI5c2tlIn0.kwJri8wGDxWD3oIz5rGh8g";
      this.map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-61, 10],
        zoom: 14,
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
      });

      this.map.on("click", (ev) => {
        console.log(ev);
        this.newPositions = ev.lngLat;
        this.confirm = true;
      });

      this.findCurrLoc();
    },
    findCurrLoc() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          console.log(this.center);
          this.map.flyTo({ center: this.center });
          // Create a new marker.
          const marker = new mapboxgl.Marker()
            .setLngLat([30.5, 50.5])
            .addTo(this.map);
        },
        (error) => {
          console.log(error.message);
        }
      );
    },
  },

  mounted() {
    this.loadReqs();
    this.getPositions();
  },
};
</script>

<style>
#map {
  height: 50vh;
}
</style>
