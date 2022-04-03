<template></template>

<script>
export default {
  data() {
    return {
      isPwd: ref(true),
      password: null,
      email: null,
    };
  },
  methods: {
    async signIn() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then(async (userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("Signed in: " + user.uid);
          // ...
          const docRef = doc(db, "users", user.uid);

          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            if (docSnap.data().type == "user") {
              this.$router.push({ path: "/" });
            }
          } else {
            // doc.data() will be undefined in this case
            this.$router.push({ path: "/IndexBusiness" });
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
      console.log("Email: " + this.email + "\nPassord: " + this.password);
    },
  },
};
</script>
