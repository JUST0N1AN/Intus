<template>
  <h1>Business Registration</h1>

  <div class="p-ma-md">
    <div style="max-width: 300px">
      <q-form @submit="submitForm">
        <q-input
          rounded
          filled
          label="Registered Business Name"
          v-model="formData.name"
          :rules="[val => !!val || 'Field is required']"
          id="name"
          required
        />

        <q-input
          rounded
          filled
          v-model="formData.regNumber"
          maxlength="7"
          label="Business #"
          :rules="[val => val.length >= 7 || 'Please use 7 characters']"
          required
          hint="Please use 7 characters"
          id="regNumber"
        />

        <q-select
          rounded
          filled
          v-model="formData.type"
          :options="options"
          label="Type of Business"
          id="type"
          :rules="[val => !!val || 'Field is required']"
        />

        <q-input
          rounded
          filled
          label=" Address"
          v-model="formData.address"
          :rules="[val => !!val || 'Field is required']"
          id="address"
        >
          <template v-slot:prepend>
            <q-icon name="place" />
          </template>
        </q-input>

        <q-input
          rounded
          filled
          label=" Contact Number"
          v-model="formData.contactNumber"
          mask="(###) ### - ####"
          hint="Mask: (###) ### - ####"
          :rules="[val => !!val || 'Field is required']"
          id="contactNumber"
        >
          <template v-slot:prepend>
            <q-icon name="phone" />
          </template>
        </q-input>

        <q-file
          v-model="formData.file"
          label="Upload Proof of Address"
          rounded
          filled
          counter
          hint="Utlity Bill or Notice of Address"
          :counter-label="counterLabelFn"
          max-files="1"
          multiple
          style="max-width: 300px"
        >
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>

        <div class="q-pt-md">
          <q-btn type="submit" label="submit"></q-btn>
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>

import { getAuth } from "firebase/auth";
import { collection, addDoc, setDoc, doc, updateDoc } from "firebase/firestore";
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

      options: ['Sole Proprietorship', 'Partnership', 'Limited Liability Company', 'NGO'],

    }
  },
  methods: {
    submitForm() {
      const auth = getAuth();
      const user = auth.currentUser;
      var today = new Date();
      var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();


      if (user) {
        const docRef = addDoc(collection(db, "users", user.uid, "Business Form"), {
          businessName: this.formData.name,
          registrationNumber: this.formData.regNumber,
          businessType: this.formData.type,
          address: this.formData.address,
          contactNumber: this.formData.contactNumber,
          //proofOfAddress: this.formData.file,
          approved: this.formData.approved,
          date: String(this.today)
        });

        alert("Application Submitted and is Pending Approval " + this.formData.name);


      }

      else {
        alert("You must be signed in")
      }

    }

  }
}

</script>
<style>
#address {
  max-width: 600px;
}
</style>
