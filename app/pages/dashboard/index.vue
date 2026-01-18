<script setup>
import { API_USERS_INDEX } from '../api'
import { onMounted, ref } from 'vue'

definePageMeta({ layout: 'empty' })

const data = ref([])      // safe for v-for
const details = ref({})   // safe for template

onMounted(async () => {
  try {
    const token = localStorage.getItem('api_token')
    const response = await $fetch(API_USERS_INDEX, {
      method: 'POST',
      body: {  show: 0  },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    data.value = response.body
    details.value = response.details

    console.log('Data:', data.value)
    console.log('Details:', details.value)
  } catch (err) {
    console.log('Error', err)
  }
})
</script>

<template>
  <div>
    <h2>Users</h2>
    <ul>
      <li v-for="user in data" :key="user.id">
        {{ user.first_name }} {{ user.last_name }} ({{ user.email }})
      </li>
    </ul>

    <p>Current Page: {{ details?.current_page }}</p>
    <p>Total Users: {{ details?.total }}</p>
  </div>
</template>
