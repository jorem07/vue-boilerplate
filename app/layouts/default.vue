<template>
  <ClientOnly>
    <v-app>
      <NavBar />
      <NuxtPage />
    </v-app>
  </ClientOnly>
</template>

<script setup>
import NavBar from '~/components/NavBar.vue'
</script>
    