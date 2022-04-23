<template>
  <div class="row">
    <div class="text-primary col-6 offset-3">
      <h3>Register Business Account</h3>
      <div class="row">
        <div class="col-6 offset-3">
          <q-form>
            <q-input
              color="primary"
              bg-color="white"
              square
              filled
              v-model="bname"
              label="Business Name"
              label-color="secondary"
              type="text"
              :rules="['Field is required']"
              id="bname"
              required
            />
            <q-input
              color="primary"
              bg-color="white"
              square
              filled
              v-model="email"
              label="Email"
              label-color="secondary"
              type="email"
              :rules="[(val) => val.includes('@') || 'Field is required']"
              id="email"
              required
            />
            <q-input
              class="q-mb-md"
              color="primary"
              bg-color="white"
              square
              filled
              v-model="password"
              :type="isPwd ? 'password' : 'text'"
              label="Password"
              label-color="secondary"
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
              class="q-mb-md"
              color="primary"
              bg-color="white"
              style="q-pt-md"
              square
              filled
              v-model="secondPass"
              :type="isPwd2 ? 'password' : 'text'"
              label="Please Retype Password"
              label-color="secondary"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd2 ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd2 = !isPwd2"
                />
              </template>
            </q-input>
            <q-input
              color="primary"
              bg-color="white"
              class="q-pt-md"
              square
              filled
              v-model="desc"
              label="Business Description"
              label-color="secondary"
              type="textarea"
              :rules="['Field is required']"
              id="desc"
              required
            />
          </q-form>
          <p class="row justify-center">
            <q-btn @click="registerUser" color="primary">Submit</q-btn>
          </p>
        </div>
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
      bname: null,
      email: null,
      password: null,
      isPwd: ref(true),
      isPwd2: ref(true),
      secondPass: null,
      desc: null,
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

            setDoc(doc(db, "business", user.uid), {
              name: this.bname,
              email: this.email,
              desc: this.desc,
              type: "bus",
              approved: false,
              declined: false,
              req: [],
            })
              .then(() => {
                // const docRef = addDoc(
                //   collection(db, "users", user.uid, "media",""),
                //   {}
                // );
                this.$router.push({ path: "/IndexBusiness" });
              })
              .catch((error) => {});
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
