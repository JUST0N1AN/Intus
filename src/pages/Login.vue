<template>
  <div>
    <div class="row justify-center">Login Page</div>
    <div class="row justify-center">
      <div class="justify-center">
        <h3>Login to Your Account</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-6 offset-3">
        <q-form>
          <q-input
            square
            filled
            v-model="email"
            label="Email"
            type="email"
            :rules="[(val) => val.includes('@') || 'Field is required']"
            id="email"
            required
          />
          <q-input
            square
            filled
            v-model="password"
            :type="isPwd ? 'password' : 'text'"
            hint="Password"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        </q-form>
        <p class="row justify-center">
          <q-btn @click="signIn" color="primary">Submit</q-btn>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import router from "../router";
import db from "../boot/firebase.js";
import { ref } from "vue";
export default {
  data() {
    return {
      isPwd: ref(true),
      password: null,
      email: null,
    };
  },
  methods: {
    async signIn() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then(async (userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("Signed in: " + user.uid);
          // ...
          const docRef = doc(db, "users", user.uid);

          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            if (docSnap.data().type == "user") {
              this.$router.push({ path: "/" });
            }
          } else {
            // doc.data() will be undefined in this case
            this.$router.push({ path: "/IndexBusiness" });
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
      console.log("Email: " + this.email + "\nPassord: " + this.password);
    },
  },
};
</script>

<style></style>
