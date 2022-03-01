<template>
  <div>
    <div class="row justify-center">Login Page</div>
    <div class="row justify-center">
      <div class="justify-center">
        <h3>Login to Your Account</h3>
      </div>
    </div>

    <div class="row justify-center">
      <p><input type="text" placeholder="Email" id="email" /></p>
    </div>
    <div class="row justify-center">
      <p><input type="password" placeholder="Password" id="password" /></p>
    </div>
    <div class="row justify-center">
      <p><q-btn color="primary" @click="signIn">Submit</q-btn></p>
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
export default {
  data() {
    return {};
  },
  methods: {
    async signIn() {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
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
      console.log("Email: " + email + "\nPassord: " + password);
    },
  },
};
</script>

<style></style>
