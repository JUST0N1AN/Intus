<template>
  <h3 class="text-primary row justify-center">
    Customer Information Registration Form
  </h3>

  <div class="q-pa-md">
    <q-img
      src="~assets/ProfilePhoto.png"
      spinner-color="white"
      style="width: 150px; height: 150px"
      img-class="my-custom-image"
      class="rounded-borders"
    ></q-img>
    <p class="text-primary">
      <strong>Passport Size Photo</strong>
    </p>
  </div>
  <div class>
    <q-form>
      <q-file
        class="q-mb-md"
        color="primary"
        bg-color="white"
        label-color="secondary"
        v-model="formData.passportPhoto"
        label="Upload Passport Size Photo"
        square
        filled
        counter
        :input-style="{ color: '#2FDABB' }"
        hint="Passport Size Photo"
        max-files="1"
        :rules="[(val) => !!val || 'Field is required']"
        accept=".jpg, image/*"
        multiple
      >
        <template v-slot:prepend>
          <q-icon name="photo" />
        </template>
      </q-file>

      <strong class="text-primary">First Name</strong>
      <q-input
        class="q-mb-md"
        color="primary"
        bg-color="white"
        label-color="secondary"
        square
        filled
        label="First Name"
        v-model="formData.firstName"
        :rules="[(val) => !!val || 'Field is required']"
        id="firstName"
        required
      />
      <strong class="text-primary">Last Name</strong>
      <q-input
        class="q-mb-md"
        color="primary"
        bg-color="white"
        label-color="secondary"
        square
        filled
        label="Last Name"
        v-model="formData.lastName"
        :rules="[(val) => !!val || 'Field is required']"
        id="lasName"
        required
      />

      <!-- <strong>Age</strong>
      <q-input v-model.number="formData.age" type="number" filled style="max-width: 200px" /> -->

      <strong class="text-primary">Date of Birth</strong>
      <q-input
        class="q-mb-md"
        color="primary"
        bg-color="white"
        label-color="secondary"
        filled
        v-model="formData.DOB"
        mask="date"
        :rules="['date']"
        label="YYYY/MM/DD"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              ref="qDateProxy"
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date v-model="formData.DOB">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <strong class="text-primary">Contact Number</strong>
      <q-input
        class="q-mb-md"
        color="primary"
        bg-color="white"
        label-color="secondary"
        square
        filled
        label=" Contact Number"
        v-model="formData.phoneNumber"
        mask="(###) ### - ####"
        hint="Mask: (###) ### - ####"
        :rules="[(val) => !!val || 'Field is required']"
        id="contactNumber"
      >
        <template v-slot:prepend>
          <q-icon name="phone" />
        </template>
      </q-input>

      <strong class="text-primary">Identification Type</strong>
      <q-select
        class="q-mb-md"
        color="primary"
        bg-color="white"
        label-color="secondary"
        square
        filled
        v-model="formData.identificationType"
        :options="idTypes"
        label="Identification Type"
        id="type"
        :rules="[(val) => !!val || 'Field is required']"
      />
      <strong class="text-primary">Identification Number</strong>
      <q-input
        class="q-mb-md"
        color="primary"
        bg-color="white"
        label-color="secondary"
        square
        filled
        label="Identification Number"
        v-model="formData.identificationNumber"
        :rules="[(val) => !!val || 'Field is required']"
        id="idNumber"
        required
      />
      <strong class="text-primary">Vaccine Type - 1st Dose</strong>
      <q-select
        class="q-mb-md"
        color="primary"
        bg-color="white"
        label-color="secondary"
        square
        filled
        v-model="formData.vaccine.firstDoseType"
        :options="vaccineTypes"
        label="Vaccine Type - 1st Dose"
        id="type"
        :rules="[(val) => !!val || 'Field is required']"
      />
      <strong class="text-primary">Vaccine Type - 1st Dose Date</strong>
      <q-input
        class="q-mb-md"
        color="primary"
        bg-color="white"
        label-color="secondary"
        filled
        v-model="formData.vaccine.firstDoseDate"
        mask="date"
        :rules="['date']"
        label="YYYY/MM/DD"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              ref="qDateProxy"
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date v-model="formData.vaccine.firstDoseDate">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <strong class="text-primary">Vaccine Type - 2nd Dose</strong>
      <q-select
        class="q-mb-md"
        color="primary"
        bg-color="white"
        label-color="secondary"
        square
        filled
        v-model="formData.vaccine.secondDoseType"
        :options="vaccineTypes"
        label="Vaccine Type - 2nd Dose"
        id="type"
        :rules="[(val) => !!val || 'Field is required']"
      />
      <strong class="text-primary">Vaccine Type - 2nd Dose</strong>
      <q-input
        class="q-mb-md"
        color="primary"
        bg-color="white"
        label-color="secondary"
        filled
        v-model="formData.vaccine.secondDoseDate"
        mask="date"
        :rules="['date2']"
        label="YYYY/MM/DD"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              ref="qDateProxy"
              cover
              transition-show="scale"
              transition-hide="scale"
            >
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
      <strong class="text-primary"
        >Plese upload either PDF,PNG or JPEG files for the documents submitted
        below</strong
      >
      <br />
      <br />
      <br />
      <strong class="text-primary"
        >File Upload - Vaccination Card.(Front and Inside of Immunization
        Card)</strong
      >
      <div class="q-pa-md">
        <q-img
          src="~assets/VaxCardSampleFront.png"
          spinner-color="white"
          style="width: 280px; height: 200px"
          img-class="my-custom-image"
          class="rounded-borders"
        ></q-img>
      </div>

      <q-file
        class="q-mb-md"
        color="primary"
        bg-color="white"
        label-color="secondary"
        v-model="formData.documents.frontVaccinationCard"
        label="Front File(Capturing both Left & Right Sides) "
        square
        filled
        counter
        hint="Front File(Capturing both Left & Right Sides)"
        max-files="1"
        :rules="[(val) => !!val || 'Field is required']"
        accept=".jpg, image/*"
        multiple
      >
        <template v-slot:prepend>
          <q-icon name="cloud_upload" @click.stop />
        </template>
        <template v-slot:hint>Field hint</template>
      </q-file>
      <div class="q-pa-md">
        <q-img
          src="~assets/VaxCardSampleBack.png"
          spinner-color="white"
          style="width: 280px; height: 200px"
          img-class="my-custom-image"
          class="rounded-borders"
        ></q-img>
      </div>
      <q-file
        class="q-mb-md"
        color="primary"
        bg-color="white"
        label-color="secondary"
        v-model="formData.documents.insideVaccinationCard"
        label="Inside / Back File(Capturing both Inner Sides) * "
        square
        filled
        counter
        hint="Inside / Back File(Capturing both Inner Sides) *"
        max-files="1"
        :rules="[(val) => !!val || 'Field is required']"
        accept=".jpg, image/*"
        multiple
      >
        <template v-slot:prepend>
          <q-icon name="cloud_upload" @click.stop />
        </template>
        <template v-slot:hint>Field hint</template>
      </q-file>

      <strong class="text-primary"
        >File Upload - Identification used above (Birth Paper, Drivers Permit,
        National Identification Card or Passport)</strong
      >
      <div class="q-pa-md">
        <q-img
          src="~assets/idCardFront.jpeg"
          spinner-color="white"
          style="width: 280px; height: 200px"
          img-class="my-custom-image"
          class="rounded-borders"
        ></q-img>
      </div>

      <q-file
        class="q-mb-md"
        color="primary"
        bg-color="white"
        label-color="secondary"
        v-model="formData.documents.identificationUsedFront"
        label="Front File(Capturing both Left & Right Sides) "
        square
        filled
        counter
        hint="Front File(Capturing both Left & Right Sides)"
        max-files="1"
        :rules="[(val) => !!val || 'Field is required']"
        accept=".jpg, image/*"
        multiple
      >
        <template v-slot:prepend>
          <q-icon name="cloud_upload" @click.stop />
        </template>
        <template v-slot:hint>Field hint</template>
      </q-file>
      <div class="q-pa-md">
        <q-img
          src="~assets/idCardBack.png"
          spinner-color="white"
          style="width: 280px; height: 200px"
          img-class="my-custom-image"
          class="rounded-borders"
        ></q-img>
      </div>
      <q-file
        class="q-mb-md"
        color="primary"
        bg-color="white"
        label-color="secondary"
        v-model="formData.documents.identificationUsedBack"
        label="Inside / Back File(Capturing both Inner Sides) * "
        square
        filled
        counter
        hint="Inside / Back File(Capturing both Inner Sides) *"
        max-files="1"
        :rules="[(val) => !!val || 'Field is required']"
        accept=".jpg, image/*"
        multiple
      >
        <template v-slot:prepend>
          <q-icon name="cloud_upload" @click.stop />
        </template>
        <template v-slot:hint>Field hint</template>
      </q-file>

      <q-btn
        @click="submit()"
        type="submit"
        label="submit"
        color="primary"
      ></q-btn>
    </q-form>
  </div>
</template>

<script>
const axios = require("axios");
var stringSimilarity = require("string-similarity");
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
        firstName: null,
        lastName: null,
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
        "Passport",
      ],
      vaccineTypes: [
        "AstraZeneca",
        "Sinopharm",
        "Pfizer",
        "Moderna",
        "Janssen",
        "Sinovac",
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
      age: null,

      exists: false,
    };
  },
  methods: {
    calculateAge() {
      var today = new Date();
      var birthDate = this.formData.DOB;
      birthDate = new Date(birthDate);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      this.age = age;
    },
    getOCRDataT(fileUrl, str) {
      return new Promise((resolve, success) => {
        let apiurl = "https://googlevision-intus.herokuapp.com/ocr/uid?url=";
        let encodedUrl = encodeURIComponent(fileUrl);
        let newUrl = apiurl + encodedUrl;
        axios.get(newUrl).then((res) => {
          //
          //
          for (const x in res.data) {
            if (
              stringSimilarity.compareTwoStrings(res.data[x], str) >= 0.8 ||
              res.data[x].toLowerCase().includes(str.toLowerCase())
            ) {
              //
              resolve(true);
            }
          }
          resolve(false);
        });
      });
    },
    async getOCRData(fileUrl, str) {
      let apiurl = "https://googlevision-intus.herokuapp.com/ocr/uid?url=";
      let encodedUrl = encodeURIComponent(fileUrl);
      let newUrl = apiurl + encodedUrl;
      await axios.get(newUrl).then((res) => {
        for (const x in res.data) {
          if (stringSimilarity.compareTwoStrings(res.data[x], str) >= 0.8) {
          }
        }
      });
    },
    async submit() {
      const auth = getAuth();
      const user = auth.currentUser;
      const docRef = doc(db, "users", user.uid);
      const storage = getStorage();
      const idFrontStorageRef = ref(
        storage,
        this.formData.documents.identificationUsedFront[0].name
      );
      const idBackStorageRef = ref(
        storage,
        this.formData.documents.identificationUsedBack[0].name
      );
      const frontVaxCardStorageRef = ref(
        storage,
        this.formData.documents.frontVaccinationCard[0].name
      );
      const insideVaxCardStorageRef = ref(
        storage,
        this.formData.documents.insideVaccinationCard[0].name
      );
      const passportPhotoStorageRef = ref(
        storage,
        this.formData.passportPhoto[0].name
      );

      this.calculateAge();
      if (user) {
        uploadBytes(
          idFrontStorageRef,
          this.formData.documents.identificationUsedFront[0]
        ).then((snapshot) => {
          getDownloadURL(idFrontStorageRef).then(async (idFrontURL) => {
            this.documents.idFront = idFrontURL;
            const temp = await this.getOCRDataT(
              idFrontURL,
              this.formData.identificationNumber
            ).then(async (res) => {
              if (res === true) {
                await updateDoc(docRef, { "validDocs.id": true });
                //
              } else {
                await updateDoc(docRef, { "validDocs.id": false });
              }
            });
          });
        });

        uploadBytes(
          idBackStorageRef,
          this.formData.documents.identificationUsedBack[0]
        ).then((snapshot) => {
          getDownloadURL(idBackStorageRef).then(async (idBackURL) => {
            this.documents.idBack = idBackURL;
            if (this.formData.identificationType == this.idTypes[0]) {
              const temp = await this.getOCRDataT(
                idBackURL,
                this.formData.identificationNumber
              ).then(async (res) => {
                if (res === true) {
                  await updateDoc(docRef, { "validDocs.id": true });
                  //
                } else {
                  await updateDoc(docRef, { "validDocs.id": false });
                }
              });
            }
          });
        });

        uploadBytes(
          frontVaxCardStorageRef,
          this.formData.documents.frontVaccinationCard[0]
        ).then((snapshot) => {
          getDownloadURL(frontVaxCardStorageRef).then(
            async (frontVaxCardURL) => {
              this.documents.frontVaxCard = frontVaxCardURL;

              const temp = await this.getOCRDataT(
                frontVaxCardURL,
                this.formData.firstName
              ).then(async (res) => {
                if (res === true) {
                  await updateDoc(docRef, {
                    "validDocs.frontVaccinationCard": true,
                  });
                  //
                } else {
                  await updateDoc(docRef, {
                    "validDocs.frontVaccinationCard": false,
                  });
                }
              });
            }
          );
        });

        uploadBytes(
          insideVaxCardStorageRef,
          this.formData.documents.insideVaccinationCard[0]
        ).then((snapshot) => {
          getDownloadURL(insideVaxCardStorageRef).then(
            async (insideVaxCardURL) => {
              this.documents.insideVaxCard = insideVaxCardURL;

              const temp = await this.getOCRDataT(
                insideVaxCardURL,
                this.formData.vaccine.firstDoseType
              ).then(async (res) => {
                if (res === true) {
                  await updateDoc(docRef, {
                    "validDocs.insideVaccinationCard": true,
                  });
                  //
                } else {
                  await updateDoc(docRef, {
                    "validDocs.insideVaccinationCard": false,
                  });
                }
              });
            }
          );
        });

        uploadBytes(
          passportPhotoStorageRef,
          this.formData.passportPhoto[0]
        ).then((snapshot) => {
          getDownloadURL(passportPhotoStorageRef).then(
            async (passportPhotoURL) => {
              this.documents.passportPhoto = passportPhotoURL;
              setTimeout(8000);
              await updateDoc(docRef, {
                customerInfo: {
                  firstName: this.formData.firstName,
                  lastName: this.formData.lastName,
                  idType: this.formData.identificationType,
                  idNumber: this.formData.identificationNumber,
                  age: this.age,
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
            }
          );
        });
      } else {
        alert("Not Logged In");
      }
    },
    async checkExistence() {
      const auth = getAuth();
      const user = auth.currentUser;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (user) {
        if (docSnap.data().customerInfo != null) {
          this.exists = true;
          this.formData.firstName = docSnap.data().customerInfo.firstName;
          this.formData.lastName = docSnap.data().customerInfo.lastName;
          this.formData.identificationType = docSnap.data().customerInfo.idType;
          this.formData.identificationNumber =
            docSnap.data().customerInfo.idNumber;
          this.formData.age = docSnap.data().customerInfo.age;
          this.formData.DOB = docSnap.data().customerInfo.DOB;
          this.formData.phoneNumber = docSnap.data().customerInfo.phoneNumber;
          this.formData.vaccine.firstDoseType =
            docSnap.data().customerInfo.firstDoseVaccineType;
          this.formData.vaccine.secondDoseType =
            docSnap.data().customerInfo.secondDoseVaccineType;
          this.formData.vaccine.firstDoseDate =
            docSnap.data().customerInfo.firstDoseDate;
          this.formData.vaccine.secondDoseDate =
            docSnap.data().customerInfo.secondDoseDate;
        }
      } else {
        alert("Must be signed in");
      }
    },
  },
  mounted() {
    this.checkExistence();
  },
};
</script>
