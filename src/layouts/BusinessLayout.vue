<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>Intus</q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-icon></q-icon>
      <q-list>
        <q-item clickable v-ripple to="/IndexBusiness">
          <q-item-section avatar>
            <q-icon color="primary" name="las la-home" />
          </q-item-section>
          <q-item-section>Home</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="map">
          <q-item-section avatar>
            <q-icon color="primary" name="las la-map-marked-alt" />
          </q-item-section>
          <q-item-section>Map</q-item-section>
        </q-item>
        <q-item clickable v-ripple v-if="loggedIn" v-on:click="logoutUser">
          <q-item-section avatar>
            <q-icon color="primary" name="las la-sign-out-alt" />
          </q-item-section>
          <q-item-section>Logout</q-item-section>
        </q-item>
        <q-item clickable v-ripple v-if="!loggedIn" to="login">
          <q-item-section avatar>
            <q-icon color="primary" name="las la-user-circle" />
          </q-item-section>
          <q-item-section>Login</q-item-section>
        </q-item>
        <q-item clickable v-ripple v-if="!loggedIn" to="register">
          <q-item-section avatar>
            <q-icon color="primary" name="home" />
          </q-item-section>

          <q-item-section>Register</q-item-section>
        </q-item>
        <q-item to="/verbusiness">
          <q-item-section avatar>
            <q-icon color="primary" name="las la-file-upload" />
          </q-item-section>

          <q-item-section>Business Verification</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/busoptions">
          <q-item-section avatar>
            <q-icon color="primary" name="las la-briefcase" />
          </q-item-section>
          <q-item-section>Business Options</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/scanqr">
          <q-item-section avatar>
            <q-icon color="primary" name="las la-chess-board" />
          </q-item-section>
          <q-item-section>Scan QRCode</q-item-section>
        </q-item>
        <!-- <q-item clickable v-ripple v-if="loggedIn" to="upload">
          <q-item-section avatar>
            <q-icon color="primary" name="las la-file-upload" />
          </q-item-section>

          <q-item-section>Upload</q-item-section>
        </q-item>
        <q-item clickable v-ripple v-if="loggedIn" to="mydocs">
          <q-item-section avatar>
            <q-icon color="primary" name="las la-file" />
          </q-item-section>

          <q-item-section>My Documents</q-item-section>
        </q-item> -->
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, setDoc, doc, updateDoc } from "firebase/firestore";
import db from "../boot/firebase.js";

export default defineComponent({
  name: "BusinessLayout",

  data() {
    return {
      loggedIn: true,
    };
  },
  components: {},

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  methods: {
    logoutUser() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          console.log("Logged out");
          this.loggedIn = false;
          this.$router.push({ path: "/" });
        })
        .catch((error) => {
          // An error happened.
          console.log(error);
        });
    },
  },
});
</script>
