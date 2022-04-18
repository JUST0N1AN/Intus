<template>
  <h3 class="row justify-center">Customer Information Registration Form</h3>

  <div class="q-pa-md">
    <q-img src="~assets/ProfilePhoto.png" spinner-color="white" style="width: 150px; height: 150px"
      img-class="my-custom-image" class="rounded-borders"></q-img>
    <p>
      <strong>Passport Size Photo</strong>
    </p>
  </div>
  <div class>
    <q-form>
      <q-file v-model="formData.passportPhoto" label="Upload Passport Size Photo" square filled counter
        hint="Passport Size Photo" max-files="1" :rules="[(val) => !!val || 'Field is required']" multiple>
        <template v-slot:prepend>
          <q-icon name="photo" />
        </template>
      </q-file>

      <bold>First Name</bold>
      <q-input square filled label="First Name" v-model="formData.firstName"
        :rules="[(val) => !!val || 'Field is required']" id="firstName" required />
      <bold>Last Name</bold>
      <q-input square filled label="Last Name" v-model="formData.lastName"
        :rules="[(val) => !!val || 'Field is required']" id="lasName" required />

      <!-- <bold>Age</bold>
      <q-input v-model.number="formData.age" type="number" filled style="max-width: 200px" /> -->

      <bold>Date of Birth</bold>
      <q-input filled v-model="formData.DOB" mask="date" :rules="['date']" label="YYYY/MM/DD">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
              <q-date v-model="formData.DOB">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <bold>Contact Number</bold>
      <q-input square filled label=" Contact Number" v-model="formData.phoneNumber" mask="(###) ### - ####"
        hint="Mask: (###) ### - ####" :rules="[(val) => !!val || 'Field is required']" id="contactNumber">
        <template v-slot:prepend>
          <q-icon name="phone" />
        </template>
      </q-input>

      <bold>Identification Type</bold>
      <q-select square filled v-model="formData.identificationType" :options="idTypes" label="Identification Type"
        id="type" :rules="[(val) => !!val || 'Field is required']" />
      <bold>Identification Number</bold>
      <q-input square filled label="Identification Number" v-model="formData.identificationNumber"
        :rules="[(val) => !!val || 'Field is required']" id="idNumber" required />
      <bold>Vaccine Type - 1st Dose</bold>
      <q-select square filled v-model="formData.vaccine.firstDoseType" :options="vaccineTypes"
        label="Vaccine Type - 1st Dose" id="type" :rules="[(val) => !!val || 'Field is required']" />
      <bold>Vaccine Type - 1st Dose Date</bold>
      <q-input filled v-model="formData.vaccine.firstDoseDate" mask="date" :rules="['date']" label="YYYY/MM/DD">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
              <q-date v-model="formData.vaccine.firstDoseDate">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <bold>Vaccine Type - 2nd Dose</bold>
      <q-select square filled v-model="formData.vaccine.secondDoseType" :options="vaccineTypes"
        label="Vaccine Type - 2nd Dose" id="type" :rules="[(val) => !!val || 'Field is required']" />
      <bold>Vaccine Type - 2nd Dose</bold>
      <q-input filled v-model="formData.vaccine.secondDoseDate" mask="date" :rules="['date2']" label="YYYY/MM/DD">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
              <q-date v-model="formData.vaccine.secondDoseDate">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <br />
      <bold>Plese upload either PDF,PNG or JPEG files for the documents submitted below</bold>
      <br />
      <br />
      <br />
      <strong>File Upload - Vaccination Card.(Front and Inside of Immunization Card)</strong>
      <div class="q-pa-md">
        <q-img src="~assets/VaxCardSampleFront.png" spinner-color="white" style="width: 280px; height: 200px"
          img-class="my-custom-image" class="rounded-borders"></q-img>
      </div>

      <q-file v-model="formData.documents.frontVaccinationCard" label="Front File(Capturing both Left & Right Sides) "
        square filled counter hint="Front File(Capturing both Left & Right Sides)" max-files="1"
        :rules="[(val) => !!val || 'Field is required']" multiple>
        <template v-slot:prepend>
          <q-icon name="cloud_upload" @click.stop />
        </template>
        <template v-slot:hint>Field hint</template>
      </q-file>
      <div class="q-pa-md">
        <q-img src="~assets/VaxCardSampleBack.png" spinner-color="white" style="width: 280px; height: 200px"
          img-class="my-custom-image" class="rounded-borders"></q-img>
      </div>
      <q-file v-model="formData.documents.insideVaccinationCard"
        label="Inside / Back File(Capturing both Inner Sides) * " square filled counter
        hint="Inside / Back File(Capturing both Inner Sides) *" max-files="1"
        :rules="[(val) => !!val || 'Field is required']" multiple>
        <template v-slot:prepend>
          <q-icon name="cloud_upload" @click.stop />
        </template>
        <template v-slot:hint>Field hint</template>
      </q-file>

      <strong>File Upload - Identification used above (Birth Paper, Drivers Permit, National Identification Card or
        Passport)</strong>
      <div class="q-pa-md">
        <q-img src="~assets/idCardFront.jpeg" spinner-color="white" style="width: 280px; height: 200px"
          img-class="my-custom-image" class="rounded-borders"></q-img>
      </div>

      <q-file v-model="formData.documents.identificationUsedFront"
        label="Front File(Capturing both Left & Right Sides) " square filled counter
        hint="Front File(Capturing both Left & Right Sides)" max-files="1"
        :rules="[(val) => !!val || 'Field is required']" multiple>
        <template v-slot:prepend>
          <q-icon name="cloud_upload" @click.stop />
        </template>
        <template v-slot:hint>Field hint</template>
      </q-file>
      <div class="q-pa-md">
        <q-img src="~assets/idCardBack.png" spinner-color="white" style="width: 280px; height: 200px"
          img-class="my-custom-image" class="rounded-borders"></q-img>
      </div>
      <q-file v-model="formData.documents.identificationUsedBack"
        label="Inside / Back File(Capturing both Inner Sides) * " square filled counter
        hint="Inside / Back File(Capturing both Inner Sides) *" max-files="1"
        :rules="[(val) => !!val || 'Field is required']" multiple>
        <template v-slot:prepend>
          <q-icon name="cloud_upload" @click.stop />
        </template>
        <template v-slot:hint>Field hint</template>
      </q-file>

      <q-btn @click="submit()" type="submit" label="submit" color="primary"></q-btn>
    </q-form>
  </div>
</template>

<script>
import {
  collection,
  addDoc,
  setDoc,
  doc,
  updateDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, deleteObject, getDownloadURL, } from "firebase/storage";
import db from "../boot/firebase.js";
export default {
  data() {
    return {
      formData: {
        firstName: null,
        lastName: null,
        age: null,
        DOB: null,
        phoneNumber: null,
        identificationType: null,
        identificationNumber: null,
        vaccine: {
          firstDoseType: null,
          secondDoseType: null,
          firstDoseDate: null,
          secondDoseDate: null,
        },
        documents: {
          frontVaccinationCard: null,
          insideVaccinationCard: null,
          identificationUsedFront: null,
          identificationUsedBack: null,
          testResults: null,
        },
        passportPhoto: null,
      },
      idTypes: [
        "National Identification Card",
        "Birth Paper",
        "Drivers Permit",
        "Passport"
      ],
      vaccineTypes: [
        "AstraZeneca",
        "Sinopharm",
        "Pfizer",
        "Moderna",
        "Janssen",
        "Sinovac"
      ],

      documents: {
        idFront: null,
        idBack: null,
        frontVaxCard: null,
        insideVaxCard: null,
        passportPhoto: null,
      },
      date: null,
      date1: null,
      date2: null,

      exists: false,

    }
  },
  methods: {
    calculateAge() {
      var today = new Date();
      var birthDate = formData.DOB;
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      formData.age = age;
    },
    submit() {
      const auth = getAuth();
      const user = auth.currentUser;
      const docRef = doc(db, "users", user.uid);
      const storage = getStorage();
      const idFrontStorageRef = ref(storage, this.formData.documents.identificationUsedFront[0].name);
      const idBackStorageRef = ref(storage, this.formData.documents.identificationUsedBack[0].name);
      const frontVaxCardStorageRef = ref(storage, this.formData.documents.frontVaccinationCard[0].name);
      const insideVaxCardStorageRef = ref(storage, this.formData.documents.insideVaccinationCard[0].name);
      const passportPhotoStorageRef = ref(storage, this.formData.passportPhoto[0].name);

      //calculateAge();
      if (user) {
        uploadBytes(idFrontStorageRef, this.formData.documents.identificationUsedFront[0]).then((snapshot) => {
          getDownloadURL(idFrontStorageRef).then(async (idFrontURL) => {
            this.documents.idFront = idFrontURL;
          });
        });

        uploadBytes(idBackStorageRef, this.formData.documents.identificationUsedBack[0]).then((snapshot) => {
          getDownloadURL(idBackStorageRef).then(async (idBackURL) => {
            console.log(idBackURL);
             this.documents.idBack = idBackURL;

          });
        });

        uploadBytes(frontVaxCardStorageRef, this.formData.documents.frontVaccinationCard[0]).then((snapshot) => {
          getDownloadURL(frontVaxCardStorageRef).then(async (frontVaxCardURL) => {
            this.documents.frontVaxCard = frontVaxCardURL;
          });
        });

        uploadBytes(insideVaxCardStorageRef, this.formData.documents.insideVaccinationCard[0]).then((snapshot) => {
          getDownloadURL(insideVaxCardStorageRef).then(async (insideVaxCardURL) => {
            this.documents.insideVaxCard = insideVaxCardURL;
          });
        });


        uploadBytes(passportPhotoStorageRef, this.formData.passportPhoto[0]).then((snapshot) => {
          getDownloadURL(passportPhotoStorageRef).then(async (passportPhotoURL) => {
            this.documents.passportPhoto = passportPhotoURL;
            setTimeout(4000)
            await updateDoc(docRef, {
              customerInfo: {
                firstName: this.formData.firstName,
                lastName: this.formData.lastName,
                idType: this.formData.identificationType,
                idNumber: this.formData.identificationNumber,
                age: this.formData.age,
                DOB: this.formData.DOB,
                phoneNumber: this.formData.phoneNumber,
                firstDoseVaccineType: this.formData.vaccine.firstDoseType,
                secondDoseVaccineType: this.formData.vaccine.secondDoseType,
                firstDoseDate: this.formData.vaccine.firstDoseDate,
                secondDoseDate: this.formData.vaccine.secondDoseDate,
                documents: this.documents,
                // documents: {
                //   idFront: documentsURL[0],
                //   idBack: documentsURL[1],
                //   frontVaxCard: documentsURL[2],
                //   insideVaxCard: documentsURL[3],
                //   passportPhoto: documentsURL[4],
                // }
              },
            });
            alert("Submitted Succesfully " + this.formData.firstName);
          });
        });
      }
      else {
        alert("Not Logged In");
      }
    },
    async checkExistence() {
      const auth = getAuth();
      const user = auth.currentUser;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if(user){
        if(docSnap.data().customerInfo !=null){
          this.exists = true;
          this.formData.firstName = docSnap.data().customerInfo.firstName;
          this.formData.lastName = docSnap.data().customerInfo.lastName ;
          this.formData.identificationType = docSnap.data().customerInfo.idType;
          this.formData.identificationNumber = docSnap.data().customerInfo.idNumber;
          this.formData.age = docSnap.data().customerInfo.age;
          this.formData.DOB = docSnap.data().customerInfo.DOB;
          this.formData.phoneNumber = docSnap.data().customerInfo.phoneNumber;
          this.formData.vaccine.firstDoseType = docSnap.data().customerInfo.firstDoseVaccineType;
          this.formData.vaccine.secondDoseType = docSnap.data().customerInfo.secondDoseVaccineType;
          this.formData.vaccine.firstDoseDate = docSnap.data().customerInfo.firstDoseDate;
          this.formData.vaccine.secondDoseDate = docSnap.data().customerInfo.secondDoseDate;
        }
      }
      else{
        alert("Must be signed in");
      }

    console.log("Exist:",docSnap.data());
    }
  },
  mounted() {
    this.checkExistence();
  }
};
</script>

