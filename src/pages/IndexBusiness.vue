<template>
  <div class="row justify-center">
    <img
      alt="Quasar logo"
      src="~assets/Intus_Logo.svg"
      style="width: 300px; height: 300px"
    />
  </div>
  <div>
    <q-card class="my-card bg-primary text-white">
      <q-card-section>
        <div class="text-h6">Welcome To Intus</div>
        <div class="text-subtitle2">by Freshers Tech</div>
      </q-card-section>

      <q-card-section>
        <p>
          This is your business Homepage where you will land every time you
          login with a business account.
        </p>
        <p>
          To get your business displayed on our map, you need to submit our
          quick verification form. An admin will approve or critique your
          request after verification.
        </p>
        <p>
          You can edit your entry requirements and loction on our map using the
          business options page.
        </p>
        <p>
          The links below may aid in your navigation of our site. Contact us via
          <a href="intus.auto.response@gmail.com">Email</a>
        </p>
      </q-card-section>

      <q-separator dark />

      <q-card-actions>
        <q-btn to="/busoptions" flat>Change Your Requirements</q-btn>
        <q-btn to="/verbusiness" flat>Verify Your Business</q-btn>
        <q-btn to="/scanqr" flat>Scan a QR Code</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

export default defineComponent({
  name: "PageIndex",

  data() {
    return {
      loggedIn: false,
    };
  },
});
</script>
