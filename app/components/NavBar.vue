<template>
  <v-app-bar app color="indigoDark">
    <v-toolbar-title>MTech</v-toolbar-title>
    <v-btn @click="goTo('/')">Home</v-btn>
    <v-btn @click="goTo('/about')">About</v-btn>
    <v-btn @click="goTo('/contact')">Contact</v-btn>
    <v-btn variant="outlined" rounded @click="goTo('/login')">Login</v-btn>
  </v-app-bar>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goTo(path) {
  router.push(path)
}
</script>
