<template>
  <div class="q-pa-md">
    <h3 class="row justify-center">Admin Panel</h3>
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
        <q-tab name="pending" label="Pending Approval Requests" />
        <q-tab name="bus" label="Businesses" />
        <q-tab name="users" label="Users" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="pending">
          <div class="text-h6 row justify-center">
            Businesses Pending Verification
          </div>
          <div>
            <q-list bordered separator>
              <q-item clickable v-ripple v-if="empty()">
                <q-item-section>
                  <q-item-label overline
                    >No Verification Requests at This Time</q-item-label
                  >
                  <q-item-label>Thank You Admin</q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                clickable
                v-ripple
                v-for="(i, index) in pending"
                :key="index"
                @click="
                  capture(i);
                  pend = true;
                "
              >
                <q-item-section>
                  <q-item-label overline>{{ i.data().name }}</q-item-label>
                  <q-item-label>{{ i.data().desc }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </q-tab-panel>

        <q-tab-panel name="bus">
          <div class="text-h6">Manage Businesses</div>
          <div>
            <q-list bordered separator>
              <q-item
                clickable
                v-ripple
                v-for="(i, index) in documents"
                :key="index"
              >
                <q-item-section>
                  <q-item-label overline>{{ i.data().name }}</q-item-label>
                  <q-item-label>{{ i.data().desc }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </q-tab-panel>

        <q-tab-panel name="users">
          <div class="text-h6">Manage Users</div>
          <div>
            <q-list bordered separator>
              <q-item v-ripple v-for="(i, index) in users" :key="index">
                <q-item-section>
                  <q-item-label overline>{{ i.data().name }}</q-item-label>
                  <q-item-label>{{ i.data().email }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>

  <q-dialog v-model="pend">
    <q-card>
      <q-card-section>
        <div class="text-h6">
          {{ this.modCont.data().name }}
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <p>
          Request Date: {{ this.modCont.data().businessInfo.date.toDate() }}
        </p>
        <p>Address: {{ this.modCont.data().businessInfo.address }}</p>
        <p>
          Registration Number:
          {{ this.modCont.data().businessInfo.registrationNumber }}
        </p>
        <p>
          Contact Number: {{ this.modCont.data().businessInfo.contactNumber }}
        </p>
        <p>
          Registered Name: {{ this.modCont.data().businessInfo.businessName }}
        </p>
        <p>
          Business Type: {{ this.modCont.data().businessInfo.businessType }}
        </p>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          label="View Proof of Address"
          color="primary"
          @click="open(this.modCont.data().businessInfo.fileUrl)"
          v-close-popup
        />
        <q-btn
          flat
          label="Approve"
          color="primary"
          @click="this.approve(this.modCont.id)"
          v-close-popup
        />
        <q-btn
          flat
          label="Decline"
          color="red"
          @click="this.decline(this.modCont.id)"
          v-close-popup
        />

        <q-btn flat label="Close" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { addDoc, setDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import db from "../boot/firebase.js";
import { ref } from "vue";

export default {
  setup() {},
  data() {
    return {
      pend: ref(false),
      modCont: null,
      documents: [],
      pending: [],
      users: [],
      tab: ref("pending"),
    };
  },
  methods: {
    async getDocuments() {
      const auth = getAuth();
      const user = auth.currentUser;
      const querySnapshot = await getDocs(collection(db, "business"));
      querySnapshot.forEach((doc) => {
        this.documents.push(doc);
        if (doc.data().businessInfo) {
          if (doc.data().approved == false && doc.data().declined == false) {
            this.pending.push(doc);
          }
        }
      });
    },
    async getUsers() {
      const auth = getAuth();
      const user = auth.currentUser;
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        this.users.push(doc);
      });
    },

    capture(data) {
      this.modCont = data;
      //console.log(data.id);
    },
    open(data) {
      window.open(data);
    },

    approve(id) {
      const docRef = doc(db, "business", id);
      updateDoc(docRef, {
        approved: true,
        declined: false,
      });
    },

    empty() {
      if (this.pending.length > 0) {
        return false;
      } else {
        return true;
      }
    },

    decline(id) {
      const docRef = doc(db, "business", id);
      updateDoc(docRef, {
        declined: true,
      });
    },

    displayDocs() {
      for (let i = 0; i < this.documents.length; i++) {
        if (this.documents[i].data().businessInfo) {
          console.log(this.documents[i].data().businessInfo);
        }
      }
    },
  },
  mounted() {
    this.getDocuments();
    this.getUsers();
  },
};
</script>
