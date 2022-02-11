<template>
  <div>Login Page</div>
  <h1>Login to Your Account</h1>
  <p><input type="text" placeholder="Email" id="email" /></p>
  <p><input type="password" placeholder="Password" id="password" /></p>
  <p><button @click="signIn">Submit</button></p>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import router from '../router';
export default {
  data() {
    return {
      
    };
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
          console.log("Signed in: " + user.uid)
          // ...
          router.push('/')
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

<style>
</style>