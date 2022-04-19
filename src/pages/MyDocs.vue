<template>
  <div class="row justify-center"><h3>These are Your Documents</h3></div>
  <div class="row justify-center" v-if="documents[0] == null">
    You have not uploaded any documents
  </div>
  <div class="q-pb-md"></div>
  <p class="row justify-center" v-for="(i, index) in documents" :key="index">
    <a :href="i.data().fileUrl" class="q-pr-md" target="_blank">{{
      i.data().name
    }}</a>
    <q-btn
      icon="las la-trash"
      size="10px"
      rounded
      @click="removeDoc(i, index)"
      color="primary"
    ></q-btn>
  </p>
</template>

<script>
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
        this.documents.push(doc);
      });
    },
    removeDoc: function (item, index) {
      const storage = getStorage();
      const deleteRef = ref(storage, item.data().name);
      deleteObject(deleteRef)
        .then(() => {
          const auth = getAuth();
          const user = auth.currentUser;
          deleteDoc(doc(db, "users", user.uid, "media", item.id));
          this.documents.splice(index, 1);
          console.log("Successfully Deleted");
        })
        .catch((error) => {
          console.log("File cannot be Deleted");
        });
    },
  },
  mounted() {
    this.getDocuments();
  },
};
</script>

<style></style>
