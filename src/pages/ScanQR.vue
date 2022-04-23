<template>
  <div class="text-primary row justify-center" v-if="scanned == false">
    <h5>Point Camera To QRCode to Scan</h5>
  </div>
  <div class="row justify-center">
    <q-btn
      class="q-mt-md q-mb-md"
      color="primary"
      v-if="scanned == true"
      @click="scanned = false"
      >Scan Again</q-btn
    >
  </div>
  <div class="text-primary row" v-if="scanned == false">
    <div class="col-6 offset-3">
      <qrcode-stream @decode="onDecode" @init="onInit"></qrcode-stream>
    </div>
  </div>
  <div class="row justify-center" v-if="scanned == true">
    <div class="row justify-center">
      <q-card class="my-card bg-primary text-white">
        <img :src="profPic" width="" height="300 " />

        <q-card-section>
          <div class="text-h6">{{ Name }}</div>
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
          <p>FIRST VACCINATION</p>
          <p>Date: {{ firstVaxDate }} Type: {{ firstVaxType }}</p>
          <p></p>
          <p>SECOND VACCINATION</p>
          <p>Date: {{ secondVaxDate }} Type: {{ secondVaxType }}</p>
          <p></p>
          <p style="font-size: 15px">
            <q-icon color="black" name="las la-check-double" />
            means our system has fully verified a document.
          </p>
          <p>
            <q-icon color="red" name="las la-exclamation-circle" />
            indicates that you must manually verify the document via the links
            below.
          </p>
        </q-card-section>

        <q-card-actions>
          <q-btn style="font-size: 12px" @click="gotoUrl(this.idFPic)" flat
            >Front ID Card</q-btn
          >
          <q-btn style="font-size: 12px" @click="gotoUrl(this.idBPic)" flat
            >Back ID Card</q-btn
          >
          <q-btn style="font-size: 12px" @click="gotoUrl(this.fVaxPic)" flat
            >Front Vax Card</q-btn
          >
          <q-btn style="font-size: 12px" @click="gotoUrl(this.iVaxPic)" flat
            >Inside Vax Card</q-btn
          >
        </q-card-actions>
      </q-card>
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
      Name: "",
      fVal: false,
      idVal: false,
      iVal: false,
      profPic: null,
      fVaxPic: null,
      idFPic: null,
      idBPic: null,
      iVaxPic: null,
      idType: null,
      firstVaxType: null,
      firstVaxDate: null,
      secondVaxType: null,
      secondVaxDate: null,
      age: null,
      dob: null,
    };
  },
  methods: {
    async getDocuments(userID) {
      this.documents = [];
      const docRef = doc(db, "users", userID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        this.Name =
          docSnap.data().customerInfo.firstName +
          " " +
          docSnap.data().customerInfo.lastName;
        this.age = docSnap.data().customerInfo.age;
        this.profPic = docSnap.data().customerInfo.documents.passportPhoto;
        this.fVaxPic = docSnap.data().customerInfo.documents.frontVaxCard;
        this.iVaxPic = docSnap.data().customerInfo.documents.insideVaxCard;
        this.idFPic = docSnap.data().customerInfo.documents.idFront;
        this.idBPic = docSnap.data().customerInfo.documents.idBack;
        this.fVal = docSnap.data().validDocs.frontVaccinationCard;
        this.iVal = docSnap.data().validDocs.insideVaccinationCard;
        this.idVal = docSnap.data().validDocs.id;
        this.idType = docSnap.data().customerInfo.idType;
        this.dob = docSnap.data().customerInfo.DOB;
        this.firstVaxDate = docSnap.data().customerInfo.firstDoseDate;
        this.firstVaxType = docSnap.data().customerInfo.firstDoseVaccineType;
        this.secondVaxDate = docSnap.data().customerInfo.secondDoseDate;
        this.secondVaxType = docSnap.data().customerInfo.secondDoseVaccineType;
      } else {
        alert("Error finding ID");
      }

      // const querySnapshot = await getDocs(
      //   collection(db, "users", userID, "media")
      // );
      // querySnapshot.forEach((doc) => {
      //   this.documents.push(doc);
      // });
    },
    onDecode(result) {
      this.scanned = true;
      this.result = result;

      this.getDocuments(this.result);
    },
    gotoUrl(f) {
      window.open(f, "_blank");
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
