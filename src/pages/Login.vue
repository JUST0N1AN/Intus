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
      <p><button @click="signIn">Submit</button></p>
    </div>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import router from "../router";
export default {
  data() {
    return {};
  },
  methods: {
    signIn() {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("Signed in: " + user.uid);
          // ...
          this.$router.push({ path: "/" });
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
