<template>
  <div class="row justify-between">
    <div class="col-6 offset-3">
      <h4>Link to your Documents</h4>
      <div class="">
        <q-btn color="primary" @click="setQR">Generate QR</q-btn>
        <div class="q-my-md">Text: {{ textOnScreen }}</div>

        <qrcode-vue :value="text" :size="size" level="H" />
      </div>
    </div>
  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";
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
export default {
  data() {
    return {
      textOnScreen: "",
      text: "",
      value: "",
      size: 300,
      selected: "",
      documents: [],
    };
  },
  components: {
    QrcodeVue,
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
      this.text = "";
      this.textOnScreen = "";
      for (let i in this.documents) {
        console.log(this.documents[i].data());
        this.text +=
          this.documents[i].data().name +
          ": " +
          this.documents[i].data().fileUrl +
          "\n";
        this.textOnScreen += this.documents[i].data().name + "\n";
      }
    },
  },
  mounted() {
    this.getDocuments();
  },
};
</script>

<style>
textarea {
  width: 50%;
}
</style>
