<template>
  <h3 class="row justify-center">Business Verification</h3>

  <div class="row">
    <div class="col-6 offset-3">
      <q-form @submit="submitForm">
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
        <q-btn
          @click="regBus()"
          type="submit"
          label="submit"
          color="primary"
        ></q-btn>
      </div>
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

      options: [
        "Sole Proprietorship",
        "Partnership",
        "Limited Liability Company",
        "NGO",
      ],
    };
  },
  methods: {
    regBus() {
      const auth = getAuth();
      const user = auth.currentUser;
      var today = new Date();
      var date =
        today.getDate() +
        "/" +
        (today.getMonth() + 1) +
        "/" +
        today.getFullYear();

      if (user) {
        const docRef = addDoc(
          collection(db, "users", user.uid, "Business Form"),
          {
            businessName: this.formData.name,
            registrationNumber: this.formData.regNumber,
            businessType: this.formData.type,
            address: this.formData.address,
            contactNumber: this.formData.contactNumber,
            //proofOfAddress: this.formData.file,
            approved: this.formData.approved,
            date: String(this.today),
          }
        );

        alert(
          "Application Submitted and is Pending Approval " + this.formData.name
        );
      } else {
        alert("You must be signed in");
      }
    },
  },
};
</script>
<style>
#address {
  max-width: 600px;
}
</style>
