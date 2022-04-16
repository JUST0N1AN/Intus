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
      "https://firebasestorage.googleapis.com/v0/b/intus-d9b58.appspot.com/o/shane%20vaxx%20front.jpeg?alt=media&token=5514119a-8202-4b63-9c93-f17665b0b029";

    this.getOCRData(fileurl);
  },
};
</script>

<style></style>
