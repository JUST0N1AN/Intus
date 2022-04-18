<template>
  <div>Hello</div>
</template>

<script>
const axios = require("axios");
export default {
  data() {
    return {};
  },
  methods: {
    async getOCRData(fileUrl) {
      let apiurl = "https://googlevision-intus.herokuapp.com/ocr/uid?url=";
      let encodedUrl = encodeURIComponent(fileUrl);
      let newUrl = apiurl + encodedUrl;
      await axios.get(newUrl).then((res) => {
        console.log(res.data);
      });
    },
  },
  mounted() {
    let fileurl =
      "https://firebasestorage.googleapis.com/v0/b/intus-d9b58.appspot.com/o/Capture.JPG?alt=media&token=e9b9f2bf-4d94-4e34-a96c-a7e140106a45";

    this.getOCRData(fileurl);
  },
};
</script>

<style></style>
