<template>
  <h3 class="row justify-center">Business Verification</h3>

  <div v-if="!this.approved && this.exists">
    <h3>Your Application Is Pending Approval</h3>
    <p>You can edit your application and resubmit.</p>
  </div>

  <div class="row" v-if="!this.exists || !this.approved">
    <div class="col-6 offset-3">
      <q-form ref="form">
        <q-input
          square
          filled
          label="Registered Business Name"
          v-model="formData.name"
          :rules="[(val) => !!val || 'Field is required']"
          id="name"
          required
        />

        <q-input
          square
          filled
          v-model="formData.regNumber"
          maxlength="7"
          label="Business #"
          :rules="[(val) => val.length >= 7 || 'Please use 7 characters']"
          required
          hint="Please use 7 characters"
          id="regNumber"
        />

        <q-select
          square
          filled
          v-model="formData.type"
          :options="options"
          label="Type of Business"
          id="type"
          :rules="[(val) => !!val || 'Field is required']"
        />

        <q-input
          square
          filled
          label=" Address"
          v-model="formData.address"
          :rules="[(val) => !!val || 'Field is required']"
          id="address"
        >
          <template v-slot:prepend>
            <q-icon name="place" />
          </template>
        </q-input>

        <q-input
          square
          filled
          label=" Contact Number"
          v-model="formData.contactNumber"
          mask="(###) ### - ####"
          hint="Mask: (###) ### - ####"
          :rules="[(val) => !!val || 'Field is required']"
          id="contactNumber"
        >
          <template v-slot:prepend>
            <q-icon name="phone" />
          </template>
        </q-input>

        <q-file
          v-model="formData.file"
          label="Upload Proof of Address"
          square
          filled
          counter
          hint="Utlity Bill or Notice of Address"
          max-files="1"
          multiple
        >
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>
      </q-form>
      <div class="row justify-center q-pt-md" v-if="!this.exists">
        <q-btn @click="regBus(); " type="submit" label="submit" color="primary"></q-btn>
      </div>

      <div class="row justify-center q-pt-md" v-if="this.exists">
        <q-btn @click="updateRegBuss(); " type="submit" label="resubmit" color="primary"></q-btn>
      </div>
    </div>
  </div>

  <div class="q-pa-md" v-if="this.approved">
    <h3>Your application has been approved</h3>
    <q-icon class="las la-check-circle" size="xl" color="green"></q-icon>
  </div>
</template>

<script>
import { getAuth } from "firebase/auth";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  updateDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";
import db from "../boot/firebase.js";

//init("ZPrr5joeG93gWzGKy");
export default {
  data() {
    return {
      formData: {
        name: null,
        regNumber: null,
        type: null,
        address: null,
        contactNumber: null,
        file: null,
        approved: false,
        decline: false,
        date: serverTimestamp(),

      },
      auth: null,
      user: null,
      documents: [],
      componentKey: 0,

      options: [
        "Sole Proprietorship",
        "Partnership",
        "Limited Liability Company",
        "NGO",
      ],

      exists: null,
      approved: null,
    };
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;
    },
    regBus() {
      const auth = getAuth();
      const user = auth.currentUser;
      const storage = getStorage();
      const storageRef = ref(storage, this.formData.file[0].name);
      const docRef = doc(db, "business", user.uid);

      if (user) {
        uploadBytes(storageRef, this.formData.file[0]).then((snapshot) => {
          getDownloadURL(storageRef).then(async (url) => {
            await updateDoc(docRef, {
              businessInfo: {
                businessName: this.formData.name,
                registrationNumber: this.formData.regNumber,
                businessType: this.formData.type,
                address: this.formData.address,
                contactNumber: this.formData.contactNumber,
                file: this.formData.file[0].name,
                fileUrl: url,
                approved: this.formData.approved,
                decline: this.formData.decline,
                date: this.formData.date,
              },
            });
          });
        });
        alert(
          "Application Submitted and is Pending Approval " + this.formData.name
        );
      } else {
        alert("You must be signed in");
      }
    },

    updateRegBuss() {
      const auth = getAuth();
      const user = auth.currentUser;
      const storage = getStorage();
      const storageRef = ref(storage, this.formData.file[0].name);
      const docRef = doc(db, "business", user.uid);
      const timeRef = serverTimestamp();

      if (user) {
        uploadBytes(storageRef, this.formData.file[0]).then((snapshot) => {
          getDownloadURL(storageRef).then(async (url) => {
            await updateDoc(docRef, {
              businessInfo: {
                businessName: this.formData.name,
                registrationNumber: this.formData.regNumber,
                businessType: this.formData.type,
                address: this.formData.address,
                contactNumber: this.formData.contactNumber,
                file: this.formData.file[0].name,
                fileUrl: url,
                approved: this.formData.approved,
                decline: this.formData.decline,
                date: timeRef,
              },
            });
          });
        });
        alert(
          "Application Resubmitted and is Pending Approval " +
          this.formData.name
        );

      } else {
        alert("You must be signed in");
      }
    },
    async checkApplicationExistence() {
      const auth = getAuth();
      const user = auth.currentUser;
      console.log(user);
      const docRef = doc(db, "business", user.uid);
      const docSnap = await getDoc(docRef);
      console.log("Docs: ", docSnap.data());
      if (user) {
        if (docSnap.data().businessInfo != null) {
          this.exists = true;
          console.log("Exists");
          if (docSnap.data().businessInfo.approved) {
            this.approved = true;
            console.log("Approval: ", this.approved);
            console.log("Exist: ", this.exists);
          } else {
            this.formData.name = docSnap.data().businessInfo.businessName;
            this.formData.regNumber = docSnap.data().businessInfo.registrationNumber;
            this.formData.type = docSnap.data().businessInfo.businessType;
            this.formData.address = docSnap.data().businessInfo.address;
            this.formData.contactNumber = docSnap.data().businessInfo.contactNumber;
            this.formData.date = docSnap.data().date;
          }
        } else {
          this.exists = false;
          console.log("No such document!");
        }
      } else {
        alert("Must be signed in");
      }
    },
  },
  mounted() {
    this.checkApplicationExistence();
  },
};
</script>
<style>
#address {
  max-width: 600px;
}
</style>
