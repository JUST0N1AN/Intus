<template>
  <div class="row justify-center" v-if="scanned == false">
    <h4>Point Camera To QRCode to Scan</h4>
  </div>
  <div class="row justify-center">
    <q-btn
      class="q-mt-md"
      color="primary"
      v-if="scanned == true"
      @click="scanned = false"
      >Scan Again</q-btn
    >
  </div>
  <div class="row" v-if="scanned == false">
    <div class="col-6 offset-3">
      <qrcode-stream @decode="onDecode" @init="onInit"></qrcode-stream>
    </div>
  </div>
  <div class="row" v-if="scanned == true">
    <div class="col-6 offset-3">
      <h4>Data Scanned</h4>
      <p>User: {{ userName }}</p>
      <p class="" v-for="(i, index) in documents" :key="index">
        <a :href="i.data().fileUrl" class="q-pr-md" target="_blank">{{
          i.data().name
        }}</a>
      </p>
    </div>
  </div>
</template>

<script>
import { QrcodeStream } from "vue3-qrcode-reader";
import db from "../boot/firebase.js";
import {
  addDoc,
  setDoc,
  doc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";
export default {
  components: { QrcodeStream },
  data() {
    return {
      scanned: false,
      result: "",
      error: "",
      documents: [],
      userName: "",
    };
  },
  methods: {
    async getDocuments(userID) {
      this.documents = [];
      const docRef = doc(db, "users", userID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        this.userName = docSnap.data().name;
      } else {
        alert("Error finding ID");
      }

      const querySnapshot = await getDocs(
        collection(db, "users", userID, "media")
      );
      querySnapshot.forEach((doc) => {
        this.documents.push(doc);
      });
    },
    onDecode(result) {
      this.scanned = true;
      this.result = result;
      console.log(this.result);
      this.getDocuments(this.result);
    },
    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.error = "ERROR: you need to grant camera access permission";
        } else if (error.name === "NotFoundError") {
          this.error = "ERROR: no camera on this device";
        } else if (error.name === "NotSupportedError") {
          this.error = "ERROR: secure context required (HTTPS, localhost)";
        } else if (error.name === "NotReadableError") {
          this.error = "ERROR: is the camera already in use?";
        } else if (error.name === "OverconstrainedError") {
          this.error = "ERROR: installed cameras are not suitable";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "ERROR: Stream API is not supported in this browser";
        } else if (error.name === "InsecureContextError") {
          this.error =
            "ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.";
        } else {
          this.error = `ERROR: Camera error (${error.name})`;
        }
      }
    },
  },

  mounted() {},
};
</script>

<style></style>
