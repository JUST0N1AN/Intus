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

        <div v-if="loggedIn">Hello, {{ this.name }}!</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      class="text-white"
      style="background-color: #2e2d2d"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-icon></q-icon>
      <q-list>
        <q-item clickable v-ripple to="/">
          <q-item-section avatar>
            <q-icon color="primary" name="las la-home" />
          </q-item-section>
          <q-item-section>Home</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/about">
          <q-item-section avatar>
            <q-icon color="primary" name="las la-question" />
          </q-item-section>
          <q-item-section>About</q-item-section>
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
        <q-item clickable v-ripple v-if="admin" to="/admin">
          <q-item-section avatar>
            <q-icon color="primary" name="las la-user-shield" />
          </q-item-section>

          <q-item-section>Admin Panel</q-item-section>
        </q-item>

        <q-item clickable v-ripple v-if="loggedIn" to="customerinfoform">
          <q-item-section avatar>
            <q-icon color="primary" name="lab la-wpforms" />
          </q-item-section>

          <q-item-section>Registration Form</q-item-section>
        </q-item>

        <q-item clickable v-ripple v-if="loggedIn" to="mydocs">
          <q-item-section avatar>
            <q-icon color="primary" name="las la-file" />
          </q-item-section>

          <q-item-section>My Documents</q-item-section>
        </q-item>
        <q-item to="/qrcode" v-if="loggedIn">
          <q-item-section avatar>
            <q-icon color="primary" name="las la-qrcode" />
          </q-item-section>

          <q-item-section>QRCode</q-item-section>
        </q-item>
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
import {
  collection,
  addDoc,
  setDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import db from "../boot/firebase.js";

export default defineComponent({
  name: "MainLayout",

  data() {
    return {
      loggedIn: false,
      admin: false,
      name: "",
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

          this.loggedIn = false;
          this.admin = false;
          this.$router.push({ path: "/" });
        })
        .catch((error) => {
          // An error happened.
        });
    },
    async getUserName() {
      const auth = getAuth();
      const user = auth.currentUser;
      const nameRef = doc(db, "users", user.uid);
      const nameSnap = await getDoc(nameRef);
      this.name = nameSnap.data().name;
    },
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;

        if (user.email == "test@test.com") {
          this.admin = true;
        }
        this.loggedIn = true;
        this.getUserName();
      } else {
        // User is signed out
        // ...
      }
    });
  },
});
</script>
<style>
body {
  font-family: "Garet", sans-serif;
  background-color: #2e2d2d;
}
</style>
