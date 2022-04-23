<template>
  <div class="text-primary row justify-center">
    <h4>Link to your Documents</h4>
  </div>
  <div class="text-primary row justify-center">
    <div class="q-my-md">{{ textOnScreen }}</div>
  </div>
  <!-- <div style="background-color: white" class=""> -->
  <div class="row justify-center">
    <div
      style="
        margin-left: auto;
        margin-right: auto;
        background-color: white;
        padding: 10px;
      "
      ref="qrcode"
    ></div>
  </div>
  <!-- </div> -->
</template>

<script>
// import QrcodeVue from "qrcode.vue";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { addDoc, setDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import db from "../boot/firebase.js";
import {
  getStorage,
  ref,
  uploadBytes,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";

import QRCode from "easyqrcodejs";

export default {
  data() {
    return {
      textOnScreen: "",
      userID: "",
      value: "",
      size: 300,
      selected: "",
      documents: [],
    };
  },
  components: {
    // QrcodeVue,
  },
  methods: {
    async getDocuments() {
      const auth = getAuth();
      const user = auth.currentUser;
      const querySnapshot = await getDocs(
        collection(db, "users", user.uid, "media")
      );
      querySnapshot.forEach((doc) => {
        this.documents.push(doc);
      });
    },
    setQR() {
      const auth = getAuth();
      const user = auth.currentUser;
      this.userID = user.uid;
      this.textOnScreen = "Your QRCode is ready!";
    },
  },
  mounted() {
    this.setQR();
    var options = {
      text: this.userID,
    };
    new QRCode(this.$refs.qrcode, options);
  },
};
</script>

<style>
textarea {
  width: 50%;
}
</style>
