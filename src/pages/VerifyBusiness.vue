<template>
  <h3 class="row justify-center">Business Verification</h3>

  <div class="row" v-if="!exists">
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
      <div class="row justify-center q-pt-md">
        <q-btn @click="regBus()" type="submit" label="submit" color="primary"></q-btn>
      </div>
    </div>
  </div>
  <h3>Your Application Is Pending Approval</h3>
  <div class ="q-pa-md" v-if="this.documents[0].data().approved">
    <h3>Your application has been approved</h3>
    <q-icon class="las la-check-circle" size='xl' color="green"></q-icon>
  </div>

  <p>You can edit your document and resubmit.</p>
</template>

<script>
import { getAuth } from "firebase/auth";
import { collection, addDoc, setDoc, doc, updateDoc,getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, deleteObject, getDownloadURL } from "firebase/storage";
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
      },
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
      var today = new Date();
      var date =
        today.getDate() +
        "/" +
        (today.getMonth() + 1) +
        "/" +
        today.getFullYear();

      if (user) {

        uploadBytes(storageRef, this.formData.file[0]).then((snapshot) => {
          getDownloadURL(storageRef).then((url) => {
            const docRef = addDoc(collection(db, "business", user.uid, "Business Form"),
              {
                businessName: this.formData.name,
                registrationNumber: this.formData.regNumber,
                businessType: this.formData.type,
                address: this.formData.address,
                contactNumber: this.formData.contactNumber,
                file: this.formData.file[0].name,
                fileUrl: url,
                approved: this.formData.approved,
                date: String(this.today),
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
    async checkApplicationExistence() {
      const auth = getAuth();
      const user = auth.currentUser;
      const docRef = collection(db, "business", user.uid,"Business Form");
      const docSnap = await getDocs(docRef);

      if (docSnap.size > 0) {
        this.exists = true;
        console.log("Exists");
        docSnap.forEach((doc)=>{
          this.documents.push(doc)
        })
        //console.log(this.documents[0].data().approved);
      } else {
        this.exists = false;
        console.log("No such document!");
      }

    },
    editForm(){

    }
  },
  created() {
    this.checkApplicationExistence();
  }
};
</script>
<style>
#address {
  max-width: 600px;
}
</style>
