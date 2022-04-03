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
              <q-item
                clickable
                v-ripple
                v-for="(i, index) in pending"
                :key="index"
              >
                <q-item-section>
                  <q-item-label overline>{{ i.data().name }}</q-item-label>
                  <q-item-label>Item with caption</q-item-label>
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
                  <q-item-label>Item with caption</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </q-tab-panel>

        <q-tab-panel name="users">
          <div class="text-h6">Manage Users</div>
          <div>
            <q-list bordered separator>
              <q-item
                clickable
                v-ripple
                v-for="(i, index) in users"
                :key="index"
              >
                <q-item-section>
                  <q-item-label overline>{{ i.data().name }}</q-item-label>
                  <q-item-label>Item with caption</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { addDoc, setDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import db from "../boot/firebase.js";
import { ref } from "vue";

export default {
  data() {
    return {
      pendInfo: ref(false),
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
          if (doc.data().businessInfo.approved == false) {
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
