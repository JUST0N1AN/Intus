<template>
  <h3 class="row justify-center">Business Verification</h3>

  <div v-if="!this.approved && this.exist">
    <h3>Your Application Is Pending Approval</h3>
    <p>You can edit your application and resubmit.</p>
  </div>

  <div class="row" v-if="!this.exists || !this.approved">
    <div class="col-6 offset-3">
      <q-form>
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
        <q-btn @click="regBus()" type="submit" label="submit" color="primary"></q-btn>
      </div>

      <div class="row justify-center q-pt-md" v-if="this.exists">
        <q-btn @click="updateRegBuss()" type="submit" label="resubmit" color="primary"></q-btn>
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
  getDocs,
  serverTimestamp
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";
import db from "../boot/firebase.js";
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
        date: serverTimestamp(),
      },
      auth: null,
      user: null,
      documents: [],

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
    regBus() {
      const auth = getAuth();
      const user = auth.currentUser;
      const storage = getStorage();
      const storageRef = ref(storage, this.formData.file[0].name);

      if (user) {
        uploadBytes(storageRef, this.formData.file[0]).then((snapshot) => {
          getDownloadURL(storageRef).then((url) => {
            const docRef = addDoc(
              collection(db, "business", user.uid, "Business Form"),
              {
                businessName: this.formData.name,
                registrationNumber: this.formData.regNumber,
                businessType: this.formData.type,
                address: this.formData.address,
                contactNumber: this.formData.contactNumber,
                file: this.formData.file[0].name,
                fileUrl: url,
                approved: this.formData.approved,
                date: this.formData.date,
              }
            );
          });
        });
        alert(
          "Application Submitted and is Pending Approval " + this.formData.name
        );

      } else {
        alert("You must be signed in");
      }
    },

    async updateRegBuss() {
      const auth = getAuth();
      const user = auth.currentUser;
      const storage = getStorage();
      const storageRef = ref(storage, this.formData.file[0].name);
      const docRef = collection(db, "business", user.uid, "Business Form");
      if (user) {
        uploadBytes(storageRef, this.formData.file[0]).then((snapshot) => {
          getDownloadURL(storageRef).then(async (url) => {
            await setDoc(docRef, {
              businessName: this.formData.name,
              registrationNumber: this.formData.regNumber,
              businessType: this.formData.type,
              address: this.formData.address,
              contactNumber: this.formData.contactNumber,
              file: this.formData.file[0].name,
              fileUrl: url,
              approved: this.formData.approved,
              date: this.formData.date,
            });
          });
        });
        await updateDoc(docRef2, {
          businessName: this.formData.name,
        });
        alert(
          "Application Resubmitted and is Pending Approval " + this.formData.name
        );
      } else {
        alert("You must be signed in");
      }
    },
    async checkApplicationExistence() {
      const auth = getAuth();
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        const docRef = collection(db, "business", user.uid, "Business Form");
        const docSnap = await getDocs(docRef);

        if (docSnap.size > 0) {
          this.exists = true;
          console.log("Exists");
          docSnap.forEach((doc) => {
            this.documents.push(doc);
          });
          if (this.documents[0].data().approved) {
            this.approved = true;
            console.log("Approval: ", this.approved);
            console.log("Exist: ", this.exists);

          }
          else {
            this.formData.name = this.documents[0].data().businessName;
            this.formData.regNumber = this.documents[0].data().registrationNumber;
            this.formData.type = this.documents[0].data().businessType;
            this.formData.address = this.documents[0].data().address;
            this.formData.contactNumber = this.documents[0].data().contactNumber;
            this.formData.date = this.documents[0].data().date;
          }

        } else {
          this.exists = false;
          console.log("No such document!");
        }
      }
      else {
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
