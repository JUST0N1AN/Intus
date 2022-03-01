<template>
  <div class="row">
    <div class="col-6 offset-3">
      <h3>Register Business Account</h3>
      <p><input type="text" placeholder="Email" id="email" /></p>
      <p><input type="password" placeholder="Password" id="password" /></p>
      <p>
        <input
          type="password"
          placeholder="Retype Password"
          id="secondPassword"
        />
      </p>
      <p><button @click="registerUser">Submit</button></p>
    </div>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, setDoc, doc, updateDoc } from "firebase/firestore";
import db from "../boot/firebase.js";

export default {
  data() {
    return {};
  },
  methods: {
    registerUser() {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const secondPassword = document.getElementById("secondPassword").value;
      if (password != secondPassword) {
        alert("Password does not match");
        return;
      } else {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user.uid);
            setDoc(doc(db, "businesses", user.uid), {
              email: email,
            })
              .then(() => {
                console.log("reached");
                // const docRef = addDoc(
                //   collection(db, "users", user.uid, "media",""),
                //   {}
                // );
                this.$router.push({ path: "/" });
              })
              .catch((error) => {
                console.log("Error occured in register: " + error);
              });
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          });
      }
    },
  },
};
</script>

<style></style>
