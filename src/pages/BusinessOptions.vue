<template>
  <div>
    <h3 class="row justify-center">Business Options</h3>
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="entryreq" label="Entry Requirements" />
        <q-tab name="selectloc" label="Select Location" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="entryreq">
          <div class="text-h6 row justify-center">Entry Requirements</div>
          <div class="row justify-left">
            <q-checkbox
              dense
              v-model="govID"
              label="Government Issued ID"
              color="primary"
            />
          </div>
          <div class="row justify-left">
            <q-checkbox
              dense
              v-model="vaxRec"
              label="Covid Vaccination Record"
              color="primary"
            />
          </div>
          <div class="row justify-left">
            <q-checkbox
              dense
              v-model="covTest"
              label="PCR/Rapid Covid Test"
              color="red"
            />
          </div>
          <div class="q-pa-md q-pb-lg">
            <q-badge color="primary">
              Minimum Age: {{ age }} Years Old
            </q-badge>
          </div>

          <q-slider
            v-model="age"
            marker-labels
            :min="0"
            :max="21"
            :step="3"
            label
            label-always
            color="primary"
          />

          <p class="row justify-center q-pt-lg">
            <q-btn @click="updateRequirements" color="primary"
              >Update Business Requirements</q-btn
            >
          </p>
        </q-tab-panel>

        <q-tab-panel name="selectloc">
          <div class="text-h6 row justify-center">Select Location</div>
          Map and location Selection will go HERE.
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import db from "../boot/firebase.js";
import { ref } from "vue";

export default {
  setup() {
    return {
      tab: ref("mails"),
      govID: ref(true),
      vaxRec: ref(false),
      covTest: ref(true),
      cyan: ref(false),
      age: ref(0),
    };
  },
  data() {
    return {
      req: [],
    };
  },
  methods: {
    async loadReqs() {
      const auth = getAuth();
      const user = auth.currentUser;
      const docRef = doc(db, "business", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.data().req.length <= 0) {
      } else {
        this.govID = ref(docSnap.data().req[0]);
        this.vaxRec = ref(docSnap.data().req[1]);
        this.covTest = ref(docSnap.data().req[2]);
        this.age = ref(docSnap.data().req[3]);
      }
    },
    updateRequirements() {
      const auth = getAuth();
      const user = auth.currentUser;
      this.req = [];
      this.req.push(this.govID);
      this.req.push(this.vaxRec);
      this.req.push(this.covTest);
      this.req.push(this.age);
      updateDoc(doc(db, "business", user.uid), {
        req: this.req,
      });
      alert("Requirements Updated");
    },
  },
  mounted() {
    this.loadReqs();
  },
};
</script>

<style></style>
