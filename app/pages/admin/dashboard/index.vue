<script setup>
import { getMockUserList } from '~/data/mockUsers'
import { API_USERS_INDEX } from '~/api'
import { onMounted, ref } from 'vue'

definePageMeta({ layout: 'empty' })

const data = ref([])
const details = ref({})
const currentUser = ref(null)

onMounted(async () => {
  const token = localStorage.getItem('api_token')
  const storedUser = localStorage.getItem('user')

  if (storedUser) {
    currentUser.value = JSON.parse(storedUser)
  }

  // Temporary: use mock users when logged in with a mock token
  if (token?.startsWith('mock-token-')) {
    data.value = getMockUserList()
    details.value = { current_page: 1, total: data.value.length }
    return
  }

  try {
    const response = await $fetch(API_USERS_INDEX, {
      method: 'POST',
      body: { show: 0 },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    data.value = response.body
    details.value = response.details
  } catch (err) {
    console.log('Error', err)
  }
})
</script>

<template>
  <div class="pa-6">
    <v-alert v-if="currentUser" type="success" variant="tonal" class="mb-4">
      Signed in as {{ currentUser.first_name }} {{ currentUser.last_name }} ({{ currentUser.role }})
    </v-alert>

    <h2>Users</h2>
    <ul>
      <li v-for="user in data" :key="user.id">
        {{ user.first_name }} {{ user.last_name }} ({{ user.email }}) — {{ user.role }}
      </li>
    </ul>

    <p>Current Page: {{ details?.current_page }}</p>
    <p>Total Users: {{ details?.total }}</p>
  </div>
</template>
