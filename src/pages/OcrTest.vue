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
      "https://firebasestorage.googleapis.com/v0/b/intus-d9b58.appspot.com/o/Satyaan%20middle.jpeg?alt=media&token=96b6eda9-092e-473a-9e86-6527f639451a";

    this.getOCRData(fileurl);
  },
};
</script>

<style></style>
