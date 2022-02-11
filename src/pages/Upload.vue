<template>
  <div>Upload Pahe</div>
  <div v-for="item in items" :key="item">
    <div v-if="!item.image">
      <h2>Select an image</h2>
      <input type="file" @change="onFileChange(item, $event)" />
    </div>
    <div v-else>
      <img :src="item.image" />
      <p v-for="i in filenames" :key="i">{{i}}</p>
      <br>
      <button @click="removeImage(item)">Remove image</button>
    </div>
  </div>
</template>

<script>
import { getStorage, ref, uploadBytes, deleteObject } from "firebase/storage";
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
      filenames: [
      ]
    };
  },
  methods: {
    onFileChange(item, e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      const metadata = {
        customMetadata: {
          "uid" : "1234",
          "you" : 1
        }
      }
      const storage =getStorage();
      const storageRef = ref(storage, files[0].name)
      uploadBytes(storageRef, files[0], metadata).then((snapshot) => {
         console.log('File Uploaded')
       })
      this.filenames.push(files[0].name)
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
      const storage =getStorage();
      const deleteRef = ref(storage, this.filenames[0])
      deleteObject(deleteRef).then(()=>{
        console.log('Successfully Deleted')
      }).catch((error)=>{
        console.log('File cannot be Deleted')
      });
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