<template>
  <div>
    <h3 class="row justify-center">Register An Account</h3>
    <p class="row justify-center">
      <q-btn class="q-mb-md" to="/regbusiness" color="primary"
        >Click Here to Register a Business</q-btn
      >
    </p>
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
            v-model="uname"
            label="Full Name"
            type="text"
            :rules="['Field is required']"
            id="uname"
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

          <q-input
            square
            filled
            v-model="secondPass"
            :type="isPwd2 ? 'password' : 'text'"
            hint="Please Retype Password"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd2 ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd2 = !isPwd2"
              />
            </template>
          </q-input>
        </q-form>
        <p class="row justify-center">
          <q-btn @click="registerUser" color="primary">Submit</q-btn>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, setDoc, doc, updateDoc } from "firebase/firestore";
import db from "../boot/firebase.js";
import { ref } from "vue";

export default {
  data() {
    return {
      email: null,
      password: null,
      isPwd: ref(true),
      isPwd2: ref(true),
      secondPass: null,
      uname: null,
    };
  },
  methods: {
    registerUser() {
      if (this.password != this.secondPass) {
        alert("Password does not match");
        return;
      } else {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user.uid);
            setDoc(doc(db, "users", user.uid), {
              email: this.email,
              name: this.uname,
              type: "user",
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
