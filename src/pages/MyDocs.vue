<template>
  <div class="row justify-center">This is Your Documents</div>
  <p class="row justify-center" v-for="i in documents" :key="i">
    <a :href="i.fileUrl" target="_blank">{{ i.name }}</a>
  </p>
</template>

<script>
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { addDoc, setDoc, doc, updateDoc } from "firebase/firestore";
import db from "../boot/firebase.js";

export default {
  data() {
    return {
      documents: [],
    };
  },
  methods: {
    async getDocuments() {
      const auth = getAuth();
      const user = auth.currentUser;
      const querySnapshot = await getDocs(
        collection(db, "users", user.uid, "media")
      );
      querySnapshot.forEach((doc) => {
        this.documents.push(doc.data());
      });
    },
  },
  mounted() {
    this.getDocuments();
  },
};
</script>

<style></style>
