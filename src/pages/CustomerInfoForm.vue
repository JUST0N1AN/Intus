<template>
  <h3 class="row justify-center">Customer Information Registration Form</h3>

  <div class="q-pa-md">
    <q-img
      src="~assets/ProfilePhoto.png"
      spinner-color="white"
      style="width: 150px; height: 150px"
      img-class="my-custom-image"
      class="rounded-borders"
    ></q-img>
    <p>
      <strong>Passport Size Photo</strong>
    </p>
  </div>
  <div class>
    <q-form>
      <q-file
        v-model="formData.passportPhoto"
        label="Upload Passport Size Photo"
        square
        filled
        counter
        hint="Passport Size Photo"
        max-files="1"
        :rules="[(val) => !!val || 'Field is required']"
        multiple
      >
        <template v-slot:prepend>
          <q-icon name="photo" />
        </template>
      </q-file>

      <bold>First Name</bold>
      <q-input
        square
        filled
        label="First Name"
        v-model="formData.firstName"
        :rules="[(val) => !!val || 'Field is required']"
        id="firstName"
        required
      />
      <bold>Last Name</bold>
      <q-input
        square
        filled
        label="Last Name"
        v-model="formData.lastName"
        :rules="[(val) => !!val || 'Field is required']"
        id="lasName"
        required
      />

      <bold>Age</bold>
      <q-input v-model.number="formData.age" type="number" filled style="max-width: 200px" />

      <bold>Date of Birth</bold>
      <q-input filled v-model="date" mask="date" :rules="['date']" label="YYYY/MM/DD">
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

      <bold>Identification Type</bold>
      <q-select
        square
        filled
        v-model="formData.identificationType"
        :options="idTypes"
        label="Identification Type"
        id="type"
        :rules="[(val) => !!val || 'Field is required']"
      />
      <bold>Identification Number</bold>
      <q-input
        square
        filled
        label="Identification Number"
        v-model="formData.identificationNumber"
        :rules="[(val) => !!val || 'Field is required']"
        id="idNumber"
        required
      />
      <bold>Vaccine Type - 1st Dose</bold>
      <q-select
        square
        filled
        v-model="formData.vaccine.firstDoseType"
        :options="vaccineTypes"
        label="Vaccine Type - 1st Dose"
        id="type"
        :rules="[(val) => !!val || 'Field is required']"
      />
      <bold>Vaccine Type - 1st Dose Date</bold>
      <q-input filled v-model="date" mask="date" :rules="['date']" label="YYYY/MM/DD"
      >
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
      <q-select
        square
        filled
        v-model="formData.vaccine.secondDoseType"
        :options="vaccineTypes"
        label="Vaccine Type - 2nd Dose"
        id="type"
        :rules="[(val) => !!val || 'Field is required']"
      />
      <bold>Vaccine Type - 2nd Dose</bold>
      <q-input filled v-model="date2" mask="date2" :rules="['date2']"  label="YYYY/MM/DD">
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
        <q-img
          src="~assets/VaxCardSampleFront.png"
          spinner-color="white"
          style="width: 280px; height: 200px"
          img-class="my-custom-image"
          class="rounded-borders"
        ></q-img>
      </div>

      <q-file
        v-model="formData.documents.frontVaccinationCard"
        label="Front File(Capturing both Left & Right Sides) "
        square
        filled
        counter
        hint="Front File(Capturing both Left & Right Sides)"
        max-files="1"
        :rules="[(val) => !!val || 'Field is required']"
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
        v-model="formData.documents.insideVaccinationCard"
        label="Inside / Back File(Capturing both Inner Sides) * "
        square
        filled
        counter
        hint="Inside / Back File(Capturing both Inner Sides) *"
        max-files="1"
        :rules="[(val) => !!val || 'Field is required']"
        multiple
      >
        <template v-slot:prepend>
          <q-icon name="cloud_upload" @click.stop />
        </template>
        <template v-slot:hint>Field hint</template>
      </q-file>

      <strong>File Upload - Identification used above (Birth Paper, Drivers Permit, National Identification Card or Passport)</strong>
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
        v-model="formData.documents.identificationUsedFront"
        label="Front File(Capturing both Left & Right Sides) "
        square
        filled
        counter
        hint="Front File(Capturing both Left & Right Sides)"
        max-files="1"
        :rules="[(val) => !!val || 'Field is required']"
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
        v-model="formData.documents.identificationUsedBack"
        label="Inside / Back File(Capturing both Inner Sides) * "
        square
        filled
        counter
        hint="Inside / Back File(Capturing both Inner Sides) *"
        max-files="1"
        :rules="[(val) => !!val || 'Field is required']"
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
import { ref } from 'vue'
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
      date: ref('2021/10/01')
    }
  },
   methods: {
      submit() {

      },
    }
}
</script>

