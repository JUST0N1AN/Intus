<template>
  <router-view />
</template>
<script>
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, setDoc, doc, updateDoc } from "firebase/firestore";
import db from "./boot/firebase.js";
export default {};
</script>
<style>
body {
  font-family: "Garet", sans-serif;
}
</style>
