<template>
  <ClientOnly>
    <v-app>
      <NavBar />
      <v-main class="pa-0">
        <NuxtPage />
      </v-main>
    </v-app>
  </ClientOnly>
</template>

<script setup>
import NavBar from '~/components/NavBar.vue'
</script>
