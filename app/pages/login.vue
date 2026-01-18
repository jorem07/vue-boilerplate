<script setup>
import { ref } from 'vue'
import { API_LOGIN } from '../api'

import { useRouter } from 'vue-router'

const router = useRouter()

function goTo(path) {
  router.push(path)
}

definePageMeta({ layout: 'empty' })

const form = ref()
const email = ref('')
const password = ref('')

const snackbar = ref(false)
const snackbarMessage = ref('') 
const snackbarColor = ref('error')


// Backend validation errors
const errors = ref({})

// Frontend rules
const isRequired = (label, modelRef) => v => !!v || !!modelRef.value || `${label} is required`

// Loading state
const loading = ref(false)

async function submit() {
  errors.value = {}
  loading.value = true

  try {
    
    const data = await $fetch(API_LOGIN, {
      method: 'POST',
      credentials: 'include',
      body: { email: email.value, password: password.value }
    })

    localStorage.setItem('api_token', data.token)

    console.log('Login successful!', data.token)

    goTo('/dashboard')

    snackbarMessage.value = 'Login successful!'
    snackbarColor.value = 'success'
    snackbar.value = true
  } catch (err) {
    snackbarMessage.value = err?.data?.message || 'Login failed'
    snackbarColor.value = 'error'
    snackbar.value = true
  } finally {
    loading.value = false
  }
}

async function validate() {
  const valid = await form.value.validate()

  if (valid.valid) submit()
}

</script>

<template>
  <v-main class="fill-height">
    <v-container fluid class="fill-height pa-0">
      <v-row class="fill-height" no-gutters>
          <!-- LEFT PANEL -->
          <v-col cols="12" lg="8" class="pa-0 d-none d-lg-block">
            <v-sheet
              color="indigoDark"
              class="fill-height d-flex align-center justify-center"
            >
              <div class="w-100" style="max-width: 380px;">
                <v-btn
                  block
                  rounded
                  class="py-5 mb-2 text-overline"
                  color="white"
                  variant="outlined"
                  :loading="loading"
                  :disabled="loading"
                  @click="goTo('/')"
                  prepend-icon="mdi-arrow-left"
                >
                  Go back to Homepage
              </v-btn>
              </div>
            </v-sheet>
          </v-col>
          <!-- RIGHT PANEL -->
          <v-col cols="12" lg="4" class="pa-0 px-5">
            <v-sheet
              
              class="fill-height d-flex align-center justify-center"
            >
            <div class="w-100" style="max-width: 420px;">
            <!-- <v-card class="px-10 py-10"> -->
              <v-btn
                variant="text"
                color="primary"
                class="d-lg-none position-fixed top-0 left-0 start-0 m-4 z-5 text-overline"
                prepend-icon="mdi-arrow-left"
                @click="goTo('/')"
                :disabled="loading"
              >
                Go back to Homepage
              </v-btn>

              <v-card-title class="text-center mb-5">
                Login
              </v-card-title>

              <v-form ref="form">
                <v-text-field
                  variant="underlined"
                  v-model="email"
                  label="Email"
                  class="mb-5"
                  :rules="[isRequired('Email', email)]"
                  :error-messages="errors.email"
                  @input="errors.email = []"
                />

                <v-text-field
                  variant="underlined"
                  v-model="password"
                  label="Password"
                  type="password"
                  class="mb-5"
                  :rules="[isRequired('Password', password)]"
                  :error-messages="errors.password"
                  @input="errors.password = []"
                />

                <v-checkbox label="Remember me" />

                <v-btn
                  block
                  rounded
                  class="py-5 mb-5"
                  color="indigoDark"
                  variant="elevated"
                  :loading="loading"
                  :disabled="loading"
                  @click="validate"
                >
                  Login
                </v-btn>

                <v-divider>OR</v-divider>
                
                <v-btn
                  block
                  rounded
                  class="py-5 mt-2 mb-5"
                  color="primary"
                  variant="outlined"
                  :loading="loading"
                  :disabled="loading"
                  @click="validate"
                  prepend-icon="mdi-google"
                >
                  Login with Google
                </v-btn>

                <v-btn
                  block
                  rounded
                  class="py-5"
                  color="primary"
                  variant="outlined"
                  :loading="loading"
                  :disabled="loading"
                  @click="validate"
                  prepend-icon="mdi-facebook"
                >
                  Login with Facebook
                </v-btn>
              </v-form>
            <!-- </v-card> -->
          </div>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
    
  <v-snackbar
    v-model="snackbar"
    :color="snackbarColor"
    timeout="3000"
    location="top right"
  >
    {{ snackbarMessage }}
  </v-snackbar>
</template>
