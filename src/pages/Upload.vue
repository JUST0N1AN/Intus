<template>
  <div class="row">
    <div class="col-6 offset-3">
      <h4>Upload Pahe</h4>
      <h2>Select A File</h2>
      <q-file
        v-model="formData"
        label="Upload Your Document"
        square
        filled
        counter
        hint="Documents"
        max-files="1"
        multiple
      >
        <template v-slot:prepend>
          <q-icon name="attach_file" />
        </template>
      </q-file>
    </div>
  </div>
  <div class="row justify-center q-pt-md">
    <q-btn @click="sub()" color="primary">Upload</q-btn>
  </div>
  <q-dialog v-model="alert">
    <q-card>
      <q-card-section>
        <div class="text-h6">Upload Successful</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Your file has been uploaded Successfully!
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytes,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";
import { collection, addDoc, setDoc, doc, updateDoc } from "firebase/firestore";
import db from "../boot/firebase.js";

export default {
  data() {
    return {
      previewImage: null,
      imgUrl: null,
      items: [
        {
          image: false,
        },
      ],
      filenames: [],
      formData: null,
      alert: false,
    };
  },
  methods: {
    sub() {
      const auth = getAuth();
      const user = auth.currentUser;
      const metadata = {
        customMetadata: {
          uid: "1234",
          you: 1,
        },
      };
      const storage = getStorage();
      const storageRef = ref(storage, this.formData[0].name);
      uploadBytes(storageRef, this.formData[0], metadata).then((snapshot) => {
        this.alert = true;
        getDownloadURL(storageRef).then((url) => {
          const docRef = addDoc(collection(db, "users", user.uid, "media"), {
            name: this.formData[0].name,
            fileUrl: url,
          });
        });
      });
    },
    onFileChange(item, e) {
      const auth = getAuth();
      const user = auth.currentUser;
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      const metadata = {
        customMetadata: {
          uid: "1234",
          you: 1,
        },
      };
      const storage = getStorage();
      const storageRef = ref(storage, files[0].name);
      uploadBytes(storageRef, files[0], metadata).then((snapshot) => {
        getDownloadURL(storageRef).then((url) => {
          const docRef = addDoc(collection(db, "users", user.uid, "media"), {
            name: files[0].name,
            fileUrl: url,
          });
        });
      });

      this.filenames.push(files[0].name);
      this.createImage(item, files[0]);
    },
    createImage(item, file) {
      var image = new Image();
      var reader = new FileReader();

      reader.onload = (e) => {
        item.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function (item) {
      const storage = getStorage();
      const deleteRef = ref(storage, this.filenames[0]);
      deleteObject(deleteRef)
        .then(() => {})
        .catch((error) => {});
      item.image = false;
    },
  },
};
</script>

<style>
.imagePreviewWrapper {
  width: 30%;
  height: 250px;
  display: block;
  margin: auto;
}
</style>
