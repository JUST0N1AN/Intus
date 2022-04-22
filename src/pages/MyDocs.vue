<template>
  <div class="row justify-center">
    <p class="text-primary" style="font-size: 30px">
      These are Your Documents and Information
    </p>
  </div>
  <div class="row justify-center">
    <div class="row justify-center">
      <q-card class="my-card bg-primary text-white">
        <img :src="pPhoto" width="300" height="300" />

        <q-card-section>
          <div class="text-h6">{{ name }}</div>
          <div class="text-subtitle2">Age: {{ age }}</div>
          <div class="text-subtitle2">DOB: {{ dob }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <p>
            <strong>ID CARD:</strong>
            <q-icon
              color="black"
              style="font-size: 25px"
              v-if="this.idVal == true"
              name="las la-check-double"
            /><q-icon
              color="red"
              style="font-size: 25px"
              v-if="this.idVal == false"
              name="las la-exclamation-circle"
            />
          </p>
          <p>
            <strong>FRONT OF VACCINATION CARD:</strong>
            <q-icon
              color="black"
              style="font-size: 25px"
              v-if="this.fVal == true"
              name="las la-check-double"
            /><q-icon
              color="red"
              style="font-size: 25px"
              v-if="this.fVal == false"
              name="las la-exclamation-circle"
            />
          </p>
          <p>
            <strong>INSIDE OF VACCINATION CARD:</strong>
            <q-icon
              color="black"
              style="font-size: 25px"
              v-if="this.iVal == true"
              name="las la-check-double"
            /><q-icon
              color="red"
              style="font-size: 25px"
              v-if="this.iVal == false"
              name="las la-exclamation-circle"
            />
          </p>
          <p></p>
          <p>
            <q-icon color="black" name="las la-check-double" />
            means our system has fully verified a document.
          </p>
          <p>
            <q-icon color="red" name="las la-exclamation-circle" />
            indicates that you must re-upload the document on Customer
            Information Page for evaluation.
          </p>
          <p>You can View your documents from the links below</p>
        </q-card-section>

        <q-card-actions>
          <q-btn style="font-size: 12px" @click="gotoUrl(this.frontID)" flat
            >Front ID Card</q-btn
          >
          <q-btn style="font-size: 12px" @click="gotoUrl(this.backID)" flat
            >Back ID Card</q-btn
          >
          <q-btn style="font-size: 12px" @click="gotoUrl(this.frontVax)" flat
            >Front Vax Card</q-btn
          >
          <q-btn style="font-size: 12px" @click="gotoUrl(this.inVax)" flat
            >Inside Vax Card</q-btn
          >
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
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
      frontVax: null,
      inVax: null,
      frontID: null,
      backID: null,
      pPhoto: null,
      fVal: false,
      iVal: false,
      idVal: false,
      name: null,
      age: 20,
      dob: null,
    };
  },
  methods: {
    async getDocuments() {
      const auth = getAuth();
      const user = auth.currentUser;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        this.name =
          docSnap.data().customerInfo.firstName +
          " " +
          docSnap.data().customerInfo.lastName;
        this.dob = docSnap.data().customerInfo.DOB;
        this.frontVax = docSnap.data().customerInfo.documents.frontVaxCard;
        this.inVax = docSnap.data().customerInfo.documents.insideVaxCard;
        this.frontID = docSnap.data().customerInfo.documents.idFront;
        this.backID = docSnap.data().customerInfo.documents.idBack;
        this.pPhoto = docSnap.data().customerInfo.documents.passportPhoto;
        this.fVal = docSnap.data().validDocs.frontVaccinationCard;
        this.iVal = docSnap.data().validDocs.insideVaccinationCard;
        this.idVal = docSnap.data().validDocs.id;
        console.log(this.frontVax);
      }
    },
    gotoUrl(f) {
      window.open(f, "_blank");
    },
  },
  mounted() {
    this.getDocuments();
  },
};
</script>

<style>
@import url("http://fonts.cdnfonts.com/css/garet");
</style>
