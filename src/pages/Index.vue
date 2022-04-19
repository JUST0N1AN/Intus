<template>
  <div class="row justify-center">
    <img
      alt="Quasar logo"
      src="~assets/Intus_Logo.svg"
      style="width: 300px; height: 300px"
    />
  </div>
  <div>
    <q-card class="my-card bg-primary text-white">
      <q-card-section>
        <div class="text-h6">Welcome To Intus</div>
        <div class="text-subtitle2">by Freshers Tech</div>
      </q-card-section>

      <q-card-section>
        <p>
          We're here to help you enter your favourite places without having to
          risk the safety of your important personal documents.
        </p>
        <p>
          You must have an account to use our document free entry process. If
          you do not have an account you can Register below.
        </p>
        <p>
          All Businesses can use the business registration button to create a
          business account. After this, they can go through the business
          verification process. Once verified, businesses will appear on the map
          for users. Currently Businesses can set their entry requirements and
          age requirements but these features can be modified in the future.
        </p>
        <p>
          Feel free to view our map of locations and their requirements by
          clicking the map link below. This service does not require an account.
        </p>
      </q-card-section>

      <q-separator dark />

      <q-card-actions>
        <q-btn to="/register" v-if="loggedIn == false" flat>Register</q-btn>
        <q-btn to="/map" flat>View Map</q-btn>
        <q-btn to="/login" v-if="loggedIn == false" flat>Login</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

export default defineComponent({
  name: "PageIndex",

  data() {
    return {
      loggedIn: false,
    };
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
      } else {
        // User is signed out
        // ...
      }
    });
  },
});
</script>
